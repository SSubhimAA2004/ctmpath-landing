
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : component-loader.js
   Version   : 3.3
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
   ✓ Load Global Footer when required
   ✓ Inject Shared Components
   ✓ Load Component Stylesheets
   ✓ Load Header Controller
   ✓ Resolve component paths from site root
   ✓ Normalize injected asset paths
   ✓ Support Page 01–07 consistently
   ✓ Allow Page 06 to run header-only

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
       PAGE DETECTION
       ====================================================================== */

    function getCurrentPage() {

        const pathname =
            window.location.pathname
                .replace(/\/+$/, "")
                .toLowerCase();

        if (
            pathname === "/pages/page06" ||
            pathname === "/pages/page06.html"
        ) {
            return "page06";
        }

        if (
            pathname === "/pages/page05" ||
            pathname === "/pages/page05.html"
        ) {
            return "page05";
        }

        if (
            pathname === "/pages/page04" ||
            pathname === "/pages/page04.html"
        ) {
            return "page04";
        }

        if (
            pathname === "/pages/page03" ||
            pathname === "/pages/page03.html"
        ) {
            return "page03";
        }

        if (
            pathname === "/pages/page02" ||
            pathname === "/pages/page02.html"
        ) {
            return "page02";
        }

        if (
            pathname === "/pages/page07" ||
            pathname === "/pages/page07.html"
        ) {
            return "page07";
        }

        if (
            pathname === "/" ||
            pathname === "/index.html"
        ) {
            return "index";
        }

        return "";

    }


    /* ======================================================================
       PAGE FOOTER POLICY
       ======================================================================

       Page 06 is intentionally header-only.

       The frozen header remains untouched.

       The loader controls whether the footer is requested.

       ====================================================================== */

    function shouldLoadFooter() {

        const page =
            getCurrentPage();

        /*
         * PAGE 06
         *
         * The Four Forces™ page is intentionally footer-free.
         */

        if (page === "page06") {
            return false;
        }


        /*
         * All other pages retain the historical loader behaviour.
         */

        return true;

    }


    /* ======================================================================
       NORMALIZE COMPONENT ASSET PATHS
       ======================================================================

       IMPORTANT:

       header.html is frozen.

       If header.html contains:

           assets/logo/CTM_Mark.svg

       and the component is injected into:

           /pages/page06

       the browser may resolve that relative asset against the page path.

       We therefore normalize component-injected asset references to:

           /assets/logo/CTM_Mark.svg

       without modifying header.html itself.

       ====================================================================== */

    function normalizeComponentAssets(container) {

        if (!container) {
            return;
        }


        /*
         * SRC ATTRIBUTES
         */

        const srcElements =
            container.querySelectorAll(
                "[src]"
            );


        srcElements.forEach(
            function (element) {

                const value =
                    element.getAttribute("src");


                if (!value) {
                    return;
                }


                /*
                 * Ignore:
                 *
                 * /absolute/path
                 * https://...
                 * http://...
                 * //
                 * data:...
                 * blob:...
                 * #...
                 */

                if (
                    value.startsWith("/") ||
                    value.startsWith("//") ||
                    value.startsWith("http://") ||
                    value.startsWith("https://") ||
                    value.startsWith("data:") ||
                    value.startsWith("blob:") ||
                    value.startsWith("#")
                ) {
                    return;
                }


                if (
                    value.startsWith("assets/")
                ) {

                    element.setAttribute(
                        "src",
                        "/" + value
                    );

                }

            }
        );


        /*
         * HREF ATTRIBUTES
         *
         * This also protects component-level stylesheet,
         * icon and link references if they are ever added
         * to the frozen component.
         */

        const hrefElements =
            container.querySelectorAll(
                "[href]"
            );


        hrefElements.forEach(
            function (element) {

                const value =
                    element.getAttribute("href");


                if (!value) {
                    return;
                }


                if (
                    value.startsWith("/") ||
                    value.startsWith("//") ||
                    value.startsWith("http://") ||
                    value.startsWith("https://") ||
                    value.startsWith("data:") ||
                    value.startsWith("blob:") ||
                    value.startsWith("#")
                ) {
                    return;
                }


                if (
                    value.startsWith("assets/")
                ) {

                    element.setAttribute(
                        "href",
                        "/" + value
                    );

                }

            }
        );

    }


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

            /*
             * Missing component containers are expected on
             * pages that deliberately do not use that component.
             *
             * Do not treat this as a fatal application error.
             */

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


            /*
             * Normalize component asset references AFTER
             * injection and BEFORE the component controller runs.
             */

            normalizeComponentAssets(
                container
            );


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
             * Do not even request footer resources when the
             * current page is intentionally footer-free.
             */

            if (!shouldLoadFooter()) {

                return true;

            }


            /*
             * STEP 1
             *
             * Load canonical footer stylesheet.
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


            /*
             * If a page intentionally has no footer container,
             * the absence is not considered a component failure.
             */

            if (!loaded) {

                return true;

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


        const page =
            getCurrentPage();


        /*
         * HEADER
         */

        const headerLoaded =
            await loadHeader();


        /*
         * FOOTER
         *
         * Page 06 automatically bypasses footer loading.
         */

        const footerLoaded =
            await loadFooter();


        /*
         * RESULT
         */

        const result = {

            page:
                page,

            header:
                headerLoaded,

            footer:
                footerLoaded,

            footerRequired:
                shouldLoadFooter(),

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
       HEADER-ONLY LOADER
       ======================================================================

       Explicit API for pages that intentionally require only the
       global header.

       Page 06 uses this architecture conceptually.

       ====================================================================== */

    async function loadHeaderOnly() {

        console.log(
            "CTM PATH™ Header-Only Loader starting..."
        );


        const headerLoaded =
            await loadHeader();


        const result = {

            page:
                getCurrentPage(),

            header:
                headerLoaded,

            footer:
                false,

            success:
                headerLoaded

        };


        if (result.success) {

            console.log(
                "CTM PATH™ Header-Only Components Ready."
            );

        }


        return result;

    }


    /* ======================================================================
       OPTIONAL AUTO INITIALIZATION
       ======================================================================

       Journey pages may call:

           CTM_COMPONENTS.load()

       to load the canonical global components.

       Page 06 may call:

           CTM_COMPONENTS.loadHeaderOnly()

       when the page intentionally requires no footer.

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
            "3.3",

        load:
            loadGlobalComponents,

        loadHeader:
            loadHeader,

        loadHeaderOnly:
            loadHeaderOnly,

        loadFooter:
            loadFooter

    };


})();

