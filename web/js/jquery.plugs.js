/*!
 * jQuery JSON Plugin
 * version: 1.0 (2008-04-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris technically wrote this plugin, but it is based somewhat
 * on the JSON.org website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.  I really just cleaned it up.
 *
 * It is also based heavily on MochiKit's serializeJSON, which is 
 * copywrited 2005 by Bob Ippolito.
 */
 
(function($) {   
    function toIntegersAtLease(n) 
    // Format integers to have at least two digits.
    {    
        return n < 10 ? '0' + n : n;
    }

    Date.prototype.toJSON = function(date)
    // Yes, it polutes the Date namespace, but we'll allow it here, as
    // it's damned usefull.
    {
        return this.getUTCFullYear()   + '-' +
             toIntegersAtLease(this.getUTCMonth()) + '-' +
             toIntegersAtLease(this.getUTCDate());
    };

    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        }
        
    $.quoteString = function(string)
    // Places quotes around a string, inteligently.
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.
    {
        if (escapeable.test(string))
        {
            return '"' + string.replace(escapeable, function (a) 
            {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"'
        }
        return '"' + string + '"';
    }
    
    $.toJSON = function(o, compact)
    {
        var type = typeof(o);
        
        if (type == "undefined")
            return "undefined";
        else if (type == "number" || type == "boolean")
            return o + "";
        else if (o === null)
            return "null";
        
        // Is it a string?
        if (type == "string") 
        {
            return $.quoteString(o);
        }
        
        // Does it have a .toJSON function?
        if (type == "object" && typeof o.toJSON == "function") 
            return o.toJSON(compact);
        
        // Is it an array?
        if (type != "function" && typeof(o.length) == "number") 
        {
            var ret = [];
            for (var i = 0; i < o.length; i++) {
                ret.push( $.toJSON(o[i], compact) );
            }
            if (compact)
                return "[" + ret.join(",") + "]";
            else
                return "[" + ret.join(", ") + "]";
        }
        
        // If it's a function, we have to warn somebody!
        if (type == "function") {
            throw new TypeError("Unable to convert object of type 'function' to json.");
        }
        
        // It's probably an object, then.
        ret = [];
        for (var k in o) {
            var name;
            var type = typeof(k);
            
            if (type == "number")
                name = '"' + k + '"';
            else if (type == "string")
                name = $.quoteString(k);
            else
                continue;  //skip non-string or number keys
            
            val = $.toJSON(o[k], compact);
            if (typeof(val) != "string") {
                // skip non-serializable values
                continue;
            }
            
            if (compact)
                ret.push(name + ":" + val);
            else
                ret.push(name + ": " + val);
        }
        return "{" + ret.join(", ") + "}";
    }
    
    $.compactJSON = function(o)
    {
        return $.toJSON(o, true);
    }
    
    $.evalJSON = function(src)
    // Evals JSON that we know to be safe.
    {
        return eval("(" + src + ")");
    }
    
    $.secureEvalJSON = function(src)
    // Evals JSON in a way that is *more* secure.
    {
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    }
})(jQuery);
/*! jQuery getScroll plugin using tips from http://www.quirksmode.org  */

jQuery.getScroll = function (e){ 
    if (e) { 
        t = e.scrollTop; 
        l = e.scrollLeft; 
        w = e.scrollWidth; 
        h = e.scrollHeight; 
    } else { 
        if (document.documentElement && document.documentElement.scrollTop) { 
            t = document.documentElement.scrollTop; 
            l = document.documentElement.scrollLeft; 
            w = document.documentElement.scrollWidth; 
            h = document.documentElement.scrollHeight; 
        } else if (document.body) { 
            t = document.body.scrollTop; 
            l = document.body.scrollLeft; 
            w = document.body.scrollWidth; 
            h = document.body.scrollHeight; 
        } 
    } 
    return { t: t, l: l, w: w, h: h }; 
}; (function($) { 

$.escapeReturns = function(text){
//console.log(text);
    text = escape(text); //encode text string's carriage returns
    
    for(i=0; i<text.length; i++){
    
        if(text.indexOf("%0D%0A") > -1){
            //Windows encodes returns as \r\n hex
            text=text.replace("%0D%0A","<br/>");
        } else if(text.indexOf("%0A") > -1){
            //Unix encodes returns as \n hex
            text=text.replace("%0A","<br/>");
        } else if(text.indexOf("%0D") > -1){
            //Macintosh encodes returns as \r hex
            text=text.replace("%0D","<br/>");
        }
    }
    
    text = unescape(text); //unescape all other encoded characters
//console.log(text);    
    return text;
}

var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
var meta = {    // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    }
    
$.escapeString = function(string)
{
    if (escapeable.test(string))
    {
        return string.replace(escapeable, function (a) 
        {
            var c = meta[a];
            if (typeof c === 'string') {
                return c;
            }
            c = a.charCodeAt();
            return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
        })
    }
    return string;
}

})(jQuery);(function($) {
    $.fixOperaRangeSelectionBug = function ()
    {
        
        function isNbsp(textNode)
        {
            if (textNode.nodeType != 3)
                return false;
            var pat = /\u00A0/;
            return textNode.nodeValue.match(pat);
        }    
        
        var brCollection = document.body.getElementsByTagName('br');
        for (var num1 = 0;num1 < brCollection.length; num1++)
        {
            var br = brCollection[num1];
            var prevSibling = br.previousSibling;
            if (prevSibling != null)
            {
                var hasNbsp = isNbsp(prevSibling);
                if (!hasNbsp)
                {
                    // insert the invisible non-breaking-whitespace
                    br.parentNode.insertBefore(document.createTextNode('\u00A0'), br);
                }
            }
        }
    }
})(jQuery);
//This plugin is a workaround for an Opera >= 9.50 bug witch returns wrong window width and height sizes
if(jQuery && jQuery.browser.opera && jQuery.browser.version >= 9.50) {
    var height_ = jQuery.fn.height;
    jQuery.fn.height = function() {
        if ( this[0] == window )
            return window.innerHeight;
        else return height_.apply(this,arguments);
    };
    var width_ = jQuery.fn.width;
    jQuery.fn.width = function() {
        if ( this[0] == window )
            return window.innerWidth;
        else return width_.apply(this,arguments);
    };
};/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *//*
 * jQuery Easing Compatibility v1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Adds compatibility for applications that use the pre 1.2 easing names
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery.extend( jQuery.easing,
{
	easeIn: function (x, t, b, c, d) {
		return jQuery.easing.easeInQuad(x, t, b, c, d);
	},
	easeOut: function (x, t, b, c, d) {
		return jQuery.easing.easeOutQuad(x, t, b, c, d);
	},
	easeInOut: function (x, t, b, c, d) {
		return jQuery.easing.easeInOutQuad(x, t, b, c, d);
	},
	expoin: function(x, t, b, c, d) {
		return jQuery.easing.easeInExpo(x, t, b, c, d);
	},
	expoout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutExpo(x, t, b, c, d);
	},
	expoinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutExpo(x, t, b, c, d);
	},
	bouncein: function(x, t, b, c, d) {
		return jQuery.easing.easeInBounce(x, t, b, c, d);
	},
	bounceout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutBounce(x, t, b, c, d);
	},
	bounceinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutBounce(x, t, b, c, d);
	},
	elasin: function(x, t, b, c, d) {
		return jQuery.easing.easeInElastic(x, t, b, c, d);
	},
	elasout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutElastic(x, t, b, c, d);
	},
	elasinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutElastic(x, t, b, c, d);
	},
	backin: function(x, t, b, c, d) {
		return jQuery.easing.easeInBack(x, t, b, c, d);
	},
	backout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutBack(x, t, b, c, d);
	},
	backinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutBack(x, t, b, c, d);
	}
});(function($) {
	
  // removes whitespace-only text node childrens
	$.fn.cleanWhitespace = function(deep) {
		// white space chars
		var element = this[0];
		if ($(element).hasClass('keep-whitespace')) return element;
        if(element && element.firstChild) var node = element.firstChild;

		var SPACE_SX = new RegExp('^'+String.fromCharCode(32)+'*','m');
		var SPACE_DX = new RegExp('$'+String.fromCharCode(32)+'*','m');
		var SPACE_DBL = new RegExp(String.fromCharCode(32)+'{2,}','gm');
		var NBSP = new RegExp(String.fromCharCode(160),'gm');
		while (node) {
			//console.log(node.nodeType);
			var nextNode = node.nextSibling;
			
			if (node.nodeType == 3) {
				if(!/\S/.test(node.nodeValue) && !NBSP.test(node.nodeValue)) {
					element.removeChild(node);
				} else {
					var str = node.nodeValue;						
						str = str.replace(/[\t\n\r\f]/gm,'');						
						str = str.replace(SPACE_DBL,String.fromCharCode(160));						
						str = str.replace(SPACE_SX,String.fromCharCode(160));
						str = str.replace(SPACE_DX,String.fromCharCode(160));
						node.nodeValue = str;						
				}
			} else if(deep && node.nodeType == 1) {
				$(node).cleanWhitespace(deep);
			}
			//console.log('^'+node.nodeValue+'^');
			node = nextNode;
		}
		return element;
	}
})(jQuery);/* from http://dev.jquery.com/browser/trunk/plugins/textNodes/jquery.textNodes.js
   Send comments to jakecigar@gmail.com
*/

(function($) {
	$.fn.textNodes = function(deep) {
				var text=[];
				this.each(function(){
						var children = this.childNodes;
						for (var i = 0; i < children.length; i++){
								var child = children[i];
								if (child.nodeType == 3)
										text.push(child);
								else if (deep && child.nodeType == 1)
										Array.prototype.push.apply(text,jQuery(child).textNodes(deep,true));
										// [].push.apply(texts,$(child).textNodes(deep,true));
						}
				});
				return arguments[1] ? text : this.pushStack(text);
	};
	
})(jQuery);/*
 * jQuery getSelection plugin
 *
 * returns an object with the current text selection coordinates
 * (startContainer, startOffset, endContainer, endOffset)
 * Version: 0.1 (08/30/2008)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {
      
  $.getSelectedText = function() {
		if (window.getSelection) {
            var userSelection = window.getSelection();
            return userSelection.toString();
        } else if (document.selection) {
			var userSelection = document.selection,
			r = userSelection.createRange();
			return r.text;
        }
  }

  $.getSelection = function(reset) {
		if (window.getSelection) {
			var userSelection = window.getSelection();
			if (userSelection.getRangeAt) {
				var	r = userSelection.getRangeAt(0);
			} else { // Safari!
				var r = document.createRange();
				r.setStart(userSelection.anchorNode,userSelection.anchorOffset);
				r.setEnd(userSelection.focusNode,userSelection.focusOffset);
			}

			r1 = r.cloneRange(),
			r2 = r.cloneRange();
			r1.collapse(true); r2.collapse(false);

			var startContainer = r1.startContainer,
			endContainer = r2.endContainer,
			startOffset = r1.startOffset,
			endOffset = r2.endOffset,
			selectedText = userSelection.toString();

//=================================================
//console.log("startContainer: ",startContainer);
//console.log("endContainer",endContainer);
//=================================================
            //console.log(startContainer,endContainer,startOffset,endOffset);



			if(endContainer.nodeType == 1) {

              // fix for browsers giving offsets 0,1 when selecting with triple click
              // https://bugzilla.mozilla.org/show_bug.cgi?id=516782
              // @TODO needs checking
              if(startContainer === endContainer && startOffset == 0 && endOffset == 1) {
                  var TN = $(startContainer).textNodes(true);
                  startContainer = TN[0];
                  endContainer = TN[TN.length-1];
                  endOffset = endContainer.length;
                  //console.log(TN,startContainer,endContainer,startOffset,endOffset);
              } else {
                  // fix for browsers giving endContainer.parent as result when selecting over a <br/> tag
                  var t = endContainer.childNodes;
                  var o = t[endOffset];
                  if(o && o.tagName.toLowerCase() == "br") {
                    o = o.previousSibling;
                    if(o.nodeType == 1) {
                     o = $(o).textNodes(true);
                     endContainer = o[o.length-1];
                     endOffset = endContainer.length-1;
                    }
                  }
              }

			}

			if(reset) userSelection.removeAllRanges();

		} else if (document.selection) {

		  try {

			var userSelection = document.selection,
			r = userSelection.createRange();

			var selectedText = r.text;
            if(selectedText.length == 0) return null;

            var r1 = r.duplicate(), r2 = r.duplicate();
			r1.collapse(true); r2.collapse(false);

			var startParent = r1.parentElement();
			var endParent = r2.parentElement();

			var v = document.body.createTextRange(),
            len = v.text.length;
			v.moveToElementText(startParent);
			v.collapse(true);
			var startOffset = 0;

			// while(r.inRange(v) == false && startOffset < len) {
			while(r.compareEndPoints('StartToStart',v) != 0 && startOffset < len) {
				startOffset++;
				v.move('character');
			}

			v.moveToElementText(endParent);
            len = v.text.length;
			v.collapse(true);
			var endOffset = 0;

			// while(r2.inRange(v) == false && endOffset < len) {
			while(r.compareEndPoints('EndToEnd',v) != 0 && endOffset < len) {
				endOffset++;
				v.move('character');
			}

			var startSiblings = $(startParent).textNodes(true),
			startContainer;
//=================================================
//console.log(startParent.innerHTML,startSiblings.length);
//=================================================
			if(startSiblings.length == 1) {
				startContainer = startSiblings[0];
			} else {
				var Sidx = 0, chrSum = 0, prevSum = 0;
				while(chrSum <= startOffset) {
					prevSum = chrSum;
					chrSum += startSiblings[Sidx].length;
					Sidx++;
				}
				startOffset -= prevSum;
				startContainer = startSiblings[--Sidx];
			}

			var endSiblings = $(endParent).textNodes(true),
			endContainer;
//=================================================
//console.log(endParent.innerHTML,endSiblings.length);
//=================================================
			if(endSiblings.length == 1) {
				endContainer = endSiblings[0];
			} else {
				var Eidx = 0, chrSum = 0, prevSum = 0;
				while(chrSum <= endOffset && Eidx < endSiblings.length) {
					prevSum = chrSum;
//=================================================
//console.log(endSiblings[Eidx].nodeValue);
//=================================================
					chrSum += endSiblings[Eidx].length;
					Eidx++;
				}

				endOffset -= prevSum;
				endContainer = endSiblings[--Eidx];
			}
			endOffset = Math.min(endOffset, endContainer.length);

			if(reset) userSelection.empty();

		  } catch(err) {
			if(eMend.log) {
			  err.funct = '$.getSelection';
			  //err.selection = $.getSelectedText();
			  eMend.log.add('warning',err);
			}
		  }

		}

		if(startContainer != endContainer || startOffset != endOffset) {
			var sObj = {startContainer: startContainer,
							endContainer: endContainer,
							startOffset: startOffset,
							endOffset: endOffset,
							text: selectedText
			}
			//console.log(sObj);
			return sObj;
		} else {
			return null;
		}
	}
})(jQuery);(function($) { 

  $.create = function() {
    var ret = [], a = arguments, i, e;
    a = a[0].constructor == Array ? a[0] : a;
    for(i=0; i<a.length; i++) {
      if(a[i+1] && a[i+1].constructor == Object) { // item is element if attributes follow
        e = document.createElement(a[i]);
        $(e).attr(a[++i]); // apply attributes
        if(a[i+1] && a[i+1].constructor == Array) $(e).append($.create(a[++i])); // optional children
        ret.push(e);
      } else { // item is just a text node
        ret.push(document.createTextNode(a[i]));
      }
    }
    return ret;
  };
  
  $.tpl = function(json, tpl) {
    var ret = [];
    jQuery.each(json.constructor == Array ? json : [json], function() {
      var o = $.create(tpl.apply(this));
      for(var i=0;i<o.length;i++) ret.push(o[i]);
    });
    return ret;
  };

})(jQuery);

/**
 * jQuery Templates
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by: Stan Lemon <stanlemon@mac.com>
 *
 * Based off of the Ext.Template library, available at:
 * http://www.extjs.com
 *
 * This library provides basic templating functionality, allowing for macro-based
 * templates within jQuery.
 *
 * Basic Usage:
 *
 * var t = $.template('<div id="foo">Hello ${name}, how are you ${question}?  I am ${me:substr(0,10)}</div>');
 *
 * $(selector).append( t , {
 *     name: 'Stan',
 *     question: 'feeling',
 *     me: 'doing quite well myself, thank you very much!'
 * });
 *
 * Requires: jQuery 1.2+
 *
 *
 * @todo    Add callbacks to the DOM manipulation methods, so that events can be bound
 *          to template nodes after creation.
 */
(function($){
	
	/**
	 * Create a New Template
	 */
	$.template = function(html, options) {
		return new $.template.instance(html, options);
	};

	/**
	 * Template constructor - Creates a new template instance.
	 *
	 * @param 	html 	The string of HTML to be used for the template.
	 * @param 	options An object of configurable options.  Currently
	 * 			you can toggle compile as a boolean value and set a custom
	 *          template regular expression on the property regx by
	 *          specifying the key of the regx to use from the regx object.
	 */
	$.template.instance = function(html, options) {
        // If a custom regular expression has been set, grab it from the regx object
        if ( options && options['regx'] ) options.regx = this.regx[ options.regx ];

		this.options = $.extend({
			compile: 		false,
			regx:           this.regx.standard
		}, options || {});

		this.html = html;

		if (this.options.compile) {
			this.compile();   
		}
		this.isTemplate = true;
	};

	/**
	 * Regular Expression for Finding Variables
	 *
	 * The default pattern looks for variables in JSP style, the form of: ${variable}
	 * There are also regular expressions available for ext-style variables and
	 * jTemplate style variables.
	 *
	 * You can add your own regular expressions for variable ussage by doing.
	 * $.extend({ $.template.re , {
	 *     myvartype: /...../g
	 * }
	 *
	 * Then when creating a template do:
	 * var t = $.template("<div>...</div>", { regx: 'myvartype' });
	 */
	$.template.regx = $.template.instance.prototype.regx = {
	    jsp:        /\$\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        ext:        /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        jtemplates: /\{\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}\}/g
	};
	
	$.extend( $.template.regx , {	gettext: /\_\(([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\)/g });	
	
	/**
	 * Set the standard regular expression to be used.
	 */
	$.template.regx.standard = $.template.regx.jsp;
	
	/**
	 * Variable Helper Methods
	 *
	 * This is a collection of methods which can be used within the variable syntax, ie:
	 * ${variable:substr(0,30)} Which would only print a substring, 30 characters in length
	 * begining at the first character for the variable named "variable".
	 *
	 * A basic substring helper is provided as an example of how you can define helpers.
	 * To add more helpers simply do:
	 * $.extend( $.template.helpers , {
	 *	 sampleHelper: function() { ... }	
	 * });
	 */
	$.template.helpers = $.template.instance.prototype.helpers = {
		substr : function(value, start, length){
			return String(value).substr(start, length);
		}
	};


	/**
	 * Template Instance Methods
	 */
	$.extend( $.template.instance.prototype, {
		
		/**
		 * Apply Values to a Template
		 *
		 * This is the macro-work horse of the library, it receives an object
		 * and the properties of that objects are assigned to the template, where
		 * the variables in the template represent keys within the object itself.
		 *
		 * @param 	values 	An object of properties mapped to template variables
		 */
		apply: function(values) {
			if (this.options.compile) {
				return this.compiled(values);
			} else {
				var tpl = this;
				var fm = this.helpers;

				var fn = function(m, name, format, args) {
					if (format) {
						if (format.substr(0, 5) == "this."){
							return tpl.call(format.substr(5), values[name], values);
						} else {
							if (args) {
								// quoted values are required for strings in compiled templates, 
								// but for non compiled we need to strip them
								// quoted reversed for jsmin
								var re = /^\s*['"](.*)["']\s*$/;
								args = args.split(',');

								for(var i = 0, len = args.length; i < len; i++) {
									args[i] = args[i].replace(re, "$1");
								}
								args = [values[name]].concat(args);
							} else {
								args = [values[name]];
							}

							return fm[format].apply(fm, args);
						}
					} else {
						return values[name] !== undefined ? values[name] : "";
					}
				};

				return this.html.replace(this.options.regx, fn);
			}
		},

		/**
		 * Compile a template for speedier usage
		 */
		compile: function() {
			var sep = $.browser.mozilla ? "+" : ",";
			var fm = this.helpers;

			var fn = function(m, name, format, args){
				if (format) {
					args = args ? ',' + args : "";

					if (format.substr(0, 5) != "this.") {
						format = "fm." + format + '(';
					} else {
						format = 'this.call("'+ format.substr(5) + '", ';
						args = ", values";
					}
				} else {
					args= ''; format = "(values['" + name + "'] == undefined ? '' : ";
				}
				return "'"+ sep + format + "values['" + name + "']" + args + ")"+sep+"'";
			};

			var body;

			if ($.browser.mozilla) {
				body = "this.compiled = function(values){ return '" +
					   this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn) +
						"';};";
			} else {
				body = ["this.compiled = function(values){ return ['"];
				body.push(this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn));
				body.push("'].join('');};");
				body = body.join('');
			}
			eval(body);
			return this;
		}
	});


	/**
	 * Save a reference in this local scope to the original methods which we're 
	 * going to overload.
	 **/
	var $_old = {
	    domManip: $.fn.domManip,
	    text: $.fn.text,
	    html: $.fn.html
	};

	/**
	 * Overwrite the domManip method so that we can use things like append() by passing a 
	 * template object and macro parameters.
	 */
	$.fn.domManip = function( args, table, reverse, callback ) {
		if (args[0].isTemplate) {
			// Apply the template and it's arguments...
			args[0] = args[0].apply( args[1] );
			// Get rid of the arguements, we don't want to pass them on
			delete args[1];
		}

		// Call the original method
		var r = $_old.domManip.apply(this, arguments);

		return r;
	};

    /**
     * Overwrite the html() method
     */
	$.fn.html = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.html.apply(this, [value]);

		return r;
	};
	
	/**
	 * Overwrite the text() method
	 */
	$.fn.text = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.text.apply(this, [value]);

		return r;
	};

})(jQuery);
/*! ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is XPather - a firefox extension.
 *
 * The Initial Developer of the Original Code is
 * Viktor Zigo <xpather@alephzarro.com>.
 * Portions created by the Initial Developer are Copyright (C) 2005
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 * Alessandro Curci <htrex@memefarmers.net> - jQuery wrapper
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
 
 /* XPather,  Author: Viktor Zigo, http://xpath.alephzarro.com */
 
(function($) {
					
$.fn.generateXPath = function(options){
	
	$.fn.generateXPath.defaults = {
		depth:0,
		maxDepth: 99,
		context: document.body,
		namespace: null,
		kwds: { showId: 1 }
	};	

	var o = $.extend({}, $.fn.generateXPath.defaults, options );
	return walkUp(this[0], o.depth, o.maxDepth, o.context, o.namespace, o.kwds);

	function walkUp(node, depth, maxDepth, aSentinel, aDefaultNS, kwds)
	{
		var str = "";
		if(!node) return "";
		if(node==aSentinel) return ".";
		if((node.parentNode) && (depth < maxDepth)) {
			str += walkUp(node.parentNode, depth + 1, maxDepth, aSentinel, aDefaultNS, kwds);
		}

		switch (node.nodeType) {
			case 1:{
			// Node.ELEMENT_NODE
				var nname = node.nodeName;
				var conditions = [];
				var hasid = false;
				if (kwds['showClass'] && $(node).attr('class')) conditions.push("@class='"+node.getAttribute('class')+"'");
				if (kwds['showId'] && $(node).attr('id')) {
						conditions.push("@id='"+node.getAttribute('id')+"'");
						hasid = true;
				}
						
				//not identified by id?
				if(!hasid){
						var index = siblingIndex(node);
						//more than one sibling?
						if (index) {
								//are there also other conditions?
								if (conditions.length>0) conditions.push('position()='+index);
								else conditions.push(index);
						}
	
				}
				if (kwds['showNS']){
						if(node.prefix) nname=node.prefix+":"+nname;
						else if (aDefaultNS) nname="default:"+nname;
				}
				if (kwds['toLowercase']) nname=nname.toLowerCase();
				str += "/"+nname;
				
				if(conditions.length>0){
						str+="[";
						for(var i=0;i<conditions.length; i++){
								if (i>0) str+=' and ';
								str+=conditions[i];
						}
						str+="]";
				}
				break;
			}
			case 9:{
			// Node.DOCUMENT_NODE
				break;
			}
			case 3:{
			// Node.TEXT_NODE
				str+='/text()';
				var index = siblingIndex(node);
				if (index) str+="["+index+"]";
				break;
			}				
		}
		return str;            
	}
	
	// gets index of aNode (relative to other same-tag siblings)
	// first position = 1; returns null if the component is the only one 
	function siblingIndex(aNode){
		var siblings = aNode.parentNode.childNodes;
		var allCount = 0;
		var position;

		if (aNode.nodeType==1){ //Node.ELEMENT_NODE
			var name = aNode.nodeName;
			for (var i=0; i<siblings.length; i++){
				var node = siblings.item(i);
				if (node.nodeType==1){ //Node.ELEMENT_NODE
					if (node.nodeName == name) allCount++;  //nodeName includes namespace
					if (node == aNode) position = allCount;
				}
			}
		}
		else if (aNode.nodeType==3){ //Node.TEXT_NODE
			for (var i=0; i<siblings.length; i++){
				var node = siblings.item(i);
				if (node.nodeType==3){ //Node.TEXT_NODE
					allCount++;
					if (node == aNode) position = allCount;
				}
			}
		}
		if (allCount>1) return position;
	}
}
})(jQuery);

/*  
===============================================================================
WResize is the jQuery plugin for fixing the IE window resize bug
...............................................................................
                                               Copyright 2007 / Andrea Ercolino
-------------------------------------------------------------------------------
LICENSE: http://www.opensource.org/licenses/mit-license.php
WEBSITE: http://noteslog.com/
===============================================================================
*/

( function( $ ) 
{
	$.fn.wresize = function( f ) 
	{
		version = '1.1';
		wresize = {fired: false, width: 0};

		function resizeOnce() 
		{
			if ( $.browser.msie )
			{
				if ( ! wresize.fired )
				{
					wresize.fired = true;
				}
				else 
				{
					var version = parseInt( $.browser.version, 10 );
					wresize.fired = false;
					if ( version < 7 )
					{
						return false;
					}
					else if ( version == 7 )
					{
						//a vertical resize is fired once, an horizontal resize twice
						var width = $( window ).width();
						if ( width != wresize.width )
						{
							wresize.width = width;
							return false;
						}
					}
				}
			}

			return true;
		}

		function handleWResize( e ) 
		{
			if ( resizeOnce() )
			{
				return f.apply(this, [e]);
			}
		}

		this.each( function() 
		{
			if ( this == window )
			{
				$( this ).resize( handleWResize );
			}
			else
			{
				$( this ).resize( f );
			}
		} );

		return this;
	};

} ) ( jQuery );
(function($) {

$.textResizeDetector = function (options) {
  this.opts = $.extend({}, $.textResizeDetector.defaults, options);
  this.initialize();
};

$.textResizeDetector.defaults = {};

$.textResizeDetector.prototype = {
	id: 'ResizeDetector', 
	delay: 800,
    create: function() {
	  $('#'+this.id+'_text').remove();
      var sT = 'position: absolute; padding: 0; left: -9999px; font-size:'+30+'px; line-height:'+30+'px;';
      var sW = 'position: absolute; left: -9999px; width:10%; height:10%;';
      var elT = $.create('span',{'id':this.id+'_text','style':sT,'className':'write-protect'})[0];
      elT.innerHTML = '&nbsp;';
      var c = this.opts.target;
      c.appendChild(elT);
      this.sizeT = 30;
      return elT;
    },
	initialize: function() {
      this.create();
      this.check = window.setInterval(this.detect,this.delay);
	},
	
	detect: function() {
      //var newSizeT = this.getSize(this.id+'_text');
      var el = $('#ResizeDetector_text');
      if(!el.length) el = this.create();
      
      var newSizeT = el.height();
      //var newSizeW = this.getSize(this.id+'_win');

      if(newSizeT != this.sizeT) {
        var revertFactor = 30/newSizeT;
        $(document).trigger('textResize',revertFactor);
        this.sizeT = newSizeT;
        $('.fixedFontSize9').each(function(el){
            var f = Math.max(9*revertFactor,1);
            $(this).css({'fontSize':f+'px','lineHeight':f+'px'})
        });
        $('.fixedFontSize11').each(function(el){
            var f = Math.max(11*revertFactor,1);
            $(this).css({'fontSize':f+'px','lineHeight':f+'px'})
        });
        $('.fixedFontSize12').each(function(el){
            var f = Math.max(12*revertFactor,1);
            $(this).css({'fontSize':f+'px','lineHeight':f+'px'})
        });
      }
	}
}
})(jQuery);

/*! Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * Version: 3.0.2
 *
 * Requires: 1.2.2+
 */
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(f){var d=[].slice.call(arguments,1),g=0,e=true;f=c.event.fix(f||window.event);f.type="mousewheel";if(f.wheelDelta){g=f.wheelDelta/120}if(f.detail){g=-f.detail/3}d.unshift(f,g);return c.event.handle.apply(this,d)}})(jQuery);/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 9/11/2008
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Tested with jQuery 1.2.6. On FF 2/3, IE 6/7, Opera 9.2/5 and Safari 3. on Windows.
 *
 * @author Ariel Flesler
 * @version 1.4
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'y',
		duration:1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window).scrollable();
	};

	// Hack, hack, hack... stay away!
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn.scrollable = function(){
		return this.map(function(){
			// Just store it, we might need it
			var win = this.parentWindow || this.defaultView,
				// If it's a document, get its iframe or the window if it's THE document
				elem = this.nodeName == '#document' ? win.frameElement || win : this,
				// Get the corresponding document
				doc = elem.contentDocument || (elem.contentWindow || elem).document,
				isWin = elem.setInterval;

			return elem.nodeName == 'IFRAME' || isWin && $.browser.safari ? doc.body
				: isWin ? doc.documentElement
				: this;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this.scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(px)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					Dim = axis == 'x' ? 'Width' : 'Height',
					dim = Dim.toLowerCase();

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[dim]() * settings.over[pos];
				}else
					attr[key] = targ[pos];

				// Number or 'number'
				if( /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max(Dim) );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});			
			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};
			function max( Dim ){
				var attr ='scroll'+Dim,
					doc = elem.ownerDocument;
				
				return win
						? Math.max( doc.documentElement[attr], doc.body[attr]  )
						: elem[attr];
			};
		}).end();
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );/*!
 * SimpleModal 1.4.1 - jQuery Plugin
 * http://www.ericmmartin.com/projects/simplemodal/
 * Copyright (c) 2010 Eric Martin (http://twitter.com/ericmmartin)
 * Dual licensed under the MIT and GPL licenses
 * Revision: $Id: jquery.simplemodal.js 261 2010-11-05 21:16:20Z emartin24 $
 */

/**
 * SimpleModal is a lightweight jQuery plugin that provides a simple
 * interface to create a modal dialog.
 *
 * The goal of SimpleModal is to provide developers with a cross-browser
 * overlay and container that will be populated with data provided to
 * SimpleModal.
 *
 * There are two ways to call SimpleModal:
 * 1) As a chained function on a jQuery object, like $('#myDiv').modal();.
 * This call would place the DOM object, #myDiv, inside a modal dialog.
 * Chaining requires a jQuery object. An optional options object can be
 * passed as a parameter.
 *
 * @example $('<div>my data</div>').modal({options});
 * @example $('#myDiv').modal({options});
 * @example jQueryObject.modal({options});
 *
 * 2) As a stand-alone function, like $.modal(data). The data parameter
 * is required and an optional options object can be passed as a second
 * parameter. This method provides more flexibility in the types of data
 * that are allowed. The data could be a DOM object, a jQuery object, HTML
 * or a string.
 *
 * @example $.modal('<div>my data</div>', {options});
 * @example $.modal('my data', {options});
 * @example $.modal($('#myDiv'), {options});
 * @example $.modal(jQueryObject, {options});
 * @example $.modal(document.getElementById('myDiv'), {options});
 *
 * A SimpleModal call can contain multiple elements, but only one modal
 * dialog can be created at a time. Which means that all of the matched
 * elements will be displayed within the modal container.
 *
 * SimpleModal internally sets the CSS needed to display the modal dialog
 * properly in all browsers, yet provides the developer with the flexibility
 * to easily control the look and feel. The styling for SimpleModal can be
 * done through external stylesheets, or through SimpleModal, using the
 * overlayCss, containerCss, and dataCss options.
 *
 * SimpleModal has been tested in the following browsers:
 * - IE 6, 7, 8, 9
 * - Firefox 2, 3, 4
 * - Opera 9, 10
 * - Safari 3, 4, 5
 * - Chrome 1, 2, 3, 4, 5, 6
 *
 * @name SimpleModal
 * @type jQuery
 * @requires jQuery v1.2.4
 * @cat Plugins/Windows and Overlays
 * @author Eric Martin (http://ericmmartin.com)
 * @version 1.4.1
 */
;(function ($) {
	var ie6 = $.browser.msie && parseInt($.browser.version) === 6 && typeof window['XMLHttpRequest'] !== 'object',
		ie7 = $.browser.msie && parseInt($.browser.version) === 7,
		ieQuirks = null,
		w = [];

	/*
	 * Create and display a modal dialog.
	 *
	 * @param {string, object} data A string, jQuery object or DOM object
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.modal = function (data, options) {
		return $.modal.impl.init(data, options);
	};

	/*
	 * Close the modal dialog.
	 */
	$.modal.close = function () {
		$.modal.impl.close();
	};

	/*
	 * Set focus on first or last visible input in the modal dialog. To focus on the last
	 * element, call $.modal.focus('last'). If no input elements are found, focus is placed
	 * on the data wrapper element.
	 */
	$.modal.focus = function (pos) {
		$.modal.impl.focus(pos);
	};

	/*
	 * Determine and set the dimensions of the modal dialog container.
	 * setPosition() is called if the autoPosition option is true.
	 */
	$.modal.setContainerDimensions = function () {
		$.modal.impl.setContainerDimensions();
	};

	/*
	 * Re-position the modal dialog.
	 */
	$.modal.setPosition = function () {
		$.modal.impl.setPosition();
	};

	/*
	 * Update the modal dialog. If new dimensions are passed, they will be used to determine
	 * the dimensions of the container.
	 *
	 * setContainerDimensions() is called, which in turn calls setPosition(), if enabled.
	 * Lastly, focus() is called is the focus option is true.
	 */
	$.modal.update = function (height, width) {
		$.modal.impl.update(height, width);
	};

	/*
	 * Chained function to create a modal dialog.
	 *
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.fn.modal = function (options) {
		return $.modal.impl.init(this, options);
	};

	/*
	 * SimpleModal default options
	 *
	 * appendTo:		(String:'body') The jQuery selector to append the elements to. For .NET, use 'form'.
	 * focus:			(Boolean:true) Focus in the first visible, enabled element?
	 * opacity:			(Number:50) The opacity value for the overlay div, from 0 - 100
	 * overlayId:		(String:'simplemodal-overlay') The DOM element id for the overlay div
	 * overlayCss:		(Object:{}) The CSS styling for the overlay div
	 * containerId:		(String:'simplemodal-container') The DOM element id for the container div
	 * containerCss:	(Object:{}) The CSS styling for the container div
	 * dataId:			(String:'simplemodal-data') The DOM element id for the data div
	 * dataCss:			(Object:{}) The CSS styling for the data div
	 * minHeight:		(Number:null) The minimum height for the container
	 * minWidth:		(Number:null) The minimum width for the container
	 * maxHeight:		(Number:null) The maximum height for the container. If not specified, the window height is used.
	 * maxWidth:		(Number:null) The maximum width for the container. If not specified, the window width is used.
	 * autoResize:		(Boolean:false) Automatically resize the container if it exceeds the browser window dimensions?
	 * autoPosition:	(Boolean:true) Automatically position the container upon creation and on window resize?
	 * zIndex:			(Number: 1000) Starting z-index value
	 * close:			(Boolean:true) If true, closeHTML, escClose and overClose will be used if set.
	 							If false, none of them will be used.
	 * closeHTML:		(String:'<a class="modalCloseImg" title="Close"></a>') The HTML for the default close link.
								SimpleModal will automatically add the closeClass to this element.
	 * closeClass:		(String:'simplemodal-close') The CSS class used to bind to the close event
	 * escClose:		(Boolean:true) Allow Esc keypress to close the dialog?
	 * overlayClose:	(Boolean:false) Allow click on overlay to close the dialog?
	 * position:		(Array:null) Position of container [top, left]. Can be number of pixels or percentage
	 * persist:			(Boolean:false) Persist the data across modal calls? Only used for existing
								DOM elements. If true, the data will be maintained across modal calls, if false,
								the data will be reverted to its original state.
	 * modal:			(Boolean:true) User will be unable to interact with the page below the modal or tab away from the dialog.
								If false, the overlay, iframe, and certain events will be disabled allowing the user to interact
								with the page below the dialog.
	 * onOpen:			(Function:null) The callback function used in place of SimpleModal's open
	 * onShow:			(Function:null) The callback function used after the modal dialog has opened
	 * onClose:			(Function:null) The callback function used in place of SimpleModal's close
	 */
	$.modal.defaults = {
		appendTo: 'body',
		focus: true,
		opacity: 50,
		overlayId: 'simplemodal-overlay',
		overlayCss: {},
		containerId: 'simplemodal-container',
		containerCss: {},
		dataId: 'simplemodal-data',
		dataCss: {},
		minHeight: null,
		minWidth: null,
		maxHeight: null,
		maxWidth: null,
		autoResize: false,
		autoPosition: true,
		zIndex: 1000,
		close: true,
		closeHTML: '<a class="modalCloseImg" title="Close"></a>',
		closeClass: 'simplemodal-close',
		escClose: true,
		overlayClose: false,
		position: null,
		persist: false,
		modal: true,
		onOpen: null,
		onShow: null,
		onClose: null
	};

	/*
	 * Main modal object
	 * o = options
	 */
	$.modal.impl = {
		/*
		 * Contains the modal dialog elements and is the object passed
		 * back to the callback (onOpen, onShow, onClose) functions
		 */
		d: {},
		/*
		 * Initialize the modal dialog
		 */
		init: function (data, options) {
			var s = this;

			// don't allow multiple calls
			if (s.d.data) {
				return false;
			}

			// $.boxModel is undefined if checked earlier
			ieQuirks = $.browser.msie && !$.boxModel;

			// merge defaults and user options
			s.o = $.extend({}, $.modal.defaults, options);

			// keep track of z-index
			s.zIndex = s.o.zIndex;

			// set the onClose callback flag
			s.occb = false;

			// determine how to handle the data based on its type
			if (typeof data === 'object') {
				// convert DOM object to a jQuery object
				data = data instanceof jQuery ? data : $(data);
				s.d.placeholder = false;

				// if the object came from the DOM, keep track of its parent
				if (data.parent().parent().size() > 0) {
					data.before($('<span></span>')
						.attr('id', 'simplemodal-placeholder')
						.css({display: 'none'}));

					s.d.placeholder = true;
					s.display = data.css('display');

					// persist changes? if not, make a clone of the element
					if (!s.o.persist) {
						s.d.orig = data.clone(true);
					}
				}
			}
			else if (typeof data === 'string' || typeof data === 'number') {
				// just insert the data as innerHTML
				data = $('<div></div>').html(data);
			}
			else {
				// unsupported data type!
				alert('SimpleModal Error: Unsupported data type: ' + typeof data);
				return s;
			}

			// create the modal overlay, container and, if necessary, iframe
			s.create(data);
			data = null;

			// display the modal dialog
			s.open();

			// useful for adding events/manipulating data in the modal dialog
			if ($.isFunction(s.o.onShow)) {
				s.o.onShow.apply(s, [s.d]);
			}

			// don't break the chain =)
			return s;
		},
		/*
		 * Create and add the modal overlay and container to the page
		 */
		create: function (data) {
			var s = this;

			// get the window properties
			w = s.getDimensions();

			// add an iframe to prevent select options from bleeding through
			if (s.o.modal && ie6) {
				s.d.iframe = $('<iframe src="javascript:false;"></iframe>')
					.css($.extend(s.o.iframeCss, {
						display: 'none',
						opacity: 0,
						position: 'fixed',
						height: w[0],
						width: w[1],
						zIndex: s.o.zIndex,
						top: 0,
						left: 0
					}))
					.appendTo(s.o.appendTo);
			}

			// create the overlay
			s.d.overlay = $('<div></div>')
				.attr('id', s.o.overlayId)
				.addClass('simplemodal-overlay')
				.css($.extend(s.o.overlayCss, {
					display: 'none',
					opacity: s.o.opacity / 100,
					height: s.o.modal ? w[0] : 0,
					width: s.o.modal ? w[1] : 0,
					position: 'fixed',
					left: 0,
					top: 0,
					zIndex: s.o.zIndex + 1
				}))
				.appendTo(s.o.appendTo);

			// create the container
			s.d.container = $('<div></div>')
				.attr('id', s.o.containerId)
				.addClass('simplemodal-container')
				.css($.extend(s.o.containerCss, {
					display: 'none',
					position: 'fixed',
					zIndex: s.o.zIndex + 2
				}))
				.append(s.o.close && s.o.closeHTML
					? $(s.o.closeHTML).addClass(s.o.closeClass)
					: '')
				.appendTo(s.o.appendTo);

			s.d.wrap = $('<div></div>')
				.attr('tabIndex', -1)
				.addClass('simplemodal-wrap')
				.css({height: '100%', outline: 0, width: '100%'})
				.appendTo(s.d.container);

			// add styling and attributes to the data
			// append to body to get correct dimensions, then move to wrap
			s.d.data = data
				.attr('id', data.attr('id') || s.o.dataId)
				.addClass('simplemodal-data')
				.css($.extend(s.o.dataCss, {
						display: 'none'
				}))
				.appendTo('body');
			data = null;

			s.setContainerDimensions();
			s.d.data.appendTo(s.d.wrap);

			// fix issues with IE
			if (ie6 || ieQuirks) {
				s.fixIE();
			}
		},
		/*
		 * Bind events
		 */
		bindEvents: function () {
			var s = this;

			// bind the close event to any element with the closeClass class
			$('.' + s.o.closeClass).bind('click.simplemodal', function (e) {
				e.preventDefault();
				s.close();
			});

			// bind the overlay click to the close function, if enabled
			if (s.o.modal && s.o.close && s.o.overlayClose) {
				s.d.overlay.bind('click.simplemodal', function (e) {
					e.preventDefault();
					s.close();
				});
			}

			// bind keydown events
			$(document).bind('keydown.simplemodal', function (e) {
				if (s.o.modal && e.keyCode === 9) { // TAB
					s.watchTab(e);
				}
				else if ((s.o.close && s.o.escClose) && e.keyCode === 27) { // ESC
					e.preventDefault();
					s.close();
				}
			});

			// update window size
			$(window).bind('resize.simplemodal', function () {
				// redetermine the window width/height
				w = s.getDimensions();

				// reposition the dialog
				s.o.autoResize ? s.setContainerDimensions() : s.o.autoPosition && s.setPosition();

				if (ie6 || ieQuirks) {
					s.fixIE();
				}
				else if (s.o.modal) {
					// update the iframe & overlay
					s.d.iframe && s.d.iframe.css({height: w[0], width: w[1]});
					s.d.overlay.css({height: w[0], width: w[1]});
				}
			});
		},
		/*
		 * Unbind events
		 */
		unbindEvents: function () {
			$('.' + this.o.closeClass).unbind('click.simplemodal');
			$(document).unbind('keydown.simplemodal');
			$(window).unbind('resize.simplemodal');
			this.d.overlay.unbind('click.simplemodal');
		},
		/*
		 * Fix issues in IE6 and IE7 in quirks mode
		 */
		fixIE: function () {
			var s = this, p = s.o.position;

			// simulate fixed position - adapted from BlockUI
			$.each([s.d.iframe || null, !s.o.modal ? null : s.d.overlay, s.d.container], function (i, el) {
				if (el) {
					var bch = 'document.body.clientHeight', bcw = 'document.body.clientWidth',
						bsh = 'document.body.scrollHeight', bsl = 'document.body.scrollLeft',
						bst = 'document.body.scrollTop', bsw = 'document.body.scrollWidth',
						ch = 'document.documentElement.clientHeight', cw = 'document.documentElement.clientWidth',
						sl = 'document.documentElement.scrollLeft', st = 'document.documentElement.scrollTop',
						s = el[0].style;

					s.position = 'absolute';
					if (i < 2) {
						s.removeExpression('height');
						s.removeExpression('width');
						s.setExpression('height','' + bsh + ' > ' + bch + ' ? ' + bsh + ' : ' + bch + ' + "px"');
						s.setExpression('width','' + bsw + ' > ' + bcw + ' ? ' + bsw + ' : ' + bcw + ' + "px"');
					}
					else {
						var te, le;
						if (p && p.constructor === Array) {
							var top = p[0]
								? typeof p[0] === 'number' ? p[0].toString() : p[0].replace(/px/, '')
								: el.css('top').replace(/px/, '');
							te = top.indexOf('%') === -1
								? top + ' + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"'
								: parseInt(top.replace(/%/, '')) + ' * ((' + ch + ' || ' + bch + ') / 100) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';

							if (p[1]) {
								var left = typeof p[1] === 'number' ? p[1].toString() : p[1].replace(/px/, '');
								le = left.indexOf('%') === -1
									? left + ' + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"'
									: parseInt(left.replace(/%/, '')) + ' * ((' + cw + ' || ' + bcw + ') / 100) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
							}
						}
						else {
							te = '(' + ch + ' || ' + bch + ') / 2 - (this.offsetHeight / 2) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
							le = '(' + cw + ' || ' + bcw + ') / 2 - (this.offsetWidth / 2) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
						}
						s.removeExpression('top');
						s.removeExpression('left');
						s.setExpression('top', te);
						s.setExpression('left', le);
					}
				}
			});
		},
		/*
		 * Place focus on the first or last visible input
		 */
		focus: function (pos) {
			var s = this, p = pos && $.inArray(pos, ['first', 'last']) !== -1 ? pos : 'first';

			// focus on dialog or the first visible/enabled input element
			var input = $(':input:enabled:visible:' + p, s.d.wrap);
			setTimeout(function () {
				input.length > 0 ? input.focus() : s.d.wrap.focus();
			}, 10);
		},
		getDimensions: function () {
			var el = $(window);

			// fix a jQuery/Opera bug with determining the window height
			var h = $.browser.opera && $.browser.version > '9.5' && $.fn.jquery < '1.3'
						|| $.browser.opera && $.browser.version < '9.5' && $.fn.jquery > '1.2.6'
				? el[0].innerHeight : el.height();

			return [h, el.width()];
		},
		getVal: function (v, d) {
			return v ? (typeof v === 'number' ? v
					: v === 'auto' ? 0
					: v.indexOf('%') > 0 ? ((parseInt(v.replace(/%/, '')) / 100) * (d === 'h' ? w[0] : w[1]))
					: parseInt(v.replace(/px/, '')))
				: null;
		},
		/*
		 * Update the container. Set new dimensions, if provided.
		 * Focus, if enabled. Re-bind events.
		 */
		update: function (height, width) {
			var s = this;

			// prevent update if dialog does not exist
			if (!s.d.data) {
				return false;
			}

			// reset orig values
			s.d.origHeight = s.getVal(height, 'h');
			s.d.origWidth = s.getVal(width, 'w');

			// hide data to prevent screen flicker
			s.d.data.hide();
			height && s.d.container.css('height', height);
			width && s.d.container.css('width', width);
			s.setContainerDimensions();
			s.d.data.show();
			s.o.focus && s.focus();

			// rebind events
			s.unbindEvents();
			s.bindEvents();
		},
		setContainerDimensions: function () {
			var s = this,
				badIE = ie6 || ie7;

			// get the dimensions for the container and data
			var ch = s.d.origHeight ? s.d.origHeight : $.browser.opera ? s.d.container.height() : s.getVal(badIE ? s.d.container[0].currentStyle['height'] : s.d.container.css('height'), 'h'),
				cw = s.d.origWidth ? s.d.origWidth : $.browser.opera ? s.d.container.width() : s.getVal(badIE ? s.d.container[0].currentStyle['width'] : s.d.container.css('width'), 'w'),
				dh = s.d.data.outerHeight(true), dw = s.d.data.outerWidth(true);

			s.d.origHeight = s.d.origHeight || ch;
			s.d.origWidth = s.d.origWidth || cw;

			// mxoh = max option height, mxow = max option width
			var mxoh = s.o.maxHeight ? s.getVal(s.o.maxHeight, 'h') : null,
				mxow = s.o.maxWidth ? s.getVal(s.o.maxWidth, 'w') : null,
				mh = mxoh && mxoh < w[0] ? mxoh : w[0],
				mw = mxow && mxow < w[1] ? mxow : w[1];

			// moh = min option height
			var moh = s.o.minHeight ? s.getVal(s.o.minHeight, 'h') : 'auto';
			if (!ch) {
				if (!dh) {ch = moh;}
				else {
					if (dh > mh) {ch = mh;}
					else if (s.o.minHeight && moh !== 'auto' && dh < moh) {ch = moh;}
					else {ch = dh;}
				}
			}
			else {
				ch = s.o.autoResize && ch > mh ? mh : ch < moh ? moh : ch;
			}

			// mow = min option width
			var mow = s.o.minWidth ? s.getVal(s.o.minWidth, 'w') : 'auto';
			if (!cw) {
				if (!dw) {cw = mow;}
				else {
					if (dw > mw) {cw = mw;}
					else if (s.o.minWidth && mow !== 'auto' && dw < mow) {cw = mow;}
					else {cw = dw;}
				}
			}
			else {
				cw = s.o.autoResize && cw > mw ? mw : cw < mow ? mow : cw;
			}

			s.d.container.css({height: ch, width: cw});
			s.d.wrap.css({overflow: (dh > ch || dw > cw) ? 'auto' : 'visible'});
			s.o.autoPosition && s.setPosition();
		},
		setPosition: function () {
			var s = this, top, left,
				hc = (w[0]/2) - (s.d.container.outerHeight(true)/2),
				vc = (w[1]/2) - (s.d.container.outerWidth(true)/2);

			if (s.o.position && Object.prototype.toString.call(s.o.position) === '[object Array]') {
				top = s.o.position[0] || hc;
				left = s.o.position[1] || vc;
			} else {
				top = hc;
				left = vc;
			}
			s.d.container.css({left: left, top: top});
		},
		watchTab: function (e) {
			var s = this;

			if ($(e.target).parents('.simplemodal-container').length > 0) {
				// save the list of inputs
				s.inputs = $(':input:enabled:visible:first, :input:enabled:visible:last', s.d.data[0]);

				// if it's the first or last tabbable element, refocus
				if ((!e.shiftKey && e.target === s.inputs[s.inputs.length -1]) ||
						(e.shiftKey && e.target === s.inputs[0]) ||
						s.inputs.length === 0) {
					e.preventDefault();
					var pos = e.shiftKey ? 'last' : 'first';
					s.focus(pos);
				}
			}
			else {
				// might be necessary when custom onShow callback is used
				e.preventDefault();
				s.focus();
			}
		},
		/*
		 * Open the modal dialog elements
		 * - Note: If you use the onOpen callback, you must "show" the
		 *	        overlay and container elements manually
		 *         (the iframe will be handled by SimpleModal)
		 */
		open: function () {
			var s = this;
			// display the iframe
			s.d.iframe && s.d.iframe.show();

			if ($.isFunction(s.o.onOpen)) {
				// execute the onOpen callback
				s.o.onOpen.apply(s, [s.d]);
			}
			else {
				// display the remaining elements
				s.d.overlay.show();
				s.d.container.show();
				s.d.data.show();
			}

			s.o.focus && s.focus();

			// bind default events
			s.bindEvents();
		},
		/*
		 * Close the modal dialog
		 * - Note: If you use an onClose callback, you must remove the
		 *         overlay, container and iframe elements manually
		 *
		 * @param {boolean} external Indicates whether the call to this
		 *     function was internal or external. If it was external, the
		 *     onClose callback will be ignored
		 */
		close: function () {
			var s = this;

			// prevent close when dialog does not exist
			if (!s.d.data) {
				return false;
			}

			// remove the default events
			s.unbindEvents();

			if ($.isFunction(s.o.onClose) && !s.occb) {
				// set the onClose callback flag
				s.occb = true;

				// execute the onClose callback
				s.o.onClose.apply(s, [s.d]);
			}
			else {
				// if the data came from the DOM, put it back
				if (s.d.placeholder) {
					var ph = $('#simplemodal-placeholder');
					// save changes to the data?
					if (s.o.persist) {
						// insert the (possibly) modified data back into the DOM
						ph.replaceWith(s.d.data.removeClass('simplemodal-data').css('display', s.display));
					}
					else {
						// remove the current and insert the original,
						// unmodified data back into the DOM
						s.d.data.hide().remove();
						ph.replaceWith(s.d.orig);
					}
				}
				else {
					// otherwise, remove it
					s.d.data.hide().remove();
				}

				// remove the remaining elements
				s.d.container.hide().remove();
				s.d.overlay.hide();
				s.d.iframe && s.d.iframe.hide().remove();
				setTimeout(function(){
					// opera work-around
					s.d.overlay.remove();

					// reset the dialog object
					s.d = {};
				}, 10);
			}
		}
	};
})(jQuery);
/**
 * jGrowl 1.2.6
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by Stan Lemon <stosh1985@gmail.com>
 * Last updated: 2011.03.27
 *
 * jGrowl is a jQuery plugin implementing unobtrusive userland notifications.  These 
 * notifications function similarly to the Growl Framework available for
 * Mac OS X (http://growl.info).
 *
 * To Do:
 * - Move library settings to containers and allow them to be changed per container
 *
 * Changes in 1.2.6
 * - Fixed js error when a notification is opening and closing at the same time
 * 
 * Changes in 1.2.5
 * - Changed wrapper jGrowl's options usage to "o" instead of $.jGrowl.defaults
 * - Added themeState option to control 'highlight' or 'error' for jQuery UI
 * - Ammended some CSS to provide default positioning for nested usage.
 * - Changed some CSS to be prefixed with jGrowl- to prevent namespacing issues
 * - Added two new options - openDuration and closeDuration to allow 
 *   better control of notification open and close speeds, respectively 
 *   Patch contributed by Jesse Vincet.
 * - Added afterOpen callback.  Patch contributed by Russel Branca.
 *
 * Changes in 1.2.4
 * - Fixed IE bug with the close-all button
 * - Fixed IE bug with the filter CSS attribute (special thanks to gotwic)
 * - Update IE opacity CSS
 * - Changed font sizes to use "em", and only set the base style
 *
 * Changes in 1.2.3
 * - The callbacks no longer use the container as context, instead they use the actual notification
 * - The callbacks now receive the container as a parameter after the options parameter
 * - beforeOpen and beforeClose now check the return value, if it's false - the notification does
 *   not continue.  The open callback will also halt execution if it returns false.
 * - Fixed bug where containers would get confused
 * - Expanded the pause functionality to pause an entire container.
 *
 * Changes in 1.2.2
 * - Notification can now be theme rolled for jQuery UI, special thanks to Jeff Chan!
 *
 * Changes in 1.2.1
 * - Fixed instance where the interval would fire the close method multiple times.
 * - Added CSS to hide from print media
 * - Fixed issue with closer button when div { position: relative } is set
 * - Fixed leaking issue with multiple containers.  Special thanks to Matthew Hanlon!
 *
 * Changes in 1.2.0
 * - Added message pooling to limit the number of messages appearing at a given time.
 * - Closing a notification is now bound to the notification object and triggered by the close button.
 *
 * Changes in 1.1.2
 * - Added iPhone styled example
 * - Fixed possible IE7 bug when determining if the ie6 class shoudl be applied.
 * - Added template for the close button, so that it's content could be customized.
 *
 * Changes in 1.1.1
 * - Fixed CSS styling bug for ie6 caused by a mispelling
 * - Changes height restriction on default notifications to min-height
 * - Added skinned examples using a variety of images
 * - Added the ability to customize the content of the [close all] box
 * - Added jTweet, an example of using jGrowl + Twitter
 *
 * Changes in 1.1.0
 * - Multiple container and instances.
 * - Standard $.jGrowl() now wraps $.fn.jGrowl() by first establishing a generic jGrowl container.
 * - Instance methods of a jGrowl container can be called by $.fn.jGrowl(methodName)
 * - Added glue preferenced, which allows notifications to be inserted before or after nodes in the container
 * - Added new log callback which is called before anything is done for the notification
 * - Corner's attribute are now applied on an individual notification basis.
 *
 * Changes in 1.0.4
 * - Various CSS fixes so that jGrowl renders correctly in IE6.
 *
 * Changes in 1.0.3
 * - Fixed bug with options persisting across notifications
 * - Fixed theme application bug
 * - Simplified some selectors and manipulations.
 * - Added beforeOpen and beforeClose callbacks
 * - Reorganized some lines of code to be more readable
 * - Removed unnecessary this.defaults context
 * - If corners plugin is present, it's now customizable.
 * - Customizable open animation.
 * - Customizable close animation.
 * - Customizable animation easing.
 * - Added customizable positioning (top-left, top-right, bottom-left, bottom-right, center)
 *
 * Changes in 1.0.2
 * - All CSS styling is now external.
 * - Added a theme parameter which specifies a secondary class for styling, such
 *   that notifications can be customized in appearance on a per message basis.
 * - Notification life span is now customizable on a per message basis.
 * - Added the ability to disable the global closer, enabled by default.
 * - Added callbacks for when a notification is opened or closed.
 * - Added callback for the global closer.
 * - Customizable animation speed.
 * - jGrowl now set itself up and tears itself down.
 *
 * Changes in 1.0.1:
 * - Removed dependency on metadata plugin in favor of .data()
 * - Namespaced all events
 */
(function($) {

	/** jGrowl Wrapper - Establish a base jGrowl Container for compatibility with older releases. **/
	$.jGrowl = function( m , o ) {
		// To maintain compatibility with older version that only supported one instance we'll create the base container.
		if ( $('#jGrowl').size() == 0 ) 
			$('<div id="jGrowl"></div>').addClass( (o && o.position) ? o.position : $.jGrowl.defaults.position ).appendTo('body');

		// Create a notification on the container.
		$('#jGrowl').jGrowl(m,o);
	};


	/** Raise jGrowl Notification on a jGrowl Container **/
	$.fn.jGrowl = function( m , o ) {
		if ( $.isFunction(this.each) ) {
			var args = arguments;

			return this.each(function() {
				var self = this;

				/** Create a jGrowl Instance on the Container if it does not exist **/
				if ( $(this).data('jGrowl.instance') == undefined ) {
					$(this).data('jGrowl.instance', $.extend( new $.fn.jGrowl(), { notifications: [], element: null, interval: null } ));
					$(this).data('jGrowl.instance').startup( this );
				}

				/** Optionally call jGrowl instance methods, or just raise a normal notification **/
				if ( $.isFunction($(this).data('jGrowl.instance')[m]) ) {
					$(this).data('jGrowl.instance')[m].apply( $(this).data('jGrowl.instance') , $.makeArray(args).slice(1) );
				} else {
					$(this).data('jGrowl.instance').create( m , o );
				}
			});
		};
	};

	$.extend( $.fn.jGrowl.prototype , {

		/** Default JGrowl Settings **/
		defaults: {
			pool: 			1,
			header: 		'',
			group: 			'',
			sticky: 		false,
			position: 		'top-right',
			glue: 			'after',
			theme: 			'default',
			themeState: 	'highlight',
			corners: 		'10px',
			check: 			250,
			life: 			3000,
			closeDuration:  'normal',
			openDuration:   'normal',
			easing: 		'swing',
			closer: 		true,
			closeTemplate: '&times;',
			closerTemplate: '<div>[ close all ]</div>',
			log: 			function(e,m,o) {},
			beforeOpen: 	function(e,m,o) {},
			afterOpen: 		function(e,m,o) {},
			open: 			function(e,m,o) {},
			beforeClose: 	function(e,m,o) {},
			close: 			function(e,m,o) {},
			animateOpen: 	{
				opacity: 	'show'
			},
			animateClose: 	{
				opacity: 	'hide'
			}
		},
		
		notifications: [],
		
		/** jGrowl Container Node **/
		element: 	null,
	
		/** Interval Function **/
		interval:   null,
		
		/** Create a Notification **/
		create: 	function( message , o ) {
			var o = $.extend({}, this.defaults, o);

			/* To keep backward compatibility with 1.24 and earlier, honor 'speed' if the user has set it */
			if (typeof o.speed !== 'undefined') {
				o.openDuration = o.speed;
				o.closeDuration = o.speed;
			}

			this.notifications.push({ message: message , options: o });
			
			o.log.apply( this.element , [this.element,message,o] );
		},
		
		render: 		function( notification ) {
			var self = this;
			var message = notification.message;
			var o = notification.options;

			// Support for jQuery theme-states, if this is not used it displays a widget header
			o.themeState = (o.themeState == '') ? '' : 'ui-state-' + o.themeState;

			var notification = $(
				'<div class="jGrowl-notification ' + o.themeState + ' ui-corner-all' + 
				((o.group != undefined && o.group != '') ? ' ' + o.group : '') + '">' +
				'<div class="jGrowl-close">' + o.closeTemplate + '</div>' +
				'<div class="jGrowl-header">' + o.header + '</div>' +
				'<div class="jGrowl-message">' + message + '</div></div>'
			).data("jGrowl", o).addClass(o.theme).children('div.jGrowl-close').bind("click.jGrowl", function() {
				$(this).parent().trigger('jGrowl.close');
			}).parent();


			/** Notification Actions **/
			$(notification).bind("mouseover.jGrowl", function() {
				$('div.jGrowl-notification', self.element).data("jGrowl.pause", true);
			}).bind("mouseout.jGrowl", function() {
				$('div.jGrowl-notification', self.element).data("jGrowl.pause", false);
			}).bind('jGrowl.beforeOpen', function() {
				if ( o.beforeOpen.apply( notification , [notification,message,o,self.element] ) != false ) {
					$(this).trigger('jGrowl.open');
				}
			}).bind('jGrowl.open', function() {
				if ( o.open.apply( notification , [notification,message,o,self.element] ) != false ) {
					if ( o.glue == 'after' ) {
						$('div.jGrowl-notification:last', self.element).after(notification);
					} else {
						$('div.jGrowl-notification:first', self.element).before(notification);
					}
					
					$(this).animate(o.animateOpen, o.openDuration, o.easing, function() {
						// Fixes some anti-aliasing issues with IE filters.
						if ($.browser.msie && (parseInt($(this).css('opacity'), 10) === 1 || parseInt($(this).css('opacity'), 10) === 0))
							this.style.removeAttribute('filter');

						if ( $(this).data("jGrowl") != null ) // Happens when a notification is closing before it's open.
							$(this).data("jGrowl").created = new Date();
						
						$(this).trigger('jGrowl.afterOpen');
					});
				}
			}).bind('jGrowl.afterOpen', function() {
				o.afterOpen.apply( notification , [notification,message,o,self.element] );
			}).bind('jGrowl.beforeClose', function() {
				if ( o.beforeClose.apply( notification , [notification,message,o,self.element] ) != false )
					$(this).trigger('jGrowl.close');
			}).bind('jGrowl.close', function() {
				// Pause the notification, lest during the course of animation another close event gets called.
				$(this).data('jGrowl.pause', true);
				$(this).animate(o.animateClose, o.closeDuration, o.easing, function() {
					if ( $.isFunction(o.close) ) {
						if ( o.close.apply( notification , [notification,message,o,self.element] ) !== false )
							$(this).remove();
					} else {
						$(this).remove();
					}
				});
			}).trigger('jGrowl.beforeOpen');
		
			/** Optional Corners Plugin **/
			if ( o.corners != '' && $.fn.corner != undefined ) $(notification).corner( o.corners );

			/** Add a Global Closer if more than one notification exists **/
			if ( $('div.jGrowl-notification:parent', self.element).size() > 1 && 
				 $('div.jGrowl-closer', self.element).size() == 0 && this.defaults.closer != false ) {
				$(this.defaults.closerTemplate).addClass('jGrowl-closer ' + this.defaults.themeState + ' ui-corner-all').addClass(this.defaults.theme)
					.appendTo(self.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing)
					.bind("click.jGrowl", function() {
						$(this).siblings().trigger("jGrowl.beforeClose");

						if ( $.isFunction( self.defaults.closer ) ) {
							self.defaults.closer.apply( $(this).parent()[0] , [$(this).parent()[0]] );
						}
					});
			};
		},

		/** Update the jGrowl Container, removing old jGrowl notifications **/
		update:	 function() {
			$(this.element).find('div.jGrowl-notification:parent').each( function() {
				if ( $(this).data("jGrowl") != undefined && $(this).data("jGrowl").created != undefined && 
					 ($(this).data("jGrowl").created.getTime() + parseInt($(this).data("jGrowl").life))  < (new Date()).getTime() && 
					 $(this).data("jGrowl").sticky != true && 
					 ($(this).data("jGrowl.pause") == undefined || $(this).data("jGrowl.pause") != true) ) {

					// Pause the notification, lest during the course of animation another close event gets called.
					$(this).trigger('jGrowl.beforeClose');
				}
			});

			if ( this.notifications.length > 0 && 
				 (this.defaults.pool == 0 || $(this.element).find('div.jGrowl-notification:parent').size() < this.defaults.pool) )
				this.render( this.notifications.shift() );

			if ( $(this.element).find('div.jGrowl-notification:parent').size() < 2 ) {
				$(this.element).find('div.jGrowl-closer').animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
					$(this).remove();
				});
			}
		},

		/** Setup the jGrowl Notification Container **/
		startup:	function(e) {
			this.element = $(e).addClass('jGrowl').append('<div class="jGrowl-notification"></div>');
			this.interval = setInterval( function() { 
				$(e).data('jGrowl.instance').update(); 
			}, parseInt(this.defaults.check));
			
			if ($.browser.msie && parseInt($.browser.version) < 7 && !window["XMLHttpRequest"]) {
				$(this.element).addClass('ie6');
			}
		},

		/** Shutdown jGrowl, removing it and clearing the interval **/
		shutdown:   function() {
			$(this.element).removeClass('jGrowl').find('div.jGrowl-notification').remove();
			clearInterval( this.interval );
		},
		
		close: 	function() {
			$(this.element).find('div.jGrowl-notification').each(function(){
				$(this).trigger('jGrowl.beforeClose');
			});
		}
	});
	
	/** Reference the Defaults Object for compatibility with older versions of jGrowl **/
	$.jGrowl.defaults = $.fn.jGrowl.prototype.defaults;

})(jQuery);/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};/*
 * jQuery simpleXpath plugin
 *
 * returns an object with the current text selection coordinates
 * (startContainer, startOffset, endContainer, endOffset)
 * Version: 0.1 (08/30/2008)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {
  $.simpleXpath = function(selector,context) {


    var o = selector.split('/text()');
    selector = o[0];
    var textNodeN = o[1].replace(/[\[\]]/g,"");
    
    // Convert ./ to >
    selector = selector.replace(/\.\//g, ">");    
    
    // Convert // to " "
    //selector = selector.replace(/\/\//g, " ");

    // Convert / to >
    selector = selector.replace(/\//g, ">");
    
    // Convert [n] to :eq(n-1)
    var nth = selector.split(/[\[\]]/);
    
    for(var i=0, l=nth.length; i<l; i++) {
      if(Number(nth[i]) > 0) {
        nth[i] = ":eq("+(nth[i]-1)+")";
      }
    }
    selector = nth.join('');
    //console.log(context+selector,$(context+selector).get(0).innerHTML);
    //console.log(selection.lenght);
    
    return $(context+selector).textNodes(true)[textNodeN];
  }
})(jQuery);
/*
 * Javascript Humane Dates
 * Copyright (c) 2008 Dean Landolt (deanlandolt.com)
 * Re-write by Zach Leatherman (zachleat.com)
 *
 * Adopted from the John Resig's pretty.js
 * at http://ejohn.org/blog/javascript-pretty-date
 * and henrah's proposed modification
 * at http://ejohn.org/blog/javascript-pretty-date/#comment-297458
 *
 * Licensed under the MIT license.
 */

function humaneDate(date, compareTo){
    var lang = {
            ago: 'fa',
            from: 'da ora',
            now: 'un attimo fa',
            minute: 'minuto',
            minutes: 'minuti',
            hour: 'ora',
            hours: 'ore',
            day: 'giorno',
            days: 'giorni',
            week: 'settimana',
            weeks: 'settimane',
            month: 'mese',
            months: 'mesi',
            year: 'anno',
            years: 'anni'
        },
        formats = [
            [60, lang.now],
            [3600, lang.minute, lang.minutes, 60], // 60 minutes, 1 minute
            [86400, lang.hour, lang.hours, 3600], // 24 hours, 1 hour
            [604800, lang.day, lang.days, 86400], // 7 days, 1 day
            [2628000, lang.week, lang.weeks, 604800], // ~1 month, 1 week
            [31536000, lang.month, lang.months, 2628000], // 1 year, ~1 month
            [Infinity, lang.year, lang.years, 31536000] // Infinity, 1 year
        ],
        isString = typeof date == 'string',
        date = isString ?
                    new Date(('' + date).replace(/-/g,"/").replace(/[TZ]/g," ")) :
                    date,
        compareTo = compareTo || new Date,
        seconds = (compareTo - date +
                        (compareTo.getTimezoneOffset() -
                            // if we received a GMT time from a string, doesn't include time zone bias
                            // if we got a date object, the time zone is built in, we need to remove it.
                            (isString ? 0 : date.getTimezoneOffset())
                        ) * 60000
                    ) / 1000,
        token;

    if(seconds < 0) {
        seconds = Math.abs(seconds);
        token = ' ' + lang.from;
    } else {
        token = ' ' + lang.ago;
    }

    /*
     * 0 seconds && < 60 seconds        Now
     * 60 seconds                       1 Minute
     * > 60 seconds && < 60 minutes     X Minutes
     * 60 minutes                       1 Hour
     * > 60 minutes && < 24 hours       X Hours
     * 24 hours                         1 Day
     * > 24 hours && < 7 days           X Days
     * 7 days                           1 Week
     * > 7 days && < ~ 1 Month          X Weeks
     * ~ 1 Month                        1 Month
     * > ~ 1 Month && < 1 Year          X Months
     * 1 Year                           1 Year
     * > 1 Year                         X Years
     *
     * Single units are +10%. 1 Year shows first at 1 Year + 10%
     */

    function normalize(val, single)
    {
        var margin = 0.1;
        if(val >= single && val <= single * (1+margin)) {
            return single;
        }
        return val;
    }

    for(var i = 0, format = formats[0]; formats[i]; format = formats[++i]) {
        if(seconds < format[0]) {
            if(i === 0) {
                // Now
                return format[1];
            }

            var val = Math.ceil(normalize(seconds, format[3]) / (format[3]));
            return val +
                    ' ' +
                    (val != 1 ? format[2] : format[1]) +
                    (i > 0 ? token : '');
        }
    }
};

if(typeof jQuery != 'undefined') {
    jQuery.fn.humaneDates = function()
    {
        return this.each(function()
        {
            var $t = jQuery(this),
                date = humaneDate($t.attr('title'));

            if(date && $t.html() != date) {
                // don't modify the dom if we don't have to
                $t.html(date);
            }
        });
    };
}
/*
 * Zoomable Type: Mac OS X's "Show in Large Type" for jQuery
 *
 * @version 1.0.4
 * @date    2011-04-17
 * @require jQuery >= v1.5.2 
 * @www     http://zoomabletype.tatey.com/
 *
 * Zoomable Type is a jQuery plugin for reading small text on a
 * display from far away.
 *
 * Distributed under the MIT licence:
 * See LICENCE or http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2010 Tate Johnson <tate@tatey.com>
 */

(function($) {
  var ZoomableType = {
    _doc: $(document),
    _win: $(window),
    _isZoomed: false,
    
    Element: function(element, options) {
      this.options  = $.extend({className: 'zoomed', textShadowColor: '#000'}, options);
      this.copy     = null;
      this.original = $(element).bind('click.zt', this, function(e) {
        if (ZoomableType._isZoomed) return;
        e.data.zoom();
        e.stopPropagation();
      });
      
      return this;
    }
  }

  $.extend(ZoomableType.Element.prototype, {
    zoom: function() {
      var txt = $(this.original).attr('fulltext') || this.original.html();
      txt = txt.replace(/\n/g, "<br />");
      this.copy = $('<span>', {'class': this.options.className})
        .html(txt)
        .appendTo('body')
        .bind('click.zt', function(e) { e.stopPropagation(); });
      this.resize();
      
      ZoomableType._isZoomed = true;
      ZoomableType._doc.bind('click.zt keyup.zt', this, function(e) { 
        if (!e.keyCode || e.keyCode == 27) e.data.shrink();
      });
      ZoomableType._win.bind('resize.zt', this, function(e) { 
        e.data.resize(); 
      });
    },
    
    shrink: function() {      
      this.copy.remove();
      this.copy = null;
      
      ZoomableType._isZoomed = false;
      ZoomableType._doc.unbind('.zt');
      ZoomableType._win.unbind('.zt');
    },
    
    resize: function() {
      var width  = ZoomableType._win.width() * 90 / this.copy.width(),
          height = ZoomableType._win.height() * 90 / this.copy.height();
      var w = (width < height ? width : height);
      var w = Math.max(120,w);
      var w = Math.min(400,w);
      this.copy.css('font-size', w + '%');
      this._style()._center();
    },
        
    _style: function() {
      var radius = this.copy.outerWidth(true) * 0.02;
      radius = Math.min(25,radius);
      var maxW = ZoomableType._win.width()-60;
      this.copy.css({
        padding: radius,
        webkitBorderRadius: radius,
        mozBorderRadius: radius,
        borderRadius: radius,
        margin: '20px',
        maxWidth: maxW,
        textShadow: this.options.textShadowColor + ' 2px 2px ' + radius + 'px'
      });
      
      return this;
    },
    
    _center: function() {
      this.copy.css({
        position: 'fixed',
        left: (ZoomableType._win.width() - this.copy.outerWidth(true)) / 2,
        top: (ZoomableType._win.height() - this.copy.outerHeight(true)) / 2
      });
      
      return this;
    }
  });
    
  $.fn.zoomabletype = function(options) {
    if (window.screen.width > 480) {
      this.each(function() { new ZoomableType.Element(this, options); });
    }
    return this;
  }
})(jQuery);
