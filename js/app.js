
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 2.0

   Purpose:

   Frontend application bootstrap.

   Responsibilities:

   • Initialize application
   • Load reusable components
   • Load current journey page
   • Remove loader state

   Does NOT:

   • Handle navigation
   • Handle scoring
   • Handle backend operations

   ========================================================================== */





const CTMApp = (() => {



    const config = {


        initialPage:

        "welcome",



        components: {


            header:

            "components/header.html",



            footer:

            "components/footer.html"



        }


    };







    /* ==========================================================
       INITIALIZATION
       ========================================================== */


    async function init(){



        hideLoader();



        await loadComponents();



        await loadPage(
            config.initialPage
        );



    }









    /* ==========================================================
       LOAD GLOBAL COMPONENTS
       ========================================================== */


    async function loadComponents(){



        await loadComponent(

            "app-header",

            config.components.header

        );




        await loadComponent(

            "app-footer",

            config.components.footer

        );



    }








    async function loadComponent(
        elementId,
        filePath
    ){



        const element =

        document.getElementById(
            elementId
        );



        if(!element){

            return;

        }






        try {



            const response =

            await fetch(filePath);





            element.innerHTML =

            await response.text();



        }


        catch(error){


            console.error(

                "Component load error:",

                error

            );


        }



    }









    /* ==========================================================
       LOAD JOURNEY PAGE
       ========================================================== */


    async function loadPage(
        pageName
    ){



        const container =

        document.getElementById(

            "app-content"

        );



        if(!container){

            return;

        }







        try {



            const response =

            await fetch(

                `pages/${pageName}.html`

            );





            if(!response.ok){


                throw new Error(

                    "Page not found"

                );


            }






            container.innerHTML =

            await response.text();






            window.scrollTo({

                top:0,

                behavior:"instant"

            });





        }


        catch(error){


            console.error(

                "Page load error:",

                error

            );


        }



    }









    /* ==========================================================
       LOADER
       ========================================================== */


    function hideLoader(){



        const loader =

        document.getElementById(

            "global-loader"

        );



        if(loader){


            loader.classList.add(

                "hidden"

            );


        }



    }









    return {


        init,


        loadPage



    };



})();









/* ==========================================================================
   START APPLICATION
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        CTMApp.init();



    }

);
