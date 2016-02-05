define(['fillContainer', 'navigation', 'dataFront'], function(fillContainer, navigation, dataFront){
//fill tbody from tableContainer from start to end

  
	function fillTable(clean){

		var start = navigation.start,
			end = navigation.end;

		var arr;
		var fill = fillContainer;

		if(clean){
			console.log(1)
			arr = fill(true, dataFront.footballersCopy);

		}else if(!clean){
			console.log(2)
			arr = fill(false);
		}
		

	var table = document.querySelector('table'),
  		tbody = table.querySelector('tbody');
  		
	tbody.innerHTML = '';
	for(var i = start; i < end; i++){
		var tr = document.createElement('tr');
		if(arr[i] == undefined){
			break;
		}
		tr = arr[i];
		tbody.appendChild(tr);
	}

};

	return fillTable;
})