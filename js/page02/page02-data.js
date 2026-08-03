
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02-data.js
 *
 * VERSION:
 * 3.0
 *
 * STATUS:
 * SHARED PAGE 02 DATA FOUNDATION
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Single canonical source of truth for:
 *
 *      • 5 Millionaire Lifestyle dimensions
 *      • 25 frozen indicators
 *      • 4 controlled options per indicator
 *      • 100 frozen range definitions
 *      • Score status definitions
 *
 * USED BY
 *
 *      page02b.js — Dimension 01
 *      page02c.js — Dimension 02
 *      page02d.js — Dimension 03
 *      page02e.js — Dimension 04
 *      page02f.js — Dimension 05
 *
 * =============================================================================
 *
 * SCORING MODEL
 *
 *      1 = STARTING™
 *      2 = PROGRESSING™
 *      3 = ADVANCING™
 *      4 = ACHIEVED™
 *
 *      25 indicators × 4 maximum points = 100
 *
 * =============================================================================
 *
 * IMPORTANT
 *
 * THIS FILE CONTAINS DATA ONLY.
 *
 * It must NOT:
 *
 *      ✗ manipulate the DOM
 *      ✗ control navigation
 *      ✗ access sessionStorage
 *      ✗ call CTM_API
 *      ✗ register clients
 *      ✗ save discovery
 *
 * =============================================================================
 */


'use strict';


(function(window){


/* =============================================================================
 * NAMESPACE
 * =============================================================================
 */


const Page02Data = {};


/* =============================================================================
 * VERSION
 * =============================================================================
 */


Page02Data.version = '3.0';


/* =============================================================================
 * SCORECARD CONFIGURATION
 * =============================================================================
 */


Page02Data.CONFIG = {

    dimensionCount: 5,

    indicatorsPerDimension: 5,

    indicatorCount: 25,

    optionsPerIndicator: 4,

    minimumScore: 1,

    maximumScorePerIndicator: 4,

    maximumScorePerDimension: 20,

    maximumScore: 100

};


/* =============================================================================
 * OPTION FACTORY
 * =============================================================================
 */


Page02Data.option = function(
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


Page02Data.SCORE_STATUS = {

    1: {

        score: 1,

        tamil:
            'தொடக்கம்',

        english:
            'STARTING™'

    },


    2: {

        score: 2,

        tamil:
            'முன்னேற்றம்',

        english:
            'PROGRESSING™'

    },


    3: {

        score: 3,

        tamil:
            'மேம்பட்ட நிலை',

        english:
            'ADVANCING™'

    },


    4: {

        score: 4,

        tamil:
            'இலக்கு அடைந்தது',

        english:
            'ACHIEVED™'

    }

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
 * DO NOT casually modify:
 *
 *      • IDs
 *      • indicator numbers
 *      • Tamil labels
 *      • English labels
 *      • ideal values
 *      • targets
 *      • option ordering
 *      • option labels
 *      • representative values
 *      • score values
 *
 * =============================================================================
 */


Page02Data.DIMENSIONS = [


/* =============================================================================
 * DIMENSION 01
 * WEALTH™
 * =============================================================================
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


        /* ---------------------------------------------------------------------
         * 01 — NET WORTH
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹4.99 Cr',
                    25000000
                ),

                Page02Data.option(
                    2,
                    '₹5 Cr – ₹7.49 Cr',
                    50000000
                ),

                Page02Data.option(
                    3,
                    '₹7.5 Cr – ₹9.99 Cr',
                    75000000
                ),

                Page02Data.option(
                    4,
                    '₹10 Cr+',
                    100000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 06 — LIQUID FINANCIAL INVESTMENTS
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹99 Lakh',
                    5000000
                ),

                Page02Data.option(
                    2,
                    '₹1 Cr – ₹1.49 Cr',
                    10000000
                ),

                Page02Data.option(
                    3,
                    '₹1.5 Cr – ₹1.99 Cr',
                    15000000
                ),

                Page02Data.option(
                    4,
                    '₹2 Cr+',
                    20000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 07 — CASH / OPPORTUNITY RESERVE
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹24.99 Lakh',
                    1250000
                ),

                Page02Data.option(
                    2,
                    '₹25 – ₹37.49 Lakh',
                    2500000
                ),

                Page02Data.option(
                    3,
                    '₹37.5 – ₹49.99 Lakh',
                    3750000
                ),

                Page02Data.option(
                    4,
                    '₹50 Lakh+',
                    5000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 08 — HIGH-INTEREST DEBT
         *
         * INVERSE:
         * Less high-interest debt = higher score.
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹5.01 Lakh+',
                    1000000
                ),

                Page02Data.option(
                    2,
                    '₹1.01 – ₹5 Lakh',
                    500000
                ),

                Page02Data.option(
                    3,
                    '₹1 – ₹1 Lakh',
                    100000
                ),

                Page02Data.option(
                    4,
                    '₹0 — No High-Interest Debt',
                    0
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 12 — GOLD OWNERSHIP
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '0 – 499 grams',
                    250
                ),

                Page02Data.option(
                    2,
                    '500 – 749 grams',
                    500
                ),

                Page02Data.option(
                    3,
                    '750 – 999 grams',
                    750
                ),

                Page02Data.option(
                    4,
                    '1 Kg+',
                    1000
                )

            ]

        }

    ]

},


/* =============================================================================
 * DIMENSION 02
 * INCOME & CASH FLOW™
 * =============================================================================
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


        /* ---------------------------------------------------------------------
         * 02 — ANNUAL PERSONAL INCOME
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹49.99 Lakh',
                    2500000
                ),

                Page02Data.option(
                    2,
                    '₹50 – ₹74.99 Lakh',
                    5000000
                ),

                Page02Data.option(
                    3,
                    '₹75 – ₹99.99 Lakh',
                    7500000
                ),

                Page02Data.option(
                    4,
                    '₹1 Cr+',
                    10000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 03 — MONTHLY INCOME
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹4.99 Lakh',
                    250000
                ),

                Page02Data.option(
                    2,
                    '₹5 – ₹7.49 Lakh',
                    500000
                ),

                Page02Data.option(
                    3,
                    '₹7.5 – ₹9.99 Lakh',
                    750000
                ),

                Page02Data.option(
                    4,
                    '₹10 Lakh+',
                    1000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 04 — PASSIVE / INVESTMENT INCOME
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹2.49 Lakh / month',
                    125000
                ),

                Page02Data.option(
                    2,
                    '₹2.5 – ₹3.74 Lakh / month',
                    250000
                ),

                Page02Data.option(
                    3,
                    '₹3.75 – ₹4.99 Lakh / month',
                    375000
                ),

                Page02Data.option(
                    4,
                    '₹5 Lakh+ / month',
                    500000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 05 — ANNUAL INCOME TAX PAID
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹12.49 Lakh',
                    625000
                ),

                Page02Data.option(
                    2,
                    '₹12.5 – ₹18.74 Lakh',
                    1250000
                ),

                Page02Data.option(
                    3,
                    '₹18.75 – ₹24.99 Lakh',
                    1875000
                ),

                Page02Data.option(
                    4,
                    '₹25 Lakh+',
                    2500000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 11 — INCOME-PRODUCING PROPERTIES
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'None / planning or acquiring first property',
                    0.5
                ),

                Page02Data.option(
                    2,
                    '1 property',
                    1
                ),

                Page02Data.option(
                    3,
                    '1 property + another being acquired',
                    1.5
                ),

                Page02Data.option(
                    4,
                    '2+ income-producing properties',
                    2
                )

            ]

        }

    ]

},


/* =============================================================================
 * DIMENSION 03
 * ASSETS™
 * =============================================================================
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


        /* ---------------------------------------------------------------------
         * 09 — LAND OWNERSHIP
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '0 – 2.49 acres',
                    2.5
                ),

                Page02Data.option(
                    2,
                    '2.5 – 4.99 acres',
                    5
                ),

                Page02Data.option(
                    3,
                    '5 – 9.99 acres',
                    7.5
                ),

                Page02Data.option(
                    4,
                    '10+ acres',
                    10
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 10 — PRIMARY RESIDENCE
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'No owned home / ₹0 – ₹99 Lakh',
                    5000000
                ),

                Page02Data.option(
                    2,
                    '₹1 Cr – ₹1.49 Cr',
                    10000000
                ),

                Page02Data.option(
                    3,
                    '₹1.5 Cr – ₹1.99 Cr',
                    15000000
                ),

                Page02Data.option(
                    4,
                    '₹2 Cr+ owned home',
                    20000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 13 — PREMIUM AUTOMOBILE
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'No car / below ₹50 Lakh',
                    2500000
                ),

                Page02Data.option(
                    2,
                    '₹50 – ₹74.99 Lakh',
                    5000000
                ),

                Page02Data.option(
                    3,
                    '₹75 – ₹99.99 Lakh',
                    7500000
                ),

                Page02Data.option(
                    4,
                    '₹1 Cr+ car',
                    10000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 21 — CHILDREN'S EDUCATION FUND
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'No dedicated fund / below ₹25 Lakh per child',
                    1250000
                ),

                Page02Data.option(
                    2,
                    '₹25 – ₹37.49 Lakh per child',
                    2500000
                ),

                Page02Data.option(
                    3,
                    '₹37.5 – ₹49.99 Lakh per child',
                    3750000
                ),

                Page02Data.option(
                    4,
                    '₹50 Lakh+ per child',
                    5000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 18 — HOUSEHOLD SUPPORT
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'No paid household support / occasional paid help',
                    0.5
                ),

                Page02Data.option(
                    2,
                    '1 regular paid staff',
                    1
                ),

                Page02Data.option(
                    3,
                    '1 full-time staff + additional support',
                    1.5
                ),

                Page02Data.option(
                    4,
                    '2+ regular paid staff',
                    2
                )

            ]

        }

    ]

},


/* =============================================================================
 * DIMENSION 04
 * LIFESTYLE & FREEDOM™
 * =============================================================================
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


        /* ---------------------------------------------------------------------
         * 14 — INTERNATIONAL TRAVEL
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '0 – 2 international trips / year',
                    3
                ),

                Page02Data.option(
                    2,
                    '3 – 5 trips / year',
                    6
                ),

                Page02Data.option(
                    3,
                    '6 – 11 trips / year',
                    9
                ),

                Page02Data.option(
                    4,
                    '12+ trips / year',
                    12
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 15 — PREMIUM FAMILY VACATIONS
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'None / occasional premium family vacation',
                    0.5
                ),

                Page02Data.option(
                    2,
                    '1 vacation / year',
                    1
                ),

                Page02Data.option(
                    3,
                    '1 premium vacation + additional short breaks',
                    1.5
                ),

                Page02Data.option(
                    4,
                    '2+ premium family vacations / year',
                    2
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 16 — PREMIUM ACCOMMODATION
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'Rarely / up to about 25% of travel',
                    25
                ),

                Page02Data.option(
                    2,
                    'About 50% of travel',
                    50
                ),

                Page02Data.option(
                    3,
                    'About 75% of travel',
                    75
                ),

                Page02Data.option(
                    4,
                    '5-star / premium accommodation consistently',
                    100
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 17 — PREMIUM AIR TRAVEL
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '0 – 1 business-class flight / year',
                    1.5
                ),

                Page02Data.option(
                    2,
                    '2 – 3 flights / year',
                    3
                ),

                Page02Data.option(
                    3,
                    '4 – 5 flights / year',
                    4.5
                ),

                Page02Data.option(
                    4,
                    '6+ business-class flights / year',
                    6
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 25 — TIME FREEDOM
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '0 – 14 discretionary days / year',
                    7.5
                ),

                Page02Data.option(
                    2,
                    '15 – 21 days / year',
                    15
                ),

                Page02Data.option(
                    3,
                    '22 – 29 days / year',
                    22.5
                ),

                Page02Data.option(
                    4,
                    '30+ discretionary days / year',
                    30
                )

            ]

        }

    ]

},


/* =============================================================================
 * DIMENSION 05
 * PROTECTION & CONTRIBUTION™
 * =============================================================================
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


        /* ---------------------------------------------------------------------
         * 19 — HEALTH & FITNESS INVESTMENT
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹99,999 / year',
                    50000
                ),

                Page02Data.option(
                    2,
                    '₹1 – ₹1.49 Lakh / year',
                    100000
                ),

                Page02Data.option(
                    3,
                    '₹1.5 – ₹1.99 Lakh / year',
                    150000
                ),

                Page02Data.option(
                    4,
                    '₹2 Lakh+ / year',
                    200000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 20 — LEARNING & DEVELOPMENT
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹2.49 Lakh / year',
                    125000
                ),

                Page02Data.option(
                    2,
                    '₹2.5 – ₹3.74 Lakh / year',
                    250000
                ),

                Page02Data.option(
                    3,
                    '₹3.75 – ₹4.99 Lakh / year',
                    375000
                ),

                Page02Data.option(
                    4,
                    '₹5 Lakh+ / year',
                    500000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 22 — LIFE INSURANCE PROTECTION
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'No cover / below ₹2.5 Cr',
                    12500000
                ),

                Page02Data.option(
                    2,
                    '₹2.5 – ₹3.74 Cr',
                    25000000
                ),

                Page02Data.option(
                    3,
                    '₹3.75 – ₹4.99 Cr',
                    37500000
                ),

                Page02Data.option(
                    4,
                    '₹5 Cr+ cover',
                    50000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 23 — FAMILY HEALTH INSURANCE
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    'No cover / below ₹25 Lakh',
                    1250000
                ),

                Page02Data.option(
                    2,
                    '₹25 – ₹37.49 Lakh',
                    2500000
                ),

                Page02Data.option(
                    3,
                    '₹37.5 – ₹49.99 Lakh',
                    3750000
                ),

                Page02Data.option(
                    4,
                    '₹50 Lakh+ cover',
                    5000000
                )

            ]

        },


        /* ---------------------------------------------------------------------
         * 24 — CHARITY / SOCIAL CONTRIBUTION
         * ---------------------------------------------------------------------
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

                Page02Data.option(
                    1,
                    '₹0 – ₹4.99 Lakh / year',
                    250000
                ),

                Page02Data.option(
                    2,
                    '₹5 – ₹7.49 Lakh / year',
                    500000
                ),

                Page02Data.option(
                    3,
                    '₹7.5 – ₹9.99 Lakh / year',
                    750000
                ),

                Page02Data.option(
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
 * DATA ACCESS — GET ALL DIMENSIONS
 * =============================================================================
 */


Page02Data.getDimensions = function(){

    return Page02Data.DIMENSIONS;

};


/* =============================================================================
 * DATA ACCESS — GET DIMENSION BY INDEX
 * =============================================================================
 */


Page02Data.getDimension = function(index){

    const normalizedIndex =
        Number(index);


    if(
        !Number.isInteger(normalizedIndex) ||
        normalizedIndex < 0 ||
        normalizedIndex >=
            Page02Data.DIMENSIONS.length
    ){

        return null;

    }


    return (

        Page02Data.DIMENSIONS[
            normalizedIndex
        ] || null

    );

};


/* =============================================================================
 * DATA ACCESS — GET DIMENSION BY ID
 * =============================================================================
 */


Page02Data.getDimensionById = function(
    dimensionId
){

    return (

        Page02Data.DIMENSIONS.find(
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
 * DATA ACCESS — GET ALL INDICATORS
 * =============================================================================
 */


Page02Data.getAllIndicators = function(){

    return Page02Data.DIMENSIONS.reduce(
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
 * DATA ACCESS — GET INDICATOR BY ID
 * =============================================================================
 */


Page02Data.getIndicator = function(
    indicatorId
){

    return (

        Page02Data
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
 * DATA ACCESS — GET INDICATOR'S DIMENSION
 * =============================================================================
 */


Page02Data.getIndicatorDimension = function(
    indicatorId
){

    return (

        Page02Data.DIMENSIONS.find(
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
 * DATA ACCESS — GET SCORE STATUS
 * =============================================================================
 */


Page02Data.getScoreStatus = function(
    score
){

    const normalizedScore =
        Number(score);


    return (

        Page02Data.SCORE_STATUS[
            normalizedScore
        ] || {

            score: 0,

            tamil: '',

            english: ''

        }

    );

};


/* =============================================================================
 * COUNTS
 * =============================================================================
 */


Page02Data.getDimensionCount = function(){

    return Page02Data.DIMENSIONS.length;

};


Page02Data.getIndicatorCount = function(){

    return Page02Data
        .getAllIndicators()
        .length;

};


Page02Data.getOptionCount = function(){

    return Page02Data
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


Page02Data.getMaximumScore = function(){

    return (
        Page02Data.getIndicatorCount() *
        Page02Data.CONFIG.maximumScorePerIndicator
    );

};


/* =============================================================================
 * MASTER DATA VALIDATION
 * =============================================================================
 *
 * This gives us an immediate console-level integrity check after future edits.
 *
 * Expected:
 *
 *      dimensions:     5
 *      indicators:    25
 *      options:       100
 *      maximumScore: 100
 *      valid:        true
 *
 * =============================================================================
 */


Page02Data.validate = function(){

    const errors =
        [];


    const dimensions =
        Page02Data.DIMENSIONS;


    const indicators =
        Page02Data.getAllIndicators();


    /* -------------------------------------------------------------------------
     * DIMENSION COUNT
     * -------------------------------------------------------------------------
     */


    if(
        dimensions.length !==
        Page02Data.CONFIG.dimensionCount
    ){

        errors.push(
            'Expected 5 dimensions; found ' +
            dimensions.length +
            '.'
        );

    }


    /* -------------------------------------------------------------------------
     * INDICATOR COUNT
     * -------------------------------------------------------------------------
     */


    if(
        indicators.length !==
        Page02Data.CONFIG.indicatorCount
    ){

        errors.push(
            'Expected 25 indicators; found ' +
            indicators.length +
            '.'
        );

    }


    /* -------------------------------------------------------------------------
     * DIMENSION STRUCTURE
     * -------------------------------------------------------------------------
     */


    dimensions.forEach(
        function(dimension){

            if(
                dimension.indicators.length !==
                Page02Data.CONFIG.indicatorsPerDimension
            ){

                errors.push(
                    'Dimension "' +
                    dimension.id +
                    '" must contain exactly 5 indicators.'
                );

            }

        }
    );


    /* -------------------------------------------------------------------------
     * UNIQUE INDICATOR IDs
     * -------------------------------------------------------------------------
     */


    const indicatorIds =
        new Set();


    indicators.forEach(
        function(indicator){

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

        }
    );


    /* -------------------------------------------------------------------------
     * FOUR OPTIONS PER INDICATOR
     * -------------------------------------------------------------------------
     */


    indicators.forEach(
        function(indicator){

            if(
                !Array.isArray(
                    indicator.options
                ) ||
                indicator.options.length !==
                    Page02Data.CONFIG.optionsPerIndicator
            ){

                errors.push(
                    'Indicator "' +
                    indicator.id +
                    '" must contain exactly four options.'
                );

                return;

            }


            /* -----------------------------------------------------------------
             * SCORE ORDER MUST BE 1 / 2 / 3 / 4
             * -----------------------------------------------------------------
             */


            indicator.options.forEach(
                function(
                    option,
                    optionIndex
                ){

                    const expectedScore =
                        optionIndex + 1;


                    if(
                        Number(
                            option.score
                        ) !==
                        expectedScore
                    ){

                        errors.push(
                            'Indicator "' +
                            indicator.id +
                            '" option ' +
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
     * TOTAL OPTION COUNT
     * -------------------------------------------------------------------------
     */


    const optionCount =
        Page02Data.getOptionCount();


    if(
        optionCount !==
        100
    ){

        errors.push(
            'Expected 100 range options; found ' +
            optionCount +
            '.'
        );

    }


    /* -------------------------------------------------------------------------
     * MAXIMUM SCORE
     * -------------------------------------------------------------------------
     */


    const maximumScore =
        Page02Data.getMaximumScore();


    if(
        maximumScore !==
        Page02Data.CONFIG.maximumScore
    ){

        errors.push(
            'Expected maximum score 100; calculated ' +
            maximumScore +
            '.'
        );

    }


    /* -------------------------------------------------------------------------
     * RESULT
     * -------------------------------------------------------------------------
     */


    return {

        valid:
            errors.length === 0,

        version:
            Page02Data.version,

        dimensions:
            dimensions.length,

        indicators:
            indicators.length,

        options:
            optionCount,

        maximumScore:
            maximumScore,

        errors:
            errors

    };

};


/* =============================================================================
 * DEVELOPMENT INFORMATION
 * =============================================================================
 */


Page02Data.info = function(){

    return {

        application:
            'CTM PATH™ MILLIONAIRES™',

        experience:
            'Guided Journey™',

        module:
            'Middle Class → Millionaire Lifestyle Scorecard™',

        version:
            Page02Data.version,

        validation:
            Page02Data.validate()

    };

};


/* =============================================================================
 * FREEZE MASTER DATA
 * =============================================================================
 *
 * Prevent accidental runtime mutation of the canonical definitions.
 * =============================================================================
 */


Page02Data.DIMENSIONS.forEach(
    function(dimension){

        dimension.indicators.forEach(
            function(indicator){

                indicator.options.forEach(
                    function(option){

                        Object.freeze(
                            option
                        );

                    }
                );


                Object.freeze(
                    indicator.options
                );


                Object.freeze(
                    indicator
                );

            }
        );


        Object.freeze(
            dimension.indicators
        );


        Object.freeze(
            dimension
        );

    }
);


Object.freeze(
    Page02Data.DIMENSIONS
);


Object.freeze(
    Page02Data.SCORE_STATUS
);


Object.freeze(
    Page02Data.CONFIG
);


/* =============================================================================
 * PUBLIC EXPOSURE
 * =============================================================================
 */


window.Page02Data =
    Page02Data;


/* =============================================================================
 * DATA INTEGRITY CHECK
 * =============================================================================
 */


const validation =
    Page02Data.validate();


if(
    validation.valid
){

    console.info(
        'CTM PATH™ Page 02 data ready:',
        validation
    );

}
else{

    console.error(
        'CTM PATH™ Page 02 data integrity failure:',
        validation
    );

}


/* =============================================================================
 * END
 * =============================================================================
 *
 * EXPECTED CONSOLE:
 *
 * {
 *      valid: true,
 *      version: "3.0",
 *      dimensions: 5,
 *      indicators: 25,
 *      options: 100,
 *      maximumScore: 100,
 *      errors: []
 * }
 *
 * NEXT FILE:
 *
 *      js/page02/page02-session.js
 *
 * =============================================================================
 */


})(window);

