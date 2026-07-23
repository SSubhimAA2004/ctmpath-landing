
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    diagnosis.js

    PURPOSE

    Executive Diagnosis Engine

    RESPONSIBILITIES

    • Load Assessment Results
    • Populate Executive Summary
    • Generate Life Story
    • Generate Diagnosis Report

    VERSION

    1.0

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    DIAGNOSIS
=============================================================================*/

CTM.diagnosis = (function(){

    /*=========================================================================
        STATE
    =========================================================================*/

    const state = {

        result : null,

        pillars : []

    };



    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    function init(){

        loadResults();

        populateSummary();

        generateLifeStory();

    }



    /*=========================================================================
        LOAD RESULTS
    =========================================================================*/

    function loadResults(){

        state.result =

            CTM.storage.getAssessmentResult();



        if(

            !state.result

        ){

            console.warn(

                'Assessment results not found.'

            );

            return;

        }



        state.pillars =

            CTM.assessment.pillars;

    }



    /*=========================================================================
        POPULATE SUMMARY
    =========================================================================*/

    function populateSummary(){

        if(

            !state.result

        ){

            return;

        }



        document.getElementById(

            'visitorName'

        ).textContent =

            state.result.visitor.name;



        document.getElementById(

            'overallScore'

        ).textContent =

            Math.round(

                state.result.summary.overallScore

            );



        document.getElementById(

            'overallBand'

        ).textContent =

            state.result.summary.performance.title;



        document.getElementById(

            'lifeBalanceIndex'

        ).textContent =

            calculateLifeBalanceIndex();

    }



    /*=========================================================================
        LIFE BALANCE INDEX™

    =========================================================================*/

    function calculateLifeBalanceIndex(){

        const scores =

            state.result.pillarScores.map(

                score =>

                (score / 50) * 100

            );



        const average =

            scores.reduce(

                (sum,value)=>sum+value,

                0

            ) / scores.length;



        const variance =

            scores.reduce(

                (sum,value)=>{

                    return sum +

                        Math.pow(

                            value-average,

                            2

                        );

                },

                0

            ) / scores.length;



        const deviation =

            Math.sqrt(

                variance

            );



        return Math.max(

            0,

            Math.round(

                100 -

                deviation

            )

        );

    }



    /*=========================================================================
        GENERATE LIFE STORY™

    =========================================================================*/

    function generateLifeStory(){

        if(

            !state.result

        ){

            return;

        }



        const band =

            state.result.summary.performance.title;



        const score =

            Math.round(

                state.result.summary.overallScore

            );



        const strongest =

            state.pillars[

                state.result.summary

                .strongest

                .pillarIndex

            ].title;



        const growth =

            state.pillars[

                state.result.summary

                .growth

                .pillarIndex

            ].title;



        const story =

`

Your assessment indicates an overall CTM PATH™ Score of ${score}, placing you in the "${band}" performance category.

One of your most significant strengths is ${strongest}, demonstrating that you already possess important foundations for long-term growth.

At the same time, ${growth} represents your greatest opportunity for improvement. Strengthening this area can create a more balanced, resilient, and sustainable life journey.

Overall, your profile suggests that you have meaningful strengths to build upon while also identifying specific areas where focused development can produce substantial positive change.

`;



        document.getElementById(

            'lifeStory'

        ).textContent =

            story.trim();

    }

    /*=========================================================================
        TOP 3 STRENGTHS™

    =========================================================================*/

    function populateStrengths(){

        if(!state.result){

            return;

        }

        const container =

            document.getElementById(

                'strengthList'

            );



        container.innerHTML = '';



        const ranked =

            state.result.pillarScores

            .map((score,index)=>({

                index,

                score

            }))

            .sort(

                (a,b)=>b.score-a.score

            )

            .slice(0,3);



        ranked.forEach(item=>{

            const pillar =

                state.pillars[item.index];



            const card =

                document.createElement(

                    'div'

                );



            card.className =

                'insight-item';



            card.innerHTML =

            `

            <span class="insight-name">

                ${pillar.title}

            </span>

            <span class="insight-score">

                ${Math.round((item.score/50)*100)}

            </span>

            `;



            container.appendChild(

                card

            );



        });

    }



    /*=========================================================================
        TOP 3 GROWTH AREAS™

    =========================================================================*/

    function populateGrowthAreas(){

        if(!state.result){

            return;

        }

        const container =

            document.getElementById(

                'growthList'

            );



        container.innerHTML='';



        const ranked =

            state.result.pillarScores

            .map((score,index)=>({

                index,

                score

            }))

            .sort(

                (a,b)=>a.score-b.score

            )

            .slice(0,3);



        ranked.forEach(item=>{

            const pillar =

                state.pillars[item.index];



            const card =

                document.createElement(

                    'div'

                );



            card.className =

                'insight-item';



            card.innerHTML =

            `

            <span class="insight-name">

                ${pillar.title}

            </span>

            <span class="insight-score">

                ${Math.round((item.score/50)*100)}

            </span>

            `;



            container.appendChild(

                card

            );



        });

    }



    /*=========================================================================
        BUILD 12 DIAGNOSIS CARDS™

    =========================================================================*/

    function buildDiagnosisCards(){

        if(!state.result){

            return;

        }



        const container =

            document.getElementById(

                'pillarDiagnosisList'

            );



        container.innerHTML='';



        state.pillars.forEach(

            (pillar,index)=>{

                const score =

                    Math.round(

                        (state.result.pillarScores[index]/50)*100

                    );



                const band =

                    getDiagnosisBand(

                        score

                    );



                const diagnosis =

                    getDiagnosisText(

                        pillar,

                        score,

                        band

                    );



                const article =

                    document.createElement(

                        'article'

                    );



                article.className =

                    'pillar-diagnosis-item';



                article.innerHTML =

                `

                <div class="pillar-header">

                    <h3 class="pillar-title">

                        ${pillar.title}

                    </h3>

                    <div class="pillar-score">

                        ${score}

                    </div>

                </div>

                <div class="pillar-band">

                    ${band}

                </div>

                <p class="pillar-diagnosis">

                    ${diagnosis}

                </p>

                `;



                container.appendChild(

                    article

                );



            }

        );

    }



    /*=========================================================================
        DIAGNOSIS BAND™

    =========================================================================*/

    function getDiagnosisBand(

        score

    ){

        if(score<40){

            return

            'Critical Attention';

        }



        if(score<60){

            return

            'Emerging Foundation';

        }



        if(score<80){

            return

            'Healthy Progress';

        }



        return

        'Exceptional Strength';

    }



    /*=========================================================================
        DIAGNOSIS TEXT™

    =========================================================================*/

    function getDiagnosisText(

        pillar,

        score,

        band

    ){

        return

`${pillar.title} currently falls within the "${band}" range with a score of ${score}. This indicates your present level of development in this life pillar. While every pillar contributes to long-term fulfilment, strengthening weaker areas and maintaining stronger ones will create a more balanced and sustainable life journey.`;

    }

    /*=========================================================================
        OVERALL DIAGNOSIS™

    =========================================================================*/

    function generateOverallDiagnosis(){

        if(

            !state.result

        ){

            return;

        }



        const overallScore =

            Math.round(

                state.result.summary.overallScore

            );



        const performance =

            state.result.summary.performance.title;



        const strongest =

            state.pillars[

                state.result.summary

                .strongest

                .pillarIndex

            ].title;



        const growth =

            state.pillars[

                state.result.summary

                .growth

                .pillarIndex

            ].title;



        const balance =

            calculateLifeBalanceIndex();



        const diagnosis =

`

EXECUTIVE SUMMARY

Your CTM PATH™ Assessment indicates an overall score of ${overallScore}, placing you within the "${performance}" performance category.

Your profile demonstrates meaningful strengths, particularly in ${strongest}, providing a solid platform for continued personal and professional development.

The assessment also highlights ${growth} as your highest-priority development area. Improving this pillar is likely to create positive effects across multiple areas of your life and increase your overall Life Balance Index™.

Your current Life Balance Index™ is ${balance}, indicating the degree of harmony across the twelve life pillars. Sustainable success is achieved not only through high individual scores but through balanced development across all dimensions of life.

Overall, your assessment suggests strong potential for long-term growth. By strengthening lower-performing pillars while continuing to build on your existing strengths, you can create greater balance, resilience, fulfilment and sustainable success.

`;



        document.getElementById(

            'overallDiagnosis'

        ).textContent =

            diagnosis.trim();

    }



    /*=========================================================================
        EVENTS

    =========================================================================*/

    function bindEvents(){

        const button =

            document.getElementById(

                'btnContinuePrescription'

            );



        if(

            !button

        ){

            return;

        }



        button.addEventListener(

            'click',

            function(){

                CTM.router.go(

                    'prescription'

                );

            }

        );

    }



    /*=========================================================================
        INITIALIZATION PIPELINE

    =========================================================================*/

    function initializeReport(){

        populateSummary();

        generateLifeStory();

        populateStrengths();

        populateGrowthAreas();

        buildDiagnosisCards();

        generateOverallDiagnosis();

        bindEvents();

    }



    /*=========================================================================
        INITIALIZE

    =========================================================================*/

    function init(){

        loadResults();



        if(

            !state.result

        ){

            return;

        }



        initializeReport();

    }



    /*=========================================================================
        PUBLIC API

    =========================================================================*/

    return{

        init

    };



})();

/*=============================================================================

    END OF FILE

=============================================================================*/
