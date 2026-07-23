
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    assessmentScoring.js

    PURPOSE

    Assessment Scoring Engine

    RESPONSIBILITIES

    • Calculate Pillar Scores
    • Calculate Overall Score
    • Calculate Averages
    • Identify Strongest Pillar
    • Identify Growth Opportunity

    VERSION

    1.0

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    SCORING ENGINE
=============================================================================*/

CTM.assessmentScoring = (function(){

    /*=========================================================================
        CONSTANTS
    =========================================================================*/

    const MAX_SCORE_PER_QUESTION = 10;

    const QUESTIONS_PER_PILLAR = 5;

    const TOTAL_PILLARS = 12;

    const MAX_PILLAR_SCORE =

        MAX_SCORE_PER_QUESTION *

        QUESTIONS_PER_PILLAR;

    const MAX_TOTAL_SCORE =

        MAX_PILLAR_SCORE *

        TOTAL_PILLARS;



    /*=========================================================================
        CALCULATE PILLAR SCORE
    =========================================================================*/

    function calculatePillarScore(

        answers

    ){

        if(

            !Array.isArray(

                answers

            )

        ){

            return 0;

        }

        return answers.reduce(

            function(

                total,

                value

            ){

                return total +

                    Number(

                        value || 0

                    );

            },

            0

        );

    }



    /*=========================================================================
        CALCULATE PILLAR AVERAGE
    =========================================================================*/

    function calculatePillarAverage(

        answers

    ){

        if(

            !answers ||

            answers.length === 0

        ){

            return 0;

        }

        return (

            calculatePillarScore(

                answers

            )

            /

            answers.length

        );

    }



    /*=========================================================================
        CONVERT TO 100
    =========================================================================*/

    function convertToHundred(

        rawScore

    ){

        return Number(

            (

                rawScore

                /

                MAX_TOTAL_SCORE

            )

            *

            100

        );

    }



    /*=========================================================================
        CALCULATE OVERALL SCORE
    =========================================================================*/

    function calculateOverallScore(

        pillarScores

    ){

        if(

            !Array.isArray(

                pillarScores

            )

        ){

            return 0;

        }

        const raw =

            pillarScores.reduce(

                function(

                    total,

                    score

                ){

                    return total +

                        Number(

                            score || 0

                        );

                },

                0

            );

        return{

            rawScore :

                raw,

            percentage :

                convertToHundred(

                    raw

                )

        };

    }

    /*=========================================================================
        STRONGEST PILLAR
    =========================================================================*/

    function getStrongestPillar(

        pillarScores

    ){

        if(

            !Array.isArray(

                pillarScores

            ) ||

            pillarScores.length === 0

        ){

            return null;

        }

        let index = 0;

        let highest = pillarScores[0];

        pillarScores.forEach(

            function(

                score,

                i

            ){

                if(

                    score > highest

                ){

                    highest = score;

                    index = i;

                }

            }

        );

        return{

            pillarIndex :

                index,

            score :

                highest,

            percentage :

                Number(

                    (

                        highest /

                        MAX_PILLAR_SCORE

                    ) * 100

                ).toFixed(1)

        };

    }



    /*=========================================================================
        GROWTH OPPORTUNITY

        LOWEST SCORING PILLAR

    =========================================================================*/

    function getGrowthOpportunity(

        pillarScores

    ){

        if(

            !Array.isArray(

                pillarScores

            ) ||

            pillarScores.length === 0

        ){

            return null;

        }

        let index = 0;

        let lowest = pillarScores[0];

        pillarScores.forEach(

            function(

                score,

                i

            ){

                if(

                    score < lowest

                ){

                    lowest = score;

                    index = i;

                }

            }

        );

        return{

            pillarIndex :

                index,

            score :

                lowest,

            percentage :

                Number(

                    (

                        lowest /

                        MAX_PILLAR_SCORE

                    ) * 100

                ).toFixed(1)

        };

    }



    /*=========================================================================
        PERFORMANCE BAND

    =========================================================================*/

    function getPerformanceBand(

        score

    ){

        if(

            score < 40

        ){

            return{

                key :

                    'attention',

                title :

                    'Needs Immediate Attention'

            };

        }



        if(

            score < 60

        ){

            return{

                key :

                    'developing',

                title :

                    'Developing'

            };

        }



        if(

            score < 80

        ){

            return{

                key :

                    'strong',

                title :

                    'Strong'

            };

        }



        return{

            key :

                'exceptional',

            title :

                'Exceptional'

        };

    }



    /*=========================================================================
        CALCULATE COMPLETE SUMMARY

    =========================================================================*/

    function calculateSummary(

        pillarScores

    ){

        const overall =

            calculateOverallScore(

                pillarScores

            );



        return{

            rawScore :

                overall.rawScore,



            overallScore :

                Number(

                    overall.percentage

                ).toFixed(1),



            strongest :

                getStrongestPillar(

                    pillarScores

                ),



            growth :

                getGrowthOpportunity(

                    pillarScores

                ),



            performance :

                getPerformanceBand(

                    overall.percentage

                )

        };

    }



    /*=========================================================================
        VALIDATE SCORE

    =========================================================================*/

    function validateScore(

        score

    ){

        const value =

            Number(

                score

            );



        if(

            Number.isNaN(

                value

            )

        ){

            return 0;

        }



        return Math.max(

            1,

            Math.min(

                MAX_SCORE_PER_QUESTION,

                value

            )

        );

    }

      /*=========================================================================
        GET MAXIMUM SCORES
    =========================================================================*/

    function getMaximumScores(){

        return{

            maxQuestionScore :

                MAX_SCORE_PER_QUESTION,

            questionsPerPillar :

                QUESTIONS_PER_PILLAR,

            maxPillarScore :

                MAX_PILLAR_SCORE,

            totalPillars :

                TOTAL_PILLARS,

            maxOverallScore :

                MAX_TOTAL_SCORE

        };

    }



    /*=========================================================================
        CALCULATE COMPLETION

    =========================================================================*/

    function calculateCompletion(

        answers

    ){

        if(

            !Array.isArray(

                answers

            )

        ){

            return{

                answered : 0,

                remaining : QUESTIONS_PER_PILLAR,

                percentage : 0

            };

        }



        const answered =

            answers.filter(

                answer =>

                    answer !== null &&

                    answer !== undefined &&

                    answer > 0

            ).length;



        return{

            answered :

                answered,



            remaining :

                QUESTIONS_PER_PILLAR -

                answered,



            percentage :

                (

                    answered /

                    QUESTIONS_PER_PILLAR

                ) * 100

        };

    }



    /*=========================================================================
        CREATE EMPTY SCORECARD

    =========================================================================*/

    function createScorecard(){

        return{

            pillarScores :

                new Array(

                    TOTAL_PILLARS

                ).fill(0),



            rawScore : 0,



            overallScore : 0,



            strongest : null,



            growth : null,



            performance : null

        };

    }



    /*=========================================================================
        RESET SCORECARD

    =========================================================================*/

    function resetScorecard(

        scorecard

    ){

        if(

            !scorecard

        ){

            return createScorecard();

        }



        scorecard.pillarScores.fill(

            0

        );



        scorecard.rawScore = 0;

        scorecard.overallScore = 0;

        scorecard.strongest = null;

        scorecard.growth = null;

        scorecard.performance = null;



        return scorecard;

    }



    /*=========================================================================
        PUBLIC API

    =========================================================================*/

    return{

        calculatePillarScore,



        calculatePillarAverage,



        calculateOverallScore,



        calculateSummary,



        calculateCompletion,



        convertToHundred,



        getStrongestPillar,



        getGrowthOpportunity,



        getPerformanceBand,



        getMaximumScores,



        validateScore,



        createScorecard,



        resetScorecard

    };



})();

/*=============================================================================

    END OF FILE

=============================================================================*/
