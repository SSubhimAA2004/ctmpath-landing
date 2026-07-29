
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 2.1

   Status      : NAVIGATION INITIALIZATION FIX


   Purpose:

   Core application bootstrap controller.


   Responsibilities:

   ✓ Initialize application
   ✓ Load shared components
   ✓ Load first journey page
   ✓ Start navigation after DOM injection
   ✓ Prepare frontend environment


   Does NOT:

   ✗ Handle assessment logic
   ✗ Handle scoring
   ✗ Handle backend operations


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









    /* ==========================================================
       APPLICATION START
       ========================================================== */


    async function init(){





        if(started){


            return;


        }







        started = true;








        showLoader();







        await loadGlobalComponents();








        await loadInitialPage();








        /*
            IMPORTANT

            Navigation starts only after:

            1. navigation.html exists
            2. welcome.html exists


        */






        if(window.CTMNavigation){



            CTMNavigation.init();



        }









        hideLoader();





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



            "app-navigation",



            CONFIG.components.navigation



        );








        await loadComponent(



            "app-footer",



            CONFIG.components.footer



        );







    }














    /* ==========================================================
       COMPONENT LOADER
       ========================================================== */


    async function loadComponent(

        elementId,

        filePath

    ){






        const container =

        document.getElementById(

            elementId

        );







        if(!container){



            console.warn(

                "Missing container:",

                elementId

            );



            return;



        }








        try {





            const response =

            await fetch(filePath);







            if(!response.ok){



                throw new Error(

                    `Failed loading ${filePath}`

                );



            }








            container.innerHTML =

            await response.text();







        }

        catch(error){





            console.error(

                "Component loading error:",

                error

            );





        }







    }














    /* ==========================================================
       PAGE LOADER
       ========================================================== */


    async function loadInitialPage(){






        await loadPage(

            CONFIG.initialPage

        );






    }












    async function loadPage(pageName){






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

                `pages/${pageName}.html`

            );








            if(!response.ok){



                throw new Error(

                    `Page not found: ${pageName}`

                );



            }








            content.innerHTML =

            await response.text();









            /*
                Notify page system

            */






            document.dispatchEvent(



                new CustomEvent(

                    "ctm-page-loaded",

                    {

                        detail:{


                            page: pageName


                        }


                    }

                )



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
       LOADER CONTROL
       ========================================================== */


    function showLoader(){






        const loader =

        document.getElementById(

            "global-loader"

        );







        if(loader){



            loader.classList.remove(

                "hidden"

            );



        }







    }








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














    /* ==========================================================
       PUBLIC API
       ========================================================== */


    return {





        init,



        loadPage





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
