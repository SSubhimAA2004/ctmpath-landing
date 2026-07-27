
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessmentEngine.js
   Version     : 1.0
   Status      : LOCKED

   ==========================================================================
   PURPOSE

   Assessment Business Engine™

   Owns

   ✓ Load Pillar Data
   ✓ Engine State
   ✓ User Responses
   ✓ Business Logic
   ✓ Score Calculation
   ✓ Assessment Completion

   Does NOT

   ✗ Read HTML
   ✗ Manipulate DOM
   ✗ Render UI
   ✗ Update Dashboard

   ========================================================================== */

"use strict";

/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */

window.CTM = window.CTM || {};

/* ==========================================================================
   ASSESSMENT ENGINE
   ========================================================================== */

CTM.Engine = (function () {

    /* ======================================================================
       PRIVATE STATE
       ====================================================================== */

    let state = {

        pillar : null,

        data : null,

        answers : {

            awareness : null,

            alignment : null,

            embodiment : null

        },

        result : null,

        completed : false

    };



    /* ======================================================================
       PRIVATE HELPERS
       ====================================================================== */

    function cloneState() {

        return JSON.parse(

            JSON.stringify(state)

        );

    }



    function resetAnswers() {

        state.answers = {

            awareness : null,

            alignment : null,

            embodiment : null

        };

    }



    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return {

        /* ==============================================================
           Initialize Engine
           ============================================================== */

        init : function (pillarId) {

            this.reset();

            return this.load(

                pillarId

            );

        },



        /* ==============================================================
           Load Pillar
           ============================================================== */

        load : function (pillarId) {

            const pillar =

                CTM.Framework.getPillar(

                    pillarId

                );

            if (!pillar) {

                throw new Error(

                    "Invalid pillar id : " +

                    pillarId

                );

            }

            if (

                !CTM.Data ||

                !CTM.Data[pillar.object]

            ) {

                throw new Error(

                    "Pillar data not loaded : " +

                    pillar.object

                );

            }

            state.pillar = pillar;

            state.data =

                CTM.Data[

                    pillar.object

                ];

            state.completed = false;

            state.result = null;

            resetAnswers();

            return cloneState();

        },



        /* ==============================================================
           Reset Engine
           ============================================================== */

        reset : function () {

            state = {

                pillar : null,

                data : null,

                answers : {

                    awareness : null,

                    alignment : null,

                    embodiment : null

                },

                result : null,

                completed : false

            };

            return cloneState();

        },



        /* ==============================================================
           Current Engine State
           ============================================================== */

        getState : function () {

            return cloneState();

        }

    };

})();

/* ==========================================================================
   END OF BATCH 1A
   ==========================================================================
   Completed

   ✓ File Header
   ✓ Namespace
   ✓ Private State
   ✓ cloneState()
   ✓ resetAnswers()
   ✓ init()
   ✓ load()
   ✓ reset()
   ✓ getState()

   Pending (Batch 1B)

   • answer()
   • getAnswer()
   • Validation
   • Internal helpers

   ========================================================================== */

        /* ==============================================================
           Store Answer
           ============================================================== */

        answer : function (questionIndex, score) {

            if (!state.data) {

                throw new Error(

                    "Engine has not been initialized."

                );

            }

            score = CTM.Scoring.validate(

                score

            );

            switch (questionIndex) {

                case 1:

                    state.answers.awareness = score;

                    break;

                case 2:

                    state.answers.alignment = score;

                    break;

                case 3:

                    state.answers.embodiment = score;

                    break;

                default:

                    throw new Error(

                        "Invalid question index : " +

                        questionIndex

                    );

            }

            return cloneState();

        },



        /* ==============================================================
           Get Answer
           ============================================================== */

        getAnswer : function (questionIndex) {

            switch (questionIndex) {

                case 1:

                    return state.answers.awareness;

                case 2:

                    return state.answers.alignment;

                case 3:

                    return state.answers.embodiment;

                default:

                    return null;

            }

        },



        /* ==============================================================
           Has Answer
           ============================================================== */

        hasAnswer : function (questionIndex) {

            return this.getAnswer(

                questionIndex

            ) !== null;

        },



        /* ==============================================================
           Validate Assessment
           ============================================================== */

        validate : function () {

            return (

                state.answers.awareness !== null &&

                state.answers.alignment !== null &&

                state.answers.embodiment !== null

            );

        },



        /* ==============================================================
           Is Complete
           ============================================================== */

        isComplete : function () {

            return state.completed;

        },



        /* ==============================================================
           Current Pillar
           ============================================================== */

        getPillar : function () {

            return state.pillar;

        },



        /* ==============================================================
           Current Data
           ============================================================== */

        getData : function () {

            return state.data;

        },



        /* ==============================================================
           Current Answers
           ============================================================== */

        getAnswers : function () {

            return {

                awareness :

                    state.answers.awareness,

                alignment :

                    state.answers.alignment,

                embodiment :

                    state.answers.embodiment

            };

        },



        /* ==============================================================
           Progress
           ============================================================== */

        progress : function () {

            let completed = 0;

            if (

                state.answers.awareness !== null

            ) {

                completed++;

            }

            if (

                state.answers.alignment !== null

            ) {

                completed++;

            }

            if (

                state.answers.embodiment !== null

            ) {

                completed++;

            }

            return {

                completed :

                    completed,

                total : 3,

                percentage :

                    Math.round(

                        (completed / 3) * 100

                    )

            };

        },

        /* ==============================================================
           Calculate Result
           ============================================================== */

        calculate : function () {

            if (!this.validate()) {

                throw new Error(

                    "Assessment is incomplete."

                );

            }

            return CTM.Scoring.build(

                state.answers.awareness,

                state.answers.alignment,

                state.answers.embodiment

            );

        },



        /* ==============================================================
           Complete Assessment
           ============================================================== */

        complete : function () {

            const result =

                this.calculate();

            state.result = Object.freeze({

                raw :

                    result.raw,

                percentage :

                    result.percentage,

                level :

                    result.level,

                title :

                    result.title,

                colour :

                    result.colour,

                answers : {

                    awareness :

                        state.answers.awareness,

                    alignment :

                        state.answers.alignment,

                    embodiment :

                        state.answers.embodiment

                }

            });

            state.completed = true;

            return state.result;

        },



        /* ==============================================================
           Current Result
           ============================================================== */

        getResult : function () {

            return state.result;

        },



        /* ==============================================================
           Has Result
           ============================================================== */

        hasResult : function () {

            return state.result !== null;

        }

    };

})();



/* ==========================================================================
   LOCK ENGINE
   ========================================================================== */

Object.freeze(

    CTM.Engine

);



/* ==========================================================================
   END OF FILE

   assessmentEngine.js

   Version 1.0

   Status

   ✓ COMPLETE
   ✓ LOCKED

   ========================================================================== */

