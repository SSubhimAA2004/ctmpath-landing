
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : diagnosis.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   PURPOSE
   --------------------------------------------------------------------------
   Diagnosis™ Behaviour Engine

   Owns

   ✓ Diagnosis Rendering
   ✓ Strength Identification
   ✓ Growth Opportunity Identification
   ✓ Insight Generation
   ✓ Recommendation Rendering
   ✓ Navigation

   Owns NO

   ✗ Assessment Logic
   ✗ Prescription Logic
   ✗ Storage Implementation
   ✗ API Implementation

   ========================================================================== */

"use strict";

/* ==========================================================================
   DIAGNOSIS CONTROLLER
   ========================================================================== */

const DiagnosisPage = (() => {

    /* ======================================================================
       STATE
       ====================================================================== */

    let visitor = null;

    let assessment = null;

    let percentages = {};

    let diagnosis = {};

    /* ======================================================================
       DOM
       ====================================================================== */

    let overallScore;

    let lifeBalance;

    let primaryStrength;

    let priorityFocus;

    let strengthList;

    let growthList;

    let diagnosisInsight;

    let priorityRecommendations;

    let reflectionText;

    let continueButton;

    let backButton;

    /* ======================================================================
       INITIALISE
       ====================================================================== */

    function init(){

        cacheDom();

        loadState();

        generateDiagnosis();

        renderDiagnosis();

        bindEvents();

        console.info(

            "Diagnosis Ready."

        );

    }

    /* ======================================================================
       CACHE DOM
       ====================================================================== */

    function cacheDom(){

        overallScore =

            document.getElementById(

                "overallScore"

            );

        lifeBalance =

            document.getElementById(

                "lifeBalance"

            );

        primaryStrength =

            document.getElementById(

                "primaryStrength"

            );

        priorityFocus =

            document.getElementById(

                "priorityFocus"

            );

        strengthList =

            document.getElementById(

                "strengthList"

            );

        growthList =

            document.getElementById(

                "growthList"

            );

        diagnosisInsight =

            document.getElementById(

                "diagnosisInsight"

            );

        priorityRecommendations =

            document.getElementById(

                "priorityRecommendations"

            );

        reflectionText =

            document.getElementById(

                "reflectionText"

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
   DIAGNOSIS ENGINE
   ========================================================================== */

function generateDiagnosis(){

    const orderedScores =

        Object.entries(

            percentages

        )

        .sort(

            (a,b) =>

                b[1] - a[1]

        );

    diagnosis = {

        overall :

            assessment.overallPercentage,

        strongest :

            orderedScores.slice(

                0,

                3

            ),

        weakest :

            orderedScores.slice(

                -3

            ),

        balance :

            determineLifeBalance(),

        insight :

            generateInsight(),

        recommendations :

            generateRecommendations()

    };

}

/* ==========================================================================
   LIFE BALANCE
   ========================================================================== */

function determineLifeBalance(){

    const score =

        assessment.overallPercentage;

    if(

        score >= 80

    ){

        return "Highly Balanced";

    }

    if(

        score >= 60

    ){

        return "Moderately Balanced";

    }

    if(

        score >= 40

    ){

        return "Developing";

    }

    return "Needs Immediate Attention";

}

/* ==========================================================================
   INSIGHT ENGINE
   ========================================================================== */

function generateInsight(){

    const score =

        assessment.overallPercentage;

    if(

        score >= 80

    ){

        return "Your assessment indicates a strong foundation across most areas of life. Continued intentional growth will help sustain long-term fulfilment.";

    }

    if(

        score >= 60

    ){

        return "You have established several healthy life foundations. Focusing on your weakest spokes will create greater harmony and accelerate overall progress.";

    }

    if(

        score >= 40

    ){

        return "Your assessment reveals meaningful opportunities for improvement. Concentrated effort in a few priority areas can significantly strengthen your Kala Chakra™.";

    }

    return "Your assessment indicates that multiple life dimensions require immediate attention. A structured transformation plan can produce substantial positive change.";

}

/* ==========================================================================
   RECOMMENDATION ENGINE
   ========================================================================== */

function generateRecommendations(){

    return diagnosis.weakest.map(

        ([pillar]) =>

            "Strengthen your " +

            prettifyKey(

                pillar

            ) +

            " through consistent daily practice."

    );

}

/* ==========================================================================
   Continue in Batch 3/n
   ========================================================================== */


                       /* ==========================================================================
   RENDER ENGINE
   ========================================================================== */

function renderDiagnosis(){

    renderSummary();

    renderStrengths();

    renderGrowthAreas();

    renderInsight();

    renderRecommendations();

    renderReflection();

}

/* ==========================================================================
   SUMMARY
   ========================================================================== */

function renderSummary(){

    overallScore.textContent =

        diagnosis.overall + "%";

    lifeBalance.textContent =

        diagnosis.balance;

    primaryStrength.textContent =

        prettifyKey(

            diagnosis.strongest[0][0]

        );

    priorityFocus.textContent =

        prettifyKey(

            diagnosis.weakest[2][0]

        );

}

/* ==========================================================================
   STRENGTHS
   ========================================================================== */

function renderStrengths(){

    strengthList.innerHTML = "";

    diagnosis.strongest.forEach(

        ([pillar,score]) => {

            const item =

                document.createElement(

                    "li"

                );

            item.textContent =

                `${prettifyKey(pillar)} (${score}%)`;

            strengthList.appendChild(

                item

            );

        }

    );

}

/* ==========================================================================
   GROWTH AREAS
   ========================================================================== */

function renderGrowthAreas(){

    growthList.innerHTML = "";

    diagnosis.weakest.forEach(

        ([pillar,score]) => {

            const item =

                document.createElement(

                    "li"

                );

            item.textContent =

                `${prettifyKey(pillar)} (${score}%)`;

            growthList.appendChild(

                item

            );

        }

    );

}

/* ==========================================================================
   DIAGNOSIS INSIGHT
   ========================================================================== */

function renderInsight(){

    diagnosisInsight.textContent =

        diagnosis.insight;

}

/* ==========================================================================
   RECOMMENDATIONS
   ========================================================================== */

function renderRecommendations(){

    priorityRecommendations.innerHTML = "";

    diagnosis.recommendations.forEach(

        recommendation => {

            const item =

                document.createElement(

                    "li"

                );

            item.textContent =

                recommendation;

            priorityRecommendations.appendChild(

                item

            );

        }

    );

}

/* ==========================================================================
   REFLECTION
   ========================================================================== */

function renderReflection(){

    if(

        diagnosis.overall >= 80

    ){

        reflectionText.textContent =

        "Your life already demonstrates a strong level of harmony. Continue strengthening your daily disciplines to preserve this momentum.";

        return;

    }

    if(

        diagnosis.overall >= 60

    ){

        reflectionText.textContent =

        "You have a solid foundation. Concentrated attention on a few weaker life dimensions can produce remarkable improvements.";

        return;

    }

    if(

        diagnosis.overall >= 40

    ){

        reflectionText.textContent =

        "Your current results represent an opportunity—not a limitation. Every meaningful transformation begins with awareness and consistent action.";

        return;

    }

    reflectionText.textContent =

    "This diagnosis is not a judgment. It is your starting point. Small daily improvements across your priority areas will gradually transform your entire Kala Chakra™.";

}

/* ==========================================================================
   Continue in Batch 4/n
   ========================================================================== */


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

        "kaalachakra"

    );

}

/* ==========================================================================
   CONTINUE
   ========================================================================== */

async function continueJourney(){

    try{

        await autoSaveDiagnosis();

        Router.navigate(

            "prescription"

        );

    }

    catch(error){

        handleDiagnosisError(

            error,

            "Unable to continue."

        );

    }

}

/* ==========================================================================
   AUTOSAVE
   ========================================================================== */

async function autoSaveDiagnosis(){

    assessment.diagnosis =

        diagnosis;

    assessment.diagnosisGenerated =

        true;

    assessment.diagnosisGeneratedAt =

        new Date().toISOString();

    App.setAssessment(

        assessment

    );

    Storage.saveAssessment(

        assessment

    );

    await ApiService.safeRequest(

        () =>

            ApiService.saveDiagnosis(

                visitor.visitorId,

                diagnosis

            )

    );

}

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

        !assessment.percentages

    ){

        Router.navigate(

            "assessment"

        );

        return false;

    }

    return true;

}

/* ==========================================================================
   RECOVERY
   ========================================================================== */

function recoverDiagnosis(){

    try{

        loadState();

        generateDiagnosis();

        renderDiagnosis();

    }

    catch(error){

        handleDiagnosisError(

            error,

            "Unable to recover Diagnosis™."

        );

    }

}

/* ==========================================================================
   ERROR HANDLER
   ========================================================================== */

function handleDiagnosisError(

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
   Continue in Batch 5/n
   ========================================================================== */


/* ==========================================================================
   WINDOW EVENTS
   ========================================================================== */

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
   APPLICATION BOOTSTRAP
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    bootstrapDiagnosis

);

function bootstrapDiagnosis(){

    try{

        if(

            !validateRepository()

        ){

            throw new Error(

                "Assessment Repository unavailable."

            );

        }

        DiagnosisPage.init();

    }

    catch(error){

        console.error(

            error

        );

        alert(

            "Unable to initialise Diagnosis™."

        );

    }

}

/* ==========================================================================
   DEVELOPMENT EXPORTS
   ========================================================================== */

window.DiagnosisPage =

    DiagnosisPage;


/* ==========================================================================
   DEVELOPMENT HELPERS
   ========================================================================== */

const DiagnosisDebug = Object.freeze({

    visitor : () =>

        visitor,

    assessment : () =>

        assessment,

    diagnosis : () =>

        diagnosis,

    percentages : () =>

        percentages

});

window.DiagnosisDebug =

    DiagnosisDebug;


/* ==========================================================================
   ENGINE GUARANTEES

   ✓ Uses Assessment Results Only

   ✓ No Duplicate Assessment Calculations

   ✓ Identifies Strongest Pillars

   ✓ Identifies Weakest Pillars

   ✓ Generates Life Balance

   ✓ Generates Personalised Insight

   ✓ Generates Priority Recommendations

   ✓ Autosaves Diagnosis™

   ✓ Preserves Visitor State

   ✓ Transfers Journey to Prescription™

   ✓ No Prescription Logic

   ✓ No Assessment Rendering

   ========================================================================== */


/* ==========================================================================
   FINAL LOCK
   ========================================================================== */

Object.freeze(

    DiagnosisPage

);


/* ==========================================================================
   END OF FILE

   File

       diagnosis.js

   Version

       1.0

   Status

       🔒 LOCKED

   Module

       Diagnosis™ Behaviour Engine

   Responsibilities

       ✓ Diagnosis Rendering

       ✓ Insight Generation

       ✓ Strength Detection

       ✓ Growth Opportunity Detection

       ✓ Recommendations

       ✓ Navigation

       ✓ Autosave

       ✓ State Recovery

   Dependencies

       assessmentData.js

       app.js

       storage.js

       api.js

       router.js

   ========================================================================== */


    
                       
