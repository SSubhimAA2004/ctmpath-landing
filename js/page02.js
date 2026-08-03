
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * Frontend v2.0
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
 *      • Render five selectable ranges for every indicator
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
 *      0 = Starting
 *      1 = Emerging
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
 *      Every indicator presents five controlled ranges.
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
 * SCORECARD MASTER
 * =============================================================================
 *
 * 25 indicators
 * 5 dimensions
 * 5 indicators per dimension
 *
 * Every indicator contains exactly five selectable ranges.
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
                        0,
                        '₹0 – ₹2.49 Cr',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹2.5 Cr – ₹4.99 Cr',
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
                        0,
                        '₹0 – ₹49 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹50 Lakh – ₹99 Lakh',
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
                        0,
                        '₹0 – ₹12.49 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹12.5 – ₹24.99 Lakh',
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
                        0,
                        '₹10 Lakh+',
                        1000001
                    ),

                    Page02.option(
                        1,
                        '₹5.01 – ₹10 Lakh',
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
                        0,
                        '0 – 249 grams',
                        0
                    ),

                    Page02.option(
                        1,
                        '250 – 499 grams',
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
                        0,
                        '₹0 – ₹24.99 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹25 – ₹49.99 Lakh',
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
                        0,
                        '₹0 – ₹2.49 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹2.5 – ₹4.99 Lakh',
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
                        0,
                        '₹0 – ₹1.24 Lakh / month',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹1.25 – ₹2.49 Lakh / month',
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
                        0,
                        '₹0 – ₹6.24 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹6.25 – ₹12.49 Lakh',
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
                        0,
                        'None',
                        0
                    ),

                    Page02.option(
                        1,
                        'Planning / acquiring first property',
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
                        0,
                        'No land',
                        0
                    ),

                    Page02.option(
                        1,
                        'Up to 2.49 acres',
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
                        0,
                        'No owned home / ₹0 – ₹49 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹50 – ₹99 Lakh',
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
                        0,
                        'No car / below ₹25 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹25 – ₹49.99 Lakh',
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
                        0,
                        'No dedicated fund / below ₹12.5 Lakh per child',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹12.5 – ₹24.99 Lakh per child',
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
                        0,
                        'No paid household support',
                        0
                    ),

                    Page02.option(
                        1,
                        'Occasional paid help',
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
                        0,
                        'No international travel',
                        0
                    ),

                    Page02.option(
                        1,
                        '1 – 2 trips / year',
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
                        0,
                        'None',
                        0
                    ),

                    Page02.option(
                        1,
                        'Occasional / once in several years',
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
                        0,
                        'Rarely / never use premium accommodation',
                        0
                    ),

                    Page02.option(
                        1,
                        'About 25% of travel',
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
                    '6+ business-class/year',

                target:
                    6,

                options: [

                    Page02.option(
                        0,
                        'No business-class travel',
                        0
                    ),

                    Page02.option(
                        1,
                        '1 business-class flight / year',
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
                        0,
                        '0 – 7 discretionary days / year',
                        0
                    ),

                    Page02.option(
                        1,
                        '8 – 14 days / year',
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
                        0,
                        '₹0 – ₹49,999 / year',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹50,000 – ₹99,999 / year',
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
                        0,
                        '₹0 – ₹1.24 Lakh / year',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹1.25 – ₹2.49 Lakh / year',
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
                        0,
                        'No cover / below ₹1.25 Cr',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹1.25 – ₹2.49 Cr',
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
                        0,
                        'No cover / below ₹12.5 Lakh',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹12.5 – ₹24.99 Lakh',
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
                        0,
                        '₹0 – ₹2.49 Lakh / year',
                        0
                    ),

                    Page02.option(
                        1,
                        '₹2.5 – ₹4.99 Lakh / year',
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
 * DOM HELPERS
 * =============================================================================
 */


Page02.$ = function(selector){

    return document.querySelector(
        selector
    );

};


Page02.$$ = function(selector){

    return Array.from(
        document.querySelectorAll(
            selector
        )
    );

};


/* =============================================================================
 * HTML ESCAPE
 * =============================================================================
 */


Page02.escapeHtml = function(value){

    return String(
        value ?? ''
    )

        .replaceAll(
            '&',
            '&amp;'
        )

        .replaceAll(
            '<',
            '&lt;'
        )

        .replaceAll(
            '>',
            '&gt;'
        )

        .replaceAll(
            '"',
            '&quot;'
        )

        .replaceAll(
            "'",
            '&#039;'
        );

};


/* =============================================================================
 * NUMBER HELPER
 * =============================================================================
 */


Page02.toNumber = function(value){

    const number =
        Number(value);

    return Number.isFinite(number)
        ? number
        : 0;

};


/* =============================================================================
 * SCREEN CONTROL
 * =============================================================================
 */


Page02.showScreen = function(screenName){

    Page02.$$('.screen').forEach(

        function(screen){

            screen.classList.toggle(

                'is-active',

                screen.dataset.screen ===
                    screenName

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
 * LOADING STATE
 * =============================================================================
 */


Page02.setLoading = function(isLoading){

    const overlay =
        Page02.$(
            '#loadingOverlay'
        );


    if(!overlay){

        return;

    }


    overlay.hidden =
        !isLoading;

};


/* =============================================================================
 * ERROR HELPERS
 * =============================================================================
 */


Page02.setError = function(
    target,
    message
){

    const element =
        Page02.$(
            target
        );


    if(element){

        element.textContent =
            message || '';

    }

};


/* =============================================================================
 * API ADAPTER
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
        typeof CTM_API[action] !==
            'function'
    ){

        throw new Error(

            'CTM PATH™ API action is unavailable: ' +
            action

        );

    }


    return CTM_API[action](
        payload
    );

};


/* =============================================================================
 * RESPONSE UNWRAP
 * =============================================================================
 */


Page02.unwrapResponse = function(response){

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
 * INTRO
 * =============================================================================
 */


Page02.bindIntro = function(){

    Page02
        .$$('[data-next]')
        .forEach(

            function(button){

                button.addEventListener(

                    'click',

                    function(){

                        const next =
                            button.dataset.next;


                        if(next){

                            Page02.showScreen(
                                next
                            );

                        }

                    }

                );

            }

        );

};


/* =============================================================================
 * KYC SERIALIZATION
 * =============================================================================
 */


Page02.serializeKyc = function(form){

    const data =
        new FormData(form);


    return {

        fullName:
            String(
                data.get('fullName') || ''
            ).trim(),

        mobileNumber:
            String(
                data.get('mobileNumber') || ''
            ).trim(),

        emailAddress:
            String(
                data.get('emailAddress') || ''
            ).trim(),

        age:
            Page02.toNumber(
                data.get('age')
            ),

        gender:
            String(
                data.get('gender') || ''
            ).trim(),

        occupation:
            String(
                data.get('occupation') || ''
            ).trim(),

        employerBusiness:
            String(
                data.get('employerBusiness') || ''
            ).trim(),

        maritalStatus:
            String(
                data.get('maritalStatus') || ''
            ).trim(),

        dependents:
            String(
                data.get('dependents') || ''
            ).trim(),

        city:
            String(
                data.get('city') || ''
            ).trim(),

        district:
            String(
                data.get('district') || ''
            ).trim(),

        state:
            String(
                data.get('state') || ''
            ).trim(),

        country:
            String(
                data.get('country') || 'India'
            ).trim(),

        pincode:
            String(
                data.get('pincode') || ''
            ).trim(),

        preferredLanguage:
            String(
                data.get('preferredLanguage') || ''
            ).trim(),

        referralSource:
            String(
                data.get('referralSource') || ''
            ).trim()

    };

};


/* =============================================================================
 * KYC VALIDATION
 * =============================================================================
 */


Page02.validateKyc = function(
    form,
    payload
){

    Page02.setError(
        '#kycError',
        ''
    );


    if(
        !form.checkValidity()
    ){

        form.reportValidity();

        return false;

    }


    if(
        !/^[0-9]{10}$/.test(
            payload.mobileNumber
        )
    ){

        Page02.setError(

            '#kycError',

            'Please enter a valid 10-digit mobile number.'

        );

        return false;

    }


    if(
        !/^[0-9]{6}$/.test(
            payload.pincode
        )
    ){

        Page02.setError(

            '#kycError',

            'Please enter a valid 6-digit pincode.'

        );

        return false;

    }


    return true;

};


/* =============================================================================
 * PEOPLE ID EXTRACTION
 * =============================================================================
 */


Page02.extractPeopleId = function(data){

    if(!data){

        return null;

    }


    return (

        data.peopleId ||

        data.PeopleID ||

        data.personId ||

        data.id ||

        null

    );

};


/* =============================================================================
 * KYC SUBMISSION
 * =============================================================================
 */


Page02.handleKycSubmit = async function(event){

    event.preventDefault();


    if(
        Page02.state.saving
    ){

        return;

    }


    const form =
        event.currentTarget;


    const payload =
        Page02.serializeKyc(
            form
        );


    if(
        !Page02.validateKyc(
            form,
            payload
        )
    ){

        return;

    }


    Page02.state.saving =
        true;


    Page02.setError(
        '#kycError',
        ''
    );


    Page02.setLoading(
        true
    );


    try{

        const response =

            await Page02.api(

                'register',

                payload

            );


        const data =

            Page02.unwrapResponse(
                response
            );


        const peopleId =

            Page02.extractPeopleId(
                data
            );


        if(!peopleId){

            throw new Error(
                'Registration succeeded but PeopleID was not returned.'
            );

        }


        Page02.state.peopleId =
            peopleId;


        Page02.state.kyc =
            payload;


        /*
         * Fresh registration starts a fresh scorecard.
         */

        Page02.state.answers =
            {};


        try{

            sessionStorage.setItem(

                Page02.CONFIG
                    .storageKeys
                    .peopleId,

                peopleId

            );


            sessionStorage.setItem(

                Page02.CONFIG
                    .storageKeys
                    .fullName,

                payload.fullName

            );

        }

        catch(storageError){

            console.warn(

                'Session storage unavailable:',

                storageError

            );

        }


        Page02.state.currentDimension =
            0;


        Page02.renderDimensionProgress();

        Page02.renderDimension();


        Page02.showScreen(
            'scorecard'
        );

    }

    catch(error){

        console.error(

            'Page02 registration error:',

            error

        );


        Page02.setError(

            '#kycError',

            error.message ||

            'Unable to save your details. Please try again.'

        );

    }

    finally{

        Page02.state.saving =
            false;


        Page02.setLoading(
            false
        );

    }

};


/* =============================================================================
 * KYC BINDING
 * =============================================================================
 */


Page02.bindKyc = function(){

    const form =
        Page02.$(
            '#kycForm'
        );


    if(!form){

        return;

    }


    form.addEventListener(

        'submit',

        Page02.handleKycSubmit

    );


    const mobile =
        form.elements.mobileNumber;


    if(mobile){

        mobile.addEventListener(

            'input',

            function(){

                mobile.value =

                    mobile.value

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

    }


    const pincode =
        form.elements.pincode;


    if(pincode){

        pincode.addEventListener(

            'input',

            function(){

                pincode.value =

                    pincode.value

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

    }

};


/* =============================================================================
 * DIMENSION PROGRESS
 * =============================================================================
 */


Page02.renderDimensionProgress = function(){

    const host =
        Page02.$(
            '#dimensionProgress'
        );


    if(!host){

        return;

    }


    host.innerHTML =

        Page02.DIMENSIONS

            .map(

                function(
                    dimension,
                    index
                ){

                    const active =

                        index ===
                        Page02.state
                            .currentDimension;


                    const completed =

                        Page02.isDimensionComplete(
                            index
                        );


                    return `

                        <button

                            type="button"

                            class="
                                dimension-progress__item
                                ${active ? 'is-active' : ''}
                                ${completed ? 'is-complete' : ''}
                            "

                            data-dimension-index="${index}"

                            aria-label="${Page02.escapeHtml(
                                dimension.english
                            )}"

                            ${active
                                ? 'aria-current="step"'
                                : ''}

                        >

                            <span>
                                ${dimension.number}
                            </span>

                        </button>

                    `;

                }

            )

            .join('');


    host

        .querySelectorAll(
            '[data-dimension-index]'
        )

        .forEach(

            function(button){

                button.addEventListener(

                    'click',

                    function(){

                        const index =

                            Number(

                                button.dataset
                                    .dimensionIndex

                            );


                        if(
                            index <=
                            Page02.state
                                .currentDimension
                        ){

                            Page02.state
                                .currentDimension =
                                index;


                            Page02.setError(
                                '#scorecardError',
                                ''
                            );


                            Page02.renderDimensionProgress();

                            Page02.renderDimension();

                        }

                    }

                );

            }

        );

};


/* =============================================================================
 * DIMENSION COMPLETION
 * =============================================================================
 */


Page02.isDimensionComplete = function(index){

    const dimension =
        Page02.DIMENSIONS[
            index
        ];


    if(!dimension){

        return false;

    }


    return dimension.indicators.every(

        function(indicator){

            return Object.prototype
                .hasOwnProperty
                .call(

                    Page02.state.answers,

                    indicator.id

                );

        }

    );

};


/* =============================================================================
 * GET EXISTING ANSWER
 * =============================================================================
 */


Page02.getIndicatorAnswer = function(indicatorId){

    if(
        Object.prototype
            .hasOwnProperty
            .call(

                Page02.state.answers,

                indicatorId

            )
    ){

        return Page02.state
            .answers[
                indicatorId
            ];

    }


    return null;

};


/* =============================================================================
 * FIND INDICATOR
 * =============================================================================
 */


Page02.findIndicator = function(indicatorId){

    for(
        const dimension of
        Page02.DIMENSIONS
    ){

        const indicator =

            dimension.indicators.find(

                function(item){

                    return (
                        item.id ===
                        indicatorId
                    );

                }

            );


        if(indicator){

            return indicator;

        }

    }


    return null;

};


/* =============================================================================
 * FIND CURRENT DIMENSION
 * =============================================================================
 */


Page02.getCurrentDimension = function(){

    return Page02.DIMENSIONS[

        Page02.state
            .currentDimension

    ] || null;

};


/* =============================================================================
 * BUILD ANSWER FROM SELECTED RANGE
 * =============================================================================
 */


Page02.buildAnswer = function(
    dimension,
    indicator,
    option
){

    return {

        indicatorId:
            indicator.id,

        indicatorNumber:
            indicator.number,

        dimensionId:
            dimension.id,

        dimension:
            dimension.english,

        label:
            indicator.english,

        value:
            option.value,

        selectedRange:
            option.label,

        rangeLabel:
            option.label,

        ideal:
            indicator.ideal,

        target:
            indicator.target,

        score:
            option.score,

        gap:
            Math.max(
                4 -
                option.score,
                0
            )

    };

};


/* =============================================================================
 * RENDER OPTION
 * =============================================================================
 */


Page02.renderOption = function(
    indicator,
    option,
    selectedAnswer
){

    const selected =

        selectedAnswer &&

        Number(
            selectedAnswer.score
        ) ===
            Number(
                option.score
            );


    return `

        <button

            type="button"

            class="
                indicator-option
                ${selected ? 'is-selected' : ''}
            "

            data-indicator-option="${Page02.escapeHtml(
                indicator.id
            )}"

            data-option-score="${option.score}"

            aria-pressed="${selected ? 'true' : 'false'}"

        >

            <span class="indicator-option__radio">

                <span></span>

            </span>


            <span class="indicator-option__label">

                ${Page02.escapeHtml(
                    option.label
                )}

            </span>


            <span class="indicator-option__score">

                ${option.score}

            </span>

        </button>

    `;

};


/* =============================================================================
 * INDICATOR CARD
 * =============================================================================
 */


Page02.renderIndicator = function(indicator){

    const selectedAnswer =

        Page02.getIndicatorAnswer(
            indicator.id
        );


    const scoreText =

        selectedAnswer

            ? `${selectedAnswer.score} / 4`

            : '— / 4';


    return `

        <article

            class="question-card"

            data-indicator="${Page02.escapeHtml(
                indicator.id
            )}"

        >


            <div class="indicator-heading">


                <span class="indicator-number">

                    ${String(
                        indicator.number
                    ).padStart(
                        2,
                        '0'
                    )}

                </span>


                <div>

                    <h3>

                        ${Page02.escapeHtml(
                            indicator.tamil
                        )}

                    </h3>


                    <p>

                        ${Page02.escapeHtml(
                            indicator.english
                        )}

                    </p>

                </div>


            </div>


            <div class="indicator-comparison">


                <div class="indicator-current">


                    <span>

                        உங்கள் தற்போதைய நிலை

                    </span>


                    <small>

                        SELECT YOUR CURRENT REALITY

                    </small>


                    <div

                        class="indicator-options"

                        role="group"

                        aria-label="${Page02.escapeHtml(
                            indicator.english
                        )}"

                    >

                        ${indicator.options

                            .map(

                                function(option){

                                    return Page02.renderOption(

                                        indicator,

                                        option,

                                        selectedAnswer

                                    );

                                }

                            )

                            .join('')}

                    </div>


                </div>


                <div class="indicator-ideal">


                    <span>

                        Millionaire Ideal™

                    </span>


                    <small>

                        BENCHMARK

                    </small>


                    <strong>

                        ${Page02.escapeHtml(
                            indicator.ideal
                        )}

                    </strong>


                </div>


            </div>


            <div

                class="indicator-score"

                data-indicator-score="${Page02.escapeHtml(
                    indicator.id
                )}"

            >

                <span>
                    SCORE
                </span>


                <strong>

                    ${scoreText}

                </strong>

            </div>


        </article>

    `;

};


/* =============================================================================
 * RENDER CURRENT DIMENSION
 * =============================================================================
 */


Page02.renderDimension = function(){

    const host =
        Page02.$(
            '#dimensionHost'
        );


    if(!host){

        return;

    }


    const dimension =
        Page02.getCurrentDimension();


    if(!dimension){

        return;

    }


    host.innerHTML = `

        <section

            class="dimension-card"

            data-dimension="${Page02.escapeHtml(
                dimension.id
            )}"

        >


            <span class="section-kicker">

                பரிமாணம்
                ${dimension.number}
                / 05

            </span>


            <h2>

                ${Page02.escapeHtml(
                    dimension.tamil
                )}

            </h2>


            <h3>

                ${Page02.escapeHtml(
                    dimension.english
                )}

            </h3>


            <p>

                உங்கள் தற்போதைய நிலைக்கு மிகவும் பொருத்தமான
                பதிலைத் தேர்ந்தெடுக்கவும்.

            </p>


            <p class="english-sub">

                SELECT THE RANGE THAT BEST REPRESENTS
                YOUR CURRENT REALITY.

            </p>


        </section>


        <div class="indicator-list">

            ${dimension.indicators

                .map(
                    Page02.renderIndicator
                )

                .join('')}

        </div>

    `;


    Page02.bindIndicatorOptions();

    Page02.updateDimensionButtons();

};


/* =============================================================================
 * OPTION SELECTION
 * =============================================================================
 */


Page02.selectIndicatorOption = function(
    button
){

    const indicatorId =
        button.dataset
            .indicatorOption;


    const optionScore =
        Number(
            button.dataset
                .optionScore
        );


    const indicator =
        Page02.findIndicator(
            indicatorId
        );


    const dimension =
        Page02.getCurrentDimension();


    if(
        !indicator ||
        !dimension
    ){

        return;

    }


    const option =

        indicator.options.find(

            function(item){

                return Number(
                    item.score
                ) ===
                    optionScore;

            }

        );


    if(!option){

        return;

    }


    /*
     * Save answer immediately.
     */

    Page02.state.answers[
        indicator.id
    ] =

        Page02.buildAnswer(

            dimension,

            indicator,

            option

        );


    /*
     * Update visual selection.
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

                function(optionButton){

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

    }


    /*
     * Update score preview.
     */

    const scoreElement =

        Page02.$(

            `[data-indicator-score="${indicator.id}"] strong`

        );


    if(scoreElement){

        scoreElement.textContent =
            `${option.score} / 4`;

    }


    Page02.setError(
        '#scorecardError',
        ''
    );


    Page02.renderDimensionProgress();

};


/* =============================================================================
 * OPTION BINDING
 * =============================================================================
 */


Page02.bindIndicatorOptions = function(){

    Page02
        .$$('[data-indicator-option]')
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
 * PRESERVE CURRENT DIMENSION
 * =============================================================================
 *
 * Answers are saved immediately when an option is clicked.
 *
 * This function remains as a compatibility hook because the original
 * Page 02 architecture called preserveCurrentDimension() during navigation.
 *
 * =============================================================================
 */


Page02.preserveCurrentDimension = function(){

    return true;

};


/* =============================================================================
 * CAPTURE / VALIDATE CURRENT DIMENSION
 * =============================================================================
 */


Page02.captureCurrentDimension = function(){

    const dimension =
        Page02.getCurrentDimension();


    if(!dimension){

        return false;

    }


    Page02.setError(
        '#scorecardError',
        ''
    );


    for(
        const indicator of
        dimension.indicators
    ){

        const answer =

            Page02.getIndicatorAnswer(
                indicator.id
            );


        if(!answer){

            Page02.setError(

                '#scorecardError',

                'Please select one answer for all five indicators before continuing.'

            );


            const card =

                Page02.$(

                    `[data-indicator="${indicator.id}"]`

                );


            if(card){

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

                    firstOption.focus();

                }

            }


            return false;

        }

    }


    return true;

};


/* =============================================================================
 * DIMENSION NAVIGATION BUTTONS
 * =============================================================================
 */


Page02.updateDimensionButtons = function(){

    const back =
        Page02.$(
            '#dimensionBack'
        );


    const next =
        Page02.$(
            '#dimensionNext'
        );


    if(back){

        back.disabled =

            Page02.state
                .currentDimension ===
                0;

    }


    if(next){

        const isLast =

            Page02.state
                .currentDimension ===

            Page02.DIMENSIONS.length -
                1;


        next.textContent =

            isLast

                ? 'VIEW MY RESULT →'

                : 'NEXT DIMENSION →';

    }

};


/* =============================================================================
 * NEXT DIMENSION
 * =============================================================================
 */


Page02.handleDimensionNext = async function(){

    if(
        !Page02.captureCurrentDimension()
    ){

        return;

    }


    const lastIndex =

        Page02.DIMENSIONS.length -
        1;


    if(
        Page02.state.currentDimension <
        lastIndex
    ){

        Page02.state.currentDimension +=
            1;


        Page02.renderDimensionProgress();

        Page02.renderDimension();


        window.scrollTo({

            top:
                0,

            behavior:
                'smooth'

        });


        return;

    }


    await Page02.completeScorecard();

};


/* =============================================================================
 * PREVIOUS DIMENSION
 * =============================================================================
 */


Page02.handleDimensionBack = function(){

    if(
        Page02.state.currentDimension >
        0
    ){

        Page02.state.currentDimension -=
            1;


        Page02.setError(
            '#scorecardError',
            ''
        );


        Page02.renderDimensionProgress();

        Page02.renderDimension();


        window.scrollTo({

            top:
                0,

            behavior:
                'smooth'

        });

    }

};


/* =============================================================================
 * SCORECARD NAVIGATION BINDING
 * =============================================================================
 */


Page02.bindScorecardNavigation = function(){

    const back =
        Page02.$(
            '#dimensionBack'
        );


    const next =
        Page02.$(
            '#dimensionNext'
        );


    if(back){

        back.addEventListener(

            'click',

            Page02.handleDimensionBack

        );

    }


    if(next){

        next.addEventListener(

            'click',

            Page02.handleDimensionNext

        );

    }

};


/* =============================================================================
 * CALCULATE COMPLETE RESULT
 * =============================================================================
 */


Page02.calculateResult = function(){

    let totalScore =
        0;


    const dimensions =

        Page02.DIMENSIONS.map(

            function(dimension){


                const indicatorResults =

                    dimension.indicators.map(

                        function(indicator){


                            const answer =

                                Page02.state
                                    .answers[
                                        indicator.id
                                    ];


                            return {

                                indicatorId:
                                    indicator.id,

                                indicatorNumber:
                                    indicator.number,

                                label:
                                    indicator.english,

                                value:
                                    answer.value,

                                selectedRange:
                                    answer.selectedRange,

                                rangeLabel:
                                    answer.rangeLabel,

                                ideal:
                                    indicator.ideal,

                                target:
                                    indicator.target,

                                score:
                                    answer.score,

                                gap:
                                    answer.gap

                            };

                        }

                    );


                const score =

                    indicatorResults.reduce(

                        function(
                            sum,
                            item
                        ){

                            return (
                                sum +
                                item.score
                            );

                        },

                        0

                    );


                totalScore +=
                    score;


                const maximum =

                    dimension.indicators
                        .length *
                    4;


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


                return {

                    id:
                        dimension.id,

                    tamil:
                        dimension.tamil,

                    name:
                        dimension.english,

                    score:
                        score,

                    maximum:
                        maximum,

                    percentage:
                        percentage,

                    indicators:
                        indicatorResults

                };

            }

        );


    /*
     * 25 indicators × 4 points = 100.
     *
     * Therefore total score and percentage
     * are numerically identical.
     */

    const percentage =
        totalScore;


    const gap =

        Math.max(

            100 -
            percentage,

            0

        );


    const stage =

        Page02.getLifestyleStage(
            percentage
        );


    const sorted =

        [...dimensions].sort(

            function(a, b){

                return (
                    b.percentage -
                    a.percentage
                );

            }

        );


    const strongest =
        sorted[0];


    const growth =
        sorted[
            sorted.length -
            1
        ];


    return {

        peopleId:
            Page02.state.peopleId,

        totalScore:
            totalScore,

        maximumScore:
            100,

        percentage:
            percentage,

        gap:
            gap,

        stage:
            stage,

        strongestDimension:
            strongest,

        growthDimension:
            growth,

        dimensions:
            dimensions,

        indicators:

            Page02.DIMENSIONS

                .flatMap(

                    function(dimension){

                        return dimension.indicators;

                    }

                )

                .sort(

                    function(a, b){

                        return (
                            a.number -
                            b.number
                        );

                    }

                )

                .map(

                    function(indicator){

                        return (
                            Page02.state
                                .answers[
                                    indicator.id
                                ]
                        );

                    }

                )

    };

};


/* =============================================================================
 * LIFESTYLE STAGE
 * =============================================================================
 */


Page02.getLifestyleStage = function(percentage){

    if(
        percentage >=
        100
    ){

        return (
            'Millionaire Lifestyle Benchmark Achieved'
        );

    }


    if(
        percentage >=
        81
    ){

        return (
            'Millionaire Lifestyle'
        );

    }


    if(
        percentage >=
        61
    ){

        return (
            'Wealth-Building Lifestyle'
        );

    }


    if(
        percentage >=
        41
    ){

        return (
            'Affluent Transition'
        );

    }


    if(
        percentage >=
        21
    ){

        return (
            'Middle-Class Stability'
        );

    }


    return (
        'Survival / Foundation'
    );

};


/* =============================================================================
 * BUILD BACKEND DISCOVERY PAYLOAD
 * =============================================================================
 */


Page02.buildDiscoveryPayload = function(result){

    return {

        peopleId:
            Page02.state.peopleId,

        totalScore:
            result.totalScore,

        millionaireLifestylePercentage:
            result.percentage,

        overallGap:
            result.gap,

        lifestyleStage:
            result.stage,

        strongestDimension:
            result.strongestDimension.name,

        strongestDimensionPercentage:
            result.strongestDimension
                .percentage,

        growthDimension:
            result.growthDimension.name,

        growthDimensionPercentage:
            result.growthDimension
                .percentage,

        dimensions:
            result.dimensions,

        indicators:
            result.indicators

    };

};


/* =============================================================================
 * COMPLETE SCORECARD
 * =============================================================================
 */


Page02.completeScorecard = async function(){

    if(
        Page02.state.saving
    ){

        return;

    }


    const result =
        Page02.calculateResult();


    Page02.state.result =
        result;


    Page02.state.saving =
        true;


    Page02.setError(
        '#scorecardError',
        ''
    );


    Page02.setLoading(
        true
    );


    try{

        const payload =

            Page02.buildDiscoveryPayload(
                result
            );


        const response =

            await Page02.api(

                'saveDiscovery',

                payload

            );


        Page02.unwrapResponse(
            response
        );


        try{

            sessionStorage.setItem(

                Page02.CONFIG
                    .storageKeys
                    .page02Result,

                JSON.stringify(
                    result
                )

            );

        }

        catch(storageError){

            console.warn(

                'Unable to cache Page 02 result:',

                storageError

            );

        }


        Page02.renderResult(
            result
        );


        Page02.showScreen(
            'result'
        );

    }

    catch(error){

        console.error(

            'Page02 scorecard save error:',

            error

        );


        Page02.setError(

            '#scorecardError',

            error.message ||

            'Unable to save your scorecard. Please try again.'

        );

    }

    finally{

        Page02.state.saving =
            false;


        Page02.setLoading(
            false
        );

    }

};


/* =============================================================================
 * RESULT DIMENSION ROW
 * =============================================================================
 */


Page02.renderDimensionResult = function(dimension){

    return `

        <article

            class="dimension-result"

            data-result-dimension="${Page02.escapeHtml(
                dimension.id
            )}"

        >


            <div class="dimension-result__copy">

                <strong>

                    ${Page02.escapeHtml(
                        dimension.tamil
                    )}

                </strong>


                <span>

                    ${Page02.escapeHtml(
                        dimension.name
                    )}

                </span>

            </div>


            <div class="dimension-result__score">

                <strong>

                    ${dimension.score}
                    /
                    ${dimension.maximum}

                </strong>


                <span>

                    ${dimension.percentage}%

                </span>

            </div>


            <div

                class="dimension-result__track"

                aria-hidden="true"

            >

                <span

                    style="width:${Math.min(
                        dimension.percentage,
                        100
                    )}%"

                ></span>

            </div>


        </article>

    `;

};


/* =============================================================================
 * RESULT RENDERING
 * =============================================================================
 */


Page02.renderResult = function(result){

    const score =
        Page02.$(
            '#resultScore'
        );


    const percentage =
        Page02.$(
            '#resultPercentage'
        );


    const stage =
        Page02.$(
            '#resultStage'
        );


    const gap =
        Page02.$(
            '#resultGap'
        );


    const dimensionResults =
        Page02.$(
            '#dimensionResults'
        );


    const strongestDimension =
        Page02.$(
            '#strongestDimension'
        );


    const strongestPercentage =
        Page02.$(
            '#strongestPercentage'
        );


    const growthDimension =
        Page02.$(
            '#growthDimension'
        );


    const growthPercentage =
        Page02.$(
            '#growthPercentage'
        );


    if(score){

        score.textContent =
            `${result.totalScore} / 100`;

    }


    if(percentage){

        percentage.textContent =
            `${result.percentage}%`;

    }


    if(stage){

        stage.textContent =
            `${result.stage.toUpperCase()}™`;

    }


    if(gap){

        gap.textContent =
            `${result.gap}%`;

    }


    if(dimensionResults){

        dimensionResults.innerHTML =

            result.dimensions

                .map(
                    Page02.renderDimensionResult
                )

                .join('');

    }


    if(strongestDimension){

        strongestDimension.textContent =
            result.strongestDimension.name;

    }


    if(strongestPercentage){

        strongestPercentage.textContent =

            `${result.strongestDimension.percentage}%`;

    }


    if(growthDimension){

        growthDimension.textContent =
            result.growthDimension.name;

    }


    if(growthPercentage){

        growthPercentage.textContent =

            `${result.growthDimension.percentage}%`;

    }


    Page02.highlightStage(
        result.stage
    );

};


/* =============================================================================
 * STAGE HIGHLIGHT
 * =============================================================================
 */


Page02.highlightStage = function(stage){

    Page02

        .$$(
            '.stage-list [data-stage]'
        )

        .forEach(

            function(item){

                const active =

                    item.dataset.stage ===
                    stage;


                item.classList.toggle(

                    'is-active',

                    active

                );


                if(active){

                    item.setAttribute(

                        'aria-current',

                        'true'

                    );

                }

                else{

                    item.removeAttribute(
                        'aria-current'
                    );

                }

            }

        );

};


/* =============================================================================
 * PAGE 03 NAVIGATION
 * =============================================================================
 */


Page02.continueToPage03 = function(){

    if(
        !Page02.state.result
    ){

        return;

    }


    window.location.href =
        Page02.CONFIG.nextPage;

};


/* =============================================================================
 * CONTINUE BINDING
 * =============================================================================
 */


Page02.bindContinue = function(){

    const button =
        Page02.$(
            '#continuePage03'
        );


    if(!button){

        return;

    }


    button.addEventListener(

        'click',

        Page02.continueToPage03

    );

};


/* =============================================================================
 * RESTORE SESSION
 * =============================================================================
 */


Page02.restoreSession = function(){

    try{

        const peopleId =

            sessionStorage.getItem(

                Page02.CONFIG
                    .storageKeys
                    .peopleId

            );


        if(peopleId){

            Page02.state.peopleId =
                peopleId;

        }

    }

    catch(error){

        console.warn(

            'Unable to restore Page 02 session:',

            error

        );

    }

};


/* =============================================================================
 * DEPENDENCY CHECK
 * =============================================================================
 */


Page02.checkDependencies = function(){

    if(
        typeof CTM_API ===
        'undefined'
    ){

        console.error(
            'CTM PATH™ Page 02 dependency failure: js/api.js is not loaded.'
        );

        return false;

    }


    if(
        typeof CTM_API.register !==
        'function'
    ){

        console.error(
            'CTM PATH™ Page 02 dependency failure: CTM_API.register() is unavailable.'
        );

        return false;

    }


    if(
        typeof CTM_API.saveDiscovery !==
        'function'
    ){

        console.error(
            'CTM PATH™ Page 02 dependency failure: CTM_API.saveDiscovery() is unavailable.'
        );

        return false;

    }


    return true;

};


/* =============================================================================
 * INITIALIZE
 * =============================================================================
 */


Page02.init = function(){

    const root =
        Page02.$(
            '#page02'
        );


    if(!root){

        console.error(
            'CTM PATH™ Page 02 root element #page02 was not found.'
        );

        return;

    }


    if(
        !Page02.checkDependencies()
    ){

        return;

    }


    Page02.restoreSession();

    Page02.bindIntro();

    Page02.bindKyc();

    Page02.bindScorecardNavigation();

    Page02.bindContinue();


    /*
     * Page 02 always starts from its introduction.
     */

    Page02.showScreen(
        'intro'
    );


    console.info(
        'CTM PATH™ MILLIONAIRES™ — Page 02 v2.0 Range Option Scorecard ready.'
    );

};


/* =============================================================================
 * BOOT
 * =============================================================================
 */


if(
    document.readyState ===
    'loading'
){

    document.addEventListener(

        'DOMContentLoaded',

        Page02.init

    );

}

else{

    Page02.init();

}


/* =============================================================================
 * END OF FILE
 * =============================================================================
 */
