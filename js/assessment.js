
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : assessment.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   PURPOSE
   --------------------------------------------------------------------------
   Assessment Behaviour Engine™

   Owns
   ✓ Dynamic Rendering
   ✓ Rating Selection
   ✓ Progress Engine
   ✓ Navigation
   ✓ Calculations
   ✓ Autosave
   ✓ State Updates

   Owns NO
   ✗ Assessment Content
   ✗ HTML Templates
   ✗ CSS
   ✗ API Implementation
   ✗ Storage Implementation

   Engineering Authority
   Product Constitution™
   Design System™
   Engineering Specification™

   ========================================================================== */

'use strict';

/* ==========================================================================
   ASSESSMENT CONTROLLER
   ========================================================================== */

const AssessmentPage = (() => {

    /* ======================================================================
       APPLICATION STATE
       ====================================================================== */

    let currentSpoke = 1;

    let visitor = null;

    let assessment = {};

    let currentPillar = null;

    /* ======================================================================
       DOM REFERENCES
       ====================================================================== */

    let progressStep;

    let progressPercent;

    let progressBar;

    let pillarNumber;

    let pillarTitleTa;

    let pillarTitleEn;

    let introductionTa;

    let introductionEn;

    let reflectionTa;

    let reflectionEn;

    let wisdomTa;

    let wisdomEn;

    let questionsContainer;

    let previousButton;

    let nextButton;

    /* ======================================================================
       INITIALISATION
       ====================================================================== */

    function init() {

        cacheDom();

        loadApplicationState();

        loadCurrentPillar();

        renderCurrentPillar();

        bindEvents();

        updateNavigation();

        updateProgress();

        console.info(

            "Assessment Engine Ready."

        );

    }

    /* ======================================================================
       CACHE DOM
       ====================================================================== */

    function cacheDom() {

        progressStep =

            document.getElementById(

                "progressStep"

            );

        progressPercent =

            document.getElementById(

                "progressPercent"

            );

        progressBar =

            document.getElementById(

                "progressBar"

            );

        pillarNumber =

            document.getElementById(

                "pillarNumber"

            );

        pillarTitleTa =

            document.getElementById(

                "pillarTitleTa"

            );

        pillarTitleEn =

            document.getElementById(

                "pillarTitleEn"

            );

        introductionTa =

            document.getElementById(

                "introductionTa"

            );

        introductionEn =

            document.getElementById(

                "introductionEn"

            );

        reflectionTa =

            document.getElementById(

                "reflectionTa"

            );

        reflectionEn =

            document.getElementById(

                "reflectionEn"

            );

        wisdomTa =

            document.getElementById(

                "wisdomTa"

            );

        wisdomEn =

            document.getElementById(

                "wisdomEn"

            );

        questionsContainer =

            document.getElementById(

                "questionsContainer"

            );

        previousButton =

            document.getElementById(

                "previousButton"

            );

        nextButton =

            document.getElementById(

                "nextButton"

            );

    }

    /* ======================================================================
       LOAD APPLICATION STATE
       ====================================================================== */

    function loadApplicationState() {

        visitor =

            App.getVisitor();

        assessment =

            App.getAssessment() || {};

        currentSpoke =

            assessment.currentSpoke || 1;

    }

    /* ======================================================================
       LOAD CURRENT PILLAR
       ====================================================================== */

    function loadCurrentPillar() {

        currentPillar =

            getPillarBySpoke(

                currentSpoke

            );

    }

    /* ======================================================================
       Continue in Batch 2/n
       ========================================================================== */

                        /* ==========================================================================
   RENDER ENGINE
   ========================================================================== */

function renderCurrentPillar() {

    if (!currentPillar) {

        console.error(

            "Invalid Assessment Pillar."

        );

        return;

    }

    renderProgress();

    renderPillarHeader();

    renderIntroduction();

    renderQuestions();

    renderReflection();

    renderWisdom();

    restoreSelections();

}

/* ==========================================================================
   PROGRESS RENDERER
   ========================================================================== */

function renderProgress() {

    const percentage = Math.round(

        (currentSpoke / AssessmentConstants.TOTAL_PILLARS) * 100

    );

    progressStep.textContent =

        `Spoke ${currentSpoke} of ${AssessmentConstants.TOTAL_PILLARS}`;

    progressPercent.textContent =

        `${percentage}%`;

    progressBar.style.width =

        `${percentage}%`;

}

/* ==========================================================================
   HEADER RENDERER
   ========================================================================== */

function renderPillarHeader() {

    pillarNumber.textContent =

        `SPOKE ${String(currentSpoke).padStart(2,'0')}`;

    pillarTitleTa.textContent =

        currentPillar.tamilTitle;

    pillarTitleEn.textContent =

        currentPillar.englishTitle;

}

/* ==========================================================================
   INTRODUCTION
   ========================================================================== */

function renderIntroduction() {

    introductionTa.textContent =

        currentPillar.introductionTa;

    introductionEn.textContent =

        currentPillar.introductionEn;

}

/* ==========================================================================
   QUESTIONS
   ========================================================================== */

function renderQuestions() {

    questionsContainer.innerHTML = "";

    currentPillar.questions.forEach(

        (question,index) => {

            questionsContainer.appendChild(

                buildQuestionCard(

                    question,

                    index + 1

                )

            );

        }

    );

}

/* ==========================================================================
   QUESTION CARD
   ========================================================================== */

function buildQuestionCard(

    question,

    number

){

    const article =

        document.createElement(

            "article"

        );

    article.className =

        "question-card";

    article.innerHTML =

    `

        <div class="question-number">

            Question ${number}

        </div>

        <h3 class="question-text">

            ${question.tamil}

            <br><br>

            <small>

                ${question.english}

            </small>

        </h3>

        <div

            class="rating-group"

            data-question="${question.id}">

        </div>

    `;

    const ratingGroup =

        article.querySelector(

            ".rating-group"

        );

    createRatingButtons(

        ratingGroup,

        question.id

    );

    return article;

}

/* ==========================================================================
   Continue in Batch 3/n
   ========================================================================== */

/* ==========================================================================
   RATING ENGINE
   ========================================================================== */

function createRatingButtons(

    container,

    questionId

){

    for (

        let rating = AssessmentConstants.MIN_RATING;

        rating <= AssessmentConstants.MAX_RATING;

        rating++

    ){

        const button =

            document.createElement(

                "button"

            );

        button.type =

            "button";

        button.className =

            "rating-button";

        button.textContent =

            rating;

        button.dataset.question =

            questionId;

        button.dataset.rating =

            rating;

        button.addEventListener(

            "click",

            handleRatingSelection

        );

        container.appendChild(

            button

        );

    }

}

/* ==========================================================================
   RATING SELECTION
   ========================================================================== */

function handleRatingSelection(event){

    const button =

        event.currentTarget;

    const questionId =

        Number(

            button.dataset.question

        );

    const rating =

        Number(

            button.dataset.rating

        );

    clearPreviousSelection(

        questionId

    );

    button.classList.add(

        getRatingColour(

            rating

        )

    );

    saveQuestionResponse(

        questionId,

        rating

    );

    updateNavigation();

}

/* ==========================================================================
   CLEAR PREVIOUS SELECTION
   ========================================================================== */

function clearPreviousSelection(

    questionId

){

    document

        .querySelectorAll(

            `[data-question="${questionId}"]`

        )

        .forEach(

            button => {

                button.classList.remove(

                    "active-low",

                    "active-medium",

                    "active-high"

                );

            }

        );

}

/* ==========================================================================
   SAVE RESPONSE
   ========================================================================== */

function saveQuestionResponse(

    questionId,

    rating

){

    if (

        !assessment.responses

    ){

        assessment.responses = {};

    }

    if (

        !assessment.responses[currentSpoke]

    ){

        assessment.responses[currentSpoke] = {};

    }

    assessment.responses

        [currentSpoke]

        [questionId] = rating;

    App.setAssessment(

        assessment

    );

    autoSaveAssessment();

}

/* ==========================================================================
   RESTORE PREVIOUS RESPONSES
   ========================================================================== */

function restoreSelections(){

    if (

        !assessment.responses ||

        !assessment.responses[currentSpoke]

    ){

        return;

    }

    const responses =

        assessment.responses[currentSpoke];

    Object.entries(

        responses

    ).forEach(

        ([questionId,rating]) => {

            const button =

                document.querySelector(

                    `[data-question="${questionId}"][data-rating="${rating}"]`

                );

            if(

                button

            ){

                button.classList.add(

                    getRatingColour(

                        Number(

                            rating

                        )

                    )

                );

            }

        }

    );

}

/* ==========================================================================
   Continue in Batch 4/n
   ========================================================================== */

    /* ==========================================================================
   SCORING ENGINE
   ========================================================================== */

function calculateCurrentPillarScore() {

    const responses =

        assessment.responses?.[currentSpoke];

    if (!responses) {

        return 0;

    }

    let total = 0;

    Object.values(responses).forEach(

        rating => {

            total += Number(rating);

        }

    );

    return total;

}

/* ==========================================================================
   CALCULATE PILLAR PERCENTAGE
   ========================================================================== */

function calculateCurrentPillarPercentage() {

    const score =

        calculateCurrentPillarScore();

    return Math.round(

        (

            score /

            AssessmentConstants.MAXIMUM_SCORE_PER_PILLAR

        ) * 100

    );

}

/* ==========================================================================
   STORE PILLAR RESULT
   ========================================================================== */

function storeCurrentPillarResult() {

    if (

        !assessment.percentages

    ) {

        assessment.percentages = {};

    }

    assessment.percentages[

        currentPillar.key

    ] =

        calculateCurrentPillarPercentage();

    App.setAssessment(

        assessment

    );

}

/* ==========================================================================
   CALCULATE OVERALL SCORE
   ========================================================================== */

function calculateOverallScore() {

    if (

        !assessment.percentages

    ) {

        return 0;

    }

    let total = 0;

    Object.values(

        assessment.percentages

    ).forEach(

        value => {

            total += Number(value);

        }

    );

    assessment.overallPercentage =

        Math.round(

            total /

            AssessmentConstants.TOTAL_PILLARS

        );

    App.setAssessment(

        assessment

    );

    return assessment.overallPercentage;

}

/* ==========================================================================
   CHECK PILLAR COMPLETION
   ========================================================================== */

function isCurrentPillarComplete() {

    const responses =

        assessment.responses?.[currentSpoke];

    if (!responses) {

        return false;

    }

    return (

        Object.keys(

            responses

        ).length ===

        AssessmentConstants.QUESTIONS_PER_PILLAR

    );

}

/* ==========================================================================
   UPDATE NAVIGATION
   ========================================================================== */

function updateNavigation() {

    previousButton.disabled =

        currentSpoke === 1;

    nextButton.disabled =

        !isCurrentPillarComplete();

}

/* ==========================================================================
   Continue in Batch 5/n
   ========================================================================== */

    /* ==========================================================================
   NAVIGATION ENGINE
   ========================================================================== */

function bindEvents() {

    previousButton.addEventListener(

        "click",

        goToPreviousSpoke

    );

    nextButton.addEventListener(

        "click",

        goToNextSpoke

    );

}

/* ==========================================================================
   PREVIOUS
   ========================================================================== */

function goToPreviousSpoke() {

    if (

        currentSpoke <= 1

    ) {

        return;

    }

    currentSpoke--;

    assessment.currentSpoke =

        currentSpoke;

    App.setAssessment(

        assessment

    );

    loadCurrentPillar();

    renderCurrentPillar();

    updateNavigation();

}

/* ==========================================================================
   NEXT
   ========================================================================== */

async function goToNextSpoke() {

    if (

        !isCurrentPillarComplete()

    ) {

        return;

    }

    storeCurrentPillarResult();

    calculateOverallScore();

    await autoSaveAssessment();

    if (

        currentSpoke < AssessmentConstants.TOTAL_PILLARS

    ) {

        currentSpoke++;

        assessment.currentSpoke =

            currentSpoke;

        App.setAssessment(

            assessment

        );

        loadCurrentPillar();

        renderCurrentPillar();

        updateNavigation();

        return;

    }

    completeAssessment();

}

/* ==========================================================================
   AUTOSAVE ENGINE
   ========================================================================== */

async function autoSaveAssessment() {

    try {

        App.setAssessment(

            assessment

        );

        Storage.saveAssessment(

            assessment

        );

        await ApiService.safeRequest(

            () =>

                ApiService.saveAssessment(

                    visitor.visitorId,

                    assessment

                )

        );

    }

    catch (error) {

        console.error(

            "Assessment autosave failed.",

            error

        );

    }

}

/* ==========================================================================
   UPDATE JOURNEY STATUS
   ========================================================================== */

function updateJourneyStatus() {

    App.setJourneyStatus(

        "ASSESSMENT_IN_PROGRESS"

    );

}

/* ==========================================================================
   COMPLETE ASSESSMENT
   ========================================================================== */

function completeAssessment() {

    assessment.completed = true;

    assessment.completedAt =

        new Date().toISOString();

    App.setAssessment(

        assessment

    );

    App.setJourneyStatus(

        "ASSESSMENT_COMPLETED"

    );

    Router.navigate(

        "kaalachakra"

    );

}

/* ==========================================================================
   Continue in Batch 6/n
   ========================================================================== */

    /* ==========================================================================
   PROGRESS ENGINE
   ========================================================================== */

function updateProgress() {

    renderProgress();

    updateJourneyStatus();

}

/* ==========================================================================
   RESUME ENGINE
   ========================================================================== */

function resumeAssessment() {

    if (

        assessment.currentSpoke &&

        isValidSpoke(

            assessment.currentSpoke

        )

    ) {

        currentSpoke =

            assessment.currentSpoke;

    }

    loadCurrentPillar();

    renderCurrentPillar();

    updateNavigation();

}

/* ==========================================================================
   REFRESH UI
   ========================================================================== */

function refreshAssessment() {

    loadCurrentPillar();

    renderCurrentPillar();

    updateNavigation();

    updateProgress();

}

/* ==========================================================================
   ERROR HANDLING
   ========================================================================== */

function handleAssessmentError(

    error,

    message =

        "An unexpected error occurred."

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
   VALIDATION
   ========================================================================== */

function validateCurrentState() {

    if (

        !visitor

    ) {

        Router.navigate(

            "registration"

        );

        return false;

    }

    if (

        !currentPillar

    ) {

        handleAssessmentError(

            null,

            "Assessment data could not be loaded."

        );

        return false;

    }

    return true;

}

/* ==========================================================================
   PAGE RECOVERY
   ========================================================================== */

function recoverAssessment() {

    try {

        assessment =

            App.getAssessment() ||

            {};

        visitor =

            App.getVisitor();

        resumeAssessment();

    }

    catch (error) {

        handleAssessmentError(

            error,

            "Unable to recover your assessment."

        );

    }

}

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

        if (

            document.hidden

        ) {

            Storage.saveAssessment(

                assessment

            );

        }

    }

);

/* ==========================================================================
   PUBLIC API
   ========================================================================== */

return {

    init,

    refreshAssessment,

    resumeAssessment,

    calculateCurrentPillarScore,

    calculateCurrentPillarPercentage,

    calculateOverallScore

};

})();

/* ==========================================================================
   Continue in Batch 7/n
   ========================================================================== */

/* ==========================================================================
   INITIAL PAGE BOOTSTRAP
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    bootstrapAssessment

);

/* ==========================================================================
   APPLICATION BOOTSTRAP
   ========================================================================== */

function bootstrapAssessment() {

    try {

        if (

            !validateRepository()

        ) {

            throw new Error(

                "Assessment Repository validation failed."

            );

        }

        AssessmentPage.init();

    }

    catch (error) {

        console.error(

            error

        );

        alert(

            "Unable to initialise the Assessment Engine."

        );

    }

}

/* ==========================================================================
   DEVELOPMENT HELPERS
   ========================================================================== */

function getCurrentSpoke() {

    return currentSpoke;

}

function getCurrentPillar() {

    return currentPillar;

}

function getAssessmentState() {

    return assessment;

}

function getVisitor() {

    return visitor;

}


/* ==========================================================================
   DEBUGGING
   ========================================================================== */

const AssessmentDebug = Object.freeze({

    currentSpoke : () =>

        currentSpoke,

    currentPillar : () =>

        currentPillar,

    assessment : () =>

        assessment,

    visitor : () =>

        visitor,

    repository : () =>

        AssessmentRepository,

    constants : () =>

        AssessmentConstants

});


/* ==========================================================================
   DEVELOPMENT EXPORTS
   ========================================================================== */

window.AssessmentPage = AssessmentPage;

window.AssessmentDebug = AssessmentDebug;


/* ==========================================================================
   ENGINE GUARANTEES
   ========================================================================== */

/*

This controller guarantees:

✓ Dynamic loading of the 12 spokes

✓ Dynamic loading of all 36 questions

✓ 1–10 Rating Engine

✓ Red / Orange / Green rating colours

✓ Automatic progress calculation

✓ Pillar score calculation

✓ Overall score calculation

✓ Autosave after every answer

✓ Recovery after browser refresh

✓ Previous / Next navigation

✓ Kala Chakra™ hand-off

✓ Separation from assessmentData.js

✓ Separation from Storage Layer

✓ Separation from API Layer

✓ Separation from UI Styling

*/


/* ==========================================================================
   FINAL LOCK
   ========================================================================== */

Object.freeze(

    AssessmentPage

);


/* ==========================================================================
   END OF FILE

   File

       assessment.js

   Version

       1.0

   Status

       🔒 LOCKED

   Module

       Assessment Behaviour Engine™

   Responsibilities

       ✓ Rendering

       ✓ Rating Engine

       ✓ Progress Engine

       ✓ Navigation

       ✓ Scoring

       ✓ Autosave

       ✓ Resume

       ✓ Completion

       ✓ Kala Chakra™ Transfer

   Dependencies

       assessmentData.js

       app.js

       storage.js

       api.js

       router.js

   ========================================================================== */

<!DOCTYPE html>
<html lang="en">

<head>

    <!-- ==========================================================
         CTM PATH™ Guided Journey v2.0
         File    : kaalachakra.html
         Version : 1.0
         Status  : 🔒 LOCKED
         ========================================================== -->

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <meta
        name="description"
        content="CTM PATH™ Kala Chakra">

    <meta
        name="theme-color"
        content="#081C3A">

    <title>

        CTM PATH™ | Kala Chakra™

    </title>

    <!-- ==========================================================
         Fonts
         ========================================================== -->

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com">

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">

    <!-- ==========================================================
         Foundation CSS
         ========================================================== -->

    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/tokens.css">
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/app.css">

    <!-- ==========================================================
         Page CSS
         ========================================================== -->

    <link
        rel="stylesheet"
        href="../css/kaalachakra.css">

</head>

<body>

<div class="app">

<header class="app-header">

    <div class="container">

        <img

            src="../assets/logo/ctm-path-logo.svg"

            alt="CTM PATH"

            class="logo">

    </div>

</header>

<main class="app-main">

<div class="container">

<section class="glass-card kaalachakra-card">

<!-- ==========================================================
     Progress
     ========================================================== -->

<div class="progress">

    <div class="progress-label">

        <span>

            Assessment Complete

        </span>

        <span>

            Kala Chakra™

        </span>

    </div>

    <div class="progress-track">

        <div

            class="progress-fill"

            style="width:100%;">

        </div>

    </div>

</div>

<!-- ==========================================================
     Heading
     ========================================================== -->

<h1 class="page-title">

    உங்கள் காலச்சக்கரம்™

</h1>

<h2 class="page-subtitle">

    Your Kala Chakra™

</h2>

<p class="page-description">

    Your responses from the twelve spokes are now combined to
    create your personal Kala Chakra™.
    A balanced and expansive wheel indicates greater harmony
    across the essential dimensions of a well-lived life.

</p>

<!-- ==========================================================
     Continue in Batch 2/n
     ========================================================== -->

        <!-- ==========================================================
     Kala Chakra™ Wheel
     ========================================================== -->

<section class="wheel-section">

    <div class="wheel-wrapper">

        <canvas

            id="kaalachakraCanvas"

            width="700"

            height="700"

            aria-label="Kala Chakra Wheel">

        </canvas>

    </div>

</section>

<!-- ==========================================================
     Assessment Summary
     ========================================================== -->

<section class="summary-section">

<div class="summary-grid">

<div class="summary-card">

    <span class="summary-label">

        Overall Score

    </span>

    <div

        id="overallScore"

        class="summary-value">

        0%

    </div>

</div>

<div class="summary-card">

    <span class="summary-label">

        Wheel Balance

    </span>

    <div

        id="wheelBalance"

        class="summary-value">

        —

    </div>

</div>

<div class="summary-card">

    <span class="summary-label">

        Strongest Spoke

    </span>

    <div

        id="strongestSpoke"

        class="summary-value">

        —

    </div>

</div>

<div class="summary-card">

    <span class="summary-label">

        Greatest Opportunity

    </span>

    <div

        id="weakestSpoke"

        class="summary-value">

        —

    </div>

</div>

</div>

</section>

<!-- ==========================================================
     Reflection
     ========================================================== -->

<section class="reflection-panel">

    <h3>

        Reflection™

    </h3>

    <p id="reflectionText">

    </p>

</section>

<!-- ==========================================================
     Continue in Batch 3/n
     ========================================================== -->

            <!-- ==========================================================
     Life Insights
     ========================================================== -->

<section class="insights-section">

    <h3 class="section-title">

        Your Life Insights™

    </h3>

    <div
        id="lifeInsights"
        class="glass-panel insights-panel">

        <p>

            Your Kala Chakra™ reveals the current shape of your life.
            The larger and more balanced your wheel becomes,
            the more stable, resilient and fulfilling your life journey
            is likely to be.

        </p>

    </div>

</section>

<!-- ==========================================================
     Next Step
     ========================================================== -->

<section class="wisdom-panel">

    <h3>

        Your Next Step™

    </h3>

    <p>

        Your Kala Chakra™ provides awareness.

        Your personalised Diagnosis™ will help you understand
        the hidden strengths, limiting patterns and priority
        growth opportunities revealed by your assessment.

    </p>

</section>

<!-- ==========================================================
     Navigation
     ========================================================== -->

<div class="navigation">

    <button

        type="button"

        id="backButton"

        class="btn btn-secondary">

        ← Back

    </button>

    <button

        type="button"

        id="continueButton"

        class="btn btn-primary">

        Continue to Diagnosis →

    </button>

</div>

</section>

</div>

</main>

<footer class="app-footer">

    <div class="container">

        <p>

            © 2026 CTM PATH™ Guided Journey™

        </p>

    </div>

</footer>

</div>

<!-- ==========================================================
     Core JavaScript
     ========================================================== -->

<script src="../js/storage.js"></script>

<script src="../js/api.js"></script>

<script src="../js/router.js"></script>

<script src="../js/app.js"></script>

<!-- ==========================================================
     Page Controller
     ========================================================== -->

<script src="../js/kaalachakra.js"></script>

</body>

</html>


                        
