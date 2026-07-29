
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/navigation.js
   Version     : 2.9

   Status      : APP 2.5 COMPATIBILITY PATCH


   Purpose:

   Global journey navigation controller.


   Responsibilities:

   ✓ Previous control
   ✓ Continue control
   ✓ Page state
   ✓ Navigation visibility


   Does NOT:

   ✗ Render pages
   ✗ Handle business logic


   ========================================================================== */


const Navigation = (() => {



    let currentPage = 1;


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





                if(action === "previous"){



                    previous();



                }





                if(action === "continue"){



                    next();



                }



            }

        );



    }









    function next(){



        if(currentPage >= totalPages){

            return;

        }



        setPage(

            currentPage + 1

        );



    }









    function previous(){



        if(currentPage <= 1){

            return;

        }



        setPage(

            currentPage - 1

        );



    }









    function setPage(page){



        currentPage = page;



        updateNavigation();





        document.dispatchEvent(



            new CustomEvent(

                "ctm-page-change",

                {


                    detail:{


                        page:page


                    }


                }

            )



        );



    }









    function updateNavigation(){



        const navigation =

        document.getElementById(

            "app-navigation"

        );





        if(!navigation){

            return;

        }







        /*
            PAGE 01

            Welcome page owns CTA.

        */


        if(currentPage === 1){



            navigation.style.display =

            "none";



        }



        else {



            navigation.style.display =

            "flex";



        }








        const previousButton =

        navigation.querySelector(

            "[data-action='previous']"

        );





        if(previousButton){



            previousButton.style.visibility =



            currentPage <= 2

            ?

            "hidden"

            :

            "visible";



        }







        updateCounter();



    }









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


        updateNavigation,


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



    }

);
