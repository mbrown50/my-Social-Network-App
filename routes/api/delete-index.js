const router = require('express').Router();
const courseRoutes = require('./delete-courseRoutes');
const studentRoutes = require('./delete-studentRoutes');

router.use('/courses', courseRoutes);
router.use('/students', studentRoutes);

module.exports = router;
