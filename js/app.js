
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/app.js
   Version     : 2.6

   Status      : PAGE MODULE INITIALIZER PATCH


   Purpose:

   Core application bootstrap controller.


   Responsibilities:

   ✓ Initialize application
   ✓ Load global components
   ✓ Load journey pages
   ✓ Initialize page modules


   Does NOT:

   ✗ API processing
   ✗ Business logic
   ✗ Assessment logic


   ========================================================================== */


const CTMApp = (() => {





    const CONFIG = {


        initialPage:

        "welcome",



        currentPage:

        1,



        components:{



            header:

            "components/header.html",



            footer:

            "components/footer.html",



            navigation:

            "components/navigation.html"



        }


    };





    let started = false;









    /* ==========================================================
       APPLICATION START
       ========================================================== */


    async function init(){



        if(started){

            return;

        }



        started = true;





        await loadGlobalComponents();





        await loadPage(

            CONFIG.initialPage

        );





        hideNavigation();





    }









    /* ==========================================================
       LOAD GLOBAL COMPONENTS
       ========================================================== */


    async function loadGlobalComponents(){



        await loadComponent(

            "app-header",

            CONFIG.components.header

        );



        await loadComponent(

            "app-navigation",

            CONFIG.components.navigation

        );



        await loadComponent(

            "app-footer",

            CONFIG.components.footer

        );



    }









    async function loadComponent(

        elementId,

        filePath

    ){



        const container =

        document.getElementById(

            elementId

        );





        if(!container){

            return;

        }







        try {



            const response =

            await fetch(filePath);





            if(!response.ok){



                throw new Error(

                    filePath

                );



            }





            container.innerHTML =

            await response.text();



        }



        catch(error){



            console.error(

                "Component loading failed:",

                error

            );



        }



    }









    /* ==========================================================
       PAGE LOADING
       ========================================================== */


    async function loadPage(

        pageName

    ){



        const container =

        document.getElementById(

            "app-content"

        );





        if(!container){



            console.error(

                "Missing #app-content"

            );



            return;

        }







        try {



            const response =

            await fetch(

                `pages/${pageName}.html`

            );





            if(!response.ok){



                throw new Error(

                    `Page not found: ${pageName}`

                );



            }





            container.innerHTML =

            await response.text();







            initializePageModule(

                pageName

            );





            document.dispatchEvent(



                new CustomEvent(

                    "ctm-page-loaded",

                    {

                        detail:{


                            page:pageName


                        }

                    }

                )



            );



        }



        catch(error){



            console.error(

                "Page loading failed:",

                error

            );



        }



    }









    /* ==========================================================
       PAGE MODULE INITIALIZER
       ========================================================== */


    function initializePageModule(

        pageName

    ){



        switch(pageName){





            case "welcome":



                if(

                    window.Welcome &&

                    Welcome.init

                ){



                    Welcome.init();



                }



            break;








            case "registration":



                if(

                    window.Registration &&

                    Registration.init

                ){



                    Registration.init();



                }



            break;





        }



    }









    /* ==========================================================
       JOURNEY CONTROL
       ========================================================== */


    function startJourney(){



        CONFIG.currentPage = 2;





        showNavigation();





        loadPage(

            "registration"

        );





        if(window.Navigation){



            Navigation.setPage(

                2

            );



        }



    }









    /* ==========================================================
       NAVIGATION VISIBILITY
       ========================================================== */


    function hideNavigation(){



        const nav =

        document.getElementById(

            "app-navigation"

        );





        if(nav){



            nav.style.display =

            "none";



        }



    }









    function showNavigation(){



        const nav =

        document.getElementById(

            "app-navigation"

        );





        if(nav){



            nav.style.display =

            "flex";



        }



    }









    return {



        init,


        loadPage,


        startJourney



    };





})();









window.CTMApp = CTMApp;









document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        CTMApp.init();



    }

);
