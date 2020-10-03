const config = require("./config");
const { extractSheets } = require("spreadsheet-to-json");

function nullCoalesce(value) {
  return value == null ? "" : value
}

extractSheets(
  {
    spreadsheetKey: config.spreadsheetKey
  },
  function(err, data) {
    if (err) console.log(err);
    data.Announcement.shift();

    const resAnnouncement = data.Announcement.map(a => {
      return {
        datetime: Date.parse(a.datetime) / 1000,
        msg_zh: a.msg_zh,
        msg_en: a.msg_en,
        uri: a.uri,
        role: Object.keys(a).filter(k => (/^role_/.test(k) && a[k] === "v")).map(k => k.replace(/^role_/, ""))
      }
    })

    console.log(JSON.stringify(resAnnouncement))
  }
)
