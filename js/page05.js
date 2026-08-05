
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   js/page05.js

   PAGE:
   PERSONAL LIFE DIAGNOSIS™

   VERSION:
   2.0

   RESPONSIBILITIES:

   ✓ Read frozen Page 02 result
   ✓ Read frozen Page 04 Life Alignment result
   ✓ Build Page 05 Personal Life Diagnosis™
   ✓ Preserve existing Page 05 visual diagnosis
   ✓ Render all existing diagnosis sections
   ✓ Persist frontend diagnosis state
   ✓ Build backend-compatible assessment payload
   ✓ Generate + persist backend Personal Diagnosis
   ✓ Prevent Page 06 transition until backend persistence succeeds
   ✓ Prevent duplicate diagnosis generation during same Page 05 session
   ✓ Preserve existing Page 06 navigation target

   IMPORTANT:

   ✗ Does NOT recalculate Page 02 assessment
   ✗ Does NOT recalculate Page 03 Kala Chakra™ assessment
   ✗ Does NOT rebuild Page 04 Life Wheel
   ✗ Does NOT modify Global Header
   ✗ Does NOT modify Global Footer
   ✗ Does NOT modify Page 05 HTML
   ✗ Does NOT modify Page 05 CSS

========================================================================== */

(function (w, d) {

    "use strict";


    /* ======================================================================
       PAGE CONFIGURATION
    ====================================================================== */

    const CONFIG = {

        pageName:
            "PERSONAL LIFE DIAGNOSIS™",

        nextPage:
            "./page06.html",

        page02StorageKey:
            "ctm_page02_result",

        page04StorageKey:
            "CTM_PAGE04_ALIGNMENT_RESULT",

        diagnosisStorageKey:
            "CTM_PAGE05_DIAGNOSIS_RESULT",

        backendPersistenceKey:
            "CTM_PAGE05_BACKEND_DIAGNOSIS",

        roadmapButtonId:
            "show-roadmap-button"

    };


    /* ======================================================================
       LIFE LEVEL COPY
    ====================================================================== */

    const LEVEL = {

        FOUNDATION: [

            "அடித்தளம் அமைக்கும் நிலை",

            "FOUNDATION",

            "உங்கள் வாழ்க்கையின் சில முக்கிய பகுதிகள் இன்னும் உறுதியான அடித்தளத்தை நாடுகின்றன. முதலில் மிக முக்கியமான பகுதிகளில் நிலைத்தன்மையை உருவாக்குவது அதிக பயன் தரும்.",

            "Several important areas still need a stronger foundation. Stability in a few high-impact areas should come first."

        ],


        STABILISING: [

            "நிலைப்படுத்தும் நிலை",

            "STABILISING",

            "சில பகுதிகள் செயல்படுகின்றன; சில பகுதிகள் இன்னும் நிலைத்தன்மையைத் தேடுகின்றன. சிதறிய முயற்சிகளை ஒழுங்கான அமைப்புகளாக மாற்றுவது அடுத்த கட்டம்.",

            "Some areas are working while others still need stability. Turn scattered effort into reliable systems."

        ],


        DEVELOPING: [

            "வளரும் நிலை",

            "DEVELOPING",

            "உங்கள் வாழ்க்கையில் முன்னேற்றம் உள்ளது; ஆனால் வளர்ச்சி எல்லா பகுதிகளிலும் ஒரே வேகத்தில் இல்லை. வலிமையான பகுதிகளைப் பயன்படுத்தி பின்தங்கிய பகுதிகளை உயர்த்துங்கள்.",

            "There is clear progress, but growth is uneven. Use stronger areas to lift those that have not yet caught up."

        ],


        STRONG: [

            "வலுவான நிலை",

            "STRONG",

            "பல முக்கிய பகுதிகள் வலுவாக இயங்குகின்றன. சில முக்கிய இடங்களில் துல்லியமான மேம்பாடு அதிக விளைவை உருவாக்கும்.",

            "Many important areas are strong. Precise improvement in a few leverage points may create the greatest value."

        ],


        THRIVING: [

            "செழித்து முன்னேறும் நிலை",

            "THRIVING",

            "பெரும்பாலான பகுதிகள் உயர்ந்த ஒத்திசைவில் இயங்குகின்றன. உங்கள் வலிமைகளை நீடித்த சுதந்திரம், தாக்கம் மற்றும் பங்களிப்பாக மாற்றுவது அடுத்த கட்டம்.",

            "Most areas are highly aligned. Convert strength into sustained freedom, impact and contribution."

        ]

    };


    /* ======================================================================
       PAGE 02 DIMENSION NAMES
    ====================================================================== */

    const DIMENSION_NAMES = {

        wealth: [

            "செல்வ அடித்தளம்",

            "WEALTH"

        ],


        incomeCashFlow: [

            "வருமானம் & பணப்புழக்கம்",

            "INCOME & CASH FLOW"

        ],


        assets: [

            "சொத்துகள்",

            "ASSETS"

        ],


        lifestyleFreedom: [

            "வாழ்க்கைமுறை & சுதந்திரம்",

            "LIFESTYLE & FREEDOM"

        ],


        protectionContribution: [

            "பாதுகாப்பு & பங்களிப்பு",

            "PROTECTION & CONTRIBUTION"

        ]

    };


    /* ======================================================================
       PAGE STATE
    ====================================================================== */

    const state = {

        initialized:
            false,

        input:
            null,

        diagnosis:
            null,

        backendPayload:
            null,

        backendResponse:
            null,

        persisting:
            false,

        persisted:
            false,

        persistencePromise:
            null,

        navigationBound:
            false

    };


    /* ======================================================================
       DOM HELPERS
    ====================================================================== */

    function el(id) {

        return d.getElementById(
            id
        );

    }


    function txt(
        id,
        value
    ) {

        const element =
            el(id);


        if (!element) {
            return;
        }


        element.textContent =

            (
                value === undefined ||
                value === null ||
                value === ""
            )

                ? "—"

                : String(value);

    }


    /* ======================================================================
       VALUE HELPERS
    ====================================================================== */

    function num(value) {

        value =
            Number(value);


        return Number.isFinite(value)

            ? value

            : 0;

    }


    function esc(value) {

        return String(
            value ?? ""
        )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

    }


    function firstNonEmptyString() {

        for (
            let i = 0;
            i < arguments.length;
            i++
        ) {

            const value =
                arguments[i];


            if (
                typeof value === "string" &&
                value.trim() !== ""
            ) {

                return value.trim();

            }

        }


        return "";

    }


    /* ======================================================================
       STORAGE
    ====================================================================== */

    function read(key) {

        try {

            const value =
                sessionStorage.getItem(
                    key
                );


            return value

                ? JSON.parse(value)

                : null;

        }
        catch (error) {

            console.warn(
                "Page05: Unable to read storage:",
                key,
                error
            );


            return null;

        }

    }


    function save(
        key,
        value
    ) {

        try {

            sessionStorage.setItem(

                key,

                JSON.stringify(
                    value
                )

            );


            return true;

        }
        catch (error) {

            console.error(
                "Page05: Unable to save storage:",
                key,
                error
            );


            return false;

        }

    }


    function readStorageString(
        key
    ) {

        try {

            const value =
                sessionStorage.getItem(
                    key
                );


            if (
                typeof value === "string" &&
                value.trim() !== ""
            ) {

                return value.trim();

            }

        }
        catch (error) {

            /*
             * Storage recovery is best-effort only.
             */

        }


        return "";

    }


    /* ======================================================================
       SORT
    ====================================================================== */

    function sort(
        array,
        key,
        descending
    ) {

        return (
            array || []
        )

        .slice()

        .sort(
            function (
                x,
                y
            ) {

                return (

                    (
                        descending
                            ? -1
                            : 1
                    )

                    *

                    (
                        num(x[key]) -
                        num(y[key])
                    )

                );

            }
        );

    }


    /* ======================================================================
       PILLAR LABEL HELPERS
    ====================================================================== */

    function pillarEnglish(
        pillar
    ) {

        return pillar

            ? (
                pillar.english ||
                pillar.key ||
                pillar.pillar ||
                "—"
            )

            : "—";

    }


    function pillarTamil(
        pillar
    ) {

        return pillar

            ? (
                pillar.tamil ||
                pillar.key ||
                pillar.pillar ||
                "—"
            )

            : "—";

    }


    /* ======================================================================
       DIMENSION HELPERS
    ====================================================================== */

    function dimensionNames(
        dimension
    ) {

        const names =

            DIMENSION_NAMES[
                dimension.dimensionId
            ]

            ||

            [
                dimension.tamil || "",
                dimension.english ||
                dimension.dimensionId ||
                "DIMENSION"
            ];


        return {

            ta:
                dimension.tamil ||
                names[0],

            en:
                dimension.english ||
                names[1]

        };

    }


    function dimensionCopy(
        dimension
    ) {

        const names =
            dimensionNames(
                dimension
            );


        const percentage =
            num(
                dimension.percentage
            );


        if (
            percentage < 50
        ) {

            return {

                ta:
                    names.ta,

                en:
                    names.en,

                cta:
                    "இந்தப் பகுதி தற்போது அதிக கவனத்தை தேடுகிறது. தனிப்பட்ட முயற்சியை விட தெளிவான அமைப்பு மற்றும் தொடர்ச்சியான முன்னேற்றம் முக்கியம்.",

                cen:
                    "This area currently needs focused attention. A reliable system and consistent progress matter more than simply adding effort."

            };

        }


        if (
            percentage < 75
        ) {

            return {

                ta:
                    names.ta,

                en:
                    names.en,

                cta:
                    "இந்தப் பகுதி வளர்ந்து வருகிறது. ஏற்கனவே உள்ள முன்னேற்றத்தை தொடர்ச்சியான அமைப்பாக மாற்றுவது அடுத்த வாய்ப்பு.",

                cen:
                    "This area is developing. The next opportunity is to turn existing progress into a consistent system."

            };

        }


        return {

            ta:
                names.ta,

            en:
                names.en,

            cta:
                "இந்தப் பகுதி உங்கள் தற்போதைய வலிமைகளில் ஒன்றாக உள்ளது. இதை பின்தங்கிய பகுதிகளுக்கு ஆதரவாக பயன்படுத்தலாம்.",

            cen:
                "This is one of your current strengths. Use it deliberately to support areas that are still developing."

        };

    }


    /* ======================================================================
       CARD RENDERER
    ====================================================================== */

    function card(
        id,
        item,
        index
    ) {

        const element =
            el(id);


        if (!element) {
            return;
        }


        const score =

            item.maximumScore

                ? (

                    '<div class="page05-diagnosis-score">' +

                    esc(
                        item.score
                    ) +

                    " / " +

                    esc(
                        item.maximumScore
                    ) +

                    (
                        item.percentage !== undefined

                            ? (
                                " · " +
                                esc(
                                    item.percentage
                                ) +
                                "%"
                            )

                            : ""
                    ) +

                    "</div>"

                )

                : "";


        element.innerHTML =

            '<p class="page05-card-number">' +

            String(
                index + 1
            ).padStart(
                2,
                "0"
            ) +

            "</p>" +

            '<h3 class="page05-card-title-tamil" lang="ta">' +

            esc(
                item.tamil
            ) +

            "</h3>" +

            '<p class="page05-card-title">' +

            esc(
                item.english
            ) +

            "</p>" +

            score +

            '<p class="page05-card-copy" lang="ta">' +

            esc(
                item.copyTa
            ) +

            "</p>" +

            '<p class="page05-card-copy page05-card-copy-english">' +

            esc(
                item.copyEn
            ) +

            "</p>";

    }


    /* ======================================================================
       LOAD FROZEN PAGE 02 + PAGE 04 INPUTS
    ====================================================================== */

    function load() {

        const page02 =
            read(
                CONFIG.page02StorageKey
            );


        const page04 =
            read(
                CONFIG.page04StorageKey
            );


        if (
            !page02 ||
            !page04
        ) {

            throw new Error(
                "Page02/Page04 result missing"
            );

        }


        if (
            !Array.isArray(
                page02.dimensions
            ) ||
            page02.dimensions.length !== 5
        ) {

            throw new Error(
                "Expected five Page02 dimensions"
            );

        }


        if (
            !Array.isArray(
                page04.pillars
            ) ||
            page04.pillars.length !== 12
        ) {

            throw new Error(
                "Expected twelve Page04 pillars"
            );

        }


        return {

            p2:
                page02,

            p4:
                page04,

            dims:
                page02.dimensions.map(
                    function (dimension) {

                        return {

                            ...dimension,

                            score:
                                num(
                                    dimension.score
                                ),

                            maximumScore:
                                num(
                                    dimension.maximumScore
                                ),

                            percentage:
                                num(
                                    dimension.percentage
                                )

                        };

                    }
                ),

            pillars:
                page04.pillars.map(
                    function (pillar) {

                        return {

                            ...pillar,

                            score:
                                num(
                                    pillar.score
                                )

                        };

                    }
                )

        };

    }


    /* ======================================================================
       BUILD PAGE 05 VISUAL DIAGNOSIS

       THIS IS THE EXISTING PAGE 05 DIAGNOSIS LOGIC.

       DO NOT replace it with backend copy.

       Backend diagnosis persistence is a separate responsibility.
    ====================================================================== */

    function build(
        input
    ) {

        const page04 =
            input.p4;


        const pillars =
            input.pillars;


        const dimensions =
            input.dims;


        const highPillars =
            sort(
                pillars,
                "score",
                true
            );


        const lowPillars =
            sort(
                pillars,
                "score",
                false
            );


        const highDimensions =
            sort(
                dimensions,
                "percentage",
                true
            );


        const lowDimensions =
            sort(
                dimensions,
                "percentage",
                false
            );


        const strongest =

            page04.strongestPillar ||

            highPillars[0];


        const growth =

            page04.growthPillar ||

            lowPillars[0];


        const level =

            LEVEL[
                String(
                    page04.lifeLevel ||
                    "DEVELOPING"
                ).toUpperCase()
            ]

            ||

            LEVEL.DEVELOPING;


        const strengths =

            [
                highPillars[0],
                highPillars[1]
            ]

            .filter(
                Boolean
            )

            .map(
                function (pillar) {

                    return {

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

                        copyTa:
                            "இந்த வாழ்க்கைப் பகுதி உங்கள் வலிமையான வளங்களில் ஒன்றாக உள்ளது. இதை வளர்ச்சி பகுதிகளுக்கு ஆதரவாக பயன்படுத்துங்கள்.",

                        copyEn:
                            "This life area is one of your strongest resources. Use it deliberately to support developing areas."

                    };

                }
            );


        if (
            highDimensions[0]
        ) {

            const copy =
                dimensionCopy(
                    highDimensions[0]
                );


            strengths.push({

                tamil:
                    copy.ta,

                english:
                    copy.en,

                score:
                    highDimensions[0].score,

                maximumScore:
                    highDimensions[0].maximumScore,

                percentage:
                    highDimensions[0].percentage,

                copyTa:
                    copy.cta,

                copyEn:
                    copy.cen

            });

        }


        const opportunities =

            [
                lowPillars[0],
                lowPillars[1]
            ]

            .filter(
                Boolean
            )

            .map(
                function (pillar) {

                    return {

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

                        copyTa:
                            "குறைந்த மதிப்பெண் தோல்வி அல்ல. இங்கு செய்யப்படும் திட்டமிட்ட முன்னேற்றம் உங்கள் மொத்த வாழ்க்கை சமநிலையை உயர்த்தக்கூடும்.",

                        copyEn:
                            "A lower score is not a verdict. Focused progress here may materially improve overall life alignment."

                    };

                }
            );


        if (
            lowDimensions[0]
        ) {

            const copy =
                dimensionCopy(
                    lowDimensions[0]
                );


            opportunities.push({

                tamil:
                    copy.ta,

                english:
                    copy.en,

                score:
                    lowDimensions[0].score,

                maximumScore:
                    lowDimensions[0].maximumScore,

                percentage:
                    lowDimensions[0].percentage,

                copyTa:
                    copy.cta,

                copyEn:
                    copy.cen

            });

        }


        const pillarSpread =

            num(
                strongest?.score
            )

            -

            num(
                growth?.score
            );


        const dimensionSpread =

            num(
                highDimensions[0]?.percentage
            )

            -

            num(
                lowDimensions[0]?.percentage
            );


        let primary;


        if (
            pillarSpread >= 4 ||
            dimensionSpread >= 35
        ) {

            primary = [

                "உங்கள் வளர்ச்சி வலுவாக இருக்கிறது — ஆனால் சமமாக இல்லை.",

                "YOUR GROWTH IS REAL — BUT UNEVEN.",

                "சில பகுதிகள் மிகவும் வலுவாக இருக்கின்றன; சில பகுதிகள் அந்த வளர்ச்சியின் வேகத்தை இன்னும் எட்டவில்லை.",

                "Some parts of your life are strong while others have not yet caught up.",

                "ஏற்கனவே உள்ள வலிமையை பின்தங்கிய பகுதிகளுடன் இணைக்க வேண்டும்.",

                "Connect the strength you already have to the areas that are lagging."

            ];

        }
        else if (
            num(
                page04.percentage
            ) < 51
        ) {

            primary = [

                "உங்களுக்கு இன்னும் அதிக முயற்சி மட்டும் தேவையில்லை — வலுவான அடித்தளம் தேவை.",

                "YOU MAY NOT NEED MORE EFFORT — YOU NEED A STRONGER FOUNDATION.",

                "பல பகுதிகளில் முயற்சியைப் பரப்புவதற்கு முன், அடிப்படை நிலைத்தன்மையை உருவாக்கும் பகுதிகளை வலுப்படுத்துங்கள்.",

                "Before spreading effort widely, strengthen the areas that create foundational stability.",

                "நிலைத்தன்மை உருவானால், முன்னேற்றம் எளிதாகிறது.",

                "When stability improves, progress becomes easier to sustain."

            ];

        }
        else {

            primary = [

                "உங்கள் அடுத்த நிலை பெரிய மாற்றத்தில் இல்லை — சரியான முன்னுரிமையில் உள்ளது.",

                "YOUR NEXT LEVEL IS ABOUT THE RIGHT PRIORITY.",

                "உங்கள் வாழ்க்கையில் ஏற்கனவே பல செயல்படும் வளங்கள் உள்ளன. அதிக தாக்கத்தை உருவாக்கும் பகுதிகளை சரியான வரிசையில் மேம்படுத்துங்கள்.",

                "You already have several functioning resources. Improve the highest-impact areas in the right sequence.",

                "சரியான வரிசை, அதிக முயற்சியை விட சக்திவாய்ந்ததாக இருக்கலாம்.",

                "The right sequence can be more powerful than simply adding more effort."

            ];

        }


        const roots = [

            {

                tamil:
                    "சமமற்ற வளர்ச்சி",

                english:
                    "UNEVEN DEVELOPMENT",

                copyTa:
                    `${pillarTamil(lowPillars[0])} மற்றும் ${pillarTamil(lowPillars[1])} ஆகிய பகுதிகள் உங்கள் வலிமையான பகுதிகளின் வேகத்தை இன்னும் எட்டாமல் இருக்கலாம்.`,

                copyEn:
                    `${pillarEnglish(lowPillars[0])} and ${pillarEnglish(lowPillars[1])} may not yet have caught up with the stronger parts of your life.`

            },


            {

                tamil:
                    "வலிமை இன்னும் முழு leverage ஆக மாறவில்லை",

                english:
                    "STRENGTH NOT YET CONVERTED INTO LEVERAGE",

                copyTa:
                    "ஒரு பகுதியில் உள்ள வலிமை மற்றொரு பகுதியில் தானாக முன்னேற்றத்தை உருவாக்காது. அதை திட்டமிட்டு இணைக்க வேண்டும்.",

                copyEn:
                    "Strength in one area does not automatically improve another. It needs to be deliberately converted into leverage."

            },


            {

                tamil:
                    "முயற்சியை விட அமைப்பு தேவை",

                english:
                    "SYSTEMS MAY NEED TO CATCH UP WITH EFFORT",

                copyTa:
                    `${dimensionNames(lowDimensions[0] || {}).ta} பகுதியில் காணப்படும் இடைவெளி அதிக முயற்சியை விட நம்பகமான அமைப்பு தேவைப்படுவதைச் சுட்டிக்காட்டலாம்.`,

                copyEn:
                    `The gap in ${dimensionNames(lowDimensions[0] || {}).en} may indicate a need for a more reliable system rather than simply more effort.`

            }

        ];


        const crossConnections = [

            {

                tamil:
                    "வருமானம் → பொருளாதார சுதந்திரம்",

                english:
                    "INCOME → FINANCIAL FREEDOM",

                copyTa:
                    "வருமானம் உயர்வது மட்டும் பொருளாதார சுதந்திரத்தை உறுதி செய்யாது. பணப்புழக்கம், சொத்து உருவாக்கம் மற்றும் நீண்டகால கட்டமைப்பு ஒன்றாக செயல்பட வேண்டும்.",

                copyEn:
                    "Higher income alone does not guarantee financial freedom. Cash flow, asset creation and long-term structure need to work together."

            },


            {

                tamil:
                    "சொத்துகள் → நேர சுதந்திரம்",

                english:
                    "ASSETS → TIME FREEDOM",

                copyTa:
                    "சொத்துகள் மற்றும் அமைப்புகள் வளரும்போது, உங்கள் நேரத்தின் மீது அதிக கட்டுப்பாடு உருவாகலாம்.",

                copyEn:
                    "As assets and systems strengthen, greater control over time can emerge."

            },


            {

                tamil:
                    "வாழ்க்கை சுதந்திரம் → பங்களிப்பு",

                english:
                    "LIFESTYLE FREEDOM → CONTRIBUTION",

                copyTa:
                    "நேரம், பணம் மற்றும் தேர்வு சுதந்திரம் அதிகரிக்கும்போது, பங்களிப்பை அதிக நோக்கத்துடன் வடிவமைக்க முடியும்.",

                copyEn:
                    "As freedom of time, money and choice increases, contribution can be shaped with greater intention."

            }

        ];


        const transformationLever = {

            tamil:
                pillarTamil(
                    growth
                ),

            english:
                pillarEnglish(
                    growth
                ),

            copyTa:
                `${pillarTamil(growth)} தற்போது அதிக வளர்ச்சி இடம் கொண்ட பகுதியாகத் தெரிகிறது. இதனை ${dimensionNames(lowDimensions[0] || {}).ta} பகுதியில் செய்யும் நடைமுறை மாற்றங்களுடன் இணைத்தால் பல பகுதிகளில் முன்னேற்றம் உருவாகலாம்.`,

            copyEn:
                `${pillarEnglish(growth)} currently shows the greatest room for growth. Linking it with practical improvement in ${dimensionNames(lowDimensions[0] || {}).en} may create progress across several connected areas.`

        };


        const priorities = [

            {

                number:
                    "01",

                tamil:
                    pillarTamil(
                        lowPillars[0]
                    ),

                english:
                    pillarEnglish(
                        lowPillars[0]
                    ),

                copyTa:
                    "முதலில் இந்த வாழ்க்கைப் பகுதியில் ஒரு தெளிவான, அளவிடக்கூடிய முன்னேற்றத்தை உருவாக்குங்கள்.",

                copyEn:
                    "Create one clear, measurable improvement in this life area first."

            },


            {

                number:
                    "02",

                tamil:
                    dimensionNames(
                        lowDimensions[0] || {}
                    ).ta,

                english:
                    dimensionNames(
                        lowDimensions[0] || {}
                    ).en,

                copyTa:
                    "இந்தப் பரிமாணத்தில் தனிப்பட்ட முயற்சியை நம்பகமான அமைப்பாக மாற்றுங்கள்.",

                copyEn:
                    "Turn repeated personal effort in this dimension into a reliable system."

            },


            {

                number:
                    "03",

                tamil:
                    pillarTamil(
                        lowPillars[1]
                    ),

                english:
                    pillarEnglish(
                        lowPillars[1]
                    ),

                copyTa:
                    "முதல் இரண்டு முன்னுரிமைகள் நிலைபெற்ற பிறகு இந்தப் பகுதியை வலுப்படுத்துங்கள்.",

                copyEn:
                    "Once the first two priorities become stable, strengthen this area next."

            }

        ];


        return {

            version:
                "1.0",

            generatedAt:
                new Date().toISOString(),


            snapshot: {

                totalLifeScore:
                    num(
                        page04.totalScore
                    ),

                maximumLifeScore:
                    120,

                lifeAlignment:
                    num(
                        page04.percentage
                    ),

                lifeLevel:
                    page04.lifeLevel ||
                    "DEVELOPING",

                strongestPillar:
                    strongest,

                growthPillar:
                    growth

            },


            currentStatus: {

                tamil:
                    level[0],

                english:
                    level[1],

                copyTa:
                    level[2],

                copyEn:
                    level[3]

            },


            dimensions:
                dimensions.map(
                    function (dimension) {

                        const copy =
                            dimensionCopy(
                                dimension
                            );


                        return {

                            ...dimension,

                            displayTamil:
                                copy.ta,

                            displayEnglish:
                                copy.en,

                            copyTa:
                                copy.cta,

                            copyEn:
                                copy.cen

                        };

                    }
                ),


            strengths:
                strengths.slice(
                    0,
                    3
                ),


            opportunities:
                opportunities.slice(
                    0,
                    3
                ),


            primaryInsight: {

                tamil:
                    primary[0],

                english:
                    primary[1],

                copyTa:
                    primary[2],

                copyEn:
                    primary[3],

                keyTa:
                    primary[4],

                keyEn:
                    primary[5]

            },


            rootPatterns:
                roots,


            crossConnections:
                crossConnections,


            lifePattern: {

                tamil:
                    `உங்கள் தற்போதைய பெரிய படம்: ${pillarTamil(strongest)} உங்கள் முன்னேற்றத்தை ஆதரிக்கிறது; ${pillarTamil(growth)} அதிக கவனத்தை நாடுகிறது. ${dimensionNames(highDimensions[0] || {}).ta} வலிமையை ${dimensionNames(lowDimensions[0] || {}).ta} முன்னேற்றத்துடன் இணைத்தால் மொத்த சமநிலை உயரக்கூடும்.`,

                english:
                    `Your current pattern shows ${pillarEnglish(strongest)} pulling you forward while ${pillarEnglish(growth)} needs focused attention. Connecting the strength of ${dimensionNames(highDimensions[0] || {}).en} to the development of ${dimensionNames(lowDimensions[0] || {}).en} may improve overall alignment.`

            },


            transformationLever:
                transformationLever,


            priorities:
                priorities,


            hypothesis: {

                tamil:
                    `நீங்கள் ${priorities[0].tamil} பகுதியில் முன்னேற்றத்தை உருவாக்கி, ${priorities[1].tamil} பகுதியில் நம்பகமான அமைப்பை கட்டி, ${pillarTamil(strongest)} வலிமையை ஆதரவாக பயன்படுத்தினால், உங்கள் மொத்த வாழ்க்கை சமநிலை குறிப்பிடத்தக்க அளவில் உயரக்கூடும்.`,

                english:
                    `If you create focused progress in ${priorities[0].english}, build a reliable system around ${priorities[1].english}, and use your strength in ${pillarEnglish(strongest)} to support that change, your overall life alignment may improve meaningfully.`

            }

        };

    }


    /* ======================================================================
       RENDER PAGE 05

       EXISTING VISUAL CONTRACT PRESERVED.
    ====================================================================== */

    function render(
        result
    ) {

        const snapshot =
            result.snapshot;


        const currentStatus =
            result.currentStatus;


        txt(
            "diagnosis-current-status-tamil",
            currentStatus.tamil
        );


        txt(
            "diagnosis-current-status",
            currentStatus.english
        );


        txt(
            "diagnosis-current-status-copy-tamil",
            currentStatus.copyTa
        );


        txt(
            "diagnosis-current-status-copy",
            currentStatus.copyEn
        );


        txt(
            "diagnosis-life-alignment",
            snapshot.lifeAlignment + "%"
        );


        txt(
            "diagnosis-total-score",
            snapshot.totalLifeScore
        );


        txt(
            "diagnosis-life-level",
            String(
                snapshot.lifeLevel
            ).toUpperCase()
        );


        txt(
            "diagnosis-strongest-pillar",
            pillarEnglish(
                snapshot.strongestPillar
            )
        );


        txt(
            "diagnosis-strongest-score",
            snapshot.strongestPillar?.score
        );


        txt(
            "diagnosis-growth-pillar",
            pillarEnglish(
                snapshot.growthPillar
            )
        );


        txt(
            "diagnosis-growth-score",
            snapshot.growthPillar?.score
        );


        result.dimensions.forEach(
            function (
                dimension,
                index
            ) {

                const number =
                    index + 1;


                txt(
                    "diagnosis-dimension-tamil-" +
                    number,

                    dimension.displayTamil
                );


                txt(
                    "diagnosis-dimension-name-" +
                    number,

                    dimension.displayEnglish
                );


                txt(
                    "diagnosis-dimension-score-" +
                    number,

                    `${dimension.score} / ${dimension.maximumScore} · ${dimension.percentage}%`
                );


                const meter =
                    el(
                        "diagnosis-dimension-meter-" +
                        number
                    );


                if (meter) {

                    meter.style.width =

                        Math.max(

                            0,

                            Math.min(
                                100,
                                dimension.percentage
                            )

                        )

                        + "%";

                }


                txt(
                    "diagnosis-dimension-copy-tamil-" +
                    number,

                    dimension.copyTa
                );


                txt(
                    "diagnosis-dimension-copy-" +
                    number,

                    dimension.copyEn
                );

            }
        );


        result.strengths.forEach(
            function (
                item,
                index
            ) {

                card(

                    "diagnosis-strength-" +
                    (index + 1),

                    item,

                    index

                );

            }
        );


        result.opportunities.forEach(
            function (
                item,
                index
            ) {

                card(

                    "diagnosis-opportunity-" +
                    (index + 1),

                    item,

                    index

                );

            }
        );


        const primary =
            result.primaryInsight;


        txt(
            "diagnosis-primary-insight-tamil",
            primary.tamil
        );


        txt(
            "diagnosis-primary-insight",
            primary.english
        );


        txt(
            "diagnosis-primary-copy-tamil",
            primary.copyTa
        );


        txt(
            "diagnosis-primary-copy",
            primary.copyEn
        );


        txt(
            "diagnosis-key-insight-tamil",
            primary.keyTa
        );


        txt(
            "diagnosis-key-insight",
            primary.keyEn
        );


        result.rootPatterns.forEach(
            function (
                item,
                index
            ) {

                card(

                    "diagnosis-root-pattern-" +
                    (index + 1),

                    item,

                    index

                );

            }
        );


        result.crossConnections.forEach(
            function (
                item,
                index
            ) {

                card(

                    "diagnosis-cross-" +
                    (index + 1),

                    item,

                    index

                );

            }
        );


        txt(
            "diagnosis-life-pattern-tamil",
            result.lifePattern.tamil
        );


        txt(
            "diagnosis-life-pattern",
            result.lifePattern.english
        );


        const lever =
            result.transformationLever;


        txt(
            "diagnosis-transformation-lever-tamil",
            lever.tamil
        );


        txt(
            "diagnosis-transformation-lever",
            lever.english
        );


        txt(
            "diagnosis-transformation-lever-copy-tamil",
            lever.copyTa
        );


        txt(
            "diagnosis-transformation-lever-copy",
            lever.copyEn
        );


        result.priorities.forEach(
            function (
                item,
                index
            ) {

                card(

                    "diagnosis-priority-" +
                    (index + 1),

                    item,

                    index

                );

            }
        );


        txt(
            "diagnosis-hypothesis-tamil",
            result.hypothesis.tamil
        );


        txt(
            "diagnosis-hypothesis",
            result.hypothesis.english
        );


        txt(
            "diagnosis-summary-status",
            currentStatus.english
        );


        txt(
            "diagnosis-summary-strength",
            result.strengths[0]?.english
        );


        txt(
            "diagnosis-summary-opportunity",
            result.opportunities[0]?.english
        );


        txt(
            "diagnosis-summary-pattern",
            result.rootPatterns[0]?.english
        );


        txt(
            "diagnosis-summary-insight",
            primary.english
        );


        txt(
            "diagnosis-summary-priority",
            result.priorities[0]?.english
        );

    }


    /* ======================================================================
       RESOLVE PEOPLE ID

       Page 02 remains preferred source.

       Compatibility recovery is READ ONLY.
    ====================================================================== */

    function resolvePeopleId(
        input
    ) {

        const page02 =

            input &&
            input.p2

                ? input.p2

                : {};


        const candidates = [

            page02.peopleId,

            page02.PeopleID,

            page02.peopleID,

            page02.clientId,

            page02.ClientID,

            page02.registration?.peopleId,

            page02.registration?.PeopleID,

            page02.registration?.clientId,

            page02.person?.peopleId,

            page02.person?.PeopleID,

            page02.data?.peopleId,

            page02.data?.PeopleID,

            readStorageString(
                "ctm_people_id"
            ),

            readStorageString(
                "peopleId"
            ),

            readStorageString(
                "PeopleID"
            ),

            readStorageString(
                "ctm_client_id"
            )

        ];


        for (
            let i = 0;
            i < candidates.length;
            i++
        ) {

            const value =
                candidates[i];


            if (
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
            ) {

                return String(
                    value
                ).trim();

            }

        }


        /*
         * Bounded recursive recovery from Page 02.
         */

        const visited =
            [];


        function walk(
            value,
            depth
        ) {

            if (
                !value ||
                typeof value !== "object" ||
                depth > 5 ||
                visited.indexOf(value) !== -1
            ) {

                return "";

            }


            visited.push(
                value
            );


            const direct =
                firstNonEmptyString(

                    value.peopleId,

                    value.PeopleID,

                    value.peopleID,

                    value.clientId,

                    value.ClientID

                );


            if (direct) {
                return direct;
            }


            const keys =
                Object.keys(
                    value
                );


            for (
                let i = 0;
                i < keys.length;
                i++
            ) {

                const child =
                    value[
                        keys[i]
                    ];


                if (
                    child &&
                    typeof child === "object"
                ) {

                    const found =
                        walk(
                            child,
                            depth + 1
                        );


                    if (found) {
                        return found;
                    }

                }

            }


            return "";

        }


        return walk(
            page02,
            0
        );

    }


    /* ======================================================================
       BACKEND PILLAR KEY

       DiagnosisEngine expects:

           assessment.pillarScores

       as an object:

           {
               PURPOSE: 7,
               HEALTH: 8,
               ...
           }

       We preserve the pillar's existing canonical key whenever available.
    ====================================================================== */

    function getBackendPillarKey(
        pillar,
        index
    ) {

        const key =
            firstNonEmptyString(

                pillar.key,

                pillar.pillarKey,

                pillar.pillarId,

                pillar.id,

                pillar.code,

                pillar.english,

                pillar.name

            );


        if (key) {
            return key;
        }


        return (
            "PILLAR_" +
            String(
                index + 1
            ).padStart(
                2,
                "0"
            )
        );

    }


    /* ======================================================================
       BUILD BACKEND ASSESSMENT PAYLOAD

       DiagnosisEngine requires:

           assessment.peopleId
           assessment.pillarScores
           assessment.summary.level
           assessment.summary.readinessIndex

       Page 04 is the frozen source of truth for the 12 pillar scores.
    ====================================================================== */

    function buildBackendAssessment(
        input
    ) {

        if (
            !input ||
            !input.p4 ||
            !Array.isArray(
                input.pillars
            )
        ) {

            throw new Error(
                "Page05: Cannot build backend diagnosis payload because Page04 assessment data is unavailable."
            );

        }


        const peopleId =
            resolvePeopleId(
                input
            );


        if (!peopleId) {

            throw new Error(
                "Page05: CTM PATH™ People ID could not be recovered."
            );

        }


        if (
            input.pillars.length !== 12
        ) {

            throw new Error(
                "Page05: Exactly twelve Kala Chakra™ pillar scores are required for backend diagnosis."
            );

        }


        const pillarScores = {};


        input.pillars.forEach(
            function (
                pillar,
                index
            ) {

                const key =
                    getBackendPillarKey(
                        pillar,
                        index
                    );


                pillarScores[key] =
                    num(
                        pillar.score
                    );

            }
        );


        const page04 =
            input.p4;


        const totalScore =
            num(
                page04.totalScore
            );


        const percentage =
            num(
                page04.percentage
            );


        const readinessIndex =

            page04.readinessIndex !== undefined

                ? num(
                    page04.readinessIndex
                )

                : (
                    percentage > 0
                        ? percentage / 100
                        : totalScore / 120
                );


        const level =
            firstNonEmptyString(

                page04.lifeLevel,

                page04.level,

                page04.summary?.level

            )

            ||

            "DEVELOPING";


        return {

            peopleId:
                peopleId,

            pillarScores:
                pillarScores,

            summary: {

                level:
                    level,

                readinessIndex:
                    readinessIndex

            },

            totalScore:
                totalScore,

            maximumScore:
                120,

            percentage:
                percentage

        };

    }


    /* ======================================================================
       API RESPONSE ERROR MESSAGE
    ====================================================================== */

    function extractApiErrorMessage(
        response
    ) {

        if (
            !response ||
            typeof response !== "object"
        ) {

            return "";

        }


        const message =
            response.message;


        if (
            typeof message === "string" &&
            message.trim() !== ""
        ) {

            return message.trim();

        }


        if (
            message &&
            typeof message === "object"
        ) {

            const nested =
                firstNonEmptyString(

                    message.message,

                    message.error

                );


            if (nested) {
                return nested;
            }

        }


        if (
            typeof response.error === "string" &&
            response.error.trim() !== ""
        ) {

            return response.error.trim();

        }


        if (
            response.data &&
            typeof response.data === "object"
        ) {

            return extractApiErrorMessage(
                response.data
            );

        }


        return "";

    }


    /* ======================================================================
       VALIDATE BACKEND RESPONSE
    ====================================================================== */

    function validateBackendResponse(
        response
    ) {

        if (
            response === undefined ||
            response === null
        ) {

            throw new Error(
                "CTM PATH™ diagnosis service returned no response."
            );

        }


        if (
            response === false
        ) {

            throw new Error(
                "CTM PATH™ diagnosis could not be saved."
            );

        }


        if (
            typeof response === "object"
        ) {

            if (
                response.success === false ||
                response.ok === false ||
                String(
                    response.status || ""
                ).toUpperCase() === "FAILURE"
            ) {

                throw new Error(

                    extractApiErrorMessage(
                        response
                    )

                    ||

                    "CTM PATH™ Personal Diagnosis could not be saved."

                );

            }

        }


        return response;

    }


    /* ======================================================================
       CHECK EXISTING BACKEND PERSISTENCE

       Prevents duplicate generation when Page 05 is re-initialized during
       the same browser journey.

       The lock is People-ID specific.
    ====================================================================== */

    function recoverExistingPersistence(
        peopleId
    ) {

        const existing =
            read(
                CONFIG.backendPersistenceKey
            );


        if (
            !existing ||
            existing.status !== "SAVED"
        ) {

            return false;

        }


        if (
            !existing.peopleId ||
            !peopleId
        ) {

            return false;

        }


        if (
            String(
                existing.peopleId
            ) !==
            String(
                peopleId
            )
        ) {

            return false;

        }


        state.persisted =
            true;


        state.backendResponse =
            existing.response || null;


        return true;

    }


    /* ======================================================================
       PERSIST BACKEND PERSONAL DIAGNOSIS

       Flow:

       Page04 frozen 12 pillar scores
              ↓
       buildBackendAssessment()
              ↓
       CTM_API.generateDiagnosis()
              ↓
       JourneyOrchestrator.generateDiagnosis()
              ↓
       DiagnosisEngine.generate()
              ↓
       Diagnosis.save()
              ↓
       dbSaveDiagnosis()
              ↓
       06_PersonalDiagnosis

    ====================================================================== */

    async function persistBackendDiagnosis() {

        /*
         * Already confirmed during this runtime.
         */

        if (
            state.persisted
        ) {

            return state.backendResponse;

        }


        /*
         * Existing request already running.
         */

        if (
            state.persistencePromise
        ) {

            return state.persistencePromise;

        }


        state.persistencePromise =
            (async function () {

                state.persisting =
                    true;


                try {

                    if (
                        !w.CTM_API ||
                        typeof w.CTM_API !== "object"
                    ) {

                        throw new Error(
                            "CTM PATH™ API service is unavailable."
                        );

                    }


                    if (
                        typeof w.CTM_API.generateDiagnosis !==
                        "function"
                    ) {

                        throw new Error(
                            "CTM PATH™ API method unavailable: generateDiagnosis"
                        );

                    }


                    const payload =
                        buildBackendAssessment(
                            state.input
                        );


                    state.backendPayload =
                        payload;


                    /*
                     * If this exact People ID has already been
                     * successfully persisted during this Page 05
                     * journey, do not create another diagnosis row.
                     */

                    if (
                        recoverExistingPersistence(
                            payload.peopleId
                        )
                    ) {

                        console.info(
                            "Page05: Backend Personal Diagnosis already persisted.",
                            {
                                peopleId:
                                    payload.peopleId
                            }
                        );


                        return state.backendResponse;

                    }


                    console.info(
                        "Page05: Persisting backend Personal Diagnosis...",
                        {
                            peopleId:
                                payload.peopleId,

                            pillarCount:
                                Object.keys(
                                    payload.pillarScores
                                ).length
                        }
                    );


                    const response =
                        await w.CTM_API.generateDiagnosis(
                            payload
                        );


                    console.info(
                        "Page05 Diagnosis Response:",
                        response
                    );


                    validateBackendResponse(
                        response
                    );


                    state.backendResponse =
                        response;


                    state.persisted =
                        true;


                    save(

                        CONFIG.backendPersistenceKey,

                        {

                            status:
                                "SAVED",

                            peopleId:
                                payload.peopleId,

                            savedAt:
                                new Date().toISOString(),

                            response:
                                response

                        }

                    );


                    console.info(
                        "CTM PATH™ Page05 backend diagnosis persisted.",
                        {
                            peopleId:
                                payload.peopleId
                        }
                    );


                    return response;

                }
                catch (error) {

                    state.persisted =
                        false;


                    console.error(
                        "CTM PATH™ Page05 backend diagnosis persistence failed.",
                        error
                    );


                    throw error;

                }
                finally {

                    state.persisting =
                        false;


                    /*
                     * If persistence failed, allow a deliberate retry.
                     */

                    if (
                        !state.persisted
                    ) {

                        state.persistencePromise =
                            null;

                    }

                }

            })();


        return state.persistencePromise;

    }


    /* ======================================================================
       ROADMAP BUTTON BUSY STATE
    ====================================================================== */

    function setRoadmapButtonBusy(
        busy
    ) {

        const button =
            el(
                CONFIG.roadmapButtonId
            );


        if (!button) {
            return;
        }


        if (
            !button.dataset.page05OriginalHtml
        ) {

            button.dataset.page05OriginalHtml =
                button.innerHTML;

        }


        button.setAttribute(
            "aria-busy",
            busy
                ? "true"
                : "false"
        );


        if (busy) {

            button.style.pointerEvents =
                "none";


            button.setAttribute(
                "aria-disabled",
                "true"
            );


            button.innerHTML =

                '<span lang="ta">' +
                'உங்கள் தனிப்பட்ட வழிகாட்டல் தயாராகிறது...' +
                '</span>' +

                '<span>' +
                'PREPARING YOUR NEXT STEP...' +
                '</span>';

        }
        else {

            button.style.pointerEvents =
                "";


            button.removeAttribute(
                "aria-disabled"
            );


            if (
                button.dataset.page05OriginalHtml
            ) {

                button.innerHTML =
                    button.dataset.page05OriginalHtml;

            }

        }

    }


    /* ======================================================================
       PERSISTENCE ERROR
    ====================================================================== */

    function showPersistenceError(
        error
    ) {

        const message =

            error &&
            error.message

                ? error.message

                : "Unable to save your Personal Life Diagnosis™.";


        window.alert(

            "உங்கள் தனிப்பட்ட வாழ்க்கை ஆய்வை இப்போது சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.\n\n" +

            "We could not save your Personal Life Diagnosis™ yet. Please try again.\n\n" +

            message

        );

    }


    /* ======================================================================
       PAGE 05 → PAGE 06 NAVIGATION GATE

       Page 06 MUST NOT open until backend diagnosis persistence succeeds.
    ====================================================================== */

    async function handleRoadmapNavigation(
        event
    ) {

        if (event) {

            event.preventDefault();

        }


        /*
         * Already persisted:
         * navigate immediately.
         */

        if (
            state.persisted
        ) {

            window.location.href =
                CONFIG.nextPage;


            return;

        }


        setRoadmapButtonBusy(
            true
        );


        try {

            await persistBackendDiagnosis();


            if (
                !state.persisted
            ) {

                throw new Error(
                    "CTM PATH™ Personal Diagnosis persistence was not confirmed."
                );

            }


            window.location.href =
                CONFIG.nextPage;

        }
        catch (error) {

            console.error(
                "Page05: Page06 transition blocked because backend diagnosis was not saved.",
                error
            );


            setRoadmapButtonBusy(
                false
            );


            showPersistenceError(
                error
            );

        }

    }


    /* ======================================================================
       BIND ROADMAP NAVIGATION
    ====================================================================== */

    function bindNavigation() {

        if (
            state.navigationBound
        ) {

            return;

        }


        const button =
            el(
                CONFIG.roadmapButtonId
            );


        if (!button) {

            console.warn(
                "Page05: Roadmap button not found."
            );


            return;

        }


        if (
            button.dataset.page05Bound === "true"
        ) {

            state.navigationBound =
                true;


            return;

        }


        button.dataset.page05Bound =
            "true";


        button.addEventListener(
            "click",
            handleRoadmapNavigation
        );


        state.navigationBound =
            true;

    }


    /* ======================================================================
       INITIALIZE PAGE 05

       Important:

       Rendering is immediate.

       Backend persistence begins after the visual diagnosis is ready.

       If it is still running when the visitor clicks the CTA,
       the CTA waits for the same promise instead of generating twice.
    ====================================================================== */

    function init() {

        if (
            state.initialized
        ) {

            return state.diagnosis;

        }


        try {

            /*
             * ----------------------------------------------------------
             * 1. LOAD FROZEN INPUTS
             * ----------------------------------------------------------
             */

            state.input =
                load();


            /*
             * ----------------------------------------------------------
             * 2. BUILD EXISTING PAGE 05 VISUAL DIAGNOSIS
             * ----------------------------------------------------------
             */

            state.diagnosis =
                build(
                    state.input
                );


            /*
             * ----------------------------------------------------------
             * 3. RENDER EXISTING PAGE 05
             * ----------------------------------------------------------
             */

            render(
                state.diagnosis
            );


            /*
             * ----------------------------------------------------------
             * 4. SAVE FRONTEND DIAGNOSIS CONTRACT
             *
             * Page 06 reads this exact key.
             * ----------------------------------------------------------
             */

            save(

                CONFIG.diagnosisStorageKey,

                state.diagnosis

            );


            /*
             * Public runtime copy.
             */

            w.CTM_PAGE05_DIAGNOSIS_RESULT =
                state.diagnosis;


            /*
             * ----------------------------------------------------------
             * 5. BUILD BACKEND PAYLOAD
             *
             * This validates People ID + 12 pillar scores early.
             * ----------------------------------------------------------
             */

            state.backendPayload =
                buildBackendAssessment(
                    state.input
                );


            /*
             * ----------------------------------------------------------
             * 6. RECOVER EXISTING BACKEND SAVE CONFIRMATION
             * ----------------------------------------------------------
             */

            recoverExistingPersistence(
                state.backendPayload.peopleId
            );


            /*
             * ----------------------------------------------------------
             * 7. BIND PAGE 06 NAVIGATION GATE
             * ----------------------------------------------------------
             */

            bindNavigation();


            /*
             * ----------------------------------------------------------
             * 8. MARK FRONTEND INITIALIZED
             * ----------------------------------------------------------
             */

            state.initialized =
                true;


            console.info(
                "CTM PATH™ Page05 ready.",
                state.diagnosis
            );


            console.info(
                "Page05 Backend Diagnosis Payload:",
                state.backendPayload
            );


            /*
             * ----------------------------------------------------------
             * 9. START BACKEND PERSISTENCE
             *
             * Do not block rendering.
             *
             * Navigation WILL block if this has not completed.
             * ----------------------------------------------------------
             */

            if (
                !state.persisted
            ) {

                persistBackendDiagnosis()
                    .catch(
                        function (error) {

                            /*
                             * Do not interrupt diagnosis reading.
                             *
                             * The CTA will retry and surface the
                             * error if persistence is still unavailable.
                             */

                            console.warn(
                                "Page05: Initial backend diagnosis persistence attempt did not complete.",
                                error
                            );

                        }
                    );

            }


            return state.diagnosis;

        }
        catch (error) {

            console.error(
                "CTM PATH™ Page05 failed.",
                error
            );


            txt(
                "diagnosis-current-status-tamil",
                "முந்தைய மதிப்பீட்டு தரவு கிடைக்கவில்லை"
            );


            txt(
                "diagnosis-current-status",
                "ASSESSMENT DATA UNAVAILABLE"
            );


            txt(
                "diagnosis-current-status-copy",
                "Page 02 and Page 04 results are required. Please complete the previous assessment steps."
            );


            return null;

        }

    }


    /* ======================================================================
       REBUILD

       Rebuilds frontend Page 05 diagnosis only.

       A confirmed backend persistence lock for the same People ID
       remains intact to prevent duplicate diagnosis rows.
    ====================================================================== */

    function rebuild() {

        state.initialized =
            false;


        state.input =
            null;


        state.diagnosis =
            null;


        state.backendPayload =
            null;


        state.backendResponse =
            null;


        state.persisting =
            false;


        state.persisted =
            false;


        state.persistencePromise =
            null;


        return init();

    }


    /* ======================================================================
       PUBLIC PAGE MODULE
    ====================================================================== */

    w.CTM_PAGE05 =
        Object.freeze({

            version:
                "2.0",


            init:
                init,


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

                    return read(
                        CONFIG.diagnosisStorageKey
                    );

                },


            getBackendPayload:
                function () {

                    return state.backendPayload;

                },


            getBackendResponse:
                function () {

                    return state.backendResponse;

                },


            isBackendPersisted:
                function () {

                    return state.persisted;

                },


            persistBackendDiagnosis:
                persistBackendDiagnosis,


            rebuild:
                rebuild,


            storageKeys:
                Object.freeze({

                    p2:
                        CONFIG.page02StorageKey,

                    p4:
                        CONFIG.page04StorageKey,

                    out:
                        CONFIG.diagnosisStorageKey,

                    backend:
                        CONFIG.backendPersistenceKey

                })

        });


})(window, document);

