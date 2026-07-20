
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/navigation.js
 * Responsibility:
 * Journey navigation between Acts and Moments.
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
     * Configuration
     * --------------------------------------------------------
     */

    const TOTAL_ACTS = 5;
    const TOTAL_MOMENTS = 35;

    /**
     * --------------------------------------------------------
     * Current Position
     * --------------------------------------------------------
     */

    function getPosition() {

        return {

            act: CTMState.get(
                "navigation.currentAct"
            ),

            moment: CTMState.get(
                "navigation.currentMoment"
            )

        };

    }

    /**
     * --------------------------------------------------------
     * Navigate To
     * --------------------------------------------------------
     */

    function goTo(act, moment) {

        act = CTMUtils.clamp(
            act,
            1,
            TOTAL_ACTS
        );

        moment = CTMUtils.clamp(
            moment,
            1,
            TOTAL_MOMENTS
        );

        const previous = getPosition();

        CTMState.set(
            "navigation.previousScene",
            previous
        );

        CTMState.set(
            "navigation.currentAct",
            act
        );

        CTMState.set(
            "navigation.currentMoment",
            moment
        );

        CTMState.set(
            "navigation.currentScene",
            {
                act,
                moment
            }
        );

        return getPosition();

    }

    /**
     * --------------------------------------------------------
     * Next Moment
     * --------------------------------------------------------
     */

    function next() {

        let { act, moment } = getPosition();

        if (moment < TOTAL_MOMENTS) {

            moment++;

        }

        return goTo(
            act,
            moment
        );

    }

    /**
     * --------------------------------------------------------
     * Previous Moment
     * --------------------------------------------------------
     */

    function previous() {

        let { act, moment } = getPosition();

        if (moment > 1) {

            moment--;

        }

        return goTo(
            act,
            moment
        );

    }

    /**
     * --------------------------------------------------------
     * Next Act
     * --------------------------------------------------------
     */

    function nextAct() {

        let { act } = getPosition();

        if (act < TOTAL_ACTS) {

            act++;

        }

        return goTo(
            act,
            1
        );

    }

    /**
     * --------------------------------------------------------
     * Previous Act
     * --------------------------------------------------------
     */

    function previousAct() {

        let { act } = getPosition();

        if (act > 1) {

            act--;

        }

        return goTo(
            act,
            1
        );

    }

    /**
     * --------------------------------------------------------
     * Journey Completion
     * --------------------------------------------------------
     */

    function isComplete() {

        const position = getPosition();

        return (

            position.act === TOTAL_ACTS &&

            position.moment === TOTAL_MOMENTS

        );

    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMNavigation = Object.freeze({

        getPosition,

        goTo,

        next,

        previous,

        nextAct,

        previousAct,

        isComplete

    });

})();
