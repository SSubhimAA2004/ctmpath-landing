
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : services.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class Services {

    #initialized = false;

    init() {

        if (this.#initialized) {
            return;
        }

        this.#initialized = true;

        CTM.Logger.info(
            'Services initialized.'
        );

    }

    /* ======================================================
       Register Visitor
       ====================================================== */

    async registerVisitor(visitor) {

        const validation = CTM.Validation.validateForm(

            visitor,

            CTM.Config.VALIDATION.VISITOR

        );

        if (!validation.valid) {

            return {

                success: false,

                errors: validation.errors

            };

        }

        const response = await CTM.API.post(

            'registerVisitor',

            visitor

        );

        if (!response.success) {

            return response;

        }

        CTM.State.updateVisitor(visitor);

        CTM.Events.emit(

            CTM.Config.EVENTS.VISITOR_REGISTERED,

            visitor

        );

        return response;

    }

    /* ======================================================
       Save Discovery
       ====================================================== */

    async saveDiscovery(discovery) {

        CTM.State.updateDiscovery(discovery);

        const response = await CTM.API.post(

            'saveDiscovery',

            discovery

        );

        if (response.success) {

            CTM.Events.emit(

                CTM.Config.EVENTS.DISCOVERY_SAVED,

                discovery

            );

        }

        return response;

    }

    /* ======================================================
       Submit Assessment
       ====================================================== */

    async submitAssessment(assessment) {

        CTM.State.updateAssessment(

            assessment

        );

        const response = await CTM.API.post(

            'submitAssessment',

            assessment

        );

        if (response.success) {

            CTM.Events.emit(

                CTM.Config.EVENTS.ASSESSMENT_COMPLETED,

                response.data

            );

        }

        return response;

    }

    /* ======================================================
       Generate Diagnosis
       ====================================================== */

    async generateDiagnosis() {

        const assessment =

            CTM.State.getAssessment();

        const response = await CTM.API.post(

            'generateDiagnosis',

            assessment

        );

        if (response.success) {

            CTM.State.updateResults({

                diagnosis: response.data

            });

            CTM.Events.emit(

                CTM.Config.EVENTS.DIAGNOSIS_GENERATED,

                response.data

            );

        }

        return response;

    }

    /* ======================================================
       Generate Roadmap
       ====================================================== */

    async generateRoadmap() {

        const results =

            CTM.State.getResults();

        const response = await CTM.API.post(

            'generateRoadmap',

            results

        );

        if (response.success) {

            CTM.State.updateResults({

                roadmap: response.data

            });

            CTM.Events.emit(

                CTM.Config.EVENTS.ROADMAP_GENERATED,

                response.data

            );

        }

        return response;

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.#initialized = false;

    }

}

CTM.Services = Object.freeze(

    new Services()

);

