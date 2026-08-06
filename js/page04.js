
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   page04.js

   PAGE:
   KALA CHAKRA™ LIFE ALIGNMENT™

   VERSION:
   10.0


   RESPONSIBILITIES:

   ✓ Read Page03 Life Assessment Scores
   ✓ Validate 12 Pillar Scores
   ✓ Calculate Life Alignment Score
   ✓ Calculate Alignment Percentage
   ✓ Identify Strongest Life Pillar
   ✓ Identify Greatest Growth Opportunity
   ✓ Render KALA CHAKRA™ 12-Spoke Life Wheel
   ✓ Render Score-Based Red / Orange / Green Nodes
   ✓ Render 12 Life Pillar Results
   ✓ Prepare Page05 Transition


========================================================================== */


(function(){

"use strict";




/* ==========================================================================
   PAGE CONFIGURATION
========================================================================== */


const PAGE04_CONFIG = {


    assessmentStorageKey:

        "CTM_PAGE03_ALIGNMENT",


    resultStorageKey:

        "CTM_PAGE04_ALIGNMENT_RESULT",


    peopleIdStorageKey:

        "ctm_people_id",


    nextPage:

        "page05.html",


    previousPage:

        "page03.html",


    totalPillars:

        12,


    maximumScore:

        120,


    maximumPillarScore:

        10


};




/* ==========================================================================
   KALA CHAKRA™ PILLARS

   IMPORTANT:

   These names intentionally match the exact keys used by page03.js.

========================================================================== */


const PILLARS = [


    {
        number: "01",
        key: "Purpose",
        tamil: "நோக்கம்",
        english: "PURPOSE"
    },


    {
        number: "02",
        key: "Health",
        tamil: "உடல்நலம்",
        english: "HEALTH"
    },


    {
        number: "03",
        key: "Relationships",
        tamil: "உறவுகள்",
        english: "RELATIONSHIPS"
    },


    {
        number: "04",
        key: "Character & Integrity",
        tamil: "பண்பும் நேர்மையும்",
        english: "CHARACTER & INTEGRITY"
    },


    {
        number: "05",
        key: "Learning & Mastery",
        tamil: "கற்றலும் தேர்ச்சியும்",
        english: "LEARNING & MASTERY"
    },


    {
        number: "06",
        key: "Career & Contribution",
        tamil: "தொழிலும் பங்களிப்பும்",
        english: "CAREER & CONTRIBUTION"
    },


    {
        number: "07",
        key: "Financial Freedom",
        tamil: "பொருளாதார சுதந்திரம்",
        english: "FINANCIAL FREEDOM"
    },


    {
        number: "08",
        key: "Time Freedom",
        tamil: "நேர சுதந்திரம்",
        english: "TIME FREEDOM"
    },


    {
        number: "09",
        key: "Community & Tribe",
        tamil: "சமூகமும் உறவுக்குழுவும்",
        english: "COMMUNITY & TRIBE"
    },


    {
        number: "10",
        key: "Systems & Productivity",
        tamil: "அமைப்புகளும் செயல்திறனும்",
        english: "SYSTEMS & PRODUCTIVITY"
    },


    {
        number: "11",
        key: "Service & Impact",
        tamil: "சேவையும் தாக்கமும்",
        english: "SERVICE & IMPACT"
    },


    {
        number: "12",
        key: "Vision & Legacy",
        tamil: "தொலைநோக்கும் மரபும்",
        english: "VISION & LEGACY"
    }


];




/* ==========================================================================
   PAGE STATE
========================================================================== */


let assessmentData = {};


let isSubmittingAlignment = false;


let alignmentResult = {


    totalScore: 0,

    percentage: 0,

    strongestPillar: null,

    growthPillar: null,

    lifeLevel: "",

    pillars: []


};




/* ==========================================================================
   SCORE COLOURS

   0–3  = RED
   4–7  = ORANGE
   8–10 = GREEN

========================================================================== */


const SCORE_COLOURS = {


    red:

        "#E65050",


    orange:

        "#F29A2E",


    green:

        "#2FB378",


    teal:

        "#19C7C3",


    grid:

        "rgba(255,255,255,0.12)",


    spoke:

        "rgba(255,255,255,0.18)",


    label:

        "#F4F0E6"


};




/* ==========================================================================
   INITIALIZE PAGE
========================================================================== */


function initPage04(){


    console.log(

        "CTM PATH™ MILLIONAIRES™ Page04 Loaded"

    );


    loadAssessment();


    calculateAlignment();


    renderAlignmentScore();


    renderInsights();


    renderPillarResults();


    renderLifeWheel();


    bindNavigation();


    saveAlignmentResult();


}




/* ==========================================================================
   LOAD PAGE03 ASSESSMENT
========================================================================== */


function loadAssessment(){


    const saved =

        sessionStorage.getItem(

            PAGE04_CONFIG.assessmentStorageKey

        );


    if(!saved){


        console.warn(

            "Page04: No Page03 assessment data found."

        );


        assessmentData = {};


        return;


    }


    try{


        const parsed =

            JSON.parse(saved);


        assessmentData =

            parsed && typeof parsed === "object"

                ? parsed

                : {};


    }
    catch(error){


        console.error(

            "Page04: Unable to parse assessment data.",

            error

        );


        assessmentData = {};


    }


}




/* ==========================================================================
   NORMALIZE SCORE
========================================================================== */


function normalizeScore(value){


    const score =

        Number(value);


    if(!Number.isFinite(score)){


        return 0;


    }


    return Math.min(

        PAGE04_CONFIG.maximumPillarScore,

        Math.max(

            0,

            score

        )

    );


}




/* ==========================================================================
   CALCULATE ALIGNMENT
========================================================================== */


function calculateAlignment(){


    const pillarResults =

        PILLARS.map(

            function(pillar){


                return {


                    number:

                        pillar.number,


                    key:

                        pillar.key,


                    tamil:

                        pillar.tamil,


                    english:

                        pillar.english,


                    score:

                        normalizeScore(

                            assessmentData[pillar.key]

                        )


                };


            }

        );


    const totalScore =

        pillarResults.reduce(

            function(total,pillar){


                return total + pillar.score;


            },

            0

        );


    const percentage =

        Math.round(

            (

                totalScore /

                PAGE04_CONFIG.maximumScore

            ) * 100

        );


    let strongestPillar =

        pillarResults[0] || null;


    let growthPillar =

        pillarResults[0] || null;


    pillarResults.forEach(

        function(pillar){


            /*
             * First matching pillar wins ties.
             */


            if(

                strongestPillar === null ||

                pillar.score >

                strongestPillar.score

            ){


                strongestPillar = pillar;


            }


            if(

                growthPillar === null ||

                pillar.score <

                growthPillar.score

            ){


                growthPillar = pillar;


            }


        }

    );


    alignmentResult = {


        totalScore:

            totalScore,


        percentage:

            percentage,


        strongestPillar:

            strongestPillar,


        growthPillar:

            growthPillar,


        lifeLevel:

            determineLifeLevel(

                percentage

            ),


        pillars:

            pillarResults


    };


    console.log(

        "KALA CHAKRA™ Alignment Result:",

        alignmentResult

    );


}




/* ==========================================================================
   DETERMINE LIFE LEVEL
========================================================================== */


function determineLifeLevel(percentage){


    if(percentage <= 30){


        return "FOUNDATION";


    }


    if(percentage <= 50){


        return "STABILISING";


    }


    if(percentage <= 70){


        return "DEVELOPING";


    }


    if(percentage <= 85){


        return "STRONG";


    }


    return "THRIVING";


}




/* ==========================================================================
   SCORE BAND
========================================================================== */


function getScoreBand(score){


    if(score <= 3){


        return "priority";


    }


    if(score <= 7){


        return "developing";


    }


    return "strong";


}




/* ==========================================================================
   SCORE COLOUR
========================================================================== */


function getScoreColour(score){


    if(score <= 3){


        return SCORE_COLOURS.red;


    }


    if(score <= 7){


        return SCORE_COLOURS.orange;


    }


    return SCORE_COLOURS.green;


}




/* ==========================================================================
   RENDER ALIGNMENT SCORE
========================================================================== */


function renderAlignmentScore(){


    setText(

        "alignment-total-score",

        alignmentResult.totalScore

    );


    setText(

        "alignment-maximum-score",

        PAGE04_CONFIG.maximumScore

    );


    setText(

        "alignment-percentage",

        alignmentResult.percentage + "%"

    );


    setText(

        "current-life-level",

        alignmentResult.lifeLevel

    );


}




/* ==========================================================================
   RENDER INSIGHTS
========================================================================== */


function renderInsights(){


    const strongest =

        alignmentResult.strongestPillar;


    const growth =

        alignmentResult.growthPillar;


    if(strongest){


        setText(

            "strongest-pillar-name",

            strongest.tamil +

            " · " +

            strongest.english

        );


        setText(

            "strongest-pillar-score",

            strongest.score

        );


    }


    if(growth){


        setText(

            "growth-pillar-name",

            growth.tamil +

            " · " +

            growth.english

        );


        setText(

            "growth-pillar-score",

            growth.score

        );


    }


}




/* ==========================================================================
   RENDER 12 PILLAR RESULTS
========================================================================== */


function renderPillarResults(){


    const grid =

        document.getElementById(

            "pillar-results-grid"

        );


    if(!grid){


        return;


    }


    grid.innerHTML = "";


    alignmentResult.pillars.forEach(

        function(pillar){


            const card =

                document.createElement(

                    "article"

                );


            const band =

                getScoreBand(

                    pillar.score

                );


            card.className =

                "pillar-result-card " +

                "pillar-result-" +

                band;


            card.dataset.score =

                pillar.score;


            card.innerHTML = `

                <div class="pillar-result-number">

                    ${pillar.number}

                </div>

                <div class="pillar-result-tamil">

                    ${escapeHTML(pillar.tamil)}

                </div>

                <div class="pillar-result-english">

                    ${escapeHTML(pillar.english)}

                </div>

                <div class="pillar-result-score">

                    <span class="pillar-result-score-value">

                        ${pillar.score}

                    </span>

                    <span class="pillar-result-score-max">

                        / 10

                    </span>

                </div>

                <div class="pillar-result-status">

                    ${getScoreStatus(pillar.score)}

                </div>

            `;


            grid.appendChild(

                card

            );


        }

    );


}




/* ==========================================================================
   SCORE STATUS
========================================================================== */


function getScoreStatus(score){


    if(score <= 3){


        return "PRIORITY";


    }


    if(score <= 7){


        return "DEVELOPING";


    }


    return "STRONG";


}




/* ==========================================================================
   RENDER KALA CHAKRA™ LIFE WHEEL
========================================================================== */


function renderLifeWheel(){


    const container =

        document.getElementById(

            "life-wheel-container"

        );


    if(!container){


        return;


    }


    container.innerHTML = "";


    /*
     * ------------------------------------------------------------------
     * SVG COORDINATE SYSTEM
     *
     * The wheel itself occupies the central region.
     * Additional space is deliberately reserved around it for labels.
     * ------------------------------------------------------------------
     */


    const width = 1000;

    const height = 1000;


    const centerX = 500;

    const centerY = 500;


    const maximumRadius = 310;


    /*
     * A tiny inner radius prevents a zero score from collapsing
     * directly into the mathematical centre.
     *
     * This is NOT a visible white centre circle.
     */


    const minimumRadius = 10;


    const svgNS =

        "http://www.w3.org/2000/svg";


    const svg =

        document.createElementNS(

            svgNS,

            "svg"

        );


    svg.setAttribute(

        "viewBox",

        `0 0 ${width} ${height}`

    );


    svg.setAttribute(

        "class",

        "life-wheel-svg"

    );


    svg.setAttribute(

        "aria-hidden",

        "true"

    );


    /*
     * ------------------------------------------------------------------
     * DEFINITIONS
     * ------------------------------------------------------------------
     */


    const defs =

        document.createElementNS(

            svgNS,

            "defs"

        );


    /*
     * Soft polygon gradient.
     */


    const gradient =

        document.createElementNS(

            svgNS,

            "radialGradient"

        );


    gradient.setAttribute(

        "id",

        "lifeWheelFill"

    );


    gradient.setAttribute(

        "cx",

        "50%"

    );


    gradient.setAttribute(

        "cy",

        "50%"

    );


    gradient.setAttribute(

        "r",

        "70%"

    );


    appendGradientStop(

        gradient,

        "0%",

        "rgba(25,199,195,0.28)"

    );


    appendGradientStop(

        gradient,

        "65%",

        "rgba(25,199,195,0.16)"

    );


    appendGradientStop(

        gradient,

        "100%",

        "rgba(25,199,195,0.08)"

    );


    defs.appendChild(

        gradient

    );


    /*
     * Node glow.
     */


    const filter =

        document.createElementNS(

            svgNS,

            "filter"

        );


    filter.setAttribute(

        "id",

        "scoreGlow"

    );


    filter.setAttribute(

        "x",

        "-100%"

    );


    filter.setAttribute(

        "y",

        "-100%"

    );


    filter.setAttribute(

        "width",

        "300%"

    );


    filter.setAttribute(

        "height",

        "300%"

    );


    const blur =

        document.createElementNS(

            svgNS,

            "feGaussianBlur"

        );


    blur.setAttribute(

        "stdDeviation",

        "5"

    );


    blur.setAttribute(

        "result",

        "blur"

    );


    const merge =

        document.createElementNS(

            svgNS,

            "feMerge"

        );


    const mergeBlur =

        document.createElementNS(

            svgNS,

            "feMergeNode"

        );


    mergeBlur.setAttribute(

        "in",

        "blur"

    );


    const mergeSource =

        document.createElementNS(

            svgNS,

            "feMergeNode"

        );


    mergeSource.setAttribute(

        "in",

        "SourceGraphic"

    );


    merge.appendChild(

        mergeBlur

    );


    merge.appendChild(

        mergeSource

    );


    filter.appendChild(

        blur

    );


    filter.appendChild(

        merge

    );


    defs.appendChild(

        filter

    );


    svg.appendChild(

        defs

    );


    /*
     * ------------------------------------------------------------------
     * SCALE RINGS
     *
     * These are deliberately subtle.
     *
     * They provide measurement context without producing a large
     * white disc.
     * ------------------------------------------------------------------
     */


    for(

        let level = 1;

        level <= 10;

        level++

    ){


        const radius =

            maximumRadius *

            (

                level /

                PAGE04_CONFIG.maximumPillarScore

            );


        const ring =

            document.createElementNS(

                svgNS,

                "circle"

            );


        ring.setAttribute(

            "cx",

            centerX

        );


        ring.setAttribute(

            "cy",

            centerY

        );


        ring.setAttribute(

            "r",

            radius

        );


        ring.setAttribute(

            "fill",

            "none"

        );


        ring.setAttribute(

            "stroke",

            level === 10

                ? "rgba(255,255,255,0.20)"

                : SCORE_COLOURS.grid

        );


        ring.setAttribute(

            "stroke-width",

            level === 10

                ? "1.5"

                : "1"

        );


        svg.appendChild(

            ring

        );


    }


    /*
     * ------------------------------------------------------------------
     * SPOKES
     * ------------------------------------------------------------------
     */


    alignmentResult.pillars.forEach(

        function(pillar,index){


            const angle =

                getPillarAngle(

                    index

                );


            const outerPoint =

                polarPoint(

                    centerX,

                    centerY,

                    maximumRadius,

                    angle

                );


            const spoke =

                document.createElementNS(

                    svgNS,

                    "line"

                );


            spoke.setAttribute(

                "x1",

                centerX

            );


            spoke.setAttribute(

                "y1",

                centerY

            );


            spoke.setAttribute(

                "x2",

                outerPoint.x

            );


            spoke.setAttribute(

                "y2",

                outerPoint.y

            );


            spoke.setAttribute(

                "stroke",

                SCORE_COLOURS.spoke

            );


            spoke.setAttribute(

                "stroke-width",

                "1"

            );


            svg.appendChild(

                spoke

            );


        }

    );


    /*
     * ------------------------------------------------------------------
     * SCORE POINTS
     * ------------------------------------------------------------------
     */


    const scorePoints =

        alignmentResult.pillars.map(

            function(pillar,index){


                const angle =

                    getPillarAngle(

                        index

                    );


                const radius =

                    minimumRadius +

                    (

                        (

                            maximumRadius -

                            minimumRadius

                        ) *

                        (

                            pillar.score /

                            PAGE04_CONFIG.maximumPillarScore

                        )

                    );


                return polarPoint(

                    centerX,

                    centerY,

                    radius,

                    angle

                );


            }

        );


    /*
     * ------------------------------------------------------------------
     * ACTUAL IRREGULAR LIFE POLYGON
     *
     * This is the central visual.
     *
     * There is intentionally NO perfect white score circle.
     * ------------------------------------------------------------------
     */


    const polygon =

        document.createElementNS(

            svgNS,

            "polygon"

        );


    polygon.setAttribute(

        "points",

        scorePoints

            .map(

                function(point){


                    return (

                        point.x +

                        "," +

                        point.y

                    );


                }

            )

            .join(" ")

    );


    polygon.setAttribute(

        "fill",

        "url(#lifeWheelFill)"

    );


    polygon.setAttribute(

        "stroke",

        SCORE_COLOURS.teal

    );


    polygon.setAttribute(

        "stroke-width",

        "4"

    );


    polygon.setAttribute(

        "stroke-linejoin",

        "round"

    );


    svg.appendChild(

        polygon

    );

       /*
     * ------------------------------------------------------------------
     * SCORE NODES
     *
     * 0–3  RED
     * 4–7  ORANGE
     * 8–10 GREEN
     * ------------------------------------------------------------------
     */


    alignmentResult.pillars.forEach(

        function(pillar,index){


            const point =

                scorePoints[index];


            const colour =

                getScoreColour(

                    pillar.score

                );


            /*
             * Glow behind node.
             */


            const glowNode =

                document.createElementNS(

                    svgNS,

                    "circle"

                );


            glowNode.setAttribute(

                "cx",

                point.x

            );


            glowNode.setAttribute(

                "cy",

                point.y

            );


            glowNode.setAttribute(

                "r",

                "15"

            );


            glowNode.setAttribute(

                "fill",

                colour

            );


            glowNode.setAttribute(

                "opacity",

                "0.28"

            );


            glowNode.setAttribute(

                "filter",

                "url(#scoreGlow)"

            );


            svg.appendChild(

                glowNode

            );


            /*
             * Actual node.
             */


            const node =

                document.createElementNS(

                    svgNS,

                    "circle"

                );


            node.setAttribute(

                "cx",

                point.x

            );


            node.setAttribute(

                "cy",

                point.y

            );


            node.setAttribute(

                "r",

                "10"

            );


            node.setAttribute(

                "fill",

                colour

            );


            node.setAttribute(

                "stroke",

                "#F4F0E6"

            );


            node.setAttribute(

                "stroke-width",

                "2"

            );


            svg.appendChild(

                node

            );


        }

    );


    /*
     * ------------------------------------------------------------------
     * PILLAR LABELS
     * ------------------------------------------------------------------
     */


    alignmentResult.pillars.forEach(

        function(pillar,index){


            renderWheelLabel(

                svg,

                pillar,

                index,

                centerX,

                centerY,

                maximumRadius,

                svgNS

            );


        }

    );


    /*
     * ------------------------------------------------------------------
     * CENTRE MARKER
     *
     * Small branded centre only.
     * Not a white circle.
     * ------------------------------------------------------------------
     */


    const centerDot =

        document.createElementNS(

            svgNS,

            "circle"

        );


    centerDot.setAttribute(

        "cx",

        centerX

    );


    centerDot.setAttribute(

        "cy",

        centerY

    );


    centerDot.setAttribute(

        "r",

        "5"

    );


    centerDot.setAttribute(

        "fill",

        SCORE_COLOURS.teal

    );


    svg.appendChild(

        centerDot

    );


    container.appendChild(

        svg

    );


}




/* ==========================================================================
   PILLAR ANGLE

   Pillar 01 starts at 12 o'clock.
   12 pillars × 30° = 360°.
========================================================================== */


function getPillarAngle(index){


    return (

        -90 +

        (

            index *

            (

                360 /

                PAGE04_CONFIG.totalPillars

            )

        )

    );


}




/* ==========================================================================
   POLAR COORDINATE
========================================================================== */


function polarPoint(

    centerX,

    centerY,

    radius,

    angleDegrees

){


    const angleRadians =

        angleDegrees *

        Math.PI /

        180;


    return {


        x:

            centerX +

            (

                radius *

                Math.cos(

                    angleRadians

                )

            ),


        y:

            centerY +

            (

                radius *

                Math.sin(

                    angleRadians

                )

            )


    };


}




/* ==========================================================================
   RENDER WHEEL LABEL
========================================================================== */


function renderWheelLabel(

    svg,

    pillar,

    index,

    centerX,

    centerY,

    maximumRadius,

    svgNS

){


    const angle =

        getPillarAngle(

            index

        );


    const labelRadius =

        maximumRadius + 115;


    const point =

        polarPoint(

            centerX,

            centerY,

            labelRadius,

            angle

        );


    /*
     * Keep side labels visually aligned away from the wheel.
     */


    let anchor =

        "middle";


    const cosine =

        Math.cos(

            angle *

            Math.PI /

            180

        );


    if(cosine > 0.35){


        anchor = "start";


    }
    else if(cosine < -0.35){


        anchor = "end";


    }


    const group =

        document.createElementNS(

            svgNS,

            "g"

        );


    group.setAttribute(

        "class",

        "life-wheel-label"

    );


    /*
     * Number
     */


    const number =

        createSVGText(

            svgNS,

            point.x,

            point.y - 30,

            pillar.number,

            "life-wheel-label-number",

            anchor

        );


    /*
     * English pillar name
     */


    const name =

        createSVGText(

            svgNS,

            point.x,

            point.y,

            pillar.english,

            "life-wheel-label-name",

            anchor

        );


    /*
     * Score
     */


    const score =

        createSVGText(

            svgNS,

            point.x,

            point.y + 32,

            pillar.score + " / 10",

            "life-wheel-label-score",

            anchor

        );


    score.setAttribute(

        "fill",

        getScoreColour(

            pillar.score

        )

    );


    group.appendChild(

        number

    );


    group.appendChild(

        name

    );


    group.appendChild(

        score

    );


    svg.appendChild(

        group

    );


}




/* ==========================================================================
   CREATE SVG TEXT
========================================================================== */


function createSVGText(

    svgNS,

    x,

    y,

    content,

    className,

    anchor

){


    const text =

        document.createElementNS(

            svgNS,

            "text"

        );


    text.setAttribute(

        "x",

        x

    );


    text.setAttribute(

        "y",

        y

    );


    text.setAttribute(

        "text-anchor",

        anchor

    );


    text.setAttribute(

        "class",

        className

    );


    text.setAttribute(

        "fill",

        SCORE_COLOURS.label

    );


    text.textContent =

        content;


    return text;


}




/* ==========================================================================
   GRADIENT STOP
========================================================================== */


function appendGradientStop(

    gradient,

    offset,

    colour

){


    const svgNS =

        "http://www.w3.org/2000/svg";


    const stop =

        document.createElementNS(

            svgNS,

            "stop"

        );


    stop.setAttribute(

        "offset",

        offset

    );


    stop.setAttribute(

        "stop-color",

        colour

    );


    gradient.appendChild(

        stop

    );


}




/* ==========================================================================
   SAVE PAGE04 RESULT
========================================================================== */


function saveAlignmentResult(){


    try{


        sessionStorage.setItem(

            PAGE04_CONFIG.resultStorageKey,

            JSON.stringify(

                alignmentResult

            )

        );


    }
    catch(error){


        console.error(

            "Page04: Unable to save alignment result.",

            error

        );


    }


}




/* ==========================================================================
   BACKEND LIFE ALIGNMENT PERSISTENCE
========================================================================== */


function resolvePeopleId(){


    try{


        if(

            window.CTM_PAGE03 &&

            typeof window.CTM_PAGE03.getPeopleId === "function"

        ){


            const fromPage03 =

                String(

                    window.CTM_PAGE03.getPeopleId() || ""

                ).trim();


            if(fromPage03){


                return fromPage03;


            }


        }


    }
    catch(error){


        console.warn(

            "Page04: Unable to resolve PeopleID from CTM_PAGE03.",

            error

        );


    }


    try{


        if(

            window.Page02Session &&

            typeof window.Page02Session.load === "function"

        ){


            const page02Session =

                window.Page02Session.load();


            if(page02Session){


                const fromPage02 =

                    String(

                        page02Session.peopleId ||

                        page02Session.PeopleID ||

                        page02Session.peopleID ||

                        page02Session.clientId ||

                        page02Session.ClientID ||

                        ""

                    ).trim();


                if(fromPage02){


                    return fromPage02;


                }


            }


        }


    }
    catch(error){


        console.warn(

            "Page04: Unable to resolve PeopleID from Page02Session.",

            error

        );


    }


    const keys = [

        PAGE04_CONFIG.peopleIdStorageKey,

        "peopleId",

        "PeopleID",

        "ctm_client_id"

    ];


    const stores = [

        sessionStorage,

        localStorage

    ];


    for(

        let storeIndex = 0;

        storeIndex < stores.length;

        storeIndex++

    ){


        for(

            let keyIndex = 0;

            keyIndex < keys.length;

            keyIndex++

        ){


            try{


                const value =

                    String(

                        stores[storeIndex].getItem(

                            keys[keyIndex]

                        ) || ""

                    ).trim();


                if(value){


                    return value;


                }


            }
            catch(error){


                console.warn(

                    "Page04: Unable to read PeopleID storage key:",

                    keys[keyIndex],

                    error

                );


            }


        }


    }


    return "";


}




function buildAlignmentPayload(){


    const peopleId =

        resolvePeopleId();


    if(!peopleId){


        throw new Error(

            "People ID is missing. Please return to Page 02 and complete registration."

        );


    }


    const pillarScores = {};


    PILLARS.forEach(

        function(pillar){


            const score =

                Number(

                    assessmentData[

                        pillar.key

                    ]

                );


            if(

                !Number.isFinite(score) ||

                score < 0 ||

                score > PAGE04_CONFIG.maximumPillarScore

            ){


                throw new Error(

                    "Page04: Invalid score for " +

                    pillar.key +

                    "."

                );


            }


            pillarScores[

                pillar.key

            ] =

                score;


        }

    );


    return {


        peopleId:

            peopleId,


        pillarScores:

            pillarScores


    };


}




function getAlignmentApi(){


    if(

        window.CTM &&

        window.CTM.API &&

        typeof window.CTM.API.getAlignment === "function"

    ){


        return window.CTM.API;


    }


    if(

        window.ApiService &&

        typeof window.ApiService.getAlignment === "function"

    ){


        return window.ApiService;


    }


    if(

        window.CTM_API &&

        typeof window.CTM_API.getAlignment === "function"

    ){


        return window.CTM_API;


    }


    throw new Error(

        "CTM PATH™ API service is unavailable."

    );


}

 function extractAlignmentError(response){


    if(!response){


        return "Life Alignment save returned no response.";


    }


    const candidates = [

        response.message,

        response.error,

        response.details,

        response.data && response.data.message,

        response.data && response.data.error,

        response.data && response.data.details

    ];


    for(

        let i = 0;

        i < candidates.length;

        i++

    ){


        const candidate =

            candidates[i];


        if(

            typeof candidate === "string" &&

            candidate.trim()

        ){


            return candidate.trim();


        }


        if(

            candidate &&

            typeof candidate === "object"

        ){


            if(

                typeof candidate.message === "string" &&

                candidate.message.trim()

            ){


                return candidate.message.trim();


            }


            if(

                typeof candidate.error === "string" &&

                candidate.error.trim()

            ){


                return candidate.error.trim();


            }


        }


    }


    try{


        return JSON.stringify(response);


    }
    catch(error){


        return String(response);


    }


}




function validateAlignmentResponse(response){


    if(

        response === undefined ||

        response === null

    ){


        throw new Error(

            "Life Alignment save returned no response."

        );


    }


    if(

        response === false ||

        (

            typeof response === "object" &&

            response.success === false

        ) ||

        (

            typeof response === "object" &&

            response.ok === false

        )

    ){


        console.error(

            "CTM PATH™ Page04 backend rejection — RAW RESPONSE:",

            response

        );


        throw new Error(

            extractAlignmentError(

                response

            )

        );


    }


    let value =

        response;


    let depth =

        0;


    while(

        value &&

        typeof value === "object" &&

        Object.prototype.hasOwnProperty.call(

            value,

            "data"

        ) &&

        value.data !== undefined &&

        value.data !== null &&

        depth < 4

    ){


        value =

            value.data;


        depth++;


    }


    return value;


}




function setAlignmentSubmitState(

    button,

    saving

){


    if(!button){


        return;


    }


    button.disabled =

        Boolean(saving);


    button.setAttribute(

        "aria-busy",

        saving

            ? "true"

            : "false"

    );


}




async function persistAlignmentAndContinue(

    button

){


    if(isSubmittingAlignment){


        return;


    }


    try{


        isSubmittingAlignment =

            true;


        setAlignmentSubmitState(

            button,

            true

        );


        saveAlignmentResult();


        const payload =

            buildAlignmentPayload();


        const api =

            getAlignmentApi();


        console.log(

            "Page04: Persisting canonical Life Alignment.",

            {

                peopleId:

                    payload.peopleId,

                pillarCount:

                    Object.keys(

                        payload.pillarScores

                    ).length

            }

        );


        const rawResponse =

            await api.getAlignment(

                payload

            );


        console.log(

            "CTM PATH™ Page04 RAW getAlignment response:",

            rawResponse

        );


        const backendAlignment =

            validateAlignmentResponse(

                rawResponse

            );


        console.log(

            "Page04: Life Alignment persisted successfully.",

            backendAlignment

        );


        window.location.href =

            PAGE04_CONFIG.nextPage;


    }
    catch(error){


        console.error(

            "CTM PATH™ Page04 Life Alignment persistence failed:",

            error

        );


        window.alert(

            error && error.message

                ? error.message

                : "Unable to save your Life Alignment. Please try again."

        );


        isSubmittingAlignment =

            false;


        setAlignmentSubmitState(

            button,

            false

        );


    }


}




/* ==========================================================================
   NAVIGATION
========================================================================== */


function bindNavigation(){


    const diagnosisButton =

        document.getElementById(

            "personal-diagnosis-button"

        );


    if(diagnosisButton){


        diagnosisButton.addEventListener(

            "click",

            function(){


                persistAlignmentAndContinue(

                    diagnosisButton

                );


            }

        );


    }


}




/* ==========================================================================
   SET TEXT
========================================================================== */


function setText(

    elementId,

    value

){


    const element =

        document.getElementById(

            elementId

        );


    if(!element){


        return;


    }


    element.textContent =

        value;


}




/* ==========================================================================
   ESCAPE HTML
========================================================================== */


function escapeHTML(value){


    return String(value)

        .replace(

            /&/g,

            "&amp;"

        )

        .replace(

            /</g,

            "&lt;"

        )

        .replace(

            />/g,

            "&gt;"

        )

        .replace(

            /"/g,

            "&quot;"

        )

        .replace(

            /'/g,

            "&#039;"

        );


}




/* ==========================================================================
   PUBLIC PAGE MODULE
========================================================================== */


window.CTM_PAGE04 = {


    init:

        initPage04,


    getAssessmentData:

        function(){


            return assessmentData;


        },


    getAlignmentResult:

        function(){


            return alignmentResult;


        },


    redrawWheel:

        function(){


            renderLifeWheel();


        }


};


})();

