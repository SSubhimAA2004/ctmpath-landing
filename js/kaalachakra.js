
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    kaalachakra.js

    PURPOSE

    Kaalachakra™ Visualization Engine

    RESPONSIBILITIES

    • Draw Kaalachakra™
    • Display Assessment Results
    • Animate Life Wheel
    • Calculate Geometry

    VERSION

    1.0

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    KAALACHAKRA
=============================================================================*/

CTM.kaalachakra = (function(){

    /*=========================================================================
        CONSTANTS
    =========================================================================*/

    const TOTAL_PILLARS = 12;

    const FULL_CIRCLE = Math.PI * 2;

    const START_ANGLE = -Math.PI / 2;



    /*=========================================================================
        STATE
    =========================================================================*/

    const state = {

        canvas : null,

        context : null,

        width : 0,

        height : 0,

        centerX : 0,

        centerY : 0,

        radius : 0,

        scores : [],

        labels : []

    };



    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    function init(){

        state.canvas =

            document.getElementById(

                'radarCanvas'

            );



        if(

            !state.canvas

        ){

            return;

        }



        state.context =

            state.canvas.getContext(

                '2d'

            );



        calculateGeometry();



        loadAssessment();



        draw();

    }



    /*=========================================================================
        LOAD DATA
    =========================================================================*/

    function loadAssessment(){

        state.labels =

            CTM.assessment.pillars.map(

                pillar =>

                pillar.title

            );



        const result =

            CTM.storage.getAssessmentResult?.();



        if(

            result &&

            result.pillarScores

        ){

            state.scores =

                result.pillarScores;

        }

        else{

            state.scores =

                new Array(

                    TOTAL_PILLARS

                ).fill(

                    25

                );

        }

    }



    /*=========================================================================
        GEOMETRY
    =========================================================================*/

    function calculateGeometry(){

        state.width =

            state.canvas.width;



        state.height =

            state.canvas.height;



        const size =

            Math.min(

                state.width,

                state.height

            );



        state.radius =

            size * 0.40;



        state.centerX =

            state.width / 2;



        state.centerY =

            state.height / 2;

    }



    /*=========================================================================
        DRAW
    =========================================================================*/

    function draw(){

        clear();

        drawOuterCircle();

        drawGrid();

        drawSpokes();

    }



    /*=========================================================================
        CLEAR
    =========================================================================*/

    function clear(){

        state.context.clearRect(

            0,

            0,

            state.width,

            state.height

        );

    }



    /*=========================================================================
        OUTER CIRCLE
    =========================================================================*/

    function drawOuterCircle(){

        const ctx =

            state.context;



        ctx.beginPath();



        ctx.arc(

            state.centerX,

            state.centerY,

            state.radius,

            0,

            FULL_CIRCLE

        );



        ctx.lineWidth = 3;



        ctx.strokeStyle =

            '#D4AF37';



        ctx.stroke();

    }



    /*=========================================================================
        GRID
    =========================================================================*/

    function drawGrid(){

        const ctx =

            state.context;



        const rings = 5;



        ctx.strokeStyle =

            'rgba(255,255,255,.10)';



        ctx.lineWidth = 1;



        for(

            let i = 1;

            i <= rings;

            i++

        ){

            ctx.beginPath();



            ctx.arc(

                state.centerX,

                state.centerY,

                state.radius *

                (

                    i /

                    rings

                ),

                0,

                FULL_CIRCLE

            );



            ctx.stroke();

        }

    }



    /*=========================================================================
        SPOKES
    =========================================================================*/

    function drawSpokes(){

        const ctx =

            state.context;



        ctx.strokeStyle =

            'rgba(212,175,55,.45)';



        ctx.lineWidth = 1.5;



        for(

            let i = 0;

            i < TOTAL_PILLARS;

            i++

        ){

            const angle =

                START_ANGLE +

                (

                    FULL_CIRCLE /

                    TOTAL_PILLARS

                ) * i;



            const x =

                state.centerX +

                Math.cos(

                    angle

                ) *

                state.radius;



            const y =

                state.centerY +

                Math.sin(

                    angle

                ) *

                state.radius;



            ctx.beginPath();

            ctx.moveTo(

                state.centerX,

                state.centerY

            );

            ctx.lineTo(

                x,

                y

            );

            ctx.stroke();

        }

    }

    /*=========================================================================
        DRAW KAALACHAKRA GRID

        12 SIDED POLYGONS

    =========================================================================*/

    function drawGrid(){

        const ctx = state.context;

        const rings = 5;

        ctx.strokeStyle = 'rgba(255,255,255,.08)';

        ctx.lineWidth = 1;

        for(let ring=1; ring<=rings; ring++){

            const radius =

                state.radius *

                (ring / rings);

            ctx.beginPath();

            for(let i=0;i<TOTAL_PILLARS;i++){

                const angle =

                    START_ANGLE +

                    (FULL_CIRCLE / TOTAL_PILLARS) * i;

                const x =

                    state.centerX +

                    Math.cos(angle) * radius;

                const y =

                    state.centerY +

                    Math.sin(angle) * radius;

                if(i===0){

                    ctx.moveTo(x,y);

                }

                else{

                    ctx.lineTo(x,y);

                }

            }

            ctx.closePath();

            ctx.stroke();

        }

    }



    /*=========================================================================
        SCORE POLYGON

    =========================================================================*/

    function drawScorePolygon(){

        const ctx = state.context;

        ctx.beginPath();

        for(let i=0;i<TOTAL_PILLARS;i++){

            const value =

                state.scores[i] / 50;

            const radius =

                state.radius * value;

            const angle =

                START_ANGLE +

                (FULL_CIRCLE / TOTAL_PILLARS) * i;

            const x =

                state.centerX +

                Math.cos(angle) * radius;

            const y =

                state.centerY +

                Math.sin(angle) * radius;

            if(i===0){

                ctx.moveTo(x,y);

            }

            else{

                ctx.lineTo(x,y);

            }

        }

        ctx.closePath();

        ctx.fillStyle =

            'rgba(212,175,55,.18)';

        ctx.strokeStyle =

            '#D4AF37';

        ctx.lineWidth = 3;

        ctx.fill();

        ctx.stroke();

    }



    /*=========================================================================
        SCORE POINTS

    =========================================================================*/

    function drawPoints(){

        const ctx = state.context;

        ctx.fillStyle = '#D4AF37';

        for(let i=0;i<TOTAL_PILLARS;i++){

            const value =

                state.scores[i] / 50;

            const radius =

                state.radius * value;

            const angle =

                START_ANGLE +

                (FULL_CIRCLE / TOTAL_PILLARS) * i;

            const x =

                state.centerX +

                Math.cos(angle) * radius;

            const y =

                state.centerY +

                Math.sin(angle) * radius;

            ctx.beginPath();

            ctx.arc(

                x,

                y,

                5,

                0,

                FULL_CIRCLE

            );

            ctx.fill();

        }

    }



    /*=========================================================================
        PILLAR LABELS

    =========================================================================*/

    function drawLabels(){

        const ctx = state.context;

        ctx.fillStyle = '#F8F6F0';

        ctx.font = '600 16px Inter';

        ctx.textAlign = 'center';

        ctx.textBaseline = 'middle';

        for(let i=0;i<TOTAL_PILLARS;i++){

            const angle =

                START_ANGLE +

                (FULL_CIRCLE / TOTAL_PILLARS) * i;

            const radius =

                state.radius + 45;

            const x =

                state.centerX +

                Math.cos(angle) * radius;

            const y =

                state.centerY +

                Math.sin(angle) * radius;

            ctx.fillText(

                state.labels[i],

                x,

                y

            );

        }

    }



    /*=========================================================================
        CENTER LOGO

    =========================================================================*/

    function drawCenter(){

        const ctx = state.context;

        ctx.beginPath();

        ctx.arc(

            state.centerX,

            state.centerY,

            26,

            0,

            FULL_CIRCLE

        );

        ctx.fillStyle = '#081C3A';

        ctx.fill();

        ctx.strokeStyle = '#D4AF37';

        ctx.lineWidth = 2;

        ctx.stroke();

        ctx.fillStyle = '#D4AF37';

        ctx.font = '700 18px Inter';

        ctx.textAlign = 'center';

        ctx.textBaseline = 'middle';

        ctx.fillText(

            'CTM',

            state.centerX,

            state.centerY

        );

    }



    /*=========================================================================
        DRAW

    =========================================================================*/

    function draw(){

        clear();

        drawOuterCircle();

        drawGrid();

        drawSpokes();

        drawScorePolygon();

        drawPoints();

        drawLabels();

        drawCenter();

    }

    /*=========================================================================
        LIFE BALANCE INDEX™

    =========================================================================*/

    function calculateLifeBalanceIndex(){

        if(

            !state.scores ||

            state.scores.length === 0

        ){

            return 0;

        }

        const values =

            state.scores.map(

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
        POPULATE DASHBOARD

    =========================================================================*/

    function populateDashboard(){

        const result =

            CTM.storage.getAssessmentResult();

        if(

            !result

        ){

            return;

        }

        document.getElementById(

            'visitorName'

        ).textContent =

            result.visitor.name;



        document.getElementById(

            'overallScore'

        ).textContent =

            Math.round(

                result.summary.overallScore

            );



        document.getElementById(

            'overallBand'

        ).textContent =

            result.summary.performance.title;



        document.getElementById(

            'lifeBalanceIndex'

        ).textContent =

            calculateLifeBalanceIndex();



        buildPillarTable(

            result

        );



        populateHighlights(

            result

        );



        generateInsight(

            result

        );

    }



    /*=========================================================================
        BUILD SCORE TABLE

    =========================================================================*/

    function buildPillarTable(

        result

    ){

        const container =

            document.getElementById(

                'pillarScoreList'

            );



        container.innerHTML='';



        CTM.assessment.pillars.forEach(

            (

                pillar,

                index

            )=>{

                const row =

                    document.createElement(

                        'div'

                    );



                row.className =

                    'pillar-row';



                row.innerHTML =

                `

                <span class="pillar-name">

                ${pillar.title}

                </span>

                <span class="pillar-score">

                ${Math.round(

                    (result.pillarScores[index]/50)*100

                )}

                </span>

                `;



                container.appendChild(

                    row

                );



            }

        );

    }



    /*=========================================================================
        HIGHLIGHTS

    =========================================================================*/

    function populateHighlights(

        result

    ){

        const strongest =

            CTM.assessment.pillars[

                result.summary

                .strongest

                .pillarIndex

            ];



        const growth =

            CTM.assessment.pillars[

                result.summary

                .growth

                .pillarIndex

            ];



        document.getElementById(

            'strongestPillar'

        ).textContent =

            strongest.title;



        document.getElementById(

            'strongestScore'

        ).textContent =

            Math.round(

                result.summary

                .strongest

                .percentage

            );



        document.getElementById(

            'growthPillar'

        ).textContent =

            growth.title;



        document.getElementById(

            'growthScore'

        ).textContent =

            Math.round(

                result.summary

                .growth

                .percentage

            );

    }



    /*=========================================================================
        PERSONAL INSIGHT

    =========================================================================*/

    function generateInsight(

        result

    ){

        const insight =

        document.getElementById(

            'personalInsight'

        );



        insight.textContent =

        `

You have completed the CTM PATH™ Assessment.

Your overall score indicates a

${result.summary.performance.title.toLowerCase()}

foundation.

Your greatest strength is

${document.getElementById('strongestPillar').textContent},

while your greatest opportunity for growth is

${document.getElementById('growthPillar').textContent}.

By strengthening your lower scoring pillars while continuing to build on your existing strengths, you can create a more balanced, resilient and fulfilling life journey.

        `;

    }



    /*=========================================================================
        EVENTS

    =========================================================================*/

    function bindEvents(){

        document

        .getElementById(

            'btnContinueDiagnosis'

        )

        .addEventListener(

            'click',

            function(){

                CTM.router.go(

                    'diagnosis'

                );

            }

        );

    }



    /*=========================================================================
        INITIALIZE

    =========================================================================*/

    function init(){

        state.canvas =

            document.getElementById(

                'radarCanvas'

            );



        if(

            !state.canvas

        ){

            return;

        }



        state.context =

            state.canvas

            .getContext(

                '2d'

            );



        calculateGeometry();

        loadAssessment();

        draw();

        populateDashboard();

        bindEvents();

    }



    /*=========================================================================
        PUBLIC API

    =========================================================================*/

    return{

        init

    };



})();
