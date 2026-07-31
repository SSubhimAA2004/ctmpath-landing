
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : navigation.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class Navigation {

    #initialized = false;

    #steps = [];

    init() {

        if (this.#initialized) {
            return;
        }

        this.#steps = Object.freeze([

            'WELCOME',
            'DISCOVERY',
            'ASSESSMENT',
            'RESULTS',
            'DIAGNOSIS',
            'ROADMAP',
            'CONTINUE'

        ]);

        this.#initialized = true;

        CTM.Logger.info(
            'Navigation initialized.'
        );

    }

    /* ======================================================
       Current Step
       ====================================================== */

    currentStep() {

        return CTM.State
            .getJourney()
            .currentStep;

    }

    totalSteps() {

        return this.#steps.length;

    }

    /* ======================================================
       Navigation Validation
       ====================================================== */

    canNavigate(step) {

        return (

            step >= 1 &&

            step <= this.totalSteps()

        );

    }

    /* ======================================================
       Next
       ====================================================== */

    async next() {

        const nextStep =

            this.currentStep() + 1;

        if (!this.canNavigate(nextStep)) {

            return false;

        }

        return this.goTo(nextStep);

    }

    /* ======================================================
       Previous
       ====================================================== */

    async previous() {

        const previousStep =

            this.currentStep() - 1;

        if (!this.canNavigate(previousStep)) {

            return false;

        }

        return this.goTo(previousStep);

    }

    /* ======================================================
       Go To Step
       ====================================================== */

    async goTo(step) {

        if (!this.canNavigate(step)) {

            CTM.Logger.warn(

                `Invalid step: ${step}`

            );

            return false;

        }

        const route =

            this.#steps[step - 1];

        CTM.State.updateJourney({

            currentStep: step

        });

        CTM.Events.emit(

            CTM.Config.EVENTS.JOURNEY_STEP_CHANGED,

            {

                step,

                route

            }

        );

        return CTM.Router.navigate(

            route

        );

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.#initialized = false;

    }

}

CTM.Navigation = Object.freeze(

    new Navigation()

);

