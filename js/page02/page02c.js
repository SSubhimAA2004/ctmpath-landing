
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02c.js
 *
 * VERSION:
 * 3.0
 *
 * PAGE:
 * PAGE 02C — DIMENSION 02
 *
 * STATUS:
 * PAGE CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls only the navigation and lifecycle of Dimension 02.
 *
 *      page02b.html
 *           ↓
 *      page02c.html
 *           ↓
 *      DIMENSION 02
 *      Indicators 06–10
 *           ↓
 *      page02d.html
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
 *      ✓ initializes Dimension 02
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Dimension 02 indicators
 *      ✓ marks Dimension 02 complete
 *      ✓ navigates to Page 02D
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
        'incomeCashFlow',

    previousPage:
        'page02b.html',

    nextPage:
        'page02d.html',

    previousDimensionId:
        'wealth',

    nextDimensionId:
        'assets'

};


/* =============================================================================
 * DOM CONTRACT
 *
 * page02c.html:
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
            'CTM PATH™ Page 02C missing dependencies:',
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
            'CTM PATH™ Page 02C could not find Dimension 02.'
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
            'CTM PATH™ Page 02C expected exactly five indicators.',
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
 * Answers are persisted immediately by Page02Session.
 *
 * No separate save operation is required when moving backward.
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


    /* -------------------------------------------------------------------------
     * PRESERVE PREVIOUS DIMENSION LOCATION
     * -------------------------------------------------------------------------
     */


    const previousDimensionSet =
        window.Page02Session.setCurrentDimension(
            CONFIG.previousDimensionId
        );


    if(
        !previousDimensionSet
    ){

        console.warn(
            'CTM PATH™ Page 02C could not set previous dimension:',
            CONFIG.previousDimensionId
        );

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
 * Sequence:
 *
 *      1. Validate Indicators 06–10
 *      2. Mark Dimension 02 complete
 *      3. Set Dimension 03 as current
 *      4. Navigate to Page 02D
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
            'CTM PATH™ Page 02C could not complete Dimension 02.'
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
            'CTM PATH™ Page 02C could not set next dimension:',
            CONFIG.nextDimensionId
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * LOCK NAVIGATION
     * -------------------------------------------------------------------------
     */


    setNavigationState(
        true
    );


    /* -------------------------------------------------------------------------
     * QA LOG
     * -------------------------------------------------------------------------
     */


    console.info(
        'CTM PATH™ Dimension 02 complete:',
        {

            dimensionId:
                CONFIG.dimensionId,

            score:
                window.Page02Scorecard.getScore(),

            progress:
                window.Page02Scorecard.getProgress(),

            next:
                CONFIG.nextDimensionId

        }
    );


    /* -------------------------------------------------------------------------
     * NAVIGATE
     * -------------------------------------------------------------------------
     */


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
            'CTM PATH™ Page 02C: #previousButton not found.'
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
            'CTM PATH™ Page 02C: #nextButton not found.'
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
 * Ctrl/Cmd + Enter attempts to continue.
 *
 * Validation remains mandatory.
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
 * ANSWER EVENTS
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
                    'CTM PATH™ Dimension 02: all five indicators answered.',
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
 *
 * If the user returns from Page 02D, all previously selected answers
 * are restored automatically.
 * =============================================================================
 */


function restorePage(){

    window.Page02Scorecard.restore();


    const progress =
        window.Page02Scorecard.getProgress();


    console.info(
        'CTM PATH™ Page 02C restored:',
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
        'CTM PATH™ Page 02C initializing — Dimension 02...'
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
     * INITIALIZE SHARED SCORECARD
     * -------------------------------------------------------------------------
     */


    const scorecardReady =
        initializeScorecard();


    if(
        !scorecardReady
    ){

        console.error(
            'CTM PATH™ Page 02C scorecard initialization failed.'
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * BIND PAGE CONTROLS
     * -------------------------------------------------------------------------
     */


    bindPreviousButton();


    bindNextButton();


    bindKeyboardNavigation();


    bindAnswerEvents();


    /* -------------------------------------------------------------------------
     * RESTORE ANSWERS
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
        'CTM PATH™ Page 02C ready.',
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
 * =============================================================================
 */


window.Page02C = {

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
 * PAGE 02C LOAD ORDER:
 *
 *      page02-data.js
 *             ↓
 *      page02-session.js
 *             ↓
 *      page02-scorecard.js
 *             ↓
 *      page02c.js
 *
 *
 * JOURNEY:
 *
 *      PAGE 02B
 *      DIMENSION 01
 *           ↓
 *
 *      PAGE 02C
 *      DIMENSION 02
 *      INDICATORS 06–10
 *
 *           ↓
 *
 *      Validate 5 / 5
 *           ↓
 *
 *      completeDimension("incomeCashFlow")
 *           ↓
 *
 *      setCurrentDimension("assets")
 *           ↓
 *
 *      PAGE 02D
 *      DIMENSION 03
 *
 *
 * NEXT FILE:
 *
 *      pages/page02c.html
 *
 * =============================================================================
 */


})(window, document);

