
/*======================================================================

CTM PATH™ Guided Journey v8.0

SCREEN 11 — YOUR FINANCIAL REALITY™

File:
screen11.js

Purpose

Financial Reality Index™

Responsibility

• Personalise visitor
• Render questions
• Capture ratings
• Calculate score
• Display Financial Reality Index™
• Navigate to Screen 12

======================================================================*/

'use strict';



/*==================================================
Question Bank

Financial Reality™

==================================================*/

const FINANCIAL_REALITY_QUESTIONS = [

{

id:1,

ta:"உங்கள் நிதி வாழ்க்கையின் மீது உங்களுக்கு எவ்வளவு கட்டுப்பாடு உள்ளது?",

en:"How much control do you have over your financial life?"

},

{

id:2,

ta:"ஒவ்வொரு மாதமும் நீங்கள் சேமிக்க முடிகிறதா?",

en:"How consistently are you able to save money every month?"

},

{

id:3,

ta:"எதிர்பாராத செலவுகளை சமாளிக்க நீங்கள் தயாராக இருக்கிறீர்களா?",

en:"How prepared are you for unexpected financial emergencies?"

},

{

id:4,

ta:"உங்கள் கடன்கள் உங்கள் மன அமைதியை எவ்வளவு பாதிக்கின்றன?",

en:"How much do your debts affect your peace of mind?"

},

{

id:5,

ta:"உங்கள் வருமானம் உங்கள் குடும்ப தேவைகளை பூர்த்தி செய்கிறதா?",

en:"How confidently does your income meet your family's needs?"

},

{

id:6,

ta:"உங்கள் எதிர்கால நிதி வாழ்க்கை குறித்து உங்களுக்கு எவ்வளவு நம்பிக்கை உள்ளது?",

en:"How confident are you about your financial future?"

},

{

id:7,

ta:"உங்கள் வருமானத்தை அதிகரிக்க தெளிவான திட்டம் உள்ளதா?",

en:"Do you have a clear plan to increase your income?"

},

{

id:8,

ta:"உங்கள் பணத்தை புத்திசாலித்தனமாக முதலீடு செய்வதில் நம்பிக்கை உள்ளதா?",

en:"How confident are you in making wise investment decisions?"

},

{

id:9,

ta:"உங்கள் வாழ்க்கை நிதி சுதந்திரத்தை நோக்கி நகருகிறதா?",

en:"Is your life moving towards financial freedom?"

},

{

id:10,

ta:"இன்று உங்கள் நிதி வாழ்க்கைக்கு நீங்கள் என்ன மதிப்பெண் வழங்குவீர்கள்?",

en:"Overall, how would you rate your financial reality today?"

}

];



/*==================================================
Screen State

==================================================*/

let currentQuestion = 0;

let answers = [];

let visitorName = "Friend";



/*==================================================
Initialisation

==================================================*/

document.addEventListener(

'DOMContentLoaded',

initialiseScreen11

);



function initialiseScreen11(){

loadVisitor();

renderQuestion();

bindButtons();

}

/*==================================================
Load Visitor

==================================================*/

function loadVisitor(){

    visitorName =

        localStorage.getItem(

            "ctmVisitorName"

        ) ||

        "Friend";

    document

        .querySelectorAll(

            ".visitor-name"

        )

        .forEach(function(element){

            element.textContent =

                visitorName;

        });

    document

        .querySelectorAll(

            ".visitor-name-inline"

        )

        .forEach(function(element){

            element.textContent =

                visitorName;

        });

}



/*==================================================
Render Current Question

==================================================*/

function renderQuestion(){

    const question =

        FINANCIAL_REALITY_QUESTIONS[

            currentQuestion

        ];

    document.getElementById(

        "question-number"

    ).textContent =

        String(

            question.id

        ).padStart(

            2,

            "0"

        );

    document.getElementById(

        "question-ta"

    ).textContent =

        question.ta;

    document.getElementById(

        "question-en"

    ).textContent =

        question.en;

    updateProgress();

    resetRatingButtons();

}



/*==================================================
Reflection Progress

==================================================*/

function updateProgress(){

    document.getElementById(

        "reflection-number"

    ).textContent =

        currentQuestion + 1;

    const percentage =

        (

            (currentQuestion + 1)

            /

            FINANCIAL_REALITY_QUESTIONS.length

        ) * 100;

    document.getElementById(

        "progress-fill"

    ).style.width =

        percentage + "%";

}



/*==================================================
Reset Rating Buttons

==================================================*/

function resetRatingButtons(){

    document

        .querySelectorAll(

            ".rating-btn"

        )

        .forEach(function(button){

            button.classList.remove(

                "selected",

                "red",

                "orange",

                "green"

            );

        });

}



/*==================================================
Bind Rating Buttons

==================================================*/

function bindButtons(){

    document

        .querySelectorAll(

            ".rating-btn"

        )

        .forEach(function(button){

            button.addEventListener(

                "click",

                function(){

                    selectRating(

                        Number(

                            this.dataset.value

                        )

                    );

                }

            );

        });

}

/*==================================================
Select Rating

==================================================*/

function selectRating(score){

    highlightRating(score);

    answers[currentQuestion] = score;

    setTimeout(

        nextQuestion,

        350

    );

}



/*==================================================
Highlight Rating

==================================================*/

function highlightRating(score){

    const buttons =

        document.querySelectorAll(

            ".rating-btn"

        );

    buttons.forEach(function(button){

        button.classList.remove(

            "selected",

            "red",

            "orange",

            "green"

        );

        const value =

            Number(

                button.dataset.value

            );

        if(value > score){

            return;

        }

        button.classList.add(

            "selected"

        );

        if(score <= 3){

            button.classList.add(

                "red"

            );

        }

        else if(score <= 7){

            button.classList.add(

                "orange"

            );

        }

        else{

            button.classList.add(

                "green"

            );

        }

    });

}



/*==================================================
Next Question

==================================================*/

function nextQuestion(){

    currentQuestion++;

    if(

        currentQuestion >=

        FINANCIAL_REALITY_QUESTIONS.length

    ){

        finishAssessment();

        return;

    }

    animateQuestion();

}



/*==================================================
Question Transition

==================================================*/

function animateQuestion(){

    const card =

        document.getElementById(

            "question-card"

        );

    card.classList.remove(

        "fade-in"

    );

    void card.offsetWidth;

    card.classList.add(

        "fade-in"

    );

    renderQuestion();

}



/*==================================================
Finish Assessment

==================================================*/

function finishAssessment(){

    document

        .getElementById(

            "question-card"

        )

        .classList.add(

            "hidden"

        );

    document

        .getElementById(

            "analysis-panel"

        )

        .classList.remove(

            "hidden"

        );

    runAnalysis();

}



/*==================================================
Calculate Total Score

==================================================*/

function calculateScore(){

    return answers.reduce(

        function(total,value){

            return total + value;

        },

        0

    );

}

/*==================================================
Run Premium Analysis

==================================================*/

function runAnalysis(){

    const items =

        document.querySelectorAll(

            ".analysis-item"

        );

    let step = 0;

    const timer =

        setInterval(function(){

            if(step > 0){

                items[step-1]

                    .classList

                    .add(

                        "completed"

                    );

            }

            step++;

            if(

                step >

                items.length

            ){

                clearInterval(timer);

                setTimeout(

                    showFinancialReality,

                    600

                );

            }

        },700);

}



/*==================================================
Show Financial Reality Index™

==================================================*/

function showFinancialReality(){

    document

        .getElementById(

            "analysis-panel"

        )

        .classList.add(

            "hidden"

        );

    document

        .getElementById(

            "result-panel"

        )

        .classList.remove(

            "hidden"

        );

    animateScore();

}



/*==================================================
Animated Score

==================================================*/

function animateScore(){

    const target =

        calculateScore();

    const scoreValue =

        document.getElementById(

            "score-value"

        );

    let current = 0;

    const timer =

        setInterval(function(){

            current++;

            scoreValue.textContent =

                current;

            if(

                current >= target

            ){

                clearInterval(timer);

                showFinancialInsight(

                    target

                );

            }

        },20);

}



/*==================================================
Financial Insight

==================================================*/

function showFinancialInsight(score){

    const circle =

        document.getElementById(

            "score-circle"

        );

    const status =

        document.getElementById(

            "score-status"

        );

    const message =

        document.getElementById(

            "score-message"

        );

    circle.classList.remove(

        "red",

        "orange",

        "green"

    );



    /*==========================================
    RED
    ==========================================*/

    if(score <= 30){

        circle.classList.add(

            "red"

        );

        status.textContent =

            "Financial Reality Needs Attention";

        message.innerHTML =

            "<strong>" +

            visitorName +

            "</strong>,<br><br>" +

            "Your present financial situation " +

            "requires immediate attention." +

            "<br><br>" +

            "Every great financial journey " +

            "begins with honest awareness.";

    }



    /*==========================================
    ORANGE
    ==========================================*/

    else if(score <= 70){

        circle.classList.add(

            "orange"

        );

        status.textContent =

            "A Good Financial Foundation";

        message.innerHTML =

            "<strong>" +

            visitorName +

            "</strong>,<br><br>" +

            "You have already developed " +

            "many healthy financial habits." +

            "<br><br>" +

            "Your Financial MRI™ " +

            "will reveal where your next " +

            "breakthrough lies.";

    }



    /*==========================================
    GREEN
    ==========================================*/

    else{

        circle.classList.add(

            "green"

        );

        status.textContent =

            "Strong Financial Foundation";

        message.innerHTML =

            "<strong>" +

            visitorName +

            "</strong>,<br><br>" +

            "You have built " +

            "a strong financial foundation." +

            "<br><br>" +

            "Let's discover how " +

            "to transform stability " +

            "into lasting abundance.";

    }

    showReflectionSummary();

}

/*==================================================
Show Reflection Summary

==================================================*/

function showReflectionSummary(){

    const summary =

        document.getElementById(

            "reflection-summary"

        );

    if(summary){

        summary.classList.remove(

            "hidden"

        );

        summary.classList.add(

            "fade-in"

        );

    }

    enableNavigator();

}



/*==================================================
Enable Premium Navigator

==================================================*/

function enableNavigator(){

    const nextButton =

        document.getElementById(

            "screen11-next"

        );

    if(!nextButton){

        return;

    }

    nextButton.disabled = false;

    nextButton.classList.add(

        "pulse"

    );

    nextButton.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}



/*==================================================
Navigator

==================================================*/

document

    .getElementById(

        "screen11-next"

    )

    .addEventListener(

        "click",

        function(){

            if(this.disabled){

                return;

            }

            /*
            Save Screen 11 Result

            Available for
            Screen 12 onwards.
            */

            localStorage.setItem(

                "financialRealityScore",

                calculateScore()

            );

            localStorage.setItem(

                "financialRealityAnswers",

                JSON.stringify(

                    answers

                )

            );

            /*
            Navigate
            */

            if(

                typeof navigateToScreen ===

                "function"

            ){

                navigateToScreen(

                    "screen12"

                );

                return;

            }

            if(

                window.CTM &&

                typeof CTM.navigate ===

                "function"

            ){

                CTM.navigate(

                    "screen12"

                );

                return;

            }

            window.location.hash =

                "#screen12";

        }

    );



/*==================================================
Utility

Restart Assessment

==================================================*/

function restartAssessment(){

    currentQuestion = 0;

    answers = [];

    document

        .getElementById(

            "analysis-panel"

        )

        .classList.add(

            "hidden"

        );

    document

        .getElementById(

            "result-panel"

        )

        .classList.add(

            "hidden"

        );

    document

        .getElementById(

            "reflection-summary"

        )

        .classList.add(

            "hidden"

        );

    document

        .getElementById(

            "question-card"

        )

        .classList.remove(

            "hidden"

        );

    renderQuestion();

}



/*==================================================
Console

==================================================*/

console.log(

    "CTM PATH™",

    "Screen 11 Ready"

);

/*======================================================================

END OF FILE

screen11.js

======================================================================*/
