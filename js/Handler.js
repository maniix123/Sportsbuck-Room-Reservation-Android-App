	function Login() 
	{
		switch(checkconnection())
		{
			case 'false': 
			alert('You need to connect to the internet!');
			break;
			
			case 'LoginProcess':
			LoginProcess();
			break;
			default:
		}
	}
	function checkconnection()
	{
		var networkState = navigator.connection.type;
		if(networkState == Connection.WIFI || networkState == Connection.CELL_4G || networkState == Connection.CELL_3G || networkState == Connection.CELL_2G)
		{
			return 'LoginProcess';
		}
		else
		{
			return 'false';
		}
	}
	function alertDismissed(){
		
	}
	function LoginProcess()
	{
		var LoginUsername = document.getElementById('LoginUsername').value;
		var LoginPassword = document.getElementById('LoginPassword').value;
		if(LoginUsername == '' || LoginPassword == '')
		{
			alert('Please do not leave any empty spaces');
		}
		else
		{
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() 
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
				{
					var Response = xmlhttp.responseText +"";
					if(Response == 1)
					{
						var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
						db.transaction(inputusername, errorCB);
						alert( 'Login Sucessful!!');
						window.location.href = 'user/homepage.html';
					}
					else
					{
						alert(Response);
					}
				}
			}
			var params = "Username="+LoginUsername+ "&Password="+ LoginPassword;
			xmlhttp.open("POST","http://www.smceventmonitoring.eu.pn/Sportsbucks/user.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-length", params.length);
			xmlhttp.send(params);
		}
	}
	function inputusername(fa) {
		var LoginUsername = document.getElementById('LoginUsername').value;
		fa.executeSql('DROP TABLE IF EXISTS User');
		fa.executeSql('CREATE TABLE IF NOT EXISTS User (name TEXT)');
		fa.executeSql("INSERT INTO User (name) VALUES (?)",[LoginUsername]);
	}
	$(document).ready(function(){
		var rooms = document.getElementById('rooms');
		var serve = document.getElementById('serve');
		var my_reservations = document.getElementById('my_reservations');
		if(rooms){
			displayrooms();
		}
		else if(serve)
		{
			displayprice();
		}
		else if(my_reservations)
		{
			reservations();
		}
	});
	function displayrooms()
	{
		xml = new XMLHttpRequest();
		xml.onreadystatechange = function() 
		{
			if (xml.readyState == 4 && xml.status == 200) 
			{
				document.getElementById('display').innerHTML = '';
				var AnotherArray = JSON.parse(xml.responseText);
				for(var i = 0; i< AnotherArray.length; i++)
				{						
					var values = '<div class = "col-sm-12">'+
					'<h4>Room number: '+AnotherArray[i].Room_Number+'</h4>'+
					'<h5>Price: &#8369;' +AnotherArray[i].Price +'</h5>'
					+'<a href="roomreserve.html?id='+AnotherArray[i].Room_Number+'&price='+AnotherArray[i].Price+'" class = "btn btn-primary">Reserve</a><Br><br>'
					+'<img src="data:image/jpg;base64, '+AnotherArray[i].Room_Image+'" class = "img-responsive img-thumbnail" style = "margin-bottom: 10px;"/>'+
					'<hr></div>';
					$('#display').append(values).hide().fadeIn('slow');		
				}
			}
		}
		xml.open("GET","http://www.smceventmonitoring.eu.pn/Sportsbucks/rooms.php",true);
		xml.send();
	}
	function displayprice()
	{
		var search = function getQueryVariable(variable)
		{
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) 
			{
				var pair = vars[i].split("=");
				if(pair[0] == variable){return pair[1];}
			}
			return(false);
		}
		var id = search('id');
		var price = search('price')
		$('#room').append('<div class="input-group"><span class="input-group-addon">'+
			'<i class="fa fa-bed"></i></span>'+
			'<input type="text" class="form-control" id="roomnumber" readonly value = "'+id+'">'+
			'</div>');
		$('#price').append('<div class = "input-group"><span class = "input-group-addon">'+
			'<i class = "fa">&#8369;</i></span>'+
			'<input type="text" class="form-control" id="roomprice" readonly value = "'+price+'">'+
			'</div>');
	}
	function outsidereserve()
	{
		var name = document.getElementById('name').value;
		var room = document.getElementById('roomnumber').value;
		var price = document.getElementById('roomprice').value;
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		var age = document.getElementById('age').value;
		var address = document.getElementById('address').value;
		if(name == '' || username == '' || password == '' || age == '' || address == '')
		{
			alert('Please fill out all of the forms');
		}
		else
		{
			ht = new XMLHttpRequest();
			ht.onreadystatechange = function() 
			{
				if (ht.readyState == 4 && ht.status == 200) 
				{
					if(ht.responseText == 1)
					{
						var jj = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
						jj.transaction(panction, errorCB);							
						alert('Reservation success!');
						window.location.href = 'user/homepage.html';
					}
					else
					{
						alert(th.responseText);
					}
				}
			}
			var params = "customername="+name+"&room="+room+"&price="+price+"&username="+username+"&password="+password+"&age="+age+"&address="+address;
			ht.open("POST","http://www.smceventmonitoring.eu.pn/Sportsbucks/reserve.php",true);
			ht.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			ht.setRequestHeader("Content-length", params.length);
			ht.send(params);
		}
	}
	function panction(tx) {
		var username = document.getElementById('username').value;
		tx.executeSql('DROP TABLE IF EXISTS User');
		tx.executeSql('CREATE TABLE IF NOT EXISTS User (name TEXT)');
		tx.executeSql("INSERT INTO User (name) VALUES (?)",[username]);
	}
	function errorCB(err) {
		alert('There is an error!: '+err.message+ '\nSecond Message:!' +err);
	}
	function insidereservation() {
		var yt = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		yt.transaction(inside2, errorCB);
	}
	function inside2(tx) {
		tx.executeSql('SELECT * FROM User', [], inside3, errorCB);
	}
	function inside3(tx, results) 
	{
		var User = results.rows.item(0).name;
		var room = document.getElementById('roomnumber').value;
		var price = document.getElementById('roomprice').value;
		// alert(User);	
		xml = new XMLHttpRequest();
		xml.onreadystatechange = function() 
		{
			if (xml.readyState == 4 && xml.status == 200) 
			{
				if(xml.responseText == 1)
				{
					alert('Room reserved!');
					window.location.href = "myreservations.html";
				}
			}
		}
		var params = "username="+User+"&room="+room+"&price="+price;
		xml.open("POST","http://www.smceventmonitoring.eu.pn/Sportsbucks/insidereserve.php",true);
		xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xml.setRequestHeader("Content-length", params.length);
		xml.send(params);	
	}
	function reservations() {
		var yt = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		yt.transaction(reservations2, errorCB);
	}
	function reservations2(tx) {
		tx.executeSql('SELECT * FROM User', [], reservations3, errorCB);
	}
	function reservations3(tx, results) 
	{
		var User = results.rows.item(0).name;
		xml = new XMLHttpRequest();
		xml.onreadystatechange = function() 
		{
			if (xml.readyState == 4 && xml.status == 200) 
			{
				var arrayss = JSON.parse(xml.responseText);
				for(var i = 0; i< arrayss.length; i++)
				{						
					var values = '<tr><td>'+arrayss[i].Room_Number+'</td>'+
					'<td>'+arrayss[i].Time_Reserved+'</td>'+
					'<td>'+arrayss[i].Date_Reserved+'</td>'+
					'<td>'+arrayss[i].Payment+'</td></tr>';
					$('#data').append(values).hide().fadeIn('slow');		
				}
			}
		}
		var params = "customername="+User;
		xml.open("POST","http://www.smceventmonitoring.eu.pn/Sportsbucks/reservations.php",true);
		xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xml.setRequestHeader("Content-length", params.length);
		xml.send(params);	
	}
	function studentinfo() {
		var yt = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
		yt.transaction(successCB, errorCB);
	}
	function successCB(tx) {
		tx.executeSql('SELECT * FROM User', [], successCB2, errorCB);
	}
	function successCB2(tx, results) 
	{
		var User = results.rows.item(0).name;
		alert(User);
	}
