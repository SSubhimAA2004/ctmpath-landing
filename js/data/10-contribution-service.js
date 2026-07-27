
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/data/10-contribution-service.js
   Version     : 1.0
   Status      : LOCKED

   --------------------------------------------------------------------------
   SPOKE 10

   CONTRIBUTION & SERVICE™

   Canonical Source
   Assessment Knowledge Base v3.0

   This file owns ONLY the data for
   Spoke 10 – Contribution & Service™

   No calculations.
   No DOM.
   No rendering.

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};
window.CTM.Data = window.CTM.Data || {};

window.CTM.Data.ContributionService = {

    /* ======================================================================
       IDENTITY
       ====================================================================== */

    identity : {

        id : 10,

        spoke : 10,

        key : "contribution-service",

        slug : "contribution-service",

        route : "assessment-10.html",

        version : "1.0"

    },



    /* ======================================================================
       TITLE
       ====================================================================== */

    title : {

        tamil : "பங்களிப்பும் சேவையும்™",

        english : "CONTRIBUTION & SERVICE™"

    },



    /* ======================================================================
       HERO QUESTION
       ====================================================================== */

    coreQuestion : {

        tamil : "இந்த உலகில் நான் என்ன மாற்றத்தை உருவாக்குகிறேன்?",

        english : "What difference do I make?"

    },



    /* ======================================================================
       PRESENTATION
       ====================================================================== */

    presentation : {

        colour : {

            primary : "#1565C0",

            secondary : "#1E88E5",

            accent : "#BBDEFB",

            glow : "rgba(21,101,192,.30)"

        },

        symbol : {

            name : "Helping Hands",

            icon : "hands-helping",

            emoji : "🤲"

        },

        gradient : {

            start : "#1565C0",

            end : "#64B5F6"

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

                "என் வாழ்க்கை மற்றவர்களின் வாழ்க்கையில் நேர்மறையான தாக்கத்தை ஏற்படுத்தும் சக்தி கொண்டது என்பதை நான் புரிந்துகொள்கிறேன்.",

            english :

                "I understand that my life has the power to positively impact others."

        },

        {

            id : 2,

            phase : "Alignment™",

            tamil :

                "எனது திறமைகளையும் வளங்களையும் அர்த்தமுள்ள பங்களிப்பிற்காக பயன்படுத்துகிறேன்.",

            english :

                "My talents and resources are directed toward meaningful contribution."

        },

        {

            id : 3,

            phase : "Embodiment™",

            tamil :

                "என் வாழ்க்கை என்னைத் தாண்டி மதிப்பையும் நன்மையையும் உருவாக்குகிறது.",

            english :

                "My life creates value beyond myself."

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

