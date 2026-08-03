
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * Frontend v2.3
 * -----------------------------------------------------------------------------
 * File          : js/page02.js
 * Page          : 02 / 07
 *
 * Experience
 *
 *      MIDDLE CLASS → MILLIONAIRE
 *      LIFESTYLE SCORECARD™
 *
 * -----------------------------------------------------------------------------
 * VERSION 2.3 ARCHITECTURE
 * -----------------------------------------------------------------------------
 *
 *      Batch 1
 *          Foundation
 *          Configuration
 *          Final DOM contract
 *          Runtime state
 *          Score model
 *          Frozen 25-indicator master
 *          Frozen 100 selectable ranges
 *
 *      Batch 2
 *          DOM helpers
 *          Screen controller
 *          Intro → KYC navigation
 *          KYC capture
 *          CTM_API.register()
 *
 *      Batch 3
 *          Canonical four-option renderer
 *          Answer selection
 *          Live scoring
 *          Dimension progress
 *
 *      Batch 4
 *          Dimension navigation
 *          Dimension validation
 *          Complete-scorecard validation
 *
 *      Batch 5
 *          Final result engine
 *          CTM_API.saveDiscovery()
 *          Result rendering
 *          Page 03 continuation
 *
 *      Batch 6
 *          Session recovery
 *          Header integration
 *          Initialization
 *          Public API
 *          Production closure
 *
 * -----------------------------------------------------------------------------
 * CORE SCORECARD MODEL
 * -----------------------------------------------------------------------------
 *
 *      5 dimensions
 *      5 indicators per dimension
 *      25 indicators total
 *
 *      Every indicator contains EXACTLY four controlled choices.
 *
 *          1 = STARTING™
 *          2 = PROGRESSING™
 *          3 = ADVANCING™
 *          4 = ACHIEVED™
 *
 *      Maximum:
 *
 *          25 × 4 = 100
 *
 * -----------------------------------------------------------------------------
 * IMPORTANT
 * -----------------------------------------------------------------------------
 *
 *      Users NEVER type financial or lifestyle scorecard values.
 *
 *      Every indicator is answered through one of four
 *      predefined ranges.
 *
 *      The selected range determines the score.
 *
 *      The representative numeric value is retained only
 *      for backend compatibility and structured reporting.
 *
 * =============================================================================
 */


'use strict';


/* =============================================================================
 * PAGE NAMESPACE
 * =============================================================================
 */


const Page02 = {};


/* =============================================================================
 * VERSION
 * =============================================================================
 */


Page02.version = '2.3';


/* =============================================================================
 * CONFIGURATION
 * =============================================================================
 */


Page02.CONFIG = {

    pageNumber:
        2,

    totalPages:
        7,

    pageLabel:
        '02 / 07',

    experience:
        'MILLIONAIRE JOURNEY™',

    module:
        'Middle Class → Millionaire Lifestyle Scorecard™',

    nextPage:
        'page03.html',

    scoring: {

        minimum:
            1,

        maximum:
            4,

        indicatorCount:
            25,

        dimensionCount:
            5,

        indicatorsPerDimension:
            5,

        maximumScore:
            100

    },

    storageKeys: {

        page02Session:
            'CTM_PATH_PAGE02',

        page02Result:
            'CTM_PATH_MILLIONAIRE_RESULT',

        peopleId:
            'ctm_people_id',

        fullName:
            'ctm_full_name'

    }

};


/* =============================================================================
 * FINAL PAGE 02 DOM CONTRACT
 * =============================================================================
 *
 * This contract maps directly to the finalized page02.html.
 *
 * v2.3 MUST use these IDs.
 *
 * Do not reintroduce the previous camelCase DOM IDs.
 *
 * =============================================================================
 */


Page02.DOM = {

    page:
        'page02',


    /* -------------------------------------------------------------------------
     * SCREENS
     * -------------------------------------------------------------------------
     */

    introScreen:
        'intro-screen',

    kycScreen:
        'kyc-screen',

    scorecardScreen:
        'scorecard-screen',

    resultScreen:
        'result-screen',


    /* -------------------------------------------------------------------------
     * INTRO
     * -------------------------------------------------------------------------
     */

    beginButton:
        'begin-page02',


    /* -------------------------------------------------------------------------
     * KYC
     * -------------------------------------------------------------------------
     */

    kycForm:
        'kyc-form',

    kycError:
        'kyc-error',

    submitKyc:
        'submit-kyc',


    /* -------------------------------------------------------------------------
     * SCORECARD
     * -------------------------------------------------------------------------
     */

    dimensionProgress:
        'dimension-progress',

    dimensionQuestions:
        'dimension-questions',

    dimensionBack:
        'dimension-back',

    dimensionNext:
        'dimension-next',

    scorecardError:
        'scorecard-error',


    /* -------------------------------------------------------------------------
     * RESULT
     * -------------------------------------------------------------------------
     */

    resultScore:
        'result-score',

    resultPercentage:
        'result-percentage',

    resultStage:
        'result-stage',

    resultGap:
        'result-gap',

    dimensionResults:
        'dimension-results',

    strongestDimension:
        'strongest-dimension',

    strongestPercentage:
        'strongest-percentage',

    growthDimension:
        'growth-dimension',

    growthPercentage:
        'growth-percentage',

    resultContinue:
        'result-continue',


    /* -------------------------------------------------------------------------
     * GLOBAL PAGE LOADER
     * -------------------------------------------------------------------------
     */

    loadingOverlay:
        'loadingOverlay'

};


/* =============================================================================
 * CANONICAL PAGE SCREENS
 * =============================================================================
 */


Page02.SCREENS = {

    INTRO:
        'intro',

    KYC:
        'kyc',

    SCORECARD:
        'scorecard',

    RESULT:
        'result'

};


/* =============================================================================
 * RUNTIME STATE
 * =============================================================================
 */


Page02.state = {

    currentScreen:
        Page02.SCREENS.INTRO,

    currentDimension:
        0,

    clientId:
        null,

    peopleId:
        null,

    kyc:
        {},

    answers:
        {},

    result:
        null,

    registrationResponse:
        null,

    discoveryResponse:
        null,

    isRegistering:
        false,

    isSaving:
        false,

    initialized:
        false

};


/* =============================================================================
 * OPTION FACTORY
 * =============================================================================
 *
 * score
 * -----------------------------------------------------------------------------
 *
 *      Actual Lifestyle Scorecard™ score:
 *
 *          1
 *          2
 *          3
 *          4
 *
 *
 * label
 * -----------------------------------------------------------------------------
 *
 *      Exact user-visible controlled range.
 *
 *
 * value
 * -----------------------------------------------------------------------------
 *
 *      Representative numeric value.
 *
 *      This is NOT independently entered by the user.
 *
 *      It exists for:
 *
 *          • backend compatibility
 *          • structured discovery records
 *          • reporting
 *          • future analytics
 *
 * =============================================================================
 */


Page02.option = function(
    score,
    label,
    value
){

    return {

        score:
            Number(score),

        label:
            String(label),

        value:
            value

    };

};


/* =============================================================================
 * FOUR-OPTION SCORE STATUS
 * =============================================================================
 */


Page02.SCORE_STATUS = {

    1: {

        score:
            1,

        tamil:
            'தொடக்கம்',

        english:
            'STARTING™'

    },

    2: {

        score:
            2,

        tamil:
            'முன்னேற்றம்',

        english:
            'PROGRESSING™'

    },

    3: {

        score:
            3,

        tamil:
            'மேம்பட்ட நிலை',

        english:
            'ADVANCING™'

    },

    4: {

        score:
            4,

        tamil:
            'இலக்கு அடைந்தது',

        english:
            'ACHIEVED™'

    }

};


/* =============================================================================
 * GET SCORE STATUS
 * =============================================================================
 */


Page02.getScoreStatus = function(score){

    const normalizedScore =
        Number(score);


    return (

        Page02.SCORE_STATUS[
            normalizedScore
        ] || {

            score:
                0,

            tamil:
                '',

            english:
                ''

        }

    );

};


/* =============================================================================
 * SCORECARD MASTER
 * =============================================================================
 *
 * FROZEN CONTENT
 *
 *      5 dimensions
 *      25 indicators
 *      100 selectable ranges
 *
 * IMPORTANT
 *
 *      Do not modify:
 *
 *          • indicator IDs
 *          • indicator numbers
 *          • Tamil labels
 *          • English labels
 *          • ideal values
 *          • targets
 *          • option ordering
 *          • option labels
 *          • representative values
 *          • score values
 *
 *      without deliberately creating a new scorecard version.
 *
 * =============================================================================
 */


Page02.DIMENSIONS = [


    /* =========================================================================
     * DIMENSION 01
     * WEALTH
     * =========================================================================
     */


    {

        id:
            'wealth',

        number:
            '01',

        tamil:
            'செல்வம்',

        english:
            'WEALTH™',

        indicators: [


            /* -----------------------------------------------------------------
             * 01 — NET WORTH
             * -----------------------------------------------------------------
             */

            {

                id:
                    'netWorth',

                number:
                    1,

                tamil:
                    'நிகர சொத்து மதிப்பு',

                english:
                    'Net Worth',

                ideal:
                    '₹10 Cr+',

                target:
                    100000000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹4.99 Cr',
                        25000000
                    ),

                    Page02.option(
                        2,
                        '₹5 Cr – ₹7.49 Cr',
                        50000000
                    ),

                    Page02.option(
                        3,
                        '₹7.5 Cr – ₹9.99 Cr',
                        75000000
                    ),

                    Page02.option(
                        4,
                        '₹10 Cr+',
                        100000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 06 — LIQUID FINANCIAL INVESTMENTS
             * -----------------------------------------------------------------
             */

            {

                id:
                    'liquidFinancialInvestments',

                number:
                    6,

                tamil:
                    'திரவ நிதி முதலீடுகள்',

                english:
                    'Liquid Financial Investments',

                ideal:
                    '₹2 Cr+',

                target:
                    20000000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹99 Lakh',
                        5000000
                    ),

                    Page02.option(
                        2,
                        '₹1 Cr – ₹1.49 Cr',
                        10000000
                    ),

                    Page02.option(
                        3,
                        '₹1.5 Cr – ₹1.99 Cr',
                        15000000
                    ),

                    Page02.option(
                        4,
                        '₹2 Cr+',
                        20000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 07 — CASH / OPPORTUNITY RESERVE
             * -----------------------------------------------------------------
             */

            {

                id:
                    'cashOpportunityReserve',

                number:
                    7,

                tamil:
                    'பண / வாய்ப்பு கையிருப்பு',

                english:
                    'Cash / Opportunity Reserve',

                ideal:
                    '₹50 Lakh+',

                target:
                    5000000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹24.99 Lakh',
                        1250000
                    ),

                    Page02.option(
                        2,
                        '₹25 – ₹37.49 Lakh',
                        2500000
                    ),

                    Page02.option(
                        3,
                        '₹37.5 – ₹49.99 Lakh',
                        3750000
                    ),

                    Page02.option(
                        4,
                        '₹50 Lakh+',
                        5000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 08 — HIGH-INTEREST DEBT
             * -----------------------------------------------------------------
             *
             * INVERSE SCORING
             *
             *      Less high-interest debt = higher score.
             *
             * -----------------------------------------------------------------
             */

            {

                id:
                    'highInterestDebt',

                number:
                    8,

                tamil:
                    'அதிக வட்டி கடன்',

                english:
                    'High-Interest Debt',

                ideal:
                    '₹0',

                target:
                    0,

                options: [

                    Page02.option(
                        1,
                        '₹5.01 Lakh+',
                        1000000
                    ),

                    Page02.option(
                        2,
                        '₹1.01 – ₹5 Lakh',
                        500000
                    ),

                    Page02.option(
                        3,
                        '₹1 – ₹1 Lakh',
                        100000
                    ),

                    Page02.option(
                        4,
                        '₹0 — No High-Interest Debt',
                        0
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 12 — GOLD OWNERSHIP
             * -----------------------------------------------------------------
             */

            {

                id:
                    'goldOwnership',

                number:
                    12,

                tamil:
                    'தங்க சொத்து',

                english:
                    'Gold Ownership',

                ideal:
                    '1 Kg+',

                target:
                    1000,

                options: [

                    Page02.option(
                        1,
                        '0 – 499 grams',
                        250
                    ),

                    Page02.option(
                        2,
                        '500 – 749 grams',
                        500
                    ),

                    Page02.option(
                        3,
                        '750 – 999 grams',
                        750
                    ),

                    Page02.option(
                        4,
                        '1 Kg+',
                        1000
                    )

                ]

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 02
     * INCOME & CASH FLOW
     * =========================================================================
     */


    {

        id:
            'incomeCashFlow',

        number:
            '02',

        tamil:
            'வருமானம் & பணப்புழக்கம்',

        english:
            'INCOME & CASH FLOW™',

        indicators: [


            /* -----------------------------------------------------------------
             * 02 — ANNUAL PERSONAL INCOME
             * -----------------------------------------------------------------
             */

            {

                id:
                    'annualPersonalIncome',

                number:
                    2,

                tamil:
                    'ஆண்டு தனிப்பட்ட வருமானம்',

                english:
                    'Annual Personal Income',

                ideal:
                    '₹1 Cr+',

                target:
                    10000000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹49.99 Lakh',
                        2500000
                    ),

                    Page02.option(
                        2,
                        '₹50 – ₹74.99 Lakh',
                        5000000
                    ),

                    Page02.option(
                        3,
                        '₹75 – ₹99.99 Lakh',
                        7500000
                    ),

                    Page02.option(
                        4,
                        '₹1 Cr+',
                        10000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 03 — MONTHLY INCOME
             * -----------------------------------------------------------------
             */

            {

                id:
                    'monthlyIncome',

                number:
                    3,

                tamil:
                    'மாத வருமானம்',

                english:
                    'Monthly Income',

                ideal:
                    '₹10 Lakh+',

                target:
                    1000000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹4.99 Lakh',
                        250000
                    ),

                    Page02.option(
                        2,
                        '₹5 – ₹7.49 Lakh',
                        500000
                    ),

                    Page02.option(
                        3,
                        '₹7.5 – ₹9.99 Lakh',
                        750000
                    ),

                    Page02.option(
                        4,
                        '₹10 Lakh+',
                        1000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 04 — PASSIVE / INVESTMENT INCOME
             * -----------------------------------------------------------------
             */

            {

                id:
                    'passiveInvestmentIncome',

                number:
                    4,

                tamil:
                    'செயலற்ற / முதலீட்டு வருமானம்',

                english:
                    'Passive / Investment Income',

                ideal:
                    '₹5 Lakh+/month',

                target:
                    500000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹2.49 Lakh / month',
                        125000
                    ),

                    Page02.option(
                        2,
                        '₹2.5 – ₹3.74 Lakh / month',
                        250000
                    ),

                    Page02.option(
                        3,
                        '₹3.75 – ₹4.99 Lakh / month',
                        375000
                    ),

                    Page02.option(
                        4,
                        '₹5 Lakh+ / month',
                        500000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 05 — ANNUAL INCOME TAX PAID
             * -----------------------------------------------------------------
             */

            {

                id:
                    'annualIncomeTaxPaid',

                number:
                    5,

                tamil:
                    'ஆண்டு வருமான வரி செலுத்தல்',

                english:
                    'Annual Income Tax Paid',

                ideal:
                    '₹25 Lakh+',

                target:
                    2500000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹12.49 Lakh',
                        625000
                    ),

                    Page02.option(
                        2,
                        '₹12.5 – ₹18.74 Lakh',
                        1250000
                    ),

                    Page02.option(
                        3,
                        '₹18.75 – ₹24.99 Lakh',
                        1875000
                    ),

                    Page02.option(
                        4,
                        '₹25 Lakh+',
                        2500000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 11 — INCOME-PRODUCING PROPERTIES
             * -----------------------------------------------------------------
             */

            {

                id:
                    'incomeProducingProperties',

                number:
                    11,

                tamil:
                    'வருமானம் தரும் சொத்துகள்',

                english:
                    'Income-Producing Properties',

                ideal:
                    '2+ properties',

                target:
                    2,

                options: [

                    Page02.option(
                        1,
                        'None / planning or acquiring first property',
                        0.5
                    ),

                    Page02.option(
                        2,
                        '1 property',
                        1
                    ),

                    Page02.option(
                        3,
                        '1 property + another being acquired',
                        1.5
                    ),

                    Page02.option(
                        4,
                        '2+ income-producing properties',
                        2
                    )

                ]

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 03
     * ASSETS
     * =========================================================================
     */


    {

        id:
            'assets',

        number:
            '03',

        tamil:
            'சொத்துகள்',

        english:
            'ASSETS™',

        indicators: [


            /* -----------------------------------------------------------------
             * 09 — LAND OWNERSHIP
             * -----------------------------------------------------------------
             */

            {

                id:
                    'landOwnership',

                number:
                    9,

                tamil:
                    'நில உரிமை',

                english:
                    'Land Ownership',

                ideal:
                    '10+ acres',

                target:
                    10,

                options: [

                    Page02.option(
                        1,
                        '0 – 2.49 acres',
                        2.5
                    ),

                    Page02.option(
                        2,
                        '2.5 – 4.99 acres',
                        5
                    ),

                    Page02.option(
                        3,
                        '5 – 9.99 acres',
                        7.5
                    ),

                    Page02.option(
                        4,
                        '10+ acres',
                        10
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 10 — PRIMARY RESIDENCE
             * -----------------------------------------------------------------
             */

            {

                id:
                    'primaryResidence',

                number:
                    10,

                tamil:
                    'முதன்மை வீடு',

                english:
                    'Primary Residence',

                ideal:
                    '₹2 Cr+ owned home',

                target:
                    20000000,

                options: [

                    Page02.option(
                        1,
                        'No owned home / ₹0 – ₹99 Lakh',
                        5000000
                    ),

                    Page02.option(
                        2,
                        '₹1 Cr – ₹1.49 Cr',
                        10000000
                    ),

                    Page02.option(
                        3,
                        '₹1.5 Cr – ₹1.99 Cr',
                        15000000
                    ),

                    Page02.option(
                        4,
                        '₹2 Cr+ owned home',
                        20000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 13 — PREMIUM AUTOMOBILE
             * -----------------------------------------------------------------
             */

            {

                id:
                    'premiumAutomobile',

                number:
                    13,

                tamil:
                    'பிரீமியம் வாகனம்',

                english:
                    'Premium Automobile',

                ideal:
                    '₹1 Cr+ car',

                target:
                    10000000,

                options: [

                    Page02.option(
                        1,
                        'No car / below ₹50 Lakh',
                        2500000
                    ),

                    Page02.option(
                        2,
                        '₹50 – ₹74.99 Lakh',
                        5000000
                    ),

                    Page02.option(
                        3,
                        '₹75 – ₹99.99 Lakh',
                        7500000
                    ),

                    Page02.option(
                        4,
                        '₹1 Cr+ car',
                        10000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 21 — CHILDREN'S EDUCATION FUND
             * -----------------------------------------------------------------
             */

            {

                id:
                    'childrenEducationFund',

                number:
                    21,

                tamil:
                    'குழந்தைகளின் கல்வி நிதி',

                english:
                    "Children's Education Fund",

                ideal:
                    '₹50 Lakh+/child',

                target:
                    5000000,

                options: [

                    Page02.option(
                        1,
                        'No dedicated fund / below ₹25 Lakh per child',
                        1250000
                    ),

                    Page02.option(
                        2,
                        '₹25 – ₹37.49 Lakh per child',
                        2500000
                    ),

                    Page02.option(
                        3,
                        '₹37.5 – ₹49.99 Lakh per child',
                        3750000
                    ),

                    Page02.option(
                        4,
                        '₹50 Lakh+ per child',
                        5000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 18 — HOUSEHOLD SUPPORT
             * -----------------------------------------------------------------
             */

            {

                id:
                    'householdSupport',

                number:
                    18,

                tamil:
                    'வீட்டு உதவி',

                english:
                    'Household Support',

                ideal:
                    '2+ paid staff',

                target:
                    2,

                options: [

                    Page02.option(
                        1,
                        'No paid household support / occasional paid help',
                        0.5
                    ),

                    Page02.option(
                        2,
                        '1 regular paid staff',
                        1
                    ),

                    Page02.option(
                        3,
                        '1 full-time staff + additional support',
                        1.5
                    ),

                    Page02.option(
                        4,
                        '2+ regular paid staff',
                        2
                    )

                ]

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 04
     * LIFESTYLE & FREEDOM
     * =========================================================================
     */


    {

        id:
            'lifestyleFreedom',

        number:
            '04',

        tamil:
            'வாழ்க்கைமுறை & சுதந்திரம்',

        english:
            'LIFESTYLE & FREEDOM™',

        indicators: [


            /* -----------------------------------------------------------------
             * 14 — INTERNATIONAL TRAVEL
             * -----------------------------------------------------------------
             */

            {

                id:
                    'internationalTravel',

                number:
                    14,

                tamil:
                    'சர்வதேச பயணம்',

                english:
                    'International Travel',

                ideal:
                    '12+ trips/year',

                target:
                    12,

                options: [

                    Page02.option(
                        1,
                        '0 – 2 international trips / year',
                        3
                    ),

                    Page02.option(
                        2,
                        '3 – 5 trips / year',
                        6
                    ),

                    Page02.option(
                        3,
                        '6 – 11 trips / year',
                        9
                    ),

                    Page02.option(
                        4,
                        '12+ trips / year',
                        12
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 15 — PREMIUM FAMILY VACATIONS
             * -----------------------------------------------------------------
             */

            {

                id:
                    'premiumFamilyVacations',

                number:
                    15,

                tamil:
                    'பிரீமியம் குடும்ப விடுமுறைகள்',

                english:
                    'Premium Family Vacations',

                ideal:
                    '2+ per year',

                target:
                    2,

                options: [

                    Page02.option(
                        1,
                        'None / occasional premium family vacation',
                        0.5
                    ),

                    Page02.option(
                        2,
                        '1 vacation / year',
                        1
                    ),

                    Page02.option(
                        3,
                        '1 premium vacation + additional short breaks',
                        1.5
                    ),

                    Page02.option(
                        4,
                        '2+ premium family vacations / year',
                        2
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 16 — PREMIUM ACCOMMODATION
             * -----------------------------------------------------------------
             */

            {

                id:
                    'premiumAccommodation',

                number:
                    16,

                tamil:
                    'பிரீமியம் தங்குமிடம்',

                english:
                    'Premium Accommodation',

                ideal:
                    '5-star when travelling',

                target:
                    100,

                options: [

                    Page02.option(
                        1,
                        'Rarely / up to about 25% of travel',
                        25
                    ),

                    Page02.option(
                        2,
                        'About 50% of travel',
                        50
                    ),

                    Page02.option(
                        3,
                        'About 75% of travel',
                        75
                    ),

                    Page02.option(
                        4,
                        '5-star / premium accommodation consistently',
                        100
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 17 — PREMIUM AIR TRAVEL
             * -----------------------------------------------------------------
             */

            {

                id:
                    'premiumAirTravel',

                number:
                    17,

                tamil:
                    'பிரீமியம் விமானப் பயணம்',

                english:
                    'Premium Air Travel',

                ideal:
                    '6+ business-class flights/year',

                target:
                    6,

                options: [

                    Page02.option(
                        1,
                        '0 – 1 business-class flight / year',
                        1.5
                    ),

                    Page02.option(
                        2,
                        '2 – 3 flights / year',
                        3
                    ),

                    Page02.option(
                        3,
                        '4 – 5 flights / year',
                        4.5
                    ),

                    Page02.option(
                        4,
                        '6+ business-class flights / year',
                        6
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 25 — TIME FREEDOM
             * -----------------------------------------------------------------
             */

            {

                id:
                    'timeFreedom',

                number:
                    25,

                tamil:
                    'நேர சுதந்திரம்',

                english:
                    'Time Freedom',

                ideal:
                    '30+ discretionary days',

                target:
                    30,

                options: [

                    Page02.option(
                        1,
                        '0 – 14 discretionary days / year',
                        7.5
                    ),

                    Page02.option(
                        2,
                        '15 – 21 days / year',
                        15
                    ),

                    Page02.option(
                        3,
                        '22 – 29 days / year',
                        22.5
                    ),

                    Page02.option(
                        4,
                        '30+ discretionary days / year',
                        30
                    )

                ]

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 05
     * PROTECTION & CONTRIBUTION
     * =========================================================================
     */


    {

        id:
            'protectionContribution',

        number:
            '05',

        tamil:
            'பாதுகாப்பு & பங்களிப்பு',

        english:
            'PROTECTION & CONTRIBUTION™',

        indicators: [


            /* -----------------------------------------------------------------
             * 19 — HEALTH & FITNESS INVESTMENT
             * -----------------------------------------------------------------
             */

            {

                id:
                    'healthFitnessInvestment',

                number:
                    19,

                tamil:
                    'உடல்நலம் & உடற்பயிற்சி முதலீடு',

                english:
                    'Health & Fitness Investment',

                ideal:
                    '₹2 Lakh+/year',

                target:
                    200000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹99,999 / year',
                        50000
                    ),

                    Page02.option(
                        2,
                        '₹1 – ₹1.49 Lakh / year',
                        100000
                    ),

                    Page02.option(
                        3,
                        '₹1.5 – ₹1.99 Lakh / year',
                        150000
                    ),

                    Page02.option(
                        4,
                        '₹2 Lakh+ / year',
                        200000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 20 — LEARNING & DEVELOPMENT
             * -----------------------------------------------------------------
             */

            {

                id:
                    'learningDevelopment',

                number:
                    20,

                tamil:
                    'கற்றல் & மேம்பாடு',

                english:
                    'Learning & Development',

                ideal:
                    '₹5 Lakh+/year',

                target:
                    500000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹2.49 Lakh / year',
                        125000
                    ),

                    Page02.option(
                        2,
                        '₹2.5 – ₹3.74 Lakh / year',
                        250000
                    ),

                    Page02.option(
                        3,
                        '₹3.75 – ₹4.99 Lakh / year',
                        375000
                    ),

                    Page02.option(
                        4,
                        '₹5 Lakh+ / year',
                        500000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 22 — LIFE INSURANCE PROTECTION
             * -----------------------------------------------------------------
             */

            {

                id:
                    'lifeInsuranceProtection',

                number:
                    22,

                tamil:
                    'ஆயுள் காப்பீட்டு பாதுகாப்பு',

                english:
                    'Life Insurance Protection',

                ideal:
                    '₹5 Cr+ cover',

                target:
                    50000000,

                options: [

                    Page02.option(
                        1,
                        'No cover / below ₹2.5 Cr',
                        12500000
                    ),

                    Page02.option(
                        2,
                        '₹2.5 – ₹3.74 Cr',
                        25000000
                    ),

                    Page02.option(
                        3,
                        '₹3.75 – ₹4.99 Cr',
                        37500000
                    ),

                    Page02.option(
                        4,
                        '₹5 Cr+ cover',
                        50000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 23 — FAMILY HEALTH INSURANCE
             * -----------------------------------------------------------------
             */

            {

                id:
                    'familyHealthInsurance',

                number:
                    23,

                tamil:
                    'குடும்ப மருத்துவ காப்பீடு',

                english:
                    'Family Health Insurance',

                ideal:
                    '₹50 Lakh+ cover',

                target:
                    5000000,

                options: [

                    Page02.option(
                        1,
                        'No cover / below ₹25 Lakh',
                        1250000
                    ),

                    Page02.option(
                        2,
                        '₹25 – ₹37.49 Lakh',
                        2500000
                    ),

                    Page02.option(
                        3,
                        '₹37.5 – ₹49.99 Lakh',
                        3750000
                    ),

                    Page02.option(
                        4,
                        '₹50 Lakh+ cover',
                        5000000
                    )

                ]

            },


            /* -----------------------------------------------------------------
             * 24 — CHARITY / SOCIAL CONTRIBUTION
             * -----------------------------------------------------------------
             */

            {

                id:
                    'charitySocialContribution',

                number:
                    24,

                tamil:
                    'அறப்பணி / சமூக பங்களிப்பு',

                english:
                    'Charity / Social Contribution',

                ideal:
                    '₹10 Lakh+/year',

                target:
                    1000000,

                options: [

                    Page02.option(
                        1,
                        '₹0 – ₹4.99 Lakh / year',
                        250000
                    ),

                    Page02.option(
                        2,
                        '₹5 – ₹7.49 Lakh / year',
                        500000
                    ),

                    Page02.option(
                        3,
                        '₹7.5 – ₹9.99 Lakh / year',
                        750000
                    ),

                    Page02.option(
                        4,
                        '₹10 Lakh+ / year',
                        1000000
                    )

                ]

            }

        ]

    }

];


/* =============================================================================
 * MASTER INTEGRITY HELPERS
 * =============================================================================
 *
 * These helpers do not touch the DOM.
 *
 * Their only responsibility is to expose and validate the frozen
 * scorecard definition.
 *
 * =============================================================================
 */


/* =============================================================================
 * GET ALL INDICATORS
 * =============================================================================
 */


Page02.getAllIndicators = function(){

    return Page02.DIMENSIONS.reduce(

        function(
            allIndicators,
            dimension
        ){

            return allIndicators.concat(
                dimension.indicators
            );

        },

        []

    );

};


/* =============================================================================
 * GET DIMENSION COUNT
 * =============================================================================
 */


Page02.getDimensionCount = function(){

    return Page02.DIMENSIONS.length;

};


/* =============================================================================
 * GET INDICATOR COUNT
 * =============================================================================
 */


Page02.getIndicatorCount = function(){

    return Page02
        .getAllIndicators()
        .length;

};


/* =============================================================================
 * GET OPTION COUNT
 * =============================================================================
 */


Page02.getOptionCount = function(){

    return Page02
        .getAllIndicators()
        .reduce(

            function(
                total,
                indicator
            ){

                return (
                    total +
                    indicator.options.length
                );

            },

            0

        );

};


/* =============================================================================
 * GET MAXIMUM SCORE
 * =============================================================================
 */


Page02.getMaximumScore = function(){

    return (

        Page02.getIndicatorCount() *
        Page02.CONFIG.scoring.maximum

    );

};


/* =============================================================================
 * GET DIMENSION BY INDEX
 * =============================================================================
 */


Page02.getDimension = function(index){

    const normalizedIndex =
        Number(index);


    if(
        !Number.isInteger(
            normalizedIndex
        ) ||
        normalizedIndex < 0 ||
        normalizedIndex >=
            Page02.DIMENSIONS.length
    ){

        return null;

    }


    return (

        Page02.DIMENSIONS[
            normalizedIndex
        ] || null

    );

};


/* =============================================================================
 * GET DIMENSION BY ID
 * =============================================================================
 */


Page02.getDimensionById = function(
    dimensionId
){

    return (

        Page02.DIMENSIONS.find(

            function(dimension){

                return (
                    dimension.id ===
                    dimensionId
                );

            }

        ) || null

    );

};


/* =============================================================================
 * GET INDICATOR BY ID
 * =============================================================================
 */


Page02.getIndicator = function(
    indicatorId
){

    return (

        Page02
            .getAllIndicators()
            .find(

                function(indicator){

                    return (
                        indicator.id ===
                        indicatorId
                    );

                }

            ) || null

    );

};


/* =============================================================================
 * GET INDICATOR'S DIMENSION
 * =============================================================================
 */


Page02.getIndicatorDimension = function(
    indicatorId
){

    return (

        Page02.DIMENSIONS.find(

            function(dimension){

                return dimension.indicators.some(

                    function(indicator){

                        return (
                            indicator.id ===
                            indicatorId
                        );

                    }

                );

            }

        ) || null

    );

};


/* =============================================================================
 * VALIDATE FROZEN SCORECARD MASTER
 * =============================================================================
 *
 * Expected:
 *
 *      5 dimensions
 *      5 indicators each
 *      25 indicators
 *      4 options each
 *      100 options
 *      scores 1 / 2 / 3 / 4
 *      maximum score 100
 *      unique dimension IDs
 *      unique indicator IDs
 *
 * =============================================================================
 */


Page02.validateMaster = function(){

    const errors =
        [];

    const dimensions =
        Page02.DIMENSIONS;

    const indicators =
        Page02.getAllIndicators();

    const dimensionIds =
        new Set();

    const indicatorIds =
        new Set();


    /* -------------------------------------------------------------------------
     * DIMENSION COUNT
     * -------------------------------------------------------------------------
     */


    if(
        dimensions.length !==
        Page02.CONFIG.scoring.dimensionCount
    ){

        errors.push(
            'Expected exactly 5 dimensions.'
        );

    }


    /* -------------------------------------------------------------------------
     * DIMENSION VALIDATION
     * -------------------------------------------------------------------------
     */


    dimensions.forEach(

        function(
            dimension,
            dimensionIndex
        ){

            if(
                !dimension ||
                typeof dimension !==
                    'object'
            ){

                errors.push(
                    'Invalid dimension at index ' +
                    dimensionIndex +
                    '.'
                );

                return;

            }


            if(!dimension.id){

                errors.push(
                    'Dimension at index ' +
                    dimensionIndex +
                    ' has no ID.'
                );

            }


            if(
                dimensionIds.has(
                    dimension.id
                )
            ){

                errors.push(
                    'Duplicate dimension ID: ' +
                    dimension.id
                );

            }


            dimensionIds.add(
                dimension.id
            );


            if(
                !Array.isArray(
                    dimension.indicators
                )
            ){

                errors.push(
                    'Dimension ' +
                    dimension.id +
                    ' has no indicator array.'
                );

                return;

            }


            if(
                dimension.indicators.length !==
                Page02.CONFIG.scoring
                    .indicatorsPerDimension
            ){

                errors.push(
                    'Dimension ' +
                    dimension.id +
                    ' must contain exactly 5 indicators.'
                );

            }

        }

    );


    /* -------------------------------------------------------------------------
     * INDICATOR COUNT
     * -------------------------------------------------------------------------
     */


    if(
        indicators.length !==
        Page02.CONFIG.scoring.indicatorCount
    ){

        errors.push(
            'Expected exactly 25 indicators.'
        );

    }


    /* -------------------------------------------------------------------------
     * INDICATOR VALIDATION
     * -------------------------------------------------------------------------
     */


    indicators.forEach(

        function(indicator){

            if(
                !indicator ||
                typeof indicator !==
                    'object'
            ){

                errors.push(
                    'Invalid indicator definition.'
                );

                return;

            }


            if(!indicator.id){

                errors.push(
                    'Indicator has no ID.'
                );

                return;

            }


            if(
                indicatorIds.has(
                    indicator.id
                )
            ){

                errors.push(
                    'Duplicate indicator ID: ' +
                    indicator.id
                );

            }


            indicatorIds.add(
                indicator.id
            );


            if(
                !Array.isArray(
                    indicator.options
                )
            ){

                errors.push(
                    indicator.id +
                    ' has no options array.'
                );

                return;

            }


            if(
                indicator.options.length !==
                4
            ){

                errors.push(
                    indicator.id +
                    ' must contain exactly four options.'
                );

                return;

            }


            const scores =
                indicator.options.map(

                    function(option){

                        return Number(
                            option.score
                        );

                    }

                );


            const expectedScores =
                [1, 2, 3, 4];


            expectedScores.forEach(

                function(
                    expectedScore,
                    optionIndex
                ){

                    if(
                        scores[
                            optionIndex
                        ] !==
                        expectedScore
                    ){

                        errors.push(
                            indicator.id +
                            ' option ' +
                            (
                                optionIndex +
                                1
                            ) +
                            ' must have score ' +
                            expectedScore +
                            '.'
                        );

                    }

                }

            );

        }

    );


    /* -------------------------------------------------------------------------
     * OPTION COUNT
     * -------------------------------------------------------------------------
     */


    if(
        Page02.getOptionCount() !==
        100
    ){

        errors.push(
            'Expected exactly 100 selectable ranges.'
        );

    }


    /* -------------------------------------------------------------------------
     * MAXIMUM SCORE
     * -------------------------------------------------------------------------
     */


    if(
        Page02.getMaximumScore() !==
        Page02.CONFIG.scoring.maximumScore
    ){

        errors.push(
            'Maximum score must equal 100.'
        );

    }


    /* -------------------------------------------------------------------------
     * RESULT
     * -------------------------------------------------------------------------
     */


    return {

        valid:
            errors.length === 0,

        dimensions:
            dimensions.length,

        indicators:
            indicators.length,

        options:
            Page02.getOptionCount(),

        maximumScore:
            Page02.getMaximumScore(),

        errors:
            errors

    };

};


/* =============================================================================
 * MASTER DEBUG INFORMATION
 * =============================================================================
 *
 * Available after the complete v2.3 controller is initialized:
 *
 *      Page02.masterInfo()
 *
 * Expected:
 *
 *      version         2.3
 *      dimensions      5
 *      indicators      25
 *      options         100
 *      maximumScore    100
 *      valid           true
 *
 * =============================================================================
 */


Page02.masterInfo = function(){

    const validation =
        Page02.validateMaster();


    return {

        application:
            'CTM PATH™ MILLIONAIRES™',

        experience:
            'Guided Journey™',

        page:
            Page02.CONFIG.pageLabel,

        module:
            Page02.CONFIG.module,

        version:
            Page02.version,

        dimensions:
            validation.dimensions,

        indicators:
            validation.indicators,

        options:
            validation.options,

        maximumScore:
            validation.maximumScore,

        valid:
            validation.valid,

        errors:
            validation.errors

    };

};


/* =============================================================================
 * END OF BATCH 1
 * =============================================================================
 *
 * CTM PATH™ PAGE 02 v2.3
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Canonical Page02 namespace
 *      ✓ v2.3 configuration
 *      ✓ FINAL page02.html DOM contract
 *      ✓ Clean runtime state
 *      ✓ Four-level scoring model
 *
 *      ✓ Dimension 01 — Wealth
 *      ✓ Dimension 02 — Income & Cash Flow
 *      ✓ Dimension 03 — Assets
 *      ✓ Dimension 04 — Lifestyle & Freedom
 *      ✓ Dimension 05 — Protection & Contribution
 *
 *      ✓ 25 frozen indicators
 *      ✓ 4 frozen ranges per indicator
 *      ✓ 100 controlled ranges
 *      ✓ Maximum score = 100
 *
 *      ✓ Master lookup helpers
 *      ✓ Master integrity validator
 *      ✓ Duplicate-ID validation
 *      ✓ Four-option validation
 *      ✓ Score-order validation
 *      ✓ Maximum-score validation
 *
 *
 * IMPORTANT
 *
 *      DO NOT initialize Page02 here.
 *
 *      DO NOT attach DOM listeners here.
 *
 *      DO NOT render scorecard HTML here.
 *
 *      DO NOT call CTM_API here.
 *
 *      DO NOT expose window.Page02 here.
 *
 *
 * Batch 2 continues immediately below this line.
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 2
 *
 * DOM HELPERS
 * SCREEN CONTROLLER
 * INTRO → KYC
 * KYC CAPTURE
 * KYC VALIDATION
 * CTM_API.register()
 * CLIENT IDENTITY
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      • Bind directly to the finalized Page 02 DOM
 *      • Control Intro / KYC / Scorecard / Result screens
 *      • Open ABOUT YOU™ from LET'S BEGIN
 *      • Read the finalized KYC form
 *      • Normalize mobile / email / pincode
 *      • Validate required KYC fields
 *      • Build backend-compatible registration payload
 *      • Call CTM_API.register()
 *      • Capture PeopleID / ClientID
 *      • Persist client identity
 *      • Enter Dimension 01 after successful registration
 *
 * DOES NOT:
 *
 *      • Render scorecard questions
 *      • Handle scorecard option selection
 *      • Navigate between dimensions
 *      • Calculate final result
 *      • Call CTM_API.saveDiscovery()
 *      • Navigate to Page 03
 *
 * =============================================================================
 */


/* =============================================================================
 * BASIC DOM HELPERS
 * =============================================================================
 */


Page02.el = function(id){

    return document.getElementById(
        id
    );

};


Page02.query = function(
    selector,
    root
){

    return (
        root ||
        document
    ).querySelector(
        selector
    );

};


Page02.queryAll = function(
    selector,
    root
){

    return Array.from(
        (
            root ||
            document
        ).querySelectorAll(
            selector
        )
    );

};


/* =============================================================================
 * SAFE TEXT
 * =============================================================================
 */


Page02.safeText = function(value){

    if(
        value === null ||
        value === undefined
    ){

        return '';

    }


    return String(value);

};


/* =============================================================================
 * NORMALIZE TEXT
 * =============================================================================
 */


Page02.normalizeText = function(value){

    return Page02
        .safeText(value)
        .trim()
        .replace(
            /\s+/g,
            ' '
        );

};


/* =============================================================================
 * SCREEN ID MAP
 * =============================================================================
 *
 * IMPORTANT
 *
 * The finalized HTML currently contains:
 *
 *      #intro-screen
 *      #kyc-screen
 *      #scorecard-screen
 *      #result-screen
 *
 * The KYC section uses:
 *
 *      data-screen="about"
 *
 * JavaScript therefore controls screens by canonical element ID,
 * NOT by depending on data-screen values.
 *
 * =============================================================================
 */


Page02.SCREEN_IDS = {

    intro:
        Page02.DOM.introScreen,

    kyc:
        Page02.DOM.kycScreen,

    scorecard:
        Page02.DOM.scorecardScreen,

    result:
        Page02.DOM.resultScreen

};


/* =============================================================================
 * GET SCREEN ELEMENT
 * =============================================================================
 */


Page02.getScreenElement = function(
    screenName
){

    const id =
        Page02.SCREEN_IDS[
            screenName
        ];


    if(!id){

        return null;

    }


    return Page02.el(
        id
    );

};


/* =============================================================================
 * SHOW SCREEN
 * =============================================================================
 */


Page02.showScreen = function(
    screenName,
    options
){

    const settings =
        Object.assign(
            {
                scroll:
                    true,

                focus:
                    false
            },
            options || {}
        );


    if(
        !Object.prototype.hasOwnProperty.call(
            Page02.SCREEN_IDS,
            screenName
        )
    ){

        console.error(
            'CTM PATH™ Page 02: Unknown screen:',
            screenName
        );

        return false;

    }


    Object.keys(
        Page02.SCREEN_IDS
    )
    .forEach(
        function(name){

            const screen =
                Page02.getScreenElement(
                    name
                );


            if(!screen){

                return;

            }


            const active =
                name ===
                screenName;


            screen.hidden =
                !active;


            screen.classList.toggle(
                'is-active',
                active
            );


            screen.setAttribute(
                'aria-hidden',
                active
                    ? 'false'
                    : 'true'
            );

        }
    );


    Page02.state.currentScreen =
        screenName;


    /*
     * Batch 6 will provide saveSession().
     *
     * This hook is deliberately safe before Batch 6 exists.
     */

    if(
        typeof Page02.saveSession ===
        'function'
    ){

        Page02.saveSession();

    }


    if(settings.scroll){

        window.scrollTo({
            top:
                0,

            left:
                0,

            behavior:
                'smooth'
        });

    }


    if(settings.focus){

        const activeScreen =
            Page02.getScreenElement(
                screenName
            );


        if(activeScreen){

            const heading =
                activeScreen.querySelector(
                    'h1, h2, [data-screen-heading]'
                );


            if(heading){

                heading.setAttribute(
                    'tabindex',
                    '-1'
                );


                heading.focus({
                    preventScroll:
                        true
                });

            }

        }

    }


    return true;

};


/* =============================================================================
 * OPEN KYC
 * =============================================================================
 */


Page02.openKYC = function(){

    Page02.showScreen(
        Page02.SCREENS.KYC,
        {
            focus:
                true
        }
    );

};


/* =============================================================================
 * RETURN TO INTRO
 * =============================================================================
 */


Page02.returnToIntro = function(){

    Page02.showScreen(
        Page02.SCREENS.INTRO
    );

};


/* =============================================================================
 * OPEN SCORECARD
 * =============================================================================
 *
 * Rendering is intentionally deferred to Batch 3.
 *
 * If Batch 3's renderer exists, use it.
 *
 * =============================================================================
 */


Page02.openScorecard = function(){

    Page02.state.currentDimension =
        0;


    Page02.showScreen(
        Page02.SCREENS.SCORECARD
    );


    if(
        typeof Page02.renderCurrentDimension ===
        'function'
    ){

        Page02.renderCurrentDimension();

    }

};


/* =============================================================================
 * LOADING OVERLAY
 * =============================================================================
 */


Page02.setLoading = function(
    loading
){

    const overlay =
        Page02.el(
            Page02.DOM.loadingOverlay
        );


    if(!overlay){

        return;

    }


    const active =
        Boolean(
            loading
        );


    overlay.hidden =
        !active;


    overlay.classList.toggle(
        'is-active',
        active
    );


    overlay.setAttribute(
        'aria-hidden',
        active
            ? 'false'
            : 'true'
    );

};


/* =============================================================================
 * GET KYC FORM
 * =============================================================================
 */


Page02.getKYCForm = function(){

    return Page02.el(
        Page02.DOM.kycForm
    );

};


/* =============================================================================
 * GET FORM CONTROL
 * =============================================================================
 */


Page02.getFormControl = function(
    form,
    name
){

    if(
        !form ||
        !form.elements
    ){

        return null;

    }


    return (
        form.elements[
            name
        ] || null
    );

};


/* =============================================================================
 * GET FORM VALUE
 * =============================================================================
 *
 * Works with:
 *
 *      input
 *      select
 *      textarea
 *      radio groups
 *
 * =============================================================================
 */


Page02.getFormValue = function(
    form,
    name
){

    if(!form){

        return '';

    }


    const data =
        new FormData(
            form
        );


    return Page02.normalizeText(
        data.get(name)
    );

};


/* =============================================================================
 * NORMALIZE MOBILE
 * =============================================================================
 */


Page02.normalizeMobile = function(value){

    let mobile =
        Page02
            .safeText(value)
            .replace(
                /\D/g,
                ''
            );


    /*
     * Accept:
     *
     *      9876543210
     *      +91 9876543210
     *      91 9876543210
     */

    if(
        mobile.length ===
        12 &&
        mobile.startsWith(
            '91'
        )
    ){

        mobile =
            mobile.slice(2);

    }


    return mobile.slice(
        -10
    );

};


/* =============================================================================
 * NORMALIZE EMAIL
 * =============================================================================
 */


Page02.normalizeEmail = function(value){

    return Page02
        .safeText(value)
        .trim()
        .toLowerCase();

};


/* =============================================================================
 * NORMALIZE PINCODE
 * =============================================================================
 */


Page02.normalizePincode = function(value){

    return Page02
        .safeText(value)
        .replace(
            /\D/g,
            ''
        )
        .slice(
            0,
            6
        );

};


/* =============================================================================
 * NORMALIZE AGE
 * =============================================================================
 */


Page02.normalizeAge = function(value){

    const age =
        Number(
            Page02.safeText(
                value
            ).trim()
        );


    if(
        !Number.isInteger(age)
    ){

        return null;

    }


    return age;

};


/* =============================================================================
 * VALID EMAIL
 * =============================================================================
 */


Page02.isValidEmail = function(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        Page02.safeText(
            email
        )
    );

};


/* =============================================================================
 * VALID INDIAN MOBILE
 * =============================================================================
 */


Page02.isValidMobile = function(mobile){

    return /^[6-9]\d{9}$/.test(
        Page02.safeText(
            mobile
        )
    );

};


/* =============================================================================
 * VALID PINCODE
 * =============================================================================
 */


Page02.isValidPincode = function(
    pincode
){

    return /^[1-9][0-9]{5}$/.test(
        Page02.safeText(
            pincode
        )
    );

};


/* =============================================================================
 * VALID AGE
 * =============================================================================
 */


Page02.isValidAge = function(age){

    return (
        Number.isInteger(
            age
        ) &&
        age >= 18 &&
        age <= 120
    );

};


/* =============================================================================
 * GET LANGUAGE
 * =============================================================================
 */


Page02.getLanguage = function(){

    const preferred =
        Page02.state.kyc &&
        Page02.state.kyc.preferredLanguage
            ? Page02.state.kyc.preferredLanguage
            : '';


    if(preferred){

        return preferred;

    }


    return (
        document.documentElement.lang ||
        'ta'
    );

};


/* =============================================================================
 * GET DEVICE TYPE
 * =============================================================================
 */


Page02.getDeviceType = function(){

    const width =
        window.innerWidth;


    if(
        width <=
        768
    ){

        return 'mobile';

    }


    if(
        width <=
        1200
    ){

        return 'tablet';

    }


    return 'desktop';

};


/* =============================================================================
 * READ FINALIZED KYC FORM
 * =============================================================================
 *
 * FINAL HTML FIELD NAMES
 *
 *      fullName
 *      mobileNumber
 *      emailAddress
 *      age
 *      gender
 *      occupation
 *      employerBusiness
 *      maritalStatus
 *      dependents
 *      city
 *      district
 *      state
 *      country
 *      pincode
 *      preferredLanguage
 *      referralSource
 *
 * IMPORTANT
 *
 * The frontend state keeps the richer Page 02 KYC.
 *
 * The API boundary is built separately below.
 *
 * =============================================================================
 */


Page02.readKYC = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        return null;

    }


    return {

        fullName:
            Page02.getFormValue(
                form,
                'fullName'
            ),

        mobile:
            Page02.normalizeMobile(
                Page02.getFormValue(
                    form,
                    'mobileNumber'
                )
            ),

        email:
            Page02.normalizeEmail(
                Page02.getFormValue(
                    form,
                    'emailAddress'
                )
            ),

        age:
            Page02.normalizeAge(
                Page02.getFormValue(
                    form,
                    'age'
                )
            ),

        gender:
            Page02.getFormValue(
                form,
                'gender'
            ),

        occupation:
            Page02.getFormValue(
                form,
                'occupation'
            ),

        employerBusiness:
            Page02.getFormValue(
                form,
                'employerBusiness'
            ),

        maritalStatus:
            Page02.getFormValue(
                form,
                'maritalStatus'
            ),

        dependents:
            Page02.getFormValue(
                form,
                'dependents'
            ),

        city:
            Page02.getFormValue(
                form,
                'city'
            ),

        district:
            Page02.getFormValue(
                form,
                'district'
            ),

        state:
            Page02.getFormValue(
                form,
                'state'
            ),

        country:
            Page02.getFormValue(
                form,
                'country'
            ),

        pincode:
            Page02.normalizePincode(
                Page02.getFormValue(
                    form,
                    'pincode'
                )
            ),

        preferredLanguage:
            Page02.getFormValue(
                form,
                'preferredLanguage'
            ),

        referralSource:
            Page02.getFormValue(
                form,
                'referralSource'
            )

    };

};


/* =============================================================================
 * KYC GENERAL ERROR
 * =============================================================================
 */


Page02.setKYCError = function(
    message
){

    const error =
        Page02.el(
            Page02.DOM.kycError
        );


    if(!error){

        return;

    }


    const text =
        Page02.safeText(
            message
        );


    error.textContent =
        text;


    error.hidden =
        !text;


    error.classList.toggle(
        'is-visible',
        Boolean(text)
    );

};


/* =============================================================================
 * CLEAR FIELD VALIDATION
 * =============================================================================
 */


Page02.clearKYCValidation = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    Page02.queryAll(
        '.is-invalid',
        form
    )
    .forEach(
        function(element){

            element.classList.remove(
                'is-invalid'
            );


            element.removeAttribute(
                'aria-invalid'
            );

        }
    );


    Page02.setKYCError(
        ''
    );

};


/* =============================================================================
 * MARK FIELD INVALID
 * =============================================================================
 */


Page02.markFieldInvalid = function(
    fieldName
){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    const controls =
        Page02.queryAll(
            '[name="' +
            fieldName +
            '"]',
            form
        );


    controls.forEach(
        function(control){

            control.classList.add(
                'is-invalid'
            );


            control.setAttribute(
                'aria-invalid',
                'true'
            );

        }
    );

};


/* =============================================================================
 * VALIDATE KYC
 * =============================================================================
 */


Page02.validateKYC = function(kyc){

    Page02.clearKYCValidation();


    const errors =
        [];


    if(!kyc){

        return {

            valid:
                false,

            errors: [
                {
                    field:
                        null,

                    message:
                        'KYC form is unavailable.'
                }
            ]

        };

    }


    /* -------------------------------------------------------------------------
     * FULL NAME
     * -------------------------------------------------------------------------
     */


    if(
        !kyc.fullName ||
        kyc.fullName.length <
            2
    ){

        errors.push({
            field:
                'fullName',

            message:
                'Please enter your full name.'
        });

    }


    /* -------------------------------------------------------------------------
     * MOBILE
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isValidMobile(
            kyc.mobile
        )
    ){

        errors.push({
            field:
                'mobileNumber',

            message:
                'Please enter a valid 10-digit mobile number.'
        });

    }


    /* -------------------------------------------------------------------------
     * EMAIL
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isValidEmail(
            kyc.email
        )
    ){

        errors.push({
            field:
                'emailAddress',

            message:
                'Please enter a valid email address.'
        });

    }


    /* -------------------------------------------------------------------------
     * AGE
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isValidAge(
            kyc.age
        )
    ){

        errors.push({
            field:
                'age',

            message:
                'Please enter a valid age between 18 and 120.'
        });

    }


    /* -------------------------------------------------------------------------
     * GENDER
     * -------------------------------------------------------------------------
     */


    if(!kyc.gender){

        errors.push({
            field:
                'gender',

            message:
                'Please select your gender.'
        });

    }


    /* -------------------------------------------------------------------------
     * OCCUPATION
     * -------------------------------------------------------------------------
     */


    if(!kyc.occupation){

        errors.push({
            field:
                'occupation',

            message:
                'Please enter your occupation.'
        });

    }


    /* -------------------------------------------------------------------------
     * MARITAL STATUS
     * -------------------------------------------------------------------------
     */


    if(!kyc.maritalStatus){

        errors.push({
            field:
                'maritalStatus',

            message:
                'Please select your marital status.'
        });

    }


    /* -------------------------------------------------------------------------
     * DEPENDENTS
     * -------------------------------------------------------------------------
     */


    if(!kyc.dependents){

        errors.push({
            field:
                'dependents',

            message:
                'Please select the number of dependents.'
        });

    }


    /* -------------------------------------------------------------------------
     * CITY
     * -------------------------------------------------------------------------
     */


    if(!kyc.city){

        errors.push({
            field:
                'city',

            message:
                'Please enter your city.'
        });

    }


    /* -------------------------------------------------------------------------
     * DISTRICT
     * -------------------------------------------------------------------------
     */


    if(!kyc.district){

        errors.push({
            field:
                'district',

            message:
                'Please enter your district.'
        });

    }


    /* -------------------------------------------------------------------------
     * STATE
     * -------------------------------------------------------------------------
     */


    if(!kyc.state){

        errors.push({
            field:
                'state',

            message:
                'Please enter your state.'
        });

    }


    /* -------------------------------------------------------------------------
     * COUNTRY
     * -------------------------------------------------------------------------
     */


    if(!kyc.country){

        errors.push({
            field:
                'country',

            message:
                'Please select your country.'
        });

    }


    /* -------------------------------------------------------------------------
     * PINCODE
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isValidPincode(
            kyc.pincode
        )
    ){

        errors.push({
            field:
                'pincode',

            message:
                'Please enter a valid 6-digit pincode.'
        });

    }


    /* -------------------------------------------------------------------------
     * PREFERRED LANGUAGE
     * -------------------------------------------------------------------------
     */


    if(!kyc.preferredLanguage){

        errors.push({
            field:
                'preferredLanguage',

            message:
                'Please select your preferred language.'
        });

    }


    /* -------------------------------------------------------------------------
     * REFERRAL SOURCE
     * -------------------------------------------------------------------------
     */


    if(!kyc.referralSource){

        errors.push({
            field:
                'referralSource',

            message:
                'Please tell us how you heard about us.'
        });

    }


    /* -------------------------------------------------------------------------
     * DISPLAY INVALID FIELDS
     * -------------------------------------------------------------------------
     */


    errors.forEach(
        function(error){

            if(error.field){

                Page02.markFieldInvalid(
                    error.field
                );

            }

        }
    );


    if(
        errors.length >
        0
    ){

        Page02.setKYCError(
            errors[0].message
        );

    }


    return {

        valid:
            errors.length ===
            0,

        errors:
            errors

    };

};


/* =============================================================================
 * BUILD REGISTRATION PAYLOAD
 * =============================================================================
 *
 * BACKEND BOUNDARY
 *
 * Keep CTM_API.register() deliberately narrow.
 *
 * The rich KYC remains available in:
 *
 *      Page02.state.kyc
 *
 * Registration sends the canonical identity/contact payload:
 *
 *      fullName
 *      email
 *      mobile
 *      district
 *      state
 *      source
 *      language
 *      device
 *
 * =============================================================================
 */


Page02.buildRegistrationPayload = function(
    kyc
){

    return {

        fullName:
            kyc.fullName,

        email:
            kyc.email,

        mobile:
            kyc.mobile,

        district:
            kyc.district,

        state:
            kyc.state,

        source:
            (
                kyc.referralSource
                    ? (
                        'CTM PATH™ MILLIONAIRES™ — PAGE 02 — ' +
                        kyc.referralSource
                    )
                    : 'CTM PATH™ MILLIONAIRES™ — PAGE 02'
            ),

        language:
            kyc.preferredLanguage ||
            document.documentElement.lang ||
            'ta',

        device:
            Page02.getDeviceType()

    };

};


/* =============================================================================
 * API ADAPTER
 * =============================================================================
 *
 * Canonical frontend service:
 *
 *      CTM_API.register(payload)
 *
 * api.js MUST load before page02.js.
 *
 * =============================================================================
 */


Page02.api = async function(
    action,
    payload
){

    if(
        typeof CTM_API ===
            'undefined' ||
        !CTM_API
    ){

        throw new Error(
            'CTM PATH™ API service is unavailable.'
        );

    }


    if(
        typeof CTM_API[
            action
        ] !==
        'function'
    ){

        throw new Error(
            'CTM PATH™ API action is unavailable: ' +
            action
        );

    }


    return CTM_API[
        action
    ](
        payload
    );

};


/* =============================================================================
 * UNWRAP API RESPONSE
 * =============================================================================
 */


Page02.unwrapResponse = function(
    response
){

    if(!response){

        throw new Error(
            'Empty response received from CTM PATH™ server.'
        );

    }


    if(
        response.success ===
        false
    ){

        throw new Error(
            response.message ||
            response.error ||
            'Request failed.'
        );

    }


    if(
        response.data &&
        typeof response.data ===
            'object'
    ){

        return response.data;

    }


    return response;

};


/* =============================================================================
 * EXTRACT REGISTRATION IDENTITY
 * =============================================================================
 *
 * Normalize the common CTM response envelopes into:
 *
 *      peopleId
 *      clientId
 *
 * =============================================================================
 */


Page02.extractRegistrationIdentity = function(
    response
){

    const source =
        response &&
        response.data &&
        typeof response.data ===
            'object'
            ? response.data
            : response || {};


    const peopleId =
        source.peopleId ||
        source.peopleID ||
        source.PeopleID ||
        source.clientId ||
        source.clientID ||
        source.ClientID ||
        source.id ||
        null;


    const clientId =
        source.clientId ||
        source.clientID ||
        source.ClientID ||
        source.peopleId ||
        source.peopleID ||
        source.PeopleID ||
        source.id ||
        null;


    return {

        peopleId:
            peopleId
                ? String(
                    peopleId
                )
                : null,

        clientId:
            clientId
                ? String(
                    clientId
                )
                : null

    };

};


/* =============================================================================
 * SAVE CLIENT IDENTITY
 * =============================================================================
 */


Page02.saveClientIdentity = function(){

    try{

        if(
            Page02.state.peopleId
        ){

            sessionStorage.setItem(
                Page02.CONFIG.storageKeys.peopleId,
                Page02.state.peopleId
            );

        }


        if(
            Page02.state.kyc &&
            Page02.state.kyc.fullName
        ){

            sessionStorage.setItem(
                Page02.CONFIG.storageKeys.fullName,
                Page02.state.kyc.fullName
            );

        }

    }
    catch(error){

        console.warn(
            'CTM PATH™ Page 02: Unable to persist client identity.',
            error
        );

    }

};


/* =============================================================================
 * UPDATE CLIENT NAME
 * =============================================================================
 *
 * Optional presentation hook.
 *
 * Any Page 02 element may use:
 *
 *      data-client-name
 *
 * =============================================================================
 */


Page02.updateClientName = function(){

    const fullName =
        Page02.state.kyc &&
        Page02.state.kyc.fullName
            ? Page02.state.kyc.fullName
            : '';


    if(!fullName){

        return;

    }


    Page02.queryAll(
        '[data-client-name]'
    )
    .forEach(
        function(element){

            element.textContent =
                fullName;

        }
    );

};


/* =============================================================================
 * SET KYC SUBMIT STATE
 * =============================================================================
 */


Page02.setKYCSubmitState = function(
    loading
){

    const button =
        Page02.el(
            Page02.DOM.submitKyc
        );


    if(!button){

        return;

    }


    const active =
        Boolean(
            loading
        );


    button.disabled =
        active;


    button.classList.toggle(
        'is-loading',
        active
    );


    button.setAttribute(
        'aria-busy',
        active
            ? 'true'
            : 'false'
    );

};


/* =============================================================================
 * HANDLE KYC SUBMIT
 * =============================================================================
 */


Page02.handleKYCSubmit = async function(
    event
){

    event.preventDefault();


    if(
        Page02.state.isRegistering
    ){

        return;

    }


    const kyc =
        Page02.readKYC();


    const validation =
        Page02.validateKYC(
            kyc
        );


    if(
        !validation.valid
    ){

        const firstInvalid =
            Page02.query(
                '.is-invalid',
                Page02.getKYCForm()
            );


        if(firstInvalid){

            firstInvalid.focus();

        }


        return;

    }


    Page02.state.kyc =
        kyc;


    Page02.state.isRegistering =
        true;


    Page02.setKYCError(
        ''
    );


    Page02.setKYCSubmitState(
        true
    );


    Page02.setLoading(
        true
    );


    try{

        const payload =
            Page02.buildRegistrationPayload(
                kyc
            );


        const response =
            await Page02.api(
                'register',
                payload
            );


        /*
         * Keep the complete raw response for diagnostics
         * and later session recovery.
         */

        Page02.state.registrationResponse =
            response;


        /*
         * Validate API success envelope.
         */

        const data =
            Page02.unwrapResponse(
                response
            );


        /*
         * Extract normalized identity.
         */

        const identity =
            Page02.extractRegistrationIdentity(
                data
            );


        if(
            !identity.peopleId &&
            !identity.clientId
        ){

            throw new Error(
                'Registration succeeded but client identity was not returned.'
            );

        }


        Page02.state.peopleId =
            identity.peopleId ||
            identity.clientId;


        Page02.state.clientId =
            identity.clientId ||
            identity.peopleId;


        Page02.saveClientIdentity();


        Page02.updateClientName();


        /*
         * Session persistence arrives in Batch 6.
         */

        if(
            typeof Page02.saveSession ===
            'function'
        ){

            Page02.saveSession();

        }


        /*
         * Registration is now complete.
         *
         * Enter Dimension 01.
         */

        Page02.openScorecard();

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 registration error:',
            error
        );


        Page02.setKYCError(
            error &&
            error.message
                ? error.message
                : 'Unable to save your details. Please try again.'
        );

    }
    finally{

        Page02.state.isRegistering =
            false;


        Page02.setKYCSubmitState(
            false
        );


        Page02.setLoading(
            false
        );

    }

};


/* =============================================================================
 * MOBILE INPUT SANITIZER
 * =============================================================================
 */


Page02.bindMobileInput = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    const mobile =
        Page02.getFormControl(
            form,
            'mobileNumber'
        );


    if(!mobile){

        return;

    }


    mobile.addEventListener(
        'input',
        function(){

            mobile.value =
                Page02
                    .safeText(
                        mobile.value
                    )
                    .replace(
                        /\D/g,
                        ''
                    )
                    .slice(
                        0,
                        10
                    );

        }
    );

};


/* =============================================================================
 * PINCODE INPUT SANITIZER
 * =============================================================================
 */


Page02.bindPincodeInput = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    const pincode =
        Page02.getFormControl(
            form,
            'pincode'
        );


    if(!pincode){

        return;

    }


    pincode.addEventListener(
        'input',
        function(){

            pincode.value =
                Page02
                    .safeText(
                        pincode.value
                    )
                    .replace(
                        /\D/g,
                        ''
                    )
                    .slice(
                        0,
                        6
                    );

        }
    );

};


/* =============================================================================
 * AGE INPUT SANITIZER
 * =============================================================================
 */


Page02.bindAgeInput = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    const age =
        Page02.getFormControl(
            form,
            'age'
        );


    if(!age){

        return;

    }


    age.addEventListener(
        'input',
        function(){

            age.value =
                Page02
                    .safeText(
                        age.value
                    )
                    .replace(
                        /\D/g,
                        ''
                    )
                    .slice(
                        0,
                        3
                    );

        }
    );

};


/* =============================================================================
 * CLEAR FIELD ERROR ON USER CORRECTION
 * =============================================================================
 */


Page02.bindKYCValidationReset = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    form.addEventListener(
        'input',
        function(event){

            const field =
                event.target;


            if(
                field &&
                field.classList
            ){

                field.classList.remove(
                    'is-invalid'
                );


                field.removeAttribute(
                    'aria-invalid'
                );

            }


            Page02.setKYCError(
                ''
            );

        }
    );


    form.addEventListener(
        'change',
        function(event){

            const field =
                event.target;


            if(
                field &&
                field.name
            ){

                Page02.queryAll(
                    '[name="' +
                    field.name +
                    '"]',
                    form
                )
                .forEach(
                    function(control){

                        control.classList.remove(
                            'is-invalid'
                        );


                        control.removeAttribute(
                            'aria-invalid'
                        );

                    }
                );

            }


            Page02.setKYCError(
                ''
            );

        }
    );

};


/* =============================================================================
 * BIND INTRO
 * =============================================================================
 */


Page02.bindIntro = function(){

    const button =
        Page02.el(
            Page02.DOM.beginButton
        );


    if(!button){

        console.warn(
            'CTM PATH™ Page 02: #begin-page02 was not found.'
        );

        return;

    }


    button.addEventListener(
        'click',
        function(event){

            event.preventDefault();


            Page02.openKYC();

        }
    );

};


/* =============================================================================
 * BIND KYC
 * =============================================================================
 */


Page02.bindKYC = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        console.warn(
            'CTM PATH™ Page 02: #kyc-form was not found.'
        );

        return;

    }


    form.addEventListener(
        'submit',
        Page02.handleKYCSubmit
    );


    Page02.bindMobileInput();

    Page02.bindPincodeInput();

    Page02.bindAgeInput();

    Page02.bindKYCValidationReset();

};


/* =============================================================================
 * BATCH 2 DOM CONTRACT CHECK
 * =============================================================================
 *
 * Development diagnostic only.
 *
 * Does NOT stop production execution.
 *
 * =============================================================================
 */


Page02.validateBatch2DOM = function(){

    const requiredIds = [

        Page02.DOM.introScreen,

        Page02.DOM.kycScreen,

        Page02.DOM.scorecardScreen,

        Page02.DOM.resultScreen,

        Page02.DOM.beginButton,

        Page02.DOM.kycForm,

        Page02.DOM.kycError,

        Page02.DOM.submitKyc

    ];


    const missingIds =
        requiredIds.filter(
            function(id){

                return !Page02.el(
                    id
                );

            }
        );


    const form =
        Page02.getKYCForm();


    const requiredFields = [

        'fullName',

        'mobileNumber',

        'emailAddress',

        'age',

        'gender',

        'occupation',

        'maritalStatus',

        'dependents',

        'city',

        'district',

        'state',

        'country',

        'pincode',

        'preferredLanguage',

        'referralSource'

    ];


    const missingFields =
        form
            ? requiredFields.filter(
                function(name){

                    return !Page02.query(
                        '[name="' +
                        name +
                        '"]',
                        form
                    );

                }
            )
            : requiredFields.slice();


    return {

        valid:
            (
                missingIds.length ===
                0 &&
                missingFields.length ===
                0
            ),

        missingIds:
            missingIds,

        missingFields:
            missingFields

    };

};


/* =============================================================================
 * BATCH 2 BINDER
 * =============================================================================
 *
 * Batch 6 will call this from Page02.init().
 *
 * DO NOT invoke it here.
 *
 * =============================================================================
 */


Page02.bindBatch2 = function(){

    Page02.bindIntro();

    Page02.bindKYC();

};


/* =============================================================================
 * END OF BATCH 2
 * =============================================================================
 *
 * CTM PATH™ PAGE 02 v2.3
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Final DOM helpers
 *      ✓ Canonical screen-ID controller
 *
 *      ✓ #begin-page02
 *      ✓ Intro → ABOUT YOU™
 *
 *      ✓ #kyc-form integration
 *      ✓ Finalized KYC field names
 *      ✓ Full rich KYC capture
 *
 *      ✓ Mobile normalization
 *      ✓ Email normalization
 *      ✓ Pincode normalization
 *      ✓ Age normalization
 *
 *      ✓ KYC validation
 *      ✓ Invalid-field state
 *      ✓ General #kyc-error handling
 *
 *      ✓ Backend registration payload
 *      ✓ CTM_API.register() adapter
 *      ✓ Response validation
 *      ✓ PeopleID / ClientID extraction
 *      ✓ Client identity persistence
 *
 *      ✓ Successful registration → Scorecard
 *      ✓ Dimension 01 reset
 *
 *      ✓ Mobile input sanitizer
 *      ✓ Pincode input sanitizer
 *      ✓ Age input sanitizer
 *
 *      ✓ Batch 2 DOM integrity diagnostic
 *
 *
 * IMPORTANT
 *
 *      DO NOT initialize Page02 here.
 *
 *      DO NOT expose window.Page02 here.
 *
 *      DO NOT render scorecard questions here.
 *
 *      DO NOT attach dimension navigation here.
 *
 *      DO NOT call CTM_API.saveDiscovery() here.
 *
 *
 * Batch 3 continues immediately below this line.
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 3
 *
 * FOUR-OPTION SCORECARD ENGINE
 * ANSWER STATE
 * LIVE SCORING
 * DIMENSION PROGRESS
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      ✓ Render current dimension
 *      ✓ Render five indicators
 *      ✓ Render exactly four options per indicator
 *      ✓ Restore previously selected answers
 *      ✓ Save answers immediately
 *      ✓ Display strong 1 / 4 → 4 / 4 score
 *      ✓ Display score status
 *      ✓ Calculate live dimension score
 *      ✓ Calculate live total score
 *      ✓ Calculate gaps
 *      ✓ Calculate completion
 *      ✓ Render dimension progress
 *      ✓ Update navigation availability
 *
 * DOES NOT:
 *
 *      ✗ Persist final discovery
 *      ✗ Build final result
 *      ✗ Call CTM_API.saveDiscovery()
 *      ✗ Navigate to Page 03
 *
 * =============================================================================
 */


/* =============================================================================
 * HTML ESCAPE
 * =============================================================================
 */


Page02.escapeHTML = function(value){

    return Page02
        .safeText(value)
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

};


/* =============================================================================
 * GET ANSWER
 * =============================================================================
 */


Page02.getAnswer = function(
    indicatorId
){

    return (
        Page02.state.answers[
            indicatorId
        ] || null
    );

};


/* =============================================================================
 * COMPATIBILITY ALIAS
 * =============================================================================
 */


Page02.getIndicatorAnswer =
    Page02.getAnswer;


/* =============================================================================
 * HAS ANSWER
 * =============================================================================
 */


Page02.hasAnswer = function(
    indicatorId
){

    return Boolean(
        Page02.getAnswer(
            indicatorId
        )
    );

};


/* =============================================================================
 * BUILD CANONICAL ANSWER
 * =============================================================================
 */


Page02.buildAnswer = function(
    dimension,
    indicator,
    option
){

    return {

        dimensionId:
            dimension.id,

        dimensionNumber:
            dimension.number,

        dimensionTamil:
            dimension.tamil,

        dimensionEnglish:
            dimension.english,

        indicatorId:
            indicator.id,

        indicatorNumber:
            indicator.number,

        indicatorTamil:
            indicator.tamil,

        indicatorEnglish:
            indicator.english,

        ideal:
            indicator.ideal,

        target:
            indicator.target,

        score:
            Number(
                option.score
            ),

        optionLabel:
            option.label,

        value:
            option.value,

        answeredAt:
            new Date().toISOString()

    };

};


/* =============================================================================
 * GET CURRENT DIMENSION
 * =============================================================================
 */


Page02.getCurrentDimension = function(){

    return Page02.getDimension(
        Page02.state.currentDimension
    );

};


/* =============================================================================
 * ANSWERED COUNT
 * =============================================================================
 */


Page02.getAnsweredCount = function(){

    return Page02
        .getAllIndicators()
        .reduce(
            function(
                total,
                indicator
            ){

                return (
                    total +
                    (
                        Page02.hasAnswer(
                            indicator.id
                        )
                            ? 1
                            : 0
                    )
                );

            },
            0
        );

};


/* =============================================================================
 * REMAINING COUNT
 * =============================================================================
 */


Page02.getRemainingCount = function(){

    return Math.max(
        0,
        Page02.CONFIG.scoring.indicatorCount -
        Page02.getAnsweredCount()
    );

};


/* =============================================================================
 * DIMENSION ANSWERED COUNT
 * =============================================================================
 */


Page02.getDimensionAnsweredCount = function(
    dimensionIndex
){

    const dimension =
        Page02.getDimension(
            dimensionIndex
        );


    if(!dimension){

        return 0;

    }


    return dimension.indicators.reduce(
        function(
            total,
            indicator
        ){

            return (
                total +
                (
                    Page02.hasAnswer(
                        indicator.id
                    )
                        ? 1
                        : 0
                )
            );

        },
        0
    );

};


/* =============================================================================
 * TOTAL SCORE
 * =============================================================================
 */


Page02.getTotalScore = function(){

    return Page02
        .getAllIndicators()
        .reduce(
            function(
                total,
                indicator
            ){

                const answer =
                    Page02.getAnswer(
                        indicator.id
                    );


                if(!answer){

                    return total;

                }


                const score =
                    Number(
                        answer.score
                    );


                return (
                    total +
                    (
                        Number.isFinite(
                            score
                        )
                            ? score
                            : 0
                    )
                );

            },
            0
        );

};


/* =============================================================================
 * COMPATIBILITY ALIAS
 * =============================================================================
 */


Page02.calculateTotalScore =
    Page02.getTotalScore;


/* =============================================================================
 * TOTAL GAP
 * =============================================================================
 */


Page02.getTotalGap = function(){

    return Math.max(
        0,
        Page02.CONFIG.scoring.maximumScore -
        Page02.getTotalScore()
    );

};


Page02.calculateMillionaireGap =
    Page02.getTotalGap;


/* =============================================================================
 * SCORE PERCENTAGE
 * =============================================================================
 *
 * Maximum score is exactly 100.
 *
 * Therefore:
 *
 *      total score === score percentage
 *
 * =============================================================================
 */


Page02.getScorePercentage = function(){

    const score =
        Page02.getTotalScore();


    return Math.max(
        0,
        Math.min(
            100,
            Math.round(
                (
                    score /
                    Page02.CONFIG.scoring.maximumScore
                ) *
                100
            )
        )
    );

};


Page02.calculatePercentage =
    Page02.getScorePercentage;


/* =============================================================================
 * COMPLETION PERCENTAGE
 * =============================================================================
 *
 * This is NOT the lifestyle score.
 *
 * It tells us how much of the questionnaire
 * has actually been answered.
 *
 * =============================================================================
 */


Page02.getCompletionPercentage = function(){

    return Math.round(
        (
            Page02.getAnsweredCount() /
            Page02.CONFIG.scoring.indicatorCount
        ) *
        100
    );

};


/* =============================================================================
 * DIMENSION MAXIMUM SCORE
 * =============================================================================
 */


Page02.getDimensionMaximumScore = function(){

    return (

        Page02.CONFIG.scoring
            .indicatorsPerDimension *

        Page02.CONFIG.scoring.maximum

    );

};


Page02.getDimensionMaximum =
    function(dimensionIndex){

        const dimension =
            Page02.getDimension(
                dimensionIndex
            );


        if(!dimension){

            return 0;

        }


        return (
            dimension.indicators.length *
            Page02.CONFIG.scoring.maximum
        );

    };


/* =============================================================================
 * DIMENSION SCORE
 * =============================================================================
 */


Page02.getDimensionScore = function(
    dimensionIndex
){

    const dimension =
        Page02.getDimension(
            dimensionIndex
        );


    if(!dimension){

        return 0;

    }


    return dimension.indicators.reduce(
        function(
            total,
            indicator
        ){

            const answer =
                Page02.getAnswer(
                    indicator.id
                );


            if(!answer){

                return total;

            }


            const score =
                Number(
                    answer.score
                );


            return (
                total +
                (
                    Number.isFinite(
                        score
                    )
                        ? score
                        : 0
                )
            );

        },
        0
    );

};


Page02.calculateDimensionScore =
    Page02.getDimensionScore;


/* =============================================================================
 * DIMENSION GAP
 * =============================================================================
 */


Page02.getDimensionGap = function(
    dimensionIndex
){

    return Math.max(
        0,
        Page02.getDimensionMaximum(
            dimensionIndex
        ) -
        Page02.getDimensionScore(
            dimensionIndex
        )
    );

};


/* =============================================================================
 * DIMENSION SCORE PERCENTAGE
 * =============================================================================
 */


Page02.getDimensionScorePercentage = function(
    dimensionIndex
){

    const maximum =
        Page02.getDimensionMaximum(
            dimensionIndex
        );


    if(!maximum){

        return 0;

    }


    return Math.round(
        (
            Page02.getDimensionScore(
                dimensionIndex
            ) /
            maximum
        ) *
        100
    );

};


Page02.calculateDimensionPercentage =
    Page02.getDimensionScorePercentage;


/* =============================================================================
 * DIMENSION COMPLETION
 * =============================================================================
 */


Page02.getDimensionCompletion = function(
    dimensionIndex
){

    const dimension =
        Page02.getDimension(
            dimensionIndex
        );


    if(!dimension){

        return 0;

    }


    return Math.round(
        (
            Page02.getDimensionAnsweredCount(
                dimensionIndex
            ) /
            dimension.indicators.length
        ) *
        100
    );

};


/* =============================================================================
 * DIMENSION COMPLETE
 * =============================================================================
 */


Page02.isDimensionComplete = function(
    dimensionIndex
){

    const dimension =
        Page02.getDimension(
            dimensionIndex
        );


    if(!dimension){

        return false;

    }


    return (
        Page02.getDimensionAnsweredCount(
            dimensionIndex
        ) ===
        dimension.indicators.length
    );

};


/* =============================================================================
 * SCORECARD COMPLETE
 * =============================================================================
 */


Page02.isScorecardComplete = function(){

    return (
        Page02.getAnsweredCount() ===
        Page02.CONFIG.scoring.indicatorCount
    );

};


/* =============================================================================
 * SCORECARD ERROR
 * =============================================================================
 */


Page02.setScorecardError = function(
    message
){

    const error =
        Page02.el(
            Page02.DOM.scorecardError
        );


    if(!error){

        return;

    }


    const text =
        Page02.safeText(
            message
        );


    error.textContent =
        text;


    error.hidden =
        !text;


    error.classList.toggle(
        'is-visible',
        Boolean(text)
    );

};


/* =============================================================================
 * RENDER DIMENSION PROGRESS
 * =============================================================================
 *
 * Five visual dimension markers.
 *
 * =============================================================================
 */


Page02.renderDimensionProgress = function(){

    const host =
        Page02.el(
            Page02.DOM.dimensionProgress
        );


    if(!host){

        return;

    }


    const current =
        Page02.state.currentDimension;


    host.innerHTML =
        Page02.DIMENSIONS
            .map(
                function(
                    dimension,
                    index
                ){

                    const active =
                        index ===
                        current;


                    const complete =
                        Page02.isDimensionComplete(
                            index
                        );


                    const answered =
                        Page02.getDimensionAnsweredCount(
                            index
                        );


                    const score =
                        Page02.getDimensionScore(
                            index
                        );


                    return `
                        <div
                            class="dimension-progress-item
                                   ${active ? 'is-active' : ''}
                                   ${complete ? 'is-complete' : ''}"
                            data-dimension-progress="${index}"
                            aria-current="${active ? 'true' : 'false'}"
                        >

                            <span class="dimension-progress-number">
                                ${Page02.escapeHTML(dimension.number)}
                            </span>

                            <span class="dimension-progress-name">
                                ${Page02.escapeHTML(dimension.english)}
                            </span>

                            <span class="dimension-progress-meta">
                                ${answered} / 5
                                ·
                                ${score} / 20
                            </span>

                        </div>
                    `;

                }
            )
            .join('');

};


/* =============================================================================
 * RENDER OPTION
 * =============================================================================
 */


Page02.renderOption = function(
    dimension,
    indicator,
    option
){

    const answer =
        Page02.getAnswer(
            indicator.id
        );


    const selected =
        Boolean(
            answer &&
            Number(
                answer.score
            ) ===
            Number(
                option.score
            )
        );


    const status =
        Page02.getScoreStatus(
            option.score
        );


    return `
        <button
            type="button"
            class="score-option
                   ${selected ? 'is-selected' : ''}"
            data-indicator-option="${Page02.escapeHTML(indicator.id)}"
            data-option-score="${Number(option.score)}"
            aria-pressed="${selected ? 'true' : 'false'}"
        >

            <span class="score-option-main">

                <strong class="score-option-range">
                    ${Page02.escapeHTML(option.label)}
                </strong>

                <span class="score-option-status">
                    ${Page02.escapeHTML(status.tamil)}
                    ·
                    ${Page02.escapeHTML(status.english)}
                </span>

            </span>


            <span class="score-option-score">

                <strong>
                    ${Number(option.score)}
                </strong>

                <small>
                    / 4
                </small>

            </span>

        </button>
    `;

};


/* =============================================================================
 * RENDER INDICATOR
 * =============================================================================
 */


Page02.renderIndicator = function(
    indicator,
    indicatorIndex,
    dimension
){

    const answer =
        Page02.getAnswer(
            indicator.id
        );


    const score =
        answer
            ? Number(
                answer.score
            )
            : 0;


    const status =
        answer
            ? Page02.getScoreStatus(
                score
            )
            : null;


    return `
        <article
            class="scorecard-question
                   ${answer ? 'is-answered' : ''}"
            data-indicator="${Page02.escapeHTML(indicator.id)}"
        >

            <div class="question-header">

                <div class="question-identity">

                    <span class="question-number">
                        INDICATOR
                        ${String(indicator.number).padStart(2, '0')}
                    </span>

                    <h3 class="question-tamil">
                        ${Page02.escapeHTML(indicator.tamil)}
                    </h3>

                    <p class="question-subtitle">
                        ${Page02.escapeHTML(indicator.english)}
                    </p>

                </div>


                <div
                    class="question-score"
                    data-score-for="${Page02.escapeHTML(indicator.id)}"
                >

                    <span>
                        SCORE
                    </span>

                    <strong>
                        ${score} / 4
                    </strong>

                    <small>
                        ${
                            status
                                ? Page02.escapeHTML(
                                    status.english
                                )
                                : 'SELECT ONE'
                        }
                    </small>

                </div>

            </div>


            <div class="question-benchmark">

                <span>
                    MILLIONAIRE LIFESTYLE™ BENCHMARK
                </span>

                <strong>
                    ${Page02.escapeHTML(indicator.ideal)}
                </strong>

            </div>


            <div
                class="score-options"
                role="group"
                aria-label="${Page02.escapeHTML(indicator.english)}"
            >

                ${
                    indicator.options
                        .map(
                            function(option){

                                return Page02.renderOption(
                                    dimension,
                                    indicator,
                                    option
                                );

                            }
                        )
                        .join('')
                }

            </div>

        </article>
    `;

};


/* =============================================================================
 * RENDER LIVE DIMENSION SUMMARY
 * =============================================================================
 */


Page02.renderDimensionSummary = function(
    dimension,
    index
){

    const answered =
        Page02.getDimensionAnsweredCount(
            index
        );


    const score =
        Page02.getDimensionScore(
            index
        );


    const maximum =
        Page02.getDimensionMaximum(
            index
        );


    const gap =
        Page02.getDimensionGap(
            index
        );


    const completion =
        Page02.getDimensionCompletion(
            index
        );


    return `
        <div
            class="dimension-live-summary"
            id="dimension-live-summary"
        >

            <div class="dimension-live-stat">

                <span>
                    ANSWERED
                </span>

                <strong id="dimension-answered">
                    ${answered} / 5
                </strong>

            </div>


            <div class="dimension-live-stat">

                <span>
                    DIMENSION SCORE
                </span>

                <strong id="dimension-score">
                    ${score} / ${maximum}
                </strong>

            </div>


            <div class="dimension-live-stat">

                <span>
                    GAP
                </span>

                <strong id="dimension-gap">
                    ${gap}
                </strong>

            </div>


            <div class="dimension-live-stat">

                <span>
                    COMPLETION
                </span>

                <strong id="dimension-completion">
                    ${completion}%
                </strong>

            </div>

        </div>


        <div
            class="dimension-completion-track"
            aria-hidden="true"
        >

            <span
                id="dimension-progress-bar"
                style="width:${completion}%"
            ></span>

        </div>
    `;

};


/* =============================================================================
 * RENDER GLOBAL LIVE SCORE
 * =============================================================================
 */


Page02.renderGlobalLiveScore = function(){

    const answered =
        Page02.getAnsweredCount();


    const remaining =
        Page02.getRemainingCount();


    const score =
        Page02.getTotalScore();


    const gap =
        Page02.getTotalGap();


    const completion =
        Page02.getCompletionPercentage();


    return `
        <div
            class="scorecard-live-score"
            id="scorecard-live-score"
        >

            <div>

                <span>
                    ANSWERED
                </span>

                <strong id="live-answered">
                    ${answered} / 25
                </strong>

            </div>


            <div>

                <span>
                    LIVE SCORE
                </span>

                <strong id="live-total-score">
                    ${score} / 100
                </strong>

            </div>


            <div>

                <span>
                    MILLIONAIRE GAP™
                </span>

                <strong id="live-total-gap">
                    ${gap}
                </strong>

            </div>


            <div>

                <span>
                    COMPLETION
                </span>

                <strong id="live-completion">
                    ${completion}%
                </strong>

            </div>


            <div class="live-remaining">

                <span>
                    REMAINING
                </span>

                <strong id="live-remaining">
                    ${remaining}
                </strong>

            </div>

        </div>
    `;

};


/* =============================================================================
 * RENDER CURRENT DIMENSION
 * =============================================================================
 */


Page02.renderCurrentDimension = function(){

    const host =
        Page02.el(
            Page02.DOM.dimensionQuestions
        );


    const dimension =
        Page02.getCurrentDimension();


    if(
        !host ||
        !dimension
    ){

        return false;

    }


    const index =
        Page02.state.currentDimension;


    Page02.setScorecardError(
        ''
    );


    host.innerHTML = `

        <div
            class="lifestyle-scorecard"
            id="lifestyle-scorecard"
            data-dimension="${Page02.escapeHTML(dimension.id)}"
            data-dimension-index="${index}"
        >

            <header class="dimension-heading">

                <span class="section-kicker">

                    DIMENSION
                    ${Page02.escapeHTML(dimension.number)}
                    OF
                    ${Page02.CONFIG.scoring.dimensionCount}

                </span>


                <h2>
                    ${Page02.escapeHTML(dimension.tamil)}
                </h2>


                <h3>
                    ${Page02.escapeHTML(dimension.english)}
                </h3>


                <p>

                    உங்கள் தற்போதைய உண்மை நிலையை
                    பிரதிபலிக்கும் ஒரு option-ஐ
                    ஒவ்வொரு indicator-க்கும் தேர்வு செய்யுங்கள்.

                </p>


                <p class="english-copy">

                    SELECT THE ONE RANGE THAT BEST
                    REPRESENTS YOUR REALITY TODAY.

                </p>

            </header>


            ${Page02.renderGlobalLiveScore()}


            ${Page02.renderDimensionSummary(
                dimension,
                index
            )}


            <div class="indicator-list">

                ${
                    dimension.indicators
                        .map(
                            function(
                                indicator,
                                indicatorIndex
                            ){

                                return Page02.renderIndicator(
                                    indicator,
                                    indicatorIndex,
                                    dimension
                                );

                            }
                        )
                        .join('')
                }

            </div>

        </div>
    `;


    Page02.bindIndicatorOptions();

    Page02.renderDimensionProgress();

    Page02.updateDimensionNavigation();


    return true;

};


/* =============================================================================
 * UPDATE INDICATOR SCORE DISPLAY
 * =============================================================================
 */


Page02.updateIndicatorScoreDisplay = function(
    indicatorId
){

    const answer =
        Page02.getAnswer(
            indicatorId
        );


    const card =
        Page02.query(
            '[data-indicator="' +
            indicatorId +
            '"]'
        );


    if(!card){

        return;

    }


    card.classList.toggle(
        'is-answered',
        Boolean(answer)
    );


    const scoreHost =
        card.querySelector(
            '[data-score-for="' +
            indicatorId +
            '"]'
        );


    if(!scoreHost){

        return;

    }


    const strong =
        scoreHost.querySelector(
            'strong'
        );


    const small =
        scoreHost.querySelector(
            'small'
        );


    if(strong){

        strong.textContent =
            answer
                ? (
                    Number(
                        answer.score
                    ) +
                    ' / 4'
                )
                : '0 / 4';

    }


    if(small){

        if(answer){

            const status =
                Page02.getScoreStatus(
                    answer.score
                );


            small.textContent =
                status.english;

        }
        else{

            small.textContent =
                'SELECT ONE';

        }

    }

};


/* =============================================================================
 * UPDATE LIVE SCORE
 * =============================================================================
 */


Page02.updateLiveScore = function(){

    const answered =
        Page02.getAnsweredCount();


    const remaining =
        Page02.getRemainingCount();


    const score =
        Page02.getTotalScore();


    const gap =
        Page02.getTotalGap();


    const completion =
        Page02.getCompletionPercentage();


    const values = {

        'live-answered':
            answered + ' / 25',

        'live-total-score':
            score + ' / 100',

        'live-total-gap':
            String(gap),

        'live-completion':
            completion + '%',

        'live-remaining':
            String(remaining)

    };


    Object.keys(
        values
    )
    .forEach(
        function(id){

            const element =
                Page02.el(
                    id
                );


            if(element){

                element.textContent =
                    values[id];

            }

        }
    );

};


/* =============================================================================
 * UPDATE CURRENT DIMENSION SUMMARY
 * =============================================================================
 */


Page02.updateCurrentDimensionSummary = function(){

    const index =
        Page02.state.currentDimension;


    const answered =
        Page02.getDimensionAnsweredCount(
            index
        );


    const score =
        Page02.getDimensionScore(
            index
        );


    const maximum =
        Page02.getDimensionMaximum(
            index
        );


    const gap =
        Page02.getDimensionGap(
            index
        );


    const completion =
        Page02.getDimensionCompletion(
            index
        );


    const values = {

        'dimension-answered':
            answered + ' / 5',

        'dimension-score':
            score + ' / ' + maximum,

        'dimension-gap':
            String(gap),

        'dimension-completion':
            completion + '%'

    };


    Object.keys(
        values
    )
    .forEach(
        function(id){

            const element =
                Page02.el(
                    id
                );


            if(element){

                element.textContent =
                    values[id];

            }

        }
    );


    const progressBar =
        Page02.el(
            'dimension-progress-bar'
        );


    if(progressBar){

        progressBar.style.width =
            completion + '%';

    }


    const scorecard =
        Page02.el(
            'lifestyle-scorecard'
        );


    if(scorecard){

        scorecard.dataset.dimensionComplete =
            Page02.isDimensionComplete(
                index
            )
                ? 'true'
                : 'false';

    }

};


/* =============================================================================
 * UPDATE DIMENSION NAVIGATION
 * =============================================================================
 *
 * BACK:
 *
 *      disabled on Dimension 01.
 *
 * NEXT:
 *
 *      disabled until all five indicators
 *      in the current dimension are answered.
 *
 * =============================================================================
 */


Page02.updateDimensionNavigation = function(){

    const index =
        Page02.state.currentDimension;


    const isFirst =
        index ===
        0;


    const isLast =
        index ===
        Page02.CONFIG.scoring.dimensionCount -
        1;


    const complete =
        Page02.isDimensionComplete(
            index
        );


    const backButton =
        Page02.el(
            Page02.DOM.dimensionBack
        );


    const nextButton =
        Page02.el(
            Page02.DOM.dimensionNext
        );


    if(backButton){

        backButton.disabled =
            isFirst;


        backButton.setAttribute(
            'aria-disabled',
            isFirst
                ? 'true'
                : 'false'
        );


        backButton.classList.toggle(
            'is-disabled',
            isFirst
        );

    }


    if(nextButton){

        nextButton.disabled =
            !complete;


        nextButton.setAttribute(
            'aria-disabled',
            complete
                ? 'false'
                : 'true'
        );


        nextButton.classList.toggle(
            'is-disabled',
            !complete
        );


        nextButton.dataset.finalDimension =
            isLast
                ? 'true'
                : 'false';


        /*
         * The finalized HTML contains plain text,
         * not a dedicated data-next-label span.
         *
         * Therefore update the button itself.
         */

        nextButton.textContent =
            isLast
                ? 'VIEW MY RESULT →'
                : 'NEXT DIMENSION →';

    }

};


/* =============================================================================
 * SELECT INDICATOR OPTION
 * =============================================================================
 */


Page02.selectIndicatorOption = function(
    button
){

    if(!button){

        return false;

    }


    const indicatorId =
        button.dataset
            .indicatorOption;


    const optionScore =
        Number(
            button.dataset
                .optionScore
        );


    const indicator =
        Page02.getIndicator(
            indicatorId
        );


    const dimension =
        Page02.getIndicatorDimension(
            indicatorId
        );


    if(
        !indicator ||
        !dimension
    ){

        return false;

    }


    const option =
        indicator.options.find(
            function(item){

                return (
                    Number(
                        item.score
                    ) ===
                    optionScore
                );

            }
        );


    if(!option){

        return false;

    }


    /* -------------------------------------------------------------------------
     * SAVE ANSWER
     * -------------------------------------------------------------------------
     */


    Page02.state.answers[
        indicator.id
    ] =
        Page02.buildAnswer(
            dimension,
            indicator,
            option
        );


    /* -------------------------------------------------------------------------
     * UPDATE FOUR OPTION STATES
     * -------------------------------------------------------------------------
     */


    const card =
        button.closest(
            '[data-indicator]'
        );


    if(card){

        card
            .querySelectorAll(
                '[data-indicator-option]'
            )
            .forEach(
                function(
                    optionButton
                ){

                    const selected =
                        optionButton ===
                        button;


                    optionButton.classList.toggle(
                        'is-selected',
                        selected
                    );


                    optionButton.setAttribute(
                        'aria-pressed',
                        selected
                            ? 'true'
                            : 'false'
                    );

                }
            );


        card.classList.add(
            'is-answered'
        );

    }


    /* -------------------------------------------------------------------------
     * SCORE DISPLAY
     * -------------------------------------------------------------------------
     */


    Page02.updateIndicatorScoreDisplay(
        indicator.id
    );


    /* -------------------------------------------------------------------------
     * LIVE TOTALS
     * -------------------------------------------------------------------------
     */


    Page02.updateLiveScore();

    Page02.updateCurrentDimensionSummary();

    Page02.renderDimensionProgress();

    Page02.updateDimensionNavigation();


    Page02.setScorecardError(
        ''
    );


    /* -------------------------------------------------------------------------
     * SESSION
     * -------------------------------------------------------------------------
     */


    if(
        typeof Page02.saveSession ===
        'function'
    ){

        Page02.saveSession();

    }


    return true;

};


/* =============================================================================
 * BIND INDICATOR OPTIONS
 * =============================================================================
 */


Page02.bindIndicatorOptions = function(){

    const host =
        Page02.el(
            Page02.DOM.dimensionQuestions
        );


    if(!host){

        return;

    }


    host
        .querySelectorAll(
            '[data-indicator-option]'
        )
        .forEach(
            function(button){

                button.addEventListener(
                    'click',
                    function(){

                        Page02.selectIndicatorOption(
                            button
                        );

                    }
                );

            }
        );

};


/* =============================================================================
 * REFRESH VISIBLE ANSWER STATES
 * =============================================================================
 *
 * Useful after:
 *
 *      • session recovery
 *      • returning to a previous dimension
 *      • future state restoration
 *
 * =============================================================================
 */


Page02.refreshVisibleAnswerStates = function(){

    const host =
        Page02.el(
            Page02.DOM.dimensionQuestions
        );


    if(!host){

        return;

    }


    host
        .querySelectorAll(
            '[data-indicator]'
        )
        .forEach(
            function(card){

                const indicatorId =
                    card.dataset
                        .indicator;


                const answer =
                    Page02.getAnswer(
                        indicatorId
                    );


                card.classList.toggle(
                    'is-answered',
                    Boolean(answer)
                );


                card
                    .querySelectorAll(
                        '[data-indicator-option]'
                    )
                    .forEach(
                        function(button){

                            const buttonScore =
                                Number(
                                    button.dataset
                                        .optionScore
                                );


                            const selected =
                                Boolean(
                                    answer &&
                                    Number(
                                        answer.score
                                    ) ===
                                    buttonScore
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


                Page02.updateIndicatorScoreDisplay(
                    indicatorId
                );

            }
        );


    Page02.updateLiveScore();

    Page02.updateCurrentDimensionSummary();

    Page02.renderDimensionProgress();

    Page02.updateDimensionNavigation();

};


/* =============================================================================
 * FIND FIRST UNANSWERED INDICATOR
 * =============================================================================
 */


Page02.getFirstUnansweredIndicator = function(
    dimensionIndex
){

    const index =
        Number.isInteger(
            dimensionIndex
        )
            ? dimensionIndex
            : Page02.state.currentDimension;


    const dimension =
        Page02.getDimension(
            index
        );


    if(!dimension){

        return null;

    }


    return (
        dimension.indicators.find(
            function(indicator){

                return !Page02.hasAnswer(
                    indicator.id
                );

            }
        ) || null
    );

};


/* =============================================================================
 * FOCUS FIRST UNANSWERED INDICATOR
 * =============================================================================
 */


Page02.focusUnansweredIndicator = function(){

    const indicator =
        Page02.getFirstUnansweredIndicator();


    if(!indicator){

        return false;

    }


    const card =
        Page02.query(
            '[data-indicator="' +
            indicator.id +
            '"]'
        );


    if(!card){

        return false;

    }


    card.classList.add(
        'needs-answer'
    );


    card.scrollIntoView({
        behavior:
            'smooth',

        block:
            'center'
    });


    const firstOption =
        card.querySelector(
            '[data-indicator-option]'
        );


    if(firstOption){

        window.setTimeout(
            function(){

                firstOption.focus();

            },
            350
        );

    }


    window.setTimeout(
        function(){

            card.classList.remove(
                'needs-answer'
            );

        },
        1800
    );


    return true;

};


/* =============================================================================
 * SCORECARD SNAPSHOT
 * =============================================================================
 */


Page02.getScorecardSnapshot = function(){

    const dimensions =
        Page02.DIMENSIONS.map(
            function(
                dimension,
                index
            ){

                return {

                    dimensionId:
                        dimension.id,

                    number:
                        dimension.number,

                    tamil:
                        dimension.tamil,

                    english:
                        dimension.english,

                    answered:
                        Page02.getDimensionAnsweredCount(
                            index
                        ),

                    score:
                        Page02.getDimensionScore(
                            index
                        ),

                    maximumScore:
                        Page02.getDimensionMaximum(
                            index
                        ),

                    gap:
                        Page02.getDimensionGap(
                            index
                        ),

                    scorePercentage:
                        Page02.getDimensionScorePercentage(
                            index
                        ),

                    completionPercentage:
                        Page02.getDimensionCompletion(
                            index
                        ),

                    complete:
                        Page02.isDimensionComplete(
                            index
                        )

                };

            }
        );


    return {

        answered:
            Page02.getAnsweredCount(),

        remaining:
            Page02.getRemainingCount(),

        score:
            Page02.getTotalScore(),

        maximumScore:
            Page02.CONFIG.scoring.maximumScore,

        gap:
            Page02.getTotalGap(),

        scorePercentage:
            Page02.getScorePercentage(),

        completionPercentage:
            Page02.getCompletionPercentage(),

        complete:
            Page02.isScorecardComplete(),

        dimensions:
            dimensions

    };

};


/* =============================================================================
 * SCORECARD DEBUG INFO
 * =============================================================================
 */


Page02.scorecardInfo = function(){

    const snapshot =
        Page02.getScorecardSnapshot();


    return {

        page:
            Page02.CONFIG.pageLabel,

        version:
            Page02.version,

        currentDimension:
            Page02.state.currentDimension +
            1,

        answered:
            snapshot.answered,

        remaining:
            snapshot.remaining,

        score:
            snapshot.score,

        maximumScore:
            snapshot.maximumScore,

        gap:
            snapshot.gap,

        scorePercentage:
            snapshot.scorePercentage,

        completionPercentage:
            snapshot.completionPercentage,

        complete:
            snapshot.complete,

        dimensions:
            snapshot.dimensions

    };

};


/* =============================================================================
 * END OF BATCH 3
 * =============================================================================
 *
 * CTM PATH™ PAGE 02 v2.3
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Canonical four-option renderer
 *      ✓ Exactly four choices per indicator
 *      ✓ 25-indicator answer state
 *
 *      ✓ Answer replacement
 *      ✓ Selected-state restoration
 *      ✓ aria-pressed handling
 *
 *      ✓ Strong 1 / 4 → 4 / 4 display
 *      ✓ STARTING™
 *      ✓ PROGRESSING™
 *      ✓ ADVANCING™
 *      ✓ ACHIEVED™
 *
 *      ✓ Current dimension score
 *      ✓ Current dimension gap
 *      ✓ Current dimension completion
 *
 *      ✓ Total live score
 *      ✓ Total Millionaire Gap™
 *      ✓ Total questionnaire completion
 *
 *      ✓ Five-dimension progress
 *      ✓ Back-button state
 *      ✓ Next-button state
 *
 *      ✓ First-unanswered indicator targeting
 *      ✓ Scorecard diagnostic snapshot
 *
 *
 * IMPORTANT
 *
 *      Batch 4 attaches the actual:
 *
 *          BACK
 *          NEXT DIMENSION
 *          final-dimension validation
 *          all-25 validation
 *          navigation event listeners
 *
 *      Batch 5 then owns:
 *
 *          final result
 *          backend discovery payload
 *          CTM_API.saveDiscovery()
 *          result rendering
 *          Page 03 transition
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 4
 *
 * SCORECARD NAVIGATION CONTROLLER
 * DIMENSION VALIDATION
 * 25-INDICATOR COMPLETION GATE
 * FINAL DIMENSION HANDOFF
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      ✓ Validate current dimension
 *      ✓ Identify first unanswered indicator
 *      ✓ Focus incomplete indicator
 *      ✓ Previous dimension navigation
 *      ✓ Next dimension navigation
 *      ✓ Preserve answers between dimensions
 *      ✓ Restore selected answers
 *      ✓ Scroll cleanly to dimension top
 *      ✓ Validate all 25 indicators
 *      ✓ Find first incomplete dimension
 *      ✓ Recover user to incomplete dimension
 *      ✓ Lock against double-click navigation
 *      ✓ Final-dimension handoff to Batch 5
 *      ✓ Bind BACK / NEXT buttons
 *
 * DOES NOT:
 *
 *      ✗ Calculate final diagnosis
 *      ✗ Build backend discovery payload
 *      ✗ Call CTM_API.saveDiscovery()
 *      ✗ Render final result
 *      ✗ Navigate to Page 03
 *
 * =============================================================================
 */


/* =============================================================================
 * NAVIGATION LOCK
 * =============================================================================
 *
 * Prevents repeated NEXT / BACK clicks while
 * a dimension transition is being processed.
 *
 * =============================================================================
 */


Page02.state.navigationLocked =
    Boolean(
        Page02.state.navigationLocked
    );


Page02.lockNavigation = function(){

    Page02.state.navigationLocked =
        true;


    const backButton =
        Page02.el(
            Page02.DOM.dimensionBack
        );


    const nextButton =
        Page02.el(
            Page02.DOM.dimensionNext
        );


    if(backButton){

        backButton.dataset.busy =
            'true';

    }


    if(nextButton){

        nextButton.dataset.busy =
            'true';

    }

};


Page02.unlockNavigation = function(){

    Page02.state.navigationLocked =
        false;


    const backButton =
        Page02.el(
            Page02.DOM.dimensionBack
        );


    const nextButton =
        Page02.el(
            Page02.DOM.dimensionNext
        );


    if(backButton){

        delete backButton.dataset.busy;

    }


    if(nextButton){

        delete nextButton.dataset.busy;

    }


    Page02.updateDimensionNavigation();

};


/* =============================================================================
 * PRESERVE CURRENT DIMENSION
 * =============================================================================
 *
 * Answers are already written immediately to:
 *
 *      Page02.state.answers
 *
 * when an option is selected.
 *
 * Therefore this function mainly provides a stable
 * navigation lifecycle hook.
 *
 * =============================================================================
 */


Page02.preserveCurrentDimension = function(){

    if(
        typeof Page02.saveSession ===
        'function'
    ){

        Page02.saveSession();

    }


    return true;

};


/* =============================================================================
 * VALIDATE CURRENT DIMENSION
 * =============================================================================
 */


Page02.validateCurrentDimension = function(){

    const index =
        Page02.state.currentDimension;


    const dimension =
        Page02.getDimension(
            index
        );


    if(!dimension){

        Page02.setScorecardError(
            'Unable to load this scorecard dimension. Please refresh and try again.'
        );

        return false;

    }


    const unanswered =
        Page02.getFirstUnansweredIndicator(
            index
        );


    if(unanswered){

        Page02.setScorecardError(
            'Please select one answer for all five indicators before continuing.'
        );


        Page02.focusUnansweredIndicator();


        return false;

    }


    Page02.setScorecardError(
        ''
    );


    return true;

};


/* =============================================================================
 * COMPATIBILITY CAPTURE HOOK
 * =============================================================================
 *
 * Older Page 02 builds used:
 *
 *      captureCurrentDimension()
 *
 * Keep that contract intact.
 *
 * =============================================================================
 */


Page02.captureCurrentDimension = function(){

    Page02.preserveCurrentDimension();


    return Page02.validateCurrentDimension();

};


/* =============================================================================
 * SCROLL TO DIMENSION TOP
 * =============================================================================
 */


Page02.scrollToDimensionTop = function(){

    const scorecardScreen =
        Page02.el(
            Page02.DOM.scorecardScreen
        );


    const progress =
        Page02.el(
            Page02.DOM.dimensionProgress
        );


    const target =
        progress ||
        scorecardScreen;


    if(!target){

        return;

    }


    const rect =
        target.getBoundingClientRect();


    const currentScroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;


    const top =
        Math.max(
            0,
            rect.top +
            currentScroll -
            28
        );


    window.scrollTo({

        top:
            top,

        behavior:
            'smooth'

    });

};


/* =============================================================================
 * GO TO DIMENSION
 * =============================================================================
 */


Page02.goToDimension = function(
    index
){

    if(
        !Number.isInteger(
            index
        ) ||
        index < 0 ||
        index >=
            Page02.CONFIG.scoring.dimensionCount
    ){

        return false;

    }


    Page02.preserveCurrentDimension();


    Page02.state.currentDimension =
        index;


    Page02.setScorecardError(
        ''
    );


    Page02.renderCurrentDimension();


    Page02.refreshVisibleAnswerStates();


    if(
        typeof Page02.saveSession ===
        'function'
    ){

        Page02.saveSession();

    }


    Page02.scrollToDimensionTop();


    return true;

};


/* =============================================================================
 * PREVIOUS DIMENSION
 * =============================================================================
 */


Page02.previousDimension = function(){

    const current =
        Page02.state.currentDimension;


    if(current <= 0){

        return false;

    }


    return Page02.goToDimension(
        current - 1
    );

};


/* =============================================================================
 * FIND FIRST INCOMPLETE DIMENSION
 * =============================================================================
 */


Page02.getFirstIncompleteDimensionIndex =
    function(){

        for(
            let index = 0;
            index <
                Page02.CONFIG.scoring.dimensionCount;
            index += 1
        ){

            if(
                !Page02.isDimensionComplete(
                    index
                )
            ){

                return index;

            }

        }


        return -1;

    };


/* =============================================================================
 * FIND FIRST UNANSWERED INDICATOR ACROSS SCORECARD
 * =============================================================================
 */


Page02.getFirstUnansweredScorecardIndicator =
    function(){

        for(
            let dimensionIndex = 0;
            dimensionIndex <
                Page02.CONFIG.scoring.dimensionCount;
            dimensionIndex += 1
        ){

            const dimension =
                Page02.getDimension(
                    dimensionIndex
                );


            if(!dimension){

                continue;

            }


            for(
                const indicator of
                dimension.indicators
            ){

                if(
                    !Page02.hasAnswer(
                        indicator.id
                    )
                ){

                    return {

                        dimensionIndex:
                            dimensionIndex,

                        dimension:
                            dimension,

                        indicator:
                            indicator

                    };

                }

            }

        }


        return null;

    };


/* =============================================================================
 * VALIDATE ENTIRE SCORECARD
 * =============================================================================
 */


Page02.validateScorecardComplete =
    function(){

        if(
            Page02.isScorecardComplete()
        ){

            Page02.setScorecardError(
                ''
            );


            return true;

        }


        const missing =
            Page02.getFirstUnansweredScorecardIndicator();


        if(!missing){

            Page02.setScorecardError(
                'Your scorecard is incomplete. Please complete all 25 indicators.'
            );


            return false;

        }


        Page02.setScorecardError(
            'Please complete all 25 indicators before viewing your result.'
        );


        /*
         * Move back to the first incomplete dimension.
         */

        if(
            Page02.state.currentDimension !==
            missing.dimensionIndex
        ){

            Page02.goToDimension(
                missing.dimensionIndex
            );

        }


        /*
         * Allow newly rendered DOM to settle before
         * scrolling to the missing indicator.
         */

        window.setTimeout(
            function(){

                Page02.focusUnansweredIndicator();

            },
            180
        );


        return false;

    };


/* =============================================================================
 * FINAL SCORECARD HANDOFF
 * =============================================================================
 *
 * IMPORTANT:
 *
 * Batch 4 does NOT own result generation.
 *
 * Batch 5 will define:
 *
 *      Page02.completeScorecard()
 *
 * Therefore this function provides a clean handoff.
 *
 * =============================================================================
 */


Page02.handoffCompletedScorecard =
    async function(){

        if(
            !Page02.validateScorecardComplete()
        ){

            return false;

        }


        /*
         * Final session snapshot before result processing.
         */

        Page02.preserveCurrentDimension();


        /*
         * Batch 5 owns completeScorecard().
         */

        if(
            typeof Page02.completeScorecard ===
            'function'
        ){

            return await Page02.completeScorecard();

        }


        /*
         * Development fallback.
         *
         * This should only appear while Batch 5
         * has not yet been appended.
         */

        console.info(
            '[Page02] Scorecard complete. Awaiting Batch 5 result controller.',
            Page02.getScorecardSnapshot()
        );


        Page02.setScorecardError(
            'Your 25 indicators are complete. Result processing is being prepared.'
        );


        return true;

    };


/* =============================================================================
 * NEXT DIMENSION
 * =============================================================================
 *
 * DIMENSIONS 01–04
 *
 *      validate five indicators
 *      →
 *      preserve answers
 *      →
 *      next dimension
 *
 *
 * DIMENSION 05
 *
 *      validate five indicators
 *      →
 *      validate all 25 indicators
 *      →
 *      hand over to Batch 5
 *
 * =============================================================================
 */


Page02.nextDimension =
    async function(){

        if(
            Page02.state.navigationLocked
        ){

            return false;

        }


        if(
            !Page02.validateCurrentDimension()
        ){

            return false;

        }


        const current =
            Page02.state.currentDimension;


        const lastIndex =
            Page02.CONFIG.scoring.dimensionCount -
            1;


        Page02.preserveCurrentDimension();


        /* ---------------------------------------------------------------------
         * DIMENSIONS 01–04
         * ---------------------------------------------------------------------
         */


        if(current < lastIndex){

            return Page02.goToDimension(
                current + 1
            );

        }


        /* ---------------------------------------------------------------------
         * DIMENSION 05
         * ---------------------------------------------------------------------
         */


        return await Page02.handoffCompletedScorecard();

    };


/* =============================================================================
 * HANDLE BACK BUTTON
 * =============================================================================
 */


Page02.handleDimensionBack =
    function(event){

        if(event){

            event.preventDefault();

        }


        if(
            Page02.state.navigationLocked
        ){

            return false;

        }


        Page02.lockNavigation();


        try{

            return Page02.previousDimension();

        }
        finally{

            /*
             * Small delay prevents accidental
             * double activation.
             */

            window.setTimeout(
                function(){

                    Page02.unlockNavigation();

                },
                180
            );

        }

    };


/* =============================================================================
 * HANDLE NEXT BUTTON
 * =============================================================================
 */


Page02.handleDimensionNext =
    async function(event){

        if(event){

            event.preventDefault();

        }


        if(
            Page02.state.navigationLocked
        ){

            return false;

        }


        /*
         * Do not lock before validation.
         *
         * If the dimension is incomplete,
         * the user must immediately be able
         * to continue selecting answers.
         */

        if(
            !Page02.validateCurrentDimension()
        ){

            return false;

        }


        Page02.lockNavigation();


        try{

            return await Page02.nextDimension();

        }
        catch(error){

            console.error(
                '[Page02] Dimension navigation failed:',
                error
            );


            Page02.setScorecardError(
                'Something went wrong while continuing. Your selected answers are still محفوظ.'
                    .replace(
                        ' محفوظ',
                        ' saved'
                    )
            );


            return false;

        }
        finally{

            Page02.unlockNavigation();

        }

    };


/* =============================================================================
 * BIND DIMENSION NAVIGATION
 * =============================================================================
 */


Page02.bindDimensionNavigation =
    function(){

        const backButton =
            Page02.el(
                Page02.DOM.dimensionBack
            );


        const nextButton =
            Page02.el(
                Page02.DOM.dimensionNext
            );


        /* ---------------------------------------------------------------------
         * BACK
         * ---------------------------------------------------------------------
         */


        if(
            backButton &&
            backButton.dataset.bound !==
                'true'
        ){

            backButton.addEventListener(
                'click',
                Page02.handleDimensionBack
            );


            backButton.dataset.bound =
                'true';

        }


        /* ---------------------------------------------------------------------
         * NEXT
         * ---------------------------------------------------------------------
         */


        if(
            nextButton &&
            nextButton.dataset.bound !==
                'true'
        ){

            nextButton.addEventListener(
                'click',
                Page02.handleDimensionNext
            );


            nextButton.dataset.bound =
                'true';

        }


        Page02.updateDimensionNavigation();

    };


/* =============================================================================
 * KEYBOARD SUPPORT
 * =============================================================================
 *
 * Four-option buttons are native <button> elements,
 * therefore ENTER and SPACE already work correctly.
 *
 * This handler only provides an optional convenience:
 *
 *      ALT + LEFT
 *
 *          previous dimension
 *
 *      ALT + RIGHT
 *
 *          next dimension
 *
 * =============================================================================
 */


Page02.handleScorecardKeyboard =
    function(event){

        if(!event){

            return;

        }


        const screen =
            Page02.el(
                Page02.DOM.scorecardScreen
            );


        if(
            !screen ||
            !screen.classList.contains(
                'is-active'
            )
        ){

            return;

        }


        if(
            event.altKey &&
            event.key ===
                'ArrowLeft'
        ){

            event.preventDefault();


            Page02.handleDimensionBack(
                event
            );


            return;

        }


        if(
            event.altKey &&
            event.key ===
                'ArrowRight'
        ){

            event.preventDefault();


            Page02.handleDimensionNext(
                event
            );

        }

    };


/* =============================================================================
 * BIND SCORECARD KEYBOARD
 * =============================================================================
 */


Page02.bindScorecardKeyboard =
    function(){

        if(
            Page02.state.keyboardBound
        ){

            return;

        }


        document.addEventListener(
            'keydown',
            Page02.handleScorecardKeyboard
        );


        Page02.state.keyboardBound =
            true;

    };


/* =============================================================================
 * SCORECARD NAVIGATION AUDIT
 * =============================================================================
 */


Page02.getNavigationSnapshot =
    function(){

        const current =
            Page02.state.currentDimension;


        const firstIncomplete =
            Page02.getFirstIncompleteDimensionIndex();


        const firstMissing =
            Page02.getFirstUnansweredScorecardIndicator();


        return {

            currentDimensionIndex:
                current,

            currentDimensionNumber:
                current + 1,

            currentDimensionComplete:
                Page02.isDimensionComplete(
                    current
                ),

            scorecardComplete:
                Page02.isScorecardComplete(),

            answered:
                Page02.getAnsweredCount(),

            remaining:
                Page02.getRemainingCount(),

            firstIncompleteDimension:
                firstIncomplete >= 0
                    ? firstIncomplete + 1
                    : null,

            firstUnansweredIndicator:
                firstMissing
                    ? firstMissing.indicator.id
                    : null,

            navigationLocked:
                Page02.state.navigationLocked

        };

    };


/* =============================================================================
 * SCORECARD NAVIGATION INITIALIZER
 * =============================================================================
 *
 * Called by the final Page02.init() controller.
 *
 * Safe to call more than once.
 *
 * =============================================================================
 */


Page02.initializeScorecardNavigation =
    function(){

        Page02.bindDimensionNavigation();

        Page02.bindScorecardKeyboard();

        Page02.updateDimensionNavigation();


        return true;

    };


/* =============================================================================
 * END OF BATCH 4
 * =============================================================================
 *
 * CTM PATH™
 * PAGE 02 v2.3
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Current-dimension validation
 *      ✓ Five-answer completion gate
 *      ✓ First-unanswered detection
 *      ✓ First-unanswered focus
 *
 *      ✓ Previous dimension
 *      ✓ Next dimension
 *      ✓ Dimension index protection
 *
 *      ✓ Answer preservation
 *      ✓ Session preservation hook
 *      ✓ Selected-answer restoration
 *
 *      ✓ Smooth dimension-top scrolling
 *
 *      ✓ First incomplete dimension detection
 *      ✓ Full 25-indicator validation
 *      ✓ Recovery to incomplete dimension
 *
 *      ✓ Navigation lock
 *      ✓ Double-click protection
 *
 *      ✓ BACK event binding
 *      ✓ NEXT event binding
 *
 *      ✓ Optional keyboard navigation
 *
 *      ✓ Final-dimension handoff
 *      ✓ Batch 5 compatibility
 *
 *
 * SCORECARD JOURNEY NOW:
 *
 *      DIMENSION 01
 *          5 indicators
 *              ↓
 *
 *      DIMENSION 02
 *          5 indicators
 *              ↓
 *
 *      DIMENSION 03
 *          5 indicators
 *              ↓
 *
 *      DIMENSION 04
 *          5 indicators
 *              ↓
 *
 *      DIMENSION 05
 *          5 indicators
 *              ↓
 *
 *      ALL 25 COMPLETE?
 *
 *          NO
 *              ↓
 *          RETURN TO FIRST MISSING ANSWER
 *
 *          YES
 *              ↓
 *          Page02.completeScorecard()
 *              ↓
 *          BATCH 5
 *
 *
 * NEXT:
 *
 *      BATCH 5
 *
 *      FINAL RESULT ENGINE
 *      +
 *      BACKEND DISCOVERY PAYLOAD
 *      +
 *      CTM_API.saveDiscovery()
 *      +
 *      RESULT SCREEN
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 5
 *
 * FINAL RESULT ENGINE
 * DISCOVERY PAYLOAD
 * CTM_API.saveDiscovery()
 * RESULT SCREEN
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      ✓ Calculate final 100-point score
 *      ✓ Calculate Millionaire Gap™
 *      ✓ Calculate five dimension results
 *      ✓ Determine overall score status
 *      ✓ Build canonical 25-answer result
 *      ✓ Build backend discovery payload
 *      ✓ Call CTM_API.saveDiscovery()
 *      ✓ Preserve backend response
 *      ✓ Render result screen
 *      ✓ Display dimension breakdown
 *      ✓ Display completion state
 *      ✓ Protect against duplicate submission
 *      ✓ Preserve result in session state
 *
 * DOES NOT:
 *
 *      ✗ Initialize the complete Page 02 controller
 *      ✗ Restore session on page reload
 *      ✗ Load global components
 *      ✗ Bind the final Page 03 button
 *
 * Those belong to Batch 6.
 *
 * =============================================================================
 */


/* =============================================================================
 * RESULT PROCESSING STATE
 * =============================================================================
 */


Page02.state.isSavingDiscovery =
    Boolean(
        Page02.state.isSavingDiscovery
    );


Page02.state.discoveryResponse =
    Page02.state.discoveryResponse ||
    null;


Page02.state.result =
    Page02.state.result ||
    null;


/* =============================================================================
 * GET OVERALL SCORE STATUS
 * =============================================================================
 *
 * The individual option language already uses:
 *
 *      1 = STARTING™
 *      2 = PROGRESSING™
 *      3 = ADVANCING™
 *      4 = ACHIEVED™
 *
 * The final 100-point result uses the same four-stage
 * progression without changing the underlying scoring.
 *
 * =============================================================================
 */


Page02.getOverallScoreStatus = function(
    totalScore
){

    const score =
        Number(
            totalScore
        ) || 0;


    if(score <= 25){

        return {

            key:
                'starting',

            tamil:
                'தொடக்க நிலை',

            english:
                'STARTING™',

            minimum:
                0,

            maximum:
                25

        };

    }


    if(score <= 50){

        return {

            key:
                'progressing',

            tamil:
                'முன்னேற்ற நிலை',

            english:
                'PROGRESSING™',

            minimum:
                26,

            maximum:
                50

        };

    }


    if(score <= 75){

        return {

            key:
                'advancing',

            tamil:
                'மேம்பட்ட நிலை',

            english:
                'ADVANCING™',

            minimum:
                51,

            maximum:
                75

        };

    }


    return {

        key:
            'achieved',

        tamil:
            'சாதனை நிலை',

        english:
            'ACHIEVED™',

        minimum:
            76,

        maximum:
            100

    };

};


/* =============================================================================
 * BUILD DIMENSION RESULT
 * =============================================================================
 */


Page02.buildDimensionResult = function(
    dimension,
    dimensionIndex
){

    const score =
        Page02.getDimensionScore(
            dimensionIndex
        );


    const maximumScore =
        Page02.getDimensionMaximum(
            dimensionIndex
        );


    const gap =
        Page02.getDimensionGap(
            dimensionIndex
        );


    const percentage =
        Page02.getDimensionScorePercentage(
            dimensionIndex
        );


    const answered =
        Page02.getDimensionAnsweredCount(
            dimensionIndex
        );


    const indicators =
        dimension.indicators.map(
            function(indicator){

                const answer =
                    Page02.getAnswer(
                        indicator.id
                    );


                return {

                    indicatorId:
                        indicator.id,

                    indicatorNumber:
                        indicator.number,

                    tamil:
                        indicator.tamil,

                    english:
                        indicator.english,

                    ideal:
                        indicator.ideal,

                    target:
                        indicator.target,

                    score:
                        answer
                            ? Number(
                                answer.score
                            )
                            : 0,

                    maximumScore:
                        Page02.CONFIG.scoring.maximum,

                    gap:
                        answer
                            ? (
                                Page02.CONFIG.scoring.maximum -
                                Number(
                                    answer.score
                                )
                            )
                            : Page02.CONFIG.scoring.maximum,

                    optionLabel:
                        answer
                            ? answer.optionLabel
                            : '',

                    value:
                        answer
                            ? answer.value
                            : '',

                    status:
                        answer
                            ? Page02.getScoreStatus(
                                answer.score
                            )
                            : null

                };

            }
        );


    return {

        dimensionId:
            dimension.id,

        dimensionNumber:
            dimension.number,

        tamil:
            dimension.tamil,

        english:
            dimension.english,

        score:
            score,

        maximumScore:
            maximumScore,

        gap:
            gap,

        percentage:
            percentage,

        answered:
            answered,

        indicatorCount:
            dimension.indicators.length,

        complete:
            Page02.isDimensionComplete(
                dimensionIndex
            ),

        indicators:
            indicators

    };

};


/* =============================================================================
 * BUILD ALL DIMENSION RESULTS
 * =============================================================================
 */


Page02.buildDimensionResults = function(){

    return Page02.DIMENSIONS.map(
        function(
            dimension,
            index
        ){

            return Page02.buildDimensionResult(
                dimension,
                index
            );

        }
    );

};


/* =============================================================================
 * BUILD FLAT ANSWER LIST
 * =============================================================================
 *
 * Backend-friendly canonical answer list.
 *
 * Exactly 25 records when the scorecard is complete.
 *
 * =============================================================================
 */


Page02.buildAnswerList = function(){

    const answers =
        [];


    Page02.DIMENSIONS.forEach(
        function(
            dimension,
            dimensionIndex
        ){

            dimension.indicators.forEach(
                function(indicator){

                    const answer =
                        Page02.getAnswer(
                            indicator.id
                        );


                    if(!answer){

                        return;

                    }


                    const score =
                        Number(
                            answer.score
                        );


                    answers.push({

                        dimensionId:
                            dimension.id,

                        dimensionNumber:
                            dimension.number,

                        dimensionTamil:
                            dimension.tamil,

                        dimensionEnglish:
                            dimension.english,

                        indicatorId:
                            indicator.id,

                        indicatorNumber:
                            indicator.number,

                        indicatorTamil:
                            indicator.tamil,

                        indicatorEnglish:
                            indicator.english,

                        ideal:
                            indicator.ideal,

                        target:
                            indicator.target,

                        optionLabel:
                            answer.optionLabel,

                        value:
                            answer.value,

                        score:
                            score,

                        maximumScore:
                            Page02.CONFIG.scoring.maximum,

                        gap:
                            (
                                Page02.CONFIG.scoring.maximum -
                                score
                            ),

                        status:
                            Page02.getScoreStatus(
                                score
                            ).english,

                        dimensionIndex:
                            dimensionIndex

                    });

                }
            );

        }
    );


    return answers;

};


/* =============================================================================
 * BUILD FINAL RESULT
 * =============================================================================
 */


Page02.buildFinalResult = function(){

    const totalScore =
        Page02.getTotalScore();


    const maximumScore =
        Page02.CONFIG.scoring.maximumScore;


    const gap =
        Page02.getTotalGap();


    const scorePercentage =
        Page02.getScorePercentage();


    const completionPercentage =
        Page02.getCompletionPercentage();


    const status =
        Page02.getOverallScoreStatus(
            totalScore
        );


    const dimensions =
        Page02.buildDimensionResults();


    const answers =
        Page02.buildAnswerList();


    return {

        peopleId:
            Page02.state.peopleId ||
            null,

        clientId:
            Page02.state.clientId ||
            Page02.state.peopleId ||
            null,

        fullName:
            (
                Page02.state.kyc &&
                Page02.state.kyc.fullName
            )
                ? Page02.state.kyc.fullName
                : '',

        score:
            totalScore,

        totalScore:
            totalScore,

        maximumScore:
            maximumScore,

        gap:
            gap,

        millionaireGap:
            gap,

        percentage:
            scorePercentage,

        scorePercentage:
            scorePercentage,

        completionPercentage:
            completionPercentage,

        answered:
            Page02.getAnsweredCount(),

        remaining:
            Page02.getRemainingCount(),

        status:
            status,

        complete:
            Page02.isScorecardComplete(),

        dimensions:
            dimensions,

        answers:
            answers,

        calculatedAt:
            new Date().toISOString()

    };

};


/* =============================================================================
 * RESULT INTEGRITY CHECK
 * =============================================================================
 */


Page02.validateFinalResult = function(
    result
){

    if(!result){

        throw new Error(
            'Unable to calculate your scorecard result.'
        );

    }


    if(
        result.answered !==
        Page02.CONFIG.scoring.indicatorCount
    ){

        throw new Error(
            'All 25 indicators must be completed before calculating the result.'
        );

    }


    if(
        result.answers.length !==
        Page02.CONFIG.scoring.indicatorCount
    ){

        throw new Error(
            'The scorecard answer set is incomplete.'
        );

    }


    if(
        result.dimensions.length !==
        Page02.CONFIG.scoring.dimensionCount
    ){

        throw new Error(
            'The scorecard dimension set is incomplete.'
        );

    }


    if(
        result.totalScore < 0 ||
        result.totalScore >
            Page02.CONFIG.scoring.maximumScore
    ){

        throw new Error(
            'The calculated score is outside the valid range.'
        );

    }


    return true;

};


/* =============================================================================
 * BUILD DISCOVERY PAYLOAD
 * =============================================================================
 *
 * This is the canonical Page 02 → backend boundary.
 *
 * Rich KYC and all 25 answers are retained.
 *
 * =============================================================================
 */


Page02.buildDiscoveryPayload = function(
    result
){

    const kyc =
        Page02.state.kyc ||
        {};


    return {

        /* ---------------------------------------------------------------------
         * IDENTITY
         * ---------------------------------------------------------------------
         */

        peopleId:
            Page02.state.peopleId ||
            null,

        clientId:
            Page02.state.clientId ||
            Page02.state.peopleId ||
            null,


        /* ---------------------------------------------------------------------
         * PAGE / JOURNEY
         * ---------------------------------------------------------------------
         */

        page:
            Page02.CONFIG.page,

        pageLabel:
            Page02.CONFIG.pageLabel,

        journey:
            'CTM PATH™ MILLIONAIRES™',

        assessment:
            'MILLIONAIRE LIFESTYLE SCORECARD™',

        version:
            Page02.version,


        /* ---------------------------------------------------------------------
         * KYC
         * ---------------------------------------------------------------------
         */

        kyc: {

            fullName:
                kyc.fullName ||
                '',

            mobile:
                kyc.mobile ||
                '',

            email:
                kyc.email ||
                '',

            age:
                kyc.age,

            gender:
                kyc.gender ||
                '',

            occupation:
                kyc.occupation ||
                '',

            employerBusiness:
                kyc.employerBusiness ||
                '',

            maritalStatus:
                kyc.maritalStatus ||
                '',

            dependents:
                kyc.dependents ||
                '',

            city:
                kyc.city ||
                '',

            district:
                kyc.district ||
                '',

            state:
                kyc.state ||
                '',

            country:
                kyc.country ||
                '',

            pincode:
                kyc.pincode ||
                '',

            preferredLanguage:
                kyc.preferredLanguage ||
                '',

            referralSource:
                kyc.referralSource ||
                ''

        },


        /* ---------------------------------------------------------------------
         * SUMMARY
         * ---------------------------------------------------------------------
         */

        score:
            result.totalScore,

        totalScore:
            result.totalScore,

        maximumScore:
            result.maximumScore,

        gap:
            result.gap,

        millionaireGap:
            result.millionaireGap,

        percentage:
            result.scorePercentage,

        completionPercentage:
            result.completionPercentage,

        status:
            result.status.english,

        statusKey:
            result.status.key,

        answered:
            result.answered,

        remaining:
            result.remaining,


        /* ---------------------------------------------------------------------
         * DIMENSIONS
         * ---------------------------------------------------------------------
         */

        dimensions:
            result.dimensions.map(
                function(dimension){

                    return {

                        dimensionId:
                            dimension.dimensionId,

                        dimensionNumber:
                            dimension.dimensionNumber,

                        tamil:
                            dimension.tamil,

                        english:
                            dimension.english,

                        score:
                            dimension.score,

                        maximumScore:
                            dimension.maximumScore,

                        gap:
                            dimension.gap,

                        percentage:
                            dimension.percentage,

                        answered:
                            dimension.answered

                    };

                }
            ),


        /* ---------------------------------------------------------------------
         * ALL 25 ANSWERS
         * ---------------------------------------------------------------------
         */

        answers:
            result.answers,


        /* ---------------------------------------------------------------------
         * CONTEXT
         * ---------------------------------------------------------------------
         */

        language:
            kyc.preferredLanguage ||
            document.documentElement.lang ||
            'ta',

        device:
            Page02.getDeviceType(),

        source:
            'CTM PATH™ MILLIONAIRES™ — PAGE 02',

        completedAt:
            result.calculatedAt

    };

};


/* =============================================================================
 * SAVE DISCOVERY
 * =============================================================================
 */


Page02.saveDiscovery = async function(
    result
){

    const payload =
        Page02.buildDiscoveryPayload(
            result
        );


    const response =
        await Page02.api(
            'saveDiscovery',
            payload
        );


    /*
     * Validate API failure envelope.
     */

    Page02.unwrapResponse(
        response
    );


    Page02.state.discoveryResponse =
        response;


    return response;

};


/* =============================================================================
 * FORMAT SCORE
 * =============================================================================
 */


Page02.formatScore = function(
    value,
    maximum
){

    return (
        Number(
            value
        ) +
        ' / ' +
        Number(
            maximum
        )
    );

};


/* =============================================================================
 * RENDER RESULT DIMENSION
 * =============================================================================
 */


Page02.renderResultDimension = function(
    dimension
){

    const percentage =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    dimension.percentage
                ) || 0
            )
        );


    return `
        <article
            class="result-dimension"
            data-result-dimension="${Page02.escapeHTML(
                dimension.dimensionId
            )}"
        >

            <div class="result-dimension-heading">

                <div>

                    <span class="result-dimension-number">
                        DIMENSION
                        ${Page02.escapeHTML(
                            dimension.dimensionNumber
                        )}
                    </span>

                    <h3>
                        ${Page02.escapeHTML(
                            dimension.tamil
                        )}
                    </h3>

                    <p>
                        ${Page02.escapeHTML(
                            dimension.english
                        )}
                    </p>

                </div>


                <div class="result-dimension-score">

                    <strong>
                        ${dimension.score}
                        /
                        ${dimension.maximumScore}
                    </strong>

                    <span>
                        GAP ${dimension.gap}
                    </span>

                </div>

            </div>


            <div
                class="result-dimension-track"
                aria-hidden="true"
            >

                <span
                    style="width:${percentage}%"
                ></span>

            </div>


            <div class="result-dimension-meta">

                <span>
                    ${percentage}% OF BENCHMARK
                </span>

                <span>
                    ${dimension.answered} / 5 COMPLETED
                </span>

            </div>

        </article>
    `;

};


/* =============================================================================
 * BUILD RESULT MARKUP
 * =============================================================================
 *
 * The result screen is populated dynamically so that
 * the calculation shown to the user is always generated
 * from the same canonical answer state sent to backend.
 *
 * =============================================================================
 */


Page02.buildResultMarkup = function(
    result
){

    const name =
        result.fullName
            ? Page02.escapeHTML(
                result.fullName
            )
            : '';


    const status =
        result.status;


    return `

        <div class="page02-result">

            <header class="result-heading">

                <span class="section-kicker">
                    YOUR MILLIONAIRE LIFESTYLE SCORECARD™
                </span>


                ${
                    name
                        ? `
                            <p class="result-client-name">
                                ${name}
                            </p>
                        `
                        : ''
                }


                <h2>
                    உங்கள் தற்போதைய வாழ்க்கை நிலை
                </h2>


                <h3>
                    YOUR CURRENT LIFESTYLE POSITION™
                </h3>

            </header>


            <section
                class="result-hero"
                data-result-status="${Page02.escapeHTML(
                    status.key
                )}"
            >

                <div class="result-score-label">
                    YOUR SCORE
                </div>


                <div class="result-score">

                    <strong>
                        ${result.totalScore}
                    </strong>

                    <span>
                        / ${result.maximumScore}
                    </span>

                </div>


                <div class="result-status">

                    <span>
                        ${Page02.escapeHTML(
                            status.tamil
                        )}
                    </span>

                    <strong>
                        ${Page02.escapeHTML(
                            status.english
                        )}
                    </strong>

                </div>


                <div class="result-gap">

                    <span>
                        MILLIONAIRE GAP™
                    </span>

                    <strong>
                        ${result.gap}
                    </strong>

                </div>

            </section>


            <section class="result-summary-grid">

                <div class="result-summary-card">

                    <span>
                        SCORE
                    </span>

                    <strong>
                        ${result.totalScore}
                        /
                        ${result.maximumScore}
                    </strong>

                </div>


                <div class="result-summary-card">

                    <span>
                        BENCHMARK ACHIEVED
                    </span>

                    <strong>
                        ${result.scorePercentage}%
                    </strong>

                </div>


                <div class="result-summary-card">

                    <span>
                        MILLIONAIRE GAP™
                    </span>

                    <strong>
                        ${result.gap}
                    </strong>

                </div>


                <div class="result-summary-card">

                    <span>
                        INDICATORS COMPLETED
                    </span>

                    <strong>
                        ${result.answered}
                        /
                        ${Page02.CONFIG.scoring.indicatorCount}
                    </strong>

                </div>

            </section>


            <section class="result-dimensions">

                <div class="result-section-heading">

                    <span class="section-kicker">
                        YOUR FIVE DIMENSIONS
                    </span>

                    <h2>
                        உங்கள் வாழ்க்கையின் ஐந்து பரிமாணங்கள்
                    </h2>

                    <p>
                        DIMENSION-BY-DIMENSION SCORE
                    </p>

                </div>


                <div class="result-dimension-list">

                    ${
                        result.dimensions
                            .map(
                                function(dimension){

                                    return Page02.renderResultDimension(
                                        dimension
                                    );

                                }
                            )
                            .join('')
                    }

                </div>

            </section>


            <section class="result-completion">

                <p>
                    25 வாழ்க்கை குறியீடுகளின் அடிப்படையில்
                    உங்கள் தற்போதைய நிலை பதிவு செய்யப்பட்டுள்ளது.
                </p>

                <p class="english-copy">
                    YOUR 25-INDICATOR MILLIONAIRE LIFESTYLE
                    SCORECARD™ IS COMPLETE.
                </p>

            </section>

        </div>
    `;

};


/* =============================================================================
 * GET RESULT HOST
 * =============================================================================
 *
 * Supports a dedicated result-content host if present.
 *
 * If the finalized HTML does not contain one,
 * the result screen itself becomes the host.
 *
 * =============================================================================
 */


Page02.getResultHost = function(){

    const dedicated =
        Page02.el(
            'result-content'
        );


    if(dedicated){

        return dedicated;

    }


    return Page02.el(
        Page02.DOM.resultScreen
    );

};


/* =============================================================================
 * RENDER RESULT
 * =============================================================================
 */


Page02.renderResult = function(
    result
){

    const host =
        Page02.getResultHost();


    if(!host){

        throw new Error(
            'Page 02 result container is unavailable.'
        );

    }


    host.innerHTML =
        Page02.buildResultMarkup(
            result
        );


    return true;

};


/* =============================================================================
 * SHOW RESULT
 * =============================================================================
 */


Page02.showResult = function(
    result
){

    Page02.renderResult(
        result
    );


    Page02.showScreen(
        Page02.SCREENS.RESULT,
        {
            scroll:
                true,

            focus:
                true
        }
    );


    return true;

};


/* =============================================================================
 * RESULT PROCESSING ERROR
 * =============================================================================
 */


Page02.showResultProcessingError = function(
    error
){

    const message =
        (
            error &&
            error.message
        )
            ? error.message
            : 'Unable to save your scorecard result. Please try again.';


    console.error(
        '[Page02] Result processing failed:',
        error
    );


    Page02.setScorecardError(
        message
    );

};


/* =============================================================================
 * COMPLETE SCORECARD
 * =============================================================================
 *
 * THIS IS THE BATCH 4 HANDOFF TARGET.
 *
 * FLOW:
 *
 *      Validate all 25
 *          ↓
 *      Build result
 *          ↓
 *      Validate result
 *          ↓
 *      Save discovery
 *          ↓
 *      Preserve backend response
 *          ↓
 *      Render result
 *
 * =============================================================================
 */


Page02.completeScorecard = async function(){

    if(
        Page02.state.isSavingDiscovery
    ){

        return false;

    }


    if(
        !Page02.validateScorecardComplete()
    ){

        return false;

    }


    Page02.state.isSavingDiscovery =
        true;


    Page02.lockNavigation();


    Page02.setLoading(
        true
    );


    Page02.setScorecardError(
        ''
    );


    try{

        /* ---------------------------------------------------------------------
         * BUILD FINAL RESULT
         * ---------------------------------------------------------------------
         */


        const result =
            Page02.buildFinalResult();


        /* ---------------------------------------------------------------------
         * DEFENSIVE INTEGRITY CHECK
         * ---------------------------------------------------------------------
         */


        Page02.validateFinalResult(
            result
        );


        /* ---------------------------------------------------------------------
         * HOLD RESULT BEFORE API CALL
         *
         * This prevents calculation loss if network
         * persistence encounters an error.
         * ---------------------------------------------------------------------
         */


        Page02.state.result =
            result;


        if(
            typeof Page02.saveSession ===
            'function'
        ){

            Page02.saveSession();

        }


        /* ---------------------------------------------------------------------
         * BACKEND
         * ---------------------------------------------------------------------
         */


        const response =
            await Page02.saveDiscovery(
                result
            );


        /* ---------------------------------------------------------------------
         * ATTACH BACKEND RESPONSE
         * ---------------------------------------------------------------------
         */


        result.saved =
            true;


        result.savedAt =
            new Date().toISOString();


        result.backend =
            response;


        Page02.state.result =
            result;


        /* ---------------------------------------------------------------------
         * FINAL SESSION SNAPSHOT
         * ---------------------------------------------------------------------
         */


        if(
            typeof Page02.saveSession ===
            'function'
        ){

            Page02.saveSession();

        }


        /* ---------------------------------------------------------------------
         * RESULT SCREEN
         * ---------------------------------------------------------------------
         */


        Page02.showResult(
            result
        );


        return true;

    }
    catch(error){

        Page02.showResultProcessingError(
            error
        );


        return false;

    }
    finally{

        Page02.state.isSavingDiscovery =
            false;


        Page02.setLoading(
            false
        );


        Page02.unlockNavigation();

    }

};


/* =============================================================================
 * RESULT SNAPSHOT
 * =============================================================================
 */


Page02.getResultSnapshot = function(){

    const result =
        Page02.state.result;


    if(!result){

        return null;

    }


    return {

        peopleId:
            result.peopleId,

        clientId:
            result.clientId,

        score:
            result.totalScore,

        maximumScore:
            result.maximumScore,

        gap:
            result.gap,

        percentage:
            result.scorePercentage,

        status:
            result.status
                ? result.status.english
                : null,

        answered:
            result.answered,

        complete:
            result.complete,

        saved:
            Boolean(
                result.saved
            ),

        savedAt:
            result.savedAt ||
            null,

        dimensions:
            result.dimensions
                ? result.dimensions.map(
                    function(dimension){

                        return {

                            id:
                                dimension.dimensionId,

                            number:
                                dimension.dimensionNumber,

                            score:
                                dimension.score,

                            maximum:
                                dimension.maximumScore,

                            gap:
                                dimension.gap,

                            percentage:
                                dimension.percentage

                        };

                    }
                )
                : []

    };

};


/* =============================================================================
 * DISCOVERY DEBUG INFO
 * =============================================================================
 */


Page02.discoveryInfo = function(){

    return {

        saving:
            Page02.state.isSavingDiscovery,

        result:
            Page02.getResultSnapshot(),

        backendResponse:
            Page02.state.discoveryResponse

    };

};


/* =============================================================================
 * END OF BATCH 5
 * =============================================================================
 *
 * CTM PATH™ PAGE 02 v2.3
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Final 100-point calculation
 *      ✓ Millionaire Gap™ calculation
 *
 *      ✓ STARTING™
 *      ✓ PROGRESSING™
 *      ✓ ADVANCING™
 *      ✓ ACHIEVED™
 *
 *      ✓ Five dimension results
 *      ✓ 25 canonical answer records
 *      ✓ Indicator-level gaps
 *
 *      ✓ Final-result integrity validation
 *
 *      ✓ Canonical discovery payload
 *      ✓ Full rich KYC preservation
 *      ✓ PeopleID / ClientID preservation
 *
 *      ✓ CTM_API.saveDiscovery()
 *      ✓ Backend response preservation
 *
 *      ✓ Result hero
 *      ✓ Score / 100
 *      ✓ Millionaire Gap™
 *      ✓ Benchmark percentage
 *      ✓ Five-dimension breakdown
 *
 *      ✓ Duplicate submission protection
 *      ✓ Loading state
 *      ✓ Failure handling
 *      ✓ Session hooks
 *
 *
 * PAGE 02 DATA FLOW
 *
 *      KYC
 *       ↓
 *
 *      CTM_API.register()
 *       ↓
 *
 *      PeopleID / ClientID
 *       ↓
 *
 *      25 INDICATORS
 *       ↓
 *
 *      25 × FOUR OPTIONS
 *       ↓
 *
 *      1–4 POINTS EACH
 *       ↓
 *
 *      FIVE DIMENSIONS
 *       ↓
 *
 *      20 POINTS EACH
 *       ↓
 *
 *      TOTAL SCORE / 100
 *       ↓
 *
 *      MILLIONAIRE GAP™
 *       ↓
 *
 *      CTM_API.saveDiscovery()
 *       ↓
 *
 *      RESULT SCREEN
 *
 *
 * NEXT:
 *
 *      BATCH 6 — FINAL CONTROLLER
 *
 *      • session persistence
 *      • session recovery
 *      • Page02.init()
 *      • Batch 2 binding
 *      • Batch 4 navigation binding
 *      • initial screen selection
 *      • result recovery
 *      • Page 03 CTA
 *      • DOMContentLoaded
 *      • window.Page02 exposure
 *
 * =============================================================================
 */

