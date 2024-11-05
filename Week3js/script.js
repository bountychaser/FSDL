function add(){
    const value = document.querySelector('input').value;
    if(value == ""){
        alert("Please Write something!");
       return;
    }
    const divEl = document.createElement('div');
    divEl.style.display = 'flex';
    divEl.style.padding = '10px';
    const spanEl = document.createElement('span');
    const btnEl = document.createElement('button');
    spanEl.innerHTML = value;
    btnEl.innerHTML = "Delete";
    btnEl.addEventListener('click', function(){
        divEl.remove();
    });
    divEl.appendChild(spanEl);
    divEl.appendChild(btnEl);
    document.getElementById('main').appendChild(divEl);
    document.querySelector('input').value ="";
}

 