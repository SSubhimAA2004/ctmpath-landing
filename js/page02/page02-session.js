
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * FILE:
 * js/page02/page02-session.js
 *
 * VERSION:
 * 3.0
 *
 * STATUS:
 * SHARED PAGE 02 SESSION FOUNDATION
 *
 * =============================================================================
 *
 * PURPOSE
 *
 * Maintains one continuous Page 02 journey across:
 *
 *      page02a.html
 *      page02b.html
 *      page02c.html
 *      page02d.html
 *      page02e.html
 *      page02f.html
 *
 * RESPONSIBILITIES
 *
 *      • Create Page 02 session
 *      • Recover Page 02 session
 *      • Preserve client identity
 *      • Preserve KYC
 *      • Preserve all 25 answers
 *      • Store dimension completion
 *      • Calculate live scores
 *      • Calculate final score
 *      • Provide backend-ready answer data
 *      • Clear/reset Page 02 journey
 *
 * =============================================================================
 *
 * IMPORTANT
 *
 * THIS FILE DOES NOT:
 *
 *      ✗ manipulate Page 02 DOM
 *      ✗ render indicators
 *      ✗ control page-specific UI
 *      ✗ register clients
 *      ✗ call CTM_API
 *      ✗ save final discovery
 *
 * =============================================================================
 */


'use strict';


(function(window){


/* =============================================================================
 * DEPENDENCY
 * =============================================================================
 */


if(
    !window.Page02Data
){

    throw new Error(
        'CTM PATH™ Page02Session requires page02-data.js.'
    );

}


/* =============================================================================
 * NAMESPACE
 * =============================================================================
 */


const Page02Session = {};


/* =============================================================================
 * VERSION
 * =============================================================================
 */


Page02Session.version =
    '3.0';


/* =============================================================================
 * CONFIGURATION
 * =============================================================================
 */


Page02Session.CONFIG = {

    storageKey:
        'CTM_PATH_PAGE02',

    resultStorageKey:
        'CTM_PATH_MILLIONAIRE_RESULT',

    peopleIdStorageKey:
        'ctm_people_id',

    fullNameStorageKey:
        'ctm_full_name',

    schemaVersion:
        1

};


/* =============================================================================
 * STORAGE SUPPORT
 * =============================================================================
 */


Page02Session.isStorageAvailable = function(){

    try{

        const key =
            '__ctm_page02_test__';


        sessionStorage.setItem(
            key,
            '1'
        );


        sessionStorage.removeItem(
            key
        );


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 sessionStorage unavailable:',
            error
        );


        return false;

    }

};


/* =============================================================================
 * CREATE EMPTY SESSION
 * =============================================================================
 */


Page02Session.createEmptySession = function(){

    return {

        schemaVersion:
            Page02Session.CONFIG.schemaVersion,

        version:
            Page02Session.version,

        startedAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString(),

        client: {

            clientId:
                null,

            peopleId:
                null,

            fullName:
                '',

            registered:
                false

        },

        kyc:
            {},

        answers:
            {},

        dimensions: {

            wealth:
                false,

            incomeCashFlow:
                false,

            assets:
                false,

            lifestyleFreedom:
                false,

            protectionContribution:
                false

        },

        currentDimension:
            null,

        completedIndicatorCount:
            0,

        totalScore:
            0,

        maximumScore:
            window.Page02Data.CONFIG.maximumScore,

        completed:
            false,

        completedAt:
            null

    };

};


/* =============================================================================
 * NORMALIZE SESSION
 * =============================================================================
 *
 * Allows the session layer to recover safely if a stored object is missing
 * one of the expected properties.
 *
 * =============================================================================
 */


Page02Session.normalize = function(session){

    const clean =
        Page02Session.createEmptySession();


    if(
        !session ||
        typeof session !== 'object'
    ){

        return clean;

    }


    clean.startedAt =
        session.startedAt ||
        clean.startedAt;


    clean.updatedAt =
        session.updatedAt ||
        clean.updatedAt;


    /* -------------------------------------------------------------------------
     * CLIENT
     * -------------------------------------------------------------------------
     */


    if(
        session.client &&
        typeof session.client === 'object'
    ){

        clean.client.clientId =
            session.client.clientId ||
            null;


        clean.client.peopleId =
            session.client.peopleId ||
            null;


        clean.client.fullName =
            session.client.fullName ||
            '';


        clean.client.registered =
            Boolean(
                session.client.registered
            );

    }


    /* -------------------------------------------------------------------------
     * KYC
     * -------------------------------------------------------------------------
     */


    if(
        session.kyc &&
        typeof session.kyc === 'object'
    ){

        clean.kyc =
            Object.assign(
                {},
                session.kyc
            );

    }


    /* -------------------------------------------------------------------------
     * ANSWERS
     * -------------------------------------------------------------------------
     */


    if(
        session.answers &&
        typeof session.answers === 'object'
    ){

        clean.answers =
            Object.assign(
                {},
                session.answers
            );

    }


    /* -------------------------------------------------------------------------
     * DIMENSIONS
     * -------------------------------------------------------------------------
     */


    if(
        session.dimensions &&
        typeof session.dimensions === 'object'
    ){

        Object.keys(
            clean.dimensions
        ).forEach(
            function(dimensionId){

                clean.dimensions[
                    dimensionId
                ] = Boolean(
                    session.dimensions[
                        dimensionId
                    ]
                );

            }
        );

    }


    clean.currentDimension =
        session.currentDimension ||
        null;


    clean.completed =
        Boolean(
            session.completed
        );


    clean.completedAt =
        session.completedAt ||
        null;


    /* -------------------------------------------------------------------------
     * RECALCULATE DERIVED VALUES
     * -------------------------------------------------------------------------
     */


    clean.completedIndicatorCount =
        Object.keys(
            clean.answers
        ).length;


    clean.totalScore =
        Object.values(
            clean.answers
        ).reduce(
            function(
                total,
                answer
            ){

                return (
                    total +
                    Number(
                        answer &&
                        answer.score
                    )
                );

            },
            0
        );


    if(
        !Number.isFinite(
            clean.totalScore
        )
    ){

        clean.totalScore =
            0;

    }


    return clean;

};


/* =============================================================================
 * LOAD SESSION
 * =============================================================================
 */


Page02Session.load = function(){

    if(
        !Page02Session.isStorageAvailable()
    ){

        return (
            Page02Session.createEmptySession()
        );

    }


    try{

        const stored =
            sessionStorage.getItem(
                Page02Session.CONFIG.storageKey
            );


        if(
            !stored
        ){

            return (
                Page02Session.createEmptySession()
            );

        }


        const parsed =
            JSON.parse(
                stored
            );


        return (
            Page02Session.normalize(
                parsed
            )
        );

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 session recovery failed:',
            error
        );


        return (
            Page02Session.createEmptySession()
        );

    }

};


/* =============================================================================
 * SAVE SESSION
 * =============================================================================
 */


Page02Session.save = function(session){

    if(
        !Page02Session.isStorageAvailable()
    ){

        return false;

    }


    try{

        const normalized =
            Page02Session.normalize(
                session
            );


        normalized.updatedAt =
            new Date().toISOString();


        sessionStorage.setItem(
            Page02Session.CONFIG.storageKey,
            JSON.stringify(
                normalized
            )
        );


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 session save failed:',
            error
        );


        return false;

    }

};


/* =============================================================================
 * GET SESSION
 * =============================================================================
 */


Page02Session.get = function(){

    return (
        Page02Session.load()
    );

};


/* =============================================================================
 * UPDATE SESSION
 * =============================================================================
 */


Page02Session.update = function(
    updater
){

    const session =
        Page02Session.load();


    if(
        typeof updater ===
        'function'
    ){

        updater(
            session
        );

    }


    Page02Session.save(
        session
    );


    return (
        Page02Session.load()
    );

};


/* =============================================================================
 * CLIENT IDENTITY
 * =============================================================================
 */


Page02Session.setClient = function(
    client
){

    client =
        client || {};


    return Page02Session.update(
        function(session){

            session.client.clientId =
                client.clientId ||
                session.client.clientId ||
                null;


            session.client.peopleId =
                client.peopleId ||
                session.client.peopleId ||
                null;


            session.client.fullName =
                client.fullName ||
                session.client.fullName ||
                '';


            session.client.registered =
                Boolean(
                    session.client.clientId ||
                    session.client.peopleId
                );


            /* -------------------------------------------------------------
             * Preserve legacy shared identity keys.
             * -------------------------------------------------------------
             */


            if(
                session.client.peopleId
            ){

                sessionStorage.setItem(
                    Page02Session.CONFIG.peopleIdStorageKey,
                    session.client.peopleId
                );

            }


            if(
                session.client.fullName
            ){

                sessionStorage.setItem(
                    Page02Session.CONFIG.fullNameStorageKey,
                    session.client.fullName
                );

            }

        }
    );

};


/* =============================================================================
 * GET CLIENT
 * =============================================================================
 */


Page02Session.getClient = function(){

    const session =
        Page02Session.load();


    return session.client;

};


/* =============================================================================
 * HAS REGISTERED CLIENT
 * =============================================================================
 */


Page02Session.hasRegisteredClient = function(){

    const client =
        Page02Session.getClient();


    return Boolean(
        client &&
        (
            client.clientId ||
            client.peopleId
        )
    );

};


/* =============================================================================
 * KYC
 * =============================================================================
 */


Page02Session.setKyc = function(
    kyc
){

    if(
        !kyc ||
        typeof kyc !== 'object'
    ){

        return (
            Page02Session.load()
        );

    }


    return Page02Session.update(
        function(session){

            session.kyc =
                Object.assign(
                    {},
                    session.kyc,
                    kyc
                );

        }
    );

};


/* =============================================================================
 * GET KYC
 * =============================================================================
 */


Page02Session.getKyc = function(){

    return (
        Page02Session.load().kyc
    );

};


/* =============================================================================
 * SET CURRENT DIMENSION
 * =============================================================================
 */


Page02Session.setCurrentDimension = function(
    dimensionId
){

    const dimension =
        window.Page02Data.getDimensionById(
            dimensionId
        );


    if(
        !dimension
    ){

        console.error(
            'CTM PATH™ Invalid Page 02 dimension:',
            dimensionId
        );


        return false;

    }


    Page02Session.update(
        function(session){

            session.currentDimension =
                dimensionId;

        }
    );


    return true;

};


/* =============================================================================
 * GET CURRENT DIMENSION
 * =============================================================================
 */


Page02Session.getCurrentDimension = function(){

    return (
        Page02Session
            .load()
            .currentDimension
    );

};


/* =============================================================================
 * SAVE ANSWER
 * =============================================================================
 *
 * Canonical stored answer:
 *
 * {
 *      indicatorId: "netWorth",
 *      indicatorNumber: 1,
 *      dimensionId: "wealth",
 *      score: 2,
 *      label: "₹5 Cr – ₹7.49 Cr",
 *      value: 50000000,
 *      ideal: "₹10 Cr+"
 * }
 *
 * =============================================================================
 */


Page02Session.setAnswer = function(
    indicatorId,
    score
){

    const indicator =
        window.Page02Data.getIndicator(
            indicatorId
        );


    if(
        !indicator
    ){

        console.error(
            'CTM PATH™ Unknown Page 02 indicator:',
            indicatorId
        );


        return false;

    }


    const normalizedScore =
        Number(score);


    const option =
        indicator.options.find(
            function(candidate){

                return (
                    Number(
                        candidate.score
                    ) ===
                    normalizedScore
                );

            }
        );


    if(
        !option
    ){

        console.error(
            'CTM PATH™ Invalid score for indicator:',
            indicatorId,
            score
        );


        return false;

    }


    const dimension =
        window.Page02Data
            .getIndicatorDimension(
                indicatorId
            );


    Page02Session.update(
        function(session){

            session.answers[
                indicatorId
            ] = {

                indicatorId:
                    indicator.id,

                indicatorNumber:
                    indicator.number,

                dimensionId:
                    dimension
                        ? dimension.id
                        : null,

                score:
                    option.score,

                label:
                    option.label,

                value:
                    option.value,

                ideal:
                    indicator.ideal

            };

        }
    );


    return true;

};


/* =============================================================================
 * REMOVE ANSWER
 * =============================================================================
 */


Page02Session.removeAnswer = function(
    indicatorId
){

    return Page02Session.update(
        function(session){

            delete session.answers[
                indicatorId
            ];

        }
    );

};


/* =============================================================================
 * GET ANSWER
 * =============================================================================
 */


Page02Session.getAnswer = function(
    indicatorId
){

    const session =
        Page02Session.load();


    return (
        session.answers[
            indicatorId
        ] || null
    );

};


/* =============================================================================
 * GET ALL ANSWERS
 * =============================================================================
 */


Page02Session.getAnswers = function(){

    return (
        Page02Session.load().answers
    );

};


/* =============================================================================
 * HAS ANSWER
 * =============================================================================
 */


Page02Session.hasAnswer = function(
    indicatorId
){

    return Boolean(
        Page02Session.getAnswer(
            indicatorId
        )
    );

};


/* =============================================================================
 * GET ANSWERS FOR DIMENSION
 * =============================================================================
 */


Page02Session.getDimensionAnswers = function(
    dimensionId
){

    const session =
        Page02Session.load();


    const dimension =
        window.Page02Data.getDimensionById(
            dimensionId
        );


    if(
        !dimension
    ){

        return [];

    }


    return dimension.indicators
        .map(
            function(indicator){

                return (
                    session.answers[
                        indicator.id
                    ] || null
                );

            }
        )
        .filter(Boolean);

};


/* =============================================================================
 * GET DIMENSION ANSWER COUNT
 * =============================================================================
 */


Page02Session.getDimensionAnswerCount = function(
    dimensionId
){

    return (
        Page02Session
            .getDimensionAnswers(
                dimensionId
            )
            .length
    );

};


/* =============================================================================
 * IS DIMENSION COMPLETE
 * =============================================================================
 */


Page02Session.isDimensionComplete = function(
    dimensionId
){

    const dimension =
        window.Page02Data.getDimensionById(
            dimensionId
        );


    if(
        !dimension
    ){

        return false;

    }


    return dimension.indicators.every(
        function(indicator){

            return (
                Page02Session.hasAnswer(
                    indicator.id
                )
            );

        }
    );

};


/* =============================================================================
 * MARK DIMENSION COMPLETE
 * =============================================================================
 */


Page02Session.completeDimension = function(
    dimensionId
){

    if(
        !Page02Session.isDimensionComplete(
            dimensionId
        )
    ){

        console.warn(
            'CTM PATH™ Cannot complete Page 02 dimension; unanswered indicators remain:',
            dimensionId
        );


        return false;

    }


    Page02Session.update(
        function(session){

            session.dimensions[
                dimensionId
            ] = true;

        }
    );


    return true;

};


/* =============================================================================
 * GET DIMENSION SCORE
 * =============================================================================
 */


Page02Session.getDimensionScore = function(
    dimensionId
){

    return Page02Session
        .getDimensionAnswers(
            dimensionId
        )
        .reduce(
            function(
                total,
                answer
            ){

                return (
                    total +
                    Number(
                        answer.score
                    )
                );

            },
            0
        );

};


/* =============================================================================
 * GET DIMENSION PROGRESS
 * =============================================================================
 */


Page02Session.getDimensionProgress = function(
    dimensionId
){

    const dimension =
        window.Page02Data.getDimensionById(
            dimensionId
        );


    if(
        !dimension
    ){

        return {

            answered: 0,

            total: 0,

            percent: 0,

            score: 0,

            maximumScore: 0,

            complete: false

        };

    }


    const answered =
        Page02Session.getDimensionAnswerCount(
            dimensionId
        );


    const total =
        dimension.indicators.length;


    const score =
        Page02Session.getDimensionScore(
            dimensionId
        );


    return {

        answered:
            answered,

        total:
            total,

        percent:
            total
                ? Math.round(
                    (
                        answered /
                        total
                    ) *
                    100
                )
                : 0,

        score:
            score,

        maximumScore:
            total *
            window.Page02Data.CONFIG.maximumScorePerIndicator,

        complete:
            answered === total

    };

};


/* =============================================================================
 * GET TOTAL SCORE
 * =============================================================================
 */


Page02Session.getTotalScore = function(){

    return (
        Page02Session
            .load()
            .totalScore
    );

};


/* =============================================================================
 * GET ANSWERED INDICATOR COUNT
 * =============================================================================
 */


Page02Session.getAnsweredCount = function(){

    return (
        Page02Session
            .load()
            .completedIndicatorCount
    );

};


/* =============================================================================
 * GET OVERALL PROGRESS
 * =============================================================================
 */


Page02Session.getProgress = function(){

    const answered =
        Page02Session.getAnsweredCount();


    const total =
        window.Page02Data.CONFIG.indicatorCount;


    return {

        answered:
            answered,

        total:
            total,

        percent:
            Math.round(
                (
                    answered /
                    total
                ) *
                100
            ),

        score:
            Page02Session.getTotalScore(),

        maximumScore:
            window.Page02Data.CONFIG.maximumScore,

        complete:
            answered === total

    };

};


/* =============================================================================
 * ARE ALL DIMENSIONS COMPLETE?
 * =============================================================================
 */


Page02Session.isScorecardComplete = function(){

    return window.Page02Data.DIMENSIONS.every(
        function(dimension){

            return (
                Page02Session.isDimensionComplete(
                    dimension.id
                )
            );

        }
    );

};


/* =============================================================================
 * BUILD DIMENSION RESULTS
 * =============================================================================
 */


Page02Session.buildDimensionResults = function(){

    return window.Page02Data.DIMENSIONS.map(
        function(dimension){

            const progress =
                Page02Session.getDimensionProgress(
                    dimension.id
                );


            return {

                id:
                    dimension.id,

                number:
                    dimension.number,

                tamil:
                    dimension.tamil,

                english:
                    dimension.english,

                score:
                    progress.score,

                maximumScore:
                    progress.maximumScore,

                percent:
                    progress.maximumScore
                        ? Math.round(
                            (
                                progress.score /
                                progress.maximumScore
                            ) *
                            100
                        )
                        : 0,

                complete:
                    progress.complete

            };

        }
    );

};


/* =============================================================================
 * BUILD ORDERED ANSWER ARRAY
 * =============================================================================
 *
 * Object storage is convenient during the journey.
 *
 * The backend/reporting layer benefits from a deterministic array ordered
 * according to the canonical scorecard master.
 *
 * =============================================================================
 */


Page02Session.buildOrderedAnswers = function(){

    const session =
        Page02Session.load();


    return window.Page02Data
        .getAllIndicators()
        .map(
            function(indicator){

                return (
                    session.answers[
                        indicator.id
                    ] || null
                );

            }
        )
        .filter(Boolean);

};


/* =============================================================================
 * BUILD FINAL RESULT
 * =============================================================================
 */


Page02Session.buildResult = function(){

    const session =
        Page02Session.load();


    const totalScore =
        session.totalScore;


    const maximumScore =
        window.Page02Data.CONFIG.maximumScore;


    const percent =
        maximumScore
            ? Math.round(
                (
                    totalScore /
                    maximumScore
                ) *
                100
            )
            : 0;


    return {

        version:
            Page02Session.version,

        peopleId:
            session.client.peopleId,

        clientId:
            session.client.clientId,

        fullName:
            session.client.fullName,

        kyc:
            session.kyc,

        score:
            totalScore,

        totalScore:
            totalScore,

        maximumScore:
            maximumScore,

        percent:
            percent,

        answeredIndicators:
            session.completedIndicatorCount,

        totalIndicators:
            window.Page02Data.CONFIG.indicatorCount,

        dimensions:
            Page02Session.buildDimensionResults(),

        answers:
            Page02Session.buildOrderedAnswers(),

        complete:
            Page02Session.isScorecardComplete(),

        startedAt:
            session.startedAt,

        completedAt:
            session.completedAt

    };

};


/* =============================================================================
 * COMPLETE SCORECARD
 * =============================================================================
 */


Page02Session.complete = function(){

    if(
        !Page02Session.isScorecardComplete()
    ){

        console.warn(
            'CTM PATH™ Page 02 cannot be completed because unanswered indicators remain.'
        );


        return null;

    }


    Page02Session.update(
        function(session){

            session.completed =
                true;


            session.completedAt =
                new Date().toISOString();


            window.Page02Data.DIMENSIONS.forEach(
                function(dimension){

                    session.dimensions[
                        dimension.id
                    ] = true;

                }
            );

        }
    );


    const result =
        Page02Session.buildResult();


    try{

        sessionStorage.setItem(
            Page02Session.CONFIG.resultStorageKey,
            JSON.stringify(
                result
            )
        );

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 result persistence failed:',
            error
        );

    }


    return result;

};


/* =============================================================================
 * GET STORED RESULT
 * =============================================================================
 */


Page02Session.getStoredResult = function(){

    try{

        const stored =
            sessionStorage.getItem(
                Page02Session.CONFIG.resultStorageKey
            );


        return stored
            ? JSON.parse(stored)
            : null;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 result recovery failed:',
            error
        );


        return null;

    }

};


/* =============================================================================
 * BACKEND PAYLOAD
 * =============================================================================
 *
 * This does NOT call CTM_API.
 *
 * It only prepares the canonical discovery payload.
 *
 * =============================================================================
 */


Page02Session.buildDiscoveryPayload = function(){

    const result =
        Page02Session.buildResult();


    return {

        peopleId:
            result.peopleId,

        clientId:
            result.clientId,

        page:
            2,

        module:
            'Middle Class → Millionaire Lifestyle Scorecard™',

        score:
            result.totalScore,

        maximumScore:
            result.maximumScore,

        percentage:
            result.percent,

        dimensions:
            result.dimensions,

        answers:
            result.answers,

        kyc:
            result.kyc

    };

};


/* =============================================================================
 * SESSION SUMMARY
 * =============================================================================
 */


Page02Session.getSummary = function(){

    const session =
        Page02Session.load();


    const progress =
        Page02Session.getProgress();


    return {

        version:
            Page02Session.version,

        peopleId:
            session.client.peopleId,

        clientId:
            session.client.clientId,

        fullName:
            session.client.fullName,

        currentDimension:
            session.currentDimension,

        answered:
            progress.answered,

        totalIndicators:
            progress.total,

        progress:
            progress.percent,

        score:
            progress.score,

        maximumScore:
            progress.maximumScore,

        complete:
            progress.complete

    };

};


/* =============================================================================
 * VALIDATE SESSION
 * =============================================================================
 */


Page02Session.validate = function(){

    const session =
        Page02Session.load();


    const errors =
        [];


    const answers =
        session.answers;


    Object.keys(
        answers
    ).forEach(
        function(indicatorId){

            const indicator =
                window.Page02Data.getIndicator(
                    indicatorId
                );


            if(
                !indicator
            ){

                errors.push(
                    'Unknown stored indicator: ' +
                    indicatorId
                );


                return;

            }


            const answer =
                answers[
                    indicatorId
                ];


            const validOption =
                indicator.options.some(
                    function(option){

                        return (
                            Number(option.score) ===
                            Number(answer.score)
                        );

                    }
                );


            if(
                !validOption
            ){

                errors.push(
                    'Invalid stored score for indicator: ' +
                    indicatorId
                );

            }

        }
    );


    return {

        valid:
            errors.length === 0,

        answered:
            Object.keys(
                answers
            ).length,

        score:
            session.totalScore,

        errors:
            errors

    };

};


/* =============================================================================
 * RESET PAGE 02
 * =============================================================================
 */


Page02Session.reset = function(){

    try{

        sessionStorage.removeItem(
            Page02Session.CONFIG.storageKey
        );


        sessionStorage.removeItem(
            Page02Session.CONFIG.resultStorageKey
        );


        return true;

    }
    catch(error){

        console.error(
            'CTM PATH™ Page 02 reset failed:',
            error
        );


        return false;

    }

};


/* =============================================================================
 * PUBLIC EXPOSURE
 * =============================================================================
 */


window.Page02Session =
    Page02Session;


/* =============================================================================
 * INITIAL INTEGRITY CHECK
 * =============================================================================
 */


const validation =
    Page02Session.validate();


if(
    validation.valid
){

    console.info(
        'CTM PATH™ Page 02 session ready:',
        Page02Session.getSummary()
    );

}
else{

    console.error(
        'CTM PATH™ Page 02 session integrity failure:',
        validation
    );

}


/* =============================================================================
 * END
 * =============================================================================
 *
 * LOAD ORDER:
 *
 *      <script src="js/page02/page02-data.js"></script>
 *      <script src="js/page02/page02-session.js"></script>
 *
 * PAGE-SPECIFIC CONTROLLER LOADS AFTER THESE.
 *
 * NEXT:
 *
 *      js/page02/page02a.js
 *
 * =============================================================================
 */


})(window);

