define(['fillTable','navigation'], function(fillTable, navigation){
    //dynamic paginator, create paginator's items

    var paginator = document.getElementById('paginator'),
        step = navigation.step;
        start = navigation.start,
        end = navigation.end,
        tableContainerLength = 0;



    function createPaginator(arr){
      tableContainerLength = arr.length;

      if(paginator.children.length > 2){
        removePaginator();
      }
      if(tableContainerLength == 0){
        //align center for empty paginator block
        paginator.style.width = '90px';
        return;
      }
      var 
        pageAmount = Math.ceil((arr.length / step));

        for(var i = 1; i < pageAmount+1; i++){
          var span = document.createElement('span');
          span.innerHTML = i;
          span.classList.add('page', 'page-' + i);
          paginator.insertBefore(span,paginator.lastElementChild);
        }

      paginator.querySelector('.page-1').classList.add('active-page');
      //automatic set width for paginator, depends on amount of items
      paginator.style.width = pageAmount * 45 + (45*2) + 'px';
};

paginator.onclick = function paginatorOnClick(e){
    var currentPage;
    var target = e.target;

    if(target.nodeName != 'SPAN'){
        return;
    }
   
    if(target.closest('.page')){
        clearActivePage();

        if(start >= 0){
            start = (+target.innerHTML-1) * step;
        }
        
        end = start + step;
        currentPage = start/step + 1;
        navigation.start = start;
        navigation.end = end;
        fillTable(false);
    };


    if(target.closest('.next')){
        //prevent extra move
        if(start >= tableContainerLength - step){/*??????*/
            return;
        }

        clearActivePage();
        start += step;
        end = start + step;

        currentPage = start/step + 1;
        navigation.start = start;
        navigation.end = end;
        fillTable(false);
    };



    if(target.closest('.previous')){
        start = start - step;
        end = end - step;
        //prevent extra move
        if(start < 0){
            start = 0;
            end = 5;
            return;
        }
        clearActivePage();
        currentPage = start/step + 1;
        navigation.start = start;
        navigation.end = end;
        fillTable(false);
    }

    var nowWeAreHere = paginator.querySelector('.page-' + currentPage);
    if(nowWeAreHere){
        nowWeAreHere.classList.add('active-page');
    }
    navigation.start = start;
    navigation.end = end;
/*console.log('worked');*/
};



function removePaginator(){
  var pages = paginator.getElementsByClassName('page');
  var arr = [].slice.call(pages);
  arr.forEach(function(item){
    item.parentNode.removeChild(item);
  })
};

function clearActivePage(){
    var pages = paginator.querySelectorAll('.page'),
    max = pages.length;

    for(;max--;){
      pages[max].classList.remove('active-page');
    }
};
  /*var paginatorObj = {createPaginator: createPaginator, removePaginator: removePaginator};*/

  return createPaginator;
});