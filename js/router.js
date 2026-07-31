
/* ==========================================================
   CTM PATH™ Guided Journey™
   Foundation v1.0
   File : router.js
   ========================================================== */

'use strict';

window.CTM = window.CTM || {};

class Router {

    #initialized = false;

    #currentRoute = '';

    #routes = new Map();

    init() {

        if (this.#initialized) {
            return;
        }

        this.#registerRoutes();

        window.addEventListener(

            'popstate',

            this.#handlePopState.bind(this)

        );

        this.#initialized = true;

        CTM.Logger.info(

            'Router initialized.'

        );

    }

    /* ======================================================
       Route Registration
       ====================================================== */

    #registerRoutes() {

        Object.entries(

            CTM.Config.ROUTES

        ).forEach(

            ([key, value]) => {

                this.#routes.set(

                    key,

                    value

                );

            }

        );

    }

    /* ======================================================
       Navigate
       ====================================================== */

    async navigate(routeName) {

        if (!this.#routes.has(routeName)) {

            CTM.Logger.warn(

                `Unknown route: ${routeName}`

            );

            return false;

        }

        const route =

            this.#routes.get(routeName);

        CTM.Events.emit(

            CTM.Config.EVENTS.ROUTE_CHANGING,

            {

                from: this.#currentRoute,

                to: routeName

            }

        );

        CTM.State.updateApp({

            previousRoute: this.#currentRoute,

            currentRoute: routeName

        });

        this.#currentRoute = routeName;

        history.pushState(

            {

                route: routeName

            },

            '',

            `#${route}`

        );

        CTM.UI.scrollTop();

        CTM.Events.emit(

            CTM.Config.EVENTS.ROUTE_CHANGED,

            {

                route: routeName

            }

        );

        return true;

    }

    /* ======================================================
       Browser Back
       ====================================================== */

    back() {

        history.back();

    }

    /* ======================================================
       Reload
       ====================================================== */

    reload() {

        if (

            this.#currentRoute

        ) {

            this.navigate(

                this.#currentRoute

            );

        }

    }

    /* ======================================================
       Current Route
       ====================================================== */

    current() {

        return this.#currentRoute;

    }

    /* ======================================================
       Pop State
       ====================================================== */

    #handlePopState(event) {

        if (

            event.state &&

            event.state.route

        ) {

            this.navigate(

                event.state.route

            );

        }

    }

    /* ======================================================
       Destroy
       ====================================================== */

    destroy() {

        window.removeEventListener(

            'popstate',

            this.#handlePopState

        );

        this.#routes.clear();

        this.#initialized = false;

    }

}

CTM.Router = Object.freeze(

    new Router()

);

