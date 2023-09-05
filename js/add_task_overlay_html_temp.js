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

function userOvHTML(memberName, memberColor, memberinitials, i) {
    return `
    <div class="d-flex justify-content-between align-items-center" onclick="toggleChkBox(${i})">
        <div id="idAssingedToInitialsOv${i}" class="memberDiskOv memberBgColor${memberColor}">${memberinitials}
        </div>
        <span id="idAssingedToName${i}">${memberName}</span>
        <div class="chkContainerAssingdTo">
            <input id=idAssingedToChk${i} type="checkbox" class="check_box chkHeight" >
            <label for=idAssingedToLab${i}></label>
        </div>
    </div>`
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