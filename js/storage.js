
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : storage.js
   Version     : 1.0
   Status      : 🔒 LOCKED
   Purpose     : Browser Storage Layer
                  Owns:
                  • Local Storage
                  • Session Storage
                  • Read
                  • Write
                  • Remove
                  • Clear
                  • Journey Persistence

                  Owns NO:
                  • UI Rendering
                  • Business Logic
                  • API Calls
                  • Assessment Calculations
   ========================================================================== */

'use strict';

/* ==========================================================================
   STORAGE NAMESPACE
   ========================================================================== */

const StorageService = (() => {

    /* ======================================================================
       CONSTANTS
       ====================================================================== */

    const PREFIX = 'CTM_PATH_';

    const KEYS = {

        VISITOR           : `${PREFIX}VISITOR`,
        SESSION           : `${PREFIX}SESSION`,
        CURRENT_PAGE      : `${PREFIX}CURRENT_PAGE`,
        CURRENT_SPOKE     : `${PREFIX}CURRENT_SPOKE`,
        ASSESSMENT        : `${PREFIX}ASSESSMENT`,
        SCORES            : `${PREFIX}SCORES`,
        KALACHAKRA        : `${PREFIX}KALACHAKRA`,
        DIAGNOSIS         : `${PREFIX}DIAGNOSIS`,
        PRESCRIPTION      : `${PREFIX}PRESCRIPTION`,
        JOURNEY_STATUS    : `${PREFIX}JOURNEY_STATUS`

    };

    /* ======================================================================
       PRIVATE FUNCTIONS
       ====================================================================== */

    function serialize(data) {
        return JSON.stringify(data);
    }

    function deserialize(data) {

        if (!data) return null;

        try {

            return JSON.parse(data);

        } catch {

            return null;

        }

    }

    /* ======================================================================
       LOCAL STORAGE
       ====================================================================== */

    function save(key, value) {

        localStorage.setItem(key, serialize(value));

    }

    function load(key) {

        return deserialize(localStorage.getItem(key));

    }

    function remove(key) {

        localStorage.removeItem(key);

    }

    function exists(key) {

        return localStorage.getItem(key) !== null;

    }

    function clearAll() {

        Object.values(KEYS).forEach(remove);

    }

    /* ======================================================================
       SESSION STORAGE
       ====================================================================== */

    function saveSession(key, value) {

        sessionStorage.setItem(key, serialize(value));

    }

    function loadSession(key) {

        return deserialize(sessionStorage.getItem(key));

    }

    function clearSession() {

        sessionStorage.clear();

    }

    /* ======================================================================
       VISITOR
       ====================================================================== */

    function saveVisitor(visitor) {

        save(KEYS.VISITOR, visitor);

    }

    function getVisitor() {

        return load(KEYS.VISITOR);

    }

    /* ======================================================================
       SESSION
       ====================================================================== */

    function saveSessionState(session) {

        save(KEYS.SESSION, session);

    }

    function getSessionState() {

        return load(KEYS.SESSION);

    }

    /* ======================================================================
       PAGE
       ====================================================================== */

    function saveCurrentPage(page) {

        save(KEYS.CURRENT_PAGE, page);

    }

    function getCurrentPage() {

        return load(KEYS.CURRENT_PAGE);

    }

    /* ======================================================================
       SPOKE
       ====================================================================== */

    function saveCurrentSpoke(spoke) {

        save(KEYS.CURRENT_SPOKE, spoke);

    }

    function getCurrentSpoke() {

        return load(KEYS.CURRENT_SPOKE);

    }

    /* ======================================================================
       ASSESSMENT
       ====================================================================== */

    function saveAssessment(data) {

        save(KEYS.ASSESSMENT, data);

    }

    function getAssessment() {

        return load(KEYS.ASSESSMENT) || {};

    }

    /* ======================================================================
       SCORES
       ====================================================================== */

    function saveScores(scores) {

        save(KEYS.SCORES, scores);

    }

    function getScores() {

        return load(KEYS.SCORES) || {};

    }

    /* ======================================================================
       KALA CHAKRA
       ====================================================================== */

    function saveKalaChakra(data) {

        save(KEYS.KALACHAKRA, data);

    }

    function getKalaChakra() {

        return load(KEYS.KALACHAKRA);

    }

    /* ======================================================================
       DIAGNOSIS
       ====================================================================== */

    function saveDiagnosis(data) {

        save(KEYS.DIAGNOSIS, data);

    }

    function getDiagnosis() {

        return load(KEYS.DIAGNOSIS);

    }

    /* ======================================================================
       PRESCRIPTION
       ====================================================================== */

    function savePrescription(data) {

        save(KEYS.PRESCRIPTION, data);

    }

    function getPrescription() {

        return load(KEYS.PRESCRIPTION);

    }

    /* ======================================================================
       JOURNEY STATUS
       ====================================================================== */

    function saveJourneyStatus(status) {

        save(KEYS.JOURNEY_STATUS, status);

    }

    function getJourneyStatus() {

        return load(KEYS.JOURNEY_STATUS);

    }

    /* ======================================================================
       RESET APPLICATION
       ====================================================================== */

    function resetJourney() {

        clearAll();

        clearSession();

    }

    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return {

        KEYS,

        save,
        load,
        remove,
        exists,
        clearAll,

        saveSession,
        loadSession,
        clearSession,

        saveVisitor,
        getVisitor,

        saveSessionState,
        getSessionState,

        saveCurrentPage,
        getCurrentPage,

        saveCurrentSpoke,
        getCurrentSpoke,

        saveAssessment,
        getAssessment,

        saveScores,
        getScores,

        saveKalaChakra,
        getKalaChakra,

        saveDiagnosis,
        getDiagnosis,

        savePrescription,
        getPrescription,

        saveJourneyStatus,
        getJourneyStatus,

        resetJourney

    };

})();

/* ==========================================================================
   End of File

   File : storage.js

   Status : 🔒 LOCKED
   ========================================================================== */
