var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


require('babel-register');
var swig	= require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

/* db handler/controller */
var db = require('./server/controllers/db.controller.js');


var userController = require('./server/controllers/users.controller.js');
var quizController = require('./server/controllers/quizzes.controller.js');
var gameController = require('./server/controllers/games.controller.js');
var leaderboardsController = require('./server/controllers/leaderboards.controller.js');
var achievementController = require('./server/controllers/achievements.controller.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.post('/api/user/signin', userController.signin);
app.post('/api/user/register', userController.register);

app.get('/api/lectures/:page', quizController.getLecturesPage);
app.get('/api/quizzes/:page', quizController.getLectureQuiz);
app.post('/api/quizzes/check/:quizId', quizController.checkQuiz);
app.get('/api/quizzes/check/:quizId', quizController.checkIfQuizIsSolved);
app.get('/api/quizzes/check/:quizId', quizController.checkIfQuizIsSolved);

app.post('/api/games', gameController.addNewGame);
app.get('/api/games/:user', gameController.get10games);

app.post('/api/achievements', achievementController.addNewAchievement);
app.get('/api/achievements/:user', achievementController.getUserAchievements);

app.get('/api/leaderboards', leaderboardsController.getLeaderboards);

app.use(function(req, res) {
	Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
		if (err) {
			res.status(500).send(err.message)
		} else if (redirectLocation) {
			res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
			var page = swig.renderFile('views/index.html', { html: html });
			res.status(200).send(page);
		} else {
			res.status(404).send('Page Not Found')
		}
	});
});


app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + app.get('port'));
});
