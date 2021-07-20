// Global variables that we use closures to manage
let tasks = [];
let taskCompleteness = [];

// Loads tasks from browser cache if they exist
const loadTasks = () => {
    const cachedTasks = localStorage.getItem('tasks');
    const cachedtaskCompleteness = localStorage.getItem('taskCompleteness');
    if (!cachedTasks || !cachedtaskCompleteness) return [
        [],
        []
    ];
    return [JSON.parse(cachedTasks), JSON.parse(cachedtaskCompleteness)];
}

// Adds a new task to the list and saves to cache
const addTask = () => {
    const {
        value: newTask
    } = document.getElementById("new-task");
    tasks.push(newTask);
    taskCompleteness.push(false);
    onTaskAction();
}

// Saves tasks to the cache
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskCompleteness', JSON.stringify(taskCompleteness));
}

// Runs after every task list action [for e.g. save or load]
const onTaskAction = () => {
    saveTasks();
    window.location.reload();
}

// Deletes all tasks in the list
const deleteTasks = () => {
    tasks = [];
    taskCompleteness = [];
    onTaskAction();
}

// Toggles a task to be complete or not
const toggleDone = (index) => {
    taskCompleteness[index] = !taskCompleteness[index];
    onTaskAction();
}

// Fetches tasks from the cache and displays them with proper formatting
const renderTasks = () => {
    [tasks, taskCompleteness] = loadTasks();

    if (!tasks.length || !taskCompleteness.length) {
        console.log('No tasks have been cached');
    } else if (tasks.length !== taskCompleteness.length) {
        console.log(`Tasks: ${tasks.length}`);
        console.log(`Task Statuses: ${taskCompleteness.length}`);
        console.error('Task statuses out of sync');
    } else {
        console.log('Tasks have been cached');
        tasks.forEach((task, index) => {
            const taskListItem = document.createElement("p");
            const text = document.createTextNode(task);
            taskListItem.appendChild(text);

            // Conditionally strike through text based on the status of done being true or false
            taskListItem.style.textDecoration = taskCompleteness[index] ? "line-through" : "none";
            taskListItem.style.color = taskCompleteness[index] ? "red" : "black";

            // Add click listener to toggle tasks based on their position in the list
            taskListItem.addEventListener('click', () => {
                toggleDone(index);
            });

            const taskList = document.getElementById("task-list");
            taskList.appendChild(taskListItem);
        })
    }
}


// Render the tasks by default as soon as the page loads
window.onload = (event) => {
    renderTasks();
}