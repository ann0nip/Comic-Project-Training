var isLogin;

/*
*	Here when you do a click in Enter form Sign In modal. This event take the flow
*	and get the data entered and check if is Ok with the match function.
*	Also, is not the better and secure way, but I use Storage to keep the 'session'
*	alive, so if you refresh the page, you will still logged.
*/
var dataUser = {};

if (localStorage.getItem('logged')) {
	isLogin = true;
	islogin(isLogin, localStorage.getItem('logged'));		
};

document.querySelector("#enterSignIn").onclick = function(){
	var userTyped = document.querySelector("#user_name").value,
		passTyped = document.querySelector("#password").value;

	isLogin = match(userTyped,passTyped);
	islogin(isLogin, userTyped);
};

//modalLogOut.

function match(user, pass) {
	var usersData = users,
	isValid = false;

	usersData.forEach(function(el) {
		if (!isValid) {
			isValid = (el.uName === user && el.password === pass) ? true : false;
			dataUser.uName = el.uName;
			dataUser.name = el.name;
			dataUser.isAdmin = (el.isAdmin) ? 'YES' : 'NO';
		}
	});

	return isValid;
};

function islogin(isLogin, userTyped) {
	if (isLogin) {
		var welcomeUser = document.querySelector("#welcomeUser a");
		var modalLogOut = document.querySelector("#modal2 .modal-content");


	    if (!localStorage.getItem('logged')){
    		localStorage.setItem('logged', userTyped);
    	}
    
    	welcomeUser.classList.add("btn");
		welcomeUser.innerHTML = 'Hola '+ userTyped;

		hideElements();

		modalLogOut.innerHTML = "<h3>Profile:</h3>"+
						"<p>Hello :"+dataUser.name+"</p>"+
						"<p>Your User Name is: "+dataUser.uName+"</p>"+
						"<p>Are you Admin?: "+dataUser.isAdmin+"</p>";

		document.querySelector("#enterSignOut").addEventListener('click', function(el) {
			localStorage.clear();
			location.reload();

		});
	}
};

