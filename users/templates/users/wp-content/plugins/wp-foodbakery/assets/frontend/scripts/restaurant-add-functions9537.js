var $ = jQuery;

(function ($) {
    $.fn.foodbakery_req_loop = function (callback, thisArg) {
        var me = this;
        return this.each(function (index, element) {
            return callback.call(thisArg || element, element, index, me);
        });
    };
})(jQuery);

$(document).ready(function ($, e) {
    if ($(".selectpicker").length != '') {
        $('.selectpicker').selectpicker({
            size: 5
        });
    }

    if ($("#btn-next-restaurant-information").length > 0) {
        var tab = getParameterByName('tab');
        if (tab !== null) {
            change_tab('activation', e);
        } else {
            change_tab('restaurant-information', e);
        }
    }

    var _this = $("input[name='foodbakery_restaurant_package']:checked");
    if (_this.length > 0) {
        var _this_id = _this.val();
        var package_detail_sec = $('#package-detail-' + _this_id);
        var package_btn = $('#package-' + _this_id);
        $('.all-pckgs-sec').find('.foodbakery-pkg-header').removeAttr('style');

        package_btn.prop('checked', true);
        package_detail_sec.slideUp(400, function () {
            _this.parents('.foodbakery-pkg-holder').find('.foodbakery-pkg-header').css({'background-color': '#f6f6f6'});
        });
    }
});

// Used by Register and Add restaurant shortcode.
function add_event_listners(strings, $) {
    $("select").trigger("chosen:updated");

    $("#btn-next-restaurant-information").click(function (e) {
        var is_form_valid = validate_register_add_restaurant_form($(this).parents('form'));

        if (is_form_valid) {
            if (strings.is_restaurant_posting_free == "on") {
                process_form_add_restaurant_and_register_user(strings, false);
            } else {
                change_tab('package', e);
            }
        }
        return false;
    });

    $("#btn-next-package").click(function (e) {
        e.stopPropagation();
        // var that = this;
        // var old_value = $(that).val();
        var form_id = $(this).closest("form").attr('id');
        var dataArray = $('#' + form_id).serializeArray();
        var result = {};
        $.each($('#' + form_id).serializeArray(), function () {
            result[this.name] = this.value;
        });
        var foodbakery_restaurant_package_id = +result.foodbakery_restaurant_package;
        var pkg_type = $('input[name=' + foodbakery_restaurant_package_id + ']').val();
        if (pkg_type == 'free') {
            $(".payment-section").hide();
            $(".element-title").hide();
             $('#' + form_id).append('<input type="hidden" name="pkg_type" value="' + pkg_type + '">');
        } else {
            $(".payment-section").show();
            $(".element-title").show();
        }
        if ($("input[name='foodbakery_restaurant_package']:checked").length > 0 || strings.is_restaurant_posting_free == "on") {

            change_tab('payment-information', e);
        } else {
            var response = {
                type: 'error',
                msg: strings.package_required_error
            };
            foodbakery_show_response(response);
            //alert(strings.package_required_error);
        }
        return false;
    });
    $(".foodbakery-dev-payment-form input[type='submit']").prop("disabled", false);
    $(".foodbakery-dev-payment-form").submit(function (e) {
        e.stopPropagation();
        var returnType = foodbakery_validation_process(jQuery(".foodbakery-dev-payment-form"));
        if (returnType == false) {
            return false;
        }
        process_form_add_restaurant_and_register_user(strings, true);

        return false;
    });

    function process_form_add_restaurant_and_register_user(strings, package_verification) {
        var form_elem = $(".foodbakery-dev-payment-form");
        var that = $("button[type='submit']", form_elem);
        if (that.length < 1) {
            that = $("input[type='submit']:last", form_elem);
        }

        var old_value = $(that).html();
        //$(that).html(strings.processing_request);
        var thisObj = jQuery('#register-restaurant-order');
        foodbakery_show_loader('#register-restaurant-order', '', 'button_loader', thisObj);
        $(that).prop('disabled', true);

        var data = $("form.foodbakery-dev-restaurant-form").serialize();

        $.ajax({
            'url': foodbakery_restaurant_strings.ajax_url,
            'method': "POST",
            'data': data,
            'dataType': "json"
        }).done(function (response) {
            if (response.status == true) {
                if (package_verification == true) {
                    $("input[name='trans_id']").val(response.msg);
                    var page_location = window.location + "";
                    if (page_location.indexOf('?') > -1) {
                        page_location += '&tab=activation';
                    } else {
                        page_location += '?tab=activation';
                    }
                    $("input[name='trans_id']").parent().append('<input type="hidden" name="transaction_return_url" value="' + page_location + '">');
                    process_payment_form(old_value, that, form_elem);
                } else {
                    console.log('activation');
                    change_tab('activation', undefined);
                }
                foodbakery_show_response('', '', thisObj);
            } else {
                if (typeof response.msg != "undefined") {
                    alert(response.msg);
                    return false;
                }
                //$(that).html(old_value);
                foodbakery_show_response('', '', thisObj);
                $(that).prop('disabled', false);
            }
        }).fail(function () {
            return false;
        });

        function process_payment_form(old_value, that, form_elem) {
            var data = $(form_elem).serialize() + "&action=foodbakery_payment_gateways_package_selected";
            $.ajax({
                'url': foodbakery_restaurant_strings.ajax_url,
                'method': "POST",
                'data': data,
                'dataType': "json"
            }).done(function (response) {

                if (response.status == true) {
                    if (typeof response.payment_gateway != "undefined") {
                        if (response.payment_gateway == "FOODBAKERY_PRE_BANK_TRANSFER") {
                            $(".reservation-form").html(response.msg);
                        } else {
                            $(".reservation-form").hide();
                            $(".payment-process-form-container").html(response.msg).find("form").submit();
                        }
                    }
                } else {
                    if (typeof response.msg != "undefined") {
                        //alert(response.msg);
                        var page_location = window.location + "";
                        page_location += '?tab=activation';
                        change_tab('activation', undefined);

                    }
                    $(that).html(old_value);
                    $(that).prop('disabled', false);
                }
            }).fail(function () {
                $(that).html(old_value);
                $(that).prop('disabled', false);
            });
        }
    }

    $("#btn-back-package").click(function (e) {
        e.stopPropagation();
        change_tab('restaurant-information', e);
        return false;
    });

    $("#btn-back-payment-information").click(function (e) {
        e.stopPropagation();
        change_tab('package', e);
        return false;
    });
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

$(document).on('click', '.restaurant-settings-nav > li.cond-restaurant-settings', function (e) {
    change_tab($(this).data('act'), e);
});

var first_time = true;
function change_tab(tab_id, e) {
    if (typeof e != "undefined") {
        e.stopPropagation();
    }

    var change_tab_head = true;
    var this_li = $('.restaurant-settings-nav > li a[data-act="' + tab_id + '"]');

    // Used by Register and Add restaurant shortcode.
    if (this_li.hasClass('cond-restaurant-settings1')) {
        var change_tab = true;
        var tab_container = this_li.data('act');
        var active_tab_container = $('.restaurant-settings-nav > li.active a').data('act');
        if (active_tab_container == 'restaurant-information') {
            if (!first_time) {
                change_tab = validate_register_add_restaurant_form($(this).parents('form'));
            } else {
                change_tab = true;
            }
        } else if (active_tab_container == 'restaurant-information') {
            change_tab = ($("input[name='foodbakery_restaurant_package']:checked").length > 0);
        }

        if ((active_tab_container == tab_container) || change_tab) {
            $("#restaurant-sets-holder ul.register-add-restaurant-tab-container").hide();
            $("." + tab_container + "-tab-container", $("#restaurant-sets-holder")).show();
        } else {
            change_tab_head = false;
        }
    }

    if (change_tab_head) {
        if ($(this_li).hasClass('cond-restaurant-settings1')) {
            $('html,body').animate({scrollTop: 0}, 1000);
        }

        if (!first_time || this_li.parent('li').hasClass('cond-restaurant-settings')) {
            //var this_target = this_li.data('target');
            $('.restaurant-settings-nav > li').removeClass('processing');
            if (tab_id == "restaurant-information") {
                $('.restaurant-settings-nav > li[data-act="package"], .restaurant-settings-nav > li[data-act="payment-information"], .restaurant-settings-nav > li[data-act="activation"]').removeClass('active');
            } else if (tab_id == "package") {
                $('.restaurant-settings-nav > li[data-act="payment-information"], .restaurant-settings-nav > li[data-act="activation"]').removeClass('active');
            } else if (tab_id == "payment-information") {
                $('.restaurant-settings-nav > li[data-act="activation"]').removeClass('active');
            } else if (tab_id == "settings") {
                $('.restaurant-settings-nav > li[data-act="location"], .restaurant-settings-nav > li[data-act="openclose"]').removeClass('active');
            } else if (tab_id == "location") {
                $('.restaurant-settings-nav > li[data-act="openclose"]').removeClass('active');
            } else if (tab_id == "openclose") {
                $('.restaurant-settings-nav > li[data-act="settings"], .restaurant-settings-nav > li[data-act="location"]').addClass('active');
            } else if (tab_id == "activation") {
                $('.restaurant-settings-nav > li[data-act="restaurant-information"], .restaurant-settings-nav > li[data-act="package"], .restaurant-settings-nav > li[data-act="payment-information"]').addClass('active');
            }

            this_li.parent('li').addClass('active processing');
        }
    }

    if (first_time) {
        first_time = false;
    }
}

$(document).on('click', '.cond-restaurant-settings', function () {
    "use strict";

    var _this = $(this);
    var _this_act = _this.data('act');
    var _main_counter = _this.parents('ul').data('mcounter');
    var restaurant_id = _this.parents('ul').data('restaurant');
    var ajax_url = foodbakery_restaurant_strings.ajax_url;

    if (typeof _this_act !== 'undefined' && _this_act != '') {

        var this_action = 'restaurant_show_set_' + _this_act;
        foodbakery_show_loader('.loader-holder');
        $.ajax({
            url: ajax_url,
            method: "POST",
            data: {
                set_type: _this_act,
                _main_counter: _main_counter,
                restaurant_id: restaurant_id,
                action: this_action
            },
            dataType: "json"
        }).done(function (response) {
            $('#restaurant-sets-holder').html(response.html);
            chosen_selectionbox();
            var data_vals = 'tab=add-restaurant&restaurant_id=' + restaurant_id + '&restaurant_tab=' + _this_act;
            var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals;
            window.history.pushState(null, null, decodeURIComponent(current_url));
            foodbakery_hide_loader();
        }).fail(function () {
            foodbakery_hide_loader();
        });
    }
});

$(document).on('submit', 'form.foodbakery-dev-payment-form', function () {
    var returnType = foodbakery_validation_process(jQuery(".foodbakery-dev-payment-form"));
    if (returnType == false) {
        return false;
    }
    return validate_register_add_restaurant_form(this);
});

$(document).on('submit', 'form.foodbakery-dev-restaurant-form', function () {
    var returnType = foodbakery_validation_process(jQuery(".foodbakery-dev-restaurant-form"));

    if (returnType == false) {
        return false;
    } else {
        var thisObj = jQuery('#update-restaurant-holder');
        foodbakery_show_loader('#update-restaurant-holder', '', 'button_loader', thisObj);
    }
    return validate_register_add_restaurant_form(this);
});


function validate_register_add_restaurant_form(that) {

    var req_class = 'foodbakery-dev-req-field',
            _this_form = $(that),
            _this_id = $(that).data('id'),
            form_validity = 'valid';
    var is_already_animated = false;
    var animate_to = '';
    _this_form.find('.' + req_class).foodbakery_req_loop(function (element, index, set) {
        if ($(element).attr('id') == 'terms-' + _this_id) {
            if ($(element).is(':checked')) {
                $(element).next('label').css({"color": "#484848"});
            } else {
                $(element).next('label').css({"color": "#ff0000"});
                form_validity = 'invalid';
            }
        } else {
            if ($(element).is('select')) {
                if ($("option:selected", $(element)).attr('value') != '') {
                    $(element).next('.chosen-container').css({"border": "1px solid #eceef4"});
                } else if ($("option:selected", $(element)).attr('value') == '') {
                    form_validity = 'invalid';
                    $(element).next('.chosen-container').css({"border": "1px solid #ff0000"});
                    animate_to = $(element).parent().parent();
                }
            } else {
                if ($(element).val() != '') {
                    $(element).css({"border": "1px solid #eceef4"});
                    $(element).parent().parent().parent().css({"border": "none"});
                } else if ($(element).val() == '') {
                    form_validity = 'invalid';
                    if ($(element).hasClass('foodbakery_editor')) {
                        $(element).parent().parent().parent().css({"border": "1px solid #ff0000"});
                        animate_to = $(element).parent().parent().parent();
                    } else {
                        $(element).css({"border": "1px solid #ff0000"});
                        animate_to = $(element);

                    }
                }
            }
            if (!is_already_animated) {
                if (animate_to != '') {
                    $('html, body').animate({scrollTop: $(animate_to).offset().top - 100}, 1000);
                    is_already_animated = true;
                }
            }
        }
        if ($(element).hasClass('usererror')) {
            form_validity = 'invalid';
            $(element).css({"border": "1px solid #ff0000"});
        }
    });

    if (form_validity == 'valid') {
        return true;
    } else {
        return false;
    }
}

$(document).on('change', '.foodbakery-dev-username, .foodbakery-dev-user-email', function () {
    "use strict";
    var checkig_user,
            _this_ = $(this),
            _this_id = $(this).data('id'),
            _this_type = $(this).data('type'),
            _this_val = $(this).val(),
            ajax_url = $("#foodbakery-dev-posting-main-" + _this_id).data('ajax-url'),
            _plugin_url = $("#foodbakery-dev-posting-main-" + _this_id).data('plugin-url'),
            color,
            this_loader;

    if (_this_type == 'username') {
        this_loader = $('#foodbakery-dev-main-con-' + _this_id).find('.foodbakery-dev-username-check');
    } else {
        this_loader = $('#foodbakery-dev-main-con-' + _this_id).find('.foodbakery-dev-useremail-check');
    }

    this_loader.html('<div class="loader-holder" style="width:18px;"><img src="' + _plugin_url + 'assets/frontend/images/ajax-loader.gif" alt=""></div>');
    checkig_user = $.ajax({
        url: foodbakery_globals.ajax_url,
        method: "POST",
        data: {
            field_type: _this_type,
            field_val: _this_val,
            restaurant_add_counter: _this_id,
            action: 'foodbakery_restaurant_user_authentication'
        },
        dataType: "json"
    }).done(function (response) {
        if (typeof response.action !== 'undefined' && response.action == 'true') {
            color = 'green';
            _this_.css({"border": "1px solid #cccccc"});
            _this_.removeClass('usererror');
            _this_.addClass('user-success');
            _this_.removeClass('frontend-field-error');

        } else {
            color = 'red';
            _this_.css({"border": "1px solid #ff0000"});
            _this_.addClass('usererror');
        }
        if (typeof response.msg !== 'undefined' && response.msg != '') {
            this_loader.html('<em style="color:' + color + ';">' + response.msg + '</em>');
        } else {
            this_loader.html('<em style="color:' + color + ';">' + foodbakery_restaurant_strings.action_error + '</em>');
        }
    }).fail(function () {
        this_loader.html(foodbakery_restaurant_strings.action_error);
    });
});

$(document).on('change', '.foodbakery-dev-select-type', function () {
    "use strict";
    var selecting_type,
            _this_id = $(this).data('id'),
            _this_val = $(this).val(),
            _this_form = $("#foodbakery-dev-restaurant-form-" + _this_id),
            ajax_url = $("#foodbakery-dev-posting-main-" + _this_id).data('ajax-url'),
            _plugin_url = $("#foodbakery-dev-posting-main-" + _this_id).data('plugin-url'),
            cf_append = $('#foodbakery-dev-cf-con-' + _this_id),
            main_append = $('#foodbakery-dev-main-con-' + _this_id),
            after_append = $('#foodbakery-dev-main-con-' + _this_id).find('#foodbakery-type-sec-' + _this_id),
            this_loader = $('#foodbakery-dev-loader-' + _this_id);
    this_loader.html('<div class="loader-holder"><img src="' + _plugin_url + 'assets/frontend/images/ajax-loader.gif" alt=""></div>');
    selecting_type = $.ajax({
        url: ajax_url,
        method: "POST",
        data: 'select_type=' + _this_val + '&restaurant_add_counter=' + _this_id + '&action=foodbakery_restaurant_load_cf&' + _this_form.serialize(),
        dataType: "json"
    }).done(function (response) {
        if (typeof response.cf_html !== 'undefined') {
            cf_append.html(response.cf_html);
        }
        if (typeof response.main_html !== 'undefined') {
            main_append.find('li.foodbakery-dev-appended').remove();
            after_append.after(response.main_html);
        }
        this_loader.html('');
    }).fail(function () {
        this_loader.html('');
    });
});

$(document).on('click', '.foodbakery-dev-insert-off-days .foodbakery-dev-calendar-days .day a', function () {
    "use strict";
    var adding_off_day,
            _this_ = $(this),
            _this_id = $(this).parents('.foodbakery-dev-insert-off-days').data('id'),
            ajax_url = $("#foodbakery-dev-posting-main-" + _this_id).data('ajax-url'),
            _plugin_url = $("#foodbakery-dev-posting-main-" + _this_id).data('plugin-url'),
            _day = $(this).data('day'),
            _month = $(this).data('month'),
            _year = $(this).data('year'),
            _adding_date = _year + '-' + _month + '-' + _day,
            _add_date = true,
            _this_append = $('#foodbakery-dev-add-off-day-app-' + _this_id),
            no_off_day_msg = _this_append.find('#no-book-day-' + _this_id),
            this_loader = $('#dev-off-day-loader-' + _this_id),
            this_act_msg = $('#foodbakery-dev-act-msg-' + _this_id);

    _this_append.find('li').each(function () {
        var date_field = $(this).find('input[name^="foodbakery_restaurant_off_days"]');
        if (_adding_date == date_field.val()) {
            alert(foodbakery_restaurant_strings.off_day_added);
            _add_date = false;
        }
    });
    if (typeof _day !== 'undefined' && typeof _month !== 'undefined' && typeof _year !== 'undefined' && _add_date === true) {
        _this_.prop('disabled', true);
        _this_.attr('disabled', 'disabled');
        this_loader.html('<div class="loader-holder"><img src="' + _plugin_url + 'assets/frontend/images/ajax-loader.gif" alt=""></div>');
        $('#foodbakery-dev-cal-holder-' + _this_id).slideUp('fast');
        adding_off_day = $.ajax({
            url: ajax_url,
            method: "POST",
            data: {
                off_day_day: _day,
                off_day_month: _month,
                off_day_year: _year,
                restaurant_add_counter: _this_id,
                action: 'foodbakery_restaurant_off_day_to_list'
            },
            dataType: "json"
        }).done(function (response) {
            if (typeof response.html !== 'undefined') {
                no_off_day_msg.remove();
                _this_append.append(response.html);
                this_act_msg.html(foodbakery_restaurant_strings.off_day_added);
            }
            this_loader.html('');
            _this_.prop('disabled', false);
            _this_.removeAttr('disabled');
        }).fail(function () {
            this_loader.html('');
            _this_.prop('disabled', false);
            _this_.removeAttr('disabled');
        });
    }
});

$(document).on('click', 'div[id^="foodbakery-dev-tag-info"] button', function () {
    var _this_id = $(this).data('id'),
            _this_tag_field = $('#foodbakery-dev-tag-info-' + _this_id).find('input'),
            _this_tag = $('#foodbakery-dev-tag-info-' + _this_id).find('input').val(),
            _this_append = $('#tag-cloud-' + _this_id),
            no_tag_msg = _this_append.find('#no-tag-' + _this_id),
            _this_tag_html = '<li class="tag-cloud">' + _this_tag + '<input type="hidden" name="foodbakery_tags[]" value="' + _this_tag + '"></li>';
    if (typeof _this_tag !== 'undefined' && _this_tag != '') {
        no_tag_msg.remove();
        _this_append.append(_this_tag_html);
        _this_tag_field.val('');
    }
});

jQuery(document).on('click', 'a[id^="foodbakery-dev-open-time"]', function () {
    var _this_id = $(this).data('id'),
            _this_day = $(this).data('day'),
            _this_con = $('#open-close-con-' + _this_day + '-' + _this_id),
            _this_status = $('#foodbakery-dev-open-day-' + _this_day + '-' + _this_id);
    if (typeof _this_id !== 'undefined' && typeof _this_day !== 'undefined') {
        _this_status.val('on');
        _this_con.addClass('opening-time');
    }
});

jQuery(document).on('click', 'a[id^="foodbakery-dev-close-time"]', function () {
    var _this_id = $(this).data('id'),
            _this_day = $(this).data('day'),
            _this_con = $('#open-close-con-' + _this_day + '-' + _this_id),
            _this_status = $('#foodbakery-dev-open-day-' + _this_day + '-' + _this_id);
    if (typeof _this_id !== 'undefined' && typeof _this_day !== 'undefined') {
        _this_status.val('');
        _this_con.removeClass('opening-time');
    }
});

$(document).on('click', '.book-btn', function () {
    $(this).next('.calendar-holder').slideToggle("fast");
});

$(document).on('click', 'a[id^="foodbakery-dev-day-off-rem-"]', function () {
    var _this_id = $(this).data('id');
    $('#day-remove-' + _this_id).remove();
});

$(document).on('click', 'a[id^="choose-all-apply-"]', function () {
    var _this = $(this);
    var _this_id = $(this).data('id');

    if (_this.hasClass('feat-checked')) {
        _this.removeClass('feat-checked');
        $('#features-check-list-' + _this_id).find('input[type="checkbox"]').prop('checked', false);
    } else {
        _this.addClass('feat-checked');
        $('#features-check-list-' + _this_id).find('input[type="checkbox"]').prop('checked', 'checked');
    }
});

// Gallery btn
$(document).on('click', '.foodbakery-dev-gallery-upload-btn', function () {
    var _this_id = $(this).data('id'),
            this_triger = $('#image-uploader-' + _this_id);
    this_triger.trigger('click');
});

// Gallery btn
$(document).on('click', '.foodbakery-dev-featured-upload-btn', function () {
    var _this_id = $(this).data('id'),
            this_triger = $('#featured-image-uploader-' + _this_id);

    this_triger.trigger('click');
});


// Gallery btn
$(document).on('click', '.foodbakery-dev-cover-upload-btn', function () {
    var _this_id = $(this).data('id'),
            this_triger = $('#cover-image-uploader-' + _this_id);

    this_triger.trigger('click');
});

//add Gallery
function foodbakery_handle_file_single_select(event, counter) {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {

        var files = event.target.files;
        var image_file = true;
        jQuery('#foodbakery-dev-main-con-' + counter + ' span').css('color', '');

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')) {
                var response = {
                    type: 'error',
                    msg: foodbakery_restaurant_strings.upload_images_only
                };
                foodbakery_show_response(response);
                image_file = false;
            } else if (file.size > 1000141) {
                jQuery('#foodbakery-dev-main-con-' + counter + ' span').css('color', 'red');
                var response = {
                    type: 'error',
                    msg: foodbakery_restaurant_strings.upload_images_size
                };
                foodbakery_show_response(response);
                image_file = false;
            }

            if (image_file === true) {
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    if (picFile.result) {
                        //document.getElementById("featured-placeholder-" + counter).style.display = "none";
                        var listItems = jQuery('#foodbakery-dev-featured-img-' + counter + '').children().length;
                        if (listItems > 0) {
                            $('#foodbakery-dev-featured-img-' + counter + ' img').attr('src', picFile.result);
                            $('#foodbakery-dev-featured-img-' + counter + ' img').attr('title', picFile.name);
                            $('#foodbakery-dev-featured-img-' + counter + ' input').val('');
                        } else {
                            document.getElementById("foodbakery-dev-featured-img-" + counter).innerHTML += '\
                            <li class="gal-img">\
                                <div class="drag-list">\
                                    <div class="item-thumb"><img class="thumbnail" src="' + picFile.result + '" + "title="' + picFile.name + '"/></div>\
                                    <div class="item-assts">\
                                        <ul class="list-inline pull-right">\
                                            <li class="close-btn"><a href="javascript:void(0);"><i class="icon-cross-out"></i></a></li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </li>';
                        }
                    }
                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        }
    } else {
        var response = {
            type: 'error',
            msg: "Your browser does not support File API"
        };
        foodbakery_show_response(response);
    }
}



//add Cover Image
function foodbakery_handle_cover_file_single_select(event, counter) {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {

        var files = event.target.files;
        var image_file = true;
        jQuery('#foodbakery-dev-main-con-' + counter + ' span').css('color', '');

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')) {
                var response = {
                    type: 'error',
                    msg: foodbakery_restaurant_strings.upload_images_only
                };
                foodbakery_show_response(response);
                image_file = false;
            } else if (file.size > 1000141) {
                jQuery('#foodbakery-dev-main-con-' + counter + ' span').css('color', 'red');
                var response = {
                    type: 'error',
                    msg: foodbakery_restaurant_strings.upload_images_size
                };
                foodbakery_show_response(response);
                image_file = false;
            }

            if (image_file === true) {
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    if (picFile.result) {
                        //document.getElementById("cover-placeholder-" + counter).style.display = "none";
                        var listItems = jQuery('#foodbakery-dev-cover-img-' + counter + '').children().length;
                        if (listItems > 0) {
                            $('#foodbakery-dev-cover-img-' + counter + ' img').attr('src', picFile.result);
                            $('#foodbakery-dev-cover-img-' + counter + ' img').attr('title', picFile.name);
                            $('#foodbakery-dev-cover-img-' + counter + ' input').val('');
                        } else {
                            document.getElementById("foodbakery-dev-cover-img-" + counter).innerHTML += '\
                            <li class="gal-img">\
                                <div class="drag-list">\
                                    <div class="item-thumb"><img class="thumbnail" src="' + picFile.result + '" + "title="' + picFile.name + '"/></div>\
                                    <div class="item-assts">\
                                        <ul class="list-inline pull-right">\
                                            <li class="close-btn"><a href="javascript:void(0);"><i class="icon-cross-out"></i></a></li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </li>';
                        }
                    }
                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        }
    } else {
        var response = {
            type: 'error',
            msg: "Your browser does not support File API"
        };
        foodbakery_show_response(response);
    }
}


//add Gallery
function foodbakery_handle_file_select(event, counter) {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {

        var files = event.target.files;
        var image_file = true;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')) {
                alert(foodbakery_restaurant_strings.upload_images_only);
                image_file = false;
            }

            if (image_file === true) {
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    if (picFile.result) {
                        console.log(picFile);
                        document.getElementById("attach-placeholder-" + counter).style.display = "none";
                        document.getElementById("foodbakery-dev-gal-attach-sec-" + counter).innerHTML += '\
                        <li class="gal-img">\
                            <div class="drag-list">\
                                <div class="item-thumb"><img class="thumbnail" src="' + picFile.result + '" + "title="' + picFile.name + '"/></div>\
                                <div class="item-assts">\
                                    <div class="list-inline pull-right">\
                                        <div class="drag-btn"><a href="javascript:void(0);"><i class="icon-bars"></i></a></div>\
                                        <div class="close-btn"><a href="javascript:void(0);"><i class="icon-cross-out"></i></a></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </li>';
                    }
                    $('#foodbakery-dev-gal-attach-sec-' + counter).sortable();
                });
                //Read the image
                picReader.readAsDataURL(file);
            }
        }
    } else {
        alert("Your browser does not support File API");
    }
}

$(document).on('click', '.gal-img .close-btn', function () {
    $(this).parents('.gal-img').remove();
    $('.foodbakery-dev-gallery-uploader').val('');
});

// Restaurant package update button
$(document).on('click', '.dev-foodbakery-restaurant-update-package', function () {
    var _this_id = $(this).data('id'),
            restaurant_info_con = $('#restaurant-info-sec-' + _this_id),
            packages_con = $('#restaurant-packages-sec-' + _this_id);

    restaurant_info_con.hide();
    packages_con.slideDown();
});

// Restaurant package update Cancel button
$(document).on('click', '.foodbakery-dev-cancel-pkg', function () {
    var _this_id = $(this).data('id'),
            restaurant_info_con = $('#restaurant-info-sec-' + _this_id),
            _check_new_btn = $('#foodbakery-dev-new-pkg-checkbox-' + _this_id),
            _new_pkgs_con = $('#new-packages-' + _this_id),
            _active_pkgs_con = $('#purchased-packages-' + _this_id),
            _purchased_pkg_head = $('#purchased-package-head-' + _this_id),
            _new_pkg_head = $('#buy-package-head-' + _this_id),
            packages_con = $('#restaurant-packages-sec-' + _this_id);

    restaurant_info_con.slideDown();
    packages_con.hide();
    $('.all-pckgs-sec').find('.pkg-detail-btn input[type="radio"]').prop('checked', false);
    $('.all-pckgs-sec').find('input[name="foodbakery_restaurant_featured"]').prop('checked', false);
    $('.all-pckgs-sec').find('input[name="foodbakery_restaurant_top_cat"]').prop('checked', false);
    $('.all-pckgs-sec').find('.package-info-sec').hide();
    $('.all-pckgs-sec').find('.foodbakery-pkg-header').removeAttr('style');
    $('#update-membership-holder').hide();

    if ($('.dir-switch-packges-btn').length === 1) {
        var btn_switch = $('#foodbakery-dev-new-pkg-btn-' + _this_id);
        _check_new_btn.prop('checked', false);
        _new_pkgs_con.hide();
        _active_pkgs_con.slideDown();

        _new_pkg_head.hide();
        _purchased_pkg_head.slideDown();

        btn_switch.html(foodbakery_restaurant_strings.buy_new_packg);
    }

});

// Membership detail Click
$(document).on('click', '.foodbakery-dev-detail-pkg', function () {
    var _this_id = $(this).data('id'),
            package_detail_sec = $('#package-detail-' + _this_id);

    if (!package_detail_sec.is(':visible')) {
        $('.all-pckgs-sec').find('.package-info-sec').hide();
        package_detail_sec.slideDown();
    }

});

// Membership cancel detail Click
$(document).on('click', '.pkg-cancel-btn', function () {
    var _this = $(this),
            _this_id = $(this).data('id'),
            package_detail_sec = $('#package-detail-' + _this_id),
            package_btn = $('#package-' + _this_id);

    package_detail_sec.slideUp(400, function () {
        _this.parents('.foodbakery-pkg-holder').find('.foodbakery-pkg-header').removeAttr('style');
        $('#update-membership-holder').hide();
    });
    package_btn.prop('checked', false);
    _this.parents('.foodbakery-pkg-holder').find('input[name="foodbakery_restaurant_featured"]').prop('checked', false);
    _this.parents('.foodbakery-pkg-holder').find('input[name="foodbakery_restaurant_top_cat"]').prop('checked', false);
});

// Membership Select Submit Click
$(document).on('click', '.pkg-choose-btn', function () {
    var _this = $(this),
            _this_id = _this.data('id'),
            package_detail_sec = $('#package-detail-' + _this_id),
            package_btn = $('#package-' + _this_id);
    // var old_value = $(that).val();
    $('.all-pckgs-sec').find('.foodbakery-pkg-header').removeAttr('style');
    package_btn.prop('checked', true);
    package_detail_sec.slideUp(400, function () {
        _this.parents('.foodbakery-pkg-holder').find('.foodbakery-pkg-header').css({'background-color': '#f6f6f6'});
        $('#update-membership-holder').show();
    });
});

$(document).on('click', 'a[id^="foodbakery-dev-new-pkg-btn-"]', function () {
    var _this = $(this),
            _this_id = $(this).data('id'),
            _check_new_btn = $('#foodbakery-dev-new-pkg-checkbox-' + _this_id),
            _new_pkgs_con = $('#new-packages-' + _this_id),
            _active_pkgs_con = $('#purchased-packages-' + _this_id),
            _purchased_pkg_head = $('#purchased-package-head-' + _this_id),
            _new_pkg_head = $('#buy-package-head-' + _this_id),
            _featured_top_checks = $('.dev-restaurant-featured-top-cat');

    _featured_top_checks.remove();
    if (_check_new_btn.is(':checked')) {
        _check_new_btn.prop('checked', false);
    } else {
        _check_new_btn.prop('checked', true);
    }

    if (_check_new_btn.is(':checked')) {
        _active_pkgs_con.hide();
        _new_pkgs_con.slideDown();

        _purchased_pkg_head.hide();
        _new_pkg_head.slideDown();

        _this.html(foodbakery_restaurant_strings.buy_exist_packg);
    } else {
        _new_pkgs_con.hide();
        _active_pkgs_con.slideDown();

        _new_pkg_head.hide();
        _purchased_pkg_head.slideDown();

        _this.html(foodbakery_restaurant_strings.buy_new_packg);
    }
});
