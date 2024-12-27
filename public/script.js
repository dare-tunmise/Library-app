const request = new XMLHttpRequest();

request.addEventListener('readystatechange', ()=>{
    // console.log(request, request.readyState);
    if (request.readyState === 4) {
        console.log(request.responseText);
    }
})

request.open('GET', 'http://localhost:4000/books/1');
request.send();

