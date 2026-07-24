
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : prescription.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   PURPOSE
   --------------------------------------------------------------------------
   Prescription™ Behaviour Engine

   Owns

   ✓ Prescription Generation
   ✓ Daily Practice Rendering
   ✓ Weekly Practice Rendering
   ✓ Monthly Plan Rendering
   ✓ Priority Spoke Rendering
   ✓ Commitment Rendering
   ✓ Navigation

   Owns NO

   ✗ Assessment Logic
   ✗ Diagnosis Logic
   ✗ Storage Implementation
   ✗ API Implementation

   ========================================================================== */

"use strict";


/* ==========================================================================
   PRESCRIPTION CONTROLLER
   ========================================================================== */

const PrescriptionPage = (() => {


    /* ======================================================================
       STATE
       ====================================================================== */

    let visitor = null;

    let assessment = null;

    let diagnosis = null;

    let prescription = {};


    /* ======================================================================
       DOM REFERENCES
       ====================================================================== */

    let currentScore;

    let focusArea;

    let actionCount;

    let journeyStatus;

    let dailyPractices;

    let weeklyPractices;

    let monthlyPlan;

    let prioritySpokes;

    let commitmentText;

    let continueButton;

    let backButton;



    /* ======================================================================
       INITIALISE
       ====================================================================== */

    function init(){

        cacheDom();

        loadState();

        generatePrescription();

        renderPrescription();

        bindEvents();


        console.info(

            "Prescription Engine Ready."

        );

    }



    /* ======================================================================
       CACHE DOM
       ====================================================================== */

    function cacheDom(){

        currentScore =

            document.getElementById(

                "currentScore"

            );


        focusArea =

            document.getElementById(

                "focusArea"

            );


        actionCount =

            document.getElementById(

                "actionCount"

            );


        journeyStatus =

            document.getElementById(

                "journeyStatus"

            );


        dailyPractices =

            document.getElementById(

                "dailyPractices"

            );


        weeklyPractices =

            document.getElementById(

                "weeklyPractices"

            );


        monthlyPlan =

            document.getElementById(

                "monthlyPlan"

            );


        prioritySpokes =

            document.getElementById(

                "prioritySpokes"

            );


        commitmentText =

            document.getElementById(

                "commitmentText"

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


        diagnosis =

            assessment.diagnosis || {};

    }



    /* ======================================================================
       Continue in Batch 2/n
       ====================================================================== */

})();


/* ==========================================================================
   PRESCRIPTION GENERATION ENGINE
   ========================================================================== */

function generatePrescription(){

    const weakest =

        diagnosis.weakest || [];


    prescription = {

        score :

            assessment.overallPercentage || 0,


        focus :

            weakest.length

                ? weakest[

                    weakest.length - 1

                  ]

                : null,


        daily :

            generateDailyPractices(

                weakest

            ),


        weekly :

            generateWeeklyPractices(

                weakest

            ),


        monthly :

            generateMonthlyPlan(

                weakest

            ),


        priorities :

            weakest,


        commitment :

            generateCommitment()

    };


    assessment.prescription =

        prescription;


    App.setAssessment(

        assessment

    );

}


/* ==========================================================================
   DAILY PRACTICES
   ========================================================================== */

function generateDailyPractices(

    priorityAreas

){

    const practices = [];


    priorityAreas.forEach(

        ([pillar]) => {


            practices.push({

                title :

                    "Daily Practice: " +

                    prettifyKey(

                        pillar

                    ),


                description :

                    "Spend intentional time each day strengthening your " +

                    prettifyKey(

                        pillar

                    ) +

                    " through small consistent actions."

            });


        }

    );


    return practices.slice(

        0,

        3

    );

}


/* ==========================================================================
   WEEKLY PRACTICES
   ========================================================================== */

function generateWeeklyPractices(

    priorityAreas

){

    const practices = [];


    priorityAreas.forEach(

        ([pillar]) => {


            practices.push({

                title :

                    "Weekly Reflection: " +

                    prettifyKey(

                        pillar

                    ),


                description :

                    "Review your progress and identify one improvement action for your " +

                    prettifyKey(

                        pillar

                    ) +

                    "."

            });


        }

    );


    return practices.slice(

        0,

        3

    );

}


/* ==========================================================================
   MONTHLY PLAN
   ========================================================================== */

function generateMonthlyPlan(

    priorityAreas

){

    return priorityAreas.map(

        ([pillar]) => ({


            title :

                "Monthly Growth Focus: " +

                prettifyKey(

                    pillar

                ),


            description :

                "Create a measurable improvement goal and track your progress."

        })

    );

}


/* ==========================================================================
   COMMITMENT
   ========================================================================== */

function generateCommitment(){

    return `

    I commit to becoming the best version of myself

    by taking consistent action,

    strengthening my Kala Chakra™

    and creating a meaningful life.

    `;

}


/* ==========================================================================
   Continue in Batch 3/n
   ========================================================================== */


/* ==========================================================================
   RENDER ENGINE
   ========================================================================== */

function renderPrescription(){

    renderSummary();

    renderDailyPractices();

    renderWeeklyPractices();

    renderMonthlyPlan();

    renderPrioritySpokes();

    renderCommitment();

}


/* ==========================================================================
   SUMMARY RENDERER
   ========================================================================== */

function renderSummary(){

    currentScore.textContent =

        prescription.score +

        "%";


    if(

        prescription.focus

    ){

        focusArea.textContent =

            prettifyKey(

                prescription.focus[0]

            );

    }


    actionCount.textContent =

        (

            prescription.daily.length +

            prescription.weekly.length +

            prescription.monthly.length

        );


    journeyStatus.textContent =

        "Transformation Ready";

}


/* ==========================================================================
   DAILY PRACTICES RENDERER
   ========================================================================== */

function renderDailyPractices(){

    dailyPractices.innerHTML = "";


    prescription.daily.forEach(

        practice => {


            dailyPractices.appendChild(

                createPracticeItem(

                    practice

                )

            );


        }

    );

}


/* ==========================================================================
   WEEKLY PRACTICES RENDERER
   ========================================================================== */

function renderWeeklyPractices(){

    weeklyPractices.innerHTML = "";


    prescription.weekly.forEach(

        practice => {


            weeklyPractices.appendChild(

                createPracticeItem(

                    practice

                )

            );


        }

    );

}


/* ==========================================================================
   MONTHLY PLAN RENDERER
   ========================================================================== */

function renderMonthlyPlan(){

    monthlyPlan.innerHTML = "";


    prescription.monthly.forEach(

        plan => {


            monthlyPlan.appendChild(

                createPracticeItem(

                    plan

                )

            );


        }

    );

}


/* ==========================================================================
   GENERIC PRACTICE CARD
   ========================================================================== */

function createPracticeItem(

    item

){

    const card =

        document.createElement(

            "div"

        );


    card.className =

        "practice-item";


    card.innerHTML =

    `

        <h4>

            ${item.title}

        </h4>


        <p>

            ${item.description}

        </p>

    `;


    return card;

}


/* ==========================================================================
   Continue in Batch 4/n
   ========================================================================== */


/* ==========================================================================
   PRIORITY SPOKES RENDERER
   ========================================================================== */

function renderPrioritySpokes(){

    prioritySpokes.innerHTML = "";


    prescription.priorities.forEach(

        ([pillar,score]) => {


            const card =

                document.createElement(

                    "div"

                );


            card.className =

                "priority-item";


            card.innerHTML =

            `

                <div class="priority-title">

                    ${prettifyKey(pillar)}

                </div>


                <div>

                    Current Score:

                    ${score}%

                </div>

            `;


            prioritySpokes.appendChild(

                card

            );


        }

    );

}


/* ==========================================================================
   COMMITMENT RENDERER
   ========================================================================== */

function renderCommitment(){

    commitmentText.textContent =

        prescription.commitment;

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

        completeJourney

    );

}


/* ==========================================================================
   BACK TO DIAGNOSIS
   ========================================================================== */

function goBack(){

    Router.navigate(

        "diagnosis"

    );

}


/* ==========================================================================
   COMPLETE JOURNEY
   ========================================================================== */

async function completeJourney(){

    try{


        await savePrescription();


        Router.navigate(

            "completion"

        );


    }

    catch(error){


        handlePrescriptionError(

            error,

            "Unable to complete journey."

        );


    }

}


/* ==========================================================================
   SAVE PRESCRIPTION
   ========================================================================== */

async function savePrescription(){


    assessment.prescriptionGenerated =

        true;


    assessment.prescriptionGeneratedAt =

        new Date().toISOString();


    App.setAssessment(

        assessment

    );


    Storage.saveAssessment(

        assessment

    );


    await ApiService.safeRequest(

        () =>

            ApiService.savePrescription(

                visitor.visitorId,

                prescription

            )

    );


}


/* ==========================================================================
   Continue in Batch 5/n
   ========================================================================== */


/* ==========================================================================
   VALIDATION ENGINE
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

        !diagnosis

    ){

        Router.navigate(

            "diagnosis"

        );

        return false;

    }


    return true;

}


/* ==========================================================================
   RECOVERY ENGINE
   ========================================================================== */

function recoverPrescription(){

    try{


        loadState();


        generatePrescription();


        renderPrescription();



    }

    catch(error){


        handlePrescriptionError(

            error,

            "Unable to recover Prescription™."

        );


    }

}


/* ==========================================================================
   ERROR HANDLER
   ========================================================================== */

function handlePrescriptionError(

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
   WINDOW STATE EVENTS
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
   PUBLIC CONTROLLER API
   ========================================================================== */

return {

    init,

    renderPrescription,

    generatePrescription,

    recoverPrescription

};


})();



/* ==========================================================================
   APPLICATION BOOTSTRAP
   ========================================================================== */

document.addEventListener(

    "DOMContentLoaded",

    bootstrapPrescription

);



function bootstrapPrescription(){


    try{


        if(

            !validateRepository()

        ){


            throw new Error(

                "Assessment Repository unavailable."

            );


        }


        PrescriptionPage.init();



    }

    catch(error){


        console.error(

            error

        );


        alert(

            "Unable to initialise Prescription™."

        );


    }


}


/* ==========================================================================
   DEVELOPMENT EXPORTS
   ========================================================================== */

window.PrescriptionPage =

    PrescriptionPage;



const PrescriptionDebug = Object.freeze({

    visitor : () =>

        visitor,


    assessment : () =>

        assessment,


    diagnosis : () =>

        diagnosis,


    prescription : () =>

        prescription


});


window.PrescriptionDebug =

    PrescriptionDebug;


/* ==========================================================================
   ENGINE GUARANTEES

   ✓ Converts Diagnosis™ into Action Plan

   ✓ Generates Daily Practices™

   ✓ Generates Weekly Practices™

   ✓ Generates Monthly Plan™

   ✓ Displays Priority Spokes™

   ✓ Stores Prescription State

   ✓ Preserves Visitor Journey

   ✓ Supports Recovery

   ✓ Hands off to Completion™

   ✓ No Assessment Logic

   ✓ No Diagnosis Logic

   ✓ No API Ownership

   ========================================================================== */


/* ==========================================================================
   FINAL LOCK

   File

       prescription.js


   Version

       1.0


   Status

       🔒 LOCKED


   Module

       Prescription™ Behaviour Engine


   Dependencies

       app.js

       storage.js

       api.js

       router.js


   ========================================================================== */


