
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v4.0
 * File: js/renderer.js
 *
 * PRESENTATION ENGINE
 *
 * Responsibility
 * ----------------------------------------------------------
 * • Render all Guided Journey components
 * • Build presentation view models
 * • Apply transitions
 * • Coordinate rendering lifecycle
 *
 * Does NOT contain:
 * • Business Logic
 * • Navigation Logic
 * • Conversation Logic
 * • Analytics Logic
 *
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   01. CONFIGURATION
========================================================== */

const ROOT_SELECTOR = "#app";

const TRANSITION_MS = 450;

/* ==========================================================
   02. INTERNAL STATE
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
   03. CACHE
========================================================== */

const cache = {

    components: new Map()

};

/* ==========================================================
   04. COMPONENT REGISTRY
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
   05. ROOT MANAGEMENT
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
   06. INITIALIZATION
========================================================== */

function initialize() {

    root();

    state.initialized = true;

}

/* ==========================================================
   07. LIFECYCLE EVENTS
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
   08. RENDER LOCK
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
   09. COMPONENT LOADER
========================================================== */

async function component(name) {

    if (cache.components.has(name)) {

        return cache.components.get(name);

    }

    const html =
        await CTMLoader.loadComponent(name);

    cache.components.set(

        name,

        html

    );

    return html;

}

/* ==========================================================
   10. TEMPLATE ENGINE
========================================================== */

function template(
    view,
    data = {}
) {

    let html =
        CTMPersonalization.personalizeHTML(
            view
        );

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
   11. VIEW MODEL ENGINE
   11.01 VALUE RENDERER
========================================================== */

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

/* ==========================================================
   11.02 LANGUAGE RESOLVER
========================================================== */

function language(
    value,
    lang
) {

    if (!value) {

        return "";

    }

    if (typeof value === "string") {

        return value;

    }

    return render(

        value[lang]

    );

}

/* ==========================================================
   11.03 BILINGUAL BLOCK BUILDER
========================================================== */

function bilingualBlock(value) {

    if (!value) {

        return "";

    }

    const ta =
        language(value, "ta");

    const en =
        language(value, "en");

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

/* ==========================================================
   11.04 CONTENT COLLECTOR
========================================================== */

function collect(payload = {}) {

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

        if (!html) {

            return;

        }

        blocks.push(

            `
            <div class="ctm-block">

                ${html}

            </div>
            `

        );

    });

    return blocks.join("");

}

/* ==========================================================
   11.05 VIEW MODEL BUILDER
========================================================== */

function buildViewModel(moment) {

    const payload =
        moment.payload || {};

    return {

        /* ------------------------------------------------------
           GENERAL
        ------------------------------------------------------- */

        step:
            payload.step || "",

        /* ------------------------------------------------------
           TITLES
        ------------------------------------------------------- */

        titleTa:
            language(
                payload.title,
                "ta"
            ),

        titleEn:
            language(
                payload.title,
                "en"
            ),

        /* ------------------------------------------------------
           SUB TITLES
        ------------------------------------------------------- */

        subtitleTa:
            language(
                payload.subtitle,
                "ta"
            ),

        subtitleEn:
            language(
                payload.subtitle,
                "en"
            ),

        /* ------------------------------------------------------
           MESSAGE COMPONENT
        ------------------------------------------------------- */

        message:
            collect(payload),

        /* ------------------------------------------------------
           QUESTION COMPONENT
        ------------------------------------------------------- */

        questionTa:
            language(
                payload.question,
                "ta"
            ),

        questionEn:
            language(
                payload.question,
                "en"
            ),

        /* ------------------------------------------------------
           INPUT COMPONENT
        ------------------------------------------------------- */

        labelTa:
            language(
                payload.label,
                "ta"
            ),

        labelEn:
            language(
                payload.label,
                "en"
            ),

        helperTa:
            language(
                payload.helper,
                "ta"
            ),

        helperEn:
            language(
                payload.helper,
                "en"
            ),

        placeholderTa:
            language(
                payload.placeholder,
                "ta"
            ),

        placeholderEn:
            language(
                payload.placeholder,
                "en"
            ),

        value:
            payload.value ?? "",

        /* ------------------------------------------------------
           CHOICE COMPONENT
        ------------------------------------------------------- */

        choices:
            payload.choices || [],

        /* ------------------------------------------------------
           BUTTONS
        ------------------------------------------------------- */

        button:

            bilingualBlock(
                payload.button
            ) ||

            bilingualBlock(
                payload.primaryButton
            ) ||

            bilingualBlock(
                payload.secondaryButton
            ) ||

            `
            <span class="ctm-button-ta">

                தொடரலாம்

            </span>

            <span class="ctm-button-en">

                Let's Continue

            </span>
            `,

        buttonTa:

            language(
                payload.button,
                "ta"
            ) ||

            language(
                payload.primaryButton,
                "ta"
            ) ||

            "தொடரலாம்",

        buttonEn:

            language(
                payload.button,
                "en"
            ) ||

            language(
                payload.primaryButton,
                "en"
            ) ||

            "Let's Continue"

    };

}

/* ==========================================================
   12. VALIDATION
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
   13. TRANSITIONS
========================================================== */

/* ----------------------------------------------------------
   13.01 FADE OUT
---------------------------------------------------------- */

async function fadeOut() {

    const app = root();

    app.classList.add(

        "ctm-fade-out"

    );

    await CTMUtils.wait(

        TRANSITION_MS

    );

}

/* ----------------------------------------------------------
   13.02 FADE IN
---------------------------------------------------------- */

async function fadeIn() {

    const app = root();

    app.classList.remove(

        "ctm-fade-out"

    );

    app.classList.add(

        "ctm-fade-in"

    );

    await CTMUtils.wait(

        TRANSITION_MS

    );

    app.classList.remove(

        "ctm-fade-in"

    );

}

/* ==========================================================
   14. COMPONENT RENDERER
========================================================== */

/* ----------------------------------------------------------
   14.01 RENDER COMPONENT
---------------------------------------------------------- */

async function renderComponent(

    componentName,

    data = {}

) {

    const view =

        await component(

            componentName

        );

    const html =

        template(

            view,

            data

        );

    state.currentHTML = html;

    root().innerHTML = html;

    state.currentComponent =

        componentName;

    return html;

}

/* ----------------------------------------------------------
   14.02 LOADING COMPONENT
---------------------------------------------------------- */

async function loading(data = {}) {

    return renderComponent(

        registry.loading,

        data

    );

}

/* ----------------------------------------------------------
   14.03 ERROR SCREEN
---------------------------------------------------------- */

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

/* ==========================================================
   15. MOMENT RENDERER
========================================================== */

/* ----------------------------------------------------------
   15.01 RENDER MOMENT
---------------------------------------------------------- */

async function renderMoment(moment) {

    validate(moment);

    if (!lock()) {

        return false;

    }

    beforeRender(moment);

    try {

        state.currentAct =

            moment.act ??

            CTMState.get(

                "currentAct"

            );

        state.currentMoment =

            moment.id;

        const viewModel =

            buildViewModel(

                moment

            );

        await fadeOut();

        await renderComponent(

            moment.component,

            viewModel

        );

        CTMState.set(

            "navigation.currentScene",

            {

                act:
                    state.currentAct,

                moment:
                    state.currentMoment,

                component:
                    moment.component

            }

        );

        CTMUtils.scrollTop(false);

        await fadeIn();

        afterRender(moment);

        return true;

    }

    catch (exception) {

        console.error(exception);

        error(

            exception.message

        );

        return false;

    }

    finally {

        unlock();

    }

}

/* ==========================================================
   16. CACHE MANAGEMENT
========================================================== */

/* ----------------------------------------------------------
   16.01 CLEAR CACHE
---------------------------------------------------------- */

function clearCache() {

    cache.components.clear();

}

/* ==========================================================
   17. STATE MANAGEMENT
========================================================== */

/* ----------------------------------------------------------
   17.01 CURRENT STATE
---------------------------------------------------------- */

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

/* ----------------------------------------------------------
   17.02 CLEAR RENDERER
---------------------------------------------------------- */

function clear() {

    root().innerHTML = "";

    state.currentHTML = "";

    state.currentMoment = null;

    state.currentComponent = null;

}

/* ----------------------------------------------------------
   17.03 DESTROY RENDERER
---------------------------------------------------------- */

function destroy() {

    clear();

    clearCache();

    state.initialized = false;

    state.rendering = false;

    state.currentAct = null;

    state.root = null;

}

/* ==========================================================
   18. PUBLIC API
========================================================== */

window.CTMRenderer = Object.freeze({

    /* ------------------------------------------------------
       Initialization
    ------------------------------------------------------ */

    initialize,

    root,

    /* ------------------------------------------------------
       Rendering
    ------------------------------------------------------ */

    loading,

    renderMoment,

    renderComponent,

    /* ------------------------------------------------------
       State
    ------------------------------------------------------ */

    current,

    /* ------------------------------------------------------
       Maintenance
    ------------------------------------------------------ */

    clear,

    clearCache,

    destroy,

    /* ------------------------------------------------------
       Error Handling
    ------------------------------------------------------ */

    error

});

/* ==========================================================
   END OF MODULE
========================================================== */

})();
   
