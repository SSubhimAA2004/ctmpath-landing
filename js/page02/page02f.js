
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02f.js
 *
 * VERSION:
 * 4.0
 *
 * PAGE:
 * PAGE 02F — DIMENSION 05
 *
 * DIMENSION:
 * PROTECTION & CONTRIBUTION™
 *
 * INDICATORS:
 * 21–25
 *
 * STATUS:
 * FINAL DIMENSION CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * This controller owns ONLY the lifecycle of the final Page 02 dimension.
 *
 * FLOW:
 *
 *      page02e.html
 *           ↓
 *      page02f.html
 *           ↓
 *      DIMENSION 05
 *      Indicators 21–25
 *           ↓
 *      Validate Dimension 05
 *           ↓
 *      Complete Dimension 05
 *           ↓
 *      Validate Complete 25-Indicator Scorecard
 *           ↓
 *      Build Final Discovery Payload
 *           ↓
 *      CTM_API.saveDiscovery()
 *           ↓
 *      Store Result
 *           ↓
 *      Mark Page 02 Complete
 *           ↓
 *      page03.html
 *
 * =============================================================================
 *
 * SHARED RESPONSIBILITIES
 *
 * page02-data.js
 *      → frozen dimension / indicator / range definitions
 *
 * page02-session.js
 *      → answers / journey state / KYC / client ID / result state
 *
 * page02-scorecard.js
 *      → rendering / selection / scoring / validation / live score
 *
 * api.js
 *      → CTM_API.saveDiscovery()
 *
 * =============================================================================
 *
 * THIS FILE DOES:
 *
 *      ✓ initializes Dimension 05
 *      ✓ verifies Dimension 05 contract
 *      ✓ binds Previous
 *      ✓ binds final Continue button
 *      ✓ restores saved answers
 *      ✓ validates Indicators 21–25
 *      ✓ completes Dimension 05
 *      ✓ verifies all 25 answers
 *      ✓ verifies final total score
 *      ✓ builds final discovery payload
 *      ✓ submits through CTM_API.saveDiscovery()
 *      ✓ prevents duplicate submission
 *      ✓ stores result locally
 *      ✓ marks journey complete
 *      ✓ navigates to Page 03
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ define indicators
 *      ✗ define ranges
 *      ✗ render scorecards
 *      ✗ implement option scoring
 *      ✗ calculate individual option scores
 *      ✗ modify backend logic
 *
 * =============================================================================
 */

'use strict';


(function(window, document){

    /* =========================================================================
       01. CONFIGURATION
       ========================================================================= */

    const CONFIG = {

        dimensionId:
            'protectionContribution',

        previousDimensionId:
            'lifestyleFreedom',

        previousPage:
            'page02e.html',

        nextPage:
            'page03.html',

        expectedDimensionIndicators:
            5,

        expectedTotalIndicators:
            25,

        expectedDimensions:
            5,

        minimumIndicatorScore:
            1,

        maximumIndicatorScore:
            4,

        minimumTotalScore:
            25,

        maximumTotalScore:
            100,

        assessmentType:
            'MILLIONAIRE_LIFESTYLE_SCORECARD',

        assessmentVersion:
            '3.0',

        resultStorageKey:
            'ctm_page02_result'

    };


    /* =========================================================================
       02. DOM CONTRACT
       ========================================================================= */

    const DOM_IDS = {

        previousButton:
            'previousButton',

        nextButton:
            'nextButton',

        message:
            'dimensionMessage'

    };


    /* =========================================================================
       03. CONTROLLER STATE
       ========================================================================= */

    let initialized =
        false;

    let navigating =
        false;

    let submitting =
        false;


    /* =========================================================================
       04. DOM HELPER
       ========================================================================= */

    function getElement(id){

        return (
            document.getElementById(id) ||
            null
        );

    }


    /* =========================================================================
       05. SCROLL TO TOP
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


    /* =========================================================================
       06. DEPENDENCY VERIFICATION
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
            !window.CTM_API
        ){

            missing.push(
                'CTM_API'
            );

        }


        if(
            missing.length
        ){

            console.error(
                'CTM PATH™ Page 02F missing dependencies:',
                missing
            );

            return false;

        }


        return true;

    }


    /* =========================================================================
       07. FINAL DIMENSION CONTRACT
       ========================================================================= */

    function verifyDimension(){

        const dimension =
            window.Page02Data.getDimensionById(
                CONFIG.dimensionId
            );


        if(
            !dimension
        ){

            console.error(
                'CTM PATH™ Page 02F could not find Dimension 05:',
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
                'CTM PATH™ Page 02F Dimension 05 has no indicators:',
                dimension
            );

            return false;

        }


        if(
            dimension.indicators.length !==
            CONFIG.expectedDimensionIndicators
        ){

            console.error(
                'CTM PATH™ Page 02F expected five indicators:',
                {
                    expected:
                        CONFIG.expectedDimensionIndicators,

                    actual:
                        dimension.indicators.length
                }
            );

            return false;

        }


        return true;

    }


    /* =========================================================================
       08. NAVIGATION STATE
       ========================================================================= */

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


        if(
            previousButton
        ){

            previousButton.disabled =
                navigating;

            previousButton.setAttribute(
                'aria-busy',
                navigating
                    ? 'true'
                    : 'false'
            );

        }


        if(
            nextButton
        ){

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


    /* =========================================================================
       09. SUBMISSION STATE
       ========================================================================= */

    function setSubmittingState(
        active
    ){

        submitting =
            Boolean(active);


        setNavigationState(
            active
        );


        const nextButton =
            getElement(
                DOM_IDS.nextButton
            );


        if(
            !nextButton
        ){

            return;

        }


        const primaryText =
            nextButton.querySelector(
                '.dimension-button-primary-text'
            );


        const secondaryText =
            nextButton.querySelector(
                '.dimension-button-secondary-text'
            );


        if(
            active
        ){

            if(
                primaryText
            ){

                primaryText.textContent =
                    'சேமிக்கப்படுகிறது...';

            }


            if(
                secondaryText
            ){

                secondaryText.textContent =
                    'CALCULATING YOUR SCORE';

            }

        }
        else{

            if(
                primaryText
            ){

                primaryText.textContent =
                    'என் முடிவைக் காண்க →';

            }


            if(
                secondaryText
            ){

                secondaryText.textContent =
                    'VIEW MY RESULT';

            }

        }

    }


    /* =========================================================================
       10. ERROR MESSAGE
       ========================================================================= */

    function showError(
        message
    ){

        if(
            window.Page02Scorecard &&
            typeof window.Page02Scorecard.showMessage ===
                'function'
        ){

            window.Page02Scorecard.showMessage(
                message
            );

            return;

        }


        const element =
            getElement(
                DOM_IDS.message
            );


        if(
            !element
        ){

            return;

        }


        element.textContent =
            message;


        element.hidden =
            false;


        element.classList.add(
            'is-visible'
        );

    }


    /* =========================================================================
       11. HIDE ERROR
       ========================================================================= */

    function hideError(){

        if(
            window.Page02Scorecard &&
            typeof window.Page02Scorecard.hideMessage ===
                'function'
        ){

            window.Page02Scorecard.hideMessage();

            return;

        }


        const element =
            getElement(
                DOM_IDS.message
            );


        if(
            !element
        ){

            return;

        }


        element.textContent =
            '';


        element.hidden =
            true;


        element.classList.remove(
            'is-visible'
        );

    }


    /* =========================================================================
       12. GO PREVIOUS
       ========================================================================= */

    function goPrevious(
        event
    ){

        if(
            event
        ){

            event.preventDefault();

        }


        if(
            navigating ||
            submitting
        ){

            return;

        }


        const result =
            window.Page02Session.setCurrentDimension(
                CONFIG.previousDimensionId
            );


        if(
            result === false
        ){

            console.warn(
                'CTM PATH™ Page 02F could not set previous dimension:',
                CONFIG.previousDimensionId
            );

        }


        setNavigationState(
            true
        );


        window.location.href =
            CONFIG.previousPage;

    }


    /* =========================================================================
       13. GET ALL DIMENSIONS
       ========================================================================= */

    function getAllDimensions(){

        const dimensions =
            window.Page02Data.DIMENSIONS;


        if(
            !Array.isArray(
                dimensions
            )
        ){

            return [];

        }


        return dimensions;

    }


    /* =========================================================================
       14. GET ALL INDICATORS
       ========================================================================= */

    function getAllIndicators(){

        const dimensions =
            getAllDimensions();


        const indicators =
            [];


        dimensions.forEach(
            function(dimension){

                if(
                    !dimension ||
                    !Array.isArray(
                        dimension.indicators
                    )
                ){

                    return;

                }


                dimension.indicators.forEach(
                    function(indicator){

                        indicators.push({

                            dimensionId:
                                dimension.id,

                            dimensionTamil:
                                dimension.tamil ||
                                '',

                            dimensionEnglish:
                                dimension.english ||
                                '',

                            indicator:
                                indicator

                        });

                    }
                );

            }
        );


        return indicators;

    }


    /* =========================================================================
       15. GET ANSWER
       ========================================================================= */

    function getAnswer(
        indicator
    ){

        if(
            !indicator ||
            !indicator.id
        ){

            return null;

        }


        if(
            typeof window.Page02Session.getAnswer !==
            'function'
        ){

            return null;

        }


        return (
            window.Page02Session.getAnswer(
                indicator.id
            ) ||
            null
        );

    }


    /* =========================================================================
       16. NORMALIZE ANSWER
       ========================================================================= */

    function normalizeAnswer(
        record
    ){

        if(
            !record ||
            !record.indicator
        ){

            return null;

        }


        const indicator =
            record.indicator;


        const answer =
            getAnswer(
                indicator
            );


        if(
            !answer
        ){

            return null;

        }


        const score =
            Number(
                answer.score
            );


        if(
            !Number.isFinite(
                score
            )
        ){

            return null;

        }


        if(
            score <
                CONFIG.minimumIndicatorScore ||
            score >
                CONFIG.maximumIndicatorScore
        ){

            return null;

        }


        let selectedOption =
            null;


        if(
            Array.isArray(
                indicator.options
            )
        ){

            selectedOption =
                indicator.options.find(
                    function(option){

                        return (
                            Number(
                                option.score
                            ) ===
                            score
                        );

                    }
                ) ||
                null;

        }


        return {

            indicatorId:
                indicator.id,

            indicatorNumber:
                Number(
                    indicator.number
                ),

            dimensionId:
                record.dimensionId,

            dimensionTamil:
                record.dimensionTamil,

            dimensionEnglish:
                record.dimensionEnglish,

            indicatorTamil:
                indicator.tamil ||
                indicator.titleTamil ||
                indicator.labelTamil ||
                '',

            indicatorEnglish:
                indicator.english ||
                indicator.titleEnglish ||
                indicator.labelEnglish ||
                indicator.name ||
                '',

            ideal:
                indicator.ideal ||
                '',

            score:
                score,

            selectedRange:
                selectedOption
                    ? (
                        selectedOption.label ||
                        ''
                    )
                    : ''

        };

    }


    /* =========================================================================
       17. GET ALL VALID ANSWERS
       ========================================================================= */

    function getAllAnswers(){

        return (
            getAllIndicators()
                .map(
                    normalizeAnswer
                )
                .filter(
                    function(answer){

                        return (
                            answer !== null
                        );

                    }
                )
                .sort(
                    function(a, b){

                        return (
                            a.indicatorNumber -
                            b.indicatorNumber
                        );

                    }
                )
        );

    }


    /* =========================================================================
       18. VALIDATE COMPLETE 25-INDICATOR SCORECARD
       ========================================================================= */

    function validateCompleteScorecard(){

        const indicators =
            getAllIndicators();


        if(
            indicators.length !==
            CONFIG.expectedTotalIndicators
        ){

            return {

                valid:
                    false,

                reason:
                    'indicator-count',

                expected:
                    CONFIG.expectedTotalIndicators,

                actual:
                    indicators.length

            };

        }


        const missing =
            [];


        const invalid =
            [];


        let totalScore =
            0;


        indicators.forEach(
            function(record){

                const indicator =
                    record.indicator;


                const answer =
                    getAnswer(
                        indicator
                    );


                if(
                    !answer
                ){

                    missing.push(
                        indicator.id
                    );

                    return;

                }


                const score =
                    Number(
                        answer.score
                    );


                if(
                    !Number.isFinite(
                        score
                    ) ||
                    score <
                        CONFIG.minimumIndicatorScore ||
                    score >
                        CONFIG.maximumIndicatorScore
                ){

                    invalid.push(
                        indicator.id
                    );

                    return;

                }


                totalScore +=
                    score;

            }
        );


        if(
            missing.length
        ){

            return {

                valid:
                    false,

                reason:
                    'missing-answers',

                missing:
                    missing,

                invalid:
                    invalid,

                totalScore:
                    totalScore

            };

        }


        if(
            invalid.length
        ){

            return {

                valid:
                    false,

                reason:
                    'invalid-answers',

                missing:
                    missing,

                invalid:
                    invalid,

                totalScore:
                    totalScore

            };

        }


        if(
            totalScore <
                CONFIG.minimumTotalScore ||
            totalScore >
                CONFIG.maximumTotalScore
        ){

            return {

                valid:
                    false,

                reason:
                    'invalid-total',

                totalScore:
                    totalScore

            };

        }


        return {

            valid:
                true,

            answered:
                indicators.length,

            total:
                CONFIG.expectedTotalIndicators,

            totalScore:
                totalScore,

            maximumScore:
                CONFIG.maximumTotalScore,

            percentage:
                Math.round(
                    (
                        totalScore /
                        CONFIG.maximumTotalScore
                    ) *
                    100
                )

        };

    }


    /* =========================================================================
       19. DIMENSION RESULTS
       ========================================================================= */

    function getDimensionResults(){

        return (
            getAllDimensions()
                .map(
                    function(dimension){

                        let score =
                            0;


                        if(
                            typeof window.Page02Session.getDimensionScore ===
                            'function'
                        ){

                            score =
                                Number(
                                    window.Page02Session
                                        .getDimensionScore(
                                            dimension.id
                                        )
                                ) || 0;

                        }


                        const maximumScore =
                            Array.isArray(
                                dimension.indicators
                            )
                                ? (
                                    dimension.indicators.length *
                                    CONFIG.maximumIndicatorScore
                                )
                                : 20;


                        return {

                            dimensionId:
                                dimension.id,

                            tamil:
                                dimension.tamil ||
                                '',

                            english:
                                dimension.english ||
                                '',

                            score:
                                score,

                            maximumScore:
                                maximumScore,

                            percentage:
                                maximumScore
                                    ? Math.round(
                                        (
                                            score /
                                            maximumScore
                                        ) *
                                        100
                                    )
                                    : 0

                        };

                    }
                )
        );

    }


    /* =========================================================================
       20. GET KYC
       ========================================================================= */

    function getKyc(){

        if(
            typeof window.Page02Session.getKyc ===
            'function'
        ){

            return (
                window.Page02Session.getKyc() ||
                {}
            );

        }


        if(
            typeof window.Page02Session.getKYC ===
            'function'
        ){

            return (
                window.Page02Session.getKYC() ||
                {}
            );

        }


        return {};

    }


    /* =========================================================================
       21. GET CLIENT ID
       ========================================================================= */

    function getClientId(){

        if(
            typeof window.Page02Session.getClientId ===
            'function'
        ){

            return (
                window.Page02Session.getClientId() ||
                ''
            );

        }


        const kyc =
            getKyc();


        return (
            kyc.clientId ||
            kyc.clientID ||
            ''
        );

    }


    /* =========================================================================
       22. BUILD FINAL DISCOVERY PAYLOAD
       ========================================================================= */

    function buildDiscoveryPayload(){

        const validation =
            validateCompleteScorecard();


        if(
            !validation.valid
        ){

            return null;

        }


        const answers =
            getAllAnswers();


        const dimensions =
            getDimensionResults();


        const kyc =
            getKyc();


        return {

            clientId:
                getClientId(),

            kyc:
                kyc,

            assessmentType:
                CONFIG.assessmentType,

            assessmentVersion:
                CONFIG.assessmentVersion,

            indicatorCount:
                CONFIG.expectedTotalIndicators,

            dimensionCount:
                CONFIG.expectedDimensions,

            answers:
                answers,

            dimensions:
                dimensions,

            totalScore:
                validation.totalScore,

            maximumScore:
                CONFIG.maximumTotalScore,

            percentage:
                validation.percentage,

            completedAt:
                new Date().toISOString()

        };

    }


    /* =========================================================================
       23. SAVE RESULT LOCALLY
       ========================================================================= */

    function saveResultLocally(
        payload,
        backendResponse
    ){

        const result = {

            clientId:
                payload.clientId,

            totalScore:
                payload.totalScore,

            maximumScore:
                payload.maximumScore,

            percentage:
                payload.percentage,

            dimensions:
                payload.dimensions,

            answers:
                payload.answers,

            completedAt:
                payload.completedAt,

            backend:
                backendResponse ||
                null

        };


        try{

            sessionStorage.setItem(

                CONFIG.resultStorageKey,

                JSON.stringify(
                    result
                )

            );

        }
        catch(error){

            console.warn(
                'CTM PATH™ could not store Page 02 result in sessionStorage.',
                error
            );

        }


        if(
            typeof window.Page02Session.setResult ===
            'function'
        ){

            window.Page02Session.setResult(
                result
            );

        }


        return result;

    }


    /* =========================================================================
       24. MARK JOURNEY COMPLETE
       ========================================================================= */

    function markJourneyComplete(){

        if(
            typeof window.Page02Session.completeScorecard ===
            'function'
        ){

            window.Page02Session.completeScorecard();

        }


        if(
            typeof window.Page02Session.setCompleted ===
            'function'
        ){

            window.Page02Session.setCompleted(
                true
            );

        }

    }


    /* =========================================================================
       25. NORMALIZE BACKEND RESPONSE
       ========================================================================= */

    function normalizeBackendResponse(
        response
    ){

        if(
            response ===
            null ||
            response ===
            undefined
        ){

            return {

                success:
                    true,

                data:
                    response

            };

        }


        if(
            response ===
            false
        ){

            return {

                success:
                    false,

                data:
                    response

            };

        }


        if(
            typeof response ===
            'object'
        ){

            if(
                response.success ===
                false
            ){

                return {

                    success:
                        false,

                    data:
                        response

                };

            }


            if(
                response.ok ===
                false
            ){

                return {

                    success:
                        false,

                    data:
                        response

                };

            }

        }


        return {

            success:
                true,

            data:
                response

        };

    }


    /* =========================================================================
       26. SAVE DISCOVERY
       ========================================================================= */

    async function saveDiscovery(
        payload
    ){

        if(
            !window.CTM_API ||
            typeof window.CTM_API.saveDiscovery !==
            'function'
        ){

            throw new Error(
                'CTM_API.saveDiscovery() is unavailable.'
            );

        }


        const response =
            await window.CTM_API.saveDiscovery(
                payload
            );


        const normalized =
            normalizeBackendResponse(
                response
            );


        if(
            !normalized.success
        ){

            const backendMessage =
                (
                    normalized.data &&
                    (
                        normalized.data.message ||
                        normalized.data.error
                    )
                ) ||
                'Discovery save failed.';


            throw new Error(
                backendMessage
            );

        }


        return normalized.data;

    }


    /* =========================================================================
       27. NAVIGATE TO PAGE 03
       ========================================================================= */

    function navigateToResult(){

        setNavigationState(
            true
        );


        window.location.href =
            CONFIG.nextPage;

    }


    /* =========================================================================
       28. FINAL SUBMISSION
       ========================================================================= */

    async function submitScorecard(
        event
    ){

        if(
            event
        ){

            event.preventDefault();

        }


        if(
            submitting ||
            navigating
        ){

            return;

        }


        hideError();


        /* ---------------------------------------------------------------------
           STEP 1 — VALIDATE DIMENSION 05
           --------------------------------------------------------------------- */

        const dimensionValid =
            window.Page02Scorecard.requireComplete();


        if(
            !dimensionValid
        ){

            return;

        }


        /* ---------------------------------------------------------------------
           STEP 2 — COMPLETE DIMENSION 05
           --------------------------------------------------------------------- */

        const dimensionCompleted =
            window.Page02Scorecard.complete();


        if(
            !dimensionCompleted
        ){

            showError(
                'இறுதி பரிமாணத்தை நிறைவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
            );

            return;

        }


        /* ---------------------------------------------------------------------
           STEP 3 — VALIDATE ALL 25 INDICATORS
           --------------------------------------------------------------------- */

        const validation =
            validateCompleteScorecard();


        if(
            !validation.valid
        ){

            console.error(
                'CTM PATH™ final scorecard validation failed:',
                validation
            );


            if(
                validation.reason ===
                'missing-answers'
            ){

                showError(
                    '25 அளவுகோல்களிலும் பதில் அளித்த பிறகே உங்கள் இறுதி முடிவைக் கணக்கிட முடியும்.'
                );

            }
            else{

                showError(
                    'உங்கள் மதிப்பெண்களை சரிபார்க்க முடியவில்லை. முந்தைய பரிமாணங்களையும் மீண்டும் சரிபார்க்கவும்.'
                );

            }


            return;

        }


        /* ---------------------------------------------------------------------
           STEP 4 — BUILD PAYLOAD
           --------------------------------------------------------------------- */

        const payload =
            buildDiscoveryPayload();


        if(
            !payload
        ){

            showError(
                'உங்கள் Scorecard தரவை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
            );

            return;

        }


        /* ---------------------------------------------------------------------
           STEP 5 — CLIENT ID
           --------------------------------------------------------------------- */

        if(
            !payload.clientId
        ){

            console.error(
                'CTM PATH™ final discovery payload has no clientId.',
                payload
            );


            showError(
                'உங்கள் பதிவு தகவலை கண்டுபிடிக்க முடியவில்லை. தயவுசெய்து KYC பகுதியிலிருந்து மீண்டும் தொடங்கவும்.'
            );

            return;

        }


        /* ---------------------------------------------------------------------
           STEP 6 — SUBMIT
           --------------------------------------------------------------------- */

        setSubmittingState(
            true
        );


        try{

            console.info(
                'CTM PATH™ submitting final Millionaire Lifestyle Scorecard:',
                {

                    clientId:
                        payload.clientId,

                    indicators:
                        payload.answers.length,

                    totalScore:
                        payload.totalScore,

                    maximumScore:
                        payload.maximumScore,

                    percentage:
                        payload.percentage

                }
            );


            const response =
                await saveDiscovery(
                    payload
                );


            /* -----------------------------------------------------------------
               STEP 7 — STORE RESULT
               ----------------------------------------------------------------- */

            saveResultLocally(
                payload,
                response
            );


            /* -----------------------------------------------------------------
               STEP 8 — COMPLETE JOURNEY
               ----------------------------------------------------------------- */

            markJourneyComplete();


            console.info(
                'CTM PATH™ Millionaire Lifestyle Scorecard complete.',
                {

                    clientId:
                        payload.clientId,

                    score:
                        payload.totalScore,

                    maximumScore:
                        payload.maximumScore,

                    percentage:
                        payload.percentage,

                    dimensions:
                        payload.dimensions

                }
            );


            /* -----------------------------------------------------------------
               STEP 9 — PAGE 03
               ----------------------------------------------------------------- */

            navigateToResult();

        }
        catch(error){

            console.error(
                'CTM PATH™ final discovery submission failed:',
                error
            );


            setSubmittingState(
                false
            );


            showError(
                'உங்கள் முடிவை சேமிக்க முடியவில்லை. உங்கள் பதில்கள் பாதுகாப்பாக உள்ளன. மீண்டும் முயற்சிக்கவும்.'
            );

        }

    }


    /* =========================================================================
       29. BIND PREVIOUS
       ========================================================================= */

    function bindPreviousButton(){

        const button =
            getElement(
                DOM_IDS.previousButton
            );


        if(
            !button
        ){

            console.warn(
                'CTM PATH™ Page 02F: #previousButton not found.'
            );

            return false;

        }


        button.addEventListener(
            'click',
            goPrevious
        );


        return true;

    }


    /* =========================================================================
       30. BIND FINAL BUTTON
       ========================================================================= */

    function bindNextButton(){

        const button =
            getElement(
                DOM_IDS.nextButton
            );


        if(
            !button
        ){

            console.error(
                'CTM PATH™ Page 02F: #nextButton not found.'
            );

            return false;

        }


        button.addEventListener(
            'click',
            submitScorecard
        );


        return true;

    }


    /* =========================================================================
       31. KEYBOARD SUPPORT
       ========================================================================= */

    function bindKeyboardNavigation(){

        document.addEventListener(
            'keydown',
            function(event){

                if(
                    event.key !==
                    'Enter'
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


                submitScorecard();

            }
        );

    }


    /* =========================================================================
       32. ANSWER EVENTS
       ========================================================================= */

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
                        'CTM PATH™ Dimension 05: all five indicators answered.',
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


    /* =========================================================================
       33. RESTORE PAGE
       ========================================================================= */

    function restorePage(){

        const restored =
            window.Page02Scorecard.restore();


        if(
            restored ===
            false
        ){

            console.warn(
                'CTM PATH™ Page 02F could not restore scorecard state.'
            );

        }


        const progress =
            window.Page02Scorecard.getProgress();


        console.info(
            'CTM PATH™ Page 02F restored:',
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


    /* =========================================================================
       34. INITIALIZE SCORECARD
       ========================================================================= */

    function initializeScorecard(){

        return (
            window.Page02Scorecard.init({

                dimensionId:
                    CONFIG.dimensionId

            })
        );

    }


    /* =========================================================================
       35. INITIALIZE CONTROLLER
       ========================================================================= */

    function init(){

        if(
            initialized
        ){

            return;

        }


        console.info(
            'CTM PATH™ Page 02F initializing — Dimension 05 / Protection & Contribution™...'
        );


        /* ---------------------------------------------------------------------
           DEPENDENCIES
           --------------------------------------------------------------------- */

        if(
            !verifyDependencies()
        ){

            return;

        }


        /* ---------------------------------------------------------------------
           DIMENSION CONTRACT
           --------------------------------------------------------------------- */

        if(
            !verifyDimension()
        ){

            return;

        }


        /* ---------------------------------------------------------------------
           SHARED SCORECARD
           --------------------------------------------------------------------- */

        const scorecardReady =
            initializeScorecard();


        if(
            !scorecardReady
        ){

            console.error(
                'CTM PATH™ Page 02F scorecard initialization failed.'
            );

            return;

        }


        /* ---------------------------------------------------------------------
           CONTROLS
           --------------------------------------------------------------------- */

        bindPreviousButton();

        bindNextButton();

        bindKeyboardNavigation();

        bindAnswerEvents();


        /* ---------------------------------------------------------------------
           RESTORE
           --------------------------------------------------------------------- */

        restorePage();


        /* ---------------------------------------------------------------------
           VIEWPORT
           --------------------------------------------------------------------- */

        scrollToTop();


        /* ---------------------------------------------------------------------
           READY
           --------------------------------------------------------------------- */

        initialized =
            true;


        console.info(
            'CTM PATH™ Page 02F ready.',
            {

                dimension:
                    CONFIG.dimensionId,

                dimensionScore:
                    window.Page02Scorecard.getScore(),

                dimensionProgress:
                    window.Page02Scorecard.getProgress(),

                totalAnswered:
                    getAllAnswers().length,

                expectedAnswers:
                    CONFIG.expectedTotalIndicators

            }
        );

    }


    /* =========================================================================
       36. DOM READY
       ========================================================================= */

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


    /* =========================================================================
       37. PUBLIC CONTROLLER
       ========================================================================= */

    window.Page02F = {

        version:
            '4.0',

        dimensionId:
            CONFIG.dimensionId,

        init:
            init,

        goPrevious:
            goPrevious,

        submit:
            submitScorecard,

        validateDimension:
            function(){

                return (
                    window.Page02Scorecard
                        .validate()
                );

            },

        validateScorecard:
            validateCompleteScorecard,

        getAnswers:
            getAllAnswers,

        getDimensions:
            getDimensionResults,

        buildPayload:
            buildDiscoveryPayload,

        getScore:
            function(){

                const validation =
                    validateCompleteScorecard();


                return (
                    validation.valid
                        ? validation.totalScore
                        : 0
                );

            }

    };


    /* =========================================================================
       38. FINAL ARCHITECTURE
       =========================================================================

       PAGE 02A
       KYC
           ↓
       PAGE 02B
       DIMENSION 01
       INDICATORS 01–05
           ↓
       PAGE 02C
       DIMENSION 02
       INDICATORS 06–10
           ↓
       PAGE 02D
       DIMENSION 03
       INDICATORS 11–15
           ↓
       PAGE 02E
       DIMENSION 04
       INDICATORS 16–20
           ↓
       PAGE 02F
       DIMENSION 05
       INDICATORS 21–25
           ↓
       VALIDATE 25 / 25
           ↓
       TOTAL SCORE / 100
           ↓
       BUILD DISCOVERY PAYLOAD
           ↓
       CTM_API.saveDiscovery()
           ↓
       STORE RESULT
           ↓
       COMPLETE PAGE 02
           ↓
       PAGE 03


       SHARED ENGINE:

       page02-data.js
              ↓
       page02-session.js
              ↓
       page02-scorecard.js
              ↓
       page02f.js


       PAGE 02F RESPONSIBILITY:

       FINAL DIMENSION LIFECYCLE
       +
       FINAL SCORECARD HANDOFF


       NO INDICATOR DATA IS CREATED HERE.

       NO RANGE DATA IS CREATED HERE.

       NO SCORECARD RENDERING IS CREATED HERE.

       NO OPTION SCORING ENGINE IS CREATED HERE.

       NO BACKEND LOGIC IS CREATED HERE.

       ========================================================================== */


})(window, document);

