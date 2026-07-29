
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 2.1

   Purpose:

   Core application bootstrap controller.

   Responsibilities:

   ✓ Initialize application
   ✓ Load shared components
   ✓ Initialize navigation after component injection
   ✓ Load first journey page


   Does NOT:

   ✗ Assessment logic
   ✗ Scoring
   ✗ Backend operations

   ========================================================================== */



const CTMApp = (() => {



    const CONFIG = {


        initialPage:

        "welcome",



        components: {


            header:

            "components/header.html",



            footer:

            "components/footer.html",



            navigation:

            "components/navigation.html"


        }


    };





    let started = false;








    async function init(){


        if(started){

            return;

        }


        started = true;



        hideLoader();



        await loadGlobalComponents();



        initializeNavigation();



        await loadInitialPage();



    }








    async function loadGlobalComponents(){



        await loadComponent(

            "app-header",

            CONFIG.components.header

        );



        await loadComponent(

            "app-navigation",

            CONFIG.components.navigation

        );



        await loadComponent(

            "app-footer",

            CONFIG.components.footer

        );



    }









    function initializeNavigation(){



        if(

            window.CTMNavigation

            &&

            typeof window.CTMNavigation.init === "function"

        ){


            window.CTMNavigation.init();



        }



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





        try {



            const response =

            await fetch(filePath);



            if(!response.ok){


                throw new Error(

                    `Unable to load ${filePath}`

                );


            }




            container.innerHTML =

            await response.text();



        }



        catch(error){



            console.error(

                "Component loading failed:",

                error

            );


        }



    }









    async function loadInitialPage(){



        const content =

        document.getElementById(

            "app-content"

        );



        if(!content){

            return;

        }






        try {



            const response =

            await fetch(

                `pages/${CONFIG.initialPage}.html`

            );





            if(!response.ok){


                throw new Error(

                    "Welcome page not found"

                );


            }





            content.innerHTML =

            await response.text();





        }



        catch(error){



            console.error(

                "Initial page loading failed:",

                error

            );


        }



    }









    function hideLoader(){



        const loader =

        document.getElementById(

            "global-loader"

        );



        if(!loader){

            return;

        }





        loader.classList.add(

            "hidden"

        );



    }









    return {


        init,


        loadInitialPage


    };



})();









/* ==========================================================================

   APPLICATION BOOT

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    () => {


        CTMApp.init();


    }

);
