
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/app.js
 Version     : 1.1

 Purpose:
 Global application controller and page loader.

 Responsibilities:
 - Initialize application
 - Load first journey page
 - Inject page HTML
 - Load page-specific JavaScript

 Rules:
 - No business logic
 - No assessment logic
 - No backend communication

==============================================================================
*/


(function () {


    "use strict";



    /*
    ==========================================================================
       APPLICATION CONFIGURATION
    ==========================================================================
    */


    const CTM_APP = {


        version:

            "1.1",



        name:

            "CTM PATH™ Guided Journey™",



        currentPage:

            null,





        /*
        ----------------------------------------------------------------------
            INITIALIZE APPLICATION
        ----------------------------------------------------------------------
        */


        init:

            async function(){


                console.log(

                    "CTM PATH™ Guided Journey™ initialized."

                );



                await this.loadPage(

                    "pages/welcome.html"

                );



            },







        /*
        ----------------------------------------------------------------------
            LOAD PAGE
        ----------------------------------------------------------------------
        */


        loadPage:

            async function(pagePath){



                const container =

                    document.getElementById(

                        "pageContainer"

                    );





                if(!container){


                    console.error(

                        "CTM PATH™: Page container missing."

                    );


                    return;


                }







                try {



                    const response =

                        await fetch(

                            pagePath

                        );





                    if(!response.ok){


                        throw new Error(

                            "Unable to load page: " +

                            pagePath

                        );


                    }







                    const html =

                        await response.text();







                    container.innerHTML = html;





                    this.currentPage = pagePath;





                    this.initializePageScripts(

                        pagePath

                    );





                }



                catch(error){



                    console.error(

                        "CTM PATH™ Page Loading Error:",

                        error

                    );



                    container.innerHTML =


                        `

                        <div class="error-message">

                            Unable to load journey page.

                        </div>

                        `;



                }




            },









        /*
        ----------------------------------------------------------------------
            LOAD PAGE CONTROLLER
        ----------------------------------------------------------------------
        */


        initializePageScripts:

            function(pagePath){



                if(

                    pagePath.includes(

                        "welcome.html"

                    )

                ){


                    this.loadScript(

                        "js/welcome.js"

                    );


                }







                if(

                    pagePath.includes(

                        "registration.html"

                    )

                ){


                    this.loadScript(

                        "js/registration.js"

                    );


                }



            },









        /*
        ----------------------------------------------------------------------
            DYNAMIC SCRIPT LOADER
        ----------------------------------------------------------------------
        */


        loadScript:

            function(src){



                const existing =

                    document.querySelector(

                        `script[src="${src}"]`

                    );





                if(existing){


                    return;


                }







                const script =

                    document.createElement(

                        "script"

                    );





                script.src = src;



                script.defer = true;



                document.body.appendChild(

                    script

                );



            }





    };









    /*
    ==========================================================================
       GLOBAL ACCESS
    ==========================================================================
    */


    window.CTM_APP = CTM_APP;







    /*
    ==========================================================================
       START APPLICATION
    ==========================================================================
    */


    document.addEventListener(

        "DOMContentLoaded",

        function(){


            CTM_APP.init();



        }

    );



})();

