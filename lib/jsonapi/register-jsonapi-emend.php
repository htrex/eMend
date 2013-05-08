<?php


function emend_add_jsonapi_controller($controllers) {
  $controllers[] = 'emend';
  return $controllers;
}
add_filter('json_api_controllers', 'emend_add_jsonapi_controller');

function emend_set_jsonapi_controller_path() {
  global $emend_dir;
  return $emend_dir . '/lib/jsonapi/jsonapi-emend-controller.php';
}
add_filter('json_api_emend_controller_path', 'emend_set_jsonapi_controller_path');

function emend_force_jsonapi_controller_active()
{
    $json_api_controllers = get_option('json_api_controllers');
    if ($json_api_controllers && !strrpos($json_api_controllers, 'emend')) {
        $json_api_controllers .= ',emend';
        update_option('json_api_controllers', $json_api_controllers );
    } else {
        update_option('json_api_controllers', 'core,emend' );
    }
}
add_action('init', 'emend_force_jsonapi_controller_active');

?>