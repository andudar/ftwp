define(['fillTable','clearActivePage'],function(fillTable,clearActivePage){

	function paginator(e,table,step,nav,tableContainer,o){
	var currentPage;
	var target = e.target;
	var start = nav.start,
		end = nav.end;

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
		nav.start = start;
	nav.end = end;
		fillTable(tableContainer,table, nav);
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
		nav.start = start;
		nav.end = end;
		fillTable(tableContainer,table, nav);
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
		nav.start = start;
		nav.end = end;
	fillTable(tableContainer,table, nav);
	}

	var nowWeAreHere = document.getElementById('paginator').querySelector('.page-' + currentPage);
	if(nowWeAreHere){
		nowWeAreHere.classList.add('active-page');
	}
	nav.start = start;
	nav.end = end;

};

	return paginator;
})