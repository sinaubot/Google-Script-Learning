function doPost(e) {
var idSheet = "";
  var ss = SpreadsheetApp.openById(idSheet);
  var tableName = e.parameter.tableName;
  var sheet = ss.getSheetByName(tableName);
  var action = e.parameter.action;
  
  switch(action){
   case "update":
      return update_data(e,sheet);
      break;
  }
}

function update_data(request,sheet){
  var noId = request.parameter.noId;
  var statusUpdate = request.parameter.status;
  var flag = 0;
  var lastRow = sheet.getLastRow();
  
  for(var row =0;row<=lastRow.length;row++){
    var noIdDatabase = sheet.getRange(row, 0).getValue();
    
    if(noId== noIdDatabase){
      sheet.getRange(row, 2).setValue(statusUpdate);
      flag=1;
    }
  }
  if(flag == 0){
    var result = "Cant Find No. ID";
  }else{
  var result = "Update Data Succes";  
  }
  
  var result = JSON.stringify({"result" : result});
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}
