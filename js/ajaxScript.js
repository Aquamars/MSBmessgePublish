function Submit() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
            location.replace(location);
        }
    };
    var data = new FormData();
    var acnt = $('#acnt').val();
    var pwd = $('#pwd').val();
    var title = $('#title').val();
    title = "<b>"+title+"</b>";
    var msg = $('#message').val();
    msg = msg.replace(/\n/g, "<br>");
    data.append('account', acnt);
    data.append('password', pwd);
    data.append('title', title);
    data.append('message', msg);
    xhttp.open("POST", "/church/pgConnect.php", true);
    xhttp.send(data);
    
}

function getMsg() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            $('#news').append(xhttp.responseText);            
        }
    };    
    xhttp.open("POST", "/church/pgGetMsg.php", true);
    xhttp.send();
    
}

function editMsg(num){
    $("[id=icons]").hide();
    // title
    var text = $('#title'+num).text();
    text = text.replace(/ /g, "");
    $("#t"+num).remove();
    var inputTitle = '<input type="text" class="form-control" id="updateTitle" value="'+text+'">';
    $('#title'+num).append(inputTitle);
    // content
    var msg = $('#well'+num).html();
    msg = msg.replace(/                        /g, "");
    msg = msg.replace(/<br>/g, "\n");
    $("#well"+num).empty();
    var inputContent = '<textarea class="form-control" rows="5" id="updateMessage">'+msg+'</textarea>';
    $('#well'+num).append(inputContent);
    var inputAuth = '<div id="auth"><label for="UpdateAcnt">Account:</label><input type="account" class="form-control" id="UpdateAcnt" placeholder="Enter Account"><label for="UpdatePwd">Password:</label><input type="password" class="form-control" id="UpdatePwd" placeholder="Enter password">';
    var updateBtn =inputAuth + '<br><button class="btn btn-warning" onClick="updateMsg('+num+')">Update</button><button class="btn btn-info" onClick="cancel('+num+')">Cancel</button><div>';
    $('#panel'+num).append(updateBtn);
    // alert(text);
}

function updateMsg(num){    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
            location.replace(location);
        }
    };
    var data = new FormData();
    var acnt = $('#UpdateAcnt').val();
    var pwd = $('#UpdatePwd').val();
    var title = $('#updateTitle').val();
    title = "<b>"+title+"</b>";
    var msg = $('#updateMessage').val();
    msg = msg.replace(/\n/g, "<br>");
    data.append('account', acnt);
    data.append('password', pwd);
    data.append('title', title);
    data.append('message', msg);
    data.append('id', num);
    xhttp.open("POST", "/church/pgUpdateMsg.php", true);
    xhttp.send(data);
    // document.location = "index.html";
}

function ShowDel(num){
    $("[id=icons]").hide();
    var inputAuth = '<div id="auth"><label for="DelAcnt">Account:</label><input type="account" class="form-control" id="DelAcnt" placeholder="Enter Account"><label for="DelPwd">Password:</label><input type="password" class="form-control" id="DelPwd" placeholder="Enter password">';
    var delBtn =inputAuth + '<br><button class="btn btn-danger" onClick="delMsg('+num+')">Remove</button><button class="btn btn-info" onClick="cancel('+num+')">Cancel</button></div>';
    $('#panel'+num).append(delBtn);
}

function delMsg(num){    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
            location.replace(location);
        }
    };
    var data = new FormData();
    var acnt = $('#DelAcnt').val();
    var pwd = $('#DelPwd').val();
    data.append('account', acnt);
    data.append('password', pwd);
    data.append('id', num);
    xhttp.open("POST", "/church/pgDelMsg.php", true);
    xhttp.send(data);
}

function cancel(num){
    var text = $('#updateTitle').val();
    text = text.replace(/ /g, "");
    $("#updateTitle").remove();
    $("#title"+num).html('<a id="t'+num+'" href="#collapse'+num+'" data-toggle="collapse"><b>'+text+'</b></a>');
    var msg = $('#updateMessage').html();
    $("#updateMessage").remove(); 
    msg = msg.replace(/                        /g, "");
    msg = msg.replace(/\n/g, "<br>");
    $('#well'+num).empty();
    $('#well'+num).append(msg);
    $('#auth').remove();
    $("[id=icons]").show();
}