/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - ACTIONS
 * @version: 2.1.0 (22.11.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/

! function($) {
    "use strict";

    function getScrollRoot() {
        var e, t = document.documentElement,
            o = document.body,
            a = (void 0 !== window.pageYOffset ? window.pageYOffset : null) || o.scrollTop || t.scrollTop;
        return t.scrollTop = o.scrollTop = a + (a > 0) ? -1 : 1, e = t.scrollTop !== a ? t : o, e.scrollTop = a, e
    }
    var _R = jQuery.fn.revolution,
        _ISM = _R.is_mobile(),
        extension = {
            alias: "Actions Min JS",
            name: "revolution.extensions.actions.min.js",
            min_core: "5.4.5",
            version: "2.1.0"
        };
    jQuery.extend(!0, _R, {
        checkActions: function(e, t, o) {
            if ("stop" === _R.compare_version(extension).check) return !1;
            checkActions_intern(e, t, o)
        }
    });
    var checkActions_intern = function(e, t, o) {
            o && jQuery.each(o, function(o, a) {
                a.delay = parseInt(a.delay, 0) / 1e3, e.addClass("tp-withaction"), t.fullscreen_esclistener || "exitfullscreen" != a.action && "togglefullscreen" != a.action || (jQuery(document).keyup(function(t) {
                    27 == t.keyCode && jQuery("#rs-go-fullscreen").length > 0 && e.trigger(a.event)
                }), t.fullscreen_esclistener = !0);
                var r = "backgroundvideo" == a.layer ? jQuery(".rs-background-video-layer") : "firstvideo" == a.layer ? jQuery(".tp-revslider-slidesli").find(".tp-videolayer") : jQuery("#" + a.layer);
                switch (-1 != jQuery.inArray(a.action, ["toggleslider", "toggle_mute_video", "toggle_global_mute_video", "togglefullscreen"]) && e.data("togglelisteners", !0), a.action) {
                    case "togglevideo":
                        jQuery.each(r, function(t, o) {
                            var a = (o = jQuery(o)).data("videotoggledby");
                            void 0 == a && (a = new Array), a.push(e), o.data("videotoggledby", a)
                        });
                        break;
                    case "togglelayer":
                        jQuery.each(r, function(t, o) {
                            var r = (o = jQuery(o)).data("layertoggledby");
                            void 0 == r && (r = new Array), r.push(e), o.data("layertoggledby", r), o.data("triggered_startstatus", a.layerstatus)
                        });
                        break;
                    case "toggle_mute_video":
                    case "toggle_global_mute_video":
                        jQuery.each(r, function(t, o) {
                            var a = (o = jQuery(o)).data("videomutetoggledby");
                            void 0 == a && (a = new Array), a.push(e), o.data("videomutetoggledby", a)
                        });
                        break;
                    case "toggleslider":
                        void 0 == t.slidertoggledby && (t.slidertoggledby = new Array), t.slidertoggledby.push(e);
                        break;
                    case "togglefullscreen":
                        void 0 == t.fullscreentoggledby && (t.fullscreentoggledby = new Array), t.fullscreentoggledby.push(e)
                }
                switch (e.on(a.event, function() {
                    if ("click" === a.event && e.hasClass("tp-temporarydisabled")) return !1;
                    var o = "backgroundvideo" == a.layer ? jQuery(".active-revslide .slotholder .rs-background-video-layer") : "firstvideo" == a.layer ? jQuery(".active-revslide .tp-videolayer").first() : jQuery("#" + a.layer);
                    if ("stoplayer" == a.action || "togglelayer" == a.action || "startlayer" == a.action) {
                        if (o.length > 0) {
                            var r = o.data();
                            void 0 !== r.clicked_time_stamp && (new Date).getTime() - r.clicked_time_stamp > 150 && (clearTimeout(r.triggerdelayIn), clearTimeout(r.triggerdelayOut)), r.clicked_time_stamp = (new Date).getTime(), "startlayer" == a.action || "togglelayer" == a.action && "in" != o.data("animdirection") ? (r.animdirection = "in", r.triggerstate = "on", _R.toggleState(r.layertoggledby), _R.playAnimationFrame && (clearTimeout(r.triggerdelayIn), r.triggerdelayIn = setTimeout(function() {
                                _R.playAnimationFrame({
                                    caption: o,
                                    opt: t,
                                    frame: "frame_0",
                                    triggerdirection: "in",
                                    triggerframein: "frame_0",
                                    triggerframeout: "frame_999"
                                })
                            }, 1e3 * a.delay))) : ("stoplayer" == a.action || "togglelayer" == a.action && "out" != o.data("animdirection")) && (r.animdirection = "out", r.triggered = !0, r.triggerstate = "off", _R.stopVideo && _R.stopVideo(o, t), _R.unToggleState(r.layertoggledby), _R.endMoveCaption && (clearTimeout(r.triggerdelayOut), r.triggerdelayOut = setTimeout(function() {
                                _R.playAnimationFrame({
                                    caption: o,
                                    opt: t,
                                    frame: "frame_999",
                                    triggerdirection: "out",
                                    triggerframein: "frame_0",
                                    triggerframeout: "frame_999"
                                })
                            }, 1e3 * a.delay)))
                        }
                    } else !_ISM || "playvideo" != a.action && "stopvideo" != a.action && "togglevideo" != a.action && "mutevideo" != a.action && "unmutevideo" != a.action && "toggle_mute_video" != a.action && "toggle_global_mute_video" != a.action ? (a.delay = "NaN" === a.delay || NaN === a.delay ? 0 : a.delay, _R.isSafari11() ? actionSwitches(o, t, a, e) : punchgs.TweenLite.delayedCall(a.delay, function() {
                        actionSwitches(o, t, a, e)
                    }, [o, t, a, e])) : actionSwitches(o, t, a, e)
                }), a.action) {
                    case "togglelayer":
                    case "startlayer":
                    case "playlayer":
                    case "stoplayer":
                        var l = (r = jQuery("#" + a.layer)).data();
                        r.length > 0 && void 0 !== l && (void 0 !== l.frames && "bytrigger" != l.frames[0].delay || void 0 === l.frames && "bytrigger" !== l.start) && (l.triggerstate = "on")
                }
            })
        },
        actionSwitches = function(tnc, opt, a, _nc) {
            switch (a.action) {
                case "scrollbelow":
                    a.speed = void 0 !== a.speed ? a.speed : 400, a.ease = void 0 !== a.ease ? a.ease : punchgs.Power2.easeOut, _nc.addClass("tp-scrollbelowslider"), _nc.data("scrolloffset", a.offset), _nc.data("scrolldelay", a.delay), _nc.data("scrollspeed", a.speed), _nc.data("scrollease", a.ease);
                    var off = getOffContH(opt.fullScreenOffsetContainer) || 0,
                        aof = parseInt(a.offset, 0) || 0;
                    off = off - aof || 0, opt.scrollRoot = jQuery(document);
                    var sobj = {
                        _y: opt.scrollRoot.scrollTop()
                    };
                    punchgs.TweenLite.to(sobj, a.speed / 1e3, {
                        _y: opt.c.offset().top + jQuery(opt.li[0]).height() - off,
                        ease: a.ease,
                        onUpdate: function() {
                            opt.scrollRoot.scrollTop(sobj._y)
                        }
                    });
                    break;
                case "callback":
                    eval(a.callback);
                    break;
                case "jumptoslide":
                    switch (a.slide.toLowerCase()) {
                        case "+1":
                        case "next":
                            opt.sc_indicator = "arrow", _R.callingNewSlide(opt.c, 1);
                            break;
                        case "previous":
                        case "prev":
                        case "-1":
                            opt.sc_indicator = "arrow", _R.callingNewSlide(opt.c, -1);
                            break;
                        default:
                            var ts = jQuery.isNumeric(a.slide) ? parseInt(a.slide, 0) : a.slide;
                            _R.callingNewSlide(opt.c, ts)
                    }
                    break;
                case "simplelink":
                    window.open(a.url, a.target);
                    break;
                case "toggleslider":
                    opt.noloopanymore = 0, "playing" == opt.sliderstatus ? (opt.c.revpause(), opt.forcepause_viatoggle = !0, _R.unToggleState(opt.slidertoggledby)) : (opt.forcepause_viatoggle = !1, opt.c.revresume(), _R.toggleState(opt.slidertoggledby));
                    break;
                case "pauseslider":
                    opt.c.revpause(), _R.unToggleState(opt.slidertoggledby);
                    break;
                case "playslider":
                    opt.noloopanymore = 0, opt.c.revresume(), _R.toggleState(opt.slidertoggledby);
                    break;
                case "playvideo":
                    tnc.length > 0 && _R.playVideo(tnc, opt);
                    break;
                case "stopvideo":
                    tnc.length > 0 && _R.stopVideo && _R.stopVideo(tnc, opt);
                    break;
                case "togglevideo":
                    tnc.length > 0 && (_R.isVideoPlaying(tnc, opt) ? _R.stopVideo && _R.stopVideo(tnc, opt) : _R.playVideo(tnc, opt));
                    break;
                case "mutevideo":
                    tnc.length > 0 && _R.muteVideo(tnc, opt);
                    break;
                case "unmutevideo":
                    tnc.length > 0 && _R.unMuteVideo && _R.unMuteVideo(tnc, opt);
                    break;
                case "toggle_mute_video":
                    tnc.length > 0 && (_R.isVideoMuted(tnc, opt) ? _R.unMuteVideo(tnc, opt) : _R.muteVideo && _R.muteVideo(tnc, opt)), _nc.toggleClass("rs-toggle-content-active");
                    break;
                case "toggle_global_mute_video":
                    !0 === opt.globalmute ? (opt.globalmute = !1, void 0 != opt.playingvideos && opt.playingvideos.length > 0 && jQuery.each(opt.playingvideos, function(e, t) {
                        _R.unMuteVideo && _R.unMuteVideo(t, opt)
                    })) : (opt.globalmute = !0, void 0 != opt.playingvideos && opt.playingvideos.length > 0 && jQuery.each(opt.playingvideos, function(e, t) {
                        _R.muteVideo && _R.muteVideo(t, opt)
                    })), _nc.toggleClass("rs-toggle-content-active");
                    break;
                case "simulateclick":
                    tnc.length > 0 && tnc.click();
                    break;
                case "toggleclass":
                    tnc.length > 0 && (tnc.hasClass(a.classname) ? tnc.removeClass(a.classname) : tnc.addClass(a.classname));
                    break;
                case "gofullscreen":
                case "exitfullscreen":
                case "togglefullscreen":
                    if (jQuery(".rs-go-fullscreen").length > 0 && ("togglefullscreen" == a.action || "exitfullscreen" == a.action)) {
                        jQuery(".rs-go-fullscreen").removeClass("rs-go-fullscreen");
                        var gf = opt.c.closest(".forcefullwidth_wrapper_tp_banner").length > 0 ? opt.c.closest(".forcefullwidth_wrapper_tp_banner") : opt.c.closest(".rev_slider_wrapper");
                        opt.minHeight = opt.oldminheight, opt.infullscreenmode = !1, opt.c.revredraw(), jQuery(window).trigger("resize"), _R.unToggleState(opt.fullscreentoggledby)
                    } else if (0 == jQuery(".rs-go-fullscreen").length && ("togglefullscreen" == a.action || "gofullscreen" == a.action)) {
                        var gf = opt.c.closest(".forcefullwidth_wrapper_tp_banner").length > 0 ? opt.c.closest(".forcefullwidth_wrapper_tp_banner") : opt.c.closest(".rev_slider_wrapper");
                        gf.addClass("rs-go-fullscreen"), opt.oldminheight = opt.minHeight, opt.minHeight = jQuery(window).height(), opt.infullscreenmode = !0, opt.c.revredraw(), jQuery(window).trigger("resize"), _R.toggleState(opt.fullscreentoggledby)
                    }
                    break;
                default:
                    var obj = {};
                    obj.event = a, obj.layer = _nc, opt.c.trigger("layeraction", [obj])
            }
        },
        getOffContH = function(e) {
            if (void 0 == e) return 0;
            if (e.split(",").length > 1) {
                var t = e.split(","),
                    o = 0;
                return t && jQuery.each(t, function(e, t) {
                    jQuery(t).length > 0 && (o += jQuery(t).outerHeight(!0))
                }), o
            }
            return jQuery(e).height()
        }
}(jQuery);









/********************************************
 * REVOLUTION 5.4 EXTENSION - CAROUSEL
 * @version: 1.2.1 (18.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
! function(a) {
    "use strict";
    var b = jQuery.fn.revolution,
        c = {
            alias: "Carousel Min JS",
            name: "revolution.extensions.carousel.min.js",
            min_core: "5.3.0",
            version: "1.2.1"
        };
    jQuery.extend(!0, b, {
        prepareCarousel: function(a, d, h, i) {
            return "stop" !== b.compare_version(c).check && (h = a.carousel.lastdirection = f(h, a.carousel.lastdirection), e(a), a.carousel.slide_offset_target = j(a), void(void 0 !== i ? g(a, h, !1, 0) : void 0 == d ? b.carouselToEvalPosition(a, h) : g(a, h, !1)))
        },
        carouselToEvalPosition: function(a, c) {
            var d = a.carousel;
            c = d.lastdirection = f(c, d.lastdirection);
            var e = "center" === d.horizontal_align ? (d.wrapwidth / 2 - d.slide_width / 2 - d.slide_globaloffset) / d.slide_width : (0 - d.slide_globaloffset) / d.slide_width,
                h = b.simp(e, a.slideamount, !1),
                i = h - Math.floor(h),
                j = 0,
                k = -1 * (Math.ceil(h) - h),
                l = -1 * (Math.floor(h) - h);
            j = i >= .3 && "left" === c || i >= .7 && "right" === c ? k : i < .3 && "left" === c || i < .7 && "right" === c ? l : j, j = "off" === d.infinity ? h < 0 ? h : e > a.slideamount - 1 ? e - (a.slideamount - 1) : j : j, d.slide_offset_target = j * d.slide_width, 0 !== Math.abs(d.slide_offset_target) ? g(a, c, !0) : b.organiseCarousel(a, c)
        },
        organiseCarousel: function(a, b, c, d) {
            b = void 0 === b || "down" == b || "up" == b || null === b || jQuery.isEmptyObject(b) ? "left" : b;
            for (var e = a.carousel, f = new Array, g = e.slides.length, i = ("right" === e.horizontal_align ? a.width : 0, 0); i < g; i++) {
                var j = i * e.slide_width + e.slide_offset;
                "on" === e.infinity && (j = j > e.wrapwidth - e.inneroffset && "right" == b ? e.slide_offset - (e.slides.length - i) * e.slide_width : j, j = j < 0 - e.inneroffset - e.slide_width && "left" == b ? j + e.maxwidth : j), f[i] = j
            }
            var k = 999;
            e.slides && jQuery.each(e.slides, function(d, h) {
                var i = f[d];
                "on" === e.infinity && (i = i > e.wrapwidth - e.inneroffset && "left" === b ? f[0] - (g - d) * e.slide_width : i, i = i < 0 - e.inneroffset - e.slide_width ? "left" == b ? i + e.maxwidth : "right" === b ? f[g - 1] + (d + 1) * e.slide_width : i : i);
                var j = new Object;
                j.left = i + e.inneroffset;
                var l = "center" === e.horizontal_align ? (Math.abs(e.wrapwidth / 2) - (j.left + e.slide_width / 2)) / e.slide_width : (e.inneroffset - j.left) / e.slide_width,
                    n = "center" === e.horizontal_align ? 2 : 1;
                if ((c && Math.abs(l) < k || 0 === l) && (k = Math.abs(l), e.focused = d), j.width = e.slide_width, j.x = 0, j.transformPerspective = 1200, j.transformOrigin = "50% " + e.vertical_align, "on" === e.fadeout)
                    if ("on" === e.vary_fade) j.autoAlpha = 1 - Math.abs(1 / Math.ceil(e.maxVisibleItems / n) * l);
                    else switch (e.horizontal_align) {
                        case "center":
                            j.autoAlpha = Math.abs(l) < Math.ceil(e.maxVisibleItems / n - 1) ? 1 : 1 - (Math.abs(l) - Math.floor(Math.abs(l)));
                            break;
                        case "left":
                            j.autoAlpha = l < 1 && l > 0 ? 1 - l : Math.abs(l) > e.maxVisibleItems - 1 ? 1 - (Math.abs(l) - (e.maxVisibleItems - 1)) : 1;
                            break;
                        case "right":
                            j.autoAlpha = l > -1 && l < 0 ? 1 - Math.abs(l) : l > e.maxVisibleItems - 1 ? 1 - (Math.abs(l) - (e.maxVisibleItems - 1)) : 1
                    } else j.autoAlpha = Math.abs(l) < Math.ceil(e.maxVisibleItems / n) ? 1 : 0;
                if (void 0 !== e.minScale && e.minScale > 0)
                    if ("on" === e.vary_scale) {
                        j.scale = 1 - Math.abs(e.minScale / 100 / Math.ceil(e.maxVisibleItems / n) * l);
                        var o = (e.slide_width - e.slide_width * j.scale) * Math.abs(l)
                    } else {
                        j.scale = l >= 1 || l <= -1 ? 1 - e.minScale / 100 : (100 - e.minScale * Math.abs(l)) / 100;
                        var o = (e.slide_width - e.slide_width * (1 - e.minScale / 100)) * Math.abs(l)
                    }
                void 0 !== e.maxRotation && 0 != Math.abs(e.maxRotation) && ("on" === e.vary_rotation ? (j.rotationY = Math.abs(e.maxRotation) - Math.abs((1 - Math.abs(1 / Math.ceil(e.maxVisibleItems / n) * l)) * e.maxRotation), j.autoAlpha = Math.abs(j.rotationY) > 90 ? 0 : j.autoAlpha) : j.rotationY = l >= 1 || l <= -1 ? e.maxRotation : Math.abs(l) * e.maxRotation, j.rotationY = l < 0 ? j.rotationY * -1 : j.rotationY), j.x = -1 * e.space * l, j.left = Math.floor(j.left), j.x = Math.floor(j.x), void 0 !== j.scale ? l < 0 ? j.x - o : j.x + o : j.x, j.zIndex = Math.round(100 - Math.abs(5 * l)), j.transformStyle = "3D" != a.parallax.type && "3d" != a.parallax.type ? "flat" : "preserve-3d", punchgs.TweenLite.set(h, j)
            }), d && (a.c.find(".next-revslide").removeClass("next-revslide"), jQuery(e.slides[e.focused]).addClass("next-revslide"), a.c.trigger("revolution.nextslide.waiting"));
            e.wrapwidth / 2 - e.slide_offset, e.maxwidth + e.slide_offset - e.wrapwidth / 2
        }
    });
    var d = function(a) {
            var b = a.carousel;
            b.infbackup = b.infinity, b.maxVisiblebackup = b.maxVisibleItems, b.slide_globaloffset = "none", b.slide_offset = 0, b.wrap = a.c.find(".tp-carousel-wrapper"), b.slides = a.c.find(".tp-revslider-slidesli"), 0 !== b.maxRotation && ("3D" != a.parallax.type && "3d" != a.parallax.type ? punchgs.TweenLite.set(b.wrap, {
                perspective: 1200,
                transformStyle: "flat"
            }) : punchgs.TweenLite.set(b.wrap, {
                perspective: 1600,
                transformStyle: "preserve-3d"
            })), void 0 !== b.border_radius && parseInt(b.border_radius, 0) > 0 && punchgs.TweenLite.set(a.c.find(".tp-revslider-slidesli"), {
                borderRadius: b.border_radius
            })
        },
        e = function(a) {
            void 0 === a.bw && b.setSize(a);
            var c = a.carousel,
                e = b.getHorizontalOffset(a.c, "left"),
                f = b.getHorizontalOffset(a.c, "right");
            void 0 === c.wrap && d(a), c.slide_width = "on" !== c.stretch ? a.gridwidth[a.curWinRange] * a.bw : a.c.width(), c.maxwidth = a.slideamount * c.slide_width, c.maxVisiblebackup > c.slides.length + 1 && (c.maxVisibleItems = c.slides.length + 2), c.wrapwidth = c.maxVisibleItems * c.slide_width + (c.maxVisibleItems - 1) * c.space, c.wrapwidth = "auto" != a.sliderLayout ? c.wrapwidth > a.c.closest(".tp-simpleresponsive").width() ? a.c.closest(".tp-simpleresponsive").width() : c.wrapwidth : c.wrapwidth > a.ul.width() ? a.ul.width() : c.wrapwidth, c.infinity = c.wrapwidth >= c.maxwidth ? "off" : c.infbackup, c.wrapoffset = "center" === c.horizontal_align ? (a.c.width() - f - e - c.wrapwidth) / 2 : 0, c.wrapoffset = "auto" != a.sliderLayout && a.outernav ? 0 : c.wrapoffset < e ? e : c.wrapoffset;
            var g = "hidden";
            "3D" != a.parallax.type && "3d" != a.parallax.type || (g = "visible"), "right" === c.horizontal_align ? punchgs.TweenLite.set(c.wrap, {
                left: "auto",
                right: c.wrapoffset + "px",
                width: c.wrapwidth,
                overflow: g
            }) : punchgs.TweenLite.set(c.wrap, {
                right: "auto",
                left: c.wrapoffset + "px",
                width: c.wrapwidth,
                overflow: g
            }), c.inneroffset = "right" === c.horizontal_align ? c.wrapwidth - c.slide_width : 0, c.realoffset = Math.abs(c.wrap.position().left), c.windhalf = jQuery(window).width() / 2
        },
        f = function(a, b) {
            return null === a || jQuery.isEmptyObject(a) ? b : void 0 === a ? "right" : a
        },
        g = function(a, c, d, e) {
            var g = a.carousel;
            c = g.lastdirection = f(c, g.lastdirection);
            var h = new Object,
                i = d ? punchgs.Power2.easeOut : g.easing;
            h.from = 0, h.to = g.slide_offset_target, e = void 0 === e ? g.speed / 1e3 : e, e = d ? .4 : e, void 0 !== g.positionanim && g.positionanim.pause(), g.positionanim = punchgs.TweenLite.to(h, e, {
                from: h.to,
                onUpdate: function() {
                    g.slide_offset = g.slide_globaloffset + h.from, g.slide_offset = b.simp(g.slide_offset, g.maxwidth), b.organiseCarousel(a, c, !1, !1)
                },
                onComplete: function() {
                    g.slide_globaloffset = "off" === g.infinity ? g.slide_globaloffset + g.slide_offset_target : b.simp(g.slide_globaloffset + g.slide_offset_target, g.maxwidth), g.slide_offset = b.simp(g.slide_offset, g.maxwidth), b.organiseCarousel(a, c, !1, !0);
                    var e = jQuery(a.li[g.focused]);
                    a.c.find(".next-revslide").removeClass("next-revslide"), d && b.callingNewSlide(a.c, e.data("index"))
                },
                ease: i
            })
        },
        h = function(a, b) {
            return Math.abs(a) > Math.abs(b) ? a > 0 ? a - Math.abs(Math.floor(a / b) * b) : a + Math.abs(Math.floor(a / b) * b) : a
        },
        i = function(a, b, c) {
            var c, c, d = b - a,
                e = b - c - a;
            return d = h(d, c), e = h(e, c), Math.abs(d) > Math.abs(e) ? e : d
        },
        j = function(a) {
            var c = 0,
                d = a.carousel;
            if (void 0 !== d.positionanim && d.positionanim.kill(), "none" == d.slide_globaloffset) d.slide_globaloffset = c = "center" === d.horizontal_align ? d.wrapwidth / 2 - d.slide_width / 2 : 0;
            else {
                d.slide_globaloffset = d.slide_offset, d.slide_offset = 0;
                var e = a.c.find(".processing-revslide").index(),
                    f = "center" === d.horizontal_align ? (d.wrapwidth / 2 - d.slide_width / 2 - d.slide_globaloffset) / d.slide_width : (0 - d.slide_globaloffset) / d.slide_width;
                f = b.simp(f, a.slideamount, !1), e = e >= 0 ? e : a.c.find(".active-revslide").index(), e = e >= 0 ? e : 0, c = "off" === d.infinity ? f - e : -i(f, e, a.slideamount), c *= d.slide_width
            }
            return c
        }
}(jQuery);









/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - KEN BURN
 * @version: 1.3.1 (15.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
! function(a) {
    "use strict";
    var b = jQuery.fn.revolution,
        c = {
            alias: "KenBurns Min JS",
            name: "revolution.extensions.kenburn.min.js",
            min_core: "5.4",
            version: "1.3.1"
        };
    jQuery.extend(!0, b, {
        stopKenBurn: function(a) {
            if ("stop" === b.compare_version(c).check) return !1;
            void 0 != a.data("kbtl") && a.data("kbtl").pause()
        },
        startKenBurn: function(a, d, e) {
            if ("stop" === b.compare_version(c).check) return !1;
            var f = a.data(),
                g = a.find(".defaultimg"),
                h = g.data("lazyload") || g.data("src"),
                j = (f.owidth, f.oheight, "carousel" === d.sliderType ? d.carousel.slide_width : d.ul.width()),
                k = d.ul.height();
            if (a.data("kbtl") && a.data("kbtl").kill(), e = e || 0, 0 == a.find(".tp-kbimg").length) {
                var m = g.data("mediafilter");
                m = void 0 === m ? "" : m, a.append('<div class="tp-kbimg-wrap ' + m + '" style="z-index:2;width:100%;height:100%;top:0px;left:0px;position:absolute;"><img class="tp-kbimg" src="' + h + '" style="position:absolute;" width="' + f.owidth + '" height="' + f.oheight + '"></div>'), a.data("kenburn", a.find(".tp-kbimg"))
            }
            var n = function(a, b, c, d, e, f, g) {
                    var h = a * c,
                        i = b * c,
                        j = Math.abs(d - h),
                        k = Math.abs(e - i),
                        l = new Object;
                    return l.l = (0 - f) * j, l.r = l.l + h, l.t = (0 - g) * k, l.b = l.t + i, l.h = f, l.v = g, l
                },
                o = function(a, b, c, d, e) {
                    var f = a.bgposition.split(" ") || "center center",
                        g = "center" == f[0] ? "50%" : "left" == f[0] || "left" == f[1] ? "0%" : "right" == f[0] || "right" == f[1] ? "100%" : f[0],
                        h = "center" == f[1] ? "50%" : "top" == f[0] || "top" == f[1] ? "0%" : "bottom" == f[0] || "bottom" == f[1] ? "100%" : f[1];
                    g = parseInt(g, 0) / 100 || 0, h = parseInt(h, 0) / 100 || 0;
                    var i = new Object;
                    return i.start = n(e.start.width, e.start.height, e.start.scale, b, c, g, h), i.end = n(e.start.width, e.start.height, e.end.scale, b, c, g, h), i
                },
                p = function(a, b, c) {
                    var d = c.scalestart / 100,
                        e = c.scaleend / 100,
                        f = void 0 != c.offsetstart ? c.offsetstart.split(" ") || [0, 0] : [0, 0],
                        g = void 0 != c.offsetend ? c.offsetend.split(" ") || [0, 0] : [0, 0];
                    c.bgposition = "center center" == c.bgposition ? "50% 50%" : c.bgposition;
                    var h = new Object,
                        i = a * d,
                        k = (c.owidth, c.oheight, a * e);
                    c.owidth, c.oheight;
                    if (h.start = new Object, h.starto = new Object, h.end = new Object, h.endo = new Object, h.start.width = a, h.start.height = h.start.width / c.owidth * c.oheight, h.start.height < b) {
                        var m = b / h.start.height;
                        h.start.height = b, h.start.width = h.start.width * m
                    }
                    h.start.transformOrigin = c.bgposition, h.start.scale = d, h.end.scale = e, c.rotatestart = 0 === c.rotatestart ? .01 : c.rotatestart, h.start.rotation = c.rotatestart + "deg", h.end.rotation = c.rotateend + "deg";
                    var n = o(c, a, b, f, h);
                    f[0] = parseFloat(f[0]) + n.start.l, g[0] = parseFloat(g[0]) + n.end.l, f[1] = parseFloat(f[1]) + n.start.t, g[1] = parseFloat(g[1]) + n.end.t;
                    var p = n.start.r - n.start.l,
                        q = n.start.b - n.start.t,
                        r = n.end.r - n.end.l,
                        s = n.end.b - n.end.t;
                    return f[0] = f[0] > 0 ? 0 : p + f[0] < a ? a - p : f[0], g[0] = g[0] > 0 ? 0 : r + g[0] < a ? a - r : g[0], f[1] = f[1] > 0 ? 0 : q + f[1] < b ? b - q : f[1], g[1] = g[1] > 0 ? 0 : s + g[1] < b ? b - s : g[1], h.starto.x = f[0] + "px", h.starto.y = f[1] + "px", h.endo.x = g[0] + "px", h.endo.y = g[1] + "px", h.end.ease = h.endo.ease = c.ease, h.end.force3D = h.endo.force3D = !0, h
                };
            void 0 != a.data("kbtl") && (a.data("kbtl").kill(), a.removeData("kbtl"));
            var q = a.data("kenburn"),
                r = q.parent(),
                s = p(j, k, f),
                t = new punchgs.TimelineLite;
            if (t.pause(), s.start.transformOrigin = "0% 0%", s.starto.transformOrigin = "0% 0%", t.add(punchgs.TweenLite.fromTo(q, f.duration / 1e3, s.start, s.end), 0), t.add(punchgs.TweenLite.fromTo(r, f.duration / 1e3, s.starto, s.endo), 0), void 0 !== f.blurstart && void 0 !== f.blurend && (0 !== f.blurstart || 0 !== f.blurend)) {
                var u = {
                        a: f.blurstart
                    },
                    v = {
                        a: f.blurend,
                        ease: s.endo.ease
                    },
                    w = new punchgs.TweenLite(u, f.duration / 1e3, v);
                w.eventCallback("onUpdate", function(a) {
                    punchgs.TweenLite.set(a, {
                        filter: "blur(" + u.a + "px)",
                        webkitFilter: "blur(" + u.a + "px)"
                    })
                }, [r]), t.add(w, 0)
            }
            t.progress(e), t.play(), a.data("kbtl", t)
        }
    })
}(jQuery);









/************************************************
 * REVOLUTION 5.4.6.4 EXTENSION - LAYER ANIMATION
 * @version: 3.6.5 (08.03.2018)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 ************************************************/
! function(e) {
    "use strict";
    var t = jQuery.fn.revolution,
        i = (t.is_mobile(), t.is_android(), {
            alias: "LayerAnimation Min JS",
            name: "revolution.extensions.layeranimation.min.js",
            min_core: "5.4.6.4",
            version: "3.6.5"
        });
    jQuery.extend(!0, t, {
        updateMarkup: function(e, t) {
            var i = jQuery(e).data();
            if (void 0 !== i.start && !i.frames_added && void 0 === i.frames) {
                var a = new Array,
                    n = h(l(), i.transform_in, void 0, !1),
                    r = h(l(), i.transform_out, void 0, !1),
                    o = h(l(), i.transform_hover, void 0, !1);
                jQuery.isNumeric(i.end) && jQuery.isNumeric(i.start) && jQuery.isNumeric(n.speed) && (i.end = parseInt(i.end, 0) - (parseInt(i.start, 0) + parseFloat(n.speed, 0))), a.push({
                    frame: "0",
                    delay: i.start,
                    from: i.transform_in,
                    to: i.transform_idle,
                    split: i.splitin,
                    speed: n.speed,
                    ease: n.anim.ease,
                    mask: i.mask_in,
                    splitdelay: i.elementdelay
                }), a.push({
                    frame: "5",
                    delay: i.end,
                    to: i.transform_out,
                    split: i.splitout,
                    speed: r.speed,
                    ease: r.anim.ease,
                    mask: i.mask_out,
                    splitdelay: i.elementdelay
                }), i.transform_hover && a.push({
                    frame: "hover",
                    to: i.transform_hover,
                    style: i.style_hover,
                    speed: o.speed,
                    ease: o.anim.ease,
                    splitdelay: i.elementdelay
                }), i.frames = a
            }
            if (!i.frames_added) {
                if (i.inframeindex = 0, i.outframeindex = -1, i.hoverframeindex = -1, void 0 !== i.frames)
                    for (var s = 0; s < i.frames.length; s++) void 0 !== i.frames[s].sfx_effect && i.frames[s].sfx_effect.indexOf("block") >= 0 && (0 === s ? (i.frames[s].from = "o:0", i.frames[s].to = "o:1") : i.frames[s].to = "o:0", i._sfx = "block"), void 0 === i.frames[0].from && (i.frames[0].from = "o:inherit"), 0 === i.frames[0].delay && (i.frames[0].delay = 20), "hover" === i.frames[s].frame ? i.hoverframeindex = s : "frame_999" !== i.frames[s].frame && "frame_out" !== i.frames[s].frame && "last" !== i.frames[s].frame && "end" !== i.frames[s].frame || (i.outframeindex = s), void 0 !== i.frames[s].split && i.frames[s].split.match(/chars|words|lines/g) && (i.splittext = !0);
                i.outframeindex = -1 === i.outframeindex ? -1 === i.hoverframeindex ? i.frames.length - 1 : i.frames.length - 2 : i.outframeindex, i.frames_added = !0
            }
        },
        animcompleted: function(e, i) {
            var a = e.data(),
                n = a.videotype,
                r = a.autoplay,
                o = a.autoplayonlyfirsttime;
            null != n && "none" != n && (1 == r || "true" == r || "on" == r || "1sttime" == r || o ? (("carousel" !== i.sliderType || "carousel" === i.sliderType && "on" === i.carousel.showLayersAllTime && e.closest("li").hasClass("active-revslide") || "carousel" === i.sliderType && "on" !== i.carousel.showLayersAllTime && e.closest("li").hasClass("active-revslide")) && t.playVideo(e, i), t.toggleState(e.data("videotoggledby")), (o || "1sttime" == r) && (a.autoplayonlyfirsttime = !1, a.autoplay = "off")) : ("no1sttime" == r && (a.datasetautoplay = "on"), t.unToggleState(e.data("videotoggledby"))))
        },
        handleStaticLayers: function(e, t) {
            var i = parseInt(e.data("startslide"), 0),
                a = parseInt(e.data("endslide"), 0);
            i < 0 && (i = 0), a < 0 && (a = t.realslideamount), 0 === i && a === t.realslideamount - 1 && (a = t.realslideamount + 1), e.data("startslide", i), e.data("endslide", a)
        },
        animateTheCaptions: function(e) {
            if ("stop" === t.compare_version(i).check) return !1;
            var a = e.opt,
                n = e.slide,
                r = e.recall,
                o = e.maintimeline,
                s = e.preset,
                d = e.startslideanimat,
                l = "carousel" === a.sliderType ? 0 : a.width / 2 - a.gridwidth[a.curWinRange] * a.bw / 2,
                m = n.data("index");
            if (a.layers = a.layers || new Object, a.layers[m] = a.layers[m] || n.find(".tp-caption"), a.layers.static = a.layers.static || a.c.find(".tp-static-layers").find(".tp-caption"), void 0 === a.timelines && t.createTimelineStructure(a), a.conh = a.c.height(), a.conw = a.c.width(), a.ulw = a.ul.width(), a.ulh = a.ul.height(), a.debugMode) {
                n.addClass("indebugmode"), n.find(".helpgrid").remove(), a.c.find(".hglayerinfo").remove(), n.append('<div class="helpgrid" style="width:' + a.gridwidth[a.curWinRange] * a.bw + "px;height:" + a.gridheight[a.curWinRange] * a.bw + 'px;"></div>');
                var c = n.find(".helpgrid");
                c.append('<div class="hginfo">Zoom:' + Math.round(100 * a.bw) + "% &nbsp;&nbsp;&nbsp; Device Level:" + a.curWinRange + "&nbsp;&nbsp;&nbsp; Grid Preset:" + a.gridwidth[a.curWinRange] + "x" + a.gridheight[a.curWinRange] + "</div>"), a.c.append('<div class="hglayerinfo"></div>'), c.append('<div class="tlhg"></div>')
            }
            void 0 !== m && a.layers[m] && jQuery.each(a.layers[m], function(e, i) {
                var n = jQuery(this);
                t.updateMarkup(this, a), t.prepareSingleCaption({
                    caption: n,
                    opt: a,
                    offsetx: l,
                    offsety: 0,
                    index: e,
                    recall: r,
                    preset: s
                }), s && 0 !== d || t.buildFullTimeLine({
                    caption: n,
                    opt: a,
                    offsetx: l,
                    offsety: 0,
                    index: e,
                    recall: r,
                    preset: s,
                    regenerate: 0 === d
                }), r && "carousel" === a.sliderType && "on" === a.carousel.showLayersAllTime && t.animcompleted(n, a)
            }), a.layers.static && jQuery.each(a.layers.static, function(e, i) {
                var n = jQuery(this),
                    o = n.data();
                !0 !== o.hoveredstatus && !0 !== o.inhoveroutanimation ? (t.updateMarkup(this, a), t.prepareSingleCaption({
                    caption: n,
                    opt: a,
                    offsetx: l,
                    offsety: 0,
                    index: e,
                    recall: r,
                    preset: s
                }), s && 0 !== d || !0 === o.veryfirstststic || (t.buildFullTimeLine({
                    caption: n,
                    opt: a,
                    offsetx: l,
                    offsety: 0,
                    index: e,
                    recall: r,
                    preset: s,
                    regenerate: 0 === d
                }), o.veryfirstststic = !0), r && "carousel" === a.sliderType && "on" === a.carousel.showLayersAllTime && t.animcompleted(n, a)) : t.prepareSingleCaption({
                    caption: n,
                    opt: a,
                    offsetx: l,
                    offsety: 0,
                    index: e,
                    recall: r,
                    preset: s
                })
            });
            var p = -1 === a.nextSlide || void 0 === a.nextSlide ? 0 : a.nextSlide;
            void 0 !== a.rowzones && (p = p > a.rowzones.length ? a.rowzones.length : p), null != a.rowzones && a.rowzones.length > 0 && null != a.rowzones[p] && p >= 0 && p <= a.rowzones.length && a.rowzones[p].length > 0 && t.setSize(a), s || void 0 !== d && (void 0 !== m && jQuery.each(a.timelines[m].layers, function(e, i) {
                var n = i.layer.data();
                "none" !== i.wrapper && void 0 !== i.wrapper || ("keep" == i.triggerstate && "on" === n.triggerstate ? t.playAnimationFrame({
                    caption: i.layer,
                    opt: a,
                    frame: "frame_0",
                    triggerdirection: "in",
                    triggerframein: "frame_0",
                    triggerframeout: "frame_999"
                }) : i.timeline.restart())
            }), a.timelines.staticlayers && jQuery.each(a.timelines.staticlayers.layers, function(e, i) {
                var n = i.layer.data(),
                    r = p >= i.firstslide && p <= i.lastslide,
                    o = p < i.firstslide || p > i.lastslide,
                    s = i.timeline.getLabelTime("slide_" + i.firstslide),
                    d = i.timeline.getLabelTime("slide_" + i.lastslide),
                    l = n.static_layer_timeline_time,
                    m = "in" === n.animdirection || "out" !== n.animdirection && void 0,
                    c = "bytrigger" === n.frames[0].delay,
                    g = (n.frames[n.frames.length - 1].delay, n.triggered_startstatus),
                    u = n.lasttriggerstate;
                !0 !== n.hoveredstatus && 1 != n.inhoveroutanimation && (void 0 !== l && m && ("keep" == u ? (t.playAnimationFrame({
                    caption: i.layer,
                    opt: a,
                    frame: "frame_0",
                    triggerdirection: "in",
                    triggerframein: "frame_0",
                    triggerframeout: "frame_999"
                }), n.triggeredtimeline.time(l)) : !0 !== n.hoveredstatus && i.timeline.time(l)), "reset" === u && "hidden" === g && (i.timeline.time(0), n.animdirection = "out"), r ? m ? p === i.lastslide && (i.timeline.play(d), n.animdirection = "in") : (c || "in" === n.animdirection || i.timeline.play(s), ("visible" == g && "keep" !== u || "keep" === u && !0 === m || "visible" == g && void 0 === m) && (i.timeline.play(s + .01), n.animdirection = "in")) : o && m && i.timeline.play("frame_999"))
            })), null != o && setTimeout(function() {
                o.resume()
            }, 30)
        },
        prepareSingleCaption: function(e) {
            var i = e.caption,
                a = i.data(),
                n = e.opt,
                r = e.recall,
                o = e.recall,
                s = (e.preset, jQuery("body").hasClass("rtl"));
            if (a._pw = void 0 === a._pw ? i.closest(".tp-parallax-wrap") : a._pw, a._lw = void 0 === a._lw ? i.closest(".tp-loop-wrap") : a._lw, a._mw = void 0 === a._mw ? i.closest(".tp-mask-wrap") : a._mw, a._responsive = a.responsive || "on", a._respoffset = a.responsive_offset || "on", a._ba = a.basealign || "grid", a._gw = "grid" === a._ba ? n.width : n.ulw, a._gh = "grid" === a._ba ? n.height : n.ulh, a._lig = void 0 === a._lig ? i.hasClass("rev_layer_in_group") ? i.closest(".rev_group") : i.hasClass("rev_layer_in_column") ? i.closest(".rev_column_inner") : i.hasClass("rev_column_inner") ? i.closest(".rev_row") : "none" : a._lig, a._column = void 0 === a._column ? i.hasClass("rev_column_inner") ? i.closest(".rev_column") : "none" : a._column, a._row = void 0 === a._row ? i.hasClass("rev_column_inner") ? i.closest(".rev_row") : "none" : a._row, a._ingroup = void 0 === a._ingroup ? !(i.hasClass("rev_group") || !i.closest(".rev_group")) : a._ingroup, a._isgroup = void 0 === a._isgroup ? !!i.hasClass("rev_group") : a._isgroup, a._nctype = a.type || "none", a._cbgc_auto = void 0 === a._cbgc_auto ? "column" === a._nctype && a._pw.find(".rev_column_bg_auto_sized") : a._cbgc_auto, a._cbgc_man = void 0 === a._cbgc_man ? "column" === a._nctype && a._pw.find(".rev_column_bg_man_sized") : a._cbgc_man, a._slideid = a._slideid || i.closest(".tp-revslider-slidesli").data("index"), a._id = void 0 === a._id ? i.data("id") || i.attr("id") : a._id, a._slidelink = void 0 === a._slidelink ? void 0 !== i.hasClass("slidelink") && i.hasClass("slidelink") : a._slidelink, void 0 === a._li && (i.hasClass("tp-static-layer") ? (a._isstatic = !0, a._li = i.closest(".tp-static-layers"), a._slideid = "staticlayers") : a._li = i.closest(".tp-revslider-slidesli")), a._row = void 0 === a._row ? "column" === a._nctype && a._pw.closest(".rev_row") : a._row, void 0 === a._togglelisteners && i.find(".rs-toggled-content") ? (a._togglelisteners = !0, void 0 === a.actions && i.click(function() {
                    t.swaptoggleState(i)
                })) : a._togglelisteners = !1, "fullscreen" == n.sliderLayout && (e.offsety = a._gh / 2 - n.gridheight[n.curWinRange] * n.bh / 2), ("on" == n.autoHeight || null != n.minHeight && n.minHeight > 0) && (e.offsety = n.conh / 2 - n.gridheight[n.curWinRange] * n.bh / 2), e.offsety < 0 && (e.offsety = 0), n.debugMode) {
                i.closest("li").find(".helpgrid").css({
                    top: e.offsety + "px",
                    left: e.offsetx + "px"
                });
                var d = n.c.find(".hglayerinfo");
                i.on("hover, mouseenter", function() {
                    var e = "";
                    i.data() && jQuery.each(i.data(), function(t, i) {
                        "object" != typeof i && (e = e + '<span style="white-space:nowrap"><span style="color:#27ae60">' + t + ":</span>" + i + "</span>&nbsp; &nbsp; ")
                    }), d.html(e)
                })
            }
            if ("off" === (void 0 === a.visibility ? "oon" : _(a.visibility, n)[n.forcedWinRange] || _(a.visibility, n) || "ooon") || a._gw < n.hideCaptionAtLimit && "on" == a.captionhidden || a._gw < n.hideAllCaptionAtLimit ? a._pw.addClass("tp-hidden-caption") : a._pw.removeClass("tp-hidden-caption"), a.layertype = "html", e.offsetx < 0 && (e.offsetx = 0), null != a.thumbimage && null == a.videoposter && (a.videoposter = a.thumbimage), i.find("img").length > 0) {
                var l = i.find("img");
                a.layertype = "image", 0 == l.width() && l.css({
                    width: "auto"
                }), 0 == l.height() && l.css({
                    height: "auto"
                }), null == l.data("ww") && l.width() > 0 && l.data("ww", l.width()), null == l.data("hh") && l.height() > 0 && l.data("hh", l.height());
                var m = l.data("ww"),
                    c = l.data("hh"),
                    p = "slide" == a._ba ? n.ulw : n.gridwidth[n.curWinRange],
                    g = "slide" == a._ba ? n.ulh : n.gridheight[n.curWinRange],
                    u = "full" === (m = _(l.data("ww"), n)[n.curWinRange] || _(l.data("ww"), n) || "auto") || "full-proportional" === m,
                    f = "full" === (c = _(l.data("hh"), n)[n.curWinRange] || _(l.data("hh"), n) || "auto") || "full-proportional" === c;
                if ("full-proportional" === m) {
                    var h = l.data("owidth"),
                        v = l.data("oheight");
                    h / p < v / g ? (m = p, c = v * (p / h)) : (c = g, m = h * (g / v))
                } else m = u ? p : !jQuery.isNumeric(m) && m.indexOf("%") > 0 ? m : parseFloat(m), c = f ? g : !jQuery.isNumeric(c) && c.indexOf("%") > 0 ? c : parseFloat(c);
                m = void 0 === m ? 0 : m, c = void 0 === c ? 0 : c, "off" !== a._responsive ? ("grid" != a._ba && u ? jQuery.isNumeric(m) ? l.css({
                    width: m + "px"
                }) : l.css({
                    width: m
                }) : jQuery.isNumeric(m) ? l.css({
                    width: m * n.bw + "px"
                }) : l.css({
                    width: m
                }), "grid" != a._ba && f ? jQuery.isNumeric(c) ? l.css({
                    height: c + "px"
                }) : l.css({
                    height: c
                }) : jQuery.isNumeric(c) ? l.css({
                    height: c * n.bh + "px"
                }) : l.css({
                    height: c
                })) : l.css({
                    width: m,
                    height: c
                }), a._ingroup && "row" !== a._nctype && (void 0 !== m && !jQuery.isNumeric(m) && "string" === jQuery.type(m) && m.indexOf("%") > 0 && punchgs.TweenLite.set([a._lw, a._pw, a._mw], {
                    minWidth: m
                }), void 0 !== c && !jQuery.isNumeric(c) && "string" === jQuery.type(c) && c.indexOf("%") > 0 && punchgs.TweenLite.set([a._lw, a._pw, a._mw], {
                    minHeight: c
                }))
            }
            if ("slide" === a._ba) e.offsetx = 0, e.offsety = 0;
            else if (a._isstatic && void 0 !== n.carousel && void 0 !== n.carousel.horizontal_align && "carousel" === n.sliderType) {
                switch (n.carousel.horizontal_align) {
                    case "center":
                        e.offsetx = 0 + (n.ulw - n.gridwidth[n.curWinRange] * n.bw) / 2;
                        break;
                    case "left":
                        break;
                    case "right":
                        e.offsetx = n.ulw - n.gridwidth[n.curWinRange] * n.bw
                }
                e.offsetx = e.offsetx < 0 ? 0 : e.offsetx
            }
            var y = "html5" == a.audio ? "audio" : "video";
            if (i.hasClass("tp-videolayer") || i.hasClass("tp-audiolayer") || i.find("iframe").length > 0 || i.find(y).length > 0) {
                if (a.layertype = "video", t.manageVideoLayer && t.manageVideoLayer(i, n, r, o), !r && !o) {
                    a.videotype;
                    t.resetVideo && t.resetVideo(i, n, e.preset)
                }
                var T = a.aspectratio;
                null != T && T.split(":").length > 1 && t.prepareCoveredVideo(n, i);
                l = i.find("iframe") ? i.find("iframe") : l = i.find(y);
                var j = !i.find("iframe"),
                    L = i.hasClass("coverscreenvideo");
                l.css({
                    display: "block"
                }), null == i.data("videowidth") && (i.data("videowidth", l.width()), i.data("videoheight", l.height()));
                m = _(i.data("videowidth"), n)[n.curWinRange] || _(i.data("videowidth"), n) || "auto", c = _(i.data("videoheight"), n)[n.curWinRange] || _(i.data("videoheight"), n) || "auto";
                m = "auto" === m || !jQuery.isNumeric(m) && m.indexOf("%") > 0 ? "auto" === m ? "auto" : "grid" === a._ba ? n.gridwidth[n.curWinRange] * n.bw : a._gw : parseFloat(m) * n.bw + "px", c = "auto" === c || !jQuery.isNumeric(c) && c.indexOf("%") > 0 ? "auto" === c ? "auto" : "grid" === a._ba ? n.gridheight[n.curWinRange] * n.bw : a._gh : parseFloat(c) * n.bh + "px", a.cssobj = void 0 === a.cssobj ? w(i, 0) : a.cssobj;
                var I = x(a.cssobj, n);
                if ("auto" == I.lineHeight && (I.lineHeight = I.fontSize + 4), i.hasClass("fullscreenvideo") || L) {
                    e.offsetx = 0, e.offsety = 0, i.data("x", 0), i.data("y", 0);
                    var W = a._gh;
                    "on" == n.autoHeight && (W = n.conh), i.css({
                        width: a._gw,
                        height: W
                    })
                } else punchgs.TweenLite.set(i, {
                    paddingTop: Math.round(I.paddingTop * n.bh) + "px",
                    paddingBottom: Math.round(I.paddingBottom * n.bh) + "px",
                    paddingLeft: Math.round(I.paddingLeft * n.bw) + "px",
                    paddingRight: Math.round(I.paddingRight * n.bw) + "px",
                    marginTop: I.marginTop * n.bh + "px",
                    marginBottom: I.marginBottom * n.bh + "px",
                    marginLeft: I.marginLeft * n.bw + "px",
                    marginRight: I.marginRight * n.bw + "px",
                    borderTopWidth: Math.round(I.borderTopWidth * n.bh) + "px",
                    borderBottomWidth: Math.round(I.borderBottomWidth * n.bh) + "px",
                    borderLeftWidth: Math.round(I.borderLeftWidth * n.bw) + "px",
                    borderRightWidth: Math.round(I.borderRightWidth * n.bw) + "px",
                    width: m,
                    height: c
                });
                (0 == j && !L || 1 != a.forcecover && !i.hasClass("fullscreenvideo") && !L) && (l.width(m), l.height(c)), a._ingroup && null !== a.videowidth && void 0 !== a.videowidth && !jQuery.isNumeric(a.videowidth) && a.videowidth.indexOf("%") > 0 && punchgs.TweenLite.set([a._lw, a._pw, a._mw], {
                    minWidth: a.videowidth
                })
            }
            k(i, n, 0, a._responsive), i.hasClass("tp-resizeme") && i.find("*").each(function() {
                k(jQuery(this), n, "rekursive", a._responsive)
            });
            var R = i.outerHeight(),
                C = i.css("backgroundColor");
            b(i, ".frontcorner", "left", "borderRight", "borderTopColor", R, C), b(i, ".frontcornertop", "left", "borderRight", "borderBottomColor", R, C), b(i, ".backcorner", "right", "borderLeft", "borderBottomColor", R, C), b(i, ".backcornertop", "right", "borderLeft", "borderTopColor", R, C), "on" == n.fullScreenAlignForce && (e.offsetx = 0, e.offsety = 0), "block" === a._sfx && void 0 === a._bmask && (a._bmask = jQuery('<div class="tp-blockmask"></div>'), a._mw.append(a._bmask)), a.arrobj = new Object, a.arrobj.voa = _(a.voffset, n)[n.curWinRange] || _(a.voffset, n)[0], a.arrobj.hoa = _(a.hoffset, n)[n.curWinRange] || _(a.hoffset, n)[0], a.arrobj.elx = _(a.x, n)[n.curWinRange] || _(a.x, n)[0], a.arrobj.ely = _(a.y, n)[n.curWinRange] || _(a.y, n)[0];
            var z = 0 == a.arrobj.voa.length ? 0 : a.arrobj.voa,
                O = 0 == a.arrobj.hoa.length ? 0 : a.arrobj.hoa,
                Q = 0 == a.arrobj.elx.length ? 0 : a.arrobj.elx,
                S = 0 == a.arrobj.ely.length ? 0 : a.arrobj.ely;
            a.eow = i.outerWidth(!0), a.eoh = i.outerHeight(!0), 0 == a.eow && 0 == a.eoh && (a.eow = n.ulw, a.eoh = n.ulh);
            var M = "off" !== a._respoffset ? parseInt(z, 0) * n.bw : parseInt(z, 0),
                P = "off" !== a._respoffset ? parseInt(O, 0) * n.bw : parseInt(O, 0),
                A = "grid" === a._ba ? n.gridwidth[n.curWinRange] * n.bw : a._gw,
                B = "grid" === a._ba ? n.gridheight[n.curWinRange] * n.bw : a._gh;
            "on" == n.fullScreenAlignForce && (A = n.ulw, B = n.ulh), "none" !== a._lig && null != a._lig && (A = a._lig.width(), B = a._lig.height(), e.offsetx = 0, e.offsety = 0), Q = "center" === Q || "middle" === Q ? A / 2 - a.eow / 2 + P : "left" === Q ? P : "right" === Q ? A - a.eow - P : "off" !== a._respoffset ? Q * n.bw : Q, S = "center" == S || "middle" == S ? B / 2 - a.eoh / 2 + M : "top" == S ? M : "bottom" == S ? B - a.eoh - M : "off" !== a._respoffset ? S * n.bw : S, s && !a._slidelink && (Q += a.eow), a._slidelink && (Q = 0), a.calcx = parseInt(Q, 0) + e.offsetx, a.calcy = parseInt(S, 0) + e.offsety;
            var F = i.css("z-Index");
            if ("row" !== a._nctype && "column" !== a._nctype) punchgs.TweenLite.set(a._pw, {
                zIndex: F,
                top: a.calcy,
                left: a.calcx,
                overwrite: "auto"
            });
            else if ("row" !== a._nctype) punchgs.TweenLite.set(a._pw, {
                zIndex: F,
                width: a.columnwidth,
                top: 0,
                left: 0,
                overwrite: "auto"
            });
            else if ("row" === a._nctype) {
                var X = "grid" === a._ba ? A + "px" : "100%";
                punchgs.TweenLite.set(a._pw, {
                    zIndex: F,
                    width: X,
                    top: 0,
                    left: e.offsetx,
                    overwrite: "auto"
                })
            }
            if (void 0 !== a.blendmode && punchgs.TweenLite.set(a._pw, {
                    mixBlendMode: a.blendmode
                }), "row" === a._nctype && (a.columnbreak <= n.curWinRange ? i.addClass("rev_break_columns") : i.removeClass("rev_break_columns")), "on" == a.loopanimation && punchgs.TweenLite.set(a._lw, {
                    minWidth: a.eow,
                    minHeight: a.eoh
                }), "column" === a._nctype) {
                var Y = void 0 !== i[0]._gsTransform ? i[0]._gsTransform.y : 0,
                    H = parseInt(a._column[0].style.paddingTop, 0);
                punchgs.TweenLite.set(i, {
                    y: 0
                }), punchgs.TweenLite.set(a._cbgc_man, {
                    y: parseInt(H + a._column.offset().top - i.offset().top, 0)
                }), punchgs.TweenLite.set(i, {
                    y: Y
                })
            }
            a._ingroup && "row" !== a._nctype && (void 0 !== a._groupw && !jQuery.isNumeric(a._groupw) && a._groupw.indexOf("%") > 0 && punchgs.TweenLite.set([a._lw, a._pw, a._mw], {
                minWidth: a._groupw
            }), void 0 !== a._grouph && !jQuery.isNumeric(a._grouph) && a._grouph.indexOf("%") > 0 && punchgs.TweenLite.set([a._lw, a._pw, a._mw], {
                minHeight: a._grouph
            }))
        },
        createTimelineStructure: function(e) {
            e.timelines = e.timelines || new Object, e.c.find(".tp-revslider-slidesli, .tp-static-layers").each(function() {
                var t = jQuery(this),
                    i = t.data("index");
                e.timelines[i] = e.timelines[i] || {}, e.timelines[i].layers = e.timelines[i].layers || new Object, t.find(".tp-caption").each(function(t) {
                    var a, n, r, o, s;
                    a = jQuery(this), n = e.timelines[i].layers, r = i, s = new punchgs.TimelineLite({
                        paused: !0
                    }), (n = n || new Object)[a.attr("id")] = n[a.attr("id")] || new Object, "staticlayers" === r && (n[a.attr("id")].firstslide = a.data("startslide"), n[a.attr("id")].lastslide = a.data("endslide")), a.data("slideid", r), n[a.attr("id")].defclasses = o = a[0].className, n[a.attr("id")].wrapper = o.indexOf("rev_layer_in_column") >= 0 ? a.closest(".rev_column_inner") : o.indexOf("rev_column_inner") >= 0 ? a.closest(".rev_row") : o.indexOf("rev_layer_in_group") >= 0 ? a.closest(".rev_group") : "none", n[a.attr("id")].timeline = s, n[a.attr("id")].layer = a, n[a.attr("id")].triggerstate = a.data("lasttriggerstate"), n[a.attr("id")].dchildren = o.indexOf("rev_row") >= 0 ? a[0].getElementsByClassName("rev_column_inner") : o.indexOf("rev_column_inner") >= 0 ? a[0].getElementsByClassName("tp-caption") : o.indexOf("rev_group") >= 0 ? a[0].getElementsByClassName("rev_layer_in_group") : "none", a.data("timeline", s)
                })
            })
        },
        buildFullTimeLine: function(e) {
            var i, a, n = e.caption,
                r = n.data(),
                s = e.opt,
                d = {},
                l = g();
            if (!(i = s.timelines[r._slideid].layers[r._id]).generated || !0 === e.regenerate) {
                if (a = i.timeline, i.generated = !0, void 0 !== r.current_timeline && !0 !== e.regenerate ? (r.current_timeline_pause = r.current_timeline.paused(), r.current_timeline_time = r.current_timeline.time(), r.current_is_nc_timeline = a === r.current_timeline, r.static_layer_timeline_time = r.current_timeline_time) : (r.static_layer_timeline_time = r.current_timeline_time, r.current_timeline_time = 0, r.current_timeline && r.current_timeline.clear()), a.clear(), d.svg = null != r.svg_src && n.find("svg"), d.svg && (r.idlesvg = c(r.svg_idle, m()), punchgs.TweenLite.set(d.svg, r.idlesvg.anim)), -1 !== r.hoverframeindex && void 0 !== r.hoverframeindex && !n.hasClass("rs-hover-ready")) {
                    if (n.addClass("rs-hover-ready"), r.hovertimelines = {}, r.hoveranim = h(l, r.frames[r.hoverframeindex].to), r.hoveranim = y(r.hoveranim, r.frames[r.hoverframeindex].style), d.svg) {
                        var p = c(r.svg_hover, m());
                        null != r.hoveranim.anim.color && (p.anim.fill = r.hoveranim.anim.color, r.idlesvg.anim.css.fill = d.svg.css("fill")), r.hoversvg = p
                    }
                    n.hover(function(e) {
                        var t = {
                                caption: jQuery(e.currentTarget),
                                opt: s,
                                firstframe: "frame_0",
                                lastframe: "frame_999"
                            },
                            i = (o(t), t.caption),
                            a = i.data(),
                            n = a.frames[a.hoverframeindex];
                        a.forcehover = n.force, a.hovertimelines.item = punchgs.TweenLite.to(i, n.speed / 1e3, a.hoveranim.anim), (a.hoverzIndex || a.hoveranim.anim && a.hoveranim.anim.zIndex) && (a.basiczindex = void 0 === a.basiczindex ? a.cssobj.zIndex : a.basiczindex, a.hoverzIndex = void 0 === a.hoverzIndex ? a.hoveranim.anim.zIndex : a.hoverzIndex, a.inhoverinanimation = !0, 0 === n.speed && (a.inhoverinanimation = !1), a.hovertimelines.pwhoveranim = punchgs.TweenLite.to(a._pw, n.speed / 1e3, {
                            overwrite: "auto",
                            zIndex: a.hoverzIndex
                        }), a.hovertimelines.pwhoveranim.eventCallback("onComplete", function(e) {
                            e.inhoverinanimation = !1
                        }, [a])), d.svg && (a.hovertimelines.svghoveranim = punchgs.TweenLite.to([d.svg, d.svg.find("path")], n.speed / 1e3, a.hoversvg.anim)), a.hoveredstatus = !0
                    }, function(e) {
                        var t = {
                                caption: jQuery(e.currentTarget),
                                opt: s,
                                firstframe: "frame_0",
                                lastframe: "frame_999"
                            },
                            i = (o(t), t.caption),
                            a = i.data(),
                            n = a.frames[a.hoverframeindex];
                        a.hoveredstatus = !1, a.inhoveroutanimation = !0, a.hovertimelines.item.pause(), a.hovertimelines.item = punchgs.TweenLite.to(i, n.speed / 1e3, jQuery.extend(!0, {}, a._gsTransformTo)), 0 == n.speed && (a.inhoveroutanimation = !1), a.hovertimelines.item.eventCallback("onComplete", function(e) {
                            e.inhoveroutanimation = !1
                        }, [a]), void 0 !== a.hovertimelines.pwhoveranim && (a.hovertimelines.pwhoveranim = punchgs.TweenLite.to(a._pw, n.speed / 1e3, {
                            overwrite: "auto",
                            zIndex: a.basiczindex
                        })), d.svg && punchgs.TweenLite.to([d.svg, d.svg.find("path")], n.speed / 1e3, a.idlesvg.anim)
                    })
                }
                for (var u = 0; u < r.frames.length; u++)
                    if (u !== r.hoverframeindex) {
                        var f = u === r.inframeindex ? "frame_0" : u === r.outframeindex || "frame_999" === r.frames[u].frame ? "frame_999" : "frame_" + u;
                        r.frames[u].framename = f, i[f] = {}, i[f].timeline = new punchgs.TimelineLite({
                            align: "normal"
                        });
                        var v = r.frames[u].delay,
                            _ = (r.triggered_startstatus, void 0 !== v ? jQuery.inArray(v, ["slideenter", "bytrigger", "wait"]) >= 0 ? v : parseInt(v, 0) / 1e3 : "wait");
                        void 0 !== i.firstslide && "frame_0" === f && (a.addLabel("slide_" + i.firstslide + "_pause", 0), a.addPause("slide_" + i.firstslide + "_pause"), a.addLabel("slide_" + i.firstslide, "+=0.005")), void 0 !== i.lastslide && "frame_999" === f && (a.addLabel("slide_" + i.lastslide + "_pause", "+=0.01"), a.addPause("slide_" + i.lastslide + "_pause"), a.addLabel("slide_" + i.lastslide, "+=0.005")), jQuery.isNumeric(_) ? a.addLabel(f, "+=" + _) : (a.addLabel("pause_" + u, "+=0.01"), a.addPause("pause_" + u), a.addLabel(f, "+=0.01")), a = t.createFrameOnTimeline({
                            caption: e.caption,
                            timeline: a,
                            label: f,
                            frameindex: u,
                            opt: s
                        })
                    }
                e.regenerate || (r.current_is_nc_timeline && (r.current_timeline = a), r.current_timeline_pause ? a.pause(r.current_timeline_time) : a.time(r.current_timeline_time))
            }
        },
        createFrameOnTimeline: function(e) {
            var t = e.caption,
                i = t.data(),
                o = e.label,
                m = e.timeline,
                c = e.frameindex,
                g = e.opt,
                u = t,
                _ = {},
                b = g.timelines[i._slideid].layers[i._id],
                y = i.frames.length - 1,
                w = i.frames[c].split,
                x = i.frames[c].split_direction,
                T = i.frames[c].sfx_effect,
                k = !1;
            if (x = void 0 === x ? "forward" : x, -1 !== i.hoverframeindex && i.hoverframeindex == y && (y -= 1), _.content = new punchgs.TimelineLite({
                    align: "normal"
                }), _.mask = new punchgs.TimelineLite({
                    align: "normal"
                }), void 0 === m.vars.id && (m.vars.id = Math.round(1e5 * Math.random())), "column" === i._nctype && (m.add(punchgs.TweenLite.set(i._cbgc_man, {
                    visibility: "visible"
                }), o), m.add(punchgs.TweenLite.set(i._cbgc_auto, {
                    visibility: "hidden"
                }), o)), i.splittext && 0 === c) {
                void 0 !== i.mySplitText && i.mySplitText.revert();
                var j = t.find("a").length > 0 ? t.find("a") : t;
                i.mySplitText = new punchgs.SplitText(j, {
                    type: "chars,words,lines",
                    charsClass: "tp-splitted tp-charsplit",
                    wordsClass: "tp-splitted tp-wordsplit",
                    linesClass: "tp-splitted tp-linesplit"
                }), t.addClass("splitted")
            }
            void 0 !== i.mySplitText && w && w.match(/chars|words|lines/g) && (u = i.mySplitText[w], k = !0);
            var L, I, W = c !== i.outframeindex ? h(l(), i.frames[c].to, void 0, k, u.length - 1) : void 0 !== i.frames[c].to && null === i.frames[c].to.match(/auto:auto/g) ? h(p(), i.frames[c].to, 1 == g.sdir, k, u.length - 1) : h(p(), i.frames[i.inframeindex].from, 0 == g.sdir, k, u.length - 1),
                R = void 0 !== i.frames[c].from ? h(W, i.frames[i.inframeindex].from, 1 == g.sdir, k, u.length - 1) : void 0,
                C = i.frames[c].splitdelay;
            if (0 !== c || e.fromcurrentstate ? I = v(i.frames[c].mask) : L = v(i.frames[c].mask), W.anim.ease = void 0 === i.frames[c].ease ? punchgs.Power1.easeInOut : i.frames[c].ease, void 0 !== R && (R.anim.ease = void 0 === i.frames[c].ease ? punchgs.Power1.easeInOut : i.frames[c].ease, R.speed = void 0 === i.frames[c].speed ? R.speed : i.frames[c].speed, R.anim.x = R.anim.x * g.bw || f(R.anim.x, g, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), R.anim.y = R.anim.y * g.bw || f(R.anim.y, g, i.eow, i.eoh, i.calcy, i.calcx, "vertical")), void 0 !== W && (W.anim.ease = void 0 === i.frames[c].ease ? punchgs.Power1.easeInOut : i.frames[c].ease, W.speed = void 0 === i.frames[c].speed ? W.speed : i.frames[c].speed, W.anim.x = W.anim.x * g.bw || f(W.anim.x, g, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), W.anim.y = W.anim.y * g.bw || f(W.anim.y, g, i.eow, i.eoh, i.calcy, i.calcx, "vertical")), t.data("iframes") && m.add(punchgs.TweenLite.set(t.find("iframe"), {
                    autoAlpha: 1
                }), o + "+=0.001"), c === i.outframeindex && (i.frames[c].to && i.frames[c].to.match(/auto:auto/g), W.speed = void 0 === i.frames[c].speed || "inherit" === i.frames[c].speed ? i.frames[i.inframeindex].speed : i.frames[c].speed, W.anim.ease = void 0 === i.frames[c].ease || "inherit" === i.frames[c].ease ? i.frames[i.inframeindex].ease : i.frames[c].ease, W.anim.overwrite = "auto"), 0 !== c || e.fromcurrentstate) 0 === c && e.fromcurrentstate && (W.speed = R.speed);
            else {
                if (u != t) {
                    var z = jQuery.extend({}, W.anim, !0);
                    m.add(punchgs.TweenLite.set(t, W.anim), o), (W = l()).ease = z.ease, void 0 !== z.filter && (W.anim.filter = z.filter), void 0 !== z["-webkit-filter"] && (W.anim["-webkit-filter"] = z["-webkit-filter"])
                }
                R.anim.visibility = "hidden", R.anim.immediateRender = !0, W.anim.visibility = "visible"
            }
            e.fromcurrentstate && (W.anim.immediateRender = !0);
            var O = -1;
            if (0 === c && !e.fromcurrentstate && void 0 !== i._bmask && void 0 !== T && T.indexOf("block") >= 0 || c === i.outframeindex && !e.fromcurrentstate && void 0 !== i._bmask && void 0 !== T && T.indexOf("block") >= 0) {
                var Q = 0 === c ? R.speed / 1e3 / 2 : W.speed / 1e3 / 2,
                    S = [{
                        scaleY: 1,
                        scaleX: 0,
                        transformOrigin: "0% 50%"
                    }, {
                        scaleY: 1,
                        scaleX: 1,
                        ease: W.anim.ease
                    }],
                    M = {
                        scaleY: 1,
                        scaleX: 0,
                        transformOrigin: "100% 50%",
                        ease: W.anim.ease
                    };
                switch (O = void 0 === C ? Q : C + Q, T) {
                    case "blocktoleft":
                    case "blockfromright":
                        S[0].transformOrigin = "100% 50%", M.transformOrigin = "0% 50%";
                        break;
                    case "blockfromtop":
                    case "blocktobottom":
                        S = [{
                            scaleX: 1,
                            scaleY: 0,
                            transformOrigin: "50% 0%"
                        }, {
                            scaleX: 1,
                            scaleY: 1,
                            ease: W.anim.ease
                        }], M = {
                            scaleX: 1,
                            scaleY: 0,
                            transformOrigin: "50% 100%",
                            ease: W.anim.ease
                        };
                        break;
                    case "blocktotop":
                    case "blockfrombottom":
                        S = [{
                            scaleX: 1,
                            scaleY: 0,
                            transformOrigin: "50% 100%"
                        }, {
                            scaleX: 1,
                            scaleY: 1,
                            ease: W.anim.ease
                        }], M = {
                            scaleX: 1,
                            scaleY: 0,
                            transformOrigin: "50% 0%",
                            ease: W.anim.ease
                        }
                }
                S[0].background = i.frames[c].sfxcolor, m.add(_.mask.fromTo(i._bmask, Q, S[0], S[1], C), o), m.add(_.mask.to(i._bmask, Q, M, O), o)
            }
            if (k) var P = s(u.length - 1, x);
            if (0 !== c || e.fromcurrentstate)
                if ("block" === i._sfx_out && c === i.outframeindex) m.add(_.content.staggerTo(u, .001, {
                    autoAlpha: 0,
                    delay: O
                }), o), m.add(_.content.staggerTo(u, W.speed / 1e3 / 2 - .001, {
                    x: 0,
                    delay: O
                }), o + "+=0.001");
                else if (k && void 0 !== P) {
                F = {
                    to: d(W.anim)
                };
                for (var A in u) {
                    Y = jQuery.extend({}, W.anim);
                    for (var B in F.to) Y[B] = parseInt(F.to[B].values[F.to[B].index], 0), F.to[B].index = F.to[B].index < F.to[B].len ? F.to[B].index + 1 : 0;
                    void 0 !== i.frames[c].color && (Y.color = i.frames[c].color), void 0 !== i.frames[c].bgcolor && (Y.backgroundColor = i.frames[c].bgcolor), m.add(_.content.to(u[P[A]], W.speed / 1e3, Y, C * A), o)
                }
            } else void 0 !== i.frames[c].color && (W.anim.color = i.frames[c].color), void 0 !== i.frames[c].bgcolor && (W.anim.backgroundColor = i.frames[c].bgcolor), m.add(_.content.staggerTo(u, W.speed / 1e3, W.anim, C), o);
            else if ("block" === i._sfx_in) m.add(_.content.staggerFromTo(u, .05, {
                x: 0,
                y: 0,
                autoAlpha: 0
            }, {
                x: 0,
                y: 0,
                autoAlpha: 1,
                delay: O
            }), o);
            else if (k && void 0 !== P) {
                var F = {
                    from: d(R.anim),
                    to: d(W.anim)
                };
                for (var A in u) {
                    var X = jQuery.extend({}, R.anim),
                        Y = jQuery.extend({}, W.anim);
                    for (var B in F.from) X[B] = parseInt(F.from[B].values[F.from[B].index], 0), F.from[B].index = F.from[B].index < F.from[B].len ? F.from[B].index + 1 : 0;
                    Y.ease = X.ease, void 0 !== i.frames[c].color && (X.color = i.frames[c].color, Y.color = i.cssobj.styleProps.color), void 0 !== i.frames[c].bgcolor && (X.backgroundColor = i.frames[c].bgcolor, Y.backgroundColor = i.cssobj.styleProps["background-color"]), m.add(_.content.fromTo(u[P[A]], R.speed / 1e3, X, Y, C * A), o)
                }
            } else void 0 !== i.frames[c].color && (R.anim.color = i.frames[c].color, W.anim.color = i.cssobj.styleProps.color), void 0 !== i.frames[c].bgcolor && (R.anim.backgroundColor = i.frames[c].bgcolor, W.anim.backgroundColor = i.cssobj.styleProps["background-color"]), m.add(_.content.staggerFromTo(u, R.speed / 1e3, R.anim, W.anim, C), o);
            return void 0 === I || !1 === I || 0 === c && e.ignorefirstframe || (I.anim.ease = void 0 === I.anim.ease || "inherit" === I.anim.ease ? i.frames[0].ease : I.anim.ease, I.anim.overflow = "hidden", I.anim.x = I.anim.x * g.bw || f(I.anim.x, g, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), I.anim.y = I.anim.y * g.bw || f(I.anim.y, g, i.eow, i.eoh, i.calcy, i.calcx, "vertical")), 0 === c && L && !1 !== L && !e.fromcurrentstate || 0 === c && e.ignorefirstframe ? ((I = new Object).anim = new Object, I.anim.overwrite = "auto", I.anim.ease = W.anim.ease, I.anim.x = I.anim.y = 0, L && !1 !== L && (L.anim.x = L.anim.x * g.bw || f(L.anim.x, g, i.eow, i.eoh, i.calcy, i.calcx, "horizontal"), L.anim.y = L.anim.y * g.bw || f(L.anim.y, g, i.eow, i.eoh, i.calcy, i.calcx, "vertical"), L.anim.overflow = "hidden")) : 0 === c && m.add(_.mask.set(i._mw, {
                overflow: "visible"
            }), o), void 0 !== L && void 0 !== I && !1 !== L && !1 !== I ? m.add(_.mask.fromTo(i._mw, R.speed / 1e3, L.anim, I.anim, C), o) : void 0 !== I && !1 !== I && m.add(_.mask.to(i._mw, W.speed / 1e3, I.anim, C), o), m.addLabel(o + "_end"), i._gsTransformTo && c === y && i.hoveredstatus && (i.hovertimelines.item = punchgs.TweenLite.to(t, 0, i._gsTransformTo)), i._gsTransformTo = !1, _.content.eventCallback("onStart", a, [c, b, i._pw, i, m, W.anim, t, e.updateStaticTimeline, g]), _.content.eventCallback("onUpdate", n, [o, i._id, i._pw, i, m, c, jQuery.extend(!0, {}, W.anim), e.updateStaticTimeline, t, g]), _.content.eventCallback("onComplete", r, [c, i.frames.length, y, i._pw, i, m, e.updateStaticTimeline, t, g]), m
        },
        endMoveCaption: function(e) {
            e.firstframe = "frame_0", e.lastframe = "frame_999";
            var i = o(e),
                a = e.caption.data();
            if (void 0 !== e.frame ? i.timeline.play(e.frame) : (!i.static || e.currentslide >= i.removeonslide || e.currentslide < i.showonslide) && (i.outnow = new punchgs.TimelineLite, i.timeline.pause(), !0 === a.visibleelement && t.createFrameOnTimeline({
                    caption: e.caption,
                    timeline: i.outnow,
                    label: "outnow",
                    frameindex: e.caption.data("outframeindex"),
                    opt: e.opt,
                    fromcurrentstate: !0
                }).play()), e.checkchildrens && i.timeline_obj && i.timeline_obj.dchildren && "none" !== i.timeline_obj.dchildren && i.timeline_obj.dchildren.length > 0)
                for (var n = 0; n < i.timeline_obj.dchildren.length; n++) t.endMoveCaption({
                    caption: jQuery(i.timeline_obj.dchildren[n]),
                    opt: e.opt
                })
        },
        playAnimationFrame: function(e) {
            e.firstframe = e.triggerframein, e.lastframe = e.triggerframeout;
            var i, a = o(e),
                n = e.caption.data(),
                r = 0;
            for (var s in n.frames) n.frames[s].framename === e.frame && (i = r), r++;
            void 0 !== n.triggeredtimeline && n.triggeredtimeline.pause(), n.triggeredtimeline = new punchgs.TimelineLite, a.timeline.pause();
            var d = !0 === n.visibleelement;
            n.triggeredtimeline = t.createFrameOnTimeline({
                caption: e.caption,
                timeline: n.triggeredtimeline,
                label: "triggered",
                frameindex: i,
                updateStaticTimeline: !0,
                opt: e.opt,
                ignorefirstframe: !0,
                fromcurrentstate: d
            }).play()
        },
        removeTheCaptions: function(e, a) {
            if ("stop" === t.compare_version(i).check) return !1;
            var n = e.data("index"),
                r = new Array;
            a.layers[n] && jQuery.each(a.layers[n], function(e, t) {
                r.push(t)
            });
            var o = t.currentSlideIndex(a);
            r && jQuery.each(r, function(e) {
                var i = jQuery(this);
                "carousel" === a.sliderType && "on" === a.carousel.showLayersAllTime ? (clearTimeout(i.data("videoplaywait")), t.stopVideo && t.stopVideo(i, a), t.removeMediaFromList && t.removeMediaFromList(i, a), a.lastplayedvideos = []) : (I(i), clearTimeout(i.data("videoplaywait")), t.endMoveCaption({
                    caption: i,
                    opt: a,
                    currentslide: o
                }), t.removeMediaFromList && t.removeMediaFromList(i, a), a.lastplayedvideos = [])
            })
        }
    });
    var a = function(e, i, a, n, r, o, s, d, l) {
            var m = {};
            if (m.layer = s, m.eventtype = 0 === e ? "enterstage" : e === n.outframeindex ? "leavestage" : "framestarted", m.layertype = s.data("layertype"), n.active = !0, m.frame_index = e, m.layersettings = s.data(), l.c.trigger("revolution.layeraction", [m]), "on" == n.loopanimation && L(n._lw, l.bw), "enterstage" === m.eventtype && (n.animdirection = "in", n.visibleelement = !0, t.toggleState(n.layertoggledby)), "none" !== i.dchildren && void 0 !== i.dchildren && i.dchildren.length > 0)
                if (0 === e)
                    for (var c = 0; c < i.dchildren.length; c++) jQuery(i.dchildren[c]).data("timeline").play(0);
                else if (e === n.outframeindex)
                for (c = 0; c < i.dchildren.length; c++) t.endMoveCaption({
                    caption: jQuery(i.dchildren[c]),
                    opt: l,
                    checkchildrens: !0
                });
            punchgs.TweenLite.set(a, {
                visibility: "visible"
            }), n.current_frame = e, n.current_timeline = r, n.current_timeline_time = r.time(), d && (n.static_layer_timeline_time = n.current_timeline_time), n.last_frame_started = e
        },
        n = function(e, t, i, a, n, r, o, s, d, l) {
            "column" === a._nctype && j(d, l), punchgs.TweenLite.set(i, {
                visibility: "visible"
            }), a.current_frame = r, a.current_timeline = n, a.current_timeline_time = n.time(), s && (a.static_layer_timeline_time = a.current_timeline_time), void 0 !== a.hoveranim && !1 === a._gsTransformTo && (a._gsTransformTo = o, a._gsTransformTo && a._gsTransformTo.startAt && delete a._gsTransformTo.startAt, void 0 === a.cssobj.styleProps.css ? a._gsTransformTo = jQuery.extend(!0, {}, a.cssobj.styleProps, a._gsTransformTo) : a._gsTransformTo = jQuery.extend(!0, {}, a.cssobj.styleProps.css, a._gsTransformTo)), a.visibleelement = !0
        },
        r = function(e, i, a, n, r, o, s, d, l) {
            var m = {};
            m.layer = d, m.eventtype = 0 === e ? "enteredstage" : e === i - 1 || e === a ? "leftstage" : "frameended", m.layertype = d.data("layertype"), m.layersettings = d.data(), l.c.trigger("revolution.layeraction", [m]), "leftstage" !== m.eventtype && t.animcompleted(d, l), "leftstage" === m.eventtype && t.stopVideo && t.stopVideo(d, l), "column" === r._nctype && (punchgs.TweenLite.to(r._cbgc_man, .01, {
                visibility: "hidden"
            }), punchgs.TweenLite.to(r._cbgc_auto, .01, {
                visibility: "visible"
            })), "leftstage" === m.eventtype && (r.active = !1, punchgs.TweenLite.set(n, {
                visibility: "hidden",
                overwrite: "auto"
            }), r.animdirection = "out", r.visibleelement = !1, t.unToggleState(r.layertoggledby), "video" === r._nctype && t.resetVideo && setTimeout(function() {
                t.resetVideo(d, l)
            }, 100)), r.current_frame = e, r.current_timeline = o, r.current_timeline_time = o.time(), s && (r.static_layer_timeline_time = r.current_timeline_time)
        },
        o = function(e) {
            var t = {};
            return e.firstframe = void 0 === e.firstframe ? "frame_0" : e.firstframe, e.lastframe = void 0 === e.lastframe ? "frame_999" : e.lastframe, t.id = e.caption.data("id") || e.caption.attr("id"), t.slideid = e.caption.data("slideid") || e.caption.closest(".tp-revslider-slidesli").data("index"), t.timeline_obj = e.opt.timelines[t.slideid].layers[t.id], t.timeline = t.timeline_obj.timeline, t.ffs = t.timeline.getLabelTime(e.firstframe), t.ffe = t.timeline.getLabelTime(e.firstframe + "_end"), t.lfs = t.timeline.getLabelTime(e.lastframe), t.lfe = t.timeline.getLabelTime(e.lastframe + "_end"), t.ct = t.timeline.time(), t.static = null != t.timeline_obj.firstslide || null != t.timeline_obj.lastslide, t.static && (t.showonslide = t.timeline_obj.firstslide, t.removeonslide = t.timeline_obj.lastslide), t
        },
        s = function(e, t) {
            var i = new Array;
            switch (t) {
                case "forward":
                case "random":
                    for (var a = 0; a <= e; a++) i.push(a);
                    "random" === t && (i = function(e) {
                        for (var t, i, a = e.length; 0 !== a;) i = Math.floor(Math.random() * a), t = e[a -= 1], e[a] = e[i], e[i] = t;
                        return e
                    }(i));
                    break;
                case "backward":
                    for (a = 0; a <= e; a++) i.push(e - a);
                    break;
                case "middletoedge":
                    var n = Math.ceil(e / 2),
                        r = n - 1,
                        o = n + 1;
                    i.push(n);
                    for (a = 0; a < n; a++) r >= 0 && i.push(r), o <= e && i.push(o), r--, o++;
                    break;
                case "edgetomiddle":
                    for (r = e, o = 0, a = 0; a <= Math.floor(e / 2); a++) i.push(r), o < r && i.push(o), r--, o++
            }
            return i
        },
        d = function(e) {
            var t = {};
            for (var i in e) "string" == typeof e[i] && e[i].indexOf("|") >= 0 && (void 0 === t[i] && (t[i] = {
                index: 0
            }), t[i].values = e[i].replace("[", "").replace("]", "").split("|"), t[i].len = t[i].values.length - 1);
            return t
        },
        l = function(e) {
            return (e = void 0 === e ? new Object : e).anim = void 0 === e.anim ? new Object : e.anim, e.anim.x = void 0 === e.anim.x ? 0 : e.anim.x, e.anim.y = void 0 === e.anim.y ? 0 : e.anim.y, e.anim.z = void 0 === e.anim.z ? 0 : e.anim.z, e.anim.rotationX = void 0 === e.anim.rotationX ? 0 : e.anim.rotationX, e.anim.rotationY = void 0 === e.anim.rotationY ? 0 : e.anim.rotationY, e.anim.rotationZ = void 0 === e.anim.rotationZ ? 0 : e.anim.rotationZ, e.anim.scaleX = void 0 === e.anim.scaleX ? 1 : e.anim.scaleX, e.anim.scaleY = void 0 === e.anim.scaleY ? 1 : e.anim.scaleY, e.anim.skewX = void 0 === e.anim.skewX ? 0 : e.anim.skewX, e.anim.skewY = void 0 === e.anim.skewY ? 0 : e.anim.skewY, e.anim.opacity = void 0 === e.anim.opacity ? 1 : e.anim.opacity, e.anim.transformOrigin = void 0 === e.anim.transformOrigin ? "50% 50%" : e.anim.transformOrigin, e.anim.transformPerspective = void 0 === e.anim.transformPerspective ? 600 : e.anim.transformPerspective, e.anim.rotation = void 0 === e.anim.rotation ? 0 : e.anim.rotation, e.anim.force3D = void 0 === e.anim.force3D ? "auto" : e.anim.force3D, e.anim.autoAlpha = void 0 === e.anim.autoAlpha ? 1 : e.anim.autoAlpha, e.anim.visibility = void 0 === e.anim.visibility ? "visible" : e.anim.visibility, e.anim.overwrite = void 0 === e.anim.overwrite ? "auto" : e.anim.overwrite, e.speed = void 0 === e.speed ? .3 : e.speed, e.filter = void 0 === e.filter ? "blur(0px) grayscale(0%) brightness(100%)" : e.filter, e["-webkit-filter"] = void 0 === e["-webkit-filter"] ? "blur(0px) grayscale(0%) brightness(100%)" : e["-webkit-filter"], e
        },
        m = function() {
            var e = new Object;
            return e.anim = new Object, e.anim.stroke = "none", e.anim.strokeWidth = 0, e.anim.strokeDasharray = "none", e.anim.strokeDashoffset = "0", e
        },
        c = function(e, t) {
            var i = e.split(";");
            return i && jQuery.each(i, function(e, i) {
                var a = i.split(":"),
                    n = a[0],
                    r = a[1];
                "sc" == n && (t.anim.stroke = r), "sw" == n && (t.anim.strokeWidth = r), "sda" == n && (t.anim.strokeDasharray = r), "sdo" == n && (t.anim.strokeDashoffset = r)
            }), t
        },
        p = function() {
            var e = new Object;
            return e.anim = new Object, e.anim.x = 0, e.anim.y = 0, e.anim.z = 0, e
        },
        g = function() {
            var e = new Object;
            return e.anim = new Object, e.speed = .2, e
        },
        u = function(e, t, i, a, n) {
            if (n = void 0 === n ? "" : n, jQuery.isNumeric(parseFloat(e))) return parseFloat(e) + n;
            if (void 0 === e || "inherit" === e) return t + "ext";
            if (e.split("{").length > 1) {
                var r = e.split(","),
                    o = parseFloat(r[1].split("}")[0]);
                if (r = parseFloat(r[0].split("{")[1]), void 0 !== i && void 0 !== a) {
                    parseInt(Math.random() * (o - r), 0), parseInt(r, 0);
                    for (var s = 0; s < a; s++) e = e + "|" + (parseInt(Math.random() * (o - r), 0) + parseInt(r, 0)) + n;
                    e += "]"
                } else e = Math.random() * (o - r) + r
            }
            return e
        },
        f = function(e, t, i, a, n, r, o) {
            return !jQuery.isNumeric(e) && e.match(/%]/g) ? (e = e.split("[")[1].split("]")[0], "horizontal" == o ? e = (i + 2) * parseInt(e, 0) / 100 : "vertical" == o && (e = (a + 2) * parseInt(e, 0) / 100)) : e = "top" === (e = "left" === (e = "layer_top" === (e = "layer_left" === e ? 0 - i : "layer_right" === e ? i : e) ? 0 - a : "layer_bottom" === e ? a : e) || "stage_left" === e ? 0 - i - r : "right" === e || "stage_right" === e ? t.conw - r : "center" === e || "stage_center" === e ? t.conw / 2 - i / 2 - r : e) || "stage_top" === e ? 0 - a - n : "bottom" === e || "stage_bottom" === e ? t.conh - n : "middle" === e || "stage_middle" === e ? t.conh / 2 - a / 2 - n : e, e
        },
        h = function(e, t, i, a, n) {
            var r = new Object;
            if (r = jQuery.extend(!0, {}, r, e), void 0 === t) return r;
            var o = t.split(";"),
                s = "";
            return o && jQuery.each(o, function(e, t) {
                var o = t.split(":"),
                    d = o[0],
                    l = o[1];
                i && "none" !== i && null != l && l.length > 0 && l.match(/\(R\)/) && ("[" === (l = "right" === (l = l.replace("(R)", "")) ? "left" : "left" === l ? "right" : "top" === l ? "bottom" : "bottom" === l ? "top" : l)[0] && "-" === l[1] ? l = l.replace("[-", "[") : "[" === l[0] && "-" !== l[1] ? l = l.replace("[", "[-") : "-" === l[0] ? l = l.replace("-", "") : l[0].match(/[1-9]/) && (l = "-" + l)), null != l && (l = l.replace(/\(R\)/, ""), "rotationX" != d && "rX" != d || (r.anim.rotationX = u(l, r.anim.rotationX, a, n, "deg")), "rotationY" != d && "rY" != d || (r.anim.rotationY = u(l, r.anim.rotationY, a, n, "deg")), "rotationZ" != d && "rZ" != d || (r.anim.rotation = u(l, r.anim.rotationZ, a, n, "deg")), "scaleX" != d && "sX" != d || (r.anim.scaleX = u(l, r.anim.scaleX, a, n)), "scaleY" != d && "sY" != d || (r.anim.scaleY = u(l, r.anim.scaleY, a, n)), "opacity" != d && "o" != d || (r.anim.opacity = u(l, r.anim.opacity, a, n)), "fb" == d && (s = "" === s ? "blur(" + parseInt(l, 0) + "px)" : s + " blur(" + parseInt(l, 0) + "px)"), "fg" == d && (s = "" === s ? "grayscale(" + parseInt(l, 0) + "%)" : s + " grayscale(" + parseInt(l, 0) + "%)"), "fbr" == d && (s = "" === s ? "brightness(" + parseInt(l, 0) + "%)" : s + " brightness(" + parseInt(l, 0) + "%)"), 0 === r.anim.opacity && (r.anim.autoAlpha = 0), r.anim.opacity = 0 == r.anim.opacity ? 1e-4 : r.anim.opacity, "skewX" != d && "skX" != d || (r.anim.skewX = u(l, r.anim.skewX, a, n)), "skewY" != d && "skY" != d || (r.anim.skewY = u(l, r.anim.skewY, a, n)), "x" == d && (r.anim.x = u(l, r.anim.x, a, n)), "y" == d && (r.anim.y = u(l, r.anim.y, a, n)), "z" == d && (r.anim.z = u(l, r.anim.z, a, n)), "transformOrigin" != d && "tO" != d || (r.anim.transformOrigin = l.toString()), "transformPerspective" != d && "tP" != d || (r.anim.transformPerspective = parseInt(l, 0)), "speed" != d && "s" != d || (r.speed = parseFloat(l)))
            }), "" !== s && (r.anim["-webkit-filter"] = s, r.anim.filter = s), r
        },
        v = function(e) {
            if (void 0 === e) return !1;
            var t = new Object;
            t.anim = new Object;
            var i = e.split(";");
            return i && jQuery.each(i, function(e, i) {
                var a = (i = i.split(":"))[0],
                    n = i[1];
                "x" == a && (t.anim.x = n), "y" == a && (t.anim.y = n), "s" == a && (t.speed = parseFloat(n)), "e" != a && "ease" != a || (t.anim.ease = n)
            }), t
        },
        _ = function(e, t, i) {
            if (null == e && (e = 0), !jQuery.isArray(e) && "string" === jQuery.type(e) && (e.split(",").length > 1 || e.split("[").length > 1)) {
                var a = (e = (e = e.replace("[", "")).replace("]", "")).match(/'/g) ? e.split("',") : e.split(",");
                e = new Array, a && jQuery.each(a, function(t, i) {
                    i = (i = i.replace("'", "")).replace("'", ""), e.push(i)
                })
            } else {
                var n = e;
                jQuery.isArray(e) || (e = new Array).push(n)
            }
            n = e[e.length - 1];
            if (e.length < t.rle)
                for (var r = 1; r <= t.curWinRange; r++) e.push(n);
            return e
        };

    function b(e, t, i, a, n, r, o) {
        var s = e.find(t);
        s.css("borderWidth", r + "px"), s.css(i, 0 - r + "px"), s.css(a, "0px solid transparent"), s.css(n, o)
    }
    var y = function(e, t) {
            if (void 0 === t) return e;
            var i = (t = (t = (t = (t = (t = (t = (t = (t = t.replace("c:", "color:")).replace("bg:", "background-color:")).replace("bw:", "border-width:")).replace("bc:", "border-color:")).replace("br:", "borderRadius:")).replace("bs:", "border-style:")).replace("td:", "text-decoration:")).replace("zi:", "zIndex:")).split(";");
            return i && jQuery.each(i, function(t, i) {
                var a = i.split(":");
                a[0].length > 0 && ("background-color" === a[0] && a[1].indexOf("gradient") >= 0 && (a[0] = "background"), e.anim[a[0]] = a[1])
            }), e
        },
        w = function(e, t) {
            var i, a = new Object,
                n = !1;
            if ("rekursive" == t && (i = e.closest(".tp-caption")) && e.css("fontSize") === i.css("fontSize") && e.css("fontWeight") === i.css("fontWeight") && e.css("lineHeight") === i.css("lineHeight") && (n = !0), a.basealign = e.data("basealign") || "grid", a.fontSize = n ? void 0 === i.data("fontsize") ? parseInt(i.css("fontSize"), 0) || 0 : i.data("fontsize") : void 0 === e.data("fontsize") ? parseInt(e.css("fontSize"), 0) || 0 : e.data("fontsize"), a.fontWeight = n ? void 0 === i.data("fontweight") ? parseInt(i.css("fontWeight"), 0) || 0 : i.data("fontweight") : void 0 === e.data("fontweight") ? parseInt(e.css("fontWeight"), 0) || 0 : e.data("fontweight"), a.whiteSpace = n ? void 0 === i.data("whitespace") ? i.css("whitespace") || "normal" : i.data("whitespace") : void 0 === e.data("whitespace") ? e.css("whitespace") || "normal" : e.data("whitespace"), a.textAlign = n ? void 0 === i.data("textalign") ? i.css("textalign") || "inherit" : i.data("textalign") : void 0 === e.data("textalign") ? e.css("textalign") || "inherit" : e.data("textalign"), a.zIndex = n ? void 0 === i.data("zIndex") ? i.css("zIndex") || "inherit" : i.data("zIndex") : void 0 === e.data("zIndex") ? e.css("zIndex") || "inherit" : e.data("zIndex"), -1 !== jQuery.inArray(e.data("layertype"), ["video", "image", "audio"]) || e.is("img") ? a.lineHeight = 0 : a.lineHeight = n ? void 0 === i.data("lineheight") ? parseInt(i.css("lineHeight"), 0) || 0 : i.data("lineheight") : void 0 === e.data("lineheight") ? parseInt(e.css("lineHeight"), 0) || 0 : e.data("lineheight"), a.letterSpacing = n ? void 0 === i.data("letterspacing") ? parseFloat(i.css("letterSpacing"), 0) || 0 : i.data("letterspacing") : void 0 === e.data("letterspacing") ? parseFloat(e.css("letterSpacing")) || 0 : e.data("letterspacing"), a.paddingTop = void 0 === e.data("paddingtop") ? parseInt(e.css("paddingTop"), 0) || 0 : e.data("paddingtop"), a.paddingBottom = void 0 === e.data("paddingbottom") ? parseInt(e.css("paddingBottom"), 0) || 0 : e.data("paddingbottom"), a.paddingLeft = void 0 === e.data("paddingleft") ? parseInt(e.css("paddingLeft"), 0) || 0 : e.data("paddingleft"), a.paddingRight = void 0 === e.data("paddingright") ? parseInt(e.css("paddingRight"), 0) || 0 : e.data("paddingright"), a.marginTop = void 0 === e.data("margintop") ? parseInt(e.css("marginTop"), 0) || 0 : e.data("margintop"), a.marginBottom = void 0 === e.data("marginbottom") ? parseInt(e.css("marginBottom"), 0) || 0 : e.data("marginbottom"), a.marginLeft = void 0 === e.data("marginleft") ? parseInt(e.css("marginLeft"), 0) || 0 : e.data("marginleft"), a.marginRight = void 0 === e.data("marginright") ? parseInt(e.css("marginRight"), 0) || 0 : e.data("marginright"), a.borderTopWidth = void 0 === e.data("bordertopwidth") ? parseInt(e.css("borderTopWidth"), 0) || 0 : e.data("bordertopwidth"), a.borderBottomWidth = void 0 === e.data("borderbottomwidth") ? parseInt(e.css("borderBottomWidth"), 0) || 0 : e.data("borderbottomwidth"), a.borderLeftWidth = void 0 === e.data("borderleftwidth") ? parseInt(e.css("borderLeftWidth"), 0) || 0 : e.data("borderleftwidth"), a.borderRightWidth = void 0 === e.data("borderrightwidth") ? parseInt(e.css("borderRightWidth"), 0) || 0 : e.data("borderrightwidth"), "rekursive" != t) {
                if (a.color = void 0 === e.data("color") ? "nopredefinedcolor" : e.data("color"), a.whiteSpace = n ? void 0 === i.data("whitespace") ? i.css("whiteSpace") || "nowrap" : i.data("whitespace") : void 0 === e.data("whitespace") ? e.css("whiteSpace") || "nowrap" : e.data("whitespace"), a.textAlign = n ? void 0 === i.data("textalign") ? i.css("textalign") || "inherit" : i.data("textalign") : void 0 === e.data("textalign") ? e.css("textalign") || "inherit" : e.data("textalign"), a.fontWeight = n ? void 0 === i.data("fontweight") ? parseInt(i.css("fontWeight"), 0) || 0 : i.data("fontweight") : void 0 === e.data("fontweight") ? parseInt(e.css("fontWeight"), 0) || 0 : e.data("fontweight"), a.minWidth = void 0 === e.data("width") ? parseInt(e.css("minWidth"), 0) || 0 : e.data("width"), a.minHeight = void 0 === e.data("height") ? parseInt(e.css("minHeight"), 0) || 0 : e.data("height"), null != e.data("videowidth") && null != e.data("videoheight")) {
                    var r = e.data("videowidth"),
                        o = e.data("videoheight");
                    r = "100%" === r ? "none" : r, o = "100%" === o ? "none" : o, e.data("width", r), e.data("height", o)
                }
                a.maxWidth = void 0 === e.data("width") ? parseInt(e.css("maxWidth"), 0) || "none" : e.data("width"), a.maxHeight = -1 !== jQuery.inArray(e.data("type"), ["column", "row"]) ? "none" : void 0 === e.data("height") ? parseInt(e.css("maxHeight"), 0) || "none" : e.data("height"), a.wan = void 0 === e.data("wan") ? parseInt(e.css("-webkit-transition"), 0) || "none" : e.data("wan"), a.moan = void 0 === e.data("moan") ? parseInt(e.css("-moz-animation-transition"), 0) || "none" : e.data("moan"), a.man = void 0 === e.data("man") ? parseInt(e.css("-ms-animation-transition"), 0) || "none" : e.data("man"), a.ani = void 0 === e.data("ani") ? parseInt(e.css("transition"), 0) || "none" : e.data("ani")
            }
            return a.styleProps = {
                borderTopLeftRadius: e[0].style.borderTopLeftRadius,
                borderTopRightRadius: e[0].style.borderTopRightRadius,
                borderBottomRightRadius: e[0].style.borderBottomRightRadius,
                borderBottomLeftRadius: e[0].style.borderBottomLeftRadius,
                background: e[0].style.background,
                boxShadow: e[0].style.boxShadow,
                "background-color": e[0].style["background-color"],
                "border-top-color": e[0].style["border-top-color"],
                "border-bottom-color": e[0].style["border-bottom-color"],
                "border-right-color": e[0].style["border-right-color"],
                "border-left-color": e[0].style["border-left-color"],
                "border-top-style": e[0].style["border-top-style"],
                "border-bottom-style": e[0].style["border-bottom-style"],
                "border-left-style": e[0].style["border-left-style"],
                "border-right-style": e[0].style["border-right-style"],
                "border-left-width": e[0].style["border-left-width"],
                "border-right-width": e[0].style["border-right-width"],
                "border-bottom-width": e[0].style["border-bottom-width"],
                "border-top-width": e[0].style["border-top-width"],
                color: e[0].style.color,
                "text-decoration": e[0].style["text-decoration"],
                "font-style": e[0].style["font-style"]
            }, "" !== a.styleProps.background && void 0 !== a.styleProps.background && a.styleProps.background !== a.styleProps["background-color"] || delete a.styleProps.background, "" == a.styleProps.color && (a.styleProps.color = e.css("color")), a
        },
        x = function(e, t) {
            var i = new Object;
            return e && jQuery.each(e, function(a, n) {
                var r = _(n, t)[t.curWinRange];
                i[a] = void 0 !== r ? r : e[a]
            }), i
        },
        T = function(e, t, i, a) {
            return e = "full" === (e = jQuery.isNumeric(e) ? e * t + "px" : e) ? a : "auto" === e || "none" === e ? i : e
        },
        k = function(e, t, i, a) {
            var n = e.data();
            n = void 0 === n ? {} : n;
            try {
                if ("BR" == e[0].nodeName || "br" == e[0].tagName) return !1
            } catch (e) {}
            n.cssobj = void 0 === n.cssobj ? w(e, i) : n.cssobj;
            var r = x(n.cssobj, t),
                o = t.bw,
                s = t.bh;
            "off" === a && (o = 1, s = 1), "auto" == r.lineHeight && (r.lineHeight = r.fontSize + 4);
            var d = {
                Top: r.marginTop,
                Bottom: r.marginBottom,
                Left: r.marginLeft,
                Right: r.marginRight
            };
            if ("column" === n._nctype && (punchgs.TweenLite.set(n._column, {
                    paddingTop: Math.round(r.marginTop * s) + "px",
                    paddingBottom: Math.round(r.marginBottom * s) + "px",
                    paddingLeft: Math.round(r.marginLeft * o) + "px",
                    paddingRight: Math.round(r.marginRight * o) + "px"
                }), d = {
                    Top: 0,
                    Bottom: 0,
                    Left: 0,
                    Right: 0
                }), !e.hasClass("tp-splitted")) {
                if (e.css("-webkit-transition", "none"), e.css("-moz-transition", "none"), e.css("-ms-transition", "none"), e.css("transition", "none"), (void 0 !== e.data("transform_hover") || void 0 !== e.data("style_hover")) && punchgs.TweenLite.set(e, r.styleProps), punchgs.TweenLite.set(e, {
                        fontSize: Math.round(r.fontSize * o) + "px",
                        fontWeight: r.fontWeight,
                        letterSpacing: Math.floor(r.letterSpacing * o) + "px",
                        paddingTop: Math.round(r.paddingTop * s) + "px",
                        paddingBottom: Math.round(r.paddingBottom * s) + "px",
                        paddingLeft: Math.round(r.paddingLeft * o) + "px",
                        paddingRight: Math.round(r.paddingRight * o) + "px",
                        marginTop: d.Top * s + "px",
                        marginBottom: d.Bottom * s + "px",
                        marginLeft: d.Left * o + "px",
                        marginRight: d.Right * o + "px",
                        borderTopWidth: Math.round(r.borderTopWidth * s) + "px",
                        borderBottomWidth: Math.round(r.borderBottomWidth * s) + "px",
                        borderLeftWidth: Math.round(r.borderLeftWidth * o) + "px",
                        borderRightWidth: Math.round(r.borderRightWidth * o) + "px",
                        lineHeight: Math.round(r.lineHeight * s) + "px",
                        textAlign: r.textAlign,
                        overwrite: "auto"
                    }), "rekursive" != i) {
                    var l = "slide" == r.basealign ? t.ulw : t.gridwidth[t.curWinRange],
                        m = "slide" == r.basealign ? t.ulh : t.gridheight[t.curWinRange],
                        c = T(r.maxWidth, o, "none", l),
                        p = T(r.maxHeight, s, "none", m),
                        g = T(r.minWidth, o, "0px", l),
                        u = T(r.minHeight, s, "0px", m);
                    if (g = void 0 === g ? 0 : g, u = void 0 === u ? 0 : u, c = void 0 === c ? "none" : c, p = void 0 === p ? "none" : p, n._isgroup && ("#1/1#" === g && (g = c = l), "#1/2#" === g && (g = c = l / 2), "#1/3#" === g && (g = c = l / 3), "#1/4#" === g && (g = c = l / 4), "#1/5#" === g && (g = c = l / 5), "#1/6#" === g && (g = c = l / 6), "#2/3#" === g && (g = c = l / 3 * 2), "#3/4#" === g && (g = c = l / 4 * 3), "#2/5#" === g && (g = c = l / 5 * 2), "#3/5#" === g && (g = c = l / 5 * 3), "#4/5#" === g && (g = c = l / 5 * 4), "#3/6#" === g && (g = c = l / 6 * 3), "#4/6#" === g && (g = c = l / 6 * 4), "#5/6#" === g && (g = c = l / 6 * 5)), n._ingroup && (n._groupw = g, n._grouph = u), punchgs.TweenLite.set(e, {
                            maxWidth: c,
                            maxHeight: p,
                            minWidth: g,
                            minHeight: u,
                            whiteSpace: r.whiteSpace,
                            textAlign: r.textAlign,
                            overwrite: "auto"
                        }), "nopredefinedcolor" != r.color && punchgs.TweenLite.set(e, {
                            color: r.color,
                            overwrite: "auto"
                        }), null != n.svg_src) {
                        var f = "nopredefinedcolor" != r.color && null != r.color ? r.color : null != r.css && "nopredefinedcolor" != r.css.color && null != r.css.color ? r.css.color : null != r.styleProps.color ? r.styleProps.color : null != r.styleProps.css && null != r.styleProps.css.color && r.styleProps.css.color;
                        0 != f && (punchgs.TweenLite.set(e.find("svg"), {
                            fill: f,
                            overwrite: "auto"
                        }), punchgs.TweenLite.set(e.find("svg path"), {
                            fill: f,
                            overwrite: "auto"
                        }))
                    }
                }
                "column" === n._nctype && (void 0 === n._column_bg_set && (n._column_bg_set = e.css("backgroundColor"), n._column_bg_image = e.css("backgroundImage"), n._column_bg_image_repeat = e.css("backgroundRepeat"), n._column_bg_image_position = e.css("backgroundPosition"), n._column_bg_image_size = e.css("backgroundSize"), n._column_bg_opacity = e.data("bgopacity"), n._column_bg_opacity = void 0 === n._column_bg_opacity ? 1 : n._column_bg_opacity, punchgs.TweenLite.set(e, {
                    backgroundColor: "transparent",
                    backgroundImage: ""
                })), setTimeout(function() {
                    j(e, t)
                }, 1), n._cbgc_auto && n._cbgc_auto.length > 0 && (n._cbgc_auto[0].style.backgroundSize = n._column_bg_image_size, jQuery.isArray(r.marginLeft) ? punchgs.TweenLite.set(n._cbgc_auto, {
                    borderTopWidth: r.marginTop[t.curWinRange] * s + "px",
                    borderLeftWidth: r.marginLeft[t.curWinRange] * o + "px",
                    borderRightWidth: r.marginRight[t.curWinRange] * o + "px",
                    borderBottomWidth: r.marginBottom[t.curWinRange] * s + "px",
                    backgroundColor: n._column_bg_set,
                    backgroundImage: n._column_bg_image,
                    backgroundRepeat: n._column_bg_image_repeat,
                    backgroundPosition: n._column_bg_image_position,
                    opacity: n._column_bg_opacity
                }) : punchgs.TweenLite.set(n._cbgc_auto, {
                    borderTopWidth: r.marginTop * s + "px",
                    borderLeftWidth: r.marginLeft * o + "px",
                    borderRightWidth: r.marginRight * o + "px",
                    borderBottomWidth: r.marginBottom * s + "px",
                    backgroundColor: n._column_bg_set,
                    backgroundImage: n._column_bg_image,
                    backgroundRepeat: n._column_bg_image_repeat,
                    backgroundPosition: n._column_bg_image_position,
                    opacity: n._column_bg_opacity
                }))), setTimeout(function() {
                    e.css("-webkit-transition", e.data("wan")), e.css("-moz-transition", e.data("moan")), e.css("-ms-transition", e.data("man")), e.css("transition", e.data("ani"))
                }, 30)
            }
        },
        j = function(e, t) {
            var i, a, n, r = e.data();
            r._cbgc_man && r._cbgc_man.length > 0 && (jQuery.isArray(r.cssobj.marginLeft) ? (r.cssobj.marginLeft[t.curWinRange] * t.bw, i = r.cssobj.marginTop[t.curWinRange] * t.bh, a = r.cssobj.marginBottom[t.curWinRange] * t.bh, r.cssobj.marginRight[t.curWinRange], t.bw) : (r.cssobj.marginLeft * t.bw, i = r.cssobj.marginTop * t.bh, a = r.cssobj.marginBottom * t.bh, r.cssobj.marginRight, t.bw), n = r._row.hasClass("rev_break_columns") ? "100%" : r._row.height() - (i + a) + "px", r._cbgc_man[0].style.backgroundSize = r._column_bg_image_size, punchgs.TweenLite.set(r._cbgc_man, {
                width: "100%",
                height: n,
                backgroundColor: r._column_bg_set,
                backgroundImage: r._column_bg_image,
                backgroundRepeat: r._column_bg_image_repeat,
                backgroundPosition: r._column_bg_image_position,
                overwrite: "auto",
                opacity: r._column_bg_opacity
            }))
        },
        L = function(e, t) {
            var i = e.data();
            if (e.hasClass("rs-pendulum") && null == i._loop_timeline) {
                i._loop_timeline = new punchgs.TimelineLite;
                var a = null == e.data("startdeg") ? -20 : e.data("startdeg"),
                    n = null == e.data("enddeg") ? 20 : e.data("enddeg"),
                    r = null == e.data("speed") ? 2 : e.data("speed"),
                    o = null == e.data("origin") ? "50% 50%" : e.data("origin"),
                    s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing");
                a *= t, n *= t, i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, {
                    force3D: "auto",
                    rotation: a,
                    transformOrigin: o
                }, {
                    rotation: n,
                    ease: s
                })), i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, {
                    force3D: "auto",
                    rotation: n,
                    transformOrigin: o
                }, {
                    rotation: a,
                    ease: s,
                    onComplete: function() {
                        i._loop_timeline.restart()
                    }
                }))
            }
            if (e.hasClass("rs-rotate") && null == i._loop_timeline) {
                i._loop_timeline = new punchgs.TimelineLite;
                a = null == e.data("startdeg") ? 0 : e.data("startdeg"), n = null == e.data("enddeg") ? 360 : e.data("enddeg"), r = null == e.data("speed") ? 2 : e.data("speed"), o = null == e.data("origin") ? "50% 50%" : e.data("origin"), s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing");
                a *= t, n *= t, i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, {
                    force3D: "auto",
                    rotation: a,
                    transformOrigin: o
                }, {
                    rotation: n,
                    ease: s,
                    onComplete: function() {
                        i._loop_timeline.restart()
                    }
                }))
            }
            if (e.hasClass("rs-slideloop") && null == i._loop_timeline) {
                i._loop_timeline = new punchgs.TimelineLite;
                var d = null == e.data("xs") ? 0 : e.data("xs"),
                    l = null == e.data("ys") ? 0 : e.data("ys"),
                    m = null == e.data("xe") ? 0 : e.data("xe"),
                    c = null == e.data("ye") ? 0 : e.data("ye");
                r = null == e.data("speed") ? 2 : e.data("speed"), s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing");
                d *= t, l *= t, m *= t, c *= t, i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, {
                    force3D: "auto",
                    x: d,
                    y: l
                }, {
                    x: m,
                    y: c,
                    ease: s
                })), i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, {
                    force3D: "auto",
                    x: m,
                    y: c
                }, {
                    x: d,
                    y: l,
                    onComplete: function() {
                        i._loop_timeline.restart()
                    }
                }))
            }
            if (e.hasClass("rs-pulse") && null == i._loop_timeline) {
                i._loop_timeline = new punchgs.TimelineLite;
                var p = null == e.data("zoomstart") ? 0 : e.data("zoomstart"),
                    g = null == e.data("zoomend") ? 0 : e.data("zoomend");
                r = null == e.data("speed") ? 2 : e.data("speed"), s = null == e.data("easing") ? punchgs.Power2.easeInOut : e.data("easing");
                i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, {
                    force3D: "auto",
                    scale: p
                }, {
                    scale: g,
                    ease: s
                })), i._loop_timeline.append(new punchgs.TweenLite.fromTo(e, r, {
                    force3D: "auto",
                    scale: g
                }, {
                    scale: p,
                    onComplete: function() {
                        i._loop_timeline.restart()
                    }
                }))
            }
            if (e.hasClass("rs-wave") && null == i._loop_timeline) {
                i._loop_timeline = new punchgs.TimelineLite;
                var u = null == e.data("angle") ? 10 : parseInt(e.data("angle"), 0),
                    f = null == e.data("radius") ? 10 : parseInt(e.data("radius"), 0),
                    h = (r = null == e.data("speed") ? -20 : e.data("speed"), (o = null == e.data("origin") ? "50% 50%" : e.data("origin")).split(" ")),
                    v = new Object;
                h.length >= 1 ? (v.x = h[0], v.y = h[1]) : (v.x = "50%", v.y = "50%");
                var _ = {
                        a: 0,
                        ang: u,
                        element: e,
                        unit: f *= t,
                        xoffset: 0 + (parseInt(v.x, 0) / 100 - .5) * e.width(),
                        yoffset: -1 * f + (parseInt(v.y, 0) / 100 - .5) * e.height()
                    },
                    b = parseInt(u, 0),
                    y = new punchgs.TweenLite.fromTo(_, r, {
                        a: 0 + b
                    }, {
                        a: 360 + b,
                        force3D: "auto",
                        ease: punchgs.Linear.easeNone
                    });
                y.eventCallback("onUpdate", function(e) {
                    var t = e.a * (Math.PI / 180),
                        i = e.yoffset + e.unit * (1 - Math.sin(t)),
                        a = e.xoffset + Math.cos(t) * e.unit;
                    punchgs.TweenLite.to(e.element, .1, {
                        force3D: "auto",
                        x: a,
                        y: i
                    })
                }, [_]), y.eventCallback("onComplete", function(e) {
                    e._loop_timeline.restart()
                }, [i]), i._loop_timeline.append(y)
            }
        },
        I = function(e) {
            e.closest(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function() {
                null != this._loop_timeline && (this._loop_timeline.pause(), this._loop_timeline = null)
            })
        }
}(jQuery);










/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - NAVIGATION
 * @version: 1.3.5 (06.04.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
! function(a) {
    "use strict";
    var b = jQuery.fn.revolution,
        c = b.is_mobile(),
        d = {
            alias: "Navigation Min JS",
            name: "revolution.extensions.navigation.min.js",
            min_core: "5.4.0",
            version: "1.3.5"
        };
    jQuery.extend(!0, b, {
        hideUnHideNav: function(a) {
            var b = a.c.width(),
                c = a.navigation.arrows,
                d = a.navigation.bullets,
                e = a.navigation.thumbnails,
                f = a.navigation.tabs;
            m(c) && y(a.c.find(".tparrows"), c.hide_under, b, c.hide_over), m(d) && y(a.c.find(".tp-bullets"), d.hide_under, b, d.hide_over), m(e) && y(a.c.parent().find(".tp-thumbs"), e.hide_under, b, e.hide_over), m(f) && y(a.c.parent().find(".tp-tabs"), f.hide_under, b, f.hide_over), x(a)
        },
        resizeThumbsTabs: function(a, b) {
            if (a.navigation && a.navigation.tabs.enable || a.navigation && a.navigation.thumbnails.enable) {
                var c = (jQuery(window).width() - 480) / 500,
                    d = new punchgs.TimelineLite,
                    e = a.navigation.tabs,
                    g = a.navigation.thumbnails,
                    h = a.navigation.bullets;
                if (d.pause(), c = c > 1 ? 1 : c < 0 ? 0 : c, m(e) && (b || e.width > e.min_width) && f(c, d, a.c, e, a.slideamount, "tab"), m(g) && (b || g.width > g.min_width) && f(c, d, a.c, g, a.slideamount, "thumb"), m(h) && b) {
                    var i = a.c.find(".tp-bullets");
                    i.find(".tp-bullet").each(function(a) {
                        var b = jQuery(this),
                            c = a + 1,
                            d = b.outerWidth() + parseInt(void 0 === h.space ? 0 : h.space, 0),
                            e = b.outerHeight() + parseInt(void 0 === h.space ? 0 : h.space, 0);
                        "vertical" === h.direction ? (b.css({
                            top: (c - 1) * e + "px",
                            left: "0px"
                        }), i.css({
                            height: (c - 1) * e + b.outerHeight(),
                            width: b.outerWidth()
                        })) : (b.css({
                            left: (c - 1) * d + "px",
                            top: "0px"
                        }), i.css({
                            width: (c - 1) * d + b.outerWidth(),
                            height: b.outerHeight()
                        }))
                    })
                }
                d.play(), x(a)
            }
            return !0
        },
        updateNavIndexes: function(a) {
            function d(a) {
                c.find(a).lenght > 0 && c.find(a).each(function(a) {
                    jQuery(this).data("liindex", a)
                })
            }
            var c = a.c;
            d(".tp-tab"), d(".tp-bullet"), d(".tp-thumb"), b.resizeThumbsTabs(a, !0), b.manageNavigation(a)
        },
        manageNavigation: function(a) {
            var c = b.getHorizontalOffset(a.c.parent(), "left"),
                d = b.getHorizontalOffset(a.c.parent(), "right");
            m(a.navigation.bullets) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.bullets.h_offset_old = void 0 === a.navigation.bullets.h_offset_old ? a.navigation.bullets.h_offset : a.navigation.bullets.h_offset_old, a.navigation.bullets.h_offset = "center" === a.navigation.bullets.h_align ? a.navigation.bullets.h_offset_old + c / 2 - d / 2 : a.navigation.bullets.h_offset_old + c - d), t(a.c.find(".tp-bullets"), a.navigation.bullets, a)), m(a.navigation.thumbnails) && t(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails, a), m(a.navigation.tabs) && t(a.c.parent().find(".tp-tabs"), a.navigation.tabs, a), m(a.navigation.arrows) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.arrows.left.h_offset_old = void 0 === a.navigation.arrows.left.h_offset_old ? a.navigation.arrows.left.h_offset : a.navigation.arrows.left.h_offset_old, a.navigation.arrows.left.h_offset = "right" === a.navigation.arrows.left.h_align ? a.navigation.arrows.left.h_offset_old + d : a.navigation.arrows.left.h_offset_old + c, a.navigation.arrows.right.h_offset_old = void 0 === a.navigation.arrows.right.h_offset_old ? a.navigation.arrows.right.h_offset : a.navigation.arrows.right.h_offset_old, a.navigation.arrows.right.h_offset = "right" === a.navigation.arrows.right.h_align ? a.navigation.arrows.right.h_offset_old + d : a.navigation.arrows.right.h_offset_old + c), t(a.c.find(""), a.navigation.arrows.left, a), t(a.c.find(""), a.navigation.arrows.right, a)), m(a.navigation.thumbnails) && e(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails), m(a.navigation.tabs) && e(a.c.parent().find(".tp-tabs"), a.navigation.tabs)
        },
        createNavigation: function(a, f) {
            if ("stop" === b.compare_version(d).check) return !1;
            var g = a.parent(),
                j = f.navigation.arrows,
                n = f.navigation.bullets,
                r = f.navigation.thumbnails,
                s = f.navigation.tabs,
                t = m(j),
                v = m(n),
                x = m(r),
                y = m(s);
            h(a, f), i(a, f), t && q(a, j, f), f.li.each(function(b) {
                var c = jQuery(f.li[f.li.length - 1 - b]),
                    d = jQuery(this);
                v && (f.navigation.bullets.rtl ? u(a, n, c, f) : u(a, n, d, f)), x && (f.navigation.thumbnails.rtl ? w(a, r, c, "tp-thumb", f) : w(a, r, d, "tp-thumb", f)), y && (f.navigation.tabs.rtl ? w(a, s, c, "tp-tab", f) : w(a, s, d, "tp-tab", f))
            }), a.bind("revolution.slide.onafterswap revolution.nextslide.waiting", function() {
                var b = 0 == a.find(".next-revslide").length ? a.find(".active-revslide").data("index") : a.find(".next-revslide").data("index");
                a.find(".tp-bullet").each(function() {
                    var a = jQuery(this);
                    a.data("liref") === b ? a.addClass("selected") : a.removeClass("selected")
                }), g.find(".tp-thumb, .tp-tab").each(function() {
                    var a = jQuery(this);
                    a.data("liref") === b ? (a.addClass("selected"), a.hasClass("tp-tab") ? e(g.find(".tp-tabs"), s) : e(g.find(".tp-thumbs"), r)) : a.removeClass("selected")
                });
                var c = 0,
                    d = !1;
                f.thumbs && jQuery.each(f.thumbs, function(a, e) {
                    c = !1 === d ? a : c, d = e.id === b || a === b || d
                });
                var h = c > 0 ? c - 1 : f.slideamount - 1,
                    i = c + 1 == f.slideamount ? 0 : c + 1;
                if (!0 === j.enable) {
                    var k = j.tmp;
                    if (void 0 != f.thumbs[h] && jQuery.each(f.thumbs[h].params, function(a, b) {
                            k = k.replace(b.from, b.to)
                        }), j.left.j.html(k), k = j.tmp, i > f.slideamount) return;
                    jQuery.each(f.thumbs[i].params, function(a, b) {
                        k = k.replace(b.from, b.to)
                    }), j.right.j.html(k), j.rtl ? (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[i].src + ")"
                    }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[h].src + ")"
                    })) : (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[h].src + ")"
                    }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[i].src + ")"
                    }))
                }
            }), l(j), l(n), l(r), l(s), g.on("mouseenter mousemove", function() {
                g.hasClass("tp-mouseover") || (g.addClass("tp-mouseover"), punchgs.TweenLite.killDelayedCallsTo(p), t && j.hide_onleave && p(g.find(".tparrows"), j, "show"), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "show"), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "show"), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "show"), c && (g.removeClass("tp-mouseover"), o(a, f)))
            }), g.on("mouseleave", function() {
                g.removeClass("tp-mouseover"), o(a, f)
            }), t && j.hide_onleave && p(g.find(".tparrows"), j, "hide", 0), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "hide", 0), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "hide", 0), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "hide", 0), x && k(g.find(".tp-thumbs"), f), y && k(g.find(".tp-tabs"), f), "carousel" === f.sliderType && k(a, f, !0), ("on" === f.navigation.touch.touchOnDesktop || "on" == f.navigation.touch.touchenabled && c) && k(a, f, "swipebased")
        }
    });
    var e = function(a, b) {
            var d = (a.hasClass("tp-thumbs"), a.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask"),
                e = a.hasClass("tp-thumbs") ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                f = a.hasClass("tp-thumbs") ? ".tp-thumb" : ".tp-tab",
                g = a.find(d),
                h = g.find(e),
                i = b.direction,
                j = "vertical" === i ? g.find(f).first().outerHeight(!0) + b.space : g.find(f).first().outerWidth(!0) + b.space,
                k = "vertical" === i ? g.height() : g.width(),
                l = parseInt(g.find(f + ".selected").data("liindex"), 0),
                m = k / j,
                n = "vertical" === i ? g.height() : g.width(),
                o = 0 - l * j,
                p = "vertical" === i ? h.height() : h.width(),
                q = o < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : o,
                r = h.data("offset");
            m > 2 && (q = o - (r + j) <= 0 ? o - (r + j) < 0 - j ? r : q + j : q, q = o - j + r + k < j && o + (Math.round(m) - 2) * j < r ? o + (Math.round(m) - 2) * j : q), q = q < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : q, "vertical" !== i && g.width() >= h.width() && (q = 0), "vertical" === i && g.height() >= h.height() && (q = 0), a.hasClass("dragged") || ("vertical" === i ? h.data("tmmove", punchgs.TweenLite.to(h, .5, {
                top: q + "px",
                ease: punchgs.Power3.easeInOut
            })) : h.data("tmmove", punchgs.TweenLite.to(h, .5, {
                left: q + "px",
                ease: punchgs.Power3.easeInOut
            })), h.data("offset", q))
        },
        f = function(a, b, c, d, e, f) {
            var g = c.parent().find(".tp-" + f + "s"),
                h = g.find(".tp-" + f + "s-inner-wrapper"),
                i = g.find(".tp-" + f + "-mask"),
                j = d.width * a < d.min_width ? d.min_width : Math.round(d.width * a),
                k = Math.round(j / d.width * d.height),
                l = "vertical" === d.direction ? j : j * e + d.space * (e - 1),
                m = "vertical" === d.direction ? k * e + d.space * (e - 1) : k,
                n = "vertical" === d.direction ? {
                    width: j + "px"
                } : {
                    height: k + "px"
                };
            b.add(punchgs.TweenLite.set(g, n)), b.add(punchgs.TweenLite.set(h, {
                width: l + "px",
                height: m + "px"
            })), b.add(punchgs.TweenLite.set(i, {
                width: l + "px",
                height: m + "px"
            }));
            var o = h.find(".tp-" + f);
            return o && jQuery.each(o, function(a, c) {
                "vertical" === d.direction ? b.add(punchgs.TweenLite.set(c, {
                    top: a * (k + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px"
                })) : "horizontal" === d.direction && b.add(punchgs.TweenLite.set(c, {
                    left: a * (j + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px"
                }))
            }), b
        },
        g = function(a) {
            var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 1,
                g = 1,
                h = 1;
            return "detail" in a && (c = a.detail), "wheelDelta" in a && (c = -a.wheelDelta / 120), "wheelDeltaY" in a && (c = -a.wheelDeltaY / 120), "wheelDeltaX" in a && (b = -a.wheelDeltaX / 120), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (b = c, c = 0), d = b * f, e = c * f, "deltaY" in a && (e = a.deltaY), "deltaX" in a && (d = a.deltaX), (d || e) && a.deltaMode && (1 == a.deltaMode ? (d *= g, e *= g) : (d *= h, e *= h)), d && !b && (b = d < 1 ? -1 : 1), e && !c && (c = e < 1 ? -1 : 1), e = navigator.userAgent.match(/mozilla/i) ? 10 * e : e, (e > 300 || e < -300) && (e /= 10), {
                spinX: b,
                spinY: c,
                pixelX: d,
                pixelY: e
            }
        },
        h = function(a, c) {
            "on" === c.navigation.keyboardNavigation && jQuery(document).keydown(function(d) {
                ("horizontal" == c.navigation.keyboard_direction && 39 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 40 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), ("horizontal" == c.navigation.keyboard_direction && 37 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 38 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 1, b.callingNewSlide(a, -1))
            })
        },
        i = function(a, c) {
            if ("on" === c.navigation.mouseScrollNavigation || "carousel" === c.navigation.mouseScrollNavigation) {
                c.isIEEleven = !!navigator.userAgent.match(/Trident.*rv\:11\./), c.isSafari = !!navigator.userAgent.match(/safari/i), c.ischrome = !!navigator.userAgent.match(/chrome/i);
                var d = c.ischrome ? -49 : c.isIEEleven || c.isSafari ? -9 : navigator.userAgent.match(/mozilla/i) ? -29 : -49,
                    e = c.ischrome ? 49 : c.isIEEleven || c.isSafari ? 9 : navigator.userAgent.match(/mozilla/i) ? 29 : 49;
                a.on("mousewheel DOMMouseScroll", function(f) {
                    var h = g(f.originalEvent),
                        i = a.find(".tp-revslider-slidesli.active-revslide").index(),
                        j = a.find(".tp-revslider-slidesli.processing-revslide").index(),
                        k = -1 != i && 0 == i || -1 != j && 0 == j,
                        l = -1 != i && i == c.slideamount - 1 || 1 != j && j == c.slideamount - 1,
                        m = !0;
                    "carousel" == c.navigation.mouseScrollNavigation && (k = l = !1), -1 == j ? h.pixelY < d ? (k || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1), l || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1)) : h.pixelY > e && (l || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1), k || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1)) : m = !1;
                    var n = c.c.offset().top - jQuery("body").scrollTop(),
                        o = n + c.c.height();
                    return "carousel" != c.navigation.mouseScrollNavigation ? ("reverse" !== c.navigation.mouseScrollReverse && (n > 0 && h.pixelY > 0 || o < jQuery(window).height() && h.pixelY < 0) && (m = !0), "reverse" === c.navigation.mouseScrollReverse && (n < 0 && h.pixelY < 0 || o > jQuery(window).height() && h.pixelY > 0) && (m = !0)) : m = !1, 0 == m ? (f.preventDefault(f), !1) : void 0
                })
            }
        },
        j = function(a, b, d) {
            return a = c ? jQuery(d.target).closest("." + a).length || jQuery(d.srcElement).closest("." + a).length : jQuery(d.toElement).closest("." + a).length || jQuery(d.originalTarget).closest("." + a).length, !0 === a || 1 === a ? 1 : 0
        },
        k = function(a, d, e) {
            var f = d.carousel;
            jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"), f.Limit = "endless";
            var h = (c || b.get_browser(), a),
                i = "vertical" === d.navigation.thumbnails.direction || "vertical" === d.navigation.tabs.direction ? "none" : "vertical",
                k = d.navigation.touch.swipe_direction || "horizontal";
            i = "swipebased" == e && "vertical" == k ? "none" : e ? "vertical" : i, jQuery.fn.swipetp || (jQuery.fn.swipetp = jQuery.fn.swipe), jQuery.fn.swipetp.defaults && jQuery.fn.swipetp.defaults.excludedElements || jQuery.fn.swipetp.defaults || (jQuery.fn.swipetp.defaults = new Object), jQuery.fn.swipetp.defaults.excludedElements = "label, button, input, select, textarea, .noSwipe", h.swipetp({
                allowPageScroll: i,
                triggerOnTouchLeave: !0,
                treshold: d.navigation.touch.swipe_treshold,
                fingers: d.navigation.touch.swipe_min_touches,
                excludeElements: jQuery.fn.swipetp.defaults.excludedElements,
                swipeStatus: function(e, g, h, i, l, m, n) {
                    var o = j("rev_slider_wrapper", a, e),
                        p = j("tp-thumbs", a, e),
                        q = j("tp-tabs", a, e),
                        r = jQuery(this).attr("class"),
                        s = !!r.match(/tp-tabs|tp-thumb/gi);
                    if ("carousel" === d.sliderType && (("move" === g || "end" === g || "cancel" == g) && d.dragStartedOverSlider && !d.dragStartedOverThumbs && !d.dragStartedOverTabs || "start" === g && o > 0 && 0 === p && 0 === q)) {
                        if (c && ("up" === h || "down" === h)) return;
                        switch (d.dragStartedOverSlider = !0, i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i), g) {
                            case "start":
                                void 0 !== f.positionanim && (f.positionanim.kill(), f.slide_globaloffset = "off" === f.infinity ? f.slide_offset : b.simp(f.slide_offset, f.maxwidth)), f.overpull = "none", f.wrap.addClass("dragged");
                                break;
                            case "move":
                                if (d.c.find(".tp-withaction").addClass("tp-temporarydisabled"), f.slide_offset = "off" === f.infinity ? f.slide_globaloffset + i : b.simp(f.slide_globaloffset + i, f.maxwidth), "off" === f.infinity) {
                                    var t = "center" === f.horizontal_align ? (f.wrapwidth / 2 - f.slide_width / 2 - f.slide_offset) / f.slide_width : (0 - f.slide_offset) / f.slide_width;
                                    "none" !== f.overpull && 0 !== f.overpull || !(t < 0 || t > d.slideamount - 1) ? t >= 0 && t <= d.slideamount - 1 && (t >= 0 && i > f.overpull || t <= d.slideamount - 1 && i < f.overpull) && (f.overpull = 0) : f.overpull = i, f.slide_offset = t < 0 ? f.slide_offset + (f.overpull - i) / 1.1 + Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : t > d.slideamount - 1 ? f.slide_offset + (f.overpull - i) / 1.1 - Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : f.slide_offset
                                }
                                b.organiseCarousel(d, h, !0, !0);
                                break;
                            case "end":
                            case "cancel":
                                f.slide_globaloffset = f.slide_offset, f.wrap.removeClass("dragged"), b.carouselToEvalPosition(d, h), d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, setTimeout(function() {
                                    d.c.find(".tp-withaction").removeClass("tp-temporarydisabled")
                                }, 19)
                        }
                    } else {
                        if (("move" !== g && "end" !== g && "cancel" != g || d.dragStartedOverSlider || !d.dragStartedOverThumbs && !d.dragStartedOverTabs) && !("start" === g && o > 0 && (p > 0 || q > 0))) {
                            if ("end" == g && !s) {
                                if (d.sc_indicator = "arrow", "horizontal" == k && "left" == h || "vertical" == k && "up" == h) return d.sc_indicator_dir = 0, b.callingNewSlide(d.c, 1), !1;
                                if ("horizontal" == k && "right" == h || "vertical" == k && "down" == h) return d.sc_indicator_dir = 1, b.callingNewSlide(d.c, -1), !1
                            }
                            return d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, !0
                        }
                        p > 0 && (d.dragStartedOverThumbs = !0), q > 0 && (d.dragStartedOverTabs = !0);
                        var u = d.dragStartedOverThumbs ? ".tp-thumbs" : ".tp-tabs",
                            v = d.dragStartedOverThumbs ? ".tp-thumb-mask" : ".tp-tab-mask",
                            w = d.dragStartedOverThumbs ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                            x = d.dragStartedOverThumbs ? ".tp-thumb" : ".tp-tab",
                            y = d.dragStartedOverThumbs ? d.navigation.thumbnails : d.navigation.tabs;
                        i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i);
                        var z = a.parent().find(v),
                            A = z.find(w),
                            B = y.direction,
                            C = "vertical" === B ? A.height() : A.width(),
                            D = "vertical" === B ? z.height() : z.width(),
                            E = "vertical" === B ? z.find(x).first().outerHeight(!0) + y.space : z.find(x).first().outerWidth(!0) + y.space,
                            F = void 0 === A.data("offset") ? 0 : parseInt(A.data("offset"), 0),
                            G = 0;
                        switch (g) {
                            case "start":
                                a.parent().find(u).addClass("dragged"), F = "vertical" === B ? A.position().top : A.position().left, A.data("offset", F), A.data("tmmove") && A.data("tmmove").pause();
                                break;
                            case "move":
                                if (C <= D) return !1;
                                G = F + i, G = G > 0 ? "horizontal" === B ? G - A.width() * (G / A.width() * G / A.width()) : G - A.height() * (G / A.height() * G / A.height()) : G;
                                var H = "vertical" === B ? 0 - (A.height() - z.height()) : 0 - (A.width() - z.width());
                                G = G < H ? "horizontal" === B ? G + A.width() * (G - H) / A.width() * (G - H) / A.width() : G + A.height() * (G - H) / A.height() * (G - H) / A.height() : G, "vertical" === B ? punchgs.TweenLite.set(A, {
                                    top: G + "px"
                                }) : punchgs.TweenLite.set(A, {
                                    left: G + "px"
                                });
                                break;
                            case "end":
                            case "cancel":
                                if (s) return G = F + i, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, G = Math.abs(i) > E / 10 ? i <= 0 ? Math.floor(G / E) * E : Math.ceil(G / E) * E : i < 0 ? Math.ceil(G / E) * E : Math.floor(G / E) * E, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, "vertical" === B ? punchgs.TweenLite.to(A, .5, {
                                    top: G + "px",
                                    ease: punchgs.Power3.easeOut
                                }) : punchgs.TweenLite.to(A, .5, {
                                    left: G + "px",
                                    ease: punchgs.Power3.easeOut
                                }), G = G || ("vertical" === B ? A.position().top : A.position().left), A.data("offset", G), A.data("distance", i), setTimeout(function() {
                                    d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1
                                }, 100), a.parent().find(u).removeClass("dragged"), !1
                        }
                    }
                }
            })
        },
        l = function(a) {
            a.hide_delay = jQuery.isNumeric(parseInt(a.hide_delay, 0)) ? a.hide_delay / 1e3 : .2, a.hide_delay_mobile = jQuery.isNumeric(parseInt(a.hide_delay_mobile, 0)) ? a.hide_delay_mobile / 1e3 : .2
        },
        m = function(a) {
            return a && a.enable
        },
        n = function(a) {
            return a && a.enable && !0 === a.hide_onleave && (void 0 === a.position || !a.position.match(/outer/g))
        },
        o = function(a, b) {
            var d = a.parent();
            n(b.navigation.arrows) && punchgs.TweenLite.delayedCall(c ? b.navigation.arrows.hide_delay_mobile : b.navigation.arrows.hide_delay, p, [d.find(".tparrows"), b.navigation.arrows, "hide"]), n(b.navigation.bullets) && punchgs.TweenLite.delayedCall(c ? b.navigation.bullets.hide_delay_mobile : b.navigation.bullets.hide_delay, p, [d.find(".tp-bullets"), b.navigation.bullets, "hide"]), n(b.navigation.thumbnails) && punchgs.TweenLite.delayedCall(c ? b.navigation.thumbnails.hide_delay_mobile : b.navigation.thumbnails.hide_delay, p, [d.find(".tp-thumbs"), b.navigation.thumbnails, "hide"]), n(b.navigation.tabs) && punchgs.TweenLite.delayedCall(c ? b.navigation.tabs.hide_delay_mobile : b.navigation.tabs.hide_delay, p, [d.find(".tp-tabs"), b.navigation.tabs, "hide"])
        },
        p = function(a, b, c, d) {
            switch (d = void 0 === d ? .5 : d, c) {
                case "show":
                    punchgs.TweenLite.to(a, d, {
                        autoAlpha: 1,
                        ease: punchgs.Power3.easeInOut,
                        overwrite: "auto"
                    });
                    break;
                case "hide":
                    punchgs.TweenLite.to(a, d, {
                        autoAlpha: 0,
                        ease: punchgs.Power3.easeInOu,
                        overwrite: "auto"
                    })
            }
        },
        q = function(a, b, c) {
            b.style = void 0 === b.style ? "" : b.style, b.left.style = void 0 === b.left.style ? "" : b.left.style, b.right.style = void 0 === b.right.style ? "" : b.right.style, 0 === a.find(".tp-leftarrow.tparrows").length && a.append('<div class="tp-leftarrow tparrows ' + b.style + " " + b.left.style + '">' + b.tmp + "</div>"), 0 === a.find(".tp-rightarrow.tparrows").length && a.append('<div class="tp-rightarrow tparrows ' + b.style + " " + b.right.style + '">' + b.tmp + "</div>");
            var d = a.find(".tp-leftarrow.tparrows"),
                e = a.find(".tp-rightarrow.tparrows");
            b.rtl ? (d.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext()
            }), e.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev()
            })) : (e.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext()
            }), d.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev()
            })), b.right.j = a.find(".tp-rightarrow.tparrows"), b.left.j = a.find(".tp-leftarrow.tparrows"), b.padding_top = parseInt(c.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(c.carousel.padding_bottom || 0, 0), t(d, b.left, c), t(e, b.right, c), b.left.opt = c, b.right.opt = c, "outer-left" != b.position && "outer-right" != b.position || (c.outernav = !0)
        },
        r = function(a, b, c) {
            var d = a.outerHeight(!0),
                f = (a.outerWidth(!0), void 0 == b.opt ? 0 : 0 == c.conh ? c.height : c.conh),
                g = "layergrid" == b.container ? "fullscreen" == c.sliderLayout ? c.height / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : "on" == c.autoHeight || void 0 != c.minHeight && c.minHeight > 0 ? f / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : 0 : 0,
                h = "top" === b.v_align ? {
                    top: "0px",
                    y: Math.round(b.v_offset + g) + "px"
                } : "center" === b.v_align ? {
                    top: "50%",
                    y: Math.round(0 - d / 2 + b.v_offset) + "px"
                } : {
                    top: "100%",
                    y: Math.round(0 - (d + b.v_offset + g)) + "px"
                };
            a.hasClass("outer-bottom") || punchgs.TweenLite.set(a, h)
        },
        s = function(a, b, c) {
            var e = (a.outerHeight(!0), a.outerWidth(!0)),
                f = "layergrid" == b.container ? "carousel" === c.sliderType ? 0 : c.width / 2 - c.gridwidth[c.curWinRange] * c.bw / 2 : 0,
                g = "left" === b.h_align ? {
                    left: "0px",
                    x: Math.round(b.h_offset + f) + "px"
                } : "center" === b.h_align ? {
                    left: "50%",
                    x: Math.round(0 - e / 2 + b.h_offset) + "px"
                } : {
                    left: "100%",
                    x: Math.round(0 - (e + b.h_offset + f)) + "px"
                };
            punchgs.TweenLite.set(a, g)
        },
        t = function(a, b, c) {
            var d = a.closest(".tp-simpleresponsive").length > 0 ? a.closest(".tp-simpleresponsive") : a.closest(".tp-revslider-mainul").length > 0 ? a.closest(".tp-revslider-mainul") : a.closest(".rev_slider_wrapper").length > 0 ? a.closest(".rev_slider_wrapper") : a.parent().find(".tp-revslider-mainul"),
                e = d.width(),
                f = d.height();
            if (r(a, b, c), s(a, b, c), "outer-left" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout ? "outer-right" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout || punchgs.TweenLite.set(a, {
                    right: 0 - a.outerWidth() + "px",
                    x: b.h_offset + "px"
                }) : punchgs.TweenLite.set(a, {
                    left: 0 - a.outerWidth() + "px",
                    x: b.h_offset + "px"
                }), a.hasClass("tp-thumbs") || a.hasClass("tp-tabs")) {
                var g = a.data("wr_padding"),
                    h = a.data("maxw"),
                    i = a.data("maxh"),
                    j = a.hasClass("tp-thumbs") ? a.find(".tp-thumb-mask") : a.find(".tp-tab-mask"),
                    k = parseInt(b.padding_top || 0, 0),
                    l = parseInt(b.padding_bottom || 0, 0);
                h > e && "outer-left" !== b.position && "outer-right" !== b.position ? (punchgs.TweenLite.set(a, {
                    left: "0px",
                    x: 0,
                    maxWidth: e - 2 * g + "px"
                }), punchgs.TweenLite.set(j, {
                    maxWidth: e - 2 * g + "px"
                })) : (punchgs.TweenLite.set(a, {
                    maxWidth: h + "px"
                }), punchgs.TweenLite.set(j, {
                    maxWidth: h + "px"
                })), i + 2 * g > f && "outer-bottom" !== b.position && "outer-top" !== b.position ? (punchgs.TweenLite.set(a, {
                    top: "0px",
                    y: 0,
                    maxHeight: k + l + (f - 2 * g) + "px"
                }), punchgs.TweenLite.set(j, {
                    maxHeight: k + l + (f - 2 * g) + "px"
                })) : (punchgs.TweenLite.set(a, {
                    maxHeight: i + "px"
                }), punchgs.TweenLite.set(j, {
                    maxHeight: i + "px"
                })), "outer-left" !== b.position && "outer-right" !== b.position && (k = 0, l = 0), !0 === b.span && "vertical" === b.direction ? (punchgs.TweenLite.set(a, {
                    maxHeight: k + l + (f - 2 * g) + "px",
                    height: k + l + (f - 2 * g) + "px",
                    top: 0 - k,
                    y: 0
                }), r(j, b, c)) : !0 === b.span && "horizontal" === b.direction && (punchgs.TweenLite.set(a, {
                    maxWidth: "100%",
                    width: e - 2 * g + "px",
                    left: 0,
                    x: 0
                }), s(j, b, c))
            }
        },
        u = function(a, b, c, d) {
            0 === a.find(".tp-bullets").length && (b.style = void 0 === b.style ? "" : b.style, a.append('<div class="tp-bullets ' + b.style + " " + b.direction + '"></div>'));
            var e = a.find(".tp-bullets"),
                f = c.data("index"),
                g = b.tmp;
            jQuery.each(d.thumbs[c.index()].params, function(a, b) {
                g = g.replace(b.from, b.to)
            }), e.append('<div class="justaddedbullet tp-bullet">' + g + "</div>");
            var h = a.find(".justaddedbullet"),
                i = a.find(".tp-bullet").length,
                j = h.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
                k = h.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
            "vertical" === b.direction ? (h.css({
                top: (i - 1) * k + "px",
                left: "0px"
            }), e.css({
                height: (i - 1) * k + h.outerHeight(),
                width: h.outerWidth()
            })) : (h.css({
                left: (i - 1) * j + "px",
                top: "0px"
            }), e.css({
                width: (i - 1) * j + h.outerWidth(),
                height: h.outerHeight()
            })), h.find(".tp-bullet-image").css({
                backgroundImage: "url(" + d.thumbs[c.index()].src + ")"
            }), h.data("liref", f), h.click(function() {
                d.sc_indicator = "bullet", a.revcallslidewithid(f), a.find(".tp-bullet").removeClass("selected"), jQuery(this).addClass("selected")
            }), h.removeClass("justaddedbullet"), b.padding_top = parseInt(d.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(d.carousel.padding_bottom || 0, 0), b.opt = d, "outer-left" != b.position && "outer-right" != b.position || (d.outernav = !0), e.addClass("nav-pos-hor-" + b.h_align), e.addClass("nav-pos-ver-" + b.v_align), e.addClass("nav-dir-" + b.direction), t(e, b, d)
        },
        w = function(a, b, c, d, e) {
            var f = "tp-thumb" === d ? ".tp-thumbs" : ".tp-tabs",
                g = "tp-thumb" === d ? ".tp-thumb-mask" : ".tp-tab-mask",
                h = "tp-thumb" === d ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                i = "tp-thumb" === d ? ".tp-thumb" : ".tp-tab",
                j = "tp-thumb" === d ? ".tp-thumb-image" : ".tp-tab-image";
            if (b.visibleAmount = b.visibleAmount > e.slideamount ? e.slideamount : b.visibleAmount, b.sliderLayout = e.sliderLayout, 0 === a.parent().find(f).length) {
                b.style = void 0 === b.style ? "" : b.style;
                var k = !0 === b.span ? "tp-span-wrapper" : "",
                    l = '<div class="' + d + "s " + k + " " + b.position + " " + b.style + '"><div class="' + d + '-mask"><div class="' + d + 's-inner-wrapper" style="position:relative;"></div></div></div>';
                "outer-top" === b.position ? a.parent().prepend(l) : "outer-bottom" === b.position ? a.after(l) : a.append(l), b.padding_top = parseInt(e.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(e.carousel.padding_bottom || 0, 0), "outer-left" != b.position && "outer-right" != b.position || (e.outernav = !0)
            }
            var m = c.data("index"),
                n = a.parent().find(f),
                o = n.find(g),
                p = o.find(h),
                q = "horizontal" === b.direction ? b.width * b.visibleAmount + b.space * (b.visibleAmount - 1) : b.width,
                r = "horizontal" === b.direction ? b.height : b.height * b.visibleAmount + b.space * (b.visibleAmount - 1),
                s = b.tmp;
            jQuery.each(e.thumbs[c.index()].params, function(a, b) {
                s = s.replace(b.from, b.to)
            }), p.append('<div data-liindex="' + c.index() + '" data-liref="' + m + '" class="justaddedthumb ' + d + '" style="width:' + b.width + "px;height:" + b.height + 'px;">' + s + "</div>");
            var u = n.find(".justaddedthumb"),
                v = n.find(i).length,
                w = u.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
                x = u.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
            u.find(j).css({
                backgroundImage: "url(" + e.thumbs[c.index()].src + ")"
            }), "vertical" === b.direction ? (u.css({
                top: (v - 1) * x + "px",
                left: "0px"
            }), p.css({
                height: (v - 1) * x + u.outerHeight(),
                width: u.outerWidth()
            })) : (u.css({
                left: (v - 1) * w + "px",
                top: "0px"
            }), p.css({
                width: (v - 1) * w + u.outerWidth(),
                height: u.outerHeight()
            })), n.data("maxw", q), n.data("maxh", r), n.data("wr_padding", b.wrapper_padding);
            var y = "outer-top" === b.position || "outer-bottom" === b.position ? "relative" : "absolute";
            "outer-top" !== b.position && "outer-bottom" !== b.position || b.h_align;
            o.css({
                maxWidth: q + "px",
                maxHeight: r + "px",
                overflow: "hidden",
                position: "relative"
            }), n.css({
                maxWidth: q + "px",
                maxHeight: r + "px",
                overflow: "visible",
                position: y,
                background: b.wrapper_color,
                padding: b.wrapper_padding + "px",
                boxSizing: "contet-box"
            }), u.click(function() {
                e.sc_indicator = "bullet";
                var b = a.parent().find(h).data("distance");
                b = void 0 === b ? 0 : b, Math.abs(b) < 10 && (a.revcallslidewithid(m), a.parent().find(f).removeClass("selected"), jQuery(this).addClass("selected"))
            }), u.removeClass("justaddedthumb"), b.opt = e, n.addClass("nav-pos-hor-" + b.h_align), n.addClass("nav-pos-ver-" + b.v_align), n.addClass("nav-dir-" + b.direction), t(n, b, e)
        },
        x = function(a) {
            var b = a.c.parent().find(".outer-top"),
                c = a.c.parent().find(".outer-bottom");
            a.top_outer = b.hasClass("tp-forcenotvisible") ? 0 : b.outerHeight() || 0, a.bottom_outer = c.hasClass("tp-forcenotvisible") ? 0 : c.outerHeight() || 0
        },
        y = function(a, b, c, d) {
            b > c || c > d ? a.addClass("tp-forcenotvisible") : a.removeClass("tp-forcenotvisible")
        }
}(jQuery);









/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - NAVIGATION
 * @version: 1.3.5 (06.04.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
! function(a) {
    "use strict";
    var b = jQuery.fn.revolution,
        c = b.is_mobile(),
        d = {
            alias: "Navigation Min JS",
            name: "revolution.extensions.navigation.min.js",
            min_core: "5.4.0",
            version: "1.3.5"
        };
    jQuery.extend(!0, b, {
        hideUnHideNav: function(a) {
            var b = a.c.width(),
                c = a.navigation.arrows,
                d = a.navigation.bullets,
                e = a.navigation.thumbnails,
                f = a.navigation.tabs;
            m(c) && y(a.c.find(".tparrows"), c.hide_under, b, c.hide_over), m(d) && y(a.c.find(".tp-bullets"), d.hide_under, b, d.hide_over), m(e) && y(a.c.parent().find(".tp-thumbs"), e.hide_under, b, e.hide_over), m(f) && y(a.c.parent().find(".tp-tabs"), f.hide_under, b, f.hide_over), x(a)
        },
        resizeThumbsTabs: function(a, b) {
            if (a.navigation && a.navigation.tabs.enable || a.navigation && a.navigation.thumbnails.enable) {
                var c = (jQuery(window).width() - 480) / 500,
                    d = new punchgs.TimelineLite,
                    e = a.navigation.tabs,
                    g = a.navigation.thumbnails,
                    h = a.navigation.bullets;
                if (d.pause(), c = c > 1 ? 1 : c < 0 ? 0 : c, m(e) && (b || e.width > e.min_width) && f(c, d, a.c, e, a.slideamount, "tab"), m(g) && (b || g.width > g.min_width) && f(c, d, a.c, g, a.slideamount, "thumb"), m(h) && b) {
                    var i = a.c.find(".tp-bullets");
                    i.find(".tp-bullet").each(function(a) {
                        var b = jQuery(this),
                            c = a + 1,
                            d = b.outerWidth() + parseInt(void 0 === h.space ? 0 : h.space, 0),
                            e = b.outerHeight() + parseInt(void 0 === h.space ? 0 : h.space, 0);
                        "vertical" === h.direction ? (b.css({
                            top: (c - 1) * e + "px",
                            left: "0px"
                        }), i.css({
                            height: (c - 1) * e + b.outerHeight(),
                            width: b.outerWidth()
                        })) : (b.css({
                            left: (c - 1) * d + "px",
                            top: "0px"
                        }), i.css({
                            width: (c - 1) * d + b.outerWidth(),
                            height: b.outerHeight()
                        }))
                    })
                }
                d.play(), x(a)
            }
            return !0
        },
        updateNavIndexes: function(a) {
            function d(a) {
                c.find(a).lenght > 0 && c.find(a).each(function(a) {
                    jQuery(this).data("liindex", a)
                })
            }
            var c = a.c;
            d(".tp-tab"), d(".tp-bullet"), d(".tp-thumb"), b.resizeThumbsTabs(a, !0), b.manageNavigation(a)
        },
        manageNavigation: function(a) {
            var c = b.getHorizontalOffset(a.c.parent(), "left"),
                d = b.getHorizontalOffset(a.c.parent(), "right");
            m(a.navigation.bullets) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.bullets.h_offset_old = void 0 === a.navigation.bullets.h_offset_old ? a.navigation.bullets.h_offset : a.navigation.bullets.h_offset_old, a.navigation.bullets.h_offset = "center" === a.navigation.bullets.h_align ? a.navigation.bullets.h_offset_old + c / 2 - d / 2 : a.navigation.bullets.h_offset_old + c - d), t(a.c.find(".tp-bullets"), a.navigation.bullets, a)), m(a.navigation.thumbnails) && t(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails, a), m(a.navigation.tabs) && t(a.c.parent().find(".tp-tabs"), a.navigation.tabs, a), m(a.navigation.arrows) && ("fullscreen" != a.sliderLayout && "fullwidth" != a.sliderLayout && (a.navigation.arrows.left.h_offset_old = void 0 === a.navigation.arrows.left.h_offset_old ? a.navigation.arrows.left.h_offset : a.navigation.arrows.left.h_offset_old, a.navigation.arrows.left.h_offset = "right" === a.navigation.arrows.left.h_align ? a.navigation.arrows.left.h_offset_old + d : a.navigation.arrows.left.h_offset_old + c, a.navigation.arrows.right.h_offset_old = void 0 === a.navigation.arrows.right.h_offset_old ? a.navigation.arrows.right.h_offset : a.navigation.arrows.right.h_offset_old, a.navigation.arrows.right.h_offset = "right" === a.navigation.arrows.right.h_align ? a.navigation.arrows.right.h_offset_old + d : a.navigation.arrows.right.h_offset_old + c), t(a.c.find(".tp-leftarrow.tparrows"), a.navigation.arrows.left, a), t(a.c.find(".tp-rightarrow.tparrows"), a.navigation.arrows.right, a)), m(a.navigation.thumbnails) && e(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails), m(a.navigation.tabs) && e(a.c.parent().find(".tp-tabs"), a.navigation.tabs)
        },
        createNavigation: function(a, f) {
            if ("stop" === b.compare_version(d).check) return !1;
            var g = a.parent(),
                j = f.navigation.arrows,
                n = f.navigation.bullets,
                r = f.navigation.thumbnails,
                s = f.navigation.tabs,
                t = m(j),
                v = m(n),
                x = m(r),
                y = m(s);
            h(a, f), i(a, f), t && q(a, j, f), f.li.each(function(b) {
                var c = jQuery(f.li[f.li.length - 1 - b]),
                    d = jQuery(this);
                v && (f.navigation.bullets.rtl ? u(a, n, c, f) : u(a, n, d, f)), x && (f.navigation.thumbnails.rtl ? w(a, r, c, "tp-thumb", f) : w(a, r, d, "tp-thumb", f)), y && (f.navigation.tabs.rtl ? w(a, s, c, "tp-tab", f) : w(a, s, d, "tp-tab", f))
            }), a.bind("revolution.slide.onafterswap revolution.nextslide.waiting", function() {
                var b = 0 == a.find(".next-revslide").length ? a.find(".active-revslide").data("index") : a.find(".next-revslide").data("index");
                a.find(".tp-bullet").each(function() {
                    var a = jQuery(this);
                    a.data("liref") === b ? a.addClass("selected") : a.removeClass("selected")
                }), g.find(".tp-thumb, .tp-tab").each(function() {
                    var a = jQuery(this);
                    a.data("liref") === b ? (a.addClass("selected"), a.hasClass("tp-tab") ? e(g.find(".tp-tabs"), s) : e(g.find(".tp-thumbs"), r)) : a.removeClass("selected")
                });
                var c = 0,
                    d = !1;
                f.thumbs && jQuery.each(f.thumbs, function(a, e) {
                    c = !1 === d ? a : c, d = e.id === b || a === b || d
                });
                var h = c > 0 ? c - 1 : f.slideamount - 1,
                    i = c + 1 == f.slideamount ? 0 : c + 1;
                if (!0 === j.enable) {
                    var k = j.tmp;
                    if (void 0 != f.thumbs[h] && jQuery.each(f.thumbs[h].params, function(a, b) {
                            k = k.replace(b.from, b.to)
                        }), j.left.j.html(k), k = j.tmp, i > f.slideamount) return;
                    jQuery.each(f.thumbs[i].params, function(a, b) {
                        k = k.replace(b.from, b.to)
                    }), j.right.j.html(k), j.rtl ? (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[i].src + ")"
                    }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[h].src + ")"
                    })) : (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[h].src + ")"
                    }), punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                        backgroundImage: "url(" + f.thumbs[i].src + ")"
                    }))
                }
            }), l(j), l(n), l(r), l(s), g.on("mouseenter mousemove", function() {
                g.hasClass("tp-mouseover") || (g.addClass("tp-mouseover"), punchgs.TweenLite.killDelayedCallsTo(p), t && j.hide_onleave && p(g.find(".tparrows"), j, "show"), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "show"), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "show"), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "show"), c && (g.removeClass("tp-mouseover"), o(a, f)))
            }), g.on("mouseleave", function() {
                g.removeClass("tp-mouseover"), o(a, f)
            }), t && j.hide_onleave && p(g.find(".tparrows"), j, "hide", 0), v && n.hide_onleave && p(g.find(".tp-bullets"), n, "hide", 0), x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "hide", 0), y && s.hide_onleave && p(g.find(".tp-tabs"), s, "hide", 0), x && k(g.find(".tp-thumbs"), f), y && k(g.find(".tp-tabs"), f), "carousel" === f.sliderType && k(a, f, !0), ("on" === f.navigation.touch.touchOnDesktop || "on" == f.navigation.touch.touchenabled && c) && k(a, f, "swipebased")
        }
    });
    var e = function(a, b) {
            var d = (a.hasClass("tp-thumbs"), a.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask"),
                e = a.hasClass("tp-thumbs") ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                f = a.hasClass("tp-thumbs") ? ".tp-thumb" : ".tp-tab",
                g = a.find(d),
                h = g.find(e),
                i = b.direction,
                j = "vertical" === i ? g.find(f).first().outerHeight(!0) + b.space : g.find(f).first().outerWidth(!0) + b.space,
                k = "vertical" === i ? g.height() : g.width(),
                l = parseInt(g.find(f + ".selected").data("liindex"), 0),
                m = k / j,
                n = "vertical" === i ? g.height() : g.width(),
                o = 0 - l * j,
                p = "vertical" === i ? h.height() : h.width(),
                q = o < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : o,
                r = h.data("offset");
            m > 2 && (q = o - (r + j) <= 0 ? o - (r + j) < 0 - j ? r : q + j : q, q = o - j + r + k < j && o + (Math.round(m) - 2) * j < r ? o + (Math.round(m) - 2) * j : q), q = q < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : q, "vertical" !== i && g.width() >= h.width() && (q = 0), "vertical" === i && g.height() >= h.height() && (q = 0), a.hasClass("dragged") || ("vertical" === i ? h.data("tmmove", punchgs.TweenLite.to(h, .5, {
                top: q + "px",
                ease: punchgs.Power3.easeInOut
            })) : h.data("tmmove", punchgs.TweenLite.to(h, .5, {
                left: q + "px",
                ease: punchgs.Power3.easeInOut
            })), h.data("offset", q))
        },
        f = function(a, b, c, d, e, f) {
            var g = c.parent().find(".tp-" + f + "s"),
                h = g.find(".tp-" + f + "s-inner-wrapper"),
                i = g.find(".tp-" + f + "-mask"),
                j = d.width * a < d.min_width ? d.min_width : Math.round(d.width * a),
                k = Math.round(j / d.width * d.height),
                l = "vertical" === d.direction ? j : j * e + d.space * (e - 1),
                m = "vertical" === d.direction ? k * e + d.space * (e - 1) : k,
                n = "vertical" === d.direction ? {
                    width: j + "px"
                } : {
                    height: k + "px"
                };
            b.add(punchgs.TweenLite.set(g, n)), b.add(punchgs.TweenLite.set(h, {
                width: l + "px",
                height: m + "px"
            })), b.add(punchgs.TweenLite.set(i, {
                width: l + "px",
                height: m + "px"
            }));
            var o = h.find(".tp-" + f);
            return o && jQuery.each(o, function(a, c) {
                "vertical" === d.direction ? b.add(punchgs.TweenLite.set(c, {
                    top: a * (k + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px"
                })) : "horizontal" === d.direction && b.add(punchgs.TweenLite.set(c, {
                    left: a * (j + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px"
                }))
            }), b
        },
        g = function(a) {
            var b = 0,
                c = 0,
                d = 0,
                e = 0,
                f = 1,
                g = 1,
                h = 1;
            return "detail" in a && (c = a.detail), "wheelDelta" in a && (c = -a.wheelDelta / 120), "wheelDeltaY" in a && (c = -a.wheelDeltaY / 120), "wheelDeltaX" in a && (b = -a.wheelDeltaX / 120), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (b = c, c = 0), d = b * f, e = c * f, "deltaY" in a && (e = a.deltaY), "deltaX" in a && (d = a.deltaX), (d || e) && a.deltaMode && (1 == a.deltaMode ? (d *= g, e *= g) : (d *= h, e *= h)), d && !b && (b = d < 1 ? -1 : 1), e && !c && (c = e < 1 ? -1 : 1), e = navigator.userAgent.match(/mozilla/i) ? 10 * e : e, (e > 300 || e < -300) && (e /= 10), {
                spinX: b,
                spinY: c,
                pixelX: d,
                pixelY: e
            }
        },
        h = function(a, c) {
            "on" === c.navigation.keyboardNavigation && jQuery(document).keydown(function(d) {
                ("horizontal" == c.navigation.keyboard_direction && 39 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 40 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), ("horizontal" == c.navigation.keyboard_direction && 37 == d.keyCode || "vertical" == c.navigation.keyboard_direction && 38 == d.keyCode) && (c.sc_indicator = "arrow", c.sc_indicator_dir = 1, b.callingNewSlide(a, -1))
            })
        },
        i = function(a, c) {
            if ("on" === c.navigation.mouseScrollNavigation || "carousel" === c.navigation.mouseScrollNavigation) {
                c.isIEEleven = !!navigator.userAgent.match(/Trident.*rv\:11\./), c.isSafari = !!navigator.userAgent.match(/safari/i), c.ischrome = !!navigator.userAgent.match(/chrome/i);
                var d = c.ischrome ? -49 : c.isIEEleven || c.isSafari ? -9 : navigator.userAgent.match(/mozilla/i) ? -29 : -49,
                    e = c.ischrome ? 49 : c.isIEEleven || c.isSafari ? 9 : navigator.userAgent.match(/mozilla/i) ? 29 : 49;
                a.on("mousewheel DOMMouseScroll", function(f) {
                    var h = g(f.originalEvent),
                        i = a.find(".tp-revslider-slidesli.active-revslide").index(),
                        j = a.find(".tp-revslider-slidesli.processing-revslide").index(),
                        k = -1 != i && 0 == i || -1 != j && 0 == j,
                        l = -1 != i && i == c.slideamount - 1 || 1 != j && j == c.slideamount - 1,
                        m = !0;
                    "carousel" == c.navigation.mouseScrollNavigation && (k = l = !1), -1 == j ? h.pixelY < d ? (k || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1), l || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1)) : h.pixelY > e && (l || (c.sc_indicator = "arrow", "reverse" !== c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 0, b.callingNewSlide(a, 1)), m = !1), k || (c.sc_indicator = "arrow", "reverse" === c.navigation.mouseScrollReverse && (c.sc_indicator_dir = 1, b.callingNewSlide(a, -1)), m = !1)) : m = !1;
                    var n = c.c.offset().top - jQuery("body").scrollTop(),
                        o = n + c.c.height();
                    return "carousel" != c.navigation.mouseScrollNavigation ? ("reverse" !== c.navigation.mouseScrollReverse && (n > 0 && h.pixelY > 0 || o < jQuery(window).height() && h.pixelY < 0) && (m = !0), "reverse" === c.navigation.mouseScrollReverse && (n < 0 && h.pixelY < 0 || o > jQuery(window).height() && h.pixelY > 0) && (m = !0)) : m = !1, 0 == m ? (f.preventDefault(f), !1) : void 0
                })
            }
        },
        j = function(a, b, d) {
            return a = c ? jQuery(d.target).closest("." + a).length || jQuery(d.srcElement).closest("." + a).length : jQuery(d.toElement).closest("." + a).length || jQuery(d.originalTarget).closest("." + a).length, !0 === a || 1 === a ? 1 : 0
        },
        k = function(a, d, e) {
            var f = d.carousel;
            jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"), f.Limit = "endless";
            var h = (c || b.get_browser(), a),
                i = "vertical" === d.navigation.thumbnails.direction || "vertical" === d.navigation.tabs.direction ? "none" : "vertical",
                k = d.navigation.touch.swipe_direction || "horizontal";
            i = "swipebased" == e && "vertical" == k ? "none" : e ? "vertical" : i, jQuery.fn.swipetp || (jQuery.fn.swipetp = jQuery.fn.swipe), jQuery.fn.swipetp.defaults && jQuery.fn.swipetp.defaults.excludedElements || jQuery.fn.swipetp.defaults || (jQuery.fn.swipetp.defaults = new Object), jQuery.fn.swipetp.defaults.excludedElements = "label, button, input, select, textarea, .noSwipe", h.swipetp({
                allowPageScroll: i,
                triggerOnTouchLeave: !0,
                treshold: d.navigation.touch.swipe_treshold,
                fingers: d.navigation.touch.swipe_min_touches,
                excludeElements: jQuery.fn.swipetp.defaults.excludedElements,
                swipeStatus: function(e, g, h, i, l, m, n) {
                    var o = j("rev_slider_wrapper", a, e),
                        p = j("tp-thumbs", a, e),
                        q = j("tp-tabs", a, e),
                        r = jQuery(this).attr("class"),
                        s = !!r.match(/tp-tabs|tp-thumb/gi);
                    if ("carousel" === d.sliderType && (("move" === g || "end" === g || "cancel" == g) && d.dragStartedOverSlider && !d.dragStartedOverThumbs && !d.dragStartedOverTabs || "start" === g && o > 0 && 0 === p && 0 === q)) {
                        if (c && ("up" === h || "down" === h)) return;
                        switch (d.dragStartedOverSlider = !0, i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i), g) {
                            case "start":
                                void 0 !== f.positionanim && (f.positionanim.kill(), f.slide_globaloffset = "off" === f.infinity ? f.slide_offset : b.simp(f.slide_offset, f.maxwidth)), f.overpull = "none", f.wrap.addClass("dragged");
                                break;
                            case "move":
                                if (d.c.find(".tp-withaction").addClass("tp-temporarydisabled"), f.slide_offset = "off" === f.infinity ? f.slide_globaloffset + i : b.simp(f.slide_globaloffset + i, f.maxwidth), "off" === f.infinity) {
                                    var t = "center" === f.horizontal_align ? (f.wrapwidth / 2 - f.slide_width / 2 - f.slide_offset) / f.slide_width : (0 - f.slide_offset) / f.slide_width;
                                    "none" !== f.overpull && 0 !== f.overpull || !(t < 0 || t > d.slideamount - 1) ? t >= 0 && t <= d.slideamount - 1 && (t >= 0 && i > f.overpull || t <= d.slideamount - 1 && i < f.overpull) && (f.overpull = 0) : f.overpull = i, f.slide_offset = t < 0 ? f.slide_offset + (f.overpull - i) / 1.1 + Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : t > d.slideamount - 1 ? f.slide_offset + (f.overpull - i) / 1.1 - Math.sqrt(Math.abs((f.overpull - i) / 1.1)) : f.slide_offset
                                }
                                b.organiseCarousel(d, h, !0, !0);
                                break;
                            case "end":
                            case "cancel":
                                f.slide_globaloffset = f.slide_offset, f.wrap.removeClass("dragged"), b.carouselToEvalPosition(d, h), d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, setTimeout(function() {
                                    d.c.find(".tp-withaction").removeClass("tp-temporarydisabled")
                                }, 19)
                        }
                    } else {
                        if (("move" !== g && "end" !== g && "cancel" != g || d.dragStartedOverSlider || !d.dragStartedOverThumbs && !d.dragStartedOverTabs) && !("start" === g && o > 0 && (p > 0 || q > 0))) {
                            if ("end" == g && !s) {
                                if (d.sc_indicator = "arrow", "horizontal" == k && "left" == h || "vertical" == k && "up" == h) return d.sc_indicator_dir = 0, b.callingNewSlide(d.c, 1), !1;
                                if ("horizontal" == k && "right" == h || "vertical" == k && "down" == h) return d.sc_indicator_dir = 1, b.callingNewSlide(d.c, -1), !1
                            }
                            return d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1, !0
                        }
                        p > 0 && (d.dragStartedOverThumbs = !0), q > 0 && (d.dragStartedOverTabs = !0);
                        var u = d.dragStartedOverThumbs ? ".tp-thumbs" : ".tp-tabs",
                            v = d.dragStartedOverThumbs ? ".tp-thumb-mask" : ".tp-tab-mask",
                            w = d.dragStartedOverThumbs ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                            x = d.dragStartedOverThumbs ? ".tp-thumb" : ".tp-tab",
                            y = d.dragStartedOverThumbs ? d.navigation.thumbnails : d.navigation.tabs;
                        i = h && h.match(/left|up/g) ? Math.round(-1 * i) : i = Math.round(1 * i);
                        var z = a.parent().find(v),
                            A = z.find(w),
                            B = y.direction,
                            C = "vertical" === B ? A.height() : A.width(),
                            D = "vertical" === B ? z.height() : z.width(),
                            E = "vertical" === B ? z.find(x).first().outerHeight(!0) + y.space : z.find(x).first().outerWidth(!0) + y.space,
                            F = void 0 === A.data("offset") ? 0 : parseInt(A.data("offset"), 0),
                            G = 0;
                        switch (g) {
                            case "start":
                                a.parent().find(u).addClass("dragged"), F = "vertical" === B ? A.position().top : A.position().left, A.data("offset", F), A.data("tmmove") && A.data("tmmove").pause();
                                break;
                            case "move":
                                if (C <= D) return !1;
                                G = F + i, G = G > 0 ? "horizontal" === B ? G - A.width() * (G / A.width() * G / A.width()) : G - A.height() * (G / A.height() * G / A.height()) : G;
                                var H = "vertical" === B ? 0 - (A.height() - z.height()) : 0 - (A.width() - z.width());
                                G = G < H ? "horizontal" === B ? G + A.width() * (G - H) / A.width() * (G - H) / A.width() : G + A.height() * (G - H) / A.height() * (G - H) / A.height() : G, "vertical" === B ? punchgs.TweenLite.set(A, {
                                    top: G + "px"
                                }) : punchgs.TweenLite.set(A, {
                                    left: G + "px"
                                });
                                break;
                            case "end":
                            case "cancel":
                                if (s) return G = F + i, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, G = Math.abs(i) > E / 10 ? i <= 0 ? Math.floor(G / E) * E : Math.ceil(G / E) * E : i < 0 ? Math.ceil(G / E) * E : Math.floor(G / E) * E, G = "vertical" === B ? G < 0 - (A.height() - z.height()) ? 0 - (A.height() - z.height()) : G : G < 0 - (A.width() - z.width()) ? 0 - (A.width() - z.width()) : G, G = G > 0 ? 0 : G, "vertical" === B ? punchgs.TweenLite.to(A, .5, {
                                    top: G + "px",
                                    ease: punchgs.Power3.easeOut
                                }) : punchgs.TweenLite.to(A, .5, {
                                    left: G + "px",
                                    ease: punchgs.Power3.easeOut
                                }), G = G || ("vertical" === B ? A.position().top : A.position().left), A.data("offset", G), A.data("distance", i), setTimeout(function() {
                                    d.dragStartedOverSlider = !1, d.dragStartedOverThumbs = !1, d.dragStartedOverTabs = !1
                                }, 100), a.parent().find(u).removeClass("dragged"), !1
                        }
                    }
                }
            })
        },
        l = function(a) {
            a.hide_delay = jQuery.isNumeric(parseInt(a.hide_delay, 0)) ? a.hide_delay / 1e3 : .2, a.hide_delay_mobile = jQuery.isNumeric(parseInt(a.hide_delay_mobile, 0)) ? a.hide_delay_mobile / 1e3 : .2
        },
        m = function(a) {
            return a && a.enable
        },
        n = function(a) {
            return a && a.enable && !0 === a.hide_onleave && (void 0 === a.position || !a.position.match(/outer/g))
        },
        o = function(a, b) {
            var d = a.parent();
            n(b.navigation.arrows) && punchgs.TweenLite.delayedCall(c ? b.navigation.arrows.hide_delay_mobile : b.navigation.arrows.hide_delay, p, [d.find(".tparrows"), b.navigation.arrows, "hide"]), n(b.navigation.bullets) && punchgs.TweenLite.delayedCall(c ? b.navigation.bullets.hide_delay_mobile : b.navigation.bullets.hide_delay, p, [d.find(".tp-bullets"), b.navigation.bullets, "hide"]), n(b.navigation.thumbnails) && punchgs.TweenLite.delayedCall(c ? b.navigation.thumbnails.hide_delay_mobile : b.navigation.thumbnails.hide_delay, p, [d.find(".tp-thumbs"), b.navigation.thumbnails, "hide"]), n(b.navigation.tabs) && punchgs.TweenLite.delayedCall(c ? b.navigation.tabs.hide_delay_mobile : b.navigation.tabs.hide_delay, p, [d.find(".tp-tabs"), b.navigation.tabs, "hide"])
        },
        p = function(a, b, c, d) {
            switch (d = void 0 === d ? .5 : d, c) {
                case "show":
                    punchgs.TweenLite.to(a, d, {
                        autoAlpha: 1,
                        ease: punchgs.Power3.easeInOut,
                        overwrite: "auto"
                    });
                    break;
                case "hide":
                    punchgs.TweenLite.to(a, d, {
                        autoAlpha: 0,
                        ease: punchgs.Power3.easeInOu,
                        overwrite: "auto"
                    })
            }
        },
        q = function(a, b, c) {
            b.style = void 0 === b.style ? "" : b.style, b.left.style = void 0 === b.left.style ? "" : b.left.style, b.right.style = void 0 === b.right.style ? "" : b.right.style, 0 === a.find(".tp-leftarrow.tparrows").length && a.append('<div class="' + b.style + " " + b.left.style + '">' + b.tmp + "</div>"), 0 === a.find("").length && a.append('<div class=" ' + b.style + " " + b.right.style + '">' + b.tmp + "</div>");
            var d = a.find(""),
                e = a.find("");
            b.rtl ? (d.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext()
            }), e.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev()
            })) : (e.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 0, a.revnext()
            }), d.click(function() {
                c.sc_indicator = "arrow", c.sc_indicator_dir = 1, a.revprev()
            })), b.right.j = a.find(".tp-rightarrow.tparrows"), b.left.j = a.find(".tp-leftarrow.tparrows"), b.padding_top = parseInt(c.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(c.carousel.padding_bottom || 0, 0), t(d, b.left, c), t(e, b.right, c), b.left.opt = c, b.right.opt = c, "outer-left" != b.position && "outer-right" != b.position || (c.outernav = !0)
        },
        r = function(a, b, c) {
            var d = a.outerHeight(!0),
                f = (a.outerWidth(!0), void 0 == b.opt ? 0 : 0 == c.conh ? c.height : c.conh),
                g = "layergrid" == b.container ? "fullscreen" == c.sliderLayout ? c.height / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : "on" == c.autoHeight || void 0 != c.minHeight && c.minHeight > 0 ? f / 2 - c.gridheight[c.curWinRange] * c.bh / 2 : 0 : 0,
                h = "top" === b.v_align ? {
                    top: "0px",
                    y: Math.round(b.v_offset + g) + "px"
                } : "center" === b.v_align ? {
                    top: "50%",
                    y: Math.round(0 - d / 2 + b.v_offset) + "px"
                } : {
                    top: "100%",
                    y: Math.round(0 - (d + b.v_offset + g)) + "px"
                };
            a.hasClass("outer-bottom") || punchgs.TweenLite.set(a, h)
        },
        s = function(a, b, c) {
            var e = (a.outerHeight(!0), a.outerWidth(!0)),
                f = "layergrid" == b.container ? "carousel" === c.sliderType ? 0 : c.width / 2 - c.gridwidth[c.curWinRange] * c.bw / 2 : 0,
                g = "left" === b.h_align ? {
                    left: "0px",
                    x: Math.round(b.h_offset + f) + "px"
                } : "center" === b.h_align ? {
                    left: "50%",
                    x: Math.round(0 - e / 2 + b.h_offset) + "px"
                } : {
                    left: "100%",
                    x: Math.round(0 - (e + b.h_offset + f)) + "px"
                };
            punchgs.TweenLite.set(a, g)
        },
        t = function(a, b, c) {
            var d = a.closest(".tp-simpleresponsive").length > 0 ? a.closest(".tp-simpleresponsive") : a.closest(".tp-revslider-mainul").length > 0 ? a.closest(".tp-revslider-mainul") : a.closest(".rev_slider_wrapper").length > 0 ? a.closest(".rev_slider_wrapper") : a.parent().find(".tp-revslider-mainul"),
                e = d.width(),
                f = d.height();
            if (r(a, b, c), s(a, b, c), "outer-left" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout ? "outer-right" !== b.position || "fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout || punchgs.TweenLite.set(a, {
                    right: 0 - a.outerWidth() + "px",
                    x: b.h_offset + "px"
                }) : punchgs.TweenLite.set(a, {
                    left: 0 - a.outerWidth() + "px",
                    x: b.h_offset + "px"
                }), a.hasClass("tp-thumbs") || a.hasClass("tp-tabs")) {
                var g = a.data("wr_padding"),
                    h = a.data("maxw"),
                    i = a.data("maxh"),
                    j = a.hasClass("tp-thumbs") ? a.find(".tp-thumb-mask") : a.find(".tp-tab-mask"),
                    k = parseInt(b.padding_top || 0, 0),
                    l = parseInt(b.padding_bottom || 0, 0);
                h > e && "outer-left" !== b.position && "outer-right" !== b.position ? (punchgs.TweenLite.set(a, {
                    left: "0px",
                    x: 0,
                    maxWidth: e - 2 * g + "px"
                }), punchgs.TweenLite.set(j, {
                    maxWidth: e - 2 * g + "px"
                })) : (punchgs.TweenLite.set(a, {
                    maxWidth: h + "px"
                }), punchgs.TweenLite.set(j, {
                    maxWidth: h + "px"
                })), i + 2 * g > f && "outer-bottom" !== b.position && "outer-top" !== b.position ? (punchgs.TweenLite.set(a, {
                    top: "0px",
                    y: 0,
                    maxHeight: k + l + (f - 2 * g) + "px"
                }), punchgs.TweenLite.set(j, {
                    maxHeight: k + l + (f - 2 * g) + "px"
                })) : (punchgs.TweenLite.set(a, {
                    maxHeight: i + "px"
                }), punchgs.TweenLite.set(j, {
                    maxHeight: i + "px"
                })), "outer-left" !== b.position && "outer-right" !== b.position && (k = 0, l = 0), !0 === b.span && "vertical" === b.direction ? (punchgs.TweenLite.set(a, {
                    maxHeight: k + l + (f - 2 * g) + "px",
                    height: k + l + (f - 2 * g) + "px",
                    top: 0 - k,
                    y: 0
                }), r(j, b, c)) : !0 === b.span && "horizontal" === b.direction && (punchgs.TweenLite.set(a, {
                    maxWidth: "100%",
                    width: e - 2 * g + "px",
                    left: 0,
                    x: 0
                }), s(j, b, c))
            }
        },
        u = function(a, b, c, d) {
            0 === a.find(".tp-bullets").length && (b.style = void 0 === b.style ? "" : b.style, a.append('<div class="tp-bullets ' + b.style + " " + b.direction + '"></div>'));
            var e = a.find(".tp-bullets"),
                f = c.data("index"),
                g = b.tmp;
            jQuery.each(d.thumbs[c.index()].params, function(a, b) {
                g = g.replace(b.from, b.to)
            }), e.append('<div class="justaddedbullet tp-bullet">' + g + "</div>");
            var h = a.find(".justaddedbullet"),
                i = a.find(".tp-bullet").length,
                j = h.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
                k = h.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
            "vertical" === b.direction ? (h.css({
                top: (i - 1) * k + "px",
                left: "0px"
            }), e.css({
                height: (i - 1) * k + h.outerHeight(),
                width: h.outerWidth()
            })) : (h.css({
                left: (i - 1) * j + "px",
                top: "0px"
            }), e.css({
                width: (i - 1) * j + h.outerWidth(),
                height: h.outerHeight()
            })), h.find(".tp-bullet-image").css({
                backgroundImage: "url(" + d.thumbs[c.index()].src + ")"
            }), h.data("liref", f), h.click(function() {
                d.sc_indicator = "bullet", a.revcallslidewithid(f), a.find(".tp-bullet").removeClass("selected"), jQuery(this).addClass("selected")
            }), h.removeClass("justaddedbullet"), b.padding_top = parseInt(d.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(d.carousel.padding_bottom || 0, 0), b.opt = d, "outer-left" != b.position && "outer-right" != b.position || (d.outernav = !0), e.addClass("nav-pos-hor-" + b.h_align), e.addClass("nav-pos-ver-" + b.v_align), e.addClass("nav-dir-" + b.direction), t(e, b, d)
        },
        w = function(a, b, c, d, e) {
            var f = "tp-thumb" === d ? ".tp-thumbs" : ".tp-tabs",
                g = "tp-thumb" === d ? ".tp-thumb-mask" : ".tp-tab-mask",
                h = "tp-thumb" === d ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                i = "tp-thumb" === d ? ".tp-thumb" : ".tp-tab",
                j = "tp-thumb" === d ? ".tp-thumb-image" : ".tp-tab-image";
            if (b.visibleAmount = b.visibleAmount > e.slideamount ? e.slideamount : b.visibleAmount, b.sliderLayout = e.sliderLayout, 0 === a.parent().find(f).length) {
                b.style = void 0 === b.style ? "" : b.style;
                var k = !0 === b.span ? "tp-span-wrapper" : "",
                    l = '<div class="' + d + "s " + k + " " + b.position + " " + b.style + '"><div class="' + d + '-mask"><div class="' + d + 's-inner-wrapper" style="position:relative;"></div></div></div>';
                "outer-top" === b.position ? a.parent().prepend(l) : "outer-bottom" === b.position ? a.after(l) : a.append(l), b.padding_top = parseInt(e.carousel.padding_top || 0, 0), b.padding_bottom = parseInt(e.carousel.padding_bottom || 0, 0), "outer-left" != b.position && "outer-right" != b.position || (e.outernav = !0)
            }
            var m = c.data("index"),
                n = a.parent().find(f),
                o = n.find(g),
                p = o.find(h),
                q = "horizontal" === b.direction ? b.width * b.visibleAmount + b.space * (b.visibleAmount - 1) : b.width,
                r = "horizontal" === b.direction ? b.height : b.height * b.visibleAmount + b.space * (b.visibleAmount - 1),
                s = b.tmp;
            jQuery.each(e.thumbs[c.index()].params, function(a, b) {
                s = s.replace(b.from, b.to)
            }), p.append('<div data-liindex="' + c.index() + '" data-liref="' + m + '" class="justaddedthumb ' + d + '" style="width:' + b.width + "px;height:" + b.height + 'px;">' + s + "</div>");
            var u = n.find(".justaddedthumb"),
                v = n.find(i).length,
                w = u.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
                x = u.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
            u.find(j).css({
                backgroundImage: "url(" + e.thumbs[c.index()].src + ")"
            }), "vertical" === b.direction ? (u.css({
                top: (v - 1) * x + "px",
                left: "0px"
            }), p.css({
                height: (v - 1) * x + u.outerHeight(),
                width: u.outerWidth()
            })) : (u.css({
                left: (v - 1) * w + "px",
                top: "0px"
            }), p.css({
                width: (v - 1) * w + u.outerWidth(),
                height: u.outerHeight()
            })), n.data("maxw", q), n.data("maxh", r), n.data("wr_padding", b.wrapper_padding);
            var y = "outer-top" === b.position || "outer-bottom" === b.position ? "relative" : "absolute";
            "outer-top" !== b.position && "outer-bottom" !== b.position || b.h_align;
            o.css({
                maxWidth: q + "px",
                maxHeight: r + "px",
                overflow: "hidden",
                position: "relative"
            }), n.css({
                maxWidth: q + "px",
                maxHeight: r + "px",
                overflow: "visible",
                position: y,
                background: b.wrapper_color,
                padding: b.wrapper_padding + "px",
                boxSizing: "contet-box"
            }), u.click(function() {
                e.sc_indicator = "bullet";
                var b = a.parent().find(h).data("distance");
                b = void 0 === b ? 0 : b, Math.abs(b) < 10 && (a.revcallslidewithid(m), a.parent().find(f).removeClass("selected"), jQuery(this).addClass("selected"))
            }), u.removeClass("justaddedthumb"), b.opt = e, n.addClass("nav-pos-hor-" + b.h_align), n.addClass("nav-pos-ver-" + b.v_align), n.addClass("nav-dir-" + b.direction), t(n, b, e)
        },
        x = function(a) {
            var b = a.c.parent().find(".outer-top"),
                c = a.c.parent().find(".outer-bottom");
            a.top_outer = b.hasClass("tp-forcenotvisible") ? 0 : b.outerHeight() || 0, a.bottom_outer = c.hasClass("tp-forcenotvisible") ? 0 : c.outerHeight() || 0
        },
        y = function(a, b, c, d) {
            b > c || c > d ? a.addClass("tp-forcenotvisible") : a.removeClass("tp-forcenotvisible")
        }
}(jQuery);









/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - PARALLAX
 * @version: 2.2.3 (17.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
! function(a) {
    "use strict";

    function e(a, b) {
        a.lastscrolltop = b
    }
    var b = jQuery.fn.revolution,
        c = b.is_mobile(),
        d = {
            alias: "Parallax Min JS",
            name: "revolution.extensions.parallax.min.js",
            min_core: "5.4.5",
            version: "2.2.3"
        };
    jQuery.extend(!0, b, {
        checkForParallax: function(a, e) {
            function g(a) {
                if ("3D" == f.type || "3d" == f.type) {
                    a.find(".slotholder").wrapAll('<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'), a.find(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layer" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:5;overflow:' + f.ddd_layer_overflow + ';"></div>'), a.find(".rs-parallaxlevel-tobggroup").closest(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>');
                    var b = a.find(".dddwrapper"),
                        c = a.find(".dddwrapper-layer");
                    a.find(".dddwrapper-layertobggroup").appendTo(b), "carousel" == e.sliderType && ("on" == f.ddd_shadow && b.addClass("dddwrappershadow"), punchgs.TweenLite.set(b, {
                        borderRadius: e.carousel.border_radius
                    })), punchgs.TweenLite.set(a, {
                        overflow: "visible",
                        transformStyle: "preserve-3d",
                        perspective: 1600
                    }), punchgs.TweenLite.set(b, {
                        force3D: "auto",
                        transformOrigin: "50% 50%"
                    }), punchgs.TweenLite.set(c, {
                        force3D: "auto",
                        transformOrigin: "50% 50%",
                        zIndex: 5
                    }), punchgs.TweenLite.set(e.ul, {
                        transformStyle: "preserve-3d",
                        transformPerspective: 1600
                    })
                }
            }
            if ("stop" === b.compare_version(d).check) return !1;
            var f = e.parallax;
            if (!f.done) {
                if (f.done = !0, c && "on" == f.disable_onmobile) return !1;
                "3D" != f.type && "3d" != f.type || (punchgs.TweenLite.set(e.c, {
                    overflow: f.ddd_overflow
                }), punchgs.TweenLite.set(e.ul, {
                    overflow: f.ddd_overflow
                }), "carousel" != e.sliderType && "on" == f.ddd_shadow && (e.c.prepend('<div class="dddwrappershadow"></div>'), punchgs.TweenLite.set(e.c.find(".dddwrappershadow"), {
                    force3D: "auto",
                    transformPerspective: 1600,
                    transformOrigin: "50% 50%",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0
                }))), e.li.each(function() {
                    g(jQuery(this))
                }), ("3D" == f.type || "3d" == f.type) && e.c.find(".tp-static-layers").length > 0 && (punchgs.TweenLite.set(e.c.find(".tp-static-layers"), {
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }), g(e.c.find(".tp-static-layers"))), f.pcontainers = new Array, f.pcontainer_depths = new Array, f.bgcontainers = new Array, f.bgcontainer_depths = new Array, e.c.find(".tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer").each(function() {
                    var a = jQuery(this),
                        b = a.data("bgparallax") || e.parallax.bgparallax;
                    void 0 !== (b = "on" == b ? 1 : b) && "off" !== b && (f.bgcontainers.push(a), f.bgcontainer_depths.push(e.parallax.levels[parseInt(b, 0) - 1] / 100))
                });
                for (var h = 1; h <= f.levels.length; h++) e.c.find(".rs-parallaxlevel-" + h).each(function() {
                    var a = jQuery(this),
                        b = a.closest(".tp-parallax-wrap");
                    b.data("parallaxlevel", f.levels[h - 1]), b.addClass("tp-parallax-container"), f.pcontainers.push(b), f.pcontainer_depths.push(f.levels[h - 1])
                });
                "mouse" != f.type && "scroll+mouse" != f.type && "mouse+scroll" != f.type && "3D" != f.type && "3d" != f.type || (a.mouseenter(function(b) {
                    var c = a.find(".active-revslide"),
                        d = a.offset().top,
                        e = a.offset().left,
                        f = b.pageX - e,
                        g = b.pageY - d;
                    c.data("enterx", f), c.data("entery", g)
                }), a.on("mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath", function(b, c) {
                    var d = c && c.li ? c.li : a.find(".active-revslide");
                    if ("enterpoint" == f.origo) {
                        var g = a.offset().top,
                            h = a.offset().left;
                        void 0 == d.data("enterx") && d.data("enterx", b.pageX - h), void 0 == d.data("entery") && d.data("entery", b.pageY - g);
                        var i = d.data("enterx") || b.pageX - h,
                            j = d.data("entery") || b.pageY - g,
                            k = i - (b.pageX - h),
                            l = j - (b.pageY - g),
                            m = f.speed / 1e3 || .4
                    } else var g = a.offset().top,
                        h = a.offset().left,
                        k = e.conw / 2 - (b.pageX - h),
                        l = e.conh / 2 - (b.pageY - g),
                        m = f.speed / 1e3 || 3;
                    "mouseleave" == b.type && (k = f.ddd_lasth || 0, l = f.ddd_lastv || 0, m = 1.5);
                    for (var n = 0; n < f.pcontainers.length; n++) {
                        var o = f.pcontainers[n],
                            p = f.pcontainer_depths[n],
                            q = "3D" == f.type || "3d" == f.type ? p / 200 : p / 100,
                            r = k * q,
                            s = l * q;
                        "scroll+mouse" == f.type || "mouse+scroll" == f.type ? punchgs.TweenLite.to(o, m, {
                            force3D: "auto",
                            x: r,
                            ease: punchgs.Power3.easeOut,
                            overwrite: "all"
                        }) : punchgs.TweenLite.to(o, m, {
                            force3D: "auto",
                            x: r,
                            y: s,
                            ease: punchgs.Power3.easeOut,
                            overwrite: "all"
                        })
                    }
                    if ("3D" == f.type || "3d" == f.type) {
                        var t = ".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";
                        "carousel" === e.sliderType && (t = ".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"), e.c.find(t).each(function() {
                            var a = jQuery(this),
                                c = f.levels[f.levels.length - 1] / 200,
                                d = k * c,
                                g = l * c,
                                h = 0 == e.conw ? 0 : Math.round(k / e.conw * c * 100) || 0,
                                i = 0 == e.conh ? 0 : Math.round(l / e.conh * c * 100) || 0,
                                j = a.closest("li"),
                                n = 0,
                                o = !1;
                            a.hasClass("dddwrapper-layer") && (n = f.ddd_z_correction || 65, o = !0), a.hasClass("dddwrapper-layer") && (d = 0, g = 0), j.hasClass("active-revslide") || "carousel" != e.sliderType ? "on" != f.ddd_bgfreeze || o ? punchgs.TweenLite.to(a, m, {
                                rotationX: i,
                                rotationY: -h,
                                x: d,
                                z: n,
                                y: g,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            }) : punchgs.TweenLite.to(a, .5, {
                                force3D: "auto",
                                rotationY: 0,
                                rotationX: 0,
                                z: 0,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            }) : punchgs.TweenLite.to(a, .5, {
                                force3D: "auto",
                                rotationY: 0,
                                x: 0,
                                y: 0,
                                rotationX: 0,
                                z: 0,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            }), "mouseleave" == b.type && punchgs.TweenLite.to(jQuery(this), 3.8, {
                                z: 0,
                                ease: punchgs.Power3.easeOut
                            })
                        })
                    }
                }), c && (window.ondeviceorientation = function(b) {
                    var c = Math.round(b.beta || 0) - 70,
                        d = Math.round(b.gamma || 0),
                        g = a.find(".active-revslide");
                    if (jQuery(window).width() > jQuery(window).height()) {
                        var h = d;
                        d = c, c = h
                    }
                    var i = a.width(),
                        j = a.height(),
                        k = 360 / i * d,
                        l = 180 / j * c,
                        m = f.speed / 1e3 || 3,
                        n = [];
                    if (g.find(".tp-parallax-container").each(function(a) {
                            n.push(jQuery(this))
                        }), a.find(".tp-static-layers .tp-parallax-container").each(function() {
                            n.push(jQuery(this))
                        }), jQuery.each(n, function() {
                            var a = jQuery(this),
                                b = parseInt(a.data("parallaxlevel"), 0),
                                c = b / 100,
                                d = k * c * 2,
                                e = l * c * 4;
                            punchgs.TweenLite.to(a, m, {
                                force3D: "auto",
                                x: d,
                                y: e,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            })
                        }), "3D" == f.type || "3d" == f.type) {
                        var o = ".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";
                        "carousel" === e.sliderType && (o = ".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"), e.c.find(o).each(function() {
                            var a = jQuery(this),
                                c = f.levels[f.levels.length - 1] / 200,
                                d = k * c,
                                g = l * c * 3,
                                h = 0 == e.conw ? 0 : Math.round(k / e.conw * c * 500) || 0,
                                i = 0 == e.conh ? 0 : Math.round(l / e.conh * c * 700) || 0,
                                j = a.closest("li"),
                                n = 0,
                                o = !1;
                            a.hasClass("dddwrapper-layer") && (n = f.ddd_z_correction || 65, o = !0), a.hasClass("dddwrapper-layer") && (d = 0, g = 0), j.hasClass("active-revslide") || "carousel" != e.sliderType ? "on" != f.ddd_bgfreeze || o ? punchgs.TweenLite.to(a, m, {
                                rotationX: i,
                                rotationY: -h,
                                x: d,
                                z: n,
                                y: g,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            }) : punchgs.TweenLite.to(a, .5, {
                                force3D: "auto",
                                rotationY: 0,
                                rotationX: 0,
                                z: 0,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            }) : punchgs.TweenLite.to(a, .5, {
                                force3D: "auto",
                                rotationY: 0,
                                z: 0,
                                x: 0,
                                y: 0,
                                rotationX: 0,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            }), "mouseleave" == b.type && punchgs.TweenLite.to(jQuery(this), 3.8, {
                                z: 0,
                                ease: punchgs.Power3.easeOut
                            })
                        })
                    }
                }));
                var i = e.scrolleffect;
                if (i.bgs = new Array, i.on) {
                    if ("on" === i.on_slidebg)
                        for (var h = 0; h < e.allslotholder.length; h++) i.bgs.push(e.allslotholder[h]);
                    i.multiplicator_layers = parseFloat(i.multiplicator_layers), i.multiplicator = parseFloat(i.multiplicator)
                }
                void 0 !== i.layers && 0 === i.layers.length && (i.layers = !1), void 0 !== i.bgs && 0 === i.bgs.length && (i.bgs = !1), b.scrollTicker(e, a)
            }
        },
        scrollTicker: function(a, d) {
            1 != a.scrollTicker && (a.scrollTicker = !0, c ? (punchgs.TweenLite.ticker.fps(150), punchgs.TweenLite.ticker.addEventListener("tick", function() {
                b.scrollHandling(a)
            }, d, !1, 1)) : document.addEventListener("scroll", function(c) {
                b.scrollHandling(a, !0)
            }, {
                passive: !0
            })), b.scrollHandling(a, !0)
        },
        scrollHandling: function(a, d, f) {
            if (a.lastwindowheight = a.lastwindowheight || window.innerHeight, a.conh = 0 === a.conh || void 0 === a.conh ? a.infullscreenmode ? a.minHeight : a.c.height() : a.conh, a.lastscrolltop == window.scrollY && !a.duringslidechange && !d) return !1;
            punchgs.TweenLite.delayedCall(.2, e, [a, window.scrollY]);
            var g = a.c[0].getBoundingClientRect(),
                h = a.viewPort,
                i = a.parallax,
                j = g.top < 0 || g.height > a.lastwindowheight ? g.top / g.height : g.bottom > a.lastwindowheight ? (g.bottom - a.lastwindowheight) / g.height : 0;
            if (a.scrollproc = j, b.callBackHandling && b.callBackHandling(a, "parallax", "start"), h.enable) {
                var k = 1 - Math.abs(j);
                k = k < 0 ? 0 : k, jQuery.isNumeric(h.visible_area) || -1 !== h.visible_area.indexOf("%") && (h.visible_area = parseInt(h.visible_area) / 100), 1 - h.visible_area <= k ? a.inviewport || (a.inviewport = !0, b.enterInViewPort(a)) : a.inviewport && (a.inviewport = !1, b.leaveViewPort(a))
            }
            if (c && "on" == i.disable_onmobile) return !1;
            if ("3d" != i.type && "3D" != i.type) {
                if (("scroll" == i.type || "scroll+mouse" == i.type || "mouse+scroll" == i.type) && i.pcontainers)
                    for (var l = 0; l < i.pcontainers.length; l++)
                        if (i.pcontainers[l].length > 0) {
                            var m = i.pcontainers[l],
                                n = i.pcontainer_depths[l] / 100,
                                o = Math.round(j * (-n * a.conh) * 10) / 10 || 0,
                                p = void 0 !== f ? f : i.speedls / 1e3 || 0;
                            m.data("parallaxoffset", o), punchgs.TweenLite.to(m, p, {
                                overwrite: "auto",
                                force3D: "auto",
                                y: o
                            })
                        }
                if (i.bgcontainers)
                    for (var l = 0; l < i.bgcontainers.length; l++) {
                        var q = i.bgcontainers[l],
                            r = i.bgcontainer_depths[l],
                            o = j * (-r * a.conh) || 0,
                            p = void 0 !== f ? f : i.speedbg / 1e3 || 0;
                        punchgs.TweenLite.to(q, p, {
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            backfaceVisibility: "hidden",
                            force3D: "true",
                            y: o + "px"
                        })
                    }
            }
            var s = a.scrolleffect;
            if (s.on && ("on" !== s.disable_on_mobile || !c)) {
                var t = Math.abs(j) - s.tilt / 100;
                if (t = t < 0 ? 0 : t, !1 !== s.layers) {
                    var u = 1 - t * s.multiplicator_layers,
                        v = {
                            backfaceVisibility: "hidden",
                            force3D: "true",
                            z: .001,
                            perspective: 600
                        };
                    if ("top" == s.direction && j >= 0 && (u = 1), "bottom" == s.direction && j <= 0 && (u = 1), u = u > 1 ? 1 : u < 0 ? 0 : u, "on" === s.fade && (v.opacity = u), "on" === s.scale) {
                        var w = u;
                        v.scale = 1 - w + 1
                    }
                    if ("on" === s.blur) {
                        var x = (1 - u) * s.maxblur;
                        v["-webkit-filter"] = "blur(" + x + "px)", v.filter = "blur(" + x + "px)"
                    }
                    if ("on" === s.grayscale) {
                        var y = 100 * (1 - u),
                            z = "grayscale(" + y + "%)";
                        v["-webkit-filter"] = void 0 === v["-webkit-filter"] ? z : v["-webkit-filter"] + " " + z, v.filter = void 0 === v.filter ? z : v.filter + " " + z
                    }
                    punchgs.TweenLite.set(s.layers, v)
                }
                if (!1 !== s.bgs) {
                    var u = 1 - t * s.multiplicator,
                        v = {
                            backfaceVisibility: "hidden",
                            force3D: "true"
                        };
                    if ("top" == s.direction && j >= 0 && (u = 1), "bottom" == s.direction && j <= 0 && (u = 1), u = u > 1 ? 1 : u < 0 ? 0 : u, "on" === s.fade && (v.opacity = u), "on" === s.scale) {
                        var w = u;
                        punchgs.TweenLite.set(jQuery(".tp-kbimg-wrap"), {
                            transformOrigin: "50% 50%",
                            scale: w,
                            force3D: !0
                        })
                    }
                    if ("on" === s.blur) {
                        var x = (1 - u) * s.maxblur;
                        v["-webkit-filter"] = "blur(" + x + "px)", v.filter = "blur(" + x + "px)"
                    }
                    if ("on" === s.grayscale) {
                        var y = 100 * (1 - u),
                            z = "grayscale(" + y + "%)";
                        v["-webkit-filter"] = void 0 === v["-webkit-filter"] ? z : v["-webkit-filter"] + " " + z, v.filter = void 0 === v.filter ? z : v.filter + " " + z
                    }
                    punchgs.TweenLite.set(s.bgs, v)
                }
            }
            b.callBackHandling && b.callBackHandling(a, "parallax", "end")
        }
    })
}(jQuery);









/************************************************
 * REVOLUTION 5.4.6.4 EXTENSION - SLIDE ANIMATIONS
 * @version: 1.8 (17.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 ************************************************/
! function(a) {
    "use strict";
    var b = jQuery.fn.revolution,
        c = {
            alias: "SlideAnimations Min JS",
            name: "revolution.extensions.slideanims.min.js",
            min_core: "5.4.5",
            version: "1.8"
        };
    jQuery.extend(!0, b, {
        animateSlide: function(a, d, e, f, h, i, j, k) {
            return "stop" === b.compare_version(c).check ? k : g(a, d, e, f, h, i, j, k)
        }
    });
    var d = function(a, c, d, e) {
            var f = a,
                g = f.find(".defaultimg"),
                h = g.data("mediafilter"),
                i = f.data("zoomstart"),
                j = f.data("rotationstart");
            void 0 != g.data("currotate") && (j = g.data("currotate")), void 0 != g.data("curscale") && "box" == e ? i = 100 * g.data("curscale") : void 0 != g.data("curscale") && (i = g.data("curscale")), b.slotSize(g, c);
            var k = g.attr("src"),
                l = g.data("bgcolor"),
                m = c.width,
                n = c.height,
                o = g.data("fxof"),
                p = 0;
            void 0 === l && (l = g.css("backgroundColor")), "on" == c.autoHeight && (n = c.c.height()), void 0 == o && (o = 0);
            var q = 0,
                r = g.data("bgfit"),
                s = g.data("bgrepeat"),
                t = g.data("bgposition");
            void 0 == r && (r = "cover"), void 0 == s && (s = "no-repeat"), void 0 == t && (t = "center center");
            var u = "";
            switch (u = void 0 !== l && l.indexOf("gradient") >= 0 ? "background:" + l : "background-color:" + l + ";background-image:url(" + k + ");background-repeat:" + s + ";background-size:" + r + ";background-position:" + t, e) {
                case "box":
                    for (var v = 0, w = 0, x = 0; x < c.slots; x++) {
                        w = 0;
                        for (var y = 0; y < c.slots; y++) f.append('<div class="slot" style="position:absolute;top:' + (p + w) + "px;left:" + (o + v) + "px;width:" + c.slotw + "px;height:" + c.sloth + 'px;overflow:hidden;"><div class="slotslide ' + h + '" data-x="' + v + '" data-y="' + w + '" style="position:absolute;top:0px;left:0px;width:' + c.slotw + "px;height:" + c.sloth + 'px;overflow:hidden;"><div style="position:absolute;top:' + (0 - w) + "px;left:" + (0 - v) + "px;width:" + m + "px;height:" + n + "px;" + u + ';"></div></div></div>'), w += c.sloth, void 0 != i && void 0 != j && punchgs.TweenLite.set(f.find(".slot").last(), {
                            rotationZ: j
                        });
                        v += c.slotw
                    }
                    break;
                case "vertical":
                case "horizontal":
                    if ("horizontal" == e) {
                        if (!d) var q = 0 - c.slotw;
                        for (var y = 0; y < c.slots; y++) f.append('<div class="slot" style="position:absolute;top:' + (0 + p) + "px;left:" + (o + y * c.slotw) + "px;overflow:hidden;width:" + (c.slotw + .3) + "px;height:" + n + 'px"><div class="slotslide ' + h + '" style="position:absolute;top:0px;left:' + q + "px;width:" + (c.slotw + .6) + "px;height:" + n + 'px;overflow:hidden;"><div style="position:absolute;top:0px;left:' + (0 - y * c.slotw) + "px;width:" + m + "px;height:" + n + "px;" + u + ';"></div></div></div>'), void 0 != i && void 0 != j && punchgs.TweenLite.set(f.find(".slot").last(), {
                            rotationZ: j
                        })
                    } else {
                        if (!d) var q = 0 - c.sloth;
                        for (var y = 0; y < c.slots + 2; y++) f.append('<div class="slot" style="position:absolute;top:' + (p + y * c.sloth) + "px;left:" + o + "px;overflow:hidden;width:" + m + "px;height:" + c.sloth + 'px"><div class="slotslide ' + h + '" style="position:absolute;top:' + q + "px;left:0px;width:" + m + "px;height:" + c.sloth + 'px;overflow:hidden;"><div style="position:absolute;top:' + (0 - y * c.sloth) + "px;left:0px;width:" + m + "px;height:" + n + "px;" + u + ';"></div></div></div>'), void 0 != i && void 0 != j && punchgs.TweenLite.set(f.find(".slot").last(), {
                            rotationZ: j
                        })
                    }
            }
        },
        e = function(a, b, c, d) {
            function y() {
                jQuery.each(v, function(a, c) {
                    c[0] != b && c[8] != b || (q = c[1], r = c[2], s = t), t += 1
                })
            }
            var e = a[0].opt,
                f = punchgs.Power1.easeIn,
                g = punchgs.Power1.easeOut,
                h = punchgs.Power1.easeInOut,
                i = punchgs.Power2.easeIn,
                j = punchgs.Power2.easeOut,
                k = punchgs.Power2.easeInOut,
                m = (punchgs.Power3.easeIn, punchgs.Power3.easeOut),
                n = punchgs.Power3.easeInOut,
                o = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
                p = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27],
                q = 0,
                r = 1,
                s = 0,
                t = 0,
                v = (new Array, [
                    ["boxslide", 0, 1, 10, 0, "box", !1, null, 0, g, g, 500, 6],
                    ["boxfade", 1, 0, 10, 0, "box", !1, null, 1, h, h, 700, 5],
                    ["slotslide-horizontal", 2, 0, 0, 200, "horizontal", !0, !1, 2, k, k, 700, 3],
                    ["slotslide-vertical", 3, 0, 0, 200, "vertical", !0, !1, 3, k, k, 700, 3],
                    ["curtain-1", 4, 3, 0, 0, "horizontal", !0, !0, 4, g, g, 300, 5],
                    ["curtain-2", 5, 3, 0, 0, "horizontal", !0, !0, 5, g, g, 300, 5],
                    ["curtain-3", 6, 3, 25, 0, "horizontal", !0, !0, 6, g, g, 300, 5],
                    ["slotzoom-horizontal", 7, 0, 0, 400, "horizontal", !0, !0, 7, g, g, 300, 7],
                    ["slotzoom-vertical", 8, 0, 0, 0, "vertical", !0, !0, 8, j, j, 500, 8],
                    ["slotfade-horizontal", 9, 0, 0, 1e3, "horizontal", !0, null, 9, j, j, 2e3, 10],
                    ["slotfade-vertical", 10, 0, 0, 1e3, "vertical", !0, null, 10, j, j, 2e3, 10],
                    ["fade", 11, 0, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["crossfade", 11, 1, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["fadethroughdark", 11, 2, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["fadethroughlight", 11, 3, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["fadethroughtransparent", 11, 4, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["slideleft", 12, 0, 1, 0, "horizontal", !0, !0, 12, n, n, 1e3, 1],
                    ["slideup", 13, 0, 1, 0, "horizontal", !0, !0, 13, n, n, 1e3, 1],
                    ["slidedown", 14, 0, 1, 0, "horizontal", !0, !0, 14, n, n, 1e3, 1],
                    ["slideright", 15, 0, 1, 0, "horizontal", !0, !0, 15, n, n, 1e3, 1],
                    ["slideoverleft", 12, 7, 1, 0, "horizontal", !0, !0, 12, n, n, 1e3, 1],
                    ["slideoverup", 13, 7, 1, 0, "horizontal", !0, !0, 13, n, n, 1e3, 1],
                    ["slideoverdown", 14, 7, 1, 0, "horizontal", !0, !0, 14, n, n, 1e3, 1],
                    ["slideoverright", 15, 7, 1, 0, "horizontal", !0, !0, 15, n, n, 1e3, 1],
                    ["slideremoveleft", 12, 8, 1, 0, "horizontal", !0, !0, 12, n, n, 1e3, 1],
                    ["slideremoveup", 13, 8, 1, 0, "horizontal", !0, !0, 13, n, n, 1e3, 1],
                    ["slideremovedown", 14, 8, 1, 0, "horizontal", !0, !0, 14, n, n, 1e3, 1],
                    ["slideremoveright", 15, 8, 1, 0, "horizontal", !0, !0, 15, n, n, 1e3, 1],
                    ["papercut", 16, 0, 0, 600, "", null, null, 16, n, n, 1e3, 2],
                    ["3dcurtain-horizontal", 17, 0, 20, 100, "vertical", !1, !0, 17, h, h, 500, 7],
                    ["3dcurtain-vertical", 18, 0, 10, 100, "horizontal", !1, !0, 18, h, h, 500, 5],
                    ["cubic", 19, 0, 20, 600, "horizontal", !1, !0, 19, n, n, 500, 1],
                    ["cube", 19, 0, 20, 600, "horizontal", !1, !0, 20, n, n, 500, 1],
                    ["flyin", 20, 0, 4, 600, "vertical", !1, !0, 21, m, n, 500, 1],
                    ["turnoff", 21, 0, 1, 500, "horizontal", !1, !0, 22, n, n, 500, 1],
                    ["incube", 22, 0, 20, 200, "horizontal", !1, !0, 23, k, k, 500, 1],
                    ["cubic-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 24, j, j, 500, 1],
                    ["cube-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 25, j, j, 500, 1],
                    ["incube-horizontal", 24, 0, 20, 500, "vertical", !1, !0, 26, k, k, 500, 1],
                    ["turnoff-vertical", 25, 0, 1, 200, "horizontal", !1, !0, 27, k, k, 500, 1],
                    ["fadefromright", 12, 1, 1, 0, "horizontal", !0, !0, 28, k, k, 1e3, 1],
                    ["fadefromleft", 15, 1, 1, 0, "horizontal", !0, !0, 29, k, k, 1e3, 1],
                    ["fadefromtop", 14, 1, 1, 0, "horizontal", !0, !0, 30, k, k, 1e3, 1],
                    ["fadefrombottom", 13, 1, 1, 0, "horizontal", !0, !0, 31, k, k, 1e3, 1],
                    ["fadetoleftfadefromright", 12, 2, 1, 0, "horizontal", !0, !0, 32, k, k, 1e3, 1],
                    ["fadetorightfadefromleft", 15, 2, 1, 0, "horizontal", !0, !0, 33, k, k, 1e3, 1],
                    ["fadetobottomfadefromtop", 14, 2, 1, 0, "horizontal", !0, !0, 34, k, k, 1e3, 1],
                    ["fadetotopfadefrombottom", 13, 2, 1, 0, "horizontal", !0, !0, 35, k, k, 1e3, 1],
                    ["parallaxtoright", 15, 3, 1, 0, "horizontal", !0, !0, 36, k, i, 1500, 1],
                    ["parallaxtoleft", 12, 3, 1, 0, "horizontal", !0, !0, 37, k, i, 1500, 1],
                    ["parallaxtotop", 14, 3, 1, 0, "horizontal", !0, !0, 38, k, f, 1500, 1],
                    ["parallaxtobottom", 13, 3, 1, 0, "horizontal", !0, !0, 39, k, f, 1500, 1],
                    ["scaledownfromright", 12, 4, 1, 0, "horizontal", !0, !0, 40, k, i, 1e3, 1],
                    ["scaledownfromleft", 15, 4, 1, 0, "horizontal", !0, !0, 41, k, i, 1e3, 1],
                    ["scaledownfromtop", 14, 4, 1, 0, "horizontal", !0, !0, 42, k, i, 1e3, 1],
                    ["scaledownfrombottom", 13, 4, 1, 0, "horizontal", !0, !0, 43, k, i, 1e3, 1],
                    ["zoomout", 13, 5, 1, 0, "horizontal", !0, !0, 44, k, i, 1e3, 1],
                    ["zoomin", 13, 6, 1, 0, "horizontal", !0, !0, 45, k, i, 1e3, 1],
                    ["slidingoverlayup", 27, 0, 1, 0, "horizontal", !0, !0, 47, h, g, 2e3, 1],
                    ["slidingoverlaydown", 28, 0, 1, 0, "horizontal", !0, !0, 48, h, g, 2e3, 1],
                    ["slidingoverlayright", 30, 0, 1, 0, "horizontal", !0, !0, 49, h, g, 2e3, 1],
                    ["slidingoverlayleft", 29, 0, 1, 0, "horizontal", !0, !0, 50, h, g, 2e3, 1],
                    ["parallaxcirclesup", 31, 0, 1, 0, "horizontal", !0, !0, 51, k, f, 1500, 1],
                    ["parallaxcirclesdown", 32, 0, 1, 0, "horizontal", !0, !0, 52, k, f, 1500, 1],
                    ["parallaxcirclesright", 33, 0, 1, 0, "horizontal", !0, !0, 53, k, f, 1500, 1],
                    ["parallaxcirclesleft", 34, 0, 1, 0, "horizontal", !0, !0, 54, k, f, 1500, 1],
                    ["notransition", 26, 0, 1, 0, "horizontal", !0, null, 46, k, i, 1e3, 1],
                    ["parallaxright", 15, 3, 1, 0, "horizontal", !0, !0, 55, k, i, 1500, 1],
                    ["parallaxleft", 12, 3, 1, 0, "horizontal", !0, !0, 56, k, i, 1500, 1],
                    ["parallaxup", 14, 3, 1, 0, "horizontal", !0, !0, 57, k, f, 1500, 1],
                    ["parallaxdown", 13, 3, 1, 0, "horizontal", !0, !0, 58, k, f, 1500, 1],
                    ["grayscale", 11, 5, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["grayscalecross", 11, 6, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["brightness", 11, 7, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["brightnesscross", 11, 8, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["blurlight", 11, 9, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["blurlightcross", 11, 10, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["blurstrong", 11, 9, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1],
                    ["blurstrongcross", 11, 10, 1, 300, "horizontal", !0, null, 11, k, k, 1e3, 1]
                ]);
            e.duringslidechange = !0, e.testanims = !1, 1 == e.testanims && (e.nexttesttransform = void 0 === e.nexttesttransform ? 34 : e.nexttesttransform + 1, e.nexttesttransform = e.nexttesttransform > 70 ? 0 : e.nexttesttransform, b = v[e.nexttesttransform][0], console.log(b + "  " + e.nexttesttransform + "  " + v[e.nexttesttransform][1] + "  " + v[e.nexttesttransform][2])), jQuery.each(["parallaxcircles", "slidingoverlay", "slide", "slideover", "slideremove", "parallax", "parralaxto"], function(a, c) {
                b == c + "horizontal" && (b = 1 != d ? c + "left" : c + "right"), b == c + "vertical" && (b = 1 != d ? c + "up" : c + "down")
            }), "random" == b && (b = Math.round(Math.random() * v.length - 1)) > v.length - 1 && (b = v.length - 1), "random-static" == b && (b = Math.round(Math.random() * o.length - 1), b > o.length - 1 && (b = o.length - 1), b = o[b]), "random-premium" == b && (b = Math.round(Math.random() * p.length - 1), b > p.length - 1 && (b = p.length - 1), b = p[b]);
            var w = [12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
            if (1 == e.isJoomla && void 0 != window.MooTools && -1 != w.indexOf(b)) {
                var x = Math.round(Math.random() * (p.length - 2)) + 1;
                x > p.length - 1 && (x = p.length - 1), 0 == x && (x = 1), b = p[x]
            }
            y(), q > 30 && (q = 30), q < 0 && (q = 0);
            var z = new Object;
            return z.nexttrans = q, z.STA = v[s], z.specials = r, z
        },
        f = function(a, b) {
            return void 0 == b || jQuery.isNumeric(a) ? a : void 0 == a ? a : a.split(",")[b]
        },
        g = function(a, b, c, g, h, i, j, k) {
            function V(a, b, c, d, e) {
                var f = a.find(".slot"),
                    g = 6,
                    h = [2, 1.2, .9, .7, .55, .42],
                    j = a.width(),
                    l = a.height();
                f.wrap('<div class="slot-circle-wrapper" style="overflow:hidden;position:absolute;border:1px solid #fff"></div>');
                for (var n = 0; n < g; n++) f.parent().clone(!1).appendTo(i);
                a.find(".slot-circle-wrapper").each(function(a) {
                    if (a < g) {
                        var d = jQuery(this),
                            f = d.find(".slot"),
                            i = j > l ? h[a] * j : h[a] * l,
                            m = i,
                            n = m / 2 - j / 2 + 0,
                            o = i / 2 - l / 2 + 0,
                            p = 0 != a ? "50%" : "0",
                            q = l / 2 - i / 2,
                            r = 33 == c ? j / 2 - m / 2 : 34 == c ? j - m : j / 2 - m / 2,
                            s = {
                                scale: 1,
                                transformOrigo: "50% 50%",
                                width: m + "px",
                                height: i + "px",
                                top: q + "px",
                                left: r + "px",
                                borderRadius: p
                            },
                            t = {
                                scale: 1,
                                top: l / 2 - i / 2,
                                left: j / 2 - m / 2,
                                ease: e
                            },
                            u = o,
                            v = 33 == c ? n : 34 == c ? n + j / 2 : n,
                            w = {
                                width: j,
                                height: l,
                                autoAlpha: 1,
                                top: u + "px",
                                position: "absolute",
                                left: v + "px"
                            },
                            x = {
                                top: o + "px",
                                left: n + "px",
                                ease: e
                            },
                            y = b,
                            z = 0;
                        k.add(punchgs.TweenLite.fromTo(d, y, s, t), z), k.add(punchgs.TweenLite.fromTo(f, y, w, x), z), k.add(punchgs.TweenLite.fromTo(d, .001, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1
                        }), 0)
                    }
                })
            }
            var l = c[0].opt,
                m = h.index(),
                n = g.index(),
                o = n < m ? 1 : 0;
            "arrow" == l.sc_indicator && (o = l.sc_indicator_dir);
            var p = e(c, b, i, o),
                q = p.STA,
                r = p.specials,
                a = p.nexttrans;
            "on" == i.data("kenburns") && (a = 11);
            var s = g.data("nexttransid") || 0,
                t = f(g.data("masterspeed"), s);
            t = "default" === t ? q[11] : "random" === t ? Math.round(1e3 * Math.random() + 300) : void 0 != t ? parseInt(t, 0) : q[11], t = t > l.delay ? l.delay : t, t += q[4], l.slots = f(g.data("slotamount"), s), l.slots = void 0 == l.slots || "default" == l.slots ? q[12] : "random" == l.slots ? Math.round(12 * Math.random() + 4) : l.slots, l.slots = l.slots < 1 ? "boxslide" == b ? Math.round(6 * Math.random() + 3) : "flyin" == b ? Math.round(4 * Math.random() + 1) : l.slots : l.slots, l.slots = (4 == a || 5 == a || 6 == a) && l.slots < 3 ? 3 : l.slots, l.slots = 0 != q[3] ? Math.min(l.slots, q[3]) : l.slots, l.slots = 9 == a ? l.width / l.slots : 10 == a ? l.height / l.slots : l.slots, l.rotate = f(g.data("rotate"), s), l.rotate = void 0 == l.rotate || "default" == l.rotate ? 0 : 999 == l.rotate || "random" == l.rotate ? Math.round(360 * Math.random()) : l.rotate, l.rotate = l.ie || l.ie9 ? 0 : l.rotate, 11 != a && (null != q[7] && d(j, l, q[7], q[5]), null != q[6] && d(i, l, q[6], q[5])), k.add(punchgs.TweenLite.set(i.find(".defaultvid"), {
                y: 0,
                x: 0,
                top: 0,
                left: 0,
                scale: 1
            }), 0), k.add(punchgs.TweenLite.set(j.find(".defaultvid"), {
                y: 0,
                x: 0,
                top: 0,
                left: 0,
                scale: 1
            }), 0), k.add(punchgs.TweenLite.set(i.find(".defaultvid"), {
                y: "+0%",
                x: "+0%"
            }), 0), k.add(punchgs.TweenLite.set(j.find(".defaultvid"), {
                y: "+0%",
                x: "+0%"
            }), 0), k.add(punchgs.TweenLite.set(i, {
                autoAlpha: 1,
                y: "+0%",
                x: "+0%"
            }), 0), k.add(punchgs.TweenLite.set(j, {
                autoAlpha: 1,
                y: "+0%",
                x: "+0%"
            }), 0), k.add(punchgs.TweenLite.set(i.parent(), {
                backgroundColor: "transparent"
            }), 0), k.add(punchgs.TweenLite.set(j.parent(), {
                backgroundColor: "transparent"
            }), 0);
            var u = f(g.data("easein"), s),
                v = f(g.data("easeout"), s);
            if (u = "default" === u ? q[9] || punchgs.Power2.easeInOut : u || q[9] || punchgs.Power2.easeInOut, v = "default" === v ? q[10] || punchgs.Power2.easeInOut : v || q[10] || punchgs.Power2.easeInOut, 0 == a) {
                var w = Math.ceil(l.height / l.sloth),
                    x = 0;
                i.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    x += 1, x == w && (x = 0), k.add(punchgs.TweenLite.from(b, t / 600, {
                        opacity: 0,
                        top: 0 - l.sloth,
                        left: 0 - l.slotw,
                        rotation: l.rotate,
                        force3D: "auto",
                        ease: u
                    }), (15 * a + 30 * x) / 1500)
                })
            }
            if (1 == a) {
                var y, z = 0;
                i.find(".slotslide").each(function(a) {
                    var b = jQuery(this),
                        c = Math.random() * t + 300,
                        d = 500 * Math.random() + 200;
                    c + d > y && (y = d + d, z = a), k.add(punchgs.TweenLite.from(b, c / 1e3, {
                        autoAlpha: 0,
                        force3D: "auto",
                        rotation: l.rotate,
                        ease: u
                    }), d / 1e3)
                })
            }
            if (2 == a) {
                var A = new punchgs.TimelineLite;
                j.find(".slotslide").each(function() {
                    var a = jQuery(this);
                    A.add(punchgs.TweenLite.to(a, t / 1e3, {
                        left: l.slotw,
                        ease: u,
                        force3D: "auto",
                        rotation: 0 - l.rotate
                    }), 0), k.add(A, 0)
                }), i.find(".slotslide").each(function() {
                    var a = jQuery(this);
                    A.add(punchgs.TweenLite.from(a, t / 1e3, {
                        left: 0 - l.slotw,
                        ease: u,
                        force3D: "auto",
                        rotation: l.rotate
                    }), 0), k.add(A, 0)
                })
            }
            if (3 == a) {
                var A = new punchgs.TimelineLite;
                j.find(".slotslide").each(function() {
                    var a = jQuery(this);
                    A.add(punchgs.TweenLite.to(a, t / 1e3, {
                        top: l.sloth,
                        ease: u,
                        rotation: l.rotate,
                        force3D: "auto",
                        transformPerspective: 600
                    }), 0), k.add(A, 0)
                }), i.find(".slotslide").each(function() {
                    var a = jQuery(this);
                    A.add(punchgs.TweenLite.from(a, t / 1e3, {
                        top: 0 - l.sloth,
                        rotation: l.rotate,
                        ease: v,
                        force3D: "auto",
                        transformPerspective: 600
                    }), 0), k.add(A, 0)
                })
            }
            if (4 == a || 5 == a) {
                setTimeout(function() {
                    j.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var B = t / 1e3,
                    A = new punchgs.TimelineLite;
                j.find(".slotslide").each(function(b) {
                    var c = jQuery(this),
                        d = b * B / l.slots;
                    5 == a && (d = (l.slots - b - 1) * B / l.slots / 1.5), A.add(punchgs.TweenLite.to(c, 3 * B, {
                        transformPerspective: 600,
                        force3D: "auto",
                        top: 0 + l.height,
                        opacity: .5,
                        rotation: l.rotate,
                        ease: u,
                        delay: d
                    }), 0), k.add(A, 0)
                }), i.find(".slotslide").each(function(b) {
                    var c = jQuery(this),
                        d = b * B / l.slots;
                    5 == a && (d = (l.slots - b - 1) * B / l.slots / 1.5), A.add(punchgs.TweenLite.from(c, 3 * B, {
                        top: 0 - l.height,
                        opacity: .5,
                        rotation: l.rotate,
                        force3D: "auto",
                        ease: punchgs.eo,
                        delay: d
                    }), 0), k.add(A, 0)
                })
            }
            if (6 == a) {
                l.slots < 2 && (l.slots = 2), l.slots % 2 && (l.slots = l.slots + 1);
                var A = new punchgs.TimelineLite;
                setTimeout(function() {
                    j.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100), j.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    if (a + 1 < l.slots / 2) var c = 90 * (a + 2);
                    else var c = 90 * (2 + l.slots - a);
                    A.add(punchgs.TweenLite.to(b, (t + c) / 1e3, {
                        top: 0 + l.height,
                        opacity: 1,
                        force3D: "auto",
                        rotation: l.rotate,
                        ease: u
                    }), 0), k.add(A, 0)
                }), i.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    if (a + 1 < l.slots / 2) var c = 90 * (a + 2);
                    else var c = 90 * (2 + l.slots - a);
                    A.add(punchgs.TweenLite.from(b, (t + c) / 1e3, {
                        top: 0 - l.height,
                        opacity: 1,
                        force3D: "auto",
                        rotation: l.rotate,
                        ease: v
                    }), 0), k.add(A, 0)
                })
            }
            if (7 == a) {
                t *= 2, t > l.delay && (t = l.delay);
                var A = new punchgs.TimelineLite;
                setTimeout(function() {
                    j.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100), j.find(".slotslide").each(function() {
                    var a = jQuery(this).find("div");
                    A.add(punchgs.TweenLite.to(a, t / 1e3, {
                        left: 0 - l.slotw / 2 + "px",
                        top: 0 - l.height / 2 + "px",
                        width: 2 * l.slotw + "px",
                        height: 2 * l.height + "px",
                        opacity: 0,
                        rotation: l.rotate,
                        force3D: "auto",
                        ease: u
                    }), 0), k.add(A, 0)
                }), i.find(".slotslide").each(function(a) {
                    var b = jQuery(this).find("div");
                    A.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        left: 0,
                        top: 0,
                        opacity: 0,
                        transformPerspective: 600
                    }, {
                        left: 0 - a * l.slotw + "px",
                        ease: v,
                        force3D: "auto",
                        top: "0px",
                        width: l.width,
                        height: l.height,
                        opacity: 1,
                        rotation: 0,
                        delay: .1
                    }), 0), k.add(A, 0)
                })
            }
            if (8 == a) {
                t *= 3, t > l.delay && (t = l.delay);
                var A = new punchgs.TimelineLite;
                j.find(".slotslide").each(function() {
                    var a = jQuery(this).find("div");
                    A.add(punchgs.TweenLite.to(a, t / 1e3, {
                        left: 0 - l.width / 2 + "px",
                        top: 0 - l.sloth / 2 + "px",
                        width: 2 * l.width + "px",
                        height: 2 * l.sloth + "px",
                        force3D: "auto",
                        ease: u,
                        opacity: 0,
                        rotation: l.rotate
                    }), 0), k.add(A, 0)
                }), i.find(".slotslide").each(function(a) {
                    var b = jQuery(this).find("div");
                    A.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        left: 0,
                        top: 0,
                        opacity: 0,
                        force3D: "auto"
                    }, {
                        left: "0px",
                        top: 0 - a * l.sloth + "px",
                        width: i.find(".defaultimg").data("neww") + "px",
                        height: i.find(".defaultimg").data("newh") + "px",
                        opacity: 1,
                        ease: v,
                        rotation: 0
                    }), 0), k.add(A, 0)
                })
            }
            if (9 == a || 10 == a) {
                var D = 0;
                i.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    D++, k.add(punchgs.TweenLite.fromTo(b, t / 2e3, {
                        autoAlpha: 0,
                        force3D: "auto",
                        transformPerspective: 600
                    }, {
                        autoAlpha: 1,
                        ease: u,
                        delay: a * l.slots / 100 / 2e3
                    }), 0)
                })
            }
            if (27 == a || 28 == a || 29 == a || 30 == a) {
                var E = i.find(".slot"),
                    F = 27 == a || 28 == a ? 1 : 2,
                    G = 27 == a || 29 == a ? "-100%" : "+100%",
                    H = 27 == a || 29 == a ? "+100%" : "-100%",
                    I = 27 == a || 29 == a ? "-80%" : "80%",
                    J = 27 == a || 29 == a ? "+80%" : "-80%",
                    K = 27 == a || 29 == a ? "+10%" : "-10%",
                    L = {
                        overwrite: "all"
                    },
                    M = {
                        autoAlpha: 0,
                        zIndex: 1,
                        force3D: "auto",
                        ease: u
                    },
                    N = {
                        position: "inherit",
                        autoAlpha: 0,
                        overwrite: "all",
                        zIndex: 1
                    },
                    O = {
                        autoAlpha: 1,
                        force3D: "auto",
                        ease: v
                    },
                    P = {
                        overwrite: "all",
                        zIndex: 2,
                        opacity: 1,
                        autoAlpha: 1
                    },
                    Q = {
                        autoAlpha: 1,
                        force3D: "auto",
                        overwrite: "all",
                        ease: u
                    },
                    R = {
                        overwrite: "all",
                        zIndex: 2,
                        autoAlpha: 1
                    },
                    S = {
                        autoAlpha: 1,
                        force3D: "auto",
                        ease: u
                    },
                    T = 1 == F ? "y" : "x";
                L[T] = "0px", M[T] = G, N[T] = K, O[T] = "0%", P[T] = H, Q[T] = G, R[T] = I, S[T] = J, E.append('<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'), k.add(punchgs.TweenLite.fromTo(j, t / 1e3, L, M), 0), k.add(punchgs.TweenLite.fromTo(i.find(".defaultimg"), t / 2e3, N, O), t / 2e3), k.add(punchgs.TweenLite.fromTo(E, t / 1e3, P, Q), 0), k.add(punchgs.TweenLite.fromTo(E.find(".slotslide div"), t / 1e3, R, S), 0)
            }
            if (31 == a || 32 == a || 33 == a || 34 == a) {
                t = 6e3, u = punchgs.Power3.easeInOut;
                var U = t / 1e3;
                mas = U - U / 5, _nt = a, fy = 31 == _nt ? "+100%" : 32 == _nt ? "-100%" : "0%", fx = 33 == _nt ? "+100%" : 34 == _nt ? "-100%" : "0%", ty = 31 == _nt ? "-100%" : 32 == _nt ? "+100%" : "0%", tx = 33 == _nt ? "-100%" : 34 == _nt ? "+100%" : "0%", k.add(punchgs.TweenLite.fromTo(j, U - .2 * U, {
                    y: 0,
                    x: 0
                }, {
                    y: ty,
                    x: tx,
                    ease: v
                }), .2 * U), k.add(punchgs.TweenLite.fromTo(i, U, {
                    y: fy,
                    x: fx
                }, {
                    y: "0%",
                    x: "0%",
                    ease: u
                }), 0), i.find(".slot").remove(), i.find(".defaultimg").clone().appendTo(i).addClass("slot"), V(i, U, _nt, "in", u)
            }
            if (11 == a) {
                r > 12 && (r = 0);
                var D = 0,
                    W = 2 == r ? "#000000" : 3 == r ? "#ffffff" : "transparent";
                switch (r) {
                    case 0:
                        k.add(punchgs.TweenLite.fromTo(i, t / 1e3, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1,
                            force3D: "auto",
                            ease: u
                        }), 0);
                        break;
                    case 1:
                        k.add(punchgs.TweenLite.fromTo(i, t / 1e3, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1,
                            force3D: "auto",
                            ease: u
                        }), 0), k.add(punchgs.TweenLite.fromTo(j, t / 1e3, {
                            autoAlpha: 1
                        }, {
                            autoAlpha: 0,
                            force3D: "auto",
                            ease: u
                        }), 0);
                        break;
                    case 2:
                    case 3:
                    case 4:
                        k.add(punchgs.TweenLite.set(j.parent(), {
                            backgroundColor: W,
                            force3D: "auto"
                        }), 0), k.add(punchgs.TweenLite.set(i.parent(), {
                            backgroundColor: "transparent",
                            force3D: "auto"
                        }), 0), k.add(punchgs.TweenLite.to(j, t / 2e3, {
                            autoAlpha: 0,
                            force3D: "auto",
                            ease: u
                        }), 0), k.add(punchgs.TweenLite.fromTo(i, t / 2e3, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1,
                            force3D: "auto",
                            ease: u
                        }), t / 2e3);
                        break;
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        var X = jQuery.inArray(r, [9, 10]) >= 0 ? 5 : jQuery.inArray(r, [11, 12]) >= 0 ? 10 : 0,
                            Y = jQuery.inArray(r, [5, 6, 7, 8]) >= 0 ? 100 : 0,
                            Z = jQuery.inArray(r, [7, 8]) >= 0 ? 300 : 0,
                            $ = "blur(" + X + "px) grayscale(" + Y + "%) brightness(" + Z + "%)",
                            _ = "blur(0px) grayscale(0%) brightness(100%)";
                        k.add(punchgs.TweenLite.fromTo(i, t / 1e3, {
                            autoAlpha: 0,
                            filter: $,
                            "-webkit-filter": $
                        }, {
                            autoAlpha: 1,
                            filter: _,
                            "-webkit-filter": _,
                            force3D: "auto",
                            ease: u
                        }), 0), jQuery.inArray(r, [6, 8, 10]) >= 0 && k.add(punchgs.TweenLite.fromTo(j, t / 1e3, {
                            autoAlpha: 1,
                            filter: _,
                            "-webkit-filter": _
                        }, {
                            autoAlpha: 0,
                            force3D: "auto",
                            ease: u,
                            filter: $,
                            "-webkit-filter": $
                        }), 0)
                }
                k.add(punchgs.TweenLite.set(i.find(".defaultimg"), {
                    autoAlpha: 1
                }), 0), k.add(punchgs.TweenLite.set(j.find("defaultimg"), {
                    autoAlpha: 1
                }), 0)
            }
            if (26 == a) {
                var D = 0;
                t = 0, k.add(punchgs.TweenLite.fromTo(i, t / 1e3, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    force3D: "auto",
                    ease: u
                }), 0), k.add(punchgs.TweenLite.to(j, t / 1e3, {
                    autoAlpha: 0,
                    force3D: "auto",
                    ease: u
                }), 0), k.add(punchgs.TweenLite.set(i.find(".defaultimg"), {
                    autoAlpha: 1
                }), 0), k.add(punchgs.TweenLite.set(j.find("defaultimg"), {
                    autoAlpha: 1
                }), 0)
            }
            if (12 == a || 13 == a || 14 == a || 15 == a) {
                t = t, t > l.delay && (t = l.delay), setTimeout(function() {
                    punchgs.TweenLite.set(j.find(".defaultimg"), {
                        autoAlpha: 0
                    })
                }, 100);
                var aa = l.width,
                    ba = l.height,
                    ca = i.find(".slotslide, .defaultvid"),
                    da = 0,
                    ea = 0,
                    fa = 1,
                    ga = 1,
                    ha = 1,
                    ia = t / 1e3,
                    ja = ia;
                "fullwidth" != l.sliderLayout && "fullscreen" != l.sliderLayout || (aa = ca.width(), ba = ca.height()), 12 == a ? da = aa : 15 == a ? da = 0 - aa : 13 == a ? ea = ba : 14 == a && (ea = 0 - ba), 1 == r && (fa = 0), 2 == r && (fa = 0), 3 == r && (ia = t / 1300), 4 != r && 5 != r || (ga = .6), 6 == r && (ga = 1.4), 5 != r && 6 != r || (ha = 1.4, fa = 0, aa = 0, ba = 0, da = 0, ea = 0), 6 == r && (ha = .6);
                7 == r && (aa = 0, ba = 0);
                var la = i.find(".slotslide"),
                    ma = j.find(".slotslide, .defaultvid");
                if (k.add(punchgs.TweenLite.set(h, {
                        zIndex: 15
                    }), 0), k.add(punchgs.TweenLite.set(g, {
                        zIndex: 20
                    }), 0), 8 == r ? (k.add(punchgs.TweenLite.set(h, {
                        zIndex: 20
                    }), 0), k.add(punchgs.TweenLite.set(g, {
                        zIndex: 15
                    }), 0), k.add(punchgs.TweenLite.set(la, {
                        left: 0,
                        top: 0,
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        ease: u,
                        force3D: "auto"
                    }), 0)) : k.add(punchgs.TweenLite.from(la, ia, {
                        left: da,
                        top: ea,
                        scale: ha,
                        opacity: fa,
                        rotation: l.rotate,
                        ease: u,
                        force3D: "auto"
                    }), 0), 4 != r && 5 != r || (aa = 0, ba = 0), 1 != r) switch (a) {
                    case 12:
                        k.add(punchgs.TweenLite.to(ma, ja, {
                            left: 0 - aa + "px",
                            force3D: "auto",
                            scale: ga,
                            opacity: fa,
                            rotation: l.rotate,
                            ease: v
                        }), 0);
                        break;
                    case 15:
                        k.add(punchgs.TweenLite.to(ma, ja, {
                            left: aa + "px",
                            force3D: "auto",
                            scale: ga,
                            opacity: fa,
                            rotation: l.rotate,
                            ease: v
                        }), 0);
                        break;
                    case 13:
                        k.add(punchgs.TweenLite.to(ma, ja, {
                            top: 0 - ba + "px",
                            force3D: "auto",
                            scale: ga,
                            opacity: fa,
                            rotation: l.rotate,
                            ease: v
                        }), 0);
                        break;
                    case 14:
                        k.add(punchgs.TweenLite.to(ma, ja, {
                            top: ba + "px",
                            force3D: "auto",
                            scale: ga,
                            opacity: fa,
                            rotation: l.rotate,
                            ease: v
                        }), 0)
                }
            }
            if (16 == a) {
                var A = new punchgs.TimelineLite;
                k.add(punchgs.TweenLite.set(h, {
                    position: "absolute",
                    "z-index": 20
                }), 0), k.add(punchgs.TweenLite.set(g, {
                    position: "absolute",
                    "z-index": 15
                }), 0), h.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>'), h.find(".tp-half-one").clone(!0).appendTo(h).addClass("tp-half-two"), h.find(".tp-half-two").removeClass("tp-half-one");
                var aa = l.width,
                    ba = l.height;
                "on" == l.autoHeight && (ba = c.height()), h.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:' + aa + "px;height:" + ba + 'px;"></div>'), h.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:' + aa + "px;height:" + ba + 'px;"></div>'), h.find(".tp-half-two .defaultimg").css({
                    position: "absolute",
                    top: "-50%"
                }), h.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>'), k.add(punchgs.TweenLite.set(h.find(".tp-half-two"), {
                    width: aa,
                    height: ba,
                    overflow: "hidden",
                    zIndex: 15,
                    position: "absolute",
                    top: ba / 2,
                    left: "0px",
                    transformPerspective: 600,
                    transformOrigin: "center bottom"
                }), 0), k.add(punchgs.TweenLite.set(h.find(".tp-half-one"), {
                    width: aa,
                    height: ba / 2,
                    overflow: "visible",
                    zIndex: 10,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    transformPerspective: 600,
                    transformOrigin: "center top"
                }), 0);
                var oa = (h.find(".defaultimg"), Math.round(20 * Math.random() - 10)),
                    pa = Math.round(20 * Math.random() - 10),
                    qa = Math.round(20 * Math.random() - 10),
                    ra = .4 * Math.random() - .2,
                    sa = .4 * Math.random() - .2,
                    ta = 1 * Math.random() + 1,
                    ua = 1 * Math.random() + 1,
                    va = .3 * Math.random() + .3;
                k.add(punchgs.TweenLite.set(h.find(".tp-half-one"), {
                    overflow: "hidden"
                }), 0), k.add(punchgs.TweenLite.fromTo(h.find(".tp-half-one"), t / 800, {
                    width: aa,
                    height: ba / 2,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    force3D: "auto",
                    transformOrigin: "center top"
                }, {
                    scale: ta,
                    rotation: oa,
                    y: 0 - ba - ba / 4,
                    autoAlpha: 0,
                    ease: u
                }), 0), k.add(punchgs.TweenLite.fromTo(h.find(".tp-half-two"), t / 800, {
                    width: aa,
                    height: ba,
                    overflow: "hidden",
                    position: "absolute",
                    top: ba / 2,
                    left: "0px",
                    force3D: "auto",
                    transformOrigin: "center bottom"
                }, {
                    scale: ua,
                    rotation: pa,
                    y: ba + ba / 4,
                    ease: u,
                    autoAlpha: 0,
                    onComplete: function() {
                        punchgs.TweenLite.set(h, {
                            position: "absolute",
                            "z-index": 15
                        }), punchgs.TweenLite.set(g, {
                            position: "absolute",
                            "z-index": 20
                        }), h.find(".tp-half-one").length > 0 && (h.find(".tp-half-one .defaultimg").unwrap(), h.find(".tp-half-one .slotholder").unwrap()), h.find(".tp-half-two").remove()
                    }
                }), 0), A.add(punchgs.TweenLite.set(i.find(".defaultimg"), {
                    autoAlpha: 1
                }), 0), null != h.html() && k.add(punchgs.TweenLite.fromTo(g, (t - 200) / 1e3, {
                    scale: va,
                    x: l.width / 4 * ra,
                    y: ba / 4 * sa,
                    rotation: qa,
                    force3D: "auto",
                    transformOrigin: "center center",
                    ease: v
                }, {
                    autoAlpha: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotation: 0
                }), 0), k.add(A, 0)
            }
            if (17 == a && i.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    k.add(punchgs.TweenLite.fromTo(b, t / 800, {
                        opacity: 0,
                        rotationY: 0,
                        scale: .9,
                        rotationX: -110,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: "center center"
                    }, {
                        opacity: 1,
                        top: 0,
                        left: 0,
                        scale: 1,
                        rotation: 0,
                        rotationX: 0,
                        force3D: "auto",
                        rotationY: 0,
                        ease: u,
                        delay: .06 * a
                    }), 0)
                }), 18 == a && i.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    k.add(punchgs.TweenLite.fromTo(b, t / 500, {
                        autoAlpha: 0,
                        rotationY: 110,
                        scale: .9,
                        rotationX: 10,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: "center center"
                    }, {
                        autoAlpha: 1,
                        top: 0,
                        left: 0,
                        scale: 1,
                        rotation: 0,
                        rotationX: 0,
                        force3D: "auto",
                        rotationY: 0,
                        ease: u,
                        delay: .06 * a
                    }), 0)
                }), 19 == a || 22 == a) {
                var A = new punchgs.TimelineLite;
                k.add(punchgs.TweenLite.set(h, {
                    zIndex: 20
                }), 0), k.add(punchgs.TweenLite.set(g, {
                    zIndex: 20
                }), 0), setTimeout(function() {
                    j.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var wa = 90,
                    fa = 1,
                    xa = "center center ";
                1 == o && (wa = -90), 19 == a ? (xa = xa + "-" + l.height / 2, fa = 0) : xa += l.height / 2, punchgs.TweenLite.set(c, {
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    transformPerspective: 600
                }), i.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    A.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        transformStyle: "flat",
                        backfaceVisibility: "hidden",
                        left: 0,
                        rotationY: l.rotate,
                        z: 10,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: xa,
                        rotationX: wa
                    }, {
                        left: 0,
                        rotationY: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        force3D: "auto",
                        rotationX: 0,
                        delay: 50 * a / 1e3,
                        ease: u
                    }), 0), A.add(punchgs.TweenLite.to(b, .1, {
                        autoAlpha: 1,
                        delay: 50 * a / 1e3
                    }), 0), k.add(A)
                }), j.find(".slotslide").each(function(a) {
                    var b = jQuery(this),
                        c = -90;
                    1 == o && (c = 90), A.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        transformStyle: "flat",
                        backfaceVisibility: "hidden",
                        autoAlpha: 1,
                        rotationY: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: xa,
                        rotationX: 0
                    }, {
                        autoAlpha: 1,
                        rotationY: l.rotate,
                        top: 0,
                        z: 10,
                        scale: 1,
                        rotationX: c,
                        delay: 50 * a / 1e3,
                        force3D: "auto",
                        ease: v
                    }), 0), k.add(A)
                }), k.add(punchgs.TweenLite.set(h, {
                    zIndex: 18
                }), 0)
            }
            if (20 == a) {
                if (setTimeout(function() {
                        j.find(".defaultimg").css({
                            opacity: 0
                        })
                    }, 100), 1 == o) var ya = -l.width,
                    wa = 80,
                    xa = "20% 70% -" + l.height / 2;
                else var ya = l.width,
                    wa = -80,
                    xa = "80% 70% -" + l.height / 2;
                i.find(".slotslide").each(function(a) {
                    var b = jQuery(this),
                        c = 50 * a / 1e3;
                    k.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        left: ya,
                        rotationX: 40,
                        z: -600,
                        opacity: fa,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: xa,
                        transformStyle: "flat",
                        rotationY: wa
                    }, {
                        left: 0,
                        rotationX: 0,
                        opacity: 1,
                        top: 0,
                        z: 0,
                        scale: 1,
                        rotationY: 0,
                        delay: c,
                        ease: u
                    }), 0)
                }), j.find(".slotslide").each(function(a) {
                    var b = jQuery(this),
                        c = 50 * a / 1e3;
                    if (c = a > 0 ? c + t / 9e3 : 0, 1 != o) var d = -l.width / 2,
                        e = 30,
                        f = "20% 70% -" + l.height / 2;
                    else var d = l.width / 2,
                        e = -30,
                        f = "80% 70% -" + l.height / 2;
                    v = punchgs.Power2.easeInOut, k.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        opacity: 1,
                        rotationX: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        left: 0,
                        force3D: "auto",
                        transformPerspective: 600,
                        transformOrigin: f,
                        transformStyle: "flat",
                        rotationY: 0
                    }, {
                        opacity: 1,
                        rotationX: 20,
                        top: 0,
                        z: -600,
                        left: d,
                        force3D: "auto",
                        rotationY: e,
                        delay: c,
                        ease: v
                    }), 0)
                })
            }
            if (21 == a || 25 == a) {
                setTimeout(function() {
                    j.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var wa = 90,
                    ya = -l.width,
                    za = -wa;
                if (1 == o)
                    if (25 == a) {
                        var xa = "center top 0";
                        wa = l.rotate
                    } else {
                        var xa = "left center 0";
                        za = l.rotate
                    }
                else if (ya = l.width, wa = -90, 25 == a) {
                    var xa = "center bottom 0";
                    za = -wa, wa = l.rotate
                } else {
                    var xa = "right center 0";
                    za = l.rotate
                }
                i.find(".slotslide").each(function(a) {
                    var b = jQuery(this),
                        c = t / 1.5 / 3;
                    k.add(punchgs.TweenLite.fromTo(b, 2 * c / 1e3, {
                        left: 0,
                        transformStyle: "flat",
                        rotationX: za,
                        z: 0,
                        autoAlpha: 0,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 1200,
                        transformOrigin: xa,
                        rotationY: wa
                    }, {
                        left: 0,
                        rotationX: 0,
                        top: 0,
                        z: 0,
                        autoAlpha: 1,
                        scale: 1,
                        rotationY: 0,
                        force3D: "auto",
                        delay: c / 1e3,
                        ease: u
                    }), 0)
                }), 1 != o ? (ya = -l.width, wa = 90, 25 == a ? (xa = "center top 0", za = -wa, wa = l.rotate) : (xa = "left center 0", za = l.rotate)) : (ya = l.width, wa = -90, 25 == a ? (xa = "center bottom 0", za = -wa, wa = l.rotate) : (xa = "right center 0", za = l.rotate)), j.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    k.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        left: 0,
                        transformStyle: "flat",
                        rotationX: 0,
                        z: 0,
                        autoAlpha: 1,
                        top: 0,
                        scale: 1,
                        force3D: "auto",
                        transformPerspective: 1200,
                        transformOrigin: xa,
                        rotationY: 0
                    }, {
                        left: 0,
                        rotationX: za,
                        top: 0,
                        z: 0,
                        autoAlpha: 1,
                        force3D: "auto",
                        scale: 1,
                        rotationY: wa,
                        ease: v
                    }), 0)
                })
            }
            if (23 == a || 24 == a) {
                setTimeout(function() {
                    j.find(".defaultimg").css({
                        opacity: 0
                    })
                }, 100);
                var wa = -90,
                    fa = 1,
                    Aa = 0;
                if (1 == o && (wa = 90), 23 == a) {
                    var xa = "center center -" + l.width / 2;
                    fa = 0
                } else var xa = "center center " + l.width / 2;
                punchgs.TweenLite.set(c, {
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    perspective: 2500
                }), i.find(".slotslide").each(function(a) {
                    var b = jQuery(this);
                    k.add(punchgs.TweenLite.fromTo(b, t / 1e3, {
                        left: Aa,
                        rotationX: l.rotate,
                        force3D: "auto",
                        opacity: fa,
                        top: 0,
                        scale: 1,
                        transformPerspective: 1200,
                        transformOrigin: xa,
                        rotationY: wa
                    }, {
                        left: 0,
                        rotationX: 0,
                        autoAlpha: 1,
                        top: 0,
                        z: 0,
                        scale: 1,
                        rotationY: 0,
                        delay: 50 * a / 500,
                        ease: u
                    }), 0)
                }), wa = 90, 1 == o && (wa = -90), j.find(".slotslide").each(function(b) {
                    var c = jQuery(this);
                    k.add(punchgs.TweenLite.fromTo(c, t / 1e3, {
                        left: 0,
                        rotationX: 0,
                        top: 0,
                        z: 0,
                        scale: 1,
                        force3D: "auto",
                        transformStyle: "flat",
                        transformPerspective: 1200,
                        transformOrigin: xa,
                        rotationY: 0
                    }, {
                        left: Aa,
                        rotationX: l.rotate,
                        top: 0,
                        scale: 1,
                        rotationY: wa,
                        delay: 50 * b / 500,
                        ease: v
                    }), 0), 23 == a && k.add(punchgs.TweenLite.fromTo(c, t / 2e3, {
                        autoAlpha: 1
                    }, {
                        autoAlpha: 0,
                        delay: 50 * b / 500 + t / 3e3,
                        ease: v
                    }), 0)
                })
            }
            return k
        }
}(jQuery);












/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - VIDEO FUNCTIONS
 * @version: 2.2.1 (15.01.2018)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
! function(e) {
    "use strict";

    function t(e) {
        return void 0 == e ? -1 : jQuery.isNumeric(e) ? e : e.split(":").length > 1 ? 60 * parseInt(e.split(":")[0], 0) + parseInt(e.split(":")[1], 0) : e
    }
    var a = jQuery.fn.revolution,
        i = a.is_mobile(),
        o = (a.is_android(), {
            alias: "Video Min JS",
            name: "revolution.extensions.video.min.js",
            min_core: "5.4.6.4",
            version: "2.2.0"
        });
    jQuery.extend(!0, a, {
        preLoadAudio: function(e, t) {
            if ("stop" === a.compare_version(o).check) return !1;
            e.find(".tp-audiolayer").each(function() {
                var e = jQuery(this),
                    i = {};
                0 === e.find("audio").length && (i.src = void 0 != e.data("videomp4") ? e.data("videomp4") : "", i.pre = e.data("videopreload") || "", void 0 === e.attr("id") && e.attr("audio-layer-" + Math.round(199999 * Math.random())), i.id = e.attr("id"), i.status = "prepared", i.start = jQuery.now(), i.waittime = 1e3 * e.data("videopreloadwait") || 5e3, "auto" != i.pre && "canplaythrough" != i.pre && "canplay" != i.pre && "progress" != i.pre || (void 0 === t.audioqueue && (t.audioqueue = []), t.audioqueue.push(i), a.manageVideoLayer(e, t)))
            })
        },
        preLoadAudioDone: function(e, t, a) {
            t.audioqueue && t.audioqueue.length > 0 && jQuery.each(t.audioqueue, function(t, i) {
                e.data("videomp4") !== i.src || i.pre !== a && "auto" !== i.pre || (i.status = "loaded")
            })
        },
        resetVideo: function(e, o, d, r) {
            var n = e.data();
            switch (n.videotype) {
                case "youtube":
                    n.player;
                    try {
                        if ("on" == n.forcerewind) {
                            var s = -1 == (g = t(e.data("videostartat"))),
                                l = 1 === n.bgvideo || e.find(".tp-videoposter").length > 0;
                            void 0 != n.player && (g = -1 == g ? 0 : g, n.player.seekTo(g), n.player.pauseVideo())
                        }
                    } catch (e) {}
                    0 == e.find(".tp-videoposter").length && 1 !== n.bgvideo && !0 !== d && punchgs.TweenLite.to(e.find("iframe"), .3, {
                        autoAlpha: 1,
                        display: "block",
                        ease: punchgs.Power3.easeInOut
                    });
                    break;
                case "vimeo":
                    if (!r) {
                        var u = e.data("vimeoplayer");
                        try {
                            if ("on" == n.forcerewind) {
                                var s = -1 == (g = t(n.videostartat)),
                                    l = 1 === n.bgvideo || e.find(".tp-videoposter").length > 0;
                                (0 !== (g = -1 == g ? 0 : g) && !s || l) && (u.setCurrentTime(g), u.pause())
                            }
                        } catch (e) {}
                    }
                    0 == e.find(".tp-videoposter").length && 1 !== n.bgvideo && !0 !== d && punchgs.TweenLite.to(e.find("iframe"), .3, {
                        autoAlpha: 1,
                        display: "block",
                        ease: punchgs.Power3.easeInOut
                    });
                    break;
                case "html5":
                    if (i && 1 == n.disablevideoonmobile) return !1;
                    var p = "html5" == n.audio ? "audio" : "video",
                        v = e.find(p),
                        c = v[0];
                    if (punchgs.TweenLite.to(v, .3, {
                            autoAlpha: 1,
                            display: "block",
                            ease: punchgs.Power3.easeInOut
                        }), "on" == n.forcerewind && !e.hasClass("videoisplaying")) try {
                        var g = t(n.videostartat);
                        c.currentTime = -1 == g ? 0 : g
                    } catch (e) {}("mute" == n.volume || a.lastToggleState(e.videomutetoggledby) || !0 === o.globalmute) && (c.muted = !0)
            }
        },
        isVideoMuted: function(e, t) {
            var a = !1,
                i = e.data();
            switch (i.videotype) {
                case "youtube":
                    try {
                        a = i.player.isMuted()
                    } catch (e) {}
                    break;
                case "vimeo":
                    try {
                        "mute" == i.volume && (a = !0)
                    } catch (e) {}
                    break;
                case "html5":
                    var o = "html5" == i.audio ? "audio" : "video";
                    e.find(o)[0].muted && (a = !0)
            }
            return a
        },
        muteVideo: function(e, t) {
            var a = e.data();
            switch (a.videotype) {
                case "youtube":
                    try {
                        a.player.mute()
                    } catch (e) {}
                    break;
                case "vimeo":
                    try {
                        var i = e.data("vimeoplayer");
                        e.data("volume", "mute"), i.setVolume(0)
                    } catch (e) {}
                    break;
                case "html5":
                    var o = "html5" == a.audio ? "audio" : "video";
                    e.find(o)[0].muted = !0
            }
        },
        unMuteVideo: function(e, t) {
            if (!0 !== t.globalmute) {
                var a = e.data();
                switch (a.videotype) {
                    case "youtube":
                        try {
                            a.player.unMute()
                        } catch (e) {}
                        break;
                    case "vimeo":
                        try {
                            var i = e.data("vimeoplayer");
                            e.data("volume", "1"), i.setVolume(1)
                        } catch (e) {}
                        break;
                    case "html5":
                        var o = "html5" == a.audio ? "audio" : "video";
                        e.find(o)[0].muted = !1
                }
            }
        },
        stopVideo: function(e, t) {
            var a = e.data();
            switch (t.leaveViewPortBasedStop || (t.lastplayedvideos = []), t.leaveViewPortBasedStop = !1, a.videotype) {
                case "youtube":
                    try {
                        var i = a.player;
                        if (2 === i.getPlayerState() || 5 === i.getPlayerState()) return;
                        i.pauseVideo(), a.youtubepausecalled = !0, setTimeout(function() {
                            a.youtubepausecalled = !1
                        }, 80)
                    } catch (e) {
                        console.log("Issue at YouTube Video Pause:"), console.log(e)
                    }
                    break;
                case "vimeo":
                    try {
                        e.data("vimeoplayer").pause(), a.vimeopausecalled = !0, setTimeout(function() {
                            a.vimeopausecalled = !1
                        }, 80)
                    } catch (e) {
                        console.log("Issue at Vimeo Video Pause:"), console.log(e)
                    }
                    break;
                case "html5":
                    var o = "html5" == a.audio ? "audio" : "video",
                        d = e.find(o),
                        r = d[0];
                    void 0 != d && void 0 != r && r.pause()
            }
        },
        playVideo: function(e, i) {
            clearTimeout(e.data("videoplaywait"));
            var o = e.data();
            switch (o.videotype) {
                case "youtube":
                    if (0 == e.find("iframe").length) e.append(e.data("videomarkup")), s(e, i, !0);
                    else if (void 0 != o.player.playVideo) {
                        var r = t(e.data("videostartat")),
                            n = o.player.getCurrentTime();
                        1 == e.data("nextslideatend-triggered") && (n = -1, e.data("nextslideatend-triggered", 0)), -1 != r && r > n && o.player.seekTo(r), !0 !== o.youtubepausecalled && o.player.playVideo()
                    } else e.data("videoplaywait", setTimeout(function() {
                        !0 !== o.youtubepausecalled && a.playVideo(e, i)
                    }, 50));
                    break;
                case "vimeo":
                    if (0 == e.find("iframe").length) e.removeData("vimeoplayer"), e.append(e.data("videomarkup")), s(e, i, !0);
                    else if (e.hasClass("rs-apiready")) {
                        var l, u = e.find("iframe").attr("id");
                        e.data("vimeoplayer") ? l = e.data("vimeoplayer") : (l = new Vimeo.Player(u), e.data("vimeoplayer", l)), l.getPaused() ? setTimeout(function() {
                            var a = t(e.data("videostartat")),
                                i = e.data("currenttime");
                            i || (i = 0), 1 == e.data("nextslideatend-triggered") && (i = -1, e.data("nextslideatend-triggered", 0)), -1 != a && a > i && l.setCurrentTime(a), l.play()
                        }, 510) : e.data("videoplaywait", setTimeout(function() {
                            !0 !== o.vimeopausecalled && a.playVideo(e, i)
                        }, 50))
                    } else e.data("videoplaywait", setTimeout(function() {
                        !0 !== o.vimeopausecalled && a.playVideo(e, i)
                    }, 50));
                    break;
                case "html5":
                    var p = "html5" == o.audio ? "audio" : "video",
                        v = e.find(p),
                        c = v[0];
                    if (1 != v.parent().data("metaloaded")) d(c, "loadedmetadata", function(e) {
                        a.resetVideo(e, i), c.play();
                        var o = t(e.data("videostartat")),
                            d = c.currentTime;
                        1 == e.data("nextslideatend-triggered") && (d = -1, e.data("nextslideatend-triggered", 0)), -1 != o && o > d && (c.currentTime = o)
                    }(e));
                    else {
                        c.play();
                        var r = t(e.data("videostartat")),
                            n = c.currentTime;
                        1 == e.data("nextslideatend-triggered") && (n = -1, e.data("nextslideatend-triggered", 0)), -1 != r && r > n && (c.currentTime = r)
                    }
            }
        },
        isVideoPlaying: function(e, t) {
            var a = !1;
            return void 0 != t.playingvideos && jQuery.each(t.playingvideos, function(t, i) {
                e.attr("id") == i.attr("id") && (a = !0)
            }), a
        },
        removeMediaFromList: function(e, t) {
            c(e, t)
        },
        prepareCoveredVideo: function(e, t) {
            if (void 0 === t.data("vimeoid") || void 0 !== t.data("vimeoplayerloaded")) {
                var i = {};
                if (i.ifr = t.find("iframe, video"), i.asp = t.data("aspectratio"), i.wa = i.asp.split(":")[0], i.ha = i.asp.split(":")[1], i.vd = i.wa / i.ha, 0 === e.conw || 0 === e.conh) return a.setSize(e), clearTimeout(i.ifr.data("resizelistener")), void i.ifr.data("resizelistener", setTimeout(function() {
                    a.prepareCoveredVideo(e, t)
                }, 100));
                var o = e.conw / e.conh,
                    d = o / i.vd * 100,
                    r = i.vd / o * 100;
                o > i.vd ? punchgs.TweenLite.set(i.ifr, {
                    height: d + "%",
                    width: "100%",
                    top: -(d - 100) / 2 + "%",
                    left: "0px",
                    position: "absolute"
                }) : punchgs.TweenLite.set(i.ifr, {
                    width: r + "%",
                    height: "100%",
                    left: -(r - 100) / 2 + "%",
                    top: "0px",
                    position: "absolute"
                }), i.ifr.hasClass("resizelistener") || (i.ifr.addClass("resizelistener"), jQuery(window).resize(function() {
                    a.prepareCoveredVideo(e, t), clearTimeout(i.ifr.data("resizelistener")), i.ifr.data("resizelistener", setTimeout(function() {
                        a.prepareCoveredVideo(e, t)
                    }, 90))
                }))
            }
        },
        checkVideoApis: function(e, t, a) {
            location.protocol;
            if ((void 0 != e.data("ytid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("youtube") > 0) && (t.youtubeapineeded = !0), (void 0 != e.data("ytid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("youtube") > 0) && 0 == a.addedyt) {
                t.youtubestarttime = jQuery.now(), a.addedyt = 1;
                var i = document.createElement("script");
                i.src = "https://www.youtube.com/iframe_api";
                var o = document.getElementsByTagName("script")[0],
                    d = !0;
                jQuery("head").find("*").each(function() {
                    "https://www.youtube.com/iframe_api" == jQuery(this).attr("src") && (d = !1)
                }), d && o.parentNode.insertBefore(i, o)
            }
            if ((void 0 != e.data("vimeoid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("vimeo") > 0) && (t.vimeoapineeded = !0), (void 0 != e.data("vimeoid") || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("vimeo") > 0) && 0 == a.addedvim) {
                t.vimeostarttime = jQuery.now(), a.addedvim = 1;
                var r = document.createElement("script"),
                    o = document.getElementsByTagName("script")[0],
                    d = !0;
                r.src = "https://player.vimeo.com/api/player.js", jQuery("head").find("*").each(function() {
                    "https://player.vimeo.com/api/player.js" == jQuery(this).attr("src") && (d = !1)
                }), d && o.parentNode.insertBefore(r, o)
            }
            return a
        },
        manageVideoLayer: function(e, r, n, l) {
            if ("stop" === a.compare_version(o).check) return !1;
            var u = e.data(),
                v = u.videoattributes,
                c = u.ytid,
                g = u.vimeoid,
                m = "auto" === u.videopreload || "canplay" === u.videopreload || "canplaythrough" === u.videopreload || "progress" === u.videopreload ? "auto" : u.videopreload,
                y = u.videomp4,
                f = u.videowebm,
                h = u.videoogv,
                b = u.allowfullscreenvideo,
                w = u.videocontrols,
                T = "http",
                k = "loop" == u.videoloop ? "loop" : "loopandnoslidestop" == u.videoloop ? "loop" : "",
                x = void 0 != y || void 0 != f ? "html5" : void 0 != c && String(c).length > 1 ? "youtube" : void 0 != g && String(g).length > 1 ? "vimeo" : "none",
                V = "html5" == u.audio ? "audio" : "video",
                L = "html5" == x && 0 == e.find(V).length ? "html5" : "youtube" == x && 0 == e.find("iframe").length ? "youtube" : "vimeo" == x && 0 == e.find("iframe").length ? "vimeo" : "none";
            switch (k = !0 === u.nextslideatend ? "" : k, u.videotype = x, L) {
                case "html5":
                    "controls" != w && (w = "");
                    V = "video";
                    "html5" == u.audio && (V = "audio", e.addClass("tp-audio-html5"));
                    var C = "";
                    "video" === V && (a.is_mobile() || a.isSafari11()) && ("on" === u.autoplay || "true" === u.autoplay || !0 === u.autoplay ? C = "muted playsinline autoplay" : 1 != u.videoinline && "true" !== u.videoinline && 1 !== u.videoinline || (C += " playsinline"));
                    var P = "<" + V + " " + C + ' style="object-fit:cover;background-size:cover;visible:hidden;width:100%; height:100%" class="" ' + k + ' preload="' + m + '">';
                    "auto" == m && (r.mediapreload = !0), "video" === V ? (void 0 != f && "firefox" == a.get_browser().toLowerCase() && (P = P + '<source src="' + f + '" type="video/webm" />'), void 0 != y && (P = P + '<source src="' + y + '" type="video/mp4" />'), void 0 != h && (P = P + '<source src="' + h + '" type="video/ogg" />')) : "audio" === V && (void 0 != y && (P = P + '<source src="' + y + '" type="audio/mpeg" />'), void 0 != h && (P = P + '<source src="' + h + '" type="audio/ogg" />')), P = P + "</" + V + ">";
                    var I = "";
                    "true" !== b && !0 !== b || (I = '<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>'), "controls" == w && (P = P + '<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>' + I + "</div>"), e.data("videomarkup", P), e.append(P), (i && 1 == e.data("disablevideoonmobile") || a.isIE(8)) && e.find(V).remove(), e.find(V).each(function(t) {
                        var i = this,
                            o = jQuery(this);
                        o.parent().hasClass("html5vid") || o.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>'), 1 != o.parent().data("metaloaded") && d(i, "loadedmetadata", function(e) {
                            p(e, r), a.resetVideo(e, r)
                        }(e))
                    });
                    break;
                case "youtube":
                    T = "https", "none" == w && -1 == (v = v.replace("controls=1", "controls=0")).toLowerCase().indexOf("controls") && (v += "&controls=0"), (!0 === u.videoinline || "true" === u.videoinline || 1 === u.videoinline || e.hasClass("rs-background-video-layer")) && (v += "&playsinline=1");
                    var _ = t(e.data("videostartat")),
                        S = t(e.data("videoendat")); - 1 != _ && (v = v + "&start=" + _), -1 != S && (v = v + "&end=" + S);
                    var j = v.split("origin=" + T + "://"),
                        A = "";
                    j.length > 1 ? (A = j[0] + "origin=" + T + "://", self.location.href.match(/www/gi) && !j[1].match(/www/gi) && (A += "www."), A += j[1]) : A = v;
                    var O = "true" === b || !0 === b ? "allowfullscreen" : "";
                    e.data("videomarkup", '<iframe type="text/html" src="' + T + "://www.youtube.com/embed/" + c + "?" + A + '" ' + O + ' width="100%" height="100%" style="opacity:0;visibility:hidden;width:100%;height:100%"></iframe>');
                    break;
                case "vimeo":
                    T = "https", e.data("videomarkup", '<iframe src="' + T + "://player.vimeo.com/video/" + g + "?" + v + '" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="100%" style="opacity:0;visibility:hidden;100%;height:100%"></iframe>')
            }
            var Q = i && "on" == e.data("noposteronmobile");
            if (void 0 != u.videoposter && u.videoposter.length > 2 && !Q) 0 == e.find(".tp-videoposter").length && e.append('<div class="tp-videoposter noSwipe" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:3;background-image:url(' + u.videoposter + '); background-size:cover;background-position:center center;"></div>'), 0 == e.find("iframe").length && e.find(".tp-videoposter").click(function() {
                if (a.playVideo(e, r), i) {
                    if (1 == e.data("disablevideoonmobile")) return !1;
                    punchgs.TweenLite.to(e.find(".tp-videoposter"), .3, {
                        autoAlpha: 0,
                        force3D: "auto",
                        ease: punchgs.Power3.easeInOut
                    }), punchgs.TweenLite.to(e.find("iframe"), .3, {
                        autoAlpha: 1,
                        display: "block",
                        ease: punchgs.Power3.easeInOut
                    })
                }
            });
            else {
                if (i && 1 == e.data("disablevideoonmobile")) return !1;
                0 != e.find("iframe").length || "youtube" != x && "vimeo" != x || (e.removeData("vimeoplayer"), e.append(e.data("videomarkup")), s(e, r, !1))
            }
            "none" != e.data("dottedoverlay") && void 0 != e.data("dottedoverlay") && 1 != e.find(".tp-dottedoverlay").length && e.append('<div class="tp-dottedoverlay ' + e.data("dottedoverlay") + '"></div>'), e.addClass("HasListener"), 1 == e.data("bgvideo") && punchgs.TweenLite.set(e.find("video, iframe"), {
                autoAlpha: 0
            })
        }
    });
    var d = function(e, t, a) {
            e.addEventListener ? e.addEventListener(t, a, {
                capture: !1,
                passive: !0
            }) : e.attachEvent(t, a, {
                capture: !1,
                passive: !0
            })
        },
        r = function(e, t, a) {
            var i = {};
            return i.video = e, i.videotype = t, i.settings = a, i
        },
        n = function(e, t) {
            if (1 == t.data("bgvideo") || 1 == t.data("forcecover")) {
                1 === t.data("forcecover") && t.removeClass("fullscreenvideo").addClass("coverscreenvideo");
                var i = t.data("aspectratio");
                void 0 === i && i.split(":").length <= 1 && t.data("aspectratio", "16:9"), a.prepareCoveredVideo(e, t)
            }
        },
        s = function(e, o, d) {
            var s = e.data(),
                p = e.find("iframe"),
                g = "iframe" + Math.round(1e5 * Math.random() + 1),
                m = s.videoloop,
                y = "loopandnoslidestop" != m;
            if (m = "loop" == m || "loopandnoslidestop" == m, n(o, e), p.attr("id", g), d && e.data("startvideonow", !0), 1 !== e.data("videolistenerexist")) switch (s.videotype) {
                case "youtube":
                    C = new YT.Player(g, {
                        events: {
                            onStateChange: function(i) {
                                var d = e.closest(".tp-simpleresponsive"),
                                    n = (s.videorate, e.data("videostart"), u());
                                if (i.data == YT.PlayerState.PLAYING) punchgs.TweenLite.to(e.find(".tp-videoposter"), .3, {
                                    autoAlpha: 0,
                                    force3D: "auto",
                                    ease: punchgs.Power3.easeInOut
                                }), punchgs.TweenLite.to(e.find("iframe"), .3, {
                                    autoAlpha: 1,
                                    display: "block",
                                    ease: punchgs.Power3.easeInOut
                                }), "mute" == e.data("volume") || a.lastToggleState(e.data("videomutetoggledby")) || !0 === o.globalmute ? C.mute() : (C.unMute(), C.setVolume(parseInt(e.data("volume"), 0) || 75)), o.videoplaying = !0, v(e, o), y ? o.c.trigger("stoptimer") : o.videoplaying = !1, o.c.trigger("revolution.slide.onvideoplay", r(C, "youtube", e.data())), a.toggleState(s.videotoggledby);
                                else {
                                    if (0 == i.data && m) {
                                        var p = t(e.data("videostartat")); - 1 != p && C.seekTo(p), C.playVideo(), a.toggleState(s.videotoggledby)
                                    }
                                    n || 0 != i.data && 2 != i.data || !("on" == e.data("showcoveronpause") && e.find(".tp-videoposter").length > 0 || 1 === e.data("bgvideo") && e.find(".rs-fullvideo-cover").length > 0) || (1 === e.data("bgvideo") ? punchgs.TweenLite.to(e.find(".rs-fullvideo-cover"), .1, {
                                        autoAlpha: 1,
                                        force3D: "auto",
                                        ease: punchgs.Power3.easeInOut
                                    }) : punchgs.TweenLite.to(e.find(".tp-videoposter"), .1, {
                                        autoAlpha: 1,
                                        force3D: "auto",
                                        ease: punchgs.Power3.easeInOut
                                    }), punchgs.TweenLite.to(e.find("iframe"), .1, {
                                        autoAlpha: 0,
                                        ease: punchgs.Power3.easeInOut
                                    })), -1 != i.data && 3 != i.data && (o.videoplaying = !1, o.tonpause = !1, c(e, o), d.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", r(C, "youtube", e.data())), void 0 != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != e.attr("id") || a.unToggleState(s.videotoggledby)), 0 == i.data && 1 == e.data("nextslideatend") ? (l(), e.data("nextslideatend-triggered", 1), o.c.revnext(), c(e, o)) : (c(e, o), o.videoplaying = !1, d.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", r(C, "youtube", e.data())), void 0 != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != e.attr("id") || a.unToggleState(s.videotoggledby))
                                }
                            },
                            onReady: function(o) {
                                var d, r = a.is_mobile(),
                                    n = e.hasClass("tp-videolayer");
                                if (r || a.isSafari11()) {
                                    var l = n && "off" !== e.data("autoplay");
                                    (e.hasClass("rs-background-video-layer") || l) && (r && n || (d = !0, C.setVolume(0), e.data("volume", "mute"), C.mute(), clearTimeout(e.data("mobilevideotimr")), e.data("mobilevideotimr", setTimeout(function() {
                                        C.playVideo()
                                    }, 500))))
                                }
                                d || "mute" != e.data("volume") || (C.setVolume(0), C.mute());
                                var u = s.videorate;
                                e.data("videostart");
                                if (e.addClass("rs-apiready"), void 0 != u && o.target.setPlaybackRate(parseFloat(u)), e.find(".tp-videoposter").unbind("click"), e.find(".tp-videoposter").click(function() {
                                        i || C.playVideo()
                                    }), e.data("startvideonow")) {
                                    s.player.playVideo();
                                    var p = t(e.data("videostartat")); - 1 != p && s.player.seekTo(p)
                                }
                                e.data("videolistenerexist", 1)
                            }
                        }
                    });
                    e.data("player", C);
                    break;
                case "vimeo":
                    for (var f, h = p.attr("src"), b = {}, w = h, T = /([^&=]+)=([^&]*)/g; f = T.exec(w);) b[decodeURIComponent(f[1])] = decodeURIComponent(f[2]);
                    h = (h = void 0 != b.player_id ? h.replace(b.player_id, g) : h + "&player_id=" + g).replace(/&api=0|&api=1/g, "");
                    var k = a.is_mobile(),
                        x = k || a.isSafari11(),
                        V = e.hasClass("rs-background-video-layer");
                    x && V && (h += "&background=1"), p.attr("src", h);
                    var L, C = e.find("iframe")[0];
                    jQuery("#" + g);
                    if (e.data("vimeoplayer") ? L = e.data("vimeoplayer") : (L = new Vimeo.Player(g), e.data("vimeoplayer", L)), x) {
                        var P;
                        if (V) P = !0;
                        else {
                            var I = e.data("autoplay");
                            "on" !== I && "true" !== I && !0 !== I || (k && e.data("autoplay", !1), P = !0)
                        }
                        P && (L.setVolume(0), e.data("volume", "mute"))
                    }
                    L.on("loaded", function(t) {
                        var a = {};
                        L.getVideoWidth().then(function(t) {
                            a.width = t, void 0 !== a.width && void 0 !== a.height && (e.data("aspectratio", a.width + ":" + a.height), e.data("vimeoplayerloaded", !0), n(o, e))
                        }), L.getVideoHeight().then(function(t) {
                            a.height = t, void 0 !== a.width && void 0 !== a.height && (e.data("aspectratio", a.width + ":" + a.height), e.data("vimeoplayerloaded", !0), n(o, e))
                        })
                    }), e.addClass("rs-apiready"), L.on("play", function(t) {
                        e.data("nextslidecalled", 0), punchgs.TweenLite.to(e.find(".tp-videoposter"), .3, {
                            autoAlpha: 0,
                            force3D: "auto",
                            ease: punchgs.Power3.easeInOut
                        }), punchgs.TweenLite.to(e.find("iframe"), .3, {
                            autoAlpha: 1,
                            display: "block",
                            ease: punchgs.Power3.easeInOut
                        }), o.c.trigger("revolution.slide.onvideoplay", r(L, "vimeo", e.data())), o.videoplaying = !0, v(e, o), y ? o.c.trigger("stoptimer") : o.videoplaying = !1, "mute" == e.data("volume") || a.lastToggleState(e.data("videomutetoggledby")) || !0 === o.globalmute ? L.setVolume(0) : L.setVolume(parseInt(e.data("volume"), 0) / 100 || .75), a.toggleState(s.videotoggledby)
                    }), L.on("timeupdate", function(a) {
                        var i = t(e.data("videoendat"));
                        if (e.data("currenttime", a.seconds), 0 != i && Math.abs(i - a.seconds) < 1 && i > a.seconds && 1 != e.data("nextslidecalled"))
                            if (m) {
                                L.play();
                                var d = t(e.data("videostartat")); - 1 != d && L.setCurrentTime(d)
                            } else 1 == e.data("nextslideatend") && (e.data("nextslideatend-triggered", 1), e.data("nextslidecalled", 1), o.c.revnext()), L.pause()
                    }), L.on("ended", function(t) {
                        c(e, o), o.videoplaying = !1, o.c.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", r(L, "vimeo", e.data())), 1 == e.data("nextslideatend") && (e.data("nextslideatend-triggered", 1), o.c.revnext()), void 0 != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != e.attr("id") || a.unToggleState(s.videotoggledby)
                    }), L.on("pause", function(t) {
                        ("on" == e.data("showcoveronpause") && e.find(".tp-videoposter").length > 0 || 1 === e.data("bgvideo") && e.find(".rs-fullvideo-cover").length > 0) && (1 === e.data("bgvideo") ? punchgs.TweenLite.to(e.find(".rs-fullvideo-cover"), .1, {
                            autoAlpha: 1,
                            force3D: "auto",
                            ease: punchgs.Power3.easeInOut
                        }) : punchgs.TweenLite.to(e.find(".tp-videoposter"), .1, {
                            autoAlpha: 1,
                            force3D: "auto",
                            ease: punchgs.Power3.easeInOut
                        }), punchgs.TweenLite.to(e.find("iframe"), .1, {
                            autoAlpha: 0,
                            ease: punchgs.Power3.easeInOut
                        })), o.videoplaying = !1, o.tonpause = !1, c(e, o), o.c.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", r(L, "vimeo", e.data())), void 0 != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != e.attr("id") || a.unToggleState(s.videotoggledby)
                    }), e.find(".tp-videoposter").unbind("click"), e.find(".tp-videoposter").click(function() {
                        if (!i) return L.play(), !1
                    }), e.data("startvideonow") && (L.play(), -1 != (_ = t(e.data("videostartat"))) && L.setCurrentTime(_)), e.data("videolistenerexist", 1)
            } else {
                var _ = t(e.data("videostartat"));
                switch (s.videotype) {
                    case "youtube":
                        d && (s.player.playVideo(), -1 != _ && s.player.seekTo());
                        break;
                    case "vimeo":
                        d && ((L = e.data("vimeoplayer")).play(), -1 != _ && L.seekTo(_))
                }
            }
        },
        l = function() {
            document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
        },
        u = function() {
            try {
                if (void 0 !== window.fullScreen) return window.fullScreen;
                var e = 5;
                return jQuery.browser.webkit && /Apple Computer/.test(navigator.vendor) && (e = 42), screen.width == window.innerWidth && Math.abs(screen.height - window.innerHeight) < e
            } catch (e) {}
        },
        p = function(e, o, n) {
            if (i && 1 == e.data("disablevideoonmobile")) return !1;
            var s = e.data(),
                p = "html5" == s.audio ? "audio" : "video",
                g = e.find(p),
                m = g[0],
                y = g.parent(),
                f = s.videoloop,
                h = "loopandnoslidestop" != f;
            if (f = "loop" == f || "loopandnoslidestop" == f, y.data("metaloaded", 1), 1 != e.data("bgvideo") || "none" !== s.videoloop && !1 !== s.videoloop || (h = !1), void 0 == g.attr("control") && (0 != e.find(".tp-video-play-button").length || i || e.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'), e.find("video, .tp-poster, .tp-video-play-button").click(function() {
                    e.hasClass("videoisplaying") ? m.pause() : m.play()
                })), 1 == e.data("forcecover") || e.hasClass("fullscreenvideo") || 1 == e.data("bgvideo"))
                if (1 == e.data("forcecover") || 1 == e.data("bgvideo")) {
                    y.addClass("fullcoveredvideo");
                    var b = e.data("aspectratio");
                    void 0 !== b && 1 != b.split(":").length || e.data("aspectratio", "16:9"), a.prepareCoveredVideo(o, e)
                } else y.addClass("fullscreenvideo");
            var w = e.find(".tp-vid-play-pause")[0],
                T = e.find(".tp-vid-mute")[0],
                k = e.find(".tp-vid-full-screen")[0],
                x = e.find(".tp-seek-bar")[0],
                V = e.find(".tp-volume-bar")[0];
            void 0 != w && d(w, "click", function() {
                1 == m.paused ? m.play() : m.pause()
            }), void 0 != T && d(T, "click", function() {
                0 == m.muted ? (m.muted = !0, T.innerHTML = "Unmute") : (m.muted = !1, T.innerHTML = "Mute")
            }), void 0 != k && k && d(k, "click", function() {
                m.requestFullscreen ? m.requestFullscreen() : m.mozRequestFullScreen ? m.mozRequestFullScreen() : m.webkitRequestFullscreen && m.webkitRequestFullscreen()
            }), void 0 != x && (d(x, "change", function() {
                var e = m.duration * (x.value / 100);
                m.currentTime = e
            }), d(x, "mousedown", function() {
                e.addClass("seekbardragged"), m.pause()
            }), d(x, "mouseup", function() {
                e.removeClass("seekbardragged"), m.play()
            })), d(m, "canplaythrough", function() {
                a.preLoadAudioDone(e, o, "canplaythrough")
            }), d(m, "canplay", function() {
                a.preLoadAudioDone(e, o, "canplay")
            }), d(m, "progress", function() {
                a.preLoadAudioDone(e, o, "progress")
            }), d(m, "timeupdate", function() {
                var a = 100 / m.duration * m.currentTime,
                    i = t(e.data("videoendat")),
                    d = m.currentTime;
                if (void 0 != x && (x.value = a), 0 != i && -1 != i && Math.abs(i - d) <= .3 && i > d && 1 != e.data("nextslidecalled"))
                    if (f) {
                        m.play();
                        var r = t(e.data("videostartat")); - 1 != r && (m.currentTime = r)
                    } else 1 == e.data("nextslideatend") && (e.data("nextslideatend-triggered", 1), e.data("nextslidecalled", 1), o.just_called_nextslide_at_htmltimer = !0, o.c.revnext(), setTimeout(function() {
                        o.just_called_nextslide_at_htmltimer = !1
                    }, 1e3)), m.pause()
            }), void 0 != V && d(V, "change", function() {
                m.volume = V.value
            }), d(m, "play", function() {
                e.data("nextslidecalled", 0);
                var t = e.data("volume");
                t = void 0 != t && "mute" != t ? parseFloat(t) / 100 : t, a.is_mobile() || a.isSafari11() || (!0 === o.globalmute ? m.muted = !0 : m.muted = !1, t > 1 && (t /= 100), "mute" == t ? m.muted = !0 : void 0 != t && (m.volume = t)), e.addClass("videoisplaying");
                var i = "html5" == s.audio ? "audio" : "video";
                v(e, o), h && "audio" != i ? (o.videoplaying = !0, o.c.trigger("stoptimer"), o.c.trigger("revolution.slide.onvideoplay", r(m, "html5", s))) : (o.videoplaying = !1, "audio" != i && o.c.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", r(m, "html5", s))), punchgs.TweenLite.to(e.find(".tp-videoposter"), .3, {
                    autoAlpha: 0,
                    force3D: "auto",
                    ease: punchgs.Power3.easeInOut
                }), punchgs.TweenLite.to(e.find(i), .3, {
                    autoAlpha: 1,
                    display: "block",
                    ease: punchgs.Power3.easeInOut
                });
                var d = e.find(".tp-vid-play-pause")[0],
                    n = e.find(".tp-vid-mute")[0];
                void 0 != d && (d.innerHTML = "Pause"), void 0 != n && m.muted && (n.innerHTML = "Unmute"), a.toggleState(s.videotoggledby)
            }), d(m, "pause", function(t) {
                var i = "html5" == s.audio ? "audio" : "video";
                !u() && e.find(".tp-videoposter").length > 0 && "on" == e.data("showcoveronpause") && !e.hasClass("seekbardragged") && (punchgs.TweenLite.to(e.find(".tp-videoposter"), .3, {
                    autoAlpha: 1,
                    force3D: "auto",
                    ease: punchgs.Power3.easeInOut
                }), punchgs.TweenLite.to(e.find(i), .3, {
                    autoAlpha: 0,
                    ease: punchgs.Power3.easeInOut
                })), e.removeClass("videoisplaying"), o.videoplaying = !1, c(e, o), "audio" != i && o.c.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", r(m, "html5", e.data()));
                var d = e.find(".tp-vid-play-pause")[0];
                void 0 != d && (d.innerHTML = "Play"), void 0 != o.currentLayerVideoIsPlaying && o.currentLayerVideoIsPlaying.attr("id") != e.attr("id") || a.unToggleState(s.videotoggledby)
            }), d(m, "ended", function() {
                l(), c(e, o), o.videoplaying = !1, c(e, o), "audio" != p && o.c.trigger("starttimer"), o.c.trigger("revolution.slide.onvideostop", r(m, "html5", e.data())), !0 === e.data("nextslideatend") && m.currentTime > 0 && (1 == !o.just_called_nextslide_at_htmltimer && (e.data("nextslideatend-triggered", 1), o.c.revnext(), o.just_called_nextslide_at_htmltimer = !0), setTimeout(function() {
                    o.just_called_nextslide_at_htmltimer = !1
                }, 1500)), e.removeClass("videoisplaying")
            })
        },
        v = function(e, t) {
            void 0 == t.playingvideos && (t.playingvideos = new Array), e.data("stopallvideos") && void 0 != t.playingvideos && t.playingvideos.length > 0 && (t.lastplayedvideos = jQuery.extend(!0, [], t.playingvideos), jQuery.each(t.playingvideos, function(e, i) {
                a.stopVideo(i, t)
            })), t.playingvideos.push(e), t.currentLayerVideoIsPlaying = e
        },
        c = function(e, t) {
            void 0 != t.playingvideos && jQuery.inArray(e, t.playingvideos) >= 0 && t.playingvideos.splice(jQuery.inArray(e, t.playingvideos), 1)
        }
}(jQuery);