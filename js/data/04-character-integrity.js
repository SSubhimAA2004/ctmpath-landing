
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/data/04-character-integrity.js
   Version     : 1.0
   Status      : LOCKED

   --------------------------------------------------------------------------
   SPOKE 04

   CHARACTER & INTEGRITY™

   Canonical Source
   Assessment Knowledge Base v3.0

   This file owns ONLY the data for
   Spoke 04 – Character & Integrity™

   No calculations.
   No DOM.
   No rendering.

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};
window.CTM.Data = window.CTM.Data || {};

window.CTM.Data.CharacterIntegrity = {

    /* ======================================================================
       IDENTITY
       ====================================================================== */

    identity : {

        id : 4,

        spoke : 4,

        key : "character-integrity",

        slug : "character-integrity",

        route : "assessment-04.html",

        version : "1.0"

    },



    /* ======================================================================
       TITLE
       ====================================================================== */

    title : {

        tamil : "நற்பண்பும் நேர்மையும்™",

        english : "CHARACTER & INTEGRITY™"

    },



    /* ======================================================================
       HERO QUESTION
       ====================================================================== */

    coreQuestion : {

        tamil : "நான் யாராக மாறிக்கொண்டிருக்கிறேன்?",

        english : "Who am I becoming?"

    },



    /* ======================================================================
       PRESENTATION
       ====================================================================== */

    presentation : {

        colour : {

            primary : "#3949AB",

            secondary : "#5C6BC0",

            accent : "#C5CAE9",

            glow : "rgba(57,73,171,.30)"

        },

        symbol : {

            name : "Shield",

            icon : "shield",

            emoji : "🛡️"

        },

        gradient : {

            start : "#3949AB",

            end : "#7986CB"

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

                "என்னை வரையறுக்கும் மதிப்புகளும் கொள்கைகளும் எனக்கு தெளிவாக உள்ளன.",

            english :

                "I am clear about the values and principles that define who I am."

        },

        {

            id : 2,

            phase : "Alignment™",

            tamil :

                "எனது செயல்கள் தொடர்ந்து என் ஆழமான மதிப்புகளை பிரதிபலிக்கின்றன.",

            english :

                "My actions consistently reflect my deepest values."

        },

        {

            id : 3,

            phase : "Embodiment™",

            tamil :

                "நேர்மை, பொறுப்பு மற்றும் நம்பகத்தன்மை கொண்ட மனிதராக நான் அறியப்படுகிறேன்.",

            english :

                "I am known as a person of integrity, responsibility and trust."

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

