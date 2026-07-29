
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.4

   Status      : PAGE VISIBILITY + ROUTER READY


   Responsibilities:

   ✓ Journey movement control
   ✓ Navigation visibility
   ✓ Journey counter update
   ✓ Router event dispatch


   Does NOT:

   ✗ Load HTML pages
   ✗ Handle assessment
   ✗ Handle API


   ========================================================================== */



const CTMNavigation = (() => {



    let currentPage = 1;


    const totalPages = 18;



    let initialized = false;








    /* ==========================================================
       INITIALIZATION
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

            (event)=>{



                const button =

                event.target.closest(

                    "[data-action]"

                );





                if(!button){

                    return;

                }







                const action =

                button.dataset.action;







                if(action==="previous"){



                    goPrevious();



                }






                if(action==="continue"){



                    goNext();



                }





            }

        );



    }









    /* ==========================================================
       NEXT PAGE
       ========================================================== */


    function goNext(){



        if(currentPage < totalPages){



            currentPage++;




            dispatchPageChange();




        }



    }









    /* ==========================================================
       PREVIOUS PAGE
       ========================================================== */


    function goPrevious(){



        if(currentPage > 1){



            currentPage--;




            dispatchPageChange();




        }



    }









    /* ==========================================================
       SEND ROUTER EVENT
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
       UPDATE NAVIGATION UI
       ========================================================== */


    function updateNavigation(){



        const previous =

        document.querySelector(

            "[data-action='previous']"

        );




        const continueButton =

        document.querySelector(

            "[data-action='continue']"

        );







        /*
          PAGE 01

          No previous destination
        */



        if(previous){



            previous.style.display =

            currentPage === 1

            ?

            "none"

            :

            "inline-flex";



        }









        /*
          FINAL PAGE
        */



        if(continueButton){



            if(currentPage===totalPages){



                continueButton.innerHTML = `

                <span class="nav-label">

                Complete Journey

                </span>


                <span class="nav-icon">

                ✓

                </span>


                `;



            }



        }







        updateCounter();



    }









    /* ==========================================================
       JOURNEY COUNTER
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
       PUBLIC API
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
   GLOBAL ACCESS FOR app.js
   ========================================================================== */


window.CTMNavigation = CTMNavigation;
