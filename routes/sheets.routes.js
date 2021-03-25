const {
  getAllSheetInfo,
  getRangeFromSheet,
} = require("../controller/sheet.controller");

const router = require("express").Router();

router.get("/:sheetNum", getAllSheetInfo);
router.get("/:shetNum/range/", getRangeFromSheet);

module.exports = router;
