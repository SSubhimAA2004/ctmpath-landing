
/* ==========================================================================
   CTM PATH™ Guided Journey™
   ==========================================================================
   File        : js/router.js
   Version     : 3.0
   Status      : FRAMEWORK FREEZE v3.0
   Architecture: Manifest Driven SPA Router

   --------------------------------------------------------------------------
   PURPOSE

   The Router is responsible for ONE thing:

       Managing the lifecycle of application pages.

   --------------------------------------------------------------------------
   RESPONSIBILITIES

   ✓ Validate Routes
   ✓ Resolve Page Manifest
   ✓ Fetch Page HTML
   ✓ Manage HTML Cache
   ✓ Load / Swap Stylesheets
   ✓ Render Pages
   ✓ Initialize Controllers
   ✓ Destroy Controllers
   ✓ Emit Navigation Events

   --------------------------------------------------------------------------
   NOT RESPONSIBLE FOR

   ✗ Business Logic
   ✗ API Communication
   ✗ Form Validation
   ✗ State Mutations
   ✗ UI Widgets
   ✗ Storage
   ✗ Authentication

   --------------------------------------------------------------------------
   NAVIGATION PIPELINE

   navigate(route)

           │

           ▼

   validateRoute()

           │

           ▼

   resolvePage()

           │

           ▼

   fetchPageHtml()

           │

           ▼

   ensureStylesheet()

           │

           ▼

   destroyCurrentController()

           │

           ▼

   renderPage(html)

           │

           ▼

   initializeController()

           │

           ▼

   afterNavigation()

========================================================================== */

'use strict';

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
       INITIALIZATION
    ========================================================== */

    async init() {

        if (this.#initialized) {

            return;

        }

        this.#pageContainer =
            document.getElementById(
                CTM.Config.UI.PAGE_CONTAINER_ID
            );

        if (!this.#pageContainer) {

            throw new Error(
                'Router initialization failed. Page container not found.'
            );

        }

        this.#initialized = true;

        CTM.Logger.info(
            'Router initialized.'
        );

        CTM.Events.emit(
            CTM.Config.EVENTS.APP_INITIALIZED,
            {
                module: 'Router'
            }
        );

    }

    /* ==========================================================
       SHUTDOWN
    ========================================================== */

    async destroy() {

        if (!this.#initialized) {

            return;

        }

        await this.#destroyCurrentController();

        this.clearCache();

        this.#pageContainer = null;

        this.#currentRoute = null;

        this.#currentPage = null;

        this.#currentController = null;

        this.#activeStylesheet = null;

        this.#currentStylesheetHref = null;

        this.#navigationLock = false;

        this.#initialized = false;

        CTM.Logger.info(
            'Router destroyed.'
        );

    }

    /* ==========================================================
       PUBLIC API

       These are the ONLY public methods exposed
       by the Router.
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

       #validateRoute()
       #resolvePage()

       navigate()
       reload()
       refresh()

    ========================================================== */
}

/* ==============================================================
   SINGLETON EXPORT
============================================================== */

CTM.Router = Object.freeze(
    new Router()
);

/* ==========================================================================
   END OF BATCH 1A

   Next:
   router.js — Batch 1B
========================================================================== */

    /* ==========================================================
       NAVIGATE
       ----------------------------------------------------------
       Master navigation pipeline.

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
                this.#validateRoute(route);

            const page =
                this.#resolvePage(validRoute);

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

            this.#navigationLock = false;

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
            typeof this.#currentController
                .init === 'function'
        ) {

            await this.#currentController
                .init();

        }

    }

    /* ==========================================================
       VALIDATE ROUTE
    ========================================================== */

    #validateRoute(route) {

        if (!route) {

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
            CTM.Config.getPage(route);

        if (!page) {

            throw new Error(
                CTM.Config.ERRORS.PAGE_NOT_FOUND
            );

        }

        return page;

    }

    /* ==========================================================
       BEFORE NAVIGATION
    ========================================================== */

    async #beforeNavigation(page) {

        CTM.Logger.info(
            `Navigating to ${page.route}`
        );

        CTM.Events.emit(

            CTM.Config.EVENTS
                .NAVIGATION_STARTED,

            {

                from:
                    this.#currentRoute,

                to:
                    page.route

            }

        );

        if (
            CTM.UI &&
            typeof CTM.UI.showLoading ===
                'function'
        ) {

            CTM.UI.showLoading();

        }

    }

    /* ==========================================================
       AFTER NAVIGATION
    ========================================================== */

    async #afterNavigation(page) {

        this.#navigationLock = false;

        if (
            CTM.UI &&
            typeof CTM.UI.hideLoading ===
                'function'
        ) {

            CTM.UI.hideLoading();

        }

        if (
            CTM.UI &&
            typeof CTM.UI.scrollTop ===
                'function'
        ) {

            CTM.UI.scrollTop();

        }

        if (
            CTM.UI &&
            typeof CTM.UI
                .updateJourneyCounter ===
                'function'
        ) {

            CTM.UI.updateJourneyCounter(

                page.order,

                CTM.Config.JOURNEY
                    .TOTAL_PAGES

            );

        }

        CTM.Events.emit(

            CTM.Config.EVENTS
                .NAVIGATION_COMPLETED,

            {

                route:
                    page.route

            }

        );

        CTM.Logger.info(
            `Navigation complete: ${page.route}`
        );

    }

    /* ==========================================================
       Remaining methods

       Batch 1C

       ----------------------------------------

       #fetchPageHtml()

       #renderPage()

       #cachePage()

       HTML cache

    ========================================================== */

    /* ==========================================================
       FETCH PAGE HTML
       ----------------------------------------------------------
       Responsibility

       ✓ Fetch HTML
       ✓ Read Cache
       ✓ Update Cache

       Does NOT

       ✗ Render
       ✗ Touch DOM
       ✗ Load CSS
    ========================================================== */

    async #fetchPageHtml(page) {

        const cacheKey =
            page.route;

        /* ---------------------------------------------
           Cache Hit
        --------------------------------------------- */

        if (

            CTM.Config.CACHE.PAGES &&

            this.#pageCache.has(
                cacheKey
            )

        ) {

            CTM.Logger.info(
                `Using cached page: ${cacheKey}`
            );

            return this.#pageCache.get(
                cacheKey
            );

        }

        /* ---------------------------------------------
           Fetch
        --------------------------------------------- */

        CTM.Logger.info(
            `Fetching ${page.html}`
        );

        const response =
            await fetch(

                page.html,

                {
                    cache: 'no-cache'
                }

            );

        if (!response.ok) {

            throw new Error(

                `Unable to fetch page: ${page.html}`

            );

        }

        const html =
            await response.text();

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

       ✓ DOM only

       Never performs

       ✗ fetch()
       ✗ cache
       ✗ controller
       ✗ stylesheet
    ========================================================== */

    async #renderPage(html) {

        if (
            !this.#pageContainer
        ) {

            throw new Error(
                'Page container unavailable.'
            );

        }

        this.#pageContainer.innerHTML =
            html;

        CTM.Events.emit(

            CTM.Config.EVENTS
                .PAGE_RENDERED

        );

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
       PREFETCH

       Loads the next page HTML into cache.

       No DOM changes.

       No controller initialization.

       No stylesheet loading.
    ========================================================== */

    async #prefetchNextPage() {

        if (

            !CTM.Config.APP
                .PRELOAD_NEXT_PAGE ||

            !this.#currentRoute

        ) {

            return;

        }

        const nextPage =
            CTM.Config.getNextPage(

                this.#currentRoute

            );

        if (!nextPage) {

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

                'Page prefetch skipped.',

                error

            );

        }

    }

    /* ==========================================================
       Remaining methods

       Batch 1D

       --------------------------------------

       #ensureStylesheet()

       #createStylesheet()

       #swapStylesheet()

       #removeOldStylesheet()

       Zero Flash Of Unstyled Content

    ========================================================== */

    /* ==========================================================
       ENSURE STYLESHEET
       ----------------------------------------------------------
       Responsibility

       ✓ Load page stylesheet
       ✓ Wait until loaded
       ✓ Swap stylesheets
       ✓ Prevent FOUC

       Never

       ✗ Render HTML
       ✗ Initialize Controller
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

        const newStylesheet =
            await this.#createStylesheet(
                page.css
            );

        await this.#swapStylesheet(
            newStylesheet
        );

    }

    /* ==========================================================
       CREATE STYLESHEET

       Creates a detached stylesheet and waits until
       completely loaded before returning it.
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

                link.dataset.pageStylesheet =
                    'true';

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

       Wait until the new stylesheet is loaded before
       removing the previous stylesheet.

       This completely eliminates Flash Of Unstyled Content.
    ========================================================== */

    async #swapStylesheet(

        newStylesheet

    ) {

        const previous =
            this.#activeStylesheet;

        this.#activeStylesheet =
            newStylesheet;

        this.#currentStylesheetHref =
            newStylesheet.href;

        if (previous) {

            previous.remove();

        }

    }

    /* ==========================================================
       REMOVE ACTIVE STYLESHEET
    ========================================================== */

    #removeActiveStylesheet() {

        if (!this.#activeStylesheet) {

            return;

        }

        this.#activeStylesheet.remove();

        this.#activeStylesheet = null;

        this.#currentStylesheetHref =
            null;

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

        if (!this.#currentPage) {

            return;

        }

        await this.#ensureStylesheet(

            this.#currentPage

        );

    }

    /* ==========================================================
       STYLESHEET CLEANUP

       Called during Router.destroy()
    ========================================================== */

    #destroyStylesheet() {

        this.#removeActiveStylesheet();

    }

    /* ==========================================================
       Remaining methods

       Batch 1E

       --------------------------------------

       #initializeController()

       #destroyCurrentController()

       #handleNavigationError()

       Singleton Export

       EOF

    ========================================================== */

    /* ==========================================================
       INITIALIZE CONTROLLER
       ----------------------------------------------------------
       Responsibility

       ✓ Resolve controller
       ✓ Initialize controller
       ✓ Emit lifecycle events

       Never

       ✗ Render HTML
       ✗ Fetch Resources
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

            CTM.Config.EVENTS
                .PAGE_INITIALIZING,

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

            CTM.Config.EVENTS
                .PAGE_INITIALIZED,

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

            CTM.Config.EVENTS
                .PAGE_DESTROYING,

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

            CTM.Config.EVENTS
                .PAGE_DESTROYED,

            {

                page:
                    this.#currentRoute

            }

        );

        this.#currentController =
            null;

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

        if (

            CTM.UI &&

            typeof CTM.UI.hideLoading ===
            'function'

        ) {

            CTM.UI.hideLoading();

        }

        CTM.Events.emit(

            CTM.Config.EVENTS
                .NAVIGATION_FAILED,

            {

                route,

                error

            }

        );

        if (

            CTM.UI &&

            typeof CTM.UI.showToast ===
            'function'

        ) {

            CTM.UI.showToast(

                error.message,

                'error'

            );

        }

    }

    /* ==========================================================
       UTILITY
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
       FINAL CLEANUP
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

/* ==========================================================================
   FRAMEWORK FREEZE v3.0

   Router Responsibilities

   ✓ Route Validation
   ✓ Page Resolution
   ✓ HTML Fetch
   ✓ HTML Cache
   ✓ Stylesheet Lifecycle
   ✓ HTML Rendering
   ✓ Controller Lifecycle
   ✓ Navigation Events

   Navigation Pipeline

   navigate()

       ↓

   validateRoute()

       ↓

   resolvePage()

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

   Router contains

   ✓ No business logic
   ✓ No API logic
   ✓ No form validation
   ✓ No application state mutations

   Status

   FRAMEWORK FREEZE v3.0

   EOF

========================================================================== */

