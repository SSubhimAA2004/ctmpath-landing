

/*
======================================================================

CTM PATH™ Guided Journey v1.0

File
js/foundation/loader.js

Purpose
Screen Loading Engine

Responsibility
• Load screen HTML files
• Inject screens dynamically
• Update current screen
• Refresh screen experience
• Support future screen modules
• Handle loading errors
• Initialize screen modules safely

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
    Loader Configuration
    ==================================================
    */


    CTM.loader = {



        folder:

            'screens/',



        extension:

            '.html',



        container:

            'screen-container'



    };







    /*
    ==================================================
    Get Screen Container
    ==================================================
    */


    CTM.getScreenContainer = function(){



        return document.getElementById(



            CTM.loader.container



        );



    };







    /*
    ==================================================
    Build Screen Path
    ==================================================
    */


    CTM.getScreenPath = function(screenId){



        return (


            CTM.loader.folder +


            screenId +


            CTM.loader.extension


        );



    };







    /*
    ==================================================
    Fetch Screen HTML
    ==================================================
    */


    CTM.fetchScreen = async function(screenId){



        const path =


            CTM.getScreenPath(

                screenId

            );







        const response = await fetch(



            path,



            {


                cache:'no-cache'


            }



        );







        if(!response.ok){



            throw new Error(



                'Unable to load screen: ' +

                path



            );



        }







        return await response.text();



    };







    /*
    ==================================================
    Inject Screen
    ==================================================
    */


    CTM.injectScreen = function(html){



        const container =


            CTM.getScreenContainer();







        if(!container){



            throw new Error(



                'Screen container not found.'



            );



        }







        container.innerHTML = html;



    };







    /*
    ==================================================
    Clear Previous Screen State
    ==================================================
    */


    CTM.clearScreenClasses = function(){



        document.body.classList.remove(



            'screen-loaded'



        );



    };







    /*
    ==================================================
    Prepare Screen State
    ==================================================
    */


    CTM.prepareScreen = function(screenId){



        /*
        Update current screen
        */


        if(



            typeof CTM.setCurrentScreen ===

            'function'



        ){



            CTM.setCurrentScreen(

                screenId

            );



        }







        /*
        Update journey progress
        */


        const number = parseInt(



            screenId.replace(

                'screen',

                ''

            ),



            10



        );







        if(



            typeof CTM.setProgress ===

            'function'



        ){



            CTM.setProgress(

                number

            );



        }







        /*
        Screen module initialization

        Example:

        screen01

        becomes:

        initScreen01

        */


        const formattedScreen =



            screenId.replace(



                /^screen/,



                'Screen'



            );







        const functionName =



            'init' +

            formattedScreen;







        if(



            typeof CTM[functionName] ===

            'function'



        ){



            CTM[functionName]();



        }







        /*
        Save progress
        */


        if(



            typeof CTM.saveState ===

            'function'



        ){



            CTM.saveState();



        }



    };

     /*
    ==================================================
    Screen Transition Complete
    ==================================================
    */


    CTM.completeScreenLoad = function(){



        document.body.classList.add(



            'screen-loaded'



        );



    };







    /*
    ==================================================
    Scroll To Top

    Every new screen starts
    from the beginning.

    ==================================================
    */


    CTM.scrollToScreenTop = function(){



        window.scrollTo({



            top:0,



            left:0,



            behavior:'instant'



        });



    };







    /*
    ==================================================
    Load Screen

    Main Loader Function

    ==================================================
    */


    CTM.loadScreen = async function(screenId){



        try {



            CTM.log && CTM.log(



                'Loading screen:',



                screenId



            );







            /*
            Validate screen
            */


            if(



                typeof CTM.isValidScreen ===

                'function'



                &&



                !CTM.isValidScreen(

                    screenId

                )



            ){



                throw new Error(



                    'Invalid screen request: ' +

                    screenId



                );



            }







            /*
            Remove previous state
            */


            CTM.clearScreenClasses();







            /*
            Fetch HTML
            */


            const html = await CTM.fetchScreen(



                screenId



            );







            /*
            Inject HTML
            */


            CTM.injectScreen(



                html



            );







            /*
            Update application state
            */


            CTM.prepareScreen(



                screenId



            );







            /*
            Restore screen data

            Example:
            selected choices,
            visitor name,
            responses

            */


            if(



                typeof CTM.restoreChoices ===

                'function'



            ){



                CTM.restoreChoices();



            }







            /*
            Screen specific loaded hook

            Example:

            afterScreen01Loaded()

            */


            const afterHook =



                'after' +

                screenId.replace(



                    /^screen/,



                    'Screen'



                ) +

                'Loaded';







            if(



                typeof CTM[afterHook] ===

                'function'



            ){



                CTM[afterHook]();



            }







            /*
            Always move user
            to top of new screen

            */


            CTM.scrollToScreenTop();







            /*
            Complete transition

            */


            CTM.completeScreenLoad();







            CTM.log && CTM.log(



                screenId +

                ' loaded successfully.'



            );







            return true;



        }



        catch(error){



            console.error(



                'Screen loading failed:',



                error



            );







            CTM.showLoaderError(



                screenId,



                error.message



            );







            return false;



        }



    };







    /*
    ==================================================
    Prefetch Screen

    Future Performance Enhancement

    ==================================================
    */


    CTM.prefetchScreen = async function(screenId){



        try {



            await fetch(



                CTM.getScreenPath(

                    screenId

                ),



                {



                    cache:'force-cache'



                }



            );



            CTM.log && CTM.log(



                'Prefetched:',



                screenId



            );



        }



        catch(error){



            console.warn(



                'Prefetch failed:',



                screenId



            );



        }



    };







    /*
    ==================================================
    Loading Error Screen
    ==================================================
    */


    CTM.showLoaderError = function(



        screenId,



        message



    ){



        const container =



            CTM.getScreenContainer();







        if(!container){



            return;



        }







        container.innerHTML = `



<section class="screen">



    <div class="container">



        <h2>



            CTM PATH™



            Loading Error



        </h2>



        <p>



            Unable to load:



            <strong>

                ${screenId}

            </strong>



        </p>



        <p>



            ${message}



        </p>



    </div>



</section>



`;



    };








    /*
    ==================================================
    Screen Reload Helper

    Used when a screen needs
    fresh rendering without
    changing architecture.

    ==================================================
    */


    CTM.reloadCurrentScreen = async function(){



        const current =


            CTM.getCurrentScreen();







        if(!current){



            return false;



        }







        return await CTM.loadScreen(



            current



        );



    };







    /*
    ==================================================
    Initialize Loader

    ==================================================
    */


    CTM.initLoader = function(){



        CTM.log && CTM.log(



            'Screen loader initialized.'



        );



    };







    /*
    ==================================================
    DOM Ready

    ==================================================
    */


    document.addEventListener(



        'DOMContentLoaded',



        function(){



            CTM.initLoader();



        }



    );







})();
