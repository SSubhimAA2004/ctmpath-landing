
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * UI Module
 * --------------------------------------------------------------
 * Version : 5.0 (Framework Freeze)
 * Pattern : Singleton
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Presentation
 * ✓ Loader
 * ✓ Toast Notifications
 * ✓ Modal
 * ✓ Journey Counter
 * ✓ Page Transitions
 * ✓ Animation
 * ✓ Event Subscriptions
 *
 * Never
 * --------------------------------------------------------------
 * ✗ Business Logic
 * ✗ Routing
 * ✗ Validation
 * ✗ API
 * ✗ State Mutation
 * ✗ DOM Utilities
 * ✗ Component Loading
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

    #journeyCounter = null;

    #subscriptions = [];

    /* ==========================================================
       INITIALIZE
    ========================================================== */

    async init() {

        if (this.#initialized) {

            return;

        }

        this.#loader = CTM.DOM.get(

            CTM.Config.SELECTORS.LOADER

        );

        this.#toast = CTM.DOM.get(

            CTM.Config.SELECTORS.TOAST

        );

        this.#modal = CTM.DOM.get(

            CTM.Config.SELECTORS.MODAL

        );

        this.#journeyCounter = CTM.DOM.get(

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

        this.#loader = null;

        this.#toast = null;

        this.#modal = null;

        this.#journeyCounter = null;

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

    /* ==========================================================
       EVENT CLEANUP
    ========================================================== */

    #unsubscribeEvents() {

        this.#subscriptions.forEach(

            unsubscribe => {

                if (

                    typeof unsubscribe === 'function'

                ) {

                    unsubscribe();

                }

            }

        );

        this.#subscriptions = [];

    }

    /* ==========================================================
       Remaining Methods

       Batch 1B

       -----------------------------------------

       #onNavigationStarted()

       #onPageRendered()

       #onNavigationCompleted()

       #onNavigationFailed()

       showLoader()

       hideLoader()

       showToast()

       hideToast()

       updateJourneyCounter()

       scrollTop()

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

       ✓ Page Transition

       ✓ Focus Management

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
       SHOW LOADER

    ========================================================== */

    showLoader() {

        if (!this.#loader) {

            return;

        }

        CTM.DOM.show(

            this.#loader

        );

        CTM.DOM.setAttribute(

            this.#loader,

            'aria-hidden',

            'false'

        );

        CTM.DOM.addClass(

            this.#loader,

            CTM.Config.CSS.LOADER_VISIBLE

        );

    }

    /* ==========================================================
       HIDE LOADER

    ========================================================== */

    hideLoader() {

        if (!this.#loader) {

            return;

        }

        CTM.DOM.removeClass(

            this.#loader,

            CTM.Config.CSS.LOADER_VISIBLE

        );

        CTM.DOM.hide(

            this.#loader

        );

        CTM.DOM.setAttribute(

            this.#loader,

            'aria-hidden',

            'true'

        );

    }

    /* ==========================================================
       SHOW TOAST

    ========================================================== */

    showToast(

        message,

        type = 'info'

    ) {

        if (!this.#toast) {

            return;

        }

        CTM.DOM.setText(

            this.#toast,

            message

        );

        this.#toast.dataset.type = type;

        CTM.DOM.show(

            this.#toast

        );

        CTM.DOM.addClass(

            this.#toast,

            CTM.Config.CSS.TOAST_VISIBLE

        );

        window.setTimeout(

            () => {

                this.hideToast();

            },

            CTM.Config.TOAST.DURATION

        );

    }

    /* ==========================================================
       HIDE TOAST

    ========================================================== */

    hideToast() {

        if (!this.#toast) {

            return;

        }

        CTM.DOM.removeClass(

            this.#toast,

            CTM.Config.CSS.TOAST_VISIBLE

        );

        CTM.DOM.hide(

            this.#toast

        );

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

        CTM.DOM.setText(

            this.#journeyCounter,

            `${current} / ${total}`

        );

    }

    /* ==========================================================
       SCROLL TOP

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

       focusPage()

       showModal()

       hideModal()

       fadeInPage()

       fadeOutPage()

       waitForTransition()

       reflow()

    ========================================================== */

    /* ==========================================================
       FOCUS PAGE

    ========================================================== */

    focusPage() {

        const page = CTM.DOM.get(

            CTM.Config.SELECTORS.PAGE_CONTAINER

        );

        if (!page) {

            return;

        }

        CTM.DOM.setAttribute(

            page,

            'tabindex',

            '-1'

        );

        CTM.DOM.focus(

            page

        );

    }

    /* ==========================================================
       SHOW MODAL

    ========================================================== */

    showModal(content) {

        if (!this.#modal) {

            return;

        }

        const body = CTM.DOM.get(

            CTM.Config.SELECTORS.MODAL_BODY,

            this.#modal

        );

        if (body) {

            CTM.DOM.setHTML(

                body,

                content

            );

        }

        CTM.DOM.show(

            this.#modal

        );

        CTM.DOM.setAttribute(

            this.#modal,

            'aria-hidden',

            'false'

        );

        CTM.DOM.addClass(

            this.#modal,

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

        CTM.DOM.removeClass(

            this.#modal,

            CTM.Config.CSS.MODAL_VISIBLE

        );

        CTM.DOM.hide(

            this.#modal

        );

        CTM.DOM.setAttribute(

            this.#modal,

            'aria-hidden',

            'true'

        );

    }

    /* ==========================================================
       FADE IN PAGE

    ========================================================== */

    fadeInPage() {

        const page = CTM.DOM.get(

            CTM.Config.SELECTORS.PAGE_CONTAINER

        );

        if (!page) {

            return;

        }

        CTM.DOM.removeClass(

            page,

            CTM.Config.CSS.PAGE_FADE_OUT

        );

        CTM.DOM.addClass(

            page,

            CTM.Config.CSS.PAGE_FADE_IN

        );

    }

    /* ==========================================================
       FADE OUT PAGE

    ========================================================== */

    fadeOutPage() {

        const page = CTM.DOM.get(

            CTM.Config.SELECTORS.PAGE_CONTAINER

        );

        if (!page) {

            return;

        }

        CTM.DOM.removeClass(

            page,

            CTM.Config.CSS.PAGE_FADE_IN

        );

        CTM.DOM.addClass(

            page,

            CTM.Config.CSS.PAGE_FADE_OUT

        );

    }

    /* ==========================================================
       WAIT FOR TRANSITION

       Returns a Promise.

    ========================================================== */

    waitForTransition(target) {

        const element =

            CTM.DOM.get(target) ?? target;

        return new Promise(

            resolve => {

                if (!element) {

                    resolve();

                    return;

                }

                const handler = () => {

                    CTM.DOM.off(

                        element,

                        'transitionend',

                        handler

                    );

                    resolve();

                };

                CTM.DOM.once(

                    element,

                    'transitionend',

                    handler

                );

            }

        );

    }

    /* ==========================================================
       FORCE REFLOW

    ========================================================== */

    reflow(target) {

        const element =

            CTM.DOM.get(target) ?? target;

        if (!element) {

            return;

        }

        void element.offsetHeight;

    }

    /* ==========================================================
       Remaining Methods

       Batch 1D

       -----------------------------------------

       reset()

       onResize()

       onVisibilityChange()

       isInitialized()

       isLoaderVisible()

       isModalVisible()

       dispose()

    ========================================================== */

    /* ==========================================================
       RESET UI

       Restores UI to default visual state.

    ========================================================== */

    reset() {

        this.hideLoader();

        this.hideToast();

        this.hideModal();

    }

    /* ==========================================================
       WINDOW RESIZE

       Reserved for future responsive behaviour.

    ========================================================== */

    onResize() {

        CTM.Logger.info(

            'Viewport resized.'

        );

    }

    /* ==========================================================
       VISIBILITY CHANGE

       Reserved for future lifecycle behaviour.

    ========================================================== */

    onVisibilityChange() {

        CTM.Logger.info(

            'Visibility changed.'

        );

    }

    /* ==========================================================
       STATUS

    ========================================================== */

    isInitialized() {

        return this.#initialized;

    }

    /* ==========================================================
       LOADER STATUS

    ========================================================== */

    isLoaderVisible() {

        if (!this.#loader) {

            return false;

        }

        return !this.#loader.hidden;

    }

    /* ==========================================================
       MODAL STATUS

    ========================================================== */

    isModalVisible() {

        if (!this.#modal) {

            return false;

        }

        return !this.#modal.hidden;

    }

    /* ==========================================================
       DISPOSE

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
   FRAMEWORK FREEZE v5.0

   Responsibilities

   ✓ Presentation Layer

   ✓ Loader

   ✓ Toast Notifications

   ✓ Modal

   ✓ Journey Counter

   ✓ Page Transitions

   ✓ Animation Helpers

   ✓ Event Subscriptions


   Uses

   ✓ CTM.DOM

   ✓ CTM.Events

   ✓ CTM.Logger

   ✓ CTM.Config


   Never

   ✗ Business Logic

   ✗ Routing

   ✗ Navigation

   ✗ Validation

   ✗ API

   ✗ Storage

   ✗ State Mutation

   ✗ Generic DOM Utilities

   ✗ Component Loading


   Public API

   ✓ init()

   ✓ destroy()

   ✓ showLoader()

   ✓ hideLoader()

   ✓ showToast()

   ✓ hideToast()

   ✓ showModal()

   ✓ hideModal()

   ✓ updateJourneyCounter()

   ✓ scrollTop()

   ✓ fadeInPage()

   ✓ fadeOutPage()

   ✓ focusPage()

   ✓ waitForTransition()

   ✓ reflow()

   ✓ reset()

   ✓ onResize()

   ✓ onVisibilityChange()

   ✓ isInitialized()

   ✓ isLoaderVisible()

   ✓ isModalVisible()

   ✓ dispose()


   Event Flow

   Router

      │

      ▼

   Events

      │

      ▼

      UI

      │

      ▼

   CTM.DOM

      │

      ▼

     Browser DOM


   Status

   FRAMEWORK v5.0

   FROZEN

   EOF

============================================================== */

