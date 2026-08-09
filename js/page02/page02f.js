
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 *     js/page02/page02f.js
 *
 * VERSION:
 *     5.0 — FINAL RESULT EXPERIENCE
 *
 * PAGE:
 *     PAGE 02F — DIMENSION 05 — PROTECTION & CONTRIBUTION™
 *
 * STATUS:
 *     FINAL DIMENSION CONTROLLER
 *
 * =============================================================================
 *
 * FINAL PAGE 02 FLOW
 *
 *     PAGE 02E
 *          ↓
 *     PAGE 02F
 *          ↓
 *     DIMENSION 05
 *     INDICATORS 21–25
 *          ↓
 *     VALIDATE 5 / 5
 *          ↓
 *     COMPLETE DIMENSION 05
 *          ↓
 *     VALIDATE ALL 25
 *          ↓
 *     BUILD DISCOVERY PAYLOAD
 *          ↓
 *     CTM_API.saveDiscovery()
 *          ↓
 *     STORE RESULT
 *          ↓
 *     SHOW RESULT ON THIS PAGE
 *          ↓
 *     USER CLICKS
 *     CONTINUE TO KALA CHAKRA™
 *          ↓
 *     PAGE 03
 *
 * =============================================================================
 *
 * ARCHITECTURE
 *
 * page02-data.js
 *     ↓
 * page02-session.js
 *     ↓
 * page02-scorecard.js
 *     ↓
 * page02f.js
 *
 * SHARED ENGINE OWNS:
 *
 *     ✓ indicator rendering
 *     ✓ option rendering
 *     ✓ answer selection
 *     ✓ score calculation
 *     ✓ dimension validation
 *     ✓ live dimension score
 *     ✓ answer persistence
 *
 * THIS CONTROLLER OWNS:
 *
 *     ✓ Dimension 05 lifecycle
 *     ✓ progressive scoreboard
 *     ✓ final 25-answer validation
 *     ✓ discovery payload
 *     ✓ backend save
 *     ✓ result persistence
 *     ✓ result presentation
 *     ✓ final Page 03 navigation
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
        'protectionContribution',

    previousDimensionId:
        'lifestyleFreedom',

    previousPage:
        'page02e.html',

    nextPage:
        'page03.html',

    expectedIndicators:
        25,

    expectedDimensions:
        5,

    indicatorsPerDimension:
        5,

    minimumScorePerIndicator:
        1,

    maximumScorePerIndicator:
        4,

    minimumDimensionScore:
        5,

    maximumDimensionScore:
        20,

    minimumTotalScore:
        25,

    maximumTotalScore:
        100,

    assessmentType:
        'MILLIONAIRE_LIFESTYLE_SCORECARD',

    assessmentVersion:
        '3.0',

    localResultKey:
        'ctm_page02_result'

};


/* =============================================================================
 * DOM CONTRACT
 * =============================================================================
 */

const DOM_IDS = {

    previousButton:
        'previousButton',

    nextButton:
        'nextButton',

    resultsContinueButton:
        'page02ResultsContinueButton',

    message:
        'dimensionMessage',

    progressiveScoreboard:
        'page02ProgressiveScoreboard',

    progressiveColumns:
        'page02ProgressiveColumns',

    progressiveGrandTotal:
        'page02ProgressiveGrandTotal',

    dimensionScoreCurrent:
        'dimensionScoreCurrent',

    dimensionScoreTotal:
        'dimensionScoreTotal',

    page02Results:
        'page02Results',

    resultGrandTotal:
        'page02ResultGrandTotal',

    resultWealthScore:
        'page02ResultWealthScore',

    resultIncomeScore:
        'page02ResultIncomeScore',

    resultAssetsScore:
        'page02ResultAssetsScore',

    resultLifestyleScore:
        'page02ResultLifestyleScore',

    resultProtectionScore:
        'page02ResultProtectionScore',

    resultWealthStatus:
        'page02ResultWealthStatus',

    resultIncomeStatus:
        'page02ResultIncomeStatus',

    resultAssetsStatus:
        'page02ResultAssetsStatus',

    resultLifestyleStatus:
        'page02ResultLifestyleStatus',

    resultProtectionStatus:
        'page02ResultProtectionStatus',

    resultLevelNumber:
        'page02ResultLevelNumber',

    resultLevelTamil:
        'page02ResultLevelTamil',

    resultLevelEnglish:
        'page02ResultLevelEnglish',

    resultLevelDescription:
        'page02ResultLevelDescription'

};


/* =============================================================================
 * STATE
 * =============================================================================
 */

let initialized =
    false;

let navigating =
    false;

let submitting =
    false;

let resultVisible =
    false;

let finalPayload =
    null;

let finalResult =
    null;


/* =============================================================================
 * DOM HELPER
 * =============================================================================
 */

function getElement(
    id
){

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
 * SCROLL TO RESULT
 * =============================================================================
 */

function scrollToResult(){

    const result =
        getElement(
            DOM_IDS.page02Results
        );

    if(!result){

        return;

    }


    result.scrollIntoView({

        behavior:
            'smooth',

        block:
            'start'

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

            'CTM PATH™ Page 02F Dimension 05 indicators are invalid.'

        );

        return false;

    }


    if(
        dimension.indicators.length !==
        CONFIG.indicatorsPerDimension
    ){

        console.error(

            'CTM PATH™ Page 02F expected exactly five Dimension 05 indicators.',

            dimension

        );

        return false;

    }


    return true;

}


/* =============================================================================
 * SET NAVIGATION STATE
 * =============================================================================
 */

function setNavigationState(
    active
){

    navigating =
        Boolean(
            active
        );


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
 * SET SUBMITTING STATE
 * =============================================================================
 */

function setSubmittingState(
    active
){

    submitting =
        Boolean(
            active
        );


    setNavigationState(
        active
    );


    const nextButton =
        getElement(
            DOM_IDS.nextButton
        );


    if(!nextButton){

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


    if(active){

        if(primaryText){

            primaryText.textContent =
                'சேமிக்கப்படுகிறது...';

        }


        if(secondaryText){

            secondaryText.textContent =
                'CALCULATING YOUR SCORE';

        }

    }
    else{

        if(primaryText){

            primaryText.textContent =
                'என் முடிவைக் காண்க →';

        }


        if(secondaryText){

            secondaryText.textContent =
                'VIEW MY RESULT';

        }

    }

}


/* =============================================================================
 * SHOW ERROR
 * =============================================================================
 */

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


    if(!element){

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


/* =============================================================================
 * HIDE ERROR
 * =============================================================================
 */

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


    if(!element){

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


/* =============================================================================
 * GET ALL DIMENSIONS
 * =============================================================================
 */

function getAllDimensions(){

    if(
        !window.Page02Data
    ){

        return [];

    }


    if(
        Array.isArray(
            window.Page02Data.DIMENSIONS
        )
    ){

        return (
            window.Page02Data.DIMENSIONS
        );

    }


    if(
        typeof window.Page02Data.getDimensions ===
            'function'
    ){

        const dimensions =
            window.Page02Data.getDimensions();


        if(
            Array.isArray(
                dimensions
            )
        ){

            return dimensions;

        }

    }


    return [];

}


/* =============================================================================
 * GET DIMENSION SCORE
 *
 * Actual scoring remains owned by Page02Session.
 * =============================================================================
 */

function getDimensionScore(
    dimensionId
){

    if(
        !window.Page02Session ||
        typeof window.Page02Session.getDimensionScore !==
            'function'
    ){

        return 0;

    }


    const score =
        Number(

            window.Page02Session.getDimensionScore(

                dimensionId

            )

        );


    if(
        !Number.isFinite(
            score
        )
    ){

        return 0;

    }


    return Math.max(

        0,

        Math.min(

            CONFIG.maximumDimensionScore,

            score

        )

    );

}


/* =============================================================================
 * GET DIMENSION PROGRESS
 * =============================================================================
 */

function getDimensionProgress(
    dimensionId
){

    if(
        window.Page02Session &&
        typeof window.Page02Session.getDimensionProgress ===
            'function'
    ){

        const progress =

            window.Page02Session.getDimensionProgress(

                dimensionId

            );


        if(progress){

            return progress;

        }

    }


    const dimension =

        window.Page02Data &&
        typeof window.Page02Data.getDimensionById ===
            'function'

            ? window.Page02Data.getDimensionById(

                dimensionId

            )

            : null;


    if(
        !dimension ||
        !Array.isArray(
            dimension.indicators
        )
    ){

        return {

            answered:
                0,

            total:
                CONFIG.indicatorsPerDimension,

            percent:
                0,

            score:
                0,

            maximumScore:
                CONFIG.maximumDimensionScore,

            complete:
                false

        };

    }


    let answered =
        0;


    dimension.indicators.forEach(

        function(
            indicator
        ){

            if(
                window.Page02Session &&
                typeof window.Page02Session.getAnswer ===
                    'function' &&
                window.Page02Session.getAnswer(
                    indicator.id
                )
            ){

                answered +=
                    1;

            }

        }

    );


    const score =
        getDimensionScore(
            dimensionId
        );


    return {

        answered:
            answered,

        total:
            dimension.indicators.length,

        percent:
            dimension.indicators.length

                ? Math.round(

                    (
                        answered /
                        dimension.indicators.length
                    ) *
                    100

                )

                : 0,

        score:
            score,

        maximumScore:
            dimension.indicators.length *
            CONFIG.maximumScorePerIndicator,

        complete:
            answered ===
            dimension.indicators.length

    };

}


/* =============================================================================
 * GET PROGRESSIVE GRAND TOTAL
 *
 * Only dimensions containing answers contribute to the live journey total.
 * =============================================================================
 */

function getProgressiveTotal(){

    const dimensions =
        getAllDimensions();


    return dimensions

        .slice(
            0,
            CONFIG.expectedDimensions
        )

        .reduce(

            function(
                total,
                dimension
            ){

                const progress =
                    getDimensionProgress(
                        dimension.id
                    );


                if(
                    Number(progress.answered) <=
                    0
                ){

                    return total;

                }


                return (

                    total +
                    getDimensionScore(
                        dimension.id
                    )

                );

            },

            0

        );

}


/* =============================================================================
 * GET ANSWERED COUNT
 * =============================================================================
 */

function getDimensionAnsweredCount(
    dimensionId
){

    const progress =
        getDimensionProgress(
            dimensionId
        );


    return Number(
        progress.answered
    ) || 0;

}


/* =============================================================================
 * DIMENSION LABEL — TAMIL
 * =============================================================================
 */

function getDimensionTamil(
    dimension
){

    if(
        dimension &&
        dimension.tamil
    ){

        return String(
            dimension.tamil
        );

    }


    if(
        dimension &&
        dimension.titleTamil
    ){

        return String(
            dimension.titleTamil
        );

    }


    return '';

}


/* =============================================================================
 * DIMENSION LABEL — ENGLISH
 * =============================================================================
 */

function getDimensionEnglish(
    dimension
){

    if(
        dimension &&
        dimension.english
    ){

        return String(
            dimension.english
        );

    }


    if(
        dimension &&
        dimension.titleEnglish
    ){

        return String(
            dimension.titleEnglish
        );

    }


    if(
        dimension &&
        dimension.name
    ){

        return String(
            dimension.name
        );

    }


    return 'Dimension';

}


/* =============================================================================
 * HTML ESCAPE
 * =============================================================================
 */

function escapeHtml(
    value
){

    return String(
        value === undefined ||
        value === null
            ? ''
            : value
    )

        .replace(
            /&/g,
            '&amp;'
        )

        .replace(
            /</g,
            '&lt;'
        )

        .replace(
            />/g,
            '&gt;'
        )

        .replace(
            /"/g,
            '&quot;'
        )

        .replace(
            /'/g,
            '&#039;'
        );

}


/* =============================================================================
 * GET DIMENSION SCORE PANEL
 * =============================================================================
 */

function getDimensionScorePanel(){

    return document.querySelector(

        '.page02f .dimension-score-panel'

    );

}


/* =============================================================================
 * GET NAVIGATION
 * =============================================================================
 */

function getDimensionNavigation(){

    return document.querySelector(

        '.page02f .dimension-navigation'

    );

}


/* =============================================================================
 * RELOCATE LIVE DIMENSION SCORE
 *
 * Final presentation:
 *
 *     SCORECARD
 *          ↓
 *     PROGRESSIVE SCOREBOARD
 *          ↓
 *     LIVE DIMENSION SCORE
 *          ↓
 *     NAVIGATION
 *
 * The existing score panel is moved without changing its markup.
 * =============================================================================
 */

function relocateDimensionScore(){

    const scorePanel =
        getDimensionScorePanel();


    const navigation =
        getDimensionNavigation();


    if(
        !scorePanel ||
        !navigation
    ){

        return false;

    }


    navigation.parentNode.insertBefore(

        scorePanel,

        navigation

    );


    scorePanel.classList.add(

        'page02f-bottom-dimension-score'

    );


    return true;

}


/* =============================================================================
 * CREATE PROGRESSIVE SCOREBOARD
 *
 * Frozen shared scoreboard namespace:
 *
 *     page02b-progressive-*
 *
 * This intentionally matches Page 02B / 02C / shared architecture.
 * =============================================================================
 */

function createProgressiveScoreboard(){

    let board =
        getElement(
            DOM_IDS.progressiveScoreboard
        );


    if(board){

        return board;

    }


    const navigation =
        getDimensionNavigation();


    if(!navigation){

        console.warn(

            'CTM PATH™ Page 02F: navigation mount unavailable for scoreboard.'

        );

        return null;

    }


    board =
        document.createElement(
            'section'
        );


    board.id =
        DOM_IDS.progressiveScoreboard;


    board.className =
        'page02b-progressive-scoreboard';


    board.setAttribute(

        'aria-label',

        'Progressive Millionaire Lifestyle Scorecard'

    );


    board.innerHTML = `

        <div class="page02b-progressive-scoreboard-header">

            <div class="page02b-progressive-scoreboard-heading">

                <span class="page02b-progressive-scoreboard-kicker">
                    YOUR JOURNEY SO FAR™
                </span>

                <span class="page02b-progressive-scoreboard-title">
                    Millionaire Lifestyle Score
                </span>

            </div>


            <div
                class="page02b-progressive-scoreboard-total"
                aria-live="polite"
            >

                <span class="page02b-progressive-total-label">
                    GRAND TOTAL
                </span>

                <span class="page02b-progressive-total-value">

                    <strong id="page02ProgressiveGrandTotal">
                        0
                    </strong>

                    <span>
                        / 100
                    </span>

                </span>

            </div>

        </div>


        <div
            id="page02ProgressiveColumns"
            class="page02b-progressive-columns"
        ></div>

    `;


    navigation.parentNode.insertBefore(

        board,

        navigation

    );


    return board;

}


/* =============================================================================
 * RENDER PROGRESSIVE SCOREBOARD
 * =============================================================================
 */

function renderProgressiveScoreboard(){

    const board =
        createProgressiveScoreboard();


    if(!board){

        return false;

    }


    const dimensions =
        getAllDimensions().slice(

            0,

            CONFIG.expectedDimensions

        );


    const columns =
        getElement(

            DOM_IDS.progressiveColumns

        );


    const grandTotal =
        getElement(

            DOM_IDS.progressiveGrandTotal

        );


    if(!columns){

        console.error(

            'CTM PATH™ Page 02F: progressive scoreboard columns mount not found.'

        );

        return false;

    }


    columns.innerHTML =
        '';


    let progressiveTotal =
        0;


    dimensions.forEach(

        function(
            dimension,
            index
        ){

            const progress =
                getDimensionProgress(
                    dimension.id
                );


            const answered =
                Number(
                    progress.answered
                ) || 0;


            const score =
                getDimensionScore(
                    dimension.id
                );


            const isCurrent =
                dimension.id ===
                CONFIG.dimensionId;


            const isAnswered =
                answered > 0;


            const isComplete =
                answered >=
                CONFIG.indicatorsPerDimension;


            if(isAnswered){

                progressiveTotal +=
                    score;

            }


            const column =
                document.createElement(
                    'article'
                );


            column.className =
                'page02b-progressive-column';


            if(isCurrent){

                column.classList.add(
                    'is-current'
                );

            }


            if(isAnswered){

                column.classList.add(
                    'is-started'
                );

            }


            if(isComplete){

                column.classList.add(
                    'is-complete'
                );

            }


            const number =
                String(
                    index + 1
                ).padStart(

                    2,

                    '0'

                );


            const tamil =
                getDimensionTamil(
                    dimension
                );


            const english =
                getDimensionEnglish(
                    dimension
                );


            const displayScore =
                isAnswered

                    ? String(
                        score
                    )

                    : '—';


            const progressLabel =

                isComplete

                    ? 'COMPLETE'

                    : (

                        isAnswered

                            ? (
                                String(answered) +
                                ' / 5'
                            )

                            : 'NOT STARTED'

                    );


            column.innerHTML = `

                <div class="page02b-progressive-column-number">
                    ${number}
                </div>


                <div class="page02b-progressive-column-name">

                    <span class="page02b-progressive-column-tamil">
                        ${escapeHtml(tamil)}
                    </span>

                    <span class="page02b-progressive-column-english">
                        ${escapeHtml(english)}
                    </span>

                </div>


                <div class="page02b-progressive-column-score">

                    <strong>
                        ${displayScore}
                    </strong>

                    <span>
                        / 20
                    </span>

                </div>


                <div class="page02b-progressive-column-progress">
                    ${escapeHtml(progressLabel)}
                </div>

            `;


            columns.appendChild(
                column
            );

        }

    );


    progressiveTotal =
        Math.max(

            0,

            Math.min(

                CONFIG.maximumTotalScore,

                progressiveTotal

            )

        );


    if(grandTotal){

        grandTotal.textContent =
            String(
                progressiveTotal
            );

    }


    board.dataset.total =
        String(
            progressiveTotal
        );


    board.dataset.dimension =
        CONFIG.dimensionId;


    board.dataset.completed =

        dimensions.length ===
            CONFIG.expectedDimensions &&

        dimensions.every(

            function(
                dimension
            ){

                return (

                    getDimensionAnsweredCount(
                        dimension.id
                    ) >=
                    CONFIG.indicatorsPerDimension

                );

            }

        )

            ? 'true'

            : 'false';


    return true;

}


/* =============================================================================
 * UPDATE LIVE DIMENSION SCORE
 * =============================================================================
 */

function updateBottomDimensionScore(){

    const current =
        getElement(

            DOM_IDS.dimensionScoreCurrent

        );


    const total =
        getElement(

            DOM_IDS.dimensionScoreTotal

        );


    let score =
        0;


    if(
        window.Page02Scorecard &&
        typeof window.Page02Scorecard.getScore ===
            'function'
    ){

        score =
            Number(
                window.Page02Scorecard.getScore()
            ) || 0;

    }
    else{

        score =
            getDimensionScore(
                CONFIG.dimensionId
            );

    }


    if(current){

        current.textContent =
            String(
                score
            );

    }


    if(total){

        total.textContent =
            '/ 20';

    }

}


/* =============================================================================
 * REFRESH PROGRESSIVE SCORE DISPLAY
 * =============================================================================
 */

function refreshProgressiveScoreDisplay(){

    updateBottomDimensionScore();

    renderProgressiveScoreboard();

}


/* =============================================================================
 * GET KYC
 *
 * KYC remains owned by Page02Session.
 * =============================================================================
 */

function getKyc(){

    if(
        window.Page02Session &&
        typeof window.Page02Session.getKyc ===
            'function'
    ){

        return (

            window.Page02Session.getKyc() ||

            {}

        );

    }


    if(
        window.Page02Session &&
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


/* =============================================================================
 * GET CLIENT ID
 * =============================================================================
 */

function getClientId(){

    if(
        window.Page02Session &&
        typeof window.Page02Session.getClientId ===
            'function'
    ){

        const clientId =
            window.Page02Session.getClientId();


        if(clientId){

            return String(
                clientId
            );

        }

    }


    const kyc =
        getKyc();


    if(
        kyc.clientId
    ){

        return String(
            kyc.clientId
        );

    }


    if(
        kyc.clientID
    ){

        return String(
            kyc.clientID
        );

    }


    if(
        kyc.ClientID
    ){

        return String(
            kyc.ClientID
        );

    }


    return '';

}


/* =============================================================================
 * GET INDICATOR NUMBER
 * =============================================================================
 */

function getIndicatorNumber(
    indicator,
    fallback
){

    if(
        indicator &&
        Number.isFinite(
            Number(
                indicator.number
            )
        )
    ){

        return Number(
            indicator.number
        );

    }


    return fallback;

}


/* =============================================================================
 * GET INDICATOR TAMIL
 * =============================================================================
 */

function getIndicatorTamil(
    indicator
){

    if(
        indicator &&
        indicator.tamil
    ){

        return String(
            indicator.tamil
        );

    }


    if(
        indicator &&
        indicator.titleTamil
    ){

        return String(
            indicator.titleTamil
        );

    }


    if(
        indicator &&
        indicator.labelTamil
    ){

        return String(
            indicator.labelTamil
        );

    }


    return '';

}


/* =============================================================================
 * GET INDICATOR ENGLISH
 * =============================================================================
 */

function getIndicatorEnglish(
    indicator
){

    if(
        indicator &&
        indicator.english
    ){

        return String(
            indicator.english
        );

    }


    if(
        indicator &&
        indicator.titleEnglish
    ){

        return String(
            indicator.titleEnglish
        );

    }


    if(
        indicator &&
        indicator.labelEnglish
    ){

        return String(
            indicator.labelEnglish
        );

    }


    if(
        indicator &&
        indicator.name
    ){

        return String(
            indicator.name
        );

    }


    return '';

}


/* =============================================================================
 * GET SELECTED OPTION
 * =============================================================================
 */

function getSelectedOption(
    indicator,
    score
){

    if(
        !indicator ||
        !Array.isArray(
            indicator.options
        )
    ){

        return null;

    }


    return (

        indicator.options.find(

            function(
                option
            ){

                return (

                    Number(
                        option.score
                    ) ===
                    Number(
                        score
                    )

                );

            }

        ) ||

        null

    );

}


/* =============================================================================
 * NORMALIZE ANSWER
 * =============================================================================
 */

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


    if(
        !window.Page02Session ||
        typeof window.Page02Session.getAnswer !==
            'function'
    ){

        return null;

    }


    const answer =
        window.Page02Session.getAnswer(
            indicator.id
        );


    if(!answer){

        return null;

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
            CONFIG.minimumScorePerIndicator ||
        score >
            CONFIG.maximumScorePerIndicator
    ){

        return null;

    }


    const selectedOption =
        getSelectedOption(
            indicator,
            score
        );


    return {

        indicatorId:
            indicator.id,

        indicatorNumber:
            getIndicatorNumber(
                indicator,
                0
            ),

        dimensionId:
            record.dimensionId,

        dimensionTamil:
            record.dimensionTamil,

        dimensionEnglish:
            record.dimensionEnglish,

        indicatorTamil:
            getIndicatorTamil(
                indicator
            ),

        indicatorEnglish:
            getIndicatorEnglish(
                indicator
            ),

        ideal:
            indicator.ideal ||
            indicator.benchmark ||
            '',

        score:
            score,

        selectedRange:
            selectedOption

                ? (
                    selectedOption.label ||
                    selectedOption.range ||
                    selectedOption.text ||
                    ''
                )

                : '',

        optionIndex:
            selectedOption

                ? (
                    Number(
                        selectedOption.index
                    ) ||
                    Number(
                        selectedOption.optionIndex
                    ) ||
                    0
                )

                : 0

    };

}


/* =============================================================================
 * GET ALL INDICATORS
 *
 * Canonical source:
 *
 *     page02-data.js
 *
 * No indicator definitions are duplicated here.
 * =============================================================================
 */

function getAllIndicators(){

    const dimensions =
        getAllDimensions();


    if(
        !Array.isArray(
            dimensions
        )
    ){

        return [];

    }


    const indicators =
        [];


    dimensions.forEach(

        function(
            dimension
        ){

            if(
                !dimension ||
                !Array.isArray(
                    dimension.indicators
                )
            ){

                return;

            }


            dimension.indicators.forEach(

                function(
                    indicator
                ){

                    indicators.push({

                        dimensionId:
                            dimension.id,

                        dimensionTamil:
                            getDimensionTamil(
                                dimension
                            ),

                        dimensionEnglish:
                            getDimensionEnglish(
                                dimension
                            ),

                        indicator:
                            indicator

                    });

                }

            );

        }

    );


    return indicators;

}


/* =============================================================================
 * GET ALL ANSWERS
 * =============================================================================
 */

function getAllAnswers(){

    return (

        getAllIndicators()

            .map(
                normalizeAnswer
            )

            .filter(

                function(
                    answer
                ){

                    return (
                        answer !==
                        null
                    );

                }

            )

            .sort(

                function(
                    a,
                    b
                ){

                    return (

                        a.indicatorNumber -
                        b.indicatorNumber

                    );

                }

            )

    );

}


/* =============================================================================
 * VALIDATE COMPLETE SCORECARD
 *
 * Required:
 *
 *     25 indicators
 *     25 valid answers
 *     score 1–4 for every indicator
 *     total 25–100
 * =============================================================================
 */

function validateCompleteScorecard(){

    const indicators =
        getAllIndicators();


    if(
        indicators.length !==
        CONFIG.expectedIndicators
    ){

        return {

            valid:
                false,

            reason:
                'indicator-count',

            expected:
                CONFIG.expectedIndicators,

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

        function(
            record
        ){

            const indicator =
                record.indicator;


            const answer =
                window.Page02Session.getAnswer(

                    indicator.id

                );


            if(!answer){

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
                    CONFIG.minimumScorePerIndicator ||
                score >
                    CONFIG.maximumScorePerIndicator
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
            CONFIG.expectedIndicators,

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


/* =============================================================================
 * GET DIMENSION RESULTS
 *
 * Dimension score calculation remains owned by Page02Session.
 * =============================================================================
 */

function getDimensionResults(){

    return getAllDimensions()

        .slice(

            0,

            CONFIG.expectedDimensions

        )

        .map(

            function(
                dimension,
                index
            ){

                const progress =
                    getDimensionProgress(
                        dimension.id
                    );


                const maximumScore =
                    Array.isArray(
                        dimension.indicators
                    )

                        ? (

                            dimension.indicators.length *
                            CONFIG.maximumScorePerIndicator

                        )

                        : CONFIG.maximumDimensionScore;


                const score =
                    getDimensionScore(
                        dimension.id
                    );


                const answered =
                    Number(
                        progress.answered
                    ) || 0;


                const complete =
                    answered >=
                    (
                        Array.isArray(
                            dimension.indicators
                        )

                            ? dimension.indicators.length

                            : CONFIG.indicatorsPerDimension

                    );


                return {

                    dimensionId:
                        dimension.id,

                    number:
                        Number(
                            dimension.number
                        ) ||
                        index + 1,

                    tamil:
                        getDimensionTamil(
                            dimension
                        ),

                    english:
                        getDimensionEnglish(
                            dimension
                        ),

                    score:
                        score,

                    maximumScore:
                        maximumScore,

                    answered:
                        answered,

                    total:
                        Array.isArray(
                            dimension.indicators
                        )

                            ? dimension.indicators.length

                            : CONFIG.indicatorsPerDimension,

                    percentage:
                        maximumScore

                            ? Math.round(

                                (
                                    score /
                                    maximumScore

                                ) *

                                100

                            )

                            : 0,

                    complete:
                        complete

                };

            }

        );

}


/* =============================================================================
 * GET SCORE BAND
 *
 * Uses the established Page 02 result bands:
 *
 *     25–49  EMERGING™
 *     50–74  PROGRESSING™
 *     75–100 ADVANCING™
 * =============================================================================
 */

function getResultBand(
    percentage
){

    const score =
        Number(
            percentage
        );


    if(
        score >=
        75
    ){

        return {

            key:
                'ADVANCING',

            tamil:
                'மேம்பட்ட நிலை',

            english:
                'ADVANCING™',

            minimum:
                75,

            maximum:
                100

        };

    }


    if(
        score >=
        50
    ){

        return {

            key:
                'PROGRESSING',

            tamil:
                'முன்னேற்றம்',

            english:
                'PROGRESSING™',

            minimum:
                50,

            maximum:
                74

        };

    }


    return {

        key:
            'EMERGING',

        tamil:
            'உருவாகும் நிலை',

        english:
            'EMERGING™',

        minimum:
            25,

        maximum:
            49

    };

}


/* =============================================================================
 * BUILD DISCOVERY PAYLOAD
 *
 * Flat identity fields are included because the backend save layer stores
 * discovery records by field/header matching.
 *
 * The normalized answers and dimension summaries remain structured arrays.
 * =============================================================================
 */

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


    const clientId =
        getClientId();


    const resultBand =
        getResultBand(

            validation.percentage

        );


    return {

        clientId:
            clientId,

        ClientID:
            clientId,

        fullName:
            kyc.fullName ||
            kyc.name ||
            '',

        mobile:
            kyc.mobile ||
            kyc.whatsapp ||
            '',

        email:
            kyc.email ||
            '',

        district:
            kyc.district ||
            '',

        state:
            kyc.state ||
            '',

        source:
            kyc.source ||
            kyc.referralSource ||
            'CTM PATH Millionaire Journey',

        referralSource:
            kyc.referralSource ||
            kyc.source ||
            'CTM PATH Millionaire Journey',

        language:
            kyc.language ||
            'ta',

        device:
            kyc.device ||
            getDeviceType(),

        assessment:
            'MIDDLE CLASS TO MILLIONAIRE LIFESTYLE SCORECARD™',

        assessmentType:
            CONFIG.assessmentType,

        assessmentVersion:
            CONFIG.assessmentVersion,

        indicatorCount:
            CONFIG.expectedIndicators,

        totalIndicators:
            CONFIG.expectedIndicators,

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

        resultBand:
            resultBand.key,

        resultBandTamil:
            resultBand.tamil,

        resultBandEnglish:
            resultBand.english,

        completedAt:
            new Date().toISOString()

    };

}


/* =============================================================================
 * DEVICE TYPE
 * =============================================================================
 */

function getDeviceType(){

    const width =
        window.innerWidth ||
        0;


    if(
        width <=
        768
    ){

        return 'mobile';

    }


    if(
        width <=
        1024
    ){

        return 'tablet';

    }


    return 'desktop';

}


/* =============================================================================
 * SAVE RESULT LOCALLY
 *
 * This creates the immediate result source used by the next journey stage.
 * =============================================================================
 */

function saveResultLocally(
    payload,
    response
){

    const result = {

        clientId:
            payload.clientId,

        fullName:
            payload.fullName,

        mobile:
            payload.mobile,

        email:
            payload.email,

        totalScore:
            payload.totalScore,

        maximumScore:
            payload.maximumScore,

        percentage:
            payload.percentage,

        resultBand:
            payload.resultBand,

        resultBandTamil:
            payload.resultBandTamil,

        resultBandEnglish:
            payload.resultBandEnglish,

        dimensions:
            payload.dimensions,

        answers:
            payload.answers,

        completedAt:
            payload.completedAt,

        backend:
            response ||
            null

    };


    try{

        sessionStorage.setItem(

            CONFIG.localResultKey,

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
        window.Page02Session &&
        typeof window.Page02Session.setResult ===
            'function'
    ){

        window.Page02Session.setResult(
            result
        );

    }


    return result;

}


/* =============================================================================
 * GET STORED RESULT
 * =============================================================================
 */

function getStoredResult(){

    if(
        window.Page02Session &&
        typeof window.Page02Session.getResult ===
            'function'
    ){

        const result =
            window.Page02Session.getResult();


        if(result){

            return result;

        }

    }


    try{

        const raw =
            sessionStorage.getItem(

                CONFIG.localResultKey

            );


        if(!raw){

            return null;

        }


        const parsed =
            JSON.parse(
                raw
            );


        return parsed || null;

    }
    catch(error){

        console.warn(

            'CTM PATH™ could not restore Page 02 result.',

            error

        );

        return null;

    }

}


/* =============================================================================
 * MARK JOURNEY COMPLETE
 * =============================================================================
 */

function markJourneyComplete(){

    if(
        window.Page02Session &&
        typeof window.Page02Session.completeScorecard ===
            'function'
    ){

        window.Page02Session.completeScorecard();

    }


    if(
        window.Page02Session &&
        typeof window.Page02Session.setCompleted ===
            'function'
    ){

        window.Page02Session.setCompleted(
            true
        );

    }


    if(
        window.Page02Session &&
        typeof window.Page02Session.setCurrentDimension ===
            'function'
    ){

        window.Page02Session.setCurrentDimension(
            CONFIG.dimensionId
        );

    }

}


/* =============================================================================
 * NORMALIZE BACKEND RESPONSE
 * =============================================================================
 */

function normalizeBackendResponse(
    response
){

    if(
        response ===
        undefined ||
        response ===
        null
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


/* =============================================================================
 * SAVE DISCOVERY
 * =============================================================================
 */

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


/* =============================================================================
 * RESULT CARD STATUS
 * =============================================================================
 */

function getDimensionStatus(
    dimensionResult
){

    if(!dimensionResult){

        return {

            tamil:
                'தொடங்கவில்லை',

            english:
                'NOT STARTED'

        };

    }


    if(
        dimensionResult.complete
    ){

        return {

            tamil:
                'முடிந்தது',

            english:
                'COMPLETE'

        };

    }


    if(
        Number(
            dimensionResult.answered
        ) > 0
    ){

        return {

            tamil:
                'முன்னேற்றத்தில்',

            english:
                'IN PROGRESS'

        };

    }


    return {

        tamil:
            'தொடங்கவில்லை',

        english:
            'NOT STARTED'

    };

}


/* =============================================================================
 * SET RESULT CARD
 * =============================================================================
 */

function setResultCard(
    scoreId,
    statusId,
    result
){

    const scoreElement =
        getElement(
            scoreId
        );


    const statusElement =
        getElement(
            statusId
        );


    if(scoreElement){

        scoreElement.textContent =

            String(
                Number(
                    result.score
                ) || 0
            );

    }


    if(statusElement){

        const status =
            getDimensionStatus(
                result
            );


        statusElement.textContent =
            status.english;


        statusElement.setAttribute(

            'data-status-tamil',

            status.tamil

        );

    }

}


/* =============================================================================
 * GET DIMENSION RESULT BY ID
 * =============================================================================
 */

function findDimensionResult(
    dimensions,
    id
){

    return (

        dimensions.find(

            function(
                dimension
            ){

                return (
                    dimension.dimensionId ===
                    id
                );

            }

        ) ||

        {

            dimensionId:
                id,

            score:
                0,

            maximumScore:
                CONFIG.maximumDimensionScore,

            answered:
                0,

            total:
                CONFIG.indicatorsPerDimension,

            percentage:
                0,

            complete:
                false

        }

    );

}


/* =============================================================================
 * RENDER RESULT LEVEL
 *
 * Established final result bands:
 *
 *     EMERGING™
 *     PROGRESSING™
 *     ADVANCING™
 * =============================================================================
 */

function renderResultLevel(
    result
){

    const band =
        getResultBand(
            result.percentage
        );


    const levelNumber =
        getElement(
            DOM_IDS.resultLevelNumber
        );


    const levelTamil =
        getElement(
            DOM_IDS.resultLevelTamil
        );


    const levelEnglish =
        getElement(
            DOM_IDS.resultLevelEnglish
        );


    const description =
        getElement(
            DOM_IDS.resultLevelDescription
        );


    let number =
        '01';


    if(
        band.key ===
        'PROGRESSING'
    ){

        number =
            '02';

    }


    if(
        band.key ===
        'ADVANCING'
    ){

        number =
            '03';

    }


    if(levelNumber){

        levelNumber.textContent =
            number;

    }


    if(levelTamil){

        levelTamil.textContent =
            band.tamil;

    }


    if(levelEnglish){

        levelEnglish.textContent =
            band.english;

    }


    if(description){

        if(
            band.key ===
            'ADVANCING'
        ){

            description.textContent =
                'உங்கள் வாழ்க்கையின் பல முக்கிய பரிமாணங்களில் வலுவான முன்னேற்ற அடித்தளம் உருவாகியுள்ளது.';

        }
        else if(
            band.key ===
            'PROGRESSING'
        ){

            description.textContent =
                'உங்கள் வாழ்க்கையில் முன்னேற்றம் உருவாகிக் கொண்டிருக்கிறது. அடுத்த நிலைக்கு செல்ல சில முக்கிய பரிமாணங்களை வலுப்படுத்த வேண்டும்.';

        }
        else{

            description.textContent =
                'உங்கள் தற்போதைய நிலை ஒரு தெளிவான தொடக்கப் புள்ளியை காட்டுகிறது. இங்கிருந்து உங்கள் PATH உருவாகத் தொடங்குகிறது.';

        }

    }

}


/* =============================================================================
 * RENDER FINAL RESULT
 * =============================================================================
 */

function renderFinalResult(
    result
){

    if(!result){

        return false;

    }


    finalResult =
        result;


    const dimensions =
        Array.isArray(
            result.dimensions
        )

            ? result.dimensions

            : [];


    const grandTotal =
        Number(
            result.totalScore
        ) || 0;


    const maximumScore =
        Number(
            result.maximumScore
        ) ||
        CONFIG.maximumTotalScore;


    const percentage =
        Number(
            result.percentage
        ) || 0;


    const grandTotalElement =
        getElement(
            DOM_IDS.resultGrandTotal
        );


    if(grandTotalElement){

        grandTotalElement.textContent =
            String(
                grandTotal
            );

    }


    const wealth =
        findDimensionResult(

            dimensions,

            'wealth'

        );


    const income =
        findDimensionResult(

            dimensions,

            'incomeCashFlow'

        );


    const assets =
        findDimensionResult(

            dimensions,

            'assets'

        );


    const lifestyle =
        findDimensionResult(

            dimensions,

            'lifestyleFreedom'

        );


    const protection =
        findDimensionResult(

            dimensions,

            'protectionContribution'

        );


    setResultCard(

        DOM_IDS.resultWealthScore,

        DOM_IDS.resultWealthStatus,

        wealth

    );


    setResultCard(

        DOM_IDS.resultIncomeScore,

        DOM_IDS.resultIncomeStatus,

        income

    );


    setResultCard(

        DOM_IDS.resultAssetsScore,

        DOM_IDS.resultAssetsStatus,

        assets

    );


    setResultCard(

        DOM_IDS.resultLifestyleScore,

        DOM_IDS.resultLifestyleStatus,

        lifestyle

    );


    setResultCard(

        DOM_IDS.resultProtectionScore,

        DOM_IDS.resultProtectionStatus,

        protection

    );


    renderResultLevel({

        totalScore:
            grandTotal,

        maximumScore:
            maximumScore,

        percentage:
            percentage

    });


    const resultSection =
        getElement(
            DOM_IDS.page02Results
        );


    if(!resultSection){

        console.error(

            'CTM PATH™ Page 02F: #page02Results not found.'

        );

        return false;

    }


    resultSection.hidden =
        false;


    resultSection.removeAttribute(
        'hidden'
    );


    resultSection.dataset.score =
        String(
            grandTotal
        );


    resultSection.dataset.percentage =
        String(
            percentage
        );


    resultSection.dataset.resultBand =
        getResultBand(
            percentage
        ).key;


    resultVisible =
        true;


    const nextButton =
        getElement(
            DOM_IDS.nextButton
        );


    if(nextButton){

        nextButton.hidden =
            true;

    }


    setNavigationState(
        false
    );


    return true;

}


/* =============================================================================
 * SHOW RESULT
 * =============================================================================
 */

function showFinalResult(
    result,
    shouldScroll
){

    const rendered =
        renderFinalResult(
            result
        );


    if(
        rendered &&
        shouldScroll
    ){

        window.setTimeout(

            function(){

                scrollToResult();

            },

            80

        );

    }


    return rendered;

}


/* =============================================================================
 * RESTORE STORED RESULT
 * =============================================================================
 */

function restoreStoredResult(){

    const result =
        getStoredResult();


    if(!result){

        return false;

    }


    if(
        !Number.isFinite(
            Number(
                result.totalScore
            )
        )
    ){

        return false;

    }


    if(
        !Array.isArray(
            result.dimensions
        )
    ){

        return false;

    }


    if(
        result.dimensions.length <
        CONFIG.expectedDimensions
    ){

        return false;

    }


    console.info(

        'CTM PATH™ Page 02F restoring stored final result.',

        {

            clientId:
                result.clientId,

            totalScore:
                result.totalScore

        }

    );


    return showFinalResult(

        result,

        false

    );

}


/* =============================================================================
 * COMPLETE DIMENSION 05
 * =============================================================================
 */

function completeFinalDimension(){

    if(
        !window.Page02Scorecard ||
        typeof window.Page02Scorecard.complete !==
            'function'
    ){

        showError(

            'Scorecard engine is unavailable. Please reload the journey.'

        );

        return false;

    }


    return Boolean(

        window.Page02Scorecard.complete()

    );

}


/* =============================================================================
 * GO PREVIOUS
 * =============================================================================
 */

function goPrevious(
    event
){

    if(event){

        event.preventDefault();

    }


    if(
        navigating ||
        submitting ||
        resultVisible
    ){

        return;

    }


    if(
        window.Page02Session &&
        typeof window.Page02Session.setCurrentDimension ===
            'function'
    ){

        window.Page02Session.setCurrentDimension(

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
 * SUBMIT SCORECARD
 *
 * This no longer navigates directly to Page 03.
 *
 * It reveals the final result on Page 02F.
 * =============================================================================
 */

async function submitScorecard(
    event
){

    if(event){

        event.preventDefault();

    }


    if(
        submitting ||
        navigating
    ){

        return;

    }


    if(resultVisible){

        scrollToResult();

        return;

    }


    hideError();


    refreshProgressiveScoreDisplay();


    /* -------------------------------------------------------------------------
     * 1. VALIDATE DIMENSION 05
     * -------------------------------------------------------------------------
     */

    if(
        !window.Page02Scorecard ||
        typeof window.Page02Scorecard.requireComplete !==
            'function'
    ){

        showError(

            'Scorecard validation is unavailable. Please reload the journey.'

        );

        return;

    }


    const dimensionValid =

        window.Page02Scorecard.requireComplete();


    if(
        !dimensionValid
    ){

        return;

    }


    /* -------------------------------------------------------------------------
     * 2. COMPLETE DIMENSION 05
     * -------------------------------------------------------------------------
     */

    const dimensionCompleted =
        completeFinalDimension();


    refreshProgressiveScoreDisplay();


    if(
        !dimensionCompleted
    ){

        showError(

            'இறுதி பரிமாணத்தை நிறைவு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'

        );

        return;

    }


    /* -------------------------------------------------------------------------
     * 3. VALIDATE ALL 25 INDICATORS
     * -------------------------------------------------------------------------
     */

    const validation =
        validateCompleteScorecard();


    if(
        !validation.valid
    ){

        console.error(

            'CTM PATH™ Page 02F final validation failed:',

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

                'உங்கள் மதிப்பெண்களை சரிபார்க்க முடியவில்லை. முந்தைய பரிமாணங்களை மீண்டும் சரிபார்க்கவும்.'

            );

        }


        return;

    }


    /* -------------------------------------------------------------------------
     * 4. BUILD DISCOVERY PAYLOAD
     * -------------------------------------------------------------------------
     */

    const payload =
        buildDiscoveryPayload();


    if(!payload){

        showError(

            'உங்கள் Scorecard தரவை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'

        );

        return;

    }


    /* -------------------------------------------------------------------------
     * 5. REQUIRE CLIENT ID
     * -------------------------------------------------------------------------
     */

    if(
        !payload.clientId
    ){

        console.error(

            'CTM PATH™ Page 02F final discovery payload has no clientId.',

            payload

        );


        showError(

            'உங்கள் பதிவு தகவலை கண்டுபிடிக்க முடியவில்லை. தயவுசெய்து KYC பகுதியிலிருந்து மீண்டும் தொடங்கவும்.'

        );

        return;

    }


    /* -------------------------------------------------------------------------
     * 6. PREPARE SUBMISSION
     * -------------------------------------------------------------------------
     */

    finalPayload =
        payload;


    setSubmittingState(
        true
    );


    try{

        console.info(

            'CTM PATH™ Page 02F submitting final Millionaire Lifestyle Scorecard:',

            {

                clientId:
                    payload.clientId,

                indicators:
                    payload.answers.length,

                dimensions:
                    payload.dimensions.length,

                totalScore:
                    payload.totalScore,

                maximumScore:
                    payload.maximumScore,

                percentage:
                    payload.percentage

            }

        );


        /* ---------------------------------------------------------------------
         * 7. SAVE DISCOVERY
         * ---------------------------------------------------------------------
         */

        const response =
            await saveDiscovery(
                payload
            );


        /* ---------------------------------------------------------------------
         * 8. STORE RESULT
         * ---------------------------------------------------------------------
         */

        const result =
            saveResultLocally(

                payload,

                response

            );


        /* ---------------------------------------------------------------------
         * 9. MARK JOURNEY COMPLETE
         * ---------------------------------------------------------------------
         */

        markJourneyComplete();


        refreshProgressiveScoreDisplay();


        /* ---------------------------------------------------------------------
         * 10. SHOW RESULT ON SAME PAGE
         * ---------------------------------------------------------------------
         */

        setSubmittingState(
            false
        );


        showFinalResult(

            result,

            true

        );


        console.info(

            'CTM PATH™ Page 02F final result ready.',

            {

                clientId:
                    payload.clientId,

                score:
                    payload.totalScore,

                maximumScore:
                    payload.maximumScore,

                percentage:
                    payload.percentage,

                resultBand:
                    payload.resultBand

            }

        );

    }
    catch(error){

        console.error(

            'CTM PATH™ Page 02F final discovery submission failed:',

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


/* =============================================================================
 * CONTINUE TO PAGE 03
 *
 * This is the ONLY navigation from the final result.
 * =============================================================================
 */

function continueToPage03(
    event
){

    if(event){

        event.preventDefault();

    }


    if(
        navigating
    ){

        return;

    }


    const result =
        finalResult ||
        getStoredResult();


    if(!result){

        showError(

            'முதலில் உங்கள் இறுதி முடிவை உருவாக்கவும்.'

        );

        return;

    }


    if(
        !Array.isArray(
            result.dimensions
        ) ||
        result.dimensions.length <
            CONFIG.expectedDimensions
    ){

        showError(

            'உங்கள் இறுதி Scorecard முடிவு முழுமையாக தயாராகவில்லை. மீண்டும் முயற்சிக்கவும்.'

        );

        return;

    }


    setNavigationState(
        true
    );


    scrollToTop();


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


/* =============================================================================
 * BIND FINAL BUTTON
 * =============================================================================
 */

function bindNextButton(){

    const button =
        getElement(
            DOM_IDS.nextButton
        );


    if(!button){

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


/* =============================================================================
 * BIND RESULT CONTINUE BUTTON
 * =============================================================================
 */

function bindResultsContinueButton(){

    const button =
        getElement(
            DOM_IDS.resultsContinueButton
        );


    if(!button){

        console.warn(

            'CTM PATH™ Page 02F: #page02ResultsContinueButton not found.'

        );

        return false;

    }


    button.addEventListener(

        'click',

        continueToPage03

    );


    return true;

}


/* =============================================================================
 * KEYBOARD SUPPORT
 *
 * Ctrl/Cmd + Enter submits the final scorecard.
 * =============================================================================
 */

function bindKeyboardNavigation(){

    document.addEventListener(

        'keydown',

        function(
            event
        ){

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


            if(
                resultVisible
            ){

                continueToPage03();

            }
            else{

                submitScorecard();

            }

        }

    );

}


/* =============================================================================
 * ANSWER EVENTS
 *
 * The shared scorecard engine dispatches:
 *
 *     ctm:page02-answer
 *
 * Page 02F listens only for Dimension 05.
 * =============================================================================
 */

function bindAnswerEvents(){

    document.addEventListener(

        'ctm:page02-answer',

        function(
            event
        ){

            if(
                !event.detail ||
                event.detail.dimensionId !==
                    CONFIG.dimensionId
            ){

                return;

            }


            refreshProgressiveScoreDisplay();


            const progress =
                event.detail.progress;


            if(
                progress &&
                progress.complete
            ){

                console.info(

                    'CTM PATH™ Page 02F Dimension 05 complete.',

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
 * INITIALIZE SCORECARD
 * =============================================================================
 */

function initializeScorecard(){

    if(
        !window.Page02Scorecard ||
        typeof window.Page02Scorecard.init !==
            'function'
    ){

        return false;

    }


    return Boolean(

        window.Page02Scorecard.init({

            dimensionId:
                CONFIG.dimensionId

        })

    );

}


/* =============================================================================
 * RESTORE PAGE SCORECARD
 * =============================================================================
 */

function restorePage(){

    if(
        !window.Page02Scorecard ||
        typeof window.Page02Scorecard.restore !==
            'function'
    ){

        return;

    }


    window.Page02Scorecard.restore();


    if(
        typeof window.Page02Scorecard.getProgress ===
            'function'
    ){

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
                    progress.maximumScore

            }

        );

    }

}


/* =============================================================================
 * RESTORE COMPLETED RESULT
 * =============================================================================
 */

function restoreCompletedResult(){

    const result =
        getStoredResult();


    if(!result){

        return false;

    }


    const validation =
        validateCompleteScorecard();


    if(
        !validation.valid
    ){

        return false;

    }


    if(
        Number(
            result.totalScore
        ) !==
        Number(
            validation.totalScore
        )
    ){

        return false;

    }


    return showFinalResult(

        result,

        false

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

        'CTM PATH™ Page 02F initializing — Final Dimension...'

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

            'CTM PATH™ Page 02F scorecard initialization failed.'

        );

        return;

    }


    /* -------------------------------------------------------------------------
     * CONTROLS
     * -------------------------------------------------------------------------
     */

    bindPreviousButton();

    bindNextButton();

    bindResultsContinueButton();

    bindKeyboardNavigation();

    bindAnswerEvents();


    /* -------------------------------------------------------------------------
     * RESTORE SAVED ANSWERS
     * -------------------------------------------------------------------------
     */

    restorePage();


    /* -------------------------------------------------------------------------
     * FINAL SCOREBOARD
     * -------------------------------------------------------------------------
     */

    relocateDimensionScore();

    refreshProgressiveScoreDisplay();


    /* -------------------------------------------------------------------------
     * RESTORE EXISTING FINAL RESULT IF AVAILABLE
     * -------------------------------------------------------------------------
     */

    restoreCompletedResult();


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

        'CTM PATH™ Page 02F ready.',

        {

            dimension:
                CONFIG.dimensionId,

            dimensionScore:

                window.Page02Scorecard &&
                typeof window.Page02Scorecard.getScore ===
                    'function'

                    ? window.Page02Scorecard.getScore()

                    : 0,

            dimensionProgress:

                window.Page02Scorecard &&
                typeof window.Page02Scorecard.getProgress ===
                    'function'

                    ? window.Page02Scorecard.getProgress()

                    : null,

            totalProgress:

                getAllAnswers().length +
                ' / ' +
                CONFIG.expectedIndicators

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

window.Page02F = {

    version:
        '5.0',

    dimensionId:
        CONFIG.dimensionId,

    init:
        init,

    goPrevious:
        goPrevious,

    submit:
        submitScorecard,

    continueToPage03:
        continueToPage03,

    showResult:
        function(){

            const result =
                finalResult ||
                getStoredResult();


            if(!result){

                return false;

            }


            return showFinalResult(

                result,

                true

            );

        },

    validateDimension:
        function(){

            if(
                window.Page02Scorecard &&
                typeof window.Page02Scorecard.validate ===
                    'function'
            ){

                return (

                    window.Page02Scorecard.validate()

                );

            }


            return false;

        },

    validateScorecard:
        validateCompleteScorecard,

    getAnswers:
        getAllAnswers,

    getDimensions:
        getDimensionResults,

    buildPayload:
        buildDiscoveryPayload,

    getResult:
        function(){

            return (

                finalResult ||
                getStoredResult() ||
                null

            );

        },

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


/* =============================================================================
 * END
 *
 * FINAL PAGE 02 FLOW
 *
 *     PAGE 02A
 *     KYC
 *         ↓
 *
 *     PAGE 02B
 *     DIMENSION 01
 *     INDICATORS 01–05
 *         ↓
 *
 *     PAGE 02C
 *     DIMENSION 02
 *     INDICATORS 06–10
 *         ↓
 *
 *     PAGE 02D
 *     DIMENSION 03
 *     INDICATORS 11–15
 *         ↓
 *
 *     PAGE 02E
 *     DIMENSION 04
 *     INDICATORS 16–20
 *         ↓
 *
 *     PAGE 02F
 *     DIMENSION 05
 *     INDICATORS 21–25
 *         ↓
 *
 *     VALIDATE 25 / 25
 *         ↓
 *
 *     BUILD DISCOVERY PAYLOAD
 *         ↓
 *
 *     CTM_API.saveDiscovery()
 *         ↓
 *
 *     STORE RESULT
 *         ↓
 *
 *     SHOW RESULT ON PAGE 02F
 *         ↓
 *
 *     USER CLICKS
 *     CONTINUE TO KALA CHAKRA™
 *         ↓
 *
 *     PAGE 03
 *
 * =============================================================================
 */

})(window, document);

