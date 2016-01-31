define(function(){
	function removePaginator(paginator){
	var pages = paginator.getElementsByClassName('page');
	var arr = [].slice.call(pages);
	arr.forEach(function(item){
		item.parentNode.removeChild(item);
	})
};

	return removePaginator;
})