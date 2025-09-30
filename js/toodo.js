document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskClass = task.completed ? 'task-item completed' : 'task-item';
            const listItemHTML = `
                <li class="${taskClass}" data-id="${task.id}">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                    <button class="delete-button">×</button>
                </li>
            `;
            taskList.innerHTML += listItemHTML;
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    };

    const handleTaskAction = (event) => {
        const clickedElement = event.target;

        if (clickedElement.classList.contains('delete-button')) {
            const li = clickedElement.closest('.task-item');
            const taskId = Number(li.dataset.id);
            tasks = tasks.filter(task => task.id !== taskId);
        }

        if (clickedElement.type === 'checkbox') {
            const li = clickedElement.closest('.task-item');
            const taskId = Number(li.dataset.id);
            const task = tasks.find(task => task.id === taskId);
            if (task) {
                task.completed = !task.completed;
            }
        }
        saveTasks();
        renderTasks();
    };

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', handleTaskAction);

    renderTasks();
});