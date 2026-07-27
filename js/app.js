
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/app.js
 Version     : 1.5

 Purpose:
 Application Shell Controller

 Responsibilities:
 - Load global components
 - Load page HTML
 - Load page CSS
 - Load page JS
 - Manage transitions
 - Manage navigation

 Status:
 🔒 APPLICATION FOUNDATION

==============================================================================
*/


(function(){


"use strict";





const CTM_APP = {



    version:

        "1.5",





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

            "pageContainer missing"

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







        const html =

            await response.text();







        container.innerHTML = html;








        await this.loadHeader();





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

            "CTM PATH™ Loading Error",

            error

        );



    }



},







/*
==============================================================================
 PAGE NAME DETECTOR
==============================================================================
*/


getPageName:

function(path){



    return path

        .split("/")

        .pop()

        .replace(".html","");



},







/*
==============================================================================
 LOAD CSS
==============================================================================
*/


loadCSS:

function(file){



    return new Promise(

        resolve=>{



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





            link.rel="stylesheet";

            link.href=file;





            link.onload=resolve;





            document.head.appendChild(

                link

            );



        }

    );



},







/*
==============================================================================
 LOAD HEADER
==============================================================================
*/


loadHeader:

async function(){



    const existing =

        document.querySelector(

            ".ctm-header"

        );





    if(existing){

        return;

    }







    const response =

        await fetch(

            "components/header.html"

        );







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



    const existing =

        document.querySelector(

            ".ctm-footer"

        );





    if(existing){

        return;

    }







    const response =

        await fetch(

            "components/footer.html"

        );







    const html =

        await response.text();







    document.body.insertAdjacentHTML(

        "beforeend",

        html

    );



},







/*
==============================================================================
 LOAD PAGE SCRIPT
==============================================================================
*/


loadPageScript:

function(pageName){



    return new Promise(

        resolve=>{





            const file =

                "js/" +

                pageName +

                ".js";









            const exists =

                document.querySelector(

                    `script[src="${file}"]`

                );





            if(exists){



                resolve();

                return;


            }







            const script =

                document.createElement(

                    "script"

                );





            script.src=file;





            script.onload=resolve;





            script.onerror=resolve;





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

    ()=>{


        CTM_APP.init();


    }

);





})();

