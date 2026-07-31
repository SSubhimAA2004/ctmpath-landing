
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * Navigation Module
 * --------------------------------------------------------------
 * Version : 4.0 (Framework Freeze)
 * Pattern : Singleton
 * Author  : CTM PATH™ Engineering
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Determine Navigation Direction
 * ✓ Delegate Navigation to Router
 * ✓ Route Convenience Methods
 *
 * Never
 * --------------------------------------------------------------
 * ✗ Render Pages
 * ✗ Manipulate DOM
 * ✗ Business Logic
 * ✗ API Calls
 * ✗ Validation
 * ✗ Application State
 * ✗ UI Manipulation
 *
 * Architecture
 * --------------------------------------------------------------
 *
 * User Action
 *      ↓
 * Navigation
 *      ↓
 * Router.navigate()
 *      ↓
 * Router Pipeline
 *      ↓
 * Event Bus
 *      ↓
 * UI
 *
 * ==============================================================
 */

window.CTM = window.CTM || {};

class Navigation {

    /* ==========================================================
       PRIVATE STATE
    ========================================================== */

    #initialized = false;

    /* ==========================================================
       INITIALIZE
    ========================================================== */

    async init() {

        if (this.#initialized) {

            return;

        }

        this.#initialized = true;

        CTM.Logger.info(

            'Navigation initialized.'

        );

    }

    /* ==========================================================
       DESTROY
    ========================================================== */

    async destroy() {

        this.#initialized = false;

        CTM.Logger.info(

            'Navigation destroyed.'

        );

    }

    /* ==========================================================
       PUBLIC API
    ========================================================== */

    async go(route) {}

    async next() {}

    async previous() {}

    async first() {}

    async last() {}

    canGoNext() {}

    canGoPrevious() {}

    currentRoute() {}

    currentPage() {}

    isInitialized() {

        return this.#initialized;

    }

    /* ==========================================================
       Navigation Methods

       Batch 1B

       -----------------------------------------

       go()

       next()

       previous()

       first()

       last()

    ========================================================== */

}

CTM.Navigation = Object.freeze(

    new Navigation()

);

    /* ==========================================================
       GO

       Delegates navigation to the Router.

    ========================================================== */

    async go(route) {

        if (!this.#initialized) {

            throw new Error(

                'Navigation is not initialized.'

            );

        }

        return await CTM.Router.navigate(

            route

        );

    }

    /* ==========================================================
       NEXT
    ========================================================== */

    async next() {

        const currentRoute =

            CTM.Router.getCurrentRoute();

        const nextPage =

            CTM.Config.getNextPage(

                currentRoute

            );

        if (!nextPage) {

            CTM.Logger.info(

                'Already at last page.'

            );

            return false;

        }

        return this.go(

            nextPage.route

        );

    }

    /* ==========================================================
       PREVIOUS
    ========================================================== */

    async previous() {

        const currentRoute =

            CTM.Router.getCurrentRoute();

        const previousPage =

            CTM.Config.getPreviousPage(

                currentRoute

            );

        if (!previousPage) {

            CTM.Logger.info(

                'Already at first page.'

            );

            return false;

        }

        return this.go(

            previousPage.route

        );

    }

    /* ==========================================================
       FIRST
    ========================================================== */

    async first() {

        const page =

            CTM.Config.getFirstPage();

        if (!page) {

            return false;

        }

        return this.go(

            page.route

        );

    }

    /* ==========================================================
       LAST
    ========================================================== */

    async last() {

        const page =

            CTM.Config.getLastPage();

        if (!page) {

            return false;

        }

        return this.go(

            page.route

        );

    }

    /* ==========================================================
       Remaining Methods

       Batch 1C

       -----------------------------------------

       canGoNext()

       canGoPrevious()

       currentRoute()

       currentPage()

       Singleton Export

       Framework Freeze

    ========================================================== */

    /* ==========================================================
       CAN GO NEXT

       Returns

       true  -> next page exists

       false -> last page reached

    ========================================================== */

    canGoNext() {

        const currentRoute =

            CTM.Router.getCurrentRoute();

        return CTM.Config.hasNextPage(

            currentRoute

        );

    }

    /* ==========================================================
       CAN GO PREVIOUS

       Returns

       true  -> previous page exists

       false -> first page reached

    ========================================================== */

    canGoPrevious() {

        const currentRoute =

            CTM.Router.getCurrentRoute();

        return CTM.Config.hasPreviousPage(

            currentRoute

        );

    }

    /* ==========================================================
       CURRENT ROUTE

    ========================================================== */

    currentRoute() {

        return CTM.Router.getCurrentRoute();

    }

    /* ==========================================================
       CURRENT PAGE

    ========================================================== */

    currentPage() {

        return CTM.Router.getCurrentPage();

    }

    /* ==========================================================
       NAVIGATION STATUS

    ========================================================== */

    isBusy() {

        return CTM.Router.isNavigating();

    }

    /* ==========================================================
       RELOAD

       Convenience wrapper.

    ========================================================== */

    async reload() {

        return await CTM.Router.reload();

    }

    /* ==========================================================
       REFRESH

       Convenience wrapper.

    ========================================================== */

    async refresh() {

        return await CTM.Router.refresh();

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

CTM.Navigation = Object.freeze(

    new Navigation()

);

/* ==============================================================
   FRAMEWORK FREEZE v4.0

   Responsibilities

   ✓ Determine navigation direction

   ✓ Route convenience methods

   ✓ Delegate navigation to Router

   ✓ Query navigation capability

   Never

   ✗ Render HTML

   ✗ Manipulate DOM

   ✗ Business Logic

   ✗ Validation

   ✗ Application State

   ✗ API Calls

   ✗ UI

   Dependency Graph

   App

     │

     ▼

   Navigation

     │

     ▼

   Router

     │

     ▼

   Event Bus

     │

     ▼

   UI

   Public API

   ✓ init()

   ✓ destroy()

   ✓ go()

   ✓ next()

   ✓ previous()

   ✓ first()

   ✓ last()

   ✓ reload()

   ✓ refresh()

   ✓ canGoNext()

   ✓ canGoPrevious()

   ✓ currentRoute()

   ✓ currentPage()

   ✓ isBusy()

   ✓ isInitialized()

   Status

   FRAMEWORK FREEZE v4.0

   EOF

============================================================== */

