/**
 * @api {post} /api/user/signin User signin
 * @apiName UserSignin
 * @apiGroup User
 *
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 *
 */

/**
 * @api {post} /api/user/register User register
 * @apiName UserRegister
 * @apiGroup User
 *
 * @apiParam {String} username User username
 * @apiParam {String} password User password
 * @apiParam {String} email User email
 * @apiParam {String} firstName User first name
 * @apiParam {String} lastName User last name
 *
 */

 /**
 * @api {get} /api/lectures/:page Get lecture for given page
 * @apiName GetLecture
 * @apiGroup Lecture
 *
 * @apiParam {String} page Page for lectures
 *
 */
 
 /**
 * @api {get} /api/quizzes/:page Get quiz for given page
 * @apiName GetQuiz
 * @apiGroup Lecture
 *
 * @apiParam {String} page Page for quiz
 *
 */
 
 /**
 * @api {get} /api/quizzes/check/:quizId Get if quiz was already soled by user
 * @apiName GetQuizSloved
 * @apiGroup Lecture
 *
 * @apiParam {String} quizId Id of quiz
 * @apiParam {String} user Get param, user _id from localstorage
 *
 */

 /**
 * @api {post} /api/quizzes/check/:quizId Check quiz answer
 * @apiName GetQuizSloved
 * @apiGroup Lecture
 *
 * @apiParam {String} answer Answer for quiz
 * @apiParam {String} user User _id from localstorage
 *
 */


 /**
 * @api {post} /api/games Create new game
 * @apiName CreateGame
 * @apiGroup Game
 *
 * @apiParam {String} user User _id from localstorage
 * @apiParam {Number} points Number of points received
 * @apiParam {Number} allPoints All points in a game
 * @apiParam {Number} level Level of the game
 *
 */

 /**
 * @api {get} /api/games/:user Get users last 10 games
 * @apiName ListGames
 * @apiGroup Game
 *
 * @apiParam {String} user User _id from localstorage
 * @apiParam {String} sort Get param for sort ["date", "points"]
 * @apiParam {Number} level Get param for filtering [1,2]
 *

  /**
 * @api {post} /api/achievements Create new achievement
 * @apiName CreateAchievement
 * @apiGroup Achievement
 *
 * @apiParam {String} user User _id from localstorage
 * @apiParam {String} text Achievement text
 * @apiParam {String} description Achievement description
 * @apiParam {Date} date Date of the achievement [default: now]
 *
 */

 /**
 * @api {get} /api/achievements/:user Get users achievements
 * @apiName ListAchievements
 * @apiGroup Achievement
 *
 * @apiParam {String} user User _id from localstorage
 *
 */