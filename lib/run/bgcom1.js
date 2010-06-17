var glb_barra_str = '';
var host_barra = 'http://barra.globo.com'
var site_collections = [];
var sites_list = [  ];
var current_channel_name = 'Globo.com\n';
var current_channel_ico = '/media/barra/upload/ogs/globocom.jpg'
var channel_url = 'http://www.globo.com\n';
var glb_barra_params = {};
var current_site_collection = site_collections[0]||undefined;
var current_site_collection_id = undefined;
var current_destinations = site_collections[0]!=undefined ? site_collections[0].fields.destinations : undefined;
var force_channel = 'False\n';

if (force_channel > '') {
    force_channel = eval('False'.toLowerCase());
}

function logWarn(warn) {

}

function find_site_collection_for_hosting_document() {
    var domain_name_regexp = /([a-zA-Z0-9\-\.]+\.(com|com\.br|org\.br|net\.br|org|net))/g;
    var full_uri = document.location.toString().toLowerCase();
    var host = full_uri.match(domain_name_regexp);
    for  (var x in sites_list) {
        if (host == sites_list[x].homeUrl) {
            current_site_collection_id = sites_list[x].site_collection
            getDestinationsForSiteCollection(current_site_collection_id);
        }
    }
    // META TAG HAS A HIGHER PRIORITY OVER HOST NAMES
    //site_collection_meta_tag = $("meta[name=glb-site-collection-name]");
    site_collection_meta_tag = undefined;
    current_destinations = site_collections[0].fields.destinations;
    var metas = document.getElementsByTagName("meta");
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].name == 'glb-site-collection-name') {
            site_collection_meta_tag = metas[i];
            break;
        }
    }
    if (site_collection_meta_tag) {
        var site_collection_name = site_collection_meta_tag.content;
        if (site_collection_name) {
            for (x in site_collections) {
                if (site_collection_name == site_collections[x].fields['name']) {
                    current_site_collection_id = site_collections[x].pk
                    logWarn(current_site_collection_id);
                    getDestinationsForSiteCollection(current_site_collection_id);
                }
            }
        }
    }
}


function getDestinationsForSiteCollection(site_colection_id) {
    for (x in site_collections) {
        if (site_collections[x].pk == site_colection_id) {
            current_site_collection = site_collections[x]
            if (site_collections[x].fields['destinations'].length > 0) {
                current_destinations = site_collections[x].fields['destinations']

            }
        }
    }
}


function glb_appendCss(url) {
	var x = document.createElement('link');
	x.type = 'text/css';
	x.rel = 'stylesheet';
	x.media = 'screen';
	x.href = url;
	document.getElementsByTagName('head')[0].appendChild(x);
}

function showHideMenu(hide, menu, interval){
	clearTimeout(interval);

	if(!hide){
		menu.style.display = "block";
		return false;
	}

	interval = setTimeout(function(){ if(hide) menu.style.display = "none"; }, 10);
	return interval;
}

function addEvent(a) {
	try {
		var object = a.object;
		var event = a.event;
		var func = a.func;

		if(!object) return;
		if(event.constructor != String) return;
		if(func.constructor != Function) return;
	} catch(e) {};
		if(object.addEventListener) {
			object.addEventListener(event, func, false);
		} else if(object.attachEvent) {
			object.attachEvent('on' + event, func);
	}
}


function apply_contextual_hint_nav_behaviour() {

		var siteCollections = document.getElementById("menu-og-contexto");
		var subSites = document.getElementById("glb-subcontextos");
		var subSitesSibling = siteCollections.getElementsByTagName("strong")[0];
		var hideMenu = true;
		var self = this;

		addEvent({object:siteCollections, event:"mouseover", func:function(){
			self._interval =  showHideMenu(false, subSites, self._interval);
		}});

		addEvent({object:siteCollections, event:"mouseout", func:function(){
			self._interval = showHideMenu(true, subSites, self._interval);
		}});

		addEvent({object:subSites, event:"mouseover", func:function(){
			self._interval = showHideMenu(false, subSites, self._interval);
			      siteCollections.style.background = "#fff url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y left 12px";
			siteCollections.style.borderColor = "#06d";

			      subSitesSibling.style.background = "url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y right 12px";
		}});

		addEvent({object:subSites, event:"mouseout", func:function(){
			self._interval = showHideMenu(true, subSites, self._interval);
			siteCollections.style.background = "";
			siteCollections.style.borderColor = "";
			subSitesSibling.style.background = "";
		}});
}

function globomail_over(){
	var itemEmail = document.getElementById("menu-globomail").getElementsByTagName("a")[0];

	var subEmail = document.getElementById("globomail-subcontexto");
	var subEmailSibling = itemEmail.getElementsByTagName("strong")[0];
	var glbmail_interval = null;

	addEvent({object:itemEmail, event:"mouseover", func:function(){
			glbmail_interval  = showHideMenu(false, subEmail, glbmail_interval);
	}});

	addEvent({object:itemEmail, event:"mouseout", func:function(){
			glbmail_interval  = showHideMenu(true, subEmail, glbmail_interval);
	}});

	addEvent({object:subEmail, event:"mouseover", func:function(){
			glbmail_interval = showHideMenu(false, subEmail, glbmail_interval);
		      itemEmail.style.background = "#fff url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y left 17px";
			itemEmail.style.borderColor = "#06d";
		      subEmailSibling.style.background = "url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y right 17px";
	}});

	addEvent({object:subEmail, event:"mouseout", func:function(){
			glbmail_interval = showHideMenu(true, subEmail, glbmail_interval);
			itemEmail.style.background = "";
			itemEmail.style.borderColor = "";
		      subEmailSibling.style.background = "url(http://barra.globo.com/media/img/separador-menu.gif) no-repeat right 13px";
	}});
}

function glb_barra_init(){
css_barra_str = '';
css_barra_str += '<style type="text/css">';
css_barra_str += '#glb-barra-widget {background-color:#F3F3F3;margin:0 auto; z-index:99999; position:relative; }\n';
css_barra_str += '#glb-barra-widget #glb-barra-logo {float:left;height:18px;margin:10px 7px 0 10px;width:74px;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-logo a {color:#06d;display:block;font-size:.83em;height:100%;position:relative;text-decoration:none;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-logo a:hover {color:#09f;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-logo a strong {background:url(http://barra.globo.com/media/img/logo-glb.gif) no-repeat;cursor:pointer;display:block;height:100%;position:absolute;width:100%;}\n';

css_barra_str += '#glb-barra-widget #glb-barra-logo a:hover strong {background-position:0 -18px;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu {float:left;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu .glb-item-menu {background:url(http://barra.globo.com/media/img/separador-menu.gif) no-repeat left 15px;display:inline;float:left;position:relative;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu .glb-item-menu a {border-top:.2em solid #F3F3F3;color:#06d;display:block;font-size:1.3em;letter-spacing:-0.02em;font-weight:bold;margin-left:1px;padding:6px 7px 12px;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu .glb-item-menu a:hover {border-color:#06d;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-noticias {color:#a80000;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-noticias:hover {border-color:#a80000;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-esportes {color:#3e831e;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-esportes:hover {border-color:#3e831e;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-entretenimento {color:#f90;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-entretenimento:hover {border-color:#f90;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-videos {color:#005cef;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-menu li #menu-videos:hover {border-color:#005cef;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-og, #glb-barra-widget #glb-og-contexto strong {text-transform:lowercase;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-og {background:url(http://barra.globo.com/media/img/separador-menu.gif) no-repeat left 15px;display:inline;float:left;position:relative;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-og a {border-top:.2em solid #F3F3F3;color:#06d;display:block;font-size:1.3em;letter-spacing:-0.02em;font-weight:bold;margin-left:1px;padding:6px 7px 12px;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-og a:hover {border-color:#06d;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-og img {margin:-4px 3px 0 0;_margin-top:0px;vertical-align:middle;border:0;}\n';
css_barra_str += '#glb-barra-widget #glb-og-contexto {background:url(http://barra.globo.com/media/img/separador-menu.gif) no-repeat left 15px;display:inline;float:left;margin-left:3px;}\n';
css_barra_str += '#glb-barra-widget #glb-og-contexto #menu-og-contexto {border-top:.2em solid #f3f3f3;color:#06d;display:block;font-size:1em;margin-left:0;padding:6px 0 12px;position:relative;z-index:98;}\n';
css_barra_str += '#glb-barra-widget #glb-og-contexto #menu-og-contexto strong {padding:6.5px 7px 12px;}\n';
css_barra_str += '#glb-barra-widget #glb-og-contexto #menu-og-contexto:hover {background:#fff url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y left 15px  !important;border-color:#06d;}\n';
css_barra_str += '#glb-barra-widget #glb-og-contexto #menu-og-contexto:hover strong {background:url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y right 15px !important;}\n';
css_barra_str += '#glb-barra-widget #glb-og-contexto #menu-og-contexto {display:none;}\n';
css_barra_str += '#glb-barra-widget #glb-subcontextos {background-color:#fff;border:1px solid #dddddd;display:none;margin-top:-1px;position:absolute;padding:7px 0 15px 1px;}\n';
css_barra_str += '#glb-barra-widget #glb-subcontextos li {display:inline;float:none;white-space:nowrap;}\n';
css_barra_str += '#glb-barra-widget #glb-subcontextos li a {border:none;color:#595959;display:block;font-size:1em;font-weight:normal;padding:2px 30px 0 5px;position:relative;}\n';
css_barra_str += '#glb-barra-widget #glb-subcontextos li a:hover {border:none;color:#005cef;text-decoration:underline;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos {float:right;margin-right:3px;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos .glb-item-servicos {background:url(http://barra.globo.com/media/img/separador-menu.gif) no-repeat left 15px;display:inline;float:left;position:relative;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos .glb-item-servicos a {color:#666666;font-size:.92em;display:block;font-weight:bold;margin-top:2px;padding:11px 7px;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos .glb-item-servicos a:hover {text-decoration:underline;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos .central-globocom {background:none;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos #menu-globomail {float:left;margin-top:-2px;position:relative;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos #menu-globomail .glb-mail {border-top:.2em solid #F3F3F3;color:#666666;display:block;font-size:.92em;margin-top:2px;position:relative;padding:11px 0 13px 25px;z-index:99}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos #menu-globomail .glb-mail:hover {background:#fff url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y left 14px !important;border-top:.2em solid #06d;text-decoration:none;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos #menu-globomail .glb-mail strong {background:url(http://barra.globo.com/media/img/separador-menu.gif) no-repeat right 14px;padding:11.3px 7px 13px;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos #menu-globomail .glb-mail:hover strong {background:url(http://barra.globo.com/media/img/separador-menu.gif) repeat-y right 14px !important;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos #menu-globomail .glb-mail img {margin-left:-16px;position:absolute;top:13px;*top:26px;border:none}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos  #menu-globomail #globomail-subcontexto {background-color:#fff;border:1px solid #ddd;display:none;margin-top:-1px;padding:7px 0 15px 0;position:absolute;z-index:98}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos  #menu-globomail #globomail-subcontexto li {background-image:none;border:none;display:inline;float:none;margin-bottom:2px;white-space:nowrap;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos  #menu-globomail #globomail-subcontexto li a {border:none;color:#595959;display:block;font-size:1em;font-weight:normal;padding:5px 30px 0 7px;*padding:6px 30px 0 7px;position:relative;}\n';
css_barra_str += '#glb-barra-widget #glb-barra-servicos  #menu-globomail #globomail-subcontexto li a:hover {border:none;color:#005cef;text-decoration:underline;}\n';
css_barra_str += '#glb-barra-widget .glb-oculto {display:none !important;}\n';
css_barra_str += '#glb-barra-widget {background-color:#F3F3F3;display:table;font:12px arial,helvetica,freesans,sans-serif;min-width:960px;width:100%;}\n';
css_barra_str += '#glb-barra-widget .conteudo-barra {margin:0 auto;width:80em;}\n';
css_barra_str += '#glb-barra-widget .glb-barra-escopo * {margin:0;outline:0;padding:0;}\n';
css_barra_str += '#glb-barra-widget li {list-style:none;}\n';
css_barra_str += '#glb-barra-widget a {text-decoration:none;}\n';
css_barra_str += '.glb-barra-conteudo {margin:0 auto !important;text-align:left;width:960px;}</style>\n';


var cssbarra = document.createElement('style'); 
cssbarra.type = 'text/css';
if (cssbarra.styleSheet) {
	cssbarra.styleSheet.cssText = css_barra_str;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(cssbarra);
} else {    
     glb_barra_str += css_barra_str;    
}

 glb_barra_str += '<div id="glb-barra-widget">\
			<div class="glb-barra-conteudo">\
				<div class="glb-barra-escopo">\
				<div id="glb-barra-logo">\
					<a href="http://www.globo.com" title="globo.com" target="_top"><strong></strong>globo.com</a>\
				</div><!--glb-barra-logo-->\
				<ul id="glb-barra-menu">\
					<li class="glb-item-menu"><a href="http://g1.globo.com" title="not&iacute;cias" accesskey="n" id="menu-noticias" target="_top">not&iacute;cias</a></li>\
					<li class="glb-item-menu"><a href="http://globoesporte.globo.com" title="esportes" accesskey="e" id="menu-esportes" target="_top" >esportes</a></li>\
					<li class="glb-item-menu"><a href="http://entretenimento.globo.com" title="entretenimento" accesskey="t" id="menu-entretenimento" target="_top" >entretenimento</a></li>\
					<li class="glb-item-menu"><a href="http://video.globo.com" title="v&iacute;deos" accesskey="v" id="menu-videos" target="_top">v&iacute;deos</a></li>\
				</ul><!--glb-barra-menu-->';

  if(glb_barra_params.servicos){
    var  glb_barra_str_servicos='<ul id="glb-barra-servicos">';
    if(glb_barra_params.email) {
      glb_barra_str_servicos +='<li id="menu-globomail"><a href="#" title="globomail" class="glb-mail">\
                                   <img height="11" width="16" alt="e-mail" src="http://barra.globo.com/media/img/ico_globomail.gif" /><strong>e-mail</strong></a>\
									 	<ul id="globomail-subcontexto">\
									 		<li><a href="http://login.globo.com/login/1" title="globomail pro" accesskey="p" target="_top">Globomail Pro</a></li>\
											<li><a href="http://login.globo.com/login/1948" title="globomail free" accesskey="f" target="_top" >Globomail Free</a></li>\
											<li><a href="http://cadastrofree.globo.com/resources2/panfletos/comparativo_globomail/comparativo_globomail.html" title="criar um e-mail" accesskey="c" target="_top" >Criar um e-mail</a></li>\
										</ul>';
      glb_barra_str_servicos +='</li>';
    }
    if(glb_barra_params.central) glb_barra_str_servicos +='<li class="glb-item-servicos central-globocom"><a href="http://atendimento.globo.com" title="central globo.com" accesskey="r" target="_top" >central globo.com</a></li>';
    if(glb_barra_params.assine) glb_barra_str_servicos+='<li class="glb-item-servicos"><a href="http://atendimento.globo.com/Portal/ISP/assineja/panfletos/panfleto_home_globo" title="assina j&aacute" accesskey="a" target="_top">assine j&aacute;</a></li>';
    if(glb_barra_params.sites) glb_barra_str_servicos+='<li class="glb-item-servicos"><a href="http://www.globo.com/Globo.com/sites/0,,5623,00.html" title="todos os sites" accesskey="s" target="_top" >todos os sites</a></li>';

    glb_barra_str_servicos +='</ul><!--glb-barra-servicos-->';
    glb_barra_str += glb_barra_str_servicos;
  }
  glb_barra_str += '</div><!--glb-barra-escopo-->';
  glb_barra_str += '</div><!--glb-barra-conteudo-->';
  glb_barra_str += '</div><!--glb-barra-widget-->';

}

/**
 * Builds and append onto appropriate places the DOM elements for contextual navigation
 */
function createContextualHintNavigation() {
    var li_glb_barra_ctx = undefined;
    var parent_menu = document.getElementById('glb-barra-menu');
    if (parent_menu) {
        if (current_channel_name != '') {
            var li_glb_barra_og = document.createElement('li');
            li_glb_barra_og.setAttribute('id', 'glb-barra-og');
            li_glb_barra_og.setAttribute('class', 'glb-item-menu');
            parent_menu.appendChild(li_glb_barra_og);

            //Here goes main channel link
            var link_active_channel = document.createElement('a');
            //channel name here
            link_active_channel.setAttribute('title', current_channel_name);
            //channel home url here
            link_active_channel.setAttribute('href', channel_url);
            link_active_channel.setAttribute('id', 'menu-og-ativa');
            link_active_channel.setAttribute('accesskey', 'o');
            //Here goes channel image
            link_active_channel.innerHTML = '<img src="http://barra.globo.com' + current_channel_ico +'" width="18" height="18" />' + current_channel_name;
            li_glb_barra_og.appendChild(link_active_channel);

             if (current_site_collection != undefined) {
                 li_glb_barra_ctx = document.createElement('li');
                 li_glb_barra_ctx.setAttribute('id', 'glb-og-contexto');
                 li_glb_barra_ctx.innerHTML = '<a href="'+ channel_url +
                                              '" title="'+ current_site_collection.fields.name +
                                              '" id="menu-og-contexto" accesskey="d">' +
                                              '<strong>'+ current_site_collection.fields.name +'</a></strong>';
                 parent_menu.appendChild(li_glb_barra_ctx);
             }

            if (current_destinations) {
                var ul_contextual_hint_nav_itens = document.createElement('ul');

                if (ul_contextual_hint_nav_itens != undefined) {
                    ul_contextual_hint_nav_itens.id = 'glb-subcontextos';
                }

                if (li_glb_barra_ctx != undefined) {
                    li_glb_barra_ctx.appendChild(ul_contextual_hint_nav_itens);
                }

                for (var x in current_destinations) {
                    var item_li = document.createElement('li');
                    var name = current_destinations[x].fields['name'];
                    var url = current_destinations[x].fields['homeUrl'];
                    var a_tag = '<a href="' + url + '" title="' + name + '">' + name + '</a>';
                    var link = document.createElement('a');
                    link.href = url;
                    link.title = name;
                    link.appendChild(document.createTextNode(name));

                    item_li.appendChild(link);
                    item_li.innerHTML = a_tag;

                    ul_contextual_hint_nav_itens.appendChild(item_li);
                    apply_contextual_hint_nav_behaviour();
                }
            }
        }
    }
}
//find_site_collection_for_hosting_document();
//glb_appendCss(host_barra+'/barra/bgcomstatic.css');
glb_barra_params.contexto_navegacao = 0;
glb_barra_params.servicos = 1;
glb_barra_params.central = 1;
glb_barra_params.assine = 1;
glb_barra_params.sites = 1;
glb_barra_params.email = 1;
glb_barra_init();

try{
    if(document.getElementById("glbbarrawidget")){
        document.getElementById("glbbarrawidget").innerHTML = glb_barra_str;
    }else{
        document.write(glb_barra_str);
    }
}catch(e){
    document.write(glb_barra_str);
}
if (glb_barra_params.email) {globomail_over();}
if (glb_barra_params.contexto_navegacao){
    createContextualHintNavigation();

};
