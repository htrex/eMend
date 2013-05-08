<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 *
 */

function optionsframework_option_name() {

	$optionsframework_settings = get_option('optionsframework');
	$optionsframework_settings['id'] = 'emend';
	update_option('optionsframework', $optionsframework_settings);

	// echo $themename;
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the "id" fields, make sure to use all lowercase and no spaces.
 *
 */

function admlink ( $label, $panel ) {
    return '<a href="'.get_bloginfo( 'wpurl' ).'/wp-admin/'.$panel.'" >'.$label.'</a>';
}

function optionsframework_options() {

	$options = array();

    $options[] = array( "name" => "Documentation",
   		"type" => "heading" );

    $options[] = array( "name" => "Required and recommended Wordpress plugins",
   		"desc" => '<p>eMend requires <em>JSON API</em> plugin, a bunch of other plugins are recommended to efficently fight spam and enhance commenting control.</p>
   		           <p>Permalinks must be set for URL rewriting, any option in '.admlink('Settings -> Permalinks','options-permalink.php').' except "Default" does the trick.</p>
   		           <p>Review your comment settings in '.admlink('Settings -> Discussion','options-discussion.php').' to enforce your commenting policy rules</p>',
   		"type" => "info" );    
    
    $options[] = array( "name" => "Theme",
   		"desc" => '<p>With some adaption eMend may work with any Wordpress theme, but for an out-of-the-box experience you can use <a href="http://darylkoop.com/2011/08/26/hum/">Hum</a>, a tiny '.admlink('Twenty Eleven','theme-install.php?tab=search&s=twenty+eleven&search=Search').' child theme that is included with eMend as a commodity.</p>
                   <p>Go to '.admlink('Appearance -> Themes','themes.php').'</em>, activate Hum and you\'re done.</p>',
   		"type" => "info" );

    $options[] = array( "name" => "Document revisions",
   		"desc" => '<p>As eMend references comments to the document using XPATH markers please consider that once the first comment has been issued on some document you must not change the content of such document, otherwise the comment references could be broken.</p>
                   <p>At the moment you should instead clone the document in a new post and keep the old one accessible to your readers so they can see previous conversations that lead to the subsequent revision.</p>
                   <p>This may change in the future as WP supports document revision internally, we need to implement a feature to mark comments relativelly to the document revision they were addressed to. </p>',
   		"type" => "info" );

	$options[] = array( "name" => "Basic Settings",
		"type" => "heading" );

	// Pull all the categories into an array
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}

    $options[] = array( "name" => "Apply to Categories",
   		"desc" => "eMend will be enabled only for checked categories",
   		"id" => "emend_apply_categories",
   		"std" => "", // These items get checked by default
   		"type" => "multicheck",
   		"options" => $options_categories );

    $options[] = array( "name" => "Compatibility",
   		"desc" => "Ban MSIE browser",
   		"id" => "emend_ban_msie",
   		"std" => "0",
   		"type" => "checkbox" );

    $options[] = array( "name" => "Performance",
   		"desc" => "scroll refresh delay",
   		"id" => "emend_scroll_refresh_delay",
   		"std" => "1",
   		"type" => "checkbox" );

    $multicheck_defaults = array( "uncompressed_scripts" => "0","firebug_lite" => "0" );
    $multicheck_array = array( "uncompressed_scripts" => "load uncompressed scripts", "firebug_lite" => "load firebug lite" );
    $options[] = array( "name" => "Debug",
   		"desc" => "",
   		"id" => "emend_debug",
   		"std" => $multicheck_defaults, // These items get checked by default
   		"type" => "multicheck",
   		"options" => $multicheck_array );

    $options[] = array( "name" => "Experimental",
   		"desc" => "WP direct comment rendering",
   		"id" => "emend_comment_wpmode",
   		"std" => "0",
   		"type" => "checkbox" );


	return $options;
}