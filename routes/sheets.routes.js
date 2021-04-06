const {
  getAllSheetInfo,
  getRangeFromSheet,
} = require("../controller/sheet.controller");

const router = require("express").Router();

router.get("/:sheetNum", getAllSheetInfo);
router.get("/:sheetNum/range/", getRangeFromSheet);

module.exports = router;
