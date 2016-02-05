define(function(){
	function sortArray(arr,field){

    function compareNumbers(a,b){
    	return b[field] - a[field];
    };

    function compareStrings(a,b){
    	var a = a[field],
			b = b[field];
			return a > b? 1: a < b? -1: 0;
    };

    if(typeof arr[0][field] == 'number'){
	    arr.sort(compareNumbers);
    }else {
		  arr.sort(compareStrings);
    }
  };

	return sortArray;
})