define(function(){
//fill tbody from tableContainer from start to end
	function fillTable(arr,table,nav){
		var start = nav.start,
			end = nav.end;

  var	tbody = table.querySelector('tbody');
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