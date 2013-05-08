<?php

class JSON_API_eMend_Controller
{
    public function get_comments()
    {
        global $json_api, $post;
        extract($json_api->query->get(array('id', 'slug', 'post_id', 'post_slug')));
        if ($id || $post_id) {
            if (!$post_id) {
                $post_id = $id;
            }
        } else {
            $json_api->error("Include 'id' var in your request.");
        }

        global $wpdb;

        $wp_comments = $wpdb->get_results($wpdb->prepare("
        SELECT *
        FROM $wpdb->comments
        WHERE comment_post_ID = %d
          AND comment_approved = 1
          AND comment_type = ''
        ORDER BY comment_date
      ", $post_id));
        $comments = array();
        foreach ($wp_comments as $wp_comment) {
            $comments[] = new JSON_API_Emend($wp_comment);
        }

        $response = array(
            'post' => array(
                'id' => $post_id,
                'comments' => $comments
            )
        );
        return $response;
    }
}

?>