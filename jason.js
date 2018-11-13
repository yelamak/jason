var jasonarray={};
var id;
window.onload = getStoredData();

function getStoredData(){
     id=localStorage.getItem("id");
    var storeddata = localStorage.getItem("storeddata");
    if (storeddata !== null) {
        jasonarray=JSON.parse(storeddata);

    }
    if(id==null){
        id=0;
    }
}

    $('#updateform').submit(function(){
        $('#validatemessage1').show();
        getStoredData();
        var myForm = document.getElementById('updateform');
        formData = new FormData(myForm);
		var name=formData.get('name1');
		var email=formData.get('email1');
		var message=$('#validatemessage1');
		var phno=formData.get('phno1');
        var temp=$("#temp").val();
        if(checkDataValidation(name,email,message,phno))  {
            if(!checkDuplicateData(email,temp)){
                jasonarray[temp].username=name;
                jasonarray[temp].email=email;
                jasonarray[temp].phno=phno;
                console.log(JSON.stringify(jasonarray));
                localStorage.setItem("storeddata",JSON.stringify(jasonarray));
                myForm.reset();
                $('#temp').val('');
                $('#validatemessage1').text("updated successfully");
                view();
                $('#updateform').hide();
            }
            else
                message.text("record already existed");	
        }
		return false;
    });



	$('#formdata').submit(function(){
        getStoredData();
        var jason={};
        var myForm = document.getElementById('formdata');
        var formData = new FormData(myForm); 
        var name=formData.get('name');
		var email=formData.get('email');
		var message=$('#validatemessage');
		var phno=formData.get('phno');
        if(checkDataValidation(name,email,message,phno))  {   
            if(!checkDuplicateData(email,"temp")){
                jason.username=name;
                jason.email=email;
                jason.phno=phno;
                jasonarray[id]=jason;
                id++;
                console.log(JSON.stringify(jasonarray));
                localStorage.setItem("storeddata",JSON.stringify(jasonarray));
                localStorage.setItem("id",id);
                console.log(jasonarray);
                myForm.reset();
                message.text("inserted successfully");
            }
            else
                message.text("record already existed");
		}	
		return false;
	});


	function view(){
        getStoredData();
        var text;
        if(JSON.stringify(jasonarray)!=null)
            text=createtable(jasonarray);
        else
            text="<p style='text-align:center'>No Records Found<p>";
        $('#viewdata').html(text);
    }

    

   function setdata($this){
        $('#updateform').show();
        $('#validatemessage1').hide();
        var data = $this.id;
        $('#temp').val(data);
        $('#name1').val($("#t1 tr#"+data+" td:eq(0)").text());
        $('#email1').val($("#t1 tr#"+data+" td:eq(1)").text());
        $('#phno1').val($("#t1 tr#"+data+" td:eq(2)").text());
    }
    
    function search(){
        getStoredData();
        var text=$('#searchtext').val().trim();
        if(text=='')
        {
            alert("text should not be empty");
            return;
        }
        var tempdata={};
        var flag=0;
        var text2;
         $.each( jasonarray, function( key, value ) {
            flag=0;
            $.each(value,function(key1,value1){
                if(value1.includes(text)){
                    flag=1;
                }
            });
                if(flag==1)
                    tempdata[key]=value;
        });

        if(jQuery.isEmptyObject(tempdata))
            alert("nothing found");
        else{
            text2=createtable(tempdata);
            $("<div id='dailog' title='Search Result'>"+text2+"</div>").dialog();
            $('.ui-dialog').css({"width": "auto", "height": "auto"});
        }
    }

    function deletedata($this){
        getStoredData();
        var data = $this.id;
        delete jasonarray[data];
        console.log(JSON.stringify(jasonarray));
        localStorage.setItem("storeddata",JSON.stringify(jasonarray));
        view();
    }
