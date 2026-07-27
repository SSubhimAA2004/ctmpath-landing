
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessmentUI.js
   Version     : 1.0
   Status      : LOCKED

   ==========================================================================
   PURPOSE

   Assessment Presentation Engine™

   Owns

   ✓ Render Questions
   ✓ Render Titles
   ✓ Render Rating Scale
   ✓ Render Colours
   ✓ Render Symbols
   ✓ Render Progress
   ✓ Render Status

   Does NOT

   ✗ Calculate Scores
   ✗ Business Logic
   ✗ Read Database

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

CTM.UI = (function () {

    /* ======================================================================
       PRIVATE HELPERS
       ====================================================================== */

    function $(selector){

        return document.querySelector(selector);

    }

    function $all(selector){

        return document.querySelectorAll(selector);

    }

    function exists(selector){

        return $(selector) !== null;

    }

    function safeText(selector,value){

        if(exists(selector)){

            $(selector).textContent = value;

        }

    }

    function safeHTML(selector,value){

        if(exists(selector)){

            $(selector).innerHTML = value;

        }

    }

    function safeStyle(selector,property,value){

        if(exists(selector)){

            $(selector).style[property] = value;

        }

    }

    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return {

        /* ==============================================================
           Render Pillar Header
           ============================================================== */

        renderHeader : function(){

            const state =

                CTM.Engine.getState();

            if(!state.data){

                return;

            }

            safeText(

                "#pillarTamil",

                state.data.title.tamil

            );

            safeText(

                "#pillarEnglish",

                state.data.title.english

            );

            safeText(

                "#coreQuestionTamil",

                state.data.coreQuestion.tamil

            );

            safeText(

                "#coreQuestionEnglish",

                state.data.coreQuestion.english

            );

        },



        /* ==============================================================
           Render Theme
           ============================================================== */

        renderTheme : function(){

            const state =

                CTM.Engine.getState();

            if(!state.data){

                return;

            }

            const colour =

                state.data.presentation.colour;

            document.documentElement.style.setProperty(

                "--pillar-primary",

                colour.primary

            );

            document.documentElement.style.setProperty(

                "--pillar-secondary",

                colour.secondary

            );

            document.documentElement.style.setProperty(

                "--pillar-accent",

                colour.accent

            );

            document.documentElement.style.setProperty(

                "--pillar-glow",

                colour.glow

            );

        },



        /* ==============================================================
           Render Symbol
           ============================================================== */

        renderSymbol : function(){

            const state =

                CTM.Engine.getState();

            if(!state.data){

                return;

            }

            safeText(

                "#pillarSymbol",

                state.data.presentation.symbol.emoji

            );

        },



        /* ==============================================================
           Render Questions
           ============================================================== */

        renderQuestions : function(){

            const state =

                CTM.Engine.getState();

            if(!state.data){

                return;

            }

            state.data.questions.forEach(

                function(question,index){

                    safeText(

                        "#questionTamil"+(index+1),

                        question.tamil

                    );

                    safeText(

                        "#questionEnglish"+(index+1),

                        question.english

                    );

                }

            );

        },



        /* ==============================================================
           Initial Render
           ============================================================== */

        render : function(){

            this.renderHeader();

            this.renderTheme();

            this.renderSymbol();

            this.renderQuestions();

        }

    };

})();

/* ==========================================================================
   END OF BATCH 1A

   Completed

   ✓ Namespace
   ✓ DOM Helpers
   ✓ renderHeader()
   ✓ renderTheme()
   ✓ renderSymbol()
   ✓ renderQuestions()
   ✓ render()

   Pending (Batch 1B)

   • renderRatingScale()
   • renderProgress()
   • renderStatusCard()
   • renderDashboard()
   • updateSelection()

   ========================================================================== */

        /* ==============================================================
           Render Rating Scale
           ============================================================== */

        renderRatingScale : function(){

            const answers =

                CTM.Engine.getAnswers();

            this.updateSelection(

                1,

                answers.awareness

            );

            this.updateSelection(

                2,

                answers.alignment

            );

            this.updateSelection(

                3,

                answers.embodiment

            );

        },



        /* ==============================================================
           Update Rating Selection
           ============================================================== */

        updateSelection : function(question,score){

            if(score === null){

                return;

            }

            const buttons =

                document.querySelectorAll(

                    '[data-question="' +

                    question +

                    '"]'

                );

            buttons.forEach(function(button){

                button.classList.remove(

                    "selected",

                    "selected-red",

                    "selected-orange",

                    "selected-green"

                );

            });

            const selected =

                document.querySelector(

                    '[data-question="' +

                    question +

                    '"][data-score="' +

                    score +

                    '"]'

                );

            if(!selected){

                return;

            }

            selected.classList.add(

                "selected"

            );

            if(score <= 3){

                selected.classList.add(

                    "selected-red"

                );

            }

            else if(score <= 7){

                selected.classList.add(

                    "selected-orange"

                );

            }

            else{

                selected.classList.add(

                    "selected-green"

                );

            }

        },



        /* ==============================================================
           Render Progress
           ============================================================== */

        renderProgress : function(){

            const progress =

                CTM.Engine.progress();

            safeText(

                "#progressValue",

                progress.percentage + "%"

            );

            safeStyle(

                "#progressBar",

                "width",

                progress.percentage + "%"

            );

        },



        /* ==============================================================
           Render Status Card
           ============================================================== */

        renderStatus : function(){

            if(

                !CTM.Engine.hasResult()

            ){

                return;

            }

            const result =

                CTM.Engine.getResult();

            safeText(

                "#currentStatus",

                result.title

            );

            safeText(

                "#overallScore",

                result.percentage + "%"

            );

            safeStyle(

                "#statusCard",

                "borderColor",

                result.colour

            );

            safeStyle(

                "#statusCard",

                "boxShadow",

                "0 0 20px " +

                result.colour

            );

        },



        /* ==============================================================
           Render KALA CHAKRA™ Dashboard
           ============================================================== */

        renderDashboard : function(){

            if(

                !CTM.Engine.hasResult()

            ){

                return;

            }

            const result =

                CTM.Engine.getResult();

            safeText(

                "#wheelScore",

                result.raw +

                "/30"

            );

            safeText(

                "#wheelPercentage",

                result.percentage +

                "%"

            );

            safeText(

                "#wheelLevel",

                result.title

            );

            safeStyle(

                "#wheelScore",

                "color",

                result.colour

            );

            safeStyle(

                "#wheelPercentage",

                "color",

                result.colour

            );

            safeStyle(

                "#wheelLevel",

                "color",

                result.colour

            );

        },



        /* ==============================================================
           Refresh Entire UI
           ============================================================== */

        refresh : function(){

            this.renderHeader();

            this.renderTheme();

            this.renderSymbol();

            this.renderQuestions();

            this.renderRatingScale();

            this.renderProgress();

            this.renderStatus();

            this.renderDashboard();

        }

        /* ==============================================================
           Bind Rating Events
           ============================================================== */

        bindRatingEvents : function(){

            const self = this;

            const buttons =

                document.querySelectorAll(

                    "[data-question][data-score]"

                );

            buttons.forEach(function(button){

                button.addEventListener(

                    "click",

                    function(){

                        const question = Number(

                            this.dataset.question

                        );

                        const score = Number(

                            this.dataset.score

                        );

                        CTM.Engine.answer(

                            question,

                            score

                        );

                        self.updateSelection(

                            question,

                            score

                        );

                        self.renderProgress();

                        if(

                            CTM.Engine.validate()

                        ){

                            CTM.Engine.complete();

                            self.renderStatus();

                            self.renderDashboard();

                        }

                    }

                );

            });

        },



        /* ==============================================================
           Animate Cards
           ============================================================== */

        animateCards : function(){

            const cards =

                document.querySelectorAll(

                    ".assessment-card"

                );

            cards.forEach(function(card,index){

                card.style.opacity = "0";

                card.style.transform =

                    "translateY(20px)";

                setTimeout(function(){

                    card.style.transition =

                        "all .35s ease";

                    card.style.opacity = "1";

                    card.style.transform =

                        "translateY(0)";

                },index * 80);

            });

        },



        /* ==============================================================
           Scroll To Top
           ============================================================== */

        scrollTop : function(){

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        },



        /* ==============================================================
           Initialize UI
           ============================================================== */

        init : function(){

            this.render();

            this.renderRatingScale();

            this.renderProgress();

            this.bindRatingEvents();

            this.animateCards();

            this.scrollTop();

        },



        /* ==============================================================
           Destroy
           ============================================================== */

        destroy : function(){

            /*

            Reserved for future cleanup.

            Event listeners can be detached here
            if dynamic page loading is introduced.

            */

        }

    };

})();



/* ==========================================================================
   LOCK UI
   ========================================================================== */

Object.freeze(

    CTM.UI

);



/* ==========================================================================
   END OF FILE

   assessmentUI.js

   Version : 1.0

   Status

   ✓ COMPLETE
   ✓ LOCKED

   ========================================================================== */

