define(['data'], function(data){
	var 
	head = data.shift(),
	footballers = data,

	//make copy of main array footballers for safe work with array
	footballersCopy = [];
	footballers.forEach(function(item){
		footballersCopy.push(item);
	});

	var dataObj = {head: head, footballersCopy: footballersCopy, original: footballers}

	return dataObj;
});