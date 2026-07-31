
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * Component Loader
 * --------------------------------------------------------------
 * Version : 1.0 (Working MVP)
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Load Header Component
 * ✓ Load Footer Component
 * ✓ Inject Shared HTML
 *
 * Never
 * --------------------------------------------------------------
 * ✗ Routing
 * ✗ Page Logic
 * ✗ Assessment Logic
 * ✗ State Management
 *
 * ==============================================================
 */


window.CTM = window.CTM || {};


/* ==============================================================
   COMPONENT LOADER
============================================================== */


CTM.ComponentLoader = {


    async loadComponents() {


        await this.loadHeader();


        await this.loadFooter();


        console.log(

            "CTM PATH™ Components Loaded."

        );


    },



    /* ==========================================================
       HEADER
    ========================================================== */


    async loadHeader() {


        const target = document.querySelector(

            "#header-container"

        );


        if (!target) {


            console.warn(

                "Header container not found."

            );


            return;


        }



        await this.load(

            "components/header.html",

            target

        );


    },



    /* ==========================================================
       FOOTER
    ========================================================== */


    async loadFooter() {


        const target = document.querySelector(

            "#footer-container"

        );


        if (!target) {


            console.warn(

                "Footer container not found."

            );


            return;


        }



        await this.load(

            "components/footer.html",

            target

        );


    },



    /* ==========================================================
       GENERIC HTML LOADER
    ========================================================== */


    async load(url, target) {


        try {


            const response = await fetch(

                url

            );



            if (!response.ok) {


                throw new Error(

                    `Unable to load ${url}`

                );


            }



            target.innerHTML = await response.text();



        }


        catch(error) {


            console.error(

                "Component loading failed:",

                error

            );


        }


    }


};

