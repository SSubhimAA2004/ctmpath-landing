
/*
======================================================================

CTM PATH™ Guided Journey v6.0

Purpose
Discovery Session Booking

Responsibility
• Booking State Management
• Date Selection
• Time Selection
• Booking Validation
• Booking Confirmation
• Booking Summary
• Booking Reset

======================================================================
*/

'use strict';

(() => {

    const CTM = window.CTM;

    if (!CTM) {

        console.error('CTM core has not been initialized.');

        return;

    }

    /*==================================================
    Booking State
    ==================================================*/

    CTM.state.booking = CTM.state.booking || {

        date: '',

        time: '',

        confirmed: false,

        completed: false,

        timestamp: ''

    };

    /*==================================================
    Set Date
    ==================================================*/

    CTM.setBookingDate = function (date) {

        CTM.state.booking.date = date;

        CTM.updateBookingSummary();

        CTM.saveBooking();

    };

    /*==================================================
    Set Time
    ==================================================*/

    CTM.setBookingTime = function (time) {

        CTM.state.booking.time = time;

        CTM.updateBookingSummary();

        CTM.saveBooking();

    };

    /*==================================================
    Get Booking
    ==================================================*/

    CTM.getBooking = function () {

        return CTM.state.booking;

    };

    /*==================================================
    Booking Complete?
    ==================================================*/

    CTM.isBookingComplete = function () {

        return (

            CTM.state.booking.date !== '' &&

            CTM.state.booking.time !== ''

        );

    };

    /*==================================================
    Confirm Booking
    ==================================================*/

    CTM.confirmBooking = function () {

        if (!CTM.isBookingComplete()) {

            console.warn(

                'Booking information incomplete.'

            );

            return false;

        }

        CTM.state.booking.confirmed = true;

        CTM.state.booking.completed = true;

        CTM.state.booking.timestamp =

            new Date().toISOString();

        CTM.saveBooking();

        CTM.log('Booking confirmed.');

        return true;

    };

    /*==================================================
    Save Booking
    ==================================================*/

    CTM.saveBooking = function () {

        if (

            typeof CTM.saveState === 'function'

        ) {

            CTM.saveState();

        }

    };

    /*==================================================
    Reset Booking
    ==================================================*/

    CTM.resetBooking = function () {

        CTM.state.booking = {

            date: '',

            time: '',

            confirmed: false,

            completed: false,

            timestamp: ''

        };

        CTM.saveBooking();

    };

    /*==================================================
    Booking Summary
    ==================================================*/

    CTM.getBookingSummary = function () {

        return {

            date:

                CTM.state.booking.date,

            time:

                CTM.state.booking.time,

            confirmed:

                CTM.state.booking.confirmed,

            completed:

                CTM.state.booking.completed

        };

    };

    /*==================================================
    Update Summary UI
    ==================================================*/

    CTM.updateBookingSummary = function () {

        const date =

            document.querySelector(

                '[data-booking-date]'

            );

        if (date) {

            date.textContent =

                CTM.state.booking.date || '-';

        }

        const time =

            document.querySelector(

                '[data-booking-time]'

            );

        if (time) {

            time.textContent =

                CTM.state.booking.time || '-';

        }

    };

    /*==================================================
    Select Date
    ==================================================*/

    CTM.selectBookingDate = function (element) {

        if (!element) {

            return;

        }

        document

            .querySelectorAll('.booking-date')

            .forEach(function (card) {

                card.classList.remove(

                    'selected'

                );

            });

        element.classList.add('selected');

        CTM.setBookingDate(

            element.dataset.date || ''

        );

    };

    /*==================================================
    Select Time
    ==================================================*/

    CTM.selectBookingTime = function (element) {

        if (!element) {

            return;

        }

        document

            .querySelectorAll('.booking-slot')

            .forEach(function (card) {

                card.classList.remove(

                    'selected'

                );

            });

        element.classList.add('selected');

        CTM.setBookingTime(

            element.dataset.time || ''

        );

    };

    /*==================================================
    Restore Booking
    ==================================================*/

    CTM.restoreBooking = function () {

        document

            .querySelectorAll('.booking-date')

            .forEach(function (card) {

                if (

                    card.dataset.date ===

                    CTM.state.booking.date

                ) {

                    card.classList.add(

                        'selected'

                    );

                }

            });

        document

            .querySelectorAll('.booking-slot')

            .forEach(function (card) {

                if (

                    card.dataset.time ===

                    CTM.state.booking.time

                ) {

                    card.classList.add(

                        'selected'

                    );

                }

            });

        CTM.updateBookingSummary();

    };

})();
