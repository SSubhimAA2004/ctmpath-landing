
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0

   File        : constants.js
   Version     : 2.0
   Status      : 🔒 FOUNDATION

   Purpose     : Global Application Constants

   Owns

      • Application Configuration
      • Page Routes
      • Storage Keys
      • Assessment Constants
      • API Actions

   Owns NO

      • Business Logic
      • DOM Manipulation
      • API Calls
      • Storage Operations

   ========================================================================== */


"use strict";


/* ==========================================================================
   APPLICATION
   ========================================================================== */


const APP_CONSTANTS = {


    NAME:

        "CTM PATH™ Guided Journey",


    VERSION:

        "2.0",


    ENVIRONMENT:

        "production"


};





/* ==========================================================================
   PAGE ROUTES
   ========================================================================== */


const PAGE_ROUTES = {


    LANDING:

        "landing.html",


    REGISTRATION:

        "registration.html",


    ASSESSMENT_01:

        "assessment-01.html",


    ASSESSMENT_02:

        "assessment-02.html",


    ASSESSMENT_03:

        "assessment-03.html",


    ASSESSMENT_04:

        "assessment-04.html",


    ASSESSMENT_05:

        "assessment-05.html",


    ASSESSMENT_06:

        "assessment-06.html",


    ASSESSMENT_07:

        "assessment-07.html",


    ASSESSMENT_08:

        "assessment-08.html",


    ASSESSMENT_09:

        "assessment-09.html",


    ASSESSMENT_10:

        "assessment-10.html",


    ASSESSMENT_11:

        "assessment-11.html",


    ASSESSMENT_12:

        "assessment-12.html",


    KALA_CHAKRA:

        "kaalachakra.html",


    DIAGNOSIS:

        "diagnosis.html",


    PRESCRIPTION:

        "prescription.html",


    COMPLETION:

        "completion.html"


};


/* ==========================================================
   Continue in Batch 1B
   ========================================================== */

/* ==========================================================================
   STORAGE KEYS
   ========================================================================== */


const STORAGE_KEYS = {


    VISITOR:

        "ctm_path_visitor",


    VISITOR_ID:

        "ctm_path_visitor_id",


    JOURNEY_PROGRESS:

        "ctm_path_journey_progress",


    ASSESSMENT_RESPONSES:

        "ctm_path_assessment_responses",


    ASSESSMENT_CURRENT_SPOKE:

        "ctm_path_current_spoke",


    ASSESSMENT_COMPLETED:

        "ctm_path_assessment_completed",


    KALA_CHAKRA_RESULT:

        "ctm_path_kala_chakra_result",


    DIAGNOSIS_RESULT:

        "ctm_path_diagnosis_result",


    PRESCRIPTION_RESULT:

        "ctm_path_prescription_result"


};





/* ==========================================================================
   ASSESSMENT CONFIGURATION
   ========================================================================== */


const ASSESSMENT_CONSTANTS = {


    TOTAL_SPOKES:

        12,


    QUESTIONS_PER_SPOKE:

        3,


    TOTAL_QUESTIONS:

        36,


    MIN_RATING:

        1,


    MAX_RATING:

        10,


    COMPLETION_PERCENT:

        100


};





/* ==========================================================================
   ASSESSMENT SPOKES
   ========================================================================== */


const ASSESSMENT_SPOKES = {


    PURPOSE:

        1,


    HEALTH:

        2,


    RELATIONSHIPS:

        3,


    CHARACTER:

        4,


    FINANCIAL_STEWARDSHIP:

        5,


    MIND_EMOTIONAL_WELLBEING:

        6,


    GROWTH_LEARNING:

        7,


    SELF_DISCIPLINE:

        8,


    GRATITUDE_AWARENESS:

        9,


    CONTRIBUTION:

        10,


    INNER_MEANING:

        11,


    LEGACY:

        12


};


/* ==========================================================
   Continue in Batch 1C
   ========================================================== */

/* ==========================================================================
   API ACTIONS
   ========================================================================== */


const API_ACTIONS = {


    REGISTER_VISITOR:

        "registerVisitor",


    GET_VISITOR:

        "getVisitor",


    UPDATE_VISITOR:

        "updateVisitor",


    SAVE_ASSESSMENT:

        "saveAssessment",


    SAVE_KALA_CHAKRA:

        "saveKalaChakra",


    SAVE_DIAGNOSIS:

        "saveDiagnosis",


    SAVE_PRESCRIPTION:

        "savePrescription",


    COMPLETE_JOURNEY:

        "completeJourney"


};





/* ==========================================================================
   JOURNEY STATUS
   ========================================================================== */


const JOURNEY_STATUS = {


    STARTED:

        "started",


    ASSESSMENT_IN_PROGRESS:

        "assessment_in_progress",


    ASSESSMENT_COMPLETED:

        "assessment_completed",


    KALA_CHAKRA_COMPLETED:

        "kala_chakra_completed",


    DIAGNOSIS_COMPLETED:

        "diagnosis_completed",


    PRESCRIPTION_COMPLETED:

        "prescription_completed",


    COMPLETED:

        "completed"


};





/* ==========================================================================
   SCORE CONFIGURATION
   ========================================================================== */


const SCORE_CONSTANTS = {


    MAX_PILLAR_SCORE:

        30,


    MIN_PILLAR_SCORE:

        3,


    MAX_TOTAL_SCORE:

        360,


    MIN_TOTAL_SCORE:

        36,


    SCORE_PERCENTAGE_BASE:

        100


};





/* ==========================================================================
   VALIDATION MESSAGES
   ========================================================================== */


const VALIDATION_MESSAGES = {


    REQUIRED:

        "This field is required.",


    INVALID_EMAIL:

        "Please enter a valid email address.",


    INVALID_PHONE:

        "Please enter a valid mobile number.",


    SELECT_RATING:

        "Please select a rating before continuing.",


    SAVE_ERROR:

        "Unable to save your progress. Please try again."


};


/* ==========================================================
   Continue in Batch 1D
   ========================================================== */

/* ==========================================================================
   UI CONSTANTS
   ========================================================================== */


const UI_CONSTANTS = {


    ACTIVE_CLASS:

        "active",


    DISABLED_CLASS:

        "disabled",


    HIDDEN_CLASS:

        "hidden",


    LOADING_CLASS:

        "loading"


};





/* ==========================================================================
   NAVIGATION CONSTANTS
   ========================================================================== */


const NAVIGATION_CONSTANTS = {


    FIRST_ASSESSMENT:

        1,


    LAST_ASSESSMENT:

        12,


    NEXT_ACTION:

        "next",


    PREVIOUS_ACTION:

        "previous"


};





/* ==========================================================================
   EVENT NAMES
   ========================================================================== */


const EVENT_NAMES = {


    PAGE_READY:

        "pageReady",


    ASSESSMENT_UPDATED:

        "assessmentUpdated",


    ASSESSMENT_COMPLETED:

        "assessmentCompleted",


    JOURNEY_COMPLETED:

        "journeyCompleted"


};





/* ==========================================================================
   APPLICATION EXPORT
   ========================================================================== */


const CTM_CONSTANTS = {


    APP:

        APP_CONSTANTS,


    PAGES:

        PAGE_ROUTES,


    STORAGE:

        STORAGE_KEYS,


    ASSESSMENT:

        ASSESSMENT_CONSTANTS,


    SPOKES:

        ASSESSMENT_SPOKES,


    API:

        API_ACTIONS,


    STATUS:

        JOURNEY_STATUS,


    SCORE:

        SCORE_CONSTANTS,


    VALIDATION:

        VALIDATION_MESSAGES,


    UI:

        UI_CONSTANTS,


    NAVIGATION:

        NAVIGATION_CONSTANTS,


    EVENTS:

        EVENT_NAMES


};





/* ==========================================================================
   FREEZE CONSTANTS
   ========================================================================== */


Object.freeze(APP_CONSTANTS);

Object.freeze(PAGE_ROUTES);

Object.freeze(STORAGE_KEYS);

Object.freeze(ASSESSMENT_CONSTANTS);

Object.freeze(ASSESSMENT_SPOKES);

Object.freeze(API_ACTIONS);

Object.freeze(JOURNEY_STATUS);

Object.freeze(SCORE_CONSTANTS);

Object.freeze(VALIDATION_MESSAGES);

Object.freeze(UI_CONSTANTS);

Object.freeze(NAVIGATION_CONSTANTS);

Object.freeze(EVENT_NAMES);

Object.freeze(CTM_CONSTANTS);





/* ==========================================================================
   END OF FILE

   File    : constants.js

   Status  : 🔒 FOUNDATION

   ========================================================================== */
