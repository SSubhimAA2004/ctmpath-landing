
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02d.js
 *
 * VERSION:
 * 3.0
 *
 * PAGE:
 * PAGE 02D — DIMENSION 03
 *
 * STATUS:
 * PAGE CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls only the lifecycle and navigation of Dimension 03.
 *
 *      page02c.html
 *           ↓
 *      page02d.html
 *           ↓
 *      DIMENSION 03
 *      Indicators 11–15
 *           ↓
 *      page02e.html
 *
 * =============================================================================
 *
 * SHARED RESPONSIBILITIES DELEGATED TO:
 *
 *      page02-data.js
 *          → frozen indicator definitions / ranges
 *
 *      page02-session.js
 *          → answer persistence / scoring / journey state
 *
 *      page02-scorecard.js
 *          → rendering / option selection / validation / live score
 *
 * =============================================================================
 *
 * THIS FILE:
 *
 *      ✓ initializes Dimension 03
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Dimension 03 indicators
 *      ✓ marks Dimension 03 complete
 *      ✓ preserves previous/next dimension state
 *      ✓ navigates to Page 02E
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ contain indicator definitions
 *      ✗ contain range definitions
 *      ✗ calculate scores
 *      ✗ render cards
 *      ✗ call CTM_API
 *      ✗ save final discovery payload
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
        'assets',

    previousPage:
        'page02c.html',

    nextPage:
        'page02e.html',

    previousDimensionId:
        'incomeCashFlow',

    nextDimensionId:
        'lifestyleFreedom'

};


/* =============================================================================
 * DOM CONTRACT
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
            'CTM PATH™ Page 02D missing dependencies:',
            missing
        );


        return false;

    }


    return true;

}


/* =============================================================================
 * VERIFY DIMENSION CONTRACT
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
            'CTM PATH™ Page 02D could not find Dimension 03:',
            CONFIG.dimensionId
        );


        return false;

    }


    if(
        !Array.isArray(
            dimension.indicators
        )
    ){

        console.error(
            'CTM PATH™ Page 02D dimension has no indicator collection.',
            dimension
        );


        return false;

    }


    if(
        dimension.indicators.length !== 5
    ){

        console.error(
            'CTM PATH™ Page 02D expected exactly five indicators.',
            {

                dimensionId:
                    CONFIG.dimensionId,

                indicators:
                    dimension.indicators.length

            }
        );


        return false;

    }


    return true;

}


/* =============================================================================
 * NAVIGATION STATE
 * =============================================================================
 */


function setNavigationState(
    active
){

    navigating =
        Boolean(active);


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
            navigating;


        previousButton.setAttribute(
            'aria-busy',
            navigating
                ? 'true'
                : 'false'
        );

    }


    if(nextButton){

        nextButton.disabled =
            navigating;


        nextButton.setAttribute(
            'aria-busy',
            navigating
                ? 'true'
                : 'false'
        );

    }

}


/* =============================================================================
 * GO PREVIOUS
 *
 * Indicator answers are already persisted immediately through
 * Page02Session. No explicit save is required here.
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
     * UPDATE JOURNEY LOCATION
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
            'CTM PATH™ Page 02D could not set previous dimension:',
            CONFIG.previousDimensionId
        );

    }


    /* -------------------------------------------------------------------------
     * NAVIGATE
     * -------------------------------------------------------------------------
     */


    setNavigationState(
        true
    );


    window.location.href =
        CONFIG.previousPage;

}


/* =============================================================================
 * GO NEXT
 *
 * Required sequence:
 *
 *      1. Validate all five answers
 *      2. Complete Dimension 03
 *      3. Set Dimension 04 as current
 *      4. Navigate to Page 02E
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
     * VALIDATE DIMENSION
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
            'CTM PATH™ Page 02D could not complete Dimension 03.'
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
            'CTM PATH™ Page 02D could not set next dimension:',
            CONFIG.nextDimensionId
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * LOCK CONTROLS
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
        'CTM PATH™ Dimension 03 complete:',
        {

            dimensionId:
                CONFIG.dimensionId,

            score:
                window.Page02Scorecard.getScore(),

            progress:
                window.Page02Scorecard.getProgress(),

            nextDimension:
                CONFIG.nextDimensionId,

            nextPage:
                CONFIG.nextPage

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
            'CTM PATH™ Page 02D: #previousButton not found.'
        );


        return false;

    }


    button.addEventListener(
        'click',
        goPrevious
    );


    return true;

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
            'CTM PATH™ Page 02D: #nextButton not found.'
        );


        return false;

    }


    button.addEventListener(
        'click',
        goNext
    );


    return true;

}


/* =============================================================================
 * KEYBOARD NAVIGATION
 *
 * Ctrl + Enter
 * or
 * Cmd + Enter
 *
 * attempts to continue.
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
 * ANSWER EVENT
 *
 * page02-scorecard.js dispatches:
 *
 *      ctm:page02-answer
 *
 * We do not recalculate anything here.
 * The event is useful only for page-level QA/completion awareness.
 * =============================================================================
 */


function bindAnswerEvents(){

    document.addEventListener(
        'ctm:page02-answer',
        function(event){

            if(
                !event.detail
            ){

                return;

            }


            if(
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
                    'CTM PATH™ Dimension 03: all five indicators answered.',
                    {

                        answered:
                            progress.answered,

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
 * RESTORE PAGE
 *
 * When the user returns from Page 02E:
 *
 *      ✓ previous selections reappear
 *      ✓ selected option states are restored
 *      ✓ live score is restored
 *      ✓ completion count is restored
 *
 * =============================================================================
 */


function restorePage(){

    const restored =
        window.Page02Scorecard.restore();


    if(
        !restored
    ){

        console.warn(
            'CTM PATH™ Page 02D could not restore scorecard state.'
        );

    }


    const progress =
        window.Page02Scorecard.getProgress();


    console.info(
        'CTM PATH™ Page 02D restored:',
        {

            answered:
                progress.answered,

            total:
                progress.total,

            score:
                progress.score,

            maximumScore:
                progress.maximumScore,

            complete:
                progress.complete

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
        'CTM PATH™ Page 02D initializing — Dimension 03...'
    );


    /* -------------------------------------------------------------------------
     * DEPENDENCY CONTRACT
     * -------------------------------------------------------------------------
     */


    if(
        !verifyDependencies()
    ){

        return;

    }


    /* -------------------------------------------------------------------------
     * DATA CONTRACT
     * -------------------------------------------------------------------------
     */


    if(
        !verifyDimension()
    ){

        return;

    }


    /* -------------------------------------------------------------------------
     * SHARED SCORECARD ENGINE
     * -------------------------------------------------------------------------
     */


    const scorecardReady =
        initializeScorecard();


    if(
        !scorecardReady
    ){

        console.error(
            'CTM PATH™ Page 02D scorecard initialization failed.'
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * PAGE CONTROLS
     * -------------------------------------------------------------------------
     */


    bindPreviousButton();


    bindNextButton();


    bindKeyboardNavigation();


    bindAnswerEvents();


    /* -------------------------------------------------------------------------
     * RESTORE SAVED STATE
     * -------------------------------------------------------------------------
     */


    restorePage();


    /* -------------------------------------------------------------------------
     * VIEWPORT
     * -------------------------------------------------------------------------
     */


    scrollToTop();


    /* -------------------------------------------------------------------------
     * READY
     * -------------------------------------------------------------------------
     */


    initialized =
        true;


    console.info(
        'CTM PATH™ Page 02D ready.',
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


window.Page02D = {

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
 * PAGE 02D LOAD ORDER:
 *
 *      page02-data.js
 *             ↓
 *      page02-session.js
 *             ↓
 *      page02-scorecard.js
 *             ↓
 *      page02d.js
 *
 *
 * JOURNEY:
 *
 *      PAGE 02C
 *      DIMENSION 02
 *      INDICATORS 06–10
 *
 *             ↓
 *
 *      PAGE 02D
 *      DIMENSION 03
 *      INDICATORS 11–15
 *
 *             ↓
 *
 *      Validate 5 / 5
 *
 *             ↓
 *
 *      completeDimension("assets")
 *
 *             ↓
 *
 *      setCurrentDimension("lifestyleFreedom")
 *
 *             ↓
 *
 *      PAGE 02E
 *      DIMENSION 04
 *      INDICATORS 16–20
 *
 *
 * NEXT FILE:
 *
 *      pages/page02d.html
 *
 * =============================================================================
 */


})(window, document);

