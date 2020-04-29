
function foodbakery_update_order_status( thisObj, order_id, admin_url ){
    jQuery('#order-det-'+ order_id +' .btn-print').prop('disabled', true);
    jQuery('.order-status-loader-'+ order_id +'').html('<img src="' + foodbakery_globals.plugin_dir_url + 'assets/frontend/images/ajax-loader.gif" alt="loader">');
    jQuery.ajax({
        type: "POST",
        url: admin_url,
        dataType: 'json',
        data: 'action=foodbakery_update_order_status&order_id='+ order_id +'&order_status='+ thisObj.value,
        success: function ( response ) {
            jQuery('.order-status-loader-'+ order_id +'').html('');
            jQuery('#print-order-det-'+ order_id +' .order-status').find('p').html(response.status);
            jQuery('#order-det-'+ order_id +' .btn-print').prop('disabled', false);
            foodbakery_show_response( response );
        }
    });
}

function foodbakery_orders(thisObj, actionString) {
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