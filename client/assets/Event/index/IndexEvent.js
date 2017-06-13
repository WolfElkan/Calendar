app.controller('IndexEvent',['$','$sce','$scope','$location','EventFactory',
	                function( $ , $sce , $scope , $location , EventFactory) {

	// EventFactory.get(function(content) {
	// 	var events = []
	// 	for (var i = 0; i < content.length; i++) {
	// 		events.push(new svg.Event(content[i]))
	// 	}
	// })

	var events = [
		// {
		// 	'title' : '10-11',
		// 	'color' : 'yellow',
		// 	'timeS' : 10*60,
		// 	'timeE' : 11*60,
		// },
		// {
		// 	'title' : '2-3',
		// 	'color' : 'red',
		// 	'timeS' : 2 * 60,
		// 	'timeE' : 3 * 60,
		// },
		{
			'title' : '7-9',
			'color' : 'green',
			'timeS' : 7 * 60,
			'timeE' : 9 * 60,
		},
		{
			'title' : '10:30-11:30',
			'color' : 'blue',
			'timeS' : 10*60 + 30,
			'timeE' : 11*60 + 30,
		},
	]

	function display(day,events) {
		var str = ''
		var off = 0
		for (var i = 0; i < events.length; i++) {
			var event = new Event(events[i],off)
			str += event.str
			off = event.off
		}
		var html = str
		html += day.innerHTML
		day.innerHTML = html
		console.log(off/60)
		day.$('.plus').bottom(off)
	}

	function Event(event,off=0) {
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

	var monday = $('.day').index(1)
	display(monday,events)

	// $scope.events = 
	// $.foo()

	// console.log()

	// var calendar = document.getElementsByClassName('calendar')[0]
	// var pluses = monday.$('.plus')
	// pluses.bottom(60)
	// pluses.elements[0]['style']['bottom'] = '60px'
	// console.log(pluses.elements)

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
