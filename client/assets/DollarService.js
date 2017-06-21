app.service('$',function() {

	// var style = [
	// 	'alignContent',
	// 	'alignItems',
	// 	'alignSelf',
	// 	'alignmentBaseline',
	// 	'all',
	// 	'animation',
	// 	'animationDelay',
	// 	'animationDirection',
	// 	'animationDuration',
	// 	'animationFillMode',
	// 	'animationIterationCount',
	// 	'animationName',
	// 	'animationPlayState',
	// 	'animationTimingFunction',
	// 	'backfaceVisibility',
	// 	'background',
	// 	'backgroundAttachment',
	// 	'backgroundBlendMode',
	// 	'backgroundClip',
	// 	'backgroundColor',
	// 	'backgroundImage',
	// 	'backgroundOrigin',
	// 	'backgroundPosition',
	// 	'backgroundPositionX',
	// 	'backgroundPositionY',
	// 	'backgroundRepeat',
	// 	'backgroundRepeatX',
	// 	'backgroundRepeatY',
	// 	'backgroundSize',
	// 	'baselineShift',
	// 	'blockSize',
	// 	'border',
	// 	'borderBottom',
	// 	'borderBottomColor',
	// 	'borderBottomLeftRadius',
	// 	'borderBottomRightRadius',
	// 	'borderBottomStyle',
	// 	'borderBottomWidth',
	// 	'borderCollapse',
	// 	'borderColor',
	// 	'borderImage',
	// 	'borderImageOutset',
	// 	'borderImageRepeat',
	// 	'borderImageSlice',
	// 	'borderImageSource',
	// 	'borderImageWidth',
	// 	'borderLeft',
	// 	'borderLeftColor',
	// 	'borderLeftStyle',
	// 	'borderLeftWidth',
	// 	'borderRadius',
	// 	'borderRight',
	// 	'borderRightColor',
	// 	'borderRightStyle',
	// 	'borderRightWidth',
	// 	'borderSpacing',
	// 	'borderStyle',
	// 	'borderTop',
	// 	'borderTopColor',
	// 	'borderTopLeftRadius',
	// 	'borderTopRightRadius',
	// 	'borderTopStyle',
	// 	'borderTopWidth',
	// 	'borderWidth',
	// 	'bottom',
	// 	'boxShadow',
	// 	'boxSizing',
	// 	'breakAfter',
	// 	'breakBefore',
	// 	'breakInside',
	// 	'bufferedRendering',
	// 	'captionSide',
	// 	'caretColor',
	// 	'clear',
	// 	'clip',
	// 	'clipPath',
	// 	'clipRule',
	// 	'color',
	// 	'colorInterpolation',
	// 	'colorInterpolationFilters',
	// 	'colorRendering',
	// 	'columnCount',
	// 	'columnFill',
	// 	'columnGap',
	// 	'columnRule',
	// 	'columnRuleColor',
	// 	'columnRuleStyle',
	// 	'columnRuleWidth',
	// 	'columnSpan',
	// 	'columnWidth',
	// 	'columns',
	// 	'contain',
	// 	'content',
	// 	'counterIncrement',
	// 	'counterReset',
	// 	'cssFloat',
	// 	'cssText',
	// 	'cursor',
	// 	'cx',
	// 	'cy',
	// 	'd',
	// 	'direction',
	// 	'display',
	// 	'dominantBaseline',
	// 	'emptyCells',
	// 	'fill',
	// 	'fillOpacity',
	// 	'fillRule',
	// 	'filter',
	// 	'flex',
	// 	'flexBasis',
	// 	'flexDirection',
	// 	'flexFlow',
	// 	'flexGrow',
	// 	'flexShrink',
	// 	'flexWrap',
	// 	'float',
	// 	'floodColor',
	// 	'floodOpacity',
	// 	'font',
	// 	'fontFamily',
	// 	'fontFeatureSettings',
	// 	'fontKerning',
	// 	'fontSize',
	// 	'fontStretch',
	// 	'fontStyle',
	// 	'fontVariant',
	// 	'fontVariantCaps',
	// 	'fontVariantLigatures',
	// 	'fontVariantNumeric',
	// 	'fontWeight',
	// 	'grid',
	// 	'gridArea',
	// 	'gridAutoColumns',
	// 	'gridAutoFlow',
	// 	'gridAutoRows',
	// 	'gridColumn',
	// 	'gridColumnEnd',
	// 	'gridColumnGap',
	// 	'gridColumnStart',
	// 	'gridGap',
	// 	'gridRow',
	// 	'gridRowEnd',
	// 	'gridRowGap',
	// 	'gridRowStart',
	// 	'gridTemplate',
	// 	'gridTemplateAreas',
	// 	'gridTemplateColumns',
	// 	'gridTemplateRows',
	// 	'height',
	// 	'hyphens',
	// 	'imageRendering',
	// 	'inlineSize',
	// 	'isolation',
	// 	'justifyContent',
	// 	'justifyItems',
	// 	'justifySelf',
	// 	'left',
	// 	'length',
	// 	'letterSpacing',
	// 	'lightingColor',
	// 	'lineHeight',
	// 	'listStyle',
	// 	'listStyleImage',
	// 	'listStylePosition',
	// 	'listStyleType',
	// 	'margin',
	// 	'marginBottom',
	// 	'marginLeft',
	// 	'marginRight',
	// 	'marginTop',
	// 	'marker',
	// 	'markerEnd',
	// 	'markerMid',
	// 	'markerStart',
	// 	'mask',
	// 	'maskType',
	// 	'maxBlockSize',
	// 	'maxHeight',
	// 	'maxInlineSize',
	// 	'maxWidth',
	// 	'maxZoom',
	// 	'minBlockSize',
	// 	'minHeight',
	// 	'minInlineSize',
	// 	'minWidth',
	// 	'minZoom',
	// 	'mixBlendMode',
	// 	'motion',
	// 	'objectFit',
	// 	'objectPosition',
	// 	'offset',
	// 	'offsetDistance',
	// 	'offsetPath',
	// 	'offsetRotate',
	// 	'offsetRotation',
	// 	'opacity',
	// 	'order',
	// 	'orientation',
	// 	'orphans',
	// 	'outline',
	// 	'outlineColor',
	// 	'outlineOffset',
	// 	'outlineStyle',
	// 	'outlineWidth',
	// 	'overflow',
	// 	'overflowAnchor',
	// 	'overflowWrap',
	// 	'overflowX',
	// 	'overflowY',
	// 	'padding',
	// 	'paddingBottom',
	// 	'paddingLeft',
	// 	'paddingRight',
	// 	'paddingTop',
	// 	'page',
	// 	'pageBreakAfter',
	// 	'pageBreakBefore',
	// 	'pageBreakInside',
	// 	'paintOrder',
	// 	'parentRule',
	// 	'perspective',
	// 	'perspectiveOrigin',
	// 	'pointerEvents',
	// 	'position',
	// 	'quotes',
	// 	'r',
	// 	'resize',
	// 	'right',
	// 	'rx',
	// 	'ry',
	// 	'shapeImageThreshold',
	// 	'shapeMargin',
	// 	'shapeOutside',
	// 	'shapeRendering',
	// 	'size',
	// 	'speak',
	// 	'src',
	// 	'stopColor',
	// 	'stopOpacity',
	// 	'stroke',
	// 	'strokeDasharray',
	// 	'strokeDashoffset',
	// 	'strokeLinecap',
	// 	'strokeLinejoin',
	// 	'strokeMiterlimit',
	// 	'strokeOpacity',
	// 	'strokeWidth',
	// 	'tabSize',
	// 	'tableLayout',
	// 	'textAlign',
	// 	'textAlignLast',
	// 	'textAnchor',
	// 	'textCombineUpright',
	// 	'textDecoration',
	// 	'textDecorationColor',
	// 	'textDecorationLine',
	// 	'textDecorationSkip',
	// 	'textDecorationStyle',
	// 	'textIndent',
	// 	'textOrientation',
	// 	'textOverflow',
	// 	'textRendering',
	// 	'textShadow',
	// 	'textSizeAdjust',
	// 	'textTransform',
	// 	'textUnderlinePosition',
	// 	'top',
	// 	'touchAction',
	// 	'transform',
	// 	'transformOrigin',
	// 	'transformStyle',
	// 	'transition',
	// 	'transitionDelay',
	// 	'transitionDuration',
	// 	'transitionProperty',
	// 	'transitionTimingFunction',
	// 	'unicodeBidi',
	// 	'unicodeRange',
	// 	'userSelect',
	// 	'userZoom',
	// 	'vectorEffect',
	// 	'verticalAlign',
	// 	'visibility',
	// 	'webkitAppRegion',
	// 	'webkitAppearance',
	// 	'webkitBackgroundClip',
	// 	'webkitBackgroundOrigin',
	// 	'webkitBorderAfter',
	// 	'webkitBorderAfterColor',
	// 	'webkitBorderAfterStyle',
	// 	'webkitBorderAfterWidth',
	// 	'webkitBorderBefore',
	// 	'webkitBorderBeforeColor',
	// 	'webkitBorderBeforeStyle',
	// 	'webkitBorderBeforeWidth',
	// 	'webkitBorderEnd',
	// 	'webkitBorderEndColor',
	// 	'webkitBorderEndStyle',
	// 	'webkitBorderEndWidth',
	// 	'webkitBorderHorizontalSpacing',
	// 	'webkitBorderImage',
	// 	'webkitBorderStart',
	// 	'webkitBorderStartColor',
	// 	'webkitBorderStartStyle',
	// 	'webkitBorderStartWidth',
	// 	'webkitBorderVerticalSpacing',
	// 	'webkitBoxAlign',
	// 	'webkitBoxDecorationBreak',
	// 	'webkitBoxDirection',
	// 	'webkitBoxFlex',
	// 	'webkitBoxFlexGroup',
	// 	'webkitBoxLines',
	// 	'webkitBoxOrdinalGroup',
	// 	'webkitBoxOrient',
	// 	'webkitBoxPack',
	// 	'webkitBoxReflect',
	// 	'webkitColumnBreakAfter',
	// 	'webkitColumnBreakBefore',
	// 	'webkitColumnBreakInside',
	// 	'webkitFontSizeDelta',
	// 	'webkitFontSmoothing',
	// 	'webkitHighlight',
	// 	'webkitHyphenateCharacter',
	// 	'webkitLineBreak',
	// 	'webkitLineClamp',
	// 	'webkitLocale',
	// 	'webkitLogicalHeight',
	// 	'webkitLogicalWidth',
	// 	'webkitMarginAfter',
	// 	'webkitMarginAfterCollapse',
	// 	'webkitMarginBefore',
	// 	'webkitMarginBeforeCollapse',
	// 	'webkitMarginBottomCollapse',
	// 	'webkitMarginCollapse',
	// 	'webkitMarginEnd',
	// 	'webkitMarginStart',
	// 	'webkitMarginTopCollapse',
	// 	'webkitMask',
	// 	'webkitMaskBoxImage',
	// 	'webkitMaskBoxImageOutset',
	// 	'webkitMaskBoxImageRepeat',
	// 	'webkitMaskBoxImageSlice',
	// 	'webkitMaskBoxImageSource',
	// 	'webkitMaskBoxImageWidth',
	// 	'webkitMaskClip',
	// 	'webkitMaskComposite',
	// 	'webkitMaskImage',
	// 	'webkitMaskOrigin',
	// 	'webkitMaskPosition',
	// 	'webkitMaskPositionX',
	// 	'webkitMaskPositionY',
	// 	'webkitMaskRepeat',
	// 	'webkitMaskRepeatX',
	// 	'webkitMaskRepeatY',
	// 	'webkitMaskSize',
	// 	'webkitMaxLogicalHeight',
	// 	'webkitMaxLogicalWidth',
	// 	'webkitMinLogicalHeight',
	// 	'webkitMinLogicalWidth',
	// 	'webkitPaddingAfter',
	// 	'webkitPaddingBefore',
	// 	'webkitPaddingEnd',
	// 	'webkitPaddingStart',
	// 	'webkitPerspectiveOriginX',
	// 	'webkitPerspectiveOriginY',
	// 	'webkitPrintColorAdjust',
	// 	'webkitRtlOrdering',
	// 	'webkitRubyPosition',
	// 	'webkitTapHighlightColor',
	// 	'webkitTextCombine',
	// 	'webkitTextDecorationsInEffect',
	// 	'webkitTextEmphasis',
	// 	'webkitTextEmphasisColor',
	// 	'webkitTextEmphasisPosition',
	// 	'webkitTextEmphasisStyle',
	// 	'webkitTextFillColor',
	// 	'webkitTextOrientation',
	// 	'webkitTextSecurity',
	// 	'webkitTextStroke',
	// 	'webkitTextStrokeColor',
	// 	'webkitTextStrokeWidth',
	// 	'webkitTransformOriginX',
	// 	'webkitTransformOriginY',
	// 	'webkitTransformOriginZ',
	// 	'webkitUserDrag',
	// 	'webkitUserModify',
	// 	'webkitWritingMode',
	// 	'whiteSpace',
	// 	'widows',
	// 	'width',
	// 	'willChange',
	// 	'wordBreak',
	// 	'wordSpacing',
	// 	'wordWrap',
	// 	'writingMode',
	// 	'x',
	// 	'y',
	// 	'zIndex',
	// 	'zoom'
	// ]

	// var html = [
	// 	'accessKey',
	// 	'align',
	// 	'assignedSlot',
	// 	'attributes',
	// 	'baseURI',
	// 	'childElementCount',
	// 	'childNodes',
	// 	'children',
	// 	'classList',
	// 	'className',
	// 	'clientHeight',
	// 	'clientLeft',
	// 	'clientTop',
	// 	'clientWidth',
	// 	'contentEditable',
	// 	'dataset',
	// 	'dir',
	// 	'draggable',
	// 	'firstChild',
	// 	'firstElementChild',
	// 	'hidden',
	// 	'id',
	// 	'innerHTML',
	// 	'innerText',
	// 	'isConnected',
	// 	'isContentEditable',
	// 	'lang',
	// 	'lastChild',
	// 	'lastElementChild',
	// 	'localName',
	// 	'namespaceURI',
	// 	'nextElementSibling',
	// 	'nextSibling',
	// 	'nodeName',
	// 	'nodeType',
	// 	'nodeValue',
	// 	'offsetHeight',
	// 	'offsetLeft',
	// 	'offsetParent',
	// 	'offsetTop',
	// 	'offsetWidth',
	// 	'onabort',
	// 	'onauxclick',
	// 	'onbeforecopy',
	// 	'onbeforecut',
	// 	'onbeforepaste',
	// 	'onblur',
	// 	'oncancel',
	// 	'oncanplay',
	// 	'oncanplaythrough',
	// 	'onchange',
	// 	'onclick',
	// 	'onclose',
	// 	'oncontextmenu',
	// 	'oncopy',
	// 	'oncuechange',
	// 	'oncut',
	// 	'ondblclick',
	// 	'ondrag',
	// 	'ondragend',
	// 	'ondragenter',
	// 	'ondragleave',
	// 	'ondragover',
	// 	'ondragstart',
	// 	'ondrop',
	// 	'ondurationchange',
	// 	'onemptied',
	// 	'onended',
	// 	'onerror',
	// 	'onfocus',
	// 	'ongotpointercapture',
	// 	'oninput',
	// 	'oninvalid',
	// 	'onkeydown',
	// 	'onkeypress',
	// 	'onkeyup',
	// 	'onload',
	// 	'onloadeddata',
	// 	'onloadedmetadata',
	// 	'onloadstart',
	// 	'onlostpointercapture',
	// 	'onmousedown',
	// 	'onmouseenter',
	// 	'onmouseleave',
	// 	'onmousemove',
	// 	'onmouseout',
	// 	'onmouseover',
	// 	'onmouseup',
	// 	'onmousewheel',
	// 	'onpaste',
	// 	'onpause',
	// 	'onplay',
	// 	'onplaying',
	// 	'onpointercancel',
	// 	'onpointerdown',
	// 	'onpointerenter',
	// 	'onpointerleave',
	// 	'onpointermove',
	// 	'onpointerout',
	// 	'onpointerover',
	// 	'onpointerup',
	// 	'onprogress',
	// 	'onratechange',
	// 	'onreset',
	// 	'onresize',
	// 	'onscroll',
	// 	'onsearch',
	// 	'onseeked',
	// 	'onseeking',
	// 	'onselect',
	// 	'onselectstart',
	// 	'onshow',
	// 	'onstalled',
	// 	'onsubmit',
	// 	'onsuspend',
	// 	'ontimeupdate',
	// 	'ontoggle',
	// 	'onvolumechange',
	// 	'onwaiting',
	// 	'onwebkitfullscreenchange',
	// 	'onwebkitfullscreenerror',
	// 	'onwheel',
	// 	'outerHTML',
	// 	'ownerDocument',
	// 	'parentElement',
	// 	'parentNode',
	// 	'prefix',
	// 	'previousElementSibling',
	// 	'previousSibling',
	// 	'scrollHeight',
	// 	'scrollLeft',
	// 	'scrollTop',
	// 	'scrollWidth',
	// 	'shadowRoot',
	// 	'slot',
	// 	'spellcheck',
	// 	'style',
	// 	'tabIndex',
	// 	'tagName',
	// 	'textContent',
	// 	'title',
	// 	'translate',
	// ]

	// function add_sub_dollar(element) {
	// 	element.$ = function(selector,callback) {
	// 		return service(selector,callback,element)
	// 	}
	// 	return element
	// }

	// function StyleIterator(elements) {

	// 	this.elements = elements

	// 	this.bottom = function(value) {
	// 		for (var e = 0; e < elements.length; e++) {
	// 			elements[e].style.bottom = String(value) + 'px'
	// 		}
	// 	}

	// 	this.top = function(value) {
	// 		for (var e = 0; e < elements.length; e++) {
	// 			elements[e].style.top = String(value) + 'px'
	// 		}
	// 	}

	// 	this.index = function(i) {
	// 		return add_sub_dollar(elements[i])
	// 	}

	// 	this.$ = function(selector,callback) {
	// 		var arr = []
	// 		for (var e = 0; e < elements.length; e++) {
	// 			arr.push(service(selector,callback,elements[e]))
	// 		}
	// 		return arr
	// 	}

	// }

	function Iterator(elements) {
		this.every = function(callback) {
			setTimeout(function() {
				for (var i = 0; i < elements.length; i++) {
					callback(elements[i],i)
				}
			}, 0);
		}
		this.index = function(i,callback) {
			setTimeout(function() {
				callback(elements[i])
			}, 0);
		}
		this.it = function(callback) {
			callback(elements)
		}
	}

	var service = function(selector,callback,index,parent=document) {
		var got
		if (selector[0] == '#') {
			got = parent.getElementById(selector.substr(1))
		} 
		else if (selector[0] == '.') {
			got = parent.getElementsByClassName(selector.substr(1))
		} 
		else if (selector[0] == '<') {
			if (selector.substr(-1) == '>') {
				selector = selector.substr(0, selector.length - 1)
			}
			got = parent.getElementsByTagName(selector.substr(1))
		} 
		else {
			got = parent.getElementsByName(selector.substr(1))
		}
		// if (got.__proto__.constructor.name == 'HTMLCollection') {
			return new Iterator(got)
		// } else {
			// return new Iterator(got)
		// }
		// return 627
	}

	return service
	
})