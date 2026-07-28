
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : storage.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend session storage service.

   Responsibilities:

   • Store temporary journey state.
   • Retrieve temporary user inputs.
   • Maintain current visitor session reference.
   • Provide controlled browser storage access.

   Does NOT:

   • Replace backend database.
   • Store permanent assessment records.
   • Calculate scores.
   • Generate diagnosis.
   • Generate prescriptions.

   Backend Ownership:

   • Permanent visitor data
   • Assessment persistence
   • Scoring
   • KALA CHAKRA™ processing
   • Reports

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   STORAGE SERVICE
   ========================================================================== */


CTMPATH.Storage = {


    version:

        "1.0",



    initialized:

        false,



    prefix:

        "CTMPATH_"



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Storage.init = function() {


    CTMPATH.Storage.initialized = true;



};




/* ==========================================================================
   KEY GENERATOR

   Prevents naming collisions.

   ========================================================================== */


CTMPATH.Storage.createKey = function(key) {


    return (

        CTMPATH.Storage.prefix +

        key

    );


};




/* ==========================================================================
   SAVE DATA

   Stores temporary session information.

   ========================================================================== */


CTMPATH.Storage.set = function(key, value) {


    try {


        const storageKey =

            CTMPATH.Storage.createKey(

                key

            );



        localStorage.setItem(

            storageKey,

            JSON.stringify(

                value

            )

        );



        return true;



    }


    catch(error) {


        console.error(

            "CTM PATH™ Storage Save Error:",

            error

        );



        return false;



    }



};




/* ==========================================================================
   GET DATA

   Retrieves temporary session information.

   ========================================================================== */


CTMPATH.Storage.get = function(key) {


    try {


        const storageKey =

            CTMPATH.Storage.createKey(

                key

            );



        const data = localStorage.getItem(

            storageKey

        );



        if (!data) {


            return null;



        }



        return JSON.parse(

            data

        );



    }


    catch(error) {


        console.error(

            "CTM PATH™ Storage Read Error:",

            error

        );



        return null;



    }



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : storage.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   REMOVE DATA

   Removes temporary browser session information.

   ========================================================================== */


CTMPATH.Storage.remove = function(key) {


    try {


        const storageKey =

            CTMPATH.Storage.createKey(

                key

            );



        localStorage.removeItem(

            storageKey

        );



        return true;



    }


    catch(error) {


        console.error(

            "CTM PATH™ Storage Remove Error:",

            error

        );



        return false;



    }



};




/* ==========================================================================
   CLEAR JOURNEY SESSION

   Clears all CTM PATH™ frontend session data.

   IMPORTANT:

   This does NOT affect backend records.

   ========================================================================== */


CTMPATH.Storage.clear = function() {


    try {


        const keys = Object.keys(

            localStorage

        );



        keys.forEach(function(key) {


            if (

                key.startsWith(

                    CTMPATH.Storage.prefix

                )

            ) {


                localStorage.removeItem(

                    key

                );



            }



        });



        return true;



    }


    catch(error) {


        console.error(

            "CTM PATH™ Storage Clear Error:",

            error

        );



        return false;



    }



};




/* ==========================================================================
   VISITOR SESSION MANAGEMENT

   Temporary reference storage.

   Backend remains source of truth.

   ========================================================================== */


CTMPATH.Storage.setVisitorId = function(visitorId) {


    return CTMPATH.Storage.set(

        "visitorId",

        visitorId

    );


};




CTMPATH.Storage.getVisitorId = function() {


    return CTMPATH.Storage.get(

        "visitorId"

    );


};




/* ==========================================================================
   JOURNEY POSITION MANAGEMENT

   Stores current frontend page state.

   ========================================================================== */


CTMPATH.Storage.setCurrentPage = function(page) {


    return CTMPATH.Storage.set(

        "currentPage",

        page

    );


};




CTMPATH.Storage.getCurrentPage = function() {


    return CTMPATH.Storage.get(

        "currentPage"

    );


};




/* ==========================================================================
   ASSESSMENT TEMPORARY STATE

   Stores incomplete frontend progress only.

   Final answers are persisted through API.

   ========================================================================== */


CTMPATH.Storage.saveProgress = function(progress) {


    return CTMPATH.Storage.set(

        "assessmentProgress",

        progress

    );


};




CTMPATH.Storage.getProgress = function() {


    return CTMPATH.Storage.get(

        "assessmentProgress"

    );


};




/* ==========================================================================
   STORAGE STATUS

   Internal diagnostics.

   ========================================================================== */


CTMPATH.Storage.status = function() {


    return {


        initialized:

            CTMPATH.Storage.initialized,



        available:

            typeof localStorage !== "undefined",



        prefix:

            CTMPATH.Storage.prefix



    };


};




/* ==========================================================================
   END OF FILE

   File:

   js/storage.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   js/navigation.js

   ========================================================================== */
