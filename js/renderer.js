
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/renderer.js
 * Batch: 1 of 2
 * Responsibility:
 * Presentation Engine
 * Responsible ONLY for rendering the Guided Journey.
 *
 * Business decisions remain inside conversation.js
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   CONFIGURATION
========================================================== */

const ROOT_SELECTOR = "#app";
const TRANSITION_MS = 450;

/* ==========================================================
   INTERNAL STATE
========================================================== */

const state = {

    initialized: false,

    rendering: false,

    root: null,

    currentAct: null,

    currentMoment: null,

    currentComponent: null,

    currentHTML: ""

};

/* ==========================================================
   CACHE
========================================================== */

const cache = {

    components: new Map()

};

/* ==========================================================
   COMPONENT REGISTRY
========================================================== */

const registry = Object.freeze({

    message: "message",

    question: "question",

    choice: "choice",

    input: "input",

    reflection: "reflection",

    insight: "insight",

    loading: "loading",

    booking: "booking",

    complete: "complete"

});

/* ==========================================================
   ROOT
========================================================== */

function root() {

    if (state.root) {

        return state.root;

    }

    state.root =
        document.querySelector(ROOT_SELECTOR);

    if (!state.root) {

        throw new Error(
            `Renderer root '${ROOT_SELECTOR}' not found.`
        );

    }

    return state.root;

}

/* ==========================================================
   INITIALIZE
========================================================== */

function initialize() {

    root();

    state.initialized = true;

}

/* ==========================================================
   LIFECYCLE
========================================================== */

function beforeRender(moment) {

    document.dispatchEvent(

        new CustomEvent(
            "ctm:before-render",
            {
                detail: moment
            }
        )

    );

}

function afterRender(moment) {

    document.dispatchEvent(

        new CustomEvent(
            "ctm:after-render",
            {
                detail: moment
            }
        )

    );

}

/* ==========================================================
   RENDER LOCK
========================================================== */

function lock() {

    if (state.rendering) {

        return false;

    }

    state.rendering = true;

    return true;

}

function unlock() {

    state.rendering = false;

}

/* ==========================================================
   COMPONENT LOADER
========================================================== */

async function component(name) {

    if (cache.components.has(name)) {

        return cache.components.get(name);

    }

    const html =
        await CTMLoader.loadComponent(name);

    cache.components.set(name, html);

    return html;

}

/* ==========================================================
   TEMPLATE ENGINE
========================================================== */

function template(view, data = {}) {

    let html =
        CTMPersonalization.personalizeHTML(view);

    Object.entries(data).forEach(

        ([key, value]) => {

            html = html.replaceAll(

                `{{${key}}}`,

                value ?? ""

            );

        }

    );

    return html;

}

/* ==========================================================
   VALIDATION
========================================================== */

function validate(moment) {

    if (!moment) {

        throw new Error(
            "Moment is undefined."
        );

    }

    if (!moment.id) {

        throw new Error(
            "Moment id missing."
        );

    }

    if (!moment.component) {

        throw new Error(
            "Moment component missing."
        );

    }

    if (!(moment.component in registry)) {

        throw new Error(

            `Unknown component '${moment.component}'.`

        );

    }

}

/* ==========================================================
   TRANSITIONS
========================================================== */

async function fadeOut() {

    const app = root();

    app.classList.add("ctm-fade-out");

    await CTMUtils.wait(
        TRANSITION_MS
    );

}

async function fadeIn() {

    const app = root();

    app.classList.remove("ctm-fade-out");

    app.classList.add("ctm-fade-in");

    await CTMUtils.wait(
        TRANSITION_MS
    );

    app.classList.remove(
        "ctm-fade-in"
    );

}

/* ==========================================================
   GENERIC COMPONENT RENDERER
========================================================== */

async function renderComponent(
    componentName,
    data = {}
) {

    const view =
        await component(componentName);

    const html =
        template(view, data);

    state.currentHTML = html;

    root().innerHTML = html;

    state.currentComponent =
        componentName;

    return html;

}

 /* ==========================================================
   LOADING
========================================================== */

async function loading(data = {}) {

    return renderComponent(
        registry.loading,
        data
    );

}

/* ==========================================================
   ERROR
========================================================== */

function error(message) {

    root().innerHTML = `
        <section class="ctm-error">

            <h2>
                Something went wrong
            </h2>

            <p>
                ${CTMUtils.escapeHTML(message)}
            </p>

        </section>
    `;

}

function buildViewModel(moment) {

    const payload =
        moment.payload || {};

    function render(value) {

        if (value == null) {
            return "";
        }

        if (typeof value === "string") {
            return value;
        }

        if (Array.isArray(value)) {

            return value
                .filter(Boolean)
                .join("<br>");

        }

        return String(value);

    }

    function language(value, lang) {

        if (!value) {
            return "";
        }

        if (typeof value === "string") {
            return value;
        }

        return render(value[lang]);

    }

    function bilingualBlock(value) {

        if (!value) {
            return "";
        }

        const ta = language(value, "ta");
        const en = language(value, "en");

        let html = "";

        if (ta) {

            html += `
                <div class="ctm-ta">
                    ${ta}
                </div>
            `;

        }

        if (en) {

            html += `
                <div class="ctm-en">
                    ${en}
                </div>
            `;

        }

        return html;

    }

    function collect() {

        const blocks = [];

        [

            payload.message,

            payload.intro,

            payload.question,

            payload.insight,

            payload.reflection,

            payload.summary,

            payload.description,

            payload.note,

            payload.content,

            payload.lines,

            payload.text

        ].forEach(item => {

            const html =
                bilingualBlock(item);

            if (html) {

                blocks.push(

                    `<div class="ctm-block">${html}</div>`

                );

            }

        });

        return blocks.join("");

    }

    return {

        step: "",

        titleTa:
            language(payload.title, "ta"),

        titleEn:
            language(payload.title, "en"),

        message:
            collect(),

        button:
            bilingualBlock(payload.button) ||

            bilingualBlock(payload.primaryButton) ||

            bilingualBlock(payload.secondaryButton) ||

            `
            <div class="ctm-ta">
                தொடரலாம்
            </div>

            <div class="ctm-en">
                Continue
            </div>
            `

    };

}
   
/* ==========================================================
   RENDER MOMENT
========================================================== */

async function renderMoment(moment) {

    validate(moment);

    if (!lock()) {

        return false;

    }

    beforeRender(moment);

    try {

        state.currentAct =
            moment.act ??
            CTMState.get("currentAct");

        state.currentMoment =
            moment.id;

        const viewModel =
            buildViewModel(moment);

        await fadeOut();

        await renderComponent(
            moment.component,
            viewModel
        );

        CTMState.set(
            "navigation.currentScene",
            {
                act: state.currentAct,
                moment: state.currentMoment,
                component: moment.component
            }
        );

        CTMUtils.scrollTop(false);

        await fadeIn();

        afterRender(moment);

        return true;

    }
    catch (exception) {

        console.error(exception);

        error(exception.message);

        return false;

    }
    finally {

        unlock();

    }

}
   
/* ==========================================================
   CURRENT STATE
========================================================== */

function current() {

    return {

        initialized:
            state.initialized,

        rendering:
            state.rendering,

        act:
            state.currentAct,

        moment:
            state.currentMoment,

        component:
            state.currentComponent,

        html:
            state.currentHTML

    };

}

/* ==========================================================
   CACHE
========================================================== */

function clearCache() {

    cache.components.clear();

}

/* ==========================================================
   CLEAR
========================================================== */

function clear() {

    root().innerHTML = "";

    state.currentHTML = "";

    state.currentMoment = null;

    state.currentComponent = null;

}

/* ==========================================================
   DESTROY
========================================================== */

function destroy() {

    clear();

    clearCache();

    state.initialized = false;

    state.rendering = false;

    state.currentAct = null;

    state.root = null;

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.CTMRenderer = Object.freeze({

    initialize,

    root,

    loading,

    renderMoment,

    renderComponent,

    current,

    clear,

    clearCache,

    destroy,

    error

});

})();

