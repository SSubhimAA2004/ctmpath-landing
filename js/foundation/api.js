
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    api.js

    Version
    2.0

    Purpose

    Central API Communication Layer

    Responsibilities

    • Backend Configuration
    • HTTP Communication
    • Visitor Registration
    • Visitor Updates
    • Visitor Retrieval
    • Health Check
    • Future Services
        - Life Wheel
        - PDF
        - Email

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

/*=====================================================================

    API MODULE

======================================================================*/

CTM.api = {

    /*==================================================
    CONFIGURATION
    ==================================================*/

    config:{

        endpoint:

            'https://script.google.com/macros/s/AKfycby1yF2m7cIXnHh0SqfegiDuxsjdMX6PVcTaSogQ5HFqx3z5CGB3jjN0vCFvQuPV5sBCIw/exec',

        timeout:30000,

        retries:1,

        debug:true

    },



    /*==================================================
    INITIALIZE

    Called once by app.js

    ==================================================*/

    init(options={}){

        this.config={

            ...this.config,

            ...options

        };

        if(this.config.debug){

            console.log(

                'CTM API Initialized'

            );

            console.log(

                'Endpoint:',

                this.config.endpoint

            );

        }

    },



    /*==================================================
    SET ENDPOINT
    ==================================================*/

    setEndpoint(url){

        this.config.endpoint=url;

    },



    /*==================================================
    GET ENDPOINT
    ==================================================*/

    getEndpoint(){

        return this.config.endpoint;

    },



    /*==================================================
    CONFIGURED?
    ==================================================*/

    isConfigured(){

        return(

            this.config.endpoint!==''

        );

    },



    /*==================================================
    REQUEST TIMEOUT

    ==================================================*/

    async timeoutPromise(){

        return new Promise(

            (_,reject)=>{

                setTimeout(

                    ()=>{

                        reject(

                            new Error(

                                'Request timed out.'

                            )

                        );

                    },

                    this.config.timeout

                );

            }

        );

    },



    /*==================================================
    POST

    Standard request used by
    every backend operation.

    ==================================================*/

    async post(

        action,

        data={}

    ){

        if(

            !this.isConfigured()

        ){

            throw new Error(

                'API endpoint is not configured.'

            );

        }

        const payload={

            action,

            data

        };

        try{

            const response=

                await Promise.race([

                    fetch(

                        this.config.endpoint,

                        {

                            method:'POST',

                            headers:{

                                'Content-Type':

                                'application/json'

                            },

                            body:JSON.stringify(

                                payload

                            )

                        }

                    ),

                    this.timeoutPromise()

                ]);



            if(

                !response.ok

            ){

                throw new Error(

                    'HTTP Error : '+

                    response.status

                );

            }



            const result=

                await response.json();



            if(

                this.config.debug

            ){

                console.log(

                    'API Request',

                    action

                );



                console.log(

                    payload

                );



                console.log(

                    result

                );

            }



            return result;

        }

        catch(error){

            console.error(

                'API Error',

                error

            );



            return{

                success:false,

                message:error.message ||

                        'Unknown API Error'

            };

        }

    },



    /*==================================================
    HEALTH CHECK

    Confirms backend is online.

    ==================================================*/

    async ping(){

        return await this.post(

            'ping',

            {}

        );

    },



    /*==================================================
    REGISTER VISITOR

    Screen02

    ==================================================*/

    async registerVisitor(visitor){

        return await this.post(

            'registerVisitor',

            visitor

        );

    },



    /*==================================================
    UPDATE VISITOR

    Screen03 → Screen16

    ==================================================*/

    async updateVisitor(visitor){

        return await this.post(

            'updateVisitor',

            visitor

        );

    },



    /*==================================================
    GET VISITOR

    Loads an existing visitor.

    ==================================================*/

    async getVisitor(visitorId){

        return await this.post(

            'getVisitor',

            {

                visitorId

            }

        );

    },

    /*==================================================
    GENERATE LIFE WHEEL

    Future
    ==================================================*/

    async generateLifeWheel(payload){

        return await this.post(

            'generateLifeWheel',

            payload

        );

    },



    /*==================================================
    GENERATE PDF

    Future
    ==================================================*/

    async generatePdf(payload){

        return await this.post(

            'generatePdf',

            payload

        );

    },



    /*==================================================
    SEND EMAIL

    Future
    ==================================================*/

    async sendEmail(payload){

        return await this.post(

            'sendEmail',

            payload

        );

    },



    /*==================================================
    GENERIC ACTION

    Allows future backend methods
    without changing api.js

    ==================================================*/

    async execute(

        action,

        data={}

    ){

        return await this.post(

            action,

            data

        );

    },



    /*==================================================
    CONNECTION TEST

    Returns TRUE when backend
    is reachable.

    ==================================================*/

    async isOnline(){

        try{

            const result=

                await this.ping();

            return(

                result.success===true

            );

        }

        catch(error){

            return false;

        }

    },



    /*==================================================
    GET VERSION

    ==================================================*/

    version(){

        return{

            application:

                'CTM PATH™',

            api:'2.0',

            backend:

                this.config.endpoint

        };

    },



    /*==================================================
    RESET

    Development Only

    ==================================================*/

    reset(){

        console.clear();

    }

};



/*==================================================
AUTO INITIALIZE

==================================================*/

CTM.api.init();

