
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : navigation.js
   Version     : 2.1

   Purpose:

   Central journey navigation controller.

   Responsibilities:

   • Move between journey pages
   • Load page content
   • Update progress indicator
   • Handle CTA navigation
   • Reset scroll position

   Does NOT:

   • Handle assessments
   • Handle scoring
   • Handle backend data

   ========================================================================== */





const CTMNavigation = (() => {



    const state = {


        currentPage: 1,


        totalPages: 18,


        isLoading: false,


        loadedScripts: []



    };








    const pages = [


        "welcome",


        "registration",


        "assessment-01",


        "assessment-02",


        "assessment-03",


        "assessment-04",


        "assessment-05",


        "assessment-06",


        "assessment-07",


        "assessment-08",


        "assessment-09",


        "assessment-10",


        "kala-chakra",


        "diagnosis",


        "prescription",


        "review",


        "commitment",


        "cta"


    ];









    /* ==========================================================
       INITIALIZATION
       ========================================================== */


    function init(){


        bindEvents();


        updateJourneyCounter();



    }









    /* ==========================================================
       EVENT BINDING

       Handles:

       Begin My Guided Journey™

       ========================================================== */


    function bindEvents(){



        document.addEventListener(

            "click",

            function(event){



                const button = event.target.closest(

                    "[data-action='next-page']"

                );



                if(!button){


                    return;


                }



                event.preventDefault();



                nextPage();



            }


        );



    }









    /* ==========================================================
       NEXT PAGE
       ========================================================== */


    function nextPage(){



        if(state.isLoading){


            return;


        }




        if(
            state.currentPage >= state.totalPages
        ){


            return;


        }




        state.currentPage++;



        loadPage(
            state.currentPage
        );



    }









    /* ==========================================================
       PAGE LOADER
       ========================================================== */


    async function loadPage(pageNumber){



        state.isLoading = true;



        const pageName = pages[
            pageNumber - 1
        ];



        const container =
            document.getElementById(
                "app-content"
            );



        if(!container){



            state.isLoading = false;


            return;


        }





        try {



            const response = await fetch(

                `pages/${pageName}.html`

            );



            if(!response.ok){


                throw new Error(

                    "Page not found"

                );


            }




            const html =
                await response.text();




            container.innerHTML = html;





            updateJourneyCounter();



            scrollToTop();




            loadPageScript(
                pageName
            );





        }

        catch(error){



            console.error(

                "Navigation error:",

                error

            );



        }

        finally {



            state.isLoading = false;



        }



    }









    /* ==========================================================
       PAGE SCRIPT LOADER
       ========================================================== */


    function loadPageScript(pageName){



        const scriptPath =

            `js/pages/${pageName}.js`;





        if(
            state.loadedScripts.includes(
                scriptPath
            )
        ){


            return;


        }





        const script =

            document.createElement(
                "script"
            );




        script.src = scriptPath;


        script.defer = true;



        document.body.appendChild(
            script
        );




        state.loadedScripts.push(
            scriptPath
        );



    }









    /* ==========================================================
       JOURNEY COUNTER UPDATE
       ========================================================== */


    function updateJourneyCounter(){



        const counter =

            document.getElementById(
                "journey-counter"
            );




        if(!counter){


            return;


        }





        counter.textContent =


            String(
                state.currentPage
            )
            .padStart(
                2,
                "0"
            )

            +

            " / "

            +

            state.totalPages;



    }









    /* ==========================================================
       SCROLL RESET
       ========================================================== */


    function scrollToTop(){



        window.scrollTo({

            top: 0,


            left: 0,


            behavior: "smooth"


        });



    }









    /* ==========================================================
       PUBLIC API
       ========================================================== */


    return {


        init,


        nextPage,


        loadPage,


        scrollToTop



    };



})();








/* ==========================================================================
   START CONTROLLER

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){



        CTMNavigation.init();



    }

);
