define(function(){

//fill tableContainer with already ready rows for inserting
  function fillContainer(){

    var tableContainer = [];

    return function(clean, arr){

      if(clean){
        tableContainer = [];
        console.log("clean");
      }else {
        console.log("didn't change");
        return tableContainer;
      }


      var trContent;

      arr.forEach(function(item, i){
        trContent = '<ul>';
        trContent += '<li>' + (i + 1) + '</li>';
        for(var key in item){
          if(key == 'image'){
            trContent += '<li><img src="' + item[key] + '" title="' + item.name + ' ' + item.lastName + '"width="75" height="75" </li>';
          }else{
            trContent += '<li>' + item[key] + '</li>';
          }
        }

        trContent += '</ul>';

        var row = document.createElement('div');
        row.classList.add('row');
        row.innerHTML = trContent;

        trContent = '';
        tableContainer.push(row);
      }
      );

      return tableContainer;
    };

  }

  return fillContainer();
});