
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.2

   Status      : PAGE-AWARE NAVIGATION PATCH

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



    const init = () => {


        bindEvents();


        updateNavigation();


    };







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







    const handleNavigation = (event) => {


        const action =
            event.currentTarget
            .dataset
            .action;



        if(action === "previous") {


            goPrevious();


        }



        if(action === "continue") {


            goNext();


        }


    };







    const goNext = () => {


        if(currentPage < totalPages) {


            currentPage++;


            loadPage(currentPage);


        }


    };







    const goPrevious = () => {


        if(currentPage > 1) {


            currentPage--;


            loadPage(currentPage);


        }


    };








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
            PAGE 01 RULE

            First page has no previous destination.
        */


        if(previousButton) {


            if(currentPage === 1) {


                previousButton.style.display =
                    "none";


            } else {


                previousButton.style.display =
                    "inline-flex";


            }


        }






        /*
            Final page handling
        */


        if(continueButton) {


            if(currentPage === totalPages) {


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








    const updateJourneyCounter = () => {


        const counter =
            document.getElementById(
                "journey-counter"
            );



        if(counter) {


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







    const loadPage = (pageNumber) => {


        /*
            Page loading handled by app.js
            This function only triggers the event.
        */


        document.dispatchEvent(

            new CustomEvent(
                "ctm-page-change",
                {
                    detail:
                    {
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





document.addEventListener(
    "DOMContentLoaded",
    () => {

        Navigation.init();

    }
);
