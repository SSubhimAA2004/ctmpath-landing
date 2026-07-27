
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/app.js
 Version     : 1.3

 Purpose:
 Lightweight application router.

 Responsibilities:
 - Application initialization
 - Dynamic page loading
 - Global footer injection
 - Dependency loading
 - Page controller loading

 Rules:
 - No business logic
 - No backend logic
 - No assessment logic

 Status:
 🔒 Global Footer Integration

==============================================================================
*/


(function () {


    "use strict";





    const CTM_APP = {



        version:

            "1.3",



        currentPage:

            null,







        /*
        ----------------------------------------------------------------------
           INITIALIZE
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





                    const html =

                        await response.text();





                    container.innerHTML = html;





                    await this.loadFooter();





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
           FOOTER LOADER
        ----------------------------------------------------------------------
        */


        loadFooter:

            async function(){



                const footerResponse =

                    await fetch(

                        "components/footer.html"

                    );





                if(!footerResponse.ok){



                    console.warn(

                        "CTM PATH™ Footer unavailable."

                    );



                    return;



                }







                const footerHTML =

                    await footerResponse.text();







                const footerContainer =

                    document.createElement(

                        "div"

                    );





                footerContainer.innerHTML =

                    footerHTML;







                document

                    .getElementById(

                        "pageContainer"

                    )

                    .appendChild(

                        footerContainer

                    );



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

                    function(resolve,reject){



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









    window.CTM_APP = CTM_APP;







    document.addEventListener(

        "DOMContentLoaded",

        function(){



            CTM_APP.init();



        }

    );



})();

