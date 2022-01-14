//stores unfinished tasks
let tasks = []
let inputField = document.getElementById('new-task');

inputField.addEventListener( 'keyup', (event) =>{
    if(event.keyCode == 13){
        addTask();
    }
  }); 

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
    if(localStorage.getItem('tasks') != null){
        tasks = JSON.parse((localStorage.getItem('tasks')));
    }
    else{
        tasks = [];
    }
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
        //text.style.textDecoration = "line-through"
        //text.style.color="red";
        if(text.style.textDecoration != 'line-through'){
            text.style.textDecoration = 'line-through';
            text.style.color="red";
        }
        else{
            text.style.textDecoration = 'none';
            text.style.color='white';
        }
        checkFinished();
        displayStatus();
    });

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
    displayStatus();
}

function addTask(){
    getNewTask();
    saveToBrowserStorage();
    addToList(tasks[tasks.length-1]);
    displayStatus();
}

function renderListOnLoad(){
    if(tasks != null){
        for(let i=0; i < tasks.length; i++){
            addToList(tasks[i])
        }
    }
    displayStatus();
}

function checkFinished(){
    const listItems = document.getElementsByClassName('list-item');
    for(let i=0; i < listItems.length; i++){
        if (listItems[i].style.color == 'red' && listItems[i].style.textDecoration == "line-through"){
            tasks[i].status = 'finished'
        }
        else{
            tasks[i].status = 'unfinished'
        }
    }
    saveToBrowserStorage();
}

//displays the number of tasks that are active and the number of tasks that are completed.
function displayStatus(){
    var active = 0;
    var complete = 0;

    if(tasks!=null){
        for(let i=0; i<tasks.length; i++){
            if(tasks[i].status == 'finished'){
                complete++;
            }
            else{
                active++;
            }
        }
    }
    let element = document.getElementById('status');
    (element.children[0]).innerHTML = "Active - "+ active.toString();
    (element.children[1]).innerHTML = "Complete - "+ complete.toString();
}   

loadFromBroswerStorage();
renderListOnLoad();
