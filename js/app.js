
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/app.js
   Version     : 2.5

   Status      : FRAGMENT ROUTER COMPATIBILITY PATCH


   Responsibilities:

   ✓ Application bootstrap
   ✓ Component loading
   ✓ Fragment page loading
   ✓ Journey state


   Does NOT:

   ✗ API processing
   ✗ Database logic
   ✗ Assessment logic


   ========================================================================== */


const CTMApp = (() => {



    const CONFIG = {


        initialPage:

        "welcome",



        currentPage:

        1,



        totalPages:

        18,



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



        initialisePage();



    }









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

        id,

        path

    ){



        const element =

        document.getElementById(id);





        if(!element){

            console.warn(

                "Missing component:",

                id

            );

            return;

        }







        try{


            const response =

            await fetch(path);





            if(!response.ok){

                throw new Error(path);

            }





            element.innerHTML =

            await response.text();



        }


        catch(error){


            console.error(

                "Component failed:",

                error

            );


        }



    }









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








        try{



            const response =

            await fetch(

                `pages/${pageName}.html`

            );





            if(!response.ok){

                throw new Error(

                    `Page missing: ${pageName}`

                );

            }





            container.innerHTML =

            await response.text();





            initialisePage();





        }



        catch(error){



            console.error(

                "Page loading failed:",

                error

            );



            container.innerHTML =

            `

            <div class="error-message">

            Journey page unavailable.

            </div>

            `;



        }



    }









    function initialisePage(){



        window.scrollTo(

            0,

            0

        );







        if(

            window.Navigation

        ){



            Navigation.updateNavigation();



        }








        const pageEvent =

        new CustomEvent(

            "ctm-page-loaded",

            {

                detail:{


                    page:

                    CONFIG.currentPage


                }

            }

        );





        document.dispatchEvent(

            pageEvent

        );



    }









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









    return {



        init,


        loadPage,


        startJourney


    };



})();









document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        CTMApp.init();


    }

);









window.CTMApp = CTMApp;
