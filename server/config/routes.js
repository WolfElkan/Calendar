var blocks = require('../controllers/blocks.js')
var events = require('../controllers/events.js')
var tasks = require('../controllers/tasks.js')

module.exports = function(app){

	app.get('/tasks', function(req, res) {
		tasks.index(req, res);
	});

	app.get('/tasks/:id', function(req, res) {
		tasks.show(req, res);
	});

	app.post('/tasks', function(req, res) {
		tasks.create(req, res);
	});

	app.put('/tasks/:id', function(req, res) {
		tasks.update(req, res);
	});

	app.delete('/tasks/:id', function(req, res) {
		tasks.delete(req, res);
	});

	app.get('/events', function(req, res) {
		events.index(req, res);
	});

	app.get('/events/:id', function(req, res) {
		events.show(req, res);
	});

	app.post('/events', function(req, res) {
		events.create(req, res);
	});

	app.put('/events/:id', function(req, res) {
		events.update(req, res);
	});

	app.delete('/events/:id', function(req, res) {
		events.delete(req, res);
	});

	app.get('/blocks', function(req, res) {
		blocks.index(req, res);
	});

	app.get('/blocks/:id', function(req, res) {
		blocks.show(req, res);
	});

	app.post('/blocks', function(req, res) {
		blocks.create(req, res);
	});

	app.put('/blocks/:id', function(req, res) {
		blocks.update(req, res);
	});

	app.delete('/blocks/:id', function(req, res) {
		blocks.delete(req, res);
	});
	
}
