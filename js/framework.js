
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/framework.js
   Version     : 1.0
   Status      : LOCKED

   ==========================================================================
   PURPOSE

   Global Framework

   Owns

   ✓ Application Metadata
   ✓ Namespace
   ✓ Framework Constants
   ✓ Pillar Registry
   ✓ Routes
   ✓ Languages
   ✓ Runtime State

   Does NOT

   ✗ Calculate Scores
   ✗ Render UI
   ✗ Manipulate DOM

   ========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   APPLICATION
   ========================================================================== */

CTM.App = {

    name: "CTM PATH™",

    framework: "KALA CHAKRA™",

    version: "3.0",

    assessment: "Life Alignment Scorecard™",

    author: "UMBAR AVAI",

    language: "bilingual",

    build: "1.0"

};

/* ==========================================================================
   CONFIGURATION
   ========================================================================== */

CTM.Config = {

    totalPillars: 12,

    questionsPerPillar: 3,

    minimumScore: 1,

    maximumScore: 10,

    maximumPillarScore: 30,

    maximumOverallScore: 360,

    dashboardScale: 100,

    autoSave: true,

    animationDuration: 300,

    debug: false

};

/* ==========================================================================
   SUPPORTED LANGUAGES
   ========================================================================== */

CTM.Language = {

    primary: "ta",

    secondary: "en",

    supported: [

        "ta",

        "en"

    ]

};

/* ==========================================================================
   ROUTES
   ========================================================================== */

CTM.Routes = {

    landing: "index.html",

    assessment: [

        "assessment-01.html",

        "assessment-02.html",

        "assessment-03.html",

        "assessment-04.html",

        "assessment-05.html",

        "assessment-06.html",

        "assessment-07.html",

        "assessment-08.html",

        "assessment-09.html",

        "assessment-10.html",

        "assessment-11.html",

        "assessment-12.html"

    ],

    dashboard: "dashboard.html",

    report: "report.html"

};

/* ==========================================================================
   PILLAR REGISTRY
   ========================================================================== */

CTM.Pillars = [

    {

        id: 1,

        key: "purpose",

        file: "01-purpose.js",

        object: "Purpose"

    },

    {

        id: 2,

        key: "vitality",

        file: "02-vitality.js",

        object: "Vitality"

    },

    {

        id: 3,

        key: "love-relationships",

        file: "03-love-relationships.js",

        object: "LoveRelationships"

    },

    {

        id: 4,

        key: "character-integrity",

        file: "04-character-integrity.js",

        object: "CharacterIntegrity"

    },

    {

        id: 5,

        key: "financial-freedom",

        file: "05-financial-freedom.js",

        object: "FinancialFreedom"

    },

    {

        id: 6,

        key: "inner-peace",

        file: "06-inner-peace.js",

        object: "InnerPeace"

    },

    {

        id: 7,

        key: "growth-mastery",

        file: "07-growth-mastery.js",

        object: "GrowthMastery"

    },

    {

        id: 8,

        key: "discipline-habits",

        file: "08-discipline-habits.js",

        object: "DisciplineHabits"

    },

    {

        id: 9,

        key: "gratitude-presence",

        file: "09-gratitude-presence.js",

        object: "GratitudePresence"

    },

    {

        id: 10,

        key: "contribution-service",

        file: "10-contribution-service.js",

        object: "ContributionService"

    },

    {

        id: 11,

        key: "spirit-alignment",

        file: "11-spirit-alignment.js",

        object: "SpiritAlignment"

    },

    {

        id: 12,

        key: "legacy-vision",

        file: "12-legacy-vision.js",

        object: "LegacyVision"

    }

];

/* ==========================================================================
   RUNTIME STATE
   ========================================================================== */

CTM.State = {

    currentPillar: 1,

    currentQuestion: 1,

    completedPillars: [],

    answers: {},

    scores: {},

    dashboard: {},

    report: {}

};

/* ==========================================================================
   UTILITIES
   ========================================================================== */

CTM.Framework = {

    getPillar(id) {

        return CTM.Pillars.find(

            pillar => pillar.id === id

        ) || null;

    },

    getCurrentPillar() {

        return this.getPillar(

            CTM.State.currentPillar

        );

    },

    setCurrentPillar(id) {

        CTM.State.currentPillar = id;

    },

    isValidPillar(id) {

        return id >= 1 &&

               id <= CTM.Config.totalPillars;

    }

};

/* ==========================================================================
   FREEZE
   ========================================================================== */

Object.freeze(CTM.App);

Object.freeze(CTM.Config);

Object.freeze(CTM.Language);

Object.freeze(CTM.Routes);

Object.freeze(CTM.Pillars);

/* ==========================================================================
   END OF FILE
   ========================================================================== */

