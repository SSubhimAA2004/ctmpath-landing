
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/data/03-love-relationships.js
   Version     : 1.0
   Status      : LOCKED

   --------------------------------------------------------------------------
   SPOKE 03

   LOVE & RELATIONSHIPS™

   Canonical Source
   Assessment Knowledge Base v3.0

   This file owns ONLY the data for
   Spoke 03 – Love & Relationships™

   No calculations.
   No DOM.
   No rendering.

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};
window.CTM.Data = window.CTM.Data || {};

window.CTM.Data.LoveRelationships = {

    /* ======================================================================
       IDENTITY
       ====================================================================== */

    identity : {

        id : 3,

        spoke : 3,

        key : "love-relationships",

        slug : "love-relationships",

        route : "assessment-03.html",

        version : "1.0"

    },



    /* ======================================================================
       TITLE
       ====================================================================== */

    title : {

        tamil : "அன்பும் உறவுகளும்™",

        english : "LOVE & RELATIONSHIPS™"

    },



    /* ======================================================================
       HERO QUESTION
       ====================================================================== */

    coreQuestion : {

        tamil : "நான் அர்த்தமுள்ள தொடர்புகளை உருவாக்குகிறேனா?",

        english : "Am I creating meaningful connections?"

    },



    /* ======================================================================
       PRESENTATION
       ====================================================================== */

    presentation : {

        colour : {

            primary : "#C2185B",

            secondary : "#D81B60",

            accent : "#F8BBD0",

            glow : "rgba(194,24,91,.30)"

        },

        symbol : {

            name : "Interlocking Hands",

            icon : "handshake",

            emoji : "🤝"

        },

        gradient : {

            start : "#C2185B",

            end : "#F06292"

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

                "நிறைவான வாழ்க்கையில் அன்பும் உறவுகளும் முக்கியமானவை என்பதை நான் புரிந்துகொள்கிறேன்.",

            english :

                "I understand the importance of love and relationships in a fulfilled life."

        },

        {

            id : 2,

            phase : "Alignment™",

            tamil :

                "நான் மதிக்கும் உறவுகளை என் தொடர்புகளும் செயல்களும் வலுப்படுத்துகின்றன.",

            english :

                "My communication and actions strengthen the relationships I value."

        },

        {

            id : 3,

            phase : "Embodiment™",

            tamil :

                "நம்பிக்கை, அன்பு மற்றும் பரஸ்பர வளர்ச்சி நிறைந்த உறவுகளை நான் உருவாக்குகிறேன்.",

            english :

                "I create relationships filled with trust, love and mutual growth."

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

