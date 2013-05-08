<?php
/*
Plugin Name: e-Mend - a web annotation system
Plugin URI: http://emend.memefarmers.net
Text Domain: wp_emend
Domain Path: /languages
Description: -
Author: Alessandro Curci, MemeFarmers collective
Author URI: -
Version: 0.5
Licence: GPLv3 Affero
Upgrade Check: none
Last Change: 16.04.2012
*/

/**
License:
==============================================================================

e-Mend - a web annotation system.
Copyright (C) 2006-2012 MemeFarmers, Collective.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

==============================================================================
 */

if (!function_exists('is_admin')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit();
}

$emend_dir = dirname(__FILE__);

// extends wp standard comments with emend comment selection metadata
require_once $emend_dir . '/includes/extended-comments.php';

// configure administration panels and requires a patched version of options framework (adapted to work with plugins instead of themes)
require_once $emend_dir . '/includes/options-general.php';
require_once $emend_dir . '/lib/options-framework/options-framework.php';

// requires needed plugins to be installed and recommends others to prevent spam
require_once $emend_dir . '/lib/required-plugins/register-required-plugins.php';

// check that permalinks are enabled (required by JSONAPI)
require_once $emend_dir . '/includes/check-permalinks.php';
// registers a json-api custom controller & includes a custom model class
require_once $emend_dir . '/lib/jsonapi/jsonapi-emend-model.php';
require_once $emend_dir . '/lib/jsonapi/register-jsonapi-emend.php';


add_action('wp', 'emend_init');
function emend_init() {

    $current_category = get_the_category();
    $current_category_enabled = false;
    $enabled_categories = of_get_option('emend_apply_categories');
    foreach((get_the_category()) as $category) {
        if($enabled_categories[$category->cat_ID] ){ $current_category_enabled = true; break; }
    }

    //print_r($enabled_categories[$current_category->]);

    if (is_single() && $current_category_enabled )  {

        // Do we ban M$IE for all the pains it caused us ?! ;)
        if (of_get_option('emend_ban_msie') && isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)) {
            wp_redirect(plugins_url('browser_check.html', __FILE__));
            exit();
        }

        $debug = of_get_option('emend_debug');

        // eventually include firebug lite
        if ($debug['firebug_lite']) {
            wp_register_script('firebug-lite', 'https://getfirebug.com/firebug-lite.js', array('jquery'), null);
            wp_enqueue_script('firebug-lite');
        }

        // include main eMend script
        wp_register_script('emendboot', plugins_url('web/emend.boot.js', __FILE__), array('jquery'));
        wp_enqueue_script('emendboot');

        // set a postID variable for JSONAPI data retrival
        add_action('wp_head', 'js_post_id');
        function js_post_id() {
            global $post;
            echo '<script type="text/javascript"> var postID = ' . $post->ID . '; </script>';
        }

        // initial support for mobile devices
        add_action('wp_head', 'fix_mobile_css');
        function fix_mobile_css() {
            echo '<meta name="viewport" content="width=100%; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;" />';
        }

        add_action('wp_head', 'emend_script');
        function emend_script() {
            $debug = of_get_option('emend_debug');
            ?>

            <script type="text/javascript">
                eMend.boot ({
                    comment_target: '#emend_container',
                    minimizemarkup: true,
                    baseURI: "<?php echo plugins_url('web/', __FILE__) ?>",                          // load eMend assets from this baseURI
                    backstore_tiddly: true,                                                          // enable/disable tiddly backstore
                    backend: "wpEmendPlugin",                                                        // sfEmendPlugin/wpEmendPlugin [to implement: Mediawiki]
                    backend_debug: "firebugEmendPluginLog",
                    scroll_refresh_delay: <?php echo of_get_option('emend_scroll_refresh_delay') ?>, // delay comments visual link refresh to save CPU cycles
                    jquery_noconflict: true,                                                         // enable/disable jQuery no conflict mode
                    jquery_googleapis: true,                                                         // enable/disable loading jQuery from googleapis
                    jquery_min_version: '1.5.2',                                                     // minimum version of jQuery
                    login_needed_to_post: false,                                                     // checks if user is logged-in and eventually redirects
                    login_page: "/login",                                                            // login page
                    debug: <?php echo $debug['uncompressed_scripts'] ?>,                             // enable/disable uncompressed scripts inclusion for debug
                    comments_wpmode: <?php echo of_get_option('emend_comment_wpmode'); ?>
                  });
            </script>

            <?php
        }

        // always add a div box around the content for emend to get solid selection XPATHs
        add_filter('the_content', 'emend_add_container');
        function emend_add_container($content) {
            return '<div id="emend_container">' . $content . '</div>';
        }
    }
}


register_activation_hook($emend_dir.'/emend.php','emend_register_plugin');
function emend_register_plugin() {
    $srcdir = dirname(__FILE__).'/lib/hum/';
    $destdir = get_theme_root().'/hum/';
    if ( !is_dir($destdir) )
        mkdir($destdir);

    if ( !file_exists($destdir.'/style.css'))
        copy($srcdir.'style.css', $destdir.'style.css');
}

register_deactivation_hook($emend_dir.'/emend.php','emend_deregister_plugin');
function emend_deregister_plugin() {

}


function fb_debug() {
    $args = func_get_args();
    if (class_exists('FirePHP')) {
        $firephp = FirePHP::getInstance(true);
        $firephp->group('debug');
        foreach ($args as $arg)
            $firephp->log($arg);
        $firephp->groupEnd();
    }
}


?>