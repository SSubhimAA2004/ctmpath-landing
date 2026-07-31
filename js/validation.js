
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : validation.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class Validation {

    #initialized = false;

    init() {

        if (this.#initialized) {
            return;
        }

        this.#initialized = true;

        CTM.Logger.info(
            'Validation initialized.'
        );

    }

    /* ======================================================
       Required
       ====================================================== */

    required(value) {

        return value !== null &&
               value !== undefined &&
               String(value).trim() !== '';

    }

    /* ======================================================
       Email
       ====================================================== */

    email(value) {

        if (!this.required(value)) {
            return false;
        }

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(
            String(value).trim()
        );

    }

    /* ======================================================
       Mobile
       ====================================================== */

    mobile(value) {

        if (!this.required(value)) {
            return false;
        }

        const regex =
            /^[6-9]\d{9}$/;

        return regex.test(
            String(value).trim()
        );

    }

    /* ======================================================
       Number
       ====================================================== */

    number(value) {

        return !Number.isNaN(
            Number(value)
        );

    }

    /* ======================================================
       Minimum Length
       ====================================================== */

    minLength(value, length) {

        if (!this.required(value)) {
            return false;
        }

        return String(value).trim().length >= length;

    }

    /* ======================================================
       Maximum Length
       ====================================================== */

    maxLength(value, length) {

        if (!this.required(value)) {
            return false;
        }

        return String(value).trim().length <= length;

    }

    /* ======================================================
       Generic Form Validation
       ====================================================== */

    validateForm(data, rules) {

        const errors = {};

        Object.entries(rules).forEach(([field, validators]) => {

            const value = data[field];

            for (const validator of validators) {

                const valid = validator.rule(value);

                if (!valid) {

                    errors[field] = validator.message;

                    break;

                }

            }

        });

        return {

            valid: Object.keys(errors).length === 0,

            errors

        };

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.#initialized = false;

    }

}

CTM.Validation = Object.freeze(

    new Validation()

);

