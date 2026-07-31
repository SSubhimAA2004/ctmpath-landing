
/* ==========================================================================
   CTM PATH™ Guided Journey™
   File        : js/welcome.js
   Version     : 1.0
   Status      : PAGE 01 (Freeze Candidate)

   Purpose
   -------
   Controller for Welcome Page.

   Responsibilities
   ----------------
   ✓ Initialize page
   ✓ Register events
   ✓ Play entrance animation
   ✓ Handle CTA
   ✓ Update journey counter
   ✓ Cleanup

   Does NOT
   --------
   ✗ Business logic
   ✗ Validation
   ✗ API calls
========================================================================== */

'use strict';

window.CTM = window.CTM || {};
CTM.Pages = CTM.Pages || {};

class WelcomePage {

    #initialized = false;

    #page = null;

    #btnBegin = null;

    #journeyCounter = null;

    #onBeginJourney = null;

    init() {

        if (this.#initialized) {
            return;
        }

        this.#page = document.getElementById(
            'welcome-page'
        );

        if (!this.#page) {

            CTM.Logger.warn(
                'Welcome page not found.'
            );

            return;
        }

        this.#btnBegin = document.getElementById(
            'btnBeginJourney'
        );

        this.#journeyCounter = document.getElementById(
            'journey-counter'
        );

        this.#updateJourneyCounter();

        this.#registerEvents();

        this.#playEntranceAnimation();

        CTM.Events.emit(
            CTM.Config.EVENTS.PAGE_INITIALIZED,
            {
                page: 'WELCOME'
            }
        );

        this.#initialized = true;

        CTM.Logger.info(
            'Welcome page initialized.'
        );

    }

    /* ==========================================================
       Register Events
    ========================================================== */

    #registerEvents() {

        this.#onBeginJourney =
            this.#handleBeginJourney.bind(this);

        if (this.#btnBegin) {

            this.#btnBegin.addEventListener(
                'click',
                this.#onBeginJourney
            );

        }

    }

    /* ==========================================================
       CTA
    ========================================================== */

    async #handleBeginJourney() {

        if (this.#btnBegin) {

            this.#btnBegin.disabled = true;

        }

        try {

            CTM.Logger.info(
                'Journey started.'
            );

            CTM.Events.emit(
                CTM.Config.EVENTS.JOURNEY_STARTED
            );

            await CTM.Navigation.next();

        }
        catch (error) {

            CTM.Logger.error(
                'Unable to start journey.',
                error
            );

            if (this.#btnBegin) {

                this.#btnBegin.disabled = false;

            }

        }

    }

    /* ==========================================================
       Journey Counter
    ========================================================== */

    #updateJourneyCounter() {

        if (!this.#journeyCounter) {
            return;
        }

        const journey = CTM.State.getJourney();

        const currentStep =
            journey.currentStep || 1;

        const totalSteps =
            journey.totalSteps || 18;

        this.#journeyCounter.textContent =
            String(currentStep)
                .padStart(2, '0') +
            ' / ' +
            String(totalSteps).padStart(2, '0');

    }

    /* ==========================================================
       Animation
    ========================================================== */

    #playEntranceAnimation() {

        requestAnimationFrame(() => {

            this.#page.classList.add(
                'is-ready'
            );

        });

    }

    /* ==========================================================
       Destroy
    ========================================================== */

    destroy() {

        if (this.#btnBegin &&
            this.#onBeginJourney) {

            this.#btnBegin.removeEventListener(
                'click',
                this.#onBeginJourney
            );

        }

        if (this.#page) {

            this.#page.classList.remove(
                'is-ready'
            );

        }

        this.#page = null;
        this.#btnBegin = null;
        this.#journeyCounter = null;
        this.#onBeginJourney = null;

        this.#initialized = false;

        CTM.Logger.info(
            'Welcome page destroyed.'
        );

    }

}

CTM.Pages.Welcome = Object.freeze(
    new WelcomePage()
);

