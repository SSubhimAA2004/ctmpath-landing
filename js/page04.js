
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   page04.js

   PAGE:
   KALA CHAKRA™ LIFE ALIGNMENT RESULT™

   VERSION:
   1.0

   RESPONSIBILITIES:

   ✓ Read actual Page03 KALA CHAKRA™ scores
   ✓ Validate all 12 Life Pillars
   ✓ Calculate Life Alignment Score™
   ✓ Calculate Life Alignment Percentage
   ✓ Determine Current Life Level™
   ✓ Determine Strongest Pillar™
   ✓ Determine Greatest Growth Opportunity™
   ✓ Generate dynamic 12-spoke KALA CHAKRA™ Life Wheel
   ✓ Render score markers
   ✓ Render dynamic score polygon
   ✓ Render pillar labels
   ✓ Render result insights
   ✓ Render complete 12-pillar breakdown
   ✓ Prepare Page05 transition

   DATA SOURCE:

   sessionStorage:
   CTM_PAGE03_ALIGNMENT

========================================================================== */


(function () {


"use strict";


/* ==========================================================================
   PAGE CONFIGURATION
========================================================================== */


const PAGE04_CONFIG = {

    sourceStorageKey:
        "CTM_PAGE03_ALIGNMENT",

    resultStorageKey:
        "CTM_PAGE04_RESULT",

    nextPage:
        "page05.html",

    previousPage:
        "page03.html",

    totalPillars:
        12,

    maximumPillarScore:
        10,

    maximumTotalScore:
        120,

    wheelSize:
        900,

    wheelCenter:
        450,

    wheelRadius:
        300,

    innerRadius:
        54,

    ringCount:
        5

};


/* ==========================================================================
   KALA CHAKRA™ PILLARS

   IMPORTANT:
   Keys exactly match Page03.js.
========================================================================== */


const PILLARS = [

    {
        key: "Purpose",
        number: "01",
        tamil: "நோக்கம்",
        english: "PURPOSE™",
        icon: "◎"
    },

    {
        key: "Health",
        number: "02",
        tamil: "உடல்நலம்",
        english: "HEALTH™",
        icon: "♥"
    },

    {
        key: "Relationships",
        number: "03",
        tamil: "உறவுகள்",
        english: "RELATIONSHIPS™",
        icon: "●"
    },

    {
        key: "Character & Integrity",
        number: "04",
        tamil: "பண்பும் நேர்மையும்",
        english: "CHARACTER & INTEGRITY™",
        icon: "◆"
    },

    {
        key: "Learning & Mastery",
        number: "05",
        tamil: "கற்றலும் தேர்ச்சியும்",
        english: "LEARNING & MASTERY™",
        icon: "▣"
    },

    {
        key: "Career & Contribution",
        number: "06",
        tamil: "தொழிலும் பங்களிப்பும்",
        english: "CAREER & CONTRIBUTION™",
        icon: "■"
    },

    {
        key: "Financial Freedom",
        number: "07",
        tamil: "பொருளாதார சுதந்திரம்",
        english: "FINANCIAL FREEDOM™",
        icon: "₹"
    },

    {
        key: "Time Freedom",
        number: "08",
        tamil: "நேர சுதந்திரம்",
        english: "TIME FREEDOM™",
        icon: "◷"
    },

    {
        key: "Community & Tribe",
        number: "09",
        tamil: "சமூகமும் உறவுக்குழுவும்",
        english: "COMMUNITY & TRIBE™",
        icon: "◎"
    },

    {
        key: "Systems & Productivity",
        number: "10",
        tamil: "அமைப்புகளும் செயல்திறனும்",
        english: "SYSTEMS & PRODUCTIVITY™",
        icon: "⚙"
    },

    {
        key: "Service & Impact",
        number: "11",
        tamil: "சேவையும் தாக்கமும்",
        english: "SERVICE & IMPACT™",
        icon: "♥"
    },

    {
        key: "Vision & Legacy",
        number: "12",
        tamil: "தொலைநோக்கும் மரபும்",
        english: "VISION & LEGACY™",
        icon: "★"
    }

];


/* ==========================================================================
   COLOUR SYSTEM

   Score meaning remains aligned with Page03:

   0–3  = Needs Focus
   4–7  = Developing
   8–10 = Strong
========================================================================== */


const SCORE_COLOURS = {

    needsFocus:
        "#EF5350",

    developing:
        "#F4A12A",

    strong:
        "#2FB77D",

    teal:
        "#23D4C8",

    gold:
        "#D9A441",

    ivory:
        "#F5F1E8",

    navy:
        "#07182D"

};


/* ==========================================================================
   PAGE STATE
========================================================================== */


let page03Scores = {};

let resultData = null;


/* ==========================================================================
   INITIALIZE PAGE
========================================================================== */


function initPage04() {


    console.log(
        "CTM PATH™ MILLIONAIRES™ Page04 Loaded"
    );


    page03Scores =
        loadPage03Scores();


    if (
        !validateAssessment(
            page03Scores
        )
    ) {

        handleMissingAssessment();

        return;

    }


    resultData =
        buildResult(
            page03Scores
        );


    saveResult(
        resultData
    );


    renderPage04(
        resultData
    );


    bindPage04Navigation();


    console.log(
        "KALA CHAKRA™ Life Alignment Result:",
        resultData
    );


}


/* ==========================================================================
   LOAD PAGE03 SCORES
========================================================================== */


function loadPage03Scores() {


    const raw =
        sessionStorage.getItem(
            PAGE04_CONFIG.sourceStorageKey
        );


    if (!raw) {

        return {};

    }


    try {

        const parsed =
            JSON.parse(raw);


        if (
            !parsed ||
            typeof parsed !== "object"
        ) {

            return {};

        }


        return parsed;

    }
    catch (error) {

        console.error(
            "Unable to read Page03 assessment:",
            error
        );

        return {};

    }


}


/* ==========================================================================
   VALIDATE ASSESSMENT
========================================================================== */


function validateAssessment(scores) {


    if (
        !scores ||
        typeof scores !== "object"
    ) {

        return false;

    }


    return PILLARS.every(

        function (pillar) {


            if (
                !Object.prototype.hasOwnProperty.call(
                    scores,
                    pillar.key
                )
            ) {

                return false;

            }


            const value =
                Number(
                    scores[pillar.key]
                );


            return (
                Number.isFinite(value) &&
                value >= 0 &&
                value <= 10
            );


        }

    );


}


/* ==========================================================================
   HANDLE MISSING / INCOMPLETE PAGE03 DATA
========================================================================== */


function handleMissingAssessment() {


    console.warn(
        "CTM PATH™ Page04: Complete Page03 assessment not found."
    );


    const wheel =
        document.getElementById(
            "kala-chakra-wheel"
        );


    if (wheel) {

        wheel.innerHTML = `

            <div class="page04-data-error">

                <p class="ta">
                    உங்கள் வாழ்க்கை மதிப்பீடு முழுமையாக கிடைக்கவில்லை.
                </p>

                <p class="en">
                    Please complete all 12 areas of your Life Assessment.
                </p>

                <a
                    href="${PAGE04_CONFIG.previousPage}"
                    class="journey-button"
                >
                    ← COMPLETE MY LIFE ASSESSMENT
                </a>

            </div>

        `;

    }


}


/* ==========================================================================
   BUILD COMPLETE RESULT
========================================================================== */


function buildResult(scores) {


    const normalizedScores = {};


    PILLARS.forEach(

        function (pillar) {

            normalizedScores[pillar.key] =
                clampScore(
                    scores[pillar.key]
                );

        }

    );


    const totalScore =
        calculateTotalScore(
            normalizedScores
        );


    const percentage =
        calculatePercentage(
            totalScore
        );


    const strongest =
        findStrongestPillar(
            normalizedScores
        );


    const growth =
        findGrowthOpportunity(
            normalizedScores
        );


    const lifeLevel =
        determineLifeLevel(
            percentage
        );


    return {

        scores:
            normalizedScores,

        totalScore:
            totalScore,

        maximumScore:
            PAGE04_CONFIG.maximumTotalScore,

        percentage:
            percentage,

        strongestPillar:
            strongest,

        growthOpportunity:
            growth,

        lifeLevel:
            lifeLevel,

        generatedAt:
            new Date().toISOString()

    };


}


/* ==========================================================================
   NORMALIZE SCORE
========================================================================== */


function clampScore(value) {


    const number =
        Number(value);


    if (!Number.isFinite(number)) {

        return 0;

    }


    return Math.max(
        0,
        Math.min(
            PAGE04_CONFIG.maximumPillarScore,
            number
        )
    );


}


/* ==========================================================================
   TOTAL SCORE
========================================================================== */


function calculateTotalScore(scores) {


    return PILLARS.reduce(

        function (total, pillar) {

            return (
                total +
                scores[pillar.key]
            );

        },

        0

    );


}


/* ==========================================================================
   PERCENTAGE
========================================================================== */


function calculatePercentage(totalScore) {


    return Math.round(

        (
            totalScore /
            PAGE04_CONFIG.maximumTotalScore
        ) * 100

    );


}


/* ==========================================================================
   STRONGEST PILLAR
========================================================================== */


function findStrongestPillar(scores) {


    let strongest =
        PILLARS[0];


    PILLARS.forEach(

        function (pillar) {

            if (
                scores[pillar.key] >
                scores[strongest.key]
            ) {

                strongest =
                    pillar;

            }

        }

    );


    return {

        ...strongest,

        score:
            scores[strongest.key]

    };


}


/* ==========================================================================
   GREATEST GROWTH OPPORTUNITY
========================================================================== */


function findGrowthOpportunity(scores) {


    let weakest =
        PILLARS[0];


    PILLARS.forEach(

        function (pillar) {

            if (
                scores[pillar.key] <
                scores[weakest.key]
            ) {

                weakest =
                    pillar;

            }

        }

    );


    return {

        ...weakest,

        score:
            scores[weakest.key]

    };


}


/* ==========================================================================
   CURRENT LIFE LEVEL™

   Frontend presentation classification.

   This can later be replaced by the official backend classification
   without changing the wheel architecture.
========================================================================== */


function determineLifeLevel(percentage) {


    if (percentage >= 90) {

        return {

            key:
                "exceptional",

            tamil:
                "அசாதாரண நிலை",

            english:
                "EXCEPTIONAL™"

        };

    }


    if (percentage >= 80) {

        return {

            key:
                "leader",

            tamil:
                "தலைமை நிலை",

            english:
                "LEADER™"

        };

    }


    if (percentage >= 70) {

        return {

            key:
                "builder",

            tamil:
                "உருவாக்கும் நிலை",

            english:
                "BUILDER™"

        };

    }


    if (percentage >= 60) {

        return {

            key:
                "progressing",

            tamil:
                "முன்னேறும் நிலை",

            english:
                "PROGRESSING™"

        };

    }


    if (percentage >= 40) {

        return {

            key:
                "awakening",

            tamil:
                "விழிப்புணர்வு நிலை",

            english:
                "AWAKENING™"

        };

    }


    return {

        key:
            "foundation",

        tamil:
            "அடித்தள நிலை",

        english:
            "FOUNDATION™"

    };


}


/* ==========================================================================
   SAVE PAGE04 RESULT
========================================================================== */


function saveResult(result) {


    sessionStorage.setItem(

        PAGE04_CONFIG.resultStorageKey,

        JSON.stringify(
            result
        )

    );


}


/* ==========================================================================
   RENDER COMPLETE PAGE
========================================================================== */


function renderPage04(result) {


    renderLifeWheel(
        result
    );


    renderAlignmentScore(
        result
    );


    renderLifeLevel(
        result
    );


    renderStrongestPillar(
        result
    );


    renderGrowthOpportunity(
        result
    );


    renderPillarBreakdown(
        result
    );


}


/* ==========================================================================
   SVG HELPERS
========================================================================== */


const SVG_NS =
    "http://www.w3.org/2000/svg";


function createSVGElement(
    tag,
    attributes
) {


    const element =
        document.createElementNS(
            SVG_NS,
            tag
        );


    Object.keys(
        attributes || {}
    ).forEach(

        function (key) {

            element.setAttribute(
                key,
                attributes[key]
            );

        }

    );


    return element;


}


/* ==========================================================================
   POLAR COORDINATES

   Pillar 01 begins at 12 o'clock.
   Remaining pillars move clockwise.
========================================================================== */


function polarPoint(
    index,
    radius
) {


    const angle =
        (
            (index * 360) /
            PAGE04_CONFIG.totalPillars
        ) - 90;


    const radians =
        angle *
        Math.PI /
        180;


    return {

        x:
            PAGE04_CONFIG.wheelCenter +
            radius *
            Math.cos(radians),

        y:
            PAGE04_CONFIG.wheelCenter +
            radius *
            Math.sin(radians),

        angle:
            angle

    };


}


/* ==========================================================================
   SCORE → RADIUS
========================================================================== */


function scoreToRadius(score) {


    const usableRadius =
        PAGE04_CONFIG.wheelRadius -
        PAGE04_CONFIG.innerRadius;


    return (
        PAGE04_CONFIG.innerRadius +
        (
            score /
            PAGE04_CONFIG.maximumPillarScore
        ) *
        usableRadius
    );


}


/* ==========================================================================
   GENERATE KALA CHAKRA™ LIFE WHEEL
========================================================================== */


function renderLifeWheel(result) {


    const host =
        document.getElementById(
            "kala-chakra-wheel"
        );


    if (!host) {

        console.warn(
            "Page04: #kala-chakra-wheel not found."
        );

        return;

    }


    host.innerHTML = "";


    const svg =
        createSVGElement(
            "svg",
            {
                viewBox:
                    "0 0 900 900",

                role:
                    "img",

                "aria-label":
                    "KALA CHAKRA Life Wheel showing twelve life pillar scores",

                class:
                    "kala-chakra-svg"
            }
        );


    /* ----------------------------------------------------------------------
       SVG DEFINITIONS
    ---------------------------------------------------------------------- */


    const defs =
        createSVGElement(
            "defs",
            {}
        );


    const glow =
        createSVGElement(
            "filter",
            {
                id:
                    "wheelGlow",

                x:
                    "-50%",

                y:
                    "-50%",

                width:
                    "200%",

                height:
                    "200%"
            }
        );


    const blur =
        createSVGElement(
            "feGaussianBlur",
            {
                stdDeviation:
                    "8",

                result:
                    "blur"
            }
        );


    const merge =
        createSVGElement(
            "feMerge",
            {}
        );


    const mergeBlur =
        createSVGElement(
            "feMergeNode",
            {
                in:
                    "blur"
            }
        );


    const mergeOriginal =
        createSVGElement(
            "feMergeNode",
            {
                in:
                    "SourceGraphic"
            }
        );


    merge.appendChild(
        mergeBlur
    );


    merge.appendChild(
        mergeOriginal
    );


    glow.appendChild(
        blur
    );


    glow.appendChild(
        merge
    );


    defs.appendChild(
        glow
    );


    const polygonGradient =
        createSVGElement(
            "radialGradient",
            {
                id:
                    "lifePolygonGradient",

                cx:
                    "50%",

                cy:
                    "50%",

                r:
                    "60%"
            }
        );


    [
        {
            offset: "0%",
            colour: "#23D4C8",
            opacity: ".16"
        },
        {
            offset: "60%",
            colour: "#D9A441",
            opacity: ".24"
        },
        {
            offset: "100%",
            colour: "#23D4C8",
            opacity: ".30"
        }
    ].forEach(

        function (stopData) {

            const stop =
                createSVGElement(
                    "stop",
                    {
                        offset:
                            stopData.offset,

                        "stop-color":
                            stopData.colour,

                        "stop-opacity":
                            stopData.opacity
                    }
                );


            polygonGradient.appendChild(
                stop
            );

        }

    );


    defs.appendChild(
        polygonGradient
    );


    svg.appendChild(
        defs
    );


    /* ----------------------------------------------------------------------
       OUTER HALO
    ---------------------------------------------------------------------- */


    const halo =
        createSVGElement(
            "circle",
            {
                cx:
                    PAGE04_CONFIG.wheelCenter,

                cy:
                    PAGE04_CONFIG.wheelCenter,

                r:
                    PAGE04_CONFIG.wheelRadius + 10,

                class:
                    "wheel-outer-halo"
            }
        );


    svg.appendChild(
        halo
    );


    /* ----------------------------------------------------------------------
       CONCENTRIC SCORE RINGS
       2 / 4 / 6 / 8 / 10
    ---------------------------------------------------------------------- */


    const ringScores =
        [2, 4, 6, 8, 10];


    ringScores.forEach(

        function (ringScore) {


            const radius =
                scoreToRadius(
                    ringScore
                );


            const points =
                PILLARS.map(

                    function (_, index) {

                        const point =
                            polarPoint(
                                index,
                                radius
                            );


                        return (
                            point.x +
                            "," +
                            point.y
                        );

                    }

                ).join(" ");


            const ring =
                createSVGElement(
                    "polygon",
                    {
                        points:
                            points,

                        class:
                            (
                                ringScore === 10
                                ? "wheel-ring wheel-ring-outer"
                                : "wheel-ring"
                            )
                    }
                );


            svg.appendChild(
                ring
            );


        }

    );


    /* ----------------------------------------------------------------------
       12 SPOKES
    ---------------------------------------------------------------------- */


    PILLARS.forEach(

        function (_, index) {


            const outer =
                polarPoint(
                    index,
                    PAGE04_CONFIG.wheelRadius
                );


            const spoke =
                createSVGElement(
                    "line",
                    {
                        x1:
                            PAGE04_CONFIG.wheelCenter,

                        y1:
                            PAGE04_CONFIG.wheelCenter,

                        x2:
                            outer.x,

                        y2:
                            outer.y,

                        class:
                            "wheel-spoke"
                    }
                );


            svg.appendChild(
                spoke
            );


        }

    );


    /* ----------------------------------------------------------------------
       SCORE RING LABELS
    ---------------------------------------------------------------------- */


    ringScores.forEach(

        function (score) {


            const radius =
                scoreToRadius(
                    score
                );


            const label =
                createSVGElement(
                    "text",
                    {
                        x:
                            PAGE04_CONFIG.wheelCenter + 10,

                        y:
                            PAGE04_CONFIG.wheelCenter -
                            radius +
                            5,

                        class:
                            "wheel-scale-label"
                    }
                );


            label.textContent =
                score;


            svg.appendChild(
                label
            );


        }

    );


    /* ----------------------------------------------------------------------
       ACTUAL LIFE SHAPE
    ---------------------------------------------------------------------- */


    const actualPoints =
        PILLARS.map(

            function (pillar, index) {


                const score =
                    result.scores[
                        pillar.key
                    ];


                const radius =
                    scoreToRadius(
                        score
                    );


                const point =
                    polarPoint(
                        index,
                        radius
                    );


                return (
                    point.x +
                    "," +
                    point.y
                );


            }

        ).join(" ");


    const lifePolygon =
        createSVGElement(
            "polygon",
            {
                points:
                    actualPoints,

                class:
                    "life-score-polygon",

                fill:
                    "url(#lifePolygonGradient)",

                filter:
                    "url(#wheelGlow)"
            }
        );


    svg.appendChild(
        lifePolygon
    );


    /* ----------------------------------------------------------------------
       ACTUAL SCORE MARKERS
    ---------------------------------------------------------------------- */


    PILLARS.forEach(

        function (pillar, index) {


            const score =
                result.scores[
                    pillar.key
                ];


            const radius =
                scoreToRadius(
                    score
                );


            const point =
                polarPoint(
                    index,
                    radius
                );


            const group =
                createSVGElement(
                    "g",
                    {
                        class:
                            "wheel-score-marker-group"
                    }
                );


            const marker =
                createSVGElement(
                    "circle",
                    {
                        cx:
                            point.x,

                        cy:
                            point.y,

                        r:
                            "11",

                        class:
                            (
                                "wheel-score-marker " +
                                getScoreClass(score)
                            )
                    }
                );


            const title =
                createSVGElement(
                    "title",
                    {}
                );


            title.textContent =
                pillar.key +
                ": " +
                score +
                " / 10";


            marker.appendChild(
                title
            );


            group.appendChild(
                marker
            );


            svg.appendChild(
                group
            );


        }

    );


    /* ----------------------------------------------------------------------
       CENTRAL KALA CHAKRA HUB
    ---------------------------------------------------------------------- */


    const centerOuter =
        createSVGElement(
            "circle",
            {
                cx:
                    PAGE04_CONFIG.wheelCenter,

                cy:
                    PAGE04_CONFIG.wheelCenter,

                r:
                    "58",

                class:
                    "wheel-center-outer"
            }
        );


    svg.appendChild(
        centerOuter
    );


    const centerInner =
        createSVGElement(
            "circle",
            {
                cx:
                    PAGE04_CONFIG.wheelCenter,

                cy:
                    PAGE04_CONFIG.wheelCenter,

                r:
                    "46",

                class:
                    "wheel-center-inner"
            }
        );


    svg.appendChild(
        centerInner
    );


    const centerSymbol =
        createSVGElement(
            "text",
            {
                x:
                    PAGE04_CONFIG.wheelCenter,

                y:
                    PAGE04_CONFIG.wheelCenter + 13,

                class:
                    "wheel-center-symbol",

                "text-anchor":
                    "middle"
            }
        );


    centerSymbol.textContent =
        "✦";


    svg.appendChild(
        centerSymbol
    );


    /* ----------------------------------------------------------------------
       PILLAR LABELS AROUND WHEEL
    ---------------------------------------------------------------------- */


    PILLARS.forEach(

        function (pillar, index) {


            const labelRadius =
                PAGE04_CONFIG.wheelRadius +
                72;


            const point =
                polarPoint(
                    index,
                    labelRadius
                );


            const labelGroup =
                createSVGElement(
                    "g",
                    {
                        class:
                            "wheel-pillar-label"
                    }
                );


            const number =
                createSVGElement(
                    "text",
                    {
                        x:
                            point.x,

                        y:
                            point.y - 16,

                        "text-anchor":
                            "middle",

                        class:
                            "wheel-pillar-number"
                    }
                );


            number.textContent =
                pillar.number;


            const name =
                createSVGElement(
                    "text",
                    {
                        x:
                            point.x,

                        y:
                            point.y + 7,

                        "text-anchor":
                            "middle",

                        class:
                            "wheel-pillar-name"
                    }
                );


            name.textContent =
                pillar.english;


            const score =
                createSVGElement(
                    "text",
                    {
                        x:
                            point.x,

                        y:
                            point.y + 30,

                        "text-anchor":
                            "middle",

                        class:
                            (
                                "wheel-pillar-score " +
                                getScoreClass(
                                    result.scores[
                                        pillar.key
                                    ]
                                )
                            )
                    }
                );


            score.textContent =
                (
                    result.scores[
                        pillar.key
                    ] +
                    " / 10"
                );


            labelGroup.appendChild(
                number
            );


            labelGroup.appendChild(
                name
            );


            labelGroup.appendChild(
                score
            );


            svg.appendChild(
                labelGroup
            );


        }

    );


    host.appendChild(
        svg
    );


}


/* ==========================================================================
   SCORE CLASS
========================================================================== */


function getScoreClass(score) {


    if (score <= 3) {

        return "score-needs-focus";

    }


    if (score <= 7) {

        return "score-developing";

    }


    return "score-strong";


}


/* ==========================================================================
   LIFE ALIGNMENT SCORE
========================================================================== */


function renderAlignmentScore(result) {


    setText(
        "life-alignment-score",
        (
            result.totalScore +
            " / " +
            result.maximumScore
        )
    );


    setText(
        "life-alignment-percentage",
        result.percentage + "%"
    );


}


/* ==========================================================================
   CURRENT LIFE LEVEL
========================================================================== */


function renderLifeLevel(result) {


    setText(
        "life-level-tamil",
        result.lifeLevel.tamil
    );


    setText(
        "life-level-english",
        result.lifeLevel.english
    );


}


/* ==========================================================================
   STRONGEST PILLAR
========================================================================== */


function renderStrongestPillar(result) {


    const strongest =
        result.strongestPillar;


    setText(
        "strongest-pillar-tamil",
        strongest.tamil
    );


    setText(
        "strongest-pillar-english",
        strongest.english
    );


    setText(
        "strongest-pillar-score",
        strongest.score + " / 10"
    );


}


/* ==========================================================================
   GROWTH OPPORTUNITY
========================================================================== */


function renderGrowthOpportunity(result) {


    const growth =
        result.growthOpportunity;


    setText(
        "growth-pillar-tamil",
        growth.tamil
    );


    setText(
        "growth-pillar-english",
        growth.english
    );


    setText(
        "growth-pillar-score",
        growth.score + " / 10"
    );


}


/* ==========================================================================
   COMPLETE 12-PILLAR BREAKDOWN
========================================================================== */


function renderPillarBreakdown(result) {


    const host =
        document.getElementById(
            "pillar-score-list"
        );


    if (!host) {

        return;

    }


    host.innerHTML = "";


    PILLARS.forEach(

        function (pillar) {


            const score =
                result.scores[
                    pillar.key
                ];


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                (
                    "pillar-result-row " +
                    getScoreClass(score)
                );


            const identity =
                document.createElement(
                    "div"
                );


            identity.className =
                "pillar-result-identity";


            const number =
                document.createElement(
                    "span"
                );


            number.className =
                "pillar-result-number";


            number.textContent =
                pillar.number;


            const names =
                document.createElement(
                    "div"
                );


            names.className =
                "pillar-result-names";


            const tamil =
                document.createElement(
                    "div"
                );


            tamil.className =
                "pillar-result-tamil";


            tamil.textContent =
                pillar.tamil;


            const english =
                document.createElement(
                    "div"
                );


            english.className =
                "pillar-result-english";


            english.textContent =
                pillar.english;


            names.appendChild(
                tamil
            );


            names.appendChild(
                english
            );


            identity.appendChild(
                number
            );


            identity.appendChild(
                names
            );


            const value =
                document.createElement(
                    "div"
                );


            value.className =
                "pillar-result-score";


            value.textContent =
                score + " / 10";


            item.appendChild(
                identity
            );


            item.appendChild(
                value
            );


            host.appendChild(
                item
            );


        }

    );


}


/* ==========================================================================
   TEXT HELPER
========================================================================== */


function setText(
    id,
    value
) {


    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    element.textContent =
        value;


}


/* ==========================================================================
   NAVIGATION
========================================================================== */


function bindPage04Navigation() {


    const nextButton =
        document.getElementById(
            "show-diagnosis-button"
        );


    if (nextButton) {

        nextButton.addEventListener(

            "click",

            function () {


                if (!resultData) {

                    return;

                }


                saveResult(
                    resultData
                );


                window.location.href =
                    PAGE04_CONFIG.nextPage;


            }

        );

    }


    const backButton =
        document.getElementById(
            "back-to-assessment-button"
        );


    if (backButton) {

        backButton.addEventListener(

            "click",

            function () {

                window.location.href =
                    PAGE04_CONFIG.previousPage;

            }

        );

    }


}


/* ==========================================================================
   PUBLIC PAGE MODULE
========================================================================== */


window.CTM_PAGE04 = {


    init:
        initPage04,


    getResult:

        function () {

            return resultData;

        },


    getScores:

        function () {

            return (
                resultData
                    ? resultData.scores
                    : {}
            );

        },


    redrawWheel:

        function () {

            if (resultData) {

                renderLifeWheel(
                    resultData
                );

            }

        }


};


/* ==========================================================================
   AUTO INITIALIZATION

   Supports Page04 directly without requiring another page-specific
   bootstrap script.
========================================================================== */


if (
    document.readyState === "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        initPage04

    );

}
else {

    initPage04();

}


/* ==========================================================================
   END OF FILE
========================================================================== */


})();

