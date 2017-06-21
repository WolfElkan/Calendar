app.controller('Calendar',['$','$scope','$routeParams','$location','$date','EventFactory',
function                  ( $ , $scope , $routeParams , $location , $date , EventFactory) {

	var start = new Date($routeParams.year,$routeParams.month,$routeParams.date)

	// console.log(start)

	// EventFactory.get(function(content) {
	// 	var monday = $('.day').index(1)
	// 	display(monday,content)
	// })

	$scope.hours = []
	for (var h = 0; h < 24; h++) {
		$scope.hours.push($date.move(start,0,0,0,h))
	}

	function Day(initial,plus_days) {
		var midnight = $date.move($date.midnight(initial),0,0,plus_days)
		this.head = midnight
		this.hours = []
		for (var h = 0; h < $scope.hours.length; h++) {
			this.hours.push($date.combine(midnight,$scope.hours[h]))
		}
		this.events = []
		this.print = function(element) {
			var html = 'floop'
			element.innerHTML = html
		}
	}

	$scope.days = []
	for (var d = 0; d < 7; d++) {
		$scope.days.push(new Day(start,d))
	}

	function print(obj) {
		for (key in obj) {
			console.log(key,':',obj)
		}
	}

	// $scope.$on('$viewContentLoaded',function() {
	// 	console.log('load')
	// 	var x = $('.day')
	// 	// console.log(document.getElementsByClassName('day'))
	// 	console.log(x)
	// })

	$('.day').every(function(day,i) {
		day.innerHTML = i
	})

	// $('.day').every(function(element) {
	// 	console.log(element)
	// })

	document.getElementsByClassName('day').onload = function() {
	}

	// console.log($scope.days)

	// $scope.times = []
	// for (var d = 0; d < $scope.days.length; d++) {
	// 	$scope.times[d] = []
	// 	for (var h = 0; h < $scope.hours.length; h++) {
	// 		$scope.times[d][h] = $date.combine($scope.days[d],$scope.hours[h])
	// 	}
	// }

	$scope.new_event = {
		'title' : '',
		'color' : '#facade',
	}

	$('#calendar-scroll').it(function(element) {
		element.scrollTop = 530 // 8:50 AM to 5:10 PM
	})

	$('#new-event').it(function(element) {
		element.style.display = 'none'
	})

	// var time_bar_innerHTML = '<div class="midnight"></div>'
	// for (var h = 1; h <= 11; h++) {
	// 	time_bar_innerHTML += `<div class="hour">${h}:00 AM</div>`
	// }
	// time_bar_innerHTML += `<div class="hour">12:00 PM</div>`
	// for (var h = 1; h <= 11; h++) {
	// 	time_bar_innerHTML += `<div class="hour">${h}:00 PM</div>`
	// }

	function display(day,events) {
		var str = ''
		var off = 0
		for (var i = 0; i < events.length; i++) {
			var event = new EventGraphic(events[i],off)
			str += event.str
			off = event.off
		}
		var html = str
		html += day.innerHTML
		day.innerHTML = html
		// console.log(off/60)
		day.$('.plus').bottom(off)
	}

	function EventGraphic(event,off=0) {
		var title = event.title
		var timeS = event.timeS /= 1
		var timeE = event.timeE /= 1
		var color = event.color
		var top = timeS - off
		var height = timeE - timeS
		this.str = `
<div class="event" style="top: ${top}px; height: ${height}px; background-color: ${color}">${title}</div>`
		off += height
		this.off = off
	}

	$scope.new = function(hour) {
		$scope.new_event.dateE = new Date(Number(hour) + 3600000)
		$scope.new_event.timeE = new Date(Number(hour) + 3600000)
		$scope.new_event.dateS = hour
		$scope.new_event.timeS = hour
		$('#new-event').style.display = 'inline-block'
	}

	$scope.create = function() {
		$scope.new_event.start = $date.combine($scope.new_event.dateS,$scope.new_event.timeS)
		$scope.new_event.end   = $date.combine($scope.new_event.dateE,$scope.new_event.timeE)
		$scope.new_event.dateS = undefined
		$scope.new_event.timeS = undefined
		$scope.new_event.dateE = undefined
		$scope.new_event.timeE = undefined
		console.log($scope.new_event)
		EventFactory.create($scope.new_event)
		$('#new-event').style.display = 'none'
	}

	$scope.cancel = function() {
		$('#new-event').style.display = 'none'
	}

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		console.log('load')
		var x = $('.day')
		console.log(x)
		// EventFactory.print()
	}

}])

var day = document.getElementsByClassName('day')

day.onabort = function() {
	console.log('abort')
}
day.onauxclick = function() {
	console.log('auxclick')
}
day.onbeforecopy = function() {
	console.log('beforecopy')
}
day.onbeforecut = function() {
	console.log('beforecut')
}
day.onbeforepaste = function() {
	console.log('beforepaste')
}
day.onblur = function() {
	console.log('blur')
}
day.oncancel = function() {
	console.log('cancel')
}
day.oncanplay = function() {
	console.log('canplay')
}
day.oncanplaythrough = function() {
	console.log('canplaythrough')
}
day.onchange = function() {
	console.log('change')
}
day.onclick = function() {
	console.log('click')
}
day.onclose = function() {
	console.log('close')
}
day.oncontextmenu = function() {
	console.log('contextmenu')
}
day.oncopy = function() {
	console.log('copy')
}
day.oncuechange = function() {
	console.log('cuechange')
}
day.oncut = function() {
	console.log('cut')
}
day.ondblclick = function() {
	console.log('dblclick')
}
day.ondrag = function() {
	console.log('drag')
}
day.ondragend = function() {
	console.log('dragend')
}
day.ondragenter = function() {
	console.log('dragenter')
}
day.ondragleave = function() {
	console.log('dragleave')
}
day.ondragover = function() {
	console.log('dragover')
}
day.ondragstart = function() {
	console.log('dragstart')
}
day.ondrop = function() {
	console.log('drop')
}
day.ondurationchange = function() {
	console.log('durationchange')
}
day.onemptied = function() {
	console.log('emptied')
}
day.onended = function() {
	console.log('ended')
}
day.onerror = function() {
	console.log('error')
}
day.onfocus = function() {
	console.log('focus')
}
day.ongotpointercapture = function() {
	console.log('gotpointercapture')
}
day.oninput = function() {
	console.log('input')
}
day.oninvalid = function() {
	console.log('invalid')
}
day.onkeydown = function() {
	console.log('keydown')
}
day.onkeypress = function() {
	console.log('keypress')
}
day.onkeyup = function() {
	console.log('keyup')
}
day.onload = function() {
	console.log('load')
}
day.onloadeddata = function() {
	console.log('loadeddata')
}
day.onloadedmetadata = function() {
	console.log('loadedmetadata')
}
day.onloadstart = function() {
	console.log('loadstart')
}
day.onlostpointercapture = function() {
	console.log('lostpointercapture')
}
day.onmousedown = function() {
	console.log('mousedown')
}
day.onmouseenter = function() {
	console.log('mouseenter')
}
day.onmouseleave = function() {
	console.log('mouseleave')
}
day.onmousemove = function() {
	console.log('mousemove')
}
day.onmouseout = function() {
	console.log('mouseout')
}
day.onmouseover = function() {
	console.log('mouseover')
}
day.onmouseup = function() {
	console.log('mouseup')
}
day.onmousewheel = function() {
	console.log('mousewheel')
}
day.onpaste = function() {
	console.log('paste')
}
day.onpause = function() {
	console.log('pause')
}
day.onplay = function() {
	console.log('play')
}
day.onplaying = function() {
	console.log('playing')
}
day.onpointercancel = function() {
	console.log('pointercancel')
}
day.onpointerdown = function() {
	console.log('pointerdown')
}
day.onpointerenter = function() {
	console.log('pointerenter')
}
day.onpointerleave = function() {
	console.log('pointerleave')
}
day.onpointermove = function() {
	console.log('pointermove')
}
day.onpointerout = function() {
	console.log('pointerout')
}
day.onpointerover = function() {
	console.log('pointerover')
}
day.onpointerup = function() {
	console.log('pointerup')
}
day.onprogress = function() {
	console.log('progress')
}
day.onratechange = function() {
	console.log('ratechange')
}
day.onreset = function() {
	console.log('reset')
}
day.onresize = function() {
	console.log('resize')
}
day.onscroll = function() {
	console.log('scroll')
}
day.onsearch = function() {
	console.log('search')
}
day.onseeked = function() {
	console.log('seeked')
}
day.onseeking = function() {
	console.log('seeking')
}
day.onselect = function() {
	console.log('select')
}
day.onselectstart = function() {
	console.log('selectstart')
}
day.onshow = function() {
	console.log('show')
}
day.onstalled = function() {
	console.log('stalled')
}
day.onsubmit = function() {
	console.log('submit')
}
day.onsuspend = function() {
	console.log('suspend')
}
day.ontimeupdate = function() {
	console.log('timeupdate')
}
day.ontoggle = function() {
	console.log('toggle')
}
day.onvolumechange = function() {
	console.log('volumechange')
}
day.onwaiting = function() {
	console.log('waiting')
}
day.onwebkitfullscreenchange = function() {
	console.log('webkitfullscreenchange')
}
day.onwebkitfullscreenerror = function() {
	console.log('webkitfullscreenerror')
}
day.onwheel = function() {
	console.log('wheel')
}
