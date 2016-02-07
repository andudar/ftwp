define(['dataFront', 'navigation', 'paginator', 'fillTable'], function(dataFront, navigation, paginator, fillTable){

  //filter
  var search = document.getElementsByClassName('search')[0],
    filter = document.querySelector('.filter'),
    clearFilter = document.querySelector('.clear-filter'),
    step = navigation.step,
  // need to return original array only after filter click event
    needToClean;

  search.onkeydown = function(){
    if(needToClean){
      //get back full array of footballers
      dataFront.footballersCopy = dataFront.original;

      paginator(dataFront.footballersCopy);
      fillTable(true);
      needToClean = false;
    }

  };

  filter.onclick = function(){
    needToClean = true;
    //initialize empty array for sorted items
    var filtered = [],
      value = search.value;

    if(!value) return;
    //make regular expression for search-field
    var r = new RegExp(value);

    dataFront.footballersCopy.forEach(function(item){
      for(var key in item){
        if(key == 'image') continue;

        if(r.test(item[key])){
          filtered.push(item);
          break;
        }

      }

    });

    dataFront.footballersCopy = filtered;

    paginator(dataFront.footballersCopy);

    navigation.start = 0;
    navigation.end = step;
    fillTable(true);
  };


  clearFilter.onclick = function(){
    //exclude excess filling of the container
    if(search.value == ''){
      return;
    }

    search.value = '';
    navigation.start = 0;
    navigation.end = step;

    //remove not actual arrow from header 
    var lis = document.querySelectorAll('.header-select'),
      max = lis.length;

    for(; max--;){
      if(lis[max].lastChild.nodeName == 'SPAN'){
        lis[max].removeChild(lis[max].lastChild);
        break;
      }

    }
    //get back full array of footballers
    dataFront.footballersCopy = dataFront.original;

    paginator(dataFront.footballersCopy);
    fillTable(true);

  };

  return dataFront;

});