
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.5

   Status      : FINAL NAVIGATION VISIBILITY LOCK


   Responsibilities:

   ✓ Control journey movement
   ✓ Control navigation visibility
   ✓ Update journey counter
   ✓ Dispatch router events


   Does NOT:

   ✗ Load pages
   ✗ Handle API
   ✗ Handle assessment logic


   ========================================================================== */



const CTMNavigation = (() => {



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


        updateNavigation();



    }









    /* ==========================================================
       EVENT HANDLING
       ========================================================== */


    function bindEvents(){



        document.addEventListener(

            "click",

            function(event){



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



                    goNext();



                }






                if(action === "previous"){



                    goPrevious();



                }



            }

        );



    }












    /* ==========================================================
       NEXT
       ========================================================== */


    function goNext(){



        if(currentPage < totalPages){



            currentPage++;




            dispatchPageChange();



        }



    }












    /* ==========================================================
       PREVIOUS
       ========================================================== */


    function goPrevious(){



        if(currentPage > 1){



            currentPage--;




            dispatchPageChange();



        }



    }












    /* ==========================================================
       ROUTER EVENT
       ========================================================== */


    function dispatchPageChange(){



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












    /* ==========================================================
       NAVIGATION VISIBILITY CONTROL
       ========================================================== */


    function updateNavigation(){





        const navigationContainer =

        document.getElementById(

            "app-navigation"

        );








        /*
            PAGE 01

            Welcome page owns CTA.

            Hide global navigator completely.

        */



        if(currentPage === 1){





            if(navigationContainer){



                navigationContainer.style.display = "none";



            }



            updateCounter();


            return;



        }









        /*
            PAGE 02 - 18

            Enable navigator.

        */



        if(navigationContainer){



            navigationContainer.style.display = "block";



        }








        const previousButton =

        document.querySelector(

            "[data-action='previous']"

        );








        if(previousButton){



            previousButton.style.display =

            currentPage === 1

            ?

            "none"

            :

            "inline-flex";



        }








        updateContinueButton();


        updateCounter();





    }












    /* ==========================================================
       CONTINUE BUTTON STATE
       ========================================================== */


    function updateContinueButton(){



        const button =

        document.querySelector(

            "[data-action='continue']"

        );





        if(!button){

            return;

        }








        if(currentPage === totalPages){



            button.innerHTML = `


            <span class="nav-label">

            Complete Journey

            </span>


            <span class="nav-icon">

            ✓

            </span>


            `;



        }

        else {



            button.innerHTML = `


            <span class="nav-label">

            Continue

            </span>


            <span class="nav-icon">

            →

            </span>


            `;



        }



    }












    /* ==========================================================
       COUNTER
       ========================================================== */


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












    /* ==========================================================
       PUBLIC METHODS
       ========================================================== */


    return {


        init,


        updateNavigation,


        getCurrentPage(){

            return currentPage;

        }



    };





})();









/* ==========================================================================
   GLOBAL ACCESS
   ========================================================================== */


window.CTMNavigation = CTMNavigation;
