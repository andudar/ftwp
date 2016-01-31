define(['createPaginator'],function(createPaginator){

    function createTable(container,head,footballersCopy,step){
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

    createPaginator(footballersCopy,step);
};

    return createTable;
})