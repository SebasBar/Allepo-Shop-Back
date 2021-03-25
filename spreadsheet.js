var GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

var creds = require("./client_secret.json");

// Create a document object using the ID of the spreadsheet - obtained from its URL.

// var doc = new GoogleSpreadsheet("17pI55bkqHVGKV5uRO_8CUnT3yv_IAPJC1y1NwolP8hc");

// // Authenticate with the Google Spreadsheets API.

// doc.useServiceAccountAuth(creds, function (err) {
//   // Get all of the rows from the spreadsheet.

//   doc.getRows(1, function (err, rows) {
//     console.log(rows);
//   });
// });

async function acccessSpreadsheet() {
  const doc = new GoogleSpreadsheet(
    "17pI55bkqHVGKV5uRO_8CUnT3yv_IAPJC1y1NwolP8hc"
  );
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  //await promisify(doc.loadInfo)();
  const sheet = info.worksheets[0];
  //const sheet = doc.sheetsByIndex[0];

  const cells = await promisify(sheet.getCells)({
    "min-row": 1,
    "max-row": 20,
    "min-col": 1,
    "max-col": 18,
    "return-empty": true,
  });
  // for (const cell of cells) {
  //   console.log(`${cell.row},${cell.col}: ${cell.value}`);
  // }

  // var cell = cells[36];
  // cell.value = "WTF";
  // await cell.save();

  //console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);

  const rows = await promisify(sheet.getRows)({
    offset: 0,
  });

  console.log(cells);
  //console.log(sheet);

  //const cells = await sheet.getCell(0, 0);

  // console.log(rows[1].id);
  //console.log(cells);
  //const newSheet = await promisify(doc.addSheet({ title: "Test test test" }));
}
acccessSpreadsheet();
