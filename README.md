# 🏟️ EasySports Turf Booking Web Page

## 📌 Project Overview
EasySports is a web-based platform designed to simplify the process of booking sports facilities like football turfs, cricket pitches, and more. This project focuses on a dynamic, fully-responsive Turf Booking Web Page integrated with Google Sheets and Firebase.

---

## 🚀 Features

- 📅 Real-time Turf Booking System  
- 🔐 User Signup/Login with Firebase Authentication  
- ☁️ Data Storage using Google Sheets & Firebase Realtime Database  
- 💸 Live Price Estimation Based on Sport, Time, and Duration  
- 📱 Responsive UI for Mobile, Tablet, and Desktop  
- ✅ Form Validation and Confirmation Alerts  
- 📊 Admin-accessible Google Sheets Backend  
- ✉️ Contact Form with Google Sheets Integration  

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend Integration:** Google Apps Script  
- **Authentication & Database:** Firebase Realtime Database & Authentication  
- **Deployment:** GitHub Pages / Firebase Hosting

---

## 📂 Folder Structure
for google sheets you can add this js code in - google sheets --> extension --> appscript -->then paste it before that create a developement in sheets then copy the web url and paste it in booking.html inside script tag --> script url = " paste here "

var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
