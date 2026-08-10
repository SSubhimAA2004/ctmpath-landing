
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
       page05.js

   PAGE:
       PAGE 05 — PERSONAL LIFE DIAGNOSIS™

   VERSION:
       2.0

   PURPOSE:
       Convert Page 02 Financial Confidence Discovery™
       + Page 04 KALA CHAKRA™ Life Alignment™

       into a coherent Personal Life Diagnosis™.

   RESPONSIBILITIES:

       ✓ Read Page 02 result
       ✓ Read Page 04 alignment result
       ✓ Validate required data
       ✓ Determine current life status
       ✓ Identify strongest life pillars
       ✓ Identify greatest growth opportunities
       ✓ Analyse five financial/lifestyle dimensions
       ✓ Generate primary insight
       ✓ Generate root patterns
       ✓ Generate cross-connections
       ✓ Generate transformation lever
       ✓ Generate priority sequence
       ✓ Generate transformation hypothesis
       ✓ Render all Page 05 dynamic content
       ✓ Save diagnosis for Page 06
       ✓ Expose CTM_PAGE05 public API

   DATA CONTRACT:

       Page 02:
           ctm_page02_result

       Page 04:
           CTM_PAGE04_ALIGNMENT_RESULT

       Page 05:
           CTM_PAGE05_DIAGNOSIS_RESULT

   IMPORTANT:

       Page 05 does NOT recalculate the Page 04 Life Alignment score.
       Page 04 remains the scoring authority.

   ========================================================================== */


/* ==========================================================================
   01. GLOBAL IIFE
   ========================================================================== */

(function (window, document) {

    "use strict";


    /* ======================================================================
       02. CONFIGURATION
       ====================================================================== */

    const CONFIG = {

        version:
            "2.0",

        storage: {

            page02:
                "ctm_page02_result",

            page04:
                "CTM_PAGE04_ALIGNMENT_RESULT",

            page05:
                "CTM_PAGE05_DIAGNOSIS_RESULT"

        },

        expected: {

            dimensions:
                5,

            pillars:
                12,

            maximumLifeScore:
                120

        }

    };


    /* ======================================================================
       03. LIFE LEVEL DEFINITIONS

       These thresholds remain aligned with Page 04.
       ====================================================================== */

    const LIFE_LEVELS = {

        FOUNDATION: {

            tamil:
                "அடித்தளம் அமைக்கும் நிலை",

            english:
                "FOUNDATION",

            copyTamil:
                "உங்கள் வாழ்க்கையின் சில முக்கிய பகுதிகள் இன்னும் உறுதியான அடித்தளத்தை நாடுகின்றன. முதலில் மிக முக்கியமான பகுதிகளில் நிலைத்தன்மையை உருவாக்குவது அதிக பயன் தரும்.",

            copyEnglish:
                "Several important areas still need a stronger foundation. Stability in a few high-impact areas should come first."

        },


        STABILISING: {

            tamil:
                "நிலைப்படுத்தும் நிலை",

            english:
                "STABILISING",

            copyTamil:
                "சில பகுதிகள் செயல்படுகின்றன; சில பகுதிகள் இன்னும் நிலைத்தன்மையைத் தேடுகின்றன. சிதறிய முயற்சிகளை ஒழுங்கான அமைப்புகளாக மாற்றுவது அடுத்த கட்டம்.",

            copyEnglish:
                "Some areas are working while others still need stability. Turn scattered effort into reliable systems."

        },


        DEVELOPING: {

            tamil:
                "வளரும் நிலை",

            english:
                "DEVELOPING",

            copyTamil:
                "உங்கள் வாழ்க்கையில் முன்னேற்றம் உள்ளது; ஆனால் வளர்ச்சி எல்லா பகுதிகளிலும் ஒரே வேகத்தில் இல்லை. வலிமையான பகுதிகளைப் பயன்படுத்தி பின்தங்கிய பகுதிகளை உயர்த்துங்கள்.",

            copyEnglish:
                "There is clear progress, but growth is uneven. Use stronger areas to lift those that have not yet caught up."

        },


        STRONG: {

            tamil:
                "வலுவான நிலை",

            english:
                "STRONG",

            copyTamil:
                "பல முக்கிய பகுதிகள் வலுவாக இயங்குகின்றன. சில முக்கிய இடங்களில் துல்லியமான மேம்பாடு அதிக விளைவை உருவாக்கும்.",

            copyEnglish:
                "Many important areas are strong. Precise improvement in a few leverage points may create the greatest value."

        },


        THRIVING: {

            tamil:
                "செழித்து முன்னேறும் நிலை",

            english:
                "THRIVING",

            copyTamil:
                "பெரும்பாலான பகுதிகள் உயர்ந்த ஒத்திசைவில் இயங்குகின்றன. உங்கள் வலிமைகளை நீடித்த சுதந்திரம், தாக்கம் மற்றும் பங்களிப்பாக மாற்றுவது அடுத்த கட்டம்.",

            copyEnglish:
                "Most areas are highly aligned. Convert strength into sustained freedom, impact and contribution."

        }

    };


    /* ======================================================================
       04. PAGE 02 DIMENSION DEFINITIONS

       These names are used only when the Page 02 payload does not already
       provide display names.
       ====================================================================== */

    const DIMENSION_NAMES = {

        wealth: {

            tamil:
                "செல்வ அடித்தளம்",

            english:
                "WEALTH"

        },

        incomeCashFlow: {

            tamil:
                "வருமானம் & பணப்புழக்கம்",

            english:
                "INCOME & CASH FLOW"

        },

        assets: {

            tamil:
                "சொத்துகள்",

            english:
                "ASSETS"

        },

        lifestyleFreedom: {

            tamil:
                "வாழ்க்கைமுறை & சுதந்திரம்",

            english:
                "LIFESTYLE & FREEDOM"

        },

        protectionContribution: {

            tamil:
                "பாதுகாப்பு & பங்களிப்பு",

            english:
                "PROTECTION & CONTRIBUTION"

        }

    };


    /* ======================================================================
       05. DOM HELPERS
       ====================================================================== */

    function getElement(id) {

        return document.getElementById(id);

    }


    function setText(id, value) {

        const element =
            getElement(id);

        if (!element) {

            return;

        }


        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {

            element.textContent =
                "—";

            return;

        }


        element.textContent =
            String(value);

    }


    function setHTML(id, value) {

        const element =
            getElement(id);

        if (!element) {

            return;

        }


        element.innerHTML =
            value === undefined ||
            value === null
                ? ""
                : String(value);

    }


    function setWidth(id, percentage) {

        const element =
            getElement(id);

        if (!element) {

            return;

        }


        const safePercentage =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(percentage) || 0
                )
            );


        element.style.width =
            safePercentage + "%";

    }


    /* ======================================================================
       06. DATA HELPERS
       ====================================================================== */

    function toNumber(value) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : 0;

    }


    function readStorage(key) {

        try {

            const raw =
                sessionStorage.getItem(key);

            if (!raw) {

                return null;

            }


            return JSON.parse(raw);

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page05 storage read failed:",
                key,
                error
            );

            return null;

        }

    }


    function saveStorage(key, value) {

        try {

            sessionStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page05 storage write failed:",
                key,
                error
            );

            return false;

        }

    }


    function cloneArray(value) {

        return Array.isArray(value)
            ? value.slice()
            : [];

    }


    function sortDescending(array, property) {

        return cloneArray(array).sort(
            function (a, b) {

                return (
                    toNumber(b[property]) -
                    toNumber(a[property])
                );

            }
        );

    }


    function sortAscending(array, property) {

        return cloneArray(array).sort(
            function (a, b) {

                return (
                    toNumber(a[property]) -
                    toNumber(b[property])
                );

            }
        );

    }


    function pillarEnglish(pillar) {

        if (!pillar) {

            return "—";

        }


        return (
            pillar.english ||
            pillar.key ||
            "—"
        );

    }


    function pillarTamil(pillar) {

        if (!pillar) {

            return "—";

        }


        return (
            pillar.tamil ||
            pillar.key ||
            "—"
        );

    }


    function getDimensionNames(dimension) {

        if (!dimension) {

            return {

                tamil:
                    "—",

                english:
                    "—"

            };

        }


        const fallback =
            DIMENSION_NAMES[
                dimension.dimensionId
            ] || null;


        return {

            tamil:
                dimension.tamil ||
                (
                    fallback
                        ? fallback.tamil
                        : dimension.dimensionId
                ) ||
                "—",

            english:
                dimension.english ||
                (
                    fallback
                        ? fallback.english
                        : dimension.dimensionId
                ) ||
                "—"

        };

    }


    /* ======================================================================
       07. DIMENSION INTERPRETATION
       ====================================================================== */

    function getDimensionInterpretation(
        dimension
    ) {

        const names =
            getDimensionNames(
                dimension
            );


        const percentage =
            toNumber(
                dimension.percentage
            );


        if (percentage < 50) {

            return {

                tamil:
                    names.tamil,

                english:
                    names.english,

                copyTamil:
                    "இந்தப் பகுதி தற்போது அதிக கவனத்தை தேடுகிறது. தனிப்பட்ட முயற்சியை விட தெளிவான அமைப்பு மற்றும் தொடர்ச்சியான முன்னேற்றம் முக்கியம்.",

                copyEnglish:
                    "This area currently needs focused attention. A reliable system and consistent progress matter more than simply adding effort."

            };

        }


        if (percentage < 75) {

            return {

                tamil:
                    names.tamil,

                english:
                    names.english,

                copyTamil:
                    "இந்தப் பகுதி வளர்ந்து வருகிறது. ஏற்கனவே உள்ள முன்னேற்றத்தை தொடர்ச்சியான அமைப்பாக மாற்றுவது அடுத்த வாய்ப்பு.",

                copyEnglish:
                    "This area is developing. The next opportunity is to turn existing progress into a consistent system."

            };

        }


        return {

            tamil:
                names.tamil,

            english:
                names.english,

            copyTamil:
                "இந்தப் பகுதி உங்கள் தற்போதைய வலிமைகளில் ஒன்றாக உள்ளது. இதை பின்தங்கிய பகுதிகளுக்கு ஆதரவாக பயன்படுத்தலாம்.",

            copyEnglish:
                "This is one of your current strengths. Use it deliberately to support areas that are still developing."

        };

    }


    /* ======================================================================
       08. LOAD INPUT DATA
       ====================================================================== */

    function loadInputs() {

        const page02 =
            readStorage(
                CONFIG.storage.page02
            );


        const page04 =
            readStorage(
                CONFIG.storage.page04
            );


        if (!page02) {

            throw new Error(
                "Page 02 result is missing."
            );

        }


        if (!page04) {

            throw new Error(
                "Page 04 alignment result is missing."
            );

        }


        if (
            !Array.isArray(
                page02.dimensions
            )
        ) {

            throw new Error(
                "Page 02 dimensions are missing."
            );

        }


        if (
            page02.dimensions.length !==
            CONFIG.expected.dimensions
        ) {

            throw new Error(
                "Page 02 must contain exactly five dimensions."
            );

        }


        if (
            !Array.isArray(
                page04.pillars
            )
        ) {

            throw new Error(
                "Page 04 pillar results are missing."
            );

        }


        if (
            page04.pillars.length !==
            CONFIG.expected.pillars
        ) {

            throw new Error(
                "Page 04 must contain exactly twelve pillars."
            );

        }


        const dimensions =
            page02.dimensions.map(
                function (dimension) {

                    return {

                        ...dimension,

                        score:
                            toNumber(
                                dimension.score
                            ),

                        maximumScore:
                            toNumber(
                                dimension.maximumScore
                            ),

                        percentage:
                            toNumber(
                                dimension.percentage
                            )

                    };

                }
            );


        const pillars =
            page04.pillars.map(
                function (pillar) {

                    return {

                        ...pillar,

                        score:
                            toNumber(
                                pillar.score
                            )

                    };

                }
            );


        return {

            page02:
                page02,

            page04:
                page04,

            dimensions:
                dimensions,

            pillars:
                pillars

        };

    }


    /* ======================================================================
       09. LIFE LEVEL
       ====================================================================== */

    function resolveLifeLevel(
        page04
    ) {

        const supplied =
            String(
                page04.lifeLevel ||
                ""
            ).toUpperCase();


        if (
            LIFE_LEVELS[
                supplied
            ]
        ) {

            return LIFE_LEVELS[
                supplied
            ];

        }


        const percentage =
            toNumber(
                page04.percentage
            );


        if (percentage <= 30) {

            return LIFE_LEVELS.FOUNDATION;

        }


        if (percentage <= 50) {

            return LIFE_LEVELS.STABILISING;

        }


        if (percentage <= 70) {

            return LIFE_LEVELS.DEVELOPING;

        }


        if (percentage <= 85) {

            return LIFE_LEVELS.STRONG;

        }


        return LIFE_LEVELS.THRIVING;

    }


    /* ======================================================================
       10. BUILD STRENGTH CARDS
       ====================================================================== */

    function buildStrengths(
        pillars,
        dimensions
    ) {

        const strongestPillars =
            sortDescending(
                pillars,
                "score"
            );


        const strongestDimensions =
            sortDescending(
                dimensions,
                "percentage"
            );


        const strengths = [];


        strongestPillars
            .slice(0, 2)
            .forEach(
                function (pillar) {

                    strengths.push({

                        tamil:
                            pillarTamil(
                                pillar
                            ),

                        english:
                            pillarEnglish(
                                pillar
                            ),

                        score:
                            pillar.score,

                        maximumScore:
                            10,

                        copyTamil:
                            "இந்த வாழ்க்கைப் பகுதி உங்கள் வலிமையான வளங்களில் ஒன்றாக உள்ளது. இதை வளர்ச்சி பகுதிகளுக்கு ஆதரவாக பயன்படுத்துங்கள்.",

                        copyEnglish:
                            "This life area is one of your strongest resources. Use it deliberately to support developing areas."

                    });

                }
            );


        if (
            strongestDimensions.length
        ) {

            const dimension =
                strongestDimensions[0];


            const interpretation =
                getDimensionInterpretation(
                    dimension
                );


            strengths.push({

                tamil:
                    interpretation.tamil,

                english:
                    interpretation.english,

                score:
                    dimension.score,

                maximumScore:
                    dimension.maximumScore,

                percentage:
                    dimension.percentage,

                copyTamil:
                    interpretation.copyTamil,

                copyEnglish:
                    interpretation.copyEnglish

            });

        }


        return strengths.slice(
            0,
            3
        );

    }


    /* ======================================================================
       11. BUILD OPPORTUNITIES
       ====================================================================== */

    function buildOpportunities(
        pillars,
        dimensions
    ) {

        const weakestPillars =
            sortAscending(
                pillars,
                "score"
            );


        const weakestDimensions =
            sortAscending(
                dimensions,
                "percentage"
            );


        const opportunities = [];


        weakestPillars
            .slice(0, 2)
            .forEach(
                function (pillar) {

                    opportunities.push({

                        tamil:
                            pillarTamil(
                                pillar
                            ),

                        english:
                            pillarEnglish(
                                pillar
                            ),

                        score:
                            pillar.score,

                        maximumScore:
                            10,

                        copyTamil:
                            "குறைந்த மதிப்பெண் தோல்வி அல்ல. இங்கு செய்யப்படும் திட்டமிட்ட முன்னேற்றம் உங்கள் மொத்த வாழ்க்கை சமநிலையை உயர்த்தக்கூடும்.",

                        copyEnglish:
                            "A lower score is not a verdict. Focused progress here may materially improve overall life alignment."

                    });

                }
            );


        if (
            weakestDimensions.length
        ) {

            const dimension =
                weakestDimensions[0];


            const interpretation =
                getDimensionInterpretation(
                    dimension
                );


            opportunities.push({

                tamil:
                    interpretation.tamil,

                english:
                    interpretation.english,

                score:
                    dimension.score,

                maximumScore:
                    dimension.maximumScore,

                percentage:
                    dimension.percentage,

                copyTamil:
                    interpretation.copyTamil,

                copyEnglish:
                    interpretation.copyEnglish

            });

        }


        return opportunities.slice(
            0,
            3
        );

    }


    /* ======================================================================
       12. PRIMARY INSIGHT
       ====================================================================== */

    function buildPrimaryInsight(
        page04,
        strongestPillar,
        growthPillar,
        strongestDimension,
        weakestDimension
    ) {

        const lifeAlignment =
            toNumber(
                page04.percentage
            );


        const pillarSpread =
            toNumber(
                strongestPillar?.score
            ) -
            toNumber(
                growthPillar?.score
            );


        const dimensionSpread =
            toNumber(
                strongestDimension?.percentage
            ) -
            toNumber(
                weakestDimension?.percentage
            );


        if (
            pillarSpread >= 4 ||
            dimensionSpread >= 35
        ) {

            return {

                tamil:
                    "உங்கள் வளர்ச்சி வலுவாக இருக்கிறது — ஆனால் சமமாக இல்லை.",

                english:
                    "YOUR GROWTH IS REAL — BUT UNEVEN.",

                copyTamil:
                    "சில பகுதிகள் மிகவும் வலுவாக இருக்கின்றன; சில பகுதிகள் அந்த வளர்ச்சியின் வேகத்தை இன்னும் எட்டவில்லை.",

                copyEnglish:
                    "Some parts of your life are strong while others have not yet caught up.",

                keyTamil:
                    "ஏற்கனவே உள்ள வலிமையை பின்தங்கிய பகுதிகளுடன் இணைக்க வேண்டும்.",

                keyEnglish:
                    "Connect the strength you already have to the areas that are lagging."

            };

        }


        if (
            lifeAlignment < 51
        ) {

            return {

                tamil:
                    "உங்களுக்கு இன்னும் அதிக முயற்சி மட்டும் தேவையில்லை — வலுவான அடித்தளம் தேவை.",

                english:
                    "YOU MAY NOT NEED MORE EFFORT — YOU NEED A STRONGER FOUNDATION.",

                copyTamil:
                    "பல பகுதிகளில் முயற்சியைப் பரப்புவதற்கு முன், அடிப்படை நிலைத்தன்மையை உருவாக்கும் பகுதிகளை வலுப்படுத்துங்கள்.",

                copyEnglish:
                    "Before spreading effort widely, strengthen the areas that create foundational stability.",

                keyTamil:
                    "நிலைத்தன்மை உருவானால், முன்னேற்றம் எளிதாகிறது.",

                keyEnglish:
                    "When stability improves, progress becomes easier to sustain."

            };

        }


        return {

            tamil:
                "உங்கள் அடுத்த நிலை பெரிய மாற்றத்தில் இல்லை — சரியான முன்னுரிமையில் உள்ளது.",

            english:
                "YOUR NEXT LEVEL IS ABOUT THE RIGHT PRIORITY.",

            copyTamil:
                "உங்கள் வாழ்க்கையில் ஏற்கனவே பல செயல்படும் வளங்கள் உள்ளன. அதிக தாக்கத்தை உருவாக்கும் பகுதிகளை சரியான வரிசையில் மேம்படுத்துங்கள்.",

            copyEnglish:
                "You already have several functioning resources. Improve the highest-impact areas in the right sequence.",

            keyTamil:
                "சரியான வரிசை, அதிக முயற்சியை விட சக்திவாய்ந்ததாக இருக்கலாம்.",

            keyEnglish:
                "The right sequence can be more powerful than simply adding more effort."

        };

    }


    /* ======================================================================
       13. ROOT PATTERN ANALYSIS
       ====================================================================== */

    function buildRootPatterns(
        strongestPillar,
        growthPillar,
        strongestDimension,
        weakestDimension
    ) {

        const strongestPillarTamil =
            pillarTamil(
                strongestPillar
            );


        const weakestPillarTamil =
            pillarTamil(
                growthPillar
            );


        const strongestDimensionNames =
            getDimensionNames(
                strongestDimension
            );


        const weakestDimensionNames =
            getDimensionNames(
                weakestDimension
            );


        return [

            {

                tamil:
                    "சமமற்ற வளர்ச்சி",

                english:
                    "UNEVEN DEVELOPMENT",

                copyTamil:
                    `${weakestPillarTamil} மற்றும் ${pillarTamil(
                        weakestDimension
                            ? {
                                tamil:
                                    weakestDimensionNames.tamil,
                                english:
                                    weakestDimensionNames.english
                              }
                            : growthPillar
                    )} ஆகிய பகுதிகள் உங்கள் வலிமையான பகுதிகளின் வேகத்தை இன்னும் எட்டாமல் இருக்கலாம்.`,

                copyEnglish:
                    `${pillarEnglish(growthPillar)} and ${weakestDimensionNames.english} may not yet have caught up with the stronger parts of your life.`

            },


            {

                tamil:
                    "வலிமை இன்னும் முழு leverage ஆக மாறவில்லை",

                english:
                    "STRENGTH NOT YET CONVERTED INTO LEVERAGE",

                copyTamil:
                    "ஒரு பகுதியில் உள்ள வலிமை மற்றொரு பகுதியில் தானாக முன்னேற்றத்தை உருவாக்காது. அதை திட்டமிட்டு இணைக்க வேண்டும்.",

                copyEnglish:
                    "Strength in one area does not automatically improve another. It needs to be deliberately converted into leverage."

            },


            {

                tamil:
                    "முயற்சியை விட அமைப்பு தேவை",

                english:
                    "SYSTEMS MAY NEED TO CATCH UP WITH EFFORT",

                copyTamil:
                    `${weakestDimensionNames.tamil} பகுதியில் காணப்படும் இடைவெளி அதிக முயற்சியை விட நம்பகமான அமைப்பு தேவைப்படுவதைச் சுட்டிக்காட்டலாம்.`,

                copyEnglish:
                    `The gap in ${weakestDimensionNames.english} may indicate a need for a more reliable system rather than simply more effort.`

            }

        ];

    }


    /* ======================================================================
       14. CROSS-CONNECTION ANALYSIS
       ====================================================================== */

    function buildCrossConnections() {

        return [

            {

                tamil:
                    "வருமானம் → பொருளாதார சுதந்திரம்",

                english:
                    "INCOME → FINANCIAL FREEDOM",

                copyTamil:
                    "வருமானம் உயர்வது மட்டும் பொருளாதார சுதந்திரத்தை உறுதி செய்யாது. பணப்புழக்கம், சொத்து உருவாக்கம் மற்றும் நீண்டகால கட்டமைப்பு ஒன்றாக செயல்பட வேண்டும்.",

                copyEnglish:
                    "Higher income alone does not guarantee financial freedom. Cash flow, asset creation and long-term structure need to work together."

            },


            {

                tamil:
                    "சொத்துகள் → நேர சுதந்திரம்",

                english:
                    "ASSETS → TIME FREEDOM",

                copyTamil:
                    "சொத்துகள் மற்றும் அமைப்புகள் வளரும்போது, உங்கள் நேரத்தின் மீது அதிக கட்டுப்பாடு உருவாகலாம்.",

                copyEnglish:
                    "As assets and systems strengthen, greater control over time can emerge."

            },


            {

                tamil:
                    "வாழ்க்கை சுதந்திரம் → பங்களிப்பு",

                english:
                    "LIFESTYLE FREEDOM → CONTRIBUTION",

                copyTamil:
                    "நேரம், பணம் மற்றும் தேர்வு சுதந்திரம் அதிகரிக்கும்போது, பங்களிப்பை அதிக நோக்கத்துடன் வடிவமைக்க முடியும்.",

                copyEnglish:
                    "As freedom of time, money and choice increases, contribution can be shaped with greater intention."

            }

        ];

    }


    /* ======================================================================
       15. LIFE PATTERN
       ====================================================================== */

    function buildLifePattern(
        strongestPillar,
        growthPillar,
        strongestDimension,
        weakestDimension
    ) {

        const strongestDimensionNames =
            getDimensionNames(
                strongestDimension
            );


        const weakestDimensionNames =
            getDimensionNames(
                weakestDimension
            );


        return {

            tamil:
                `உங்கள் தற்போதைய பெரிய படம்: ${pillarTamil(
                    strongestPillar
                )} உங்கள் முன்னேற்றத்தை ஆதரிக்கிறது; ${pillarTamil(
                    growthPillar
                )} அதிக கவனத்தை நாடுகிறது. ${strongestDimensionNames.tamil} வலிமையை ${weakestDimensionNames.tamil} முன்னேற்றத்துடன் இணைத்தால் மொத்த சமநிலை உயரக்கூடும்.`,

            english:
                `Your current pattern shows ${pillarEnglish(
                    strongestPillar
                )} pulling you forward while ${pillarEnglish(
                    growthPillar
                )} needs focused attention. Connecting the strength of ${strongestDimensionNames.english} to the development of ${weakestDimensionNames.english} may improve overall alignment.`

        };

    }


    /* ======================================================================
       16. TRANSFORMATION LEVER
       ====================================================================== */

    function buildTransformationLever(
        growthPillar,
        weakestDimension
    ) {

        const pillarTa =
            pillarTamil(
                growthPillar
            );


        const pillarEn =
            pillarEnglish(
                growthPillar
            );


        const dimensionNames =
            getDimensionNames(
                weakestDimension
            );


        return {

            tamil:
                pillarTa,

            english:
                pillarEn,

            copyTamil:
                `${pillarTa} தற்போது அதிக வளர்ச்சி இடம் கொண்ட பகுதியாகத் தெரிகிறது. இதனை ${dimensionNames.tamil} பகுதியில் செய்யும் நடைமுறை மாற்றங்களுடன் இணைத்தால் பல பகுதிகளில் முன்னேற்றம் உருவாகலாம்.`,

            copyEnglish:
                `${pillarEn} currently shows the greatest room for growth. Linking it with practical improvement in ${dimensionNames.english} may create progress across several connected areas.`

        };

    }


    /* ======================================================================
       17. PRIORITIES
       ====================================================================== */

    function buildPriorities(
        pillars,
        weakestDimension
    ) {

        const weakest =
            sortAscending(
                pillars,
                "score"
            );


        const first =
            weakest[0] ||
            null;


        const second =
            weakest[1] ||
            null;


        const dimensionNames =
            getDimensionNames(
                weakestDimension
            );


        return [

            {

                number:
                    "01",

                tamil:
                    pillarTamil(first),

                english:
                    pillarEnglish(first),

                copyTamil:
                    "முதலில் இந்த வாழ்க்கைப் பகுதியில் ஒரு தெளிவான, அளவிடக்கூடிய முன்னேற்றத்தை உருவாக்குங்கள்.",

                copyEnglish:
                    "Create one clear, measurable improvement in this life area first."

            },


            {

                number:
                    "02",

                tamil:
                    dimensionNames.tamil,

                english:
                    dimensionNames.english,

                copyTamil:
                    "இந்தப் பரிமாணத்தில் தனிப்பட்ட முயற்சியை நம்பகமான அமைப்பாக மாற்றுங்கள்.",

                copyEnglish:
                    "Turn repeated personal effort in this dimension into a reliable system."

            },


            {

                number:
                    "03",

                tamil:
                    pillarTamil(second),

                english:
                    pillarEnglish(second),

                copyTamil:
                    "முதல் இரண்டு முன்னுரிமைகள் நிலைபெற்ற பிறகு இந்தப் பகுதியை வலுப்படுத்துங்கள்.",

                copyEnglish:
                    "Once the first two priorities become stable, strengthen this area next."

            }

        ];

    }


    /* ======================================================================
       18. TRANSFORMATION HYPOTHESIS
       ====================================================================== */

    function buildHypothesis(
        priorities,
        strongestPillar
    ) {

        const priorityOne =
            priorities[0] ||
            {};

        const priorityTwo =
            priorities[1] ||
            {};


        return {

            tamil:
                `நீங்கள் ${priorityOne.tamil} பகுதியில் முன்னேற்றத்தை உருவாக்கி, ${priorityTwo.tamil} பகுதியில் நம்பகமான அமைப்பை கட்டி, ${pillarTamil(
                    strongestPillar
                )} வலிமையை ஆதரவாக பயன்படுத்தினால், உங்கள் மொத்த வாழ்க்கை சமநிலை குறிப்பிடத்தக்க அளவில் உயரக்கூடும்.`,

            english:
                `If you create focused progress in ${priorityOne.english}, build a reliable system around ${priorityTwo.english}, and use your strength in ${pillarEnglish(
                    strongestPillar
                )} to support that change, your overall life alignment may improve meaningfully.`

        };

    }


    /* ======================================================================
       19. BUILD COMPLETE DIAGNOSIS
       ====================================================================== */

    function buildDiagnosis(
        input
    ) {

        const page04 =
            input.page04;


        const pillars =
            input.pillars;


        const dimensions =
            input.dimensions;


        const strongestPillars =
            sortDescending(
                pillars,
                "score"
            );


        const weakestPillars =
            sortAscending(
                pillars,
                "score"
            );


        const strongestDimensions =
            sortDescending(
                dimensions,
                "percentage"
            );


        const weakestDimensions =
            sortAscending(
                dimensions,
                "percentage"
            );


        const strongestPillar =
            page04.strongestPillar ||
            strongestPillars[0] ||
            null;


        const growthPillar =
            page04.growthPillar ||
            weakestPillars[0] ||
            null;


        const strongestDimension =
            strongestDimensions[0] ||
            null;


        const weakestDimension =
            weakestDimensions[0] ||
            null;


        const lifeLevel =
            resolveLifeLevel(
                page04
            );


        const strengths =
            buildStrengths(
                pillars,
                dimensions
            );


        const opportunities =
            buildOpportunities(
                pillars,
                dimensions
            );


        const primaryInsight =
            buildPrimaryInsight(
                page04,
                strongestPillar,
                growthPillar,
                strongestDimension,
                weakestDimension
            );


        const rootPatterns =
            buildRootPatterns(
                strongestPillar,
                growthPillar,
                strongestDimension,
                weakestDimension
            );


        const crossConnections =
            buildCrossConnections();


        const lifePattern =
            buildLifePattern(
                strongestPillar,
                growthPillar,
                strongestDimension,
                weakestDimension
            );


        const transformationLever =
            buildTransformationLever(
                growthPillar,
                weakestDimension
            );


        const priorities =
            buildPriorities(
                pillars,
                weakestDimension
            );


        const hypothesis =
            buildHypothesis(
                priorities,
                strongestPillar
            );


        return {

            version:
                CONFIG.version,

            generatedAt:
                new Date().toISOString(),


            source: {

                page02:
                    CONFIG.storage.page02,

                page04:
                    CONFIG.storage.page04

            },


            snapshot: {

                totalLifeScore:
                    toNumber(
                        page04.totalScore
                    ),

                maximumLifeScore:
                    toNumber(
                        page04.maximumScore
                    ) ||
                    CONFIG.expected.maximumLifeScore,

                lifeAlignment:
                    toNumber(
                        page04.percentage
                    ),

                lifeLevel:
                    page04.lifeLevel ||
                    lifeLevel.english,

                strongestPillar:
                    strongestPillar,

                growthPillar:
                    growthPillar

            },


            currentStatus: {

                tamil:
                    lifeLevel.tamil,

                english:
                    lifeLevel.english,

                copyTamil:
                    lifeLevel.copyTamil,

                copyEnglish:
                    lifeLevel.copyEnglish

            },


            dimensions:
                dimensions.map(
                    function (dimension) {

                        const interpretation =
                            getDimensionInterpretation(
                                dimension
                            );


                        return {

                            ...dimension,

                            displayTamil:
                                interpretation.tamil,

                            displayEnglish:
                                interpretation.english,

                            copyTamil:
                                interpretation.copyTamil,

                            copyEnglish:
                                interpretation.copyEnglish

                        };

                    }
                ),


            strengths:
                strengths,


            opportunities:
                opportunities,


            primaryInsight:
                primaryInsight,


            rootPatterns:
                rootPatterns,


            crossConnections:
                crossConnections,


            lifePattern:
                lifePattern,


            transformationLever:
                transformationLever,


            priorities:
                priorities,


            hypothesis:
                hypothesis

        };

    }


    /* ======================================================================
       20. CARD RENDERER
       ====================================================================== */

    function renderDiagnosisCard(
        id,
        item,
        index
    ) {

        const card =
            getElement(id);


        if (!card) {

            return;

        }


        const number =
            item.number ||
            String(
                index + 1
            ).padStart(
                2,
                "0"
            );


        let scoreMarkup =
            "";


        if (
            item.maximumScore !==
                undefined &&
            item.maximumScore !==
                null
        ) {

            scoreMarkup =

                `<div class="page05-diagnosis-score">
                    ${item.score ?? "—"} / ${item.maximumScore}
                    ${
                        item.percentage !== undefined
                            ? ` · ${item.percentage}%`
                            : ""
                    }
                </div>`;

        }


        card.innerHTML = `

            <p class="page05-card-number">
                ${number}
            </p>

            <h3
                class="page05-card-title-tamil"
                lang="ta"
            >
                ${item.tamil || "—"}
            </h3>

            <p class="page05-card-title">
                ${item.english || "—"}
            </p>

            ${scoreMarkup}

            <p
                class="page05-card-copy"
                lang="ta"
            >
                ${item.copyTamil || "—"}
            </p>

            <p class="page05-card-copy page05-card-copy-english">
                ${item.copyEnglish || "—"}
            </p>

        `;

    }


    /* ======================================================================
       21. RENDER CURRENT STATUS
       ====================================================================== */

    function renderCurrentStatus(
        diagnosis
    ) {

        const status =
            diagnosis.currentStatus;


        setText(
            "diagnosis-current-status-tamil",
            status.tamil
        );


        setText(
            "diagnosis-current-status",
            status.english
        );


        setText(
            "diagnosis-current-status-copy-tamil",
            status.copyTamil
        );


        setText(
            "diagnosis-current-status-copy",
            status.copyEnglish
        );

    }


    /* ======================================================================
       22. RENDER SNAPSHOT
       ====================================================================== */

    function renderSnapshot(
        diagnosis
    ) {

        const snapshot =
            diagnosis.snapshot;


        setText(
            "diagnosis-life-alignment",
            snapshot.lifeAlignment + "%"
        );


        setText(
            "diagnosis-total-score",
            snapshot.totalLifeScore
        );


        setText(
            "diagnosis-life-level",
            String(
                snapshot.lifeLevel ||
                "DEVELOPING"
            ).toUpperCase()
        );


        setText(
            "diagnosis-strongest-pillar",
            pillarEnglish(
                snapshot.strongestPillar
            )
        );


        setText(
            "diagnosis-strongest-score",
            snapshot.strongestPillar
                ? snapshot.strongestPillar.score
                : "—"
        );


        setText(
            "diagnosis-growth-pillar",
            pillarEnglish(
                snapshot.growthPillar
            )
        );


        setText(
            "diagnosis-growth-score",
            snapshot.growthPillar
                ? snapshot.growthPillar.score
                : "—"
        );

    }


    /* ======================================================================
       23. RENDER FIVE DIMENSIONS
       ====================================================================== */

    function renderDimensions(
        diagnosis
    ) {

        diagnosis.dimensions
            .forEach(
                function (
                    dimension,
                    index
                ) {

                    const number =
                        index + 1;


                    setText(
                        "diagnosis-dimension-tamil-" +
                        number,
                        dimension.displayTamil
                    );


                    setText(
                        "diagnosis-dimension-name-" +
                        number,
                        dimension.displayEnglish
                    );


                    setText(
                        "diagnosis-dimension-score-" +
                        number,
                        `${dimension.score} / ${dimension.maximumScore} · ${dimension.percentage}%`
                    );


                    setWidth(
                        "diagnosis-dimension-meter-" +
                        number,
                        dimension.percentage
                    );


                    setText(
                        "diagnosis-dimension-copy-tamil-" +
                        number,
                        dimension.copyTamil
                    );


                    setText(
                        "diagnosis-dimension-copy-" +
                        number,
                        dimension.copyEnglish
                    );


                    const card =
                        getElement(
                            "diagnosis-dimension-card-" +
                            number
                        );


                    if (!card) {

                        return;

                    }


                    card.classList.remove(
                        "is-low",
                        "is-medium",
                        "is-high"
                    );


                    if (
                        dimension.percentage <
                        50
                    ) {

                        card.classList.add(
                            "is-low"
                        );

                    }
                    else if (
                        dimension.percentage <
                        75
                    ) {

                        card.classList.add(
                            "is-medium"
                        );

                    }
                    else {

                        card.classList.add(
                            "is-high"
                        );

                    }

                }
            );

    }


    /* ======================================================================
       24. RENDER STRENGTHS
       ====================================================================== */

    function renderStrengths(
        diagnosis
    ) {

        diagnosis.strengths
            .forEach(
                function (
                    item,
                    index
                ) {

                    renderDiagnosisCard(
                        "diagnosis-strength-" +
                        (index + 1),
                        item,
                        index
                    );

                }
            );

    }


    /* ======================================================================
       25. RENDER OPPORTUNITIES
       ====================================================================== */

    function renderOpportunities(
        diagnosis
    ) {

        diagnosis.opportunities
            .forEach(
                function (
                    item,
                    index
                ) {

                    renderDiagnosisCard(
                        "diagnosis-opportunity-" +
                        (index + 1),
                        item,
                        index
                    );

                }
            );

    }


    /* ======================================================================
       26. RENDER PRIMARY INSIGHT
       ====================================================================== */

    function renderPrimaryInsight(
        diagnosis
    ) {

        const insight =
            diagnosis.primaryInsight;


        setText(
            "diagnosis-primary-insight-tamil",
            insight.tamil
        );


        setText(
            "diagnosis-primary-insight",
            insight.english
        );


        setText(
            "diagnosis-primary-copy-tamil",
            insight.copyTamil
        );


        setText(
            "diagnosis-primary-copy",
            insight.copyEnglish
        );


        setText(
            "diagnosis-key-insight-tamil",
            insight.keyTamil
        );


        setText(
            "diagnosis-key-insight",
            insight.keyEnglish
        );

    }


    /* ======================================================================
       27. RENDER ROOT PATTERNS
       ====================================================================== */

    function renderRootPatterns(
        diagnosis
    ) {

        diagnosis.rootPatterns
            .forEach(
                function (
                    item,
                    index
                ) {

                    renderDiagnosisCard(
                        "diagnosis-root-pattern-" +
                        (index + 1),
                        item,
                        index
                    );

                }
            );

    }


    /* ======================================================================
       28. RENDER CROSS CONNECTIONS
       ====================================================================== */

    function renderCrossConnections(
        diagnosis
    ) {

        diagnosis.crossConnections
            .forEach(
                function (
                    item,
                    index
                ) {

                    renderDiagnosisCard(
                        "diagnosis-cross-" +
                        (index + 1),
                        item,
                        index
                    );

                }
            );

    }


    /* ======================================================================
       29. RENDER LIFE PATTERN
       ====================================================================== */

    function renderLifePattern(
        diagnosis
    ) {

        setText(
            "diagnosis-life-pattern-tamil",
            diagnosis.lifePattern.tamil
        );


        setText(
            "diagnosis-life-pattern",
            diagnosis.lifePattern.english
        );

    }


    /* ======================================================================
       30. RENDER TRANSFORMATION LEVER
       ====================================================================== */

    function renderTransformationLever(
        diagnosis
    ) {

        const lever =
            diagnosis.transformationLever;


        setText(
            "diagnosis-transformation-lever-tamil",
            lever.tamil
        );


        setText(
            "diagnosis-transformation-lever",
            lever.english
        );


        setText(
            "diagnosis-transformation-lever-copy-tamil",
            lever.copyTamil
        );


        setText(
            "diagnosis-transformation-lever-copy",
            lever.copyEnglish
        );

    }


    /* ======================================================================
       31. RENDER PRIORITIES
       ====================================================================== */

    function renderPriorities(
        diagnosis
    ) {

        diagnosis.priorities
            .forEach(
                function (
                    item,
                    index
                ) {

                    renderDiagnosisCard(
                        "diagnosis-priority-" +
                        (index + 1),
                        item,
                        index
                    );

                }
            );

    }


    /* ======================================================================
       32. RENDER HYPOTHESIS
       ====================================================================== */

    function renderHypothesis(
        diagnosis
    ) {

        setText(
            "diagnosis-hypothesis-tamil",
            diagnosis.hypothesis.tamil
        );


        setText(
            "diagnosis-hypothesis",
            diagnosis.hypothesis.english
        );

    }


    /* ======================================================================
       33. RENDER ONE-VIEW SUMMARY
       ====================================================================== */

    function renderSummary(
        diagnosis
    ) {

        setText(
            "diagnosis-summary-status",
            diagnosis.currentStatus.english
        );


        setText(
            "diagnosis-summary-strength",
            diagnosis.strengths[0]
                ? diagnosis.strengths[0].english
                : "—"
        );


        setText(
            "diagnosis-summary-opportunity",
            diagnosis.opportunities[0]
                ? diagnosis.opportunities[0].english
                : "—"
        );


        setText(
            "diagnosis-summary-pattern",
            diagnosis.rootPatterns[0]
                ? diagnosis.rootPatterns[0].english
                : "—"
        );


        setText(
            "diagnosis-summary-insight",
            diagnosis.primaryInsight.english
        );


        setText(
            "diagnosis-summary-priority",
            diagnosis.priorities[0]
                ? diagnosis.priorities[0].english
                : "—"
        );

    }


    /* ======================================================================
       34. RENDER ALL
       ====================================================================== */

    function renderDiagnosis(
        diagnosis
    ) {

        renderCurrentStatus(
            diagnosis
        );


        renderSnapshot(
            diagnosis
        );


        renderDimensions(
            diagnosis
        );


        renderStrengths(
            diagnosis
        );


        renderOpportunities(
            diagnosis
        );


        renderPrimaryInsight(
            diagnosis
        );


        renderRootPatterns(
            diagnosis
        );


        renderCrossConnections(
            diagnosis
        );


        renderLifePattern(
            diagnosis
        );


        renderTransformationLever(
            diagnosis
        );


        renderPriorities(
            diagnosis
        );


        renderHypothesis(
            diagnosis
        );


        renderSummary(
            diagnosis
        );

    }


    /* ======================================================================
       35. ERROR STATE
       ====================================================================== */

    function renderErrorState(
        message
    ) {

        setText(
            "diagnosis-current-status-tamil",
            "முந்தைய மதிப்பீட்டு தரவு கிடைக்கவில்லை"
        );


        setText(
            "diagnosis-current-status",
            "ASSESSMENT DATA UNAVAILABLE"
        );


        setText(
            "diagnosis-current-status-copy-tamil",
            "Page 02 மற்றும் Page 04 மதிப்பீட்டு முடிவுகள் தேவை."
        );


        setText(
            "diagnosis-current-status-copy",
            message ||
            "Page 02 and Page 04 results are required. Please complete the previous assessment steps."
        );

    }


    /* ======================================================================
       36. INITIAL PAGE STATE
       ====================================================================== */

    const state = {

        initialized:
            false,

        input:
            null,

        diagnosis:
            null

    };


    /* ======================================================================
       37. INITIALISE PAGE 05
       ====================================================================== */

    function init() {

        if (
            state.initialized
        ) {

            return state.diagnosis;

        }


        try {

            console.info(
                "CTM PATH™ Page05 — Personal Life Diagnosis™ starting."
            );


            state.input =
                loadInputs();


            state.diagnosis =
                buildDiagnosis(
                    state.input
                );


            renderDiagnosis(
                state.diagnosis
            );


            saveStorage(
                CONFIG.storage.page05,
                state.diagnosis
            );


            state.initialized =
                true;


            console.info(
                "CTM PATH™ Page05 — Personal Life Diagnosis™ ready.",
                state.diagnosis
            );


            return state.diagnosis;

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page05 failed:",
                error
            );


            renderErrorState(
                error.message
            );


            return null;

        }

    }


    /* ======================================================================
       38. REBUILD
       ====================================================================== */

    function rebuild() {

        state.initialized =
            false;

        state.input =
            null;

        state.diagnosis =
            null;


        return init();

    }


    /* ======================================================================
       39. PUBLIC API
       ====================================================================== */

    window.CTM_PAGE05 =
        Object.freeze({

            version:
                CONFIG.version,

            init:
                init,

            rebuild:
                rebuild,

            getDiagnosis:
                function () {

                    return state.diagnosis;

                },

            getInputs:
                function () {

                    return state.input;

                },

            getStoredDiagnosis:
                function () {

                    return readStorage(
                        CONFIG.storage.page05
                    );

                },

            storageKeys:
                Object.freeze({

                    page02:
                        CONFIG.storage.page02,

                    page04:
                        CONFIG.storage.page04,

                    page05:
                        CONFIG.storage.page05

                })

        });


})(window, document);


/* ==========================================================================
   END OF FILE
   ==========================================================================
*/

