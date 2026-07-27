
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/data/08-discipline-habits.js
   Version     : 1.0
   Status      : LOCKED

   --------------------------------------------------------------------------
   SPOKE 08

   DISCIPLINE & HABITS™

   Canonical Source
   Assessment Knowledge Base v3.0

   This file owns ONLY the data for
   Spoke 08 – Discipline & Habits™

   No calculations.
   No DOM.
   No rendering.

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};
window.CTM.Data = window.CTM.Data || {};

window.CTM.Data.DisciplineHabits = {

    /* ======================================================================
       IDENTITY
       ====================================================================== */

    identity : {

        id : 8,

        spoke : 8,

        key : "discipline-habits",

        slug : "discipline-habits",

        route : "assessment-08.html",

        version : "1.0"

    },



    /* ======================================================================
       TITLE
       ====================================================================== */

    title : {

        tamil : "ஒழுக்கமும் பழக்கங்களும்™",

        english : "DISCIPLINE & HABITS™"

    },



    /* ======================================================================
       HERO QUESTION
       ====================================================================== */

    coreQuestion : {

        tamil : "எனது எண்ணங்களை செயல்களாக மாற்ற முடியுமா?",

        english : "Can I transform intention into action?"

    },



    /* ======================================================================
       PRESENTATION
       ====================================================================== */

    presentation : {

        colour : {

            primary : "#EF6C00",

            secondary : "#FB8C00",

            accent : "#FFE0B2",

            glow : "rgba(239,108,0,.30)"

        },

        symbol : {

            name : "Anchor",

            icon : "anchor",

            emoji : "⚓"

        },

        gradient : {

            start : "#EF6C00",

            end : "#FFB74D"

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

                "எனது பழக்கங்களே எனது எதிர்காலத்தை உருவாக்குகின்றன என்பதை நான் புரிந்துகொள்கிறேன்.",

            english :

                "I understand that my habits shape my destiny."

        },

        {

            id : 2,

            phase : "Alignment™",

            tamil :

                "எனது தினசரி நடைமுறைகள் என் இலக்குகளுக்கும் மதிப்புகளுக்கும் ஆதரவாக உள்ளன.",

            english :

                "My daily routines support my goals and values."

        },

        {

            id : 3,

            phase : "Embodiment™",

            tamil :

                "எனது வெற்றிக்குத் தேவையான செயல்களை நான் தொடர்ந்து செயல்படுத்துகிறேன்.",

            english :

                "I consistently execute the actions required for my success."

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

