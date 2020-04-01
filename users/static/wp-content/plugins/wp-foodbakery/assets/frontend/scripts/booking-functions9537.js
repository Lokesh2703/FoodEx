

function foodbakery_booking_submit() {


    var returnType = foodbakery_validation_process("#booking-form");
    if (returnType == false) {
        return false;
    }

    jQuery('#booking-form button').prop('disabled', true);
    //jQuery('#booking-form .booking-loader').html('<img src="' + foodbakery_globals.plugin_dir_url + 'assets/frontend/images/ajax-loader.gif" alt="loader">');
    jQuery(".booking-submit-btn")
    var serializedValues = jQuery("#booking-form").serialize();
    
    thisObj     = jQuery('.booking-submit-btn');
    foodbakery_show_loader('.booking-submit-btn', '', 'button_loader',thisObj);
    
    jQuery.ajax({
	type: "POST",
	url: foodbakery_globals.ajax_url,
	dataType: 'json',
	data: serializedValues + '&action=foodbakery_booking_submit',
	success: function (response) {
	    jQuery('#booking-form button').prop('disabled', false);
	    jQuery('#booking-form .booking-loader').html('');
	    foodbakery_show_response(response,'',thisObj);
	}
    });
}

function foodbakery_order_detail(booking_id, type) {

    foodbakery_show_loader('.loader-holder');
    jQuery(this).addClass('active');
    jQuery.ajax({
	type: "POST",
	url: foodbakery_globals.ajax_url,
	data: 'action=foodbakery_order_detail&booking_id=' + booking_id + '&type=' + type,
	success: function (response) {
	    foodbakery_hide_loader('.loader-holder');
	    jQuery('.user-holder').html(response);
	}
    });
}

function foodbakery_update_booking_status(thisObj, order_id, admin_url) {
    jQuery('.booking-status-loader-' + order_id + '').html('<img src="' + foodbakery_globals.plugin_dir_url + 'assets/frontend/images/ajax-loader.gif" alt="loader">');
    jQuery.ajax({
	type: "POST",
	url: admin_url,
	dataType: 'json',
	data: 'action=foodbakery_update_booking_status&order_id=' + order_id + '&order_status=' + thisObj.value,
	success: function (response) {
            jQuery('.booking-status-loader-' + order_id + '').html('');
	    foodbakery_show_response(response);
	}
    });
}

function foodbakery_bookings(thisObj, actionString) {
    var pageNum = 1;
    foodbakery_show_loader('.loader-holder');
    var filter_parameters = get_filter_parameters();
    if (typeof (ajaxRequest) != 'undefined') {
        ajaxRequest.abort();
    }
    ajaxRequest = jQuery.ajax({
        type: "POST",
        url: foodbakery_globals.ajax_url,
        data: 'page_id_all=' + pageNum + '&action=' + actionString + filter_parameters,
        success: function (response) {
            foodbakery_hide_loader();
            jQuery('.user-holder').html(response);

        }
    });
}