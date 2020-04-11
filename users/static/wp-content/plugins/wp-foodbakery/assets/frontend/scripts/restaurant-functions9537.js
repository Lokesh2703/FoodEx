var restaurantFilterAjax;

function foodbakery_restaurant_map_setter(counter, restaurants) {
    var name = "foodbakery_restaurant_map_" + counter;
    var func = new Function(
	    "return " + name + "(" + restaurants + ");"
	    )();
}

function top_map_change_cords(counter) {
    var top_map = jQuery('.foodbakery-ontop-gmap');
    if (top_map.length !== 0) {
	var this_frm = jQuery("#frm_restaurant_arg" + counter);
	var ajax_url = foodbakery_globals.ajax_url;
	var loading_top_map = $.ajax({
	    url: ajax_url,
	    method: "POST",
            //data: 'ajax_filter=true&map=top_map&action=foodbakery_top_map_search&' + this_frm.serialize(),
	    data: 'map=top_map&action=foodbakery_top_map_search&' + this_frm.serialize(),
	    dataType: "json"
	}).done(function (response) {
	    if (typeof response.html !== 'undefined') {
		jQuery('.top-map-action-scr').html(response.html);
	    }
	}).fail(function () {
	});
    }
}

jQuery(document).ready(function () {
    jQuery(function () {
	var $checkboxes = jQuery("input[type=checkbox]");
	$checkboxes.on('change', function () {
	    var ids = $checkboxes.filter(':checked').map(function () {
		return this.id;
	    }).get().join(',');
	    jQuery('#hidden_input').val(ids);
	});
    });
});

function restaurants_sort_by(css_class, counter) {
    $(".order-sort-results ul li").removeClass("active");
    $("." + css_class).parent().addClass('active');
    foodbakery_restaurant_content(counter);
    return false;
}

function foodbakery_restaurant_content(counter) {
    counter = counter || '';
    var restaurant_arg = jQuery("#restaurant_arg" + counter).html();
    var this_frm = jQuery("#frm_restaurant_arg" + counter);

    var ads_list_count = jQuery("#ads_list_count_" + counter).val();
    var ads_list_flag = jQuery("#ads_list_flag_" + counter).val();
    var list_flag_count = jQuery("#ads_list_flag_count_" + counter).val();

    //jQuery('html, body').animate({scrollTop: jQuery('#foodbakery-restaurant-content-' + counter).parent().parent().offset().top - 100}, 'slow');
    //var data_vals = jQuery(jQuery("#frm_restaurant_arg" + counter)[0].elements).not(":input[name='alerts-email'], :input[name='alert-frequency']").serialize();
	if ( jQuery("#frm_restaurant_arg" + counter).length < 1 ) { return; }
    var data_vals = jQuery(jQuery("#frm_restaurant_arg" + counter)[0].elements).not(":input[name='alerts-email'], :input[name='alert-frequency'], :input[name='restaurant_type'], :input[name='restaurant_timings_checkbox'], :input[name='restaurant_pre_order_checkbox']").serialize();
	
    data_vals = data_vals.replace(/[^&]+=\.?(?:&|$)/g, ''); // remove extra and empty variables
    var sort_by = $(".order-sort-results ul li.active a").data('key');
    if (typeof sort_by == "undefined") {
		sort_by = "alphabetical";
    }
    //data_vals = data_vals + '&ajax_filter=true&sort-by=' + sort_by;
    data_vals = data_vals + '&sort-by=' + sort_by;

    //foodbakery_show_loader('#foodbakery-restaurant-content-' + counter);

    if (!jQuery('body').hasClass('foodbakery-changing-view')) {
	// top map
	top_map_change_cords(counter);
    }

    jQuery('#Restaurant-content-' + counter + ' .listing').addClass('slide-loader');

    jQuery('#foodbakery-data-restaurant-content-' + counter + ' .all-results').addClass('slide-loader');
    //foodbakery_show_loader('#foodbakery-data-restaurant-content-' + counter);
    if (typeof (restaurantFilterAjax) != 'undefined') {
	restaurantFilterAjax.abort();
    }
    restaurantFilterAjax = jQuery.ajax({
	type: 'POST',
	dataType: 'HTML',
	url: foodbakery_globals.ajax_url, 
	data: data_vals + '&action=foodbakery_restaurants_content&restaurant_arg=' + restaurant_arg,
	success: function (response) {
	    jQuery('body').removeClass('foodbakery-changing-view');
	    jQuery('#Restaurant-content-' + counter).html(response);
            //replace double & from string
            data_vals = data_vals.replace("&&", "&");
	    var current_url = location.protocol + "//" + location.host + location.pathname + "?" + data_vals; //window.location.href;
	    window.history.pushState(null, null, decodeURIComponent(current_url));
	    /*jQuery(".listing-filter ul.filter-list li").slice(0, 8).show();
	     jQuery(".seemore-btn").click(function (e) {
	     e.preventDefault();
	     jQuery(".listing-filter ul.filter-list li:hidden").slice(0, 5).show();
	     if (jQuery(".listing-filter ul.filter-list li:hidden").length == 0) {
	     alert("No More Show");
	     }
	     });*/
	    if (typeof bind_checkbox_event == 'function') {
		bind_checkbox_event(); // if function exists then execute this
	    }
	    //bind_checkbox_event();

	    jQuery(".chosen-select").chosen();
	    jQuery('#foodbakery-data-restaurant-content-' + counter + ' .all-results').removeClass('slide-loader');
	    foodbakery_hide_loader();
	}
    });
}
function refresh_form(counter) {
    jQuery(':input', "#frm_restaurant_arg" + counter)
	    .not(":input[name='restaurant_type']")
	    .val('')
	    .removeAttr('checked')
	    .removeAttr('selected');
}
function foodbakery_empty_loc_polygon(counter) {
    if (jQuery("#frm_restaurant_arg" + counter + " input[name=loc_polygon]").length) {
	jQuery("#frm_restaurant_arg" + counter + " input[name=loc_polygon]").val('');
    }
}
function foodbakery_restaurant_view_switch(view, counter, restaurant_short_counter) {
    foodbakery_show_loader('.page-content');
    jQuery.ajax({
	type: 'POST',
	dataType: 'HTML',
	url: foodbakery_globals.ajax_url,
	data: '&action=foodbakery_restaurant_view_switch&view=' + view + '&restaurant_short_counter=' + restaurant_short_counter,
	success: function () {
	    jQuery('body').addClass('foodbakery-changing-view');
	    foodbakery_restaurant_content(counter);
	}
    });
}
function foodbakery_restaurant_pagenation_ajax(page_var, page_num, counter,view_type) {
	 "use strict";
    var view_type = view_type || '';
    jQuery('html, body').animate({
        scrollTop: jQuery("#foodbakery-restaurant-content-" + counter).offset().top - 120
    }, 1000);
    jQuery('#' + page_var + '-' + counter).val(page_num);
	
    foodbakery_restaurant_content(counter,view_type);
}
//function foodbakery_filter_locations_ajax(field_id, action) {
//
//    
//            alert("ddddd in function");
//            chosen_ajaxify(field_id, foodbakery_globals.ajax_url, action);
//       
//
//
////    alert("Ssss");
////    var newOption = $('<option value="1">test</option>');
////    jQuery('#filter-location-box').append(newOption);
////    jQuery('.chosen-select').chosen();
//}



