/*jshint esversion: 6 */

/* PHP like string replace */
str_replace = (g,c)=>{
	const t = ["&amp;","&#33;","&quot;","&#039;","&lt;","&gt;","&#63;","&#42;","&#40;","&#41;","&#47;","&#36;","&#92;","&#61;","&#46;"];
	let	o = ["&","!",'"',"'","<",">","?","*","(",")","/","$","\\","=","."],
    	r, l, n, p = 0,
        a , i = "",
        u = [].concat(t),
        f = [].concat(o),
        y = "[object Array]" === Object.prototype.toString.call(f),
        b = "[object Array]" === Object.prototype.toString.call(g);
    g = [].concat(g);
    let j = "undefined" != typeof window ? window : global;
    j.$locutus = j.$locutus || {};
    let v = j.$locutus;
    if (v.php = v.php || {}, "object" == typeof t && "string" == typeof o) {
        for (a = o, o = [], l = 0; l < t.length; l += 1) o[l] = a;
        a = ""; f = [].concat(o); y = "[object Array]" === Object.prototype.toString.call(f);
    }
    for (void 0 !== c && (c.value = 0), l = 0, r = g.length; l < r; l++)
        if ("" !== g[l])
            for (n = 0, p = u.length; n < p; n++) a = g[l] + "", i = y ? void 0 !== f[n] ? f[n] : "" : f[0], g[l] = a.split(u[n]).join(i), void 0 !== c && (c.value += a.split(u[n]).length - 1);
    return b ? g : g[0];
};




const dec_theme = 'ace/theme/cobalt',
	  dec_trigg = '#encr_btn',
	  dec_input = '#encr_input',

uni_crypt = (enc,html,id)=>{
	const u = eval("q"+id);
	//console.log(enc,html,id);
	try{
		let	dec = CryptoJS.AES.decrypt(
			enc.html(),
			$(dec_input).val()
			).toString(CryptoJS.enc.Utf8);
		if(dec.trim()==''){
			dec += 'encrypted';
		}else{
			html.html(dec);
			$('#sli').remove();
		}
		u.setValue(dec, -1);
	}catch(e){u.setValue('encrypted', -1);}
	u.setTheme(dec_theme);
},

decrypt = ()=>{
	//console.log('decrypt');
	$('enc').each(function(){
		const	enc = $(this),
				html = enc.parent(),
				id = $(this).parent().attr("id").slice(4);
		uni_crypt(enc,html,id);
	});
},

AESd = date =>{
	//console.log(date);
	const enc  = $('#AESd'+date),
		  html = enc.parent(),
		  id   = html.attr("id").slice(4);
	setTimeout(()=> uni_crypt(enc,html,id), 50);
};
