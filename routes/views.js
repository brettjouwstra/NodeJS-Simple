// View Templates

const express = require('express');

const router = express.Router();

router.use("/", express.static('templates'));

module.exports = router;