let allTasks = [];
let expanded = false;
let currentPrio;
let subtaskObj = [];
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



/* functions for highlight the priority button start */
function highlight(prio) {
    if (currentPrio == prio) {
        removeHighlight()
    } else {
        removeHighlight()
        currentPrio = prio;
        document.getElementById('id' + prio + 'ContainerAddTaskOv').classList.add(prio)
        document.getElementById('id' + prio + 'IMGAddTaskOv').src = `../assets/img/prio_${prio}_white.svg`
    }
}


function removeHighlight() {
    const PRIO = ['low', 'medium', 'urgent']
    PRIO.forEach(element => {
        document.getElementById('id' + element + 'ContainerAddTaskOv').classList.remove(element)
        document.getElementById('id' + element + 'IMGAddTaskOv').src = `../assets/img/prio_${element}.svg`
    });
    currentPrio = '';
}
/* functions for highlight the priority button end */



function showUserNames() {
    let checkboxes = document.getElementById("idChkSelectMultUserOuterConOv");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

function switchIons(count) {
    //console.log(count);
    document.getElementById('idSubtaskPlus').classList.toggle("d-none");
    document.getElementById('idSubtaskIconContainer').classList.toggle("d-none");

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


async function storeNewTask() {
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    getValuesForTaskArr();
    taskJson.push(task2);
    setItem(KEY_for_JSON_TASKS, taskJson);
    subtaskObj = [];
    removeHighlight();
    document.getElementById("idAddTaskForm").reset();
    document.getElementById('idRenderedSubtaskAddTaskOv').innerHTML = '';
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
    task2.taskType = document.getElementById('idSelectCategoryAddTaskOv').value;
    task2.headline = document.getElementById('idInputTitleAddTaskOv').value;
    task2.description = document.getElementById('idInputDescriptionAddTaskOv').value;
    task2.dueDate = new Date(document.getElementById('idInputDueDateAddTaskOv').value).getTime();
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

async function loadContacts() {
    document.getElementById('idCheckboxesSelectMultUserOv').innerHTML = '';
    contactJSON = await loadJSON(KEY_for_JSON_CONTACS);
    for (let i = 0; i < contactJSON.length; i++) {
        document.getElementById('idCheckboxesSelectMultUserOv').innerHTML += userOvHTML(contactJSON[i].name, contactJSON[i].bgColor.slice(1), contactJSON[i].initials, i)
    }
    document.getElementById('idChkSelectMultUserOuterConOv').innerHTML += userOvHTMLButton();
}

function userOvHTML(memberName, memberColor, memberinitials, i) {
    return  `
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between align-items-center">
            <div id="idAssingedToInitialsOv${i}" class="memberDiskOv memberBgColor${memberColor}">${memberinitials}
            </div>
            <label for=idAssingedTo${i}>${memberName}</label>
        </div>
        <input type="checkbox" id=idAssingedTo${i}>
    </div>`
}

function userOvHTMLButton() {
    return `
    <div id="idChkSelectMultUserButtonOv" class="d-flex  ">
        <button class="flex-fill justify-content-center taskButton" onclick="">
            <div>
                <span>Add new cotact</span>
                <img src="" alt="">
            </div>
        </button>
    </div>`
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
    document.getElementById('idRenderedSubtaskAddTaskOv').innerHTML = '';
    subtaskObj = [];
    removeHighlight();
}