define(['paginator','dataFront','fillTable'], function(paginator, dataFront, fillTable){

//it's necessary for bootstrap
  var head = dataFront.head;

//create table, fill head and create empty body
  function createTable(){

    var 
      container = document.getElementById('container'),
      table = document.createElement('div'),
      tableHead = document.createElement('div');
      tableHead.classList.add('header');

    table.classList.add('table');

    var titleNames = '<ul class="header-row">';
    for(var i = 0; i < head.length; i++){

      var obj = head[i];
      for(var key in obj){
        //add class header-select for selective items
        if(key != 'number' && key != 'image'){
          titleNames += '<li class="header-select" data-sort="' + key + '">' + obj[key] + '</li>';
        }else{
          titleNames += '<li data-sort="' + key + '">' + obj[key] + '</li>';
        }
            
      }
        
    }
    //close row
    titleNames += '</ul>';

    tableHead.innerHTML = titleNames;
    table.appendChild(tableHead);

    var body = document.createElement('div');
    body.classList.add('body');
    table.appendChild(body);
    container.appendChild(table);

    paginator(dataFront.footballersCopy);
    fillTable(true, dataFront.footballersCopy);
  }

  return createTable;
});