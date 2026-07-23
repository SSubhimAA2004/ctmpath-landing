
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    assessmentScoring.js

    Version
    1.0

    Purpose

    Assessment Scoring Engine

    Responsibilities

    • Calculate Pillar Average
    • Calculate Overall Score
    • Calculate Overall Percentage
    • Prepare Life Wheel Data

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

/*=====================================================================

    SCORING ENGINE

======================================================================*/

CTM.scoring = {

    /*==================================================
    CALCULATE AVERAGE

    Input

    [8,9,7,10,8]

    Output

    8.4

    ==================================================*/

    average(scores){

        if(

            !Array.isArray(scores) ||

            scores.length===0

        ){

            return 0;

        }

        const total=

            scores.reduce(

                (sum,value)=>

                    sum+Number(value),

                0

            );

        return Number(

            (

                total/

                scores.length

            )

            .toFixed(1)

        );

    },



    /*==================================================
    CALCULATE OVERALL SCORE

    ==================================================*/

    overall(assessment){

        const values=[];

        Object.values(

            assessment

        ).forEach(

            pillar=>{

                if(

                    pillar.average!==undefined

                ){

                    values.push(

                        pillar.average

                    );

                }

            }

        );

        return this.average(

            values

        );

    },



    /*==================================================
    OVERALL PERCENT

    ==================================================*/

    percentage(score){

        return Number(

            (

                score/

                10*

                100

            )

            .toFixed(1)

        );

    },



    /*==================================================
    LIFE WHEEL DATA

    ==================================================*/

    wheelData(assessment){

        return{

            purpose:

                assessment.purpose?.average || 0,

            health:

                assessment.health?.average || 0,

            relationships:

                assessment.relationships?.average || 0,

            character:

                assessment.character?.average || 0,

            learning:

                assessment.learning?.average || 0,

            career:

                assessment.career?.average || 0,

            cashflow:

                assessment.cashflow?.average || 0,

            timeFreedom:

                assessment.timeFreedom?.average || 0,

            tribe:

                assessment.tribe?.average || 0,

            automation:

                assessment.automation?.average || 0

        };

    },



    /*==================================================
    SCORE BAND

    ==================================================*/

    band(score){

        if(score>=9)

            return'Excellent';

        if(score>=8)

            return'Very Good';

        if(score>=7)

            return'Good';

        if(score>=6)

            return'Average';

        if(score>=4)

            return'Needs Improvement';

        return'Critical';

    },



    /*==================================================
    COMPLETE SUMMARY

    ==================================================*/

    summary(assessment){

        const overall=

            this.overall(

                assessment

            );

        return{

            overallScore:

                overall,

            overallPercent:

                this.percentage(

                    overall

                ),

            band:

                this.band(

                    overall

                ),

            wheel:

                this.wheelData(

                    assessment

                )

        };

    }

};

/*==================================================
END OF FILE
==================================================*/
