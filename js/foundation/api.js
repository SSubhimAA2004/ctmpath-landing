
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    api.js

    Purpose

    Central API Layer

    Responsibilities

    • Register Visitor
    • Save Assessment
    • Generate Life Wheel
    • Generate PDF
    • Send Email
    • Future API Integrations

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.api = {

    /*==================================================
    CONFIGURATION
    ==================================================*/

    config:{

        endpoint:'',

        timeout:30000

    },



    /*==================================================
    INITIALIZE
    ==================================================*/

    init(config={}){

        this.config = {

            ...this.config,

            ...config

        };

    },



    /*==================================================
    POST REQUEST
    ==================================================*/

    async post(action,data={}){

        if(!this.config.endpoint){

            throw new Error(

                'API endpoint not configured.'

            );

        }

        const response =

            await fetch(

                this.config.endpoint,

                {

                    method:'POST',

                    headers:{

                        'Content-Type':

                        'application/json'

                    },

                    body:JSON.stringify({

                        action,

                        data

                    })

                }

            );

        if(!response.ok){

            throw new Error(

                'Network request failed.'

            );

        }

        return await response.json();

    },



    /*==================================================
    REGISTER VISITOR
    ==================================================*/

    async registerVisitor(visitor){

        return await this.post(

            'registerVisitor',

            visitor

        );

    },



    /*==================================================
    SAVE ASSESSMENT
    ==================================================*/

    async saveAssessment(assessment){

        return await this.post(

            'saveAssessment',

            assessment

        );

    },

    /*==================================================
    GENERATE LIFE WHEEL
    ==================================================*/

    async generateLifeWheel(payload){

        return await this.post(

            'generateLifeWheel',

            payload

        );

    },



    /*==================================================
    GENERATE PDF
    ==================================================*/

    async generatePdf(payload){

        return await this.post(

            'generatePdf',

            payload

        );

    },



    /*==================================================
    SEND EMAIL
    ==================================================*/

    async sendEmail(payload){

        return await this.post(

            'sendEmail',

            payload

        );

    },



    /*==================================================
    HEALTH CHECK
    ==================================================*/

    async ping(){

        return await this.post(

            'ping',

            {}

        );

    },



    /*==================================================
    SET ENDPOINT
    ==================================================*/

    setEndpoint(url){

        this.config.endpoint = url;

    },



    /*==================================================
    GET ENDPOINT
    ==================================================*/

    getEndpoint(){

        return this.config.endpoint;

    },



    /*==================================================
    IS CONFIGURED
    ==================================================*/

    isConfigured(){

        return this.config.endpoint !== '';

    }

};

