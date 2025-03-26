var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res, next) {
    const name = req.params.name;
    res.status(200).json({
        message: `Hello ${name}`
    });
});

module.exports = router;
