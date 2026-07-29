
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.4

   Status      : PAGE VISIBILITY + ROUTER READY


   Responsibilities:

   ✓ Control journey movement
   ✓ Manage Previous visibility
   ✓ Manage Continue visibility
   ✓ Update journey counter
   ✓ Control navigator visibility by page


   Does NOT:

   ✗ Render page content
   ✗ Handle business logic
   ✗ Handle API processing


   ========================================================================== */



const Navigation = (() => {



    let currentPage = 1;


    const totalPages = 18;







    /* ==========================================================
       INITIALIZE
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
       BUTTON ACTIONS
       ========================================================== */


    const handleNavigation = (event) => {



        const action =

        event.currentTarget.dataset.action;





        if(action === "previous"){


            goPrevious();


        }





        if(action === "continue"){


            goNext();


        }



    };









    /* ==========================================================
       NEXT
       ========================================================== */


    const goNext = () => {



        if(currentPage < totalPages){



            currentPage++;



            loadPage(currentPage);



        }



    };









    /* ==========================================================
       PREVIOUS
       ========================================================== */


    const goPrevious = () => {



        if(currentPage > 1){



            currentPage--;



            loadPage(currentPage);



        }



    };









    /* ==========================================================
       NAVIGATION DISPLAY CONTROL
       ========================================================== */


    const updateNavigation = () => {



        const navigation =

        document.querySelector(

            ".navigation"

        );





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

            Welcome page has its own CTA.

            Global navigation hidden.
        */


        if(navigation){



            navigation.style.display =

            currentPage === 1

            ? "none"

            : "flex";



        }







        /*
            Previous button

            Hidden only on first journey step.
        */


        if(previousButton){



            previousButton.style.display =

            currentPage === 1

            ? "none"

            : "inline-flex";



        }







        /*
            Final page handling
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
       PAGE EVENT TO APP ROUTER
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









    /* ==========================================================
       PUBLIC API
       ========================================================== */


    return {



        init,


        updateNavigation,


        goNext,


        goPrevious,


        getCurrentPage: () => currentPage



    };



})();








/* ==========================================================================
   GLOBAL EXPOSURE

   app.js initializes after component loading.

   ========================================================================== */


window.CTMNavigation = Navigation;
