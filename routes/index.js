module.exports = function Route(app){
	app.get('/', function(req, res){
	res.render('index');
	});
	//you will add more routes and logic here but this is how to write the default route for your project

	var users = {};
	app.io.route('got_a_new_user', function(req){
		// console.log(req.data.name);
		// console.log(req.sessionID);
		app.io.broadcast('new_user', {new_user_name: req.data.name, id:req.sessionID});
		req.io.emit('existing_users', users);
		users[req.sessionID] = {name: req.data.name, id:req.sessionID};
		
	});

	app.io.route('disconnect', function(req){
		//console.log(req.sessionID);
		req.io.broadcast('disconnect_user', {id: req.sessionID});
	})

	app.io.route('updated_text', function(req){
		console.log(req);
		app.io.broadcast('text_update', {text: req.data.text, id:req.sessionID});
		//req.io.emit('text_update', {text: req.data.text, id:req.sessionID});
	})
}