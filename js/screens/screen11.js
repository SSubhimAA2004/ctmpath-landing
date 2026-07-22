
/*==================================================
CTM PATH™
SCREEN 11
Financial Reality Index™

==================================================*/

const financialRealityAnswers = {};

/*==================================================
Initialise
==================================================*/

function initialiseScreen11() {

    document
        .querySelectorAll('.rating-scale')
        .forEach(initialiseRatingScale);

}

/*==================================================
Each Question
==================================================*/

function initialiseRatingScale(scale){

    const question =
        scale.dataset.question;

    const buttons =
        scale.querySelectorAll('.rating-btn');

    buttons.forEach(button=>{

        button.addEventListener('click',()=>{

            const value =
                parseInt(button.dataset.value);

            financialRealityAnswers[question]=value;

            updateQuestionColour(scale,value);

            calculateFinancialReality();

        });

    });

}

/*==================================================
Colour Buttons
==================================================*/

function updateQuestionColour(scale,value){

    const buttons =
        scale.querySelectorAll('.rating-btn');

    buttons.forEach(btn=>{

        btn.classList.remove(
            'rating-red',
            'rating-orange',
            'rating-green',
            'selected'
        );

    });

    buttons.forEach(btn=>{

        const number =
            parseInt(btn.dataset.value);

        if(number<=value){

            if(value<=3){

                btn.classList.add('rating-red');

            }

            else if(value<=7){

                btn.classList.add('rating-orange');

            }

            else{

                btn.classList.add('rating-green');

            }

        }

    });

    buttons[value-1].classList.add('selected');

}

/*==================================================
Calculate Score
==================================================*/

function calculateFinancialReality(){

    if(Object.keys(financialRealityAnswers).length<10){

        return;

    }

    let total=0;

    Object.values(financialRealityAnswers)
        .forEach(score=>{

            total+=score;

        });

    showFinancialReality(total);

}

/*==================================================
Show Result
==================================================*/

function showFinancialReality(score){

    const result =
        document.getElementById('fri-result');

    const scoreBox =
        document.getElementById('fri-score');

    const tamil =
        document.getElementById('fri-status-ta');

    const english =
        document.getElementById('fri-status-en');

    scoreBox.innerHTML=score+" / 100";

    scoreBox.classList.remove(
        'score-red',
        'score-orange',
        'score-green'
    );

    if(score<=39){

        scoreBox.classList.add('score-red');

        tamil.innerHTML=
        "உங்கள் நிதி அடித்தளம் பலப்பட வேண்டியுள்ளது.";

        english.innerHTML=
        "Your financial foundation needs immediate attention.";

    }

    else if(score<=79){

        scoreBox.classList.add('score-orange');

        tamil.innerHTML=
        "நல்ல முன்னேற்றம் உள்ளது. இன்னும் பல வாய்ப்புகள் காத்திருக்கின்றன.";

        english.innerHTML=
        "You are building a stronger financial foundation.";

    }

    else{

        scoreBox.classList.add('score-green');

        tamil.innerHTML=
        "அருமை! நீங்கள் வலுவான நிதி அடித்தளத்தை உருவாக்கியுள்ளீர்கள்.";

        english.innerHTML=
        "Excellent! You have built a strong financial foundation.";

    }

    result.style.display='block';

    result.scrollIntoView({

        behavior:'smooth',

        block:'center'

    });

    document
        .getElementById('screen11-next')
        .disabled=false;

}

/*==================================================
Auto Initialise
==================================================*/

document.addEventListener(

    'DOMContentLoaded',

    initialiseScreen11

);

