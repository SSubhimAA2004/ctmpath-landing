
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/conversation.js
 * Responsibility:
 * Conversation flow controller for the 5-Act / 35-Moment journey.
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
     * Active Conversation
     * --------------------------------------------------------
     */

    let activeAct = null;
    let activeData = null;

    /**
     * --------------------------------------------------------
     * Build Act File Name
     * --------------------------------------------------------
     */

    function getActFile(actNumber) {
        return `act${String(actNumber).padStart(2, "0")}`;
    }

    /**
     * --------------------------------------------------------
     * Load Current Act
     * --------------------------------------------------------
     */

    async function loadCurrentAct() {

        const act = CTMState.get("currentAct");
        const file = getActFile(act);

        activeData = await CTMLoader.loadData(file);
        activeAct = act;

        return activeData;

    }

    /**
     * --------------------------------------------------------
     * Get Current Moment
     * --------------------------------------------------------
     */

    function getCurrentMoment() {

        if (!activeData) {
            return null;
        }

        const moment = CTMState.get("currentMoment");

        if (!Array.isArray(activeData.moments)) {
            return null;
        }

        return (
            activeData.moments.find(item => item.id === moment) ||
            null
        );

    }

    /**
     * --------------------------------------------------------
     * Start Conversation
     * --------------------------------------------------------
     */

    async function start() {

        await loadCurrentAct();

        return getCurrentMoment();

    }

    /**
     * --------------------------------------------------------
     * Advance Conversation
     * --------------------------------------------------------
     */

    async function next() {

        CTMNavigation.next();

        const act = CTMState.get("currentAct");

        if (act !== activeAct) {
            await loadCurrentAct();
        }

        return getCurrentMoment();

    }

    /**
     * --------------------------------------------------------
     * Previous Moment
     * --------------------------------------------------------
     */

    async function previous() {

        CTMNavigation.previous();

        const act = CTMState.get("currentAct");

        if (act !== activeAct) {
            await loadCurrentAct();
        }

        return getCurrentMoment();

    }

    /**
     * --------------------------------------------------------
     * Restart Journey
     * --------------------------------------------------------
     */

    async function restart() {

        CTMState.resetJourney();

        return start();

    }

    /**
     * --------------------------------------------------------
     * Save Visitor Response
     * --------------------------------------------------------
     */

    function saveResponse(momentId, value) {

        const responses =
            CTMState.get("visitor.responses") || {};

        responses[momentId] = value;

        CTMState.set("visitor.responses", responses);

        return responses;

    }

    /**
     * --------------------------------------------------------
     * Read Visitor Response
     * --------------------------------------------------------
     */

    function getResponse(momentId) {

        const responses =
            CTMState.get("visitor.responses") || {};

        return responses[momentId];

    }

    /**
     * --------------------------------------------------------
     * Public API
     * --------------------------------------------------------
     */

    window.CTMConversation = Object.freeze({

        start,

        next,

        previous,

        restart,

        loadCurrentAct,

        getCurrentMoment,

        saveResponse,

        getResponse

    });

})();
