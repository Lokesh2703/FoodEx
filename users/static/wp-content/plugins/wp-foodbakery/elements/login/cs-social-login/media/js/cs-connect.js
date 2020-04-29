(function (jQuery) {
    jQuery(function () {
        var foodbakery_google_connect = function (id) {
            var google_auth = jQuery('.social_login_google_auth');
            var client_id = google_auth.find('input[type=hidden][name=client_id]').val();
            var redirect_uri = google_auth.find('input[type=hidden][name=redirect_uri]').val();
            if (client_id == "") {
            } else {
                window.open(redirect_uri, '_self');
            }
        };
        
	var foodbakery_twitter_connect = function (id) {
            var twitter_auth = jQuery('.social_login_twitter_auth');
            var client_id = twitter_auth.find('input[type=hidden][name=client_id]').val();
            var redirect_uri = twitter_auth.find('input[type=hidden][name=redirect_uri]').val();
	    if (client_id == "") {
            } else {
                window.open(redirect_uri, '', 'scrollbars=no,menubar=no,height=400,width=800,resizable=yes,toolbar=no,status=no');
            }
        };

        var foodbakery_facebook_connect = function (id) {
            var facebook_auth = jQuery('.social_login_facebook_auth');
            var client_id = facebook_auth.find('input[type=hidden][name=client_id]').val();
            var redirect_uri =facebook_auth.find('input[type=hidden][name=redirect_uri]').val();
            if (client_id == "") {
            } else {
               
                window.open('https://graph.facebook.com/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=email',
                        '', 'scrollbars=no,menubar=no,resizable=yes,toolbar=no,status=no,width=800, height=400');
            }
        };

        jQuery(".social_login_login_facebook").on("click", function () {
            var id = jQuery(this).attr('id');
            foodbakery_facebook_connect(id);
        });

        jQuery(".social_login_login_continue_facebook").on("click", function () {
            var id = jQuery(this).attr('id');
            foodbakery_facebook_connect(id);
        });

        jQuery(".social_login_login_twitter").on("click", function () {
            var id = jQuery(this).attr('id');
            foodbakery_twitter_connect(id);
        });

        jQuery(".social_login_login_continue_twitter").on("click", function () {
            var id = jQuery(this).attr('id');
            foodbakery_twitter_connect(id);
        });

        jQuery(".social_login_login_google").on("click", function () {
            var id = jQuery(this).attr('id');
            foodbakery_google_connect(id);
        });
        jQuery(".social_login_login_linkedin").on("click", function () {
            //social_login_login_linkedin

            var id = '';
            var apply_job_id = '';
            if ((jQuery(".linkedin_jobid_apply").data("applyjobid"))) {
                apply_job_id = jQuery(".linkedin_jobid_apply").data("applyjobid");
            }
           
            foodbakery_linkedin_connect(id, apply_job_id);
        });
		
		jQuery(".social_login_login_facebook_apply").on("click", function () {
            //social_login_login_linkedin

            var id = '';
            var apply_job_id = '';
            if ((jQuery(".facebook_jobid_apply").data("applyjobid"))) {
                apply_job_id = jQuery(".facebook_jobid_apply").data("applyjobid");
            }
           
            foodbakery_facebook_connect_apply(id, apply_job_id);
        });
       

    });
})(jQuery);


window.wp_social_login = function (config) {
    jQuery('#loginform').unbind('submit.simplemodal-login');

    var form_id = '#loginform';

    if (!jQuery('#loginform').length) {
        // if register form exists, just use that
        if (jQuery('#registerform').length) {
            form_id = '#registerform';
        } else {
            // create the login form
            var login_uri = jQuery("#social_login_form_uri").val();
            jQuery('body').append("<form id='loginform' method='post' action='" + login_uri + "'></form>");
            if (!jQuery('#setupform').length) {
                jQuery('#loginform').append("<input type='hidden' id='redirect_to' name='redirect_to' value='" + window.location.href + "'>");
            }
        }
    }

    jQuery.each(config, function (key, value) {
        jQuery("#" + key).remove();
        jQuery(form_id).append("<input type='hidden' id='" + key + "' name='" + key + "' value='" + value + "'>");
    });

    if (jQuery("#simplemodal-login-form").length) {
        var current_url = window.location.href;
        jQuery("#redirect_to").remove();
        jQuery(form_id).append("<input type='hidden' id='redirect_to' name='redirect_to' value='" + current_url + "'>");
    }

    jQuery(form_id).submit();
}
