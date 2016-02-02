define(function(){
	function sortArray(arr,name){

    function compareNumbers(a,b){
    	return b[name] - a[name];
    }
    function compareStrings(a,b){
    	var a = a[name],
			b = b[name];
			return a > b? 1: a < b? -1: 0;
    };

    if(typeof arr[0][name] == 'number'){
	    arr.sort(compareNumbers);
	}else{
		arr.sort(compareStrings);
	}
};

	return sortArray;
})