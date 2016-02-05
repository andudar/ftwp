define(function(){

//fill tableContainer with already ready rows for inserting
	function fillContainer(){
	
    var tableContainer = [];

    return function(clean, arr){

        if(clean){
          tableContainer = [];
          console.log("clean");

          
          
        }else if(!clean){
          console.dir(tableContainer)
          console.log("didn't change");
          return tableContainer;
          
        }
                 

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
        }
    );
        
    return tableContainer;
    };
   
  };

  return fillContainer();
});