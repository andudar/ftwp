define(['sortArray', 'fillTable', 'dataFront'], function(sortArray, fillTable, dataFront){


	var container = document.getElementById('container'),
	//remember last target to check if it's a second click
		lastTarget,
	//remember last selected th for removing previous arrow
		lastSelected;



	container.onclick = function(e){
	//additional function for removing arrow
		function removeArrow(t){
			t.removeChild(t.childNodes[1]);
		}

		var target = e.target;
		//check if it's a selective element with a .header-select class
		if(target.closest('.header-select')){

			while(!target.classList.contains('header-select')){
				target = target.parentNode;
			}

			//remove arrow from previous element
			if(lastSelected && lastSelected.childNodes[1]){
				lastSelected.removeChild(lastSelected.childNodes[1])
			}

			//remove arrow from current element
			if(target.children.length !== 0){
				removeArrow(target);
			}



			var span = document.createElement('span');

			//if it is a second click on the same cell
			//reverse array with users, change arrow
			if(lastTarget && lastTarget.innerHTML == target.innerHTML){

				span.innerHTML = '  &#8595;';
				dataFront.footballersCopy.reverse();
				lastTarget = null;
			}else{
				span.innerHTML = '  &#8593;';
				lastTarget = target;
				sortArray(dataFront.footballersCopy,target.dataset.sort);
			}

			//append arrow
			target.appendChild(span);

			fillTable(true, dataFront.footballersCopy);

			lastSelected = target;
		}

	};

	return dataFront.footballersCopy;

});