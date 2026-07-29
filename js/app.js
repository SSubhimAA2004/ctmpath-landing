
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/app.js
   Version     : 2.3

   Status      : PAGE ROUTER + REGISTRATION ACTIVATION PATCH


   Responsibilities:

   ✓ Page routing
   ✓ Dynamic page loading
   ✓ Script initialization
   ✓ Journey state management


   Does NOT:

   ✗ API processing
   ✗ Form validation
   ✗ Database operations


   ========================================================================== */


const App = (() => {



    const TOTAL_PAGES = 18;


    let currentPage = 1;









    /* ==========================================================
       INITIALIZATION
       ========================================================== */


    function init(){



        bindPageChange();



        loadPage(

            currentPage

        );



    }









    /* ==========================================================
       PAGE CHANGE EVENT
       ========================================================== */


    function bindPageChange(){



        document.addEventListener(



            "ctm-page-change",



            event => {



                const page =

                event.detail.page;



                navigateTo(page);



            }



        );



    }









    /* ==========================================================
       NAVIGATION
       ========================================================== */


    function navigateTo(page){



        if(

            page < 1 ||

            page > TOTAL_PAGES

        ){

            return;

        }





        currentPage = page;



        loadPage(

            page

        );



    }









    /* ==========================================================
       PAGE LOADER
       ========================================================== */


    async function loadPage(page){



        const container =

        document.getElementById(

            "journey-container"

        );





        if(!container){

            console.error(

                "Journey container missing"

            );


            return;

        }







        const pageName =

        getPageName(page);







        try{



            const response =

            await fetch(

                `pages/${pageName}.html`

            );







            if(!response.ok){



                throw new Error(

                    "Page not found"

                );



            }







            const html =

            await response.text();







            container.innerHTML = html;







            updatePageState(

                page

            );







            initializePageScripts(

                pageName

            );



        }



        catch(error){



            console.error(

                "Page loading error:",

                error

            );



        }



    }









    /* ==========================================================
       PAGE MAP
       ========================================================== */


    function getPageName(page){



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

            "completion"



        };







        return pages[page];



    }









    /* ==========================================================
       PAGE STATE UPDATE
       ========================================================== */


    function updatePageState(page){



        document.dispatchEvent(



            new CustomEvent(

                "page-loaded",

                {

                    detail:{


                        page:page


                    }

                }

            )



        );



        if(

            window.Navigation

        ){



            Navigation.setPage(

                page

            );



        }



        window.scrollTo(

            {

                top:0,

                behavior:"smooth"

            }

        );



    }









    /* ==========================================================
       SCRIPT INITIALIZER
       ========================================================== */


    function initializePageScripts(

        pageName

    ){



        switch(pageName){



            case "welcome":



                if(window.Welcome){


                    Welcome.init();


                }


            break;







            case "registration":



                if(window.Registration){


                    Registration.init();


                }


            break;



        }



    }









    return {



        init,


        navigateTo,


        getCurrentPage:()=>currentPage



    };



})();









document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        App.init();



    }

);
