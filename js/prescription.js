
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    prescription.js

    PURPOSE

    Executive Transformation Engine

    RESPONSIBILITIES

    • Load Assessment Results
    • Build Transformation Summary
    • Generate 90-Day Prescription
    • Populate Executive Report

    VERSION

    1.0

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    PRESCRIPTION
=============================================================================*/

CTM.prescription = (function(){

    /*=========================================================================
        STATE
    =========================================================================*/

    const state = {

        result : null,

        pillars : [],

        priorities : []

    };



    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    function init(){

        loadResults();

        initializeReport();

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
        INITIALIZATION PIPELINE
    =========================================================================*/

    function initializeReport(){

        if(

            !state.result

        ){

            return;

        }



        populateSummary();

        generateTransformationSummary();

    }



    /*=========================================================================
        POPULATE SUMMARY
    =========================================================================*/

    function populateSummary(){

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

        const values =

            state.result.pillarScores.map(

                score =>

                (score / 50) * 100

            );



        const average =

            values.reduce(

                (sum,value)=>sum+value,

                0

            ) / values.length;



        const variance =

            values.reduce(

                (sum,value)=>{

                    return sum +

                        Math.pow(

                            value-average,

                            2

                        );

                },

                0

            ) / values.length;



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
        TRANSFORMATION SUMMARY™

    =========================================================================*/

    function generateTransformationSummary(){

        const visitor =

            state.result.visitor.name;



        const score =

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



        const summary =

`

${visitor}, your CTM PATH™ Assessment has identified a clear starting point for your next stage of growth.

With an overall score of ${score}, you currently fall within the "${performance}" performance category.

Your assessment shows that ${strongest} is one of your greatest strengths and provides a strong foundation for future success.

At the same time, ${growth} has emerged as your highest-priority opportunity for development. Strengthening this pillar during the next ninety days will create positive momentum across many other areas of your life.

This prescription has been designed specifically to help you focus on the few actions that will produce the greatest long-term transformation.

`;



        document.getElementById(

            'transformationSummary'

        ).textContent =

            summary.trim();

    }

    /*=========================================================================
        TOP 3 PRIORITIES™

    =========================================================================*/

    function generatePriorities(){

        const container =

            document.getElementById(

                'priorityList'

            );



        container.innerHTML = '';



        state.priorities =

            state.result.pillarScores

            .map(

                (score,index)=>({

                    index,

                    score

                })

            )

            .sort(

                (a,b)=>a.score-b.score

            )

            .slice(0,3);



        state.priorities.forEach(

            (

                item,

                position

            )=>{

                const pillar =

                    state.pillars[

                        item.index

                    ];



                const card =

                    document.createElement(

                        'div'

                    );



                card.className =

                    'priority-card';



                card.innerHTML =

                `

                <div class="priority-number">

                    0${position+1}

                </div>



                <div class="priority-content">

                    <h3 class="priority-title">

                        ${pillar.title}

                    </h3>

                    <p class="priority-description">

                        ${buildPriorityDescription(pillar)}

                    </p>

                </div>

                `;



                container.appendChild(

                    card

                );



            }

        );

    }



    /*=========================================================================
        PRIORITY DESCRIPTION™

    =========================================================================*/

    function buildPriorityDescription(

        pillar

    ){

        return `

Priority

Focus on strengthening ${pillar.title} during the next ninety days.

Objective

Build consistent progress through small daily actions.

Action

Complete the recommended activities for this pillar every day.

Expected Outcome

Create measurable improvement in this life pillar while increasing your overall Life Balance Index™.

`.trim();

    }



    /*=========================================================================
        90-DAY ROADMAP™

    =========================================================================*/

    function generateRoadmap(){

        buildRoadmap(

            'month1Actions',

            [

                'Understand your current patterns.',

                'Build consistent daily habits.',

                'Remove your biggest obstacles.',

                'Complete your first monthly milestone.'

            ]

        );



        buildRoadmap(

            'month2Actions',

            [

                'Increase daily consistency.',

                'Develop stronger routines.',

                'Measure weekly progress.',

                'Complete your second monthly milestone.'

            ]

        );



        buildRoadmap(

            'month3Actions',

            [

                'Maintain disciplined execution.',

                'Strengthen weaker pillars.',

                'Prepare for reassessment.',

                'Complete your ninety-day transformation.'

            ]

        );

    }



    /*=========================================================================
        BUILD ROADMAP™

    =========================================================================*/

    function buildRoadmap(

        id,

        actions

    ){

        const list =

            document.getElementById(

                id

            );



        list.innerHTML = '';



        actions.forEach(

            action=>{

                const item =

                    document.createElement(

                        'li'

                    );



                item.textContent =

                    action;



                list.appendChild(

                    item

                );



            }

        );

    }



    /*=========================================================================
        MONTHLY MILESTONES™

    =========================================================================*/

    function generateMonthlyMilestones(){

        attachMilestone(

            'roadmapMonth1',

            'Milestone™',

            'Complete your daily success habits consistently for the first 21 days.'

        );



        attachMilestone(

            'roadmapMonth2',

            'Milestone™',

            'Demonstrate measurable improvement in your three priority pillars.'

        );



        attachMilestone(

            'roadmapMonth3',

            'Milestone™',

            'Complete your first ninety-day CTM PATH™ transformation cycle and prepare for reassessment.'

        );

    }



    /*=========================================================================
        ATTACH MILESTONE™

    =========================================================================*/

    function attachMilestone(

        cardId,

        title,

        text

    ){

        const card =

            document.getElementById(

                cardId

            );



        const block =

            document.createElement(

                'div'

            );



        block.className =

            'roadmap-milestone';



        block.innerHTML =

        `

        <div class="milestone-title">

            ${title}

        </div>

        <div class="milestone-text">

            ${text}

        </div>

        `;



        card.appendChild(

            block

        );

    }

    /*=========================================================================
        DAILY SUCCESS HABITS™

    =========================================================================*/

    function generateDailyHabits(){

        const container =

            document.getElementById(

                'dailyHabits'

            );



        container.innerHTML = '';



        const habits = [

            {

                title :

                'Morning Planning™',

                description :

                'Begin each day by identifying your three highest-priority actions.'

            },

            {

                title :

                'Daily Learning™',

                description :

                'Invest at least thirty minutes in learning that strengthens your priority pillars.'

            },

            {

                title :

                'Focused Execution™',

                description :

                'Complete one meaningful activity that directly improves your highest-priority pillar.'

            },

            {

                title :

                'Relationship Building™',

                description :

                'Create one intentional interaction that strengthens your personal or professional relationships.'

            },

            {

                title :

                'Evening Reflection™',

                description :

                'Review your progress, celebrate small wins and prepare for tomorrow.'

            }

        ];



        habits.forEach(

            habit=>{

                const card =

                    document.createElement(

                        'div'

                    );



                card.className =

                    'habit-item';



                card.innerHTML =

                `

                <div class="habit-icon">

                    ✓

                </div>



                <div class="habit-content">

                    <h3 class="habit-title">

                        ${habit.title}

                    </h3>



                    <p class="habit-description">

                        ${habit.description}

                    </p>

                </div>

                `;



                container.appendChild(

                    card

                );



            }

        );

    }



    /*=========================================================================
        WEEKLY SUCCESS RHYTHM™

    =========================================================================*/

    function generateWeeklyRhythm(){

        const container =

            document.getElementById(

                'weeklyRhythm'

            );



        container.innerHTML = '';



        const schedule = [

            {

                day:'Monday',

                icon:'🧭',

                theme:'Planning™',

                description:'Review goals and prepare your week.'

            },

            {

                day:'Tuesday',

                icon:'📚',

                theme:'Learning™',

                description:'Acquire knowledge and develop skills.'

            },

            {

                day:'Wednesday',

                icon:'⚙',

                theme:'Execution™',

                description:'Complete your highest-impact work.'

            },

            {

                day:'Thursday',

                icon:'🤝',

                theme:'Relationships™',

                description:'Strengthen meaningful connections.'

            },

            {

                day:'Friday',

                icon:'💰',

                theme:'Cashflow™',

                description:'Focus on income-generating activities.'

            },

            {

                day:'Saturday',

                icon:'🌱',

                theme:'Contribution™',

                description:'Serve, mentor and create positive impact.'

            },

            {

                day:'Sunday',

                icon:'🪞',

                theme:'Reflection™',

                description:'Evaluate progress and prepare for the next week.'

            }

        ];



        schedule.forEach(

            item=>{

                const card =

                    document.createElement(

                        'article'

                    );



                card.className =

                    'day-card';



                card.innerHTML =

                `

                <div class="day-name">

                    ${item.icon} ${item.day}

                </div>



                <div class="day-theme">

                    ${item.theme}

                </div>



                <p class="day-description">

                    ${item.description}

                </p>

                `;



                container.appendChild(

                    card

                );



            }

        );

    }

    /*=========================================================================
        SUCCESS DECLARATION™

    =========================================================================*/

    function generateSuccessDeclaration(){

        const declaration =

            document.getElementById(

                'successDeclaration'

            );



        declaration.textContent =

`

I choose to become the architect of my future rather than a spectator of my circumstances.

For the next ninety days, I will consistently follow my personalized CTM PATH™ Prescription™, strengthen my highest-priority life pillars, and take disciplined action every day.

I understand that lasting transformation is created through small, consistent improvements rather than occasional extraordinary efforts.

Today I commit myself to continuous growth, meaningful contribution, financial freedom, and a balanced life.

My transformation begins now.

`;

    }



    /*=========================================================================
        EVENTS

    =========================================================================*/

    function bindEvents(){

        const button =

            document.getElementById(

                'btnBeginJourney'

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

                    'completion'

                );

            }

        );

    }



    /*=========================================================================
        BUILD REPORT

    =========================================================================*/

    function buildPrescription(){

        generatePriorities();

        generateRoadmap();

        generateMonthlyMilestones();

        generateDailyHabits();

        generateWeeklyRhythm();

        generateSuccessDeclaration();

    }



    /*=========================================================================
        INITIALIZATION PIPELINE

    =========================================================================*/

    function initializeReport(){

        populateSummary();

        generateTransformationSummary();

        buildPrescription();

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
