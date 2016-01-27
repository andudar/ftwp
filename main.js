var footballers = data,
	head = header,
	paginator = document.getElementById('paginator'),
	container = document.getElementById('container'),
	tableContainer = [],
	step = 2/*+prompt("How much items do you want to see on one page")*/,
	start = 0, 
	end = step;

//create table, fill thead and create empty tbody
function createTable(container,head){
    var table = document.createElement('table'),
    	thead = document.createElement('thead');

    var titleNames = '<tr>';
    for(var i = 0; i < head.length; i++){

    	var obj = head[i];
    	for(var key in obj){
    		//add class header-select for selective items
    		if(key != 'number' && key != 'image'){
    			titleNames += '<th class="header-select" data-sort="' + key + '">' + obj[key] + '</th>';
    		}else{
    			titleNames += '<th data-sort="' + key + '">' + obj[key] + '</th>';
    		}
    		
    	}
    	
    }
    //close row
    titleNames += '</tr>';

    thead.innerHTML = titleNames;
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    container.appendChild(table);

    createPaginator();
};

//dynamic paginator, create paginator's items
function createPaginator(){

    pageAmount = Math.ceil((footballers.length / step));
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

//create table with bootstrap
createTable(container,head);

var table = document.querySelector('table');
//remember last target to check if it's a second click
var lastTarget;
//remember last selected th for removing previous arrow
var lastSelected;


//fill tableContainer with already ready rows for inserting
function fillContainer(arr){
	var trContent;
    for(var i = 0,max = arr.length; i < max; i++){
    	trContent = '<tr>';
    	trContent += '<td>' + (i + 1) + '</td>';
    	for(var key in arr[i]){
    		if(key == 'image'){
    			trContent += '<td><img src="' + arr[i][key] + '" title="' + arr[i].name + ' ' + arr[i].lastName + '"width="75" height="75" <td>';
    		}else{
    			trContent += '<td>' + arr[i][key] + '</td>';
    		}
    	}
    	trContent += '</tr>';
    	var tr = document.createElement('tr');
    	tr.innerHTML = trContent;
    	trContent = '';
    	tableContainer.push(tr);
    }
    
};

function sortArray(arr,name){

    function compareNumbers(a,b){
    	return b[name] - a[name];
    }
    function compareStrings(a,b){
    	var a = a[name],
			b = b[name];
			return a > b? 1: a < b? -1: 0;
    };

    if(typeof arr[0][name] == 'number'){
	    arr.sort(compareNumbers);
	}else{
		arr.sort(compareStrings);
	}
};


//fill tbody from tableContainer from start to end
function fillTable(arr,start,end){

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

container.onclick = function(e){
//additional function for removing arrow
	function removeArrow(t){
		t.removeChild(target.childNodes[1]);
	}

	var target = e.target;
	
	//check if it's a selective th with a .header-select class
	if(target.closest('.header-select')){
    	
    
	
    //remove arrow from previous element th
		if(lastSelected && lastSelected.childNodes[1] !== undefined){
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
			footballers.reverse();
			lastTarget = null;
		}else{
			span.innerHTML = '  &#8593;';
			lastTarget = target;
			sortArray(footballers,target.dataset.sort);
		}


		//append arrow
		target.appendChild(span);
		//empty container
		tableContainer = [];
		
		fillContainer(footballers);

		fillTable(tableContainer,start,end);

		lastSelected = target;
    	

    }else return;

};







paginator.onclick = function(e){
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

		fillTable(tableContainer, start, end);
	};


	if(target.closest('.next')){
		//prevent extra move
		if(start >= tableContainer.length - step){
			return;
		}

		clearActivePage();
		start += step;
		end = start + step;

		currentPage = start/step + 1;

		fillTable(tableContainer, start, end);
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

	fillTable(tableContainer, start, end);
	}

	var nowWeAreHere = paginator.querySelector('.page-' + currentPage);
	if(nowWeAreHere){
		nowWeAreHere.classList.add('active-page');
	}
    
};

function clearActivePage(){
	var pages = paginator.querySelectorAll('.page'),
		max = pages.length;
	for(;max--;){
		pages[max].classList.remove('active-page');
	}
};

//fill container and fill table with bootstap
fillContainer(footballers);
fillTable(tableContainer,start,step);
