
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : component-loader.js
   Version   : 3.1
   Status    : PRODUCTION

   Architecture:
   STATIC MULTI-PAGE GUIDED JOURNEY

   Pages:
   /pages/page02.html
   /pages/page03.html
   /pages/page04.html
   /pages/page05.html
   /pages/page06.html
   /pages/page07.html

   Responsibilities:

   ✓ Load Global Header
   ✓ Load Global Footer
   ✓ Inject Shared Components
   ✓ Load Component Stylesheets
   ✓ Load Header Controller
   ✓ Resolve component paths from site root
   ✓ Support Pages 02–07 consistently

   Does NOT:

   ✗ Route pages
   ✗ Load page content
   ✗ Call backend APIs
   ✗ Contain business logic
   ✗ Contain assessment logic

   ========================================================================== */


(function () {

    "use strict";


    /* ======================================================================
       ROOT PATHS
       ====================================================================== */

    const COMPONENT_PATH = {

        header:
            "/components/header.html",

        footer:
            "/components/footer.html"

    };


    const STYLE_PATH = {

        header:
            "/css/header.css"

    };


    const SCRIPT_PATH = {

        header:
            "/js/header.js"

    };


    /* ======================================================================
       LOAD STYLESHEET
       ====================================================================== */


    function loadStyle(file) {

        return new Promise(
            function (resolve, reject) {


                /*
                 * Prevent duplicate stylesheet loading.
                 */

                const existing =
                    document.querySelector(
                        'link[href="' + file + '"]'
                    );


                if (existing) {

                    resolve(true);

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
                    function () {

                        console.log(
                            "CTM Stylesheet loaded:",
                            file
                        );

                        resolve(true);

                    };


                link.onerror =
                    function () {

                        const error =
                            new Error(
                                "Stylesheet loading failed: " +
                                file
                            );


                        console.error(
                            error
                        );


                        reject(
                            error
                        );

                    };


                document.head.appendChild(
                    link
                );

            }
        );

    }


    /* ======================================================================
       LOAD HTML COMPONENT
       ====================================================================== */


    async function loadComponent(
        selector,
        file
    ) {

        const container =
            document.querySelector(selector);


        if (!container) {

            console.warn(
                "CTM Component container missing:",
                selector
            );

            return false;

        }


        try {

            const response =
                await fetch(
                    file,
                    {
                        cache:
                            "no-cache"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Unable to load component: " +
                    file +
                    " — HTTP " +
                    response.status
                );

            }


            const html =
                await response.text();


            container.innerHTML =
                html;


            console.log(
                "CTM Component loaded:",
                file
            );


            return true;

        }


        catch (error) {

            console.error(
                "CTM Component loading failed:",
                file,
                error
            );


            return false;

        }

    }


    /* ======================================================================
       LOAD JAVASCRIPT CONTROLLER
       ====================================================================== */


    function loadScript(file) {

        return new Promise(
            function (resolve, reject) {


                /*
                 * Prevent duplicate loading.
                 */

                const existing =
                    document.querySelector(
                        'script[src="' + file + '"]'
                    );


                if (existing) {

                    resolve(true);

                    return;

                }


                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    file;


                script.async =
                    false;


                script.onload =
                    function () {

                        console.log(
                            "CTM Script loaded:",
                            file
                        );

                        resolve(true);

                    };


                script.onerror =
                    function () {

                        const error =
                            new Error(
                                "Script loading failed: " +
                                file
                            );


                        console.error(
                            error
                        );


                        reject(
                            error
                        );

                    };


                document.body.appendChild(
                    script
                );

            }
        );

    }


    /* ======================================================================
       LOAD HEADER
       ====================================================================== */


    async function loadHeader() {

        try {


            /*
             * STEP 1
             *
             * Load canonical header stylesheet first.
             *
             * This guarantees that when header.html is injected,
             * its layout is immediately governed by header.css.
             */

            await loadStyle(
                STYLE_PATH.header
            );


            /*
             * STEP 2
             *
             * Inject header component.
             */

            const loaded =
                await loadComponent(
                    "#global-header",
                    COMPONENT_PATH.header
                );


            if (!loaded) {

                return false;

            }


            /*
             * STEP 3
             *
             * Header HTML must exist before
             * header.js executes.
             */

            await loadScript(
                SCRIPT_PATH.header
            );


            return true;

        }


        catch (error) {

            console.error(
                "CTM Header loading failed:",
                error
            );


            return false;

        }

    }


    /* ======================================================================
       LOAD FOOTER
       ====================================================================== */


    async function loadFooter() {

        return loadComponent(
            "#global-footer",
            COMPONENT_PATH.footer
        );

    }


    /* ======================================================================
       LOAD GLOBAL COMPONENTS
       ====================================================================== */


    async function loadGlobalComponents() {

        console.log(
            "CTM PATH™ Global Component Loader starting..."
        );


        /*
         * HEADER
         */

        const headerLoaded =
            await loadHeader();


        /*
         * FOOTER
         */

        const footerLoaded =
            await loadFooter();


        /*
         * RESULT
         */

        const result = {

            header:
                headerLoaded,

            footer:
                footerLoaded,

            success:
                headerLoaded &&
                footerLoaded

        };


        if (result.success) {

            console.log(
                "CTM PATH™ Global Components Ready."
            );

        }


        else {

            console.warn(
                "CTM PATH™ Global Components loaded with errors.",
                result
            );

        }


        return result;

    }


    /* ======================================================================
       OPTIONAL AUTO INITIALIZATION
       ======================================================================

       Pages may call:

           CTM_COMPONENTS.load()

       explicitly.

       Therefore this loader does NOT automatically execute itself.

       This prevents duplicate component loading.

       ====================================================================== */


    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    window.CTM_COMPONENTS = {

        version:
            "3.1",

        load:
            loadGlobalComponents,

        loadHeader:
            loadHeader,

        loadFooter:
            loadFooter

    };


})();
