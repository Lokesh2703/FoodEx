var $ = jQuery;

$(document).on('click', '#dev-open-withdraw-req-box', function () {
    $('.restaurant-withdraw-box').slideToggle();
});

$(document).on('click', '#dev-send-withdraw-req', function () {
    "use strict";
    var returnType = foodbakery_validation_process(jQuery(".publisher-withdrawal-form"));
    if (returnType == false) {
        return false;
    }

    //foodbakery_show_loader('.loader-holder');

    var _this = $(this);
    var this_amount = $('#dev-publisher-withdraw-amount').val();
    var this_desc = $('#dev-publisher-withdraw-detail').val();
    var ajax_url = foodbakery_dashboard_strings.ajax_url;
    var plugin_url = foodbakery_dashboard_strings.plugin_url;
    var valid_amount = /^\d{0,6}(\.\d{0,2})?$/.test(this_amount);
    var this_loader = _this.next('span.loader-withdraw');

    if (this_amount <= 0) {
        var response_error = {
            type: 'error',
            msg: 'Amount should be greater than 0'
        };
        foodbakery_show_response(response_error);

    } else if (!valid_amount) {
        var response_error = {
            type: 'error',
            msg: foodbakery_dashboard_strings.valid_amount_error
        };
        foodbakery_show_response(response_error);
    } else if (this_amount != '' && valid_amount && this_amount > 0) {
        if (!_this.hasClass('is-disabled')) {

            //this_loader.html('<img src="' + plugin_url + 'assets/frontend/images/ajax-loader.gif" alt="">');
            var thisObj = jQuery('#dev-send-withdraw-req');
            foodbakery_show_loader('#dev-send-withdraw-req', '', 'button_loader', thisObj);
            _this.addClass('is-disabled');
            $.ajax({
                url: ajax_url,
                method: "POST",
                data: {
                    withdraw_amount: this_amount,
                    withdraw_desc: this_desc,
                    action: 'restaurant_withdrawal_request_send'
                },
                dataType: "json"
            }).done(function (response) {
                foodbakery_show_response(response, '', thisObj, '#foodbakery_publisher_withdrawals');
                //foodbakery_show_response(response, '','','#foodbakery_publisher_withdrawals');

                this_loader.html('');
                $('#dev-publisher-withdraw-amount').val('');
                $('#dev-publisher-withdraw-detail').val('');
                _this.removeClass('is-disabled');
            }).fail(function () {
                this_loader.html('');
                _this.removeClass('is-disabled');
            });
        }
    }
});

jQuery(document).on("click", ".send-invitation", function (e) {
    e.preventDefault();
    jQuery(".invited_team_member").addClass("active");
    jQuery('body').append('<div id="overlay" style="display:none;"></div>');
    jQuery('#overlay').fadeIn(300);
});
jQuery(document).on("click", ".user-profile .invited_team_member .cancel", function (e) {
    e.preventDefault();
    jQuery(".invited_team_member").removeClass("active");

    jQuery('#overlay').fadeOut(300);
    setTimeout(function () {
        jQuery('#overlay').remove();
    }, 400);
});
$(document).on("click", "#overlay", function () {
    $(this).closest("#overlay").remove();
    $('.invite-member').removeClass('active');
});

jQuery(document).on("click", ".add_team_member", function (e) {
    e.preventDefault();
    jQuery(".add-member").addClass("active");
    jQuery('body').append('<div id="overlay" style="display:none"></div>');
    jQuery('#overlay').fadeIn(300);
});
jQuery(document).on("click", ".user-profile .add-member .cancel", function (e) {
    e.preventDefault();
    jQuery(".add-member").removeClass("active");

    jQuery('#overlay').fadeOut(300);
    setTimeout(function () {
        jQuery('#overlay').remove();
    }, 400);
});