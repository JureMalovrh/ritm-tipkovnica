define({ "api": [
  {
    "type": "post",
    "url": "/api/achievements",
    "title": "Create new achievement",
    "name": "CreateAchievement",
    "group": "Achievement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User _id from localstorage</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Get param for sort [&quot;date&quot;, &quot;points&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Get param for filtering [1,2]</p> <p>/**</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Achievement text</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Achievement description</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the achievement [default: now]</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "get",
    "url": "/api/achievements/:user",
    "title": "Get users achievements",
    "name": "ListAchievements",
    "group": "Achievement",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User _id from localstorage</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "Achievement"
  },
  {
    "type": "post",
    "url": "/api/games",
    "title": "Create new game",
    "name": "CreateGame",
    "group": "Game",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User _id from localstorage</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "points",
            "description": "<p>Number of points received</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "allPoints",
            "description": "<p>All points in a game</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Level of the game</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "Game"
  },
  {
    "type": "get",
    "url": "/api/lectures/:page",
    "title": "Get lecture for given page",
    "name": "GetLecture",
    "group": "Lecture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>Page for lectures</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "Lecture"
  },
  {
    "type": "get",
    "url": "/api/quizzes/:page",
    "title": "Get quiz for given page",
    "name": "GetQuiz",
    "group": "Lecture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>Page for quiz</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "Lecture"
  },
  {
    "type": "get",
    "url": "/api/quizzes/check/:quizId",
    "title": "Get if quiz was already soled by user",
    "name": "GetQuizSloved",
    "group": "Lecture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "quizId",
            "description": "<p>Id of quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Get param, user _id from localstorage</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "Lecture"
  },
  {
    "type": "post",
    "url": "/api/quizzes/check/:quizId",
    "title": "Check quiz answer",
    "name": "GetQuizSloved",
    "group": "Lecture",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": "<p>Answer for quiz</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User _id from localstorage</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "Lecture"
  },
  {
    "type": "post",
    "url": "/api/user/register",
    "title": "User register",
    "name": "UserRegister",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User last name</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/signin",
    "title": "User signin",
    "name": "UserSignin",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/doc/doc.js",
    "groupTitle": "User"
  }
] });
