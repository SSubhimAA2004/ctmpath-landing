
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * Component Loader Module
 * --------------------------------------------------------------
 * Version : 5.0
 * Pattern : Singleton
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Load Shared HTML Components
 * ✓ Component Caching
 * ✓ Header Loading
 * ✓ Footer Loading
 * ✓ Shared Resource Initialization
 *
 * Never
 * --------------------------------------------------------------
 * ✗ UI Logic
 * ✗ Routing
 * ✗ Navigation
 * ✗ Business Logic
 * ✗ Validation
 * ✗ API
 * ✗ Application State
 * ==============================================================
 */

window.CTM = window.CTM || {};

class ComponentLoader {

    /* ==========================================================
       PRIVATE STATE
    ========================================================== */

    #initialized = false;

    #cache = new Map();

    /* ==========================================================
       INITIALIZE
    ========================================================== */

    async init() {

        if (this.#initialized) {
            return;
        }

        this.#initialized = true;

        CTM.Logger.info(
            'Component Loader initialized.'
        );

    }

    /* ==========================================================
       DESTROY
    ========================================================== */

    async destroy() {

        this.#cache.clear();

        this.#initialized = false;

    }

    /* ==========================================================
       STATUS
    ========================================================== */

    isInitialized() {

        return this.#initialized;

    }

    /* ==========================================================
       LOAD COMPONENT

    ========================================================== */

    async load(componentName, container) {

        const target = CTM.DOM.get(container);

        if (!target) {

            throw new Error(

                `Container not found: ${container}`

            );

        }

        const html = await this.#fetchComponent(

            componentName

        );

        target.innerHTML = html;

    }

    /* ==========================================================
       LOAD HEADER

    ========================================================== */

    async loadHeader() {

        await this.load(

            'header',

            '#header'

        );

    }

    /* ==========================================================
       LOAD FOOTER

    ========================================================== */

    async loadFooter() {

        await this.load(

            'footer',

            '#footer'

        );

    }

    /* ==========================================================
       Remaining Methods

       Batch 1B

       -----------------------------------------

       loadShared()

       #fetchComponent()

       clearCache()

       getCacheSize()

    ========================================================== */

}

CTM.ComponentLoader = Object.freeze(

    new ComponentLoader()

);

    /* ==========================================================
       LOAD SHARED COMPONENTS

       Header + Footer

    ========================================================== */

    async loadShared() {

        await Promise.all([

            this.loadHeader(),

            this.loadFooter()

        ]);

        CTM.Logger.info(

            'Shared components loaded.'

        );

    }

    /* ==========================================================
       FETCH COMPONENT

       Uses in-memory cache.

    ========================================================== */

    async #fetchComponent(componentName) {

        if (

            this.#cache.has(componentName)

        ) {

            return this.#cache.get(

                componentName

            );

        }

        const url =

            `${CTM.Config.COMPONENTS.PATH}/${componentName}.html`;

        const response =

            await fetch(url);

        if (!response.ok) {

            throw new Error(

                `Unable to load component: ${componentName}`

            );

        }

        const html =

            await response.text();

        this.#cache.set(

            componentName,

            html

        );

        return html;

    }

    /* ==========================================================
       PRELOAD COMPONENTS

       Warm cache without rendering.

    ========================================================== */

    async preload(...componentNames) {

        await Promise.all(

            componentNames.map(

                component =>

                    this.#fetchComponent(component)

            )

        );

    }

    /* ==========================================================
       CACHE

    ========================================================== */

    clearCache() {

        this.#cache.clear();

    }

    has(componentName) {

        return this.#cache.has(

            componentName

        );

    }

    getCacheSize() {

        return this.#cache.size;

    }

    /* ==========================================================
       Remaining Methods

       Batch 1C (EOF)

       -----------------------------------------

       reload()

       dispose()

       Singleton Export

       Framework Freeze

    ========================================================== */

    /* ==========================================================
       RELOAD COMPONENT

       Removes cache and reloads.

    ========================================================== */

    async reload(componentName, container) {

        this.#cache.delete(

            componentName

        );

        await this.load(

            componentName,

            container

        );

    }

    /* ==========================================================
       RELOAD SHARED COMPONENTS

    ========================================================== */

    async reloadShared() {

        this.clearCache();

        await this.loadShared();

    }

    /* ==========================================================
       COMPONENT EXISTS IN CACHE

    ========================================================== */

    isCached(componentName) {

        return this.#cache.has(

            componentName

        );

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

CTM.ComponentLoader = Object.freeze(

    new ComponentLoader()

);

/* ==============================================================
   FRAMEWORK FREEZE v5.0

   Responsibilities

   ✓ Load Shared Components

   ✓ Load HTML Fragments

   ✓ Cache Components

   ✓ Preload Components

   ✓ Reload Components

   ✓ Manage Component Lifecycle


   Never

   ✗ Business Logic

   ✗ Routing

   ✗ Navigation

   ✗ UI

   ✗ Validation

   ✗ API

   ✗ State Management


   Public API

   ✓ init()

   ✓ destroy()

   ✓ dispose()

   ✓ isInitialized()

   ✓ load()

   ✓ loadHeader()

   ✓ loadFooter()

   ✓ loadShared()

   ✓ preload()

   ✓ reload()

   ✓ reloadShared()

   ✓ clearCache()

   ✓ has()

   ✓ isCached()

   ✓ getCacheSize()


   Status

   FRAMEWORK v5.0

   FROZEN

   EOF

============================================================== */

