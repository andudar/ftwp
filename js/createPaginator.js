define(function(){

    function createPaginator(arr,step){

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

    return createPaginator;
})