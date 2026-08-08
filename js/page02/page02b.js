
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02b.js
 *
 * VERSION:
 * 4.0
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
 * Controls the lifecycle and navigation of Dimension 01 — Wealth™.
 *
 * JOURNEY:
 *
 *      page02a.html
 *           ↓
 *      PAGE 02B
 *      WEALTH™
 *      Indicators 01–05
 *           ↓
 *      page02c.html
 *
 * =============================================================================
 *
 * ARCHITECTURE
 *
 *      component-loader.js
 *          ↓
 *      page02-data.js
 *          ↓
 *      page02-session.js
 *          ↓
 *      page02-scorecard.js
 *          ↓
 *      page02b.js
 *
 * =============================================================================
 *
 * THIS FILE OWNS:
 *
 *      ✓ Page 02B lifecycle
 *      ✓ Global component lifecycle call
 *      ✓ Wealth™ dependency verification
 *      ✓ Previous navigation
 *      ✓ Next navigation
 *      ✓ Five-indicator completion gate
 *      ✓ Dimension completion hand-off
 *      ✓ Dimension transition
 *      ✓ Saved-state restoration
 *      ✓ Keyboard navigation
 *      ✓ Page-level accessibility state
 *      ✓ Navigation locking
 *      ✓ QA / diagnostic API
 *
 * THIS FILE DOES NOT OWN:
 *
 *      ✗ Questions
 *      ✗ Indicator definitions
 *      ✗ Range definitions
 *      ✗ Answer scoring
 *      ✗ Score calculations
 *      ✗ Option-card rendering
 *      ✗ Session persistence
 *      ✗ Backend calls
 *      ✗ Header markup
 *      ✗ Footer markup
 *
 * =============================================================================
 */

'use strict';


(function(window, document){

    /* =========================================================================
       01. CONFIGURATION
       ========================================================================= */

    const CONFIG = {

        version:
            '4.0',

        dimensionId:
            'wealth',

        previousPage:
            'page02a.html',

        nextPage:
            'page02c.html',

        nextDimensionId:
            'incomeCashFlow',

        expectedIndicators:
            5,

        keyboardShortcut:
            'Enter'

    };


    /* =========================================================================
       02. DOM CONTRACT
       ========================================================================= */

    const DOM_IDS = {

        page:
            'page02b',

        globalHeader:
            'global-header',

        globalFooter:
            'global-footer',

        previousButton:
            'previousButton',

        nextButton:
            'nextButton',

        completion:
            'dimensionCompletion',

        message:
            'dimensionMessage'

    };


    /* =========================================================================
       03. INTERNAL STATE
       ========================================================================= */

    let initialized =
        false;

    let initializing =
        false;

    let navigating =
        false;

    let answerListenerBound =
        false;

    let keyboardListenerBound =
        false;

    let previousListenerBound =
        false;

    let nextListenerBound =
        false;


    /* =========================================================================
       04. DOM HELPERS
       ========================================================================= */

    function getElement(id){

        if(!id){

            return null;

        }

        return (
            document.getElementById(id) ||
            null
        );

    }


    function getPageRoot(){

        return (
            getElement(DOM_IDS.page) ||
            document.querySelector('.page02b') ||
            document.querySelector('[data-page="page02b"]') ||
            document.body
        );

    }


    /* =========================================================================
       05. PAGE ACCESSIBILITY STATE
       ========================================================================= */

    function setPageState(state){

        const page =
            getPageRoot();

        if(!page){

            return;

        }

        page.setAttribute(
            'data-page-state',
            state
        );

    }


    function setCompletionState(
        complete
    ){

        const page =
            getPageRoot();

        if(page){

            page.setAttribute(
                'data-dimension-complete',
                complete
                    ? 'true'
                    : 'false'
            );

        }

        const completion =
            getElement(
                DOM_IDS.completion
            );

        if(completion){

            completion.setAttribute(
                'data-complete',
                complete
                    ? 'true'
                    : 'false'
            );

            completion.classList.toggle(
                'is-complete',
                complete
            );

        }

    }


    /* =========================================================================
       06. SCROLL MANAGEMENT
       ========================================================================= */

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


    function focusPageTop(){

        const page =
            getPageRoot();

        if(!page){

            return;

        }

        /*
         * Do not force a visible focus ring.
         * This is purely an accessibility / keyboard-navigation aid.
         */

        if(
            !page.hasAttribute('tabindex')
        ){

            page.setAttribute(
                'tabindex',
                '-1'
            );

        }

        try{

            page.focus({
                preventScroll:
                    true
            });

        }
        catch(error){

            /*
             * Older browsers may not support preventScroll.
             */

            try{

                page.focus();

            }
            catch(ignore){

                /* Intentionally ignored. */

            }

        }

    }


    /* =========================================================================
       07. GLOBAL COMPONENT MOUNT VERIFICATION
       ========================================================================= */

    function verifyComponentMounts(){

        const headerMount =
            getElement(
                DOM_IDS.globalHeader
            );

        const footerMount =
            getElement(
                DOM_IDS.globalFooter
            );


        if(!headerMount){

            console.warn(
                'CTM PATH™ Page 02B: #global-header mount not found.'
            );

        }


        if(!footerMount){

            console.warn(
                'CTM PATH™ Page 02B: #global-footer mount not found.'
            );

        }


        return (
            !!headerMount &&
            !!footerMount
        );

    }


    /* =========================================================================
       08. GLOBAL COMPONENT LOADER
       =========================================================================
       
       Header/footer loading is NON-FATAL.

       Page 02B must remain usable even if the global component service
       encounters a loading failure.
       ========================================================================= */

    async function loadGlobalComponents(){

        verifyComponentMounts();


        if(
            !window.CTM_COMPONENTS ||
            typeof window.CTM_COMPONENTS.load !==
                'function'
        ){

            console.warn(
                'CTM PATH™ Page 02B: global component loader unavailable.'
            );

            return false;

        }


        try{

            console.info(
                'CTM PATH™ Page 02B: loading global components...'
            );


            const result =
                await window.CTM_COMPONENTS.load();


            console.info(
                'CTM PATH™ Page 02B: global components ready.',
                result || null
            );


            return true;

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B: global component loading failed.',
                error
            );


            /*
             * IMPORTANT:
             *
             * Component failure must not destroy the assessment.
             */

            return false;

        }

    }


    /* =========================================================================
       09. DEPENDENCY VERIFICATION
       ========================================================================= */

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


            setPageState(
                'dependency-error'
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
       10. DIMENSION CONTRACT VERIFICATION
       ========================================================================= */

    function getDimension(){

        if(
            !window.Page02Data ||
            typeof window.Page02Data.getDimensionById !==
                'function'
        ){

            return null;

        }


        return (
            window.Page02Data.getDimensionById(
                CONFIG.dimensionId
            ) ||
            null
        );

    }


    function verifyDimension(){

        const dimension =
            getDimension();


        if(!dimension){

            console.error(
                'CTM PATH™ Page 02B could not find Wealth™ dimension.'
            );


            setPageState(
                'dimension-error'
            );


            return false;

        }


        if(
            !Array.isArray(
                dimension.indicators
            )
        ){

            console.error(
                'CTM PATH™ Page 02B Wealth™ indicators are not an array.',
                dimension
            );


            setPageState(
                'dimension-error'
            );


            return false;

        }


        if(
            dimension.indicators.length !==
            CONFIG.expectedIndicators
        ){

            console.error(
                'CTM PATH™ Page 02B expected exactly five Wealth™ indicators.',
                {
                    expected:
                        CONFIG.expectedIndicators,

                    received:
                        dimension.indicators.length,

                    dimension:
                        dimension
                }
            );


            setPageState(
                'dimension-error'
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
       11. SCORECARD API VERIFICATION
       ========================================================================= */

    function verifyScorecardAPI(){

        const requiredMethods = [

            'init',
            'restore',
            'requireComplete',
            'complete',
            'getScore',
            'getProgress',
            'validate'

        ];


        const missing =
            requiredMethods.filter(
                function(method){

                    return (
                        typeof window.Page02Scorecard[method] !==
                        'function'
                    );

                }
            );


        if(
            missing.length
        ){

            console.error(
                'CTM PATH™ Page 02B incomplete Page02Scorecard API:',
                missing
            );


            setPageState(
                'scorecard-api-error'
            );


            return false;

        }


        return true;

    }


    /* =========================================================================
       12. NAVIGATION STATE
       ========================================================================= */

    function setNavigationState(
        active
    ){

        navigating =
            !!active;


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
                !!active;

            previousButton.setAttribute(
                'aria-busy',
                active
                    ? 'true'
                    : 'false'
            );

        }


        if(nextButton){

            nextButton.disabled =
                !!active;

            nextButton.setAttribute(
                'aria-busy',
                active
                    ? 'true'
                    : 'false'
            );

        }


        const page =
            getPageRoot();

        if(page){

            page.setAttribute(
                'aria-busy',
                active
                    ? 'true'
                    : 'false'
            );

        }

    }


    /* =========================================================================
       13. PREVIOUS NAVIGATION
       ========================================================================= */

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


        setPageState(
            'leaving-previous'
        );


        console.info(
            'CTM PATH™ Page 02B → Page 02A'
        );


        window.location.href =
            CONFIG.previousPage;

    }


    /* =========================================================================
       14. VALIDATION FEEDBACK
       ========================================================================= */

    function getProgress(){

        if(
            !window.Page02Scorecard ||
            typeof window.Page02Scorecard.getProgress !==
                'function'
        ){

            return null;

        }


        try{

            return (
                window.Page02Scorecard.getProgress() ||
                null
            );

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B could not read progress.',
                error
            );

            return null;

        }

    }


    function announceValidationFailure(){

        const progress =
            getProgress();


        const message =
            getElement(
                DOM_IDS.message
            );


        if(!message){

            return;

        }


        let text =
            'Please complete all five Wealth™ indicators before continuing.';


        if(
            progress &&
            Number.isFinite(progress.answered) &&
            Number.isFinite(progress.total)
        ){

            text =
                'Please complete all ' +
                progress.total +
                ' Wealth™ indicators. ' +
                progress.answered +
                ' of ' +
                progress.total +
                ' completed.';

        }


        message.textContent =
            text;


        message.setAttribute(
            'role',
            'alert'
        );


        message.classList.add(
            'is-visible'
        );

    }


    /* =========================================================================
       15. NEXT NAVIGATION
       =========================================================================
       
       CRITICAL SEQUENCE:
       
           1. Validate 5 / 5
           2. Complete Wealth™
           3. Set Dimension 02
           4. Navigate to Page 02C
       ========================================================================= */

    function goNext(
        event
    ){

        if(event){

            event.preventDefault();

        }


        if(navigating){

            return;

        }


        if(
            !window.Page02Scorecard
        ){

            console.error(
                'CTM PATH™ Page 02B cannot continue: scorecard unavailable.'
            );

            return;

        }


        /* ---------------------------------------------------------------------
           VALIDATE
           --------------------------------------------------------------------- */

        let valid =
            false;


        try{

            valid =
                !!window.Page02Scorecard.requireComplete();

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B validation failed.',
                error
            );


            return;

        }


        if(!valid){

            announceValidationFailure();

            setCompletionState(
                false
            );

            setPageState(
                'incomplete'
            );


            return;

        }


        /* ---------------------------------------------------------------------
           COMPLETE DIMENSION
           --------------------------------------------------------------------- */

        let completed =
            false;


        try{

            completed =
                !!window.Page02Scorecard.complete();

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B could not complete Wealth™.',
                error
            );


            return;

        }


        if(!completed){

            console.error(
                'CTM PATH™ Page 02B completion returned false.'
            );


            setPageState(
                'completion-error'
            );


            return;

        }


        setCompletionState(
            true
        );


        /* ---------------------------------------------------------------------
           SET NEXT DIMENSION
           --------------------------------------------------------------------- */

        let nextDimensionSet =
            false;


        try{

            nextDimensionSet =
                !!window.Page02Session.setCurrentDimension(
                    CONFIG.nextDimensionId
                );

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B could not set next dimension.',
                error
            );


            return;

        }


        if(!nextDimensionSet){

            console.error(
                'CTM PATH™ Page 02B could not set next dimension:',
                CONFIG.nextDimensionId
            );


            setPageState(
                'transition-error'
            );


            return;

        }


        /* ---------------------------------------------------------------------
           NAVIGATE
           --------------------------------------------------------------------- */

        setNavigationState(
            true
        );


        setPageState(
            'leaving-next'
        );


        const score =
            getScore();


        const progress =
            getProgress();


        console.info(
            'CTM PATH™ Wealth™ complete.',
            {

                dimension:
                    CONFIG.dimensionId,

                score:
                    score,

                progress:
                    progress,

                nextDimension:
                    CONFIG.nextDimensionId,

                nextPage:
                    CONFIG.nextPage

            }
        );


        window.location.href =
            CONFIG.nextPage;

    }


    /* =========================================================================
       16. PREVIOUS BUTTON BINDING
       ========================================================================= */

    function bindPreviousButton(){

        if(previousListenerBound){

            return;

        }


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


        previousListenerBound =
            true;

    }


    /* =========================================================================
       17. NEXT BUTTON BINDING
       ========================================================================= */

    function bindNextButton(){

        if(nextListenerBound){

            return;

        }


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


        nextListenerBound =
            true;

    }


    /* =========================================================================
       18. KEYBOARD NAVIGATION
       
       Ctrl/Cmd + Enter → Next
       
       Validation is NEVER bypassed.
       ========================================================================= */

    function bindKeyboardNavigation(){

        if(keyboardListenerBound){

            return;

        }


        document.addEventListener(
            'keydown',
            function(event){

                if(
                    event.key !==
                    CONFIG.keyboardShortcut
                ){

                    return;

                }


                if(
                    !event.ctrlKey &&
                    !event.metaKey
                ){

                    return;

                }


                /*
                 * Do not interfere with text-entry controls.
                 */

                const target =
                    event.target;


                if(
                    target &&
                    (
                        target.tagName === 'INPUT' ||
                        target.tagName === 'TEXTAREA' ||
                        target.tagName === 'SELECT'
                    )
                ){

                    return;

                }


                event.preventDefault();


                goNext();

            }
        );


        keyboardListenerBound =
            true;

    }


    /* =========================================================================
       19. ANSWER EVENT
       =========================================================================
       
       Page02Scorecard owns scoring.
       
       Page02B only observes progress so it can update page-level completion
       presentation.
       ========================================================================= */

    function bindAnswerEvents(){

        if(answerListenerBound){

            return;

        }


        document.addEventListener(
            'ctm:page02-answer',
            function(event){

                const detail =
                    event &&
                    event.detail
                        ? event.detail
                        : null;


                if(!detail){

                    return;

                }


                if(
                    detail.dimensionId !==
                    CONFIG.dimensionId
                ){

                    return;

                }


                const progress =
                    detail.progress ||
                    getProgress();


                if(!progress){

                    return;

                }


                const complete =
                    !!progress.complete;


                setCompletionState(
                    complete
                );


                if(complete){

                    setPageState(
                        'complete'
                    );


                    console.info(
                        'CTM PATH™ Wealth™: 5 / 5 indicators answered.',
                        {

                            score:
                                progress.score,

                            maximumScore:
                                progress.maximumScore

                        }
                    );

                }
                else{

                    setPageState(
                        'in-progress'
                    );

                }

            }
        );


        answerListenerBound =
            true;

    }


    /* =========================================================================
       20. SCORECARD INITIALIZATION
       ========================================================================= */

    function initializeScorecard(){

        try{

            return !!window.Page02Scorecard.init({

                dimensionId:
                    CONFIG.dimensionId

            });

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B scorecard initialization exception.',
                error
            );


            return false;

        }

    }


    /* =========================================================================
       21. RESTORE PAGE STATE
       ========================================================================= */

    function restorePage(){

        try{

            window.Page02Scorecard.restore();

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B restore failed.',
                error
            );


            setPageState(
                'restore-error'
            );


            return false;

        }


        const progress =
            getProgress();


        if(progress){

            setCompletionState(
                !!progress.complete
            );


            setPageState(
                progress.complete
                    ? 'complete'
                    : progress.answered > 0
                        ? 'in-progress'
                        : 'ready'
            );


            console.info(
                'CTM PATH™ Page 02B restored.',
                {

                    dimension:
                        CONFIG.dimensionId,

                    answered:
                        progress.answered,

                    total:
                        progress.total,

                    score:
                        progress.score,

                    maximumScore:
                        progress.maximumScore,

                    complete:
                        !!progress.complete

                }
            );

        }


        return true;

    }


    /* =========================================================================
       22. INITIALIZATION CONTRACT
       ========================================================================= */

    async function init(){

        if(
            initialized ||
            initializing
        ){

            return;

        }


        initializing =
            true;


        setPageState(
            'initializing'
        );


        console.info(
            'CTM PATH™ Page 02B initializing — Wealth™...'
        );


        try{

            /* -----------------------------------------------------------------
               GLOBAL COMPONENTS

               NON-FATAL
               ----------------------------------------------------------------- */

            const componentsReady =
                await loadGlobalComponents();


            if(!componentsReady){

                console.warn(
                    'CTM PATH™ Page 02B continuing without confirmed global components.'
                );

            }


            /* -----------------------------------------------------------------
               DEPENDENCIES
               ----------------------------------------------------------------- */

            if(
                !verifyDependencies()
            ){

                return;

            }


            if(
                !verifyScorecardAPI()
            ){

                return;

            }


            /* -----------------------------------------------------------------
               DIMENSION CONTRACT
               ----------------------------------------------------------------- */

            if(
                !verifyDimension()
            ){

                return;

            }


            /* -----------------------------------------------------------------
               SCORECARD
               ----------------------------------------------------------------- */

            const scorecardReady =
                initializeScorecard();


            if(!scorecardReady){

                console.error(
                    'CTM PATH™ Page 02B scorecard initialization failed.'
                );


                setPageState(
                    'scorecard-error'
                );


                return;

            }


            /* -----------------------------------------------------------------
               NAVIGATION
               ----------------------------------------------------------------- */

            bindPreviousButton();

            bindNextButton();

            bindKeyboardNavigation();

            bindAnswerEvents();


            /* -----------------------------------------------------------------
               RESTORE
               ----------------------------------------------------------------- */

            if(
                !restorePage()
            ){

                return;

            }


            /* -----------------------------------------------------------------
               VIEWPORT
               ----------------------------------------------------------------- */

            scrollToTop();


            /*
             * Focus is intentionally deferred until after the browser has
             * painted the restored page.
             */

            window.requestAnimationFrame(
                function(){

                    focusPageTop();

                }
            );


            /* -----------------------------------------------------------------
               READY
               ----------------------------------------------------------------- */

            initialized =
                true;


            setPageState(
                'ready'
            );


            console.info(
                'CTM PATH™ Page 02B ready.',
                {

                    version:
                        CONFIG.version,

                    dimension:
                        CONFIG.dimensionId,

                    globalComponents:
                        componentsReady,

                    score:
                        getScore(),

                    progress:
                        getProgress()

                }
            );

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B initialization failed.',
                error
            );


            setPageState(
                'initialization-error'
            );

        }
        finally{

            initializing =
                false;

        }

    }


    /* =========================================================================
       23. PUBLIC SCORE API
       ========================================================================= */

    function getScore(){

        if(
            !window.Page02Scorecard ||
            typeof window.Page02Scorecard.getScore !==
                'function'
        ){

            return 0;

        }


        try{

            return (
                window.Page02Scorecard.getScore() ||
                0
            );

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B getScore failed.',
                error
            );


            return 0;

        }

    }


    /* =========================================================================
       24. PUBLIC PROGRESS API
       ========================================================================= */

    function publicGetProgress(){

        return getProgress();

    }


    /* =========================================================================
       25. PUBLIC VALIDATION API
       ========================================================================= */

    function validate(){

        if(
            !window.Page02Scorecard ||
            typeof window.Page02Scorecard.validate !==
                'function'
        ){

            return false;

        }


        try{

            return !!window.Page02Scorecard.validate();

        }
        catch(error){

            console.error(
                'CTM PATH™ Page 02B validation API failed.',
                error
            );


            return false;

        }

    }


    /* =========================================================================
       26. PUBLIC RESET / QA STATE
       ========================================================================= */

    function getState(){

        const progress =
            getProgress();


        return {

            version:
                CONFIG.version,

            dimensionId:
                CONFIG.dimensionId,

            nextDimensionId:
                CONFIG.nextDimensionId,

            previousPage:
                CONFIG.previousPage,

            nextPage:
                CONFIG.nextPage,

            initialized:
                initialized,

            initializing:
                initializing,

            navigating:
                navigating,

            progress:
                progress,

            score:
                getScore()

        };

    }


    /* =========================================================================
       27. DOM READY
       ========================================================================= */

    function boot(){

        init();

    }


    if(
        document.readyState ===
        'loading'
    ){

        document.addEventListener(
            'DOMContentLoaded',
            boot,
            {
                once:
                    true
            }
        );

    }
    else{

        boot();

    }


    /* =========================================================================
       28. PUBLIC CONTROLLER
       
       Available during QA:
       
           Page02B.init()
           Page02B.goNext()
           Page02B.goPrevious()
           Page02B.getScore()
           Page02B.getProgress()
           Page02B.validate()
           Page02B.getState()
           Page02B.loadGlobalComponents()
       ========================================================================= */

    window.Page02B = {

        version:
            CONFIG.version,

        dimensionId:
            CONFIG.dimensionId,

        nextDimensionId:
            CONFIG.nextDimensionId,

        init:
            init,

        loadGlobalComponents:
            loadGlobalComponents,

        goPrevious:
            goPrevious,

        goNext:
            goNext,

        getScore:
            getScore,

        getProgress:
            publicGetProgress,

        validate:
            validate,

        getState:
            getState,

        isInitialized:
            function(){

                return initialized;

            },

        isInitializing:
            function(){

                return initializing;

            },

        isNavigating:
            function(){

                return navigating;

            }

    };


    /* =========================================================================
       END
       
       CTM PATH™ MILLIONAIRES™
       
       PAGE 02B — WEALTH™
       
       RESPONSIBILITY CHAIN:
       
           component-loader.js
                  ↓
           page02-data.js
                  ↓
           page02-session.js
                  ↓
           page02-scorecard.js
                  ↓
           page02b.js
       
       PAGE 02B JOURNEY:
       
           page02a.html
                  ↓
           WEALTH™
           5 INDICATORS
                  ↓
           5 / 5 COMPLETE
                  ↓
           complete("wealth")
                  ↓
           setCurrentDimension("incomeCashFlow")
                  ↓
           page02c.html
       
       IMPORTANT:
       
       The controller never calculates scores.
       The controller never renders questions.
       The controller never owns answer persistence.
       
       The scorecard engine remains the single source of truth.
       
       ========================================================================= */

})(window, document);

