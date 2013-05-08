var eMend = {
    boot: function( args ) {
        var cfg = eMend.config = args
          , jq_required = true
          , eMend_required = !(typeof eMend != 'undefined' && eMend.status)
          , v
        ;

    	if(typeof jQuery != 'undefined' && jQuery.fn && jQuery.fn.jquery) {
    		v = jQuery.fn.jquery.split('.').join('');
            w = eMend.config.jquery_min_version.split('.').join('');
            if(v.length == 3 && w.length == 3) {
    		    jq_required = !(Number(v) >= Number(w));
            }
    	}

        // include jQuery library if needed
    	if(jq_required) {
    		var head = document.getElementsByTagName('head')[0]
    		  , js = document.createElement('script')
              , jqbaseURI = cfg.jquery_googleapis ? 'http://ajax.googleapis.com/ajax/libs/jquery/' : cfg.baseURI+'js/libs/jquery/'
              , jqfile = cfg.debug ? '/jquery.js' : '/jquery.min.js';

              if(typeof eMendInit != 'undefined' && eMendInit == true) {
                js.language = 'text/javascript';
                js.src =  jqbaseURI + cfg.jquery_min_version + jqfile;
                document.getElementsByTagName('head')[0].appendChild(js);
              } else {
                document.write('<script type="text/javascript" src="'+jqbaseURI + cfg.jquery_min_version + jqfile+'"><\/script>');
              }
    	}

    	if(eMend_required) {
              var emfile = cfg.debug ? '/e-Mend_dist' : '/e-Mend_dist-yui';
    	  var css = document.createElement('link');
    	  css.rel = 'stylesheet';
    	  css.type = 'text/css';
    	  css.href = cfg.baseURI+'css'+emfile+'.css';
    	  var head = document.getElementsByTagName('head')[0];
    	  head.insertBefore(css,head.lastChild);

              if(typeof eMendInit != 'undefined' && eMendInit == true) {
                var js = document.createElement('script');
                js.language = 'text/javascript';
                js.src = cfg.baseURI+'js'+emfile+'.js';
                head.insertBefore(js,head.lastChild);
              } else {
                document.write('<script type="text/javascript" src="'+cfg.baseURI+'js'+emfile+'.js'+'"><\/script>');
              }
    	}
    }
}