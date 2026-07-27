
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/app.js
 Version     : 1.8

 Purpose:
 Application Shell Controller

 Responsibilities:
 - Page loading
 - Global header lifecycle
 - Global footer lifecycle
 - Dynamic CSS loading
 - Dynamic JS loading
 - Page transitions
 - Scroll management

 Status:
 🔒 GLOBAL APPLICATION SHELL

==============================================================================
*/


(function(){


"use strict";





const CTM_APP = {





    version:

        "1.8",





    currentPage:

        null,









/*
==============================================================================
 INITIALIZE
==============================================================================
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
==============================================================================
 LOAD PAGE
==============================================================================
*/


loadPage:

async function(pagePath){



    const container =

        document.getElementById(

            "pageContainer"

        );





    if(!container){



        console.error(

            "CTM PATH™ pageContainer missing."

        );



        return;


    }







    try {



        container.classList.add(

            "page-loading"

        );









        const pageName =

            this.getPageName(

                pagePath

            );









        /*
        --------------------------------------------------------------
        CLEAN PREVIOUS COMPONENTS
        --------------------------------------------------------------
        */


        this.removeGlobalComponents();









        /*
        --------------------------------------------------------------
        LOAD PAGE CSS
        --------------------------------------------------------------
        */


        await this.loadCSS(

            "css/" + pageName + ".css"

        );









        /*
        --------------------------------------------------------------
        LOAD PAGE HTML
        --------------------------------------------------------------
        */


        const response =

            await fetch(

                pagePath

            );







        if(!response.ok){



            throw new Error(

                "Unable to load page: "

                +

                pagePath

            );



        }







        const html =

            await response.text();








        container.innerHTML = html;









        /*
        --------------------------------------------------------------
        LOAD GLOBAL BRAND SYSTEM
        --------------------------------------------------------------
        */


        await this.loadHeader();


        await this.loadFooter();









        this.currentPage =

            pagePath;









        /*
        --------------------------------------------------------------
        LOAD PAGE CONTROLLER
        --------------------------------------------------------------
        */


        await this.loadPageScript(

            pageName

        );









        /*
        --------------------------------------------------------------
        RESET VIEWPORT
        --------------------------------------------------------------
        */


        window.scrollTo({



            top:

                0,



            behavior:

                "smooth"



        });









        setTimeout(()=>{


            container.classList.remove(

                "page-loading"

            );



        },300);








    }


    catch(error){



        console.error(

            "CTM PATH™ Application Error:",

            error

        );



    }



},







/*
==============================================================================
 REMOVE GLOBAL COMPONENTS
==============================================================================
*/


removeGlobalComponents:

function(){



    const header =

        document.querySelector(

            ".ctm-header"

        );





    if(header){



        header.remove();



    }







    const footer =

        document.querySelector(

            ".ctm-footer"

        );





    if(footer){



        footer.remove();



    }



},







/*
==============================================================================
 PAGE NAME
==============================================================================
*/


getPageName:

function(path){



    return path

        .split("/")

        .pop()

        .replace(

            ".html",

            ""

        );



},







/*
==============================================================================
 LOAD HEADER
==============================================================================
*/


loadHeader:

async function(){



    const response =

        await fetch(

            "components/header.html"

        );







    if(!response.ok){



        console.warn(

            "CTM PATH™ Header unavailable."

        );



        return;


    }







    const html =

        await response.text();







    document.body.insertAdjacentHTML(

        "afterbegin",

        html

    );



},







/*
==============================================================================
 LOAD FOOTER
==============================================================================
*/


loadFooter:

async function(){



    const response =

        await fetch(

            "components/footer.html"

        );







    if(!response.ok){



        console.warn(

            "CTM PATH™ Footer unavailable."

        );



        return;


    }







    const html =

        await response.text();







    document.body.insertAdjacentHTML(

        "beforeend",

        html

    );



},







/*
==============================================================================
 CSS LOADER
==============================================================================
*/


loadCSS:

function(file){



    return new Promise(resolve=>{





        const exists =

            document.querySelector(

                `link[href="${file}"]`

            );







        if(exists){



            resolve();


            return;



        }







        const link =

            document.createElement(

                "link"

            );







        link.rel =

            "stylesheet";







        link.href =

            file;







        link.onload =

            resolve;







        link.onerror =

            resolve;







        document.head.appendChild(

            link

        );



    });



},







/*
==============================================================================
 PAGE SCRIPT LOADER
==============================================================================
*/


loadPageScript:

function(pageName){



    return new Promise(resolve=>{





        const file =

            "js/" +

            pageName +

            ".js";








        const existing =

            document.querySelector(

                `script[src="${file}"]`

            );







        if(existing){



            resolve();


            return;



        }







        const script =

            document.createElement(

                "script"

            );







        script.src =

            file;







        script.onload =

            resolve;







        script.onerror =

            resolve;







        document.body.appendChild(

            script

        );



    });



}





};







window.CTM_APP = CTM_APP;







document.addEventListener(

    "DOMContentLoaded",

    ()=>{



        CTM_APP.init();



    }

);





})();

