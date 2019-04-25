var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');
var Question = require('../model/question');
var Quiz = require('../model/quiz');
var Reponse = require('../model/reponse');
var Attempt = require('../model/quizattempt');
var nodemailer = require("nodemailer");
var Demand = require('../model/quizdemand');
var Game= require('../model/gameplay');

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sfmlearning111@gmail.com',
        pass: 'esprit2019'
    },
    tls: {rejectUnauthorized: false},
    debug: true
});

//*******Ajout Quiz*********
router.post('/quiz/:id', function (req, res, next) {
    var quiz = new Quiz();
var duree=req.body.duration;
  if(duree == null){

    quiz.titre = req.body.titre;
    quiz.description = req.body.description;
    quiz.matiere = req.body.matiere;
    quiz.auteur = req.params.id;
    quiz.type = req.body.type;
    quiz.save(function (err) {
        res.json(quiz._id);
    }); } else{
      quiz.titre = req.body.titre;
      quiz.description = req.body.description;
      quiz.matiere = req.body.matiere;
      quiz.auteur = req.params.id;
      quiz.type = req.body.type;
      quiz.duration =req.body.duration ;
      quiz.save(function (err) {
          res.json(quiz._id);
      });
  }
});

//*******Ajout Question*********
router.post('/quest/:idQu', function (req, res, next) {
    var question = new Question();
    question.type = req.body.type;
    question.description = req.body.description;
    question.quiz = req.params.idQu;
    Quiz.findById(req.params.idQu, function (err, quiz) {
        if (err)
            res.send(err);
        quiz.questions.push(question);
        quiz.save(function (err) {
            if (err) res.json(err);
        });
    });
    // save the contact and check for errors
    question.save(function (err) {
        res.json(question._id);
    });

});

//*******Ajout Reponse*********
router.post('/rep/:idQe', function (req, res, next) {
    var qs;
    var reponse = new Reponse();

    reponse.description = req.body.description;
    reponse.question = req.params.idQe;
    reponse.etat = req.body.etat;
    reponse.score = req.body.score;

    Question.findById(req.params.idQe, function (err, question) {
        if (err)
            res.send(err);
        qs = question.quiz._id;
        Quiz.findById(qs).exec(function (err, quiz) {
            console.log(quiz);
            if (req.body.score > 0) {
                quiz.score = parseFloat(quiz.score) + parseFloat(req.body.score);
                quiz.save();
            }
        });
        question.reponses.push(reponse);
        question.save();

    });

    reponse.save(function (err) {
        res.json(reponse._id);
    });

});

/**Quiz attepmt : take a quiz**/
router.post('/quizAttempt/:idU/:idQ', function (req, res, next) {

    Attempt.findOne({
        "quiz": req.params.idQ,
        "learner": req.params.idU
    }).populate({
        path: 'quiz',
        populate: {path: 'auteur'}
    }).exec(function (err, attempts) {
        if (err) {
            res.json(err);
        } else if (attempts) {

        Demand.findOne({
            "quiz": req.params.idQ,
            "learner": req.params.idU
        }).exec(function (err, demand) {
            if (err) {
                res.json(err);
            } else if (demand) {
                if(demand.result){
                    Attempt.findOneAndUpdate(
                        {
                            _id: attempts._id // search query
                        },
                        {
                            score: req.body.score,
                            attemptnum: attempts.attemptnum + 1,
                            date: new Date(Date.now()),
                        },
                        {
                            new: true // return updated doc
                        })
                        .then(doc => {
                            res.json(doc.score);
                        })
                        .catch(err => {
                            console.error(err)
                        });
                    let query = {"_id": demand._id};
                    Demand.remove(query, (err) => {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json(req.body.score);
                        }
                    })

                               }
                else {res.json("wait"); }
            }
            else if(!demand){
                res.json("done");
}
        });

        } else if (!attempts) {
            Quiz.findById(req.params.idQ).exec(function (err, quiz) {
                if (quiz.type === "intermediate") {
                    Quiz.findOne({
                        "type": "beginner",
                        "matiere": quiz.matiere
                    }).exec(function (err, quizb) {
                        if (quizb) {
                            Attempt.findOne({
                                "quiz": quizb._id,
                            }).exec(function (err, quiza) {
                                if (quiza) {
                                    if (quiza.score > quizb.score / 2) {
                                        var attmp = new Attempt();
                                        attmp.attemptnum = 1;
                                        attmp.score = req.body.score;
                                        attmp.quiz = req.params.idQ;
                                        attmp.learner = req.params.idU;
                                        attmp.save(attmp);
                                        res.json(attmp.score);
                                    } else {
                                        res.json("false");
                                    }
                                } else {
                                    res.json("false");
                                }
                            });
                        }
                        if (!quizb) {
                            res.json("false")
                        }
                    });
                } else if (quiz.type === "advanced") {
                    Quiz.findOne({
                        "type": "intermediate",
                        "matiere": quiz.matiere
                    }).exec(function (err, quizb) {
                        if (quizb) {

                            Attempt.findOne({
                                "quiz": quizb._id,
                            }).exec(function (err, quiza) {
                                if (quiza) {
                                    if (quiza.score > quizb.score / 2) {
                                        var attmp = new Attempt();
                                        attmp.attemptnum = 1;
                                        attmp.score = req.body.score;
                                        attmp.quiz = req.params.idQ;
                                        attmp.learner = req.params.idU;
                                        attmp.save(attmp);
                                        res.json(attmp.score);
                                    } else {
                                        res.json("false");
                                    }
                                } else {
                                    res.json("false");
                                }
                            });
                        }
                        if (!quizb) {
                            res.json("false")
                        }
                    });
                } else {
                    var attmp = new Attempt();
                    attmp.attemptnum = 1;
                    attmp.score = req.body.score;
                    attmp.quiz = req.params.idQ;
                    attmp.learner = req.params.idU;
                    attmp.save(attmp);
                    res.json(attmp.score);
                }
            });
        }
    });
});

/**Quiz attepmt : get a quiz**/
router.get('/search/:idu/:idq', function (req, res, next) {

    Attempt.findOne({
        "quiz": req.params.idq,
        "learner": req.params.idu
    }).exec(function (err, attempt) {
        if (err) {
            res.json(err);
        }
        if (attempt) {
            Demand.findOne({
                "quiz": req.params.idq,
                "learner": req.params.idu
            }).exec(function (err, demand) {
                if (demand) {
                    if(demand.result){res.json("permitted");}
                    else{res.json("waiting");}
                }
                else if(!demand){
                    res.json("passed");
                }
            });


        }
        if (!attempt) {
            res.json("not found");
        }
        //  res.json(attempt);

    });
});

//** Get list of Quizs**//
router.get('/quiz', function (req, res, next) {

    Quiz.find().populate({
        path: 'questions',
        populate: {path: 'reponses'}
    })
        .exec(function (err, quizs) {
            if (err) {
                res.json(err);
            }
            res.json(quizs);
        });
});

/*Get quiz by ID*/
router.get('/quiz/:id', function (req, res, next) {

    Quiz.findById(req.params.id).populate({
        path: 'questions',
        populate: {path: 'reponses'}
    }).exec(function (err, quizs) {
        if (err) {
            res.json(err);
        }
        res.json(quizs);
    });
});
router.get('/quizd/:id', function (req, res, next) {

    Quiz.findById(req.params.id).exec(function (err, quizs) {
        if (err) {
            res.json(err);
        }
        if(quizs.duration == null) {res.json(false);}
        else {
         res.json(true);
        }
    });
});

/*Get qurst by ID*/
router.get('/fquest/:id', function (req, res, next) {

    Question.findById(req.params.id).populate({
        path: 'reponses'
    }).exec(function (err, quizs) {
        if (err) {
            res.json(err);
        }
        res.json(quizs);
    });
});

/*Get response by ID*/
router.get('/frep/:id', function (req, res, next) {

    Reponse.find({"question": req.params.id}).exec(function (err, quizs) {
        if (err) {
            res.json(err);
        }
        res.json(quizs);
    });
});

/**Get question by idQUIZ*/
router.get('/questL/:idQu', function (req, res, next) {

    Question.find({quiz: req.params.idQu}).populate('reponses')
        .exec(function (err, qst) {
            if (err) {
                res.json(err);
            }
            res.json(qst);
        });
});

/*get list of subjects*/
router.get('/matieres', function (req, res, next) {

    Quiz.distinct("matiere", (err, quizs) => {
        res.json(quizs);
    });
});

/*get quiz by subject*/
router.post('/subject', function (req, res, next) {
    Quiz.find({
        "matiere": req.body.matiere
    }).exec(function (err, quizs) {
        res.json(quizs);
    });
});

/*Get quiz by difficulties*/
router.post('/level', function (req, res, next) {
    Quiz.find({
        "type": req.body.type
    }).exec(function (err, quizs) {
        res.json(quizs);
    });
});

/**Get history of quizzs for learner**/
router.get('/history/:id', function (req, res, next) {

    Attempt.find({
        "learner": req.params.id
    }).populate({
        path: 'quiz'
    }).exec(function (err, quizs) {
        if (err) {
            res.json(err);
        }
        res.json(quizs);
    });
});

/**Get history of quizzs for coachs**/
router.get('/historyC/:id', function (req, res, next) {

    Quiz.find({
        "auteur": req.params.id
    }).exec(function (err, quizs) {
        if (err) {
            res.json(err);
        }
        res.json(quizs);
    });
});

/*update resp*/
router.post('/editr/:id/:idq', (req, res) => {

    Reponse.findById(req.params.id).exec(function (err, res) {
        Quiz.findById(req.params.idq).exec(function (err, quiz) {
            if (req.body.score > 0) {
                quiz.score = parseFloat(quiz.score) - parseFloat(res.score) + parseFloat(req.body.score);
                quiz.save();
            } else {
                quiz.score = parseFloat(quiz.score) - parseFloat(res.score);
                quiz.save();
            }
        });
    });

    let rep = {};
    let query = {"_id": req.params.id};
    rep.description = req.body.description;
    rep.etat = req.body.etat;
    rep.score = req.body.score;
    Reponse.update(query, rep, (err) => {
        if (err) {
            res.json(err);
        } else {
            res.json(rep);
        }
    })
});

/*update qst*/
router.post('/editq/:id', (req, res) => {
    let qst = {};
    let query = {"_id": req.params.id};
    qst.description = req.body.description;
    qst.type =req.body.type;
    Question.update(query, qst, (err) => {
        if (err) {
            res.json(err);
        } else {
            res.json(qst);
        }
    })
});

/*Remove quiz*/
router.get('/delquiz/:id', (req, res, next) => {
    let query = {"_id": req.params.id};
    Quiz.remove(query, (err) => {
        if (err) {
            res.json(err);
        } else {
            Attempt.find({"quiz": req.params.id}).exec(function (err, attmpts) {
                for (var i = 0; i < attmpts.length; i++) {
                    let query1 = {"_id": attmpts[i]._id};
                    Attempt.remove(query1, (err) => {
                        if (err) {
                            res.json(err);
                        } else {
                            Question.find({"quiz": req.params.id}).exec(
                                function (err, qsts) {
                                    if (!qsts) {
                                        res.json("deleted");
                                    }
                                    if (qsts) {
                                        for (var i = 0; i < qsts.length; i++) {
                                            let query2 = {"_id": qsts[i]._id};
                                            Question.remove(query2, (err) => {
                                                if (err) {
                                                    res.json(err);
                                                } else {

                                                    Reponse.find({"question": query2}).exec(
                                                        function (err, resp) {
                                                            if (!resp) {
                                                                res.json("deleted");
                                                            }
                                                            if (resp) {
                                                                for (var i = 0; i < resp.length; i++) {
                                                                    let query3 = {"_id": resp[i]._id};
                                                                    Reponse.remove(query3, (err) => {
                                                                        if (err) {
                                                                            res.json(err);
                                                                        } else {
                                                                            res.json("deleted");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                }
                                            });
                                        }
                                    }
                                });

                        }
                    });
                }
            });
        }
    })
});

/*Remove quest*/
router.get('/delquest/:id/:idq', (req, res, next) => {

    let query = {"_id": req.params.id};
    Question.remove(query, (err) => {
        if (err) {
            res.json(err);
        } else {
            Reponse.find({"question": query}).exec(
                function (err, resp) {
                    if (!resp) {
                        res.json("deleted");
                    }
                    if (resp) {
                        for (var i = 0; i < resp.length; i++) {
                            let query3 = {"_id": resp[i]._id};
                            Quiz.findById(req.params.idq).exec(function (quiz) {
                                if (res.score > 0) {
                                    quiz.score = quiz.score - resp[i].score;
                                    quiz.save();
                                }
                            });
                            Reponse.remove(query3, (err) => {
                                if (err) {
                                    res.json(err);
                                } else {
                                    res.json("deleted");
                                }
                            });
                        }
                    }
                });
        }
    })
});

/*Remove response*/
router.get('/delresp/:id/:idq', (req, res, next) => {

    Reponse.findById(req.params.id).exec(function (err, res) {
        Quiz.findById(req.params.idq).exec(function (err, quiz) {
            console.log(quiz.score);
            console.log(res.score);
            if (res.score > 0) {
                quiz.score = quiz.score - res.score;
                quiz.save();
            }
        });
    });

    let query = {"_id": req.params.id};
    Reponse.remove(query, (err) => {
        if (err) {
            res.json(err);
        } else {
            res.json("deleted");
        }
    })
});

/*demand sent*/
router.post('/demand/:idU/:idQ', function (req, res, next) {
    var demand = new Demand();
    demand.quiz = req.params.idQ;
    demand.learner = req.params.idU;
    demand.result = false;
    demand.save(function (err) {
        res.json("added");
    });
});
/*demand accept*/
router.post('/daccept/:id', function (req, res, next) {
    let dem = {};
    let query = {"_id": req.params.id};
    dem.result = true;
    Demand.update(query, dem, (err) => {
        if (err) {
            res.json(err);
        } else {
            res.json(dem);
        }
    });
});

//** Get list of Demands**//
router.get('/demands', function (req, res, next) {

    Demand.find().populate(
        [{ path: 'quiz' , populate: {path: 'auteur'} },{path : 'learner'}])
        .exec(function (err, demands) {
            if (err) {
                res.json(err);
            }
            res.json(demands);
        });
});

/**Game play**/
router.post('/gameplay/:gm/:idU', function (req, res, next) {
    Game.findOne({
        "user":req.params.idU,
        "game":req.params.gm
    }).exec(function (err,game) {
   if(!game){
       var gam = new Game();
       gam.score =req.body.score;
       gam.user=req.params.idU;
       gam.game=req.params.gm;
       gam.save(function (err) {
           res.json("added");
       });
   }
   else if(game){
       let dem = {};
       let query = {"_id": game._id};
       dem.score = parseFloat(game.score)+parseFloat(req.body.score);
       Game.update(query, dem, (err) => {
           if (err) {
               res.json(err);
           } else {
               res.json("updated");
           }
       });
   }
    });
});

/*Get games*/
router.get('/games/:game', function (req, res, next) {

    Game.find({
        "game": req.params.game}).sort({score: 'descending'}).populate({ path: 'user' })
        .exec(function (err, demands) {
            if (err) {
                res.json(err);
            }
            res.json(demands);
        });
});

module.exports = router;