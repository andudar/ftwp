define(['dataFront', 'navigation', 'paginator', 'fillTable'], function(dataFront, navigation, paginator, fillTable){

  //filter
  var search = document.getElementsByClassName('search')[0],
  filter = document.querySelector('.filter'),
  clearFilter = document.querySelector('.clear-filter');

  search.onkeydown = function(){
  //get back full array of footballers
    dataFront.footballersCopy = dataFront.original;

    paginator(dataFront.footballersCopy);
    fillTable(true);
  };

  filter.onclick = function(){
    //initialize empty array for sorted items
    var filtered = [];
    var value = search.value;
    if(!value) return;
    //make regular expression for search-field
    var r = new RegExp(value);
  
    dataFront.footballersCopy.forEach(function(item){
      var obj = item;
      for(var key in obj){
        if(key == 'image') continue;

        if(r.test(obj[key])){
          filtered.push(obj);
          break;
        }else continue;

      }
    
    });

    dataFront.footballersCopy = filtered;

    if(dataFront.footballersCopy.length){
      paginator(dataFront.footballersCopy);
    }else {
      paginator(dataFront.footballersCopy);
    }
    navigation.start = 0;
    navigation.end = step;
    fillTable(true);
  };


  clearFilter.onclick = function(){
    search.value = '';
    navigation.start = 0;
    navigation.end = step;
    //get back full array of footballers
    dataFront.footballersCopy = dataFront.original;

    paginator(dataFront.footballersCopy);
    fillTable(true);
  }

  return dataFront;

});