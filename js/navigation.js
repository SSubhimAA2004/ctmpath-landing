
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.3

   Status      : GLOBAL JOURNEY NAVIGATION ENGINE

   Responsibilities:

   ✓ Control journey movement
   ✓ Manage Previous visibility
   ✓ Manage Continue visibility
   ✓ Update journey counter


   Does NOT:

   ✗ Render page content
   ✗ Handle business logic
   ✗ Handle API processing

   ========================================================================== */



const Navigation = (() => {



    let currentPage = 1;


    const totalPages = 18;







    /* ==========================================================
       INITIALIZE NAVIGATION

       Called AFTER navigation.html loads
       ========================================================== */


    const init = () => {


        bindEvents();


        updateNavigation();


    };









    /* ==========================================================
       EVENT BINDING
       ========================================================== */


    const bindEvents = () => {



        const buttons =

        document.querySelectorAll(

            ".nav-button"

        );





        buttons.forEach(button => {



            button.addEventListener(

                "click",

                handleNavigation

            );



        });



    };









    /* ==========================================================
       BUTTON HANDLER
       ========================================================== */


    const handleNavigation = (event) => {



        const action =

        event.currentTarget

        .dataset

        .action;





        if(action === "previous"){


            goPrevious();


        }





        if(action === "continue"){


            goNext();


        }



    };









    /* ==========================================================
       NEXT PAGE
       ========================================================== */


    const goNext = () => {



        if(currentPage < totalPages){



            currentPage++;



            loadPage(currentPage);



        }



    };









    /* ==========================================================
       PREVIOUS PAGE
       ========================================================== */


    const goPrevious = () => {



        if(currentPage > 1){



            currentPage--;



            loadPage(currentPage);



        }



    };









    /* ==========================================================
       UPDATE BUTTON VISIBILITY
       ========================================================== */


    const updateNavigation = () => {



        const previousButton =

        document.querySelector(

            '[data-action="previous"]'

        );





        const continueButton =

        document.querySelector(

            '[data-action="continue"]'

        );







        /*
            PAGE 01

            No previous destination exists.
        */


        if(previousButton){



            previousButton.style.display =

            currentPage === 1

            ? "none"

            : "inline-flex";



        }







        /*
            FINAL PAGE
        */


        if(continueButton){



            if(currentPage === totalPages){



                continueButton.innerHTML =

                `

                <span class="nav-label">

                Complete Journey

                </span>


                <span class="nav-icon">

                ✓

                </span>


                `;



            }



        }






        updateJourneyCounter();



    };









    /* ==========================================================
       JOURNEY COUNTER
       ========================================================== */


    const updateJourneyCounter = () => {



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



    };









    /* ==========================================================
       PAGE CHANGE EVENT

       app.js handles actual loading
       ========================================================== */


    const loadPage = (pageNumber) => {



        document.dispatchEvent(



            new CustomEvent(

                "ctm-page-change",

                {


                    detail:{


                        page: pageNumber


                    }


                }

            )



        );





        updateNavigation();



    };









    return {



        init,


        updateNavigation,


        getCurrentPage: () => currentPage



    };



})();








/* ==========================================================================
   EXPOSE GLOBAL CONTROLLER

   app.js will initialize this after
   navigation component injection.

   ========================================================================== */


window.CTMNavigation = Navigation;
