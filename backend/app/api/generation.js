const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ generation: req.app.locals.engine.generation });
});

module.exports = router;
