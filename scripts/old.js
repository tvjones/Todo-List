const addTask = () => {
    const task = document.getElementById("new-task");
    const text = document.createElement("p")
    text.appendChild(document.createTextNode(task.value));

    // Strike text out when todo is marked as comp;ete
    text.addEventListener( 'click', () => {
        text.style.textDecoration = "line-through"
        text.style.color="red";
    });

    // Add to list
    const element = document.getElementById("task-list");
    element.appendChild(text);
}


const markAsDone = () => {
    
}

const clearList = () => {
    let tasks = document.getElementsByClassName("list-item");
    console.log(tasks.length);

    //removing tasks
    while(tasks.length>0){
        tasks[0].remove();
    }
}

