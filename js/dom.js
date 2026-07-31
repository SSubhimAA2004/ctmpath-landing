
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * DOM Module
 * --------------------------------------------------------------
 * Version : 5.0
 * Pattern : Singleton
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ DOM Query Helpers
 * ✓ Element Visibility
 * ✓ Class Manipulation
 * ✓ Content Updates
 * ✓ Attribute Helpers
 * ✓ Element State
 *
 * Never
 * --------------------------------------------------------------
 * ✗ Business Logic
 * ✗ Routing
 * ✗ Validation
 * ✗ API
 * ✗ Application State
 * ✗ UI Decisions
 *
 * ==============================================================
 */

window.CTM = window.CTM || {};

class DOM {

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
            'DOM module initialized.'
        );

    }

    /* ==========================================================
       DESTROY
    ========================================================== */

    async destroy() {

        this.#initialized = false;

    }

    /* ==========================================================
       STATUS
    ========================================================== */

    isInitialized() {

        return this.#initialized;

    }

    /* ==========================================================
       QUERY
    ========================================================== */

    get(selector, root = document) {

        return root.querySelector(selector);

    }

    /* ==========================================================
       QUERY ALL
    ========================================================== */

    getAll(selector, root = document) {

        return Array.from(

            root.querySelectorAll(selector)

        );

    }

    /* ==========================================================
       EXISTS
    ========================================================== */

    exists(selector, root = document) {

        return this.get(

            selector,

            root

        ) !== null;

    }

    /* ==========================================================
       FIND BY ID
    ========================================================== */

    byId(id) {

        return document.getElementById(id);

    }

    /* ==========================================================
       FIND BY CLASS
    ========================================================== */

    byClass(className) {

        return Array.from(

            document.getElementsByClassName(

                className

            )

        );

    }

    /* ==========================================================
       FIND BY TAG
    ========================================================== */

    byTag(tagName) {

        return Array.from(

            document.getElementsByTagName(

                tagName

            )

        );

    }

    /* ==========================================================
       Remaining Methods

       Batch 1B

       -----------------------------------------

       show()

       hide()

       toggle()

       enable()

       disable()

       focus()

       blur()

    ========================================================== */

}

CTM.DOM = Object.freeze(

    new DOM()

);

    /* ==========================================================
       SHOW

    ========================================================== */

    show(element, display = '') {

        if (!element) {
            return;
        }

        element.style.display = display;

    }

    /* ==========================================================
       HIDE

    ========================================================== */

    hide(element) {

        if (!element) {
            return;
        }

        element.style.display = 'none';

    }

    /* ==========================================================
       TOGGLE VISIBILITY

    ========================================================== */

    toggle(element, visible, display = '') {

        if (!element) {
            return;
        }

        if (visible) {

            this.show(

                element,

                display

            );

            return;

        }

        this.hide(element);

    }

    /* ==========================================================
       ENABLE

    ========================================================== */

    enable(element) {

        if (!element) {
            return;
        }

        element.disabled = false;

    }

    /* ==========================================================
       DISABLE

    ========================================================== */

    disable(element) {

        if (!element) {
            return;
        }

        element.disabled = true;

    }

    /* ==========================================================
       READ ONLY

    ========================================================== */

    setReadOnly(element, readOnly = true) {

        if (!element) {
            return;
        }

        element.readOnly = readOnly;

    }

    /* ==========================================================
       FOCUS

    ========================================================== */

    focus(element) {

        if (!element) {
            return;
        }

        element.focus();

    }

    /* ==========================================================
       BLUR

    ========================================================== */

    blur(element) {

        if (!element) {
            return;
        }

        element.blur();

    }

    /* ==========================================================
       SCROLL INTO VIEW

    ========================================================== */

    scrollIntoView(
        element,
        options = {
            behavior: 'smooth',
            block: 'start'
        }
    ) {

        if (!element) {
            return;
        }

        element.scrollIntoView(options);

    }

    /* ==========================================================
       Remaining Methods

       Batch 1C

       -----------------------------------------

       addClass()

       removeClass()

       toggleClass()

       hasClass()

       setText()

       setHTML()

       getValue()

       setValue()

    ========================================================== */

    /* ==========================================================
       PRIVATE

       RESOLVE TARGET

       Accepts either:

       • DOM Element
       • CSS Selector

    ========================================================== */

    #resolve(target) {

        if (!target) {

            return null;

        }

        if (typeof target === 'string') {

            return document.querySelector(target);

        }

        return target;

    }

    /* ==========================================================
       ADD CLASS

    ========================================================== */

    addClass(target, className) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.classList.add(className);

    }

    /* ==========================================================
       REMOVE CLASS

    ========================================================== */

    removeClass(target, className) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.classList.remove(className);

    }

    /* ==========================================================
       TOGGLE CLASS

    ========================================================== */

    toggleClass(target, className, force = null) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        if (force === null) {

            element.classList.toggle(className);

            return;

        }

        element.classList.toggle(

            className,

            force

        );

    }

    /* ==========================================================
       HAS CLASS

    ========================================================== */

    hasClass(target, className) {

        const element = this.#resolve(target);

        if (!element) {

            return false;

        }

        return element.classList.contains(

            className

        );

    }

    /* ==========================================================
       SET TEXT

    ========================================================== */

    setText(target, text = '') {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.textContent = text;

    }

    /* ==========================================================
       GET TEXT

    ========================================================== */

    getText(target) {

        const element = this.#resolve(target);

        if (!element) {

            return '';

        }

        return element.textContent;

    }

    /* ==========================================================
       SET HTML

    ========================================================== */

    setHTML(target, html = '') {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.innerHTML = html;

    }

    /* ==========================================================
       GET HTML

    ========================================================== */

    getHTML(target) {

        const element = this.#resolve(target);

        if (!element) {

            return '';

        }

        return element.innerHTML;

    }

    /* ==========================================================
       GET VALUE

    ========================================================== */

    getValue(target) {

        const element = this.#resolve(target);

        if (!element) {

            return null;

        }

        return element.value;

    }

    /* ==========================================================
       SET VALUE

    ========================================================== */

    setValue(target, value = '') {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.value = value;

    }

    /* ==========================================================
       CLEAR VALUE

    ========================================================== */

    clearValue(target) {

        this.setValue(

            target,

            ''

        );

    }

    /* ==========================================================
       Remaining Methods

       Batch 1D

       -----------------------------------------

       setAttribute()

       getAttribute()

       removeAttribute()

       create()

       append()

       prepend()

       remove()

       empty()

    ========================================================== */

    /* ==========================================================
       SET ATTRIBUTE

    ========================================================== */

    setAttribute(target, name, value) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.setAttribute(

            name,

            value

        );

    }

    /* ==========================================================
       GET ATTRIBUTE

    ========================================================== */

    getAttribute(target, name) {

        const element = this.#resolve(target);

        if (!element) {

            return null;

        }

        return element.getAttribute(name);

    }

    /* ==========================================================
       REMOVE ATTRIBUTE

    ========================================================== */

    removeAttribute(target, name) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.removeAttribute(name);

    }

    /* ==========================================================
       CREATE ELEMENT

    ========================================================== */

    create(tagName) {

        return document.createElement(tagName);

    }

    /* ==========================================================
       APPEND CHILD

    ========================================================== */

    append(target, child) {

        const parent = this.#resolve(target);

        if (!parent || !child) {

            return;

        }

        parent.appendChild(child);

    }

    /* ==========================================================
       PREPEND CHILD

    ========================================================== */

    prepend(target, child) {

        const parent = this.#resolve(target);

        if (!parent || !child) {

            return;

        }

        parent.prepend(child);

    }

    /* ==========================================================
       INSERT BEFORE

    ========================================================== */

    insertBefore(target, child) {

        const element = this.#resolve(target);

        if (!element || !child) {

            return;

        }

        element.parentNode.insertBefore(

            child,

            element

        );

    }

    /* ==========================================================
       INSERT AFTER

    ========================================================== */

    insertAfter(target, child) {

        const element = this.#resolve(target);

        if (!element || !child) {

            return;

        }

        element.parentNode.insertBefore(

            child,

            element.nextSibling

        );

    }

    /* ==========================================================
       REMOVE ELEMENT

    ========================================================== */

    remove(target) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.remove();

    }

    /* ==========================================================
       EMPTY ELEMENT

    ========================================================== */

    empty(target) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.replaceChildren();

    }

    /* ==========================================================
       CLONE ELEMENT

    ========================================================== */

    clone(target, deep = true) {

        const element = this.#resolve(target);

        if (!element) {

            return null;

        }

        return element.cloneNode(deep);

    }

    /* ==========================================================
       Remaining Methods

       Batch 1E (EOF)

       -----------------------------------------

       on()

       off()

       once()

       trigger()

       dispose()

       Singleton Export

       Framework Freeze

    ========================================================== */

    /* ==========================================================
       ADD EVENT LISTENER

    ========================================================== */

    on(target, eventName, handler, options = false) {

        const element = this.#resolve(target);

        if (!element || typeof handler !== 'function') {

            return;

        }

        element.addEventListener(

            eventName,

            handler,

            options

        );

    }

    /* ==========================================================
       REMOVE EVENT LISTENER

    ========================================================== */

    off(target, eventName, handler, options = false) {

        const element = this.#resolve(target);

        if (!element || typeof handler !== 'function') {

            return;

        }

        element.removeEventListener(

            eventName,

            handler,

            options

        );

    }

    /* ==========================================================
       ADD ONE-TIME EVENT LISTENER

    ========================================================== */

    once(target, eventName, handler) {

        this.on(

            target,

            eventName,

            handler,

            {

                once: true

            }

        );

    }

    /* ==========================================================
       DISPATCH EVENT

    ========================================================== */

    trigger(target, eventName, detail = {}) {

        const element = this.#resolve(target);

        if (!element) {

            return;

        }

        element.dispatchEvent(

            new CustomEvent(

                eventName,

                {

                    bubbles: true,

                    cancelable: true,

                    detail

                }

            )

        );

    }

    /* ==========================================================
       DOCUMENT READY

    ========================================================== */

    ready(callback) {

        if (

            typeof callback !== 'function'

        ) {

            return;

        }

        if (

            document.readyState === 'loading'

        ) {

            document.addEventListener(

                'DOMContentLoaded',

                callback,

                {

                    once: true

                }

            );

            return;

        }

        callback();

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

CTM.DOM = Object.freeze(

    new DOM()

);

/* ==============================================================
   FRAMEWORK FREEZE v5.0

   Responsibilities

   ✓ DOM Queries

   ✓ Element Visibility

   ✓ Content Updates

   ✓ Class Management

   ✓ Attribute Management

   ✓ DOM Tree Operations

   ✓ Event Helpers

   ✓ Browser DOM Utilities


   Never

   ✗ Business Logic

   ✗ Navigation

   ✗ Routing

   ✗ Validation

   ✗ API

   ✗ State

   ✗ UI Decisions


   Public API

   ✓ init()

   ✓ destroy()

   ✓ dispose()

   ✓ isInitialized()

   ✓ get()

   ✓ getAll()

   ✓ exists()

   ✓ byId()

   ✓ byClass()

   ✓ byTag()

   ✓ show()

   ✓ hide()

   ✓ toggle()

   ✓ enable()

   ✓ disable()

   ✓ setReadOnly()

   ✓ focus()

   ✓ blur()

   ✓ scrollIntoView()

   ✓ addClass()

   ✓ removeClass()

   ✓ toggleClass()

   ✓ hasClass()

   ✓ setText()

   ✓ getText()

   ✓ setHTML()

   ✓ getHTML()

   ✓ getValue()

   ✓ setValue()

   ✓ clearValue()

   ✓ setAttribute()

   ✓ getAttribute()

   ✓ removeAttribute()

   ✓ create()

   ✓ append()

   ✓ prepend()

   ✓ insertBefore()

   ✓ insertAfter()

   ✓ remove()

   ✓ empty()

   ✓ clone()

   ✓ on()

   ✓ off()

   ✓ once()

   ✓ trigger()

   ✓ ready()

   Status

   FRAMEWORK v5.0

   FROZEN

   EOF

============================================================== */



