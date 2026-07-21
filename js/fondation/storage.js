
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
• Clear stored journey
• Provide safe localStorage wrapper

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

            'CTM_PATH_GUIDED_JOURNEY_V1'



    };







    /*
    ==================================================
    Check Storage Availability
    ==================================================
    */


    CTM.storageAvailable = function(){



        try {



            const testKey =

                '__ctm_storage_test__';




            localStorage.setItem(

                testKey,

                testKey

            );




            localStorage.removeItem(

                testKey

            );




            return true;



        }


        catch(error){



            console.warn(

                'Local storage unavailable.'

            );



            return false;



        }



    };







    /*
    ==================================================
    Save Application State
    ==================================================
    */


    CTM.saveState = function(){



        if (

            !CTM.storageAvailable()

        ){



            return false;



        }







        try {



            const state =


                JSON.stringify(

                    CTM.state

                );







            localStorage.setItem(



                CTM.storage.key,



                state



            );







            CTM.log && CTM.log(



                'Journey state saved.'



            );







            return true;



        }


        catch(error){



            console.error(

                'Save failed:',

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



        if (

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







            const restored =


                JSON.parse(

                    saved

                );







            CTM.state = {



                ...CTM.state,



                ...restored



            };







            CTM.log && CTM.log(



                'Journey state restored.'



            );







            return true;



        }


        catch(error){



            console.error(

                'Restore failed:',

                error

            );



            return false;



        }



    };







    /*
    ==================================================
    Clear Journey
    ==================================================
    */


    CTM.clearState = function(){



        if (

            !CTM.storageAvailable()

        ){



            return;



        }







        localStorage.removeItem(

            CTM.storage.key

        );







        CTM.log && CTM.log(



            'Journey state cleared.'



        );



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
    Browser Close Protection
    ==================================================
    */


    window.addEventListener(



        'beforeunload',



        function(){



            CTM.autoSave();



        }



    );







})();
