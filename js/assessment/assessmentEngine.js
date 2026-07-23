
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    assessmentEngine.js

    Version
    1.0

    Purpose

    Master Assessment Engine

    Responsibilities

    • Load Visitor
    • Load Assessment Definition
    • Render Assessment
    • Restore Answers
    • Handle Ratings
    • Calculate Scores
    • Save State
    • Update Backend
    • Navigate

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

/*=====================================================================

    MASTER ASSESSMENT ENGINE

======================================================================*/

CTM.assessmentEngine = {

    /*==================================================
    CONFIGURATION
    ==================================================*/

    config:{

        pillar:'',

        screen:'',

        next:''

    },



    /*==================================================
    RUNTIME
    ==================================================*/

    visitor:null,

    definition:null,

    assessment:null,

    scores:[],

    average:0,



    /*==================================================
    INITIALIZE

    Called by screen03.js

    ==================================================*/

    init(config={}){

        this.config={

            ...this.config,

            ...config

        };

        console.log(

            'Assessment Engine Started',

            this.config

        );

        this.loadVisitor();

        this.loadDefinition();

        this.initializeAssessment();

        this.restoreAnswers();

        this.renderHeader();

        this.renderReflection();

        this.renderQuestions();

        this.bindEvents();

    },



    /*==================================================
    LOAD VISITOR

    ==================================================*/

    loadVisitor(){

        this.visitor=

            CTM.state.visitor ||

            {};

    },



    /*==================================================
    LOAD DEFINITION

    ==================================================*/

    loadDefinition(){

        this.definition=

            CTM.assessmentQuestions[

                this.config.pillar

            ];

        if(

            !this.definition

        ){

            throw new Error(

                'Assessment definition not found : ' +

                this.config.pillar

            );

        }

    },



    /*==================================================
    INITIALIZE ASSESSMENT STATE

    ==================================================*/

    initializeAssessment(){

        CTM.state.assessment=

            CTM.state.assessment ||

            {};



        if(

            !CTM.state.assessment[

                this.config.pillar

            ]

        ){

            CTM.state.assessment[

                this.config.pillar

            ]={

                scores:

                    [0,0,0,0,0],

                average:0

            };

        }



        this.assessment=

            CTM.state

            .assessment

            [

                this.config.pillar

            ];



        this.scores=[

            ...this.assessment

            .scores

        ];



        this.average=

            this.assessment

            .average;

    },



    /*==================================================
    RESTORE ANSWERS

    ==================================================*/

    restoreAnswers(){

        if(

            !this.scores ||

            this.scores.length===0

        ){

            return;

        }

    },



    /*==================================================
    RENDER HEADER

    Visitor Name

    ==================================================*/

    renderHeader(){

        const visitorName=

            this.visitor.name ||

            'Visitor';



        const tamilName=

            document.getElementById(

                'visitorName'

            );



        const englishName=

            document.getElementById(

                'visitorNameEnglish'

            );



        if(

            tamilName

        ){

            tamilName.textContent=

                visitorName;

        }



        if(

            englishName

        ){

            englishName.textContent=

                visitorName;

        }

    },



    /*==================================================
    RENDER REFLECTION

    ==================================================*/

    renderReflection(){

        console.log(

            this.definition

            .reflection

        );

    },



    /*==================================================
    RENDER QUESTIONS

    Batch 02

    ==================================================*/

      /*==================================================
    RENDER QUESTIONS

    Dynamic Question Generator

    ==================================================*/

    renderQuestions(){

        const container=

            document.getElementById(

                'questionContainer'

            );



        if(

            !container

        ){

            console.error(

                'Question container not found.'

            );

            return;

        }



        container.innerHTML='';



        this.definition.questions.forEach(

            (question,index)=>{

                container.appendChild(

                    this.createQuestionCard(

                        question,

                        index

                    )

                );

            }

        );



        this.restoreSelections();

    },



    /*==================================================
    CREATE QUESTION CARD

    ==================================================*/

    createQuestionCard(

        question,

        index

    ){

        const card=

            document.createElement(

                'article'

            );



        card.className=

            'question-card';



        card.dataset.question=

            index+1;



        card.innerHTML=

        `

        <div class="question-header">

            <span class="question-number">

                Question ${index+1}

            </span>

            <span class="question-pillar">

                ${this.definition.title}

            </span>

        </div>

        <h3 class="question-ta">

            ${question.tamil}

        </h3>

        <p class="question-en">

            ${question.english}

        </p>

        <div

            class="rating-selector"

            id="${question.id}">

            ${this.createRatingButtons()}

        </div>

        `;



        return card;

    },



    /*==================================================
    CREATE RATING BUTTONS

    ==================================================*/

    createRatingButtons(){

        let html='';



        for(

            let value=1;

            value<=10;

            value++

        ){

            html+=`

            <button

                class="rating-btn"

                type="button"

                data-value="${value}">

                ${value}

            </button>

            `;

        }



        return html;

    },



    /*==================================================
    RESTORE PREVIOUS SELECTIONS

    ==================================================*/

    restoreSelections(){

        this.scores.forEach(

            (score,index)=>{

                if(

                    score===0

                ){

                    return;

                }



                const selector=

                    this.definition

                    .questions[index]

                    .id;



                CTM.assessmentUI.restore(

                    selector,

                    score

                );

            }

        );

    },



    /*==================================================
    BIND EVENTS

    ==================================================*/

    bindEvents(){

        CTM.assessmentUI.bind(

            (

                selector,

                value

            )=>{

                this.handleRating(

                    selector,

                    value

                );

            }

        );

    },



    /*==================================================
    HANDLE RATING

    Batch 03

    ==================================================*/

      /*==================================================
    HANDLE RATING

    ==================================================*/

    handleRating(

        selectorId,

        value

    ){

        const questionIndex=

            this.definition.questions.findIndex(

                question=>

                    question.id===selectorId

            );



        if(

            questionIndex===-1

        ){

            return;

        }



        this.scores[

            questionIndex

        ]=value;



        this.assessment.scores=[

            ...this.scores

        ];



        this.calculateAverage();

        this.updateSummary();

        this.checkCompletion();

        CTM.storage.save();

    },



    /*==================================================
    CALCULATE AVERAGE

    ==================================================*/

    calculateAverage(){

        this.average=

            CTM.scoring.average(

                this.scores

            );



        this.assessment.average=

            this.average;

    },



    /*==================================================
    UPDATE SUMMARY

    ==================================================*/

    updateSummary(){

        const status=

            document.getElementById(

                'purposeStatus'

            );



        if(

            status

        ){

            status.textContent=

                this.average.toFixed(

                    1

                ) +

                ' / 10';

        }

    },



    /*==================================================
    CHECK COMPLETION

    ==================================================*/

    checkCompletion(){

        const completed=

            this.scores.every(

                score=>score>0

            );



        if(

            completed

        ){

            CTM.assessmentUI

            .enableContinue();

        }

        else{

            CTM.assessmentUI

            .disableContinue();

        }

    },



    /*==================================================
    GET RESULT

    ==================================================*/

    getResult(){

        return{

            pillar:

                this.config.pillar,

            screen:

                this.config.screen,

            scores:

                [...this.scores],

            average:

                this.average

        };

    },



    /*==================================================
    SAVE

    Batch 04

    ==================================================*/

      /*==================================================
    SAVE

    Save Assessment
    Update Google Sheet
    Navigate Next

    ==================================================*/

    async save(){

        if(

            !this.scores.every(

                score=>score>0

            )

        ){

            alert(

                'Please answer all five questions.'

            );

            return;

        }



        const button=

            document.getElementById(

                'btnContinue'

            );



        if(button){

            button.disabled=true;

            button.classList.add(

                'loading'

            );

        }



        try{

            const payload={

                visitorId:

                    this.visitor.id,

                currentPage:

                    this.config.screen,

                completionStatus:

                    'In Progress',

                pillar:

                    this.config.pillar,

                score:

                    this.average,

                scores:

                    [...this.scores]

            };



            const result=

                await CTM.api.updateVisitor(

                    payload

                );



            if(

                !result ||

                result.success!==true

            ){

                throw new Error(

                    result.message ||

                    'Unable to save assessment.'

                );

            }



            CTM.storage.save();



            if(

                CTM.router &&

                typeof CTM.router.go==='function'

            ){

                CTM.router.go(

                    this.config.next

                );

            }

            else if(

                CTM.router &&

                typeof CTM.router.next==='function'

            ){

                CTM.router.next();

            }

        }

        catch(error){

            console.error(

                error

            );



            alert(

                error.message ||

                'Unable to save your assessment.'

            );



            if(button){

                button.disabled=false;

                button.classList.remove(

                    'loading'

                );

            }

        }

    },



    /*==================================================
    BIND CONTINUE BUTTON

    ==================================================*/

    bindContinue(){

        const button=

            document.getElementById(

                'btnContinue'

            );



        if(

            !button

        ){

            return;

        }



        button.addEventListener(

            'click',

            ()=>{

                this.save();

            }

        );

    },



    /*==================================================
    BIND PREVIOUS BUTTON

    ==================================================*/

    bindPrevious(){

        const button=

            document.getElementById(

                'btnPrevious'

            );



        if(

            !button

        ){

            return;

        }



        button.addEventListener(

            'click',

            ()=>{

                history.back();

            }

        );

    },



    /*==================================================
    REGISTER EVENTS

    ==================================================*/

    registerEvents(){

        this.bindContinue();

        this.bindPrevious();

    },



    /*==================================================
    INITIALIZATION COMPLETE

    Called after render

    ==================================================*/

    finalize(){

        this.checkCompletion();

        this.registerEvents();

    },



    /*==================================================
    UTILITIES

    Batch 05

    ==================================================*/

      /*==================================================
    RESET

    ==================================================*/

    reset(){

        this.scores=[

            0,0,0,0,0

        ];



        this.average=0;



        this.assessment.scores=[

            0,0,0,0,0

        ];



        this.assessment.average=0;



        CTM.storage.save();



        document

        .querySelectorAll(

            '.rating-btn'

        )

        .forEach(button=>{

            button.classList.remove(

                'selected'

            );

        });



        CTM.assessmentUI

        .disableContinue();



        const status=

            document.getElementById(

                'assessmentStatus'

            );



        if(status){

            status.textContent=

                'Awaiting Response';

        }

    },



    /*==================================================
    GET CURRENT SCORE

    ==================================================*/

    getAverage(){

        return this.average;

    },



    /*==================================================
    GET SCORES

    ==================================================*/

    getScores(){

        return[

            ...this.scores

        ];

    },



    /*==================================================
    GET PILLAR

    ==================================================*/

    getPillar(){

        return this.config.pillar;

    },



    /*==================================================
    GET SCREEN

    ==================================================*/

    getScreen(){

        return this.config.screen;

    },



    /*==================================================
    DESTROY

    ==================================================*/

    destroy(){

        this.visitor=null;

        this.definition=null;

        this.assessment=null;

        this.scores=[];

        this.average=0;

    }

};

/*==================================================

AUTO EXPORT

==================================================*/

window.CTM.assessmentEngine=

    CTM.assessmentEngine;

/*==================================================

END OF FILE

==================================================*/
