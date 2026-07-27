
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/app.js
 Version     : 1.2

 Purpose:
 Lightweight application router.

 Responsibilities:
 - Application initialization
 - Dynamic page loading
 - Dependency loading
 - Page controller initialization

 Rules:
 - No business logic
 - No backend logic
 - No scoring logic

==============================================================================
*/


(function () {


    "use strict";



    /*
    ==========================================================================
       APPLICATION OBJECT
    ==========================================================================
    */


    const CTM_APP = {



        version:

            "1.2",



        currentPage:

            null,





        /*
        ----------------------------------------------------------------------
           INIT
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

                        "CTM PATH™: pageContainer missing."

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

                            "Page not found: " +

                            pagePath

                        );


                    }






                    const html =

                        await response.text();





                    container.innerHTML = html;



                    this.currentPage = pagePath;






                    await this.initializePage(

                        pagePath

                    );





                }



                catch(error){



                    console.error(

                        "CTM PATH™ Router Error:",

                        error

                    );



                }



            },









        /*
        ----------------------------------------------------------------------
           PAGE INITIALIZATION
        ----------------------------------------------------------------------
        */


        initializePage:

            async function(pagePath){



                if(

                    pagePath.includes(

                        "welcome.html"

                    )

                ){


                    await this.loadScript(

                        "js/welcome.js"

                    );


                }








                if(

                    pagePath.includes(

                        "registration.html"

                    )

                ){



                    await this.loadScript(

                        "js/api.js"

                    );



                    await this.loadScript(

                        "js/storage.js"

                    );



                    await this.loadScript(

                        "js/registration.js"

                    );


                }



            },









        /*
        ----------------------------------------------------------------------
           SCRIPT LOADER
        ----------------------------------------------------------------------
        */


        loadScript:

            function(src){



                return new Promise(

                    function(resolve, reject){





                        const existing =

                            document.querySelector(

                                `script[src="${src}"]`

                            );





                        if(existing){


                            resolve();


                            return;


                        }








                        const script =

                            document.createElement(

                                "script"

                            );






                        script.src = src;



                        script.onload = resolve;



                        script.onerror = reject;



                        document.body.appendChild(

                            script

                        );





                    }

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
       APPLICATION START
    ==========================================================================
    */


    document.addEventListener(

        "DOMContentLoaded",

        function(){


            CTM_APP.init();



        }

    );



})();

