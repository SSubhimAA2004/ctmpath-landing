
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : app.js
   Version     : 2.3

   Status      : REAL 18 PAGE ROUTER


   Responsibilities:

   ✓ Application bootstrap
   ✓ Shared component loading
   ✓ Journey page loading
   ✓ Navigation integration


   Does NOT:

   ✗ Assessment calculations
   ✗ Scoring
   ✗ Backend processing


   ========================================================================== */



const CTMApp = (() => {




    const CONFIG = {



        initialPage: 1,



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



        bindPageRouter();



        await loadPage(1);



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
       ROUTER LISTENER
       ========================================================== */


    function bindPageRouter(){



        document.addEventListener(

            "ctm-page-change",

            (event)=>{



                loadPage(

                    event.detail.page

                );



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





        const response =

        await fetch(filePath);



        if(response.ok){



            container.innerHTML =

            await response.text();



        }



    }









    /* ==========================================================
       LOAD JOURNEY PAGE
       ========================================================== */


    async function loadPage(pageNumber){



        const content =

        document.getElementById(

            "app-content"

        );





        if(!content){

            return;

        }






        const pageFile =

        getPageFile(pageNumber);








        try {



            const response =

            await fetch(

                `pages/${pageFile}.html`

            );







            if(!response.ok){



                throw new Error(

                    `${pageFile}.html not found`

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

                "Page loading error:",

                error

            );



        }



    }









    /* ==========================================================
       MASTER PAGE MAP
       ========================================================== */


    function getPageFile(page){



        const pages = {



            1:

            "welcome",



            2:

            "registration",




            3:

            "assessment-01",



            4:

            "assessment-02",



            5:

            "assessment-03",



            6:

            "assessment-04",



            7:

            "assessment-05",



            8:

            "assessment-06",



            9:

            "assessment-07",



            10:

            "assessment-08",



            11:

            "assessment-09",



            12:

            "assessment-10",



            13:

            "assessment-11",



            14:

            "assessment-12",



            15:

            "kalachakra",



            16:

            "diagnosis",



            17:

            "prescription",



            18:

            "cta"



        };





        return pages[page];



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
