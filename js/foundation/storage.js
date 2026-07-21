

/*
======================================================================

CTM PATH™ Guided Journey v1.0

File
js/foundation/storage.js

Purpose
Application Storage Management

Responsibility
• Save journey state
• Restore visitor progress
• Maintain browser persistence
• Protect stored data
• Handle storage errors
• Support 36-screen journey memory

======================================================================
*/


'use strict';


(() => {



    const CTM = window.CTM;



    if (!CTM) {


        console.error(

            'CTM core has not been initialized.'

        );


        return;


    }







    /*
    ==================================================
    Storage Configuration
    ==================================================
    */


    CTM.storage = {



        key:

            'CTM_PATH_GUIDED_JOURNEY_V1',



        version:

            '1.0',



        timestampKey:

            'CTM_PATH_LAST_SAVE'



    };







    /*
    ==================================================
    Storage Availability Check
    ==================================================
    */


    CTM.storageAvailable = function(){



        try {



            const testKey =

                '__ctm_storage_test__';







            localStorage.setItem(



                testKey,



                'active'



            );







            localStorage.removeItem(



                testKey



            );







            return true;



        }



        catch(error){



            console.warn(



                'CTM storage unavailable.',



                error



            );



            return false;



        }



    };







    /*
    ==================================================
    Deep Merge Utility

    Prevents nested state loss.

    ==================================================
    */


    CTM.mergeState = function(target, source){



        if(!source){



            return target;



        }







        const output = {



            ...target



        };







        Object.keys(source).forEach(function(key){



            if(



                source[key] &&



                typeof source[key] === 'object' &&



                !Array.isArray(source[key])



            ){



                output[key] = CTM.mergeState(



                    target[key] || {},



                    source[key]



                );



            }



            else {



                output[key] = source[key];



            }



        });







        return output;



    };







    /*
    ==================================================
    Prepare Storage Payload
    ==================================================
    */


    CTM.prepareStoragePayload = function(){



        return {



            version:

                CTM.storage.version,



            savedAt:

                new Date().toISOString(),



            state:

                CTM.state



        };



    };

 


    /*
    ==================================================
    Save Application State
    ==================================================
    */


    CTM.saveState = function(){



        if(



            !CTM.storageAvailable()



        ){



            return false;



        }







        try {



            const payload =



                CTM.prepareStoragePayload();







            localStorage.setItem(



                CTM.storage.key,



                JSON.stringify(payload)



            );







            localStorage.setItem(



                CTM.storage.timestampKey,



                payload.savedAt



            );







            if(



                typeof CTM.log ===

                'function'



            ){



                CTM.log(



                    'Journey state saved.'



                );



            }







            return true;



        }



        catch(error){



            console.error(



                'CTM save failed:',



                error



            );







            return false;



        }



    };







    /*
    ==================================================
    Restore Application State
    ==================================================
    */


    CTM.loadState = function(){



        if(



            !CTM.storageAvailable()



        ){



            return false;



        }







        try {



            const saved =



                localStorage.getItem(



                    CTM.storage.key



                );







            if(!saved){



                return false;



            }







            const payload =



                JSON.parse(saved);







            /*
            Version check

            Future versions can migrate

            */


            if(



                !payload.version



            ){



                console.warn(



                    'Invalid CTM storage version.'



                );



                return false;



            }







            if(



                payload.state



            ){



                CTM.state =



                    CTM.mergeState(



                        CTM.state,



                        payload.state



                    );



            }







            if(



                typeof CTM.log ===

                'function'



            ){



                CTM.log(



                    'Journey state restored.'



                );



            }







            return true;



        }



        catch(error){



            console.error(



                'CTM restore failed:',



                error



            );







            CTM.clearState();



            return false;



        }



    };







    /*
    ==================================================
    Get Last Save Time
    ==================================================
    */


    CTM.getLastSaveTime = function(){



        if(



            !CTM.storageAvailable()



        ){



            return null;



        }







        return localStorage.getItem(



            CTM.storage.timestampKey



        );



    };







    /*
    ==================================================
    Check Existing Journey
    ==================================================
    */


    CTM.hasSavedJourney = function(){



        if(



            !CTM.storageAvailable()



        ){



            return false;



        }







        return Boolean(



            localStorage.getItem(



                CTM.storage.key



            )



        );



    };

 


    /*
    ==================================================
    Clear Stored Journey
    ==================================================
    */


    CTM.clearState = function(){



        if(



            !CTM.storageAvailable()



        ){



            return;



        }







        localStorage.removeItem(



            CTM.storage.key



        );







        localStorage.removeItem(



            CTM.storage.timestampKey



        );







        if(



            typeof CTM.log ===

            'function'



        ){



            CTM.log(



                'Journey storage cleared.'



            );



        }



    };







    /*
    ==================================================
    Reset Application

    Clears storage and memory

    ==================================================
    */


    CTM.resetApplication = function(){



        CTM.clearState();







        if(



            typeof CTM.resetJourney ===

            'function'



        ){



            CTM.resetJourney();



        }



        else {



            CTM.state = {};



        }







        if(



            typeof CTM.saveState ===

            'function'



        ){



            CTM.saveState();



        }



    };







    /*
    ==================================================
    Auto Save Helper
    ==================================================
    */


    CTM.autoSave = function(){



        return CTM.saveState();



    };







    /*
    ==================================================
    Automatic Protection

    Save before leaving page

    ==================================================
    */


    window.addEventListener(



        'beforeunload',



        function(){



            CTM.autoSave();



        }



    );







    /*
    ==================================================
    Storage Ready Marker
    ==================================================
    */


    CTM.initStorage = function(){



        if(



            typeof CTM.log ===

            'function'



        ){



            CTM.log(



                'Storage system initialized.'



            );



        }



    };







    /*
    ==================================================
    Initialize

    ==================================================
    */


    document.addEventListener(



        'DOMContentLoaded',



        function(){



            CTM.initStorage();



        }



    );







})();
