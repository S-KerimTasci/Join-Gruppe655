let expanded = false;
let subtaskPlus = true;
let currentPrio ='';
let subtaskObj = [];
let activTaskNumber = '';
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

function resetTask2() { // ich denke ich kann die deklaration uf let = {} beschränken
    task2 = {
        "taskId": "", 
        "taskType": "", 
        "dueDate": "", 
        "status": "", 
        "headline": "", 
        "description": "", 
        "doneSubTasks": "", 
        "subTaskTotal": "", 
        "subTaskText": [],
        "member": [],
        "urgency": ""
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


// hier muss noch eine Funktion rein, die die memberplaketten unter den assinged to container lädt.
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
    if (count !== 2 || subtaskPlus === true) {
        document.getElementById('idSubtaskPlus').classList.add("d-none");
        document.getElementById('idSubtaskIconContainer').classList.remove("d-none");
        subtaskPlus = false;
    }
    if (count === 4) {
        subtaskPlus = true;
        document.getElementById('idSubtaskPlus').classList.remove("d-none");
        document.getElementById('idSubtaskIconContainer').classList.add("d-none");
        document.getElementById('idSubtaskAddTaskOv').value = '';
    }
}

//Code changed by Alex ~~~~~ start
function addSubtask() {
    
    let subtask = document.getElementById('idSubtaskAddTaskOv');
    subtask.value !== '' ? subtaskObj.push(subtask.value) : '';
    document.getElementById('idRenderedSubtaskAddTaskOv').innerHTML = '';
    for (let i = 0; i < subtaskObj.length; i++) {
        document.getElementById('idRenderedSubtaskAddTaskOv').innerHTML += subtaskHTML(i);
        subtask.value = '';
    }
}


function deleteSubtask(subtaskObjElement) {
    subtaskObj.splice(subtaskObjElement, 1);
    addSubtask();
}
//Code changed by Alex ~~~~~ end

function editSubtask(count) {
    const subtaskText = document.getElementById("idSubTaskText" + count).innerText;
    document.getElementById("idSubTaskTextEditContainer" + count).classList.toggle("subTaskTextEdit");
    document.getElementById("idSubTaskdefaultContainer" + count).classList.toggle("d-none");
    document.getElementById("idSubTaskTextEdit" + count).value = subtaskText;
}

function editSubtaskText(count) {
    subtaskObj[count] = document.getElementById('idSubTaskTextEdit' + count).value;
    addSubtask();
}
//Code added by Alex ~~~~~ start


async function storeNewTask() {
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    getValuesForTaskArr();
    taskJson.push(task2);
    setItem(KEY_for_JSON_TASKS, taskJson);
    subtaskObj = [];
    closeOverlay('idAddTaskOverlay');
}


function getValuesForTaskArr() {
    task2.taskId = calcTaskId();
    task2.status = "toDo";
    task2.urgency = currentPrio;
    getValuesFromForm();
    getSubtaskFromForm();
    console.log(task2);
    //debugger;
    //getMembersFromForm();
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




/* function getMembersFromForm() {
    task2.member = [];
    let myArr = document.querySelectorAll('chkContainerAssingdTo');
    for (let i = 0; i < myArr.length; i++) {
    let CHKBOXARR = document.getElementsByClassName('idAssingedToChk' + i);
    
        if (CHKBOXARR.checked == true) {
            task2.member.push(document.getElementById("idAssingedTName" + i).innerText); 
        }
    }      
}
 */

function calcTaskId() {
    for (let i = 0; i < taskJson.length; i++) {
        taskJson[i].taskId = i + 1;
    }
    return taskJson.length + 1;
}

function clearAddTaskForm() {
    document.getElementById('idRenderedSubtaskAddTaskOv').innerHTML = '';
    subtaskObj = [];
    removeHighlight();
}


function openAddtaskOverlay() {
    resetTask2();
    htmlAddTaskOverlay();
    loadContacts();
}

function toggleChkBox(chkNr) {
    let chkChecked = document.getElementById('idAssingedToChk' + chkNr);
    if (chkChecked.checked) {
        chkChecked.checked = false
        task2.member = task2.member.filter(item => item !== document.getElementById('idAssingedToName' + chkNr).innerText);
    } else {
        chkChecked.checked = true
        task2.member.push(document.getElementById('idAssingedToName' + chkNr).innerText);
    }
     console.log(task2.member);
    
}
