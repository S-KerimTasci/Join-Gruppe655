let expanded = false;
let subtaskPlus = true;
//let currentPrio = '';
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
    if (task2.urgency == prio) { 
        removeHighlight()
    } else {
        removeHighlight()
        task2.urgency = prio; 
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
    task2.urgency = ''; 
}
/* functions for highlight the priority button end */


// hier muss noch eine Funktion rein, die die memberplaketten unter den assinged to container lädt.
function showUserNames() {
    if (!expanded) {
        toggleDivUsrDropVsMemberDisk();
        expanded = true;
    } else {
        toggleDivUsrDropVsMemberDisk();
        document.getElementById("idSelectedUserAddTaskOv").innerHTML = taskOverlayMemberDiskContainer();
        expanded = false;
    }
}

function toggleDivUsrDropVsMemberDisk() {
    let checkboxes = document.getElementById("idChkSelectMultUserOuterConOv");
    let memberDisks = document.getElementById("idSelectedUserAddTaskOv");
    memberDisks.classList.toggle('d-none');
    checkboxes.classList.toggle('d-none');
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
    const taskBtn = document.getElementById('idSubmitButtonAddTaskOv').innerText;
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    getValuesForTaskArr();
    closeOverlay('idAddTaskOverlay');
    if (taskBtn === 'Edit Task') {
        taskJson[activTaskNumber] = task2;  
        renderOverlayTask(activTaskNumber);
    } else {
        taskJson.push(task2);
        subtaskObj = [];   
    }
    setItem(KEY_for_JSON_TASKS, taskJson); 
}


function getValuesForTaskArr() {
    task2.taskId = calcTaskId();
    task2.status = taskJson[activTaskNumber] ? taskJson[activTaskNumber].status : 'toDo';
    task2.urgency = task2.urgency === '' ? task2.urgency = 'low' : task2.urgency;
    getValuesFromForm();
    getSubtaskFromForm();
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


async function openAddtaskOverlay() {
    resetTask2();
    htmlAddTaskOverlay();
    await loadContacts();
    document.getElementById('idChkSelectMultUserOuterConOv').classList.add('d-none');
}


function toggleChkBox(chkNr) {
    let chkChecked = document.getElementById('idAssingedToChk' + chkNr);
    if (chkChecked.checked) {
        chkChecked.checked = false;
        task2.member = task2.member.filter(item => item !== document.getElementById('idAssingedToName' + chkNr).innerText);
    } else {
        chkChecked.checked = true;
        task2.member.push(document.getElementById('idAssingedToName' + chkNr).innerText);
        task2.member = [...new Set(task2.member)];
    }
}

/**
 * this function returns the complete HTML code for all members of this task
 * 
 * @returns - HTML Code for all member of task
 */
function taskOverlayMemberDiskContainer() {
    let memberHTML = '';
    for (let i = 0; i < task2.member.length; i++) {
        const contactMember = contactJSON.find(contact => contact.name === task2.member[i]);
        if (contactMember) {
            const memberColor = contactMember.bgColor.slice(1);
            memberHTML += taskOverlayMemberDiskHTML(memberColor, contactMember.initials, i);
        }
    }
    return memberHTML
}

/**
 * this function returns the HTML code for a single member of this task
 * 
 * @param {string} memberColor - background color for disk of member
 * @param {string} memberinitials - intitials of member
 * @param {number} i - count of loop
 * @returns - HTML for single member of this task
 */
function taskOverlayMemberDiskHTML(memberColor, memberinitials, i) {
    return /*html*/ `
    <div id="idTaskMemberSubContainerOV${i}" class="singleTaskMemberSubContainerOV px-1">
        <div id="idTaskMemberInitialsOv${i}" class="memberDiskOv memberBgColor${memberColor}">${memberinitials}</div>
    </div>`
}
