var listElement = document.querySelector('.app ul'),
    textElement = document.querySelector('.app input[type=text]'),
    btnElement = document.querySelector('.app input[type=submit]');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    listElement.innerHTML = '';
    for (todo of todos) {
        var todoElement = document.createElement('li'),
            todoText = document.createTextNode(todo),
            linkElement = document.createElement('a'),
            linkText = document.createTextNode('');

        todoElement.appendChild(todoText);
        listElement.appendChild(todoElement);

        linkElement.appendChild(linkText);
        todoElement.appendChild(linkElement);

        var pos = todos.indexOf(todo);

        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('onclick', 'removerTodos(' + pos + ')');
    }
}
renderTodos();

function addTodos() {
    let todoText = textElement.value,
        igual = false;
    for (todo of todos) {
        if (todoText == todo)
            igual = true;
    }

    if (todoText != "") {
        if (igual)
            alert('Nome ja cadastrado!');
        else {
            todos.push(todoText);
            textElement.value = "";
            renderTodos();
            storageTodos();
        }
    } else
        alert('Favor não deixar em branco o To do !');
}

function removerTodos(pos) {
    let elementClick = event.target,
        anteriorElementClick = elementClick.closest('li');
    anteriorElementClick.setAttribute('class', 'effectClose');
    setTimeout(function () {
        todos.splice(pos, 1);
        renderTodos();
        storageTodos();
    }, 200);
}

function storageTodos() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

btnElement.onclick = addTodos;
