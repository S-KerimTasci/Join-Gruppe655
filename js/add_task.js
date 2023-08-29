let allTasks = [];
let allContacts = ['Emmanuel Mauer', 'Marcel Bauer']
let currentPrio;
let subtaskObj = [];

function createTask() {
    let title = document.getElementById('inputTitle').value
    let description = document.getElementById('inputDescription').value
    let dueDate = document.getElementById('inputDueDate').value
    let category = document.getElementById('inputCategory').value
    let priority = currentPrio
    let priorityIMG = `../assets/img/prio_${currentPrio}.svg`
    let subtask = document.getElementById('subtask').value

    let task = {
        'title': title,
        'description': description,
        'dueDate': dueDate,
        'category': category,
        'priority': priority,
        'priorityIMG': priorityIMG,
        'subtask': subtask

    }

    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString)

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];


        document.getElementById('overlayCategory').innerHTML = allTasks[i].category;
        document.getElementById('overlayTitle').innerHTML = allTasks[i].title;
        document.getElementById('overlayDescription').innerHTML = allTasks[i].description;
        document.getElementById('overlayDueDate').innerHTML = allTasks[i].dueDate;
        document.getElementById('overlayPrio').innerHTML = allTasks[i].priority;
        document.getElementById('overlayPrioIMG').src = allTasks[i].priorityIMG;
        document.getElementById('overlayCategory').innerHTML = allTasks[i].category;
    }
}

async function loadContacts() {
    document.getElementById('inputAssignedTo').innerHTML = `<option value="" disabled selected hidden>Select conntacts to assign</option>`
    contactJSON = await loadJSON(KEY_for_JSON_CONTACS);
    //document.getElementById('inputAssignedTo').innerHTML = '';
    for (let i = 0; i < contactJSON.length; i++) {
        const contact = contactJSON[i].name;

        document.getElementById('inputAssignedTo').innerHTML += `<option>${contact}</option>`
    }
}


function highlight(x) {
    if (currentPrio == x) {
        removeHighlight()
    } else {
        removeHighlight()
        setPrio(x)

        document.getElementById(x).classList.add(x)
        document.getElementById(x + 'IMG').src = `../assets/img/prio_${x}_white.svg`
    }
}

function setPrio(x) {
    currentPrio = x;
    console.log(currentPrio)
}

function removeHighlight() {
    currentPrio = '';

    document.getElementById('urgent').classList.remove('urgent')
    document.getElementById('urgentIMG').src = `../assets/img/prio_urgent.svg`

    document.getElementById('medium').classList.remove('medium')
    document.getElementById('mediumIMG').src = `../assets/img/prio_medium.svg`

    document.getElementById('low').classList.remove('low')
    document.getElementById('lowIMG').src = `../assets/img/prio_low.svg`
}

//Code changed by Alex ~~~~~ start
function addSubtask() {
    let subtask = document.getElementById('subtask');
    subtask.value !== '' ? subtaskObj.push(subtask.value) : '';
    document.getElementById('renderedSubtask').innerHTML = '';
    for (let i = 0; i < subtaskObj.length; i++) {
        document.getElementById('renderedSubtask').innerHTML += subtaskHTML(i);
        subtask.value = '';
    }
}

function subtaskHTML(count) {
    return `<li id="SubTask${count}">
    <span>${subtaskObj[count]}</span>
    <input type="text" class="editInput" style="display: none;">
    <img onclick="editSubtask(${count})" src="../assets/img/edit_subtask.svg">
    <img onclick="deleteSubtask(${count})" src="../assets/img/delete_subtask.svg">
</li>`
}

function deleteSubtask(subtaskObjElement) {
    subtaskObj.splice(subtaskObjElement, 1);
    addSubtask();
}
//Code changed by Alex ~~~~~ end

function editSubtask(subtaskValue) {
    const subtaskElement = document.getElementById(subtaskValue);
    const subtaskTextSpan = subtaskElement.querySelector('span');
    const editInput = subtaskElement.querySelector('.editInput');

    if (subtaskElement) {
        subtaskTextSpan.style.display = 'none';
        editInput.style.display = 'inline';
        editInput.value = subtaskTextSpan.textContent;
        editInput.focus();

        editInput.addEventListener('blur', () => {
            subtaskTextSpan.textContent = editInput.value;
            subtaskTextSpan.style.display = 'inline';
            editInput.style.display = 'none';
        });
    }
}


//Code added by Alex ~~~~~ start
let task2 = {
    "taskId": "", // task id - should be a ongoing number
    "taskType": "", //type of task
    "dueDate": "", //date of task /* 21.Sep.23 */
    "status": "", //status of task /*toDo inProgress awaitFeedback done*/
    "headline": "", //title of task
    "description": "", //decription of task
    "doneSubTasks": "", // count of tasks which checked
    "subTaskTotal": "", // count of all tasks
    "subTaskText": [],//needs a push
    "member": [],//needs a push
    "urgency": ""
};

async function storeNewTask() {
        taskJson = await loadJSON(KEY_for_JSON_TASKS);
        getValuesForTaskArr();
        taskJson.push(task2);
        setItem(KEY_for_JSON_TASKS, taskJson);
        subtaskObj = [];
        removeHighlight();
        document.getElementById("addTaskForm").reset();
        document.getElementById('renderedSubtask').innerHTML ='';
}


function getValuesForTaskArr() {
    task2.taskId = calcTaskId();
    task2.status = "toDo";
    task2.urgency = currentPrio;
    getValuesFromForm();
    getSubtaskFromForm();
    getMembersFromForm();
}


function getValuesFromForm() {
    task2.taskType = document.getElementById('inputCategory').value;
    task2.headline = document.getElementById('inputTitle').value;
    task2.description = document.getElementById('inputDescription').value;
    task2.dueDate = new Date(document.getElementById('inputDueDate').value).getTime();
}

function getSubtaskFromForm() {
    task2.subTaskTotal = subtaskObj.length;
    task2.doneSubTasks = 0;
    for (let i = 0; i < subtaskObj.length; i++) {
        let subObj = '';
        subObj = { "label": subtaskObj[i], "checked": false };
        task2.subTaskText.push(subObj);
    }
}

function getMembersFromForm() {
    //die Datenquelle Assinged to ist falsch. Aktuell kann ich hier nur einen Wert auslesen weil das <select> Element verwendet wird
    //Ich werde hier erst einmal nur die gewählte Select Option nehmen.
    let selectElement = document.getElementById("inputAssignedTo");
    let selectedIndex = selectElement.selectedIndex;
    task2.member.push(selectElement.options[selectedIndex].text);
}

function calcTaskId() {
    for (let i = 0; i < taskJson.length; i++) {
        taskJson[i].taskId = i + 1;
    }
    task2.taskId = taskJson.length + 1;
}

function clearAddTaskForm() {
    document.getElementById('renderedSubtask').innerHTML ='';
    subtaskObj = [];
    removeHighlight();
}