/**
 * ============================================================
 * HELP DESK → GOOGLE SHEET  (one-time setup)
 * Do ONE box at a time. Tick it. Then the next.
 * ============================================================
 *
 * [ ] 1. MAKE A SHEET
 *     → Go to sheets.google.com → Blank spreadsheet
 *     → Bottom-left: rename the tab to exactly: Submissions
 *
 * [ ] 2. COPY YOUR SHEET ID
 *     Look at the browser URL:
 *     docs.google.com/spreadsheets/d/  THIS_PART_HERE  /edit
 *     → Copy THAT_PART_HERE only
 *
 * [ ] 3. OPEN APPS SCRIPT
 *     In the sheet: Extensions → Apps Script
 *     → Delete any starter code
 *     → Paste THIS WHOLE FILE
 *     → Save (disk icon)
 *
 * [ ] 4. PASTE YOUR SHEET ID
 *     Find this line below:
 *       var SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SPREADSHEET_ID';
 *     → Replace REPLACE_WITH_YOUR_SPREADSHEET_ID with the ID from step 2
 *     → Keep the quotes
 *     → Save again
 *
 * [ ] 5. DEPLOY (this is the fiddly bit — go slow)
 *     → Click Deploy → New deployment
 *     → Gear icon next to "Select type" → Web app
 *     → Description: helpdesk (anything is fine)
 *     → Execute as: Me
 *     → Who has access: Anyone
 *     → Deploy
 *     → Click Authorize access → pick your Google account
 *     → Advanced → Go to … (unsafe) → Allow
 *     → COPY the Web app URL (ends in /exec)
 *
 * [ ] 6. HOOK IT TO THIS SITE
 *     In the project folder:
 *     → Copy .env.example → rename/copy to .env
 *     → Paste the URL like this:
 *       VITE_HELPDESK_SHEETS_URL=https://script.google.com/macros/s/..../exec
 *     → Save .env
 *     → Stop the site, then run: npm run dev
 *
 * [ ] 7. TEST
 *     → Open Help Desk → send a short test message
 *     → Open your Google Sheet → new row should appear 🎉
 *
 * Stuck? Email still works: organicscongress@no-burn.org
 * ============================================================
 */

var SPREADSHEET_ID = 'REPLACE_WITH_YOUR_SPREADSHEET_ID';
var SHEET_NAME = 'Submissions';

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).insertSheet(SHEET_NAME);
      sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Organization',
      'Country / Territory',
      'Topic',
      'Message',
    ]);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Organization',
        'Country / Territory',
        'Topic',
        'Message',
      ]);
    }

    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.organization || '',
      data.country || '',
      data.topic || 'organics',
      data.message || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: String(err && err.message ? err.message : err),
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      service: 'organics-helpdesk',
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
