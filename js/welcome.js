
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : js/welcome.js
   Version     : 1.0

   Status      : 🔒 PAGE 01 CTA CONTROLLER


   Purpose:

   Controls Welcome Page interaction.


   Responsibilities:

   ✓ Start journey
   ✓ Dispatch Page 02 transition


   Does NOT:

   ✗ Load pages
   ✗ Handle API
   ✗ Process data


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

            return;

        }





        button.addEventListener(

            "click",

            startJourney

        );



    }









    function startJourney(){



        document.dispatchEvent(



            new CustomEvent(

                "ctm-page-change",

                {

                    detail:{


                        page:2


                    }

                }

            )



        );



    }









    return {



        init



    };



})();









document.addEventListener(

"DOMContentLoaded",

()=>{


    Welcome.init();



});
