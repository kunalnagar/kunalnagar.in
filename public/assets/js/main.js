var anchorForId=function(a){var e=document.createElement("a");return e.className="header-link",e.href="#"+a,e.setAttribute("title","Link to this section"),e.innerHTML='<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hashtag" class="svg-inline--fa fa-hashtag fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"></path></svg>',e},linkifyAnchors=function(a,e){for(var t=e.getElementsByTagName("h"+a),n=0;n<t.length;n++){var h=t[n];"undefined"!=typeof h.id&&""!==h.id&&h.appendChild(anchorForId(h.id))}};document.onreadystatechange=function(){if("complete"===this.readyState){var a=document.getElementsByClassName("p-blog-single")[0];if(!a)return;for(var e=1;e<=6;e++)linkifyAnchors(e,a)}};