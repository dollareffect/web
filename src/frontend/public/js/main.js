"use strict";

import '../../scss/main.scss';

$(document).ready(function () {    
    var BASE_URL = "https://dollar-effect.appspot.com/api/v1";
    // var BASE_URL = "http://localhost:8080/api/v1";

    function btnLoadState($btn, text) {
        if (!text) text = "Saving...";
        $btn
            .data("text", $btn.text())
            .attr("disabled", "disabled")
            .text(text);
    }

    function btnReadyState($btn) {
        var text = $btn.data("text") || "SAVE";
        $btn
            .removeAttr("disabled")
            .text(text);
    }

    function showErrorMessage(message, formSelector) {
        if (!formSelector) formSelector = ".form-contact";
        var $alert = $(formSelector).find(".js-error-message");

        $alert.text(message);
        $alert.removeClass("hidden");
    }

    function resetErrorFields(formSelector) {
        if (!formSelector) formSelector = ".form-contact";
        var $alert = $(formSelector).find(".js-error-message");

        $alert.addClass("hidden");
        $(formSelector).find(".error").removeClass("error");
    }

    function isEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    $(".form-contact").on("submit", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $btnSubmit = $form.find("button[type='submit']");
        var requiredFields = ["org_name", "full_name", "email", "country_code", "phone"];

        btnLoadState($btnSubmit);
        resetErrorFields();

        var data = $form.serializeArray();
        var formData = {};
        var emptyRequiredFields = [];
        var emailFailedFlag = false;
        data.forEach(function (item) {
            if (item.name == "email" && !isEmail(item.value)) {
                emailFailedFlag = true;
            }

            if (requiredFields.indexOf(item.name) != -1 && !item.value)
                emptyRequiredFields.push(item.name);

            formData[item.name] = item.value;
        });

        // now
        formData["now"] = moment().format("MM/DD/YYYY");

        // check for empty required fields
        if (emptyRequiredFields.length) {
            emptyRequiredFields.forEach(function (name, idx) {
                $("[name='" + name + "']").addClass("error");
            });

            $form.find(".error").first().focus();
            btnReadyState($btnSubmit);
            showErrorMessage("Oops! You missed some required fields.");
            return false;
        }

        if (emailFailedFlag) {
            $form.find("[name='email']").addClass("error").focus();
            btnReadyState($btnSubmit);
            showErrorMessage("Oops! Please input valid email address.");
            return false;
        }
        

        $.post(BASE_URL + "/contact", formData, function (response) {
            if(response.status == 200) {
                $form.trigger("reset");
                
                $('#modalContact').one('hidden.bs.modal', function (e) {
                    $("#modalConfirm").modal("show");
                });

                $("#modalContact").modal("hide");
                
            }
        }).always(function () {
            btnReadyState($btnSubmit);
        });
    });


    $(".form-donate").on("submit", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $btnSubmit = $form.find("button[type='submit']");
        var $email = $form.find("[name='notif_email']");
        var email = $email.val();
        
        btnLoadState($btnSubmit, "Subscribing...");
        resetErrorFields(".form-donate");

        if(!isEmail(email)) {
            $email.addClass("error").focus();
            showErrorMessage("Oops! Please input valid email address.", ".form-donate");
            btnReadyState($btnSubmit);
            return
        }


        $.post(BASE_URL + "/subscribe", {
            email: email,
            now: moment().format("MM/DD/YYYY")
        }, function (response) {
            if (response.status == 200) {
                $form.trigger("reset");

                $('#modalDonate').one('hidden.bs.modal', function (e) {
                    $("#modalDonationConfirm").modal("show");
                });

                $("#modalDonate").modal("hide");
            }
        }).always(function () {
            btnReadyState($btnSubmit);
        });
        
    });

    $("#linkFBShare").on("click", function (e) {
        e.preventDefault();
        var _href = $(this).attr('href') + encodeURIComponent("http://thedollareffect.com/org/glory-reborn/");
        window.open(_href, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        return false;
    });

    $("#btnLearnMore").on("click", function () {
        $('html, body').animate({
            scrollTop: $("#works").offset().top + 20
        }, 1000);
    });

    // modal events
    $("#modalDonate").on("shown.bs.modal", function () {
        $(this).find(".form-control").focus();
    });
    $("#modalVideo").on("shown.bs.modal", playVideo);
    $("#modalVideo").on("hidden.bs.modal", pauseVideo);
});