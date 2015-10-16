var Event = require('./models/event');

function getEvents(res) {
    //Common function to return the most current events object in json
    Event.find(function (err, events) {
        if (err)
            res.send(err)
        res.json(events);
    });
};

module.exports = function (app) {
    //API Methods ###############################################
    app.get('/api/events', function (req, res) {
        getEvents(res);
    });

    app.post('/api/events', function (req, res) {

        Event.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            featured: req.body.featured,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
        }, function (err, event) {
            if (err)
                res.send(err);

            getEvents(res);
        });

    });

    app.post('/api/events/:event_id', function (req, res) {

        Event.findOneAndUpdate({
            _id: req.params.event_id
        },{
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            featured: req.body.featured,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            dateCreated: req.body.dateCreated
        }, function (err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });

    });

    app.delete('/api/events/:event_id', function (req, res) {
        Event.remove({
            _id: req.params.event_id
        }, function (err, event) {
            if (err)
                res.send(err);

            getEvents(res);
        });
    });

    app.get('/api/events/:event_id', function (req, res) {
        Event.findOne({
            _id: req.params.event_id
        }, function (err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
    });

    //Application ############################################
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });
};