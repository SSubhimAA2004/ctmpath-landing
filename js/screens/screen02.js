
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    Screen 02
    Registration

    Purpose

    • Capture Visitor Information
    • Validate Registration Form
    • Register Visitor
    • Save Visitor ID
    • Navigate to Screen 03

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.screen02 = {

    /*==================================================
    INITIALIZE
    ==================================================*/

    init(){

        this.form =

            document.getElementById(

                'registrationForm'

            );

        this.fullName =

            document.getElementById(

                'fullName'

            );

        this.mobile =

            document.getElementById(

                'mobile'

            );

        this.email =

            document.getElementById(

                'email'

            );

        this.district =

            document.getElementById(

                'district'

            );

        this.state =

            document.getElementById(

                'state'

            );

        this.button =

            document.getElementById(

                'btnRegister'

            );

        this.restoreValues();

        this.bindEvents();

        this.validateForm();

    },



    /*==================================================
    RESTORE SAVED VALUES
    ==================================================*/

    restoreValues(){

        if(

            !CTM.state ||

            !CTM.state.visitor

        ){

            return;

        }

        this.fullName.value =

            CTM.state.visitor.name || '';

        this.mobile.value =

            CTM.state.visitor.mobile || '';

        this.email.value =

            CTM.state.visitor.email || '';

        this.district.value =

            CTM.state.visitor.district || '';

        this.state.value =

            CTM.state.visitor.state || '';

    },



    /*==================================================
    BIND EVENTS
    ==================================================*/

    bindEvents(){

        [

            this.fullName,

            this.mobile,

            this.email,

            this.district,

            this.state

        ]

        .forEach(field=>{

            field.addEventListener(

                'input',

                ()=>{

                    this.validateForm();

                }

            );

        });

        this.button.addEventListener(

            'click',

            event=>{

                event.preventDefault();

                this.submit();

            }

        );

    },



    /*==================================================
    VALIDATE FORM
    ==================================================*/

    validateForm(){

        const isValid =

            this.fullName.value.trim() !== '' &&

            this.mobile.value.trim() !== '' &&

            this.email.value.trim() !== '' &&

            this.district.value.trim() !== '' &&

            this.state.value.trim() !== '';

        this.button.disabled = !isValid;

        if(isValid){

            this.saveToState();

        }

    },



    /*==================================================
    SAVE TO STATE
    ==================================================*/

    saveToState(){

        CTM.state.visitor = {

            ...CTM.state.visitor,

            name:

                this.fullName.value.trim(),

            email:

                this.email.value.trim(),

            mobile:

                this.mobile.value.trim(),

            district:

                this.district.value.trim(),

            state:

                this.state.value.trim()

        };

        CTM.storage.save();

    },

    /*==================================================
    SUBMIT
    ==================================================*/

    async submit(){

        if(this.button.disabled){

            return;

        }

        this.button.disabled = true;

        this.button.classList.add(

            'loading'

        );

        this.saveToState();

        try{

            const result =

                await this.registerVisitor();

            if(result.success){

                /*------------------------------------------
                Store Visitor ID
                ------------------------------------------*/

                CTM.state.visitor.id =

                    result.visitorId;

                CTM.state.visitor.currentPage =

                    'Screen03';

                CTM.storage.save();

                /*------------------------------------------
                Navigate
                ------------------------------------------*/

                CTM.router.next();

                return;

            }

            alert(

                result.message ||

                'Unable to register visitor.'

            );

        }

        catch(error){

            console.error(

                error

            );

            alert(

                'Unable to connect to CTM PATH™ server.'

            );

        }

        finally{

            this.button.disabled = false;

            this.button.classList.remove(

                'loading'

            );

        }

    },



    /*==================================================
    REGISTER VISITOR

    Google Apps Script

    ==================================================*/

    async registerVisitor(){

        /*----------------------------------------------
        Build Payload
        ----------------------------------------------*/

        const payload = {

            emotion:

                CTM.state.visitor.emotion || '',

            name:

                this.fullName.value.trim(),

            email:

                this.email.value.trim(),

            mobile:

                this.mobile.value.trim(),

            district:

                this.district.value.trim(),

            state:

                this.state.value.trim(),

            referralSource:

                'Website',

            language:

                document.documentElement.lang ||

                'ta',

            device:

                window.innerWidth < 768

                    ? 'Mobile'

                    : window.innerWidth < 1024

                        ? 'Tablet'

                        : 'Desktop'

        };



        /*----------------------------------------------
        Register Visitor
        ----------------------------------------------*/

        const response =

            await CTM.api.registerVisitor(

                payload

            );



        return response;

    },

    /*==================================================
    RESET FORM
    ==================================================*/

    reset(){

        if(this.form){

            this.form.reset();

        }

        if(this.button){

            this.button.disabled = true;

            this.button.classList.remove(

                'loading'

            );

        }

    },



    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        this.form = null;

        this.fullName = null;

        this.mobile = null;

        this.email = null;

        this.district = null;

        this.state = null;

        this.button = null;

    }

};



/*==================================================
AUTO INITIALIZE

Screen modules are initialized when
their HTML is loaded by the router.

==================================================*/

document.addEventListener(

    'DOMContentLoaded',

    ()=>{

        const form =

            document.getElementById(

                'registrationForm'

            );



        if(

            form &&

            CTM.screen02

        ){

            CTM.screen02.init();

        }

    }

);

