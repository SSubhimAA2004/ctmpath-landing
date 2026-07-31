
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : api.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class API {

    #initialized = false;

    #baseUrl = '';

    #defaultTimeout = 30000;

    init() {

        if (this.#initialized) {
            return;
        }

        this.#baseUrl = CTM.Config.API.BASE_URL;

        if (CTM.Config.API.TIMEOUT) {
            this.#defaultTimeout = CTM.Config.API.TIMEOUT;
        }

        this.#initialized = true;

        CTM.Logger.info('API initialized.');

    }

    /* ======================================================
       GET
       ====================================================== */

    async get(action, params = {}) {

        return this.request({

            method: 'GET',

            action,

            params

        });

    }

    /* ======================================================
       POST
       ====================================================== */

    async post(action, payload = {}) {

        return this.request({

            method: 'POST',

            action,

            payload

        });

    }

    /* ======================================================
       REQUEST
       ====================================================== */

    async request({

        method = 'GET',

        action = '',

        params = {},

        payload = {}

    }) {

        const controller = new AbortController();

        const timeout = setTimeout(

            () => controller.abort(),

            this.#defaultTimeout

        );

        try {

            let url = this.#baseUrl;

            const options = {

                method,

                signal: controller.signal,

                headers: {

                    'Content-Type': 'application/json'

                }

            };

            if (method === 'GET') {

                const query = new URLSearchParams({

                    action,

                    ...params

                });

                url += '?' + query.toString();

            }
            else {

                options.body = JSON.stringify({

                    action,

                    ...payload

                });

            }

            const response = await fetch(

                url,

                options

            );

            clearTimeout(timeout);

            if (!response.ok) {

                throw new Error(

                    `HTTP ${response.status}`

                );

            }

            const data = await response.json();

            return {

                success: true,

                data,

                error: null

            };

        }
        catch (error) {

            clearTimeout(timeout);

            CTM.Logger.error(

                'API request failed.',

                error

            );

            return {

                success: false,

                data: null,

                error: error.message

            };

        }

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        this.#initialized = false;

    }

}

CTM.API = Object.freeze(

    new API()

);

