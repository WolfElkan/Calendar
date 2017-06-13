app.controller('IndexEvent',['$','$sce','$scope','$location','EventFactory',
	                function( $ , $sce , $scope , $location , EventFactory) {

	// EventFactory.get(function(content) {
	// 	var events = []
	// 	for (var i = 0; i < content.length; i++) {
	// 		events.push(new svg.Event(content[i]))
	// 	}
	// })

	var events = [
	{
		'title' : 'Morning Routine',
		'color' : 'green',
		'timeS' : 420,
		'timeE' : 480,
	}]

	function display(day,events) {
		var str = ''
		var off = 0
		for (var i = 0; i < events.length; i++) {
			var event = new Event(events[i],off)
			str += event.str
			off += event.off
		}
		var html = str
		html += day.innerHTML
		day.innerHTML = html
		day.getElementsByClassName('')
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

	// $scope.events = 
	// $.foo()

	// console.log()

	// var calendar = document.getElementsByClassName('calendar')[0]
	var monday = $('.day').index(1)
	var pluses = monday.$('.plus')
	pluses.bottom('60px')
	// pluses.elements[0]['style']['bottom'] = '60px'
	console.log(pluses.elements)

	$scope.delete = function(id) {
		EventFactory.delete(id)
	}

	$scope.print = function() {
		EventFactory.print()
	}

}])
