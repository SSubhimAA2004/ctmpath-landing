
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/app.js
   Version     : 2.2

   Status      : PAGE ROUTER CONNECTOR


   Purpose:

   Core frontend application controller.


   Responsibilities:

   ✓ Initialize application
   ✓ Load global components
   ✓ Load journey pages
   ✓ Listen for page change events
   ✓ Update application content
   ✓ Maintain frontend flow


   Does NOT:

   ✗ Navigation decisions
   ✗ Assessment calculations
   ✗ API communication
   ✗ Business processing


   Architecture:

   navigation.js
        |
        | dispatches
        ↓
   ctm-page-change
        |
        ↓
   app.js
        |
        ↓
   pages/*.html


   ========================================================================== */





const CTMApp = (() => {





    const CONFIG = {


        initialPage: 1,



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









    let started = false;



    let currentPage = 1;











    /* ==========================================================
       APPLICATION INITIALIZATION
       ========================================================== */


    async function init(){



        if(started){

            return;

        }



        started = true;





        await loadGlobalComponents();





        await loadPage(

            currentPage

        );





        bindPageEvents();





        hideLoader();



    }











    /* ==========================================================
       GLOBAL COMPONENT LOADING
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

                "Component load failed:",

                error

            );



        }



    }









    /* ==========================================================
       PAGE EVENT LISTENER
       ========================================================== */


    function bindPageEvents(){



        document.addEventListener(

            "ctm-page-change",

            function(event){



                const page =

                event.detail.page;





                goToPage(

                    page

                );



            }

        );



    }









    /* ==========================================================
       ROUTER
       ========================================================== */


    async function goToPage(

        pageNumber

    ){



        if(

            pageNumber < 1 ||

            pageNumber > CONFIG.totalPages

        ){

            return;

        }






        currentPage = pageNumber;





        await loadPage(

            currentPage

        );





        window.scrollTo(

            {

                top:0,

                behavior:"smooth"

            }

        );





        if(window.Navigation){


            Navigation.updateNavigation();


        }



    }









    /* ==========================================================
       PAGE LOADER
       ========================================================== */


    async function loadPage(

        pageNumber

    ){



        const content =

        document.getElementById(

            "app-content"

        );




        if(!content){

            return;

        }






        const pageName =

        getPageName(

            pageNumber

        );






        try{



            const response =

            await fetch(

                `pages/${pageName}.html`

            );





            if(!response.ok){


                throw new Error(

                    `Missing page: ${pageName}`

                );


            }





            content.innerHTML =

            await response.text();





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


    function getPageName(

        pageNumber

    ){



        const pages = {



            1:"welcome",



            2:"registration",



            3:"assessment-01",



            4:"assessment-02",



            5:"assessment-03",



            6:"assessment-04",



            7:"assessment-05",



            8:"assessment-06",



            9:"assessment-07",



            10:"assessment-08",



            11:"assessment-09",



            12:"assessment-10",



            13:"assessment-11",



            14:"assessment-12",



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


        goToPage,


        loadPage,


        getCurrentPage(){


            return currentPage;


        }


    };






})();









document.addEventListener(

"DOMContentLoaded",

()=>{


    CTMApp.init();


});
