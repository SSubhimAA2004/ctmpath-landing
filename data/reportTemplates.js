
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : reportTemplates.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend report presentation template repository.

   Responsibilities:

   • Store report display structures.
   • Define UI section layouts.
   • Support report rendering.
   • Maintain consistent presentation language.

   Does NOT:

   • Generate reports.
   • Create PDFs.
   • Apply scoring logic.
   • Build personalised recommendations.

   Backend Ownership:

   • Report generator
   • PDF generation
   • Personalisation
   • Storage
   • Delivery

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   REPORT TEMPLATE LIBRARY
   ========================================================================== */


CTMPATH.ReportTemplates = [


    {


        id:

            "life_assessment_summary",



        title:

            "Life Assessment Summary™",



        sections:


            [


                {


                    id:

                        "overview",



                    title:

                        "Your Journey Overview™",



                    type:

                        "summary"



                },


                {


                    id:

                        "pillar_analysis",



                    title:

                        "Your 12 Pillar Analysis™",



                    type:

                        "chart"



                },


                {


                    id:

                        "growth_opportunities",



                    title:

                        "Growth Opportunities™",



                    type:

                        "content"



                }


            ]



    },



    {


        id:

            "transformation_report",



        title:

            "CTM PATH™ Transformation Report",



        sections:


            [


                {


                    id:

                        "diagnosis",



                    title:

                        "Your Personal Diagnosis™",



                    type:

                        "diagnosis"



                },


                {


                    id:

                        "prescription",



                    title:

                        "Your Action Prescription™",



                    type:

                        "action-plan"



                },


                {


                    id:

                        "next_steps",



                    title:

                        "Your Next Steps™",



                    type:

                        "cta"



                }


            ]



    }



];

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : reportTemplates.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   REPORT TEMPLATE HELPERS

   Frontend presentation utilities only.

   ========================================================================== */


/**
 * Get all report templates.
 *
 * @returns {Array}
 */


CTMPATH.getReportTemplates = function() {


    return CTMPATH.ReportTemplates;



};




/**
 * Get template by identifier.
 *
 * @param {String} id
 *
 * @returns {Object|null}
 */


CTMPATH.getReportTemplateById = function(id) {


    return CTMPATH.ReportTemplates.find(function(template) {


        return template.id === id;



    }) || null;



};




/**
 * Get report sections.
 *
 * @param {Object} template
 *
 * @returns {Array}
 */


CTMPATH.getReportSections = function(template) {


    if (

        !template ||

        !Array.isArray(

            template.sections

        )

    ) {


        return [];



    }



    return template.sections;



};




/**
 * Format report template section.
 *
 * @param {Object} section
 *
 * @returns {Object|null}
 */


CTMPATH.formatReportSection = function(section) {


    if (!section) {


        return null;



    }



    return {


        id:

            section.id || "",



        title:

            section.title || "",



        type:

            section.type || "content"



    };



};




/**
 * Validate report template structure.
 *
 * Frontend consistency check only.
 *
 * @returns {Boolean}
 */


CTMPATH.validateReportTemplates = function() {


    return CTMPATH.ReportTemplates.every(function(template) {


        return (

            template.id &&

            template.title &&

            Array.isArray(

                template.sections

            )

        );



    });



};

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : reportTemplates.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   REPORT TEMPLATE STATUS

   Internal frontend diagnostic.

   ========================================================================== */


/**
 * Returns report template availability.
 *
 * Presentation layer check only.
 *
 * @returns {Object}
 */


CTMPATH.getReportTemplateStatus = function() {


    return {


        total:

            CTMPATH.ReportTemplates.length,



        templates:

            CTMPATH.ReportTemplates.map(function(template) {


                return {


                    id:

                        template.id,



                    title:

                        template.title



                };


            })



    };


};




/* ==========================================================================
   REPORT SECTION BUILDER

   Creates display-ready report structure.

   Does NOT generate report content.

   ========================================================================== */


/**
 * Build frontend report layout.
 *
 * @param {String} templateId
 *
 * @returns {Object|null}
 */


CTMPATH.buildReportLayout = function(templateId) {


    const template =

        CTMPATH.getReportTemplateById(

            templateId

        );



    if (!template) {


        return null;



    }



    return {


        id:

            template.id,



        title:

            template.title,



        sections:

            template.sections.map(function(section) {


                return CTMPATH.formatReportSection(

                    section

                );



            })



    };



};




/* ==========================================================================
   REPORT TEMPLATE READY EVENT

   Allows dependent frontend modules to initialize.

   ========================================================================== */


document.dispatchEvent(

    new CustomEvent(

        "CTMPATH_REPORT_TEMPLATES_READY",

        {


            detail:

                {


                    count:

                        CTMPATH.ReportTemplates.length



                }



        }

    )

);




/* ==========================================================================
   END OF FILE

   File:

   data/reportTemplates.js


   Status:

   FOUNDATION MODULE COMPLETE


   ========================================================================== */
