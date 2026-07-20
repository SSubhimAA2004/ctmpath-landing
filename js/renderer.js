
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/renderer.js
 * Responsibility:
 * Render HTML components into the application container.
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
     * Root Application Container
     * --------------------------------------------------------
     */

    const ROOT_SELECTOR = "#app";

    /**
     * --------------------------------------------------------
     * Resolve Root Element
     * --------------------------------------------------------
     */

    function getRoot() {

        const root = document.querySelector(ROOT_SELECTOR);

        if (!root) {
            throw new Error(`Application root "${ROOT_SELECTOR}" not found.`);
        }

        return root;

    }

    /**
     * --------------------------------------------------------
     * Render HTML
     * --------------------------------------------------------
     */

    function render(html) {

        const root = getRoot();

        root.innerHTML = html;

        return root;

    }

    /**
     * --------------------------------------------------------
     * Append HTML
     * --------------------------------------------------------
     */

    function append(html) {

        const root = getRoot();

        root.insertAdjacentHTML("beforeend", html);

        return root;

    }

    /**
     * --------------------------------------------------------
     * Prepend HTML
     * --------------------------------------------------------
     */

    function prepend(html) {

        const root = getRoot();

        root.insertAdjacentHTML("afterbegin", html);

        return root;

    }

    /**
     * --------------------------------------------------------
     * Render Component
     * --------------------------------------------------------
     */

    async function renderComponent(name) {

        const html = await window.CTMLoader.loadComponent(name);

        return render(html);

    }

    /**
     * --------------------------------------------------------
     * Replace Element Content
     * --------------------------------------------------------
     */

    function replace(selector, html) {

        const element = document.querySelector(selector);

        if (!element) {
            throw new Error(`Element "${selector}" not found.`);
        }

        element.innerHTML = html;

        return element;

    }

    /**
     * --------------------------------------------------------
     * Remove Element
     * --------------------------------------------------------
     */

    function remove(selector) {

        const element = document.querySelector(selector);

        if (element) {
            element.remove();
        }

    }

    /**
     * --------------------------------------------------------
     * Clear Root Container
     * --------------------------------------------------------
     */

    function clear() {

        getRoot().innerHTML = "";

    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMRenderer = Object.freeze({

        render,

        append,

        prepend,

        renderComponent,

        replace,

        remove,

        clear

    });

})();
