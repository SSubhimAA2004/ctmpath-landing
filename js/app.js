
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 2.2

   Status      : PAGE ROUTER PATCH


   Responsibilities:

   ✓ Initialize application
   ✓ Load shared components
   ✓ Initialize navigation engine
   ✓ Load journey pages
   ✓ Handle page transitions


   Does NOT:

   ✗ Assessment logic
   ✗ Scoring
   ✗ Backend operations


   ========================================================================== */



const CTMApp = (() => {





    const CONFIG = {



        initialPage:

        1,



        totalPages:

        18,





        components: {



            header:

            "components/header.html",




            navigation:

            "components/navigation.html",




            footer:

            "components/footer.html"



        }



    };







    let started = false;



    let currentPage = 1;









    /* ==========================================================
       APPLICATION START
       ========================================================== */


    async function init(){



        if(started){

            return;

        }



        started = true;



        await loadGlobalComponents();



        initializeNavigation();



        bindPageChange();



        await loadPage(currentPage);



        hideLoader();



    }









    /* ==========================================================
       LOAD SHARED COMPONENTS
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
       START NAVIGATION ENGINE
       ========================================================== */


    function initializeNavigation(){



        if(

            window.CTMNavigation

            &&

            typeof window.CTMNavigation.init === "function"

        ){



            window.CTMNavigation.init();



        }



    }









    /* ==========================================================
       LISTEN FOR PAGE CHANGES
       ========================================================== */


    function bindPageChange(){



        document.addEventListener(

            "ctm-page-change",

            (event)=>{



                const page =

                event.detail.page;



                loadPage(page);



            }

        );



    }









    /* ==========================================================
       LOAD COMPONENT
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

            return;

        }





        try {



            const response =

            await fetch(filePath);





            if(!response.ok){



                throw new Error(

                    `Cannot load ${filePath}`

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
       LOAD JOURNEY PAGE
       ========================================================== */


    async function loadPage(pageNumber){



        currentPage = pageNumber;



        const content =

        document.getElementById(

            "app-content"

        );





        if(!content){

            return;

        }







        const pageName =

        getPageName(pageNumber);







        try {



            const response =

            await fetch(

                `pages/${pageName}.html`

            );







            if(!response.ok){



                throw new Error(

                    `Page ${pageName} missing`

                );



            }








            content.innerHTML =

            await response.text();








            window.scrollTo(

                {

                    top:0,

                    behavior:"smooth"

                }

            );







            if(window.CTMNavigation){



                window.CTMNavigation.updateNavigation();



            }






        }





        catch(error){



            console.error(

                "Page loading failed:",

                error

            );



        }



    }









    /* ==========================================================
       PAGE MAP
       ========================================================== */


    function getPageName(pageNumber){



        const pages = {



            1:"welcome",


            2:"registration",


            3:"assessment",


            4:"assessment",


            5:"assessment",


            6:"assessment",


            7:"assessment",


            8:"assessment",


            9:"assessment",


            10:"assessment",


            11:"assessment",


            12:"assessment",


            13:"assessment",


            14:"assessment",


            15:"kalachakra",


            16:"diagnosis",


            17:"prescription",


            18:"cta"



        };





        return pages[pageNumber];



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
   APPLICATION BOOT
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        CTMApp.init();


    }

);
