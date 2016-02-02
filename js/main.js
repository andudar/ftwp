require(['data',
	'createPaginator',
	'createTable',
	'fillTable',
	'fillContainer',
	'removePaginator',
	'paginatorOnClick',
	'sortArray'], 
	function(
		data,
		createPaginator,
		createTable,
		fillTable,
		fillContainer,
		removePaginator,
		paginatorOnClick,
		sortArray){
var 
	head = data.shift(),
	footballers = data,
	paginator = document.getElementById('paginator'),
	container = document.getElementById('container'),
	tableContainer = [],
	step = 3,/*+prompt("How much items do you want to see on one page")*/
	nav = {start: 0, end: step};
//make copy of main array footballers for safe work with array
	var footballersCopy = [];
	footballers.forEach(function(item){
		footballersCopy.push(item);
	});


//create table with bootstrap
createTable(container,head,footballersCopy,step);

var table = document.querySelector('table');
//remember last target to check if it's a second click
var lastTarget;
//remember last selected th for removing previous arrow
var lastSelected;

container.onclick = function(e){
//additional function for removing arrow
	function removeArrow(t){
		t.removeChild(t.childNodes[1]);
	}

	var target = e.target;
	//check if it's a selective th with a .header-select class
	if(target.closest('.header-select')){

  while(target.nodeName != 'TH'){
    target = target.parentNode;
  }

  //remove arrow from previous element th
		if(lastSelected){
			lastSelected.childNodes[1].innerHTML = '';
		};

		//remove arrow from cuurent element th
		if(target.children.length !== 0){
			removeArrow(target);
		}



		var span = document.createElement('span');

		//if it is a second click on the same cell
    //reverse array with users, change arrow
		if(lastTarget && lastTarget.innerHTML == target.innerHTML){
			
			span.innerHTML = '  &#8595;';
			footballersCopy.reverse();
			lastTarget = null;
		}else{
			span.innerHTML = '  &#8593;';
      lastTarget = target;
      sortArray(footballersCopy,target.dataset.sort);
    }


		//append arrow
		target.appendChild(span);
		//empty container
		tableContainer = [];
		
		fillContainer(footballersCopy,tableContainer);
		fillTable(tableContainer,table,nav);

		lastSelected = target;
    	

    }else return;
    

};


paginator.onclick = function(e){
	paginatorOnClick(e,table,step,nav,tableContainer);
};


//fill container and fill table with bootstap
fillContainer(footballersCopy,tableContainer);
fillTable(tableContainer,table,nav);


//filter
var search = document.getElementsByClassName('search')[0],
	filter = document.querySelector('.filter'),
	clearFilter = document.querySelector('.clear-filter');

search.onkeydown = function(){
	tableContainer = [];
	//get back full array of footballers
	footballersCopy = footballers;

	fillContainer(footballersCopy,tableContainer);
	removePaginator(paginator);
	createPaginator(footballersCopy,step);
	fillTable(tableContainer,table,nav);
};

filter.onclick = function(){
	//initialize empty array for sorted items
	var filtered = [];
	var value = search.value;
	if(!value) return;
	//make regular expression for search-field
	var r = new RegExp(value);
	//variable for checking element of array
	var ok = false;

	footballersCopy.forEach(function(item){
		var obj = item;
		for(var key in obj){
			if(key == 'image') continue;

			if(r.test(obj[key])){
				ok = true;
				break;
			}else continue;

		}

		if(ok){
				filtered.push(obj);
			}
			ok = false;
	});

tableContainer = [];
footballersCopy = filtered;
fillContainer(footballersCopy,tableContainer);
removePaginator(paginator);

if(filtered.length){
	createPaginator(footballersCopy,step);
}else{
	//align center for paginator block
	paginator.style.width = '90px';
}
nav.start = 0;
nav.end = step;
fillTable(tableContainer,table,nav);
};


clearFilter.onclick = function(){
	search.value = '';
	nav.start = 0;
	nav.end = step;
	tableContainer = [];
	//get back full array of footballers
	footballersCopy = footballers;

	fillContainer(footballersCopy,tableContainer);
	removePaginator(paginator);
	createPaginator(footballersCopy,step);
	fillTable(tableContainer,table,nav);
}

});
