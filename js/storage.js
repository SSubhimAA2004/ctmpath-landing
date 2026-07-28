
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : storage.js
   Version     : 1.0
   Status      : DEVELOPMENT

   Purpose:
   Frontend session storage manager.

   Responsibilities:

   • Save temporary journey state.
   • Restore visitor session.
   • Manage browser storage.

   Does NOT:

   • Replace backend database.
   • Store permanent records.
   • Calculate results.

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};




/* ==========================================================================
   STORAGE CONTROLLER
   ========================================================================== */


CTMPATH.Storage = {


    version:

        "1.0",



    prefix:

        "CTMPATH_",



    initialized:

        false



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Storage.init = function() {


    if (

        CTMPATH.Storage.initialized

    ) {


        return;



    }



    CTMPATH.Storage.initialized = true;



};




/* ==========================================================================
   BUILD STORAGE KEY

   Ensures namespace isolation.

   ========================================================================== */


CTMPATH.Storage.key = function(

    name

) {


    return (

        CTMPATH.Storage.prefix +

        name

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : storage.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   SAVE DATA

   Stores temporary frontend journey data.

   ========================================================================== */


CTMPATH.Storage.set = function(

    name,

    value

) {


    try {


        localStorage.setItem(

            CTMPATH.Storage.key(name),

            JSON.stringify(value)

        );



        return true;



    }

    catch(error) {


        console.error(

            "Storage save error:",

            error

        );



        return false;



    }



};




/* ==========================================================================
   GET DATA

   Retrieves stored frontend data.

   ========================================================================== */


CTMPATH.Storage.get = function(

    name

) {


    try {


        const data = localStorage.getItem(

            CTMPATH.Storage.key(name)

        );



        if (!data) {


            return null;



        }



        return JSON.parse(data);



    }

    catch(error) {


        console.error(

            "Storage read error:",

            error

        );



        return null;



    }



};




/* ==========================================================================
   REMOVE DATA

   Removes specific storage item.

   ========================================================================== */


CTMPATH.Storage.remove = function(

    name

) {


    localStorage.removeItem(

        CTMPATH.Storage.key(name)

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : storage.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   SAVE SESSION

   Stores current visitor journey state.

   Used by:

   • Registration™
   • Assessment Engine
   • Journey Navigation

   ========================================================================== */


CTMPATH.Storage.saveSession = function(

    sessionData

) {


    return CTMPATH.Storage.set(

        "SESSION",

        sessionData

    );



};




/* ==========================================================================
   GET SESSION

   Restores current visitor journey state.

   ========================================================================== */


CTMPATH.Storage.getSession = function() {


    return CTMPATH.Storage.get(

        "SESSION"

    );



};




/* ==========================================================================
   UPDATE SESSION VALUE

   Updates a single session property.

   ========================================================================== */


CTMPATH.Storage.updateSession = function(

    key,

    value

) {


    const session =

        CTMPATH.Storage.getSession()

        || {};



    session[key] = value;



    return CTMPATH.Storage.saveSession(

        session

    );



};




/* ==========================================================================
   CLEAR SESSION

   Removes temporary journey state.

   ========================================================================== */


CTMPATH.Storage.clearSession = function() {


    CTMPATH.Storage.remove(

        "SESSION"

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : storage.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   SAVE ASSESSMENT STATE

   Temporary frontend storage only.

   Final responses are persisted
   through api.js/backend.

   ========================================================================== */


CTMPATH.Storage.saveAssessmentState = function(

    assessmentState

) {


    return CTMPATH.Storage.set(

        "ASSESSMENT_STATE",

        assessmentState

    );



};




/* ==========================================================================
   GET ASSESSMENT STATE

   ========================================================================== */


CTMPATH.Storage.getAssessmentState = function() {


    return CTMPATH.Storage.get(

        "ASSESSMENT_STATE"

    );



};




/* ==========================================================================
   SAVE CURRENT PAGE

   Supports journey restoration.

   ========================================================================== */


CTMPATH.Storage.saveCurrentPage = function(

    pageNumber

) {


    return CTMPATH.Storage.set(

        "CURRENT_PAGE",

        pageNumber

    );



};




/* ==========================================================================
   GET CURRENT PAGE

   ========================================================================== */


CTMPATH.Storage.getCurrentPage = function() {


    return CTMPATH.Storage.get(

        "CURRENT_PAGE"

    );



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : storage.js
   Continuation: Batch 1E

   ========================================================================== */


/* ==========================================================================
   STORAGE STATUS

   Returns storage configuration.

   ========================================================================== */


CTMPATH.Storage.getStatus = function() {


    return {


        version:

            CTMPATH.Storage.version,



        prefix:

            CTMPATH.Storage.prefix,



        initialized:

            CTMPATH.Storage.initialized



    };



};




/* ==========================================================================
   CLEAR ALL CTM PATH™ STORAGE

   Removes only CTM PATH™ namespaced data.

   ========================================================================== */


CTMPATH.Storage.clearAll = function() {


    const keys = [];



    for (

        let i = 0;

        i < localStorage.length;

        i++

    ) {


        const key = localStorage.key(i);



        if (

            key &&

            key.indexOf(

                CTMPATH.Storage.prefix

            ) === 0

        ) {


            keys.push(key);



        }



    }




    keys.forEach(function(key) {


        localStorage.removeItem(

            key

        );



    });



};




/* ==========================================================================
   INITIALIZE STORAGE

   ========================================================================== */


document.addEventListener(

    "CTMPATH_APP_READY",

    function() {


        CTMPATH.Storage.init();



    }

);




/* ==========================================================================
   END OF FILE

   File:

   js/storage.js


   Status:

   STORAGE LAYER COMPLETE


   ========================================================================== */
