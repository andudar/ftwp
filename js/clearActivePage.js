define(function(){
	function clearActivePage(){
		var paginator = document.getElementById('paginator');
		var pages = paginator.querySelectorAll('.page'),
		max = pages.length;

		for(;max--;){
			pages[max].classList.remove('active-page');
		}
};
	return clearActivePage;
})