
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : component-loader.js
   Version   : 3.2
   Status    : PRODUCTION

   Architecture:
   STATIC MULTI-PAGE GUIDED JOURNEY

   Pages:
   /index.html
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
   ✓ Support Page 01–07 consistently

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
       ======================================================================

       All shared component resources use root-relative paths.

       This guarantees consistent resolution from:

           /index.html

       and:

           /pages/page02.html
           /pages/page03.html
           /pages/page04.html
           /pages/page05.html
           /pages/page06.html
           /pages/page07.html

       ====================================================================== */


    const COMPONENT_PATH = {

        header:
            "/components/header.html",

        footer:
            "/components/footer.html"

    };


    const STYLE_PATH = {

        header:
            "/css/header.css",

        footer:
            "/css/footer.css"

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
                 *
                 * Handles both:
                 *
                 *     /css/header.css
                 *
                 * and an existing browser-resolved absolute URL.
                 */

                const existing =
                    Array.from(
                        document.querySelectorAll(
                            'link[rel="stylesheet"]'
                        )
                    ).find(
                        function (link) {

                            try {

                                return (
                                    link.getAttribute("href") === file ||
                                    new URL(
                                        link.href,
                                        window.location.origin
                                    ).pathname === file
                                );

                            }

                            catch (error) {

                                return false;

                            }

                        }
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
            document.querySelector(
                selector
            );


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
                    Array.from(
                        document.querySelectorAll(
                            "script[src]"
                        )
                    ).find(
                        function (script) {

                            try {

                                return (
                                    script.getAttribute("src") === file ||
                                    new URL(
                                        script.src,
                                        window.location.origin
                                    ).pathname === file
                                );

                            }

                            catch (error) {

                                return false;

                            }

                        }
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
             * Load canonical header stylesheet.
             */

            await loadStyle(
                STYLE_PATH.header
            );


            /*
             * STEP 2
             *
             * Inject canonical header component.
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

        try {


            /*
             * STEP 1
             *
             * Load canonical footer stylesheet.
             *
             * This ensures Page 01–07 all receive
             * exactly the same footer styling.
             */

            await loadStyle(
                STYLE_PATH.footer
            );


            /*
             * STEP 2
             *
             * Inject canonical footer component.
             */

            const loaded =
                await loadComponent(
                    "#global-footer",
                    COMPONENT_PATH.footer
                );


            if (!loaded) {

                return false;

            }


            return true;

        }


        catch (error) {

            console.error(
                "CTM Footer loading failed:",
                error
            );


            return false;

        }

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

       Journey pages may call:

           CTM_COMPONENTS.load()

       to load BOTH:

           Header
           Footer


       Page 01 may call:

           CTM_COMPONENTS.loadFooter()

       when its existing Page-01 header must remain untouched.


       This loader deliberately does NOT automatically execute itself.

       This prevents:

           • duplicate component injection
           • duplicate controller execution
           • accidental Page-01 header replacement

       ====================================================================== */


    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    window.CTM_COMPONENTS = {

        version:
            "3.2",

        load:
            loadGlobalComponents,

        loadHeader:
            loadHeader,

        loadFooter:
            loadFooter

    };


})();

