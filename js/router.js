
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * Router Module
 * --------------------------------------------------------------
 * Version : 4.0 (Framework Freeze)
 * Pattern : Singleton
 * Author  : CTM PATH™ Engineering
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Route Validation
 * ✓ Route Resolution
 * ✓ HTML Fetching
 * ✓ HTML Cache
 * ✓ Stylesheet Lifecycle
 * ✓ Page Rendering
 * ✓ Controller Lifecycle
 * ✓ Navigation Events
 *
 * Non Responsibilities
 * --------------------------------------------------------------
 * ✗ Business Logic
 * ✗ API Calls
 * ✗ Application State
 * ✗ UI Rendering
 * ✗ Form Validation
 * ✗ DOM Manipulation outside Page Container
 *
 * Navigation Pipeline
 * --------------------------------------------------------------
 *
 * navigate()
 *      ↓
 * validateRoute()
 *      ↓
 * resolvePage()
 *      ↓
 * beforeNavigation()
 *      ↓
 * fetchPageHtml()
 *      ↓
 * ensureStylesheet()
 *      ↓
 * destroyCurrentController()
 *      ↓
 * renderPage()
 *      ↓
 * initializeController()
 *      ↓
 * afterNavigation()
 *
 * ==============================================================
 */

window.CTM = window.CTM || {};

class Router {

    /* ==========================================================
       PRIVATE STATE
    ========================================================== */

    #initialized = false;

    #navigationLock = false;

    #pageContainer = null;

    #currentRoute = null;

    #currentPage = null;

    #currentController = null;

    #pageCache = new Map();

    #activeStylesheet = null;

    #currentStylesheetHref = null;

    /* ==========================================================
       INITIALIZE
    ========================================================== */

    async init() {

        if (this.#initialized) {

            return;

        }

        this.#pageContainer = document.querySelector(

            CTM.Config.SELECTORS.PAGE_CONTAINER

        );

        if (!this.#pageContainer) {

            throw new Error(

                CTM.Config.ERRORS.PAGE_CONTAINER_NOT_FOUND

            );

        }

        this.#initialized = true;

        CTM.Logger.info(

            'Router initialized.'

        );

    }

    /* ==========================================================
       DESTROY
    ========================================================== */

    async destroy() {

        await this.#destroyCurrentController();

        this.#removeActiveStylesheet();

        this.#pageCache.clear();

        this.#currentRoute = null;

        this.#currentPage = null;

        this.#navigationLock = false;

        this.#initialized = false;

        CTM.Logger.info(

            'Router destroyed.'

        );

    }

    /* ==========================================================
       PUBLIC API
    ========================================================== */

    async navigate(route) {}

    async reload() {}

    async refresh() {}

    clearCache() {

        this.#pageCache.clear();

    }

    getCurrentRoute() {

        return this.#currentRoute;

    }

    getCurrentPage() {

        return this.#currentPage;

    }

    isNavigating() {

        return this.#navigationLock;

    }

    isInitialized() {

        return this.#initialized;

    }

    /* ==========================================================
       PRIVATE METHODS

       Batch 1B

       • navigate()
       • reload()
       • refresh()
       • validateRoute()
       • resolvePage()
       • beforeNavigation()

    ========================================================== */

}

CTM.Router = Object.freeze(

    new Router()

);

    /* ==========================================================
       NAVIGATE

       Master Navigation Pipeline

       validateRoute()

            ↓

       resolvePage()

            ↓

       beforeNavigation()

            ↓

       fetchPageHtml()

            ↓

       ensureStylesheet()

            ↓

       destroyCurrentController()

            ↓

       renderPage()

            ↓

       initializeController()

            ↓

       afterNavigation()

    ========================================================== */

    async navigate(route) {

        if (this.#navigationLock) {

            CTM.Logger.warn(
                'Navigation already in progress.'
            );

            return false;

        }

        this.#navigationLock = true;

        try {

            const validRoute =
                this.#validateRoute(
                    route
                );

            const page =
                this.#resolvePage(
                    validRoute
                );

            await this.#beforeNavigation(
                page
            );

            const html =
                await this.#fetchPageHtml(
                    page
                );

            await this.#ensureStylesheet(
                page
            );

            await this.#destroyCurrentController();

            await this.#renderPage(
                html
            );

            CTM.Events.emit(

                CTM.Config.EVENTS.PAGE_RENDERED,

                {

                    page:
                        page.route

                }

            );

            await this.#initializeController(
                page
            );

            this.#currentRoute =
                validRoute;

            this.#currentPage =
                page;

            await this.#afterNavigation(
                page
            );

            return true;

        }
        catch (error) {

            await this.#handleNavigationError(

                error,

                route

            );

            return false;

        }

    }

    /* ==========================================================
       RELOAD CURRENT PAGE
    ========================================================== */

    async reload() {

        if (!this.#currentRoute) {

            return false;

        }

        return this.navigate(

            this.#currentRoute

        );

    }

    /* ==========================================================
       REFRESH CURRENT CONTROLLER
    ========================================================== */

    async refresh() {

        if (

            !this.#currentController

        ) {

            return;

        }

        if (

            typeof this.#currentController.init ===
            'function'

        ) {

            await this.#currentController.init();

        }

    }

    /* ==========================================================
       VALIDATE ROUTE
    ========================================================== */

    #validateRoute(route) {

        if (

            !route

        ) {

            throw new Error(

                CTM.Config.ERRORS.INVALID_ROUTE

            );

        }

        if (

            !CTM.Config.hasRoute(route)

        ) {

            throw new Error(

                `Unknown route: ${route}`

            );

        }

        return route;

    }

    /* ==========================================================
       RESOLVE PAGE
    ========================================================== */

    #resolvePage(route) {

        const page =
            CTM.Config.getPage(
                route
            );

        if (!page) {

            throw new Error(

                CTM.Config.ERRORS.PAGE_NOT_FOUND

            );

        }

        return page;

    }

    /* ==========================================================
       BEFORE NAVIGATION

       Emits lifecycle events only.

       No UI logic.

    ========================================================== */

    async #beforeNavigation(page) {

        CTM.Logger.info(

            `Navigating to ${page.route}`

        );

        CTM.Events.emit(

            CTM.Config.EVENTS.NAVIGATION_STARTED,

            {

                from:
                    this.#currentRoute,

                to:
                    page.route,

                order:
                    page.order,

                total:
                    CTM.Config.JOURNEY
                        .TOTAL_PAGES

            }

        );

    }

    /* ==========================================================
       Remaining Methods

       Batch 1C

       -----------------------------------------

       #fetchPageHtml()

       #cachePage()

       #renderPage()

       HTML Cache

    ========================================================== */

    /* ==========================================================
       FETCH PAGE HTML

       Responsibility

       ✓ Read Cache
       ✓ Fetch HTML
       ✓ Update Cache

       Never

       ✗ Manipulate DOM
       ✗ Load CSS
       ✗ Initialize Controllers

    ========================================================== */

    async #fetchPageHtml(page) {

        const cacheKey = page.route;

        /* ------------------------------------------------------
           Cache Hit
        ------------------------------------------------------ */

        if (

            CTM.Config.CACHE.PAGES &&

            this.#pageCache.has(
                cacheKey
            )

        ) {

            CTM.Logger.info(

                `Page cache hit: ${cacheKey}`

            );

            return this.#pageCache.get(
                cacheKey
            );

        }

        /* ------------------------------------------------------
           Fetch HTML
        ------------------------------------------------------ */

        CTM.Logger.info(

            `Fetching ${page.html}`

        );

        const response = await fetch(

            page.html,

            {

                cache: 'no-cache'

            }

        );

        if (!response.ok) {

            throw new Error(

                `Unable to load page: ${page.html}`

            );

        }

        const html = await response.text();

        this.#cachePage(

            cacheKey,

            html

        );

        return html;

    }

    /* ==========================================================
       CACHE PAGE
    ========================================================== */

    #cachePage(

        key,

        html

    ) {

        if (

            !CTM.Config.CACHE.PAGES

        ) {

            return;

        }

        this.#pageCache.set(

            key,

            html

        );

    }

    /* ==========================================================
       CLEAR PAGE CACHE
    ========================================================== */

    clearCache() {

        this.#pageCache.clear();

        CTM.Logger.info(

            'Router cache cleared.'

        );

    }

    /* ==========================================================
       RENDER PAGE

       Responsibility

       ✓ Inject HTML

       Never

       ✗ Fetch
       ✗ Cache
       ✗ CSS
       ✗ Controller

    ========================================================== */

    async #renderPage(html) {

        if (

            !this.#pageContainer

        ) {

            throw new Error(

                CTM.Config.ERRORS.PAGE_CONTAINER_NOT_FOUND

            );

        }

        this.#pageContainer.innerHTML =
            html;

    }

    /* ==========================================================
       CLEAR PAGE
    ========================================================== */

    #clearPage() {

        if (

            !this.#pageContainer

        ) {

            return;

        }

        this.#pageContainer.innerHTML =
            '';

    }

    /* ==========================================================
       PREFETCH NEXT PAGE

       Loads only HTML.

       No DOM updates.
       No controller creation.
       No stylesheet loading.

    ========================================================== */

    async #prefetchNextPage() {

        if (

            !CTM.Config.APP.PRELOAD_NEXT_PAGE ||

            !this.#currentRoute

        ) {

            return;

        }

        const nextPage =

            CTM.Config.getNextPage(

                this.#currentRoute

            );

        if (

            !nextPage

        ) {

            return;

        }

        if (

            this.#pageCache.has(

                nextPage.route

            )

        ) {

            return;

        }

        try {

            await this.#fetchPageHtml(

                nextPage

            );

            CTM.Logger.info(

                `Prefetched ${nextPage.route}`

            );

        }

        catch (error) {

            CTM.Logger.warn(

                'Prefetch skipped.',

                error

            );

        }

    }

    /* ==========================================================
       Remaining Methods

       Batch 1D

       -----------------------------------------

       #ensureStylesheet()

       #createStylesheet()

       #swapStylesheet()

       #removeActiveStylesheet()

       Prevent Flash Of Unstyled Content (FOUC)

    ========================================================== */

    /* ==========================================================
       ENSURE STYLESHEET

       Responsibility

       ✓ Load page stylesheet
       ✓ Wait until loaded
       ✓ Swap stylesheets
       ✓ Prevent Flash Of Unstyled Content (FOUC)

       Never

       ✗ Render HTML
       ✗ Initialize Controllers

    ========================================================== */

    async #ensureStylesheet(page) {

        if (!page.css) {

            return;

        }

        if (

            this.#currentStylesheetHref ===
            page.css

        ) {

            return;

        }

        const stylesheet =

            await this.#createStylesheet(

                page.css

            );

        await this.#swapStylesheet(

            stylesheet,

            page.css

        );

    }

    /* ==========================================================
       CREATE STYLESHEET

       Creates a detached stylesheet and waits
       until it is completely loaded.

    ========================================================== */

    #createStylesheet(href) {

        return new Promise(

            (resolve, reject) => {

                const link =

                    document.createElement(

                        'link'

                    );

                link.rel = 'stylesheet';

                link.href = href;

                link.id =

                    CTM.Config.CSS
                        .PAGE_STYLESHEET_ID;

                link.dataset.ctm =

                    'page-stylesheet';

                link.onload = () => {

                    resolve(link);

                };

                link.onerror = () => {

                    reject(

                        new Error(

                            `Unable to load stylesheet: ${href}`

                        )

                    );

                };

                document.head.appendChild(

                    link

                );

            }

        );

    }

    /* ==========================================================
       SWAP STYLESHEETS

       New stylesheet is already loaded.

       Safe to remove previous stylesheet.

    ========================================================== */

    async #swapStylesheet(

        newStylesheet,

        href

    ) {

        const previous =

            this.#activeStylesheet;

        this.#activeStylesheet =

            newStylesheet;

        this.#currentStylesheetHref =

            href;

        if (previous) {

            previous.remove();

        }

    }

    /* ==========================================================
       REMOVE ACTIVE STYLESHEET
    ========================================================== */

    #removeActiveStylesheet() {

        if (

            !this.#activeStylesheet

        ) {

            return;

        }

        this.#activeStylesheet.remove();

        this.#activeStylesheet = null;

        this.#currentStylesheetHref = null;

    }

    /* ==========================================================
       GET ACTIVE STYLESHEET
    ========================================================== */

    getActiveStylesheet() {

        return this.#currentStylesheetHref;

    }

    /* ==========================================================
       RELOAD ACTIVE STYLESHEET
    ========================================================== */

    async reloadStylesheet() {

        if (

            !this.#currentPage

        ) {

            return;

        }

        this.#removeActiveStylesheet();

        await this.#ensureStylesheet(

            this.#currentPage

        );

    }

    /* ==========================================================
       DESTROY STYLESHEET

       Called during Router.destroy()

    ========================================================== */

    #destroyStylesheet() {

        this.#removeActiveStylesheet();

    }

    /* ==========================================================
       Remaining Methods

       Batch 1E (EOF)

       -----------------------------------------

       #initializeController()

       #destroyCurrentController()

       #afterNavigation()

       #handleNavigationError()

       Utility Methods

       Singleton Export

    ========================================================== */

    /* ==========================================================
       INITIALIZE CONTROLLER

       Responsibility

       ✓ Resolve controller
       ✓ Initialize controller
       ✓ Emit lifecycle events

    ========================================================== */

    async #initializeController(page) {

        if (!page.controller) {

            return;

        }

        const controller =
            CTM.Pages?.[
                page.controller
            ];

        if (!controller) {

            throw new Error(

                `Controller not found: ${page.controller}`

            );

        }

        this.#currentController =
            controller;

        CTM.Events.emit(

            CTM.Config.EVENTS.PAGE_INITIALIZING,

            {

                page:
                    page.route

            }

        );

        if (

            typeof controller.init ===
            'function'

        ) {

            await controller.init();

        }

        CTM.Events.emit(

            CTM.Config.EVENTS.PAGE_INITIALIZED,

            {

                page:
                    page.route

            }

        );

    }

    /* ==========================================================
       DESTROY CURRENT CONTROLLER
    ========================================================== */

    async #destroyCurrentController() {

        if (

            !this.#currentController

        ) {

            return;

        }

        CTM.Events.emit(

            CTM.Config.EVENTS.PAGE_DESTROYING,

            {

                page:
                    this.#currentRoute

            }

        );

        if (

            typeof this.#currentController.destroy ===
            'function'

        ) {

            await this.#currentController.destroy();

        }

        CTM.Events.emit(

            CTM.Config.EVENTS.PAGE_DESTROYED,

            {

                page:
                    this.#currentRoute

            }

        );

        this.#currentController =
            null;

    }

    /* ==========================================================
       AFTER NAVIGATION

       Emits completion event only.

       UI reacts independently.

    ========================================================== */

    async #afterNavigation(page) {

        this.#navigationLock =
            false;

        CTM.Events.emit(

            CTM.Config.EVENTS.NAVIGATION_COMPLETED,

            {

                route:
                    page.route,

                order:
                    page.order,

                total:
                    CTM.Config.JOURNEY
                        .TOTAL_PAGES

            }

        );

        this.#prefetchNextPage();

        CTM.Logger.info(

            `Navigation complete: ${page.route}`

        );

    }

    /* ==========================================================
       HANDLE NAVIGATION ERROR
    ========================================================== */

    async #handleNavigationError(

        error,

        route

    ) {

        this.#navigationLock =
            false;

        CTM.Logger.error(

            'Navigation Error',

            error

        );

        CTM.Events.emit(

            CTM.Config.EVENTS.NAVIGATION_FAILED,

            {

                route,

                error

            }

        );

    }

    /* ==========================================================
       CACHE HELPERS
    ========================================================== */

    hasCachedPage(route) {

        return this.#pageCache.has(
            route
        );

    }

    getCacheSize() {

        return this.#pageCache.size;

    }

    /* ==========================================================
       DISPOSE
    ========================================================== */

    async dispose() {

        await this.destroy();

    }

}

/* ==============================================================
   SINGLETON EXPORT
============================================================== */

CTM.Router = Object.freeze(

    new Router()

);

/* ==============================================================
   FRAMEWORK FREEZE v4.0

   Responsibilities

   ✓ Route Validation
   ✓ Route Resolution
   ✓ HTML Fetching
   ✓ HTML Cache
   ✓ Stylesheet Lifecycle
   ✓ HTML Rendering
   ✓ Controller Lifecycle
   ✓ Navigation Events

   Does NOT

   ✗ Display UI
   ✗ Show Loaders
   ✗ Show Toasts
   ✗ Scroll Window
   ✗ Update Journey Counter
   ✗ Perform Business Logic
   ✗ Mutate Application State
   ✗ Call APIs

   Communication

   Router
       ↓
   Event Bus
       ↓
   UI / Navigation / Pages

   Navigation Pipeline

   navigate()
       ↓
   validateRoute()
       ↓
   resolvePage()
       ↓
   beforeNavigation()
       ↓
   fetchPageHtml()
       ↓
   ensureStylesheet()
       ↓
   destroyCurrentController()
       ↓
   renderPage()
       ↓
   PAGE_RENDERED
       ↓
   initializeController()
       ↓
   afterNavigation()

   Status

   FRAMEWORK FREEZE v4.0

   EOF
============================================================== */

