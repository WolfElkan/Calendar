app.service('$svg',function() {

	var service = {}

	// Height is misspelled.  I know.  www.xkcd.com/276
	service.Canvas = function(width,dateS,dateE,hight=1200,timeS=0,timeE=1) {
		this.timeS = timeS
		this.timeE = timeE
		this.dateS = dateS
		this.dateE = dateE
		this.hight = hight
		this.width = width
	}

	service.Event = function(event) {
		this.svg = function(canvas) {
			
		}
	}

	service.TimeLine = function(canvas,time) {

	}

	return service
	
})
