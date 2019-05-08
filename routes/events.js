var express = require("express");
var router = express.Router();
var Event = require("../models/event");
var User = require("../models/User");
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/addEvent", function(req, res, next) {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    lieu: req.body.lieu,
    pathPicture: req.body.pathPicture,
    maxNum: req.body.maxNum,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  event
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  res.status(200).json({
    message: "created",
    createdEvent: event
  });
});

router.get("/getEvent/:id", (req, res, next) => {
  const id = req.params.id;
  Event.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({
        message: "could not find"
      });
    });
});
router.get("/getuser/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  User.findById(id)
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({
        message: "could not find"
      });
    });
});
router.put("/updateEvent/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  Event.updateOne(
    {
      _id: id
    },
    {
      $set: updateOps
    }
  )
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.delete("/deleteEvent/:id", (req, res, next) => {
  const id = req.params.id;
  Event.deleteOne({
    _id: id
  })
    .exec()
    .then(doc => {
      res.status(200).json("deleted");
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/getAllEvents", (req, res, next) => {
  Event.find({})
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        message: "could not find"
      });
    });
});
router.post("/participateEvent/:id", (req, res, next) => {
  const idEvent = req.params.id;
  const idUser = req.body._id;
  User.findById(idUser)
    .exec()
    .then(userDoc => {
      Event.findOne({
        _id: idEvent,
        participators: userDoc
      })
        .exec()
        .then(doc => {
          if (doc == null && userDoc != null) {
            Event.updateOne(
              {
                _id: idEvent
              },
              {
                $push: {
                  participators: userDoc
                }
              }
            )
              .exec()
              .then(doc => {
                res.status(200).json("partipated");
              })
              .catch(err => {
                res.status(500).json(err);
              });
          } else res.status(200).json("already partipated or user is inexist");
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "could not find"
      });
    });
});
router.get("/unParticipateEvent/:idEvent/:idUser", (req, res, next) => {
  const idEvent = req.params.idEvent;
  const idUser = req.params.idUser;
  const user = new User({
    _id: idUser
  });
  Event.updateOne(
    { _id: idEvent },
    { $pull: { participators: user } },
    { safe: true, multi: true }
  )
    .exec()
    .then(obj => {
      console.log(obj);
      res.status(200).json("unpartipated");
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/getUserParticipatingEvent/:idUser", (req, res, next) => {
  const idUser = new ObjectId(req.params.idUser);
  Event.find({ "participators._id": idUser })
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        message: "could not find"
      });
    });
});
router.post("/InterestedEvent/:id", (req, res, next) => {
  const idEvent = req.params.id;
  const idUser = req.body._id;
  User.findById(idUser)
    .exec()
    .then(userDoc => {
      Event.findOne({
        _id: idEvent,
        interested: userDoc
      })
        .exec()
        .then(doc => {
          if (doc == null && userDoc != null) {
            Event.updateOne(
              {
                _id: idEvent
              },
              {
                $push: {
                  interested: userDoc
                }
              }
            )
              .exec()
              .then(doc => {
                res.status(200).json("interested");
              })
              .catch(err => {
                res.status(500).json(err);
              });
          } else res.status(200).json("already interested or user is inexist");
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "could not find"
      });
    });
});
router.get("/unInterestedEvent/:idEvent/:idUser", (req, res, next) => {
  const idEvent = req.params.idEvent;
  const idUser = req.params.idUser;
  const user = new User({
    _id: idUser
  });
  Event.updateOne(
    { _id: idEvent },
    { $pull: { interested: user } },
    { safe: true, multi: true }
  )
    .exec()
    .then(obj => {
      console.log(obj);
      res.status(200).json("uninterested");
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/getUserInterestedEvent/:idUser", (req, res, next) => {
  const idUser = new ObjectId(req.params.idUser);
  Event.find({ "interested._id": idUser })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        message: "could not find"
      });
    });
});

router.get("/bestEvents", (req, res, next) => {
  Event.aggregate(
    [
      {
        $project: {
          name: 1,
          description: 1,
          lieu: 1,
          length: { $size: "$participators" }
        }
      },
      { $sort: { length: -1 } },
      { $limit: 2 }
    ],
    (err, doc) => {
      console.log(err);
      if (err) res.json(200).json(err);
      console.log(doc);
      res.status(200).json(doc);
    }
  );
});
router.get("/getRecommandetEvent/", (req, res, next) => {
  //const idUser=req.params.idUser;
  const userEvents = [];
  User.find({})
    .exec()
    .then(users => {
      i = 0;
      l = users.length;
      var connectedUser;
      for (let u of users) {
        i++;

        test(u, i, obj => {
          if (obj != null && obj.eventsParticipated.length != 0)
            userEvents.push(obj);
          if (obj.i == l) {
            res.status(200).json(userEvents);
          }
        });

        //}
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
function test(u, i, callback) {
  userEvents = null;
  Event.find({ "participators._id": u._id })
    .exec()
    .then(docs => {
      userEvents = {
        user: u,
        eventsParticipated: docs,
        i: i
      };
      callback(userEvents);
    })
    .catch(err => {
      callback(err);
    });
}
function getSimilarUser(userEvents, connectedUser) {
  //eventConnectedUser
}
router.get("/getAllUser", (req, res, next) => {
  User.find({})
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
