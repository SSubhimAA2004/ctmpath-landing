
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02e.js
 *
 * VERSION:
 * 3.0
 *
 * PAGE:
 * PAGE 02E — DIMENSION 04
 *
 * STATUS:
 * PAGE CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Controls only the lifecycle and navigation of Dimension 04.
 *
 *      page02d.html
 *           ↓
 *      page02e.html
 *           ↓
 *      DIMENSION 04
 *      Indicators 16–20
 *           ↓
 *      page02f.html
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
 *      ✓ initializes Dimension 04
 *      ✓ binds Previous
 *      ✓ binds Next
 *      ✓ validates all five Dimension 04 indicators
 *      ✓ marks Dimension 04 complete
 *      ✓ preserves previous/next dimension state
 *      ✓ navigates to Page 02F
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ contain indicator definitions
 *      ✗ contain range definitions
 *      ✗ calculate scores
 *      ✗ render scorecards
 *      ✗ call CTM_API
 *      ✗ submit final discovery payload
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
        'lifestyleFreedom',

    previousPage:
        'page02d.html',

    nextPage:
        'page02f.html',

    previousDimensionId:
        'assets',

    nextDimensionId:
        'protectionContribution'

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
            'CTM PATH™ Page 02E missing dependencies:',
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
            'CTM PATH™ Page 02E could not find Dimension 04:',
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
            'CTM PATH™ Page 02E dimension has no indicator collection.',
            dimension
        );


        return false;

    }


    if(
        dimension.indicators.length !== 5
    ){

        console.error(
            'CTM PATH™ Page 02E expected exactly five indicators.',
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
 * All answers are persisted immediately through Page02Session.
 * No additional save action is required.
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
     * SET PREVIOUS DIMENSION
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
            'CTM PATH™ Page 02E could not set previous dimension:',
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
 *      1. Validate Indicators 16–20
 *      2. Complete Dimension 04
 *      3. Set Dimension 05 as current
 *      4. Navigate to Page 02F
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
            'CTM PATH™ Page 02E could not complete Dimension 04.'
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
            'CTM PATH™ Page 02E could not set next dimension:',
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
        'CTM PATH™ Dimension 04 complete:',
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
            'CTM PATH™ Page 02E: #previousButton not found.'
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
            'CTM PATH™ Page 02E: #nextButton not found.'
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
 * Ctrl/Cmd + Enter attempts to continue.
 * Validation cannot be bypassed.
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
                    'CTM PATH™ Dimension 04: all five indicators answered.',
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
 * RESTORE PAGE STATE
 *
 * If the user returns from Page 02F, the shared scorecard engine restores:
 *
 *      ✓ Indicators 16–20
 *      ✓ selected ranges
 *      ✓ scores
 *      ✓ answered count
 *      ✓ live /20 score
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
            'CTM PATH™ Page 02E could not restore scorecard state.'
        );

    }


    const progress =
        window.Page02Scorecard.getProgress();


    console.info(
        'CTM PATH™ Page 02E restored:',
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
        'CTM PATH™ Page 02E initializing — Dimension 04...'
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
            'CTM PATH™ Page 02E scorecard initialization failed.'
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * BIND CONTROLS
     * -------------------------------------------------------------------------
     */


    bindPreviousButton();


    bindNextButton();


    bindKeyboardNavigation();


    bindAnswerEvents();


    /* -------------------------------------------------------------------------
     * RESTORE SAVED ANSWERS
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
        'CTM PATH™ Page 02E ready.',
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


window.Page02E = {

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
 * PAGE 02E LOAD ORDER:
 *
 *      page02-data.js
 *             ↓
 *      page02-session.js
 *             ↓
 *      page02-scorecard.js
 *             ↓
 *      page02e.js
 *
 *
 * JOURNEY:
 *
 *      PAGE 02D
 *      DIMENSION 03
 *      INDICATORS 11–15
 *
 *             ↓
 *
 *      PAGE 02E
 *      DIMENSION 04
 *      INDICATORS 16–20
 *
 *             ↓
 *
 *      Validate 5 / 5
 *
 *             ↓
 *
 *      completeDimension("lifestyleFreedom")
 *
 *             ↓
 *
 *      setCurrentDimension("protectionContribution")
 *
 *             ↓
 *
 *      PAGE 02F
 *      DIMENSION 05
 *      INDICATORS 21–25
 *
 *
 * NEXT FILE:
 *
 *      pages/page02e.html
 *
 * =============================================================================
 */


})(window, document);

