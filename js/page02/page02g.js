
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02g.js
 *
 * VERSION:
 * 1.0 — LIFE GAP ANALYSIS RESULT
 *
 * PAGE:
 * PAGE 02G — YOUR LIFE GAP ANALYSIS™
 *
 * STATUS:
 * POST-SCORECARD RESULT CONTROLLER
 *
 * =============================================================================
 *
 * PURPOSE
 * =============================================================================
 *
 * Page 02G is the consolidated interpretation screen after the
 * 25-indicator Millionaire Lifestyle Scorecard™ is completed.
 *
 *
 * FLOW:
 *
 *      PAGE 02F
 *          ↓
 *      25 answers completed
 *          ↓
 *      Page02Session result
 *          ↓
 *      sessionStorage: ctm_page02_result
 *          ↓
 *      PAGE 02G
 *          ↓
 *      YOUR LIFE GAP ANALYSIS™
 *          ↓
 *      Five Dimension Analysis
 *          ↓
 *      25 Indicator Analysis
 *          ↓
 *      Gap Analysis
 *          ↓
 *      Continue
 *          ↓
 *      PAGE 03
 *
 *
 * =============================================================================
 * SHARED RESPONSIBILITIES
 * =============================================================================
 *
 * page02-data.js
 *      → dimension definitions
 *      → indicator definitions
 *
 * page02-session.js
 *      → persisted answers
 *      → score
 *      → result state
 *
 * page02-scorecard.js
 *      → assessment interaction
 *
 * page02f.js
 *      → final scorecard validation
 *      → backend save
 *      → result persistence
 *
 *
 * =============================================================================
 * THIS FILE OWNS
 * =============================================================================
 *
 * ✓ Loading the completed Page 02 result
 * ✓ Validating the result
 * ✓ Calculating overall percentage
 * ✓ Calculating total gap
 * ✓ Calculating dimension percentages
 * ✓ Calculating dimension gaps
 * ✓ Rendering five-dimension overview
 * ✓ Rendering 25-indicator matrix
 * ✓ Rendering current reality
 * ✓ Rendering ideal
 * ✓ Rendering gap-to-close
 * ✓ Rendering overall score
 * ✓ Rendering journey progress
 * ✓ Previous navigation
 * ✓ Continue navigation
 * ✓ Responsive-safe DOM generation
 * ✓ Keyboard accessibility
 * ✓ Reduced-motion compatibility
 *
 *
 * =============================================================================
 * THIS FILE DOES NOT
 * =============================================================================
 *
 * ✗ change answers
 * ✗ change scores
 * ✗ modify Page02Session scoring
 * ✗ submit assessment again
 * ✗ call CTM_API.saveDiscovery()
 * ✗ alter backend data
 * ✗ redefine Page 02 scorecard logic
 *
 *
 * =============================================================================
 */

'use strict';


(function(window, document){


/* ============================================================================
   01. CONFIGURATION
   ============================================================================ */


const CONFIG = {

    pageId:
        'page02g',

    previousPage:
        'page02f.html',

    nextPage:
        'page03.html',

    expectedIndicators:
        25,

    expectedDimensions:
        5,

    minimumScorePerIndicator:
        1,

    maximumScorePerIndicator:
        4,

    maximumTotalScore:
        100,

    resultStorageKey:
        'ctm_page02_result'

};


/* ============================================================================
   02. DOM CONTRACT
   ============================================================================ */


const DOM_IDS = {

    root:
        'page02g',

    progressNumber:
        'dimensionProgressNumber',

    progressFill:
        'dimensionProgressFill',

    overallScore:
        'overallScore',

    overallPercentage:
        'overallPercentage',

    totalGap:
        'totalGap',

    gapPercentage:
        'gapPercentage',

    dimensionContainer:
        'page02gDimensions',

    gapContainer:
        'page02gGapBars',

    matrixContainer:
        'page02gMatrix',

    message:
        'dimensionMessage',

    previousButton:
        'previousButton',

    nextButton:
        'nextButton',

    summaryContainer:
        'page02gSummary'

};


/* ============================================================================
   03. STATE
   ============================================================================ */


let initialized =
    false;

let navigating =
    false;

let result =
    null;


/* ============================================================================
   04. DOM HELPER
   ============================================================================ */


function getElement(
    id
){

    return (
        document.getElementById(id) ||
        null
    );

}


/* ============================================================================
   05. HTML ESCAPE
   ============================================================================ */


function escapeHtml(
    value
){

    if(
        value === undefined ||
        value === null
    ){

        return '';

    }


    return String(value)

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


/* ============================================================================
   06. SCROLL TO TOP
   ============================================================================ */


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


/* ============================================================================
   07. READ SESSION STORAGE RESULT
   ============================================================================ */


function readStoredResult(){

    try{

        const raw =
            sessionStorage.getItem(
                CONFIG.resultStorageKey
            );


        if(
            !raw
        ){

            return null;

        }


        return JSON.parse(
            raw
        );

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02G could not read stored result:',
            error
        );

        return null;

    }

}


/* ============================================================================
   08. READ PAGE02 SESSION RESULT
   ============================================================================ */


function readSessionResult(){

    if(
        !window.Page02Session
    ){

        return null;

    }


    if(
        typeof window.Page02Session.getResult ===
        'function'
    ){

        try{

            const sessionResult =
                window.Page02Session.getResult();

            if(
                sessionResult
            ){

                return sessionResult;

            }

        }
        catch(error){

            console.warn(
                'CTM PATH™ Page 02G could not read Page02Session result:',
                error
            );

        }

    }


    return null;

}


/* ============================================================================
   09. LOAD RESULT
   ============================================================================ */


function loadResult(){

    const sessionResult =
        readSessionResult();


    if(
        sessionResult
    ){

        return sessionResult;

    }


    return readStoredResult();

}


/* ============================================================================
   10. NORMALIZE DIMENSION
   ============================================================================ */


function normalizeDimension(
    dimension,
    index
){

    const score =
        Number(
            dimension &&
            dimension.score
        ) || 0;


    const maximumScore =
        Number(
            dimension &&
            dimension.maximumScore
        ) || 20;


    const percentage =
        maximumScore > 0

            ? Math.round(
                (
                    score /
                    maximumScore
                ) *
                100
            )

            : 0;


    const gap =
        Math.max(
            0,
            maximumScore - score
        );


    return {

        id:
            dimension &&
            dimension.id
                ? dimension.id
                : `dimension-${index + 1}`,

        number:
            Number(
                dimension &&
                dimension.number
            ) ||
            index + 1,

        tamil:
            dimension &&
            dimension.tamil
                ? dimension.tamil
                : `பரிமாணம் ${index + 1}`,

        english:
            dimension &&
            dimension.english
                ? dimension.english
                : `DIMENSION ${index + 1}`,

        score:
            score,

        maximumScore:
            maximumScore,

        percentage:
            percentage,

        gap:
            gap

    };

}


/* ============================================================================
   11. NORMALIZE INDICATOR
   ============================================================================ */


function normalizeIndicator(
    answer,
    index
){

    const score =
        Number(
            answer &&
            answer.score
        ) || 0;


    const maximum =
        CONFIG.maximumScorePerIndicator;


    const percentage =
        maximum > 0

            ? Math.round(
                (
                    score /
                    maximum
                ) *
                100
            )

            : 0;


    const gap =
        Math.max(
            0,
            maximum - score
        );


    return {

        indicatorId:
            answer &&
            answer.indicatorId
                ? answer.indicatorId
                : `indicator-${index + 1}`,

        indicatorNumber:
            Number(
                answer &&
                answer.indicatorNumber
            ) ||
            index + 1,

        dimensionId:
            answer &&
            answer.dimensionId
                ? answer.dimensionId
                : '',

        dimensionTamil:
            answer &&
            answer.dimensionTamil
                ? answer.dimensionTamil
                : '',

        dimensionEnglish:
            answer &&
            answer.dimensionEnglish
                ? answer.dimensionEnglish
                : '',

        indicatorTamil:
            answer &&
            answer.indicatorTamil
                ? answer.indicatorTamil
                : '',

        indicatorEnglish:
            answer &&
            answer.indicatorEnglish
                ? answer.indicatorEnglish
                : '',

        ideal:
            answer &&
            answer.ideal
                ? answer.ideal
                : '',

        selectedRange:
            answer &&
            answer.selectedRange
                ? answer.selectedRange
                : '',

        score:
            score,

        maximumScore:
            maximum,

        percentage:
            percentage,

        gap:
            gap

    };

}


/* ============================================================================
   12. NORMALIZE RESULT
   ============================================================================ */


function normalizeResult(
    raw
){

    if(
        !raw
    ){

        return null;

    }


    const rawDimensions =
        Array.isArray(
            raw.dimensions
        )
            ? raw.dimensions
            : [];


    const rawAnswers =
        Array.isArray(
            raw.answers
        )
            ? raw.answers
            : [];


    const dimensions =
        rawDimensions.map(
            normalizeDimension
        );


    const answers =
        rawAnswers

            .map(
                normalizeIndicator
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
            );


    const totalScore =
        Number(
            raw.totalScore
        ) || 0;


    const maximumScore =
        Number(
            raw.maximumScore
        ) ||
        CONFIG.maximumTotalScore;


    const percentage =
        Number.isFinite(
            Number(
                raw.percentage
            )
        )

            ? Number(
                raw.percentage
            )

            : (
                maximumScore > 0

                    ? Math.round(
                        (
                            totalScore /
                            maximumScore
                        ) *
                        100
                    )

                    : 0
            );


    const totalGap =
        Math.max(
            0,
            maximumScore - totalScore
        );


    return {

        clientId:
            raw.clientId ||
            '',

        totalScore:
            totalScore,

        maximumScore:
            maximumScore,

        percentage:
            percentage,

        totalGap:
            totalGap,

        gapPercentage:
            Math.max(
                0,
                100 - percentage
            ),

        dimensions:
            dimensions,

        answers:
            answers,

        completedAt:
            raw.completedAt ||
            ''

    };

}


/* ============================================================================
   13. VALIDATE RESULT
   ============================================================================ */


function validateResult(
    data
){

    if(
        !data
    ){

        return {

            valid:
                false,

            reason:
                'missing-result'

        };

    }


    if(
        data.answers.length !==
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
                data.answers.length

        };

    }


    if(
        data.dimensions.length !==
        CONFIG.expectedDimensions
    ){

        return {

            valid:
                false,

            reason:
                'dimension-count',

            expected:
                CONFIG.expectedDimensions,

            actual:
                data.dimensions.length

        };

    }


    const invalidAnswer =
        data.answers.some(
            function(answer){

                return (
                    answer.score <
                        CONFIG.minimumScorePerIndicator ||

                    answer.score >
                        CONFIG.maximumScorePerIndicator
                );

            }
        );


    if(
        invalidAnswer
    ){

        return {

            valid:
                false,

            reason:
                'invalid-score'

        };

    }


    return {

        valid:
            true

    };

}


/* ============================================================================
   14. SHOW ERROR
   ============================================================================ */


function showError(
    tamilMessage,
    englishMessage
){

    const message =
        getElement(
            DOM_IDS.message
        );


    if(
        !message
    ){

        return;

    }


    message.innerHTML = `

        <strong>
            ${escapeHtml(tamilMessage)}
        </strong>

        <span>
            ${escapeHtml(englishMessage)}
        </span>

    `;


    message.hidden =
        false;


    message.classList.add(
        'is-visible'
    );

}


/* ============================================================================
   15. UPDATE JOURNEY PROGRESS
   ============================================================================ */


function renderJourneyProgress(){

    const number =
        getElement(
            DOM_IDS.progressNumber
        );


    const fill =
        getElement(
            DOM_IDS.progressFill
        );


    if(
        number
    ){

        number.textContent =
            '25 / 25';

    }


    if(
        fill
    ){

        fill.style.width =
            '100%';

    }

}


/* ============================================================================
   16. RENDER OVERALL SCORE
   ============================================================================ */


function renderOverallScore(){

    if(
        !result
    ){

        return;

    }


    const score =
        getElement(
            DOM_IDS.overallScore
        );


    const percentage =
        getElement(
            DOM_IDS.overallPercentage
        );


    const gap =
        getElement(
            DOM_IDS.totalGap
        );


    const gapPercentage =
        getElement(
            DOM_IDS.gapPercentage
        );


    if(
        score
    ){

        score.textContent =
            result.totalScore;

    }


    if(
        percentage
    ){

        percentage.textContent =
            `${result.percentage}%`;

    }


    if(
        gap
    ){

        gap.textContent =
            result.totalGap;

    }


    if(
        gapPercentage
    ){

        gapPercentage.textContent =
            `${result.gapPercentage}%`;

    }

}


/* ============================================================================
   17. RENDER SUMMARY CARDS
   ============================================================================ */


function renderSummary(){

    const container =
        getElement(
            DOM_IDS.summaryContainer
        );


    if(
        !container ||
        !result
    ){

        return;

    }


    container.innerHTML = `

        <article class="page02g-summary-card">

            <span class="page02g-summary-label">
                Overall Score
            </span>

            <strong class="page02g-summary-value teal">
                ${result.totalScore}
            </strong>

            <span class="page02g-summary-sub">
                OUT OF ${result.maximumScore}
            </span>

        </article>


        <article class="page02g-summary-card">

            <span class="page02g-summary-label">
                Readiness
            </span>

            <strong class="page02g-summary-value gold">
                ${result.percentage}%
            </strong>

            <span class="page02g-summary-sub">
                CURRENT REALITY
            </span>

        </article>


        <article class="page02g-summary-card">

            <span class="page02g-summary-label">
                Gap To Close
            </span>

            <strong class="page02g-summary-value gap">
                ${result.totalGap}
            </strong>

            <span class="page02g-summary-sub">
                POINTS REMAINING
            </span>

        </article>


        <article class="page02g-summary-card">

            <span class="page02g-summary-label">
                Journey
            </span>

            <strong class="page02g-summary-value teal">
                25 / 25
            </strong>

            <span class="page02g-summary-sub">
                INDICATORS COMPLETE
            </span>

        </article>

    `;

}


/* ============================================================================
   18. RENDER FIVE DIMENSIONS
   ============================================================================ */


function renderDimensions(){

    const container =
        getElement(
            DOM_IDS.dimensionContainer
        );


    if(
        !container ||
        !result
    ){

        return;

    }


    container.innerHTML =
        result.dimensions

            .map(
                function(dimension){

                    return `

                        <article
                            class="page02g-dimension-card"
                            data-dimension-id="${escapeHtml(
                                dimension.id
                            )}"
                        >

                            <span class="page02g-dimension-number">
                                ${String(
                                    dimension.number
                                ).padStart(
                                    2,
                                    '0'
                                )}
                            </span>


                            <h3 class="page02g-dimension-tamil">
                                ${escapeHtml(
                                    dimension.tamil
                                )}
                            </h3>


                            <p class="page02g-dimension-english">
                                ${escapeHtml(
                                    dimension.english
                                )}
                            </p>


                            <div class="page02g-dimension-score-row">

                                <strong class="page02g-dimension-score">

                                    ${dimension.score}

                                    <span>
                                        / ${dimension.maximumScore}
                                    </span>

                                </strong>


                                <strong class="page02g-dimension-gap">

                                    <span>
                                        GAP
                                    </span>

                                    ${dimension.gap}

                                </strong>

                            </div>


                            <div
                                class="page02g-dimension-track"
                                aria-label="${escapeHtml(
                                    dimension.english
                                )} score"
                            >

                                <div
                                    class="page02g-dimension-fill"
                                    style="width:${dimension.percentage}%"
                                ></div>

                            </div>

                        </article>

                    `;

                }
            )

            .join('');

}


/* ============================================================================
   19. RENDER GAP BARS
   ============================================================================ */


function renderGapBars(){

    const container =
        getElement(
            DOM_IDS.gapContainer
        );


    if(
        !container ||
        !result
    ){

        return;

    }


    container.innerHTML =
        result.dimensions

            .map(
                function(dimension){

                    return `

                        <div class="page02g-bar-row">

                            <div class="page02g-bar-label">

                                <span class="page02g-bar-label-tamil">
                                    ${escapeHtml(
                                        dimension.tamil
                                    )}
                                </span>

                                <span class="page02g-bar-label-english">
                                    ${escapeHtml(
                                        dimension.english
                                    )}
                                </span>

                            </div>


                            <div class="page02g-bar-track">

                                <div
                                    class="page02g-bar-ideal"
                                    aria-hidden="true"
                                ></div>


                                <div
                                    class="page02g-bar-current"
                                    style="width:${dimension.percentage}%"
                                ></div>

                            </div>


                            <strong class="page02g-bar-value">
                                ${dimension.percentage}%
                            </strong>

                        </div>

                    `;

                }
            )

            .join('');

}


/* ============================================================================
   20. GROUP ANSWERS BY DIMENSION
   ============================================================================ */


function groupAnswersByDimension(){

    const groups =
        {};


    result.answers.forEach(
        function(answer){

            const key =
                answer.dimensionId ||
                'unknown';


            if(
                !groups[key]
            ){

                groups[key] =
                    [];

            }


            groups[key].push(
                answer
            );

        }
    );


    return groups;

}


/* ============================================================================
   21. RENDER INDICATOR MATRIX
   ============================================================================ */


function renderMatrix(){

    const container =
        getElement(
            DOM_IDS.matrixContainer
        );


    if(
        !container ||
        !result
    ){

        return;

    }


    const groups =
        groupAnswersByDimension();


    container.innerHTML =
        result.dimensions

            .map(
                function(dimension){

                    const answers =
                        groups[
                            dimension.id
                        ] ||
                        [];


                    return `

                        <section
                            class="page02g-matrix-dimension"
                            data-dimension-id="${escapeHtml(
                                dimension.id
                            )}"
                        >

                            <header class="page02g-matrix-header">

                                <div class="page02g-matrix-number">

                                    DIMENSION
                                    ${String(
                                        dimension.number
                                    ).padStart(
                                        2,
                                        '0'
                                    )}

                                </div>


                                <h3 class="page02g-matrix-tamil">

                                    ${escapeHtml(
                                        dimension.tamil
                                    )}

                                </h3>


                                <p class="page02g-matrix-english">

                                    ${escapeHtml(
                                        dimension.english
                                    )}

                                </p>

                            </header>


                            ${answers
                                .map(
                                    renderIndicator
                                )
                                .join('')}

                        </section>

                    `;

                }
            )

            .join('');

}


/* ============================================================================
   22. RENDER INDICATOR
   ============================================================================ */


function renderIndicator(
    answer
){

    return `

        <article
            class="page02g-indicator"
            data-indicator-id="${escapeHtml(
                answer.indicatorId
            )}"
        >

            <div class="page02g-indicator-number">

                INDICATOR
                ${String(
                    answer.indicatorNumber
                ).padStart(
                    2,
                    '0'
                )}

            </div>


            <h4 class="page02g-indicator-title">

                ${escapeHtml(
                    answer.indicatorTamil
                )}

                ${
                    answer.indicatorEnglish
                        ? `
                            <span>
                                — ${escapeHtml(
                                    answer.indicatorEnglish
                                )}
                            </span>
                        `
                        : ''
                }

            </h4>


            <div class="page02g-indicator-current">

                <span class="page02g-small-label">
                    YOUR REALITY
                </span>


                <div class="page02g-current-value">

                    ${escapeHtml(
                        answer.selectedRange ||
                        `${answer.score} / ${answer.maximumScore}`
                    )}

                </div>

            </div>


            <div class="page02g-indicator-ideal">

                <strong>
                    IDEAL:
                </strong>

                ${
                    answer.ideal
                        ? escapeHtml(
                            answer.ideal
                        )
                        : `Score ${answer.maximumScore}`
                }

            </div>


            <div class="page02g-indicator-score">

                <div class="page02g-score-bar">

                    <div
                        class="page02g-score-bar-fill"
                        style="width:${answer.percentage}%"
                    ></div>

                </div>


                <strong class="page02g-indicator-score-value">

                    ${answer.score}
                    /
                    ${answer.maximumScore}

                </strong>

            </div>


            <div class="page02g-indicator-gap">

                <span>
                    GAP TO CLOSE
                </span>

                <strong>
                    ${answer.gap}
                </strong>

            </div>

        </article>

    `;

}


/* ============================================================================
   23. UPDATE GAP RING
   ============================================================================ */


function updateGapRing(){

    const ring =
        document.querySelector(
            '.page02g-gap-ring'
        );


    const number =
        document.querySelector(
            '.page02g-gap-ring-number'
        );


    if(
        !ring ||
        !result
    ){

        return;

    }


    const currentPercentage =
        result.percentage;


    ring.style.setProperty(
        '--gap',
        `${currentPercentage * 3.6}deg`
    );


    if(
        number
    ){

        number.textContent =
            `${result.gapPercentage}%`;

    }

}


/* ============================================================================
   24. RENDER GAP PANEL
   ============================================================================ */


function renderGapPanel(){

    const existing =
        document.querySelector(
            '.page02g-gap-score-panel'
        );


    if(
        !existing ||
        !result
    ){

        return;

    }


    existing.innerHTML = `

        <div
            class="page02g-gap-ring"
            style="--gap:${result.gapPercentage * 3.6}deg"
        >

            <div class="page02g-gap-ring-content">

                <strong class="page02g-gap-ring-number">

                    ${result.gapPercentage}%

                </strong>


                <span class="page02g-gap-ring-label">

                    GAP TO CLOSE

                </span>

            </div>

        </div>


        <p class="page02g-gap-message">

            ${escapeHtml(
                getGapMessage(
                    result.gapPercentage
                )
            )}

        </p>

    `;

}


/* ============================================================================
   25. GAP MESSAGE
   ============================================================================ */


function getGapMessage(
    gapPercentage
){

    if(
        gapPercentage <= 10
    ){

        return (
            'நீங்கள் உங்கள் இலக்கு வாழ்க்கைக்கு மிக அருகில் இருக்கிறீர்கள். ' +
            'இப்போது சிறிய மாற்றங்களை தொடர்ந்து செயல்படுத்துங்கள்.'
        );

    }


    if(
        gapPercentage <= 25
    ){

        return (
            'உங்கள் அடித்தளம் வலுவாக உள்ளது. ' +
            'சில முக்கியமான இடைவெளிகளை மூடினால் பெரிய முன்னேற்றம் உருவாகும்.'
        );

    }


    if(
        gapPercentage <= 40
    ){

        return (
            'உங்கள் அடுத்த கட்ட வளர்ச்சிக்கு தெளிவான வாய்ப்புகள் உள்ளன. ' +
            'முக்கியமான இடைவெளிகளை ஒன்றன்பின் ஒன்றாக மூடுங்கள்.'
        );

    }


    return (
        'இந்த இடைவெளி ஒரு முடிவு அல்ல. ' +
        'இது உங்கள் அடுத்த வளர்ச்சி திசையை காட்டும் வரைபடம்.'
    );

}


/* ============================================================================
   26. RENDER JOURNEY MAP
   ============================================================================ */


function renderJourneyMap(){

    const container =
        document.querySelector(
            '.page02g-journey-map'
        );


    if(
        !container
    ){

        return;

    }


    container.innerHTML = `

        <span class="page02g-journey-step">
            02A
        </span>

        <span class="page02g-journey-separator">
            •
        </span>

        <span class="page02g-journey-step">
            02B
        </span>

        <span class="page02g-journey-separator">
            •
        </span>

        <span class="page02g-journey-step">
            02C
        </span>

        <span class="page02g-journey-separator">
            •
        </span>

        <span class="page02g-journey-step">
            02D
        </span>

        <span class="page02g-journey-separator">
            •
        </span>

        <span class="page02g-journey-step">
            02E
        </span>

        <span class="page02g-journey-separator">
            •
        </span>

        <span class="page02g-journey-step">
            02F
        </span>

        <span class="page02g-journey-separator">
            →
        </span>

        <span class="page02g-journey-step active">
            02G
        </span>

        <span class="page02g-journey-separator">
            →
        </span>

        <span class="page02g-journey-step">
            03
        </span>

    `;

}


/* ============================================================================
   27. RENDER RESULT
   ============================================================================ */


function renderResult(){

    if(
        !result
    ){

        return;

    }


    renderJourneyProgress();

    renderOverallScore();

    renderSummary();

    renderDimensions();

    renderGapBars();

    renderMatrix();

    renderGapPanel();

    renderJourneyMap();

}


/* ============================================================================
   28. NAVIGATION STATE
   ============================================================================ */


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


    if(
        previousButton
    ){

        previousButton.disabled =
            active;

        previousButton.setAttribute(
            'aria-busy',
            active
                ? 'true'
                : 'false'
        );

    }


    if(
        nextButton
    ){

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


/* ============================================================================
   29. GO PREVIOUS
   ============================================================================ */


function goPrevious(
    event
){

    if(
        event
    ){

        event.preventDefault();

    }


    if(
        navigating
    ){

        return;

    }


    setNavigationState(
        true
    );


    if(
        window.Page02Session &&
        typeof window.Page02Session.setCurrentDimension ===
        'function'
    ){

        try{

            window.Page02Session.setCurrentDimension(
                'protectionContribution'
            );

        }
        catch(error){

            console.warn(
                'CTM PATH™ Page 02G could not restore previous dimension:',
                error
            );

        }

    }


    window.location.href =
        CONFIG.previousPage;

}


/* ============================================================================
   30. GO NEXT
   ============================================================================ */


function goNext(
    event
){

    if(
        event
    ){

        event.preventDefault();

    }


    if(
        navigating
    ){

        return;

    }


    if(
        !result
    ){

        showError(
            'உங்கள் முடிவை காண முடியவில்லை.',
            'Your completed scorecard result could not be found.'
        );

        return;

    }


    const validation =
        validateResult(
            result
        );


    if(
        !validation.valid
    ){

        console.error(
            'CTM PATH™ Page 02G result validation failed:',
            validation
        );


        showError(
            'உங்கள் Scorecard முடிவு முழுமையாக கிடைக்கவில்லை.',
            'Your completed scorecard result is incomplete.'
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


/* ============================================================================
   31. BIND PREVIOUS
   ============================================================================ */


function bindPrevious(){

    const button =
        getElement(
            DOM_IDS.previousButton
        );


    if(
        !button
    ){

        return;

    }


    button.addEventListener(
        'click',
        goPrevious
    );

}


/* ============================================================================
   32. BIND NEXT
   ============================================================================ */


function bindNext(){

    const button =
        getElement(
            DOM_IDS.nextButton
        );


    if(
        !button
    ){

        return;

    }


    button.addEventListener(
        'click',
        goNext
    );

}


/* ============================================================================
   33. KEYBOARD NAVIGATION
   ============================================================================ */


function bindKeyboard(){

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
                event.ctrlKey ||
                event.metaKey
            ){

                event.preventDefault();

                goNext();

            }

        }
    );

}


/* ============================================================================
   34. VERIFY PAGE
   ============================================================================ */


function verifyPage(){

    const root =
        getElement(
            DOM_IDS.root
        );


    if(
        !root
    ){

        console.error(
            'CTM PATH™ Page 02G root #page02g was not found.'
        );


        return false;

    }


    return true;

}


/* ============================================================================
   35. VERIFY RESULT
   ============================================================================ */


function verifyResult(){

    result =
        normalizeResult(
            loadResult()
        );


    const validation =
        validateResult(
            result
        );


    if(
        !validation.valid
    ){

        console.error(
            'CTM PATH™ Page 02G could not validate result:',
            validation
        );


        return false;

    }


    return true;

}


/* ============================================================================
   36. INITIALIZE
   ============================================================================ */


function init(){

    if(
        initialized
    ){

        return;

    }


    initialized =
        true;


    console.info(
        'CTM PATH™ Page 02G initializing — Life Gap Analysis™...'
    );


    if(
        !verifyPage()
    ){

        initialized =
            false;

        return;

    }


    if(
        !verifyResult()
    ){

        showError(
            'உங்கள் Scorecard முடிவு கிடைக்கவில்லை.',
            'Your completed Millionaire Lifestyle Scorecard™ result could not be loaded.'
        );


        initialized =
            false;

        return;

    }


    renderResult();


    bindPrevious();

    bindNext();

    bindKeyboard();


    scrollToTop();


    console.info(
        'CTM PATH™ Page 02G ready.',
        {

            clientId:
                result.clientId,

            score:
                result.totalScore,

            maximumScore:
                result.maximumScore,

            percentage:
                result.percentage,

            gap:
                result.totalGap,

            dimensions:
                result.dimensions.length,

            indicators:
                result.answers.length

        }
    );

}


/* ============================================================================
   37. PUBLIC CONTROLLER
   ============================================================================ */


window.Page02G = {

    version:
        '1.0',

    init:
        init,

    getResult:
        function(){

            return result;

        },

    refresh:
        function(){

            if(
                !verifyResult()
            ){

                return false;

            }


            renderResult();

            return true;

        },

    goPrevious:
        goPrevious,

    goNext:
        goNext

};


/* ============================================================================
   38. BOOT
   ============================================================================ */


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


})(window, document);


/* =============================================================================
   END
   ============================================================================= */

