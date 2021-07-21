//stores unfinished tasks
let tasks = []

function getNewTask(){
    //task entered
    let task = (document.getElementById("new-task")).value;
    if(task!=''){
        tasks.push({task:task,status:'unfinished'})
    }
    task = ''
}

function saveToBrowserStorage(){
    //save tasks to browser storage
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function loadFromBroswerStorage(){
    tasks = JSON.parse((localStorage.getItem('tasks')));
}

function addToList(task){
    //create paragraph element and text node
    const text = document.createElement("p");
    text.className = "list-item"

    const node = document.createTextNode(task.task);
    text.appendChild(node);
    
    const element = document.getElementById("tasks-submitted");
    //append new element to div with id "tasks-submitted"
    element.appendChild(text);

    //strikes through paragraph elements (tasks) on click
    text.addEventListener( 'click', function(){
        text.style.textDecoration = "line-through"
        text.style.color="red";
    });

    text.addEventListener('click', checkUnfinished);

    if(task.status == 'finished'){
        text.style.textDecoration = "line-through"
        text.style.color="red";
    }
}


function clearList(){

    //clears items in list and reset browser storage
    for(let i=0; i < tasks.length; i++){
        (document.getElementsByClassName('list-item'))[0].remove();
    }
    tasks = []
    localStorage.clear();
}

function addTask(){
    getNewTask();
    saveToBrowserStorage();
    addToList(tasks[tasks.length-1]);
}

function renderListOnLoad(){
    for(let i=0; i < tasks.length; i++){
        addToList(tasks[i])
    }
}

function checkUnfinished(){
    const listItems = document.getElementsByClassName('list-item');
    for(let i=0; i < listItems.length; i++){
        if (listItems[i].style.color == 'red' && listItems[i].style.textDecoration == "line-through"){
            tasks[i].status = 'finished'
        }
    }
    saveToBrowserStorage();
}

loadFromBroswerStorage();
renderListOnLoad();
