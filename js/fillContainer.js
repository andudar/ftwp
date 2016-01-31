define(function(){

	function fillContainer(arr,tableContainer){
	var trContent;
    arr.forEach(function(item, i){
    	trContent = '<tr>';
    	trContent += '<td>' + (i + 1) + '</td>';
    	for(var key in item){
    		if(key == 'image'){
    			trContent += '<td><img src="' + item[key] + '" title="' + item.name + ' ' + item.lastName + '"width="75" height="75" <td>';
    		}else{
    			trContent += '<td>' + item[key] + '</td>';
    		}
    	}
    	trContent += '</tr>';
    	var tr = document.createElement('tr');
    	tr.innerHTML = trContent;
    	trContent = '';
    	tableContainer.push(tr);
    });
   
};

return fillContainer;
})