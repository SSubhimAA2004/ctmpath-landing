
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * Frontend v1.1
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
 * Contains NO backend business logic other than presentation-side
 * score preview required for the interactive scorecard.
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
 * SCORECARD MASTER
 * =============================================================================
 *
 * 25 indicators
 * 5 dimensions
 * 5 indicators per dimension
 *
 * Standard scoring:
 *
 *      0 = Starting
 *      1 = Emerging
 *      2 = Progressing
 *      3 = Advancing
 *      4 = Achieved
 *
 * Total:
 *
 *      25 × 4 = 100
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

        id: 'wealth',

        number: '01',

        tamil:
            'செல்வம்',

        english:
            'WEALTH™',

        indicators: [

            {

                id: 'netWorth',

                number: 1,

                tamil:
                    'நிகர சொத்து மதிப்பு',

                english:
                    'Net Worth',

                unit:
                    '₹',

                placeholder:
                    'Enter current net worth',

                ideal:
                    '₹10 Cr+',

                target:
                    100000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'liquidFinancialInvestments',

                number: 6,

                tamil:
                    'திரவ நிதி முதலீடுகள்',

                english:
                    'Liquid Financial Investments',

                unit:
                    '₹',

                placeholder:
                    'Enter current investments',

                ideal:
                    '₹2 Cr+',

                target:
                    20000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'cashOpportunityReserve',

                number: 7,

                tamil:
                    'பண / வாய்ப்பு கையிருப்பு',

                english:
                    'Cash / Opportunity Reserve',

                unit:
                    '₹',

                placeholder:
                    'Enter current reserve',

                ideal:
                    '₹50 Lakh+',

                target:
                    5000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'highInterestDebt',

                number: 8,

                tamil:
                    'அதிக வட்டி கடன்',

                english:
                    'High-Interest Debt',

                unit:
                    '₹',

                placeholder:
                    'Enter outstanding debt',

                ideal:
                    '₹0',

                target:
                    0,

                type:
                    'money',

                direction:
                    'lower'

            },


            {

                id: 'goldOwnership',

                number: 12,

                tamil:
                    'தங்க சொத்து',

                english:
                    'Gold Ownership',

                unit:
                    'grams',

                placeholder:
                    'Enter grams owned',

                ideal:
                    '1 Kg+',

                target:
                    1000,

                type:
                    'number',

                direction:
                    'higher'

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 02
     * INCOME & CASH FLOW
     * =========================================================================
     */

    {

        id: 'incomeCashFlow',

        number: '02',

        tamil:
            'வருமானம் & பணப்புழக்கம்',

        english:
            'INCOME & CASH FLOW™',

        indicators: [

            {

                id: 'annualPersonalIncome',

                number: 2,

                tamil:
                    'ஆண்டு தனிப்பட்ட வருமானம்',

                english:
                    'Annual Personal Income',

                unit:
                    '₹',

                placeholder:
                    'Enter annual income',

                ideal:
                    '₹1 Cr+',

                target:
                    10000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'monthlyIncome',

                number: 3,

                tamil:
                    'மாத வருமானம்',

                english:
                    'Monthly Income',

                unit:
                    '₹',

                placeholder:
                    'Enter monthly income',

                ideal:
                    '₹10 Lakh+',

                target:
                    1000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'passiveInvestmentIncome',

                number: 4,

                tamil:
                    'செயலற்ற / முதலீட்டு வருமானம்',

                english:
                    'Passive / Investment Income',

                unit:
                    '₹ / month',

                placeholder:
                    'Enter monthly passive income',

                ideal:
                    '₹5 Lakh+/month',

                target:
                    500000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'annualIncomeTaxPaid',

                number: 5,

                tamil:
                    'ஆண்டு வருமான வரி செலுத்தல்',

                english:
                    'Annual Income Tax Paid',

                unit:
                    '₹',

                placeholder:
                    'Enter annual income tax paid',

                ideal:
                    '₹25 Lakh+',

                target:
                    2500000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'incomeProducingProperties',

                number: 11,

                tamil:
                    'வருமானம் தரும் சொத்துகள்',

                english:
                    'Income-Producing Properties',

                unit:
                    'properties',

                placeholder:
                    'Enter number of properties',

                ideal:
                    '2+ properties',

                target:
                    2,

                type:
                    'number',

                direction:
                    'higher'

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 03
     * ASSETS
     * =========================================================================
     */

    {

        id: 'assets',

        number: '03',

        tamil:
            'சொத்துகள்',

        english:
            'ASSETS™',

        indicators: [

            {

                id: 'landOwnership',

                number: 9,

                tamil:
                    'நில உரிமை',

                english:
                    'Land Ownership',

                unit:
                    'acres',

                placeholder:
                    'Enter acres owned',

                ideal:
                    '10+ acres',

                target:
                    10,

                type:
                    'number',

                direction:
                    'higher'

            },


            {

                id: 'primaryResidence',

                number: 10,

                tamil:
                    'முதன்மை வீடு',

                english:
                    'Primary Residence',

                unit:
                    '₹',

                placeholder:
                    'Enter owned home value',

                ideal:
                    '₹2 Cr+ owned home',

                target:
                    20000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'premiumAutomobile',

                number: 13,

                tamil:
                    'பிரீமியம் வாகனம்',

                english:
                    'Premium Automobile',

                unit:
                    '₹',

                placeholder:
                    'Enter automobile value',

                ideal:
                    '₹1 Cr+ car',

                target:
                    10000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'childrenEducationFund',

                number: 21,

                tamil:
                    'குழந்தைகளின் கல்வி நிதி',

                english:
                    "Children's Education Fund",

                unit:
                    '₹ / child',

                placeholder:
                    'Enter fund per child',

                ideal:
                    '₹50 Lakh+/child',

                target:
                    5000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'householdSupport',

                number: 18,

                tamil:
                    'வீட்டு உதவி',

                english:
                    'Household Support',

                unit:
                    'staff',

                placeholder:
                    'Enter number of paid staff',

                ideal:
                    '2+ paid staff',

                target:
                    2,

                type:
                    'number',

                direction:
                    'higher'

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 04
     * LIFESTYLE & FREEDOM
     * =========================================================================
     */

    {

        id: 'lifestyleFreedom',

        number: '04',

        tamil:
            'வாழ்க்கைமுறை & சுதந்திரம்',

        english:
            'LIFESTYLE & FREEDOM™',

        indicators: [

            {

                id: 'internationalTravel',

                number: 14,

                tamil:
                    'சர்வதேச பயணம்',

                english:
                    'International Travel',

                unit:
                    'trips / year',

                placeholder:
                    'Enter trips per year',

                ideal:
                    '12+ trips/year',

                target:
                    12,

                type:
                    'number',

                direction:
                    'higher'

            },


            {

                id: 'premiumFamilyVacations',

                number: 15,

                tamil:
                    'பிரீமியம் குடும்ப விடுமுறைகள்',

                english:
                    'Premium Family Vacations',

                unit:
                    'vacations / year',

                placeholder:
                    'Enter vacations per year',

                ideal:
                    '2+ per year',

                target:
                    2,

                type:
                    'number',

                direction:
                    'higher'

            },


            {

                id: 'premiumAccommodation',

                number: 16,

                tamil:
                    'பிரீமியம் தங்குமிடம்',

                english:
                    'Premium Accommodation',

                unit:
                    '%',

                placeholder:
                    'Enter % of travel using 5-star accommodation',

                ideal:
                    '5-star when travelling',

                target:
                    100,

                type:
                    'percentage',

                direction:
                    'higher'

            },


            {

                id: 'premiumAirTravel',

                number: 17,

                tamil:
                    'பிரீமியம் விமானப் பயணம்',

                english:
                    'Premium Air Travel',

                unit:
                    'flights / year',

                placeholder:
                    'Enter business-class flights per year',

                ideal:
                    '6+ business-class/year',

                target:
                    6,

                type:
                    'number',

                direction:
                    'higher'

            },


            {

                id: 'timeFreedom',

                number: 25,

                tamil:
                    'நேர சுதந்திரம்',

                english:
                    'Time Freedom',

                unit:
                    'days / year',

                placeholder:
                    'Enter discretionary days per year',

                ideal:
                    '30+ discretionary days',

                target:
                    30,

                type:
                    'number',

                direction:
                    'higher'

            }

        ]

    },


    /* =========================================================================
     * DIMENSION 05
     * PROTECTION & CONTRIBUTION
     * =========================================================================
     */

    {

        id: 'protectionContribution',

        number: '05',

        tamil:
            'பாதுகாப்பு & பங்களிப்பு',

        english:
            'PROTECTION & CONTRIBUTION™',

        indicators: [

            {

                id: 'healthFitnessInvestment',

                number: 19,

                tamil:
                    'உடல்நலம் & உடற்பயிற்சி முதலீடு',

                english:
                    'Health & Fitness Investment',

                unit:
                    '₹ / year',

                placeholder:
                    'Enter annual investment',

                ideal:
                    '₹2 Lakh+/year',

                target:
                    200000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'learningDevelopment',

                number: 20,

                tamil:
                    'கற்றல் & மேம்பாடு',

                english:
                    'Learning & Development',

                unit:
                    '₹ / year',

                placeholder:
                    'Enter annual investment',

                ideal:
                    '₹5 Lakh+/year',

                target:
                    500000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'lifeInsuranceProtection',

                number: 22,

                tamil:
                    'ஆயுள் காப்பீட்டு பாதுகாப்பு',

                english:
                    'Life Insurance Protection',

                unit:
                    '₹',

                placeholder:
                    'Enter life insurance cover',

                ideal:
                    '₹5 Cr+ cover',

                target:
                    50000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'familyHealthInsurance',

                number: 23,

                tamil:
                    'குடும்ப மருத்துவ காப்பீடு',

                english:
                    'Family Health Insurance',

                unit:
                    '₹',

                placeholder:
                    'Enter family health cover',

                ideal:
                    '₹50 Lakh+ cover',

                target:
                    5000000,

                type:
                    'money',

                direction:
                    'higher'

            },


            {

                id: 'charitySocialContribution',

                number: 24,

                tamil:
                    'அறப்பணி / சமூக பங்களிப்பு',

                english:
                    'Charity / Social Contribution',

                unit:
                    '₹ / year',

                placeholder:
                    'Enter annual contribution',

                ideal:
                    '₹10 Lakh+/year',

                target:
                    1000000,

                type:
                    'money',

                direction:
                    'higher'

            }

        ]

    }

];



/* =============================================================================
 * DOM HELPERS
 * =============================================================================
 */


Page02.$ = function(selector){

    return document.querySelector(selector);

};


Page02.$$ = function(selector){

    return Array.from(
        document.querySelectorAll(selector)
    );

};



/* =============================================================================
 * HTML ESCAPE
 * =============================================================================
 */


Page02.escapeHtml = function(value){

    return String(value ?? '')

        .replaceAll('&', '&amp;')

        .replaceAll('<', '&lt;')

        .replaceAll('>', '&gt;')

        .replaceAll('"', '&quot;')

        .replaceAll("'", '&#039;');

};



/* =============================================================================
 * NUMBER HELPERS
 * =============================================================================
 */


Page02.toNumber = function(value){

    const normalized =

        String(value ?? '')

            .replace(/,/g, '')

            .replace(/[^\d.-]/g, '')

            .trim();


    if(normalized === ''){

        return 0;

    }


    const number = Number(normalized);


    return Number.isFinite(number)

        ? number

        : 0;

};



Page02.formatNumber = function(value){

    const number =
        Page02.toNumber(value);


    return new Intl.NumberFormat(

        'en-IN',

        {

            maximumFractionDigits: 2

        }

    ).format(number);

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

                screen.dataset.screen === screenName

            );

        }

    );


    Page02.state.currentScreen =
        screenName;


    window.scrollTo({

        top: 0,

        behavior: 'smooth'

    });

};



/* =============================================================================
 * LOADING STATE
 * =============================================================================
 */


Page02.setLoading = function(isLoading){

    const overlay =
        Page02.$('#loadingOverlay');


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
        Page02.$(target);


    if(element){

        element.textContent =
            message || '';

    }

};



/* =============================================================================
 * API ADAPTER
 * =============================================================================
 *
 * Canonical frontend API:
 *
 *      js/api.js
 *
 * exposes:
 *
 *      CTM_API.register(payload)
 *      CTM_API.saveDiscovery(payload)
 *
 * IMPORTANT:
 *
 *      api.js MUST load before page02.js.
 *
 * =============================================================================
 */


Page02.api = async function(

    action,

    payload

){


    if(

        typeof CTM_API === 'undefined' ||

        !CTM_API

    ){

        throw new Error(

            'CTM PATH™ API service is unavailable.'

        );

    }


    if(

        typeof CTM_API[action] !== 'function'

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


    if(response.success === false){

        throw new Error(

            response.message ||

            response.error ||

            'Request failed.'

        );

    }


    if(

        response.data &&

        typeof response.data === 'object'

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


    Page02.$$('[data-next]').forEach(

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


    if(!form.checkValidity()){

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


    if(Page02.state.saving){

        return;

    }


    const form =
        event.currentTarget;


    const payload =
        Page02.serializeKyc(form);


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


    Page02.setLoading(true);


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


        Page02.setLoading(false);

    }

};



/* =============================================================================
 * KYC BINDING
 * =============================================================================
 */


Page02.bindKyc = function(){


    const form =
        Page02.$('#kycForm');


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

                        .replace(/\D/g, '')

                        .slice(0, 10);

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

                        .replace(/\D/g, '')

                        .slice(0, 6);

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
        Page02.$('#dimensionProgress');


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
                        Page02.state.currentDimension;


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
                            Page02.state.currentDimension

                        ){


                            Page02.preserveCurrentDimension();


                            Page02.state.currentDimension =
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
        Page02.DIMENSIONS[index];


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
 * SCORE CALCULATION
 * =============================================================================
 */


Page02.calculateIndicator = function(

    indicator,

    rawValue

){


    const value =

        Math.max(

            0,

            Page02.toNumber(

                rawValue

            )

        );


    /*
     * HIGH-INTEREST DEBT
     *
     * Ideal benchmark = ₹0.
     *
     * Zero cannot be evaluated through a normal
     * percentage-of-target calculation.
     *
     * Temporary inverse scoring bands:
     *
     *      ₹0           = 4
     *      ≤ ₹1 Lakh    = 3
     *      ≤ ₹5 Lakh    = 2
     *      ≤ ₹10 Lakh   = 1
     *      > ₹10 Lakh   = 0
     *
     * This rule should remain aligned with the
     * backend AssessmentEngine before final freeze.
     */

    if(

        indicator.direction === 'lower'

    ){


        let score = 0;


        if(value === 0){

            score = 4;

        }

        else if(value <= 100000){

            score = 3;

        }

        else if(value <= 500000){

            score = 2;

        }

        else if(value <= 1000000){

            score = 1;

        }


        return {

            value:
                value,

            ratio:
                null,

            percentage:
                null,

            score:
                score,

            gap:
                value

        };

    }


    let ratio = 0;


    if(indicator.target > 0){

        ratio =

            value /
            indicator.target;

    }


    const percentage =
        ratio * 100;


    let score = 0;


    if(percentage >= 100){

        score = 4;

    }

    else if(percentage >= 75){

        score = 3;

    }

    else if(percentage >= 50){

        score = 2;

    }

    else if(percentage >= 25){

        score = 1;

    }


    return {

        value:
            value,

        ratio:
            ratio,

        percentage:
            percentage,

        score:
            score,

        gap:
            Math.max(

                indicator.target -
                value,

                0

            )

    };

};



/* =============================================================================
 * INDICATOR INPUT VALUE
 * =============================================================================
 */


Page02.getIndicatorValue = function(indicatorId){


    if(

        Object.prototype
            .hasOwnProperty
            .call(

                Page02.state.answers,

                indicatorId

            )

    ){

        return Page02.state
            .answers[indicatorId]
            .value;

    }


    return '';

};



/* =============================================================================
 * INDICATOR CARD
 * =============================================================================
 */


Page02.renderIndicator = function(indicator){


    const existingValue =

        Page02.getIndicatorValue(

            indicator.id

        );


    const inputMode =

        (
            indicator.type === 'money' ||

            indicator.type === 'number' ||

            indicator.type === 'percentage'
        )

            ? 'decimal'

            : 'text';


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
                    ).padStart(2, '0')}

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


                <label class="indicator-current">

                    <span>
                        உங்கள் தற்போதைய நிலை
                    </span>

                    <small>
                        YOUR CURRENT REALITY
                    </small>


                    <div class="indicator-input-wrap">

                        <input

                            type="text"

                            inputmode="${inputMode}"

                            autocomplete="off"

                            data-indicator-input="${Page02.escapeHtml(
                                indicator.id
                            )}"

                            value="${Page02.escapeHtml(
                                existingValue
                            )}"

                            placeholder="${Page02.escapeHtml(
                                indicator.placeholder
                            )}"

                            aria-label="${Page02.escapeHtml(
                                indicator.english
                            )}"

                        >


                        <span class="indicator-unit">

                            ${Page02.escapeHtml(
                                indicator.unit
                            )}

                        </span>

                    </div>

                </label>


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
                    — / 4
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
        Page02.$('#dimensionHost');


    if(!host){

        return;

    }


    const dimension =

        Page02.DIMENSIONS[

            Page02.state
                .currentDimension

        ];


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

                உங்கள் தற்போதைய உண்மை நிலையை பதிவு செய்யுங்கள்.

            </p>


            <p class="english-sub">

                ENTER YOUR CURRENT REALITY TODAY.

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


    Page02.bindIndicatorInputs();

    Page02.updateDimensionButtons();

};



/* =============================================================================
 * INDICATOR INPUT BINDING
 * =============================================================================
 */


Page02.bindIndicatorInputs = function(){


    Page02

        .$$('[data-indicator-input]')

        .forEach(

            function(input){


                input.addEventListener(

                    'input',

                    function(){


                        input.value =

                            input.value

                                .replace(

                                    /[^\d.,]/g,

                                    ''

                                );


                        Page02.previewIndicator(

                            input.dataset
                                .indicatorInput,

                            input.value

                        );

                    }

                );


                if(input.value !== ''){


                    Page02.previewIndicator(

                        input.dataset
                            .indicatorInput,

                        input.value

                    );

                }

            }

        );

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
 * LIVE INDICATOR PREVIEW
 * =============================================================================
 */


Page02.previewIndicator = function(

    indicatorId,

    value

){


    const indicator =

        Page02.findIndicator(

            indicatorId

        );


    if(!indicator){

        return;

    }


    const scoreElement =

        Page02.$(

            `[data-indicator-score="${indicatorId}"] strong`

        );


    if(!scoreElement){

        return;

    }


    if(

        String(value).trim() === ''

    ){

        scoreElement.textContent =
            '— / 4';

        return;

    }


    const calculated =

        Page02.calculateIndicator(

            indicator,

            value

        );


    scoreElement.textContent =

        `${calculated.score} / 4`;

};



/* =============================================================================
 * BUILD ANSWER
 * =============================================================================
 */


Page02.buildAnswer = function(

    dimension,

    indicator,

    rawValue

){


    const calculation =

        Page02.calculateIndicator(

            indicator,

            rawValue

        );


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
            calculation.value,

        ideal:
            indicator.ideal,

        target:
            indicator.target,

        score:
            calculation.score,

        gap:
            calculation.gap

    };

};



/* =============================================================================
 * PRESERVE CURRENT DIMENSION
 * =============================================================================
 */


Page02.preserveCurrentDimension = function(){


    const dimension =

        Page02.DIMENSIONS[

            Page02.state
                .currentDimension

        ];


    if(!dimension){

        return;

    }


    dimension.indicators.forEach(

        function(indicator){


            const input =

                Page02.$(

                    `[data-indicator-input="${indicator.id}"]`

                );


            if(

                input &&

                String(
                    input.value
                ).trim() !== ''

            ){


                Page02.state.answers[
                    indicator.id
                ] =

                    Page02.buildAnswer(

                        dimension,

                        indicator,

                        input.value

                    );

            }

        }

    );

};



/* =============================================================================
 * CAPTURE CURRENT DIMENSION
 * =============================================================================
 */


Page02.captureCurrentDimension = function(){


    const dimension =

        Page02.DIMENSIONS[

            Page02.state
                .currentDimension

        ];


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


        const input =

            Page02.$(

                `[data-indicator-input="${indicator.id}"]`

            );


        if(

            !input ||

            String(
                input.value
            ).trim() === ''

        ){


            Page02.setError(

                '#scorecardError',

                'Please complete all five indicators before continuing.'

            );


            if(input){

                input.focus();

            }


            return false;

        }


        Page02.state.answers[
            indicator.id
        ] =

            Page02.buildAnswer(

                dimension,

                indicator,

                input.value

            );

    }


    return true;

};



/* =============================================================================
 * DIMENSION NAVIGATION BUTTONS
 * =============================================================================
 */


Page02.updateDimensionButtons = function(){


    const back =
        Page02.$('#dimensionBack');


    const next =
        Page02.$('#dimensionNext');


    if(back){

        back.disabled =

            Page02.state
                .currentDimension === 0;

    }


    if(next){


        const isLast =

            Page02.state
                .currentDimension ===

            Page02.DIMENSIONS.length - 1;


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

        Page02.DIMENSIONS.length - 1;


    if(

        Page02.state.currentDimension <
        lastIndex

    ){


        Page02.state.currentDimension += 1;


        Page02.renderDimensionProgress();

        Page02.renderDimension();


        window.scrollTo({

            top: 0,

            behavior: 'smooth'

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


    Page02.preserveCurrentDimension();


    if(

        Page02.state.currentDimension > 0

    ){


        Page02.state.currentDimension -= 1;


        Page02.setError(

            '#scorecardError',

            ''

        );


        Page02.renderDimensionProgress();

        Page02.renderDimension();


        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    }

};



/* =============================================================================
 * SCORECARD NAVIGATION BINDING
 * =============================================================================
 */


Page02.bindScorecardNavigation = function(){


    const back =
        Page02.$('#dimensionBack');


    const next =
        Page02.$('#dimensionNext');


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


    let totalScore = 0;


    const dimensions =

        Page02.DIMENSIONS.map(

            function(dimension){


                const indicatorResults =

                    dimension.indicators.map(

                        function(indicator){


                            const answer =

                                Page02.state.answers[
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


                totalScore += score;


                const maximum =

                    dimension.indicators
                        .length * 4;


                const percentage =

                    maximum > 0

                        ? Math.round(

                            (
                                score /
                                maximum
                            ) * 100

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
     * Therefore:
     *
     *      total score = overall percentage
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
            sorted.length - 1
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

                            Page02.state.answers[
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


    if(percentage >= 100){

        return (

            'Millionaire Lifestyle Benchmark Achieved'

        );

    }


    if(percentage >= 81){

        return (

            'Millionaire Lifestyle'

        );

    }


    if(percentage >= 61){

        return (

            'Wealth-Building Lifestyle'

        );

    }


    if(percentage >= 41){

        return (

            'Affluent Transition'

        );

    }


    if(percentage >= 21){

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
            result.strongestDimension.percentage,


        growthDimension:
            result.growthDimension.name,


        growthDimensionPercentage:
            result.growthDimension.percentage,


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


    if(Page02.state.saving){

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


    Page02.setLoading(true);


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


        Page02.setLoading(false);

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
        Page02.$('#resultScore');


    const percentage =
        Page02.$('#resultPercentage');


    const stage =
        Page02.$('#resultStage');


    const gap =
        Page02.$('#resultGap');


    const dimensionResults =
        Page02.$('#dimensionResults');


    const strongestDimension =
        Page02.$('#strongestDimension');


    const strongestPercentage =
        Page02.$('#strongestPercentage');


    const growthDimension =
        Page02.$('#growthDimension');


    const growthPercentage =
        Page02.$('#growthPercentage');


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

        .$$('.stage-list [data-stage]')

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


    if(!Page02.state.result){

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
        Page02.$('#continuePage03');


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

        typeof CTM_API === 'undefined'

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
        Page02.$('#page02');


    if(!root){

        console.error(

            'CTM PATH™ Page 02 root element #page02 was not found.'

        );

        return;

    }


    Page02.checkDependencies();


    Page02.restoreSession();


    Page02.bindIntro();

    Page02.bindKyc();

    Page02.bindScorecardNavigation();

    Page02.bindContinue();


    /*
     * Page 02 always starts from its introduction.
     *
     * A previously stored PeopleID may be reused by the
     * application session, but the page will not silently
     * jump into an unfinished scorecard.
     */

    Page02.showScreen(

        'intro'

    );


    console.info(

        'CTM PATH™ MILLIONAIRES™ — Page 02 ready.'

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

