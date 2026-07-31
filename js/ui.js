
/* ==========================================================
   CTM PATH™ Guided Journey™
   Version : 1.0
   File    : ui.js
   Purpose : User Interface Manager
   ========================================================== */

'use strict';

/* ==========================================================
   UI MANAGER
   ========================================================== */

const UI = {

    /* ======================================================
       LOAD HTML COMPONENT
       ====================================================== */

    async loadComponent(file, containerId) {

        try {

            const response = await fetch(file);

            if (!response.ok) {

                throw new Error(
                    `Unable to load ${file}`
                );

            }

            const html = await response.text();

            const container =
                document.getElementById(containerId);

            if (container) {

                container.innerHTML = html;

            }

        }

        catch (error) {

            console.error(error);

        }

    },

    /* ======================================================
       PAGE RENDER
       ====================================================== */

    async renderPage(pageFile) {

        try {

            const response = await fetch(pageFile);

            if (!response.ok) {

                throw new Error(
                    `Unable to load ${pageFile}`
                );

            }

            const html = await response.text();

            const app =
                document.getElementById('app');

            app.innerHTML = html;

            window.scrollTo({

                top: 0,

                behavior: 'smooth'

            });

        }

        catch (error) {

            this.showToast({

                type: 'error',

                title: 'Page Error',

                message:
                    'Unable to load page.'

            });

        }

    },

    /* ======================================================
       LOADER
       ====================================================== */

    showLoader() {

        const loader =
            document.getElementById(
                'loader-container'
            );

        if (!loader) return;

        loader.classList.remove('hidden');

    },

    hideLoader() {

        const loader =
            document.getElementById(
                'loader-container'
            );

        if (!loader) return;

        loader.classList.add('hidden');

    },

    /* ======================================================
       TOAST
       ====================================================== */

    showToast({

        type = 'info',

        title = '',

        message = ''

    }) {

        const toast =
            document.getElementById(
                'toast-container'
            );

        if (!toast) return;

        toast.innerHTML = `

            <div class="toast ${type}">

                <strong>${title}</strong>

                <div>${message}</div>

            </div>

        `;

        toast.classList.remove('hidden');

        setTimeout(() => {

            toast.classList.add('hidden');

        }, 3500);

    },

    /* ======================================================
       MODAL
       ====================================================== */

    openModal(html) {

        const modal =
            document.getElementById(
                'modal-container'
            );

        if (!modal) return;

        modal.innerHTML = html;

        modal.classList.remove('hidden');

    },

    closeModal() {

        const modal =
            document.getElementById(
                'modal-container'
            );

        if (!modal) return;

        modal.classList.add('hidden');

        modal.innerHTML = '';

    },

    /* ======================================================
       ENABLE BUTTON
       ====================================================== */

    enableButton(id) {

        const button =
            document.getElementById(id);

        if (!button) return;

        button.disabled = false;

    },

    /* ======================================================
       DISABLE BUTTON
       ====================================================== */

    disableButton(id) {

        const button =
            document.getElementById(id);

        if (!button) return;

        button.disabled = true;

    },

    /* ======================================================
       SET HTML
       ====================================================== */

    setHTML(id, html) {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.innerHTML = html;

    },

    /* ======================================================
       SET TEXT
       ====================================================== */

    setText(id, text) {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.textContent = text;

    },

    /* ======================================================
       SHOW
       ====================================================== */

    show(id) {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.classList.remove('hidden');

    },

    /* ======================================================
       HIDE
       ====================================================== */

    hide(id) {

        const element =
            document.getElementById(id);

        if (!element) return;

        element.classList.add('hidden');

    }

};

