jQuery(document).ready(function (jQuery) {
    "use strict";
    jQuery.fn.extend({
        cityAutocomplete: function (options) {

            return this.each(function () {

                var input = jQuery(this), opts = jQuery.extend({}, jQuery.cityAutocomplete);

                var autocompleteService = new google.maps.places.AutocompleteService();

                var predictionsDropDown = jQuery('<div class="foodbakery_location_autocomplete" class="city-autocomplete"></div>').appendTo(jQuery(this).parent());

                var request_var = 1;
                input.keyup(function () {

                    jQuery(this).parent(".foodbakery_location_autocomplete").html("<i class='icon-spinner8 icon-spin'></i>");
                    if (request_var == 1) {
                        var searchStr = jQuery(this).val();
                        // Min Number of characters
                        var num_of_chars = 0;
                        if (searchStr.length > num_of_chars) {
                            var params = {
                                input: searchStr,
                                bouns: 'upperbound',
                                //types: ['address']
                            };
                            params.componentRestrictions = ''; //{country: window.country_code}

                            autocompleteService.getPlacePredictions(params, updatePredictions);
                        }
                    }
                });
                predictionsDropDown.delegate('div', 'click', function () {
                    if (jQuery(this).text() != "ADDRESS" && jQuery(this).text() != "STATE / PROVINCE" && jQuery(this).text() != "COUNTRY") {
                        // address with slug			
                        var foodbakery_address_html = jQuery(this).text();
                        // slug only
                        var foodbakery_address_slug = jQuery(this).find('span').html();
                        // remove slug
                        jQuery(this).find('span').remove();
                        input.val(jQuery(this).text());
                        input.next('.search_keyword').val(foodbakery_address_slug);
                        predictionsDropDown.hide();
                        input.next('.search_keyword').closest("form.side-loc-srch-form").submit();

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

                    var google_results = '';
                    if (google.maps.places.PlacesServiceStatus.OK == status) {

                        // AJAX GET ADDRESS FROM GOOGLE
                        google_results += '<div class="address_headers"><h5>ADDRESS</h5></div>'
                        jQuery.each(predictions, function (i, prediction) {
                            google_results += '<div class="foodbakery_google_suggestions"><i class="icon-location-arrow"></i> ' + jQuery.fn.cityAutocomplete.transliterate(prediction.description) + '<span style="display:none">' + jQuery.fn.cityAutocomplete.transliterate(prediction.description) + '</span></div>';
                        });
                        request_var = 0;
                    } else {
                        predictionsDropDown.empty();
                    }
                    // AJAX GET STATE / PROVINCE.
                    var dataString = 'action=get_locations_for_search' + '&keyword=' + jQuery('.foodbakery_search_location_field').val();

                    var plugin_url = input.parent(".foodbakery_searchbox_div").data('locationadminurl');

                    jQuery.ajax({
                        type: "POST",
                        url: plugin_url,
                        data: dataString,
                        success: function (data) {
                            var results = jQuery.parseJSON(data);
                            predictionsDropDown.empty();
                            predictionsDropDown.append(google_results);
                            if (results != '') {
								// Set label for suggestions.
								var labels_str = "";
								if ( typeof results.title != "undefined" ) {
									labels_str = results.title.join(" / ");
								}
                                predictionsDropDown.append('<div class="address_headers"><h5>' + labels_str + '</h5></div>');
								
								// Populate suggestions.
								if ( typeof results.locations_for_display != "undefined" ) {
									var data = results.locations_for_display;
									$.each( data, function( key1, val1 ) {
										if ( results.location_levels_to_show[0] == true ) {
											predictionsDropDown.append( '<div class="foodbakery_location_parent">' + val1.item.name + '<span style="display:none">' + val1.item.slug + '</span></div>' );
										}
										if ( val1.children.length > 0 ) {
											$.each( val1.children, function( key2, val2 ) {
												if ( results.location_levels_to_show[1] == true ) {
													predictionsDropDown.append('<div class="foodbakery_location_child">' + val2.item.name + '<span style="display:none">' + val2.item.slug + '</span></div>');
												}
												if ( val2.children.length > 0 ) {
													$.each( val2.children, function( key3, val3 ) {
														if ( results.location_levels_to_show[2] == true ) {
															predictionsDropDown.append('<div class="foodbakery_location_child">' + val3.item.name + '<span style="display:none">' + val3.item.slug + '</span></div>');
														}
														if ( val3.children.length > 0 ) {
															$.each( val3.children, function( key4, val4 ) {
																if ( results.location_levels_to_show[3] == true ) {
																	predictionsDropDown.append('<div class="foodbakery_location_child">' + val4.item.name + '<span style="display:none">' + val4.item.slug + '</span></div>');
																}
															});
														}
													});
												}
											});
										}
									});
								}
                            }
                            request_var = 1;
                        }
                    });
                    predictionsDropDown.show();
                }
                return input;
            });
        }
    });
    jQuery.fn.cityAutocomplete.transliterate = function (s) {
        s = String(s);
        var char_map = {
			// Latin
			'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
			'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
			'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ő': 'O',
			'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH',
			'ß': 'ss',
			'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c',
			'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
			'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o',
			'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th',
			'ÿ': 'y',
			// Latin symbols
			'©': '(c)',
			// Greek
			'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
			'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
			'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
			'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
			'Ϋ': 'Y',
			'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
			'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
			'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
			'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
			'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',
			// Turkish
			'Ş': 'S', 'İ': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ğ': 'G',
			'ş': 's', 'ı': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'ğ': 'g',
			// Russian
			'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
			'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
			'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
			'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
            'Я': 'Ya',
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
            'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
            'я': 'ya',
            // Ukrainian
            'Є'
                : 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
                'є'
                : 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',
                // Czech
                'Č'
                : 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U',
                'Ž'
                : 'Z',
                'č'
                : 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
                'ž'
                : 'z',
                // Polish
                'Ą'
                : 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ó': 'o', 'Ś': 'S', 'Ź': 'Z',
                'Ż'
                : 'Z',
                'ą'
                : 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
                'ż'
                : 'z',
                // Latvian
                'Ā'
                : 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i', 'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N',
                'Š'
                : 'S', 'Ū': 'u', 'Ž': 'Z',
                'ā'
                : 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
                'š'
                : 's', 'ū': 'u', 'ž': 'z'
		};
		for (var k in char_map) {
			s = s.replace(new RegExp(k, 'g'), char_map[k]);
		}
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

		jQuery('input.foodbakery_search_location_field').cityAutocomplete();

		jQuery(document).on('click', '.foodbakery_searchbox_div', function () {
			jQuery('.foodbakery_search_location_field').prop('disabled', false);
		});

		jQuery(document).on('click', 'form', function () {
			var src_loc_val = jQuery(this).find('.foodbakery_search_location_field');
			src_loc_val.next('.search_keyword').val(src_loc_val.val());
		});
}(jQuery));