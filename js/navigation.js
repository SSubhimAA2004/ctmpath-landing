
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/navigation.js
   Version     : 2.7

   Status      : 🔒 PAGE 01 GATEWAY PROTECTION


   Purpose:

   Global journey navigation controller.


   Architecture Rule:

   PAGE 01

   Welcome Gateway

   No Global Navigation


   PAGE 02 - PAGE 18

   Guided Journey Navigation Active


   Responsibilities:

   ✓ Previous control
   ✓ Continue control
   ✓ Journey counter
   ✓ Navigation state


   Does NOT:

   ✗ Render pages
   ✗ Load pages
   ✗ Call backend


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



        updateNavigation();



    }









    /* ==========================================================
       EVENT BINDING
       ========================================================== */


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







                if(action === "previous"){



                    previous();



                }








                if(action === "continue"){



                    next();



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





        currentPage++;





        dispatchPageChange();





    }









    /* ==========================================================
       PREVIOUS
       ========================================================== */


    function previous(){



        if(currentPage <= 2){

            return;

        }





        currentPage--;





        dispatchPageChange();





    }









    /* ==========================================================
       DISPATCH ROUTER EVENT
       ========================================================== */


    function dispatchPageChange(){



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





        updateNavigation();





    }









    /* ==========================================================
       PAGE STATE CONTROL
       ========================================================== */


    function setPage(page){



        currentPage = page;



        updateNavigation();



    }









    /* ==========================================================
       NAVIGATION VISIBILITY
       ========================================================== */


    function updateNavigation(){



        const container =

        document.getElementById(

            "app-navigation"

        );





        if(!container){

            return;

        }








        /*
            PAGE 01 LOCK

            Gateway screen.

            Hide completely.

        */


        if(currentPage === 1){



            container.style.display =

            "none";



            updateCounter();



            return;

        }









        /*
            PAGE 02-18

            Enable journey navigation.

        */


        container.style.display =

        "flex";







        const previousButton =

        document.querySelector(

            "[data-action='previous']"

        );





        if(previousButton){



            previousButton.style.display =

            currentPage <= 2

            ?

            "none"

            :

            "inline-flex";



        }






        updateContinueState();



        updateCounter();



    }









    /* ==========================================================
       CONTINUE STATE
       ========================================================== */


    function updateContinueState(){



        const continueButton =

        document.querySelector(

            "[data-action='continue']"

        );





        if(!continueButton){

            return;

        }







        if(currentPage === totalPages){



            continueButton.innerHTML = `


                <span class="nav-label">

                    Complete Journey

                </span>


                <span class="nav-icon">

                    ✓

                </span>


            `;



        }

        else {



            continueButton.innerHTML = `


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









    return {



        init,


        setPage,


        updateNavigation,


        getCurrentPage(){


            return currentPage;


        }



    };





})();









/* ==========================================================================
   GLOBAL ACCESS
   ========================================================================== */


window.Navigation = Navigation;
