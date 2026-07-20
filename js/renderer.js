
/**
 * ==========================================================
 * CTM PATH™ Guided Journey v3.0
 * File: js/renderer.js
 * Batch: 1 of 2
 * Responsibility:
 * Presentation Engine
 * Renders the cinematic Guided Journey.
 * ==========================================================
 */

(() => {

"use strict";

/* ==========================================================
   CONSTANTS
========================================================== */

const ROOT_SELECTOR = "#app";

const TRANSITION_DURATION = 450;

/* ==========================================================
   INTERNAL STATE
========================================================== */

const state = {

    root: null,

    currentHTML: "",

    currentMoment: null,

    currentAct: null,

    currentComponent: null,

    rendering: false,

    initialized: false

};

/* ==========================================================
   COMPONENT CACHE
========================================================== */

const cache = {

    components: new Map()

};

/* ==========================================================
   ROOT
========================================================== */

function root() {

    if (state.root) return state.root;

    state.root = document.querySelector(ROOT_SELECTOR);

    if (!state.root) {

        throw new Error(
            `Renderer: ${ROOT_SELECTOR} not found.`
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
   RENDER LOCK
========================================================== */

function beginRender() {

    if (state.rendering) {

        return false;

    }

    state.rendering = true;

    return true;

}

function endRender() {

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
   PERSONALIZATION
========================================================== */

function personalize(html) {

    return CTMPersonalization.personalizeHTML(
        html
    );

}

/* ==========================================================
   TRANSITIONS
========================================================== */

async function fadeOut() {

    const app = root();

    app.classList.add("ctm-fade-out");

    await CTMUtils.wait(
        TRANSITION_DURATION
    );

}

async function fadeIn() {

    const app = root();

    app.classList.remove("ctm-fade-out");

    app.classList.add("ctm-fade-in");

    await CTMUtils.wait(
        TRANSITION_DURATION
    );

    app.classList.remove("ctm-fade-in");

}

/* ==========================================================
   HTML
========================================================== */

function html(content) {

    state.currentHTML = content;

    root().innerHTML = content;

}

/* ==========================================================
   LOADING SCREEN
========================================================== */

async function loading() {

    const view =
        await component("loading");

    html(view);

}

/* ==========================================================
   MESSAGE
========================================================== */

async function message(data) {

    let view =
        await component("message");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

/* ==========================================================
   QUESTION
========================================================== */

async function question(data) {

    let view =
        await component("question");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

/* ==========================================================
   CHOICE
========================================================== */

async function choice(data) {

    let view =
        await component("choice");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

/* ==========================================================
   INPUT
========================================================== */

async function input(data) {

    let view =
        await component("input");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

/* ==========================================================
   REFLECTION
========================================================== */

async function reflection(data) {

    let view =
        await component("reflection");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

 /* ==========================================================
   INSIGHT
========================================================== */

async function insight(data) {

    let view =
        await component("insight");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

/* ==========================================================
   BOOKING
========================================================== */

async function booking(data) {

    let view =
        await component("booking");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

/* ==========================================================
   COMPLETE
========================================================== */

async function complete(data) {

    let view =
        await component("complete");

    view = personalize(view);

    Object.entries(data).forEach(
        ([key, value]) => {

            view = view.replaceAll(
                `{{${key}}}`,
                value ?? ""
            );

        }
    );

    html(view);

}

/* ==========================================================
   MOMENT RENDERER
========================================================== */

async function moment(moment) {

    if (!beginRender()) {

        return;

    }

    try {

        state.currentMoment = moment.id;
        state.currentAct = moment.act || CTMState.get("currentAct");
        state.currentComponent = moment.component;

        await fadeOut();

        switch (moment.component) {

            case "message":
                await message(moment);
                break;

            case "question":
                await question(moment);
                break;

            case "choice":
                await choice(moment);
                break;

            case "input":
                await input(moment);
                break;

            case "reflection":
                await reflection(moment);
                break;

            case "insight":
                await insight(moment);
                break;

            case "booking":
                await booking(moment);
                break;

            case "complete":
                await complete(moment);
                break;

            default:
                throw new Error(
                    `Unknown component: ${moment.component}`
                );

        }

        CTMState.set(
            "navigation.currentScene",
            {
                act: state.currentAct,
                moment: state.currentMoment,
                component: state.currentComponent
            }
        );

        CTMUtils.scrollTop(false);

        await fadeIn();

    }
    finally {

        endRender();

    }

}

/* ==========================================================
   ERROR SCREEN
========================================================== */

function error(messageText) {

    root().innerHTML = `
        <section class="ctm-error">
            <h2>Something went wrong</h2>
            <p>${CTMUtils.escapeHTML(messageText)}</p>
        </section>
    `;

}

/* ==========================================================
   CLEAR
========================================================== */

function clear() {

    root().innerHTML = "";

    state.currentHTML = "";

}

/* ==========================================================
   CACHE
========================================================== */

function clearCache() {

    cache.components.clear();

}

/* ==========================================================
   STATE
========================================================== */

function current() {

    return {

        act: state.currentAct,

        moment: state.currentMoment,

        component: state.currentComponent,

        rendering: state.rendering,

        initialized: state.initialized

    };

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.CTMRenderer = Object.freeze({

    initialize,

    root,

    loading,

    message,

    question,

    choice,

    input,

    reflection,

    insight,

    booking,

    complete,

    moment,

    clear,

    clearCache,

    current,

    error

});

})();

