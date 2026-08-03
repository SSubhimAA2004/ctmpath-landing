
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02-scorecard.js
 *
 * VERSION:
 * 3.0
 *
 * STATUS:
 * SHARED DIMENSION SCORECARD ENGINE
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Provides the reusable rendering and interaction engine for:
 *
 *      page02b.html — Dimension 01
 *      page02c.html — Dimension 02
 *      page02d.html — Dimension 03
 *      page02e.html — Dimension 04
 *      page02f.html — Dimension 05
 *
 * RESPONSIBILITIES
 *
 *      ✓ Read dimension data from Page02Data
 *      ✓ Render five indicator cards
 *      ✓ Render four options per indicator
 *      ✓ Restore previously selected answers
 *      ✓ Save selections through Page02Session
 *      ✓ Update live dimension score
 *      ✓ Update answered-question progress
 *      ✓ Update journey progress bar
 *      ✓ Mark selected option states
 *      ✓ Mark answered cards
 *      ✓ Validate dimension completion
 *      ✓ Scroll to first unanswered indicator
 *      ✓ Render "How Your Score Works"
 *      ✓ Expose reusable API to page controllers
 *
 * =============================================================================
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ decide previous page
 *      ✗ decide next page
 *      ✗ call CTM_API
 *      ✗ register clients
 *      ✗ save final discovery
 *      ✗ calculate final backend result
 *
 * Those responsibilities remain with the individual page controllers and
 * Page02Session.
 *
 * =============================================================================
 */


'use strict';


(function(window, document){


/* =============================================================================
 * DEPENDENCY CHECK
 * =============================================================================
 */


if(
    !window.Page02Data
){

    throw new Error(
        'CTM PATH™ Page02Scorecard requires page02-data.js.'
    );

}


if(
    !window.Page02Session
){

    throw new Error(
        'CTM PATH™ Page02Scorecard requires page02-session.js.'
    );

}


/* =============================================================================
 * NAMESPACE
 * =============================================================================
 */


const Page02Scorecard = {};


/* =============================================================================
 * VERSION
 * =============================================================================
 */


Page02Scorecard.version =
    '3.0';


/* =============================================================================
 * DOM CONTRACT
 *
 * Every Dimension page should expose:
 *
 *      #dimensionProgressFill
 *      #dimensionProgressNumber
 *
 *      #dimensionTitleTamil
 *      #dimensionTitleEnglish
 *
 *      #dimensionScoreCurrent
 *      #dimensionScoreTotal
 *
 *      #scorecardList
 *
 *      #scoreGuide
 *
 *      #dimensionMessage
 *
 * Individual page controllers may additionally expose:
 *
 *      #previousButton
 *      #nextButton
 *
 * =============================================================================
 */


Page02Scorecard.DOM_IDS = {

    progressFill:
        'dimensionProgressFill',

    progressNumber:
        'dimensionProgressNumber',

    titleTamil:
        'dimensionTitleTamil',

    titleEnglish:
        'dimensionTitleEnglish',

    scoreCurrent:
        'dimensionScoreCurrent',

    scoreTotal:
        'dimensionScoreTotal',

    list:
        'scorecardList',

    guide:
        'scoreGuide',

    message:
        'dimensionMessage'

};


/* =============================================================================
 * INTERNAL STATE
 * =============================================================================
 */


let currentDimensionId =
    null;


let currentDimension =
    null;


/* =============================================================================
 * DOM HELPERS
 * =============================================================================
 */


function getElement(id){

    return (
        document.getElementById(id) ||
        null
    );

}


/* =============================================================================
 * HTML ESCAPE
 * =============================================================================
 */


function escapeHtml(value){

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
 * ATTRIBUTE ESCAPE
 * =============================================================================
 */


function escapeAttribute(value){

    return escapeHtml(
        value
    );

}


/* =============================================================================
 * GET DIMENSION
 * =============================================================================
 */


function getDimension(
    dimensionId
){

    if(
        !dimensionId
    ){

        return null;

    }


    return (
        window.Page02Data.getDimensionById(
            dimensionId
        ) ||
        null
    );

}


/* =============================================================================
 * DIMENSION POSITION
 * =============================================================================
 */


function getDimensionPosition(
    dimensionId
){

    const dimensions =
        window.Page02Data.DIMENSIONS;


    const index =
        dimensions.findIndex(
            function(dimension){

                return (
                    dimension.id ===
                    dimensionId
                );

            }
        );


    if(
        index === -1
    ){

        return {

            index:
                -1,

            number:
                0,

            total:
                dimensions.length

        };

    }


    return {

        index:
            index,

        number:
            index + 1,

        total:
            dimensions.length

    };

}


/* =============================================================================
 * OPTION STATUS
 *
 * Four options map directly to the four-point score model.
 *
 * These labels are presentation-only.
 * They do NOT alter score calculations.
 *
 * =============================================================================
 */


function getOptionStatus(
    score
){

    switch(
        Number(score)
    ){

        case 1:

            return {

                tamil:
                    'தொடக்க நிலை',

                english:
                    'STARTING'

            };


        case 2:

            return {

                tamil:
                    'வளரும் நிலை',

                english:
                    'DEVELOPING'

            };


        case 3:

            return {

                tamil:
                    'வலுவான நிலை',

                english:
                    'STRONG'

            };


        case 4:

            return {

                tamil:
                    'இலக்கு நிலை',

                english:
                    'TARGET'

            };


        default:

            return {

                tamil:
                    '',

                english:
                    ''

            };

    }

}


/* =============================================================================
 * BUILD OPTION STATUS TEXT
 * =============================================================================
 */


function buildOptionStatusText(
    score
){

    const status =
        getOptionStatus(
            score
        );


    if(
        !status.english
    ){

        return '';

    }


    return (
        status.tamil +
        ' · ' +
        status.english
    );

}


/* =============================================================================
 * RENDER DIMENSION HEADER
 * =============================================================================
 */


function renderDimensionHeader(){

    if(
        !currentDimension
    ){

        return;

    }


    const tamil =
        getElement(
            Page02Scorecard.DOM_IDS.titleTamil
        );


    const english =
        getElement(
            Page02Scorecard.DOM_IDS.titleEnglish
        );


    if(tamil){

        tamil.textContent =
            currentDimension.tamil ||
            '';

    }


    if(english){

        english.textContent =
            currentDimension.english ||
            '';

    }

}


/* =============================================================================
 * RENDER JOURNEY PROGRESS
 *
 * Progress represents dimension position in the five-dimension journey.
 *
 * Dimension 1 = 20%
 * Dimension 2 = 40%
 * Dimension 3 = 60%
 * Dimension 4 = 80%
 * Dimension 5 = 100%
 *
 * =============================================================================
 */


function renderJourneyProgress(){

    if(
        !currentDimension
    ){

        return;

    }


    const position =
        getDimensionPosition(
            currentDimension.id
        );


    const percent =
        position.total
            ? (
                position.number /
                position.total
            ) * 100
            : 0;


    const fill =
        getElement(
            Page02Scorecard.DOM_IDS.progressFill
        );


    const number =
        getElement(
            Page02Scorecard.DOM_IDS.progressNumber
        );


    if(fill){

        fill.style.width =
            percent + '%';


        fill.setAttribute(
            'aria-valuemin',
            '0'
        );


        fill.setAttribute(
            'aria-valuemax',
            '100'
        );


        fill.setAttribute(
            'aria-valuenow',
            String(
                Math.round(percent)
            )
        );

    }


    if(number){

        number.textContent =
            String(position.number) +
            ' / ' +
            String(position.total);

    }

}


/* =============================================================================
 * RENDER INDICATOR CARD
 * =============================================================================
 */


function renderIndicatorCard(
    indicator
){

    const storedAnswer =
        window.Page02Session.getAnswer(
            indicator.id
        );


    const answered =
        Boolean(
            storedAnswer
        );


    const dimension =
        currentDimension;


    const card =
        document.createElement(
            'article'
        );


    card.className =
        'scorecard-card' +
        (
            answered
                ? ' is-answered'
                : ''
        );


    card.id =
        'indicator-' +
        indicator.id;


    card.dataset.indicatorId =
        indicator.id;


    card.dataset.dimensionId =
        dimension.id;


    /* -------------------------------------------------------------------------
     * HEADER
     * -------------------------------------------------------------------------
     */


    const header =
        document.createElement(
            'div'
        );


    header.className =
        'scorecard-card-header';


    /* -------------------------------------------------------------------------
     * NUMBER
     * -------------------------------------------------------------------------
     */


    const number =
        document.createElement(
            'div'
        );


    number.className =
        'scorecard-number';


    number.setAttribute(
        'aria-hidden',
        'true'
    );


    number.textContent =
        String(
            indicator.number
        )
        .padStart(
            2,
            '0'
        );


    /* -------------------------------------------------------------------------
     * HEADING
     * -------------------------------------------------------------------------
     */


    const heading =
        document.createElement(
            'div'
        );


    heading.className =
        'scorecard-heading';


    const tamilTitle =
        document.createElement(
            'h2'
        );


    tamilTitle.className =
        'scorecard-title-tamil';


    tamilTitle.id =
        'indicator-title-' +
        indicator.id;


    tamilTitle.textContent =
        indicator.tamil ||
        indicator.titleTamil ||
        indicator.labelTamil ||
        '';


    const englishTitle =
        document.createElement(
            'p'
        );


    englishTitle.className =
        'scorecard-title-english';


    englishTitle.textContent =
        indicator.english ||
        indicator.titleEnglish ||
        indicator.labelEnglish ||
        indicator.name ||
        '';


    heading.appendChild(
        tamilTitle
    );


    heading.appendChild(
        englishTitle
    );


    /* -------------------------------------------------------------------------
     * IDEAL
     * -------------------------------------------------------------------------
     */


    const ideal =
        document.createElement(
            'div'
        );


    ideal.className =
        'scorecard-ideal';


    const idealLabel =
        document.createElement(
            'span'
        );


    idealLabel.className =
        'scorecard-ideal-label';


    idealLabel.textContent =
        'IDEAL';


    const idealValue =
        document.createElement(
            'span'
        );


    idealValue.className =
        'scorecard-ideal-value';


    idealValue.textContent =
        indicator.ideal ||
        '';


    ideal.appendChild(
        idealLabel
    );


    ideal.appendChild(
        idealValue
    );


    header.appendChild(
        number
    );


    header.appendChild(
        heading
    );


    header.appendChild(
        ideal
    );


    /* -------------------------------------------------------------------------
     * OPTIONS
     * -------------------------------------------------------------------------
     */


    const options =
        document.createElement(
            'div'
        );


    options.className =
        'scorecard-options';


    options.setAttribute(
        'role',
        'group'
    );


    options.setAttribute(
        'aria-labelledby',
        tamilTitle.id
    );


    indicator.options.forEach(
        function(option){

            const optionButton =
                renderOption(
                    indicator,
                    option,
                    storedAnswer
                );


            options.appendChild(
                optionButton
            );

        }
    );


    /* -------------------------------------------------------------------------
     * CURRENT SELECTION
     * -------------------------------------------------------------------------
     */


    const selection =
        document.createElement(
            'div'
        );


    selection.className =
        'scorecard-selection';


    selection.setAttribute(
        'aria-live',
        'polite'
    );


    const selectionLabel =
        document.createElement(
            'span'
        );


    selectionLabel.className =
        'scorecard-selection-label';


    selectionLabel.textContent =
        answered
            ? 'YOUR SCORE'
            : 'SELECT YOUR CURRENT RANGE';


    const selectionScore =
        document.createElement(
            'span'
        );


    selectionScore.className =
        'scorecard-selection-score';


    selectionScore.dataset.scoreFor =
        indicator.id;


    selectionScore.textContent =
        answered
            ? (
                String(
                    storedAnswer.score
                ) +
                ' / 4'
            )
            : '— / 4';


    selection.appendChild(
        selectionLabel
    );


    selection.appendChild(
        selectionScore
    );


    /* -------------------------------------------------------------------------
     * ASSEMBLE CARD
     * -------------------------------------------------------------------------
     */


    card.appendChild(
        header
    );


    card.appendChild(
        options
    );


    card.appendChild(
        selection
    );


    return card;

}


/* =============================================================================
 * RENDER OPTION
 * =============================================================================
 */


function renderOption(
    indicator,
    option,
    storedAnswer
){

    const selected =
        Boolean(
            storedAnswer &&
            Number(storedAnswer.score) ===
            Number(option.score)
        );


    const button =
        document.createElement(
            'button'
        );


    button.type =
        'button';


    button.className =
        'scorecard-option' +
        (
            selected
                ? ' is-selected'
                : ''
        );


    button.dataset.indicatorId =
        indicator.id;


    button.dataset.score =
        String(
            option.score
        );


    button.setAttribute(
        'aria-pressed',
        selected
            ? 'true'
            : 'false'
    );


    button.setAttribute(
        'aria-label',
        (
            option.label ||
            ''
        ) +
        '. Score ' +
        String(option.score) +
        ' out of 4'
    );


    /* -------------------------------------------------------------------------
     * RANGE
     * -------------------------------------------------------------------------
     */


    const range =
        document.createElement(
            'span'
        );


    range.className =
        'option-range';


    range.textContent =
        option.label ||
        '';


    /* -------------------------------------------------------------------------
     * SCORE
     * -------------------------------------------------------------------------
     */


    const score =
        document.createElement(
            'span'
        );


    score.className =
        'option-score';


    score.textContent =
        String(
            option.score
        );


    /* -------------------------------------------------------------------------
     * STATUS
     * -------------------------------------------------------------------------
     */


    const status =
        document.createElement(
            'span'
        );


    status.className =
        'option-status';


    status.textContent =
        buildOptionStatusText(
            option.score
        );


    button.appendChild(
        range
    );


    button.appendChild(
        score
    );


    button.appendChild(
        status
    );


    button.addEventListener(
        'click',
        function(){

            handleOptionSelection(
                indicator.id,
                option.score,
                button
            );

        }
    );


    return button;

}


/* =============================================================================
 * HANDLE OPTION SELECTION
 * =============================================================================
 */


function handleOptionSelection(
    indicatorId,
    score,
    selectedButton
){

    const saved =
        window.Page02Session.setAnswer(
            indicatorId,
            score
        );


    if(
        !saved
    ){

        console.error(
            'CTM PATH™ could not save scorecard answer:',
            indicatorId,
            score
        );


        return;

    }


    updateIndicatorSelection(
        indicatorId,
        score,
        selectedButton
    );


    updateLiveScore();


    updateQuestionProgress();


    hideMessage();


    dispatchAnswerEvent(
        indicatorId,
        score
    );

}


/* =============================================================================
 * UPDATE INDICATOR SELECTION
 * =============================================================================
 */


function updateIndicatorSelection(
    indicatorId,
    score,
    selectedButton
){

    const card =
        document.querySelector(
            '[data-indicator-id="' +
            CSS.escape(indicatorId) +
            '"].scorecard-card'
        );


    if(!card){

        return;

    }


    card.classList.add(
        'is-answered'
    );


    const buttons =
        card.querySelectorAll(
            '.scorecard-option'
        );


    buttons.forEach(
        function(button){

            const isSelected =
                (
                    button ===
                    selectedButton
                ) ||
                (
                    Number(
                        button.dataset.score
                    ) ===
                    Number(score)
                );


            button.classList.toggle(
                'is-selected',
                isSelected
            );


            button.setAttribute(
                'aria-pressed',
                isSelected
                    ? 'true'
                    : 'false'
            );

        }
    );


    const selectionLabel =
        card.querySelector(
            '.scorecard-selection-label'
        );


    if(selectionLabel){

        selectionLabel.textContent =
            'YOUR SCORE';

    }


    const scoreElement =
        card.querySelector(
            '[data-score-for="' +
            CSS.escape(indicatorId) +
            '"]'
        );


    if(scoreElement){

        scoreElement.textContent =
            String(score) +
            ' / 4';

    }

}


/* =============================================================================
 * RENDER SCORECARD
 * =============================================================================
 */


function renderScorecard(){

    const list =
        getElement(
            Page02Scorecard.DOM_IDS.list
        );


    if(!list){

        console.error(
            'CTM PATH™ Page 02 scorecard container #scorecardList not found.'
        );


        return false;

    }


    list.innerHTML =
        '';


    if(
        !currentDimension
    ){

        return false;

    }


    currentDimension.indicators.forEach(
        function(indicator){

            list.appendChild(
                renderIndicatorCard(
                    indicator
                )
            );

        }
    );


    return true;

}


/* =============================================================================
 * UPDATE LIVE SCORE
 * =============================================================================
 */


function updateLiveScore(){

    if(
        !currentDimension
    ){

        return;

    }


    const score =
        window.Page02Session.getDimensionScore(
            currentDimension.id
        );


    const maximum =
        currentDimension.indicators.length *
        window.Page02Data.CONFIG.maximumScorePerIndicator;


    const current =
        getElement(
            Page02Scorecard.DOM_IDS.scoreCurrent
        );


    const total =
        getElement(
            Page02Scorecard.DOM_IDS.scoreTotal
        );


    if(current){

        current.textContent =
            String(score);

    }


    if(total){

        total.textContent =
            '/ ' +
            String(maximum);

    }

}


/* =============================================================================
 * UPDATE QUESTION PROGRESS
 *
 * This updates optional elements if present:
 *
 *      [data-dimension-answered]
 *      [data-dimension-total]
 *
 * =============================================================================
 */


function updateQuestionProgress(){

    if(
        !currentDimension
    ){

        return;

    }


    const progress =
        window.Page02Session.getDimensionProgress(
            currentDimension.id
        );


    document
        .querySelectorAll(
            '[data-dimension-answered]'
        )
        .forEach(
            function(element){

                element.textContent =
                    String(
                        progress.answered
                    );

            }
        );


    document
        .querySelectorAll(
            '[data-dimension-total]'
        )
        .forEach(
            function(element){

                element.textContent =
                    String(
                        progress.total
                    );

            }
        );


    document
        .querySelectorAll(
            '[data-dimension-percent]'
        )
        .forEach(
            function(element){

                element.textContent =
                    String(
                        progress.percent
                    ) +
                    '%';

            }
        );


    document
        .querySelectorAll(
            '[data-dimension-complete]'
        )
        .forEach(
            function(element){

                element.dataset.complete =
                    progress.complete
                        ? 'true'
                        : 'false';

            }
        );

}


/* =============================================================================
 * SCORE GUIDE DATA
 * =============================================================================
 */


function getScoreGuideData(){

    return [

        {

            score:
                1,

            tamil:
                'தொடக்க நிலை',

            english:
                'STARTING'

        },

        {

            score:
                2,

            tamil:
                'வளரும் நிலை',

            english:
                'DEVELOPING'

        },

        {

            score:
                3,

            tamil:
                'வலுவான நிலை',

            english:
                'STRONG'

        },

        {

            score:
                4,

            tamil:
                'இலக்கு நிலை',

            english:
                'TARGET'

        }

    ];

}


/* =============================================================================
 * RENDER SCORE GUIDE
 * =============================================================================
 */


function renderScoreGuide(){

    const container =
        getElement(
            Page02Scorecard.DOM_IDS.guide
        );


    if(!container){

        return;

    }


    container.innerHTML =
        '';


    /* -------------------------------------------------------------------------
     * HEADING
     * -------------------------------------------------------------------------
     */


    const heading =
        document.createElement(
            'div'
        );


    heading.className =
        'score-guide-heading';


    const headingTamil =
        document.createElement(
            'span'
        );


    headingTamil.className =
        'score-guide-heading-tamil';


    headingTamil.textContent =
        'உங்கள் மதிப்பெண் எப்படி செயல்படுகிறது?';


    const headingEnglish =
        document.createElement(
            'span'
        );


    headingEnglish.className =
        'score-guide-heading-english';


    headingEnglish.textContent =
        'HOW YOUR SCORE WORKS';


    heading.appendChild(
        headingTamil
    );


    heading.appendChild(
        headingEnglish
    );


    /* -------------------------------------------------------------------------
     * GRID
     * -------------------------------------------------------------------------
     */


    const grid =
        document.createElement(
            'div'
        );


    grid.className =
        'score-guide-grid';


    getScoreGuideData().forEach(
        function(item){

            const guideItem =
                document.createElement(
                    'div'
                );


            guideItem.className =
                'score-guide-item';


            const score =
                document.createElement(
                    'span'
                );


            score.className =
                'score-guide-score';


            score.textContent =
                String(
                    item.score
                );


            const tamil =
                document.createElement(
                    'span'
                );


            tamil.className =
                'score-guide-status-tamil';


            tamil.textContent =
                item.tamil;


            const english =
                document.createElement(
                    'span'
                );


            english.className =
                'score-guide-status-english';


            english.textContent =
                item.english;


            guideItem.appendChild(
                score
            );


            guideItem.appendChild(
                tamil
            );


            guideItem.appendChild(
                english
            );


            grid.appendChild(
                guideItem
            );

        }
    );


    container.appendChild(
        heading
    );


    container.appendChild(
        grid
    );

}


/* =============================================================================
 * MESSAGE
 * =============================================================================
 */


function showMessage(
    message
){

    const element =
        getElement(
            Page02Scorecard.DOM_IDS.message
        );


    if(!element){

        return;

    }


    element.textContent =
        message;


    element.classList.add(
        'is-visible'
    );


    element.hidden =
        false;

}


function hideMessage(){

    const element =
        getElement(
            Page02Scorecard.DOM_IDS.message
        );


    if(!element){

        return;

    }


    element.classList.remove(
        'is-visible'
    );


    element.hidden =
        true;


    element.textContent =
        '';

}


/* =============================================================================
 * GET FIRST UNANSWERED INDICATOR
 * =============================================================================
 */


function getFirstUnansweredIndicator(){

    if(
        !currentDimension
    ){

        return null;

    }


    return (
        currentDimension.indicators.find(
            function(indicator){

                return (
                    !window.Page02Session.hasAnswer(
                        indicator.id
                    )
                );

            }
        ) ||
        null
    );

}


/* =============================================================================
 * SCROLL TO INDICATOR
 * =============================================================================
 */


function scrollToIndicator(
    indicatorId
){

    if(
        !indicatorId
    ){

        return;

    }


    const card =
        document.getElementById(
            'indicator-' +
            indicatorId
        );


    if(!card){

        return;

    }


    card.scrollIntoView({

        behavior:
            'smooth',

        block:
            'center'

    });


    window.setTimeout(
        function(){

            const firstOption =
                card.querySelector(
                    '.scorecard-option'
                );


            if(firstOption){

                firstOption.focus({

                    preventScroll:
                        true

                });

            }

        },
        450
    );

}


/* =============================================================================
 * VALIDATE DIMENSION
 * =============================================================================
 */


function validateDimension(){

    if(
        !currentDimension
    ){

        return {

            valid:
                false,

            dimensionId:
                null,

            answered:
                0,

            total:
                0,

            missing:
                [],

            firstMissing:
                null

        };

    }


    const missing =
        currentDimension.indicators.filter(
            function(indicator){

                return (
                    !window.Page02Session.hasAnswer(
                        indicator.id
                    )
                );

            }
        );


    const total =
        currentDimension.indicators.length;


    const answered =
        total -
        missing.length;


    return {

        valid:
            missing.length === 0,

        dimensionId:
            currentDimension.id,

        answered:
            answered,

        total:
            total,

        missing:
            missing.map(
                function(indicator){

                    return indicator.id;

                }
            ),

        firstMissing:
            missing.length
                ? missing[0].id
                : null

    };

}


/* =============================================================================
 * REQUIRE COMPLETE DIMENSION
 *
 * Called by individual page controller before navigation.
 * =============================================================================
 */


function requireComplete(){

    const validation =
        validateDimension();


    if(
        validation.valid
    ){

        hideMessage();


        return true;

    }


    const remaining =
        validation.total -
        validation.answered;


    const message =
        remaining === 1

            ? 'அடுத்த பகுதிக்குச் செல்லும் முன் மீதமுள்ள 1 கேள்விக்கும் பதிலளிக்கவும்.'

            : (
                'அடுத்த பகுதிக்குச் செல்லும் முன் மீதமுள்ள ' +
                String(remaining) +
                ' கேள்விகளுக்கும் பதிலளிக்கவும்.'
            );


    showMessage(
        message
    );


    if(
        validation.firstMissing
    ){

        scrollToIndicator(
            validation.firstMissing
        );

    }


    return false;

}


/* =============================================================================
 * COMPLETE CURRENT DIMENSION
 * =============================================================================
 */


function completeCurrentDimension(){

    if(
        !requireComplete()
    ){

        return false;

    }


    return (
        window.Page02Session.completeDimension(
            currentDimension.id
        )
    );

}


/* =============================================================================
 * DISPATCH ANSWER EVENT
 *
 * Individual page controllers can listen for this if they ever need
 * dimension-specific behaviour without modifying this shared engine.
 *
 * =============================================================================
 */


function dispatchAnswerEvent(
    indicatorId,
    score
){

    let event;


    try{

        event =
            new CustomEvent(
                'ctm:page02-answer',
                {

                    detail: {

                        dimensionId:
                            currentDimensionId,

                        indicatorId:
                            indicatorId,

                        score:
                            Number(score),

                        dimensionScore:
                            window.Page02Session
                                .getDimensionScore(
                                    currentDimensionId
                                ),

                        progress:
                            window.Page02Session
                                .getDimensionProgress(
                                    currentDimensionId
                                )

                    }

                }
            );

    }
    catch(error){

        return;

    }


    document.dispatchEvent(
        event
    );

}


/* =============================================================================
 * RESTORE VISUAL STATE
 *
 * Useful if another script changes session state after initial rendering.
 * =============================================================================
 */


function restore(){

    if(
        !currentDimension
    ){

        return false;

    }


    currentDimension.indicators.forEach(
        function(indicator){

            const answer =
                window.Page02Session.getAnswer(
                    indicator.id
                );


            const card =
                document.getElementById(
                    'indicator-' +
                    indicator.id
                );


            if(!card){

                return;

            }


            const buttons =
                card.querySelectorAll(
                    '.scorecard-option'
                );


            if(!answer){

                card.classList.remove(
                    'is-answered'
                );


                buttons.forEach(
                    function(button){

                        button.classList.remove(
                            'is-selected'
                        );


                        button.setAttribute(
                            'aria-pressed',
                            'false'
                        );

                    }
                );


                const scoreElement =
                    card.querySelector(
                        '[data-score-for="' +
                        CSS.escape(
                            indicator.id
                        ) +
                        '"]'
                    );


                if(scoreElement){

                    scoreElement.textContent =
                        '— / 4';

                }


                return;

            }


            card.classList.add(
                'is-answered'
            );


            buttons.forEach(
                function(button){

                    const selected =
                        Number(
                            button.dataset.score
                        ) ===
                        Number(
                            answer.score
                        );


                    button.classList.toggle(
                        'is-selected',
                        selected
                    );


                    button.setAttribute(
                        'aria-pressed',
                        selected
                            ? 'true'
                            : 'false'
                    );

                }
            );


            const scoreElement =
                card.querySelector(
                    '[data-score-for="' +
                    CSS.escape(
                        indicator.id
                    ) +
                    '"]'
                );


            if(scoreElement){

                scoreElement.textContent =
                    String(
                        answer.score
                    ) +
                    ' / 4';

            }

        }
    );


    updateLiveScore();


    updateQuestionProgress();


    return true;

}


/* =============================================================================
 * GET CURRENT DIMENSION
 * =============================================================================
 */


function getCurrentDimension(){

    return currentDimension;

}


/* =============================================================================
 * GET CURRENT DIMENSION ID
 * =============================================================================
 */


function getCurrentDimensionId(){

    return currentDimensionId;

}


/* =============================================================================
 * GET DIMENSION SCORE
 * =============================================================================
 */


function getCurrentScore(){

    if(
        !currentDimension
    ){

        return 0;

    }


    return (
        window.Page02Session.getDimensionScore(
            currentDimension.id
        )
    );

}


/* =============================================================================
 * GET DIMENSION PROGRESS
 * =============================================================================
 */


function getCurrentProgress(){

    if(
        !currentDimension
    ){

        return {

            answered:
                0,

            total:
                0,

            percent:
                0,

            score:
                0,

            maximumScore:
                0,

            complete:
                false

        };

    }


    return (
        window.Page02Session.getDimensionProgress(
            currentDimension.id
        )
    );

}


/* =============================================================================
 * INITIALIZE
 *
 * Usage from page02b.js:
 *
 *      Page02Scorecard.init({
 *          dimensionId: 'wealth'
 *      });
 *
 * =============================================================================
 */


function init(
    options
){

    options =
        options || {};


    const dimensionId =
        options.dimensionId;


    if(
        !dimensionId
    ){

        console.error(
            'CTM PATH™ Page02Scorecard.init() requires dimensionId.'
        );


        return false;

    }


    const dimension =
        getDimension(
            dimensionId
        );


    if(
        !dimension
    ){

        console.error(
            'CTM PATH™ unknown Page 02 dimension:',
            dimensionId
        );


        return false;

    }


    currentDimensionId =
        dimensionId;


    currentDimension =
        dimension;


    /* -------------------------------------------------------------------------
     * PRESERVE JOURNEY LOCATION
     * -------------------------------------------------------------------------
     */


    window.Page02Session.setCurrentDimension(
        dimensionId
    );


    /* -------------------------------------------------------------------------
     * RENDER
     * -------------------------------------------------------------------------
     */


    renderDimensionHeader();


    renderJourneyProgress();


    renderScorecard();


    renderScoreGuide();


    updateLiveScore();


    updateQuestionProgress();


    hideMessage();


    console.info(
        'CTM PATH™ Page 02 scorecard ready:',
        {

            dimensionId:
                currentDimension.id,

            indicators:
                currentDimension.indicators.length,

            score:
                getCurrentScore(),

            progress:
                getCurrentProgress()

        }
    );


    return true;

}


/* =============================================================================
 * PUBLIC API
 * =============================================================================
 */


Page02Scorecard.init =
    init;


Page02Scorecard.restore =
    restore;


Page02Scorecard.validate =
    validateDimension;


Page02Scorecard.requireComplete =
    requireComplete;


Page02Scorecard.complete =
    completeCurrentDimension;


Page02Scorecard.getDimension =
    getCurrentDimension;


Page02Scorecard.getDimensionId =
    getCurrentDimensionId;


Page02Scorecard.getScore =
    getCurrentScore;


Page02Scorecard.getProgress =
    getCurrentProgress;


Page02Scorecard.getFirstUnanswered =
    getFirstUnansweredIndicator;


Page02Scorecard.scrollToIndicator =
    scrollToIndicator;


Page02Scorecard.updateScore =
    updateLiveScore;


Page02Scorecard.updateProgress =
    updateQuestionProgress;


Page02Scorecard.showMessage =
    showMessage;


Page02Scorecard.hideMessage =
    hideMessage;


/* =============================================================================
 * PUBLIC EXPOSURE
 * =============================================================================
 */


window.Page02Scorecard =
    Page02Scorecard;


/* =============================================================================
 * READY
 * =============================================================================
 */


console.info(
    'CTM PATH™ Page02Scorecard v' +
    Page02Scorecard.version +
    ' loaded.'
);


/* =============================================================================
 * END
 *
 * REQUIRED SCRIPT ORDER FOR DIMENSION PAGES:
 *
 *      <script src="../js/page02/page02-data.js"></script>
 *
 *      <script src="../js/page02/page02-session.js"></script>
 *
 *      <script src="../js/page02/page02-scorecard.js"></script>
 *
 *      <script src="../js/page02/page02b.js"></script>
 *
 *
 * ARCHITECTURE:
 *
 *                      page02-data.js
 *                             ↓
 *                      page02-session.js
 *                             ↓
 *                    page02-scorecard.js
 *                             ↓
 *          ┌──────────────────┼──────────────────┐
 *          ↓                  ↓                  ↓
 *      page02b.js         page02c.js        page02d.js
 *          ↓                  ↓                  ↓
 *       Wealth            Income              Assets
 *
 *                  page02e.js        page02f.js
 *                      ↓                 ↓
 *                  Lifestyle         Protection
 *
 *
 * NEXT FILE:
 *
 *      js/page02/page02b.js
 *
 * =============================================================================
 */


})(window, document);

