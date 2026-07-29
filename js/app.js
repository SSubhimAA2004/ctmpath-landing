
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/app.js
   Version     : 2.4

   Status      : PAGE 01 LIFECYCLE LOCK


   Responsibilities:

   ✓ Application bootstrap
   ✓ Component loading
   ✓ Page loading
   ✓ Welcome CTA routing
   ✓ Journey lifecycle control


   Does NOT:

   ✗ Assessment logic
   ✗ Scoring
   ✗ Backend processing


   ========================================================================== */


const CTMApp = (() => {



    const CONFIG = {


        currentPage:1,


        totalPages:18,



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
       START APPLICATION
       ========================================================== */


    async function init(){



        if(initialized){

            return;

        }



        initialized = true;





        await loadGlobalComponents();



        await loadPage(

            "welcome"

        );





        hideGlobalNavigation();



        bindWelcomeStart();



    }









    /* ==========================================================
       LOAD GLOBAL COMPONENTS
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





        await loadComponent(

            "app-navigation",

            CONFIG.components.navigation

        );



    }









    async function loadComponent(

        id,

        file

    ){



        const container =

        document.getElementById(

            id

        );



        if(!container){

            return;

        }





        try{


            const response =

            await fetch(file);





            if(response.ok){



                container.innerHTML =

                await response.text();



            }



        }



        catch(error){



            console.error(

                "Component load error:",

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





        const response =

        await fetch(

            `pages/${pageName}.html`

        );





        if(response.ok){



            content.innerHTML =

            await response.text();



        }



    }









    /* ==========================================================
       WELCOME CTA
       ========================================================== */


    function bindWelcomeStart(){



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









    /* ==========================================================
       START JOURNEY
       ========================================================== */


    async function startJourney(){



        CONFIG.currentPage = 2;





        await loadPage(

            "registration"

        );





        await enableNavigation();



        updateCounter();



    }









    /* ==========================================================
       NAVIGATION CONTROL
       ========================================================== */


    function hideGlobalNavigation(){



        const navigation =

        document.getElementById(

            "app-navigation"

        );





        if(navigation){



            navigation.style.display =

            "none";



        }



    }









    async function enableNavigation(){



        const navigation =

        document.getElementById(

            "app-navigation"

        );





        if(navigation){



            navigation.style.display =

            "flex";



        }





        if(window.Navigation){



            Navigation.setPage(

                2

            );



            Navigation.updateNavigation();



        }



    }









    function updateCounter(){



        const counter =

        document.getElementById(

            "journey-counter"

        );





        if(counter){



            counter.textContent =

            "02 / 18";



        }



    }









    return {


        init,


        loadPage,


        startJourney



    };



})();









document.addEventListener(

"DOMContentLoaded",

()=>{


    CTMApp.init();



});
