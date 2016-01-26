
var xhr = new XMLHttpRequest();
xhr.open("GET","http://188.226.135.96:9876/json",true);
/*xhr.open("GET","http://188.226.135.96:9876/json?file=adudar.js",true);*/
xhr.send();
var data;
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status == 200){
		try{
			data = xhr.responseText;
		
		}catch(e){
			console.log(e);
		}
	}
}



var footballers = data,
	head = header,
	paginator = document.getElementById('paginator'),
	container = document.getElementById('container'),
	tableContainer = [],
	step = 5/*+prompt("How much items do you want to see on one page")*/,
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
    titleNames += '</tr>';
    thead.innerHTML = titleNames;
    table.appendChild(thead);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    container.appendChild(table);

    createPaginator();
};

//dynamic paginator, create pages items
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
    
}

// sort array
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


//fill tbody from tableContainer
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
	
	//check if it is a th with .header-select class
	if(target.closest('.header-select')){
    	
    
	
    
		if(lastSelected && lastSelected.childNodes[1] !== undefined){
			lastSelected.childNodes[1].innerHTML = '';
		};

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
