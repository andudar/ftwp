define(function(){
	function fillTable(arr,table,start,end){

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