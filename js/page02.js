
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * Frontend v2.1
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
 * RESPONSIBILITIES
 * -----------------------------------------------------------------------------
 *
 *      • Control Page 02 internal screens
 *      • Capture KYC information
 *      • Register person with backend
 *      • Render 25 scorecard indicators
 *      • Organise indicators into 5 dimensions
 *      • Render four selectable ranges for every indicator
 *      • Calculate live score / gap
 *      • Save Millionaire Lifestyle Scorecard™
 *      • Render final result
 *      • Continue to Page 03
 *
 * Backend actions used:
 *
 *      CTM_API.register()
 *      CTM_API.saveDiscovery()
 *
 * SCORING MODEL
 *
 *      1 = Starting
 *      2 = Progressing
 *      3 = Advancing
 *      4 = Achieved
 *
 *      25 indicators × 4 = 100
 *
 * IMPORTANT
 *
 *      Users NEVER type financial / lifestyle values.
 *
 *      Every indicator presents exactly four controlled ranges.
 *      The selected range directly determines the score.
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
 * CONFIGURATION
 * =============================================================================
 */


Page02.CONFIG = {

    pageNumber: 2,

    totalPages: 7,

    nextPage: 'page03.html',

    storageKeys: {

        peopleId:
            'ctm_people_id',

        fullName:
            'ctm_full_name',

        page02Result:
            'ctm_page02_result'

    }

};


/* =============================================================================
 * PAGE STATE
 * =============================================================================
 */


Page02.state = {

    peopleId: null,

    currentScreen: 'intro',

    currentDimension: 0,

    kyc: {},

    answers: {},

    result: null,

    saving: false

};


/* =============================================================================
 * OPTION HELPER
 * =============================================================================
 *
 * value:
 *      Representative numeric value retained for backend compatibility.
 *
 * score:
 *      Actual Lifestyle Scorecard™ score.
 *
 * label:
 *      User-visible range.
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
            score,

        label:
            label,

        value:
            value

    };

};



/* =============================================================================
 * FOUR-OPTION SCORE STATUS
 * =============================================================================
 */

Page02.getScoreStatus = function(score){

    switch(Number(score)){

        case 1:
            return { tamil:'தொடக்கம்', english:'STARTING™' };

        case 2:
            return { tamil:'முன்னேற்றம்', english:'PROGRESSING™' };

        case 3:
            return { tamil:'மேம்பட்ட நிலை', english:'ADVANCING™' };

        case 4:
            return { tamil:'இலக்கு அடைந்தது', english:'ACHIEVED™' };

        default:
            return { tamil:'', english:'' };

    }

};


/* =============================================================================
 * SCORECARD MASTER
 * =============================================================================
 *
 * 25 indicators
 * 5 dimensions
 * 5 indicators per dimension
 *
 * Every indicator contains exactly four selectable ranges.
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
             * Inverse scoring.
             *
             * Less debt = higher score.
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
 * END OF BATCH 1
 *
 * Foundation + complete 25-indicator master definition.
 *
 * DO NOT close or initialize Page02 here.
 * Batch 2 continues immediately after this line.
 * =============================================================================
 */

/* =============================================================================
 * BATCH 2
 *
 * SCORECARD UTILITIES
 * FOUR-OPTION RENDERING ARCHITECTURE
 * LIVE SCORE HANDLING
 * =============================================================================
 */


/* =============================================================================
 * FLATTEN ALL INDICATORS
 * =============================================================================
 */


Page02.getAllIndicators = function(){

    return Page02.DIMENSIONS.reduce(
        function(all, dimension){

            return all.concat(
                dimension.indicators
            );

        },
        []
    );

};



/* =============================================================================
 * GET INDICATOR BY ID
 * =============================================================================
 */


Page02.getIndicator = function(indicatorId){

    return Page02
        .getAllIndicators()
        .find(
            function(indicator){

                return indicator.id === indicatorId;

            }
        ) || null;

};



/* =============================================================================
 * GET DIMENSION
 * =============================================================================
 */


Page02.getDimension = function(index){

    if(
        index < 0 ||
        index >= Page02.DIMENSIONS.length
    ){

        return null;

    }


    return Page02.DIMENSIONS[index];

};



/* =============================================================================
 * SAFE DOM LOOKUP
 * =============================================================================
 */


Page02.el = function(id){

    return document.getElementById(id);

};



/* =============================================================================
 * ESCAPE HTML
 * =============================================================================
 */


Page02.escapeHTML = function(value){

    if(
        value === null ||
        value === undefined
    ){

        return '';

    }


    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

};



/* =============================================================================
 * FORMAT INDICATOR NUMBER
 * =============================================================================
 */


Page02.formatIndicatorNumber = function(number){

    return String(number).padStart(
        2,
        '0'
    );

};



/* =============================================================================
 * GET ANSWER
 * =============================================================================
 */


Page02.getAnswer = function(indicatorId){

    return Page02.state.answers[indicatorId] || null;

};



/* =============================================================================
 * HAS ANSWER
 * =============================================================================
 */


Page02.hasAnswer = function(indicatorId){

    const answer =
        Page02.getAnswer(indicatorId);


    return Boolean(
        answer &&
        Number(answer.score) >= 1 &&
        Number(answer.score) <= 4
    );

};



/* =============================================================================
 * GET ANSWERED INDICATOR COUNT
 * =============================================================================
 */


Page02.getAnsweredCount = function(){

    return Page02
        .getAllIndicators()
        .filter(
            function(indicator){

                return Page02.hasAnswer(
                    indicator.id
                );

            }
        )
        .length;

};



/* =============================================================================
 * CALCULATE CURRENT TOTAL SCORE
 * =============================================================================
 *
 * Maximum:
 *
 *      25 × 4 = 100
 *
 * Because each selected option scores from 1–4,
 * the final raw total is already the score out of 100.
 *
 * =============================================================================
 */


Page02.calculateTotalScore = function(){

    return Page02
        .getAllIndicators()
        .reduce(
            function(total, indicator){

                const answer =
                    Page02.getAnswer(
                        indicator.id
                    );


                if(
                    !answer ||
                    !Number.isFinite(
                        Number(answer.score)
                    )
                ){

                    return total;

                }


                return (
                    total +
                    Number(answer.score)
                );

            },
            0
        );

};



/* =============================================================================
 * CALCULATE MAXIMUM SCORE
 * =============================================================================
 */


Page02.getMaximumScore = function(){

    return (
        Page02.getAllIndicators().length *
        4
    );

};



/* =============================================================================
 * CALCULATE SCORE GAP
 * =============================================================================
 */


Page02.calculateScoreGap = function(){

    return Math.max(
        0,
        Page02.getMaximumScore() -
        Page02.calculateTotalScore()
    );

};



/* =============================================================================
 * CALCULATE DIMENSION SCORE
 * =============================================================================
 */


Page02.calculateDimensionScore = function(dimensionIndex){

    const dimension =
        Page02.getDimension(
            dimensionIndex
        );


    if(!dimension){

        return 0;

    }


    return dimension.indicators.reduce(
        function(total, indicator){

            const answer =
                Page02.getAnswer(
                    indicator.id
                );


            if(!answer){

                return total;

            }


            return (
                total +
                Number(answer.score || 0)
            );

        },
        0
    );

};



/* =============================================================================
 * DIMENSION COMPLETION
 * =============================================================================
 */


Page02.isDimensionComplete = function(dimensionIndex){

    const dimension =
        Page02.getDimension(
            dimensionIndex
        );


    if(!dimension){

        return false;

    }


    return dimension.indicators.every(
        function(indicator){

            return Page02.hasAnswer(
                indicator.id
            );

        }
    );

};



/* =============================================================================
 * FIND FIRST UNANSWERED INDICATOR
 * =============================================================================
 */


Page02.getFirstUnansweredIndicator = function(dimensionIndex){

    const dimension =
        Page02.getDimension(
            dimensionIndex
        );


    if(!dimension){

        return null;

    }


    return dimension.indicators.find(
        function(indicator){

            return !Page02.hasAnswer(
                indicator.id
            );

        }
    ) || null;

};



/* =============================================================================
 * SCORE STATUS CLASS
 * =============================================================================
 */


Page02.getScoreClass = function(score){

    switch(Number(score)){

        case 1:
            return 'score-starting';

        case 2:
            return 'score-progressing';

        case 3:
            return 'score-advancing';

        case 4:
            return 'score-achieved';

        default:
            return 'score-unanswered';

    }

};



/* =============================================================================
 * CREATE OPTION BUTTON
 * =============================================================================
 *
 * DOM ARCHITECTURE
 *
 * .score-option
 *      .score-option-number
 *      .score-option-content
 *          .score-option-range
 *          .score-option-status
 *
 * CSS can display:
 *
 * Desktop:
 *
 *      2 columns × 2 rows
 *
 * Mobile:
 *
 *      1 option per row
 *
 * =============================================================================
 */


Page02.createOptionButton = function(
    indicator,
    option
){

    const selectedAnswer =
        Page02.getAnswer(
            indicator.id
        );


    const selected =
        Boolean(
            selectedAnswer &&
            Number(selectedAnswer.score) ===
            Number(option.score)
        );


    const status =
        Page02.getScoreStatus(
            option.score
        );


    const button =
        document.createElement(
            'button'
        );


    button.type =
        'button';


    button.className =
        [
            'score-option',
            Page02.getScoreClass(
                option.score
            ),
            selected
                ? 'is-selected'
                : ''
        ]
        .filter(Boolean)
        .join(' ');


    button.dataset.indicator =
        indicator.id;


    button.dataset.score =
        String(option.score);


    button.dataset.value =
        String(option.value);


    button.setAttribute(
        'aria-pressed',
        selected
            ? 'true'
            : 'false'
    );


    button.setAttribute(
        'aria-label',
        option.label +
        ' — ' +
        status.english +
        ' — Score ' +
        option.score +
        ' out of 4'
    );


    button.innerHTML = `

        <span class="score-option-number">

            ${Page02.escapeHTML(option.score)}

        </span>


        <span class="score-option-content">

            <span class="score-option-range">

                ${Page02.escapeHTML(option.label)}

            </span>


            <span class="score-option-status">

                <span class="score-option-status-tamil">

                    ${Page02.escapeHTML(status.tamil)}

                </span>

                <span class="score-option-status-english">

                    ${Page02.escapeHTML(status.english)}

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
 * CREATE INDICATOR CARD
 * =============================================================================
 */


Page02.createIndicatorCard = function(indicator){

    const answer =
        Page02.getAnswer(
            indicator.id
        );


    const article =
        document.createElement(
            'article'
        );


    article.className =
        'scorecard-question';


    article.dataset.indicator =
        indicator.id;


    article.id =
        'indicator-' +
        indicator.id;


    /* -------------------------------------------------------------------------
     * NUMBER
     * -------------------------------------------------------------------------
     */


    const number =
        document.createElement(
            'div'
        );


    number.className =
        'question-number';


    number.textContent =
        Page02.formatIndicatorNumber(
            indicator.number
        );


    article.appendChild(
        number
    );


    /* -------------------------------------------------------------------------
     * TAMIL TITLE
     * -------------------------------------------------------------------------
     */


    const tamilTitle =
        document.createElement(
            'h3'
        );


    tamilTitle.className =
        'question-title-tamil';


    tamilTitle.textContent =
        indicator.tamil;


    article.appendChild(
        tamilTitle
    );


    /* -------------------------------------------------------------------------
     * ENGLISH TITLE
     * -------------------------------------------------------------------------
     */


    const englishTitle =
        document.createElement(
            'p'
        );


    englishTitle.className =
        'question-title-english';


    englishTitle.textContent =
        indicator.english;


    article.appendChild(
        englishTitle
    );


    /* -------------------------------------------------------------------------
     * CURRENT REALITY LABEL
     * -------------------------------------------------------------------------
     */


    const prompt =
        document.createElement(
            'div'
        );


    prompt.className =
        'question-prompt';


    prompt.innerHTML = `

        <span class="question-prompt-tamil">

            உங்கள் தற்போதைய நிலையைத் தேர்ந்தெடுக்கவும்

        </span>

        <span class="question-prompt-english">

            SELECT YOUR CURRENT REALITY

        </span>

    `;


    article.appendChild(
        prompt
    );


    /* -------------------------------------------------------------------------
     * FOUR OPTION GRID
     * -------------------------------------------------------------------------
     */


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
        indicator.english +
        ' options'
    );


    indicator.options.forEach(
        function(option){

            options.appendChild(
                Page02.createOptionButton(
                    indicator,
                    option
                )
            );

        }
    );


    article.appendChild(
        options
    );


    /* -------------------------------------------------------------------------
     * BENCHMARK
     * -------------------------------------------------------------------------
     */


    const benchmark =
        document.createElement(
            'div'
        );


    benchmark.className =
        'question-benchmark';


    benchmark.innerHTML = `

        <span class="benchmark-label">

            Millionaire Ideal™

        </span>

        <span class="benchmark-caption">

            BENCHMARK

        </span>

        <strong class="benchmark-value">

            ${Page02.escapeHTML(indicator.ideal)}

        </strong>

    `;


    article.appendChild(
        benchmark
    );


    /* -------------------------------------------------------------------------
     * LIVE SCORE
     * -------------------------------------------------------------------------
     */


    const score =
        document.createElement(
            'div'
        );


    score.className =
        [
            'question-score',
            answer
                ? Page02.getScoreClass(
                    answer.score
                )
                : 'score-unanswered'
        ]
        .join(' ');


    score.dataset.scoreFor =
        indicator.id;


    Page02.populateScoreDisplay(
        score,
        answer
    );


    article.appendChild(
        score
    );


    return article;

};



/* =============================================================================
 * POPULATE LIVE SCORE DISPLAY
 * =============================================================================
 */


Page02.populateScoreDisplay = function(
    scoreElement,
    answer
){

    if(!scoreElement){

        return;

    }


    if(!answer){

        scoreElement.className =
            'question-score score-unanswered';


        scoreElement.innerHTML = `

            <span class="score-label">

                SCORE

            </span>

            <strong class="score-value">

                — / 4

            </strong>

        `;


        return;

    }


    const score =
        Number(answer.score);


    const status =
        Page02.getScoreStatus(
            score
        );


    scoreElement.className =
        'question-score ' +
        Page02.getScoreClass(
            score
        );


    scoreElement.innerHTML = `

        <span class="score-label">

            SCORE

        </span>

        <strong class="score-value">

            ${Page02.escapeHTML(score)} / 4

        </strong>

        <span class="score-status">

            <span class="score-status-tamil">

                ${Page02.escapeHTML(status.tamil)}

            </span>

            <span class="score-status-divider">

                ·

            </span>

            <span class="score-status-english">

                ${Page02.escapeHTML(status.english)}

            </span>

        </span>

    `;

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
        Page02.getIndicator(
            indicatorId
        );


    if(!indicator){

        console.error(
            'CTM PATH™ Unknown scorecard indicator:',
            indicatorId
        );

        return;

    }


    const selectedOption =
        indicator.options.find(
            function(option){

                return (
                    Number(option.score) ===
                    Number(score)
                );

            }
        );


    if(!selectedOption){

        console.error(
            'CTM PATH™ Invalid score option:',
            indicatorId,
            score
        );

        return;

    }


    /* -------------------------------------------------------------------------
     * STORE ANSWER
     * -------------------------------------------------------------------------
     */


    Page02.state.answers[indicatorId] = {

        indicatorId:
            indicator.id,

        indicatorNumber:
            indicator.number,

        tamil:
            indicator.tamil,

        english:
            indicator.english,

        score:
            Number(selectedOption.score),

        selectedRange:
            selectedOption.label,

        value:
            selectedOption.value,

        ideal:
            indicator.ideal,

        target:
            indicator.target

    };


    /* -------------------------------------------------------------------------
     * UPDATE BUTTON STATES
     * -------------------------------------------------------------------------
     */


    const card =
        document.querySelector(
            '[data-indicator="' +
            indicatorId +
            '"].scorecard-question'
        );


    if(card){

        const buttons =
            card.querySelectorAll(
                '.score-option'
            );


        buttons.forEach(
            function(button){

                const isSelected =
                    Number(
                        button.dataset.score
                    ) ===
                    Number(score);


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


        const scoreElement =
            card.querySelector(
                '[data-score-for="' +
                indicatorId +
                '"]'
            );


        Page02.populateScoreDisplay(
            scoreElement,
            Page02.state.answers[indicatorId]
        );

    }


    /* -------------------------------------------------------------------------
     * UPDATE PAGE / DIMENSION SCORE
     * -------------------------------------------------------------------------
     */


    Page02.updateLiveScore();


    Page02.updateDimensionNavigation();

};



/* =============================================================================
 * RENDER DIMENSION
 * =============================================================================
 */


Page02.renderDimension = function(index){

    const dimension =
        Page02.getDimension(
            index
        );


    if(!dimension){

        console.error(
            'CTM PATH™ Invalid dimension index:',
            index
        );

        return false;

    }


    Page02.state.currentDimension =
        index;


    const container =
        Page02.el(
            'scorecard-questions'
        );


    if(!container){

        console.error(
            'CTM PATH™ Missing #scorecard-questions container.'
        );

        return false;

    }


    /* -------------------------------------------------------------------------
     * CLEAR PREVIOUS DIMENSION
     * -------------------------------------------------------------------------
     */


    container.innerHTML =
        '';


    /* -------------------------------------------------------------------------
     * DIMENSION HEADER
     * -------------------------------------------------------------------------
     */


    const header =
        document.createElement(
            'header'
        );


    header.className =
        'dimension-header';


    header.innerHTML = `

        <div class="dimension-number">

            DIMENSION
            ${Page02.escapeHTML(dimension.number)}
            / 05

        </div>


        <h2 class="dimension-title-tamil">

            ${Page02.escapeHTML(dimension.tamil)}

        </h2>


        <p class="dimension-title-english">

            ${Page02.escapeHTML(dimension.english)}

        </p>

    `;


    container.appendChild(
        header
    );


    /* -------------------------------------------------------------------------
     * FIVE INDICATORS
     * -------------------------------------------------------------------------
     */


    const questions =
        document.createElement(
            'div'
        );


    questions.className =
        'dimension-questions';


    dimension.indicators.forEach(
        function(indicator){

            questions.appendChild(
                Page02.createIndicatorCard(
                    indicator
                )
            );

        }
    );


    container.appendChild(
        questions
    );


    /* -------------------------------------------------------------------------
     * UPDATE STATE / UI
     * -------------------------------------------------------------------------
     */


    Page02.updateLiveScore();


    Page02.updateDimensionNavigation();


    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });


    return true;

};



/* =============================================================================
 * LIVE SCORE SUMMARY
 * =============================================================================
 */


Page02.updateLiveScore = function(){

    const answered =
        Page02.getAnsweredCount();


    const totalIndicators =
        Page02.getAllIndicators().length;


    const score =
        Page02.calculateTotalScore();


    const maximum =
        Page02.getMaximumScore();


    const gap =
        Math.max(
            0,
            maximum - score
        );


    /* -------------------------------------------------------------------------
     * ANSWERED COUNT
     * -------------------------------------------------------------------------
     */


    const answeredElement =
        Page02.el(
            'answered-count'
        );


    if(answeredElement){

        answeredElement.textContent =
            answered +
            ' / ' +
            totalIndicators;

    }


    /* -------------------------------------------------------------------------
     * LIVE SCORE
     * -------------------------------------------------------------------------
     */


    const scoreElement =
        Page02.el(
            'live-score'
        );


    if(scoreElement){

        scoreElement.textContent =
            score +
            ' / ' +
            maximum;

    }


    /* -------------------------------------------------------------------------
     * LIVE PERCENTAGE
     * -------------------------------------------------------------------------
     *
     * Final completed score:
     *
     *      25 indicators × max 4 = 100
     *
     * Therefore final raw score = percentage.
     *
     * During incomplete scoring we still show the
     * accumulated score against the 100-point model.
     *
     * -------------------------------------------------------------------------
     */


    const percentageElement =
        Page02.el(
            'live-percentage'
        );


    if(percentageElement){

        percentageElement.textContent =
            score + '%';

    }


    /* -------------------------------------------------------------------------
     * LIVE GAP
     * -------------------------------------------------------------------------
     */


    const gapElement =
        Page02.el(
            'live-gap'
        );


    if(gapElement){

        gapElement.textContent =
            gap;

    }


    /* -------------------------------------------------------------------------
     * DIMENSION SCORE
     * -------------------------------------------------------------------------
     */


    const dimensionScoreElement =
        Page02.el(
            'dimension-score'
        );


    if(dimensionScoreElement){

        const dimensionScore =
            Page02.calculateDimensionScore(
                Page02.state.currentDimension
            );


        dimensionScoreElement.textContent =
            dimensionScore +
            ' / 20';

    }

};



/* =============================================================================
 * UPDATE DIMENSION NAVIGATION
 * =============================================================================
 */


Page02.updateDimensionNavigation = function(){

    const index =
        Page02.state.currentDimension;


    const isFirst =
        index === 0;


    const isLast =
        index ===
        Page02.DIMENSIONS.length - 1;


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
     * BACK
     * -------------------------------------------------------------------------
     */


    if(backButton){

        backButton.disabled =
            false;


        backButton.dataset.firstDimension =
            isFirst
                ? 'true'
                : 'false';

    }


    /* -------------------------------------------------------------------------
     * NEXT
     * -------------------------------------------------------------------------
     */


    if(nextButton){

        nextButton.disabled =
            !complete;


        nextButton.classList.toggle(
            'is-disabled',
            !complete
        );


        nextButton.setAttribute(
            'aria-disabled',
            complete
                ? 'false'
                : 'true'
        );


        if(isLast){

            nextButton.textContent =
                'VIEW MY RESULT →';

        }

        else{

            nextButton.textContent =
                'NEXT DIMENSION →';

        }

    }

};



/* =============================================================================
 * SCORE EXPLANATION
 * =============================================================================
 *
 * IMPORTANT:
 *
 * Four levels only.
 *
 * There is no 0 / 4 option.
 *
 * =============================================================================
 */


Page02.SCORE_LEVELS = [

    {

        score:
            1,

        tamil:
            'தொடக்கம்',

        english:
            'STARTING™',

        range:
            'Current foundation'

    },

    {

        score:
            2,

        tamil:
            'முன்னேற்றம்',

        english:
            'PROGRESSING™',

        range:
            'Building momentum'

    },

    {

        score:
            3,

        tamil:
            'மேம்பட்ட நிலை',

        english:
            'ADVANCING™',

        range:
            'Approaching benchmark'

    },

    {

        score:
            4,

        tamil:
            'இலக்கு அடைந்தது',

        english:
            'ACHIEVED™',

        range:
            'Millionaire benchmark'

    }

];



/* =============================================================================
 * RENDER HOW YOUR SCORE WORKS
 * =============================================================================
 */


Page02.renderScoreExplanation = function(){

    const container =
        Page02.el(
            'score-explanation-levels'
        );


    if(!container){

        return;

    }


    container.innerHTML =
        '';


    Page02.SCORE_LEVELS.forEach(
        function(level){

            const card =
                document.createElement(
                    'div'
                );


            card.className =
                'score-explanation-level ' +
                Page02.getScoreClass(
                    level.score
                );


            card.innerHTML = `

                <strong class="score-explanation-number">

                    ${Page02.escapeHTML(level.score)} / 4

                </strong>


                <span class="score-explanation-tamil">

                    ${Page02.escapeHTML(level.tamil)}

                </span>


                <span class="score-explanation-english">

                    ${Page02.escapeHTML(level.english)}

                </span>


                <span class="score-explanation-range">

                    ${Page02.escapeHTML(level.range)}

                </span>

            `;


            container.appendChild(
                card
            );

        }
    );

};



/* =============================================================================
 * END OF BATCH 2
 *
 * Included:
 *
 *      ✓ Indicator utilities
 *      ✓ Answer state helpers
 *      ✓ Total score calculation
 *      ✓ Dimension score calculation
 *      ✓ Four-option button architecture
 *      ✓ Indicator card rendering
 *      ✓ Strong live SCORE x / 4 display
 *      ✓ Option selection handling
 *      ✓ Dimension rendering
 *      ✓ Live 100-point score handling
 *      ✓ Four-level HOW YOUR SCORE WORKS architecture
 *
 * Batch 3 continues with:
 *
 *      → Screen controller
 *      → KYC capture
 *      → CTM_API.register()
 *      → Dimension navigation
 *      → Validation
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 3
 *
 * SCREEN CONTROLLER
 * KYC CAPTURE
 * CTM_API.REGISTER() INTEGRATION
 * DIMENSION NAVIGATION
 * VALIDATION
 * =============================================================================
 */


/* =============================================================================
 * SCREEN DEFINITIONS
 * =============================================================================
 */


Page02.SCREENS = {

    INTRO:
        'intro',

    KYC:
        'kyc',

    SCORECARD:
        'scorecard',

    SAVING:
        'saving'

};



/* =============================================================================
 * SHOW SCREEN
 * =============================================================================
 */


Page02.showScreen = function(screenName){

    const screens =
        document.querySelectorAll(
            '[data-page02-screen]'
        );


    screens.forEach(
        function(screen){

            const active =
                screen.dataset.page02Screen ===
                screenName;


            screen.hidden =
                !active;


            screen.classList.toggle(
                'is-active',
                active
            );

        }
    );


    Page02.state.currentScreen =
        screenName;


    window.scrollTo({

        top:
            0,

        behavior:
            'smooth'

    });

};



/* =============================================================================
 * NORMALIZE TEXT VALUE
 * =============================================================================
 */


Page02.normalizeText = function(value){

    if(
        value === null ||
        value === undefined
    ){

        return '';

    }


    return String(value)
        .trim()
        .replace(/\s+/g, ' ');

};



/* =============================================================================
 * NORMALIZE MOBILE NUMBER
 * =============================================================================
 */


Page02.normalizeMobile = function(value){

    return String(
        value || ''
    )
    .replace(/\D/g, '')
    .slice(-10);

};



/* =============================================================================
 * NORMALIZE EMAIL
 * =============================================================================
 */


Page02.normalizeEmail = function(value){

    return String(
        value || ''
    )
    .trim()
    .toLowerCase();

};



/* =============================================================================
 * VALIDATE EMAIL
 * =============================================================================
 */


Page02.isValidEmail = function(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

};



/* =============================================================================
 * VALIDATE MOBILE
 * =============================================================================
 */


Page02.isValidMobile = function(mobile){

    return /^[6-9]\d{9}$/.test(
        mobile
    );

};



/* =============================================================================
 * READ FIELD
 * =============================================================================
 *
 * Supports either:
 *
 *      #fullName
 *
 * or:
 *
 *      [name="fullName"]
 *
 * This keeps Page 02 compatible with the existing HTML while
 * avoiding unnecessary dependency on one selector style.
 *
 * =============================================================================
 */


Page02.readField = function(name){

    const element =
        document.getElementById(name) ||
        document.querySelector(
            '[name="' + name + '"]'
        );


    if(!element){

        return '';

    }


    return Page02.normalizeText(
        element.value
    );

};



/* =============================================================================
 * WRITE FIELD ERROR
 * =============================================================================
 */


Page02.setFieldError = function(
    fieldName,
    message
){

    const field =
        document.getElementById(
            fieldName
        ) ||
        document.querySelector(
            '[name="' + fieldName + '"]'
        );


    if(field){

        field.classList.toggle(
            'has-error',
            Boolean(message)
        );


        field.setAttribute(
            'aria-invalid',
            message
                ? 'true'
                : 'false'
        );

    }


    const error =
        document.querySelector(
            '[data-error-for="' +
            fieldName +
            '"]'
        );


    if(error){

        error.textContent =
            message || '';


        error.hidden =
            !message;

    }

};



/* =============================================================================
 * CLEAR KYC ERRORS
 * =============================================================================
 */


Page02.clearKYCErrors = function(){

    [
        'fullName',
        'mobile',
        'email',
        'district',
        'state'
    ]
    .forEach(
        function(field){

            Page02.setFieldError(
                field,
                ''
            );

        }
    );


    Page02.setStatusMessage(
        ''
    );

};



/* =============================================================================
 * STATUS MESSAGE
 * =============================================================================
 */


Page02.setStatusMessage = function(
    message,
    type
){

    const status =
        Page02.el(
            'page02-status'
        ) ||
        document.querySelector(
            '[data-page02-status]'
        );


    if(!status){

        return;

    }


    status.textContent =
        message || '';


    status.hidden =
        !message;


    status.classList.remove(
        'is-error',
        'is-success',
        'is-loading'
    );


    if(type){

        status.classList.add(
            'is-' + type
        );

    }

};



/* =============================================================================
 * CAPTURE KYC DATA
 * =============================================================================
 *
 * Backend-compatible registration payload:
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


Page02.captureKYC = function(){

    const fullName =
        Page02.readField(
            'fullName'
        );


    const mobile =
        Page02.normalizeMobile(
            Page02.readField(
                'mobile'
            )
        );


    const email =
        Page02.normalizeEmail(
            Page02.readField(
                'email'
            )
        );


    const district =
        Page02.readField(
            'district'
        );


    const state =
        Page02.readField(
            'state'
        );


    const sourceField =
        Page02.readField(
            'source'
        );


    const languageField =
        Page02.readField(
            'language'
        );


    return {

        fullName:
            fullName,

        email:
            email,

        mobile:
            mobile,

        district:
            district,

        state:
            state,

        source:
            sourceField ||
            'CTM PATH Millionaire Journey',

        language:
            languageField ||
            document.documentElement.lang ||
            'ta',

        device:
            Page02.getDeviceType()

    };

};



/* =============================================================================
 * DEVICE TYPE
 * =============================================================================
 */


Page02.getDeviceType = function(){

    const width =
        window.innerWidth;


    if(width <= 768){

        return 'mobile';

    }


    if(width <= 1024){

        return 'tablet';

    }


    return 'desktop';

};



/* =============================================================================
 * VALIDATE KYC
 * =============================================================================
 */


Page02.validateKYC = function(data){

    Page02.clearKYCErrors();


    let valid =
        true;


    if(!data.fullName){

        Page02.setFieldError(
            'fullName',
            'Please enter your name.'
        );


        valid =
            false;

    }


    if(!data.mobile){

        Page02.setFieldError(
            'mobile',
            'Please enter your WhatsApp mobile number.'
        );


        valid =
            false;

    }

    else if(
        !Page02.isValidMobile(
            data.mobile
        )
    ){

        Page02.setFieldError(
            'mobile',
            'Please enter a valid 10-digit Indian mobile number.'
        );


        valid =
            false;

    }


    if(!data.email){

        Page02.setFieldError(
            'email',
            'Please enter your email address.'
        );


        valid =
            false;

    }

    else if(
        !Page02.isValidEmail(
            data.email
        )
    ){

        Page02.setFieldError(
            'email',
            'Please enter a valid email address.'
        );


        valid =
            false;

    }


    if(!data.district){

        Page02.setFieldError(
            'district',
            'Please enter your district.'
        );


        valid =
            false;

    }


    if(!data.state){

        Page02.setFieldError(
            'state',
            'Please enter your state.'
        );


        valid =
            false;

    }


    if(!valid){

        Page02.setStatusMessage(
            'Please complete the highlighted details before continuing.',
            'error'
        );

    }


    return valid;

};



/* =============================================================================
 * EXTRACT CLIENT ID
 * =============================================================================
 *
 * Supports common backend response structures without changing
 * the CTM_API contract.
 *
 * =============================================================================
 */


Page02.extractClientId = function(response){

    if(!response){

        return '';

    }


    if(
        typeof response ===
        'string'
    ){

        return response;

    }


    if(response.clientId){

        return response.clientId;

    }


    if(response.id){

        return response.id;

    }


    if(
        response.data &&
        response.data.clientId
    ){

        return response.data.clientId;

    }


    if(
        response.result &&
        response.result.clientId
    ){

        return response.result.clientId;

    }


    return '';

};



/* =============================================================================
 * REGISTER CLIENT
 * =============================================================================
 */


Page02.registerClient = async function(){

    const data =
        Page02.captureKYC();


    if(
        !Page02.validateKYC(
            data
        )
    ){

        return false;

    }


    if(
        !window.CTM_API ||
        typeof window.CTM_API.register !==
        'function'
    ){

        console.error(
            'CTM PATH™ CTM_API.register() is unavailable.'
        );


        Page02.setStatusMessage(
            'Registration service is temporarily unavailable. Please try again.',
            'error'
        );


        return false;

    }


    if(Page02.state.isRegistering){

        return false;

    }


    Page02.state.isRegistering =
        true;


    Page02.setRegistrationBusy(
        true
    );


    Page02.setStatusMessage(
        'Preparing your Millionaire Lifestyle Scorecard™...',
        'loading'
    );


    try{

        const response =
            await window.CTM_API.register(
                data
            );


        console.log(
            'CTM PATH™ registration response:',
            response
        );


        /*
         * Reject explicit backend failure responses.
         */


        if(
            response &&
            response.success === false
        ){

            throw new Error(
                response.message ||
                'Registration failed.'
            );

        }


        const clientId =
            Page02.extractClientId(
                response
            );


        if(!clientId){

            throw new Error(
                'Registration completed without a client ID.'
            );

        }


        Page02.state.clientId =
            clientId;


        Page02.state.kyc =
            data;


        Page02.state.registrationResponse =
            response;


        /*
         * Persist locally so a refresh during the 25-question
         * scorecard does not immediately lose the journey identity.
         */


        Page02.persistSession();


        Page02.setStatusMessage(
            ''
        );


        Page02.state.currentDimension =
            0;


        Page02.showScreen(
            Page02.SCREENS.SCORECARD
        );


        Page02.renderDimension(
            0
        );


        return true;

    }


    catch(error){

        console.error(
            'CTM PATH™ registration failed:',
            error
        );


        Page02.setStatusMessage(
            error &&
            error.message
                ? error.message
                : 'Unable to register right now. Please try again.',
            'error'
        );


        return false;

    }


    finally{

        Page02.state.isRegistering =
            false;


        Page02.setRegistrationBusy(
            false
        );

    }

};



/* =============================================================================
 * REGISTRATION BUTTON BUSY STATE
 * =============================================================================
 */


Page02.setRegistrationBusy = function(
    busy
){

    const button =
        Page02.el(
            'kyc-submit'
        ) ||
        document.querySelector(
            '[data-action="register"]'
        );


    if(!button){

        return;

    }


    button.disabled =
        Boolean(busy);


    button.classList.toggle(
        'is-loading',
        Boolean(busy)
    );


    button.setAttribute(
        'aria-busy',
        busy
            ? 'true'
            : 'false'
    );

};



/* =============================================================================
 * PERSIST SESSION
 * =============================================================================
 */


Page02.persistSession = function(){

    try{

        const session = {

            clientId:
                Page02.state.clientId || '',

            kyc:
                Page02.state.kyc || {},

            answers:
                Page02.state.answers || {},

            currentDimension:
                Page02.state.currentDimension || 0

        };


        sessionStorage.setItem(
            'CTM_PATH_PAGE02',
            JSON.stringify(
                session
            )
        );

    }


    catch(error){

        console.warn(
            'CTM PATH™ Page 02 session could not be persisted:',
            error
        );

    }

};



/* =============================================================================
 * RESTORE SESSION
 * =============================================================================
 */


Page02.restoreSession = function(){

    try{

        const stored =
            sessionStorage.getItem(
                'CTM_PATH_PAGE02'
            );


        if(!stored){

            return false;

        }


        const session =
            JSON.parse(
                stored
            );


        if(
            session.clientId
        ){

            Page02.state.clientId =
                session.clientId;

        }


        if(
            session.kyc &&
            typeof session.kyc ===
            'object'
        ){

            Page02.state.kyc =
                session.kyc;

        }


        if(
            session.answers &&
            typeof session.answers ===
            'object'
        ){

            Page02.state.answers =
                session.answers;

        }


        if(
            Number.isInteger(
                session.currentDimension
            )
        ){

            Page02.state.currentDimension =
                Math.min(
                    Math.max(
                        session.currentDimension,
                        0
                    ),
                    Page02.DIMENSIONS.length - 1
                );

        }


        return Boolean(
            Page02.state.clientId
        );

    }


    catch(error){

        console.warn(
            'CTM PATH™ Page 02 session restore failed:',
            error
        );


        return false;

    }

};



/* =============================================================================
 * SCROLL TO FIRST UNANSWERED QUESTION
 * =============================================================================
 */


Page02.focusFirstUnanswered = function(){

    const unanswered =
        Page02.getFirstUnansweredIndicator(
            Page02.state.currentDimension
        );


    if(!unanswered){

        return;

    }


    const element =
        Page02.el(
            'indicator-' +
            unanswered.id
        );


    if(!element){

        return;

    }


    element.classList.add(
        'needs-answer'
    );


    element.scrollIntoView({

        behavior:
            'smooth',

        block:
            'center'

    });


    window.setTimeout(
        function(){

            element.classList.remove(
                'needs-answer'
            );

        },
        1800
    );

};



/* =============================================================================
 * PREVIOUS DIMENSION
 * =============================================================================
 */


Page02.previousDimension = function(){

    const current =
        Page02.state.currentDimension;


    /*
     * Dimension 01 back button returns to the previous
     * Page 02 screen rather than producing index -1.
     */


    if(current <= 0){

        Page02.showScreen(
            Page02.SCREENS.KYC
        );


        return;

    }


    Page02.state.currentDimension =
        current - 1;


    Page02.persistSession();


    Page02.renderDimension(
        Page02.state.currentDimension
    );

};



/* =============================================================================
 * NEXT DIMENSION
 * =============================================================================
 */


Page02.nextDimension = async function(){

    const current =
        Page02.state.currentDimension;


    /*
     * Do not allow users to advance with incomplete
     * indicators in the current dimension.
     */


    if(
        !Page02.isDimensionComplete(
            current
        )
    ){

        Page02.focusFirstUnanswered();


        Page02.setStatusMessage(
            'Please select one option for every indicator before continuing.',
            'error'
        );


        return;

    }


    Page02.setStatusMessage(
        ''
    );


    Page02.persistSession();


    const lastDimension =
        current ===
        Page02.DIMENSIONS.length - 1;


    /*
     * Dimensions 01–04
     */


    if(!lastDimension){

        Page02.state.currentDimension =
            current + 1;


        Page02.persistSession();


        Page02.renderDimension(
            Page02.state.currentDimension
        );


        return;

    }


    /*
     * Dimension 05 completed.
     *
     * All 25 indicators should now have answers.
     */


    if(
        Page02.getAnsweredCount() !==
        Page02.getAllIndicators().length
    ){

        Page02.setStatusMessage(
            'Please complete all 25 indicators before viewing your result.',
            'error'
        );


        return;

    }


    /*
     * Final save is implemented in Batch 4.
     */


    if(
        typeof Page02.completeScorecard ===
        'function'
    ){

        await Page02.completeScorecard();

    }

    else{

        console.warn(
            'CTM PATH™ completeScorecard() will be attached in Batch 4.'
        );

    }

};



/* =============================================================================
 * INTRO → KYC
 * =============================================================================
 */


Page02.beginScorecard = function(){

    Page02.setStatusMessage(
        ''
    );


    Page02.showScreen(
        Page02.SCREENS.KYC
    );

};



/* =============================================================================
 * KYC → INTRO
 * =============================================================================
 */


Page02.backToIntro = function(){

    Page02.setStatusMessage(
        ''
    );


    Page02.showScreen(
        Page02.SCREENS.INTRO
    );

};



/* =============================================================================
 * KEYBOARD ACCESSIBILITY FOR OPTION CARDS
 * =============================================================================
 *
 * Buttons already support Enter / Space natively.
 *
 * This adds arrow navigation between the four options.
 *
 * =============================================================================
 */


Page02.handleOptionKeyboard = function(event){

    const button =
        event.target.closest(
            '.score-option'
        );


    if(!button){

        return;

    }


    if(
        ![
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown'
        ].includes(
            event.key
        )
    ){

        return;

    }


    const group =
        button.closest(
            '.score-options'
        );


    if(!group){

        return;

    }


    const buttons =
        Array.from(
            group.querySelectorAll(
                '.score-option'
            )
        );


    const index =
        buttons.indexOf(
            button
        );


    if(index === -1){

        return;

    }


    let nextIndex =
        index;


    /*
     * Desktop:
     *
     * 1   2
     * 3   4
     */


    switch(event.key){

        case 'ArrowLeft':

            nextIndex =
                Math.max(
                    0,
                    index - 1
                );

            break;


        case 'ArrowRight':

            nextIndex =
                Math.min(
                    buttons.length - 1,
                    index + 1
                );

            break;


        case 'ArrowUp':

            nextIndex =
                Math.max(
                    0,
                    index - 2
                );

            break;


        case 'ArrowDown':

            nextIndex =
                Math.min(
                    buttons.length - 1,
                    index + 2
                );

            break;

    }


    if(
        nextIndex !==
        index
    ){

        event.preventDefault();


        buttons[nextIndex].focus();

    }

};



/* =============================================================================
 * BIND PAGE CONTROLS
 * =============================================================================
 */


Page02.bindControls = function(){

    /* -------------------------------------------------------------------------
     * INTRO BUTTON
     * -------------------------------------------------------------------------
     */


    const beginButton =
        Page02.el(
            'begin-scorecard'
        ) ||
        document.querySelector(
            '[data-action="begin-scorecard"]'
        );


    if(beginButton){

        beginButton.addEventListener(
            'click',
            Page02.beginScorecard
        );

    }


    /* -------------------------------------------------------------------------
     * KYC BACK
     * -------------------------------------------------------------------------
     */


    const kycBack =
        Page02.el(
            'kyc-back'
        ) ||
        document.querySelector(
            '[data-action="kyc-back"]'
        );


    if(kycBack){

        kycBack.addEventListener(
            'click',
            Page02.backToIntro
        );

    }


    /* -------------------------------------------------------------------------
     * KYC SUBMIT
     * -------------------------------------------------------------------------
     */


    const kycSubmit =
        Page02.el(
            'kyc-submit'
        ) ||
        document.querySelector(
            '[data-action="register"]'
        );


    if(kycSubmit){

        kycSubmit.addEventListener(
            'click',
            function(event){

                event.preventDefault();


                Page02.registerClient();

            }
        );

    }


    /* -------------------------------------------------------------------------
     * KYC FORM SUBMIT
     * -------------------------------------------------------------------------
     */


    const kycForm =
        Page02.el(
            'kyc-form'
        ) ||
        document.querySelector(
            '[data-page02-kyc-form]'
        );


    if(kycForm){

        kycForm.addEventListener(
            'submit',
            function(event){

                event.preventDefault();


                Page02.registerClient();

            }
        );

    }


    /* -------------------------------------------------------------------------
     * DIMENSION BACK
     * -------------------------------------------------------------------------
     */


    const dimensionBack =
        Page02.el(
            'dimension-back'
        );


    if(dimensionBack){

        dimensionBack.addEventListener(
            'click',
            function(event){

                event.preventDefault();


                Page02.previousDimension();

            }
        );

    }


    /* -------------------------------------------------------------------------
     * DIMENSION NEXT
     * -------------------------------------------------------------------------
     */


    const dimensionNext =
        Page02.el(
            'dimension-next'
        );


    if(dimensionNext){

        dimensionNext.addEventListener(
            'click',
            function(event){

                event.preventDefault();


                Page02.nextDimension();

            }
        );

    }


    /* -------------------------------------------------------------------------
     * OPTION KEYBOARD NAVIGATION
     * -------------------------------------------------------------------------
     */


    document.addEventListener(
        'keydown',
        Page02.handleOptionKeyboard
    );

};



/* =============================================================================
 * RESTORE EXISTING JOURNEY
 * =============================================================================
 */


Page02.resumeExistingJourney = function(){

    const restored =
        Page02.restoreSession();


    if(
        !restored ||
        !Page02.state.clientId
    ){

        return false;

    }


    Page02.showScreen(
        Page02.SCREENS.SCORECARD
    );


    Page02.renderDimension(
        Page02.state.currentDimension
    );


    return true;

};



/* =============================================================================
 * END OF BATCH 3
 *
 * Included:
 *
 *      ✓ Page 02 screen controller
 *      ✓ KYC capture
 *      ✓ KYC validation
 *      ✓ Mobile / email normalization
 *      ✓ Backend-compatible registration payload
 *      ✓ Existing CTM_API.register() integration
 *      ✓ Client ID capture
 *      ✓ Session persistence
 *      ✓ Session recovery
 *      ✓ Previous dimension navigation
 *      ✓ Next dimension navigation
 *      ✓ Mandatory five-answer validation per dimension
 *      ✓ First unanswered question focus
 *      ✓ Four-option keyboard navigation
 *      ✓ Final Dimension 05 handoff
 *
 *
 * IMPORTANT:
 *
 * Batch 3 does NOT call CTM_API.saveDiscovery().
 *
 * That belongs at the final transactional boundary after all
 * 25 indicators are complete.
 *
 *
 * BATCH 4:
 *
 *      → Build complete 25-indicator discovery payload
 *      → Calculate final score / 100
 *      → Calculate dimension totals
 *      → Calculate Millionaire Gap™
 *      → Result band
 *      → CTM_API.saveDiscovery()
 *      → Duplicate-save protection
 *      → Success / failure handling
 *      → Navigate Page 02 → Page 03
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 4
 *
 * FINAL SCORE ENGINE
 * DIMENSION TOTALS
 * MILLIONAIRE GAP™
 * RESULT BAND
 * DISCOVERY PAYLOAD
 * CTM_API.saveDiscovery()
 * DUPLICATE-SAVE PROTECTION
 * PAGE 03 HANDOFF
 * =============================================================================
 */


/* =============================================================================
 * GET ALL ANSWERS
 * =============================================================================
 */


Page02.getAnswerEntries = function(){

    return Page02
        .getAllIndicators()
        .map(
            function(indicator){

                const answer =
                    Page02.state.answers[
                        indicator.id
                    ];


                return {

                    indicatorId:
                        indicator.id,

                    dimensionId:
                        indicator.dimensionId,

                    score:
                        answer &&
                        Number.isFinite(
                            Number(answer.score)
                        )
                            ? Number(answer.score)
                            : null,

                    optionIndex:
                        answer &&
                        Number.isFinite(
                            Number(answer.optionIndex)
                        )
                            ? Number(answer.optionIndex)
                            : null,

                    range:
                        answer &&
                        answer.range
                            ? answer.range
                            : '',

                    benchmark:
                        indicator.benchmark || ''

                };

            }
        );

};



/* =============================================================================
 * VERIFY COMPLETE SCORECARD
 * =============================================================================
 */


Page02.isScorecardComplete = function(){

    const indicators =
        Page02.getAllIndicators();


    if(
        indicators.length !== 25
    ){

        console.error(
            'CTM PATH™ expected 25 indicators but found:',
            indicators.length
        );


        return false;

    }


    return indicators.every(
        function(indicator){

            const answer =
                Page02.state.answers[
                    indicator.id
                ];


            if(!answer){

                return false;

            }


            const score =
                Number(
                    answer.score
                );


            return (
                Number.isInteger(score) &&
                score >= 1 &&
                score <= 4
            );

        }
    );

};



/* =============================================================================
 * CALCULATE RAW SCORE
 * =============================================================================
 *
 * 25 indicators × maximum 4 points
 *
 * Maximum:
 *
 *      100
 *
 * Therefore:
 *
 *      RAW SCORE === PERCENTAGE
 *
 * =============================================================================
 */


Page02.calculateTotalScore = function(){

    return Page02
        .getAllIndicators()
        .reduce(
            function(total, indicator){

                const answer =
                    Page02.state.answers[
                        indicator.id
                    ];


                if(!answer){

                    return total;

                }


                const score =
                    Number(
                        answer.score
                    );


                if(
                    !Number.isFinite(score)
                ){

                    return total;

                }


                return total + score;

            },
            0
        );

};



/* =============================================================================
 * CALCULATE PERCENTAGE
 * =============================================================================
 */


Page02.calculatePercentage = function(){

    const score =
        Page02.calculateTotalScore();


    return Math.max(
        0,
        Math.min(
            100,
            Math.round(score)
        )
    );

};



/* =============================================================================
 * MILLIONAIRE GAP™
 * =============================================================================
 *
 * 100 = Millionaire Ideal™
 *
 * Example:
 *
 *      Score 63
 *      Gap   37
 *
 * =============================================================================
 */


Page02.calculateMillionaireGap = function(){

    return Math.max(
        0,
        100 -
        Page02.calculateTotalScore()
    );

};



/* =============================================================================
 * DIMENSION SCORE
 * =============================================================================
 */


Page02.calculateDimensionScore = function(
    dimensionIndex
){

    const dimension =
        Page02.DIMENSIONS[
            dimensionIndex
        ];


    if(!dimension){

        return 0;

    }


    return dimension.indicators.reduce(
        function(total, indicator){

            const answer =
                Page02.state.answers[
                    indicator.id
                ];


            if(!answer){

                return total;

            }


            const score =
                Number(
                    answer.score
                );


            return total +
                (
                    Number.isFinite(score)
                        ? score
                        : 0
                );

        },
        0
    );

};



/* =============================================================================
 * DIMENSION MAXIMUM
 * =============================================================================
 */


Page02.getDimensionMaximum = function(
    dimensionIndex
){

    const dimension =
        Page02.DIMENSIONS[
            dimensionIndex
        ];


    if(!dimension){

        return 0;

    }


    return (
        dimension.indicators.length *
        4
    );

};



/* =============================================================================
 * DIMENSION PERCENTAGE
 * =============================================================================
 */


Page02.calculateDimensionPercentage = function(
    dimensionIndex
){

    const score =
        Page02.calculateDimensionScore(
            dimensionIndex
        );


    const maximum =
        Page02.getDimensionMaximum(
            dimensionIndex
        );


    if(!maximum){

        return 0;

    }


    return Math.round(
        (
            score /
            maximum
        ) *
        100
    );

};



/* =============================================================================
 * BUILD DIMENSION RESULTS
 * =============================================================================
 */


Page02.buildDimensionResults = function(){

    return Page02.DIMENSIONS.map(
        function(dimension, index){

            const score =
                Page02.calculateDimensionScore(
                    index
                );


            const maximum =
                Page02.getDimensionMaximum(
                    index
                );


            const percentage =
                Page02.calculateDimensionPercentage(
                    index
                );


            return {

                id:
                    dimension.id,

                titleTamil:
                    dimension.titleTamil || '',

                titleEnglish:
                    dimension.titleEnglish || '',

                score:
                    score,

                maximum:
                    maximum,

                percentage:
                    percentage,

                gap:
                    Math.max(
                        0,
                        maximum - score
                    )

            };

        }
    );

};



/* =============================================================================
 * RESULT BAND
 * =============================================================================
 *
 * Uses the same score philosophy displayed in
 * HOW YOUR SCORE WORKS.
 *
 * Since the completed scorecard minimum is 25,
 * the practical completed-score bands begin at 25.
 *
 * =============================================================================
 */


Page02.getResultBand = function(
    percentage
){

    const score =
        Number(
            percentage
        );


    if(score >= 75){

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


    if(score >= 50){

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

};



/* =============================================================================
 * BUILD INDICATOR RESULT
 * =============================================================================
 */


Page02.buildIndicatorResult = function(
    indicator
){

    const answer =
        Page02.state.answers[
            indicator.id
        ];


    if(!answer){

        return null;

    }


    return {

        id:
            indicator.id,

        dimensionId:
            indicator.dimensionId,

        titleTamil:
            indicator.titleTamil || '',

        titleEnglish:
            indicator.titleEnglish || '',

        benchmark:
            indicator.benchmark || '',

        optionIndex:
            Number(
                answer.optionIndex
            ),

        score:
            Number(
                answer.score
            ),

        range:
            answer.range || ''

    };

};



/* =============================================================================
 * BUILD ALL INDICATOR RESULTS
 * =============================================================================
 */


Page02.buildIndicatorResults = function(){

    return Page02
        .getAllIndicators()
        .map(
            function(indicator){

                return Page02.buildIndicatorResult(
                    indicator
                );

            }
        )
        .filter(Boolean);

};



/* =============================================================================
 * BUILD FINAL RESULT
 * =============================================================================
 */


Page02.buildResult = function(){

    const totalScore =
        Page02.calculateTotalScore();


    const percentage =
        Page02.calculatePercentage();


    const millionaireGap =
        Page02.calculateMillionaireGap();


    const resultBand =
        Page02.getResultBand(
            percentage
        );


    return {

        totalIndicators:
            25,

        maximumScore:
            100,

        totalScore:
            totalScore,

        percentage:
            percentage,

        millionaireGap:
            millionaireGap,

        resultBand:
            resultBand,

        dimensions:
            Page02.buildDimensionResults(),

        indicators:
            Page02.buildIndicatorResults()

    };

};



/* =============================================================================
 * BUILD DISCOVERY PAYLOAD
 * =============================================================================
 *
 * Existing backend integration remains:
 *
 *      CTM_API.saveDiscovery(payload)
 *
 * This payload intentionally carries:
 *
 *      client identity
 *      all 25 indicator answers
 *      dimension totals
 *      final score
 *      percentage
 *      Millionaire Gap™
 *      result band
 *
 * =============================================================================
 */


Page02.buildDiscoveryPayload = function(){

    const result =
        Page02.buildResult();


    return {

        clientId:
            Page02.state.clientId,

        fullName:
            Page02.state.kyc &&
            Page02.state.kyc.fullName
                ? Page02.state.kyc.fullName
                : '',

        mobile:
            Page02.state.kyc &&
            Page02.state.kyc.mobile
                ? Page02.state.kyc.mobile
                : '',

        email:
            Page02.state.kyc &&
            Page02.state.kyc.email
                ? Page02.state.kyc.email
                : '',

        district:
            Page02.state.kyc &&
            Page02.state.kyc.district
                ? Page02.state.kyc.district
                : '',

        state:
            Page02.state.kyc &&
            Page02.state.kyc.state
                ? Page02.state.kyc.state
                : '',

        source:
            Page02.state.kyc &&
            Page02.state.kyc.source
                ? Page02.state.kyc.source
                : 'CTM PATH Millionaire Journey',

        language:
            Page02.state.kyc &&
            Page02.state.kyc.language
                ? Page02.state.kyc.language
                : 'ta',

        device:
            Page02.state.kyc &&
            Page02.state.kyc.device
                ? Page02.state.kyc.device
                : Page02.getDeviceType(),

        assessment:
            'MIDDLE CLASS TO MILLIONAIRE LIFESTYLE SCORECARD™',

        assessmentVersion:
            Page02.version || '2.1',

        totalIndicators:
            result.totalIndicators,

        maximumScore:
            result.maximumScore,

        totalScore:
            result.totalScore,

        percentage:
            result.percentage,

        millionaireGap:
            result.millionaireGap,

        resultBand:
            result.resultBand.key,

        resultBandTamil:
            result.resultBand.tamil,

        resultBandEnglish:
            result.resultBand.english,

        dimensions:
            result.dimensions,

        answers:
            result.indicators,

        completedAt:
            new Date().toISOString()

    };

};



/* =============================================================================
 * SAVE BUTTON BUSY STATE
 * =============================================================================
 */


Page02.setSaveBusy = function(
    busy
){

    const button =
        Page02.el(
            'dimension-next'
        );


    if(!button){

        return;

    }


    button.disabled =
        Boolean(busy);


    button.classList.toggle(
        'is-loading',
        Boolean(busy)
    );


    button.setAttribute(
        'aria-busy',
        busy
            ? 'true'
            : 'false'
    );


    if(busy){

        if(
            !button.dataset.originalText
        ){

            button.dataset.originalText =
                button.textContent;

        }


        button.textContent =
            'SAVING YOUR SCORE...';

    }

    else if(
        button.dataset.originalText
    ){

        button.textContent =
            button.dataset.originalText;

    }

};



/* =============================================================================
 * SAVE LOCK KEY
 * =============================================================================
 */


Page02.getSaveLockKey = function(){

    return (
        'CTM_PATH_PAGE02_SAVED_' +
        (
            Page02.state.clientId ||
            'UNKNOWN'
        )
    );

};



/* =============================================================================
 * CHECK PREVIOUS SAVE
 * =============================================================================
 */


Page02.hasAlreadySaved = function(){

    try{

        return (
            sessionStorage.getItem(
                Page02.getSaveLockKey()
            ) ===
            'true'
        );

    }


    catch(error){

        return false;

    }

};



/* =============================================================================
 * MARK AS SAVED
 * =============================================================================
 */


Page02.markAsSaved = function(){

    try{

        sessionStorage.setItem(
            Page02.getSaveLockKey(),
            'true'
        );

    }


    catch(error){

        console.warn(
            'CTM PATH™ save lock could not be persisted:',
            error
        );

    }

};



/* =============================================================================
 * CLEAR PAGE 02 WORKING SESSION
 * =============================================================================
 *
 * Do not clear the save-lock here.
 *
 * The lock prevents accidental duplicate submission if the user
 * navigates back from Page 03 during the same browser session.
 *
 * =============================================================================
 */


Page02.clearWorkingSession = function(){

    try{

        sessionStorage.removeItem(
            'CTM_PATH_PAGE02'
        );

    }


    catch(error){

        console.warn(
            'CTM PATH™ Page 02 working session could not be cleared:',
            error
        );

    }

};



/* =============================================================================
 * STORE RESULT FOR PAGE 03
 * =============================================================================
 *
 * Page 03 can read:
 *
 *      sessionStorage.getItem('CTM_PATH_MILLIONAIRE_RESULT')
 *
 * This avoids exposing the complete result in the URL.
 *
 * =============================================================================
 */


Page02.storeResultForPage03 = function(
    payload,
    response
){

    try{

        const handoff = {

            clientId:
                Page02.state.clientId,

            totalScore:
                payload.totalScore,

            maximumScore:
                payload.maximumScore,

            percentage:
                payload.percentage,

            millionaireGap:
                payload.millionaireGap,

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

            backendResponse:
                response || null

        };


        sessionStorage.setItem(
            'CTM_PATH_MILLIONAIRE_RESULT',
            JSON.stringify(
                handoff
            )
        );

    }


    catch(error){

        console.warn(
            'CTM PATH™ result handoff could not be stored:',
            error
        );

    }

};



/* =============================================================================
 * PAGE 03 URL
 * =============================================================================
 */


Page02.getPage03URL = function(){

    return '/pages/page03.html';

};



/* =============================================================================
 * NAVIGATE TO PAGE 03
 * =============================================================================
 */


Page02.goToPage03 = function(){

    window.location.href =
        Page02.getPage03URL();

};



/* =============================================================================
 * COMPLETE SCORECARD
 * =============================================================================
 *
 * This is the single transactional boundary for Page 02.
 *
 * Sequence:
 *
 *      1. Verify 25 answers
 *      2. Verify client ID
 *      3. Prevent duplicate save
 *      4. Build final result
 *      5. Build canonical backend payload
 *      6. CTM_API.saveDiscovery()
 *      7. Persist Page 03 handoff
 *      8. Lock duplicate submission
 *      9. Navigate to Page 03
 *
 * =============================================================================
 */


Page02.completeScorecard = async function(){

    /* -------------------------------------------------------------------------
     * COMPLETE VALIDATION
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.isScorecardComplete()
    ){

        Page02.setStatusMessage(
            'Please complete all 25 indicators before viewing your result.',
            'error'
        );


        Page02.focusFirstUnanswered();


        return false;

    }


    /* -------------------------------------------------------------------------
     * CLIENT ID VALIDATION
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.state.clientId
    ){

        console.error(
            'CTM PATH™ client ID missing before discovery save.'
        );


        Page02.setStatusMessage(
            'Your registration session could not be found. Please register again.',
            'error'
        );


        return false;

    }


    /* -------------------------------------------------------------------------
     * DUPLICATE SUBMISSION GUARD
     * -------------------------------------------------------------------------
     */


    if(
        Page02.state.isSaving
    ){

        return false;

    }


    if(
        Page02.hasAlreadySaved()
    ){

        console.warn(
            'CTM PATH™ discovery was already saved for:',
            Page02.state.clientId
        );


        /*
         * If the result handoff still exists, simply continue.
         */


        try{

            const storedResult =
                sessionStorage.getItem(
                    'CTM_PATH_MILLIONAIRE_RESULT'
                );


            if(storedResult){

                Page02.goToPage03();


                return true;

            }

        }

        catch(error){

            console.warn(
                error
            );

        }


        Page02.setStatusMessage(
            'Your scorecard has already been submitted.',
            'success'
        );


        return true;

    }


    /* -------------------------------------------------------------------------
     * API VALIDATION
     * -------------------------------------------------------------------------
     */


    if(
        !window.CTM_API ||
        typeof window.CTM_API.saveDiscovery !==
        'function'
    ){

        console.error(
            'CTM PATH™ CTM_API.saveDiscovery() is unavailable.'
        );


        Page02.setStatusMessage(
            'The scorecard saving service is temporarily unavailable. Please try again.',
            'error'
        );


        return false;

    }


    /* -------------------------------------------------------------------------
     * BUILD PAYLOAD
     * -------------------------------------------------------------------------
     */


    const payload =
        Page02.buildDiscoveryPayload();


    console.log(
        'CTM PATH™ Discovery Payload:',
        payload
    );


    /* -------------------------------------------------------------------------
     * BEGIN SAVE
     * -------------------------------------------------------------------------
     */


    Page02.state.isSaving =
        true;


    Page02.setSaveBusy(
        true
    );


    Page02.setStatusMessage(
        'Calculating and saving your Millionaire Lifestyle Score™...',
        'loading'
    );


    try{

        const response =
            await window.CTM_API.saveDiscovery(
                payload
            );


        console.log(
            'CTM PATH™ discovery save response:',
            response
        );


        /* ---------------------------------------------------------------------
         * EXPLICIT BACKEND FAILURE
         * ---------------------------------------------------------------------
         */


        if(
            response &&
            response.success === false
        ){

            throw new Error(
                response.message ||
                'Unable to save your scorecard.'
            );

        }


        /* ---------------------------------------------------------------------
         * STORE RESULT
         * ---------------------------------------------------------------------
         */


        Page02.state.result =
            Page02.buildResult();


        Page02.state.discoveryResponse =
            response;


        Page02.storeResultForPage03(
            payload,
            response
        );


        /* ---------------------------------------------------------------------
         * LOCK SUCCESSFUL SAVE
         * ---------------------------------------------------------------------
         */


        Page02.markAsSaved();


        Page02.clearWorkingSession();


        /* ---------------------------------------------------------------------
         * SUCCESS
         * ---------------------------------------------------------------------
         */


        Page02.setStatusMessage(
            'Your Millionaire Lifestyle Score™ is ready.',
            'success'
        );


        /* ---------------------------------------------------------------------
         * PAGE 03
         * ---------------------------------------------------------------------
         */


        Page02.goToPage03();


        return true;

    }


    catch(error){

        console.error(
            'CTM PATH™ discovery save failed:',
            error
        );


        Page02.setStatusMessage(
            error &&
            error.message
                ? error.message
                : 'We could not save your scorecard. Your answers are preserved. Please try again.',
            'error'
        );


        /*
         * Keep the working session intact.
         *
         * The user must NOT lose 25 completed answers
         * because of a temporary backend failure.
         */


        Page02.persistSession();


        return false;

    }


    finally{

        Page02.state.isSaving =
            false;


        Page02.setSaveBusy(
            false
        );

    }

};



/* =============================================================================
 * RESULT DEBUGGER
 * =============================================================================
 *
 * Development helper.
 *
 * Browser console:
 *
 *      Page02.debugResult()
 *
 * =============================================================================
 */


Page02.debugResult = function(){

    const result =
        Page02.buildResult();


    console.table(
        result.dimensions
    );


    console.table(
        result.indicators
    );


    console.log(
        'TOTAL SCORE:',
        result.totalScore,
        '/ 100'
    );


    console.log(
        'PERCENTAGE:',
        result.percentage + '%'
    );


    console.log(
        'MILLIONAIRE GAP™:',
        result.millionaireGap
    );


    console.log(
        'RESULT BAND:',
        result.resultBand
    );


    return result;

};



/* =============================================================================
 * PAYLOAD DEBUGGER
 * =============================================================================
 *
 * Browser console:
 *
 *      Page02.debugPayload()
 *
 * =============================================================================
 */


Page02.debugPayload = function(){

    const payload =
        Page02.buildDiscoveryPayload();


    console.log(
        'CTM PATH™ FINAL DISCOVERY PAYLOAD'
    );


    console.log(
        payload
    );


    return payload;

};



/* =============================================================================
 * END OF BATCH 4
 *
 * COMPLETE:
 *
 *      ✓ 25-indicator completion validation
 *      ✓ Maximum score = 100
 *      ✓ Total score calculation
 *      ✓ Percentage calculation
 *      ✓ Millionaire Gap™ calculation
 *      ✓ Five dimension calculations
 *      ✓ Dimension percentages
 *      ✓ Dimension gaps
 *      ✓ Result band
 *      ✓ Complete indicator result objects
 *      ✓ Canonical discovery payload
 *      ✓ Existing CTM_API.saveDiscovery() integration
 *      ✓ Client ID preservation
 *      ✓ Duplicate-save protection
 *      ✓ Backend error handling
 *      ✓ Answers preserved on save failure
 *      ✓ Page 03 result handoff
 *      ✓ Page 03 navigation
 *
 *
 * NEXT — BATCH 5:
 *
 *      → Page02 initialization
 *      → DOMContentLoaded boot
 *      → State initialization
 *      → Existing-session recovery
 *      → Header journey identity
 *      → Global event delegation
 *      → Initial screen decision
 *      → Production guards
 *      → Final closing architecture
 *
 * =============================================================================
 */

/* =============================================================================
 * BATCH 5
 *
 * INITIALIZATION
 * DOM BOOT
 * SESSION RECOVERY
 * HEADER JOURNEY IDENTITY
 * PRODUCTION GUARDS
 * FINAL PUBLIC INTERFACE
 * =============================================================================
 */


/* =============================================================================
 * VERSION
 * =============================================================================
 */


Page02.version =
    '2.1';



/* =============================================================================
 * INITIAL STATE FLAGS
 * =============================================================================
 */


Page02.state.clientId =
    Page02.state.clientId || null;


Page02.state.registrationResponse =
    null;


Page02.state.discoveryResponse =
    null;


Page02.state.isRegistering =
    false;


Page02.state.isSaving =
    false;


Page02.state.initialized =
    false;



/* =============================================================================
 * UPDATE GLOBAL JOURNEY HEADER
 * =============================================================================
 *
 * Shared header.html provides:
 *
 *      #journey-title
 *      #journey-counter
 *
 * Page 02 updates only the dynamic journey information.
 *
 * =============================================================================
 */


Page02.updateJourneyHeader = function(){

    const title =
        document.getElementById(
            'journey-title'
        );


    const counter =
        document.getElementById(
            'journey-counter'
        );


    if(title){

        title.textContent =
            'MILLIONAIRE JOURNEY™';

    }


    if(counter){

        counter.textContent =
            '02 / 07';

    }

};



/* =============================================================================
 * WAIT FOR SHARED HEADER
 * =============================================================================
 *
 * Pages 02–07 load the global header asynchronously through
 * component-loader.js.
 *
 * Therefore Page 02 cannot assume the shared header DOM already
 * exists when page02.js initializes.
 *
 * =============================================================================
 */


Page02.initializeJourneyHeader = function(){

    Page02.updateJourneyHeader();


    /*
     * If the component loader has not injected the header yet,
     * watch briefly for the shared component.
     */


    if(
        document.getElementById(
            'journey-counter'
        )
    ){

        return;

    }


    if(
        typeof MutationObserver ===
        'undefined'
    ){

        return;

    }


    const observer =
        new MutationObserver(
            function(){

                const counter =
                    document.getElementById(
                        'journey-counter'
                    );


                if(!counter){

                    return;

                }


                Page02.updateJourneyHeader();


                observer.disconnect();

            }
        );


    observer.observe(
        document.body,
        {

            childList:
                true,

            subtree:
                true

        }
    );


    /*
     * Production guard:
     *
     * Do not leave the observer alive indefinitely if the
     * global header fails to load.
     */


    window.setTimeout(
        function(){

            observer.disconnect();

        },
        10000
    );

};



/* =============================================================================
 * FIND SCREEN
 * =============================================================================
 */


Page02.getScreen = function(
    screenName
){

    return document.querySelector(
        '[data-page02-screen="' +
        screenName +
        '"]'
    );

};



/* =============================================================================
 * DETECT AVAILABLE SCREEN ARCHITECTURE
 * =============================================================================
 */


Page02.hasScreenArchitecture = function(){

    return Boolean(
        document.querySelector(
            '[data-page02-screen]'
        )
    );

};



/* =============================================================================
 * INITIALIZE SCREEN VISIBILITY
 * =============================================================================
 */


Page02.initializeScreens = function(){

    if(
        !Page02.hasScreenArchitecture()
    ){

        console.warn(
            'CTM PATH™ Page 02 screen architecture was not found.'
        );


        return false;

    }


    const intro =
        Page02.getScreen(
            Page02.SCREENS.INTRO
        );


    const kyc =
        Page02.getScreen(
            Page02.SCREENS.KYC
        );


    const scorecard =
        Page02.getScreen(
            Page02.SCREENS.SCORECARD
        );


    if(!intro){

        console.warn(
            'CTM PATH™ Page 02 intro screen is missing.'
        );

    }


    if(!kyc){

        console.warn(
            'CTM PATH™ Page 02 KYC screen is missing.'
        );

    }


    if(!scorecard){

        console.warn(
            'CTM PATH™ Page 02 scorecard screen is missing.'
        );

    }


    return true;

};



/* =============================================================================
 * RESTORE KYC FIELDS
 * =============================================================================
 */


Page02.restoreKYCFields = function(){

    const data =
        Page02.state.kyc;


    if(
        !data ||
        typeof data !==
        'object'
    ){

        return;

    }


    const fields = {

        fullName:
            data.fullName,

        mobile:
            data.mobile,

        email:
            data.email,

        district:
            data.district,

        state:
            data.state,

        source:
            data.source,

        language:
            data.language

    };


    Object.keys(
        fields
    )
    .forEach(
        function(name){

            const value =
                fields[name];


            if(
                value === null ||
                value === undefined ||
                value === ''
            ){

                return;

            }


            const element =
                document.getElementById(
                    name
                ) ||
                document.querySelector(
                    '[name="' +
                    name +
                    '"]'
                );


            if(!element){

                return;

            }


            /*
             * Never overwrite something the browser or user
             * has already populated.
             */


            if(
                String(
                    element.value || ''
                ).trim()
            ){

                return;

            }


            element.value =
                value;

        }
    );

};



/* =============================================================================
 * RESTORE REGISTERED NAME
 * =============================================================================
 *
 * Optional Page 02 elements may use:
 *
 *      [data-client-name]
 *
 * This is presentation only.
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


    document
        .querySelectorAll(
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
 * UPDATE DIMENSION PROGRESS
 * =============================================================================
 */


Page02.updateDimensionProgress = function(){

    const current =
        Page02.state.currentDimension;


    const total =
        Page02.DIMENSIONS.length;


    const currentNumber =
        current + 1;


    const progress =
        Math.round(
            (
                currentNumber /
                total
            ) *
            100
        );


    const currentElement =
        Page02.el(
            'current-dimension'
        );


    if(currentElement){

        currentElement.textContent =
            String(
                currentNumber
            )
            .padStart(
                2,
                '0'
            );

    }


    const totalElement =
        Page02.el(
            'total-dimensions'
        );


    if(totalElement){

        totalElement.textContent =
            String(total)
            .padStart(
                2,
                '0'
            );

    }


    const bar =
        Page02.el(
            'dimension-progress-bar'
        ) ||
        document.querySelector(
            '[data-dimension-progress-bar]'
        );


    if(bar){

        bar.style.width =
            progress + '%';


        bar.setAttribute(
            'aria-valuenow',
            String(progress)
        );


        bar.setAttribute(
            'aria-valuemin',
            '0'
        );


        bar.setAttribute(
            'aria-valuemax',
            '100'
        );

    }

};



/* =============================================================================
 * EXTEND DIMENSION RENDER
 * =============================================================================
 *
 * Batch 2 owns the canonical renderDimension().
 *
 * We wrap it once here so the progress and client identity
 * are refreshed after every dimension render.
 *
 * =============================================================================
 */


Page02.installRenderEnhancement = function(){

    if(
        Page02._renderEnhancementInstalled
    ){

        return;

    }


    if(
        typeof Page02.renderDimension !==
        'function'
    ){

        return;

    }


    const originalRenderDimension =
        Page02.renderDimension;


    Page02.renderDimension =
        function(index){

            const result =
                originalRenderDimension.call(
                    Page02,
                    index
                );


            Page02.updateDimensionProgress();


            Page02.updateClientName();


            Page02.persistSession();


            return result;

        };


    Page02._renderEnhancementInstalled =
        true;

};



/* =============================================================================
 * VALIDATE SCORECARD MASTER
 * =============================================================================
 *
 * Production integrity guard.
 *
 * Required:
 *
 *      5 dimensions
 *      5 indicators per dimension
 *      25 indicators total
 *      4 options per indicator
 *      scores 1,2,3,4 exactly once
 *
 * =============================================================================
 */


Page02.validateMaster = function(){

    const errors =
        [];


    if(
        !Array.isArray(
            Page02.DIMENSIONS
        )
    ){

        errors.push(
            'DIMENSIONS must be an array.'
        );


        return {

            valid:
                false,

            errors:
                errors

        };

    }


    if(
        Page02.DIMENSIONS.length !==
        5
    ){

        errors.push(
            'Expected 5 dimensions; found ' +
            Page02.DIMENSIONS.length +
            '.'
        );

    }


    const ids =
        new Set();


    let indicatorCount =
        0;


    Page02.DIMENSIONS.forEach(
        function(dimension, dimensionIndex){

            if(
                !Array.isArray(
                    dimension.indicators
                )
            ){

                errors.push(
                    'Dimension ' +
                    (
                        dimensionIndex + 1
                    ) +
                    ' has no indicators array.'
                );


                return;

            }


            if(
                dimension.indicators.length !==
                5
            ){

                errors.push(
                    'Dimension ' +
                    (
                        dimensionIndex + 1
                    ) +
                    ' must contain exactly 5 indicators.'
                );

            }


            dimension.indicators.forEach(
                function(indicator){

                    indicatorCount +=
                        1;


                    if(!indicator.id){

                        errors.push(
                            'Indicator without ID found.'
                        );

                    }

                    else if(
                        ids.has(
                            indicator.id
                        )
                    ){

                        errors.push(
                            'Duplicate indicator ID: ' +
                            indicator.id
                        );

                    }

                    else{

                        ids.add(
                            indicator.id
                        );

                    }


                    if(
                        !Array.isArray(
                            indicator.options
                        ) ||
                        indicator.options.length !==
                        4
                    ){

                        errors.push(
                            'Indicator ' +
                            indicator.id +
                            ' must contain exactly four options.'
                        );


                        return;

                    }


                    const scores =
                        indicator.options
                            .map(
                                function(option){

                                    return Number(
                                        option.score
                                    );

                                }
                            )
                            .sort(
                                function(a, b){

                                    return a - b;

                                }
                            );


                    const validScores =
                        (
                            scores.length === 4 &&
                            scores[0] === 1 &&
                            scores[1] === 2 &&
                            scores[2] === 3 &&
                            scores[3] === 4
                        );


                    if(!validScores){

                        errors.push(
                            'Indicator ' +
                            indicator.id +
                            ' must contain scores 1, 2, 3 and 4.'
                        );

                    }

                }
            );

        }
    );


    if(
        indicatorCount !==
        25
    ){

        errors.push(
            'Expected 25 indicators; found ' +
            indicatorCount +
            '.'
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
 * LOG MASTER VALIDATION
 * =============================================================================
 */


Page02.runMasterValidation = function(){

    const validation =
        Page02.validateMaster();


    if(validation.valid){

        console.log(
            'CTM PATH™ Page 02 master validated: ' +
            '5 dimensions × 5 indicators × 4 options.'
        );


        return true;

    }


    console.error(
        'CTM PATH™ Page 02 master validation failed:',
        validation.errors
    );


    return false;

};



/* =============================================================================
 * PROTECT AGAINST ACCIDENTAL DOUBLE INITIALIZATION
 * =============================================================================
 */


Page02.canInitialize = function(){

    if(
        Page02.state.initialized
    ){

        console.warn(
            'CTM PATH™ Page 02 is already initialized.'
        );


        return false;

    }


    return true;

};



/* =============================================================================
 * INITIAL SCREEN DECISION
 * =============================================================================
 *
 * New visitor:
 *
 *      INTRO
 *
 * Registered session:
 *
 *      SCORECARD at last active dimension
 *
 * =============================================================================
 */


Page02.selectInitialScreen = function(){

    const restored =
        Page02.restoreSession();


    if(
        restored &&
        Page02.state.clientId
    ){

        Page02.restoreKYCFields();


        Page02.updateClientName();


        Page02.showScreen(
            Page02.SCREENS.SCORECARD
        );


        Page02.renderDimension(
            Page02.state.currentDimension
        );


        return;

    }


    Page02.showScreen(
        Page02.SCREENS.INTRO
    );

};



/* =============================================================================
 * FORM INPUT CLEANUP
 * =============================================================================
 */


Page02.bindFieldCleanup = function(){

    const fields = [

        'fullName',

        'mobile',

        'email',

        'district',

        'state'

    ];


    fields.forEach(
        function(name){

            const field =
                document.getElementById(
                    name
                ) ||
                document.querySelector(
                    '[name="' +
                    name +
                    '"]'
                );


            if(!field){

                return;

            }


            field.addEventListener(
                'input',
                function(){

                    Page02.setFieldError(
                        name,
                        ''
                    );


                    Page02.setStatusMessage(
                        ''
                    );

                }
            );

        }
    );

};



/* =============================================================================
 * MOBILE NUMBER INPUT GUARD
 * =============================================================================
 */


Page02.bindMobileGuard = function(){

    const mobile =
        document.getElementById(
            'mobile'
        ) ||
        document.querySelector(
            '[name="mobile"]'
        );


    if(!mobile){

        return;

    }


    mobile.setAttribute(
        'inputmode',
        'numeric'
    );


    mobile.setAttribute(
        'autocomplete',
        'tel'
    );


    mobile.addEventListener(
        'input',
        function(){

            const cleaned =
                String(
                    mobile.value || ''
                )
                .replace(
                    /\D/g,
                    ''
                )
                .slice(
                    0,
                    10
                );


            if(
                mobile.value !==
                cleaned
            ){

                mobile.value =
                    cleaned;

            }

        }
    );

};



/* =============================================================================
 * EMAIL INPUT GUARD
 * =============================================================================
 */


Page02.bindEmailGuard = function(){

    const email =
        document.getElementById(
            'email'
        ) ||
        document.querySelector(
            '[name="email"]'
        );


    if(!email){

        return;

    }


    email.setAttribute(
        'inputmode',
        'email'
    );


    email.setAttribute(
        'autocomplete',
        'email'
    );

};



/* =============================================================================
 * NAME INPUT GUARD
 * =============================================================================
 */


Page02.bindNameGuard = function(){

    const name =
        document.getElementById(
            'fullName'
        ) ||
        document.querySelector(
            '[name="fullName"]'
        );


    if(!name){

        return;

    }


    name.setAttribute(
        'autocomplete',
        'name'
    );

};



/* =============================================================================
 * PAGE VISIBILITY SAVE
 * =============================================================================
 *
 * If the browser tab is hidden while the participant is
 * answering the scorecard, preserve current progress.
 *
 * =============================================================================
 */


Page02.bindVisibilityPersistence = function(){

    document.addEventListener(
        'visibilitychange',
        function(){

            if(
                document.visibilityState ===
                'hidden' &&
                Page02.state.clientId
            ){

                Page02.persistSession();

            }

        }
    );


    window.addEventListener(
        'pagehide',
        function(){

            if(
                Page02.state.clientId
            ){

                Page02.persistSession();

            }

        }
    );

};



/* =============================================================================
 * PREVENT ENTER FROM ACCIDENTALLY RELOADING KYC
 * =============================================================================
 */


Page02.bindFormProtection = function(){

    document
        .querySelectorAll(
            'form'
        )
        .forEach(
            function(form){

                if(
                    form.dataset.page02Protected ===
                    'true'
                ){

                    return;

                }


                form.dataset.page02Protected =
                    'true';


                form.addEventListener(
                    'submit',
                    function(event){

                        /*
                         * The actual KYC form is already handled by
                         * bindControls().
                         *
                         * Other forms on Page 02 must not trigger
                         * browser navigation.
                         */


                        const isKYC =
                            (
                                form.id ===
                                'kyc-form'
                            ) ||
                            form.hasAttribute(
                                'data-page02-kyc-form'
                            );


                        if(!isKYC){

                            event.preventDefault();

                        }

                    }
                );

            }
        );

};



/* =============================================================================
 * GLOBAL ERROR GUARD
 * =============================================================================
 *
 * Does not replace normal try/catch.
 *
 * This gives Page 02-specific console context if an unexpected
 * frontend error escapes.
 *
 * =============================================================================
 */


Page02.bindErrorGuard = function(){

    window.addEventListener(
        'error',
        function(event){

            if(
                !event ||
                !event.error
            ){

                return;

            }


            console.error(
                'CTM PATH™ Page 02 unexpected frontend error:',
                event.error
            );

        }
    );


    window.addEventListener(
        'unhandledrejection',
        function(event){

            console.error(
                'CTM PATH™ Page 02 unhandled promise rejection:',
                event.reason
            );

        }
    );

};



/* =============================================================================
 * INITIALIZE SCORE EXPLANATION
 * =============================================================================
 */


Page02.initializeScoreExplanation = function(){

    if(
        typeof Page02.renderScoreExplanation ===
        'function'
    ){

        Page02.renderScoreExplanation();

    }

};



/* =============================================================================
 * PAGE INITIALIZATION
 * =============================================================================
 */


Page02.init = function(){

    /* -------------------------------------------------------------------------
     * DOUBLE-BOOT GUARD
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.canInitialize()
    ){

        return false;

    }


    console.log(
        'CTM PATH™ Page 02 v' +
        Page02.version +
        ' initializing...'
    );


    /* -------------------------------------------------------------------------
     * MASTER DATA VALIDATION
     * -------------------------------------------------------------------------
     */


    if(
        !Page02.runMasterValidation()
    ){

        Page02.setStatusMessage(
            'The Millionaire Lifestyle Scorecard™ could not be initialized.',
            'error'
        );


        return false;

    }


    /* -------------------------------------------------------------------------
     * SCREEN ARCHITECTURE
     * -------------------------------------------------------------------------
     */


    Page02.initializeScreens();


    /* -------------------------------------------------------------------------
     * RENDER EXTENSIONS
     * -------------------------------------------------------------------------
     */


    Page02.installRenderEnhancement();


    /* -------------------------------------------------------------------------
     * GLOBAL HEADER
     * -------------------------------------------------------------------------
     */


    Page02.initializeJourneyHeader();


    /* -------------------------------------------------------------------------
     * SCORE EXPLANATION
     * -------------------------------------------------------------------------
     */


    Page02.initializeScoreExplanation();


    /* -------------------------------------------------------------------------
     * PAGE CONTROLS
     * -------------------------------------------------------------------------
     */


    Page02.bindControls();


    Page02.bindFieldCleanup();


    Page02.bindMobileGuard();


    Page02.bindEmailGuard();


    Page02.bindNameGuard();


    Page02.bindVisibilityPersistence();


    Page02.bindFormProtection();


    Page02.bindErrorGuard();


    /* -------------------------------------------------------------------------
     * INITIAL SCREEN
     * -------------------------------------------------------------------------
     */


    Page02.selectInitialScreen();


    /* -------------------------------------------------------------------------
     * INITIAL LIVE SCORE
     * -------------------------------------------------------------------------
     */


    Page02.updateLiveScore();


    Page02.updateDimensionProgress();


    /* -------------------------------------------------------------------------
     * COMPLETE
     * -------------------------------------------------------------------------
     */


    Page02.state.initialized =
        true;


    console.log(
        'CTM PATH™ Page 02 v' +
        Page02.version +
        ' ready.'
    );


    return true;

};



/* =============================================================================
 * PUBLIC DEBUG INFORMATION
 * =============================================================================
 */


Page02.info = function(){

    const validation =
        Page02.validateMaster();


    return {

        application:
            'CTM PATH™ MILLIONAIRES™',

        experience:
            'Guided Journey™',

        page:
            '02 / 07',

        module:
            'Middle Class → Millionaire Lifestyle Scorecard™',

        version:
            Page02.version,

        dimensions:
            Page02.DIMENSIONS.length,

        indicators:
            Page02.getAllIndicators().length,

        optionsPerIndicator:
            4,

        maximumScore:
            Page02.getMaximumScore(),

        answered:
            Page02.getAnsweredCount(),

        currentScore:
            Page02.calculateTotalScore(),

        clientId:
            Page02.state.clientId,

        currentDimension:
            Page02.state.currentDimension,

        initialized:
            Page02.state.initialized,

        masterValid:
            validation.valid,

        masterErrors:
            validation.errors

    };

};



/* =============================================================================
 * RESET PAGE 02 SESSION
 * =============================================================================
 *
 * Development / QA helper.
 *
 * Browser console:
 *
 *      Page02.reset()
 *
 * This does NOT delete anything already saved in the backend.
 *
 * =============================================================================
 */


Page02.reset = function(){

    try{

        sessionStorage.removeItem(
            'CTM_PATH_PAGE02'
        );


        sessionStorage.removeItem(
            'CTM_PATH_MILLIONAIRE_RESULT'
        );


        if(
            Page02.state.clientId
        ){

            sessionStorage.removeItem(
                Page02.getSaveLockKey()
            );

        }

    }


    catch(error){

        console.warn(
            'CTM PATH™ Page 02 session reset warning:',
            error
        );

    }


    window.location.reload();

};



/* =============================================================================
 * DOM READY BOOT
 * =============================================================================
 */


function initializePage02(){

    try{

        Page02.init();

    }


    catch(error){

        console.error(
            'CTM PATH™ Page 02 initialization failed:',
            error
        );


        Page02.setStatusMessage(
            'The Millionaire Lifestyle Scorecard™ could not be loaded. Please refresh the page.',
            'error'
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
 * PUBLIC NAMESPACE
 * =============================================================================
 *
 * Available for:
 *
 *      QA
 *      Browser console inspection
 *      Future Page 02 controller extensions
 *
 * =============================================================================
 */


window.Page02 =
    Page02;



/* =============================================================================
 * CTM PATH™ PAGE 02 v2.1
 * =============================================================================
 *
 * FINAL ARCHITECTURE
 *
 *      PAGE 02
 *
 *          INTRO
 *            ↓
 *
 *          KYC
 *            ↓
 *
 *      CTM_API.register()
 *            ↓
 *
 *      PeopleID / Client ID
 *            ↓
 *
 *      DIMENSION 01
 *      5 indicators
 *            ↓
 *
 *      DIMENSION 02
 *      5 indicators
 *            ↓
 *
 *      DIMENSION 03
 *      5 indicators
 *            ↓
 *
 *      DIMENSION 04
 *      5 indicators
 *            ↓
 *
 *      DIMENSION 05
 *      5 indicators
 *            ↓
 *
 *      25 INDICATORS COMPLETE
 *            ↓
 *
 *      FINAL SCORE / 100
 *            ↓
 *
 *      MILLIONAIRE GAP™
 *            ↓
 *
 *      CTM_API.saveDiscovery()
 *            ↓
 *
 *      PAGE 03
 *
 *
 * SCORING
 *
 *      OPTION 1 = 1 POINT
 *      OPTION 2 = 2 POINTS
 *      OPTION 3 = 3 POINTS
 *      OPTION 4 = 4 POINTS
 *
 *      25 × 4 = 100
 *
 *
 * USER EXPERIENCE
 *
 *      ✓ No free-text financial answers
 *      ✓ Exactly four controlled choices
 *      ✓ 2 × 2 option architecture on desktop
 *      ✓ Single-column option architecture supported on mobile
 *      ✓ Visible score after selection
 *      ✓ Five indicators per dimension
 *      ✓ Cannot skip unanswered indicators
 *      ✓ Progress preserved during the session
 *      ✓ Backend failure does not destroy completed answers
 *      ✓ Duplicate final submission protected
 *
 *
 * BACKEND OWNERSHIP
 *
 *      Frontend:
 *
 *          ✓ Capture
 *          ✓ Controlled selection
 *          ✓ Presentation score
 *          ✓ Payload assembly
 *
 *      Backend:
 *
 *          ✓ Persistence
 *          ✓ Authoritative processing
 *          ✓ Diagnosis
 *          ✓ Roadmap
 *          ✓ Report generation
 *
 *
 * =============================================================================
 * END OF FILE
 * =============================================================================
 */

