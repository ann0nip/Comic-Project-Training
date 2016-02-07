(function($){
  $(function(){
  	// initialization of all the plug-ins
    $('.button-collapse').sideNav();
    $('ul.tabs').tabs('select_tab', 'all');
    $('.modal-trigger').leanModal({ready: function() {
    	document.querySelector("#user_name").focus();
    }});
    if (!isLogin) {
    	Materialize.toast('You should Sign-In to see all the content! :)', 5000, "toastBG");
    }

    // List all comics and sort by qualification by default.
    comics.sort(sortCollectionBy);
    listCards("#all");

  }); // end of document ready
})(jQuery); // end of jQuery name space