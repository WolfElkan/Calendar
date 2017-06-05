var	express  = require('express'),
	bp       = require('body-parser'),
	path     = require('path'),
	root     = __dirname,
	port     = process.env.PORT || 8000,
	app      = express();
app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(bp.json())
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(port, function() {
	console.log('Running at LOCALHOST: 127.0.0.1:'+port)
});
