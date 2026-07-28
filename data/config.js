
/*
========================================================

CTM PATH™ GUIDED JOURNEY™

DATA LAYER

File:
data/config.js

Purpose:
Central application configuration database.

Ownership:
- Application settings
- Environment configuration
- URLs
- Constants
- Journey settings

Rules:
- Questions belong only in questions.js
- Pillar metadata belongs only in pillars.js
- Scoring belongs only in scoring.js
- Backend controls diagnosis and prescription

========================================================
*/


/*
========================================================
NAMESPACE
========================================================
*/

const CTM_CONFIG = {


/*
========================================================
APPLICATION INFORMATION
========================================================
*/

appName:
"CTM PATH™ Guided Journey™",

version:
"1.0",

environment:
"production",


/*
========================================================
JOURNEY CONFIGURATION
========================================================
*/

journey:
{

    totalScreens:
    18,

    assessmentPillars:
    12,

    questionsPerPillar:
    3,

    totalQuestions:
    36,

    scoreRange:
    {
        minimum: 36,
        maximum: 360
    },

    language:
    {
        primary:
        "Tamil",

        secondary:
        "English"
    }

},


/*
========================================================
ASSESSMENT SETTINGS
========================================================
*/

assessment:
{

    minimumScore:
    1,

    maximumScore:
    10,

    allowBackNavigation:
    true,

    autoSave:
    true,

    storageKey:
    "CTM_PATH_SESSION"

},


/*
========================================================
UI CONFIGURATION
========================================================
*/

ui:
{

    theme:
    "premium-dark",

    designSystem:
    "CTM PATH™ Premium Design Language",

    accessibility:
    {
        seniorFriendly:
        true,

        largeTypography:
        true,

        comfortableSpacing:
        true
    }

}


/*
========================================================
END OF BATCH 1A

Completed:
✅ Namespace
✅ Application Information
✅ Journey Configuration
✅ Assessment Settings
✅ UI Configuration

Next:
Backend URLs
Storage Keys
System Constants

========================================================
*/

  /*
========================================================

CTM PATH™ GUIDED JOURNEY™

DATA LAYER

Continuation:
data/config.js

Batch:
1B

Current Section:
Backend Configuration
Storage Configuration
System Constants

========================================================
*/


/*
========================================================
BACKEND CONFIGURATION

Frontend → Backend Communication

========================================================
*/

backend:
{

    enabled:
    true,


    apiEndpoint:
    "",


    requestTimeout:
    30000,


    endpoints:
    {

        register:
        "/register",


        saveAssessment:
        "/assessment/save",


        calculateScore:
        "/assessment/score",


        generateDiagnosis:
        "/diagnosis/generate",


        generatePrescription:
        "/prescription/generate",


        generateReport:
        "/report/generate"

    }

},


/*
========================================================
STORAGE CONFIGURATION

Browser Session Storage

========================================================
*/

storage:
{

    sessionKey:
    "CTM_PATH_SESSION",


    registrationKey:
    "CTM_PATH_REGISTRATION",


    assessmentKey:
    "CTM_PATH_ASSESSMENT",


    scoreKey:
    "CTM_PATH_SCORE",


    reportKey:
    "CTM_PATH_REPORT"

},


/*
========================================================
SYSTEM CONSTANTS

========================================================
*/

constants:
{

    applicationName:
    "CTM PATH™ Guided Journey™",


    assessmentName:
    "CTM PATH™ Life Assessment™",


    wheelName:
    "KALA CHAKRA™ Life Balance Wheel",


    diagnosisName:
    "Diagnosis™",


    prescriptionName:
    "Prescription™",


    ctaName:
    "Transformation Journey™",


    defaultLanguage:
    "ta",


    supportedLanguages:
    [
        "ta",
        "en"
    ]

}


/*
========================================================
END OF BATCH 1B

Completed:

✅ Backend Configuration
✅ Storage Configuration
✅ System Constants

Next:
External URLs
Feature Flags
Final Export

========================================================
*/

/*
========================================================

CTM PATH™ GUIDED JOURNEY™

DATA LAYER

Continuation:
data/config.js

Batch:
1C

Current Section:
External URLs
Feature Flags
Final Export

========================================================
*/


/*
========================================================
EXTERNAL URL CONFIGURATION

========================================================
*/

urls:
{

    website:
    "",


    registration:
    "",


    calendar:
    "",


    whatsapp:
    "",


    email:
    ""

},


/*
========================================================
FEATURE FLAGS

Application Behaviour Controls

========================================================
*/

features:
{

    enableRegistration:
    true,


    enableAssessment:
    true,


    enableKalaChakra:
    true,


    enableDiagnosis:
    true,


    enablePrescription:
    true,


    enableReportGeneration:
    true,


    enableBackendSync:
    true

},


/*
========================================================
ERROR HANDLING CONFIGURATION

========================================================
*/

errors:
{

    messages:
    {

        network:
        "Unable to connect. Please try again.",


        session:
        "Your session has expired. Please restart your journey.",


        validation:
        "Please complete all required fields before continuing.",


        server:
        "Something went wrong. Please try again later."

    }

},


/*
========================================================
DEVELOPMENT CONFIGURATION

========================================================
*/

development:
{

    debugMode:
    false,


    logEvents:
    true,


    showTechnicalErrors:
    false

}


};


/*
========================================================

CONFIGURATION DATABASE COMPLETE

Total Sections:

✅ Application Information
✅ Journey Configuration
✅ Assessment Settings
✅ UI Configuration
✅ Backend Configuration
✅ Storage Configuration
✅ System Constants
✅ External URLs
✅ Feature Flags
✅ Error Handling
✅ Development Configuration


Global Access:

CTM_CONFIG


========================================================
*/

