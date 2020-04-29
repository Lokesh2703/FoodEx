var $ = jQuery;

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function foodbakery_add_menu_cat(menu_item_counter) {
    jQuery('#add-menu-cat-from-' + menu_item_counter).slideToggle();
    if (jQuery('#add-menu-cat-from-' + menu_item_counter).is(':visible')) {
	jQuery('#restaurant-cats-btn-' + menu_item_counter).hide();
    } else {
	jQuery('#restaurant-cats-btn-' + menu_item_counter).show();
    }
}

function foodbakery_close_menu_cat(menu_item_counter) {
    jQuery('#add-menu-cat-from-' + menu_item_counter).slideUp();
    jQuery('#restaurant-cats-btn-' + menu_item_counter).show();
}

function foodbakery_add_menu_item(menu_item_counter) {

    if (!jQuery('#add-menu-item-from-' + menu_item_counter).is(':visible')) {
	jQuery('#add-menu-item-from-' + menu_item_counter).slideToggle();
	jQuery('#restaurant-menu-items-btn-' + menu_item_counter).hide();

    } else {
	jQuery('#add-menu-item-from-' + menu_item_counter).slideToggle();
    }
}
function foodbakery_close_menu_lists(menu_item_counter) {
    jQuery('#add-menu-item-from-' + menu_item_counter).slideUp();
    jQuery('#restaurant-menu-items-btn-' + menu_item_counter).show();
}

function foodbakery_remove_menu_item(menu_item_counter) {
    console.log(menu_item_counter);
    jQuery('.menu-item-' + menu_item_counter).remove();
}

function foodbakery_admin_add_menu_cat_to_list(menu_item_counter) {
    var menu_cat_title = $('#menu_item_title_' + menu_item_counter);
    var menu_cat_desc = $('#menu_item_desc_' + menu_item_counter);
    var this_loader = $('#menu-cats-loader-' + menu_item_counter);
    var this_append = $('#restaurant-cats-list-' + menu_item_counter);
    var title = menu_cat_title.val();
    var pattern = /^[a-zA-Z0-9]+$/;
    if (title == '') {
	var response = {
	    type: 'error',
	    msg: 'Please fill the required * fields.'
	};
	foodbakery_show_response(response);

    } else {
	var thisObj = jQuery('.add-menu-item.add-menu-item-list');
	foodbakery_show_loader('.add-menu-item.add-menu-item-list', '', 'button_loader', thisObj);
	$.ajax({
	    url: foodbakery_globals.ajax_url,
	    method: "POST",
	    data: '_menu_cat_title=' + menu_cat_title.val() + '&_menu_cat_desc=' + menu_cat_desc.val() + '&action=restaurant_add_menu_cat_item',
	    dataType: "json"
	}).done(function (response) {
	    this_append.append(response.html);
	    menu_cat_title.val('');
	    menu_cat_desc.val('');
	    foodbakery_show_response(response, '', thisObj);
	    jQuery('#restaurant-cats-btn-' + menu_item_counter).show();
            jQuery('#restaurant-cats-list-' + menu_item_counter).show();
            jQuery('.menu-items-list-holder .not-found').hide();
	}).fail(function () {
	    foodbakery_show_response('', '', thisObj);
	});
	setTimeout(function () {
	    jQuery('#add-menu-cat-from-' + menu_item_counter).slideUp();
	    jQuery('#no-menu-cats-' + menu_item_counter).remove();
	}, 500);
    }
}

function foodbakery_add_menu_item_to_list(restaurant_counter, menu_item_counter, action) {

    var serializedValues = jQuery('#foodbakery-dev-restaurant-form-' + restaurant_counter + '').serialize();
    var restaurant_menu = jQuery('#restaurant_menu_' + menu_item_counter).val();
    var menu_item_title = jQuery('#menu_item_title_' + menu_item_counter).val();
    var menu_item_price = jQuery('#menu_item_price_' + menu_item_counter).val();
    var menu_item_icon = jQuery('#hiden-img-val-' + menu_item_counter).val();
    var menu_item_nutri_res = document.getElementsByName('menu_item_nutri_info[]');
    var menu_item_nutri = [];
    for (var i = 0; i < menu_item_nutri_res.length; i++) {
	menu_item_nutri_res[i].checked ? menu_item_nutri.push(menu_item_nutri_res[i].value) : "";
    }

    var menu_item_desc = jQuery('#menu_item_desc_' + menu_item_counter).val();
    var current_restaurant_menu = jQuery('#current_restaurant_menu_' + menu_item_counter).val();

    var valid_price = /^\d{0,6}(\.\d{0,2})?$/.test(menu_item_price);

    if (menu_item_title == 'undefined' || menu_item_title == '' && menu_item_price == 'undefined' || menu_item_price == '') {
	var response = {
	    type: 'error',
	    msg: foodbakery_restaurant_strings.compulsory_fields
	};
	foodbakery_show_response(response);
	return false;
    } else if (!valid_price) {
	var response = {
	    type: 'error',
	    msg: foodbakery_restaurant_strings.valid_price_error
	};
	foodbakery_show_response(response);
	return false;
    } else {
	if (action == 'edit' && restaurant_menu == current_restaurant_menu) {
	    jQuery('#add-menu-item-from-' + menu_item_counter).slideUp();
	} else {
	    var thisObj = jQuery('.add-menu-item.add-menu-item-list-' + menu_item_counter);
	    foodbakery_show_loader('.add-menu-item.add-menu-item-list-' + menu_item_counter, '', 'button_loader', thisObj);

	    //jQuery('#menu-item-loader-' + restaurant_counter).html('<div class="loader-holder"><img src="' + foodbakery_globals.plugin_dir_url + 'assets/frontend/images/ajax-loader.gif" alt=""></div>');

	    var adding_time_items = serializedValues + '&action=foodbakery_add_menu_item_to_list' +
		    '&restaurant_ad_counter=' + restaurant_counter +
		    '&menu_item_counter=' + menu_item_counter +
		    '&restaurant_id=' + jQuery('input[name="restaurant_id"]').val() +
		    '&menu_item_add_action=' + action;

	    if (action == 'add') {
		adding_time_items += '&restaurant_menu=' + encodeURIComponent(restaurant_menu) +
			'&menu_item_title=' + menu_item_title +
			'&menu_item_price=' + menu_item_price +
			'&menu_item_icon=' + menu_item_icon +
			'&menu_item_nutri=' + menu_item_nutri +
			'&menu_item_desc=' + menu_item_desc;
	    }

	    jQuery.ajax({
		type: "POST",
		url: foodbakery_globals.ajax_url,
		dataType: 'json',
		data: adding_time_items,
		success: function (response) {
		    var parent_list_id = '#restaurant_menu_items-list-' + restaurant_counter;

		    jQuery('#restaurant-menu-items-btn-' + restaurant_counter).show();

		    //
		    if (action == 'edit') {
			var current_restaurant_menu_slug = current_restaurant_menu.replace(' ', '-').toLowerCase();
			var current_restaurant_menu_slug = current_restaurant_menu_slug.replace('&', '');
			current_restaurant_menu_slug = current_restaurant_menu_slug.replace(/\//g, "-");
			var find_current_menu_li = jQuery(parent_list_id + ' li#menu-' + current_restaurant_menu_slug + ' ul.menu-items-list > li').length;
			if (find_current_menu_li > 1) {
			    jQuery('li.menu-item-' + menu_item_counter).remove();
			} else {
			    jQuery('li#menu-' + current_restaurant_menu_slug).remove();
			}
		    }
		    //
		    jQuery('input[name^="menu_item_nutri_info"]').prop('checked', false);
		    jQuery('#add-menu-item-from-' + restaurant_counter).find('.nutri-info-icons').find('li').removeAttr('class');
		    //
		    var restaurants_menu_slug = restaurant_menu.replace(' ', '-').toLowerCase();
		    var restaurants_menu_slug = restaurants_menu_slug.replace('&', '');
		    restaurants_menu_slug = restaurants_menu_slug.replace(/\//g, "-");
		    var find_menu_li = jQuery(parent_list_id + ' li#menu-' + restaurants_menu_slug + '').length;
		    jQuery('#no-menu-items-' + restaurant_counter).remove();
		    if (find_menu_li > 0) {
			jQuery(parent_list_id + ' li#menu-' + restaurants_menu_slug + ' ul.menu-items-list').append(response.html);
		    } else {
			jQuery(parent_list_id).append('<li id="menu-' + restaurants_menu_slug + '">\n\
                                <ul class="menu-items-list">\n\
                                    <div class="element-title">\n\
                                        <h5 class="text-color">' + restaurant_menu + '</h5>\n\
                                    </div>\n\
                                    ' + response.html + '\n\
                                </ul>\n\
                          </li>');
		    }
		    //jQuery('#menu-item-loader-' + restaurant_counter).html('');
		    foodbakery_empty_fields_afet_add(restaurant_counter, menu_item_counter, action);
		    foodbakery_show_response(response, '', thisObj);
		}
	    });
	}
    }
}

function foodbakery_empty_fields_afet_add(restaurant_counter, menu_item_counter, action) {
    if (action == 'add') {
	jQuery('#menu_item_title_' + menu_item_counter).val('');
	jQuery('#menu_item_price_' + menu_item_counter).val('');
	jQuery('#menu_item_desc_' + menu_item_counter).val('');
	jQuery('.menu-item-icon-' + menu_item_counter).val('');
	jQuery('#add-menu-item-from-' + restaurant_counter).slideUp();
	jQuery('#menu-item-extra-list-' + menu_item_counter).empty();
    }
}

function foodbakery_close_menu_item(restaurant_counter, menu_item_counter) {
    jQuery('#add-menu-item-from-' + menu_item_counter).slideUp();
}

function foodbakery_add_menu_item_extra(restaurant_counter, menu_item_counter) {
    var count_extra_li_con = jQuery('#menu-item-extra-list-' + menu_item_counter);
    var thisObj = count_extra_li_con.parents('div.row').find('.add-menu-item-extra');

    foodbakery_show_loader('.add-menu-item-extra-' + menu_item_counter, '', 'button_loader', thisObj);
    var count_extra_li = jQuery('#menu-item-extra-list-' + menu_item_counter + ' > li').length;
    count_extra_inner_li = 0;
    if(count_extra_li > 0){
        
        var totaalBreedte = count_extra_li;
        var menuBreedte = 1;
        var count_extra_inner_li = totaalBreedte - menuBreedte; 
    }
   
    jQuery.ajax({
	type: "POST",
	url: foodbakery_globals.ajax_url,
	dataType: 'json',
	data: 'action=foodbakery_restaurant_menu_items_extra_fields&restaurant_ad_counter=' + restaurant_counter + '&menu_item_counter=' + menu_item_counter + '&count_extra_li=' + count_extra_li+ '&count_extra_inner_li=' + count_extra_inner_li,

	success: function (response) {
	    jQuery('#menu-item-extra-list-' + menu_item_counter).append(response.html);
	    //foodbakery_show_response(response);
	    foodbakery_show_response(response, '', thisObj);
	}
    });
}

function add_more_extra_option(restaurant_counter, menu_item_counter, title, price, currency_sign, count_extra_li, count_extra_inner_li) {
   var count_extra_inner_li_next    = parseInt(count_extra_inner_li)+1;//count_extra_inner_li;
    jQuery('#menu-item-extra-fields-' + menu_item_counter + count_extra_li+count_extra_inner_li).closest('.row').append('<ul id="menu-item-extra-fields-' + menu_item_counter + count_extra_li+count_extra_inner_li_next+'" class="menu-item-extra-fields"><li id="menu-item-extra-field-' + menu_item_counter + count_extra_li +count_extra_inner_li_next+ '" class="menu-item-extra-field">\n\
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\n\
                <div class="row">\n\
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">\n\
                        <div class="field-holder">\n\
                            <label>' + title + '</label>\n\
                            <input class="menu-item-extra-title" id="menu_item_extra_title_' + menu_item_counter + '" name="menu_item_extra[' + menu_item_counter + '][' + count_extra_li + '][title][]" type="text" value="" placeholder="' + title + '">\n\
                        </div>\n\
                    </div>\n\
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">\n\
                        <div class="field-holder">\n\
                            <label>' + price + ' (' + currency_sign + ')</label>\n\
                            <input class="menu-item-extra-price" id="menu_item_extra_price_' + menu_item_counter + '" name="menu_item_extra[' + menu_item_counter + '][' + count_extra_li + '][price][]" type="text" value="" placeholder="' + price + '">\n\
                        </div>\n\
                    </div>\n\
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">\n\
                        <div class="menu-item-extra-options">\n\
                            <label>&nbsp;</label>\n\
                            <a href="javascript:void(0);" onClick="add_more_extra_option(\'' + restaurant_counter + '\',\'' + menu_item_counter + '\',\'' + title + '\',\'' + price + '\',\'' + currency_sign + '\',\'' + count_extra_li + '\',\'' + count_extra_inner_li_next + '\');">+</a>\n\
                            <a href="javascript:void(0);" onClick="remove_more_extra_option(\'' + restaurant_counter + '\',\'' + menu_item_counter + '\',\'' + count_extra_li + '\',\'' + count_extra_inner_li_next + '\');">-</a>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
      </li></ul>'
    );
}

function remove_more_extra_option(restaurant_counter, menu_item_counter, count_extra_li, count_extra_inner_li) {
    jQuery('#menu-item-extra-field-' + menu_item_counter + count_extra_li + count_extra_inner_li).remove();
}


$(document).on("click", ".browse-menu-icon-img", function () {
    var this_id = $(this).attr('data-id');
    $('#image-icon-' + this_id).trigger('click');
});

$(document).on("change", ".browse-menu-icon-file", function () {
    var this_id = $(this).attr('data-id');

    var thisObj = $('#browse-menu-icon-img-' + this_id);
    foodbakery_show_loader('#browse-menu-icon-img-' + this_id, '', 'button_loader', thisObj);

    var data = new FormData();
    data.append('menu_item_icon_file', $(this).prop('files')[0]);
    data.append('action', 'restaurant_menu_add_icon_img');

    $.ajax({
	type: 'POST',
	processData: false,
	contentType: false,
	data: data,
	url: foodbakery_globals.ajax_url,
	dataType: 'json',
    }).done(function (response) {
	if (typeof response.attach_id !== 'undefined' && response.attach_id != '') {
	    $('#hiden-img-val-' + this_id).val(response.attach_id);
	    $('#img-val-base-' + this_id).attr('src', response.attach_src);
	    $('#browse-btn-sec-' + this_id).hide();
	    $('#browse-img-sec-' + this_id).show();
	}
	foodbakery_show_response(response, '', thisObj);
    }).fail(function () {

    });
});

$(document).on("click", ".icon-img-holder .remove-icon", function () {
    var this_id = $(this).attr('data-id');
    $('#hiden-img-val-' + this_id).val('');
    $('#browse-btn-sec-' + this_id).show();
    $('#browse-img-sec-' + this_id).hide();
});

$(document).on("click", ".nutri-info-icons > ul > li", function () {
    var this_chekbox = $(this).find('input[type="checkbox"]');
    if (this_chekbox.is(':checked')) {
	$(this).addClass('active');
    } else {
	$(this).removeClass('active');
    }
});
function remove_more_extra_option_heading_extra(key, menu_item_counter, count_extra_li) {
   jQuery('.remove_extra_li_'+key).closest("li").remove();	
}
function remove_more_extra_option_heading(key, menu_item_counter, count_extra_li) {
   
    jQuery('#extra_li_' + key).remove();
}