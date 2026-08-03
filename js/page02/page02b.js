
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02b.js
 *
 * VERSION:
 * 3.0
 *
 * PAGE:
 * PAGE 02B — DIMENSION 01 — WEALTH™
 *
 * STATUS:
 * PAGE CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls only the navigation and lifecycle of Dimension 01.
 *
 *      page02a.html
 *           ↓
 *      page02b.html
 *           ↓
 *      WEALTH™
 *      Indicators 01–05
 *           ↓
 *      page02c.html
 *
 * =============================================================================
 *
 * SHARED RESPONSIBILITIES DELEGATED TO:
 *
 *      page02-data.js
 *          → indicator definitions / ranges
 *
 *      page02-session.js
 *          → answer persistence / scoring / journey state
 *
 *      page02-scorecard.js
 *          → rendering / selection / validation / live score
 *
 * =============================================================================
 *
 * THIS FILE:
 *
 *      ✓ initializes Wealth™
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Wealth™ indicators
 *      ✓ marks Wealth™ complete
 *      ✓ navigates to Page 02C
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ contain questions
 *      ✗ contain range definitions
 *      ✗ calculate scores
 *      ✗ render option cards
 *      ✗ call backend
 *
 * =============================================================================
 */


'use strict';


(function(window, document){


/* =============================================================================
 * CONFIGURATION
 * =============================================================================
 */


const CONFIG = {

    dimensionId:
        'wealth',

    previousPage:
        'page02a.html',

    nextPage:
        'page02c.html',

    nextDimensionId:
        'incomeCashFlow'

};


/* =============================================================================
 * DOM CONTRACT
 *
 * page02b.html:
 *
 *      #previousButton
 *      #nextButton
 *
 * Shared scorecard DOM is handled by page02-scorecard.js.
 *
 * =============================================================================
 */


const DOM_IDS = {

    previousButton:
        'previousButton',

    nextButton:
        'nextButton'

};


/* =============================================================================
 * STATE
 * =============================================================================
 */


let initialized =
    false;


let navigating =
    false;


/* =============================================================================
 * DOM HELPER
 * =============================================================================
 */


function getElement(id){

    return (
        document.getElementById(id) ||
        null
    );

}


/* =============================================================================
 * SCROLL TO TOP
 * =============================================================================
 */


function scrollToTop(){

    window.scrollTo({

        top:
            0,

        left:
            0,

        behavior:
            'auto'

    });

}


/* =============================================================================
 * VERIFY DEPENDENCIES
 * =============================================================================
 */


function verifyDependencies(){

    const missing =
        [];


    if(
        !window.Page02Data
    ){

        missing.push(
            'Page02Data'
        );

    }


    if(
        !window.Page02Session
    ){

        missing.push(
            'Page02Session'
        );

    }


    if(
        !window.Page02Scorecard
    ){

        missing.push(
            'Page02Scorecard'
        );

    }


    if(
        missing.length
    ){

        console.error(
            'CTM PATH™ Page 02B missing dependencies:',
            missing
        );


        return false;

    }


    return true;

}


/* =============================================================================
 * VERIFY DIMENSION
 * =============================================================================
 */


function verifyDimension(){

    const dimension =
        window.Page02Data.getDimensionById(
            CONFIG.dimensionId
        );


    if(
        !dimension
    ){

        console.error(
            'CTM PATH™ Page 02B could not find Wealth™ dimension.'
        );


        return false;

    }


    if(
        !Array.isArray(
            dimension.indicators
        ) ||
        dimension.indicators.length !== 5
    ){

        console.error(
            'CTM PATH™ Page 02B expected exactly five Wealth™ indicators.',
            dimension
        );


        return false;

    }


    return true;

}


/* =============================================================================
 * NAVIGATION LOCK
 * =============================================================================
 */


function setNavigationState(
    active
){

    navigating =
        active;


    const previousButton =
        getElement(
            DOM_IDS.previousButton
        );


    const nextButton =
        getElement(
            DOM_IDS.nextButton
        );


    if(previousButton){

        previousButton.disabled =
            active;


        previousButton.setAttribute(
            'aria-busy',
            active
                ? 'true'
                : 'false'
        );

    }


    if(nextButton){

        nextButton.disabled =
            active;


        nextButton.setAttribute(
            'aria-busy',
            active
                ? 'true'
                : 'false'
        );

    }

}


/* =============================================================================
 * PREVIOUS
 *
 * Answers are already persisted immediately by Page02Session.
 *
 * Therefore returning to Page 02A does not require a separate save action.
 *
 * =============================================================================
 */


function goPrevious(
    event
){

    if(event){

        event.preventDefault();

    }


    if(navigating){

        return;

    }


    setNavigationState(
        true
    );


    window.location.href =
        CONFIG.previousPage;

}


/* =============================================================================
 * NEXT
 *
 * Critical sequence:
 *
 *      1. Validate all 5 Wealth™ indicators
 *      2. Mark Wealth™ complete
 *      3. Set next dimension
 *      4. Navigate to Page 02C
 *
 * =============================================================================
 */


function goNext(
    event
){

    if(event){

        event.preventDefault();

    }


    if(navigating){

        return;

    }


    /* -------------------------------------------------------------------------
     * VALIDATE
     * -------------------------------------------------------------------------
     */


    const valid =
        window.Page02Scorecard.requireComplete();


    if(
        !valid
    ){

        return;

    }


    /* -------------------------------------------------------------------------
     * COMPLETE DIMENSION
     * -------------------------------------------------------------------------
     */


    const completed =
        window.Page02Scorecard.complete();


    if(
        !completed
    ){

        console.error(
            'CTM PATH™ Page 02B could not complete Wealth™.'
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * SET NEXT DIMENSION
     * -------------------------------------------------------------------------
     */


    const nextDimensionSet =
        window.Page02Session.setCurrentDimension(
            CONFIG.nextDimensionId
        );


    if(
        !nextDimensionSet
    ){

        console.error(
            'CTM PATH™ Page 02B could not set next dimension:',
            CONFIG.nextDimensionId
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * NAVIGATE
     * -------------------------------------------------------------------------
     */


    setNavigationState(
        true
    );


    console.info(
        'CTM PATH™ Wealth™ complete:',
        {

            score:
                window.Page02Scorecard.getScore(),

            progress:
                window.Page02Scorecard.getProgress(),

            next:
                CONFIG.nextDimensionId

        }
    );


    window.location.href =
        CONFIG.nextPage;

}


/* =============================================================================
 * BIND PREVIOUS BUTTON
 * =============================================================================
 */


function bindPreviousButton(){

    const button =
        getElement(
            DOM_IDS.previousButton
        );


    if(!button){

        console.warn(
            'CTM PATH™ Page 02B: #previousButton not found.'
        );


        return;

    }


    button.addEventListener(
        'click',
        goPrevious
    );

}


/* =============================================================================
 * BIND NEXT BUTTON
 * =============================================================================
 */


function bindNextButton(){

    const button =
        getElement(
            DOM_IDS.nextButton
        );


    if(!button){

        console.error(
            'CTM PATH™ Page 02B: #nextButton not found.'
        );


        return;

    }


    button.addEventListener(
        'click',
        goNext
    );

}


/* =============================================================================
 * KEYBOARD SUPPORT
 *
 * Ctrl/Cmd + Enter:
 * attempt to continue.
 *
 * This does not bypass validation.
 *
 * =============================================================================
 */


function bindKeyboardNavigation(){

    document.addEventListener(
        'keydown',
        function(event){

            if(
                event.key !== 'Enter'
            ){

                return;

            }


            if(
                !event.ctrlKey &&
                !event.metaKey
            ){

                return;

            }


            event.preventDefault();


            goNext();

        }
    );

}


/* =============================================================================
 * ANSWER EVENT
 *
 * Shared engine emits:
 *
 *      ctm:page02-answer
 *
 * Page 02B does not need to recalculate anything.
 * We use the event only for page-level completion feedback.
 *
 * =============================================================================
 */


function bindAnswerEvents(){

    document.addEventListener(
        'ctm:page02-answer',
        function(event){

            if(
                !event.detail ||
                event.detail.dimensionId !==
                    CONFIG.dimensionId
            ){

                return;

            }


            const progress =
                event.detail.progress;


            if(
                progress &&
                progress.complete
            ){

                console.info(
                    'CTM PATH™ Wealth™: all five indicators answered.',
                    {

                        score:
                            progress.score,

                        maximumScore:
                            progress.maximumScore

                    }
                );

            }

        }
    );

}


/* =============================================================================
 * RESTORE PAGE STATE
 * =============================================================================
 */


function restorePage(){

    window.Page02Scorecard.restore();


    const progress =
        window.Page02Scorecard.getProgress();


    console.info(
        'CTM PATH™ Page 02B restored:',
        {

            answered:
                progress.answered,

            total:
                progress.total,

            score:
                progress.score,

            maximumScore:
                progress.maximumScore

        }
    );

}


/* =============================================================================
 * INITIALIZE SCORECARD
 * =============================================================================
 */


function initializeScorecard(){

    return (
        window.Page02Scorecard.init({

            dimensionId:
                CONFIG.dimensionId

        })
    );

}


/* =============================================================================
 * INITIALIZE
 * =============================================================================
 */


function init(){

    if(initialized){

        return;

    }


    console.info(
        'CTM PATH™ Page 02B initializing — Wealth™...'
    );


    /* -------------------------------------------------------------------------
     * DEPENDENCIES
     * -------------------------------------------------------------------------
     */


    if(
        !verifyDependencies()
    ){

        return;

    }


    /* -------------------------------------------------------------------------
     * DIMENSION CONTRACT
     * -------------------------------------------------------------------------
     */


    if(
        !verifyDimension()
    ){

        return;

    }


    /* -------------------------------------------------------------------------
     * SCORECARD
     * -------------------------------------------------------------------------
     */


    const scorecardReady =
        initializeScorecard();


    if(
        !scorecardReady
    ){

        console.error(
            'CTM PATH™ Page 02B scorecard initialization failed.'
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * NAVIGATION
     * -------------------------------------------------------------------------
     */


    bindPreviousButton();


    bindNextButton();


    bindKeyboardNavigation();


    bindAnswerEvents();


    /* -------------------------------------------------------------------------
     * RESTORE
     * -------------------------------------------------------------------------
     */


    restorePage();


    /* -------------------------------------------------------------------------
     * VIEWPORT
     * -------------------------------------------------------------------------
     */


    scrollToTop();


    initialized =
        true;


    console.info(
        'CTM PATH™ Page 02B ready.',
        {

            dimension:
                CONFIG.dimensionId,

            score:
                window.Page02Scorecard.getScore(),

            progress:
                window.Page02Scorecard.getProgress()

        }
    );

}


/* =============================================================================
 * DOM READY
 * =============================================================================
 */


if(
    document.readyState ===
    'loading'
){

    document.addEventListener(
        'DOMContentLoaded',
        init
    );

}
else{

    init();

}


/* =============================================================================
 * PUBLIC CONTROLLER
 *
 * Useful during QA:
 *
 *      Page02B.getProgress()
 *      Page02B.goNext()
 *      Page02B.goPrevious()
 *
 * =============================================================================
 */


window.Page02B = {

    version:
        '3.0',

    dimensionId:
        CONFIG.dimensionId,

    init:
        init,

    goPrevious:
        goPrevious,

    goNext:
        goNext,

    getScore:
        function(){

            return (
                window.Page02Scorecard
                    .getScore()
            );

        },

    getProgress:
        function(){

            return (
                window.Page02Scorecard
                    .getProgress()
            );

        },

    validate:
        function(){

            return (
                window.Page02Scorecard
                    .validate()
            );

        }

};


/* =============================================================================
 * END
 *
 * PAGE 02B LOAD ORDER:
 *
 *      page02-data.js
 *             ↓
 *      page02-session.js
 *             ↓
 *      page02-scorecard.js
 *             ↓
 *      page02b.js
 *
 *
 * JOURNEY:
 *
 *      page02a.html
 *           ↓
 *
 *      PAGE 02B
 *      DIMENSION 01
 *      WEALTH™
 *
 *      Indicators 01–05
 *
 *           ↓
 *
 *      Validate 5 / 5
 *           ↓
 *
 *      completeDimension("wealth")
 *           ↓
 *
 *      setCurrentDimension("incomeCashFlow")
 *           ↓
 *
 *      page02c.html
 *
 *
 * NEXT FILE:
 *
 *      pages/page02b.html
 *
 * =============================================================================
 */


})(window, document);

