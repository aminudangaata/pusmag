!function(a){a(document).on("ready",(function(){const t=undefined;a(".liquid-blog-posts").each(((t,i)=>{const n=a(i),o=a(".page-numbers",n),d=n.attr("data-filter-id"),l=a('[data-filter-id="'+d+'"] .liquid-blog-grid'),s=a(".page-nav",l.parent());o.length&&l.length&&a(document).on("click",".page-numbers",(function(t){t.preventDefault();var i=a(this).attr("href");e(l,i,d,s)}))}));const e=(t,e,i,n)=>{a.ajax({type:"GET",url:e,error:function a(t,e,i){alert(i)},beforeSend:function(){t.addClass("lqd-items-loading")},success:function(e){var o,d=a(e).find('[data-filter-id="'+i+'"] .liquid-blog-grid'),l=d.find("> div"),s=d.parent().find(".page-nav").length?d.parent().find(".page-nav"):"";n.length&&n.html(s),l.imagesLoaded((function(){t.empty(),t.append(l),t.removeClass("lqd-items-loading"),t.get(0).hasAttribute("data-liquid-masonry")&&(t.isotope("appended",l),t.isotope("layout")),a("html, body").animate({scrollTop:t.parent().offset().top-150},300),a("body").hasClass("lazyload-enabled")||a("[data-responsive-bg=true]",t).liquidResponsiveBG(),a("body").hasClass("lazyload-enabled")&&(window.liquidLazyload=new LazyLoad({elements_selector:".ld-lazyload",callback_loaded:function t(e){a(e).closest("[data-responsive-bg=true]").liquidResponsiveBG(),a(e).parent().not("#wrap, #content").addClass("loaded")}})),a("[data-split-text]",t).filter((function(t,e){return!a(e).parents("[data-custom-animations]").length&&!e.hasAttribute("data-custom-animations")})).liquidSplitText(),a("[data-fittext]",t).liquidFitText(),a("[data-custom-animations]",t).map((function(t,e){var i=a(e),n;i.parents(".wpb_wrapper[data-custom-animations]").length&&(i.removeAttr("data-custom-animations"),i.removeAttr("data-ca-options"))})),a("[data-custom-animations]",t).filter((function(t,e){var i=a(e),n=i.closest(".vc_row[data-row-bg]"),o=i.closest(".vc_row[data-slideshow-bg]");return!n.length&&!o.length})).liquidCustomAnimations(),a("[data-lqd-flickity]",t).liquidCarousel(),a("[data-parallax]",t).liquidParallax(),a("[data-hover3d=true]",t).liquidHover3d()}))}})}}))}(jQuery);