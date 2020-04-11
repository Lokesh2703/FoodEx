/*
 *  jquery document.ready functions 
 */

var $ = jQuery;
var ajaxRequest;
/**
 * User Register Validation
 */
/*
 * save publisher profile form
 */
/*Location Menu Function Start*/

jQuery(document).on("click", ".user-dashboard-menu > ul > li.user-dashboard-menu-children > a", function () {
    jQuery(this).parent().toggleClass('menu-open');
    jQuery(this).parent().siblings().removeClass('menu-open');
    setTimeout(function () {
        jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').addClass('open-overlay');
    }, 2);
    jQuery(".user-dashboard-menu > ul > li").append("<div class='location-overlay'></div>");
    jQuery(".user-dashboard-menu > ul > li > ul").append("<i class='icon-cross3 close-menu-location'></i>");
});
jQuery(document).on("click", ".user-dashboard-menu > ul > li.user-dashboard-menu-children > a.open-overlay", function () {
    jQuery(".location-overlay").remove();
    jQuery(".close-menu-location").remove();
    setTimeout(function () {
        jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').removeClass('open-overlay');
    }, 2);
});
jQuery(document).on("click", ".location-overlay", function () {
    jQuery(this).closest(".location-overlay").remove();
    jQuery(".close-menu-location").remove();
    jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children').removeClass("menu-open");
    jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').removeClass('open-overlay');
});
jQuery(document).on("click", ".close-menu-location", function () {
    jQuery(this).closest(".close-menu-location").remove();
    jQuery(".location-overlay").remove();
    jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children').removeClass("menu-open");
    jQuery('.user-dashboard-menu > ul > li.user-dashboard-menu-children > a').removeClass('open-overlay');
});
/*Location Menu Function End*/
jQuery(document).on("click", ".upload-file", function () {

    jQuery('.cropControlUpload').click();

});

// Membership detail Click
$(document).on('click', '.foodbakery-dev-dash-detail-pkg', function () {
    var _this_id = $(this).data('id'),
            package_detail_sec = $('#package-detail-' + _this_id);

    if (!package_detail_sec.is(':visible')) {
        $('.all-pckgs-sec').find('.package-info-sec').hide();
        package_detail_sec.slideDown();
    } else {
        package_detail_sec.slideUp();
    }

});

jQuery(document).on("click", ".cropControls .cropControlRemoveCroppedImage", function () {
    jQuery('#cropContainerModal .cropControls').hide();
    var img_src = jQuery('#cropContainerModal').attr('data-def-img');
    var timesRun = 0;
    setInterval(function () {
        timesRun++;
        if (timesRun === 1) {
            jQuery("#cropContainerModal").find('figure a img').attr("src", img_src);
        }
    }, 50);
});

jQuery(document).on("click", ".foodbakery-dev-signup-box-btn", function () {
    jQuery(this).parents('#user-register').removeClass('in active');
    jQuery(this).parents('.tab-content').find('#user-login-tab').addClass('in active');
});

jQuery(document).on("click", ".foodbakery-dev-login-box-btn", function () {
    jQuery(this).parents('#user-login-tab').removeClass('in active');
    jQuery(this).parents('.tab-content').find('#user-register').addClass('in active');
});

jQuery(document).on("click", ".uploaded-img li img", function () {

    var img_src = jQuery(this).attr('src');
    var attachment_id = jQuery(this).attr('data-attachment_id');
    jQuery('#cropContainerModal .croppedImg2').show();
    jQuery("#cropContainerModal figure a").html('<img src="' + img_src + '">');
    jQuery("#cropContainerModal .croppedImg2").attr("src", img_src);
    jQuery('#foodbakery_publisher_profile_image').val(attachment_id);
    jQuery('#cropContainerModal').attr('data-img-type', 'selective');
    jQuery('#cropContainerModal .cropControls').show();
});

jQuery(document).on("click", ".icon-circle-with-cross", function () {
    jQuery(this).parents('li').remove();
    var attachment_id = jQuery(this).attr('data-attachment_id');
    var all_attachments = jQuery('#foodbakery_publisher_gallery_attathcments').val();

    var new_attachemnts = all_attachments.replace(attachment_id, '');
    jQuery('#foodbakery_publisher_gallery_attathcments').val(new_attachemnts);
});

function foodbakery_registration_validation(admin_url, id, thisObjClas) {
    $(".status-message").removeClass("text-danger").hide();

    var formDivID = '#user-register .modal-body';

    if (typeof thisObjClas == 'undefined' || thisObjClas == '') {
        thisObjClas = '.ajax-signup-button';
    } else if (thisObjClas === '.shortcode-ajax-signup-button') {
        formDivID = '';
    }

    var thisObj = jQuery(thisObjClas);
    foodbakery_show_loader(thisObjClas, '', 'button_loader', thisObj);

    //foodbakery_show_loader(formDivID);

    function newValues(id) {
        jQuery('#user_profile').val();
        var serializedValues = jQuery("#wp_signup_form_" + id).serialize() + "&id=" + id;
        return serializedValues;
    }
    var serializedReturn = newValues(id);
    jQuery('div#result_' + id).removeClass('success error');
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        dataType: 'json',
        data: serializedReturn,
        success: function (response) {
            foodbakery_show_response(response, formDivID, thisObj);
        }
    });
}

/**
 * User Login Authentication
 */
function foodbakery_user_authentication(admin_url, id, thisObjClass) {
    "use strict";

    var formDivClass = '.login-form-id-' + id;

    if (typeof thisObjClass == 'undefined' || thisObjClass == '') {
        thisObjClass = '.ajax-login-button';
    } else if (thisObjClass === '.shortcode-ajax-login-button') {
        formDivClass = '';
    }

    var thisObj = jQuery(thisObjClass);
    foodbakery_show_loader(thisObjClass, '', 'button_loader', thisObj);

    function newValues(id) {
        var serializedValues = jQuery("#ControlForm_" + id).serialize();
        return serializedValues;
    }
    var serializedReturn = newValues(id);
    jQuery('.login-form-id-' + id + ' .status-message').removeClass('success error');
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        dataType: 'json',
        data: serializedReturn,
        success: function (data) {
            if (data.type == 'error') {
                foodbakery_show_response(data, formDivClass, thisObj);
            } else if (data.type == 'success') {
                foodbakery_show_response(data, formDivClass, thisObj);
                document.location.href = data.redirecturl;
            }
        }
    });
}

jQuery(document).ready(function ($) {

    /*
     * 
     * frontend user hide/show
     */

    "use strict";


    jQuery.fn.extend({
        cityAutocomplete: function (options) {

            return this.each(function () {

                var input_iso = jQuery(this).data('iso');
                var input = jQuery(this), opts = jQuery.extend({}, jQuery.cityAutocomplete);

                var autocompleteService = new google.maps.places.AutocompleteService();

                var predictionsDropDown = jQuery('<div class="cs_location_autocomplete city-autocomplete"></div>').appendTo(jQuery(this).parent());

                var request_var = 1;

                input.keyup(function () {

                    //if (request_var == 1) {
                    var searchStr = jQuery(this).val();
                    // Min Number of characters
                    var num_of_chars = 0;
                    if (searchStr.length > num_of_chars) {
                        // var params = {
                        // input: searchStr,
                        // bouns: 'upperbound',
                        // //types: ['address'] 
                        // };

                        // if (typeof input_iso !== 'undefined' && input_iso != '') {
                        // params.componentRestrictions = {country: input_iso}; //{country: window.country_code}
                        // }

                        // autocompleteService.getPlacePredictions(params, updatePredictions);
                        jQuery(this).parent().find(".cs_location_autocomplete").html("<i class='icon-spinner8 icon-spin'></i>");
                        $("input.search_type").val('custom');
                        updatePredictions('', '');
                    }
                    //}
                    jQuery(".pac-container").remove();
                });
                predictionsDropDown.delegate('div', 'click', function () {
                    if (jQuery(this).text() != "ADDRESS" && jQuery(this).text() != "STATE / PROVINCE" && jQuery(this).text() != "COUNTRY") {
                        // address with slug			
                        var cs_address_html = jQuery(this).text();
                        // slug only
                        var cs_address_slug = jQuery(this).find('span').html();
                        // remove slug
                        jQuery(this).find('span').remove();
                        input.val(jQuery(this).text());
                        predictionsDropDown.hide();
                        $("input.search_type").val('autocomplete');
                        jQuery(document).trigger('restaurant-item-selected');
                    }
                });
                jQuery(document).mouseup(function (e) {
                    predictionsDropDown.hide();
                });
                jQuery(window).resize(function () {
                    updatePredictionsDropDownDisplay(predictionsDropDown, input);
                });
                updatePredictionsDropDownDisplay(predictionsDropDown, input);
                function updatePredictions(predictions, status) {

                    // var google_results = '';

                    // if (google.maps.places.PlacesServiceStatus.OK == status) {

                    // // AJAX GET ADDRESS FROM GOOGLE
                    // google_results += '<div class="address_headers"><h5>ADDRESS</h5></div>'
                    // jQuery.each(predictions, function (i, prediction) {
                    // google_results += '<div class="cs_google_suggestions"><i class="icon-location-arrow"></i> ' + jQuery.fn.cityAutocomplete.transliterate(prediction.description) + '<span style="display:none">' + jQuery.fn.cityAutocomplete.transliterate(prediction.description) + '</span></div>';
                    // });

                    // request_var = 0;
                    // } else {
                    // predictionsDropDown.empty();
                    // }
                    predictionsDropDown.show();

                    // AJAX GET STATE / PROVINCE
                    var dataString = 'action=foodbakery_get_all_countries_cities' + '&keyword=' + input.val();

                    jQuery.ajax({
                        type: "POST",
                        url: foodbakery_globals.ajax_url,
                        data: dataString,
                        success: function (data) {
                            var results = jQuery.parseJSON(data);
                            predictionsDropDown.empty();
                            //predictionsDropDown.append(google_results);
                            if (results != '') {

                                predictionsDropDown.append('<div class="address_headers"><h5>COUNTRY / CITY</h5></div>');
                                jQuery(results).each(function (key, value) {
                                    if (value.hasOwnProperty('child')) {
                                        jQuery(value.child).each(function (child_key, child_value) {
                                            predictionsDropDown.append('<div class="cs_google_suggestions cs_location_child"><i class="icon-location-arrow"></i>' + child_value.value + '<span style="display:none">' + child_value.slug + '</span></div');
                                        })
                                    } else {
                                        predictionsDropDown.append('<div class="cs_google_suggestions cs_location_parent"><i class="icon-location-arrow"></i>' + value.value + '<span style="display:none">' + value.slug + '</span></div');
                                    }
                                    predictionsDropDown.show();
                                })
                            } else {
                                predictionsDropDown.hide();
                            }
                            //request_var = 1;
                        }
                    });
                }
                return input;
            });

        }
    });
    jQuery.fn.cityAutocomplete.transliterate = function (s) {
        s = String(s);

        return s;
    };
    function updatePredictionsDropDownDisplay(dropDown, input) {
        if (typeof (input.offset()) !== 'undefined') {
            dropDown.css({
                'width': input.outerWidth(),
                'left': input.offset().left,
                'top': input.offset().top + input.outerHeight()
            });
        }
    }

    jQuery('input#foodbakery-locations-field').cityAutocomplete();
    // jQuery(".pac-container").remove();

    // jQuery('.login-box').hide();
    // jQuery('.login-link').on('click', function (e) {
    //     e.preventDefault();
    //     jQuery('.nav-tabs, .nav-tabs~.tab-content, .forgot-box').fadeOut(function () {
    //         jQuery('.login-box').fadeIn();
    //     });
    // });
    // /*
    //  * 
    //  * frontend login tabs function
    //  */
    // jQuery('.login-link-page').on('click', function (e) {
    //     e.preventDefault();
    //     jQuery('.nav-tabs-page, .nav-tabs-page~.tab-content-page, .forgot-box').fadeOut(function () {
    //         jQuery('.login-box').fadeIn();
    //         jQuery('.tab-content-page').fadeOut();
    //     });
    // });

    /*
     * 
     * frontend register tabs function
     */

    // jQuery('.register-link').on('click', function (e) {
    //     e.preventDefault();
    //     jQuery('.login-box, .forgot-box').fadeOut(function () {
    //         jQuery('.nav-tabs, .nav-tabs~.tab-content').fadeIn();
    //     });
    // });
    // /*
    //  * 
    //  * frontend register tabs function
    //  */

    // jQuery('.register-link-page').on('click', function (e) {
    //     e.preventDefault();
    //     jQuery('.login-box, .forgot-box').fadeOut(function () {
    //         //alert('test');
    //         //jQuery('.tab-content').fadeIn();
    //         jQuery('.tab-content-page').fadeIn();
    //         jQuery('.nav-tabs-page').fadeIn();
    //     });
    // });

    /*
     * 
     * frontend page element forgotpassword function
     */

    // jQuery('.user-forgot-password-page').on('click', function (e) {
    //     e.preventDefault();
    //     jQuery('.login-box, .nav-tabs-page, .nav-tabs-page~.tab-content-page').fadeOut(function () {
    //         jQuery('.forgot-box').fadeIn();
    //     });
    // });
    /*
     * 
     * frontend forgotpassword function
     */

    // jQuery('.user-forgot-password').on('click', function (e) {
    //     e.preventDefault();
    //     jQuery('.login-box, .nav-tabs, .nav-tabs~.tab-content').fadeOut(function () {
    //         jQuery('.forgot-box').fadeIn();
    //     });
    // });
    /*
     * 
     * Popup function
     */

    // singup form swtiching 
    $(".triggered-click").on("click", function (e) {
        e.preventDefault();
        $(".triggered-box").removeClass("activate");
        if ($(this).hasClass("login-link-page") == true) {
            $(".login-box").addClass("activate");
            $(".triggered-box").not(".login-box").removeClass("activate");
        } else if ($(this).hasClass("register-link-page") == true) {
            $(".signup-box").addClass("activate");
            $(".triggered-box").not(".signup-box").removeClass("activate");
        } else if ($(this).hasClass("user-forgot-password-page") == true) {
            $(".forgot-box").addClass("activate");
            $(".triggered-box").not(".forgot-box").removeClass("activate");
        }
    });

    "use strict";
    $('#location_redius_popup_close').click(function (event) {
        event.preventDefault();
        jQuery("#popup").addClass('hide');
        return false;
    });
});


jQuery(document).on("click", "#profile_form", function () {

    // Get all the forms elements and their values in one ste

    returnType = foodbakery_validation_process("#publisher_profile");
    if (returnType == false) {
        return false;
    }

    thisObj = jQuery('#profile_form');
    foodbakery_show_loader('#profile_form', '', 'button_loader', thisObj);

    var serializedValues = jQuery("#publisher_profile").serialize();

    var ajax_url = $('#publisher_profile').attr('data-action');
    //jQuery(".foodbakery_loader").show();
    jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: foodbakery_globals.ajax_url,
        data: serializedValues + '&action=foodbakery_publisher_accounts_save',
        success: function (response) {
            var default_image_url = jQuery('#cropContainerModal').attr('data-def-img');
            if (jQuery('#cropContainerModal').find('img.croppedImg2').length > 0) {
                var upload_image_src = jQuery('#cropContainerModal .croppedImg2').attr('src');
                foodbakery_appned_profile_image(upload_image_src, default_image_url, true);
            } else if (jQuery('#cropContainerModal').find('img').length > 0) {
                var image_src = jQuery('#cropContainerModal img').attr('src');
                foodbakery_appned_profile_image(image_src, default_image_url, false);
            }
            foodbakery_show_response(response, '', thisObj);
            //foodbakery_show_response(response);
        }

    });

});

function foodbakery_appned_profile_image(image_url, default_image_url, appned_span) {
    if (image_url != '') {
        jQuery('.user-dashboard-menu .profile-image').find('img').attr('src', image_url);
        if (jQuery('.company-info .img-holder').find('img').length > 0) {
            jQuery('.company-info .img-holder').find('img').attr('src', image_url);
        }
    } else if (default_image_url != '') {
        jQuery('.user-dashboard-menu .profile-image').find('img').attr('src', default_image_url);
        jQuery('#cropContainerModal').find('img').attr('src', default_image_url);
        jQuery('#cropContainerModal').find('img').show();
        if (jQuery('.company-info .img-holder').find('img').length > 0) {
            jQuery('.company-info .img-holder').find('img').attr('src', default_image_url);
        }
    }
}

/*
 * 
 * change password
 */
jQuery(document).on("click", "#publisher_change_password", function () {

    var returnType = foodbakery_validation_process("#change_password_form");
    if (returnType == false) {
        return false;
    }

    var thisObj = jQuery('#publisher_change_password');
    foodbakery_show_loader('#publisher_change_password', '', 'button_loader', thisObj);

    //foodbakery_show_loader('.loader-holder');
    // Get all the forms elements and their values in one ste    
    var serializedValues = jQuery("#change_password_form").serialize();
    jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: foodbakery_globals.ajax_url,
        data: serializedValues + '&action=publisher_change_pass',
        success: function (response) {
            foodbakery_show_response(response, '', thisObj);
            //foodbakery_show_response(response);
        }
    });

});
/*
 * 
 * change Location
 */
jQuery(document).on("click", "#publisher_change_address", function () {

    // Get all the forms elements and their values in one ste
    var thisObj = jQuery('#publisher_change_address');
    foodbakery_show_loader('#publisher_change_address', '', 'button_loader', thisObj);
    //foodbakery_show_loader('.loader-holder');
    var serializedValues = jQuery("#change_address_form").serialize();
    jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: foodbakery_globals.ajax_url,
        data: serializedValues + '&action=publisher_change_address',
        success: function (response) {
            //foodbakery_show_response(response);
            foodbakery_show_response(response, '', thisObj);
        }


    });

});

var default_loader = jQuery(".foodbakery_loader").html();
var default_button_loader = jQuery(".foodbakery-button-loader").html();
/*
 * Loader Show Function
 */
function foodbakery_show_loader(loading_element, loader_data, loader_style, thisObj) {

    var loader_div = '.foodbakery_loader';
    if (loader_style == 'button_loader') {
        loader_div = '.foodbakery-button-loader';
        if (thisObj != 'undefined' && thisObj != '') {
            thisObj.addClass('foodbakery-processing');
        }

    }
    if (typeof loader_data !== 'undefined' && loader_data != '' && typeof jQuery(loader_div) !== 'undefined') {
        jQuery(loader_div).html(loader_data);
    }
    if (typeof loading_element !== 'undefined' && loading_element != '' && typeof jQuery(loader_div) !== 'undefined') {
        jQuery(loader_div).appendTo(loading_element);
        jQuery(loading_element).find(loader_div).slice(1).remove();
    }
    jQuery(loader_div).show();
}

/*
 * Loader Show Response Function
 */
function foodbakery_show_response(loader_data, loading_element, thisObj, clickTriger) {

    if (thisObj != 'undefined' && thisObj != '' && thisObj != undefined) {
        thisObj.removeClass('foodbakery-processing');
    }
    jQuery('.foodbakery-button-loader').appendTo('#footer');
    jQuery(".foodbakery_loader").hide();
    jQuery(".foodbakery-button-loader").hide();
    if (clickTriger != 'undefined' && clickTriger != '' && clickTriger != undefined) {
        jQuery(clickTriger).click();
    }// else {
    //jQuery(".foodbakery_loader").hide();
    //jQuery(".foodbakery-button-loader").hide();
    //}
    jQuery("#growls").removeClass('foodbakery_element_growl');
    jQuery("#growls").find('.growl').remove();
    if (loader_data != 'undefined' && loader_data != '') {
        if (loader_data.type != 'undefined' && loader_data.type == 'error') {

            var error_message = jQuery.growl.error({
                message: loader_data.msg
            });
            if (loading_element != 'undefined' && loading_element != undefined && loading_element != '') {
                jQuery("#growls").prependTo(loading_element);
                jQuery("#growls").addClass('foodbakery_element_growl');

            }
        } else if (loader_data.type != 'undefined' && loader_data.type == 'success') {
            var success_message = jQuery.growl.success({
                message: loader_data.msg
            });
            if (loading_element != 'undefined' && loading_element != undefined && loading_element != '') {
                jQuery("#growls").prependTo(loading_element);
                jQuery("#growls").addClass('foodbakery_element_growl');
            }
        }
    }
}

/*
 * 
 * Loader Hide Function  
 */
function foodbakery_hide_loader() {
    jQuery(".foodbakery_loader").hide();
    jQuery(".foodbakery_loader").html(default_loader);
}

/*
 * 
 * Hide Button loader
 */

function foodbakery_hide_button_loader(processing_div) {
    if (processing_div != 'undefined' && processing_div != '' && processing_div != undefined) {
        jQuery(processing_div).removeClass('foodbakery-processing');
    }
    jQuery(".foodbakery-button-loader").hide();
    jQuery(".foodbakery-button-loader").html(default_button_loader);
}

jQuery(document).ready(function ($) {

    /*
     * Load Dashboard Tabs  
     */
    jQuery(document).on("click", ".user_dashboard_ajax", function () {
        var id = jQuery(this).attr('id');
        if (id === 'foodbakery_publisher_accounts' || id === 'foodbakery_publisher_change_locations') {
            jQuery('.foodbakery-button-loader').appendTo('#footer');
        }
        var actionString = jQuery(this).attr('id');
        if (typeof actionString === 'undefined') {
            actionString = jQuery(this).attr('data-id');
        }

        var pageNum = jQuery(this).attr('data-pagenum');

        var filter_parameters = '';
        if (typeof pageNum !== 'undefined') {
            filter_parameters = get_filter_parameters();
        } else {
            filter_parameters = '';
        }

        var page_qry_append = '';
        if (typeof pageNum === 'undefined') {

            if (typeof page_id_all !== 'undefined' && page_id_all > 1) {
                pageNum = page_id_all;
                page_qry_append = '&page_id_all=' + page_id_all;
                page_id_all = 0;
            }
        }

        if (typeof pageNum === 'undefined' || pageNum == '') {
            pageNum = '1';
        }

        var actionClass = jQuery(this).attr('class');
        var query_var = jQuery(this).data('queryvar');

        if (history.pushState) {
            if (query_var != undefined) {
                if (query_var != '') {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + query_var + page_qry_append;
                } else {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                }
                window.history.pushState({path: newurl}, '', newurl);
            }
        }
        jQuery('.user_dashboard_ajax').removeClass('active');
        jQuery('.orders-inquiries').removeClass('active');
        jQuery('.user_dashboard_url').removeClass('active');

        foodbakery_show_loader('.loader-holder');
        jQuery('#' + actionString + '.' + actionClass).addClass('active');
        if (actionString == 'foodbakery_publisher_received_orders' || actionString == 'foodbakery_publisher_received_inquiries') {
            jQuery('.dashboard-nav .orders-inquiries').addClass('active');
            jQuery('.dashboard-nav .orders-inquiries #' + actionString + '.' + actionClass).addClass('active');
        } else if (actionString == 'foodbakery_publisher_orders' || actionString == 'foodbakery_publisher_inquiries') {
            jQuery('.dashboard-nav .orders-inquiries').addClass('active');
        }

        //jQuery(this).addClass('active');
        if (typeof (ajaxRequest) != 'undefined') {
            ajaxRequest.abort();
        }

        ajaxRequest = jQuery.ajax({
            type: "POST",
            url: foodbakery_globals.ajax_url,
            data: 'page_id_all=' + pageNum + '&action=' + actionString + filter_parameters,
            success: function (response) {
                foodbakery_hide_loader();
                var timesRun = 0
                setInterval(function () {
                    timesRun++;
                    if (timesRun === 1) {
                        if (jQuery(document).find('#cropContainerModal').attr('data-img-type') == 'default') {
                            jQuery('#cropContainerModal .cropControls').hide();
                        }
                    }
                }, 50);
               // var str_new = response.replace(/(?:\r\n|\r|\n)/g, '');//removing unsupported characters
                jQuery('.user-holder').html(response);

            }
        });

    });
    jQuery(document).on("click", ".team-option .add_team_member", function (e) {
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

    jQuery(document).on("click", ".restaurant-team-member-det", function (e) {
        e.preventDefault();
        var dat_id = jQuery(this).attr('data-id');
        jQuery("#team-member-det-" + dat_id).addClass("active");
        jQuery('body').find('#overlay').remove();
        jQuery(this).append('<div id="overlay" style="display:none"></div>');
        jQuery('#overlay').fadeIn(300);
        jQuery("#team-member-det-" + dat_id).show();
    });
    jQuery(document).on("click", ".team-member-det-box .cancel", function (e) {
        e.preventDefault();
        jQuery(this).parents('.team-member-det-box').removeClass("active");
        jQuery(this).parents('.team-member-det-box').hide();

        jQuery('#overlay').fadeOut(300);
        setTimeout(function () {
            jQuery('#overlay').remove();
        }, 400);
    });

    jQuery(document).on("click", ".send-invitation, .add_team_member", function () {
        if (jQuery("body").hasClass("invite-member-open") == false) {
            jQuery("body").addClass("invite-member-open");
        }
        jQuery(document).on("click", ".invite-member .cancel", function () {
            jQuery("body").removeClass("invite-member-open");
        });
    });
    /*
     * Invitation to Member
     */
    jQuery(document).on("click", "#send_invitation", function () {
        thisObj = jQuery(this);
        foodbakery_show_loader('#send_invitation', '', 'button_loader', thisObj);
        var serializedValues = jQuery("#team_invitation_form").serialize();
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: foodbakery_globals.ajax_url,
            data: serializedValues + '&action=foodbakery_send_invitation',
            success: function (response) {
                foodbakery_show_response(response, '#team_invitation_form', thisObj);
            }

        });
    });


    /*
     * Adding Team Member
     */
    jQuery(document).on("click", "#add_member", function () {
        thisObj = jQuery(this);
        foodbakery_show_loader('#add_member', '', 'button_loader', thisObj);
        var serializedValues = jQuery("#team_add_form").serialize();
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: foodbakery_globals.ajax_url,
            data: serializedValues + '&action=foodbakery_add_team_member',
            success: function (response) {
                foodbakery_show_response(response, '#team_add_form', thisObj);
            }

        });
    });

    /*
     * Update Team Member
     */
    jQuery(document).on('click', '.team_update_form', function () {
        var user_id = jQuery(this).closest('form').data('id');
        var thisObj = jQuery('#team_update_form' + user_id);
        foodbakery_show_loader('#team_update_form' + user_id + '', '', 'button_loader', thisObj);

        foodbakery_show_loader();
        var serializedValues = jQuery("#foodbakery_update_team_member" + user_id).serialize();
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: foodbakery_globals.ajax_url,
            data: serializedValues + '&foodbakery_user_id=' + user_id + '&action=foodbakery_update_team_member',
            success: function (response) {
                jQuery('#overlay').fadeOut(300);
                setTimeout(function () {
                    jQuery('#overlay').remove();
                }, 400);
                foodbakery_show_response(response, '', thisObj, '#foodbakery_publisher_company');
            }

        });
    });

    /*
     * Remove Team Member
     */
    jQuery(document).on('click', '.close-member', function () {
        var thisObj = jQuery(this);
        var user_id = thisObj.data('id');
        var count_supper_admin = thisObj.closest('form').data('count_supper_admin');
        var selected_user_type = thisObj.closest('form').data('selected_user_type');
        foodbakery_show_loader();
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: foodbakery_globals.ajax_url,
            data: 'foodbakery_user_id=' + user_id + '&selected_user_type=' + selected_user_type + '&count_supper_admin=' + count_supper_admin + '&action=foodbakery_remove_team_member',
            success: function (response) {
                if (response.type == 'success') {
                    jQuery('#foodbakery_publisher_company').trigger('click');
                    thisObj.closest('form').fadeOut('slow');

                }
                foodbakery_show_response(response);
            }
        });
    });


    /*
     * Saving Publisher Data
     */
    jQuery(document).on("click", "#company_profile_form", function () {
        foodbakery_show_loader();
        var serializedValues = jQuery("#publisher_company_profile").serialize();
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: foodbakery_globals.ajax_url,
            data: serializedValues + '&action=foodbakery_save_company_data',
            success: function (response) {
                foodbakery_show_response(response);
            }
        });
    });
});

function foodbakery_post_likes_count(admin_url, id, views, obj) {
    "use strict";
    var dataString = 'post_id=' + id + '&action=foodbakery_post_likes_count' + '&view=' + views;
    jQuery(obj).html(jQuery(obj).attr('data-loader'));
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        data: dataString,
        success: function (response) {
            if (response != 'error') {
                jQuery(obj).removeAttr("onclick");
                jQuery(obj).parent().addClass(jQuery(obj).attr('data-likedclass'));
                jQuery(obj).html(jQuery(obj).attr('data-aftersuccess') + ' ' + response);
            } else {
                jQuery(obj).html(' There is an error.');
            }
        }
    });
    return false;
}
/*
 * register pop up
 */
jQuery(document).on('click', '.no-logged-in', function () {
    $("#join-us").modal();

});

function foodbakery_load_location_ajax(postfix, allowed_location_types, location_levels, security) {
    "use strict";
    var $ = jQuery;
    $('#loc_country_' + postfix).change(function () {
        popuplate_data(this, 'country');
    });

    $('#loc_state_' + postfix).change(function () {
        popuplate_data(this, 'state');
    });

    $('#loc_county_' + postfix).change(function () {
        popuplate_data(this, 'county');
    });

    $('#loc_city_' + postfix).change(function () {
        popuplate_data(this, 'city');
    });

    $('#loc_town_' + postfix).change(function () {
        popuplate_data(this, 'town');
    });

    function popuplate_data(elem, type) {
        var plugin_url = $(elem).parents("#locations_wrap").data('plugin_url');
        var ajaxurl = $(elem).parents("#locations_wrap").data('ajaxurl');

        var selected_country = $(elem).parents("#locations_wrap").find('#loc_country_restaurant').val();
        if (selected_country == '') {
            selected_country = $(elem).parents("#locations_wrap").attr('data-default-country');
        }

        var index = allowed_location_types.indexOf(type);
        if (index + 1 >= allowed_location_types.length) {
            return;
        }
        var location_type = allowed_location_types[ index + 1 ];

        $(".loader-" + location_type + "-" + postfix).html("<img src='" + plugin_url + "/assets/frontend/images/ajax-loader.gif' />").show();
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: "get_locations_list",
                security: security,
                location_type: location_type,
                location_level: location_levels[ location_type ],
                selector: elem.value,
            },
            dataType: "json",
            success: function (response) {
                if (response.error == true) {
                    return;
                }

                if (typeof response.loc_coords !== 'undefined' && response.loc_coords != '' && $('#foodbakery__loc_bounds_rest').length !== 0) {

                    $('#foodbakery__loc_bounds_rest').val(response.loc_coords);
                    var polygonCoords = jQuery('#foodbakery__loc_bounds_rest').val();
                    if (typeof polygonCoords !== 'undefined' && polygonCoords != '') {
                        var selectedLat = 51.4;
                        var selectedLng = -0.2;
                        var _this_map = new google.maps.Map($('#cs-map-location-fe-id').get(0), {
                            center: {lat: selectedLat, lng: selectedLng},
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            disableDoubleClickZoom: true,
                            zoomControlOptions: true,
                            streetViewControl: false,
                            zoom: 8
                        });
                        var LatLngList = [];
                        var polygonCoordsJson = jQuery.parseJSON(polygonCoords);

                        if (polygonCoordsJson.length > 0) {
                            jQuery.each(polygonCoordsJson, function (index, element) {
                                LatLngList.push(new google.maps.LatLng(element.lat, element.lng));
                            });
                        }

                        var draw_color = '#333333';
                        var prePolygon = new google.maps.Polygon({
                            paths: polygonCoordsJson,
                            strokeWeight: 0,
                            fillOpacity: 0.25,
                            fillColor: draw_color,
                            strokeColor: draw_color,
                            editable: false
                        });
                        prePolygon.setMap(_this_map);
                        if (LatLngList.length > 0) {
                            var latlngbounds = new google.maps.LatLngBounds();
                            for (var i = 0; i < LatLngList.length; i++) {
                                latlngbounds.extend(LatLngList[i]);
                            }
                            _this_map.setCenter(latlngbounds.getCenter(), _this_map.fitBounds(latlngbounds));
                            _this_map.setZoom(_this_map.getZoom());
                            var marker = new google.maps.Marker({
                                position: latlngbounds.getCenter(),
                                center: latlngbounds.getCenter(),
                                map: _this_map,
                                draggable: true,
                            });
                            var newLat = marker.getPosition().lat();
                            var newLng = marker.getPosition().lng();
                            document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                            document.getElementById('foodbakery_post_loc_longitude').value = newLng;
                        }
                        marker.addListener('dragend', function () {
                            var newLat = marker.getPosition().lat();
                            var newLng = marker.getPosition().lng();
                            var polygon_area = new google.maps.Polygon({paths: polygonCoordsJson});

                            var nResultCord = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(newLat, newLng), polygon_area) ? 'true' : 'false';
                            if (nResultCord == 'false') {
                                alert('Warning! This address is out of the selected location boundries.');
                                return false;
                            } else {
                                document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                                document.getElementById('foodbakery_post_loc_longitude').value = newLng;
                            }
                        });
                    }
                } else if (typeof response.loc_coords !== 'undefined' && response.loc_coords == '' && $('#foodbakery__loc_bounds_rest').length !== 0 && jQuery('#foodbakery__loc_bounds_rest').val() != '') {

                    var polygonCoords = jQuery('#foodbakery__loc_bounds_rest').val();
                    if (typeof polygonCoords !== 'undefined' && polygonCoords != '') {
                        var selectedLat = 51.4;
                        var selectedLng = -0.2;
                        var _this_map = new google.maps.Map($('#cs-map-location-fe-id').get(0), {
                            center: {lat: selectedLat, lng: selectedLng},
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            disableDoubleClickZoom: true,
                            zoomControlOptions: true,
                            streetViewControl: false,
                            zoom: 8
                        });
                        var LatLngList = [];
                        var polygonCoordsJson = jQuery.parseJSON(polygonCoords);

                        if (polygonCoordsJson.length > 0) {
                            jQuery.each(polygonCoordsJson, function (index, element) {
                                LatLngList.push(new google.maps.LatLng(element.lat, element.lng));
                            });
                        }

                        var draw_color = '#333333';
                        var prePolygon = new google.maps.Polygon({
                            paths: polygonCoordsJson,
                            strokeWeight: 0,
                            fillOpacity: 0.25,
                            fillColor: draw_color,
                            strokeColor: draw_color,
                            editable: false
                        });
                        prePolygon.setMap(_this_map);
                        if (LatLngList.length > 0) {
                            var latlngbounds = new google.maps.LatLngBounds();
                            for (var i = 0; i < LatLngList.length; i++) {
                                latlngbounds.extend(LatLngList[i]);
                            }
                            _this_map.setCenter(latlngbounds.getCenter(), _this_map.fitBounds(latlngbounds));
                            _this_map.setZoom(_this_map.getZoom());
                            var marker = new google.maps.Marker({
                                position: latlngbounds.getCenter(),
                                center: latlngbounds.getCenter(),
                                map: _this_map,
                                draggable: true,
                            });
                            var newLat = marker.getPosition().lat();
                            var newLng = marker.getPosition().lng();
                            document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                            document.getElementById('foodbakery_post_loc_longitude').value = newLng;
                        }
                        marker.addListener('dragend', function () {
                            var newLat = marker.getPosition().lat();
                            var newLng = marker.getPosition().lng();
                            var polygon_area = new google.maps.Polygon({paths: polygonCoordsJson});

                            var nResultCord = google.maps.geometry.poly.containsLocation(new google.maps.LatLng(newLat, newLng), polygon_area) ? 'true' : 'false';
                            if (nResultCord == 'false') {
                                alert('Warning! This address is out of the selected location boundries.');
                                return false;
                            } else {
                                document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                                document.getElementById('foodbakery_post_loc_longitude').value = newLng;
                            }
                        });
                    }
                } else {
                    $('#foodbakery__loc_bounds_rest').val('');
                    if (selected_country != "") {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({'address': selected_country}, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                var selectedLat = results[0].geometry.location.lat();
                                var selectedLng = results[0].geometry.location.lng();
                                var thisLatLng = new google.maps.LatLng(selectedLat, selectedLng);
                                var _this_map = new google.maps.Map($('#cs-map-location-fe-id').get(0), {
                                    center: thisLatLng,
                                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                                    mapTypeControl: false,
                                    disableDoubleClickZoom: true,
                                    zoomControlOptions: true,
                                    streetViewControl: false,
                                    zoom: 9,
                                });
                                var marker = new google.maps.Marker({
                                    position: thisLatLng,
                                    center: thisLatLng,
                                    map: _this_map,
                                    draggable: true,
                                });
                                var newLat = marker.getPosition().lat();
                                var newLng = marker.getPosition().lng();

                                document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                                document.getElementById('foodbakery_post_loc_longitude').value = newLng;

                                marker.addListener('dragend', function () {
                                    var newLat = marker.getPosition().lat();
                                    var newLng = marker.getPosition().lng();

                                    document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                                    document.getElementById('foodbakery_post_loc_longitude').value = newLng;
                                });
                            }
                        });
                    } else {
                        var selectedLat = 51.4;
                        var selectedLng = -0.2;
                        var thisLatLng = new google.maps.LatLng(selectedLat, selectedLng);
                        var _this_map = new google.maps.Map($('#cs-map-location-fe-id').get(0), {
                            center: thisLatLng,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            disableDoubleClickZoom: true,
                            zoomControlOptions: true,
                            streetViewControl: false,
                            zoom: 9,
                        });
                        var marker = new google.maps.Marker({
                            position: thisLatLng,
                            center: thisLatLng,
                            map: _this_map,
                            draggable: true,
                        });
                        var newLat = marker.getPosition().lat();
                        var newLng = marker.getPosition().lng();

                        document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                        document.getElementById('foodbakery_post_loc_longitude').value = newLng;

                        marker.addListener('dragend', function () {
                            var newLat = marker.getPosition().lat();
                            var newLng = marker.getPosition().lng();

                            document.getElementById('foodbakery_post_loc_latitude').value = newLat;
                            document.getElementById('foodbakery_post_loc_longitude').value = newLng;
                        });
                    }

                }

                var control_selector = "#loc_" + location_type + "_" + postfix;
                var data = response.data;
                $(control_selector + ' option').remove();
                $(control_selector).append($("<option></option>").attr("value", '').text('Choose...'));
                $.each(data, function (key, term) {
                    $(control_selector).append($("<option></option>").attr("value", term.slug).text(term.name));
                });

                $(".loader-" + location_type + "-" + postfix).html('').hide();
                // Only for style implementation.
                $(".chosen-select").data("placeholder", "Select").trigger('chosen:updated');
            }
        });
    }


    jQuery(document).ready(function (e) {

        //changeMap();
        jQuery('input#foodbakery-search-location').keypress(function (e) {
            if (e.which == '13') {
                e.preventDefault();
                cs_search_map(this.value);
                return false;
            }
        });
        jQuery('#loc_country_restaurant').change(function (e) {
            setAutocompleteCountry('restaurant');
        });
        jQuery('#loc_country_publisher').change(function (e) {
            setAutocompleteCountry('publisher');
        });
        jQuery('#loc_country_default').change(function (e) {
            setAutocompleteCountry('default');
        });
    });
    function setAutocompleteCountry(type) {
        "use strict";
        var country = jQuery('select#loc_country_' + type + ' option:selected').attr('data-name'); /*document.getElementById('country').value;*/
        if (country != '') {
            autocomplete.setComponentRestrictions({'country': country});
        } else {
            autocomplete.setComponentRestrictions([]);
        }
    }

}

/**
 * Map
 */
function foodbakery_map_location_load(field_postfix) {

    field_postfix = field_postfix || '';
    "use strict";
    jQuery.noConflict();
    (function (jQuery) {

        // for ie9 doesn't support debug console
        if (!window.console)
            window.console = {};
        if (!window.console.log)
            window.console.log = function () {
            };
        // ^^^
        //alert(field_postfix);
        var GMapsLatLonPicker = (function () {

            var _self = this;

            // PARAMETERS (MODIFY THIS PART)
            _self.params = {
                defLat: 0,
                defLng: 0,
                defZoom: 1,
                queryLocationNameWhenLatLngChanges: true,
                queryElevationWhenLatLngChanges: true,
                mapOptions: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    disableDoubleClickZoom: true,
                    zoomControlOptions: true,
                    streetViewControl: false,
                    scrollwheel: true,
                },
                strings: {
                    markerText: "Drag this Marker",
                    error_empty_field: "Couldn't find coordinates for this place",
                    error_no_results: "Couldn't find coordinates for this place"
                }
            };

            // VARIABLES USED BY THE FUNCTION (DON'T MODIFY THIS PART)
            _self.vars = {
                ID: null,
                LATLNG: null,
                map: null,
                marker: null,
                geocoder: null
            };

            // PRIVATE FUNCTIONS FOR MANIPULATING DATA
            var setPosition = function (position) {
                _self.vars.marker.setPosition(position);
                _self.vars.map.panTo(position);
                jQuery(_self.vars.cssID + ".gllpZoom").val(_self.vars.map.getZoom());
                jQuery(_self.vars.cssID + ".gllpLongitude").val(position.lng());
                jQuery(_self.vars.cssID + ".gllpLatitude").val(position.lat());
                jQuery(_self.vars.cssID).trigger("location_changed", jQuery(_self.vars.cssID));
                if (_self.params.queryLocationNameWhenLatLngChanges) {
                    getLocationName(position);
                }
                if (_self.params.queryElevationWhenLatLngChanges) {
                    getElevation(position);
                }
            };
            // for reverse geocoding
            var getLocationName = function (position) {
                var latlng = new google.maps.LatLng(position.lat(), position.lng());
                _self.vars.geocoder.geocode({'latLng': latlng}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results[1]) {
                        jQuery(_self.vars.cssID + ".gllpLocationName").val(results[1].formatted_address);
                    } else {
                        jQuery(_self.vars.cssID + ".gllpLocationName").val("");
                    }
                    jQuery(_self.vars.cssID).trigger("location_name_changed", jQuery(_self.vars.cssID));

                });
            };

            // for getting the elevation value for a position
            var getElevation = function (position) {
                var latlng = new google.maps.LatLng(position.lat(), position.lng());
                var locations = [latlng];
                var positionalRequest = {'locations': locations};
                _self.vars.elevator.getElevationForLocations(positionalRequest, function (results, status) {
                    if (status == google.maps.ElevationStatus.OK) {
                        if (results[0]) {
                            jQuery(_self.vars.cssID + ".gllpElevation").val(results[0].elevation.toFixed(3));
                        } else {
                            jQuery(_self.vars.cssID + ".gllpElevation").val("");
                        }
                    } else {
                        jQuery(_self.vars.cssID + ".gllpElevation").val("");
                    }
                    jQuery(_self.vars.cssID).trigger("elevation_changed", jQuery(_self.vars.cssID));

                });
            };

            // search function
            var performSearch = function (string, silent) {
                console.log(string);
                if (string == "") {
                    if (!silent) {
                        displayError(_self.params.strings.error_empty_field);
                    }
                    return;
                }
                _self.vars.geocoder.geocode(
                        {"address": string},
                        function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                jQuery(_self.vars.cssID + ".gllpZoom").val(11);
                                _self.vars.map.setZoom(parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()));
                                setPosition(results[0].geometry.location);
                                foodbakery_hide_button_loader();
                            } else {
                                if (!silent) {
                                    displayError(_self.params.strings.error_no_results);
                                }
                            }
                        }
                );
            };
            // error function
            var displayError = function (message) {
                alert("Error: " + message);
            };

            // PUBLIC FUNCTIONS
            var publicfunc = {
                // INITIALIZE MAP ON DIV
                init: function (object) {

                    if (!jQuery(object).attr("id")) {
                        if (jQuery(object).attr("name")) {
                            jQuery(object).attr("id", jQuery(object).attr("name"));
                        } else {
                            jQuery(object).attr("id", "_MAP_" + Math.ceil(Math.random() * 10000));
                        }
                    }

                    _self.vars.ID = jQuery(object).attr("id");
                    _self.vars.cssID = "#" + _self.vars.ID + " ";
                    _self.params.defLat = jQuery(_self.vars.cssID + ".gllpLatitude").val() ? jQuery(_self.vars.cssID + ".gllpLatitude").val() : _self.params.defLat;
                    _self.params.defLng = jQuery(_self.vars.cssID + ".gllpLongitude").val() ? jQuery(_self.vars.cssID + ".gllpLongitude").val() : _self.params.defLng;
                    // alert("longit ----" + jQuery(_self.vars.cssID + ".gllpLongitude").val());
                    _self.params.defZoom = jQuery(_self.vars.cssID + ".gllpZoom").val() ? parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()) : _self.params.defZoom;
                    _self.vars.LATLNG = new google.maps.LatLng(_self.params.defLat, _self.params.defLng);
                    _self.vars.MAPOPTIONS = _self.params.mapOptions;
                    _self.vars.MAPOPTIONS.zoom = _self.params.defZoom;
                    _self.vars.MAPOPTIONS.center = _self.vars.LATLNG;
                    _self.vars.map = new google.maps.Map(jQuery(_self.vars.cssID + ".gllpMap").get(0), _self.vars.MAPOPTIONS);

                    _self.vars.geocoder = new google.maps.Geocoder();
                    _self.vars.elevator = new google.maps.ElevationService();
                    _self.vars.marker = new google.maps.Marker({
                        position: _self.vars.LATLNG,
                        map: _self.vars.map,
                        title: _self.params.strings.markerText,
                        draggable: true
                    });
                    // Set position on doubleclick
                    google.maps.event.addListener(_self.vars.map, 'dblclick', function (event) {
                        setPosition(event.latLng);
                    });
                    // Set position on marker move
                    google.maps.event.addListener(_self.vars.marker, 'dragend', function (event) {
                        setPosition(_self.vars.marker.position);
                    });
                    // Set zoom feld's value when user changes zoom on the map
                    google.maps.event.addListener(_self.vars.map, 'zoom_changed', function (event) {
                        jQuery(_self.vars.cssID + ".gllpZoom").val(_self.vars.map.getZoom());
                        jQuery(_self.vars.cssID).trigger("location_changed", jQuery(_self.vars.cssID));
                    });
                    // Update location and zoom values based on input field's value 
                    jQuery(_self.vars.cssID + ".gllpUpdateButton").bind("click", function () {
                        var lat = jQuery(_self.vars.cssID + ".gllpLatitude").val();
                        var lng = jQuery(_self.vars.cssID + ".gllpLongitude").val();
                        var latlng = new google.maps.LatLng(lat, lng);
                        _self.vars.map.setZoom(parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()));
                        setPosition(latlng);
                    });
                    // Search function by search button
                    jQuery(_self.vars.cssID + ".gllpSearchButton").bind("click", function () {
                        foodbakery_fe_search_map(jQuery('#post_loc_address').val());
                        performSearch(jQuery(_self.vars.cssID + ".gllpSearchField_fe").val(), false);
                    });
                    // Search function by gllp_perform_search listener
                    jQuery(document).bind("gllp_perform_search", function (event, object) {
                        performSearch(jQuery(object).attr('string'), true);
                    });
                    // Zoom function triggered by gllp_perform_zoom listener
                    jQuery(document).bind("gllp_update_fields", function (event) {
                        var lat = jQuery(_self.vars.cssID + ".gllpLatitude").val();
                        var lng = jQuery(_self.vars.cssID + ".gllpLongitude").val();
                        var latlng = new google.maps.LatLng(lat, lng);
                        _self.vars.map.setZoom(parseInt(jQuery(_self.vars.cssID + ".gllpZoom").val()));
                        setPosition(latlng);
                    });

                    // resize map after load
                    google.maps.event.addListenerOnce(_self.vars.map, 'idle', function () {
                        var center = _self.vars.map.getCenter();
                        google.maps.event.trigger(_self.vars.map, 'resize');
                        _self.vars.map.setCenter(center);
                    });

                }

            }
            return publicfunc;
        });
        jQuery(document).ready(function () {
            jQuery("#fe_map" + field_postfix).each(function () {
                (new GMapsLatLonPicker()).init(jQuery(this));
            });
        });
        jQuery(document).bind("location_changed", function (event, object) {
            console.log("changed: " + jQuery(object).attr('id'));
        });
    }(jQuery));
}

// Search Map.
function foodbakery_search_map(location) {
    "use strict";
    jQuery('.gllpSearchField').val(location);
    setTimeout(function () {
        jQuery(".gllpSearchButton").trigger("click");
    }, 10);
}



/* range slider */

jQuery(document).ready(function () {

    /*Main Categories List Show Hide*/


//    if (jQuery(".listing-filter ul.filter-list").length != '') {
//        jQuery('.listing-filter ul.filter-list').each(function () {
//            var $ul = $(this),
//                    $lis = $ul.find('li:gt(3)'),
//                    isExpanded = $ul.hasClass('expanded');
//            $lis[isExpanded ? 'show' : 'hide']();
//            if ($lis.length > 0) {
//                $ul
//                        .append($('<li class="expand">' + (isExpanded ? 'Less cuisines' : 'See more cuisines') + '</li>')
//                                .click(function (event) {
//                                    var isExpanded = $ul.hasClass('expanded');
//                                    event.preventDefault();
//                                    $(this).text(isExpanded ? 'See more cuisines' : 'Less cuisines');
//                                    $ul.toggleClass('expanded');
//                                    $lis.toggle(350);
//                                }));
//            }
//        });
//    }
    /*Main Categories List Show Hide End*/



    jQuery(".booking-date").focus(function () {
        $('.booking-info-sec .reservaion-calendar.hasDatepicker').show();

        $(document).mouseup(function (e)
        {
            var container = $(".booking-info-sec .reservaion-calendar.hasDatepicker");

            if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0 && !$(".booking-date").is(e.target)) // ... nor a descendant of the container
            {
                container.hide();
            }
        });
        $(".booking-info-sec .reservaion-calendar.hasDatepicker .undefined").click(function () {
            if ($(this).hasClass("ui-state-disabled") == false) {
                $('.booking-info-sec .reservaion-calendar.hasDatepicker').hide();
            }
        })
    });
    jQuery(".cs-drag-slider").each(function (index) {
        if (jQuery(this).attr('data-slider-step') != '') {
            var data_min_max = jQuery(this).attr('data-min-max');

            var val_parameter = [parseInt(jQuery(this).attr('data-slider-min')), parseInt(jQuery(this).attr('data-slider-max'))];
            console.log(data_min_max);
            if (data_min_max != 'yes') {
                console.log('hello');
                var val_parameter = parseInt(jQuery(this).attr('data-slider-min'));
            }

            jQuery(this).children('input').slider({
                min: parseInt(jQuery(this).attr('data-slider-min')),
                max: parseInt(jQuery(this).attr('data-slider-max')),
                value: val_parameter,
                focus: true
            });
        }

    });

});
function foodbakery_type_cats(foodbakery_search_types) {

    var foodbakery_types = '';
    $('input[name=foodbakery_search_types]:checked').each(function () {
        foodbakery_types += $(this).val() + ',';
    });
    data_vals = 'foodbakery_types=' + foodbakery_types;
    jQuery.ajax({
        type: 'POST',
        url: foodbakery_globals.ajax_url,
        data: data_vals + '&action=foodbakery_type_cats',
        success: function (response) {
            console.log(response);
            jQuery('#list_Cats').html(response);
        }
    });

}

$(document).on('click', 'a.foodbakery-dev-restaurant-delete', function () {
    "use strict";
    var deleting_restaurant,
            _this_ = $(this),
            _this_id = $(this).data('id'),
            ajax_url = $("#foodbakery-dev-user-restaurant").data('ajax-url'),
            this_parent = $('#user-restaurant-' + _this_id);
    _this_.html('<i class="icon-spinner"></i>');
    deleting_restaurant = $.ajax({
        url: ajax_url,
        method: "POST",
        data: {
            restaurant_id: _this_id,
            action: 'foodbakery_publisher_restaurant_delete'
        },
        dataType: "json"
    }).done(function (response) {
        if (typeof response.delete !== 'undefined' && response.delete == 'true') {
            this_parent.slideUp();
        }
        _this_.html('<i class="icon-close2"></i>');
    }).fail(function () {
        _this_.html('<i class="icon-close2"></i>');
    });
});

/**
 * show alert message
 */
function show_alert_msg(msg) {
    "use strict";
    jQuery('#publisher-dashboard .main-cs-loader').html('');
    jQuery('.cs_alerts').html('<div class="cs-remove-msg"><i class="icon-check-circle"></i>' + msg + '</div>');
    var classes = jQuery('.cs_alerts').attr('class');
    classes = classes + " active";
    jQuery('.cs_alerts').addClass(classes);
    setTimeout(function () {
        jQuery('.cs_alerts').removeClass("active");
    }, 4000);
}


/*HTML Functions Start*/
jQuery(document).ready(function () {



    /*
     * custom scroll oder detail popup.
     */
    if (jQuery(".menu-order-detail .modal-dialog .modal-content").length != '') {
        $(".menu-order-detail .modal-dialog .modal-content").mCustomScrollbar({
            setHeight: 724,
        });
    }
    /*
     * end custom scroll oder detail popup. 
     */

    /*Main Navigation Function Start*/
    if (jQuery(".main-navigation>ul").length != '') {
        if (typeof jQuery(document).slicknav != "undefined") {
            jQuery('.main-navigation>ul').slicknav({
                prependTo: '.main-nav'
            });
        }
    }
    if (jQuery('.main-location > ul > li:first-child').length != '') {
        $(".main-location > ul > li:first-child > ul li").wrapAll("<div class='max-location-height' />");
    }



    jQuery('.filter-toggle').click(function () {
        jQuery(this).toggleClass("active").next().slideToggle();
    });

    /*Sticky Search Bar Start*/
// 	function stickySearch() {
// 		if (jQuery('.field-holder.sticky-search').length != '') {
// 			var el = $('.field-holder.sticky-search');
// 			var stickyTop = $('.stickynav-tabs.nav-tabs').offset().top;
// 			var stickyHeight = $('.field-holder.sticky-search').height();
// 			var stickyWidth = $('.field-holder.sticky-search').width();
// 			var wpAdminBar = $('#wpadminbar').height();
// 			jQuery(".tabs-holder.horizontal").append('<span class="sticky-stop"></span>');
// 			if($("body").hasClass("logged-in")==true){
// 				stickyTop=stickyTop-40;
// 			}
// 			jQuery(window).scroll(function () {
// 				var limit = $('.sticky-stop').offset().top - stickyHeight - 20;
// 				var windowTop = $(window).scrollTop();
// 				if (stickyTop < windowTop) {
// 					el.css({position: 'fixed', top: '73px'});
// 					jQuery('.field-holder.sticky-search').css("width", stickyWidth);
// 					jQuery('.field-holder.sticky-search').css("margin-top", wpAdminBar);
// 					jQuery(".menu-itam-holder .menu-itam-list").css("margin-top", stickyHeight + wpAdminBar + 90);
// 				} else {
// 					el.css({position: 'relative', top: 0});
// 					jQuery('.field-holder.sticky-search').css("width", "100%");
// 					jQuery('.field-holder.sticky-search').css("margin-top", "0px");
// 					jQuery(".menu-itam-holder .menu-itam-list").css("margin-top", "0px");
// 				}
// 				if (limit < windowTop) {
// 					var diff = limit - windowTop - wpAdminBar;
// 					el.css({top: diff});
// 				}
// 			});
// 		}
// 	}
// stickySearch();
// $(window).resize(function(){
//     stickySearch();
// });	
// 	function stickynavtabs() {	
//     if (jQuery('.stickynav-tabs.nav-tabs').length != '') {
//         var el2 = $('.stickynav-tabs.nav-tabs');
//         var stickyTop2 = $('.stickynav-tabs.nav-tabs').offset().top;
//         var stickyHeight2 = $('.stickynav-tabs.nav-tabs').height();
//         var stickyWidth2 = $('.stickynav-tabs.nav-tabs').width();
//         var wpAdminBar2 = $('#wpadminbar').height();
//         jQuery(".tabs-holder.horizontal").append('<span class="sticky-stop"></span>');
//         if($("body").hasClass("logged-in")==true){
//             stickyTop2=stickyTop2-40;
//         }
//         jQuery(window).scroll(function () {
//             var limit = $('.sticky-stop').offset().top - stickyHeight2 - 20;
//             var windowTop = $(window).scrollTop();
//             if (stickyTop2 < windowTop) {
//                 el2.css({position: 'fixed', top: '30px'});
//                 jQuery('.stickynav-tabs.nav-tabs').css("width", stickyWidth2);
//                 jQuery('.stickynav-tabs.nav-tabs').css("margin-top", wpAdminBar2);
//                 jQuery(".menu-itam-holder .menu-itam-list").css("margin-top", stickyHeight2 + wpAdminBar2 + 90);
//             } else {
//                 el2.css({position: 'relative', top: 0});
//                 jQuery('.stickynav-tabs.nav-tabs').css("width", "100%");
//                 jQuery('.stickynav-tabs.nav-tabs').css("margin-top", "0px");
//                 // jQuery(".menu-itam-holder .menu-itam-list").css("margin-top", "0px");
//             }
//             if (limit < windowTop) {
//                 var diff = limit - windowTop - wpAdminBar2;
//                 el2.css({top: diff});
//             }
//         });
//     }
// }	
// stickynavtabs();
// $(window).resize(function(){
//     stickynavtabs();
// });

// 9man function

    function inherit(proto) {
        function F() {}
        F.prototype = proto
        return new F
    }
    var prevEleHeight;
    function stickyElement(element, width, eleOrder, elePos, stopTarget) {
        // properties
        this.element = element;
        this.width = width;
        this.order = eleOrder;
        this.offsetTop = element.offset().top;
        this.defualtWidth = element.parent().width();
        this.defualtPos = elePos;
        this.stopper = stopTarget;

        // Methods  
        this.defaultValues = function () {
            this.element.css({"position": "relative", "width": '100%', "top": "auto"});
            this.element.parent().css("height", 'auto');
        }
        this.setWidth = function () {
            if (this.element.parent().is(".sticky-wrpper") || this.element.parent()) {
                wrapWith = this.element.parent().width();
                this.element.css("width", wrapWith + 'px');
            }
        }
        this.elPosition = function () {
            this.element.css("position", "fixed");
        }
        this.setTop = function () {
            this.element.css("top", "0");
            if (this.order != undefined) {
                if (this.defualtPos == 'initialPos') {
                    this.element.css("top", this.offsetTop);
                } else if (this.defualtPos != undefined) {
                    this.element.css("top", this.defualtPos + 'px');
                }
                prevEleHeight = this.element.outerHeight();
            } else {
                this.element.css("top", prevEleHeight);
                prevEleHeight = prevEleHeight + prevEleHeight;
            }
        }
        this.addWrapper = function () {
            if (!this.element.parent().hasClass("sticky-wrpper")) {
                this.element.wrap("<div class='sticky-wrpper'></div>").height();
                this.element.parent().css("height", this.element.outerHeight(true) + 'px');
            }
        }
        this.addStoper = function () {
            if (this.stopper.find(".sticky-stopper").length == 0) {
                this.stopper.append("<span class='sticky-stopper'></span>");
            }
        }
        this.withResponsive = function () {

        }
    }
    if ($(".stickynav-tabs").length > 0) {
        var stickyHeader, stickySearch;
        var headerHeight = $("#header").outerHeight();
        stickyHeader = new stickyElement($(".stickynav-tabs"), 'initial', 'first', '15');
        stickySearch = new stickyElement($(".sticky-search"), 'initial', '', '58', $(".tab-content"));
        var eleTop, eleTop2

        eleTop = stickyHeader.offsetTop + headerHeight - 13;
        eleTop2 = stickySearch.offsetTop + headerHeight - 13;
        if ($("body").find("#wpadminbar").length) {
            stickyHeader = new stickyElement($(".stickynav-tabs"), '', 'first', '47');
            stickySearch = new stickyElement($(".sticky-search"), '', '', '90', $(".tab-content"));
            eleTop = stickyHeader.offsetTop + 25;
            eleTop2 = stickySearch.offsetTop + 25;
        }
        jQuery(window).scroll(function () {
            if ($(window).width() + 17 > 960) {
                var windowTop = $(window).scrollTop();
                if (windowTop >= eleTop) {
                    stickyHeader.elPosition();
                    stickyHeader.setTop();
                    stickyHeader.setWidth();
                    stickyHeader.addWrapper();

                    stickySearch.elPosition();
                    stickySearch.setTop();
                    stickySearch.setWidth();
                    stickySearch.addWrapper();
                    stickySearch.addStoper();
                    var stoperTop = $(".sticky-stopper").offset().top - 160;
                    if (windowTop >= stoperTop) {
                        stickyHeader.defaultValues();
                        stickySearch.defaultValues();
                    }
                } else {
                    stickyHeader.defaultValues();
                    stickySearch.defaultValues();
                }
            } else {
                stickyHeader.defaultValues();
                stickySearch.defaultValues();
            }
        });
        $(window).resize(function () {
            stickyHeader.setWidth();
            stickySearch.setWidth();
            if ($(window).width() + 17 < 960) {
                stickyHeader.defaultValues();
                stickySearch.defaultValues();
            }
        });

        /*sticky nav tabs func start*/
        jQuery(document).ready(function () {
            var stickyHeaders = (function () {
                var $window = $(window),
                        $stickies;
                var load = function (stickies) {
                    if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {
                        $stickies = stickies.each(function () {
                            var $thisSticky = $(this).wrap('<div class="followWrap" />');
                            $thisSticky
                                    .data('originalPosition', $thisSticky.offset().top)
                                    .data('originalHeight', $thisSticky.outerHeight())
                                    .parent()
                                    .height($thisSticky.outerHeight());
                        });
                        $window.off("scroll.stickies").on("scroll.stickies", function () {
                            _whenScrolling();
                        });
                    }
                };
                var _whenScrolling = function () {
                    $stickies.each(function (i) {
                        var $thisSticky = $(this),
                                $stickyPosition = $thisSticky.data('originalPosition');
                        if ($stickyPosition <= $window.scrollTop()) {
                            var $nextSticky = $stickies.eq(i + 1),
                                    $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');
                            $thisSticky.addClass("fixed");
                            if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
                                $thisSticky.addClass("absolute").css("top", $nextStickyPosition);
                            }
                        } else {
                            var $prevSticky = $stickies.eq(i - 1);
                            $thisSticky.removeClass("fixed");
                            if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
                                $prevSticky.removeClass("absolute").removeAttr("style");
                            }
                        }
                    });
                };
                return {
                    load: load
                };
            })();

            $(function () {
                stickyHeaders.load($(".stickynav-tabs.nav.nav-tabs"));
                $('.stickynav-tabs.nav.nav-tabs li').click(function () {
                    $('html,body').animate({
                        scrollTop: $(".back-to-t").offset().top},
                            'slow');
                });
            });
        });
        /*sticky nav tabs func end*/

    }


    /*Sticky Search Bar End*/
// Touch Behaviorr for Mobile devices
    if ($('.chosen-container').length > 0) {
        $('.chosen-container').on('touchstart', function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Trigger the mousedown event.
            $(this).trigger('mousedown');
        });
    }

    /*Main Navigation Function EnD*/
    /*Location Menu Function End*/
    /*Chosen Select Functions Start*/
    if (jQuery(".chosen-select, .chosen-select-deselect, .chosen-select-no-single, .chosen-select-no-results, .chosen-select-width").length != '') {
        var config = {
            '.chosen-select': {},
            '.chosen-select-deselect': {
                allow_single_deselect: true
            },
            '.chosen-select-no-single': {
                disable_search_threshold: 10
            },
            '.chosen-select-no-results': {
                no_results_text: 'Oops, nothing found!'
            },
            '.chosen-select-width': {
                width: "95%"
            }
        }
        for (var selector in config) {
            $(selector).chosen(config[selector]);
        }
    }
    ;
    /*Chosen Select Functions End*/
    /* Date Time picker */
    if (jQuery('#datetimepicker1').length != '') {
        jQuery('#datetimepicker1').datetimepicker({
            icons: {
                time: "icon-clock-o",
                date: "icon-calendar-o",
                up: " icon-chevron-up",
                down: "icon-chevron-down"
            }
        });
    }
    if (jQuery('#datetimepicker4').length != '') {
        jQuery('#datetimepicker4').datetimepicker({
            icons: {
                time: "icon-clock-o",
                date: "icon-calendar-o",
                up: " icon-chevron-up",
                down: "icon-chevron-down"
            }
        });
    }
    /*Location Menu Function Start*/
    "use strict";
    $('.main-location > ul > li.location-has-children > a').on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("menu-open");
        $(this).parent().siblings().removeClass('menu-open');
        setTimeout(function () {
            $('.main-location > ul > li.location-has-children > a').addClass('open-overlay');
        }, 2);
        $(this).parent().append("<div class='location-overlay'></div>");
        $(".main-location > ul > li > ul").append("<i class='icon-cross3 close-menu-location'></i>");
    });
    $(document).on("click", ".main-location > ul > li.location-has-children > a.open-overlay", function () {
        $(".location-overlay").remove();
        $(".close-menu-location").remove();
        setTimeout(function () {
            $('.main-location > ul > li.location-has-children > a').removeClass('open-overlay');
        }, 2);
    });
    $(document).on("click", ".location-overlay", function () {
        $(this).closest(".location-overlay").remove();
        $(".close-menu-location").remove();
        $('.main-location > ul > li.location-has-children').removeClass("menu-open");
        $('.main-location > ul > li.location-has-children > a').removeClass('open-overlay');
    });
    $(document).on("click", ".close-menu-location", function () {
        $(this).closest(".close-menu-location").remove();
        $(".location-overlay").remove();
        $('.main-location > ul > li.location-has-children').removeClass("menu-open");
        $('.main-location > ul > li.location-has-children > a').removeClass('open-overlay');
    });
    /*Location Menu Function End*/

    /*Reviews Sortby Functions Start*/
    $(document).on("click", ".reviews-sortby li.reviews-sortby-active", function () {
        jQuery('.reviews-sortby > li').siblings().removeClass('reviews-sortby-active');
    });
    jQuery('.input-reviews > .radio-field label').on('click', function () {
        jQuery(this).parent().toggleClass('active');
        jQuery(this).parent().siblings().removeClass('active');
        /*replace inner Html*/
        var radio_field_active = jQuery(this).html();
        jQuery(".active-sort").html(radio_field_active);
        jQuery('.reviews-sortby > li').removeClass('reviews-sortby-active');
    });
    /*Reviews Sortby Functions End*/
    if (jQuery(".company-holder.default .swiper-container").length != '') {
        var swiper = new Swiper('.company-holder.default .swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 6,
            slidesPerColumn: 1,
            autoplay: 3500,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            breakpoints: {
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                }
            }
        });
    }

    var swiper = new Swiper('.company-holder.fancy .swiper-container', {
        slidesPerView: 6,
        spaceBetween: 20,
        loop: true,
        nextButton: '.fancy-button-next',
        prevButton: '.fancy-button-prev',
    });

    /* blog Slider Start */
    if (jQuery(".blog .swiper-container").length != '') {
        var swiper = new Swiper('.blog .swiper-container', {
            slidesPerView: 'auto',
            loop: true,
            autoplay: 3500,
            autoplayDisableOnInteraction: false,
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'

        });
    }
    /*blog Detasil Slider Start*/
    if (jQuery(".blog-detail .swiper-container").length != '') {
        var swiper = new Swiper('.blog-detail .swiper-container', {
            loop: true,
            autoplay: 3500,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            paginationClickable: true,
            slidesPerView: 3,
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 30
                }
            }
        });

    }
    /* blog Slider End */
    /*Delivery Timing Dropdown Functions Start*/
    jQuery(".delivery-timing .reviews-sortby-active").on("click", function () {
        jQuery(this).next("ul").slideToggle();
        jQuery(this).parents("ul").toggleClass("open");
        jQuery('.delivery-dropdown > li > a').on('click', function (e) {
            e.preventDefault();
            var anchorText = $(this).text();
            jQuery(".delivery-timing .reviews-sortby-active small").text(anchorText);
            jQuery(".delivery-timing .reviews-sortby-active").next("ul").slideUp();
            jQuery(this).parents("ul").removeClass("open");
        });
    });
    jQuery(document).mouseup(function (e)
    {
        var container = jQuery(".delivery-timing > ul");
        if (!container.is(e.target)
                && container.has(e.target).length === 0)
        {
            jQuery(".delivery-timing .reviews-sortby-active").next("ul").hide();
            jQuery(".delivery-timing > ul").removeClass("open");
        }
    });
    /*Delivery Timing Dropdown Functions End*/

    if ($(window).width() > 991) {
        if (jQuery(".sticky-sidebar").length != '') {
            $('.sticky-sidebar')
                    .theiaStickySidebar({
                        additionalMarginTop: 30
                    });
        }
    }
    /*Sticky Function End*/

    /*Location Popup Function Start*/
    jQuery(document).on("click", "#pop-close", function () {
        jQuery('#popup').addClass('popup-open');
    });
    jQuery(document).on("click", "#close", function () {
        jQuery('#popup').removeClass('popup-open');
    });
    /*Location Popup Function End*/

});

function Listing_Filter_li() {

}
/*----------Window Load Function Start----------*/
jQuery(window).load(function () {

    //Listing_Filter_li();
    /*Masonry Function Start*/
    if (jQuery('.grid').length !== 0) {
        if (typeof jQuery(document).masonry != "undefined") {
            jQuery('.grid').masonry({
                itemSelector: '.grid-item',
            });
        }
    }
    /*Masonry Function End */

    /*Load More Functions Start*/
    jQuery(function () {
        jQuery(".review-listing > ul#mylist > li").slice(0, 3).show();
        jQuery("#load-more").click(function (e) {
            e.preventDefault();
            jQuery(".review-listing > ul#mylist > li:hidden").slice(0, 1).show();
            if (jQuery(".review-listing > ul#mylist > li:hidden").length == 0) {
                alert("No More Show");
            }
        });
    });
    /*Load More Functions End*/
});
/*HTML Functions End*/
function diretory_response_messages(modal_id, response_type, message_message) {
    //alert(response_type);
    //console.log(response_type);
    // foodbakery_show_loader('.modal-header');
    // foodbakery_show_response(response_type, '.modal-header');

//    modal_id = "#" + modal_id;
//    jQuery('.loader-response').remove();
//    if (response_type == 'error') {
//        jQuery(modal_id).find('.modal-header').append('<div class="loader-response  status status-message error"><div class="alert alert-danger"><button aria-hidden="true" data-dismiss="alert" type="button" class="close">×</button>' + message_message + '</div></div>');
//        // jQuery(modal_id).find('.modal-header').append('<div class="loader-response  error-case role="alert"><ul>'+message_message+'</ul></div>');
//    }
//    if (response_type == 'success') {
//        jQuery(modal_id).find('.modal-header').append('<div class="loader-response  status status-message success"><div class="alert alert-success"><button aria-hidden="true" data-dismiss="alert" type="button" class="close">×</button>' + message_message + '</div></div>');
//        //jQuery(modal_id).find('.modal-header').append('<div class="loader-response  success-case role="alert"><ul>'+message_message+'</ul></div>');
//    }

}
/*
 * captcha reload
 * 
 */
function captcha_reload(admin_url, captcha_id) {
    "use strict";
    var dataString = '&action=foodbakery_reload_captcha_form&captcha_id=' + captcha_id;
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        data: dataString,
        dataType: 'html',
        success: function (data) {
            jQuery("#" + captcha_id + "_div").html(data);

        }
    });
}
function foodbakery_multicap_all_functions() {
    all_elements = jQuery(".g-recaptcha");
    for (var i = 0; i < all_elements.length; i++) {
        var id = all_elements[i].getAttribute('id');
        var site_key = all_elements[i].getAttribute('data-sitekey');
        if (null != id) {
            grecaptcha.render(id, {
                'sitekey': site_key,
                'callback': function (resp) {
                    jQuery.data(document.body, 'recaptcha', resp);
                },
            });
        }
    }
}
/*
 * 
 * show login if user is not signed in
 */
jQuery(document).on("click", "#single_package_no", function ()

{
    foodbakery_show_popup('#sign-in');
});
/*
 * show login popup
 */
function foodbakery_show_popup(popup_id) {
    "use strict";
    $(popup_id).modal('show');
}
jQuery(document).on("click", ".cropControlRemoveCroppedImage", function () {
    jQuery("#cropContainerModal img").attr('src', '');
    jQuery("#foodbakery_publisher_profile_image").val('');
});


/*
 * Company Name based on Profile Type
 */

jQuery(document).on("change", ".foodbakery_profile_type", function () {
    current_val = jQuery(this).val();
    if (current_val == 'restaurant') {
        jQuery(".foodbakery-company-name").show();
    } else {
        jQuery(".foodbakery-company-name").hide();
    }
});

function foodbakery_user_permission($this, add_member_permission, condition) {
    'use strict'
    if (jQuery($this).val() == condition) {
        jQuery("." + add_member_permission).hide('slow');
    } else {
        jQuery("." + add_member_permission).show('slow');
    }
}

function foodbakery_page_load($this, redirecturl) {
    var selected_location = jQuery($this).val();
    document.location.href = redirecturl + "?location=" + selected_location;
}




/*
 * Validation Process by Form
 */
function foodbakery_validation_process(form_name) {
    var has_empty = new Array();
    var alert_messages = new Array();
    var radio_fields = new Array();
    var checkbox_fields = new Array();
    jQuery(form_name).find('.foodbakery-dev-req-field,.foodbakery-number-field,.foodbakery-email-field,.foodbakery-url-field,.foodbakery-date-field,.foodbakery-range-field').each(function (index_no) {
        is_visible = true;
        var thisObj = jQuery(this);
        var visible_id = thisObj.data('visible');
        has_empty[index_no] = false;
        if (foodbakery_is_field(visible_id) == true) {
            is_visible = jQuery("#" + visible_id).is(':hidden');
            if (jQuery("#" + visible_id).css('display') !== 'none') {
                is_visible = true;
            } else {
                is_visible = false;
            }
        }
        if (thisObj.attr('type') == 'checkbox') {
            thisObj = jQuery("#" + thisObj.attr('name'));
            if (thisObj.val() == 'off') {
                thisObj.val('');
            }
        }

        if (thisObj.attr('type') == 'radio') {
            var field_name = thisObj.attr('name');
            var is_field_checked = jQuery('input[name="' + field_name + '"]').is(':checked');
            if (is_field_checked == false) {
                radio_fields[index_no] = thisObj;
            }
            is_visible = false;
        }

        if (thisObj.attr('type') == 'checkbox') {
            var field_name = thisObj.attr('name');
            var is_field_checked = jQuery('input[name="' + field_name + '"]').is(':checked');
            if (is_field_checked == false) {
                checkbox_fields[index_no] = thisObj;
            }
            is_visible = false;
        }

        if (!thisObj.val() && is_visible == true) {
            if (thisObj.hasClass('foodbakery-dev-req-field')) {
                array_length = alert_messages.length;
                alert_messages[array_length] = foodbakery_insert_error_message(thisObj, alert_messages, '');
                has_empty[index_no] = true;
            }
        } else {
            if (is_visible == true) {
                has_empty[index_no] = foodbakery_check_field_type(thisObj, alert_messages, has_empty[index_no]);
            }
        }
        if (has_empty[index_no] == false) {
            thisObj.next('.chosen-container').removeClass('frontend-field-error');
            thisObj.next('.foodbakery-dev-req-field').next('.pbwp-box').removeClass('frontend-field-error');
            thisObj.removeClass('frontend-field-error');
            thisObj.closest('.jqte').removeClass('frontend-field-error');
        }

    });
    if (radio_fields.length > 0) {
        for (i = 0; i < radio_fields.length; i++) {
            var thisnewObj = radio_fields[i];
            array_length = alert_messages.length;
            alert_messages[array_length] = foodbakery_insert_error_message(thisnewObj, alert_messages, '');
        }
    }

    if (checkbox_fields.length > 0) {
        for (i = 0; i < checkbox_fields.length; i++) {
            var thisnewObj = checkbox_fields[i];
            array_length = alert_messages.length;
            alert_messages[array_length] = foodbakery_insert_error_message(thisnewObj, alert_messages, '');
        }
    }
    var error_messages = ' Required Fields<br><br>';
    if (has_empty.length > 0 && jQuery.inArray(true, has_empty) != -1) {
        array_length = alert_messages.length;
        for (i = 0; i < array_length; i++) {
            if (i > 0) {
                error_messages = error_messages + '<br>';
            }
            error_messages = error_messages + alert_messages[i];
        }
        //jQuery.growl.remove();
        var error_message = jQuery.growl.error({
            message: error_messages,
            duration: 10000,
        });
        return false;
    }
}

/*
 * Check if field exists and not empty
 */

function foodbakery_is_field(field_value) {
    if (field_value != 'undefined' && field_value != undefined && field_value != '') {
        return true;
    } else {
        return false;
    }
}

/*
 * Check if Provided data for field is valid
 */

function foodbakery_check_field_type(thisObj, alert_messages, has_empty) {
    /*
     * Check for Email Field
     */
    if (thisObj.hasClass('foodbakery-email-field')) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (!pattern.test(thisObj.val())) {
            array_length = alert_messages.length;
            alert_messages[array_length] = foodbakery_insert_error_message(thisObj, alert_messages, ' is not valid Email!');
            has_empty = true;
        }
    }

    /*
     * Check for Number Field
     */

    if (thisObj.hasClass('foodbakery-number-field')) {
        var pattern = /[0-9 -()+]+$/;
        if (!pattern.test(thisObj.val())) {
            array_length = alert_messages.length;
            alert_messages[array_length] = foodbakery_insert_error_message(thisObj, alert_messages, 'is not valid Number!');
            has_empty = true;
        }
    }

    /*
     * Check for URL Field
     */

    if (thisObj.hasClass('foodbakery-url-field')) {
        var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
        if (!pattern.test(thisObj.val())) {
            array_length = alert_messages.length;
            alert_messages[array_length] = foodbakery_insert_error_message(thisObj, alert_messages, 'is not valid URL!');
            has_empty = true;
        }
    }

    /*
     * Check for Date Field
     */

    if (thisObj.hasClass('foodbakery-date-field')) {
        //var pattern = /([0-9][1-2])\/([0-2][0-9]|[3][0-1])\/((19|20)[0-9]{2})/;
        var pattern = /^\d{1,2}.\d{1,2}.\d{4} \d{2}:\d{2}$/;
        if (!pattern.test(thisObj.val())) {
            array_length = alert_messages.length;
            alert_messages[array_length] = foodbakery_insert_error_message(thisObj, alert_messages, 'is not valid Date!');
            has_empty = true;
        }
    }

    /*
     * Check for Range Field
     */

    if (thisObj.hasClass('foodbakery-range-field')) {
        var min_val = thisObj.data('min');
        var max_val = thisObj.data('max');
        if (!(thisObj.val() >= min_val) || !(thisObj.val() <= max_val)) {
            array_length = alert_messages.length;
            alert_messages[array_length] = foodbakery_insert_error_message(thisObj, alert_messages, 'is not in Range! ( ' + min_val + ' - ' + max_val + ' )');
            has_empty = true;
        }
    }
    return has_empty;
}

/*
 * Making list of errors
 */

function foodbakery_insert_error_message(thisObj, alert_messages, error_msg) {

    thisObj.addClass('frontend-field-error');
    if (thisObj.is('select')) {
        thisObj.next('.chosen-container').addClass('frontend-field-error');
        var field_label = thisObj.closest('.field-holder').children('label').html();
        if (foodbakery_is_field(field_label) == false) {
            var field_label = thisObj.find(":selected").text();
        }
        if (foodbakery_is_field(field_label) == false) {
            var field_label = thisObj.closest('.foodbakery-dev-appended-cats').children().children().children('label').html();
        }

    } else {
        var field_label = thisObj.closest('.field-holder').children('label').html();

        if (typeof field_label === 'undefined') {
            var field_label = thisObj.attr('placeholder');
        }

    }
    if (thisObj.is(':hidden')) {
        thisObj.next('.foodbakery-dev-req-field').next('.pbwp-box').addClass('frontend-field-error');
    }

    if (thisObj.hasClass('foodbakery_editor')) {
        thisObj.closest('.jqte').addClass('frontend-field-error');
    }
    /*
     var field_label = thisObj.attr('name');
     var field_label = field_label.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) {
     return letter.toUpperCase();
     });
     field_label=field_label.replace(/(^\s+|[^a-zA-Z0-9 ]+|\s+$)/g," ");
     */
    var res = '';
    if (typeof field_label !== "undefined")
    {
        res = field_label.replace("*", " ");
    } else {
        res = 'Label / Placeholder is missing';
    }
    return '* ' + res + error_msg;
}
$(function () {
    $('#searchfiled').keyup(function () {

        var current_query = $('#searchfiled').val();
        current_query = current_query.toLowerCase();
        if (current_query !== "" && current_query.length > 1) {
            $(".list-group li").hide();
            $(".list-group li.select-location").show();
            $(".list-group li").each(function () {
                var current_keyword = $(this).text();
                current_keyword = current_keyword.toLowerCase();
                if (current_keyword.indexOf(current_query) >= 0) {
                    $(this).show();
                }
                ;
            });
        } else {
            $(".list-group li").hide();
        }
        ;
    });
});



$(document).on('focusout', '.foodbakery-locations-field', function () {
    //jQuery('.foodbakery-all-locations').html('');
});

/*
 * chosen selection box
 */

function chosen_selectionbox() {
    if (jQuery('.chosen-select, .chosen-select-deselect, .chosen-select-no-single, .chosen-select-no-results, .chosen-select-width').length != '') {
        var config = {
            '.chosen-select': {width: "100%"},
            '.chosen-select-deselect': {allow_single_deselect: true},
            '.chosen-select-no-single': {disable_search_threshold: 10, width: "100%"},
            '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
            '.chosen-select-width': {width: "95%"}
        }
        for (var selector in config) {
            jQuery(selector).chosen(config[selector]);
        }
    }
}

jQuery(document).on('change', '#foodbakery_currency-id', function () {
    var field_value = jQuery(this).val();
    jQuery.ajax({
        type: "POST",
        url: foodbakery_globals.ajax_url,
        data: 'currency_id=' + field_value + '&action=foodbakery_change_user_currency',
        dataType: 'html',
        success: function (response) {
            location.reload(true);
        }
    });
});


jQuery(document).on("click", ".foodbakery-subscribe-pkg", function () {
    //var id = jQuery(this).data('id');
    //jQuery('#response-' + id).slideDown();
    jQuery.ajax({
        type: "POST",
        url: foodbakery_globals.ajax_url,
        data: 'action=become_publisher_warning_message',
        dataType: 'json',
        success: function (response) {
            foodbakery_show_response(response);
        }
    });
});


function get_filter_parameters() {
    var date_range = jQuery('.user-holder').find('#date_range').val();
    var filter_status = jQuery('.user-holder').find('#filter_status').val();
    var sort_by = jQuery('.user-holder').find(".reviews-sort-dropdown .radio-field.active input[name='review']").val();
    var filter_var = '';
    if (typeof date_range != 'undefined' && date_range !== '') {
        filter_var += '&date_range=' + date_range;
    }
    if (typeof filter_status != 'undefined' && filter_status !== '') {
        filter_var += '&status=' + filter_status;
    }
    if (typeof sort_by != 'undefined' && sort_by !== '') {
        filter_var += '&sort_by=' + sort_by;
    }
    return filter_var;
}

jQuery(document).on("click", ".redirect-button-click", function () {
    //foodbakery_show_loader('.loader-holder');
});
jQuery(document).on("click", ".update-membership", function () {
    var thisObj = jQuery('#update-membership-holder');
    foodbakery_show_loader('#update-membership-holder', '', 'button_loader', thisObj);
});
jQuery(document).on("click", ".update-menu-items", function () {
    var thisObj = jQuery('#update-menu-items-holder');
    foodbakery_show_loader('#update-menu-items-holder', '', 'button_loader', thisObj);
});


(function ($) {
    $(document).ready(function () {
        if (jQuery('.order-detail .modal-dialog .modal-content').length > 0) {
            $(".order-detail .modal-dialog .modal-content").mCustomScrollbar({
                setHeight: 724,
                theme: "minimal-dark",
                mouseWheelPixels: 100
            });
        }
    });
})(jQuery);

/*
 * Job Delete Function
 */
function cs_remove_profile(admin_url, u_id, template) {
    "use strict";
    document.getElementById('id_confrmdiv').style.display = "block"; //this is the replace of this line
    document.getElementById('id_truebtn').onclick = function () {
        var dataString;
        dataString = 'template_name=' + template + '&u_id=' + u_id + '&action=cs_remove_profile';
        if (template == 'restaurant') {
            //cs_data_loader_load('#candidate-dashboard .main-cs-loader');
        } else {
            //cs_data_loader_load('#employer-dashboard .main-cs-loader');
        }
        jQuery.ajax({
            type: "POST",
            url: admin_url,
            data: dataString,
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response.status == 'success') {
                    document.location.href = response.redirecturl;
                } else {
                    alert(response.message);
                }
            }
        });
        document.getElementById('id_confrmdiv').style.display = "none";
        return false;
    };

    document.getElementById('id_falsebtn').onclick = function () {
        document.getElementById('id_confrmdiv').style.display = "none";
        return false;
    };
}