
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/welcome.js
   Version     : 1.1

   Status      : CTA ROUTER COMPATIBILITY PATCH


   Purpose:

   Controls Page 01 Welcome interaction.


   Responsibilities:

   ✓ Begin Journey button
   ✓ Connect to app router


   Does NOT:

   ✗ Load pages
   ✗ Handle data
   ✗ Call backend


   ========================================================================== */


const Welcome = (() => {



    let initialized = false;









    function init(){



        if(initialized){

            return;

        }



        initialized = true;



        bindStartButton();



    }









    function bindStartButton(){



        const button =

        document.getElementById(

            "start-journey"

        );





        if(!button){

            console.warn(

                "Welcome CTA button not found"

            );

            return;

        }







        button.addEventListener(

            "click",

            handleStart

        );



    }









    function handleStart(){



        if(

            window.CTMApp &&

            CTMApp.startJourney

        ){



            CTMApp.startJourney();



        }

        else {



            console.error(

                "CTMApp router unavailable"

            );



        }



    }









    return {



        init



    };



})();









window.Welcome = Welcome;









document.addEventListener(

    "ctm-page-loaded",

    ()=>{


        Welcome.init();


    }

);
