var restaurantCategoryFilterAjax;
function foodbakery_load_category_models(selected_val, post_id, main_container, load_saved_value) {
    'use strict';
    alert(selected_val + "," + post_id);
    if (selected_val != '') {
    var data_vals = '';
    if (typeof (restaurantCategoryFilterAjax) != 'undefined') {
        restaurantCategoryFilterAjax.abort();
    }
    var foodbakery_restaurant_category = jQuery("#foodbakery_restaurant_category").val();
    restaurantCategoryFilterAjax = jQuery.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: foodbakery_globals.ajax_url,
        data: data_vals + '&action=foodbakery_meta_restaurant_categories&selected_val=' + selected_val + '&post_id=' + post_id + '&foodbakery_restaurant_category=' + foodbakery_restaurant_category + '&load_saved_value=' + load_saved_value,
        success: function (response) {
            alert(response.html);
            jQuery("." + main_container).html(response.html);
            jQuery(".chosen-select").chosen();
            jQuery("#foodbakery_restaurant_category").val(response.hidden_value);
            //console.log(response);
           jQuery('#Restaurant-content-' + counter).html(response);

        }
    });
    }
}