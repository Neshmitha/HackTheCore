# 📊 Version 2: Multi-Round Leaderboard Script

Replace your existing **Apps Script** with this version to track progress across all rounds and sort the results by completion time.

```javascript
const SHEET_ID = '1eES6ClIMINqDEOOqj0rEM7XzkgUixxi5GKXEM-OMsjU';

function doPost(e) {
  if (typeof e === 'undefined') {
    return ContentService.createTextOutput(JSON.stringify({status: 'error'})).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const postData = JSON.parse(e.postData.contents);
    const action = postData.action;

    if (action === 'register') return handleRegistration(postData.data);
    if (action === 'updateStatus') return handleStatusUpdate(postData.data);
    if (action === 'finish') return handleFinish(postData.data);

    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: 'Unknown action'})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleRegistration(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const timestamp = new Date();
  
  // Format details string: "Member1 (Roll1), Member2 (Roll2)"
  let details = data.members.map(m => `${m.name} (${m.rollNo})`).join(', ');
  
  // Columns: [Timestamp, TeamName, Details, R1 Status, R2 Status, R3 Status, Total Seconds, Display Time]
  const row = [timestamp, data.teamName, details, "STARTED", "LOCKED", "LOCKED", 999999, "N/A"];
  sheet.appendRow(row);
  
  return ContentService.createTextOutput(JSON.stringify({success: true, message: 'Registration Recorded'})).setMimeType(ContentService.MimeType.JSON);
}

function handleStatusUpdate(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const teamName = data.teamName;
  const round = data.round; // 'round1', 'round2'
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === teamName) {
      let colIndex = 4; // Column D (index 4) for R1
      if (round === 'round2') colIndex = 5;
      
      sheet.getRange(i + 1, colIndex).setValue("COMPLETED ✅");
      return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({success: false, message: 'Team not found'})).setMimeType(ContentService.MimeType.JSON);
}

function handleFinish(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const rows = sheet.getDataRange().getValues();
  const teamName = data.teamName;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === teamName) {
      // Set R3 Status (Col 6), Total Seconds (Col 7), and Formatted Time (Col 8)
      sheet.getRange(i + 1, 6).setValue("COMPLETED ✅"); 
      sheet.getRange(i + 1, 7).setValue(data.totalSeconds);
      sheet.getRange(i + 1, 8).setValue(data.formattedTime);
      
      // Auto-sort by Total Seconds (Column G: index 7) - Ascending (FASTEST FIRST)
      const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8);
      dataRange.sort({column: 7, ascending: true});
      
      return ContentService.createTextOutput(JSON.stringify({success: true})).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({success: false})).setMimeType(ContentService.MimeType.JSON);
}
```

### 📋 Columns to Pre-Define in Sheet:
1. `Timestamp`
2. `Team name`
3. `Their details` (Participants + Roll No.)
4. `Round 1 Status`
5. `Round 2 Status`
6. `Round 3 Status`
7. `Total Seconds` (Helper Column, can be hidden)
8. `Total Completion Time`
