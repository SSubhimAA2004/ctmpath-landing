
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/loader.js
 * Responsibility:
 * Load HTML components and JSON data.
 *
 * Engineering Status:
 * Production Build
 * Architecture: FROZEN
 * ==========================================================
 */

(() => {
    "use strict";

    /**
     * --------------------------------------------------------
     * Internal Cache
     * --------------------------------------------------------
     */

    const cache = {
        components: new Map(),
        data: new Map()
    };

    /**
     * --------------------------------------------------------
     * Fetch Text Resource
     * --------------------------------------------------------
     */

    async function fetchText(url) {

        const response = await fetch(url, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`Unable to load resource: ${url}`);
        }

        return response.text();

    }

    /**
     * --------------------------------------------------------
     * Fetch JSON Resource
     * --------------------------------------------------------
     */

    async function fetchJSON(url) {

        const response = await fetch(url, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error(`Unable to load JSON: ${url}`);
        }

        return response.json();

    }

    /**
     * --------------------------------------------------------
     * Load HTML Component
     * --------------------------------------------------------
     */

    async function loadComponent(name) {

        if (cache.components.has(name)) {
            return cache.components.get(name);
        }

        const html = await fetchText(`components/${name}.html`);

        cache.components.set(name, html);

        return html;

    }

    /**
     * --------------------------------------------------------
     * Load JSON File
     * --------------------------------------------------------
     */

    async function loadData(fileName) {

        if (cache.data.has(fileName)) {
            return cache.data.get(fileName);
        }

        const data = await fetchJSON(`data/${fileName}.json`);

        cache.data.set(fileName, data);

        return data;

    }

    /**
     * --------------------------------------------------------
     * Preload Multiple Components
     * --------------------------------------------------------
     */

    async function preloadComponents(names = []) {

        await Promise.all(
            names.map(loadComponent)
        );

    }

    /**
     * --------------------------------------------------------
     * Preload Multiple Data Files
     * --------------------------------------------------------
     */

    async function preloadData(files = []) {

        await Promise.all(
            files.map(loadData)
        );

    }

    /**
     * --------------------------------------------------------
     * Clear Cache
     * --------------------------------------------------------
     */

    function clearCache() {

        cache.components.clear();
        cache.data.clear();

    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMLoader = Object.freeze({

        loadComponent,

        loadData,

        preloadComponents,

        preloadData,

        clearCache

    });

})();
