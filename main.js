var footballers = data,
	head = header,
	paginator = document.getElementById('paginator'),
	container = document.getElementById('container'),
	tableContainer = [],
	step = +prompt("How much items do you want to see on one page"),
	start = 0, 
	end = step;

function createTable(container,head){
    var table = document.createElement('table'),
    	thead = document.createElement('thead');

    var titleNames = '<tr>';
    for(var i = 0; i < head.length; i++){

    	var obj = head[i];
    	for(var key in obj){
    		if(key != 'number' && key != 'image'){
    			titleNames += '<th class="header-select" data-sort="' + key + '">' + obj[key] + '</th>';
    		}else{
    			titleNames += '<th data-sort="' + key + '">' + obj[key] + '</th>';
    		}
    		
    	}
    	
    }
    titleNames += '</tr>';
    thead.innerHTML = titleNames;
    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    container.appendChild(table);

    createPaginator();
};

function createPaginator(){

    pageAmount = Math.ceil((footballers.length / step));
    for(var i = 1; i < pageAmount+1; i++){
    	var span = document.createElement('span');
    	span.classList.add('page');
    	span.classList.add('page-' + i)
    	span.innerHTML = i;
    	paginator.insertBefore(span,paginator.lastElementChild);
    }
    paginator.querySelector('.page-1').classList.add('active-page');
    paginator.style.width = pageAmount * 45 + (47*2) + 'px';
}


createTable(container,head);

var table = document.querySelector('table');
var lastTarget;
var lastSelected;


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
    
}

   
function sortArray(arr,name){

    function compareNumbers(a,b){
    	return b[name] - a[name];
    }
    function compareStrings(a,b){
    	var a = a[name],
			b = b[name];
			/*
			  console.log(a,b);*/
			return a > b? 1: a < b? -1: 0;
    };

    if(typeof arr[0][name] == 'number'){
	    arr.sort(compareNumbers);
	}else{
		arr.sort(compareStrings);
	}
}	



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

	function removeArrow(t){
		t.removeChild(target.childNodes[1]);
	}

	var target = e.target;
	
	//prevent clicking on cell '№' and 'Image'
	if(target.closest('.header-select')){
    	
    //if it is a second click on the same cell
    //reverse array with users
    //and create table
	
    
		if(lastSelected && lastSelected.childNodes[1] !== undefined){
		try{
			lastSelected.childNodes[1].innerHTML = '';
		}catch(e){
			console.log(e);
		}
		
	}
		if(target.children.length !== 0){
			removeArrow(target);
		}

		var span = document.createElement('span');

		if(lastTarget && lastTarget.innerHTML == target.innerHTML){
			
			span.innerHTML = '  &#8595;';
			footballers.reverse();
			lastTarget = null;
		}else{
			span.innerHTML = '  &#8593;';
			lastTarget = target;
			sortArray(footballers,target.dataset.sort);
		}



		target.appendChild(span);
		//remember the last chosen cell
		//and create table
		
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
target.onselect = function(){
  return false;
}
		if(start >= 0){
			start = (+target.innerHTML-1) * step;
		}
		
		end = start + step;
		currentPage = start/step + 1;

		fillTable(tableContainer, start, end);
	}


	if(target.closest('.next')){
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
	};
}


fillContainer(footballers);
fillTable(tableContainer,start,step);
