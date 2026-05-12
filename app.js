const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const priorityCheck = document.getElementById('priority-check');
const taskList = document.getElementById('task-list');

const tasks = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const task = { text, priority: priorityCheck.checked, done: false };
  tasks.push(task);
  input.value = '';
  priorityCheck.checked = false;
  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.priority) li.classList.add('priority');
    if (task.done) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = task.text;

    const doneBtn = document.createElement('button');
    doneBtn.textContent = task.done ? 'Ångra' : 'Klar';
    doneBtn.className = 'btn-done';
    doneBtn.onclick = () => {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Radera';
    deleteBtn.className = 'btn-delete';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
