
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







        const response =


            await fetch(

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
    Screen Preparation
    ==================================================
    */


    CTM.prepareScreen = function(screenId){



        /*
        Update state
        */


        if (

            typeof CTM.setCurrentScreen ===

            'function'

        ){



            CTM.setCurrentScreen(

                screenId

            );



        }







        /*
        Update progress
        */


        const number =


            parseInt(

                screenId.replace(

                    'screen',

                    ''

                ),

                10

            );







        if (

            typeof CTM.setProgress ===

            'function'

        ){



            CTM.setProgress(

                number

            );



        }







        /*
        Screen specific initialization
        */


        const functionName =


            'init' +

            screenId.charAt(0).toUpperCase() +

            screenId.slice(1);







        if (

            typeof CTM[functionName] ===

            'function'

        ){



            CTM[functionName]();



        }







        /*
        Save state
        */


        if (

            typeof CTM.saveState ===

            'function'

        ){



            CTM.saveState();



        }



    };







    /*
    ==================================================
    Load Screen
    ==================================================
    */


    CTM.loadScreen = async function(screenId){



        try {



            CTM.log && CTM.log(



                'Loading:',

                screenId



            );







            const html =



                await CTM.fetchScreen(

                    screenId

                );







            CTM.injectScreen(

                html

            );







            CTM.prepareScreen(

                screenId

            );







            /*
            Always return visitor to top
            of newly loaded screen

            */


            window.scrollTo({



                top:0,



                behavior:'instant'



            });







            CTM.log && CTM.log(



                screenId +

                ' loaded successfully.'



            );







            return true;



        }


        catch(error){



            console.error(

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
    Loading Error
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

            Screen Loading Error

        </h2>


        <p>

            Unable to load:

            <strong>${screenId}</strong>

        </p>


        <p>

            ${message}

        </p>


    </div>


</section>


`;



    };







})();
