
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * Frontend v2.2
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
 * VERSION 2.2 ARCHITECTURE
 * -----------------------------------------------------------------------------
 *
 *      Batch 1
 *          Foundation
 *          Configuration
 *          Runtime state
 *          Score model
 *          Frozen 25-indicator master
 *          Frozen 100 selectable ranges
 *
 *      Batch 2
 *          Canonical four-option renderer
 *          Answer selection
 *          Live scoring
 *          Dimension progress
 *
 *      Batch 3
 *          KYC
 *          CTM_API.register()
 *          Client identity
 *          Dimension navigation
 *
 *      Batch 4
 *          Final result engine
 *          CTM_API.saveDiscovery()
 *          Page 02 Result screen
 *
 *      Batch 5
 *          Session recovery
 *          Initialization
 *          Header integration
 *          Page 03 continuation
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
 *      Users NEVER type financial or lifestyle values.
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


Page02.version = '2.2';


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
 * CANONICAL PAGE SCREENS
 * =============================================================================
 *
 * These are logical screen identities.
 *
 * Batch 2–5 will map them directly to the frozen Page 02 DOM.
 *
 * No compatibility selectors are defined here.
 *
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
 * BATCH 1 — MASTER INTEGRITY HELPERS
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
        function(allIndicators, dimension){

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
            function(total, indicator){

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
        !Number.isInteger(normalizedIndex) ||
        normalizedIndex < 0 ||
        normalizedIndex >= Page02.DIMENSIONS.length
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


Page02.getDimensionById = function(dimensionId){

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


Page02.getIndicator = function(indicatorId){

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


Page02.getIndicatorDimension = function(indicatorId){

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

    const errors = [];

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
        function(dimension, dimensionIndex){

            if(
                !dimension ||
                typeof dimension !== 'object'
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
                Page02.CONFIG.scoring.indicatorsPerDimension
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
                typeof indicator !== 'object'
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
                indicator.options.length !== 4
            ){

                errors.push(
                    indicator.id +
                    ' must contain exactly four options.'
                );

                return;

            }


            const expectedScores =
                [1, 2, 3, 4];


            indicator.options.forEach(
                function(option, optionIndex){

                    if(
                        !option ||
                        typeof option !== 'object'
                    ){

                        errors.push(
                            indicator.id +
                            ' contains an invalid option.'
                        );

                        return;

                    }


                    if(
                        Number(option.score) !==
                        expectedScores[optionIndex]
                    ){

                        errors.push(
                            indicator.id +
                            ' option ' +
                            (optionIndex + 1) +
                            ' must have score ' +
                            expectedScores[optionIndex] +
                            '.'
                        );

                    }


                    if(
                        typeof option.label !==
                        'string' ||
                        !option.label.trim()
                    ){

                        errors.push(
                            indicator.id +
                            ' option ' +
                            (optionIndex + 1) +
                            ' has no label.'
                        );

                    }

                }
            );

        }
    );


    /* -------------------------------------------------------------------------
     * TOTAL OPTION COUNT
     * -------------------------------------------------------------------------
     */


    if(
        Page02.getOptionCount() !== 100
    ){

        errors.push(
            'Expected exactly 100 controlled score ranges.'
        );

    }


    /* -------------------------------------------------------------------------
     * MAXIMUM SCORE
     * -------------------------------------------------------------------------
     */


    if(
        Page02.getMaximumScore() !== 100
    ){

        errors.push(
            'Maximum Lifestyle Scorecard™ score must equal 100.'
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
 * Browser console after the complete v2.2 file is loaded:
 *
 *      Page02.masterInfo()
 *
 * Expected:
 *
 *      version         2.2
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
 * CTM PATH™ PAGE 02 v2.2
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Canonical Page02 namespace
 *      ✓ v2.2 configuration
 *      ✓ Canonical screen identities
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
 *
 * NEXT
 *
 *      BATCH 2
 *
 *      CANONICAL FOUR-OPTION RENDERER
 *      ANSWER SELECTION
 *      LIVE SCORING
 *      DIMENSION PROGRESS
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 2
 *
 * CANONICAL FOUR-OPTION RENDERER
 * ANSWER SELECTION
 * LIVE SCORING
 * DIMENSION PROGRESS
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      • Flatten and enrich scorecard indicators
 *      • Render one active dimension at a time
 *      • Render five indicators per dimension
 *      • Render exactly four options per indicator
 *      • Restore previously selected answers
 *      • Capture option selections
 *      • Maintain strong selected-state feedback
 *      • Update indicator score immediately
 *      • Calculate dimension score
 *      • Calculate total live score
 *      • Calculate answered / remaining indicators
 *      • Update scorecard progress
 *      • Control dimension navigation availability
 *
 * IMPORTANT
 *
 *      This batch does NOT:
 *
 *          • Register the client
 *          • Call CTM_API.register()
 *          • Save discovery
 *          • Call CTM_API.saveDiscovery()
 *          • Calculate final result classification
 *          • Navigate to Page 03
 *
 *      Those responsibilities belong to later batches.
 *
 * =============================================================================
 */


/* =============================================================================
 * DOM LOOKUP
 * =============================================================================
 */


Page02.el = function(id){

    return document.getElementById(id);

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
 * ESCAPE HTML
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
 * CLAMP
 * =============================================================================
 */


Page02.clamp = function(
    value,
    minimum,
    maximum
){

    const numericValue =
        Number(value);

    if(
        !Number.isFinite(
            numericValue
        )
    ){

        return minimum;

    }


    return Math.min(
        maximum,
        Math.max(
            minimum,
            numericValue
        )
    );

};


/* =============================================================================
 * GET ALL INDICATORS WITH DIMENSION METADATA
 * =============================================================================
 *
 * Batch 1 exposes getAllIndicators().
 *
 * This helper adds dimension identity without mutating
 * the frozen master definition.
 *
 * =============================================================================
 */


Page02.getScorecardIndicators = function(){

    const indicators = [];


    Page02.DIMENSIONS.forEach(
        function(
            dimension,
            dimensionIndex
        ){

            dimension.indicators.forEach(
                function(
                    indicator,
                    indicatorIndex
                ){

                    indicators.push({

                        id:
                            indicator.id,

                        number:
                            indicator.number,

                        tamil:
                            indicator.tamil,

                        english:
                            indicator.english,

                        ideal:
                            indicator.ideal,

                        target:
                            indicator.target,

                        options:
                            indicator.options,

                        dimensionId:
                            dimension.id,

                        dimensionNumber:
                            dimension.number,

                        dimensionTamil:
                            dimension.tamil,

                        dimensionEnglish:
                            dimension.english,

                        dimensionIndex:
                            dimensionIndex,

                        indicatorIndex:
                            indicatorIndex

                    });

                }
            );

        }
    );


    return indicators;

};


/* =============================================================================
 * GET ENRICHED INDICATOR
 * =============================================================================
 */


Page02.getScorecardIndicator = function(
    indicatorId
){

    return (
        Page02
            .getScorecardIndicators()
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
 * HAS ANSWER
 * =============================================================================
 */


Page02.hasAnswer = function(
    indicatorId
){

    const answer =
        Page02.getAnswer(
            indicatorId
        );


    if(!answer){

        return false;

    }


    const score =
        Number(
            answer.score
        );


    return (
        Number.isFinite(score) &&
        score >=
            Page02.CONFIG.scoring.minimum &&
        score <=
            Page02.CONFIG.scoring.maximum
    );

};


/* =============================================================================
 * GET ANSWERED COUNT
 * =============================================================================
 */


Page02.getAnsweredCount = function(){

    return Page02
        .getScorecardIndicators()
        .reduce(
            function(
                count,
                indicator
            ){

                return (
                    count +
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
 * GET REMAINING COUNT
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
 * GET RAW TOTAL SCORE
 * =============================================================================
 */


Page02.getTotalScore = function(){

    return Page02
        .getScorecardIndicators()
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


                if(
                    !Number.isFinite(
                        score
                    )
                ){

                    return total;

                }


                return (
                    total +
                    Page02.clamp(
                        score,
                        Page02.CONFIG.scoring.minimum,
                        Page02.CONFIG.scoring.maximum
                    )
                );

            },
            0
        );

};


/* =============================================================================
 * GET MAXIMUM POSSIBLE SCORE FOR ANSWERED INDICATORS
 * =============================================================================
 */


Page02.getAnsweredMaximumScore = function(){

    return (
        Page02.getAnsweredCount() *
        Page02.CONFIG.scoring.maximum
    );

};


/* =============================================================================
 * GET TOTAL GAP
 * =============================================================================
 *
 * Maximum final score = 100.
 *
 * The live gap is therefore:
 *
 *      100 - current score
 *
 * Unanswered indicators remain part of the gap.
 *
 * =============================================================================
 */


Page02.getTotalGap = function(){

    return Math.max(
        0,
        Page02.CONFIG.scoring.maximumScore -
        Page02.getTotalScore()
    );

};


/* =============================================================================
 * GET COMPLETION PERCENTAGE
 * =============================================================================
 */


Page02.getCompletionPercentage = function(){

    const total =
        Page02.CONFIG.scoring.indicatorCount;


    if(total <= 0){

        return 0;

    }


    return Math.round(
        (
            Page02.getAnsweredCount() /
            total
        ) * 100
    );

};


/* =============================================================================
 * GET SCORE PERCENTAGE
 * =============================================================================
 *
 * Because the final maximum score is exactly 100,
 * the total raw score is already the final percentage.
 *
 * The explicit calculation is retained for architecture clarity.
 *
 * =============================================================================
 */


Page02.getScorePercentage = function(){

    const maximum =
        Page02.CONFIG.scoring.maximumScore;


    if(maximum <= 0){

        return 0;

    }


    return Math.round(
        (
            Page02.getTotalScore() /
            maximum
        ) * 100
    );

};


/* =============================================================================
 * GET DIMENSION ANSWERED COUNT
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
            count,
            indicator
        ){

            return (
                count +
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
 * GET DIMENSION SCORE
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


            if(
                !Number.isFinite(
                    score
                )
            ){

                return total;

            }


            return (
                total +
                Page02.clamp(
                    score,
                    1,
                    4
                )
            );

        },
        0
    );

};


/* =============================================================================
 * GET DIMENSION MAXIMUM SCORE
 * =============================================================================
 */


Page02.getDimensionMaximumScore = function(){

    return (
        Page02.CONFIG.scoring.indicatorsPerDimension *
        Page02.CONFIG.scoring.maximum
    );

};


/* =============================================================================
 * GET DIMENSION GAP
 * =============================================================================
 */


Page02.getDimensionGap = function(
    dimensionIndex
){

    return Math.max(
        0,
        Page02.getDimensionMaximumScore() -
        Page02.getDimensionScore(
            dimensionIndex
        )
    );

};


/* =============================================================================
 * GET DIMENSION COMPLETION
 * =============================================================================
 */


Page02.getDimensionCompletion = function(
    dimensionIndex
){

    const answered =
        Page02.getDimensionAnsweredCount(
            dimensionIndex
        );


    return Math.round(
        (
            answered /
            Page02.CONFIG.scoring.indicatorsPerDimension
        ) * 100
    );

};


/* =============================================================================
 * IS DIMENSION COMPLETE
 * =============================================================================
 */


Page02.isDimensionComplete = function(
    dimensionIndex
){

    return (
        Page02.getDimensionAnsweredCount(
            dimensionIndex
        ) ===
        Page02.CONFIG.scoring.indicatorsPerDimension
    );

};


/* =============================================================================
 * IS SCORECARD COMPLETE
 * =============================================================================
 */


Page02.isScorecardComplete = function(){

    return (
        Page02.getAnsweredCount() ===
        Page02.CONFIG.scoring.indicatorCount
    );

};


/* =============================================================================
 * CREATE OPTION BUTTON
 * =============================================================================
 *
 * Canonical option architecture:
 *
 *      button.score-option
 *
 *          .score-option__score
 *              1 / 2 / 3 / 4
 *
 *          .score-option__body
 *
 *              .score-option__range
 *              .score-option__status
 *
 * This structure is intentionally simple.
 *
 * page02.css controls whether the four choices appear:
 *
 *      Desktop:
 *          four columns
 *
 *      Tablet:
 *          two rows × two columns
 *
 *      Mobile:
 *          one option per row
 *
 * JavaScript does NOT control responsive layout.
 *
 * =============================================================================
 */


Page02.createOptionButton = function(
    indicator,
    option,
    optionIndex
){

    const button =
        document.createElement(
            'button'
        );


    const status =
        Page02.getScoreStatus(
            option.score
        );


    const currentAnswer =
        Page02.getAnswer(
            indicator.id
        );


    const selected =
        Boolean(
            currentAnswer &&
            Number(
                currentAnswer.score
            ) ===
            Number(
                option.score
            )
        );


    button.type =
        'button';


    button.className =
        'score-option';


    if(selected){

        button.classList.add(
            'is-selected'
        );

    }


    button.dataset.indicator =
        indicator.id;


    button.dataset.score =
        String(
            option.score
        );


    button.dataset.optionIndex =
        String(
            optionIndex
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
            indicator.english +
            ': ' +
            option.label +
            '. Score ' +
            option.score +
            ' of 4. ' +
            status.english
        )
    );


    button.innerHTML = `

        <span class="score-option__score">

            ${Page02.escapeHTML(
                option.score
            )}

        </span>


        <span class="score-option__body">

            <span class="score-option__range">

                ${Page02.escapeHTML(
                    option.label
                )}

            </span>


            <span class="score-option__status">

                <span class="score-option__status-tamil">

                    ${Page02.escapeHTML(
                        status.tamil
                    )}

                </span>

                <span class="score-option__status-english">

                    ${Page02.escapeHTML(
                        status.english
                    )}

                </span>

            </span>

        </span>

    `;


    button.addEventListener(
        'click',
        function(){

            Page02.selectOption(
                indicator.id,
                option.score
            );

        }
    );


    return button;

};


/* =============================================================================
 * CREATE QUESTION CARD
 * =============================================================================
 */


Page02.createQuestionCard = function(
    indicator
){

    const card =
        document.createElement(
            'article'
        );


    card.className =
        'scorecard-question';


    card.dataset.indicator =
        indicator.id;


    card.dataset.questionNumber =
        String(
            indicator.number
        );


    const heading =
        document.createElement(
            'div'
        );


    heading.className =
        'scorecard-question__heading';


    heading.innerHTML = `

        <div class="scorecard-question__identity">

            <span class="scorecard-question__number">

                ${Page02.escapeHTML(
                    indicator.number
                )}

            </span>


            <div class="scorecard-question__titles">

                <h3 class="scorecard-question__tamil">

                    ${Page02.escapeHTML(
                        indicator.tamil
                    )}

                </h3>


                <p class="scorecard-question__english">

                    ${Page02.escapeHTML(
                        indicator.english
                    )}

                </p>

            </div>

        </div>


        <div class="scorecard-question__ideal">

            <span class="scorecard-question__ideal-label">

                IDEAL

            </span>

            <strong class="scorecard-question__ideal-value">

                ${Page02.escapeHTML(
                    indicator.ideal
                )}

            </strong>

        </div>

    `;


    const options =
        document.createElement(
            'div'
        );


    options.className =
        'score-options';


    options.setAttribute(
        'role',
        'group'
    );


    options.setAttribute(
        'aria-label',
        indicator.english
    );


    indicator.options.forEach(
        function(
            option,
            optionIndex
        ){

            options.appendChild(
                Page02.createOptionButton(
                    indicator,
                    option,
                    optionIndex
                )
            );

        }
    );


    const score =
        document.createElement(
            'div'
        );


    score.className =
        'scorecard-question__score';


    score.dataset.scoreFor =
        indicator.id;


    Page02.populateScoreDisplay(
        score,
        Page02.getAnswer(
            indicator.id
        )
    );


    card.appendChild(
        heading
    );


    card.appendChild(
        options
    );


    card.appendChild(
        score
    );


    return card;

};


/* =============================================================================
 * POPULATE INDICATOR SCORE DISPLAY
 * =============================================================================
 */


Page02.populateScoreDisplay = function(
    element,
    answer
){

    if(!element){

        return;

    }


    if(!answer){

        element.classList.remove(
            'is-answered'
        );


        element.innerHTML = `

            <span class="scorecard-question__score-label">

                SCORE

            </span>

            <strong class="scorecard-question__score-value">

                —

            </strong>

            <span class="scorecard-question__score-max">

                / 4

            </span>

        `;


        return;

    }


    const score =
        Number(
            answer.score
        );


    const status =
        Page02.getScoreStatus(
            score
        );


    element.classList.add(
        'is-answered'
    );


    element.innerHTML = `

        <span class="scorecard-question__score-label">

            SCORE

        </span>


        <strong class="scorecard-question__score-value">

            ${Page02.escapeHTML(
                score
            )}

        </strong>


        <span class="scorecard-question__score-max">

            / 4

        </span>


        <span class="scorecard-question__score-status">

            ${Page02.escapeHTML(
                status.english
            )}

        </span>

    `;

};


/* =============================================================================
 * RENDER CURRENT DIMENSION
 * =============================================================================
 */


Page02.renderCurrentDimension = function(){

    const dimension =
        Page02.getDimension(
            Page02.state.currentDimension
        );


    if(!dimension){

        console.error(
            'CTM PATH™ Page 02: Invalid dimension index.',
            Page02.state.currentDimension
        );

        return;

    }


    const container =
        Page02.el(
            'dimension-questions'
        );


    if(!container){

        console.error(
            'CTM PATH™ Page 02: #dimension-questions was not found.'
        );

        return;

    }


    /* -------------------------------------------------------------------------
     * DIMENSION IDENTITY
     * -------------------------------------------------------------------------
     */


    const numberElement =
        Page02.el(
            'dimension-number'
        );


    const tamilElement =
        Page02.el(
            'dimension-title-tamil'
        );


    const englishElement =
        Page02.el(
            'dimension-title-english'
        );


    if(numberElement){

        numberElement.textContent =
            dimension.number;

    }


    if(tamilElement){

        tamilElement.textContent =
            dimension.tamil;

    }


    if(englishElement){

        englishElement.textContent =
            dimension.english;

    }


    /* -------------------------------------------------------------------------
     * QUESTIONS
     * -------------------------------------------------------------------------
     */


    container.innerHTML =
        '';


    dimension.indicators.forEach(
        function(indicator){

            container.appendChild(
                Page02.createQuestionCard(
                    indicator
                )
            );

        }
    );


    /* -------------------------------------------------------------------------
     * LIVE STATE
     * -------------------------------------------------------------------------
     */


    Page02.updateLiveScore();

    Page02.updateDimensionProgress();

    Page02.updateDimensionNavigation();

};


/* =============================================================================
 * SELECT OPTION
 * =============================================================================
 */


Page02.selectOption = function(
    indicatorId,
    score
){

    const indicator =
        Page02.getScorecardIndicator(
            indicatorId
        );


    if(!indicator){

        console.error(
            'CTM PATH™ Unknown scorecard indicator:',
            indicatorId
        );

        return;

    }


    const normalizedScore =
        Number(
            score
        );


    const optionIndex =
        indicator.options.findIndex(
            function(option){

                return (
                    Number(
                        option.score
                    ) ===
                    normalizedScore
                );

            }
        );


    if(optionIndex < 0){

        console.error(
            'CTM PATH™ Invalid score option:',
            indicatorId,
            score
        );

        return;

    }


    const selectedOption =
        indicator.options[
            optionIndex
        ];


    const status =
        Page02.getScoreStatus(
            selectedOption.score
        );


    /* -------------------------------------------------------------------------
     * STORE CANONICAL ANSWER
     * -------------------------------------------------------------------------
     */


    Page02.state.answers[
        indicatorId
    ] = {

        indicatorId:
            indicator.id,

        indicatorNumber:
            indicator.number,

        dimensionId:
            indicator.dimensionId,

        dimensionNumber:
            indicator.dimensionNumber,

        tamil:
            indicator.tamil,

        english:
            indicator.english,

        ideal:
            indicator.ideal,

        target:
            indicator.target,

        optionIndex:
            optionIndex,

        score:
            Number(
                selectedOption.score
            ),

        selectedRange:
            selectedOption.label,

        value:
            selectedOption.value,

        statusTamil:
            status.tamil,

        statusEnglish:
            status.english

    };


    /* -------------------------------------------------------------------------
     * UPDATE OPTION VISUAL STATES
     * -------------------------------------------------------------------------
     */


    const card =
        document.querySelector(
            '.scorecard-question[data-indicator="' +
            indicatorId +
            '"]'
        );


    if(card){

        const buttons =
            card.querySelectorAll(
                '.score-option'
            );


        buttons.forEach(
            function(button){

                const buttonScore =
                    Number(
                        button.dataset.score
                    );


                const selected =
                    buttonScore ===
                    normalizedScore;


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
                indicatorId +
                '"]'
            );


        Page02.populateScoreDisplay(
            scoreElement,
            Page02.state.answers[
                indicatorId
            ]
        );


        card.classList.add(
            'is-answered'
        );

    }


    /* -------------------------------------------------------------------------
     * UPDATE SCORECARD
     * -------------------------------------------------------------------------
     */


    Page02.updateLiveScore();

    Page02.updateDimensionProgress();

    Page02.updateDimensionNavigation();


    /* -------------------------------------------------------------------------
     * SESSION PERSISTENCE HOOK
     * -------------------------------------------------------------------------
     *
     * Batch 5 supplies saveSession().
     *
     * Guarded here so Batch 2 can operate independently during assembly.
     *
     * -------------------------------------------------------------------------
     */


    if(
        typeof Page02.saveSession ===
        'function'
    ){

        Page02.saveSession();

    }

};


/* =============================================================================
 * UPDATE LIVE SCORE
 * =============================================================================
 */


Page02.updateLiveScore = function(){

    const score =
        Page02.getTotalScore();


    const gap =
        Page02.getTotalGap();


    const answered =
        Page02.getAnsweredCount();


    const remaining =
        Page02.getRemainingCount();


    const completion =
        Page02.getCompletionPercentage();


    /* -------------------------------------------------------------------------
     * SCORE
     * -------------------------------------------------------------------------
     */


    const scoreElement =
        Page02.el(
            'live-score'
        );


    if(scoreElement){

        scoreElement.textContent =
            String(score);

    }


    /* -------------------------------------------------------------------------
     * MAXIMUM
     * -------------------------------------------------------------------------
     */


    const maximumElement =
        Page02.el(
            'live-score-max'
        );


    if(maximumElement){

        maximumElement.textContent =
            String(
                Page02.CONFIG.scoring.maximumScore
            );

    }


    /* -------------------------------------------------------------------------
     * GAP
     * -------------------------------------------------------------------------
     */


    const gapElement =
        Page02.el(
            'live-gap'
        );


    if(gapElement){

        gapElement.textContent =
            String(gap);

    }


    /* -------------------------------------------------------------------------
     * ANSWERED
     * -------------------------------------------------------------------------
     */


    const answeredElement =
        Page02.el(
            'answered-count'
        );


    if(answeredElement){

        answeredElement.textContent =
            String(answered);

    }


    /* -------------------------------------------------------------------------
     * REMAINING
     * -------------------------------------------------------------------------
     */


    const remainingElement =
        Page02.el(
            'remaining-count'
        );


    if(remainingElement){

        remainingElement.textContent =
            String(remaining);

    }


    /* -------------------------------------------------------------------------
     * COMPLETION
     * -------------------------------------------------------------------------
     */


    const completionElement =
        Page02.el(
            'scorecard-completion'
        );


    if(completionElement){

        completionElement.textContent =
            completion + '%';

    }


    /* -------------------------------------------------------------------------
     * PROGRESS BAR
     * -------------------------------------------------------------------------
     */


    const progressBar =
        Page02.el(
            'scorecard-progress-bar'
        );


    if(progressBar){

        progressBar.style.width =
            completion + '%';


        progressBar.setAttribute(
            'aria-valuenow',
            String(completion)
        );

    }


    /* -------------------------------------------------------------------------
     * OPTIONAL SCORECARD ROOT STATE
     * -------------------------------------------------------------------------
     */


    const scorecard =
        Page02.el(
            'lifestyle-scorecard'
        );


    if(scorecard){

        scorecard.dataset.score =
            String(score);


        scorecard.dataset.answered =
            String(answered);


        scorecard.dataset.remaining =
            String(remaining);


        scorecard.dataset.complete =
            Page02.isScorecardComplete()
                ? 'true'
                : 'false';

    }

};


/* =============================================================================
 * UPDATE DIMENSION PROGRESS
 * =============================================================================
 */


Page02.updateDimensionProgress = function(){

    const index =
        Page02.state.currentDimension;


    const dimension =
        Page02.getDimension(
            index
        );


    if(!dimension){

        return;

    }


    const answered =
        Page02.getDimensionAnsweredCount(
            index
        );


    const score =
        Page02.getDimensionScore(
            index
        );


    const maximum =
        Page02.getDimensionMaximumScore();


    const gap =
        Page02.getDimensionGap(
            index
        );


    const completion =
        Page02.getDimensionCompletion(
            index
        );


    /* -------------------------------------------------------------------------
     * DIMENSION POSITION
     * -------------------------------------------------------------------------
     */


    const positionElement =
        Page02.el(
            'dimension-position'
        );


    if(positionElement){

        positionElement.textContent =
            (
                (index + 1) +
                ' / ' +
                Page02.CONFIG.scoring.dimensionCount
            );

    }


    /* -------------------------------------------------------------------------
     * ANSWERED
     * -------------------------------------------------------------------------
     */


    const answeredElement =
        Page02.el(
            'dimension-answered'
        );


    if(answeredElement){

        answeredElement.textContent =
            (
                answered +
                ' / ' +
                Page02.CONFIG.scoring.indicatorsPerDimension
            );

    }


    /* -------------------------------------------------------------------------
     * SCORE
     * -------------------------------------------------------------------------
     */


    const scoreElement =
        Page02.el(
            'dimension-score'
        );


    if(scoreElement){

        scoreElement.textContent =
            String(score);

    }


    const maximumElement =
        Page02.el(
            'dimension-score-max'
        );


    if(maximumElement){

        maximumElement.textContent =
            String(maximum);

    }


    /* -------------------------------------------------------------------------
     * GAP
     * -------------------------------------------------------------------------
     */


    const gapElement =
        Page02.el(
            'dimension-gap'
        );


    if(gapElement){

        gapElement.textContent =
            String(gap);

    }


    /* -------------------------------------------------------------------------
     * COMPLETION
     * -------------------------------------------------------------------------
     */


    const completionElement =
        Page02.el(
            'dimension-completion'
        );


    if(completionElement){

        completionElement.textContent =
            completion + '%';

    }


    /* -------------------------------------------------------------------------
     * PROGRESS BAR
     * -------------------------------------------------------------------------
     */


    const progressBar =
        Page02.el(
            'dimension-progress-bar'
        );


    if(progressBar){

        progressBar.style.width =
            completion + '%';


        progressBar.setAttribute(
            'aria-valuenow',
            String(completion)
        );

    }


    /* -------------------------------------------------------------------------
     * ROOT DATA
     * -------------------------------------------------------------------------
     */


    const scorecard =
        Page02.el(
            'lifestyle-scorecard'
        );


    if(scorecard){

        scorecard.dataset.dimension =
            dimension.id;


        scorecard.dataset.dimensionIndex =
            String(index);


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
 * RULE
 *
 *      BACK
 *          Available after Dimension 01.
 *
 *      NEXT
 *          Disabled until all five indicators in the
 *          current dimension are answered.
 *
 *      FINAL DIMENSION
 *          The same button remains locked until all five
 *          final indicators are answered.
 *
 * Batch 3 attaches the actual navigation behaviour.
 *
 * =============================================================================
 */


Page02.updateDimensionNavigation = function(){

    const index =
        Page02.state.currentDimension;


    const isFirst =
        index === 0;


    const isLast =
        index ===
        Page02.CONFIG.scoring.dimensionCount - 1;


    const complete =
        Page02.isDimensionComplete(
            index
        );


    const backButton =
        Page02.el(
            'dimension-back'
        );


    const nextButton =
        Page02.el(
            'dimension-next'
        );


    /* -------------------------------------------------------------------------
     * BACK BUTTON
     * -------------------------------------------------------------------------
     */


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


    /* -------------------------------------------------------------------------
     * NEXT BUTTON
     * -------------------------------------------------------------------------
     */


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
         * Keep visible button language synchronized
         * with the journey position.
         *
         * If Page02.html contains a dedicated
         * [data-next-label] span, only that span changes.
         *
         * Otherwise the frozen HTML button text remains untouched.
         */


        const label =
            nextButton.querySelector(
                '[data-next-label]'
            );


        if(label){

            label.textContent =
                isLast
                    ? 'VIEW MY SCORE'
                    : 'CONTINUE';

        }

    }

};


/* =============================================================================
 * REFRESH VISIBLE ANSWER STATES
 * =============================================================================
 *
 * Useful after:
 *
 *      • session restoration
 *      • dimension rendering
 *      • future state recovery
 *
 * =============================================================================
 */


Page02.refreshVisibleAnswerStates = function(){

    const cards =
        document.querySelectorAll(
            '.scorecard-question[data-indicator]'
        );


    cards.forEach(
        function(card){

            const indicatorId =
                card.dataset.indicator;


            const answer =
                Page02.getAnswer(
                    indicatorId
                );


            const buttons =
                card.querySelectorAll(
                    '.score-option'
                );


            buttons.forEach(
                function(button){

                    const buttonScore =
                        Number(
                            button.dataset.score
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


            card.classList.toggle(
                'is-answered',
                Boolean(answer)
            );


            const scoreElement =
                card.querySelector(
                    '[data-score-for="' +
                    indicatorId +
                    '"]'
                );


            Page02.populateScoreDisplay(
                scoreElement,
                answer
            );

        }
    );


    Page02.updateLiveScore();

    Page02.updateDimensionProgress();

    Page02.updateDimensionNavigation();

};


/* =============================================================================
 * GET SCORECARD SNAPSHOT
 * =============================================================================
 *
 * Internal diagnostic object.
 *
 * This becomes useful when validating Page 02 before
 * sending anything to the backend.
 *
 * =============================================================================
 */


Page02.getScorecardSnapshot = function(){

    const dimensions =
        Page02.DIMENSIONS.map(
            function(
                dimension,
                dimensionIndex
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
                            dimensionIndex
                        ),

                    score:
                        Page02.getDimensionScore(
                            dimensionIndex
                        ),

                    maximumScore:
                        Page02.getDimensionMaximumScore(),

                    gap:
                        Page02.getDimensionGap(
                            dimensionIndex
                        ),

                    completion:
                        Page02.getDimensionCompletion(
                            dimensionIndex
                        ),

                    complete:
                        Page02.isDimensionComplete(
                            dimensionIndex
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
 * SCORECARD CONSOLE AUDIT
 * =============================================================================
 *
 * During development:
 *
 *      Page02.scorecardInfo()
 *
 * Example after 7 answers:
 *
 *      answered            7
 *      remaining           18
 *      score               ...
 *      maximumScore        100
 *      completion          28
 *
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
            Page02.state.currentDimension + 1,

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

        completion:
            snapshot.completionPercentage,

        complete:
            snapshot.complete,

        dimensions:
            snapshot.dimensions

    };

};


/* =============================================================================
 * END OF BATCH 2
 * =============================================================================
 *
 * CTM PATH™ PAGE 02 v2.2
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Canonical DOM utility
 *      ✓ Safe HTML rendering
 *      ✓ Enriched indicator metadata
 *
 *      ✓ Four-option renderer
 *      ✓ Exactly four options per question
 *      ✓ Score 1 / 2 / 3 / 4 visible
 *      ✓ Range visible
 *      ✓ STARTING™ / PROGRESSING™ / ADVANCING™ / ACHIEVED™ visible
 *
 *      ✓ Strong selected-state architecture
 *      ✓ aria-pressed accessibility
 *      ✓ Answer replacement supported
 *      ✓ Indicator score updates immediately
 *
 *      ✓ Dimension answered count
 *      ✓ Dimension score
 *      ✓ Dimension gap
 *      ✓ Dimension completion
 *
 *      ✓ Total answered count
 *      ✓ Total remaining count
 *      ✓ Live score
 *      ✓ Live gap
 *      ✓ Score percentage
 *      ✓ Completion percentage
 *
 *      ✓ Dimension navigation locking
 *      ✓ Current dimension renderer
 *      ✓ Session persistence hook
 *      ✓ Scorecard diagnostic snapshot
 *
 *
 * IMPORTANT
 *
 *      Responsive arrangement belongs entirely to page02.css.
 *
 *      JavaScript always renders the SAME four-option structure.
 *
 *      Therefore:
 *
 *          DESKTOP
 *              4 options across
 *
 *          TABLET
 *              2 × 2
 *
 *          MOBILE
 *              4 stacked rows
 *
 *      can all be controlled without changing this JavaScript.
 *
 *
 * DO NOT initialize Page02 yet.
 *
 * DO NOT expose window.Page02 yet.
 *
 * DO NOT call CTM_API yet.
 *
 *
 * NEXT
 *
 *      BATCH 3
 *
 *      KYC
 *      CTM_API.register()
 *      CLIENT IDENTITY
 *      SCREEN CONTROL
 *      DIMENSION BACK / NEXT NAVIGATION
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 3
 *
 * SCREEN CONTROL
 * KYC
 * CTM_API.register()
 * CLIENT IDENTITY
 * DIMENSION NAVIGATION
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      • Control Page 02 internal screens
 *      • Validate KYC
 *      • Build canonical registration payload
 *      • Call CTM_API.register()
 *      • Capture People / Client ID
 *      • Persist client identity
 *      • Enter Lifestyle Scorecard™
 *      • Navigate backward between dimensions
 *      • Navigate forward between dimensions
 *      • Prevent incomplete dimensions from advancing
 *      • Hand completed Dimension 05 to Batch 4
 *
 * DOES NOT:
 *
 *      • Call CTM_API.saveDiscovery()
 *      • Build final result classification
 *      • Render final Page 02 result
 *      • Navigate to Page 03
 *
 * =============================================================================
 */


/* =============================================================================
 * SCREEN MAP
 * =============================================================================
 *
 * CANONICAL PAGE 02 DOM
 *
 *      #intro-screen
 *      #kyc-screen
 *      #scorecard-screen
 *      #result-screen
 *
 * No alternative selector architecture is used.
 *
 * =============================================================================
 */


Page02.SCREEN_IDS = {

    intro:
        'intro-screen',

    kyc:
        'kyc-screen',

    scorecard:
        'scorecard-screen',

    result:
        'result-screen'

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
    ).forEach(
        function(name){

            const screen =
                Page02.getScreenElement(
                    name
                );


            if(!screen){

                return;

            }


            const active =
                name === screenName;


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


    /* -------------------------------------------------------------------------
     * HEADER STATUS HOOK
     * -------------------------------------------------------------------------
     */


    if(
        typeof Page02.updateHeaderStatus ===
        'function'
    ){

        Page02.updateHeaderStatus();

    }


    /* -------------------------------------------------------------------------
     * SCROLL
     * -------------------------------------------------------------------------
     */


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


    /* -------------------------------------------------------------------------
     * OPTIONAL FOCUS
     * -------------------------------------------------------------------------
     */


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


    /* -------------------------------------------------------------------------
     * SESSION HOOK
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
 * START KYC
 * =============================================================================
 */


Page02.openKYC = function(){

    Page02.showScreen(
        Page02.SCREENS.KYC
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
 * GET KYC FORM
 * =============================================================================
 */


Page02.getKYCForm = function(){

    return Page02.el(
        'kycForm'
    );

};


/* =============================================================================
 * GET FORM VALUE
 * =============================================================================
 */


Page02.getFormValue = function(
    form,
    name
){

    if(!form){

        return '';

    }


    const field =
        form.elements[
            name
        ];


    if(!field){

        return '';

    }


    return Page02
        .safeText(
            field.value
        )
        .trim();

};


/* =============================================================================
 * NORMALIZE MOBILE
 * =============================================================================
 */


Page02.normalizeMobile = function(
    value
){

    return Page02
        .safeText(value)
        .replace(
            /\D/g,
            ''
        )
        .replace(
            /^91(?=\d{10}$)/,
            ''
        )
        .slice(
            -10
        );

};


/* =============================================================================
 * NORMALIZE EMAIL
 * =============================================================================
 */


Page02.normalizeEmail = function(
    value
){

    return Page02
        .safeText(value)
        .trim()
        .toLowerCase();

};


/* =============================================================================
 * NORMALIZE PINCODE
 * =============================================================================
 */


Page02.normalizePincode = function(
    value
){

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
 * EMAIL VALIDATION
 * =============================================================================
 */


Page02.isValidEmail = function(
    email
){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

};


/* =============================================================================
 * MOBILE VALIDATION
 * =============================================================================
 */


Page02.isValidMobile = function(
    mobile
){

    return /^[6-9]\d{9}$/.test(
        mobile
    );

};


/* =============================================================================
 * PINCODE VALIDATION
 * =============================================================================
 */


Page02.isValidPincode = function(
    pincode
){

    if(!pincode){

        return true;

    }


    return /^[1-9][0-9]{5}$/.test(
        pincode
    );

};


/* =============================================================================
 * CLEAR KYC ERRORS
 * =============================================================================
 */


Page02.clearKYCErrors = function(){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    form
        .querySelectorAll(
            '.field-error, .is-invalid'
        )
        .forEach(
            function(element){

                element.classList.remove(
                    'field-error',
                    'is-invalid'
                );

                element.removeAttribute(
                    'aria-invalid'
                );

            }
        );


    form
        .querySelectorAll(
            '[data-error-for]'
        )
        .forEach(
            function(element){

                element.textContent =
                    '';

                element.hidden =
                    true;

            }
        );


    const generalError =
        Page02.el(
            'kyc-error'
        );


    if(generalError){

        generalError.textContent =
            '';

        generalError.hidden =
            true;

    }

};


/* =============================================================================
 * SHOW FIELD ERROR
 * =============================================================================
 */


Page02.showFieldError = function(
    fieldName,
    message
){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    const field =
        form.elements[
            fieldName
        ];


    if(field){

        field.classList.add(
            'is-invalid'
        );


        field.setAttribute(
            'aria-invalid',
            'true'
        );

    }


    const error =
        form.querySelector(
            '[data-error-for="' +
            fieldName +
            '"]'
        );


    if(error){

        error.textContent =
            message;

        error.hidden =
            false;

    }

};


/* =============================================================================
 * SHOW KYC GENERAL ERROR
 * =============================================================================
 */


Page02.showKYCError = function(
    message
){

    const error =
        Page02.el(
            'kyc-error'
        );


    if(error){

        error.textContent =
            message;

        error.hidden =
            false;

    }


    console.error(
        'CTM PATH™ Page 02:',
        message
    );

};


/* =============================================================================
 * READ KYC
 * =============================================================================
 *
 * IMPORTANT
 *
 * These names represent the canonical registration payload expected by
 * the current CTM API architecture.
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

        email:
            Page02.normalizeEmail(
                Page02.getFormValue(
                    form,
                    'email'
                )
            ),

        mobile:
            Page02.normalizeMobile(
                Page02.getFormValue(
                    form,
                    'mobile'
                )
            ),

        gender:
            Page02.getFormValue(
                form,
                'gender'
            ),

        maritalStatus:
            Page02.getFormValue(
                form,
                'maritalStatus'
            ),

        ageRange:
            Page02.getFormValue(
                form,
                'ageRange'
            ),

        occupation:
            Page02.getFormValue(
                form,
                'occupation'
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

        pincode:
            Page02.normalizePincode(
                Page02.getFormValue(
                    form,
                    'pincode'
                )
            )

    };

};


/* =============================================================================
 * VALIDATE KYC
 * =============================================================================
 */


Page02.validateKYC = function(
    kyc
){

    Page02.clearKYCErrors();


    const errors = [];


    if(!kyc){

        return {
            valid:
                false,

            errors: [
                'KYC form is unavailable.'
            ]
        };

    }


    /* -------------------------------------------------------------------------
     * FULL NAME
     * -------------------------------------------------------------------------
     */


    if(
        !kyc.fullName ||
        kyc.fullName.length < 2
    ){

        errors.push(
            {
                field:
                    'fullName',

                message:
                    'Please enter your full name.'
            }
        );

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

        errors.push(
            {
                field:
                    'mobile',

                message:
                    'Please enter a valid 10-digit mobile number.'
            }
        );

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

        errors.push(
            {
                field:
                    'email',

                message:
                    'Please enter a valid email address.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * GENDER
     * -------------------------------------------------------------------------
     */


    if(!kyc.gender){

        errors.push(
            {
                field:
                    'gender',

                message:
                    'Please select your gender.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * MARITAL STATUS
     * -------------------------------------------------------------------------
     */


    if(!kyc.maritalStatus){

        errors.push(
            {
                field:
                    'maritalStatus',

                message:
                    'Please select your marital status.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * AGE RANGE
     * -------------------------------------------------------------------------
     */


    if(!kyc.ageRange){

        errors.push(
            {
                field:
                    'ageRange',

                message:
                    'Please select your age range.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * OCCUPATION
     * -------------------------------------------------------------------------
     */


    if(!kyc.occupation){

        errors.push(
            {
                field:
                    'occupation',

                message:
                    'Please select your occupation.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * CITY
     * -------------------------------------------------------------------------
     */


    if(!kyc.city){

        errors.push(
            {
                field:
                    'city',

                message:
                    'Please enter your city.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * DISTRICT
     * -------------------------------------------------------------------------
     */


    if(!kyc.district){

        errors.push(
            {
                field:
                    'district',

                message:
                    'Please enter your district.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * STATE
     * -------------------------------------------------------------------------
     */


    if(!kyc.state){

        errors.push(
            {
                field:
                    'state',

                message:
                    'Please select your state.'
            }
        );

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

        errors.push(
            {
                field:
                    'pincode',

                message:
                    'Please enter a valid 6-digit pincode.'
            }
        );

    }


    /* -------------------------------------------------------------------------
     * DISPLAY ERRORS
     * -------------------------------------------------------------------------
     */


    errors.forEach(
        function(error){

            Page02.showFieldError(
                error.field,
                error.message
            );

        }
    );


    return {

        valid:
            errors.length === 0,

        errors:
            errors

    };

};


/* =============================================================================
 * DETECT LANGUAGE
 * =============================================================================
 */


Page02.getLanguage = function(){

    const language =
        document.documentElement.lang;


    return (
        language ||
        'ta'
    );

};


/* =============================================================================
 * DETECT DEVICE
 * =============================================================================
 */


Page02.getDeviceType = function(){

    const width =
        window.innerWidth;


    if(width <= 768){

        return 'mobile';

    }


    if(width <= 1200){

        return 'tablet';

    }


    return 'desktop';

};


/* =============================================================================
 * BUILD REGISTRATION PAYLOAD
 * =============================================================================
 *
 * CTM_API.register() boundary remains intact.
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

        gender:
            kyc.gender,

        maritalStatus:
            kyc.maritalStatus,

        ageRange:
            kyc.ageRange,

        occupation:
            kyc.occupation,

        city:
            kyc.city,

        district:
            kyc.district,

        state:
            kyc.state,

        pincode:
            kyc.pincode,

        source:
            'CTM PATH™ MILLIONAIRES™ — PAGE 02',

        language:
            Page02.getLanguage(),

        device:
            Page02.getDeviceType()

    };

};


/* =============================================================================
 * SET KYC SUBMIT STATE
 * =============================================================================
 */


Page02.setKYCSubmitState = function(
    loading
){

    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    const submit =
        form.querySelector(
            '[type="submit"]'
        );


    if(!submit){

        return;

    }


    submit.disabled =
        Boolean(loading);


    submit.classList.toggle(
        'is-loading',
        Boolean(loading)
    );


    submit.setAttribute(
        'aria-busy',
        loading
            ? 'true'
            : 'false'
    );


    const loadingText =
        submit.dataset.loadingText;


    const defaultText =
        submit.dataset.defaultText;


    if(
        loading &&
        loadingText
    ){

        if(
            !submit.dataset.defaultText
        ){

            submit.dataset.defaultText =
                submit.textContent.trim();

        }


        submit.textContent =
            loadingText;

    }


    if(
        !loading &&
        defaultText
    ){

        submit.textContent =
            defaultText;

    }

};


/* =============================================================================
 * EXTRACT REGISTRATION IDENTITY
 * =============================================================================
 *
 * The backend/API boundary remains unchanged.
 *
 * This extractor accepts the common CTM response envelopes while
 * normalizing the result into one frontend identity.
 *
 * =============================================================================
 */


Page02.extractRegistrationIdentity = function(
    response
){

    const source =
        response &&
        response.data
            ? response.data
            : response || {};


    const peopleId =
        source.peopleId ||
        source.peopleID ||
        source.clientId ||
        source.clientID ||
        source.id ||
        null;


    const clientId =
        source.clientId ||
        source.clientID ||
        source.peopleId ||
        source.peopleID ||
        source.id ||
        null;


    return {

        peopleId:
            peopleId
                ? String(peopleId)
                : null,

        clientId:
            clientId
                ? String(clientId)
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
            'CTM PATH™ Page 02: Client identity could not be persisted.',
            error
        );

    }

};


/* =============================================================================
 * REGISTER CLIENT
 * =============================================================================
 */


Page02.registerClient = async function(){

    if(
        Page02.state.isRegistering
    ){

        return false;

    }


    const kyc =
        Page02.readKYC();


    const validation =
        Page02.validateKYC(
            kyc
        );


    if(!validation.valid){

        const firstError =
            validation.errors[0];


        if(
            firstError &&
            firstError.field
        ){

            const form =
                Page02.getKYCForm();


            const field =
                form &&
                form.elements[
                    firstError.field
                ];


            if(
                field &&
                typeof field.focus ===
                    'function'
            ){

                field.focus();

            }

        }


        return false;

    }


    /* -------------------------------------------------------------------------
     * API AVAILABILITY
     * -------------------------------------------------------------------------
     */


    if(
        !window.CTM_API ||
        typeof window.CTM_API.register !==
            'function'
    ){

        Page02.showKYCError(
            'Registration service is temporarily unavailable. Please try again.'
        );


        return false;

    }


    Page02.state.isRegistering =
        true;


    Page02.setKYCSubmitState(
        true
    );


    try{

        const payload =
            Page02.buildRegistrationPayload(
                kyc
            );


        const response =
            await window.CTM_API.register(
                payload
            );


        if(
            !response
        ){

            throw new Error(
                'Empty registration response.'
            );

        }


        if(
            response.success === false
        ){

            throw new Error(
                response.message ||
                response.error ||
                'Registration failed.'
            );

        }


        const identity =
            Page02.extractRegistrationIdentity(
                response
            );


        if(
            !identity.peopleId &&
            !identity.clientId
        ){

            throw new Error(
                'Registration succeeded but no client identity was returned.'
            );

        }


        /* ---------------------------------------------------------------------
         * COMMIT CLIENT STATE
         * ---------------------------------------------------------------------
         */


        Page02.state.kyc =
            Object.assign(
                {},
                kyc
            );


        Page02.state.peopleId =
            identity.peopleId ||
            identity.clientId;


        Page02.state.clientId =
            identity.clientId ||
            identity.peopleId;


        Page02.state.registrationResponse =
            response;


        Page02.saveClientIdentity();


        if(
            typeof Page02.saveSession ===
            'function'
        ){

            Page02.saveSession();

        }


        /* ---------------------------------------------------------------------
         * ENTER SCORECARD
         * ---------------------------------------------------------------------
         */


        Page02.enterScorecard();


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 registration failed:',
            error
        );


        Page02.showKYCError(
            error &&
            error.message
                ? error.message
                : 'We could not save your details. Please try again.'
        );


        return false;

    }
    finally{

        Page02.state.isRegistering =
            false;


        Page02.setKYCSubmitState(
            false
        );

    }

};


/* =============================================================================
 * HANDLE KYC SUBMIT
 * =============================================================================
 */


Page02.handleKYCSubmit = function(
    event
){

    if(event){

        event.preventDefault();

    }


    Page02.registerClient();

};


/* =============================================================================
 * ENTER SCORECARD
 * =============================================================================
 */


Page02.enterScorecard = function(){

    /*
     * A registered client identity is mandatory before
     * the financial discovery begins.
     */


    if(
        !Page02.state.peopleId &&
        !Page02.state.clientId
    ){

        console.error(
            'CTM PATH™ Page 02: Cannot enter scorecard without client identity.'
        );


        Page02.showScreen(
            Page02.SCREENS.KYC
        );


        return false;

    }


    Page02.state.currentDimension =
        Page02.clamp(
            Page02.state.currentDimension,
            0,
            Page02.CONFIG.scoring.dimensionCount - 1
        );


    Page02.showScreen(
        Page02.SCREENS.SCORECARD,
        {
            scroll:
                true
        }
    );


    Page02.renderCurrentDimension();


    return true;

};


/* =============================================================================
 * SCROLL TO DIMENSION TOP
 * =============================================================================
 */


Page02.scrollToDimensionTop = function(){

    const scorecard =
        Page02.el(
            'lifestyle-scorecard'
        );


    if(scorecard){

        scorecard.scrollIntoView({
            behavior:
                'smooth',

            block:
                'start'
        });


        return;

    }


    window.scrollTo({
        top:
            0,

        left:
            0,

        behavior:
            'smooth'
    });

};


/* =============================================================================
 * GO TO DIMENSION
 * =============================================================================
 */


Page02.goToDimension = function(
    dimensionIndex
){

    const index =
        Number(
            dimensionIndex
        );


    if(
        !Number.isInteger(index) ||
        index < 0 ||
        index >=
            Page02.CONFIG.scoring.dimensionCount
    ){

        return false;

    }


    Page02.state.currentDimension =
        index;


    Page02.renderCurrentDimension();


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
 * FIND FIRST UNANSWERED INDICATOR IN CURRENT DIMENSION
 * =============================================================================
 */


Page02.getFirstUnansweredIndicator = function(){

    const dimension =
        Page02.getDimension(
            Page02.state.currentDimension
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
 * FOCUS UNANSWERED INDICATOR
 * =============================================================================
 */


Page02.focusUnansweredIndicator = function(){

    const indicator =
        Page02.getFirstUnansweredIndicator();


    if(!indicator){

        return;

    }


    const card =
        document.querySelector(
            '.scorecard-question[data-indicator="' +
            indicator.id +
            '"]'
        );


    if(!card){

        return;

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
            '.score-option'
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

};


/* =============================================================================
 * NEXT DIMENSION
 * =============================================================================
 *
 * IMPORTANT
 *
 * Dimension 01–04:
 *
 *      validate 5 answers
 *      →
 *      move to next dimension
 *
 *
 * Dimension 05:
 *
 *      validate 5 answers
 *      →
 *      verify all 25 answers
 *      →
 *      hand over to Batch 4
 *
 * =============================================================================
 */


Page02.nextDimension = async function(){

    const current =
        Page02.state.currentDimension;


    /* -------------------------------------------------------------------------
     * CURRENT DIMENSION MUST BE COMPLETE
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isDimensionComplete(
            current
        )
    ){

        Page02.focusUnansweredIndicator();

        return false;

    }


    const lastIndex =
        Page02.CONFIG.scoring.dimensionCount - 1;


    /* -------------------------------------------------------------------------
     * DIMENSIONS 01–04
     * -------------------------------------------------------------------------
     */


    if(current < lastIndex){

        return Page02.goToDimension(
            current + 1
        );

    }


    /* -------------------------------------------------------------------------
     * DIMENSION 05
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isScorecardComplete()
    ){

        /*
         * Defensive recovery.
         *
         * Normally impossible because every dimension must be
         * completed before advancing.
         */


        const incompleteDimension =
            Page02.DIMENSIONS.findIndex(
                function(
                    dimension,
                    index
                ){

                    return !Page02.isDimensionComplete(
                        index
                    );

                }
            );


        if(
            incompleteDimension >= 0
        ){

            Page02.goToDimension(
                incompleteDimension
            );


            Page02.focusUnansweredIndicator();

        }


        return false;

    }


    /* -------------------------------------------------------------------------
     * BATCH 4 HANDOFF
     * -------------------------------------------------------------------------
     */


    if(
        typeof Page02.completeScorecard !==
        'function'
    ){

        console.error(
            'CTM PATH™ Page 02: Batch 4 completion engine is not available.'
        );


        return false;

    }


    return await Page02.completeScorecard();

};


/* =============================================================================
 * SET DIMENSION NAVIGATION BUSY STATE
 * =============================================================================
 */


Page02.setDimensionNavigationBusy = function(
    busy
){

    const backButton =
        Page02.el(
            'dimension-back'
        );


    const nextButton =
        Page02.el(
            'dimension-next'
        );


    if(backButton){

        backButton.disabled =
            Boolean(busy) ||
            Page02.state.currentDimension === 0;


        backButton.setAttribute(
            'aria-busy',
            busy
                ? 'true'
                : 'false'
        );

    }


    if(nextButton){

        nextButton.disabled =
            Boolean(busy) ||
            !Page02.isDimensionComplete(
                Page02.state.currentDimension
            );


        nextButton.setAttribute(
            'aria-busy',
            busy
                ? 'true'
                : 'false'
        );

    }

};


/* =============================================================================
 * BIND INTRO CONTROLS
 * =============================================================================
 */


Page02.bindIntroControls = function(){

    const beginButton =
        Page02.el(
            'begin-page02'
        );


    if(beginButton){

        beginButton.addEventListener(
            'click',
            function(event){

                event.preventDefault();

                Page02.openKYC();

            }
        );

    }

};


/* =============================================================================
 * BIND KYC CONTROLS
 * =============================================================================
 */


Page02.bindKYCControls = function(){

    const form =
        Page02.getKYCForm();


    if(form){

        form.addEventListener(
            'submit',
            Page02.handleKYCSubmit
        );

    }


    const backButton =
        Page02.el(
            'kyc-back'
        );


    if(backButton){

        backButton.addEventListener(
            'click',
            function(event){

                event.preventDefault();

                Page02.returnToIntro();

            }
        );

    }

};


/* =============================================================================
 * BIND DIMENSION CONTROLS
 * =============================================================================
 */


Page02.bindDimensionControls = function(){

    const backButton =
        Page02.el(
            'dimension-back'
        );


    const nextButton =
        Page02.el(
            'dimension-next'
        );


    if(backButton){

        backButton.addEventListener(
            'click',
            function(event){

                event.preventDefault();

                Page02.previousDimension();

            }
        );

    }


    if(nextButton){

        nextButton.addEventListener(
            'click',
            async function(event){

                event.preventDefault();


                if(
                    Page02.state.isSaving
                ){

                    return;

                }


                await Page02.nextDimension();

            }
        );

    }

};


/* =============================================================================
 * BIND PAGE 02 INTERACTION CONTROLS
 * =============================================================================
 *
 * Called once from Batch 5 initialization.
 *
 * =============================================================================
 */


Page02.bindControls = function(){

    Page02.bindIntroControls();

    Page02.bindKYCControls();

    Page02.bindDimensionControls();

};


/* =============================================================================
 * CLIENT IDENTITY INFO
 * =============================================================================
 */


Page02.clientInfo = function(){

    return {

        registered:
            Boolean(
                Page02.state.peopleId ||
                Page02.state.clientId
            ),

        peopleId:
            Page02.state.peopleId,

        clientId:
            Page02.state.clientId,

        fullName:
            Page02.state.kyc
                ? Page02.state.kyc.fullName || ''
                : '',

        registrationResponse:
            Page02.state.registrationResponse

    };

};


/* =============================================================================
 * END OF BATCH 3
 * =============================================================================
 *
 * CTM PATH™ PAGE 02 v2.2
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Canonical screen map
 *      ✓ Intro → KYC
 *      ✓ KYC → Intro
 *      ✓ Canonical #kycForm
 *
 *      ✓ KYC reading
 *      ✓ KYC normalization
 *      ✓ KYC validation
 *      ✓ Mobile validation
 *      ✓ Email validation
 *      ✓ Pincode validation
 *
 *      ✓ Registration payload
 *      ✓ Source / language / device metadata
 *
 *      ✓ CTM_API.register()
 *      ✓ Registration busy protection
 *      ✓ Registration error handling
 *      ✓ Client / People ID extraction
 *      ✓ Client identity persistence
 *
 *      ✓ Registered client → Scorecard
 *
 *      ✓ Dimension Back
 *      ✓ Dimension Next
 *      ✓ Five-answer dimension gate
 *      ✓ First unanswered question focus
 *      ✓ Answer persistence while navigating
 *
 *      ✓ Dimension 05 completion gate
 *      ✓ Full 25-answer validation
 *      ✓ Batch 4 completion handoff
 *
 *
 * CRITICAL JOURNEY RULE
 *
 *      Dimension 05 DOES NOT navigate directly to Page 03.
 *
 *      It calls:
 *
 *          Page02.completeScorecard()
 *
 *      which Batch 4 will implement as:
 *
 *          25 answers
 *              ↓
 *          calculate result
 *              ↓
 *          build backend payload
 *              ↓
 *          CTM_API.saveDiscovery()
 *              ↓
 *          Page 02 Result
 *
 *      Only the Result screen's Continue button will eventually
 *      hand the journey to Page 03.
 *
 *
 * DO NOT initialize Page02 yet.
 *
 * DO NOT expose window.Page02 yet.
 *
 *
 * NEXT
 *
 *      BATCH 4
 *
 *      FINAL RESULT ENGINE
 *      RESULT CLASSIFICATION
 *      BACKEND DISCOVERY PAYLOAD
 *      CTM_API.saveDiscovery()
 *      PAGE 02 RESULT SCREEN
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 4
 *
 * FINAL RESULT ENGINE
 * RESULT CLASSIFICATION
 * BACKEND DISCOVERY PAYLOAD
 * CTM_API.saveDiscovery()
 * PAGE 02 RESULT SCREEN
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      • Validate complete 25-indicator scorecard
 *      • Calculate final score / 100
 *      • Calculate total gap
 *      • Calculate five dimension results
 *      • Determine overall score band
 *      • Build canonical backend discovery payload
 *      • Call CTM_API.saveDiscovery()
 *      • Protect against duplicate saves
 *      • Persist result locally
 *      • Render Page 02 Result screen
 *      • Keep Page 03 navigation OUT of this batch
 *
 * JOURNEY
 *
 *      Dimension 05 complete
 *              ↓
 *      Page02.completeScorecard()
 *              ↓
 *      Calculate result
 *              ↓
 *      Build discovery payload
 *              ↓
 *      CTM_API.saveDiscovery()
 *              ↓
 *      Render Page 02 Result
 *              ↓
 *      WAIT for user
 *
 * Batch 5 will bind:
 *
 *      CONTINUE TO PAGE 03
 *
 * =============================================================================
 */


/* =============================================================================
 * RESULT BANDS
 * =============================================================================
 *
 * These bands classify the 100-point Lifestyle Scorecard™.
 *
 * The scoring mathematics remain:
 *
 *      25 indicators × maximum 4 = 100
 *
 * =============================================================================
 */


Page02.RESULT_BANDS = [

    {
        minimum:
            0,

        maximum:
            25,

        level:
            1,

        code:
            'STARTING',

        tamil:
            'தொடக்க நிலை',

        english:
            'STARTING™'
    },

    {
        minimum:
            26,

        maximum:
            50,

        level:
            2,

        code:
            'PROGRESSING',

        tamil:
            'முன்னேற்ற நிலை',

        english:
            'PROGRESSING™'
    },

    {
        minimum:
            51,

        maximum:
            75,

        level:
            3,

        code:
            'ADVANCING',

        tamil:
            'மேம்பட்ட நிலை',

        english:
            'ADVANCING™'
    },

    {
        minimum:
            76,

        maximum:
            100,

        level:
            4,

        code:
            'ACHIEVED',

        tamil:
            'இலக்கு அடைந்த நிலை',

        english:
            'ACHIEVED™'
    }

];


/* =============================================================================
 * GET RESULT BAND
 * =============================================================================
 */


Page02.getResultBand = function(
    score
){

    const normalizedScore =
        Page02.clamp(
            Number(score),
            0,
            Page02.CONFIG.scoring.maximumScore
        );


    return (
        Page02.RESULT_BANDS.find(
            function(band){

                return (
                    normalizedScore >=
                        band.minimum &&
                    normalizedScore <=
                        band.maximum
                );

            }
        ) ||
        Page02.RESULT_BANDS[0]
    );

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
        Page02.getDimensionMaximumScore();


    const gap =
        Math.max(
            0,
            maximumScore - score
        );


    const percentage =
        maximumScore > 0
            ? Math.round(
                (
                    score /
                    maximumScore
                ) * 100
            )
            : 0;


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

                    selectedRange:
                        answer
                            ? answer.selectedRange
                            : '',

                    value:
                        answer
                            ? answer.value
                            : null,

                    score:
                        answer
                            ? Number(answer.score)
                            : 0,

                    statusTamil:
                        answer
                            ? answer.statusTamil
                            : '',

                    statusEnglish:
                        answer
                            ? answer.statusEnglish
                            : ''

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

        answered:
            answered,

        indicatorCount:
            dimension.indicators.length,

        score:
            score,

        maximumScore:
            maximumScore,

        gap:
            gap,

        percentage:
            percentage,

        complete:
            answered ===
                dimension.indicators.length,

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
            dimensionIndex
        ){

            return Page02.buildDimensionResult(
                dimension,
                dimensionIndex
            );

        }
    );

};


/* =============================================================================
 * FIND STRONGEST DIMENSION
 * =============================================================================
 */


Page02.getStrongestDimension = function(
    dimensionResults
){

    if(
        !Array.isArray(
            dimensionResults
        ) ||
        !dimensionResults.length
    ){

        return null;

    }


    return dimensionResults.reduce(
        function(
            strongest,
            current
        ){

            if(!strongest){

                return current;

            }


            if(
                current.score >
                strongest.score
            ){

                return current;

            }


            return strongest;

        },
        null
    );

};


/* =============================================================================
 * FIND GREATEST OPPORTUNITY DIMENSION
 * =============================================================================
 *
 * Lowest dimension score represents the largest current gap.
 *
 * =============================================================================
 */


Page02.getGrowthDimension = function(
    dimensionResults
){

    if(
        !Array.isArray(
            dimensionResults
        ) ||
        !dimensionResults.length
    ){

        return null;

    }


    return dimensionResults.reduce(
        function(
            weakest,
            current
        ){

            if(!weakest){

                return current;

            }


            if(
                current.score <
                weakest.score
            ){

                return current;

            }


            return weakest;

        },
        null
    );

};


/* =============================================================================
 * BUILD FINAL RESULT
 * =============================================================================
 */


Page02.calculateResult = function(){

    if(
        !Page02.isScorecardComplete()
    ){

        throw new Error(
            'Lifestyle Scorecard™ is incomplete.'
        );

    }


    const score =
        Page02.getTotalScore();


    const maximumScore =
        Page02.CONFIG.scoring.maximumScore;


    const gap =
        Math.max(
            0,
            maximumScore - score
        );


    const percentage =
        maximumScore > 0
            ? Math.round(
                (
                    score /
                    maximumScore
                ) * 100
            )
            : 0;


    const dimensionResults =
        Page02.buildDimensionResults();


    const strongestDimension =
        Page02.getStrongestDimension(
            dimensionResults
        );


    const growthDimension =
        Page02.getGrowthDimension(
            dimensionResults
        );


    const band =
        Page02.getResultBand(
            score
        );


    return {

        experience:
            Page02.CONFIG.module,

        version:
            Page02.version,

        peopleId:
            Page02.state.peopleId,

        clientId:
            Page02.state.clientId,

        fullName:
            (
                Page02.state.kyc &&
                Page02.state.kyc.fullName
            )
                ? Page02.state.kyc.fullName
                : '',

        indicatorCount:
            Page02.CONFIG.scoring.indicatorCount,

        answeredCount:
            Page02.getAnsweredCount(),

        score:
            score,

        maximumScore:
            maximumScore,

        gap:
            gap,

        percentage:
            percentage,

        band: {

            level:
                band.level,

            code:
                band.code,

            tamil:
                band.tamil,

            english:
                band.english

        },

        strongestDimension:
            strongestDimension,

        growthDimension:
            growthDimension,

        dimensions:
            dimensionResults,

        completed:
            true,

        completedAt:
            new Date().toISOString()

    };

};


/* =============================================================================
 * BUILD FLAT ANSWER PAYLOAD
 * =============================================================================
 *
 * The backend receives one deterministic answer object per indicator.
 *
 * This preserves:
 *
 *      • indicator identity
 *      • dimension identity
 *      • selected range
 *      • representative value
 *      • score
 *      • target
 *      • ideal
 *
 * =============================================================================
 */


Page02.buildAnswerPayload = function(){

    return Page02
        .getScorecardIndicators()
        .map(
            function(indicator){

                const answer =
                    Page02.getAnswer(
                        indicator.id
                    );


                if(!answer){

                    return null;

                }


                return {

                    indicatorId:
                        indicator.id,

                    indicatorNumber:
                        indicator.number,

                    dimensionId:
                        indicator.dimensionId,

                    dimensionNumber:
                        indicator.dimensionNumber,

                    tamil:
                        indicator.tamil,

                    english:
                        indicator.english,

                    ideal:
                        indicator.ideal,

                    target:
                        indicator.target,

                    optionIndex:
                        answer.optionIndex,

                    selectedRange:
                        answer.selectedRange,

                    value:
                        answer.value,

                    score:
                        Number(
                            answer.score
                        ),

                    statusTamil:
                        answer.statusTamil,

                    statusEnglish:
                        answer.statusEnglish

                };

            }
        )
        .filter(Boolean);

};


/* =============================================================================
 * BUILD DISCOVERY PAYLOAD
 * =============================================================================
 *
 * CTM_API.saveDiscovery() remains the backend boundary.
 *
 * =============================================================================
 */


Page02.buildDiscoveryPayload = function(
    result
){

    if(!result){

        throw new Error(
            'Cannot build discovery payload without result.'
        );

    }


    const peopleId =
        Page02.state.peopleId ||
        Page02.state.clientId;


    const clientId =
        Page02.state.clientId ||
        Page02.state.peopleId;


    if(
        !peopleId &&
        !clientId
    ){

        throw new Error(
            'Client identity is missing.'
        );

    }


    return {

        peopleId:
            peopleId,

        clientId:
            clientId,

        page:
            Page02.CONFIG.pageNumber,

        journeyStage:
            'MILLIONAIRE LIFESTYLE SCORECARD™',

        assessment:
            'Middle Class → Millionaire Lifestyle Scorecard™',

        assessmentVersion:
            Page02.version,

        indicatorCount:
            Page02.CONFIG.scoring.indicatorCount,

        answeredCount:
            result.answeredCount,

        score:
            result.score,

        maximumScore:
            result.maximumScore,

        gap:
            result.gap,

        percentage:
            result.percentage,

        level:
            result.band.level,

        levelCode:
            result.band.code,

        levelTamil:
            result.band.tamil,

        levelEnglish:
            result.band.english,

        strongestDimension:
            result.strongestDimension
                ? result.strongestDimension.dimensionId
                : '',

        growthDimension:
            result.growthDimension
                ? result.growthDimension.dimensionId
                : '',

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
                            dimension.percentage

                    };

                }
            ),

        answers:
            Page02.buildAnswerPayload(),

        completedAt:
            result.completedAt

    };

};


/* =============================================================================
 * VALIDATE DISCOVERY PAYLOAD
 * =============================================================================
 */


Page02.validateDiscoveryPayload = function(
    payload
){

    const errors = [];


    if(!payload){

        errors.push(
            'Discovery payload is missing.'
        );


        return {

            valid:
                false,

            errors:
                errors

        };

    }


    if(
        !payload.peopleId &&
        !payload.clientId
    ){

        errors.push(
            'Client identity is missing.'
        );

    }


    if(
        payload.answeredCount !==
        Page02.CONFIG.scoring.indicatorCount
    ){

        errors.push(
            'All 25 indicators must be answered.'
        );

    }


    if(
        !Array.isArray(
            payload.answers
        ) ||
        payload.answers.length !==
            Page02.CONFIG.scoring.indicatorCount
    ){

        errors.push(
            'Discovery payload must contain exactly 25 answers.'
        );

    }


    if(
        !Array.isArray(
            payload.dimensions
        ) ||
        payload.dimensions.length !==
            Page02.CONFIG.scoring.dimensionCount
    ){

        errors.push(
            'Discovery payload must contain exactly 5 dimensions.'
        );

    }


    if(
        !Number.isFinite(
            Number(
                payload.score
            )
        )
    ){

        errors.push(
            'Discovery score is invalid.'
        );

    }


    if(
        Number(payload.score) < 25 ||
        Number(payload.score) > 100
    ){

        errors.push(
            'Discovery score must be between 25 and 100.'
        );

    }


    return {

        valid:
            errors.length === 0,

        errors:
            errors

    };

};


/* =============================================================================
 * SAVE RESULT LOCALLY
 * =============================================================================
 */


Page02.saveResultLocally = function(
    result
){

    if(!result){

        return false;

    }


    try{

        sessionStorage.setItem(
            Page02.CONFIG.storageKeys.page02Result,
            JSON.stringify(
                result
            )
        );


        return true;

    }
    catch(error){

        console.warn(
            'CTM PATH™ Page 02: Result could not be stored in sessionStorage.',
            error
        );


        return false;

    }

};


/* =============================================================================
 * GET SAVED RESULT
 * =============================================================================
 */


Page02.getSavedResult = function(){

    try{

        const raw =
            sessionStorage.getItem(
                Page02.CONFIG.storageKeys.page02Result
            );


        if(!raw){

            return null;

        }


        return JSON.parse(
            raw
        );

    }
    catch(error){

        console.warn(
            'CTM PATH™ Page 02: Saved result could not be read.',
            error
        );


        return null;

    }

};


/* =============================================================================
 * SET COMPLETION BUSY STATE
 * =============================================================================
 */


Page02.setCompletionBusy = function(
    busy
){

    Page02.state.isSaving =
        Boolean(busy);


    Page02.setDimensionNavigationBusy(
        Boolean(busy)
    );


    const scorecard =
        Page02.el(
            'lifestyle-scorecard'
        );


    if(scorecard){

        scorecard.classList.toggle(
            'is-saving',
            Boolean(busy)
        );


        scorecard.setAttribute(
            'aria-busy',
            busy
                ? 'true'
                : 'false'
        );

    }

};


/* =============================================================================
 * SHOW SCORECARD SAVE ERROR
 * =============================================================================
 */


Page02.showScorecardError = function(
    message
){

    const error =
        Page02.el(
            'scorecard-error'
        );


    if(error){

        error.textContent =
            message;

        error.hidden =
            false;

    }


    console.error(
        'CTM PATH™ Page 02:',
        message
    );

};


/* =============================================================================
 * CLEAR SCORECARD SAVE ERROR
 * =============================================================================
 */


Page02.clearScorecardError = function(){

    const error =
        Page02.el(
            'scorecard-error'
        );


    if(error){

        error.textContent =
            '';

        error.hidden =
            true;

    }

};


/* =============================================================================
 * SAVE DISCOVERY
 * =============================================================================
 */


Page02.saveDiscovery = async function(
    result
){

    if(!result){

        throw new Error(
            'Result is required before discovery can be saved.'
        );

    }


    if(
        !window.CTM_API ||
        typeof window.CTM_API.saveDiscovery !==
            'function'
    ){

        throw new Error(
            'Discovery service is temporarily unavailable.'
        );

    }


    const payload =
        Page02.buildDiscoveryPayload(
            result
        );


    const validation =
        Page02.validateDiscoveryPayload(
            payload
        );


    if(!validation.valid){

        throw new Error(
            validation.errors.join(
                ' '
            )
        );

    }


    const response =
        await window.CTM_API.saveDiscovery(
            payload
        );


    if(!response){

        throw new Error(
            'Empty discovery response.'
        );

    }


    if(
        response.success === false
    ){

        throw new Error(
            response.message ||
            response.error ||
            'Discovery could not be saved.'
        );

    }


    Page02.state.discoveryResponse =
        response;


    return response;

};


/* =============================================================================
 * COMPLETE SCORECARD
 * =============================================================================
 *
 * Called by Batch 3 after Dimension 05.
 *
 * DUPLICATE-SAVE PROTECTION
 *
 *      • state.isSaving blocks simultaneous requests
 *      • state.result + discoveryResponse prevent repeat backend saves
 *
 * =============================================================================
 */


Page02.completeScorecard = async function(){

    if(
        Page02.state.isSaving
    ){

        return false;

    }


    Page02.clearScorecardError();


    /* -------------------------------------------------------------------------
     * COMPLETION VALIDATION
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isScorecardComplete()
    ){

        Page02.showScorecardError(
            'Please answer all 25 indicators before viewing your result.'
        );


        return false;

    }


    /* -------------------------------------------------------------------------
     * CLIENT VALIDATION
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.state.peopleId &&
        !Page02.state.clientId
    ){

        Page02.showScorecardError(
            'Your registration identity is missing. Please complete your details again.'
        );


        Page02.showScreen(
            Page02.SCREENS.KYC
        );


        return false;

    }


    /* -------------------------------------------------------------------------
     * ALREADY COMPLETED
     * -------------------------------------------------------------------------
     */


    if(
        Page02.state.result &&
        Page02.state.discoveryResponse
    ){

        Page02.renderResult(
            Page02.state.result
        );


        Page02.showScreen(
            Page02.SCREENS.RESULT
        );


        return true;

    }


    Page02.setCompletionBusy(
        true
    );


    try{

        /* ---------------------------------------------------------------------
         * CALCULATE
         * ---------------------------------------------------------------------
         */


        const result =
            Page02.calculateResult();


        /* ---------------------------------------------------------------------
         * SAVE BACKEND
         * ---------------------------------------------------------------------
         */


        await Page02.saveDiscovery(
            result
        );


        /* ---------------------------------------------------------------------
         * COMMIT RESULT ONLY AFTER SUCCESSFUL SAVE
         * ---------------------------------------------------------------------
         */


        Page02.state.result =
            result;


        Page02.saveResultLocally(
            result
        );


        if(
            typeof Page02.saveSession ===
            'function'
        ){

            Page02.saveSession();

        }


        /* ---------------------------------------------------------------------
         * RENDER RESULT
         * ---------------------------------------------------------------------
         */


        Page02.renderResult(
            result
        );


        Page02.showScreen(
            Page02.SCREENS.RESULT,
            {
                scroll:
                    true,

                focus:
                    false
            }
        );


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 discovery completion failed:',
            error
        );


        Page02.showScorecardError(
            error &&
            error.message
                ? error.message
                : 'We could not save your scorecard. Please try again.'
        );


        return false;

    }
    finally{

        Page02.setCompletionBusy(
            false
        );

    }

};


/* =============================================================================
 * SET RESULT TEXT
 * =============================================================================
 */


Page02.setResultText = function(
    id,
    value
){

    const element =
        Page02.el(
            id
        );


    if(!element){

        return;

    }


    element.textContent =
        Page02.safeText(
            value
        );

};


/* =============================================================================
 * SET RESULT WIDTH
 * =============================================================================
 */


Page02.setResultWidth = function(
    id,
    percentage
){

    const element =
        Page02.el(
            id
        );


    if(!element){

        return;

    }


    const normalized =
        Page02.clamp(
            percentage,
            0,
            100
        );


    element.style.width =
        normalized + '%';


    element.setAttribute(
        'aria-valuenow',
        String(normalized)
    );

};


/* =============================================================================
 * RENDER RESULT DIMENSIONS
 * =============================================================================
 */


Page02.renderResultDimensions = function(
    result
){

    const container =
        Page02.el(
            'result-dimensions'
        );


    if(!container){

        return;

    }


    container.innerHTML =
        '';


    result.dimensions.forEach(
        function(dimension){

            const card =
                document.createElement(
                    'article'
                );


            card.className =
                'result-dimension';


            card.dataset.dimension =
                dimension.dimensionId;


            card.innerHTML = `

                <div class="result-dimension__heading">

                    <div class="result-dimension__identity">

                        <span class="result-dimension__number">

                            ${Page02.escapeHTML(
                                dimension.dimensionNumber
                            )}

                        </span>


                        <div>

                            <h3 class="result-dimension__tamil">

                                ${Page02.escapeHTML(
                                    dimension.tamil
                                )}

                            </h3>


                            <p class="result-dimension__english">

                                ${Page02.escapeHTML(
                                    dimension.english
                                )}

                            </p>

                        </div>

                    </div>


                    <div class="result-dimension__score">

                        <strong>

                            ${Page02.escapeHTML(
                                dimension.score
                            )}

                        </strong>

                        <span>

                            / ${Page02.escapeHTML(
                                dimension.maximumScore
                            )}

                        </span>

                    </div>

                </div>


                <div
                    class="result-dimension__progress"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="${Page02.escapeHTML(
                        dimension.percentage
                    )}"
                >

                    <span
                        class="result-dimension__progress-fill"
                        style="width:${Page02.escapeHTML(
                            dimension.percentage
                        )}%"
                    ></span>

                </div>


                <div class="result-dimension__meta">

                    <span>

                        ${Page02.escapeHTML(
                            dimension.percentage
                        )}%

                    </span>

                    <span>

                        GAP ${Page02.escapeHTML(
                            dimension.gap
                        )}

                    </span>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

};


/* =============================================================================
 * RENDER RESULT
 * =============================================================================
 *
 * Canonical result DOM IDs supported by v2.2:
 *
 *      #result-name
 *      #result-score
 *      #result-score-max
 *      #result-percentage
 *      #result-gap
 *      #result-level-tamil
 *      #result-level-english
 *      #result-progress-bar
 *
 *      #result-strongest-tamil
 *      #result-strongest-english
 *
 *      #result-growth-tamil
 *      #result-growth-english
 *
 *      #result-dimensions
 *
 * Missing optional elements do not break the result renderer.
 *
 * =============================================================================
 */


Page02.renderResult = function(
    result
){

    if(!result){

        return false;

    }


    /* -------------------------------------------------------------------------
     * NAME
     * -------------------------------------------------------------------------
     */


    Page02.setResultText(
        'result-name',
        result.fullName
    );


    /* -------------------------------------------------------------------------
     * SCORE
     * -------------------------------------------------------------------------
     */


    Page02.setResultText(
        'result-score',
        result.score
    );


    Page02.setResultText(
        'result-score-max',
        result.maximumScore
    );


    Page02.setResultText(
        'result-percentage',
        result.percentage + '%'
    );


    Page02.setResultText(
        'result-gap',
        result.gap
    );


    /* -------------------------------------------------------------------------
     * LEVEL
     * -------------------------------------------------------------------------
     */


    Page02.setResultText(
        'result-level-tamil',
        result.band.tamil
    );


    Page02.setResultText(
        'result-level-english',
        result.band.english
    );


    /* -------------------------------------------------------------------------
     * SCORE PROGRESS
     * -------------------------------------------------------------------------
     */


    Page02.setResultWidth(
        'result-progress-bar',
        result.percentage
    );


    /* -------------------------------------------------------------------------
     * STRONGEST DIMENSION
     * -------------------------------------------------------------------------
     */


    if(
        result.strongestDimension
    ){

        Page02.setResultText(
            'result-strongest-tamil',
            result.strongestDimension.tamil
        );


        Page02.setResultText(
            'result-strongest-english',
            result.strongestDimension.english
        );

    }


    /* -------------------------------------------------------------------------
     * GROWTH DIMENSION
     * -------------------------------------------------------------------------
     */


    if(
        result.growthDimension
    ){

        Page02.setResultText(
            'result-growth-tamil',
            result.growthDimension.tamil
        );


        Page02.setResultText(
            'result-growth-english',
            result.growthDimension.english
        );

    }


    /* -------------------------------------------------------------------------
     * FIVE DIMENSIONS
     * -------------------------------------------------------------------------
     */


    Page02.renderResultDimensions(
        result
    );


    /* -------------------------------------------------------------------------
     * RESULT ROOT STATE
     * -------------------------------------------------------------------------
     */


    const resultScreen =
        Page02.getScreenElement(
            Page02.SCREENS.RESULT
        );


    if(resultScreen){

        resultScreen.dataset.score =
            String(
                result.score
            );


        resultScreen.dataset.level =
            result.band.code;


        resultScreen.dataset.complete =
            'true';

    }


    return true;

};


/* =============================================================================
 * RESULT INFO
 * =============================================================================
 *
 * Development console:
 *
 *      Page02.resultInfo()
 *
 * =============================================================================
 */


Page02.resultInfo = function(){

    const result =
        Page02.state.result ||
        Page02.getSavedResult();


    if(!result){

        return {

            available:
                false

        };

    }


    return {

        available:
            true,

        peopleId:
            result.peopleId,

        clientId:
            result.clientId,

        fullName:
            result.fullName,

        score:
            result.score,

        maximumScore:
            result.maximumScore,

        gap:
            result.gap,

        percentage:
            result.percentage,

        level:
            result.band,

        strongestDimension:
            result.strongestDimension
                ? result.strongestDimension.english
                : null,

        growthDimension:
            result.growthDimension
                ? result.growthDimension.english
                : null,

        dimensions:
            result.dimensions.map(
                function(dimension){

                    return {

                        dimension:
                            dimension.english,

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

    };

};


/* =============================================================================
 * DISCOVERY DEBUG INFO
 * =============================================================================
 */


Page02.discoveryInfo = function(){

    return {

        saved:
            Boolean(
                Page02.state.discoveryResponse
            ),

        saving:
            Page02.state.isSaving,

        response:
            Page02.state.discoveryResponse,

        result:
            Page02.state.result

    };

};


/* =============================================================================
 * END OF BATCH 4
 * =============================================================================
 *
 * CTM PATH™ PAGE 02 v2.2
 *
 * COMPLETE IN THIS BATCH
 *
 *      ✓ Final score calculation
 *      ✓ Maximum score = 100
 *      ✓ Gap calculation
 *      ✓ Percentage calculation
 *
 *      ✓ Five dimension results
 *      ✓ Dimension score / 20
 *      ✓ Dimension gap
 *      ✓ Dimension percentage
 *
 *      ✓ Strongest dimension
 *      ✓ Growth opportunity dimension
 *
 *      ✓ Overall result band
 *
 *          STARTING™
 *          PROGRESSING™
 *          ADVANCING™
 *          ACHIEVED™
 *
 *      ✓ Canonical 25-answer payload
 *      ✓ Canonical five-dimension payload
 *      ✓ Client identity validation
 *
 *      ✓ CTM_API.saveDiscovery()
 *      ✓ Backend response validation
 *      ✓ Duplicate-save protection
 *      ✓ Busy state
 *      ✓ Save error handling
 *
 *      ✓ Result stored in sessionStorage
 *
 *      ✓ Page 02 Result rendering
 *      ✓ Overall score
 *      ✓ Gap
 *      ✓ Percentage
 *      ✓ Level
 *      ✓ Strongest dimension
 *      ✓ Growth dimension
 *      ✓ Five dimension score cards
 *
 *
 * CRITICAL ARCHITECTURE
 *
 *      Page02.completeScorecard()
 *
 *      DOES NOT:
 *
 *          window.location.href = "page03.html"
 *
 *
 *      Instead:
 *
 *          Dimension 05
 *              ↓
 *          Calculate
 *              ↓
 *          Save Discovery
 *              ↓
 *          RESULT SCREEN
 *              ↓
 *          USER SEES RESULT
 *
 *
 *      Batch 5 will provide the final explicit handoff:
 *
 *          Result Continue
 *              ↓
 *          Page 03
 *
 *
 * DO NOT initialize Page02 yet.
 *
 * DO NOT expose window.Page02 yet.
 *
 *
 * NEXT
 *
 *      BATCH 5 — FINAL
 *
 *      SESSION RECOVERY
 *      KYC RESTORATION
 *      RESULT RECOVERY
 *      HEADER STATUS
 *      CONTINUE TO PAGE 03
 *      INITIALIZATION
 *      DOMContentLoaded
 *      PUBLIC API
 *      PRODUCTION CLOSURE
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 5 — FINAL
 *
 * SESSION RECOVERY
 * KYC RESTORATION
 * RESULT RECOVERY
 * HEADER STATUS
 * PAGE 03 HANDOFF
 * INITIALIZATION
 * DOMContentLoaded
 * PUBLIC API
 * PRODUCTION CLOSURE
 * =============================================================================
 *
 * RESPONSIBILITIES
 *
 *      • Persist Page 02 journey state
 *      • Recover interrupted Page 02 sessions
 *      • Restore KYC fields
 *      • Restore registered client identity
 *      • Restore 25 scorecard answers
 *      • Restore active dimension
 *      • Restore completed result
 *      • Restore correct internal screen
 *      • Update shared header journey status
 *      • Bind Result → Page 03 continuation
 *      • Initialize Page 02 exactly once
 *      • Expose controlled public API
 *
 * IMPORTANT
 *
 *      This is the FINAL batch of page02.js v2.2.
 *
 * =============================================================================
 */


/* =============================================================================
 * SESSION STATE VERSION
 * =============================================================================
 */


Page02.SESSION_VERSION =
    '2.2';


/* =============================================================================
 * PAGE 03 DESTINATION
 * =============================================================================
 *
 * Page 02 lives inside:
 *
 *      /pages/page02.html
 *
 * Therefore Page 03 is a sibling page.
 *
 * =============================================================================
 */


Page02.PAGE03_URL =
    'page03.html';


/* =============================================================================
 * GET SESSION STORAGE KEY
 * =============================================================================
 */


Page02.getSessionStorageKey = function(){

    if(
        Page02.CONFIG.storageKeys &&
        Page02.CONFIG.storageKeys.page02State
    ){

        return Page02.CONFIG.storageKeys.page02State;

    }


    return 'ctm_page02_state_v2_2';

};


/* =============================================================================
 * SERIALIZE ANSWERS
 * =============================================================================
 */


Page02.serializeAnswers = function(){

    const answers = {};


    Page02
        .getScorecardIndicators()
        .forEach(
            function(indicator){

                const answer =
                    Page02.getAnswer(
                        indicator.id
                    );


                if(!answer){

                    return;

                }


                answers[
                    indicator.id
                ] = {

                    indicatorId:
                        answer.indicatorId,

                    indicatorNumber:
                        answer.indicatorNumber,

                    dimensionId:
                        answer.dimensionId,

                    dimensionNumber:
                        answer.dimensionNumber,

                    tamil:
                        answer.tamil,

                    english:
                        answer.english,

                    ideal:
                        answer.ideal,

                    target:
                        answer.target,

                    optionIndex:
                        answer.optionIndex,

                    score:
                        Number(
                            answer.score
                        ),

                    selectedRange:
                        answer.selectedRange,

                    value:
                        answer.value,

                    statusTamil:
                        answer.statusTamil,

                    statusEnglish:
                        answer.statusEnglish

                };

            }
        );


    return answers;

};


/* =============================================================================
 * BUILD SESSION STATE
 * =============================================================================
 */


Page02.buildSessionState = function(){

    return {

        sessionVersion:
            Page02.SESSION_VERSION,

        page:
            Page02.CONFIG.pageNumber,

        currentScreen:
            Page02.state.currentScreen,

        currentDimension:
            Page02.state.currentDimension,

        peopleId:
            Page02.state.peopleId,

        clientId:
            Page02.state.clientId,

        kyc:
            Page02.state.kyc
                ? Object.assign(
                    {},
                    Page02.state.kyc
                )
                : null,

        answers:
            Page02.serializeAnswers(),

        result:
            Page02.state.result
                ? Page02.state.result
                : null,

        discoverySaved:
            Boolean(
                Page02.state.discoveryResponse
            ),

        savedAt:
            new Date().toISOString()

    };

};


/* =============================================================================
 * SAVE SESSION
 * =============================================================================
 */


Page02.saveSession = function(){

    try{

        const session =
            Page02.buildSessionState();


        sessionStorage.setItem(
            Page02.getSessionStorageKey(),
            JSON.stringify(
                session
            )
        );


        /*
         * Maintain the lightweight identity keys used
         * elsewhere in the journey.
         */


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


        return true;

    }
    catch(error){

        console.warn(
            'CTM PATH™ Page 02: Session could not be saved.',
            error
        );


        return false;

    }

};


/* =============================================================================
 * READ SESSION
 * =============================================================================
 */


Page02.readSession = function(){

    try{

        const raw =
            sessionStorage.getItem(
                Page02.getSessionStorageKey()
            );


        if(!raw){

            return null;

        }


        const session =
            JSON.parse(
                raw
            );


        if(
            !session ||
            typeof session !==
                'object'
        ){

            return null;

        }


        return session;

    }
    catch(error){

        console.warn(
            'CTM PATH™ Page 02: Session could not be read.',
            error
        );


        return null;

    }

};


/* =============================================================================
 * CLEAR PAGE 02 SESSION
 * =============================================================================
 *
 * This clears only the detailed Page 02 working state.
 *
 * Client identity is intentionally NOT deleted because Page 03
 * requires the same registered journey identity.
 *
 * =============================================================================
 */


Page02.clearSession = function(){

    try{

        sessionStorage.removeItem(
            Page02.getSessionStorageKey()
        );


        return true;

    }
    catch(error){

        console.warn(
            'CTM PATH™ Page 02: Session could not be cleared.',
            error
        );


        return false;

    }

};


/* =============================================================================
 * RESTORE FIELD VALUE
 * =============================================================================
 */


Page02.restoreFieldValue = function(
    form,
    name,
    value
){

    if(
        !form ||
        value === null ||
        value === undefined
    ){

        return;

    }


    const field =
        form.elements[
            name
        ];


    if(!field){

        return;

    }


    /*
     * Standard input / select / textarea.
     */


    if(
        field instanceof
            HTMLInputElement ||
        field instanceof
            HTMLSelectElement ||
        field instanceof
            HTMLTextAreaElement
    ){

        if(
            field.type ===
                'radio'
        ){

            const radios =
                form.querySelectorAll(
                    '[name="' +
                    name +
                    '"]'
                );


            radios.forEach(
                function(radio){

                    radio.checked =
                        String(
                            radio.value
                        ) ===
                        String(
                            value
                        );

                }
            );


            return;

        }


        if(
            field.type ===
                'checkbox'
        ){

            field.checked =
                Boolean(value);


            return;

        }


        field.value =
            value;


        return;

    }


    /*
     * RadioNodeList support.
     */


    if(
        typeof field.length ===
            'number'
    ){

        Array.from(
            field
        ).forEach(
            function(control){

                if(
                    control.type ===
                    'radio'
                ){

                    control.checked =
                        String(
                            control.value
                        ) ===
                        String(
                            value
                        );

                }

            }
        );

    }

};


/* =============================================================================
 * RESTORE KYC FORM
 * =============================================================================
 */


Page02.restoreKYCForm = function(
    kyc
){

    if(!kyc){

        return;

    }


    const form =
        Page02.getKYCForm();


    if(!form){

        return;

    }


    const fields = [

        'fullName',

        'email',

        'mobile',

        'gender',

        'maritalStatus',

        'ageRange',

        'occupation',

        'city',

        'district',

        'state',

        'pincode'

    ];


    fields.forEach(
        function(name){

            if(
                Object.prototype.hasOwnProperty.call(
                    kyc,
                    name
                )
            ){

                Page02.restoreFieldValue(
                    form,
                    name,
                    kyc[name]
                );

            }

        }
    );

};


/* =============================================================================
 * RESTORE ANSWERS
 * =============================================================================
 */


Page02.restoreAnswers = function(
    savedAnswers
){

    if(
        !savedAnswers ||
        typeof savedAnswers !==
            'object'
    ){

        return 0;

    }


    let restored =
        0;


    Page02
        .getScorecardIndicators()
        .forEach(
            function(indicator){

                const saved =
                    savedAnswers[
                        indicator.id
                    ];


                if(!saved){

                    return;

                }


                const score =
                    Number(
                        saved.score
                    );


                const option =
                    indicator.options.find(
                        function(item){

                            return (
                                Number(
                                    item.score
                                ) ===
                                score
                            );

                        }
                    );


                if(!option){

                    return;

                }


                const optionIndex =
                    indicator.options.findIndex(
                        function(item){

                            return (
                                Number(
                                    item.score
                                ) ===
                                score
                            );

                        }
                    );


                const status =
                    Page02.getScoreStatus(
                        score
                    );


                /*
                 * Rebuild from current frozen indicator definitions
                 * instead of trusting stale descriptive session data.
                 */


                Page02.state.answers[
                    indicator.id
                ] = {

                    indicatorId:
                        indicator.id,

                    indicatorNumber:
                        indicator.number,

                    dimensionId:
                        indicator.dimensionId,

                    dimensionNumber:
                        indicator.dimensionNumber,

                    tamil:
                        indicator.tamil,

                    english:
                        indicator.english,

                    ideal:
                        indicator.ideal,

                    target:
                        indicator.target,

                    optionIndex:
                        optionIndex,

                    score:
                        score,

                    selectedRange:
                        option.label,

                    value:
                        option.value,

                    statusTamil:
                        status.tamil,

                    statusEnglish:
                        status.english

                };


                restored +=
                    1;

            }
        );


    return restored;

};


/* =============================================================================
 * RESTORE LIGHTWEIGHT CLIENT IDENTITY
 * =============================================================================
 *
 * Used if the detailed Page 02 session is unavailable but
 * registration identity survived independently.
 *
 * =============================================================================
 */


Page02.restoreStoredIdentity = function(){

    try{

        if(
            !Page02.state.peopleId
        ){

            const peopleId =
                sessionStorage.getItem(
                    Page02.CONFIG.storageKeys.peopleId
                );


            if(peopleId){

                Page02.state.peopleId =
                    peopleId;

            }

        }


        if(
            !Page02.state.clientId &&
            Page02.state.peopleId
        ){

            Page02.state.clientId =
                Page02.state.peopleId;

        }


        const fullName =
            sessionStorage.getItem(
                Page02.CONFIG.storageKeys.fullName
            );


        if(fullName){

            Page02.state.kyc =
                Page02.state.kyc || {};


            if(
                !Page02.state.kyc.fullName
            ){

                Page02.state.kyc.fullName =
                    fullName;

            }

        }

    }
    catch(error){

        console.warn(
            'CTM PATH™ Page 02: Stored identity could not be restored.',
            error
        );

    }

};


/* =============================================================================
 * RESTORE SAVED RESULT
 * =============================================================================
 */


Page02.restoreSavedResult = function(){

    if(
        Page02.state.result
    ){

        return Page02.state.result;

    }


    const savedResult =
        Page02.getSavedResult();


    if(!savedResult){

        return null;

    }


    /*
     * A valid result must represent the complete 25-indicator scorecard.
     */


    if(
        Number(
            savedResult.answeredCount
        ) !==
        Page02.CONFIG.scoring.indicatorCount
    ){

        return null;

    }


    if(
        !Number.isFinite(
            Number(
                savedResult.score
            )
        )
    ){

        return null;

    }


    Page02.state.result =
        savedResult;


    return savedResult;

};


/* =============================================================================
 * RESTORE SESSION
 * =============================================================================
 */


Page02.restoreSession = function(){

    const session =
        Page02.readSession();


    if(!session){

        Page02.restoreStoredIdentity();

        Page02.restoreSavedResult();


        return {

            restored:
                false,

            answers:
                0,

            result:
                Boolean(
                    Page02.state.result
                )

        };

    }


    /* -------------------------------------------------------------------------
     * CLIENT IDENTITY
     * -------------------------------------------------------------------------
     */


    if(session.peopleId){

        Page02.state.peopleId =
            String(
                session.peopleId
            );

    }


    if(session.clientId){

        Page02.state.clientId =
            String(
                session.clientId
            );

    }


    if(
        !Page02.state.clientId &&
        Page02.state.peopleId
    ){

        Page02.state.clientId =
            Page02.state.peopleId;

    }


    if(
        !Page02.state.peopleId &&
        Page02.state.clientId
    ){

        Page02.state.peopleId =
            Page02.state.clientId;

    }


    /* -------------------------------------------------------------------------
     * KYC
     * -------------------------------------------------------------------------
     */


    if(
        session.kyc &&
        typeof session.kyc ===
            'object'
    ){

        Page02.state.kyc =
            Object.assign(
                {},
                session.kyc
            );

    }


    Page02.restoreKYCForm(
        Page02.state.kyc
    );


    /* -------------------------------------------------------------------------
     * ANSWERS
     * -------------------------------------------------------------------------
     */


    const restoredAnswers =
        Page02.restoreAnswers(
            session.answers
        );


    /* -------------------------------------------------------------------------
     * DIMENSION
     * -------------------------------------------------------------------------
     */


    Page02.state.currentDimension =
        Page02.clamp(
            Number(
                session.currentDimension
            ) || 0,
            0,
            Page02.CONFIG.scoring.dimensionCount - 1
        );


    /* -------------------------------------------------------------------------
     * RESULT
     * -------------------------------------------------------------------------
     */


    if(
        session.result &&
        Number(
            session.result.answeredCount
        ) ===
            Page02.CONFIG.scoring.indicatorCount
    ){

        Page02.state.result =
            session.result;

    }


    /*
     * Separate result key acts as a recovery fallback.
     */


    Page02.restoreSavedResult();


    /* -------------------------------------------------------------------------
     * DISCOVERY SAVED FLAG
     * -------------------------------------------------------------------------
     *
     * We deliberately do NOT fabricate the original backend response.
     *
     * A small local marker is sufficient to prevent the completed journey
     * from being treated as unsaved during the restored result screen.
     *
     * -------------------------------------------------------------------------
     */


    if(
        session.discoverySaved &&
        Page02.state.result
    ){

        Page02.state.discoveryResponse = {

            success:
                true,

            restored:
                true

        };

    }


    Page02.restoreStoredIdentity();


    return {

        restored:
            true,

        answers:
            restoredAnswers,

        result:
            Boolean(
                Page02.state.result
            ),

        currentScreen:
            session.currentScreen || null

    };

};


/* =============================================================================
 * GET HEADER JOURNEY STATUS
 * =============================================================================
 *
 * Shared header remains global.
 *
 * Page 02 updates only the dynamic journey identity/counter.
 *
 * =============================================================================
 */


Page02.getHeaderJourneyStatus = function(){

    const screen =
        Page02.state.currentScreen;


    if(
        screen ===
        Page02.SCREENS.RESULT
    ){

        return {

            title:
                'MILLIONAIRE JOURNEY™',

            counter:
                '02 / 07'

        };

    }


    if(
        screen ===
        Page02.SCREENS.SCORECARD
    ){

        return {

            title:
                'MILLIONAIRE JOURNEY™',

            counter:
                '02 / 07'

        };

    }


    if(
        screen ===
        Page02.SCREENS.KYC
    ){

        return {

            title:
                'MILLIONAIRE JOURNEY™',

            counter:
                '02 / 07'

        };

    }


    return {

        title:
            'MILLIONAIRE JOURNEY™',

        counter:
            '02 / 07'

    };

};


/* =============================================================================
 * UPDATE HEADER STATUS
 * =============================================================================
 */


Page02.updateHeaderStatus = function(){

    const status =
        Page02.getHeaderJourneyStatus();


    const title =
        Page02.el(
            'journey-title'
        );


    const counter =
        Page02.el(
            'journey-counter'
        );


    if(title){

        title.textContent =
            status.title;

    }


    if(counter){

        counter.textContent =
            status.counter;

    }

};


/* =============================================================================
 * WAIT FOR GLOBAL HEADER
 * =============================================================================
 *
 * Pages 02–07 load the shared header asynchronously.
 *
 * Page 02 therefore cannot assume the header DOM exists
 * at the exact moment page02.js initializes.
 *
 * =============================================================================
 */


Page02.syncHeaderWhenReady = function(){

    let attempts =
        0;


    const maximumAttempts =
        30;


    const interval =
        window.setInterval(
            function(){

                attempts +=
                    1;


                const title =
                    Page02.el(
                        'journey-title'
                    );


                const counter =
                    Page02.el(
                        'journey-counter'
                    );


                if(
                    title ||
                    counter
                ){

                    Page02.updateHeaderStatus();


                    window.clearInterval(
                        interval
                    );


                    return;

                }


                if(
                    attempts >=
                    maximumAttempts
                ){

                    window.clearInterval(
                        interval
                    );

                }

            },
            100
        );

};


/* =============================================================================
 * DETERMINE INITIAL SCREEN
 * =============================================================================
 *
 * PRIORITY
 *
 *      1. Completed result
 *      2. Registered + scorecard progress
 *      3. KYC progress
 *      4. Intro
 *
 * =============================================================================
 */


Page02.determineInitialScreen = function(
    recovery
){

    /* -------------------------------------------------------------------------
     * COMPLETED RESULT
     * -------------------------------------------------------------------------
     */


    if(
        Page02.state.result &&
        Number(
            Page02.state.result.answeredCount
        ) ===
            Page02.CONFIG.scoring.indicatorCount
    ){

        return Page02.SCREENS.RESULT;

    }


    /* -------------------------------------------------------------------------
     * REGISTERED CLIENT
     * -------------------------------------------------------------------------
     */


    if(
        Page02.state.peopleId ||
        Page02.state.clientId
    ){

        /*
         * Once registration has succeeded we never force the
         * user through registration again during the same journey.
         */


        return Page02.SCREENS.SCORECARD;

    }


    /* -------------------------------------------------------------------------
     * PREVIOUS KYC SCREEN
     * -------------------------------------------------------------------------
     */


    if(
        recovery &&
        recovery.currentScreen ===
            Page02.SCREENS.KYC
    ){

        return Page02.SCREENS.KYC;

    }


    /* -------------------------------------------------------------------------
     * INTRO
     * -------------------------------------------------------------------------
     */


    return Page02.SCREENS.INTRO;

};


/* =============================================================================
 * RESTORE INITIAL SCREEN
 * =============================================================================
 */


Page02.restoreInitialScreen = function(
    recovery
){

    const screen =
        Page02.determineInitialScreen(
            recovery
        );


    /* -------------------------------------------------------------------------
     * RESULT
     * -------------------------------------------------------------------------
     */


    if(
        screen ===
        Page02.SCREENS.RESULT
    ){

        Page02.renderResult(
            Page02.state.result
        );


        Page02.showScreen(
            Page02.SCREENS.RESULT,
            {
                scroll:
                    false
            }
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * SCORECARD
     * -------------------------------------------------------------------------
     */


    if(
        screen ===
        Page02.SCREENS.SCORECARD
    ){

        Page02.showScreen(
            Page02.SCREENS.SCORECARD,
            {
                scroll:
                    false
            }
        );


        Page02.renderCurrentDimension();


        Page02.refreshVisibleAnswerStates();


        return;

    }


    /* -------------------------------------------------------------------------
     * KYC
     * -------------------------------------------------------------------------
     */


    if(
        screen ===
        Page02.SCREENS.KYC
    ){

        Page02.restoreKYCForm(
            Page02.state.kyc
        );


        Page02.showScreen(
            Page02.SCREENS.KYC,
            {
                scroll:
                    false
            }
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * INTRO
     * -------------------------------------------------------------------------
     */


    Page02.showScreen(
        Page02.SCREENS.INTRO,
        {
            scroll:
                false
        }
    );

};


/* =============================================================================
 * CAN CONTINUE TO PAGE 03
 * =============================================================================
 */


Page02.canContinueToPage03 = function(){

    const result =
        Page02.state.result;


    if(!result){

        return false;

    }


    if(
        Number(
            result.answeredCount
        ) !==
        Page02.CONFIG.scoring.indicatorCount
    ){

        return false;

    }


    if(
        !Page02.state.peopleId &&
        !Page02.state.clientId
    ){

        return false;

    }


    return true;

};


/* =============================================================================
 * PREPARE PAGE 03 HANDOFF
 * =============================================================================
 *
 * Preserve the canonical client identity and Page 02 result.
 *
 * =============================================================================
 */


Page02.preparePage03Handoff = function(){

    if(
        !Page02.canContinueToPage03()
    ){

        return false;

    }


    try{

        const identity =
            Page02.state.peopleId ||
            Page02.state.clientId;


        sessionStorage.setItem(
            Page02.CONFIG.storageKeys.peopleId,
            identity
        );


        if(
            Page02.state.kyc &&
            Page02.state.kyc.fullName
        ){

            sessionStorage.setItem(
                Page02.CONFIG.storageKeys.fullName,
                Page02.state.kyc.fullName
            );

        }


        sessionStorage.setItem(
            Page02.CONFIG.storageKeys.page02Result,
            JSON.stringify(
                Page02.state.result
            )
        );


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02: Page 03 handoff could not be prepared.',
            error
        );


        return false;

    }

};


/* =============================================================================
 * CONTINUE TO PAGE 03
 * =============================================================================
 */


Page02.continueToPage03 = function(){

    if(
        !Page02.canContinueToPage03()
    ){

        console.error(
            'CTM PATH™ Page 02: Cannot continue to Page 03 before Page 02 is complete.'
        );


        return false;

    }


    const prepared =
        Page02.preparePage03Handoff();


    if(!prepared){

        return false;

    }


    window.location.href =
        Page02.PAGE03_URL;


    return true;

};


/* =============================================================================
 * BIND RESULT CONTROLS
 * =============================================================================
 */


Page02.bindResultControls = function(){

    const continueButton =
        Page02.el(
            'result-continue'
        );


    if(continueButton){

        continueButton.addEventListener(
            'click',
            function(event){

                event.preventDefault();


                Page02.continueToPage03();

            }
        );

    }


    /*
     * Optional review button.
     *
     * If absent from Page 02 HTML, nothing happens.
     */


    const reviewButton =
        Page02.el(
            'result-review'
        );


    if(reviewButton){

        reviewButton.addEventListener(
            'click',
            function(event){

                event.preventDefault();


                Page02.state.currentDimension =
                    0;


                Page02.showScreen(
                    Page02.SCREENS.SCORECARD
                );


                Page02.renderCurrentDimension();

            }
        );

    }

};


/* =============================================================================
 * BIND SESSION PERSISTENCE EVENTS
 * =============================================================================
 */


Page02.bindSessionEvents = function(){

    /*
     * Persist immediately before the document leaves.
     */


    window.addEventListener(
        'pagehide',
        function(){

            Page02.saveSession();

        }
    );


    /*
     * visibilitychange provides another lightweight recovery point,
     * especially on mobile browsers.
     */


    document.addEventListener(
        'visibilitychange',
        function(){

            if(
                document.visibilityState ===
                'hidden'
            ){

                Page02.saveSession();

            }

        }
    );

};


/* =============================================================================
 * VALIDATE PAGE 02 DOM
 * =============================================================================
 *
 * Production diagnostic only.
 *
 * Missing optional result elements do not fail initialization.
 *
 * =============================================================================
 */


Page02.validateDOM = function(){

    const required = [

        Page02.SCREEN_IDS.intro,

        Page02.SCREEN_IDS.kyc,

        Page02.SCREEN_IDS.scorecard,

        Page02.SCREEN_IDS.result,

        'kycForm',

        'dimension-questions',

        'dimension-back',

        'dimension-next'

    ];


    const missing =
        required.filter(
            function(id){

                return !Page02.el(
                    id
                );

            }
        );


    if(missing.length){

        console.error(
            'CTM PATH™ Page 02: Required DOM elements are missing:',
            missing
        );


        return {

            valid:
                false,

            missing:
                missing

        };

    }


    return {

        valid:
            true,

        missing:
            []

    };

};


/* =============================================================================
 * VALIDATE SCORECARD MASTER
 * =============================================================================
 *
 * Final runtime protection for the frozen 25-indicator architecture.
 *
 * =============================================================================
 */


Page02.validateScorecardMaster = function(){

    const indicators =
        Page02.getScorecardIndicators();


    const errors = [];


    if(
        Page02.DIMENSIONS.length !==
        Page02.CONFIG.scoring.dimensionCount
    ){

        errors.push(
            'Expected exactly 5 dimensions.'
        );

    }


    if(
        indicators.length !==
        Page02.CONFIG.scoring.indicatorCount
    ){

        errors.push(
            'Expected exactly 25 indicators.'
        );

    }


    Page02.DIMENSIONS.forEach(
        function(dimension){

            if(
                dimension.indicators.length !==
                Page02.CONFIG.scoring.indicatorsPerDimension
            ){

                errors.push(
                    'Dimension ' +
                    dimension.id +
                    ' must contain exactly 5 indicators.'
                );

            }

        }
    );


    indicators.forEach(
        function(indicator){

            if(
                !Array.isArray(
                    indicator.options
                ) ||
                indicator.options.length !==
                    Page02.CONFIG.scoring.optionsPerIndicator
            ){

                errors.push(
                    'Indicator ' +
                    indicator.id +
                    ' must contain exactly 4 options.'
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
                function(score){

                    if(
                        !scores.includes(
                            score
                        )
                    ){

                        errors.push(
                            'Indicator ' +
                            indicator.id +
                            ' is missing score ' +
                            score +
                            '.'
                        );

                    }

                }
            );

        }
    );


    if(errors.length){

        console.error(
            'CTM PATH™ Page 02 scorecard master validation failed:',
            errors
        );


        return {

            valid:
                false,

            errors:
                errors

        };

    }


    return {

        valid:
            true,

        errors:
            []

    };

};


/* =============================================================================
 * INITIALIZE STATE DEFAULTS
 * =============================================================================
 *
 * Defensive only.
 *
 * Batch 1 should already establish the canonical state object.
 *
 * =============================================================================
 */


Page02.ensureStateDefaults = function(){

    Page02.state =
        Page02.state || {};


    if(
        !Page02.state.answers ||
        typeof Page02.state.answers !==
            'object'
    ){

        Page02.state.answers = {};

    }


    if(
        !Number.isInteger(
            Page02.state.currentDimension
        )
    ){

        Page02.state.currentDimension =
            0;

    }


    if(
        typeof Page02.state.isRegistering !==
            'boolean'
    ){

        Page02.state.isRegistering =
            false;

    }


    if(
        typeof Page02.state.isSaving !==
            'boolean'
    ){

        Page02.state.isSaving =
            false;

    }


    if(
        !Page02.state.currentScreen
    ){

        Page02.state.currentScreen =
            Page02.SCREENS.INTRO;

    }


    if(
        Page02.state.peopleId ===
        undefined
    ){

        Page02.state.peopleId =
            null;

    }


    if(
        Page02.state.clientId ===
        undefined
    ){

        Page02.state.clientId =
            null;

    }


    if(
        Page02.state.kyc ===
        undefined
    ){

        Page02.state.kyc =
            null;

    }


    if(
        Page02.state.result ===
        undefined
    ){

        Page02.state.result =
            null;

    }


    if(
        Page02.state.discoveryResponse ===
        undefined
    ){

        Page02.state.discoveryResponse =
            null;

    }

};


/* =============================================================================
 * INITIALIZE PAGE 02
 * =============================================================================
 */


Page02.init = function(){

    if(
        Page02.state &&
        Page02.state.initialized
    ){

        return;

    }


    console.log(
        'CTM PATH™ Page 02 v' +
        Page02.version +
        ' initializing...'
    );


    /* -------------------------------------------------------------------------
     * STATE
     * -------------------------------------------------------------------------
     */


    Page02.ensureStateDefaults();


    /* -------------------------------------------------------------------------
     * MASTER VALIDATION
     * -------------------------------------------------------------------------
     */


    const masterValidation =
        Page02.validateScorecardMaster();


    if(
        !masterValidation.valid
    ){

        console.error(
            'CTM PATH™ Page 02 initialization stopped: scorecard master invalid.'
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * DOM VALIDATION
     * -------------------------------------------------------------------------
     */


    const domValidation =
        Page02.validateDOM();


    if(
        !domValidation.valid
    ){

        console.error(
            'CTM PATH™ Page 02 initialization stopped: DOM invalid.'
        );


        return;

    }


    /* -------------------------------------------------------------------------
     * CONTROLS
     * -------------------------------------------------------------------------
     */


    Page02.bindControls();

    Page02.bindResultControls();

    Page02.bindSessionEvents();


    /* -------------------------------------------------------------------------
     * RECOVERY
     * -------------------------------------------------------------------------
     */


    const recovery =
        Page02.restoreSession();


    /* -------------------------------------------------------------------------
     * SCREEN
     * -------------------------------------------------------------------------
     */


    Page02.restoreInitialScreen(
        recovery
    );


    /* -------------------------------------------------------------------------
     * HEADER
     * -------------------------------------------------------------------------
     */


    Page02.updateHeaderStatus();

    Page02.syncHeaderWhenReady();


    /* -------------------------------------------------------------------------
     * INITIAL LIVE STATE
     * -------------------------------------------------------------------------
     */


    Page02.updateLiveScore();


    if(
        Page02.state.currentScreen ===
        Page02.SCREENS.SCORECARD
    ){

        Page02.updateDimensionProgress();

        Page02.updateDimensionNavigation();

    }


    /* -------------------------------------------------------------------------
     * INITIALIZED
     * -------------------------------------------------------------------------
     */


    Page02.state.initialized =
        true;


    Page02.saveSession();


    console.log(
        'CTM PATH™ Page 02 v' +
        Page02.version +
        ' ready.',
        {
            screen:
                Page02.state.currentScreen,

            registered:
                Boolean(
                    Page02.state.peopleId ||
                    Page02.state.clientId
                ),

            answered:
                Page02.getAnsweredCount(),

            score:
                Page02.getTotalScore(),

            result:
                Boolean(
                    Page02.state.result
                )
        }
    );

};


/* =============================================================================
 * PUBLIC DIAGNOSTIC
 * =============================================================================
 */


Page02.info = function(){

    return {

        page:
            Page02.CONFIG.pageLabel,

        pageNumber:
            Page02.CONFIG.pageNumber,

        module:
            Page02.CONFIG.module,

        version:
            Page02.version,

        sessionVersion:
            Page02.SESSION_VERSION,

        screen:
            Page02.state.currentScreen,

        currentDimension:
            Page02.state.currentDimension + 1,

        registered:
            Boolean(
                Page02.state.peopleId ||
                Page02.state.clientId
            ),

        peopleId:
            Page02.state.peopleId,

        clientId:
            Page02.state.clientId,

        answered:
            Page02.getAnsweredCount(),

        remaining:
            Page02.getRemainingCount(),

        score:
            Page02.getTotalScore(),

        maximumScore:
            Page02.CONFIG.scoring.maximumScore,

        complete:
            Page02.isScorecardComplete(),

        resultAvailable:
            Boolean(
                Page02.state.result
            ),

        discoverySaved:
            Boolean(
                Page02.state.discoveryResponse
            )

    };

};


/* =============================================================================
 * DOM READY
 * =============================================================================
 */


function initializePage02(){

    try{

        Page02.init();

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 fatal initialization error:',
            error
        );

    }

}


if(
    document.readyState ===
    'loading'
){

    document.addEventListener(
        'DOMContentLoaded',
        initializePage02,
        {
            once:
                true
        }
    );

}
else{

    initializePage02();

}


/* =============================================================================
 * PUBLIC API
 * =============================================================================
 *
 * Page02 remains available for:
 *
 *      • production integration
 *      • controlled diagnostics
 *      • Page 03 handoff
 *      • browser console QA
 *
 * =============================================================================
 */


window.Page02 =
    Page02;


/* =============================================================================
 * FINAL PRODUCTION AUDIT
 * =============================================================================
 *
 * PAGE 02 v2.2 ARCHITECTURE
 *
 *
 *      PAGE 02 INTRO
 *           │
 *           ▼
 *      KYC
 *           │
 *           │ CTM_API.register()
 *           ▼
 *      PEOPLE / CLIENT ID
 *           │
 *           ▼
 *      LIFESTYLE SCORECARD™
 *           │
 *           ├── DIMENSION 01
 *           │      5 indicators
 *           │
 *           ├── DIMENSION 02
 *           │      5 indicators
 *           │
 *           ├── DIMENSION 03
 *           │      5 indicators
 *           │
 *           ├── DIMENSION 04
 *           │      5 indicators
 *           │
 *           └── DIMENSION 05
 *                  5 indicators
 *
 *                  TOTAL
 *                  25 indicators
 *                  × 4 maximum
 *                  = 100
 *
 *                       │
 *                       ▼
 *               COMPLETE SCORECARD
 *                       │
 *                       ▼
 *                CALCULATE RESULT
 *                       │
 *                       ▼
 *             CTM_API.saveDiscovery()
 *                       │
 *                       ▼
 *                  RESULT SCREEN
 *                       │
 *                  USER REVIEWS
 *                       │
 *                       ▼
 *              CONTINUE TO PAGE 03
 *
 *
 * =============================================================================
 *
 * FROZEN RULES
 *
 *      ✓ 5 dimensions
 *
 *      ✓ 5 indicators per dimension
 *
 *      ✓ 25 indicators total
 *
 *      ✓ exactly 4 options per indicator
 *
 *      ✓ scores 1 / 2 / 3 / 4
 *
 *      ✓ maximum score 100
 *
 *      ✓ no free-text financial answers
 *
 *      ✓ user clicks predefined ranges
 *
 *      ✓ responsive option arrangement belongs to CSS
 *
 *      ✓ CTM_API.register() preserved
 *
 *      ✓ CTM_API.saveDiscovery() preserved
 *
 *      ✓ client identity preserved
 *
 *      ✓ incomplete dimensions cannot advance
 *
 *      ✓ final result shown BEFORE Page 03
 *
 *      ✓ Page 03 requires explicit user continuation
 *
 *      ✓ interrupted scorecard can recover from sessionStorage
 *
 *      ✓ completed result can recover after refresh
 *
 *      ✓ global header remains shared
 *
 *      ✓ Page 02 controls only dynamic journey status
 *
 *
 * =============================================================================
 *
 * PAGE02.JS v2.2
 *
 * COMPLETE
 *
 * =============================================================================
 */
