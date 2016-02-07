define(['fillContainer', 'navigation', 'dataFront'], function(fillContainer, navigation, dataFront){
//fill tbody from tableContainer from start to end


  function fillTable(clean){

    var start = navigation.start,
      end = navigation.end,
      arr,
      fill = fillContainer;

    if(clean){
      arr = fill(true, dataFront.footballersCopy);
    }else {
      arr = fill(false);
    }


    var table = document.querySelector('.table'),
      body = table.querySelector('.body');

    body.innerHTML = '';

    var footballersCopyLength = dataFront.footballersCopy.length;

    for(var i = start; i < end; i++){

      var row = document.createElement('div');
      // check if there are less rows for embeding than have to
      if(i == footballersCopyLength){
        break;
      }
      row = arr[i];
      body.appendChild(row);
    }

  }

  return fillTable;
});