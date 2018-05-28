/*jshint esversion: 6 */
const def_theme = "ace/theme/monokai",
	def_theme_class = "ace-monokai",
	page = window.location.pathname.substring(1),
	token = '24c2y3qt2hbccccca3$@';

let	send_mode_enc,
	resetcountdown = false,
	menu_height = '345px';

/*Detect if in safe mode*/
if(window.location.href.slice(-2) =="?!"){
	save_mode = true;
	let notifi = page;
	if(notifi===''){notifi = 'Home';}
	$('body').addClass('save_mode').prepend(`<div class="intro">In this version of the ${notifi} page no html will run and you can view and permanently delete saves.</div>`);}else{save_mode = false;}

/*Global icon function*/
ic = n => `<svg class="icon-${n}"><use xlink:href="r/icons.svg#icon-${n}"></use></svg>`;

/*the Q object that creates a block around all the functions*/
const Q = {

	/*Main menu at bottom*/
	inmenu(){
		//console.log('inmenu');
		const part_p = page.split(','), b = '<button title="', u = '</button>', c = '" class="', i='" id="', t = 'imp_toggle>', g = '_button big_', s = '_button small_';
		const menu = `${b}Show/Hide menu${i}btn_min">add content${u}<textarea id="qt"></textarea><div id="editor"></div><buttons>${b}Send Encrypted${i}send_encrypted" style="display: inline-block;${c}send_btn">${ic('send-lock')+u+b}Send${i}send_raw${c}send_btn">${ic('send')+u}<input placeholder="page${i}page" value="${part_p[0]}">${b}Show/Hide edit buttons${i}hide_btn">${ic('eye-red')+u+b}Encrypt${i}encr_btn${c}decrypt_btn">${ic('lock')+u}<form id="encr_input_form"><input type="password${i}encr_input"></form>${b}Scroll left${c}left${g}l">${ic('ar-l')+u+b}Scroll right${c}right${g}r">${ic('ar-r')+u+b}Save mode${c}save${g}s">${ic('save')+u+b}Home${c}home${g}h">${ic('home')+u}</buttons><${t}</${t}<recent>${b}Scroll left${c}left${s}l">${ic('ar-l')+u}<r_out><r_in></r_in></r_out>${b}Scroll right${c}right${s}r">${ic('ar-r')+u+b}Save mode${c}save${s}s">${ic('save')+u+b}Home${c}home${s}h">${ic('home')+u}</recent>`;
		$('inmenu').html(menu);},

	/*The list of all recent pages and in save mode all the hidden pages*/
	all_recent(){
		let su = '';
		if(save_mode){su = '?!';}
		//console.log('all_recent');
		let re = recenty.split(","); re.pop();
		let	result = '';
		for(const value of re){result += `<a href="`+value+su+`">`+value+`</a> `;}
		if(result.trim().length===0){	$('r_out, r_in, .left_button, .right_button').remove();
		}else{							$('r_in').html(result);}

		$(document).ready(()=>{
			const o = $('r_out'),	m = 20, s = 800, b = '_button';
			$('.right'+b).click(()=>{ o.animate({scrollLeft: o.scrollLeft()+(o.width()-m)},s);});
			$('.left'+b).click(()=>{  o.animate({scrollLeft: o.scrollLeft()-(o.width()-m)},s);});

		});},

	/*The buttons allowing you to open a edit menu per block*/
	all_buttons(){

		const c = 'class="',
			  b = c+'btn_',
			  t = '<button title="',
			  g = '.getSession().',
			  u = '</button>',
			  p = '" placeholder="',
			  i = '<input title="',
			  datu = qt_buttons.split("*"); datu.pop();


        for(const value of datu){
			let r = '', d='', s='', e='', h='',
				a =	value.split("$"),
				f = a[2].split("~"); f.pop();

			for(const value of f){
				if(value.substring(0, 19)  !== a[3]){
					s += `<safes safes_date="${value.substring(0, 19).replace(" ", "_")}">${t}Rename safe" class="namesafe_btn" >${ic('pencil')+u+i}Safe name" class="namesafe_input${p+value.substring(5, 19)}" value="${value.slice(19)}">${t}View safe" class="getsafe_btn">${ic('eye')+u}</safes>`;
				}
			}

			if(a[2] !== '' && a[3] !== a[2].slice(0, -1)){
				if(save_mode){ d = t+`Delete All Saves" ${b}delete_all">${ic('trash')+u}`; }
				h = `<button title="History" ${b}safess">${ic('safes')+u}`;
			}

			const l = a[0];

			if($('#bu'+l).parent().parent()[0].tagName !== 'ALLSAVE'){
				e += t+`Encrypt" ${b}encryptit">${ic('pin-lock')+u+t}Pin" ${b}edit">${ic('pin')+u}`;
			}

			r += `<qt_menu id="qt${l}" data-height="${menu_height}">${e+i}Page" ${c}page_input" id="page${l}" value="${a[1]+p}"home"/>${t}Refresh" ${b}refresh"> ${ic('refresh')+u+h+t}Delete" ${b}delete">${ic('trash')+u+d}<textarea id="tahtml${l}" class="qt"></textarea>
					<div id="editor${l}" ${c}editor"></div>
					<script>
						const q${l} = ace.edit("editor${l}"),
							 qf${l} = $("#tahtml${l}");
						q${l+g}on("change", ()=>{
						qf${l}.val(q${l+g}getValue());
						});
					<\/script>
				</qt_menu>
				<all_safes id="safes${l}">${s}</all_safes>`;

			$('#bu'+l).after(r);

        }},

    /*The button linking to the save page*/
	save_btn(){
		//console.log('save_btn');
		const s = $('.save_button');
		if(save_mode){

			s.html(ic('return'));
			s.attr('title', 'Return');
		}
		s.on('click',()=>{
			if(save_mode){	window.location.href = window.location.href.slice(0,-2);
			}else{			window.location.href = page+"?!";}
		});},

	/*All Button triggers that get refreshed with new content*/
	all_triggers(){
		//console.log('all_triggers');
		let b = [
			'.qt_btn',
			'.btn_edit',
			'.btn_encryptit',
			'.btn_safess',
			'.btn_delete',
			'.btn_refresh',
			'.getsafe_btn',
			'.namesafe_btn',
			'.btn_delete_all'
		],c='click.reset';

		/*allows all triggers to be reset*/
		$(b.join(', ')).unbind(".reset");

		$(b[0]).on(c,function(){Q.edit_menu(this);});
		$(b[1]+', '+b[2]).on(c,function(){Q.edit(this);});
		$(b[3]).on(c,function(){Q.safes_menu(this);});
		$(b[4]).on(c,function(){Q.deleter(this);});
		$(b[5]).on(c,function(){Q.refresh(this);});
		$(b[6]).on(c,function(){Q.getsafe(this);});
		$(b[7]).on(c,function(){Q.namesafe(this);});
		$(b[8]).on(c,function(){Q.delete_all_safes(this);});
		Q.ctrl_enter('qt_menu');
		Q.changes('qt_menu .ace_text-input');
		Q.changes('.namesafe_input');},

	/*Function that triggers on first load calls all the on triggers, get local storage, start to detect changes and load all recent.*/
	first_load(){
		//console.log('first_load');
		$('#qt').val(localStorage.getItem("inmenu"));
		$(dec_input).val(localStorage.getItem("key"));
		Q.changes(dec_input);
		Q.changes('#page');
		Q.save_btn();
		$('.home_button').on('click',()=>{if(page!==''){window.location.href = "/";}});
		Q.enc_length(true);
		Q.all_recent();
		Q.all_triggers();},

	/*Universal function for detecting changes to text.*/
	changes(el){
		//console.log('changes');
		const l = $(el);
		/*detect delete, backspace, Ctrl z and Ctrl y*/
		l.unbind('.reset');
		l.unbind('keyup');
		l.keyup(function(e){
			if(e.keyCode == 8 || e.keyCode == 46 || e.ctrlKey && e.keyCode == 90 || e.ctrlKey && e.keyCode == 89 || e.keyCode == 9){Q.changed(this);}
		});
		/*detect adding using keyboard*/
		l.on('propertychange.reset input.reset', function(e){
			let valueChanged = false;
			if(e.type=='propertychange'){valueChanged = e.originalEvent.propertyName=='value';}else{valueChanged = true;}
			if(valueChanged){Q.changed(this);}
		});
		/*detect paste and cut*/
		l.on('paste.reset cut.reset',function(){Q.changed(this);});
		/*detect dragging text*/
		if(el == dec_input){
			l.on("dragend.reset",()=>{
				Q.changed(el);
			});
		}else{
			l.parent().on("dragend.reset",function(){
				Q.changed($(this).find('textarea'));
			});
		}},

	/*Triggers on change*/
	changed(e){
		if($(e).attr('id') == 'page'){
			/*make sure the page name is valid only alphanumeric space and underscore.*/
			const reg = /^[a-zA-Z0-9_ ]+$/g, w = 'page_warning', p = $('#page');
			if( reg.test($('#page').val()) || $('#page').val() === ''){
				p.removeClass(w);
			}else{
				p.addClass(w);
			}

		}

		/*dont know.. its one of the input fields but witch one..*/
		if($(e).parent().attr('id') === undefined){
			Q.toggle_safe(e,false);
		}else{

			const editor = $(e).parent().attr('id');
			if(editor == 'encr_input_form'){
				/*encryption key*/
				Q.enc_length(false);
			}else{
				/*all other editors*/
				const id = editor.substring(6),
					html = Q.script_detected($('#tahtml'+id).val());
				$('#html'+id).html(html+' ');
				$('#qt'+id).find('.btn_delete').hide();
				$('#bu'+id).addClass('hl_live');
				$('#editor'+id).addClass('live_editor');
			}
		}},

	/*Toggle encryption button showing and hiding the input field.*/
	toggle_eb(m){
		//console.log('toggle_eb');
		const t =100,
			  r =$('.small_r').is(":visible"),
			  o = $('r_out'),
			  s ='#send_encrypted',
			  b ='.btn_encryptit';
			  y ={duration:t,queue:false};
		let	w,w2,p,l,ml,ml2;

		if(m){		w='17px'; 	w2='27px'; 	p='3px 5px';	l='8px';	ml='35px'; 	ml2 = '0';
			setTimeout(()=>{o.addClass('big_unc_inp').removeAttr('style');}, t+100);
		}else{		w='0'; 		w2='0'; 	p='4px 0';		l='0';		ml='0'; 	ml2 = '-32px';
			setTimeout(()=>{o.removeClass('big_unc_inp').removeAttr('style');}, t+100);
		}
		$('.helptext')	.animate({marginLeft:ml2},		y);
		if(!r){o		.animate({marginLeft:ml},		y);}
		$(s+'>svg')		.animate({width:w},				y);
		$(b+'>svg')		.animate({width:w},				y);
		$('#send_raw')	.animate({marginLeft:l},		y);
		$(s)			.animate({width:w2,padding:p},	y);
		$(b)			.animate({width:w2,padding:p},	y);},

	/*Toggle the safe button showing and hiding the safe input field.*/
	toggle_safe(e,send){
		const t=100,
			  g='.getsafe_btn',
			  n='.namesafe_btn',
			  y={duration:100,queue:false};
		let w,w2,_w;
		if($(e).val() && !send){	w='17px';	w2='27px';	_w='0';		_w2='0';
		}else{						w='0'; 		w2='0'  ;	_w='17px';	_w2='27px'; $(e).removeClass('live_editor');}
		pe = $(e).parent();
		pe.find(g)			.animate({width:_w2, padding:'4px 0'},y);
		pe.find(g+'>svg')	.animate({width:_w2			 		},y);
		pe.find(n)			.animate({width: w2, padding:'4px 0'},y);
		pe.find(n+'>svg')	.animate({width: w 			 		},y);},

	/*Test if the key is long enough and show a golden lock if it is.*/
	enc_length(m){
		//console.log('enc_length');
		const b = $(dec_trigg),
			  i = $(dec_input).val(),
			  k = 'key';

		if(i.length > 5){Q.toggle_eb(true);
			if(m){ b.html(ic('lock-gold'));
			}else{
				b.html(ic(k));
				b.find('svg').css('fill','gold');
				localStorage.setItem(k,i);
			}
		}else{Q.toggle_eb(false);
			if(m){ b.html(ic('lock-red'));
			}else{ b.html(ic(k));}
		}},

	/*If there is a script in the live edit block it by replacing the script tags.*/
	script_detected(html){
		let replaced = false;
		html = html.replace(/<script/g, function(token){replaced = true; return '<scrupt';}).replace(/<\/script/g, '<\/scrupt');
		if(replaced){//console.log('script_detected - Press Ctrl to activate');
		}
		return html;},

	/*Safe the inmenu text in local storage and show it live on the page.*/
	inmenu_changed(){
		//console.log('inmenu_changed');
		const html = Q.script_detected($('#qt').val());
		localStorage.setItem("inmenu",html);
		$('inmenu_result').html(html);},

	/*Pushes the raw script onto the page so it runs.*/
	ctrl_enter(el){
		const a = $(el+' .ace_text-input'), i = 'inmenu';
		a.unbind('keydown');
		a.keydown(function(e){
			if(e.ctrlKey && e.keyCode == 13){

				//console.log('ctrl_enter' + el);
				if(el==i){
					const html = $('#qt').val();
					$(i+'_result').html(html);
				}else{
					const id = $(this).parent().attr('id').substring(6);
					$('#html'+id).html($('#tahtml'+id).val());
				}
			}
		});},

	/*Toggle the edit menu triggered by each code block button.*/
	edit_menu(e){
		//console.log('edit_menu');
		Q.au('slide.mp3');
		const id = $(e).attr('id').substring(2),
			  d = 'display',
			  b = 'block',
			  s = '#safes'+id,
			  q = '#qt'+id,
			  r = $(q);
		let cl;
		if($(e).attr('clicked') == 1){
			$(q+', '+s).animate({height:'0'},{
				complete: ()=>{
					cl = 0;
					$(q+', '+s).hide();
					$(e).attr('clicked', 0);
					r.find('.btn_safess').attr('clicked', 0);
					$(s).removeClass('all_safes_show').removeAttr('style');
				}
			});
		}else{
			cl = 1;
			r.css(d,b);
			$(s).css(d,b);
			let menu_heights = r.attr('data-height');
			r.animate({height:menu_heights},{complete:()=>{
				menu_heights = $('#editor'+id).height();
				if(menu_heights>360){
				r.animate({height:menu_heights+60+'px'});}
			}});
		}
		$(e).attr('clicked', cl);},

	/*Toggle the safes menu triggered by the history button.*/
	safes_menu(e){
		//console.log('safes_menu');
		Q.au('slide.mp3');
		const id = $('#safes' + $(e).parent().attr('id').substring(2)),
			a = 'all_safes_show';
		let	cl;
		if($(e).attr('clicked') == 1){
			cl = 0;
			id.removeClass(a);
			id.animate({display:'none'}).delay(300);
		}else{
			cl = 1;
			id.addClass(a);
		}$(e).attr('clicked', cl);},

	/*Turns raw blocks into editable bocks by adding buttons input fields and scripts.*/
	qt(data,id){
		//console.log('qt');
		/*make a function and add the string replace as a js file don't get any data in this case just use the info you posted*/
		const	decoded = str_replace(data),
			b = '<button title="',
			g = 'q'+id+'.getSession().',
			v = 'class="',
			c = v+'btn_',
			l = id.trim(),
			u = '</button>';
		return `	<qt>
			<tq id="html${l}">
				${decoded}
			</tq>
			<button id="bu${l}" ${v}qt_btn">${l+u}
			<qt_menu id="qt${l}" data-height="${menu_height}">
				${b}Encrypt" ${c}encryptit">${ic('pin-lock')+u+b}Pin" ${c}edit">${ic('pin')+u}<input title="Page" ${v}page_input" id="page${l}" value="${$('#page').val()}" placeholder="home"/>${b}Refresh" ${c}refresh">${ic('refresh')+u+b}Delete" ${c}delete">${ic('trash')+u}<textarea id="tahtml${l}" ${v}qt">${data}</textarea>
				<div id="editor${l}" ${v}editor">${data}</div>
			</qt_menu>
			<all_safes id="safes${l}"></all_safes>
			<script>
				const q${l}=ace.edit("editor${l}"),
					 qf${l}=$("textarea[id=tahtml${l}");
				q${l}.setTheme(def_theme);
				${g}setMode("ace/mode/html");
				${g}setUseWorker(false);
				${g}on("change", ()=>{ qf${l}.val(${g}getValue()); });
				${g}setUseWrapMode(true);
				q${l}.setOptions({fontSize:"16px",showGutter:false,showPrintMargin:false});
				q${l}.setValue($("#tahtml${l}").val(), -1);<\/script>
		</qt>`;},

	/*Single row actions*/
	single_row(id,data,type=true){
		eval("q"+id).setTheme(def_theme);
		const decoded = str_replace(data),
			  l = `livedata > ld[title='${id}']`,
			  h = 'hl_live';
		$('#html'+id).html(decoded);
		eval("q"+id).setValue(decoded,-1);
		Q.au('got.wav');
		$('#bu'+id).removeClass(h);
		$('#qt'+id).find('.btn_delete').show();
		if(type){
			$('#safes'+id).find('.getsafe_btn').removeClass(h);
			$('a'+l).html($('b'+l).html());
			Q.checker();
		}},

	/*get one block of code and update the live data.*/
	qt_onerow(id,save){
		$.ajax({
			url: "r/ajax/qt_onerow.php",
			method: "POST",
			data:{id: id, save: save},
			dataType: "text",
			success: function(data){
				Q.single_row(id,data);
			}
		});},

	/*Add this row to the safes and update the live data.*/
	qt_saverow(id){
		//console.log('qt_saverow '+id);
		$.ajax({
			url: "r/ajax/qt_saverow.php",
			method: "POST",
			data:{id: id},
			dataType: "text",
			success: function(data){
				Q.single_row(id,data);
			}
		});},

	/*Load a safe*/
	getsafe(e){
		//console.log('getsafe');
		const p = $(e).parent(),
			  date = p.attr('safes_date').replace(/_/g,' '),
			  id = p.parent().attr('id').substring(5),
			  h = 'hl_live';
		$.ajax({
			url: "r/ajax/qt_safe.php",
			method: "POST",
			data:{date: date},
			dataType: "text",
			success: function(data){
				Q.single_row(id,data,false);
				p.parent().find('.getsafe_btn').removeClass(h);
				$(e).addClass('hl_live');
			}
		});},

	/*Name a safe and send it to the qt server*/
	namesafe(e){
		//console.log('namesafe');
		const p = $(e).parent(),
			  date 	= p.attr('safes_date').replace(/_/g,' '),
			  id 	= p.parent().parent().find('tq').attr('id').substring(4),
			  n 	= '.namesafe_input',
			  name 	= p.find(n).val();
		$.ajax({
			url: "r/ajax/qt_name.php",
			method: "POST",
			data:{date: date, name: name},
			dataType: "text",
			success: function(data){
				Q.toggle_safe(p.find(n),true);
			}
		});},

	/*Get rows based on missing from live data*/
	qt_newrows(send){
		//console.log('qt_newrows');
		let ids = '';
		$("alivedata ld").each(function(index){
			ids += $(this).attr("title").trim()+',';
		});
		ids = ids.slice(0,-1);
		$.ajax({
			url: "r/ajax/qt_newrows.php",
			method: "POST",
			data:{ ids: ids, page: page },
			dataType: "text",
			success: function(data){
				let result = '';
				data = data.split("*");
				data.pop();

				for(const value of data){
					const onedata = value.split("$");
					result += Q.qt(onedata[2], onedata[0]);
					//console.log('appended to a');
					$('alivedata').append(`			<ld title="${onedata[0]}">${onedata[1].trim()}</ld>\n`);}

				Q.checker(send,true);
				$('all').append(result);
				Q.au('got.wav');
				Q.all_triggers();
			}
		});},

	/*Upload encrypted or regular new HTML to qt server and update live data.*/
	sendit(){
		//console.log('sendit');
		let html = $('#qt').val().trim();
		const new_page = $('#page').val().trim();
		Q.au('send.mp3');
		if($(dec_input).val().trim() !== "" && send_mode_enc){html = Q.encryption_block(html);}
		$.ajax({
			url: "r/ajax/insert.php",
			method: "POST",
			data:{ tokenoflove: token, html: html, page: new_page},
			dataType: "text",
			success: function(data){
				localStorage.setItem("inmenu",'');
				if(new_page!==page){
					//uses php no cash so all content gets loaded
					window.location.href = '/'+ new_page.replace(/ /g,"_");
					return false;
				}
				const onedata = data.split(",");
				Q.au('here.wav');
				$('all').append(Q.qt(html, onedata[0]));
				$('alivedata, blivedata').append(`			<ld title="${onedata[0]}">${onedata[1].trim()}</ld>\n`);
				//console.log('Sended: '+onedata[0]);
				Q.checker(false,true);
				$('inmenu_result').remove();
				$('all').after('<inmenu_result></inmenu_result>');
				ace.edit("editor").setValue('',-1);
				Q.all_triggers();
			}
		});},

	/*Convert HTML into a encrypted block that can be decrypted later.*/
	encryption_block(html){
		//console.log('encryption_block');
		const key = $(dec_input).val(),
			  date = new Date().valueOf();
		return  `<enc id="AESd${date}">${CryptoJS.AES.encrypt(html ,key)}</enc><script>AESd('${date}');<\/script>`;},

	/*Edit the current block and send encrypted or regular version to qt server and update live data.*/
	edit(e){
		//console.log('edit');
		const id 		= $(e).parent().attr('id').substring(2),
			  l 		= `livedata>ld[title='${id}']`,
			  i			= 'q'+id,
			  new_page 	= $('#page'+id).val(),
			  enc_s		= $('#editor'+id).hasClass(def_theme_class);

		let   html 		= $('#tahtml'+id).val().trim(),
			  enc		= false;

		if(html == ''){return false;}

		//if you want to encrypt or unecrypt dont check for changes
		if($(e).attr("class") === 'btn_encryptit' && !enc_s){
			if(!$('#bu'+id).hasClass('hl_live')){return false;}}

		Q.au('edit.mp3');

		if($(e).attr("class") === 'btn_encryptit'){
			html = Q.encryption_block(html);
			enc = true;
			eval(i).setTheme(dec_theme);
		}
		$.ajax({
			url: "r/ajax/edit.php",
			method: "POST",
			data:{id: id, page: new_page, html: html, tokenoflove: token},
			dataType: "text",
			success: function(data){
				/*Go to the right page*/
				if(!page.split(',').includes(new_page)){
					window.location.href = '/'+ new_page.replace(/ /g,"_");
					return false;
				}
				Q.safes(id,false);
				$('#html'+id).html($('#tahtml'+id).val());
				Q.au('here.wav');
				$('a'+l+', '+'b'+l).html(data);
				$('#bu'+id).removeClass("hl_live hl_edit");
				$('#qt'+id).find('.btn_delete').show();
				$('#editor'+id).removeClass('live_editor edit_editor');
				if(enc){eval(i).setTheme(dec_theme);}
				else{eval(i).setTheme(def_theme);}}
		});},

	/*Get latest version of this code block.*/
	refresh(e){
		//console.log('refresh');
		const id = $(e).parent().attr('id').substring(2),
			   a = $('#qt'+id).parent(),
			   l = "livedata > ld[title='" + id +"']";
             let n = 1;
		if($("#bu"+id).hasClass('hl_missing')){
			Q.au('delete.mp3');
			a.remove();
			$('a'+l+', '+'b'+l).remove();
		}else{
			if(a.parent().prop('nodeName') === 'ALL'){ n = 0; }
			Q.qt_onerow(id,n);
		}},

	/*Get the latest safes or cleans safes if none are left.*/
	safes(id,del){
		//console.log('safess');
		$.ajax({
			url: "r/ajax/safes.php",
			method: "POST",
			data:{id: id},
			dataType: "text",
			success: function(data){
				let result = '';
				const b = '<button title="',
					  u = '</button>',
					  s = $('#safes'+id),
					  i = $('#qt'+id),
					  t = $('#bu'+id);
				data = data.split("~");
				data.pop();
				for(const value of data){
					result += `
					<safes safes_date="${value.substring(0, 19).replace(" ", "_")}">
					${b}Rename safe" class="namesafe_btn">${ic('pencil')+u}<input title="Safe name" class="namesafe_input" placeholder="${value.substring(5, 19)}" value="${value.slice(19)}">${b}View safe" class="getsafe_btn">${ic('eye')+u}</safes>`;}
				s.html(result);
				if(i.find('.btn_safess').length == 0){
				   i.find('.btn_refresh').after(b+`History" class="btn_safess">${ic('safes')+u}`);
				}
				Q.all_triggers();

				if(del){
					//console.log("delete save");

					if(s.find('safes').length > 0){
						Q.qt_saverow(id);
						//show latest data and make sure save is cool.
						const newest_save = i.parent().find('all_safes safes')[0];
						newest_save.remove();
						t.attr('title',$(newest_save).attr('safes_date'));

						//console.log('delete_save some saves are left');
					}else{
						//console.log('delete_save no saves left');
						if($('.qt_btn').length < 2){
							$('a[href="'+page+'?!"]').remove();
							//console.log('removed page from recent');
						}
						if(t.parent().parent()[0].tagName !== "ALLSAVE"){
							//console.log('no ALLSAVE');
							Q.qt_onerow(id,0);
							s.remove();
							i.find('.btn_safess').remove();
							i.find('.btn_delete_all').remove();
						}else{
							//console.log('in ALLSAVE!');
							t.parent().remove();
						}
					}
				}
			}
		});},

	/*Triggered by the delete button.*/
	deleter(e){
		const id = $(e).parent().attr('id').substring(2),
			  t = $('#qt'+id).parent(),
			  p = t.parent().prop('nodeName') === 'ALL',
			  s = $('#safes'+id);

		if( !$('#bu'+id).hasClass('hl_live') &&	s.find('.hl_live').length === 1){
			const date = s.find('.hl_live').parent().attr('safes_date').replace(/_/g," ");
			//console.log('delete_selected_save');
			Q.delete_save(id,date);
		}else{

			if(save_mode){
				if(p && s.find('safes').length === 0){
					//console.log('delete for ever');
					Q.delete_(id,1,0);
				}else{
					if(p){
						//console.log('simple destroy');
						Q.delete_(id,1,1);
						Q.qt_saverow(id);
						t.find('all_safes safes')[0].remove();
					}else{
						Q.delete_save(id,0);
						//console.log('delete oldest save');
					}
				}
			}else{
				//console.log('delete and backup');
				Q.delete_(id,0,0);
				if($('.qt_btn').length < 2){
					$('a[href="'+page+'"]').remove();
					//console.log('removed page from recent');
				}
			}

		}},

	/*Delete the oldest safe???*/
	delete_save(id,date){
		$.ajax({
			url: "r/ajax/delete_save.php",
			method: "POST",
			data:{id: id, tokenoflove: token, date: date},
			dataType: "text",
			success: function(data){
				Q.au('delete.mp3');
				Q.safes(id,true);
			}
		});},

	/*Delete the active version of this code block.*/
	delete_(id,destroy,save){
		$.ajax({
			url: "r/ajax/delete.php",
			method: "POST",
			data:{id: id, tokenoflove: token, destroy: destroy},
			dataType: "text",
			success: function(data){
				//console.log('Deleted:'+id);
				const l = "livedata > ld[title='"+id+"']",
				      b = $('#qt'+id),
				      a = 'allsave',
				      c = $('all');
				Q.au('delete.mp3');
				if(save == 1){
					if(c.find(a).length == 0){
					   c.append(`<${a}></${a}>`);
					}
					$('#bu'+id).parent().detach().appendTo(a);
					b.find('.btn_encryptit').remove();
					b.find('.btn_edit').remove();
				}else{
					b.parent().remove();
				}

				$('a'+l+', '+'b'+l).remove();
			}
		});},

	/*Delete all the safes with this number.*/
	delete_all_safes(e){
		const id = $(e).parent().attr('id').substring(2),
			  b = $('#bu'+id).parent();
		//console.log('Delete_all_safes:'+id);
	    if(confirm("Are you sure you want to delete all save?")){
	    	$.ajax({
				url: "r/ajax/delete_saves.php",
				method: "POST",
				data:{id: id, tokenoflove: token},
				dataType: "text",
				success: function(data){
					//console.log('Deleted:'+id);
					Q.au('delete.mp3');
					if(b.parent()[0].tagName !== "ALLSAVE"){
						Q.qt_onerow(id,0);
						$('#safes'+id).remove();
						$('#qt'+id).find('.btn_safess').remove();
					}else{
						b.remove();
					}
				}
			});

	    }},

	/*Get the live data so later it can be compared.*/
	ld(m){
		//console.log('ld');
		$.ajax({
			url: "r/ajax/ld.php",
			method: "POST",
			data:{page: page},
			success: function(data){
				let result = '';
				data = data.split(",");	data.pop();
				resetcountdown = true;
				for(const value of data){
					result += `			<ld title="${value.slice(8)}">${value.substring(0, 8)}</ld>\n`;}
				$('blivedata').html('\n'+result);
				if(m){	Q.checker(true,false);
				}else{	Q.checker();}
			}
		});},
		/* ENDGet latest dates */

	/*Detect differences in the latest version of the page and the version now active.*/
	checker(send=false,emptytest=false){
		//console.log('checker');
		//makes it possible to post when the page is empty
		const l  = $("blivedata ld").length,
		 	  ld = "livedata > ld[title='",
		 	  al = "a"+ld,
		 	  bl = "b"+ld,
		 	  hm = 'hl_missing',
		 	  he = 'hl_edit',
		 	  m  = 'hl_match',
		 	  c  = he + " " + hm;
		if(l == 0 && send && !emptytest){Q.qt_newrows(send);}
		if(l == 0 && send && emptytest){Q.sendit();}

		$("alivedata ld").each(function(index){
			const al_id 	= $(this).attr("title").trim(),
			      bl_id 	= $(bl+al_id+"']").attr("title"),
				  bl_date 	= $(bl+al_id+"']").html(),
				  al_date	= $(this).html(),
				  e 		= 'edit_editor',
				  f 		= 'missing_editor',
				  u 		= $("#bu"+al_id),
				  d 		= $("#editor"+al_id);

			if(al_id + bl_id === al_id + "undefined"){
				$(this)				.addClass(hm).removeClass(m);
				u					.addClass(hm);
				d					.addClass(f);
			}else if(bl_date === al_date.trim()){
				$(al+bl_id+"']")	.addClass(m).removeClass(c);
				u					.removeClass(c);
				d					.removeClass(e+' '+f);
			}else if(bl_date !== al_date.trim()){
				u					.addClass(he);
				d					.addClass(e);
				$(this)				.addClass(he).removeClass(m);

			}
		});
		let any_missing = 0;
		$("blivedata ld").each(function(index){
			const bl_id   = $(this).attr("title").trim(),
				  al_id   = $(al+bl_id+"']").attr("title"),
				  al_date = $(al+bl_id+"']").html(),
				  bl_date = $(this).html();

			if(bl_id + al_id === bl_id + "undefined"){
				$(this).addClass(hm).removeClass(m);
				any_missing++;
			}else if(bl_date === al_date.trim()){
				$(bl + bl_id +"']").addClass(m).removeClass(c);
			}else if(bl_date !== al_date.trim()){
				$(this).addClass(he).removeClass(m);
			}
			if($("blivedata ld").length === (index+1)){
				if(send && any_missing == 0){Q.sendit();}
				if(any_missing !== 0){Q.qt_newrows(send);}
			}
		});},
		au(fi){
			new Audio('r/sound/'+fi).play();
		}};


/*Activate all the buttons, load the inmenu and get local storage, start to detect changes and load all recent.*/
Q.all_buttons();
Q.inmenu();
Q.first_load();



/*Add ACE editor to the inmenu*/

$(document).ready(()=>{
	//console.log('Main menu editor');

	const imf = $("#qt"),
		  im = ace.edit("editor");
	im.setTheme(def_theme);
	im.getSession().setMode("ace/mode/html");
	im.getSession().on("change", ()=>{
		imf.val(im.getSession().getValue());
		Q.inmenu_changed();
	});
	im.getSession().setUseWrapMode(true);
	im.getSession().setUseWorker(false);
	im.setOptions({
		fontSize: "16px",
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true,
		showGutter: false,
		showPrintMargin: false
	});
	let html = $('#qt').val();
	html = html.replace(/<scrupt/gi, '<script').replace(/<\/scrupt/gi, '<\/script');
	 im.setValue(html);

    Q.ctrl_enter('inmenu');
});

/*Add ACE editor to all the code blocks*/
$('qt_menu').children('.editor').each(function(index){
	const id = $(this).attr('id').substring(6),
		  h = $("#html"+id).html().trim();
	let e;
	if(save_mode){	e = str_replace(h.slice(6).slice(0, -7));
	}else{			e = str_replace(h);}
	qteditor = ace.edit(this);
	qteditor.getSession().setMode("ace/mode/html");
	qteditor.setTheme(def_theme);
	qteditor.setValue(e,-1);
	qteditor.getSession().setUseWrapMode(true);
	qteditor.setOptions({
		fontSize:"16px",
		showGutter:false,
		showPrintMargin:false
	});});



/*Toggle the inmenu*/
$('#btn_min').click(()=>{
	//console.log('#btn_min click');
	Q.au('slide.mp3');
	let t, b, cl, o, w, mb;
	const bm = $('#btn_min'),
		  d = $(document);
	if($(this).attr('clicked') == 1){
		mb = '40px'; t = 'add content'; cl = 0; o = 0; w = '105px';
		if($('.small_r').is(":visible")){b = '-217px';}else{b = '-185px';}
	}else{
		mb = '260px'; t = '-'; b = 0; cl = 1; o = 1; w = '27px';
		const h = d.height(), sh = d.scrollTop();
		if(h<=(sh+813)){$('html, body').animate({scrollTop:h},'50');}
	}
	bm.animate({width:w},{complete:()=>{bm.text(t);}});
	$('inmenu').animate({bottom:b});
	$('body').animate({marginBottom:mb});
	$('buttons').animate({opacity:o});
	$(this).attr('clicked', cl);});

/*Toggle the encryption input field (depends on the size of the screen)*/
$(dec_trigg).click(()=>{
	//console.log(dec_trigg);
	Q.au('slide.mp3');
	let w,p,h,m,w2,p2,ml;
	const
		v = ':visible',
		e = $(dec_trigg),
		m1 = $('.small_r').is(v),
		m2 = $('imp_toggle').is(v),
		ro = $('r_out'),
		pa = $('#page'),
		ei = $(dec_input),
		up = 'untoggle_page',
		tp = 'toggled_page',
		re = 'r_enc_big',
		eb = 'enc_big';

	if(e.attr('clicked') == 1){
		cl = 0; h = true; 	w = '0'; 		p = '4px 0'; 	m = '0';
	}else{
		cl = 1; h = false; 	w = '130px'; 	p = '4px 8px'; 	m = '8px';
		e.addClass('decrypt_btn');
		$(dec_input+'_form').css('display','inline-block');
	}
	e.attr('clicked', cl);
	Q.enc_length(h);
	if(m2&&h){	w2 = '125px'; 	p2 = '4px 8px'; ml = '8px';}
	if(m2&&!h){	w2 = '0'; 		p2 = '4px 0'; 	ml = '0';}
	if(m2){
		pa.animate({width:w2, padding:p2, marginLeft:ml},{
			complete:()=>{
				if(h){pa.removeClass(up);}else{pa.addClass(up);}
				pa.removeAttr('style');}
		});
	}
	if(h){pa.removeClass(tp);}else{pa.addClass(tp);} //has to come after the m2 function
	if(m1&&h){if(h){ro.removeClass(re);}else{ro.addClass(re);}}
	if(!m1&&!h&&m2||!m1&&h){l2='300px';}
	if(!m1&&!h&&!m2){		l2='450px';}
	if(!m1&&h){ ro.animate({left:l2},{complete:()=>{ro.removeClass(re).removeAttr('style');}});}
	if(!m1&&!h){ro.animate({left:l2});setTimeout(()=>{ro.addClass(re).removeAttr('style');}, 800);}
	ei.animate({width:w, padding:p, marginLeft:m},{
		complete:()=>{if(!h){ei.addClass(eb);}else{ei.removeClass(eb);}ei.css('width','');}
	});decrypt();});

/*Toggle the buttons next to each code block*/
$('#hide_btn').click(()=>{
	//console.log('#hide_btn');
	const s = $('styleholder'),
		  h = $('#hide_btn');
	if(s.html() == ""){
		s.html('<style>button.qt_btn{display:none;}</style>');
		h.html(ic('eye'));
	}else{
		s.empty();
		h.html(ic('eye-red'));
	}});

/*Send html block to qt server*/
$('.send_btn').click(function(){
	//console.log('.send_btn');
	if($(this).attr('id') === 'send_encrypted'){send_mode_enc = true;}else{send_mode_enc = false;}
	const html = $('#qt').val().trim();
	if(html === ""){return false;}
	Q.ld(true);});


(function(){

	/*add the audio files to pre-load*/
	const a = ['delete.mp3','edit.mp3','got.wav','here.wav','other.mp3','send.mp3','slide.mp3'];
	let b = '';
	for(const value of a){ b += `<source src="r/sound/${value}"		type="audio/${value.split('.')[1]}">`;}
	$('body').prepend(`<audio preload="auto">${b}</audio>`);


	/*Timer that triggers the refresh*/
	if(!save_mode){
		//Refresh speed
		const cm = 20;
		let c = cm;
	 	//Dont refresh if no one is looking
		window.onblur  = ()=>{window.blurred = true; };
		window.onfocus = ()=>{window.blurred = false;};
		setInterval(()=>{

			if(resetcountdown){c = cm; resetcountdown = false;}
			/*if(c > (cm-2)){
			console.log(c);
			}if(c < 3){
			console.log(c);
			}*/
			if(window.blurred){c = 3; return;}
			if(c === 0){ Q.ld(false);c = cm;}
			--c;
			const x = Math.ceil((255 - 39) / cm),
				y = Math.ceil((225 - 39) / cm),
				z = Math.ceil(34 / cm),
				rgb = 'rgb('+(x*(cm-c))+', '+(y*(cm-c))+', '+(z*c)+')';
			//END RESULT '39, 40, 34'
			$('#btn_min').css('background-color',rgb);

		}, 1000);}


})();


/*Get data from external url usefull to cal on the platform (adjust is to replace local references with absolute links)*/
const getbyurl = (d)=>{

	let limiter = 0;
	const refresh_interval = setInterval(refresh, 5);

	function refresh(){
		if($('#'+d.getid).length !== 0 || limiter > 700){clearInterval(refresh_interval);}
		d.loaded();
		limiter++;
	}

    $.ajax({
    	url: "r/ajax/grabber.php",
    	method: "POST",
    	data:{id:d.getid, href:d.gethref, adjust:d.adjust},
    	success: function(data){
    		$("#"+d.where).html(data);
    	}
    });};