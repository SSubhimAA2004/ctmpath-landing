
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/navigation.js
   Version     : 2.6

   Status      : FINAL JOURNEY NAVIGATION CONNECTOR


   Responsibilities:

   ✓ Handle journey controls
   ✓ Dispatch navigation events
   ✓ Control navigator visibility
   ✓ Update journey counter


   Does NOT:

   ✗ Load pages
   ✗ Inject HTML
   ✗ Handle business logic


   Architecture:

   navigation.js
          |
          ↓
   ctm-page-change event
          |
          ↓
   app.js
          |
          ↓
   pages/*.html


   ========================================================================== */



const Navigation = (() => {



    let currentPage = 2;


    const totalPages = 18;


    let initialized = false;









    function init(){


        if(initialized){

            return;

        }


        initialized = true;


        bindEvents();


        updateNavigation();


    }









    function bindEvents(){



        document.addEventListener(

            "click",

            function(event){



                const button =

                event.target.closest(

                    ".nav-button"

                );



                if(!button){

                    return;

                }





                const action =

                button.dataset.action;






                if(action === "continue"){


                    next();


                }






                if(action === "previous"){


                    previous();


                }




            }

        );



    }









    function next(){



        if(currentPage >= totalPages){

            return;

        }



        currentPage++;


        dispatch();



    }









    function previous(){



        if(currentPage <= 2){

            return;

        }



        currentPage--;


        dispatch();



    }









    function dispatch(){



        document.dispatchEvent(



            new CustomEvent(

                "ctm-page-change",

                {

                    detail:{


                        page: currentPage


                    }

                }

            )



        );



        updateNavigation();



    }









    function updateNavigation(){



        const navigation =

        document.getElementById(

            "app-navigation"

        );





        if(!navigation){

            return;

        }






        if(currentPage <= 1){



            navigation.style.display =

            "none";



        }

        else {



            navigation.style.display =

            "flex";



        }







        updateCounter();



    }









    function updateCounter(){



        const counter =

        document.getElementById(

            "journey-counter"

        );





        if(counter){



            counter.textContent =

            String(currentPage)

            .padStart(2,"0")

            +

            " / "

            +

            String(totalPages)

            .padStart(2,"0");



        }



    }









    function setPage(page){



        currentPage = page;


        updateNavigation();



    }









    return {



        init,


        setPage,


        updateNavigation,


        getCurrentPage(){


            return currentPage;


        }



    };



})();







window.Navigation = Navigation;

