function add(tasks){
    //grab new task
    var task = document.getElementById("new-task");
    
    //create paragraph element and text node
    const text = document.createElement("p");
    text.className = "list-item"
    const node = document.createTextNode(task.value);

    text.appendChild(node);
    const element = document.getElementById("tasks-submitted");
    
    //append new element to div with id "tasks-submitted"
    element.appendChild(text);

    text.addEventListener( 'click', function(){
        text.style.textDecoration = "line-through"
        text.style.color="red";
      } );
}

function clearList(){
    var tasks = document.getElementsByClassName("list-item");
    console.log(tasks.length);

    //removing tasks
    while(tasks.length>0){
        tasks[0].remove();
    }
}

