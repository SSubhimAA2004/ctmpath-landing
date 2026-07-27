
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/app.js
 Version     : 1.7

 Purpose:
 Application Shell Controller

 Updates:
 - Global header enabled for all pages
 - Unified brand experience
 - Dynamic asset loading
 - Page transition management

 Status:
 🔒 GLOBAL BRAND ARCHITECTURE

==============================================================================
*/


(function(){


"use strict";



const CTM_APP = {


    version:

        "1.7",


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








        await this.loadCSS(

            "css/" + pageName + ".css"

        );









        const response =

            await fetch(

                pagePath

            );





        if(!response.ok){


            throw new Error(

                "Unable to load " + pagePath

            );


        }






        const html =

            await response.text();







        container.innerHTML = html;









        /*
        --------------------------------------------------------------
        GLOBAL BRAND HEADER
        --------------------------------------------------------------
        */


        await this.loadHeader();








        /*
        --------------------------------------------------------------
        GLOBAL FOOTER
        --------------------------------------------------------------
        */


        await this.loadFooter();









        this.currentPage =

            pagePath;








        await this.loadPageScript(

            pageName

        );








        window.scrollTo({


            top:0,


            behavior:"smooth"


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
 HEADER LOADER
==============================================================================
*/


loadHeader:

async function(){


    const existing =

        document.querySelector(

            ".ctm-header"

        );





    if(existing){


        existing.remove();


    }






    const response =

        await fetch(

            "components/header.html"

        );






    if(!response.ok){


        console.warn(

            "Header component missing."

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
 FOOTER LOADER
==============================================================================
*/


loadFooter:

async function(){


    const existing =

        document.querySelector(

            ".ctm-footer"

        );





    if(existing){


        existing.remove();


    }






    const response =

        await fetch(

            "components/footer.html"

        );






    if(!response.ok){


        console.warn(

            "Footer component missing."

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






        script.src = file;


        script.onload = resolve;


        script.onerror = resolve;



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

