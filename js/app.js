
/* ==========================================================================
   GLOBAL PAGE NAVIGATION API

   Used by:
       Page Modules

   Example:
       window.goToPage(2)

========================================================================== */


window.goToPage = async function(pageNumber){



    try {



        if(

            !pageNumber ||

            pageNumber < 1 ||

            pageNumber > APP_CONFIG.totalPages

        ){


            console.error(

                "Invalid page number:",

                pageNumber

            );


            return;


        }







        console.log(

            "Navigating to page:",

            pageNumber

        );







        await loadPage(

            pageNumber

        );







        loadPageStyle(

            pageNumber

        );







        await loadPageScript(

            pageNumber

        );







        initializePage(

            pageNumber

        );






    }



    catch(error){



        handleApplicationError(

            error

        );



    }



};

/* ==========================================================================
   PUBLIC API
========================================================================== */


window.CTM_APP = {


    start:

        startApplication,



    loadPage:

        loadPage,



    goToPage:

        window.goToPage



};





})();

