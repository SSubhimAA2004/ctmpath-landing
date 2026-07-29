
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/navigation.js
   Version     : 2.5

   Status      : PAGE 01 GATEWAY LOCK

   Purpose:

   Global journey navigation controller.


   Responsibilities:

   ✓ Control journey movement
   ✓ Manage Previous visibility
   ✓ Manage Continue visibility
   ✓ Update journey counter
   ✓ Dispatch page change events
   ✓ Protect Page 01 gateway experience


   Does NOT:

   ✗ Render pages
   ✗ Load HTML
   ✗ Handle API
   ✗ Handle assessment logic


   Architecture Rule:

   PAGE 01 = Gateway Experience

   Pages 02-18 = Guided Journey Flow


   ========================================================================== */


const Navigation = (() => {



    let currentPage = 1;


    const totalPages = 18;





    /* ==========================================================
       INITIALIZE
       ========================================================== */


    function init(){


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


                    goPrevious();


                }





                if(action === "continue"){


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



            loadPage(
                currentPage
            );



        }


    }









    /* ==========================================================
       PREVIOUS PAGE
       ========================================================== */


    function goPrevious(){



        if(currentPage > 1){



            currentPage--;



            loadPage(
                currentPage
            );


        }


    }









    /* ==========================================================
       PAGE CHANGE EVENT
       ========================================================== */


    function loadPage(pageNumber){



        document.dispatchEvent(


            new CustomEvent(

                "ctm-page-change",

                {

                    detail:{


                        page:pageNumber


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



        const navigation =

        document.getElementById(

            "app-navigation"

        );






        /*
            PAGE 01

            Welcome gateway.

            No global navigator.
        */


        if(currentPage === 1){



            if(navigation){



                navigation.classList.add(

                    "hidden"

                );



                navigation.style.display =

                "none";



            }



            updateCounter();



            return;


        }








        /*
            PAGE 02 - 18

            Enable navigator.
        */


        if(navigation){



            navigation.classList.remove(

                "hidden"

            );



            navigation.style.display =

            "flex";



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


        updateNavigation,


        getCurrentPage(){


            return currentPage;


        }



    };



})();









document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        Navigation.init();


    }


);
