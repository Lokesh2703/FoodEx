/*
 * 
 * Foodbakery Publisher Added Shortlist function
 */
function foodbakery_publisher_shortlist(thisObj, listing_id, publisher_id, shortlist, shortlisted, before_icon,after_icon) {

    "use strict";
    var shortlist_icon_class = jQuery(thisObj).find("i").attr('class');
    
    var loader_class = 'icon-spinner icon-spin';
    jQuery(thisObj).find("i").removeClass(shortlist_icon_class).addClass(loader_class);
    var dataString = 'listing_id=' + listing_id + '&publisher_id=' + publisher_id + '&action=foodbakery_shortlist_submit';
    jQuery.ajax({
        type: "POST",
        url: foodbakery_shortlists.admin_url,
        data: dataString,
        dataType: "json",
        success: function (response) {
           
            if (response.status == true) {
                jQuery(thisObj).removeClass('shortlist').addClass('shortlisted');
                jQuery(thisObj).html(after_icon + shortlisted);
                var msg_obj = {msg : 'Shortlist added', type : 'success'};
                
                foodbakery_show_response(msg_obj);
            } else {
                jQuery(thisObj).removeClass('shortlisted').addClass('shortlist');
                jQuery(thisObj).html(before_icon + shortlist);
                var msg_obj = {msg : 'Shortlist removed', type : 'success'};
                foodbakery_show_response(msg_obj);
            }
        }
    });

}

/*
 * 
 * Foodbakery Publisher Removed Shortlist function
 */
jQuery(document).on("click", ".delete-shortlist", function () {
    
    var thisObj = jQuery(this);
    var listing_id = thisObj.data('id');
    var delete_icon_class = thisObj.find("i").attr('class');
    var loader_class = 'icon-spinner icon-spin';
    var dataString = 'listing_id=' + listing_id + '&action=foodbakery_removed_shortlist';
    jQuery('#id_confrmdiv').show();
    jQuery('#id_truebtn').click(function () {
        thisObj.find('i').removeClass(delete_icon_class);
        thisObj.find('i').addClass(loader_class);
        jQuery.ajax({
            type: "POST",
            url: foodbakery_shortlists.admin_url,
            data: dataString,
            dataType: "json",
            success: function (response) {
                thisObj.find('i').removeClass(loader_class).addClass(delete_icon_class);
                if (response.status == true) {

                    thisObj.closest('li').hide('slow', function () {
                        thisObj.closest('li').remove();
                    });
                    
                    var msg_obj = {msg : response.message, type : 'success'};
                    foodbakery_show_response(msg_obj);
                }
            }
        });

        jQuery('#id_confrmdiv').hide();
        return false;
    });
    jQuery('#id_falsebtn').click(function () {
        jQuery('#id_confrmdiv').hide();
        return false;
    });
    return false;
});