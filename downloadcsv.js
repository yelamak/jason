var jasonarray={};

function getData(){
    var newHTML=[];
    getStoredData();

        newHTML.push('<br>');
        $.each( jasonarray, function( key, value ) {
             newHTML.push('<span>' + key+":"+value + '</span>');
             
    });
 
    
    JSONToCSVConvertor(jasonarray,"employee");
    localStorage.setItem("storeddata",JSON.stringify(jasonarray));
    return false;
}
function JSONToCSVConvertor(JSONData, ReportTitle) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
       CSV += ReportTitle + '\r\n\n';
     var row = "";
      /*for (var index in arrData[0]) {
        row += index + ',';
    }*/
    $.each( jasonarray, function( key, value ) {
        $.each(value,function(key1,value1){
            row += key1 + ',';
        });
        return false;
    });
    row = row.slice(0, -1);
    CSV += row + '\r\n';
   
        var row = "";
        $.each( jasonarray, function( key, value ) {
            $.each(value,function(key1,value1){
                row += '"' + value1 + '",';
            });
            row.slice(0, row.length - 1);
            row=row + '\r\n';
    });
    CSV += row;
    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    var fileName = "MyReport_";
    fileName += ReportTitle.replace(/ /g,"_");   
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    /*window.open(uri);*/
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}