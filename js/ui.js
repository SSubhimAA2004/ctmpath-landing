
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * UI Module
 * --------------------------------------------------------------
 * Version : 4.0 (Framework Freeze)
 * Pattern : Singleton
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Presentation
 * ✓ DOM Utilities
 * ✓ Shared Components
 * ✓ Event Subscriptions
 * ✓ Visual Feedback
 *
 * Never
 * --------------------------------------------------------------
 * ✗ Business Logic
 * ✗ Routing
 * ✗ Validation
 * ✗ API
 * ✗ State Mutation
 * ==============================================================
 */

window.CTM = window.CTM || {};

class UI {

    /* ==========================================================
       PRIVATE STATE
    ========================================================== */

    #initialized = false;

    #loader = null;

    #toast = null;

    #modal = null;

    #header = null;

    #footer = null;

    #journeyCounter = null;

    #subscriptions = [];

    /* ==========================================================
       INITIALIZE
    ========================================================== */

    async init() {

        if (this.#initialized) {

            return;

        }

        this.#header = document.querySelector(
            CTM.Config.SELECTORS.HEADER
        );

        this.#footer = document.querySelector(
            CTM.Config.SELECTORS.FOOTER
        );

        this.#journeyCounter = document.querySelector(
            CTM.Config.SELECTORS.JOURNEY_COUNTER
        );

        this.#registerEvents();

        this.#initialized = true;

        CTM.Logger.info(
            'UI initialized.'
        );

    }

    /* ==========================================================
       DESTROY
    ========================================================== */

    async destroy() {

        this.#unsubscribeEvents();

        this.#initialized = false;

        CTM.Logger.info(
            'UI destroyed.'
        );

    }

    /* ==========================================================
       EVENT REGISTRATION
    ========================================================== */

    #registerEvents() {

        this.#subscriptions.push(

            CTM.Events.on(

                CTM.Config.EVENTS.NAVIGATION_STARTED,

                this.#onNavigationStarted.bind(this)

            )

        );

        this.#subscriptions.push(

            CTM.Events.on(

                CTM.Config.EVENTS.PAGE_RENDERED,

                this.#onPageRendered.bind(this)

            )

        );

        this.#subscriptions.push(

            CTM.Events.on(

                CTM.Config.EVENTS.NAVIGATION_COMPLETED,

                this.#onNavigationCompleted.bind(this)

            )

        );

        this.#subscriptions.push(

            CTM.Events.on(

                CTM.Config.EVENTS.NAVIGATION_FAILED,

                this.#onNavigationFailed.bind(this)

            )

        );

    }

    #unsubscribeEvents() {

        this.#subscriptions.forEach(

            unsubscribe => {

                if (typeof unsubscribe === 'function') {

                    unsubscribe();

                }

            }

        );

        this.#subscriptions = [];

    }

    /* ==========================================================
       EVENT HANDLERS

       Batch 1B

       #onNavigationStarted()

       #onPageRendered()

       #onNavigationCompleted()

       #onNavigationFailed()

       Loader

       Toast

       Journey Counter

       Scroll Manager

    ========================================================== */

}

CTM.UI = Object.freeze(

    new UI()

);

    /* ==========================================================
       NAVIGATION STARTED

       Responsibility

       ✓ Show Loader

    ========================================================== */

    #onNavigationStarted(event) {

        this.showLoader();

    }

    /* ==========================================================
       PAGE RENDERED

       Responsibility

       ✓ Page transition
       ✓ Focus management

    ========================================================== */

    #onPageRendered(event) {

        this.fadeInPage();

        this.focusPage();

    }

    /* ==========================================================
       NAVIGATION COMPLETED

       Responsibility

       ✓ Hide Loader
       ✓ Scroll Top
       ✓ Journey Counter

    ========================================================== */

    #onNavigationCompleted(event) {

        this.hideLoader();

        this.scrollTop();

        this.updateJourneyCounter(

            event.order,

            event.total

        );

    }

    /* ==========================================================
       NAVIGATION FAILED

       Responsibility

       ✓ Hide Loader
       ✓ Error Toast

    ========================================================== */

    #onNavigationFailed(event) {

        this.hideLoader();

        this.showToast(

            event.error?.message ??

            CTM.Config.ERRORS.UNKNOWN,

            'error'

        );

    }

    /* ==========================================================
       LOADER
    ========================================================== */

    showLoader() {

        if (!this.#loader) {

            this.#loader = document.querySelector(

                CTM.Config.SELECTORS.LOADER

            );

        }

        if (!this.#loader) {

            return;

        }

        this.#loader.hidden = false;

        this.#loader.setAttribute(

            'aria-hidden',

            'false'

        );

        this.#loader.classList.add(

            CTM.Config.CSS.LOADER_VISIBLE

        );

    }

    hideLoader() {

        if (!this.#loader) {

            return;

        }

        this.#loader.classList.remove(

            CTM.Config.CSS.LOADER_VISIBLE

        );

        this.#loader.hidden = true;

        this.#loader.setAttribute(

            'aria-hidden',

            'true'

        );

    }

    /* ==========================================================
       TOAST
    ========================================================== */

    showToast(

        message,

        type = 'info'

    ) {

        if (!this.#toast) {

            this.#toast = document.querySelector(

                CTM.Config.SELECTORS.TOAST

            );

        }

        if (!this.#toast) {

            return;

        }

        this.#toast.textContent =

            message;

        this.#toast.dataset.type =

            type;

        this.#toast.hidden = false;

        this.#toast.classList.add(

            CTM.Config.CSS.TOAST_VISIBLE

        );

        window.setTimeout(

            () => {

                this.hideToast();

            },

            CTM.Config.TOAST.DURATION

        );

    }

    hideToast() {

        if (!this.#toast) {

            return;

        }

        this.#toast.classList.remove(

            CTM.Config.CSS.TOAST_VISIBLE

        );

        this.#toast.hidden = true;

    }

    /* ==========================================================
       JOURNEY COUNTER
    ========================================================== */

    updateJourneyCounter(

        current,

        total

    ) {

        if (!this.#journeyCounter) {

            return;

        }

        this.#journeyCounter.textContent =

            `${current} / ${total}`;

    }

    /* ==========================================================
       SCROLL
    ========================================================== */

    scrollTop() {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    }

    /* ==========================================================
       Remaining Methods

       Batch 1C

       -----------------------------------------

       loadComponent()

       loadHeader()

       loadFooter()

       DOM Helpers

       Query Helpers

    ========================================================== */

    /* ==========================================================
       LOAD COMPONENT

       Loads reusable HTML components.

       Examples

       header.html
       footer.html

    ========================================================== */

    async loadComponent(

        container,

        file

    ) {

        if (

            !container ||

            !file

        ) {

            return;

        }

        const response = await fetch(

            file,

            {

                cache: 'no-cache'

            }

        );

        if (!response.ok) {

            throw new Error(

                `Unable to load component: ${file}`

            );

        }

        container.innerHTML =

            await response.text();

    }

    /* ==========================================================
       LOAD HEADER
    ========================================================== */

    async loadHeader() {

        if (!this.#header) {

            return;

        }

        await this.loadComponent(

            this.#header,

            CTM.Config.COMPONENTS.HEADER

        );

    }

    /* ==========================================================
       LOAD FOOTER
    ========================================================== */

    async loadFooter() {

        if (!this.#footer) {

            return;

        }

        await this.loadComponent(

            this.#footer,

            CTM.Config.COMPONENTS.FOOTER

        );

    }

    /* ==========================================================
       LOAD SHARED COMPONENTS
    ========================================================== */

    async loadSharedComponents() {

        await Promise.all([

            this.loadHeader(),

            this.loadFooter()

        ]);

    }

    /* ==========================================================
       QUERY HELPERS
    ========================================================== */

    get(selector) {

        return document.querySelector(

            selector

        );

    }

    getAll(selector) {

        return Array.from(

            document.querySelectorAll(

                selector

            )

        );

    }

    /* ==========================================================
       VISIBILITY
    ========================================================== */

    show(element) {

        if (!element) {

            return;

        }

        element.hidden = false;

    }

    hide(element) {

        if (!element) {

            return;

        }

        element.hidden = true;

    }

    /* ==========================================================
       TEXT
    ========================================================== */

    setText(

        element,

        value

    ) {

        if (!element) {

            return;

        }

        element.textContent =

            value;

    }

    /* ==========================================================
       HTML
    ========================================================== */

    setHTML(

        element,

        html

    ) {

        if (!element) {

            return;

        }

        element.innerHTML =

            html;

    }

    /* ==========================================================
       CLASS HELPERS
    ========================================================== */

    addClass(

        element,

        className

    ) {

        if (!element) {

            return;

        }

        element.classList.add(

            className

        );

    }

    removeClass(

        element,

        className

    ) {

        if (!element) {

            return;

        }

        element.classList.remove(

            className

        );

    }

    toggleClass(

        element,

        className,

        force

    ) {

        if (!element) {

            return;

        }

        element.classList.toggle(

            className,

            force

        );

    }

    /* ==========================================================
       ATTRIBUTE HELPERS
    ========================================================== */

    setAttribute(

        element,

        name,

        value

    ) {

        if (!element) {

            return;

        }

        element.setAttribute(

            name,

            value

        );

    }

    removeAttribute(

        element,

        name

    ) {

        if (!element) {

            return;

        }

        element.removeAttribute(

            name

        );

    }

    /* ==========================================================
       FOCUS
    ========================================================== */

    focusPage() {

        const page = document.querySelector(

            CTM.Config.SELECTORS.PAGE_CONTAINER

        );

        if (!page) {

            return;

        }

        page.setAttribute(

            'tabindex',

            '-1'

        );

        page.focus();

    }

    /* ==========================================================
       Remaining Methods

       Batch 1D

       -----------------------------------------

       Modal

       Fade In

       Fade Out

       Animation Helpers

       Transition Helpers

    ========================================================== */

    /* ==========================================================
       SHOW MODAL
    ========================================================== */

    showModal(content) {

        if (!this.#modal) {

            this.#modal = document.querySelector(

                CTM.Config.SELECTORS.MODAL

            );

        }

        if (!this.#modal) {

            return;

        }

        const body = this.#modal.querySelector(

            CTM.Config.SELECTORS.MODAL_BODY

        );

        if (body) {

            body.innerHTML = content;

        }

        this.#modal.hidden = false;

        this.#modal.setAttribute(

            'aria-hidden',

            'false'

        );

        this.#modal.classList.add(

            CTM.Config.CSS.MODAL_VISIBLE

        );

    }

    /* ==========================================================
       HIDE MODAL
    ========================================================== */

    hideModal() {

        if (!this.#modal) {

            return;

        }

        this.#modal.classList.remove(

            CTM.Config.CSS.MODAL_VISIBLE

        );

        this.#modal.hidden = true;

        this.#modal.setAttribute(

            'aria-hidden',

            'true'

        );

    }

    /* ==========================================================
       PAGE FADE IN
    ========================================================== */

    fadeInPage() {

        const page = document.querySelector(

            CTM.Config.SELECTORS.PAGE_CONTAINER

        );

        if (!page) {

            return;

        }

        page.classList.remove(

            CTM.Config.CSS.PAGE_FADE_OUT

        );

        page.classList.add(

            CTM.Config.CSS.PAGE_FADE_IN

        );

    }

    /* ==========================================================
       PAGE FADE OUT
    ========================================================== */

    fadeOutPage() {

        const page = document.querySelector(

            CTM.Config.SELECTORS.PAGE_CONTAINER

        );

        if (!page) {

            return;

        }

        page.classList.remove(

            CTM.Config.CSS.PAGE_FADE_IN

        );

        page.classList.add(

            CTM.Config.CSS.PAGE_FADE_OUT

        );

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
       LOADING STATE
    ========================================================== */

    setLoading(

        element,

        loading = true

    ) {

        if (!element) {

            return;

        }

        element.disabled = loading;

        element.classList.toggle(

            CTM.Config.CSS.LOADING,

            loading

        );

    }

    /* ==========================================================
       ANIMATION

       Returns Promise resolved after transition.

    ========================================================== */

    waitForTransition(element) {

        return new Promise(

            resolve => {

                if (!element) {

                    resolve();

                    return;

                }

                const handler = () => {

                    element.removeEventListener(

                        'transitionend',

                        handler

                    );

                    resolve();

                };

                element.addEventListener(

                    'transitionend',

                    handler,

                    {

                        once: true

                    }

                );

            }

        );

    }

    /* ==========================================================
       FORCE REFLOW

       Useful before CSS transitions.

    ========================================================== */

    reflow(element) {

        if (!element) {

            return;

        }

        void element.offsetHeight;

    }

    /* ==========================================================
       Remaining Methods

       Batch 1E (EOF)

       -----------------------------------------

       Utilities

       Reset

       Cleanup

       Singleton Export

       Framework Freeze

    ========================================================== */

    /* ==========================================================
       RESET UI

       Restores UI to its default visual state.

    ========================================================== */

    reset() {

        this.hideLoader();

        this.hideToast();

        this.hideModal();

    }

    /* ==========================================================
       RESIZE

       Hook for future responsive behaviour.

    ========================================================== */

    onResize() {

        CTM.Logger.info(

            'Viewport resized.'

        );

    }

    /* ==========================================================
       VISIBILITY CHANGE

       Hook for future lifecycle events.

    ========================================================== */

    onVisibilityChange() {

        CTM.Logger.info(

            'Visibility changed.'

        );

    }

    /* ==========================================================
       PUBLIC HELPERS

    ========================================================== */

    isInitialized() {

        return this.#initialized;

    }

    isLoaderVisible() {

        return this.#loader
            ? !this.#loader.hidden
            : false;

    }

    isModalVisible() {

        return this.#modal
            ? !this.#modal.hidden
            : false;

    }

    /* ==========================================================
       CLEANUP

    ========================================================== */

    async dispose() {

        this.reset();

        await this.destroy();

    }

}

/* ==============================================================
   SINGLETON EXPORT
============================================================== */

CTM.UI = Object.freeze(

    new UI()

);

/* ==============================================================
   FRAMEWORK FREEZE v4.0

   Responsibilities

   ✓ Presentation
   ✓ Loader
   ✓ Toast Notifications
   ✓ Modal
   ✓ Scroll Management
   ✓ Journey Counter
   ✓ Shared Component Loading
   ✓ Page Transitions
   ✓ Animation Helpers
   ✓ DOM Interaction
   ✓ Event Subscriptions

   Never

   ✗ Routing
   ✗ Business Logic
   ✗ Validation
   ✗ API
   ✗ Application State

   Event Flow

   Router

       ↓

   Event Bus

       ↓

   UI

       ↓

   DOM

   Status

   FRAMEWORK FREEZE v4.0

   EOF

============================================================== */

