var sidebar = document.querySelectorAll(".sidebar .collection a");
var tabSelected = document.querySelectorAll(".comic-container .tabs-container .tabs a");
var property = '#qualification';

[].forEach.call(sidebar, function(el){
	el.addEventListener('click', function(data) {
		property = data.currentTarget.getAttribute("href");
		comics.sort(sortCollectionBy);
		listCards("#all", comics);
	}, false);
});

[].forEach.call(tabSelected, function(el){
	el.addEventListener('click', function(data) {
		tabId = data.currentTarget.getAttribute("href");
		document.querySelector(".btn.search").addEventListener('click', function(el) {
			listCards(tabId, filterCollectionBy());
		});
	}, false);
});

function listCards(tabId, comicsCollection) {
	var card = "";
	comicsList = comicsCollection || comics;
	var tabId = document.querySelector(tabId+' .data');

	if (comicsList.length == 0) {
		card+= "<div class='col card s12'><h4>Empty</h4></div>";
	} else {
		comicsList.forEach(function(obj) {
			card+= "<div class='col card s12'>"+
	                  "<div class='col image s3'>"+
	                    "<figure>"+
	                      "<img src='img/"+obj.image+"' alt='An awesome picture'>"+
	                    "</figure>"+
	                  "</div>"+
	                  "<div class='col body s9'>"+
	                    "<div class='row'>"+
	                      "<div class='col description s12'>"+
	                        "<p>"+
	                         obj.description 
	                        +"</p>"+
	                      "</div>"+
	                    "</div>"+
	                    "<div class='row'>"+
	                      "<div class='col edition s12 l2'><label>Edition: </label><div class='chip'>"+
	                       obj.edition 
	                      +"</div></div>"+
	                      "<div class='col creator s12 l4'><label>Creator: </label>"+
	                       obj.creator   
	                      +"</div>"+
	                      "<div class='col recomendation s12 l3'><label>Recommended: </label>"+
	                       obj.recommended 
	                      +"</div>"+
	                      "<div class='col recomendation s12 l3'><label>Qualification: </label>"+
	                       obj.qualification 
	                      +"</div>"+
	                    "</div>"+
	                  "</div>"+
	                "</div>";
		});
	}

	tabId.innerHTML = card;
}

function sortCollectionBy(a,b) {
	switch(property) {
		case '#recommended': {
			  if (a.recommended > b.recommended)
			    return -1;
			  else if (a.recommended < b.recommended)
			    return 1;
			  else 
			    return 0;
			break;
		}
		default: {
			  if (a.qualification > b.qualification)
			    return -1;
			  else if (a.qualification < b.qualification)
			    return 1;
			  else 
			    return 0;
			break;
		}

	}
}

function hideElements () {
	var btnSignIn = document.querySelector("#btnSignIn").parentNode;
	var sidebars = document.querySelectorAll(".sidebar");
	var tabs = document.querySelectorAll(".tabs li");
	
	btnSignIn.classList.add("hiden");

	[].forEach.call(sidebars, function(el) {
  		el.classList.add("visible");
	});

	[].forEach.call(tabs, function(el) {
  		el.classList.remove("disabled");
	});

}

function filterCollectionBy() {
	var comicsCollection = [];
	var txtSearch = document.querySelector("#search");
	var radiosBtn = document.querySelectorAll("input[name='group1']");
	var idBtn;

	[].forEach.call(radiosBtn, function(el){
		if (el.checked === true) {
		 idBtn = el.value;
		}
	});

	comics.forEach(function(el) {
		switch (idBtn) {
			case 'creator' : {
				if (el.creator.toLowerCase() === txtSearch.value.toLowerCase()) {
					comicsCollection.push(el);
				}
				break;
			}
			case 'edition': {
				if (el.edition == txtSearch.value) {
					comicsCollection.push(el);
				}
				break;
			}
			default : {
				if (el.year === txtSearch.value) {
					comicsCollection.push(el);
				}
			}

		}
		
	});
	return comicsCollection;
}