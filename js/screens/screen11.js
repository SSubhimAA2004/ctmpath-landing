
/*======================================================================

CTM PATH™ Guided Journey v7.0

SCREEN 11 — YOUR FINANCIAL REALITY™

File:
screen11.js

Purpose:
Financial Reality Index™

Responsibility:

• Initialise Screen 11
• Personalise visitor
• Register rating controls
• Track Financial Reality answers
• Calculate Financial Reality Index™

======================================================================*/


/*==================================================
Global State
==================================================*/

const financialReality = {

    answers : {},

    totalScore : 0,

    completed : false

};


/*==================================================
Screen Initialisation
==================================================*/

function initialiseScreen11(){

    loadVisitorName();

    initialiseQuestions();

    initialiseNavigator();

}


/*==================================================
Visitor Personalisation

Uses Screen 05 visitor name

==================================================*/

function loadVisitorName(){

    const visitorName =

        localStorage.getItem("visitorName") ||

        "Friend";

    document

        .querySelectorAll(".visitor-name")

        .forEach(el=>{

            el.textContent = visitorName;

        });

    document

        .querySelectorAll(".visitor-name-inline")

        .forEach(el=>{

            el.textContent = visitorName;

        });

    document

        .querySelectorAll(".visitor-name-inline-en")

        .forEach(el=>{

            el.textContent = visitorName;

        });

}


/*==================================================
Register Questions
==================================================*/

function initialiseQuestions(){

    const scales =

        document.querySelectorAll(

            ".rating-scale"

        );

    scales.forEach(scale=>{

        registerRatingScale(scale);

    });

}


/*==================================================
Register One Rating Scale
==================================================*/

function registerRatingScale(scale){

    const questionId =

        parseInt(

            scale.dataset.question

        );

    const buttons =

        scale.querySelectorAll(

            ".rating-btn"

        );

    buttons.forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                selectRating(

                    questionId,

                    scale,

                    button

                );

            }

        );

    });

}


/*==================================================
Navigator

Disabled until completion

==================================================*/

function initialiseNavigator(){

    document

        .getElementById(

            "screen11-next"

        )

        .disabled = true;

}


/*==================================================
Auto Initialise

==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initialiseScreen11

);

/*==================================================
Select Rating

==================================================*/

function selectRating(

    questionId,

    scale,

    button

){

    const value =

        parseInt(

            button.dataset.value

        );

    financialReality.answers[

        questionId

    ] = value;

    updateRatingColours(

        scale,

        value

    );

    revealNextQuestion(

        questionId

    );

    checkCompletion();

}


/*==================================================
Update Rating Colours

==================================================*/

function updateRatingColours(

    scale,

    value

){

    const buttons =

        scale.querySelectorAll(

            ".rating-btn"

        );

    buttons.forEach(btn=>{

        btn.classList.remove(

            "rating-red",

            "rating-orange",

            "rating-green",

            "selected"

        );

    });

    buttons.forEach(btn=>{

        const number =

            parseInt(

                btn.dataset.value

            );

        if(number<=value){

            if(value<=3){

                btn.classList.add(

                    "rating-red"

                );

            }

            else if(value<=7){

                btn.classList.add(

                    "rating-orange"

                );

            }

            else{

                btn.classList.add(

                    "rating-green"

                );

            }

        }

    });

    buttons[value-1]

        .classList

        .add(

            "selected"

        );

}


/*==================================================
Reveal Next Question

==================================================*/

function revealNextQuestion(

    questionId

){

    const nextQuestion =

        document.querySelector(

            '[data-question="'+

            (questionId+1)+

            '"]'

        );

    if(!nextQuestion){

        return;

    }

    nextQuestion

        .classList

        .remove(

            "hidden"

        );

    setTimeout(()=>{

        nextQuestion

            .scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

    },250);

}


/*==================================================
Check Completion

==================================================*/

function checkCompletion(){

    const totalAnswered =

        Object.keys(

            financialReality.answers

        ).length;

    if(totalAnswered===10){

        financialReality.completed =

            true;

        beginAnalysis();

    }

}

/*==================================================
Begin Financial Analysis

==================================================*/

function beginAnalysis(){

    calculateFinancialRealityScore();

    showAnalysisPanel();

}


/*==================================================
Calculate Total Score

==================================================*/

function calculateFinancialRealityScore(){

    let total = 0;

    Object.values(

        financialReality.answers

    ).forEach(score=>{

        total += score;

    });

    financialReality.totalScore = total;

}


/*==================================================
Show Analysis

==================================================*/

function showAnalysisPanel(){

    const analysis =

        document.getElementById(

            "fri-analysis"

        );

    analysis.classList.remove(

        "hidden"

    );

    analysis.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

    playAnalysisAnimation();

}


/*==================================================
Premium Analysis Animation

==================================================*/

function playAnalysisAnimation(){

    const items =

        document.querySelectorAll(

            ".analysis-item"

        );

    items.forEach(item=>{

        item.classList.remove(

            "completed"

        );

    });

    let index = 0;

    const timer =

        setInterval(()=>{

            if(index < items.length){

                items[index]

                    .classList

                    .add(

                        "completed"

                    );

                index++;

            }

            else{

                clearInterval(timer);

                setTimeout(

                    revealFinancialReality,

                    700

                );

            }

        },300);

}


/*==================================================
Reveal Financial Reality

==================================================*/

function revealFinancialReality(){

    document

        .getElementById(

            "fri-analysis"

        )

        .classList

        .add(

            "hidden"

        );

    const result =

        document.getElementById(

            "fri-result"

        );

    result.classList.remove(

        "hidden"

    );

    animateFinancialScore();

}

/*==================================================
Animate Financial Reality Score

==================================================*/

function animateFinancialScore(){

    const scoreElement =

        document.getElementById(

            "fri-score-value"

        );

    const circle =

        document.getElementById(

            "fri-score-circle"

        );

    const status =

        document.getElementById(

            "fri-score-status"

        );

    const message =

        document.getElementById(

            "fri-score-message"

        );

    let current = 0;

    const target =

        financialReality.totalScore;

    const animation =

        setInterval(()=>{

            current++;

            scoreElement.textContent = current;

            if(current>=target){

                clearInterval(animation);

                showFinancialInsight();

            }

        },18);

}


/*==================================================
Generate Personal Insight

==================================================*/

function showFinancialInsight(){

    const score =

        financialReality.totalScore;

    const visitorName =

        localStorage.getItem(

            "visitorName"

        ) || "Friend";

    const circle =

        document.getElementById(

            "fri-score-circle"

        );

    const status =

        document.getElementById(

            "fri-score-status"

        );

    const message =

        document.getElementById(

            "fri-score-message"

        );

    circle.classList.remove(

        "score-red",

        "score-orange",

        "score-green"

    );

    if(score<=39){

        circle.classList.add(

            "score-red"

        );

        status.textContent =

            "Financial Reality Needs Attention";

        message.innerHTML =

            visitorName +

            ", every great transformation begins with awareness.<br><br>Your Financial MRI™ will help identify where your greatest opportunities lie.";

    }

    else if(score<=79){

        circle.classList.add(

            "score-orange"

        );

        status.textContent =

            "Building A Strong Foundation";

        message.innerHTML =

            visitorName +

            ", you have already built several healthy financial habits.<br><br>Let's discover how to strengthen the foundations even further.";

    }

    else{

        circle.classList.add(

            "score-green"

        );

        status.textContent =

            "Strong Financial Foundation";

        message.innerHTML =

            visitorName +

            ", you have created an excellent financial foundation.<br><br>Your Financial MRI™ will now reveal your greatest growth opportunities.";

    }

    enableNavigator();

}


/*==================================================
Enable Navigator

==================================================*/

function enableNavigator(){

    const next =

        document.getElementById(

            "screen11-next"

        );

    next.disabled = false;

    next.classList.add(

        "pulse"

    );

    next.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}

/*==================================================
Save Financial Reality

==================================================*/

function saveFinancialReality(){

    const data = {

        answers : financialReality.answers,

        totalScore : financialReality.totalScore,

        completed : true,

        completedAt : new Date().toISOString()

    };

    localStorage.setItem(

        "financialReality",

        JSON.stringify(data)

    );

}


/*==================================================
Get Financial Reality

==================================================*/

function getFinancialReality(){

    const saved =

        localStorage.getItem(

            "financialReality"

        );

    if(!saved){

        return null;

    }

    return JSON.parse(saved);

}


/*==================================================
Navigator Click

==================================================*/

function registerNavigator(){

    const button =

        document.getElementById(

            "screen11-next"

        );

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        continueJourney

    );

}


/*==================================================
Continue Journey

==================================================*/

function continueJourney(){

    saveFinancialReality();

    transitionToScreen12();

}


/*==================================================
Transition

==================================================*/

function transitionToScreen12(){

    const current =

        document.getElementById(

            "screen11"

        );

    current.classList.add(

        "screen-exit"

    );

    setTimeout(()=>{

        if(typeof showScreen==="function"){

            showScreen("screen12");

        }

        else if(typeof navigateToScreen==="function"){

            navigateToScreen("screen12");

        }

        else{

            location.hash="screen12";

        }

    },600);

}


/*==================================================
Restore Previous Session

==================================================*/

function restoreFinancialReality(){

    const saved =

        getFinancialReality();

    if(!saved){

        return;

    }

    financialReality.answers =

        saved.answers || {};

    financialReality.totalScore =

        saved.totalScore || 0;

}


/*==================================================
Update Initialiser

==================================================*/

const originalInitialise =

    initialiseScreen11;

initialiseScreen11 = function(){

    originalInitialise();

    restoreFinancialReality();

    registerNavigator();

};

/*==================================================
Update Progress

==================================================*/

function updateProgress(){

    const answered =

        Object.keys(

            financialReality.answers

        ).length;

    const progressText =

        document.getElementById(

            "question-progress"

        );

    const progressBar =

        document.getElementById(

            "question-progress-bar"

        );

    if(progressText){

        progressText.innerHTML =

            answered +

            " / 10";

    }

    if(progressBar){

        progressBar.style.width =

            (answered*10)+"%";

    }

}


/*==================================================
Recalculate Total

Always recalculates from answers

==================================================*/

function recalculateScore(){

    financialReality.totalScore =

        0;

    Object.values(

        financialReality.answers

    ).forEach(value=>{

        financialReality.totalScore += value;

    });

}


/*==================================================
Updated Completion Check

==================================================*/

function checkCompletion(){

    updateProgress();

    recalculateScore();

    const answered =

        Object.keys(

            financialReality.answers

        ).length;

    if(answered!==10){

        return;

    }

    if(financialReality.completed){

        return;

    }

    financialReality.completed = true;

    beginAnalysis();

}


/*==================================================
Reset Analysis

If Visitor Changes Answer

==================================================*/

function resetFinancialReality(){

    financialReality.completed = false;

    const analysis =

        document.getElementById(

            "fri-analysis"

        );

    const result =

        document.getElementById(

            "fri-result"

        );

    if(analysis){

        analysis.classList.add(

            "hidden"

        );

    }

    if(result){

        result.classList.add(

            "hidden"

        );

    }

    const next =

        document.getElementById(

            "screen11-next"

        );

    if(next){

        next.disabled = true;

        next.classList.remove(

            "pulse"

        );

    }

}


/*==================================================
Visitor Changes Rating

==================================================*/

document

.querySelectorAll(

".rating-btn"

)

.forEach(button=>{

button.addEventListener(

"click",

()=>{

resetFinancialReality();

}

);

});


/*==================================================
Reveal Question

==================================================*/

function revealQuestion(

number

){

const question =

document.querySelector(

'[data-question="'+

number+

'"]'

);

if(!question){

return;

}

question.classList.remove(

"hidden"

);

question.classList.add(

"fade-up"

);

}


/*==================================================
Hide Questions

==================================================*/

function hideFutureQuestions(){

for(

let i=2;

i<=10;

i++

){

const card =

document.querySelector(

'[data-question="'+

i+

'"]'

);

if(card){

card.classList.add(

"hidden"

);

}

}

}


/*==================================================
Production Initialise

==================================================*/

function initialiseScreen11Production(){

hideFutureQuestions();

revealQuestion(1);

updateProgress();

}


/*==================================================
Merge Initialisation

==================================================*/

const previousInitialiser =

initialiseScreen11;

initialiseScreen11 = function(){

previousInitialiser();

initialiseScreen11Production();

};


/*==================================================
End Of Screen 11

Production Version

==================================================*/
