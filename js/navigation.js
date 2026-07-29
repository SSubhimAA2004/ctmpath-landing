
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/navigation.js
   Version     : 2.8

   Status      : 🔒 PAGE OWNERSHIP + NAVIGATION CONTROL


   Purpose:

   Global journey navigation controller.


   Responsibilities:

   ✓ Previous button
   ✓ Continue button
   ✓ Counter update
   ✓ Visibility control


   Does NOT:

   ✗ Render pages
   ✗ Load pages
   ✗ Inject UI


   ========================================================================== */


const Navigation = (() => {



    let currentPage = 1;


    const totalPages = 18;


    let initialized = false;








    /* ==========================================================
       INITIALIZE
       ========================================================== */


    function init(){



        if(initialized){

            return;

        }



        initialized = true;


        bindEvents();


        update();



    }









    /* ==========================================================
       EVENTS
       ========================================================== */


    function bindEvents(){



        document.addEventListener(

            "click",

            event => {



                const button =

                event.target.closest(

                    "[data-action]"

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









    /* ==========================================================
       NEXT
       ========================================================== */


    function next(){



        if(currentPage >= totalPages){

            return;

        }



        setPage(

            currentPage + 1

        );



    }









    /* ==========================================================
       PREVIOUS
       ========================================================== */


    function previous(){



        if(currentPage <= 1){

            return;

        }



        setPage(

            currentPage - 1

        );



    }









    /* ==========================================================
       SET PAGE
       ========================================================== */


    function setPage(page){



        currentPage = page;



        update();



        document.dispatchEvent(



            new CustomEvent(

                "ctm-page-change",

                {


                    detail:{


                        page:currentPage


                    }


                }

            )



        );



    }









    /* ==========================================================
       UPDATE NAVIGATION STATE
       ========================================================== */


    function update(){



        const navigation =

        document.getElementById(

            "app-navigation"

        );





        if(!navigation){

            return;

        }









        /*
            PAGE 01

            Welcome owns the action.

        */


        if(currentPage === 1){



            navigation.style.display =

            "none";



            updateCounter();



            return;


        }









        /*
            PAGE 02-18

            Enable global journey controls.

        */


        navigation.style.display =

        "flex";








        const previous =

        navigation.querySelector(

            "[data-action='previous']"

        );






        if(previous){



            previous.style.visibility =

            currentPage <= 2

            ?

            "hidden"

            :

            "visible";



        }








        updateCounter();



    }









    /* ==========================================================
       COUNTER
       ========================================================== */


    function updateCounter(){



        const counter =

        document.getElementById(

            "journey-counter"

        );





        if(!counter){

            return;

        }





        counter.textContent =



            String(currentPage)

            .padStart(2,"0")

            +

            " / "

            +

            String(totalPages)

            .padStart(2,"0");



    }









    return {



        init,


        setPage,


        update,


        getCurrentPage(){


            return currentPage;


        }



    };



})();









window.Navigation = Navigation;









document.addEventListener(

"DOMContentLoaded",

()=>{


    Navigation.init();



});
