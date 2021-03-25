const router = require("express").Router();

const sheetsRoutes = require("./sheets.routes");

router.get("/", (req, res, next) => {
  res.json({ ok: "index :)" });
});

router.use("/sheet", sheetsRoutes);

module.exports = router;
