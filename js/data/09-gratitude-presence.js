
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/data/09-gratitude-presence.js
   Version     : 1.0
   Status      : LOCKED

   --------------------------------------------------------------------------
   SPOKE 09

   GRATITUDE & PRESENCE™

   Canonical Source
   Assessment Knowledge Base v3.0

   This file owns ONLY the data for
   Spoke 09 – Gratitude & Presence™

   No calculations.
   No DOM.
   No rendering.

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};
window.CTM.Data = window.CTM.Data || {};

window.CTM.Data.GratitudePresence = {

    /* ======================================================================
       IDENTITY
       ====================================================================== */

    identity : {

        id : 9,

        spoke : 9,

        key : "gratitude-presence",

        slug : "gratitude-presence",

        route : "assessment-09.html",

        version : "1.0"

    },



    /* ======================================================================
       TITLE
       ====================================================================== */

    title : {

        tamil : "நன்றியுணர்வும் விழிப்புணர்வும்™",

        english : "GRATITUDE & PRESENCE™"

    },



    /* ======================================================================
       HERO QUESTION
       ====================================================================== */

    coreQuestion : {

        tamil : "நான் வாழ்க்கையை முழுமையாக அனுபவிக்கிறேனா?",

        english : "Can I fully experience life?"

    },



    /* ======================================================================
       PRESENTATION
       ====================================================================== */

    presentation : {

        colour : {

            primary : "#26A69A",

            secondary : "#4DB6AC",

            accent : "#B2DFDB",

            glow : "rgba(38,166,154,.30)"

        },

        symbol : {

            name : "Lotus Bloom",

            icon : "flower",

            emoji : "🌸"

        },

        gradient : {

            start : "#26A69A",

            end : "#80CBC4"

        }

    },



    /* ======================================================================
       SCORING
       ====================================================================== */

    scoring : {

        minimum : 1,

        maximum : 10,

        questions : 3,

        maximumScore : 30,

        percentage : 100

    },



    /* ======================================================================
       QUESTIONS
       ====================================================================== */

    questions : [

        {

            id : 1,

            phase : "Awareness™",

            tamil :

                "என் வாழ்க்கையில் ஏற்கனவே இருக்கும் ஆசீர்வாதங்களை நான் உணர்ந்து மதிக்கிறேன்.",

            english :

                "I recognize and appreciate the blessings already present in my life."

        },

        {

            id : 2,

            phase : "Alignment™",

            tamil :

                "எனது தினசரி வாழ்க்கையில் நன்றியுணர்வையும் நிகழ்கால விழிப்புணர்வையும் நான் தேர்ந்தெடுக்கிறேன்.",

            english :

                "I consciously choose gratitude and presence in my daily living."

        },

        {

            id : 3,

            phase : "Embodiment™",

            tamil :

                "சாதாரணமான தருணங்களையும் மகிழ்ச்சியுடனும் விழிப்புணர்வுடனும் நான் அனுபவிக்கிறேன்.",

            english :

                "I experience ordinary moments with joy and awareness."

        }

    ],



    /* ======================================================================
       USER RESPONSES
       ====================================================================== */

    responses : {

        awareness : null,

        alignment : null,

        embodiment : null

    },



    /* ======================================================================
       CALCULATED
       ====================================================================== */

    result : {

        rawScore : 0,

        percentage : 0,

        level : null

    },



    /* ======================================================================
       REFLECTION
       ====================================================================== */

    reflection : {

        learner : "",

        leader : "",

        legend : ""

    },



    /* ======================================================================
       WISDOM
       ====================================================================== */

    wisdom : {

        learner : "",

        leader : "",

        legend : ""

    },



    /* ======================================================================
       COACHING
       ====================================================================== */

    coaching : {

        learner : "",

        leader : "",

        legend : ""

    }

};

/* ==========================================================================
   END OF FILE
   ========================================================================== */

