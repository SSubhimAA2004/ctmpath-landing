
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    state.js

    Purpose
    Global Application State

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.state = {

    /*==================================================
    APPLICATION
    ==================================================*/

    app:{

        version : '1.0',

        currentScreen : 1,

        totalScreens : 16,

        initialized : false

    },



    /*==================================================
    VISITOR
    ==================================================*/

    visitor:{

        visitorId : '',

        fullName : '',

        email : '',

        mobile : '',

        district : '',

        state : '',

        referralSource : ''

    },



    /*==================================================
    EMOTION
    ==================================================*/

    emotion:{

        selected : ''

    },



    /*==================================================
    LIFE ASSESSMENT
    ==================================================*/

    assessment:{

        purpose : 0,

        health : 0,

        relationships : 0,

        character : 0,

        learning : 0,

        career : 0,

        cashflow : 0,

        timeFreedom : 0,

        tribe : 0,

        automation : 0,

        contribution : 0,

        vision : 0

    },



    /*==================================================
    RESULTS
    ==================================================*/

    results:{

        overallScore : 0,

        overallPercent : 0,

        wheelStatus : ''

    },



    /*==================================================
    UI
    ==================================================*/

    ui:{

        loading : false,

        transition : false

    }

};

Object.freeze(CTM.state.app);
