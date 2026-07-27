
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/scoring.js
   Version     : 1.0
   Status      : LOCKED

   ==========================================================================
   PURPOSE

   Life Alignment Score Engine™

   Owns

   ✓ Question Score
   ✓ Pillar Score
   ✓ Percentage Conversion
   ✓ Overall Score
   ✓ Learner™
   ✓ Leader™
   ✓ Legend™

   Does NOT

   ✗ Render UI
   ✗ Read DOM

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

/* ==========================================================================
   SCORE LEVELS
   ========================================================================== */

CTM.Levels = {

    learner : {

        id : "learner",

        title : "Learner™",

        minimum : 0,

        maximum : 59,

        colour : "#D32F2F"

    },

    leader : {

        id : "leader",

        title : "Leader™",

        minimum : 60,

        maximum : 84,

        colour : "#F57C00"

    },

    legend : {

        id : "legend",

        title : "Legend™",

        minimum : 85,

        maximum : 100,

        colour : "#2E7D32"

    }

};

/* ==========================================================================
   SCORE ENGINE
   ========================================================================== */

CTM.Scoring = {

    /* --------------------------------------------------------------
       Validate Question Score
       -------------------------------------------------------------- */

    validate(score){

        score = Number(score);

        if(isNaN(score)){

            return 1;

        }

        if(score < 1){

            return 1;

        }

        if(score > 10){

            return 10;

        }

        return score;

    },



    /* --------------------------------------------------------------
       Calculate Pillar Raw Score
       -------------------------------------------------------------- */

    calculatePillar(q1,q2,q3){

        q1 = this.validate(q1);

        q2 = this.validate(q2);

        q3 = this.validate(q3);

        return q1 + q2 + q3;

    },



    /* --------------------------------------------------------------
       Convert 30 → 100
       -------------------------------------------------------------- */

    toPercentage(rawScore){

        return Math.round(

            (rawScore / 30) * 100

        );

    },



    /* --------------------------------------------------------------
       Overall Score
       -------------------------------------------------------------- */

    overall(scores){

        if(!scores.length){

            return 0;

        }

        let total = scores.reduce(

            (sum,value)=>sum+value,

            0

        );

        return Math.round(

            total / scores.length

        );

    },



    /* --------------------------------------------------------------
       Current Level
       -------------------------------------------------------------- */

    getLevel(score){

        if(score <= 59){

            return CTM.Levels.learner;

        }

        if(score <= 84){

            return CTM.Levels.leader;

        }

        return CTM.Levels.legend;

    },



    /* --------------------------------------------------------------
       Dashboard Colour
       -------------------------------------------------------------- */

    getColour(score){

        return this.getLevel(score).colour;

    },



    /* --------------------------------------------------------------
       Dashboard Label
       -------------------------------------------------------------- */

    getLabel(score){

        return this.getLevel(score).title;

    },



    /* --------------------------------------------------------------
       Build Complete Result
       -------------------------------------------------------------- */

    build(q1,q2,q3){

        const raw =

            this.calculatePillar(

                q1,

                q2,

                q3

            );

        const percent =

            this.toPercentage(

                raw

            );

        const level =

            this.getLevel(

                percent

            );

        return {

            awareness : q1,

            alignment : q2,

            embodiment : q3,

            raw : raw,

            percentage : percent,

            level : level.id,

            title : level.title,

            colour : level.colour

        };

    }

};

/* ==========================================================================
   END OF FILE
   ========================================================================== */

