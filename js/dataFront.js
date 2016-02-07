define(['data'], function(data){
	//emulation receiving data from server
	var 
		head = data.shift(),
    footballers = data,
    //make copy of main array footballers for safe work with array
    footballersCopy = [];

	footballers.forEach(function(item){
		footballersCopy.push(item);
	});

	return {
    head: head,
    footballersCopy: footballersCopy,
    original: footballers
    };

});