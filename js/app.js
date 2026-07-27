
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/app.js
 Version     : 1.4

 Purpose:
 Lightweight application router.

 Responsibilities:
 - Application initialization
 - Dynamic page loading
 - Global footer injection
 - Page controller loading
 - Scroll management
 - Page transition effect

 Status:
 🔒 Runtime Experience Upgrade

==============================================================================
*/


(function () {


    "use strict";





    const CTM_APP = {



        version:

            "1.4",



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

                        "CTM PATH™: pageContainer missing."

                    );



                    return;



                }








                try {





                    /*
                    Start transition
                    */


                    container.classList.add(

                        "page-loading"

                    );









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







                    /*
                    Replace content
                    */


                    container.innerHTML = html;









                    /*
                    Load global footer
                    */


                    await this.loadFooter();









                    /*
                    Update current page
                    */


                    this.currentPage = pagePath;









                    /*
                    Initialise page controller
                    */


                    await this.initializePage(

                        pagePath

                    );









                    /*
                    Return visitor to top
                    */


                    window.scrollTo({


                        top:

                            0,


                        behavior:

                            "smooth"


                    });









                    /*
                    End transition
                    */


                    setTimeout(

                        function(){



                            container.classList.remove(

                                "page-loading"

                            );



                        },

                        300

                    );







                }

                catch(error){



                    console.error(

                        "CTM PATH™ Router Error:",

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
            PAGE CONTROLLER LOADER
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

