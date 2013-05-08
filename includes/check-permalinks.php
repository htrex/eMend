<?php

add_action('admin_notices', 'emend_check_permalinks');

function emend_check_permalinks() {
    if(!get_option('permalink_structure'))
      	echo '<br/><div id="notice" class="error"><p>' . __('JSON API requires permalinks to be enabled. Please ') . '<a href="' . get_bloginfo('wpurl') . '/wp-admin/options-permalink.php">' . __('enable it here') . '</a>.</p></div>' . "\n";
}

?>