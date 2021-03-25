var GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");
var creds = require("../client_secret.json");

exports.getAllSheetInfo = async (req, res, next) => {
  try {
    const sheetNum = Number(req.params.sheetNum);
    //res.status(200).json(sheetNum);
    const doc = new GoogleSpreadsheet(
      "17pI55bkqHVGKV5uRO_8CUnT3yv_IAPJC1y1NwolP8hc"
    );
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[sheetNum];
    const rows = await promisify(sheet.getRows)({
      offset: 0,
    });
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getRangeFromSheet = async (req, res, next) => {
  try {
    const sheetNum = Number(req.params.sheetNum);
    const { min_row, max_row, min_col, max_col } = req.body;
    const doc = new GoogleSpreadsheet(
      "17pI55bkqHVGKV5uRO_8CUnT3yv_IAPJC1y1NwolP8hc"
    );
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const cells = await promisify(sheet.getCells)({
      "min-row": Number(min_row),
      "max-row": Number(max_row),
      "min-col": Number(min_col),
      "max-col": Number(max_col),
      "return-empty": true,
    });
    const filteredInfo = cells.map((info) => {
      return [info.row, info.col, info._value];
      // return `${info.row} ${info.col} ${info._value}`;
    });
    res.status(200).json(filteredInfo);
  } catch (err) {
    next(err);
  }
};
