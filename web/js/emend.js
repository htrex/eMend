/*! 
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
*/

eMend.dictionary = {
  comment: {
    "delete_note_H": "Elimina questo commento",
    "edit_note_H": "Modifica questo commento",
    "author": "autore",
    "baseURI": "images"
  },
  comment_more: {
    "read_more": "Espandi il testo",
    "read_less": "Riduci il testo",    
    "baseURI": "images"
  },  
  commentForm: {
    "comment": "commento",
    "note": "nota",
    "subject": "oggetto",
    "cancel": "annulla",
    "confirm": "conferma",
    "tags": "tags"
  },
  commentGroup: {
    "read_more": "Espandi il gruppo",
    "read_less": "Riduci il gruppo",
    "comment": "commento",
    "comments": "commenti",
    "baseURI": "images"    
  },
  commentTrigger: {
    "select_text": "seleziona il testo che vuoi commentare",
    "activate_comment": "premi 'C' per commentare il testo selezionato",
    "write_comment": "scrivi nel commento ci&ograve; che pensi",
    "disable_HOL": "non mostrare pi&ugrave; i messaggi di aiuto",
    "outside_boudaries": "la selezione &egrave; fuori dall'area commentabile",
    "login_needed": "l'invio dei commenti è sospeso per la raccolta, elaborazione e integrazione contributi"
  },
  sidebar: {
    "hidelink": "Nascondi collegamento visuale",
    "showlink": "Mostra collegamento visuale",
    "baseURI": ""
  }
};
/* 
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
*/

(function($) {
eMend.users = function (options) {
  
  if ( !(this instanceof arguments.callee) ) 
  return new eMend.users(options);
  
  this.opts = $.extend({}, eMend.users.defaults, options);

// INTERNAL PROPERTIES
  this._currentUser = null;

// INIT

};

eMend.users.defaults = {};

eMend.users.prototype = {
  login: function(event,data){
    if(data && typeof data.name == 'string') {
        this._currentUser = data.name;
        this.opts.dataset.loginAs(this._currentUser);
    }
  },
  
  logout: function(){
    this._currentUser = null;
  },
  
  getCurrentUser: function() {
    return this._currentUser;
  }  
};

})(jQuery);/* 
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
*/

(function($) {
eMend.templates = {

comment: '<div class="actions"><a href="#" title="_(delete_note_H)" class="deletenote" onclick="return false;">&nbsp;</a><a href="#" title="_(edit_note_H)" class="editnote" onclick="return false;">&nbsp;</a></div>${avatar}<h6><strong>${author}</strong></h6><p class="commentbody">${body}</p><abbr title="${date}" class="easydate"></abbr><div class="fix"></div>',

comment_more: '...<img src="_(baseURI)/more.png" alt="_(readmore)" class="readmore" /><img src="_(baseURI)/less.png" alt="_(readless)" class="readless" style="display:none;" />', 

commentForm: '<form id="noteForm" class="Emend" onsubmit="return false; void(0);" style="background-image: url(_(baseURI)/bg-fff-diag.gif);"><fieldset><legend>_(comment)</legend><p><label for="noteSubject">_(subject):</label><span><input type="text" id="noteSubject" name="noteSubject" size="29" /></span><br/></p><p><label for="noteText">_(note):</label><span><textarea id="noteText" name="noteText" cols="28" rows="10" ></textarea></span><br class="clear"/></p><!--<p><label for="noteTags">_(tags):</label><span><input type="text" id="noteTags" name="noteTags" size="29" /></span><br/></p>--><p class="Emend-right"><button type="button" class="submit" id="submitNote" onclick="return false; void(0);" style="background: #FFFFFF url(_(baseURI)/bg_form_element.png) repeat-x;"><span class="ico confirm">_(confirm)<img src="_(baseURI)/ico-confirm.png" /></span></button></p><p class="Emend-left"><button type="button" class="submit" id="cancelNote" onclick="return false; void(0);" style="background: #FFFFFF url(_(baseURI)/bg_form_element.png) repeat-x;"><span class="ico cancel"><img src="_(baseURI)/ico-cancel.png" />_(cancel)</span></button></p></fieldset></form>',

commentGroup: '<span><div class="nodetoggle"><img src="_(baseURI)/less_big.png" alt="_(readless)" class="closegroup"><img src="_(baseURI)/more_big.png" title="_(readmore)" class="opengroup" /></div></span>',

commentTrigger: '<ul class="lavalamp"><li><div class="HOLbg" style="background-image: url(_(baseURI)/orange-gradient.png);"><img src="_(baseURI)/selectText.png"/><h2 class="helpOnLine"><span class="pulse" unselectable="on">_(select_text)</span></h2></div></li><li><div class="HOLbg" style="background-image: url(_(baseURI)/orange-gradient.png);"><img src="_(baseURI)/pressC.png"/><h2 class="helpOnLine"><span class="pulse" unselectable="on">_(activate_comment)</span></h2></div></li><li><div class="HOLbg" style="background-image: url(_(baseURI)/orange-gradient.png);"><img src="_(baseURI)/chat.png"/><h2 class="helpOnLine"><span class="pulse" unselectable="on">_(write_comment)</span></h2></div></li><li><div class="HOLbg" style="background-image: url(_(baseURI)/orange-gradient.png);"><img src="_(baseURI)/selectText.png"/><h2 class="helpOnLine"><span class="pulse" unselectable="on">_(outside_boudaries)</span></h2></div></li><li><div class="HOLbg" style="background-image: url(_(baseURI)/orange-gradient.png);"><img src="_(baseURI)/reading_comments.png"/><h2 class="helpOnLine"><span class="pulse" unselectable="on">_(login_needed)</span></h2></div></li></ul>',

sidebar: '<div class="sidebar-Y-header"><img src="_(baseURI)/ico-arrow-left.png" class="opensidebar" /><p class="version">0.5<br/>&beta;1</p><img src="_(baseURI)/emend-vertical.png" alt="e-mend"/></div><div class="sidebar-wrapper"><div class="sidebar-X-header"><img src="_(baseURI)/ico-arrow-right.png" class="closesidebar" /><img src="_(baseURI)/ico-arrow-left.png" class="extendsidebar" /><div id="emend-modules"></div><img src="_(baseURI)/emend-horizontal.png" class="logo" alt="e-mend"/><sup class="version">0.5&beta;1</sup><div id="emend-modules-content"></div></div><div id="sidebar-commentform"></div><div id="sidebar-body"></div><div id="memefarmers"><a href="http://memefarmers.net"><img src="_(baseURI)/memefarmers.png" /></a></div></div><div id="sidebar-drag">&nbsp;</a></div>'
}

})(jQuery);
/* 
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
*/

(function($) {
eMend.dataset = function (options) {
  
  if ( !(this instanceof arguments.callee) ) 
  return new eMend.dataset(options);
  
  this.opts = $.extend({}, eMend.dataset.defaults, options);

// INTERNAL PROPERTIES 
  this._selections = [];
  this._comments = [];
  this._users =  [];
  this._usersByName = {};
  this._currentUser = -1;

  this._notesByDate = {};
  this._notesFirstDate = null;
  this._notesLastDate = null;
  this._timeRange = [];

  this._filteredNodes = {};
  this._nodeCommentsCount = {};
  this._contentBkp = [];

// INIT
  this.bkpContent(this.opts.target);
  this._contentEl = this.opts.target;
  this.initNodeFilters(this.opts.target,false);
  this.loginAsGuest();
};

eMend.dataset.defaults = {};


eMend.dataset.prototype = {

  getContentEl: function () {
		return this._contentEl;
  },

  getTimeRange: function () {
		if(!this._timeRange.length) this.initTimeRangeFilters();
		return this._timeRange;
  },

  getNotesFirstDate: function () {
		if(!this._notesFirstDate) this.updateNotesByDate();
		return this._notesFirstDate;
  },

  getNotesLastDate: function () {
		if(!this._notesLastDate) this.updateNotesByDate();
		return this._notesLastDate;
  },

  getSelections: function () {
		return this._selections;
  },

  getComments: function () {
		return this._comments;
  },

  getComment: function (userIdx,commentIdx) {
      return this._comments[userIdx][commentIdx];
  },

  getCommentData: function (userIdx,commentIdx) {
      var c = this._comments[userIdx][commentIdx];
      return {
          title: c[0],
          body: c[1],
          date: c[2],
          userIdx: userIdx
      }
  },

  getCommentElement: function (userIdx,commentIdx) {
      var c = this._comments[userIdx][commentIdx];
      return c.getElement();
  },

  getCurrentUser: function () {
		return this._currentUser;
  },

  setCurrentUser: function (idx) {
	  if(typeof idx == "number") this._currentUser = idx;
  },


  getFilteredNodes: function () {
		return this._filteredNodes;
  },

  getRawNodeMap: function () {
		return this.mapNodes(this._contentEl);
  },

  getMarkedNodeMap: function () {
	  return this.markNodeMap();
  },

// CONTENT BACKUP
  bkpContent: function(contentEl) {

    //console.count('bkpContent');

    this._contentBkp = [];
    if(this.opts.datastore) {
      if($('#eMend-content-backup').length == 0) {
        this.bkpContentOnDOM(contentEl);
      } else {
        this.restoreContentFromDOM(contentEl);
      }
    };

    var childs = contentEl.childNodes, o,c;
    for (var node in childs) {
      o = childs[node];
      if(!o.nodeType || $(o).hasClass('write-protect')) continue;
      switch(o.nodeType) {
        case 1:
        case 3:
        // Node.ELEMENT_NODE
          c = o.cloneNode(true);
          this._contentBkp.push(c);
        break;
      }
    }
  },

  restoreContent: function() {

    //console.count('restoreContent');

    var parent  = this._contentEl;
    var childs = parent.childNodes, o, b=this._contentBkp, wprt = 0;

    // remove all content element childs except write-protected
    while (childs.length - wprt) {
      if($(parent.firstChild).hasClass('write-protect')) {
        wprt++;
        continue;
      }
      parent.removeChild(parent.firstChild);
    }

    // restore nodes from backup
    for(var i=b.length-1; i>-1; i--) {
      parent.insertBefore(b[i].cloneNode(true),parent.firstChild);
    }

    document.body.normalize();
  },

  bkpContentOnDOM: function(contentEl) {

    //console.count('bkpContentOnDOM');

    // creates a container in an hidden DOM zone and clones
    // content element
    var DOMbkp = $.create('div',{id:'eMend-content-backup'});
    $(this.opts.datastore).append(DOMbkp);
    var nc = contentEl.cloneNode(true);
    // renames content backup id's to prevent duplicates
    $(nc).find('*[id]').each(function(){
      $(this)[0].id += '__bkp__';
    });

    // I should better suffix classNames also and maybe tagNames too
    // as this could possibly alter DOM query results for unaware scripts...

    DOMbkp[0].innerHTML = nc.innerHTML;
  },

  restoreContentFromDOM: function(contentEl) {

    //console.count('restoreContentFromDOM');

    var b = $('#eMend-content-backup')[0];
    var nc = b.cloneNode(true);
    // remove anti-duplicate id suffix
    $(nc).find('*[id]').each(function(){
      var id = $(this)[0].id;
      $(this)[0].id = id.substr(0,id.indexOf('__bkp__'));
    });
    contentEl.innerHTML = nc.innerHTML;
    document.body.normalize();
  },

// COMMENTS
  addComment: function(text, userIdx) {
    if(typeof userIdx == 'undefined') userIdx = this._currentUser;
    var d = new Date();
    var date = d.format(Date.ISO8601c);
    var noteIdx = this._comments[userIdx].length;
    var auth = this._users[userIdx];
    //subject = $.escapeReturns(subject);
    text = $.escapeReturns(text);

    var status = 0;
    var commentdata = {
      author: auth,
      //title: subject,
      body: text,
      date: date,
      userIdx: userIdx,
      noteIdx: noteIdx
    };

    var l = this._comments[userIdx].push(new eMend.comment(commentdata,{animate: false}));

    this.insertNoteByDate(date,userIdx,l-1);
    this.lastComment = {user:userIdx, idx: l-1};
    $(document).trigger('emend.addComment');

    return (l-1);
  },

  modifyComment: function(subject, text, userIdx, noteIdx) {
    var o = this._comments[userIdx][noteIdx];
    var d = new Date();
    var date = d.format(Date.ISO8601c);
    //var subject = subject.stripScripts().stripTags();
    //var text = text.stripScripts().stripTags();
    var status = o[4];
    this._comments[userIdx][noteIdx] = [subject,text,date,text.length,status];
  },

  getLastComment: function() {
    if(this.lastComment) return this._comments[this.lastComment.user][this.lastComment.idx];
  },
  remapSelectionToContent: function(s) {

    var scParent = s.startContainer.parentNode,
    ecParent = s.endContainer.parentNode,

    snode = $(scParent).attr('node'),
    sfragment = $(scParent).attr('fragment') || 0,

    enode = $(ecParent).attr('node'),
    efragment = $(ecParent).attr('fragment') || 0;

//=================================================
//console.log("Start container parent, End container parent",scParent,ecParent);
//console.log("Start node, End node",snode,enode);
//console.log("Start fragment, End fragment",sfragment,efragment);
//=================================================       
    var sO = sfragment == 0 ? s.startOffset : this._markedNodeMap.fM[snode][sfragment-1][1] + s.startOffset;
    var eO = efragment == 0 ? s.endOffset : this._markedNodeMap.fM[enode][efragment-1][1] + s.endOffset;

    this.restoreContent();
//=================================================    
//console.log(this.opts.target,this._contentEl);
//=================================================    
    var mapTarget = eMend.config.minimizemarkup ? $(eMend.config.comment_target).get(0) : document.body;
    var tN = $(mapTarget).textNodes(true);

    var remappedSelection = {
      startContainer: tN[snode],
      endContainer: tN[enode],
      startOffset: sO,
      endOffset: eO
    };
//=================================================    
//console.log("remappedSelection",remappedSelection);
//=================================================    
    
    return remappedSelection;
  },

// SELECTIONS
  addSelection: function(userIdx) {
    if(typeof userIdx == 'undefined') userIdx = this._currentUser;

    var s = $.getSelection(true);

//=================================================
//console.log("Selection object: ",s);
//console.log("Offsets",s.startOffset,s.endOffset);
//=================================================

    switch ((s.startContainer.parentNode.tagName).toUpperCase()) {
      case 'NODEBLOCK':
      case 'NODEINNER':
        s = this.remapSelectionToContent(s);
//=================================================
//console.log("Remapped selection object: ",s);
//console.log("Offsets",s.startOffset,s.endOffset);
//=================================================    	
      break;
    }

    var r1ContextNode = $(s.startContainer).parents('*[id]');
    r1ContextNode = r1ContextNode[0] ? r1ContextNode[0] : document.body;
    var r1ContextId = r1ContextNode.id ? r1ContextNode.id : '__noId__';

    var cS = $(s.startContainer).generateXPath({context: r1ContextNode});
    var sel = [s.startOffset,s.endOffset,{'xpath':cS,'base':r1ContextId}];

    if(s.startContainer != s.endContainer) {
      var r2ContextNode = $(s.endContainer).parents('*[id]');
      r2ContextNode = r2ContextNode[0] ? r2ContextNode[0] : document.body;
      var r2ContextId = r2ContextNode.id ? r2ContextNode.id : '__noId__';

      var cE = $(s.endContainer).generateXPath({context: r2ContextNode});
      sel.push({'xpath':cE,'base':r2ContextId});
    };
    /*
    if(sel[3]) {
      console.log(sel[0],sel[1],sel[2].xpath,sel[3].xpath);
    } else {
      console.log(sel[0],sel[1],sel[2].xpath);
    }
    */

    var l = this._selections[userIdx].push(sel);
    this.lastSelection = {user:userIdx, idx: l-1};
    return sel;
  },

  getLastSelection: function() {
    if(this.lastSelection) return this._selections[this.lastSelection.user][this.lastSelection.idx];
  },

  removeLastSelection: function() {
    this._selections[this.lastSelection.user].splice(this.lastSelection.idx,1);
    //$(document).trigger('emend.removeSelection');
  },

// USERS

  addUser: function(name) {
    this._selections.push([]);
    this._comments.push([]);
    var u = this._users.push(name);
    this._usersByName[name] = u-1
    return (u - 1);
  },

  removeUser: function(idx) {
    if(idx > 0) { // guest user can't be removed...
      this._selections.splice(idx,1);
      this._comments.splice(idx,1);
      this._users.splice(idx,1);
    }
  },

  getUser: function(idx) {
    return this._users[idx];
  },

  getOrCreateUser: function(name) {
    var userIdx = this._usersByName[name];
    if(userIdx >= 0) return userIdx;
    return this.addUser(name);
  },

  getCurrentUser: function() {
      return this._currentUser;
  },

  loginAsGuest: function() {
    this.removeUser(this._currentUser);
    this._author = "guest";
    this._authorHash = "Sandbox";
    this._password = "guest";
    this.addUser('guest');
    this._currentUser = 0;
    //this.loadLocal();
    //this.renderAll();
    //this.refreshLinks();
    //this.currentMode = 'read';
  },

  loginAs: function(user) {
    this._author = user;
    //this._password = pass;
    this._currentUser = this.addUser(user);
    //this._authorHash = emendCRYPTOutils.md5(user+pass);
    //this.loadLocal();
    //this.renderAll();
    //this.refreshLinks();
  },

// IMPORT
  importEmendment: function(selection,commentdata) {

    commentdata.selection = selection;

    var userIdx = this.getOrCreateUser(commentdata.author);
    commentdata.userIdx = userIdx;

    var s = this._selections[userIdx].push(selection);
    commentdata.noteIdx = s-1;
    this.lastSelection = {user:userIdx, idx: s-1};

    var c = this._comments[userIdx].push(new eMend.comment(commentdata));
    this.lastComment = {user:userIdx, idx: c-1};

    this.insertNoteByDate(commentdata.date,userIdx,c-1);
  },

// TIMERANGE
  initTimeRangeFilters: function() {
    if(!this._notesFirstDate) {
      var d = new Date();
      var date = d.format(d,'%Y%%m%%d%');
      this._notesFirstDate = date;
      this._notesLastDate = date;
    }

    this._timeRange[0] = this._notesFirstDate;
    this._timeRange[1] = this._notesLastDate;
  },

  setTimeRangeFilter: function(start,end) {
    this._timeRange[0] = Number(start);
    this._timeRange[1] = Number(end);
    //>>> this.renderAll();
    //>>> this.refreshLinks();
  },

  updateNotesByDate: function() {
    var d,date,dates,u,i,k,z,Ucs;
    d = new Date();
    date = d.format('%Y%%m%%d%');
    this._notesFirstDate = date;
    this._notesLastDate = date;
    dates = this._notesByDate = {};

    for(u=0, z=this._comments.length; u < z; u++) {
      Ucs = this._comments[u];
      for(i=0,k=Ucs.length; i < k; i++) {
        date = Number(Ucs[i][2].substr(0,8));
        if(!dates[date]) dates[date] = [];
        dates[date].push(u+'_'+i);
        this._notesFirstDate = Math.min(date,this._notesFirstDate);
        this._notesLastDate = Math.max(date,this._notesLastDate);
      }
    }
  },

  insertNoteByDate: function(date,userIdx,commentIdx) {
    date = Number(date.substr(0,8));
    if(!this._notesByDate[date]) this._notesByDate[date] = [];
    this._notesByDate[date].push(userIdx+'_'+commentIdx);
    this._notesFirstDate = Math.min(date,this._notesFirstDate);
    this._notesLastDate = Math.max(date,this._notesLastDate);
  },

// NODE MAP

  mapNodes: function(el) {

    var nodes = [];
    var fragments = [];
    var fragmentsMap = [];

    function rejectUnwanted(node) {

    //if('EmendOverlay' == node.parentNode.id || 'helpOnLine' == node.parentNode.id) return NodeFilter.FILTER_REJECT;

      switch(node.parentNode.tagName){
        case 'SCRIPT':
        case 'NOSCRIPT':
          return NodeFilter.FILTER_REJECT;
        break;
      }
      return NodeFilter.FILTER_ACCEPT;
    }

    //  http://stackoverflow.com/questions/5982648/recommendations-for-working-around-ie9-treewalker-filter-bug
    rejectUnwanted.acceptNode = rejectUnwanted;

    function processNode(node) {
      nodes.push(node);
      fragments.push([node.nodeValue]);
      fragmentsMap.push([[0,node.nodeValue.length,[]]]);
    }

    function processNodeIE(node) {
      switch(node.parentNode.tagName){
        case 'SCRIPT':
        case 'NOSCRIPT':
          return;
        break;
      }

      nodes.push(node);
      fragments.push([node.nodeValue]);
      fragmentsMap.push([[0,node.nodeValue.length,[]]]);
    }

    var mapTarget = eMend.config.minimizemarkup ? $(eMend.config.comment_target).get(0) : document.body;

    /* IE9 has a native implementation but is really buggy, using fallback function for all browsers instead.
    if(document.createTreeWalker) {
      function traverse(tw) {
        var current = tw.currentNode;
        for(var node=tw.firstChild(); node!=null; node=tw.nextSibling()){
          processNode(node);
          traverse(tw);
        }
        tw.currentNode = current;
      }

      var wk = document.createTreeWalker(mapTarget, NodeFilter.SHOW_TEXT, rejectUnwanted, false);
      traverse(wk);
      wk = null;
    } else {
    */
      // fallback to textNodes jQuery plugin
      $(mapTarget).textNodes(true).each(function() {
      //$(document.body).textNodesFiltered('jGrowl eMend-DATA-Overlay eMend-VISUAL-Overlay').each(function() {
        processNodeIE(this);
      });
    //}
    //console.log({'n':nodes,'f':fragments,'fM':fragmentsMap});
    this._rawNodeMap = {'n':nodes,'f':fragments,'fM':fragmentsMap};

//=================================================    
//console.log(this._rawNodeMap);
//=================================================
    return this._rawNodeMap;
  
  },

  markNodeMap: function() {
    //console.log('markNodeMap');

    var groupSel = this._selections
      , groupCom = this._comments
      , map = this.getRawNodeMap();

    var nodes = map.n
      , fragments = map.f
      , fragmentsMap = map.fM;

//=================================================
//console.log('nodes',nodes);
//console.log("fragments",fragments);
//console.log("fragmentsMap",fragmentsMap);
//=================================================

    var tR = this.getTimeRange();

	var selections,comments,r,date,oS,oE,XcS,XcE,cS,cE,cSel,cEel,startNode,endNode,startChunk,endChunk;
	var fragmentL,fragmentR,prevOffsetStart,prevOffsetEnd;

    var xpathmethod = document.evaluate ? 0 : 1;
      //console.log(xpathmethod);

	for(var u=0, len1=groupSel.length; u < len1; u++) {
      selections = groupSel[u];
      comments = groupCom[u];

//=================================================
//console.log("selections length: ",selections.length);
//console.log("selections: ",selections);
//console.log("comments: ",comments.length);
//=================================================

      for(var i=0, len2=selections.length; i < len2; i++) {
//=================================================	
        //console.log('selections',len2,i);
//=================================================	
        date = Number(comments[i].getISO8601c());
//=================================================	
//console.log(date,tR[0],tR[1]);
//=================================================	
        if(date < tR[0] || date > tR[1]) continue; // skip out of time range
        r = selections[i];
        oS = r[0]; oE = r[1]; // offsetStart; offSetEnd
        XcS = r[2]; XcE = r[3] ? r[3] : r[2]; // startContainer, endContainer XPath expressions

//=================================================
//console.log("XcS.base: ",XcS.base);
//console.log("XcE.base: ",XcE.base);
//console.log("xpathmethod: "+xpathmethod);
//=================================================

        switch(xpathmethod) {
          case 0:
            cSel = XcS.base == '__noId__' ? document.body : document.getElementById(XcS.base);
            cEel = XcE.base == '__noId__' ? document.body : document.getElementById(XcE.base);
            try {
                cS = document.evaluate(XcS.xpath,cSel,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
                cE = document.evaluate(XcE.xpath,cEel,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
            } catch (err) {
              if(eMend.log) {
                err = {};
                err.funct = 'markNodeMap';
                err.msg = "invalid XPATH expression: "+XcS.xpath+" "+XcE.xpath;
                eMend.log.add('error',err);
              }
	          continue;
	        }
          break;

          case 1:
            cSel = XcS.base == '__noId__' ? 'body' : '#'+XcS.base;
            cEel = XcE.base == '__noId__' ? 'body' : '#'+XcE.base;
            cS = $.simpleXpath(XcS.xpath,cSel);
            cE = $.simpleXpath(XcE.xpath,cEel);
          break;
        }

        if(!cS) {
			if(eMend.log) {
              err = {};
			  err.funct = 'markNodeMap';
              err.msg = "couldn't find node XcS.xpath: "+XcS.xpath;
			  eMend.log.add('error',err);
			}
            continue;
        }

        if(!cE) {
			if(eMend.log) {
              err = {};
			  err.funct = 'markNodeMap';
              err.msg = "couldn't find node XcE.xpath: "+XcE.xpath;
			  eMend.log.add('error',err);
			}
            continue;
        }

//=================================================
//console.log("XcS.xpath: "+XcS.xpath+" XcE.xpath: "+XcE.xpath);
//console.log("context start: "+cS.nodeValue);
//console.log("context end: "+cE.nodeValue);
//console.log("nodes: ",nodes.length);
//=================================================

        startNode = endNode = -1
        for(var j=0, len3=nodes.length; j < len3; j++) {
            if(cS == nodes[j]) startNode = j;
            if(cE == nodes[j]) endNode = j;
            if(startNode != -1 && endNode != -1) break;
        }
        if(startNode == -1 || endNode == -1) continue; //skip filtered nodes

//=================================================
//console.log('startNode: '+startNode);
//console.log('endNode: '+endNode);
//console.log('fragmentsMap.length: '+fragmentsMap.length);
//=================================================

        var startFragment = fragments[startNode];
        var endFragment = fragments[endNode];
        var startFragmentMap = fragmentsMap[startNode];
        var endFragmentMap = fragmentsMap[endNode];

//=================================================
//console.log('startFragmentMap', typeof startFragmentMap);
//=================================================

        // Find which chunks the selection boundaries are within
        startChunk = endChunk = -1;
        for(var j=0, len3=startFragmentMap.length; j < len3; j++) {
          if(startChunk == -1 && oS >= startFragmentMap[j][0] && oS <= startFragmentMap[j][1]) {
            startChunk = j;
            break;
          }
        }
        for(var j=0, len3=endFragmentMap.length; j < len3; j++) {
          if(endChunk == -1 && oE >= endFragmentMap[j][0] && oE <= endFragmentMap[j][1]) {
            endChunk = j;
//=================================================
//console.debug("  offsetEnd found in fragment "+j+" ["+endFragmentMap[j][0]+" <= "+oE+" <= "+endFragmentMap[j][1]+"]");
//=================================================
            break;
          }
        }

        if(endChunk == -1) endChunk = j-1;
//=================================================
//console.log("startChunk,endChunk",startChunk,endChunk);
//=================================================

        var startChunkText = startFragment[startChunk];
        var startChunkMap = fragmentsMap[startNode][startChunk];

//=================================================
//dump('***' + startChunkText + '\n');
//console.log("fragments: ",fragments);
//console.log("fragmentsMap: ",fragmentsMap);
//console.log('startChunk,endChunk',startChunk,endChunk);
//=================================================

        // cuts the text chunks before and after the selection start boundary in their respective fragments
        fragmentL = startChunkText.slice(0,oS - startChunkMap[0]);
        if(fragmentL.length) {
          // deletes the text before selection in start fragment
          startFragment[startChunk] = startChunkText.slice(oS - startChunkMap[0]);
          // insert fragmentL before startFragment as a new item in fragments
          startFragment.splice(startChunk,0,fragmentL);
          // copy startFragment previous offset start
          prevOffsetStart = startChunkMap[0];
          // update startFragment offset start
          startChunkMap[0] = oS;
          // insert fragmentL before startFragment as new item fragmentsMap
          fragmentsMap[startNode].splice(startChunk,0,[prevOffsetStart,oS-1,startChunkMap[2].slice(0)]);
          startChunk++;
          // increment endChunk index if in same node of startChunk, to reflect the newly inserted chunk
          if(startNode == endNode) { endChunk++; }
        }

//=================================================
//console.log('startChunk,endChunk',startChunk,endChunk);
//=================================================

        var endChunkText = endFragment[endChunk];
        var endChunkMap = fragmentsMap[endNode][endChunk];

        // cuts the text chunks before and after the selection end boundary in their respective fragments
        fragmentR = endChunkText.slice(oE - endChunkMap[0]);
        if(fragmentR.length) {
          endFragment[endChunk] = endChunkText.slice(0,oE - endChunkMap[0]);
          endFragment.splice(endChunk+1,0,fragmentR);
          prevOffsetEnd = endChunkMap[1];
          endChunkMap[1] = oE;
          fragmentsMap[endNode].splice(endChunk+1,0,[oE,prevOffsetEnd,endChunkMap[2].slice(0)]);
        }

        // mark all node fragments between start/end boundaries with comment ID
        for(var j=startNode; j<=endNode; j++) {
          var from = j == startNode ? startChunk : 0;
          var to = j == endNode ? endChunk+1 : fragmentsMap[j].length;
          for(var k=from; k < to; k++) {
            fragmentsMap[j][k][2].push(u+'_'+i);
          }
        }
      }
	}

    this._markedNodeMap = {'n':nodes,'f':fragments,'fM':fragmentsMap};

//=================================================    
//console.log(this._markedNodeMap);
//=================================================
    return this._markedNodeMap;
  
  },

  // NODE FILTERS
  initNodeFilters: function(el, hideAll) {
    var map = this.mapNodes(el);
    for(var i=0; i < map.n.length; i++) {
      hideAll ? this.addNodeFilter(i) : this.removeNodeFilter(i);
    }
  },

  filterAllNodes: function() {
    for(node in this._filteredNodes){
      this.addNodeFilter(node);
    }
  },

  unfilterAllNodes: function() {
    for(node in this._filteredNodes){
      this.removeNodeFilter(node);
    }
  },

  addNodeFilter: function(nodeIdx) {
    this._filteredNodes[nodeIdx] = true;
  },

  removeNodeFilter: function(nodeIdx) {
    this._filteredNodes[nodeIdx] = false;
  },

  toggleNodeFilter: function(e,nodeIdx) {

    var node = e.target;
    var relNodes = emendARRAYutils.createFromWords(node.getAttribute('relNodes'));
    for(var i=0, len=relNodes.length; i < len; i++) {
      var v = relNodes[i];
      var status = this._filteredNodes[v] = !this._filteredNodes[v];
      var el = document.getElementById('block'+v);
      el.setAttribute('hidenotes',status);
    };

    var status = this._filteredNodes[nodeIdx];
    node.className = 'cMark_'+status+' fixedFontSize9';

    this.clearLinks();

    if(status) {
      Emend.events.Notes.fadeNodeNotes.fire(node);
    } else {
      Emend.events.Notes.appearNodeNotes.fire(node);
    }

  }
};

})(jQuery);
/* 
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
*/

(function($) {
eMend.highlight = function (dataset) {
	
	//console.count('highlight');

	var m = dataset.getMarkedNodeMap(),
	nodes = m.n,
	fragments = m.f,
	fragmentsMap = m.fM,
	newFrag, chunk, chunkMap, t, c, l;

	var f = dataset.getFilteredNodes();
	for(var j=0, len1=nodes.length; j < len1; j++) {
			var filtered = f[j];
			var node = nodes[j];
			var fragment = fragments[j];
			var fragmentMaps = fragmentsMap[j];
			
			//console.log(node);
			var pNode = node.parentNode;
			
			var newNode = document.createElement('NODEBLOCK');
			newNode.id = 'block'+j;
			newNode.className = 'emend-block';
			newNode.setAttribute('hidenotes',filtered);
			newNode.setAttribute('node',j);			
			
			var uniqueComments = [];
			//console.log(fragment, fragmentMaps);
			for (var k=0, len2=fragment.length; k < len2; k++) {
				chunk = fragment[k];
				chunkMap = fragmentMaps[k];
				//console.log('chunk',chunk);
				//console.log('chunkMap',chunkMap);
				newFrag = document.createElement('NODEINNER');
				newFrag.setAttribute('node',j);
				newFrag.setAttribute('fragment',k);					
				if(chunkMap[2].length) {
					//uniqueComments = uniqueComments.merge($H(chunkMap[2]));
					uniqueComments = uniqueComments.concat(arrDiff(uniqueComments,chunkMap[2]));
					l = Math.min(chunkMap[2].length, 40);
					t = chunkMap[2].length+' comments';
					c = 'highlight n' + chunkMap[2].join(' n') +' a'+l;
					newFrag.setAttribute('title',t);
					newFrag.className = c;
/*
					if(this.options.navbar) {
						var nb = this.options.navbar;
						nb.addNode(newFrag,chunkMap[2].length);
					}
*/
				}
				newFrag.appendChild(document.createTextNode(chunk));
				//$(newFrag).text(chunk);


				newNode.appendChild(newFrag);
				//pNode.replaceChild(newFrag,node);
			}
			pNode.replaceChild(newNode,node);

/*
			// ADD BLOCK COUNTERS
			var blockTotalComments = uniqueComments.length;
			if(blockTotalComments>0) {
				
				var blockContainer = newNode;
				var tagName = blockContainer.tagName.toLowerCase();
				//var d = document.defaultView.getComputedStyle(blockContainer,null).getPropertyValue('display');

				while(!this.blockNodesMap[tagName]) {
					blockContainer = blockContainer.parentNode;
					tagName = blockContainer.tagName.toLowerCase();
					//console.log('blockTagName:',tagName,blockContainer);					
					//var d = document.defaultView.getComputedStyle(blockContainer,null).getPropertyValue('display');
					//console.log(tagName);					
				}

				if(this.blockNodesMap[tagName] != true) {
					blockContainer = $(blockContainer).down(this.blockNodesMap[tagName]);
				}
				//console.log(blockContainer,d);
				//newNode.insertBefore(cMark,newNode.firstChild);
				var fC = blockContainer.firstChild; 

				if('cMark' != String(fC.className).substr(0,5)) {
					//console.log('creating new cMark');
					//var cMark = Builder.node('div',{'class':'cMark_'+filtered,'relNodes':j},blockTotalComments);
					var cMark = document.createElement('div');
					cMark.className = 'cMark_'+filtered+' fixedFontSize9';
					cMark.setAttribute('relNodes',j);
					cMark.innerHTML = blockTotalComments;
					this.nodeCommentsCount[j] = blockTotalComments;
					
					Event.observe(cMark,'click',this.toggleNodeFilter.bindAsEventListener(this,j));
					blockContainer.insertBefore(cMark,fC);
				} else {
					if(blockContainer == lastBlockContainer) {
						uniqueComments = uniqueComments.concat(arrDiff(uniqueComments,lastUniqueComments));
						fC.innerHTML = uniqueComments.length;
						this.nodeCommentsCount[j] = blockTotalComments;
					}
					
					fC.setAttribute('relNodes',fC.getAttribute('relNodes')+' '+j);
				}
				
				var lastBlockContainer = blockContainer;
				var lastUniqueComments = uniqueComments.clone();
			}
			*/
		}
	$(document).trigger('emend.highlight');
}

})(jQuery);/* 
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
*/

(function($) {
eMend.comment = function (data,options) {
    if(data) {
        this.data = data;
        this.data.textlength = data.body.length;
        var l = eMend.comment.defaults.shortlength;
        if( this.data.textlength > l) {
            this.data.shorttext = data.body.substr(0,l) + '...'
        }
    }
    this.opts = $.extend({}, eMend.comment.defaults, options);
    this.template = $.template(eMend.templates.comment,{ regx: 'gettext' }).apply(eMend.dictionary.comment);
    this.templateMore = $.template(eMend.templates.comment_more,{ regx: 'gettext' }).apply(eMend.dictionary.comment_more);
    //this.template_C = $.template(this.template).compile();
}

eMend.comment.defaults = {
    shortlength: 100,
    animate: true,
    wpmode: false
};

eMend.comment.prototype = {
	getElement: function(className) {
        if(!this.element) {
            var id = this.data.userIdx+'_'+this.data.noteIdx;


            if(this.opts.wpmode) {
                var refC = $('#li-comment-'+this.data.id).parent().remove();
                var note = $.create('div',{'id':'note'+id, 'note':id, 'class': className, 'refId': this.data.id })[0];
                $(note).append(refC);
            } else {
                //console.log(this.data);
                var tpl = $.template(this.template).apply(this.data);
                var note = $.create('div',{'id':'note'+id, 'note':id, 'class': className, 'refId': this.data.id })[0];
                note.innerHTML = tpl;
            }
            this.element = note;
        }

        $(this.element).mouseover(this.over).mouseout(this.out)
        //this.morelesstext($(this.element).find('.commentbody')[0]);
		return this.element;
	},
	getISO8601c: function() {
		return this.data.date.substr(0,8);
	},
    hide: function() {
        return this.opts.animate ? $(this.element).slideUp(200) : $(this.element).hide();
    },
    show: function() {
        return this.opts.animate ? $(this.element).slideDown(200) : $(this.element).show();
    },
    over: function() {
        var hlClass = '.n' + this.id.substr(4);
        $(hlClass).addClass('eMend-highlight-over');
    },
    out: function() {
        var hlClass = '.n' + this.id.substr(4);
        $(hlClass).removeClass('eMend-highlight-over');
    },
    morelesstext: function(el) {
        var fc = el.firstChild;
        
        if(fc && fc.nodeType == 3 && fc.length > 140) {
            var $this = $(el);
            var txt = String(fc.data);
            $this.attr('fulltext',txt);
            $this.html(txt.substr(0,140) + this.templateMore);
            //$this.click(this.toggleText);
        }
    },
    toggleText: function(evt) {
        var $this = $(this);
        var status = $this.children('.readmore, .readless').toggle();
        if($this.attr('fulltext')) {
            $this.attr('shorttext',$this[0].firstChild.data);
            $this[0].firstChild.data = $this.attr('fulltext');
            $this.removeAttr('fulltext');
        } else {
            $this.attr('fulltext',$this[0].firstChild.data);
            $this[0].firstChild.data = $this.attr('shorttext');
            $this.removeAttr('shorttext');
        }
    }
}

})(jQuery);
/* 
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
*/

(function($) {
eMend.commentGroup = function (data) {

	this.data = data;
	this.comments = [];
    this.template = $.template(eMend.templates.commentGroup,{ regx: 'gettext' }).apply(eMend.dictionary.commentGroup);

}

eMend.commentGroup.prototype = {
	getElement: function() {
		if(!this.element) {
			var nodeGroup = this.data.nodeGroup;
			var nodeClass = this.data.nodeClass;
			//var tpl = $.template(this.template).apply(this.data);	
			this.element = $.create('div',{'id':'noteGroup'+nodeGroup,'class': nodeClass, 'node':nodeGroup})[0];
			this.element.innerHTML = this.template;
			this.counter = $.create('h6',{'unselectable': 'on'})[0];
			this.element.appendChild(this.counter);
            var _self = this;
		
		// BEAHVIOURS
			// scroll to the first note highlight when a commentGroup title is clicked
			$(this.counter).click( function(){
                //console.log(this);
				var firstNoteInGroup = $(this).parent().find('.emend-note').get(0);
                //console.log(firstNoteInGroup);
				var noteId = $(firstNoteInGroup).prop('note');
                //console.log(noteId);
                var noteId = $(firstNoteInGroup).attr('note');
                //console.log(noteId);
				$(window).scrollTo('.n'+noteId,{duration: 500, easing: 'swing'});
			});
			
			// open/close group when +/- icon is clicked
            $(this.element).find('.closegroup, .opengroup').click(function(){_self.toggleGroup(_self.element)});
		}
		return this.element;
	},
	
	updateCounter: function(num) {
		var str = num > 1 ? num +' <em>'+eMend.dictionary.commentGroup.comments+'</em>' : num +' <em>'+eMend.dictionary.commentGroup.comment+'</em>';
        this.counter.innerHTML = str;
		num = Math.min(num,40);
		this.counter.className = 'a'+num+' emendGroupTitle';
	},
	
	appendChild: function(element) {
		this.comments.push(element);
		this.updateCounter(this.comments.length);
		this.element.appendChild(element);
	},
	
	prependChild: function(element) {
		this.comments.unshift(element);
        var l = this.comments.length;
		this.updateCounter(l);
		if(l > 1) {
			this.element.insertBefore(element,this.comments[1]);
		} else {
			this.element.appendChild(element);			
		}
	},
    toggleGroup: function(groupContainer){
         $(groupContainer).children('.emend-note').toggle();
         $(groupContainer).toggleClass('readfull').toggleClass('readpart');
         $(document).trigger('emend.toggleGroup');
    },
    closeGroup: function(){
         $(this.element).addClass('readpart').removeClass('readfull').removeClass('minify');
    },
    openGroup: function(){
         $(this.element).addClass('readfull').removeClass('readpart').removeClass('minify');
    },
	minifyGroup: function(){
         $(this.element).removeClass('readfull').removeClass('readpart').addClass('minify');
    }
}

})(jQuery);
/*
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
*/

(function($) {
eMend.commentForm = function (options) {

	if ( !(this instanceof arguments.callee) ) 
	return new eMend.commentForm(options);  
	
	this.opts = $.extend({}, eMend.commentForm.defaults, options);
	
	this.dataset = this.opts.dataset;
	this.active = false;
	this.template = $.template(eMend.templates.commentForm,{ regx: 'gettext' }).apply(eMend.dictionary.commentForm);
	//this.create();

    var _self = this;

    $(document).bind('ajaxSuccess', function(event, xhr, settings){
        if(settings.url.indexOf('/wp-comments-post.php') != -1) {
            //console.log(event, xhr, settings);
            var user = _self.dataset.getCurrentUser();
            var text = _self.commentText;
            _self.dataset.addComment(text,user);
            setTimeout(function(){$.modal.close(); }, 2000);
        }
    });
}

eMend.commentForm.defaults = {};

eMend.commentForm.prototype = {
	show: function() {
        var _self = this;
		this.active = true;
		var sel = this.dataset.addSelection();
        $('#emend_comment_selection').val($.toJSON(sel));

        var catchText = function() {
            _self.commentText = $('#commentform #comment').val();
            //console.log('comment',_self.commentText);
        };

        $('#respond').modal({
            overlayClose: true,
            autoResize: true,
            onClose: function(){
                _self.cancel();
                $('#commentform #comment').unbind('blur', catchText );
            }
        });
        $('#commentform #comment').bind('blur', catchText );


        //$('#NoteFormContainer').modal();
		
		//window.focus(); $('#noteSubject')[0].focus(); // AARGH, ie needs a double focus change
	},

	submit: function() {
		var s = $('#noteSubject').attr('value');
		var t = $('#noteText').attr('value');
		//var tg = $('#noteTags').attr('value');
		var ok = this.check(s,t);
		if(ok) {
			//$('#NoteFormContainer').jqmHide();
            $.modal.close();
			var l = this.dataset.addComment(s,t);
			this.active = false;
		}
	},
	cancel: function() {
		this.dataset.removeLastSelection();
		//$('#NoteFormContainer').jqmHide();
        $.modal.close();
		this.active = false;
        $(document).trigger('emend.cancelForm');
	},
	check: function(subject,text,tags) {
		var pass = true;
		if(subject == '') {
			$('#noteSubject').addClass('warning');
			pass = false;
		} else {
			$('#noteSubject').removeClass('warning');
		}
			
		if(text == '') {
			$('#noteText').addClass('warning');
			pass = false;
		} else {
			$('#noteText').removeClass('warning');
		}
		
		return pass;
		
	},
	isActive: function() {
		return this.active;
	}
	
}

})(jQuery);
/* 
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
*/

(function($) {
eMend.commentTrigger = function (options) {
  
  if ( !(this instanceof arguments.callee) ) 
  return new eMend.commentTrigger(options);    
  
  this.opts = options;
  
  if(!this.opts.hideHOL) {
    // load HOL preferences
    var hideHOL = false;
    if(window.hideHOL) {
        hideHOL = window.hideHOL;
    } else if(document.location.href.indexOf('emendDisableHOL') != -1) {
        hideHOL = true;
    } else if(document.location.href.indexOf('emendEnableHOL') != -1) {
        hideHOL = false;
        //$.aqCookie.del('hideHOL');
    } else {
        hideHOL = $.cookie('hideHOL') == 'true' ? true : false;
    }
    
    this.opts.hideHOL = hideHOL;
  }
  
  
  this.notifications = [];
  this.status = null;

  var _self = this;
  $(document).mouseup(
    function(event){
      window.setTimeout(function(){
        var s = $.getSelectedText();

        if(!_self.opts.form.isActive() && s && s.length) {

          // is selection outside of commentable area?
          if(eMend.config.comment_target) {
            var so = $.getSelection();
            var startsInside = $(so.startContainer).parents(eMend.config.comment_target);
            var endsInside = $(so.endContainer).parents(eMend.config.comment_target);

            if(eMend.config.login_needed_to_post && _self.opts.users.getCurrentUser() == null) {
              _self.show(4,1000);
              $(document).unbind('keyup.commentTrigger');
              $(document).unbind('keydown.commentTrigger');
            } else if(startsInside.length & endsInside.length) {
              _self.show(1,1000);
            } else {
              _self.show(3,1000);
              $(document).unbind('keyup.commentTrigger');
              $(document).unbind('keydown.commentTrigger');
              //var targ = $(eMend.config.comment_target);
              //console.log(targ.css('color') == '');
              //var orig_color = targ.css('color') ? targ.css('color') : '';


              //targ.css("color", "#ff0000");
              //targ.animate({ opacity: "1" }, {duration: 1000, callback: function(){targ.css("color",orig_color)} });
            }

          } else {
            _self.show(1,1000);
          }

        } else {
          _self.show(0,1000);
        }
      },10);
    }
  );
  this.template = $.template(eMend.templates.commentTrigger,{ regx: 'gettext' }).apply(eMend.dictionary.commentTrigger);
  this.create();
  window.setTimeout(function(){
    _self.show(0);
  }, 2000);
}

eMend.commentTrigger.prototype = {
  create: function() {
    var commentTrigger = $('#HOLteaser').remove();
    if(!commentTrigger.length) {
      commentTrigger = $.create('div',{'id':'HOLteaser', 'style':'cursor: pointer;'});
      commentTrigger[0].innerHTML = this.template;
    }

    //var _self = this;
    //$(commentTrigger).bind('click',function(){ _self.activate(); });
    this.opts.target.appendChild(commentTrigger[0]);
    $(commentTrigger).find('li').hide();

    return commentTrigger;
  },
  show: function(n, delay) {
    if(this.status == n) return;

    var _self = this;
    window.clearTimeout(this.timeOut);
    $('.eMend-jGrowl div.close').trigger('click.jGrowl');
    var v = $('#HOLteaser').find('li')[n];

    var pos = this.opts.sidebar.isOpen() == false ? 'bottom-right' : 'bottom-left';
    //var pos = 'center';

    $.jGrowl.defaults.closer = false;
    $.jGrowl.defaults.position = pos;


    if (v && !this.opts.hideHOL) this.timeOut = window.setTimeout(function(){
      $.jGrowl(v.innerHTML, {theme: 'eMend-jGrowl', life: 5000, position: pos, pool: 1});
    }, 500);

    this.status = n;

    _self.isCtrl = false;
    $(document).bind('keyup.commentTrigger',function (e) {
      if(e.which == 17) _self.isCtrl=false;
      if(e.which == 67 && _self.isCtrl == false) {
	e.stopPropagation();
	_self.activate();
      }
    }).bind('keydown.commentTrigger',function (e) {
	if(e.which == 17) _self.isCtrl=true;
    });
  },
  hide: function(n, delay){
    $(document).unbind('keyup.commentTrigger');
    $(document).unbind('keydown.commentTrigger');
  },
  activate: function() {
    if(this.status != 2 ) {
      this.hide();
      this.show(2);
      this.opts.form.show();
    }
  }
}
})(jQuery);
/* 
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
*/

(function($) {
eMend.linker = function(options) {
  
  if ( !(this instanceof arguments.callee) ) 
  return new eMend.linker(options);   
  
  this.opts = $.extend({}, eMend.linker.defaults, options);
  
  this.noteReferences = [];
  this.hiddenNodeLinks = {};
  this.lastScrollInfo = {x:0,y:0};
  this.destroyCanvas();
}

eMend.linker.defaults = {};

// to be used as status icon template
// <div class="linktoggle"><a href="#" title="_(hidelink)" class="unlinkgroup" onclick="return false;">&nbsp;</a><a href="#" title="_(showlink)" class="linkgroup" onclick="return false;">&nbsp;</a></div>

eMend.linker.prototype = {
  createCanvas: function(refresh) {
    var W = this.containerWidth = $(window).width() - 20
      , H = this.containerHeight = $(window).height()
      , Y = $(window).scrollTop()
      , canvas = $('#EmendLinks')
    ;
    
    if(refresh && canvas.length) {
      canvas.attr('width',W);
      canvas.attr('height',H);
      canvas[0].style.top = Y+'px';
    } else {
      canvas = $.create('canvas',{'id':'EmendLinks','class':'EmendOverlay','height':H,'width':W})[0];
      canvas.style.top = Y+'px';

      $(this.opts.target).append(canvas);

      if ($.browser.msie && !document.createElement('canvas').getContext) {
          //alert('cv');
        G_vmlCanvasManager.initElement(canvas);
        canvas = document.getElementById("EmendLinks");
      }

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.ctx.lineWidth = 1;
      var _self = this;
      $(canvas).click( function(){ _self.hideLinks(); } );      
    }
    this.ctx.strokeStyle = "#0099ff";
  },
  
  destroyCanvas: function() {
    $('#EmendLinks').remove();
  },
  hideLinks: function() {
    $('#EmendLinks').hide();
    $(this).trigger('emend.hidelinks');
    this._linksVisible = false;
  },
  showLinks: function() {
    $('#EmendLinks').show();
    this._linksVisible = true;
  },
  refreshLinks: function(shadow){
    this.createCanvas(true);
    this.clearLinks();
    this.renderLinks();
    if(!shadow) this.canvas.style.display = 'block';
  },
  clearLinks: function(){
    if(this.canvas) this.canvas.getContext('2d').clearRect(0,0,this.containerWidth,this.containerHeight);
    this._linksVisible = false;
    //this.canvas.style.display = 'none';
  },
  renderLinks: function() {
    //console.time('renderLinks');
    var ctx = this.ctx
      , doneGroups = {}
      , refPos = this.opts.positions.getReferences()
      , scrl = { x:$(window).scrollLeft(), y: $(window).scrollTop() }
      , lowerbound = $.browser.opera && $.browser.version >= 9.50 ? 18 : 10
      , node, ntlID, ntEL, ntPOS, ntlPOS, xstart, ystart, ybaseline, xend, yend;
      
  
    for(ntlID in refPos) {
      ntEL = $('#note'+ntlID);
      ntlPOS = refPos[ntlID]; // note linker position
      node = ntlPOS.node;
      if(this.hiddenNodeLinks[node]) continue;

      if(!ntEL.length || ntEL[0] && ntEL[0].style.display == 'none') {
          if(doneGroups[node]) continue;
          doneGroups[node] = true;
          ntEL = $('#noteGroup'+node);
      }

      ntPOS = $(ntEL).offset(); // note position
      if(ntPOS) {
          xstart = ntlPOS.left-scrl.x;
          ystart = ntlPOS.top-scrl.y;
          ybaseline = ystart+lowerbound;
          xend = ntPOS.left-scrl.x;
          yend = ntPOS.top-scrl.y+12;

          ctx.beginPath();
          ctx.moveTo(xstart,ystart);
          ctx.lineTo(xstart,ybaseline);
          ctx.lineTo(xend-25,ybaseline);
          ctx.lineTo(xend-6,yend);
          ctx.lineTo(xend,yend);
          ctx.stroke();
      }
    }
    //console.timeEnd('renderLinks');
  }
}
    
    
})(jQuery);/* 
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
*/

(function($) {
eMend.sidebar = function (options) {
    
    if ( !(this instanceof arguments.callee) ) 
    return new eMend.sidebar(options);    

    this.opts = $.extend({}, eMend.sidebar.defaults, options);
    this.status = 'closed';
    this.template = $.template(eMend.templates.sidebar,{ regx: 'gettext' }).apply(eMend.dictionary.sidebar);
    this.create();
}

eMend.sidebar.defaults = {
    body_open: '280px',
    body_closed: '27px'
};

eMend.sidebar.prototype = {
	create: function() {
        var offset = $('#wpadminbar').length ? $('#wpadminbar').height() : 0;
        var sidebar = $('#eMend-sidebar')[0]
          , t =  offset
          , h =  $(window).height() - offset;

        if(!sidebar) {
            //this.destroy();
            sidebar = $.create(
                'div', {
                    id:'eMend-sidebar',
                    style: 'right: 0px; top: '+t+'px; height: '+h+'px;',
                    unselectable: 'on',
                    className: this.status
                }
            )[0];
            sidebar.innerHTML = this.template;
            $(this.opts.target).append(sidebar);
        } else {
            sidebar.style.height = h+'px';
            this.status = $(sidebar).prop('className');
        }
		var _self = this;

		$(window).wresize(function(){ _self.refreshHeight(); });
		$(document.body).css({marginRight: eMend.sidebar.defaults['body_'+this.status]});
		$(sidebar).find(".sidebar-Y-header").click(function(){ _self.open(); });
		$(sidebar).find(".closesidebar").click(function(){ _self.close(); });
        $(sidebar).find(".extendsidebar").click(function(){ _self.extend(); });
        $(sidebar).find("#sidebar-drag").mousedown(function(){
            $(document).mousemove(function(e){
               var W = $(window).width();
               var Wmax = W*0.33;
               var sW = (W - e.pageX);
               sW = Math.max(150,sW);
               sW = Math.min(Wmax,sW);
               $('#eMend-sidebar').css("width",sW+'px');
        		$('.sidebar-wrapper').css({width: sW+'px'});
                $(document.body).css({marginRight: sW+20+'px'});
                $(document).trigger('emend.highlight');
			    $(document).trigger('emend.opensidebar');

            })
        });
        $(document).mouseup(function(){
            $(document).unbind('mousemove');
        });

		this.container = sidebar;
	},

    getContainer: function() {
        return $(this.container).find('#sidebar-body')[0];
    },

	destroy: function() {
		var sidebar = $('eMend-sidebar');
		if(sidebar) {
			sidebar.remove();
			delete this.container;
		}
	},

	open: function() {
        $('#eMend-sidebar').css("width",'420px');
		$('.sidebar-wrapper').animate({right: "0", width: "420px"}, 250, 'swing', function(){
			$(document.body).css({marginRight: "420px"});
			$('.sidebar-Y-header').css({right: "-60px"});
            $(document).trigger('emend.highlight');
            $(document).trigger('emend.opensidebar');
		});
        $('#eMend-sidebar').prop('className','open');
        this.status = 'open';
		window.setTimeout(function(){
			$('#memefarmers').animate({bottom: "-20px"},1000, 'swing');
		}, 10000);
        //var c = $('#comments').remove();
        //$('#sidebar-body').append(c);
	},

	close: function() {
		$(document.body).css({marginRight: "27px"});
        $(document).trigger('emend.closesidebar');
        $('#eMend-sidebar').css({width: "260px"}).removeClass('extended');
		$('.sidebar-wrapper').animate({width: "260px", right: "-260px"}, 500, 'swing', function(){
			$('.sidebar-Y-header').css({right: "-280px"});
			$('.sidebar-Y-header').animate({right: "0"},500,'swing', function(){
				$('.sidebar-Y-header').css({bottom: "0"});
			});
		});
        $('#eMend-sidebar').prop('className','closed');
        this.status = 'closed';
	},
    
    extend: function() {
        $('#eMend-sidebar').css({width: "420px"}).addClass('extended');
		$('.sidebar-wrapper').animate({width: "420px"}, 500, 'swing', function(){
			$(document.body).css({marginRight: "440px"});
                $(document).trigger('emend.highlight');
			    $(document).trigger('emend.opensidebar');
		});        
    },
	
	refreshHeight: function(){
		var h = $(window).height();
        var W = $(window).width();
        var offset = $('#wpadminbar').length ? $('#wpadminbar').height() : 0;
		$(this.container).height((h-offset)+'px');

        var Wmax = W*0.33;

        $('#eMend-sidebar').css("width",Wmax+'px');
 		$('.sidebar-wrapper').css({width: Wmax+'px'});
         $(document.body).css({marginRight: Wmax+20+'px'});
	},
    
    isOpen: function(){
        return (this.status == 'open');
    }
}


})(jQuery);/* 
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
*/

(function($) {
eMend.navbar = function (options) {
	
    if ( !(this instanceof arguments.callee) ) 
    return new eMend.navbar(options);  	

	this.opts = $.extend({}, eMend.navbar.defaults, options);
	this.htmlEl = $('html');
	this.create();
	this.clear();
};

eMend.navbar.defaults = {
	align: "right",
	width: "6px",
	height: "100%"
}

eMend.navbar.prototype = {
	create: function () {
		this.htmlEl.css({height:'100%'});
		this.bar = $('#emend-navbar').remove()[0] || $.create('div',{'id': 'emend-navbar', 'style': s},' ')[0];
		var o = this.opts;
		var s = o.align+':0; top:0; width:'+o.width+'; height:'+o.height+'; position: absolute;';
		$(this.bar).attr('style',s);
		$(this.opts.target).append(this.bar);
	},
	refresh: function () {
		this.clear();
		this.render();
	},
	
	render: function() {
		var	o = this.opts
		  ,	bodyH = $(document).height()
		  ,	barH = $(this.bar).height()
		  , HLels = this.opts.positions.getHighlightsCollection();

		var node, status, nodeH, nodeY, markH, markY, s, mark;
		for(var i=0; i < HLels.length; i++) {
			node = HLels[i];
			status = node.className.split(' ').pop();

			//nodeH = Element.getHeight(node);
			nodeH = $(node).height();
			nodeY = $(node).offset().top;
			markH = Math.round(nodeH/bodyH*barH);
			markY = Math.round(nodeY/bodyH*barH);
			s = 'height:'+markH+'px; width:'+o.width+'; position: absolute; top:'+markY+'px; z-index:'+status.substr(1)+';';
			mark = $.create('div',{'class': status, 'style': s})[0];
			this.bar.appendChild(mark);
		}
	},
	clear: function() {
		$(this.bar).empty();
	}
};

})(jQuery);/* 
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
*/

(function($) {
eMend.positions = function (options) {
	
    if ( !(this instanceof arguments.callee) ) 
    return new eMend.positions(options);  	
	
	this.highlightEls = null;
	this.highlights = null;
	this.references = null;
	
	this.opts = $.extend({}, eMend.positions.defaults, options);
};

eMend.positions.prototype = {
	invalidate: function() {
		var prop, i, l;
		for(i=0, l=arguments.length; i < l; i++) {
			prop = arguments[i];
		//console.log('invalidate',prop);
			switch(prop) {
				case 'highlights':
					this.highlightEls = null;
					this.highlights = null;
				break;
				case 'references':
					this.references = null;
				break;			
			}
		}
	},
	updateAll: function() {
		this.updateHighlightCollection();
		this.updateHighlights();
		this.updateReferences();
	},
	updateHighlightCollection: function() {
		//console.log('updateHighlightCollection');
		this.highlightEls = $('nodeinner').filter('.highlight');
	},
	updateHighlights: function() {
		//console.log('updateHighlight');
		//console.time('refPositions');
	  
		this.highlights = {};
		var hl = this.highlightEls;
		
		if(hl && hl.length) {
			var hlEL, ntIDs, ntID, o;
			
			for(var i=hl.length-1; i>=0; i--) {
			  hlEL = hl[i]; // highlight element reference			
			  ntIDs = hlEL.className.split(' '); // multiple notes IDs
			  ntIDs.pop(); ntIDs.shift(); // trashes 'highlight' and 'aX' class
			
			  for(var j=0, l=ntIDs.length; j < l; j++) {
				ntID = ntIDs[j].substring(1); // note ID
				if(!this.highlights[ntID]) {
				  o = $(hlEL).offset();
				  this.highlights[ntID] = o;
				  this.highlights[ntID].bottom = o.top + $(hlEL).height();
				}
			  }
			}
		}
		//console.timeEnd('refPositions');
	},
	updateReferences: function() {
		//console.log('updateReferences');
		//console.time('refPositions');
		this.references = {};
		var hl = this.getHighlightsCollection();
		
		var hlEL, ntIDs, ntID, ntlEL, ntsEL, o;
		
		for(var i=hl.length-1; i>=0; i--) {
		  hlEL = hl[i]; // highlight element reference
		  //if(hlEL.parentNode.getAttribute('hidenotes') == 'true') continue;			
		  ntIDs = hlEL.className.split(' '); // multiple notes IDs
		  ntIDs.pop(); ntIDs.shift(); // trashes 'highlight' and 'aX' class
		
		  for(var j=0, l=ntIDs.length; j < l; j++) {
			ntID = ntIDs[j].substring(1); // note ID
			if(!this.references[ntID]) {
			  ntlEL = document.createElement('span');
			  ntlEL.style.fontSize = "1px";
			  ntlEL.innerHTML = '|';
			  hlEL.appendChild(ntlEL);
			  o = $(ntlEL).offset();
			  this.references[ntID] = o;
			  this.references[ntID].node = ntlEL.parentNode.getAttribute('node');
			  hlEL.removeChild(ntlEL);          
			}
		  }
		}
		//console.timeEnd('refPositions');
	},
	getVisibleHighlights: function() {
	  var o 
		, scrl = $(window).scrollTop()
		, wh = $(window).height()
		, v = []
		, i = []
		, hl = this.getHighlights()
	  ;

	  for(ntID in hl) {
		o = hl[ntID];
		if(o.bottom >= scrl && o.top <= wh+scrl) {
            v.push(ntID);
        } else {
            i.push(ntID);
        }
		//console.log(o.bottom,'>=',scrl,'...',o.top,'<=',wh+scrl);
	  }
	  return {visible: v, invisible: i};
	},
	getInvisibleHighlights: function() {
	  var o 
		, scrl = $(window).scrollTop()
		, wh = $(window).height()
		, c = []
		, hl = this.getHighlights()
	  ;

	  for(ntID in hl) {
		o = hl[ntID];
		if(o.bottom <= scrl || o.top >= wh+scrl) c.push(ntID);
		//console.log(o.bottom,'<=',scrl,'...',o.top,'>=',wh+scrl);
	  }
	  return c;		
	},
	getReferences: function() {
		if(this.references == null) this.updateReferences();
		return this.references;
		
	},
	getReference: function(ntID){
		if(this.references  == null) this.updateReferences();
		return this.references[ntID];
		
	},
	getHighlights: function(){
		if(this.highlights == null) this.updateHighlights();
		return this.highlights;
	},
	getHighlight: function(ntID){
		if(this.highlights == null) this.updateHighlights();
		return this.highlights[ntID];
	},
	getHighlightsCollection: function(){
		if(!this.highlightEls) this.updateHighlightCollection();
		return this.highlightEls;
	}
};

})(jQuery);/* 
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
*/

(function($) {
eMend.renderNotes = function (options) {
	
    if ( !(this instanceof arguments.callee) ) 
    return new eMend.renderNotes(options); 	
	
	this.opts = $.extend({}, eMend.renderNotes.defaults, options);
	this.container = this.opts.target;
	this.dataset = this.opts.dataset;
	this.positions = this.opts.positions;
	
	this.nodeStatus = {};
	this.nodeLinkHidden = {};
	this.renderedNotes = {};
	var _self = this;
	
	$(this.container).hover(function(){$(_self).trigger('emend.notesHover')},
							function(){$(_self).trigger('emend.notesUnHover')}
	);

    $(this.container).mousewheel(function(event, delta) {

        console.log(delta);
        if (delta > 0) {
            _self.goToNextNote();
        } else {
            _self.goToPreviousNote();
        }
        return false;
    });    
	
	this.clearNotes();
}

eMend.renderNotes.defaults = {};

eMend.renderNotes.prototype = {
	clearNotes: function(){
		$(this.container).find('.noteGroup').remove();
	},
	
	renderNotes: function() {

        console.count('renderNotes');
		
		var container = this.container;
		
		var isRefreshing = false,
		row = false,
		lastNodeGroup = null,
		container = this.container,
		ds = this.dataset;
		if(!isRefreshing) {
			this.clearNotes();
			/*
			var spaceHolder = $.create('div',{className:'noteGroup'});
			$(spaceHolder).css({height:'10px', visibility:'hidden'});
			container.appendChild(spaceHolder[0]);
			*/
		}
		
		var hl = $('.highlight'),
		doneNodes = {}, doneNotes = {}, notesFound = {}, emptyGroups = {}, lastInsert, newCommentGroupEl, commentGroup, nodeGroup, nodeClass;
		
		for(var i=hl.length-1; i>=0; i--) {
			hlEL = hl[i]; // highlight element	reference
			nodeGroup = $(hlEL.parentNode).attr('node');
			ntIDs = $(hlEL).prop('className').split(' '); // multiple notes IDs
			ntIDs.pop(); ntIDs.shift(); // trashes 'highlight' and 'aX' class
			
			if(!doneNodes[nodeGroup]) { // NOTEGROUP NOT YET CREATED
				nodeClass = 'noteGroup';
				nodeClass += this.nodeStatus[nodeGroup] ? ' readpart' : ' readfull';
				nodeClass += this.nodeLinkHidden[nodeGroup] ? ' unlinked' : ' linked';					
				//nodeClass += EmendCore.isNodeLinkHidden(nodeGroup) ? ' unlinked' : ' linked';		<<<<<< RESTORE THIS
				commentGroup = new eMend.commentGroup({'nodeGroup': nodeGroup, 'nodeClass': nodeClass});
				newCommentGroupEl = commentGroup.getElement();

				if(isRefreshing) {
					container.replaceChild(newCommentGroupEl,$('noteGroup'+refreshNode));
				} else if (lastNodeGroup) {
                    
					container.insertBefore(newCommentGroupEl,lastNodeGroup);
				} else {
					container.appendChild(newCommentGroupEl);
				}
				//Event.observe(nodeToggle,'click',this.events.actionOnGroup); <<<<<< RESTORE THIS
				lastNodeGroup = newCommentGroupEl;
				lastInsert = null;
				doneNodes[nodeGroup] = true;
				count = 0;
			} 

			for(var j=0, len=ntIDs.length; j < len; j++) {
				ntID = ntIDs[j].substring(1); // note ID
				if(!doneNotes[ntID]) {
//console.log(doneNotes);
					if(!this.nodeStatus[nodeGroup]) {
						uc = ntID.split('_'); // userIdx, noteIdx
						
						//var cData = ds.getComment(uc[0],uc[1]);
						//newInsert = eMend.comment(ntID,cData,nodeGroup,'note even_'+row);
						var cData = ds.getComment(uc[0],uc[1]);
						var newInsert = cData.getElement('emend-note even_'+row);
						
						row = !row;
						commentGroup.prependChild(newInsert);
						/*
						if(lastInsert) {
							newNodeGroup.insertBefore(newInsert,lastInsert);
						} else {
							newNodeGroup.appendChild(newInsert);
						}
						*/
						lastInsert = newInsert;
						this.renderedNotes[ntID] = {group: commentGroup, comment:cData};
					}
					doneNotes[ntID] = true;
					count++;
				}
			}
			
			//console.dir(doneNodes);
			//console.log(nodeGroup,count);
			
			switch (count) {
				case 0:
					emptyGroups[nodeGroup] = true;
				break;
				
				case 1:
					delete emptyGroups[nodeGroup];
					//nodeHead.innerHTML = count +' '+this.I18n.comment;
					//nodeHead.className = 'a'+count;					
				break;
				
				default:
					delete emptyGroups[nodeGroup];
					//nodeHead.innerHTML = count +' '+this.I18n.comments;
					//nodeHead.className = 'a'+count;					
			}			
			
		}
		
		for(nodeGroup in emptyGroups) {
			$('#noteGroup'+nodeGroup).remove();
		}
		
		var spaceHolder = $.create('div',{'class':'noteGroup'});
		$(spaceHolder).css({height:'50px', visibility:'hidden'});
		container.appendChild(spaceHolder[0]);
		
		$(this).trigger('emend.rendernotes');
	},
	refreshView: function() {
		
		var o = this.positions.getVisibleHighlights()
		  , Ihl = o.invisible
		  , Vhl = o.visible
		  , In, Vn
		  , IhlL = Ihl.length
		  , VhlL = Vhl.length
		  ;

		for(i=0; i < IhlL; i++) {
			var In = this.renderedNotes[Ihl[i]];
			if(In) {
				In.comment.hide();
				In.group.closeGroup();
				if(VhlL > 3 || IhlL > 3) In.group.minifyGroup();
				//$('#note'+Ihl[i]).parent().addClass('readpart').removeClass('readfull');
			}
		}
		for(i=0; i < VhlL; i++) {
			var Vn = this.renderedNotes[Vhl[i]];
			if(Vn) {
				Vn.comment.show();
				Vn.group.openGroup();
				//$('#note'+Vhl[i]).parent().addClass('readfull').removeClass('readpart');
			}
		}

		var ntID = Vhl[Vhl.length-1];
		var el = $('#note'+ntID);
		
		if(el.length) {
			var t = ( el.offset().top - $(window).scrollTop() + 36 )  + 'px';
            //console.log(t);
			this.scrollTo(t);
		} else {
			window.setTimeout( function(){ $(document).trigger('emend.afterviewscroll'); }, 350 );
		}		
	},
	scrollTo: function(Y){
		$('#sidebar-body').scrollTo(
			{top:Y},
			350,{
			onAfter: function(){ $(document).trigger('emend.afterviewscroll'); },
			stop: true
			}
		);		
	},
    goToNextNote: function(){
        $(this.container).scrollTo('-=100px',100);
        $(document).trigger('emend.refreshlinks');

    },
    goToPreviousNote: function(){
        $(this.container).scrollTo('+=100px',100);
        $(document).trigger('emend.refreshlinks');
    }
}


})(jQuery);/* 
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
*/

(function($) {
eMend.prefetch = function (options) {
    
    var cfg = eMend.config;
    var baseURI = typeof cfg.baseURI != 'undefined' ? cfg.baseURI : '../dist';

    var c = $('#eMend-comment-assets');
    if(!c.length) {
        c = $($.create('div',{id:'eMend-comment-assets'}))
        for(var i=0; i<21; i++) {
            c.append( $.create('img',{src: baseURI+'images/user'+i+'.png'}) );
        }
        c.append( $.create('img',{src: baseURI + 'images/more_big.png'}) );
        c.append( $.create('img',{src: baseURI + 'images/less_big.png'}) );
        c.append( $.create('img',{src: baseURI +'images/more.png'}) );
        c.append( $.create('img',{src: baseURI + 'images/less.png'}) );

        $(options.datastore).append(c);

        var d = eMend.dictionary;
        d.comment.baseURI = d.comment_more.baseURI = d.commentGroup.baseURI = d.commentTrigger.baseURI = d.commentForm.baseURI = d.sidebar.baseURI = baseURI+'images';

    } else {
        var URI = $(c[0].firstChild).attr('src')
          , OFF = URI.substr(0,URI.lastIndexOf('/'))
          , d = eMend.dictionary;

        d.comment.baseURI = d.comment_more.baseURI = d.commentGroup.baseURI = d.commentTrigger.baseURI = d.commentForm.baseURI = d.sidebar.baseURI = OFF;

    }
    
    delete eMendBaseURI;
}

})(jQuery);/* 
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
*/

(function($) {
eMend.backstore = eMend.backstore || {};
eMend.backstore.tiddly = function (options) {
	
	if ( !(this instanceof arguments.callee) ) 
	return new eMend.backstore.tiddly(options); 	

	this.opts = $.extend({}, eMend.backstore.tiddly.defaults, options);

	// data container creation or import
	var dc = $('#eMend-backstore-tiddly');
	if(dc.length) {
		this.importData(dc);
	} else {
		dc = this.createDataContainer();
	}
	this.container = dc;
};

eMend.backstore.tiddly.defaults = {};

eMend.backstore.tiddly.prototype = {
	createDataContainer: function(location) {
		var dc = $.create('div',{id:'eMend-backstore-tiddly'});
		$(this.opts.datastore).append(dc);
		return $(dc);
	},
	addComment: function() {
		var s = this.opts.dataset.getLastSelection() || null;
		var c = this.opts.dataset.getLastComment() || null;
		var cD = c ? c.data : null;
		var t = $.create('div',{});
		if(s && cD) {
			$(t).attr('data', $.toJSON({"s":s,"c":cD}));
			t[0].innerHTML = c.body;
			this.container.append(t);
			//console.log('addcomment',s,c);
		}
	},
	importData: function(container) {
		var ds = this.opts.dataset;
		container.children().each(function(){
			var o = $.evalJSON($(this).attr('data')); //$.secureEvalJSON ? secure :) ?
			ds.importEmendment(o.s,o.c);
		});
		$(document).trigger('emend.importData');
		
	}
};

})(jQuery);/* 
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
*/

(function($) {
eMend.backstore = eMend.backstore || {};
eMend.backstore.firebugEmendPluginLog = function (options) {
	if ( !(this instanceof arguments.callee) ) 
	return new eMend.backstore.firebugEmendPluginLog(options);
	this.opts = $.extend({}, eMend.backstore.firebugEmendPluginLog.defaults, options);
};

eMend.backstore.firebugEmendPluginLog.defaults = {};

eMend.backstore.firebugEmendPluginLog.prototype = {
	add: function(type, msg) {

        console.log({ msg_type: type, msg: msg });
	}
};

})(jQuery);/* 
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
 */

(function($) {
    eMend.backstore = eMend.backstore || {};
    eMend.backstore.wpEmendPlugin = function (options) {

        if (!(this instanceof arguments.callee))
            return new eMend.backstore.wpEmendPlugin(options);

        this.opts = $.extend({}, eMend.backstore.wpEmendPlugin.defaults, options);
        this.resourceID = window.postID;
        //this.getCurrentUser();
        this.getComments();
    };

    eMend.backstore.wpEmendPlugin.defaults = {};

    eMend.backstore.wpEmendPlugin.prototype = {
        addComment: function() {
            var s = this.opts.dataset.getLastSelection()
                , c = $.extend(true, {}, this.opts.dataset.getLastComment().data);
            //console.log('wpEmendPlugin.addcomment',s,c);

            //console.log(c);

            c.selection = $.toJSON(s);
            c.body = $.escapeString(c.body);
            c.title = $.escapeString(c.title);
            //console.log(c);
            $.ajax({
                url: '/emend_addComment/' + this.resourceID,
                data: c,
                success: function(msg) {
                    //console.log("Data Saved: ",msg);
                },
                error: function(msg) {
                    //console.log("error: ",msg);
                }
            });
        },
        getComments: function(container) {
            var ds = this.opts.dataset;


            $.ajax({
                url: '/api/emend/get_comments/?post_id=' + this.resourceID,
                success: function(data, textStatus) {
                    //console.log("Data loaded: ", textStatus, data);
                    function strip(html) {
                        var tmp = document.createElement("DIV");
                        tmp.innerHTML = html;
                        return tmp.textContent || tmp.innerText;
                    }

                    ds.loginAs(data.user.name);

                    var obj = data.post.comments;
                    //console.log(obj);
                    for (var i = 0; i < obj.length; i++) {
                        var o = obj[i];
                        var s = eval(o.selection);
                        var body = o.content;
                        var c = {
                            "id": o.id,
                            "author": o.name,
                            //"title": o.title,
                            "body": body,
                            "date": o.date,
                            "textlength": body.length,
                            "avatar": o.avatar
                        }
                        //console.log(s,c);
                        if(s && c) ds.importEmendment(s, c);
                }
                $(document).trigger('emend.importData');
            /*
             var i,l,o;

             for(i=0, l=obj.comments.length; i<l; i++) {
             o = obj.comments[i];
             ds.importEmendment(o.s,o.c);
             }
             $(document).trigger('emend.importData');
             */
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus, errorThrown)
            // typically only one of textStatus or errorThrown
            // will have info
            this; // the options for this ajax request
        }
    }
    )
    ;

},
    getCurrentUser
:
function(callback) {
    $.ajax({
        url: '/get_logged_user',
        success: function(data, textStatus) {
            var obj = $.evalJSON(data);

            if (typeof obj.name != 'undefined') {
                $(document).trigger('emend.loggedIn', obj);
            } else {
                $(document).trigger('emend.loggedOut');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus, errorThrown)
            // typically only one of textStatus or errorThrown
            // will have info
            this; // the options for this ajax request
        }
    });
}
}
;

})
(jQuery);/* 
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
*/

//=================================================
//#ifdef CONSOLE_COMPAT
//=================================================

if (!window.console) {
  if (window.opera && !window.console) {
    window.console = {};
    function fn() { opera.postError(arguments); };
    ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd',
     'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'].forEach(function(name) {
      window.console[name] = fn;
    });
  } else {
       var names = ["dir", "dirxml", "group", "groupEnd", "trace", "profile", "profileEnd",
		    "log", "debug", "info", "warn", "error", "time", "timeEnd", "assert", "count"
		   ];  
       window.console = {};  
       // no more javascript errors in non-firefox browsers  
       for (i in names) {  
	   window.console[names[i]] = function() {};  
       }
   }
}

//=================================================
//#endif
//CONSOLE_COMPAT
//=================================================


(function($) {
eMend.init = function($) {
  
  if(eMend.status == 'running') return;
  var cfg = eMend.config;

  // backend
  if(cfg.backend_debug) {
    switch(cfg.backend_debug) {
      case "sfEmendPluginLog":
	  eMend.log = eMend.backstore.sfEmendPluginLog();
      break;
      case "firebugEmendPluginLog":
      eMend.log = eMend.backstore.firebugEmendPluginLog();
      break;
    }
  };

  // experimental WP native comments rendering integration
  if(cfg.comments_wpmode) {
      eMend.comment.defaults.wpmode = true;
  }

  // cleanup document to possibly eliminate crossbrowser DOM inconsistencies
  $('pre').addClass('keep-whitespace');
  document.body.normalize();
  $.fixOperaRangeSelectionBug();
  var t = $(cfg.comment_target).get(0) || document.body;

  var html = t.innerHTML;
  html = html.replace(/[\t\n\r\f]/gm, " ");
  html = html.replace(/>\s+</gm, "><");
  html = html.replace(/\s{2,}/gm, " ");
  t.innerHTML = html;

  $(cfg.comment_target).cleanWhitespace(true);
  $('a').each(function(){
      this.nodeValue = $.trim(this.nodeValue);
  });

  document.body.normalize();

  // creates and attaches DATA and VISUAL containers
  var DO = $('#eMend-DATA-Overlay').remove()[0] || $.create('div',{id:'eMend-DATA-Overlay', className:'hidden write-protect'})[0];
  var VO = $('#eMend-VISUAL-Overlay').remove()[0] || $.create('div',{id:'eMend-VISUAL-Overlay', className:'write-protect'})[0];

  if($.browser.msie || $.browser.safari ) {
    $(document.body).append(DO).append(VO);
  } else {
    $(document.body.parentNode).append(DO).append(VO);
  }

  // instances and binds modules
  var pf = eMend.prefetch({datastore: DO});
  var SB = eMend.sidebar({target: VO});
  var SBc = SB.getContainer();

  var ds = eMend.dataset({target: document.body, datastore: DO})
    , ps = eMend.positions()
    , usr = eMend.users({dataset: ds})
    , rn = eMend.renderNotes({dataset: ds, target: SBc, positions: ps})
    , nb = eMend.navbar({target: SBc.parentNode, positions: ps})
    , cf = eMend.commentForm({dataset: ds, target: VO})
    , ct = eMend.commentTrigger({target:VO, form: cf, sidebar: SB, users: usr})
    , ln = eMend.linker({target: VO, positions: ps});

  // backend
  if(cfg.backend) {
    switch(cfg.backend) {
      case "sfEmendPlugin":
        var sfbk = eMend.backstore.sfEmendPlugin({dataset: ds});
        $(document).bind('emend.addComment',function(){ sfbk.addComment(); });
      break;
      case "wpEmendPlugin":
          var wpbk = eMend.backstore.wpEmendPlugin({dataset: ds});
          //$(document).bind('emend.addComment',function(){ wpbk.addComment(); });
      break;
    }
  };

  var emend_lastScrollTimer = -1;
  var emend_lastLinkRefresh = -1;
  var emend_lastScrollPosition = $.getScroll().t;

// EVENTS HANDLERS

  // if sidebar is open refresh links
    var F_refLinks = function(event, data){ if(SB.isOpen()) ln.refreshLinks(); }
  // if sidebar is open refresh view
      , F_viewChange = function(event, data){ if(SB.isOpen()) rn.refreshView(); }
  // hide links
      , F_hideLinks = function(event, data){ ln.hideLinks(); }
  //clear links
      , F_clearLinks = function(event, data){ ln.clearLinks(); }
  // refresh navbar
      , F_refnavbar = function(event, data){ nb.refresh(); }
  // invalidate position cache when highlights are updated
      , F_updHL = function(event, data){ ps.invalidate('highlights','references'); }
  // refresh highlights and sidebar notes
      , F_refRender = function(event, data){
            eMend.highlight(ds); rn.renderNotes();
        }
  // open sidebar
      , F_openSB = function(event, data){ SB.open(); }
  // sends an event 450ms after scroll is over
      , F_afterscroll = function(event, data){
	window.clearTimeout(emend_lastScrollTimer);
	emend_lastScrollTimer = window.setTimeout(function(){
	    $(document).trigger('emend.afterscroll');
	},450);
      }
    ;

    delayedRefresh = function() {
      var scroll_Y = $.getScroll().t;
      // filter spurious scroll events for Webkit based browsers
      if(emend_lastScrollPosition != scroll_Y ) {
      F_hideLinks();
      F_afterscroll();
	  emend_lastScrollPosition = scroll_Y;
      }
    };

    delayedRefreshDo = function() {
        F_hideLinks();
        window.clearTimeout(emend_lastLinkRefresh);
        emend_lastLinkRefresh = window.setTimeout(function() {
            F_refLinks();
        }, 450);
    };

//=================================================
// EVENTS BINDING
//=================================================

// when sidebar is opened

    // refresh links
	$(document).bind('emend.opensidebar',function(){F_refLinks()});
    // refresh navbar
	$(document).bind('emend.opensidebar',F_refnavbar);

// when sidebar is closed

    // hide links then clear theme
	$(document).bind('emend.closesidebar',function(){ F_hideLinks(); window.setTimeout(F_clearLinks,500); });

// when a comment is posted

    // refresh render
	$(document).bind('emend.addComment',function(){ F_refRender(); });

    // shows a GUI message
	$(document).bind('emend.addComment',function(){ ct.show(0); });

// when new data is imported in dataset

    // refresh render
    $(document).bind('emend.importData',function(){ F_refRender(); });

// when a comment form is cancelled

    // refresh render
    //$(document).bind('emend.cancelForm',function(){ F_refLinks(); F_refRender(); }); // NOT NEEDED



// when highlights are repainted

    // invalidates positions cache
	$(document).bind('emend.highlight',F_updHL);


	$(rn).bind('emend.notesHover',F_refLinks);

// when notes are rendered

    // open sidebar
    $(rn).bind('emend.rendernotes',F_openSB);
    $(rn).bind('emend.rendernotes',function(){
        jQuery('.easydate').humaneDates();
        jQuery('.commentbody').zoomabletype();
    });

	$(document).bind('emend.afterscroll',F_viewChange);
	$(document).bind('emend.afterviewscroll',F_refLinks);
	//$(document).bind('emend.toggleGroup',F_refLinks);

// when a comment group is opened/closed

    // refresh links
	$(document).bind('emend.toggleGroup',function(){ F_refLinks(); });

// when the window is resized

    // invalidates positions cache
	$(window).wresize(F_updHL);

    // refresh links
	$(window).wresize(F_refLinks);

    // refresh navbar
	$(window).wresize(F_refnavbar);

//
    $(document).bind('emend.refreshlinks', function() { delayedRefreshDo() });

//=================================================
// OPTIONAL BINDINGS
//=================================================

  //
  // scroll_refresh_delay: [true/false]
  //

    if(cfg.scroll_refresh_delay) {
	// hide links and repaint view after a certain delay after the last scroll event
	$(window).scroll(delayedRefresh);
    } else {
	// immediately repaint after each scroll event
	$(window).scroll(F_refLinks);
	$(window).scroll(F_afterscroll);
    }

  //
  // backend: [sfEmendPlugin(/Wordpress/MediaWiki)]
  //

    if(cfg.backend) {
	$(document).bind('emend.loggedIn', function(event, data) { usr.login(event,data); ct.show(0); });
	$(document).bind('emend.loggedOut', function(event, data) { usr.logout(); ct.show(4); });
    }

  //
  // backstore_tiddly: [true/false]
  //

    if(cfg.backstore_tiddly) {
	// instances tiddly module
	var bk = eMend.backstore.tiddly({dataset: ds, datastore: DO});
	// ping it when a comment is added
	$(document).bind('emend.addComment',function(){ bk.addComment(); });
    };

//=================================================
// OPTIONAL MODULES
//=================================================

    if(cfg.modules) {
      var c = $('#emend-modules'), i, n;
      for(i=0; i < cfg.modules.length; i++) {
	n = cfg.modules[i];
	$('<img>')
	.attr(
	    {
	      id: 'emend-plugin-' + n,
	      src: cfg.baseURI + 'modules/' + n + '/' + n + '.png'
	    })
	.appendTo(c);
	eMend.loadJS(cfg.baseURI + 'modules/' + n + '/' + n + '.load.js',true);
      }
    }


//=================================================
// INIT done
//=================================================
  eMend.status = 'running';
};

if(typeof eMendInit != 'undefined' && eMendInit == true) eMend.init(jQuery);
$(document).ready(function(){ eMend.init(jQuery) });

})(jQuery);
if(eMend.config.jquery_noconflict) {
  jQuery.noConflict();
};
if(eMend.config.jquery_noconflict) {
  //jQuery.noConflict();
};
