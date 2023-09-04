let allTasks = [];
let expanded = false;
let subtaskPlus = true;
let currentPrio ='';
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

function subtaskHTML(count) {
    return `
    <li id="idSubTask${count}" class="subTaskElement">
        <div id="idSubTaskdefaultContainer${count}" class="d-flex justify-content-between mt-2">
            <span id="idSubTaskText${count}">${subtaskObj[count]}</span>
            <div id="idSubTaskEditDeleteContainer${count}">
                <img onclick="editSubtask(${count})" src="../assets/img/edit_subtask.svg">
                <img onclick="deleteSubtask(${count})" src="../assets/img/delete_subtask.svg">
            </div>
        </div>
        <div id="idSubTaskTextEditContainer${count}"
            class="d-none flex-row justify-content-between align-items-center mt-2 subtaskSubEditOv">
            <input id="idSubTaskTextEdit${count}" class="" type="text">
            <div id="idSubtaskEditIconContainer${count}" class="d-flex flex-row">
                <img src="../assets/img/delete_subtask.svg" alt="" onclick="deleteSubtask(${count})">
                <div id="idSubTaskDivider2${count}" class="subTaskDivider"></div>
                <img src="../assets/img/checkBlack.svg" alt="" onclick="editSubtaskText(${count})">

            </div>
        </div>
    </li>`
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
    return `
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between align-items-center">
            <div id="idAssingedToInitialsOv${i}" class="memberDiskOv memberBgColor${memberColor}">${memberinitials}
            </div>
            <label id="idAssingedToLab${i}" for=idAssingedTo${i}>${memberName}</label>
        </div>
        <input id=idAssingedTo${i} type="checkbox" class="AssingedToChk" >
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
    let CHKBOXARR = document.getElementsByClassName('AssingedToChk');
    for (let i = 0; i < CHKBOXARR.length; i++) {
        console.log(CHKBOXARR[i].checked);
         //debugger;
        if (CHKBOXARR[i].checked == true) {
            //  let selectElement = document.getElementById("idAssingedTo" + i);
            // let selectedIndex = selectElement.selectedIndex;
            task2.member.push(document.getElementById("idAssingedToLab" + i).innerText); 
        }
    }  
    console.log(task2) ;     
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


function openAddtaskOverlay() {
    htmlAddTaskOverlay();
    loadContacts();
    
}

function htmlAddTaskOverlay() {
    document.getElementById('idAddTaskOverlay').innerHTML = /*html*/`
    <section id="idBgAddTaskOverlay" class="backgroundTaskOverlay" onclick="closeOverlay('idAddTaskOverlay')">
        
            <form id="idAddTaskForm" onsubmit="storeNewTask(); return false" class="addTaskOvGeneralSettings" onclick="innerClick(event)">

                <h1 id="idHeadlineAddTask" class="headlineAddTaskOv">Add Task</h1>
                <div id="idContentContainerAddTaskOv" class="contentContainerAddTaskOv">
                    <div id="idInputTitleContainerAddTaskOv" class="d-flex flex-column">
                        <label for="idInputTitleAddTaskOv">Title</label>
                        <input id="idInputTitleAddTaskOv" maxlength="48" class="inputTitleAddTaskOv" type="text"
                            placeholder="Enter a title" required>
                        <span class="requiredInfo">This field is required</span>
                    </div>
                    <div id="idInputDescriptionContainerAddTaskOv" class="mt-1 d-flex flex-column">
                        <label for="idInputDescriptionAddTaskOv">Description</label>
                        <textarea id="idInputDescriptionAddTaskOv" class="inputDescriptionAddTaskOv" name="inputDescription"
                            placeholder="Enter a Description" required></textarea>
                        <span class="requiredInfo">This field is required</span>
                    </div>
                    <div id="idPriorityContainerAddTaskOv" class="mt-1 d-flex flex-column">
                        <span for="idPriorityAddTaskOv">Prio</span>
                        <div id="idPriorityAddTaskOv"
                            class="d-flex flex-row justify-content-between priorityButtonContainerAddTaskOv">
                            <div id="idurgentContainerAddTaskOv" onclick="highlight('urgent')" class="prioContainerAddTaskOv">
                                <span for="idUrgentIMGAddTaskOv">Urgent</span>
                                <img id="idurgentIMGAddTaskOv" src="../assets/img/prio_urgent.svg" class="">
                            </div>
                            <div id="idmediumContainerAddTaskOv" onclick="highlight('medium')" class="prioContainerAddTaskOv">
                                <span for="idMediumIMGAddTaskOv">Medium</span>
                                <img id="idmediumIMGAddTaskOv" src="../assets/img/prio_medium.svg" class="">
                            </div>
                            <div id="idlowContainerAddTaskOv" onclick="highlight('low')" class="prioContainerAddTaskOv">
                                <span for="idLowIMGAddTaskOv">Low</span>
                                <img id="idlowIMGAddTaskOv" src="../assets/img/prio_low.svg" class="">
                            </div>
                        </div>
                    </div>
                    <div id="idDueDateContainerAddTaskOv" class="d-flex flex-column">
                        <label for="idInputDueDateAddTaskOv">Due Date</label>
                        <input id="idInputDueDateAddTaskOv" class="inputDueDateAddTaskOv" type="date" value="" min="2023-08-31"
                            required>
                        <span class="requiredInfo">This field is required</span>
                    </div>
                    <div id="idInputCategoryContainerAddTaskOv" class="mt-1 d-flex flex-column">
                        <label for="idSelectCategoryAddTaskOv">Category</label>
                        <select id="idSelectCategoryAddTaskOv" class="selectContainerOv selectArrow" name="category" required>
                            <option value="" disabled selected hidden>Select task category</option>
                            <option value="Technical Task">Technical Task</option>
                            <option value="User Story">User Story</option>
                        </select>
                    </div>
                    <div id="idInputAssignedToContainerAddTaskOv" class="mt-3 d-flex flex-column">
                        <label for="idInputAssignedToAddTaskOv">Assigned To</label>
                        <div id="idSelectMultUserOv" class="selectMultUserOv" onclick="showUserNames()">
                            <input type="search" id="idInputAssignedToAddTaskOv" class="selectContainerOv selectArrow"
                                placeholder="Select contacts to assign" onkeypress="return event.keyCode != 13;">
                        </div>
                        <div id="idSelectedUserAddTaskOv"><!-- hier kommen die User rein, die ausgewählt wurden --></div>
                        <div id="idChkSelectMultUserOuterConOv" class="chkSelectMultUserOuterConOv">
                            <div id="idCheckboxesSelectMultUserOv" class="checkboxesSelectMultUserOv">
                                <!-- hier kommt die Funktion rein, die die Namen aus contactJSON ausliest -->
                            </div>
                        </div>
                    </div>
                    <div id="idSubtaskContainerAddTaskOv" class="mt-3">
                        <label for="idSubtaskAddTaskOv">Subtask</label>
                        <div id="idSubtaskSubContainerAddTaskOv" onfocus="switchIons(1)" onblur="switchIons(1)" 
                            class="d-flex flex-row justify-content-between align-items-center subtaskSubContainerAddTaskOv">
                            <input id="idSubtaskAddTaskOv" onfocus="switchIons(1)" 
                                class="subtaskAddTaskOv" type="text" placeholder="Add new subtask" onkeypress="return event.keyCode != 13;">
                            <div id="idSwitchIcons">
                                <img id="idSubtaskPlus" src="../assets/img/plus.svg" onclick="switchIons(2)"> <!-- onclick="switchIons(4)" -->
                                <div id="idSubtaskIconContainer" class="d-flex flex-row d-none">
                                    <img src="../assets/img/taskOverlayClose.svg" alt="" onclick="switchIons(4)">
                                    <div id="idSubTaskDivider" class="subTaskDivider"></div>
                                    <img src="../assets/img/checkBlack.svg" alt="" onclick="addSubtask(); switchIons(4)">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="idRenderedSubtaskContainerAddTaskOv">
                        <ul id="idRenderedSubtaskAddTaskOv"></ul>
                    </div>
                </div>
                <div id="idSubmitContainerAddTaskOv" onsubmit="storeNewTask()"
                    class="submitContainerAddTaskOv d-flex justify-content-end align-items-center">
                    <button id="idSubmitButtonAddTaskOv" type="onsubmit" class="taskButton">Create Task <img
                            src="../assets/img/check.svg"></button>
                </div>
            </form>
    </section>`
}