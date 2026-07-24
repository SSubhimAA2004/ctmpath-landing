
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : kaalachakra.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   PURPOSE
   --------------------------------------------------------------------------
   Kala Chakra™ Behaviour Engine

   Owns

   ✓ Wheel Rendering
   ✓ Summary Rendering
   ✓ Overall Score
   ✓ Strongest / Weakest Spokes
   ✓ Reflection
   ✓ Navigation

   Owns NO

   ✗ Assessment Questions
   ✗ Assessment Behaviour
   ✗ Diagnosis Logic
   ✗ Prescription Logic
   ✗ Storage Implementation
   ✗ API Implementation

   ========================================================================== */

"use strict";

/* ==========================================================================
   KALA CHAKRA CONTROLLER
   ========================================================================== */

const KalaChakraPage = (() => {

    /* ======================================================================
       STATE
       ====================================================================== */

    let visitor = null;

    let assessment = null;

    let percentages = {};

    /* ======================================================================
       DOM
       ====================================================================== */

    let canvas;

    let context;

    let overallScore;

    let wheelBalance;

    let strongestSpoke;

    let weakestSpoke;

    let reflectionText;

    let insightsPanel;

    let continueButton;

    let backButton;

    /* ======================================================================
       INITIALISE
       ====================================================================== */

    function init(){

        cacheDom();

        loadState();

        calculateSummary();

        renderWheel();

        renderSummary();

        renderReflection();

        bindEvents();

        console.info(

            "Kala Chakra Ready."

        );

    }

    /* ======================================================================
       CACHE DOM
       ====================================================================== */

    function cacheDom(){

        canvas =

            document.getElementById(

                "kaalachakraCanvas"

            );

        context =

            canvas.getContext(

                "2d"

            );

        overallScore =

            document.getElementById(

                "overallScore"

            );

        wheelBalance =

            document.getElementById(

                "wheelBalance"

            );

        strongestSpoke =

            document.getElementById(

                "strongestSpoke"

            );

        weakestSpoke =

            document.getElementById(

                "weakestSpoke"

            );

        reflectionText =

            document.getElementById(

                "reflectionText"

            );

        insightsPanel =

            document.getElementById(

                "lifeInsights"

            );

        continueButton =

            document.getElementById(

                "continueButton"

            );

        backButton =

            document.getElementById(

                "backButton"

            );

    }

    /* ======================================================================
       LOAD STATE
       ====================================================================== */

    function loadState(){

        visitor =

            App.getVisitor();

        assessment =

            App.getAssessment();

        percentages =

            assessment.percentages || {};

    }

    /* ======================================================================
       Continue in Batch 2/n
       ========================================================================== */


                        /* ==========================================================================
   SUMMARY ENGINE
   ========================================================================== */

let summary = {

    overall : 0,

    strongest : null,

    weakest : null,

    balance : ""

};

/* ==========================================================================
   CALCULATE SUMMARY
   ========================================================================== */

function calculateSummary(){

    const entries =

        Object.entries(

            percentages

        );

    if(

        entries.length === 0

    ){

        return;

    }

    summary.overall =

        assessment.overallPercentage || 0;

    entries.sort(

        (a,b) =>

        b[1] - a[1]

    );

    summary.strongest =

        entries[0];

    summary.weakest =

        entries[entries.length - 1];

    summary.balance =

        determineWheelBalance();

}

/* ==========================================================================
   WHEEL BALANCE
   ========================================================================== */

function determineWheelBalance(){

    if(

        summary.overall >= 80

    ){

        return "Highly Balanced";

    }

    if(

        summary.overall >= 60

    ){

        return "Moderately Balanced";

    }

    if(

        summary.overall >= 40

    ){

        return "Developing";

    }

    return "Needs Attention";

}

/* ==========================================================================
   SUMMARY RENDERER
   ========================================================================== */

function renderSummary(){

    overallScore.textContent =

        summary.overall + "%";

    wheelBalance.textContent =

        summary.balance;

    strongestSpoke.textContent =

        prettifyKey(

            summary.strongest[0]

        );

    weakestSpoke.textContent =

        prettifyKey(

            summary.weakest[0]

        );

}

/* ==========================================================================
   REFLECTION
   ========================================================================== */

function renderReflection(){

    if(

        summary.overall >= 80

    ){

        reflectionText.textContent =

        "Your Kala Chakra™ shows a well-balanced life foundation. Continue strengthening your daily disciplines while expanding your positive contribution.";

        return;

    }

    if(

        summary.overall >= 60

    ){

        reflectionText.textContent =

        "Your life demonstrates encouraging progress. By strengthening your weaker spokes, you can significantly improve overall balance and fulfilment.";

        return;

    }

    if(

        summary.overall >= 40

    ){

        reflectionText.textContent =

        "Several important areas of life need deliberate attention. Focused improvement across a few key spokes can transform your overall life experience.";

        return;

    }

    reflectionText.textContent =

    "Your Kala Chakra™ reveals substantial opportunities for growth. Your personalised Diagnosis™ will identify the highest-priority changes that can create the greatest positive impact.";

}

/* ==========================================================================
   KEY FORMATTER
   ========================================================================== */

function prettifyKey(

    key

){

    return key

        .replace(

            /([A-Z])/g,

            " $1"

        )

        .replace(

            /^./,

            letter =>

                letter.toUpperCase()

        );

}

/* ==========================================================================
   Continue in Batch 3/n
   ========================================================================== */


                        /* ==========================================================================
   WHEEL RENDERING ENGINE
   ========================================================================== */

function renderWheel(){

    clearCanvas();

    drawGrid();

    drawSpokes();

    drawPolygon();

    drawLabels();

}

/* ==========================================================================
   CLEAR CANVAS
   ========================================================================== */

function clearCanvas(){

    context.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

/* ==========================================================================
   DRAW GRID
   ========================================================================== */

function drawGrid(){

    const centreX =

        canvas.width / 2;

    const centreY =

        canvas.height / 2;

    const radius =

        260;

    context.strokeStyle =

        "rgba(255,255,255,.12)";

    context.lineWidth = 1;

    for(

        let ring = 1;

        ring <= 10;

        ring++

    ){

        context.beginPath();

        context.arc(

            centreX,

            centreY,

            radius * ring / 10,

            0,

            Math.PI * 2

        );

        context.stroke();

    }

}

/* ==========================================================================
   DRAW SPOKES
   ========================================================================== */

function drawSpokes(){

    const centreX =

        canvas.width / 2;

    const centreY =

        canvas.height / 2;

    const radius =

        260;

    const pillars =

        Object.keys(

            percentages

        );

    pillars.forEach(

        (_,index)=>{

            const angle =

                (

                    Math.PI * 2 /

                    pillars.length

                ) * index -

                Math.PI / 2;

            const x =

                centreX +

                Math.cos(angle) *

                radius;

            const y =

                centreY +

                Math.sin(angle) *

                radius;

            context.beginPath();

            context.moveTo(

                centreX,

                centreY

            );

            context.lineTo(

                x,

                y

            );

            context.stroke();

        }

    );

}

/* ==========================================================================
   DRAW SCORE POLYGON
   ========================================================================== */

function drawPolygon(){

    const centreX =

        canvas.width / 2;

    const centreY =

        canvas.height / 2;

    const radius =

        260;

    const entries =

        Object.entries(

            percentages

        );

    context.beginPath();

    entries.forEach(

        ([,score],index)=>{

            const angle =

                (

                    Math.PI * 2 /

                    entries.length

                ) * index -

                Math.PI / 2;

            const distance =

                radius *

                (

                    score / 100

                );

            const x =

                centreX +

                Math.cos(angle) *

                distance;

            const y =

                centreY +

                Math.sin(angle) *

                distance;

            if(

                index === 0

            ){

                context.moveTo(

                    x,

                    y

                );

            }

            else{

                context.lineTo(

                    x,

                    y

                );

            }

        }

    );

    context.closePath();

    context.fillStyle =

        "rgba(13,148,136,.30)";

    context.strokeStyle =

        "#0D9488";

    context.lineWidth = 3;

    context.fill();

    context.stroke();

}

/* ==========================================================================
   Continue in Batch 4/n
   ========================================================================== */

                        /* ==========================================================================
   LABEL RENDERING
   ========================================================================== */

function drawLabels(){

    const centreX =

        canvas.width / 2;

    const centreY =

        canvas.height / 2;

    const radius =

        295;

    const pillars =

        Object.entries(

            percentages

        );

    context.fillStyle =

        "#F5F5F5";

    context.font =

        "600 14px Inter";

    context.textAlign =

        "center";

    context.textBaseline =

        "middle";

    pillars.forEach(

        ([key],index)=>{

            const angle =

                (

                    Math.PI * 2 /

                    pillars.length

                ) * index -

                Math.PI / 2;

            const x =

                centreX +

                Math.cos(angle) *

                radius;

            const y =

                centreY +

                Math.sin(angle) *

                radius;

            context.fillText(

                prettifyKey(

                    key

                ),

                x,

                y

            );

        }

    );

}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */

function bindEvents(){

    backButton.addEventListener(

        "click",

        goBack

    );

    continueButton.addEventListener(

        "click",

        continueJourney

    );

}

/* ==========================================================================
   BACK
   ========================================================================== */

function goBack(){

    Router.navigate(

        "assessment"

    );

}

/* ==========================================================================
   CONTINUE
   ========================================================================== */

async function continueJourney(){

    try{

        await autoSaveKalaChakra();

        Router.navigate(

            "diagnosis"

        );

    }

    catch(error){

        handleKalaChakraError(

            error,

            "Unable to continue."

        );

    }

}

/* ==========================================================================
   AUTOSAVE
   ========================================================================== */

async function autoSaveKalaChakra(){

    assessment.wheelGenerated = true;

    assessment.wheelGeneratedAt =

        new Date().toISOString();

    App.setAssessment(

        assessment

    );

    Storage.saveAssessment(

        assessment

    );

    await ApiService.safeRequest(

        () =>

            ApiService.saveKalaChakra(

                visitor.visitorId,

                assessment

            )

    );

}

/* ==========================================================================
   Continue in Batch 5/n
   ========================================================================== */


                        /* ==========================================================================
   VALIDATION
   ========================================================================== */

function validateState(){

    if(

        !visitor

    ){

        Router.navigate(

            "registration"

        );

        return false;

    }

    if(

        !assessment

    ){

        Router.navigate(

            "assessment"

        );

        return false;

    }

    if(

        !assessment.percentages ||

        Object.keys(

            assessment.percentages

        ).length !== 12

    ){

        Router.navigate(

            "assessment"

        );

        return false;

    }

    return true;

}

/* ==========================================================================
   PAGE RECOVERY
   ========================================================================== */

function recoverKalaChakra(){

    try{

        loadState();

        calculateSummary();

        renderWheel();

        renderSummary();

        renderReflection();

    }

    catch(error){

        handleKalaChakraError(

            error,

            "Unable to recover your Kala Chakra™."

        );

    }

}

/* ==========================================================================
   ERROR HANDLER
   ========================================================================== */

function handleKalaChakraError(

    error,

    message

){

    console.error(

        message,

        error

    );

    alert(

        message +

        "\n\nPlease try again."

    );

}

/* ==========================================================================
   WINDOW EVENTS
   ========================================================================== */

window.addEventListener(

    "resize",

    () => {

        renderWheel();

    }

);

window.addEventListener(

    "beforeunload",

    () => {

        Storage.saveAssessment(

            assessment

        );

    }

);

document.addEventListener(

    "visibilitychange",

    () => {

        if(

            document.hidden

        ){

            Storage.saveAssessment(

                assessment

            );

        }

    }

);

/* ==========================================================================
   PUBLIC API
   ========================================================================== */

return{

    init,

    renderWheel,

    renderSummary,

    calculateSummary,

    recoverKalaChakra

};

})();

/* ==========================================================================
   APPLICATION BOOTSTRAP
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    bootstrapKalaChakra

);

function bootstrapKalaChakra(){

    try{

        if(

            !validateRepository()

        ){

            throw new Error(

                "Assessment Repository unavailable."

            );

        }

        KalaChakraPage.init();

    }

    catch(error){

        console.error(

            error

        );

        alert(

            "Unable to initialise Kala Chakra™."

        );

    }

}

/* ==========================================================================
   DEVELOPMENT EXPORTS
   ========================================================================== */

window.KalaChakraPage =

    KalaChakraPage;


/* ==========================================================================
   ENGINE GUARANTEES

   ✓ Draws the 12-spoke Kala Chakra™

   ✓ Uses AssessmentRepository results only

   ✓ Produces proportional life wheel

   ✓ Displays Overall Score

   ✓ Detects Strongest Spoke

   ✓ Detects Weakest Spoke

   ✓ Calculates Wheel Balance

   ✓ Autosaves before navigation

   ✓ Hands off to Diagnosis™

   ✓ No diagnosis logic

   ✓ No prescription logic

   ✓ No assessment logic

   ========================================================================== */


/* ==========================================================================
   FINAL LOCK
   ========================================================================== */

Object.freeze(

    KalaChakraPage

);


/* ==========================================================================
   END OF FILE

   File

       kaalachakra.js

   Version

       1.0

   Status

       🔒 LOCKED

   Module

       Kala Chakra™ Behaviour Engine

   Dependencies

       assessmentData.js

       app.js

       storage.js

       api.js

       router.js

   ========================================================================== */


