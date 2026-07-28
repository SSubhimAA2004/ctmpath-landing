
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : report.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend report presentation helper.

   Responsibilities:

   • Receive backend-generated report data.
   • Store report display state.
   • Format report sections.
   • Prepare UI presentation objects.

   Does NOT:

   • Generate reports.
   • Create PDFs.
   • Store reports.
   • Send emails.
   • Apply business rules.

   Backend Ownership:

   • Report generation
   • PDF generation
   • Drive storage
   • Email delivery

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   REPORT SERVICE
   ========================================================================== */


CTMPATH.Report = {


    version:

        "1.0",



    initialized:

        false,



    data:

        null



};




/* ==========================================================================
   INITIALIZATION
   ========================================================================== */


CTMPATH.Report.init = function() {


    CTMPATH.Report.initialized = true;



};




/* ==========================================================================
   LOAD REPORT DATA

   Receives completed backend report response.

   ========================================================================== */


CTMPATH.Report.load = function(reportData) {


    CTMPATH.Report.data = reportData;



    return true;



};




/* ==========================================================================
   GET REPORT DATA

   ========================================================================== */


CTMPATH.Report.getData = function() {


    return CTMPATH.Report.data;



};




/* ==========================================================================
   GET REPORT TITLE

   Presentation helper.

   ========================================================================== */


CTMPATH.Report.getTitle = function() {


    if (

        !CTMPATH.Report.data

    ) {


        return "";



    }



    return (

        CTMPATH.Report.data.title ||

        "CTM PATH™ Guided Journey™ Report"

    );



};




/* ==========================================================================
   GET REPORT SECTIONS

   Returns backend sections without modification.

   ========================================================================== */


CTMPATH.Report.getSections = function() {


    if (

        !CTMPATH.Report.data

    ) {


        return [];



    }



    return (

        CTMPATH.Report.data.sections ||

        []

    );



};




/* ==========================================================================
   FORMAT SECTION

   Converts backend section into display object.

   ========================================================================== */


CTMPATH.Report.formatSection = function(section) {


    return {


        heading:

            section.heading || "",



        content:

            section.content || "",



        type:

            section.type || "text"



    };



};




/* ==========================================================================
   FORMAT ALL SECTIONS

   ========================================================================== */


CTMPATH.Report.formatSections = function() {


    return CTMPATH.Report.getSections()

        .map(function(section) {


            return CTMPATH.Report.formatSection(

                section

            );



        });



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : report.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   REQUEST REPORT GENERATION

   Sends request to backend report service.

   Backend owns:

   • Report creation
   • PDF generation
   • Drive storage
   • Email delivery

   ========================================================================== */


CTMPATH.Report.generate = async function(visitorId) {


    if (

        !CTMPATH.API ||

        typeof CTMPATH.API.generateReport !==

            "function"

    ) {


        throw new Error(

            "Report API service unavailable."

        );



    }



    const result = await CTMPATH.API.generateReport(

        visitorId

    );



    CTMPATH.Report.load(

        result

    );



    return result;



};




/* ==========================================================================
   GET DOWNLOAD INFORMATION

   Returns backend supplied report references.

   Frontend does not create files.

   ========================================================================== */


CTMPATH.Report.getDownloadInfo = function() {


    if (

        !CTMPATH.Report.data

    ) {


        return null;



    }



    return {


        url:

            CTMPATH.Report.data.url || null,



        fileId:

            CTMPATH.Report.data.fileId || null



    };



};




/* ==========================================================================
   CLEAR REPORT STATE

   ========================================================================== */


CTMPATH.Report.reset = function() {


    CTMPATH.Report.data = null;



};




/* ==========================================================================
   REPORT STATUS

   Internal diagnostic helper.

   ========================================================================== */


CTMPATH.Report.status = function() {


    return {


        initialized:

            CTMPATH.Report.initialized,



        available:

            Boolean(

                CTMPATH.Report.data

            ),



        version:

            CTMPATH.Report.version



    };



};




/* ==========================================================================
   END OF FILE

   File:

   js/report.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   data/pillars.js

   ========================================================================== */

