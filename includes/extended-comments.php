<?php

/**
 * Add our field to the comment form
 */
add_action( 'comment_form_logged_in_after', 'emend_add_comment_fields' );
add_action( 'comment_form_after_fields', 'emend_add_comment_fields' );
function emend_add_comment_fields()
{
	?>
	<p class="comment-form-selection">
		<input type="hidden" class="txt" name="emend_comment_selection" id="emend_comment_selection" />
	</p>
	<?php
}


/**
 * Add the title to our admin area, for editing, etc
 */
add_action( 'add_meta_boxes_comment', 'emend_add_comment_fields_metabox' );
function emend_add_comment_fields_metabox()
{
    add_meta_box( 'pmg-comment-selection', __( 'Comment Selection' ), 'emend_add_comment_selection_metabox_cb', 'comment', 'normal', 'high' );
}

function emend_add_comment_selection_metabox_cb( $comment )
{
	$selection = get_comment_meta( $comment->comment_ID, 'emend_comment_selection', true );
	wp_nonce_field( 'emend_comment_selection_update', 'emend_comment_selection_update', false );
	?>
	<p>
		<label for="emend_comment_selection"><?php _e( 'Comment Selection' ); ?></label><input type="text" name="emend_comment_selection" value="<?php echo esc_attr( $selection ); ?>" class="widefat" />
	</p>
	<?php
}

/**
 * Save our comment (from the admin area)
 */
add_action( 'edit_comment', 'emend_comment_edit_comment' );
function emend_comment_edit_comment( $comment_id )
{
    if( isset( $_POST['emend_comment_selection'] ) )
        update_comment_meta( $comment_id, 'emend_comment_selection', esc_attr( $_POST['emend_comment_selection'] ) );
}

/**
 * Save our title (from the front end)
 */
add_action( 'comment_post', 'emend_comment_insert_comment', 10, 1 );
function emend_comment_insert_comment( $comment_id )
{
    if( isset( $_POST['emend_comment_selection'] ) )
        update_comment_meta( $comment_id, 'emend_comment_selection', esc_attr( $_POST['emend_comment_selection'] ) );
}


/**
 * add our headline to the comment text
 * Hook in way late to avoid colliding with default
 * WordPress comment text filters
 */
//add_filter( 'comment_text', 'emend_comment_add_title_to_text', 99, 2 );
function emend_comment_add_title_to_text( $text, $comment )
{
	if( is_admin() ) return $text;
	if( $selection = get_comment_meta( $comment->comment_ID, 'emend_comment_selection', true ) )
	{
		$selection = '<span class="comment-selection-xpath">' . esc_attr( $selection ) . '</span>';
		$text = $selection . $text;
	}
	return $text;
}
?>
