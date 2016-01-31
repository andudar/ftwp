define(['fillTable','clearActivePage'],function(fillTable,clearActivePage){

	function paginator(e,table,step,start,end,tableContainer,paginator){
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

		fillTable(tableContainer,table, start, end);
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

		fillTable(tableContainer,table, start, end);
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

	fillTable(tableContainer,table, start, end);
	}

	var nowWeAreHere = paginator.querySelector('.page-' + currentPage);
	if(nowWeAreHere){
		nowWeAreHere.classList.add('active-page');
	}
    
};

	return paginator;
})