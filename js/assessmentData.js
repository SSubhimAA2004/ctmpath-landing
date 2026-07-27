
/* ==========================================================================

   CTM PATH™ Guided Journey™

   File        : assessmentData.js
   Version     : 2.0
   Status      : 🔒 LOCKED

   ==========================================================================
   PURPOSE

   Master Assessment Repository™

   This file contains the complete domain model for the
   CTM PATH™ KALA CHAKRA™ framework.

   Responsibilities

   ✓ Framework Metadata
   ✓ Scoring Metadata
   ✓ Pillar Definitions
   ✓ Presentation Metadata
   ✓ Dashboard Metadata
   ✓ Report Metadata

   Does NOT

   ✗ Calculate Scores
   ✗ Render UI
   ✗ Manipulate DOM
   ✗ Perform Navigation

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

window.CTM.AssessmentData = {

    /* ======================================================================
       FRAMEWORK
       ====================================================================== */

    framework : {

        id : "CTM-PATH-KALACHAKRA-3.0",

        name : "CTM PATH™ KALA CHAKRA™",

        subtitle : "The 12 Pillars of Human Flourishing™",

        assessment : "Life Alignment Scorecard™",

        version : "3.0",

        language : [

            "Tamil",

            "English"

        ],

        totalPillars : 12,

        questionsPerPillar : 3,

        maximumPillarScore : 30,

        maximumOverallScore : 360,

        scoringScale : {

            minimum : 1,

            maximum : 10

        }

    },



    /* ======================================================================
       SCORING
       ====================================================================== */

    scoring : {

        philosophy : {

            /*
                Canonical text is owned by

                Life Alignment Scorecard™

                Refer to Score Card
                (Scoring Philosophy™)

                Do not duplicate here.
            */

            source : "Life Alignment Scorecard™"

        },



        levels : {

            learner : {

                id : "learner",

                label : "Learner™",

                range : {

                    minimum : 0,

                    maximum : 59

                }

            },



            leader : {

                id : "leader",

                label : "Leader™",

                range : {

                    minimum : 60,

                    maximum : 84

                }

            },



            legend : {

                id : "legend",

                label : "Legend™",

                range : {

                    minimum : 85,

                    maximum : 100

                }

            }

        }

    },



    /* ======================================================================
       PILLARS
       ====================================================================== */

    pillars : [

        /* ==============================================================
           SPOKE 01
           PURPOSE™
           ============================================================== */

        {

            identity : {

                id : 1,

                spoke : 1,

                key : "purpose"

            },



            knowledgeBase : {

                /*
                 =====================================================

                 SOURCE OF TRUTH

                 Assessment Knowledge Base™

                 SPOKE 01

                 PURPOSE™

                 =====================================================

                 The following values are populated
                 directly from the canonical
                 Knowledge Base.

                 Never hardcode elsewhere.

                 =====================================================
                */

                tamilName : null,

                englishName : null,

                coreQuestionTamil : null,

                coreQuestionEnglish : null,

                questions : [

                    {

                        phase : "Awareness™",

                        tamil : null,

                        english : null

                    },

                    {

                        phase : "Alignment™",

                        tamil : null,

                        english : null

                    },

                    {

                        phase : "Embodiment™",

                        tamil : null,

                        english : null

                    }

                ]

            },



            presentation : {

                theme : {

                    primary : "#6F42C1",

                    secondary : "#9B7AE5",

                    accent : "#D7C8FF",

                    glow : "rgba(111,66,193,.28)"

                },



                symbol : {

                    name : "Compass",

                    icon : "compass",

                    emoji : "🧭"

                }

            },



            extensions : {

                reflections : {

                    learner : null,

                    leader : null,

                    legend : null

                },



                wisdom : {

                    learner : null,

                    leader : null,

                    legend : null

                },



                coaching : {

                    learner : null,

                    leader : null,

                    legend : null

                }

            }

        }

        /* ------------------------------------------------------------------

           Remaining 11 pillars follow this exact schema.

           They will be added sequentially in production batches.

           ------------------------------------------------------------------ */

    ],



    /* ======================================================================
       DASHBOARD
       ====================================================================== */

    dashboard : {

        metrics : [

            "Highest Scoring Pillar",

            "Lowest Scoring Pillar",

            "Strongest Life Area",

            "Greatest Growth Opportunity",

            "Overall Life Alignment Score",

            "Current Life Alignment Level"

        ]

    },



    /* ======================================================================
       REPORT
       ====================================================================== */

    report : {

        format : "Life Alignment Report™",

        bilingual : true,

        includeDashboard : true,

        includeRadar : true,

        includeRecommendations : true,

        includeCoaching : true

    }

};

/* ==========================================================================

   END OF FILE (Batch 1A)

   Remaining pillars will extend the `pillars` array
   without changing the framework or schema.

   ========================================================================== */

