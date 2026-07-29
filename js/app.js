
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : js/app.js
   Version     : 2.3

   Status      : 🔒 ROUTER CONNECTION PATCH


   Purpose:

   Core application bootstrap controller.


   Responsibilities:

   ✓ Initialize application
   ✓ Load global components
   ✓ Load journey pages
   ✓ Control first journey entry
   ✓ Connect Welcome CTA
   ✓ Maintain page state


   Does NOT:

   ✗ Handle assessment logic
   ✗ Handle scoring
   ✗ Handle backend operations


   Journey Flow:

   PAGE 01
   Welcome

        ↓

   CTA Click

        ↓

   PAGE 02
   Registration


   ========================================================================== */


const CTMApp = (() => {



    const CONFIG = {


        currentPage: 1,


        totalPages: 18,


        initialPage:

        "welcome",



        components:{


            header:

            "components/header.html",



            footer:

            "components/footer.html",



            navigation:

            "components/navigation.html"


        }


    };







    let initialized = false;







    /* ==========================================================
       APPLICATION INIT
       ========================================================== */


    async function init(){



        if(initialized){

            return;

        }



        initialized = true;



        await loadGlobalComponents();



        await loadPage(

            CONFIG.initialPage

        );



        hideNavigation();



        bindWelcomeCTA();



    }











    /* ==========================================================
       GLOBAL COMPONENT LOADER
       ========================================================== */


    async function loadGlobalComponents(){



        await loadComponent(

            "app-header",

            CONFIG.components.header

        );



        await loadComponent(

            "app-footer",

            CONFIG.components.footer

        );



    }











    async function loadComponent(

        elementId,

        filePath

    ){



        const container =

        document.getElementById(

            elementId

        );



        if(!container){

            return;

        }




        try{


            const response =

            await fetch(filePath);



            if(!response.ok){

                throw new Error(

                    filePath

                );

            }



            container.innerHTML =

            await response.text();



        }



        catch(error){


            console.error(

                "Component error:",

                error

            );


        }


    }









    /* ==========================================================
       PAGE LOADER
       ========================================================== */


    async function loadPage(

        pageName

    ){



        const content =

        document.getElementById(

            "app-content"

        );



        if(!content){

            return;

        }





        try{


            const response =

            await fetch(

                `pages/${pageName}.html`

            );





            if(!response.ok){


                throw new Error(

                    "Page missing: "

                    +

                    pageName

                );


            }





            content.innerHTML =

            await response.text();




            window.scrollTo(

                {

                    top:0,

                    behavior:"instant"

                }

            );



        }



        catch(error){



            console.error(

                "Page loading failed:",

                error

            );


        }



    }











    /* ==========================================================
       WELCOME CTA CONNECTION
       ========================================================== */


    function bindWelcomeCTA(){



        const button =

        document.getElementById(

            "start-journey"

        );



        if(!button){

            return;

        }





        button.addEventListener(

            "click",

            ()=>{


                startJourney();


            }

        );



    }











    function startJourney(){



        CONFIG.currentPage = 2;



        loadPage(

            "registration"

        );



        loadJourneyNavigation();



        updateJourneyCounter();



    }









    /* ==========================================================
       NAVIGATION ACTIVATION
       ========================================================== */


    async function loadJourneyNavigation(){



        await loadComponent(

            "app-navigation",

            CONFIG.components.navigation

        );



        if(window.Navigation){


            Navigation.init();


        }


    }











    /* ==========================================================
       PAGE 01 RULE
       ========================================================== */


    function hideNavigation(){



        const navigation =

        document.getElementById(

            "app-navigation"

        );



        if(navigation){


            navigation.innerHTML = "";


        }


    }









    function updateJourneyCounter(){



        const counter =

        document.getElementById(

            "journey-counter"

        );



        if(counter){



            counter.textContent =

            "02 / 18";



        }


    }









    return{


        init,


        loadPage,


        startJourney


    };





})();









/* ==========================================================================

   APPLICATION BOOT

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        CTMApp.init();


    }

);
