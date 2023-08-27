
// ~~~~~~~~Task overlay~~~~~~~~~
/**
 * This function renders the task overlay
 * 
 * @param {number} taskNumber - task number of aktive task
 */
function renderOverlayTask(taskNumber) {

    document.getElementById('idTaskOverlay').innerHTML = singleTaskOvHtmlTemp();
    addDataSingleTaskOverlay(taskNumber - 1);

}
/**
 * This function returns the HTML Code for the task overlay
 * 
 * @returns - returns the HTML Code for the task overlay
 */
function singleTaskOvHtmlTemp() {
    return /*html*/ `    
    <section id="idBackgroundTaskOverlay" class="backgroundTaskOverlay">
        <div id="idBgOuterContainerTaskOverlay" class="bgOuterContainerTaskOverlay">
            <div id="idBgInnerContainerTaskOverlay" class="bgInnerContainerTaskOverlay">
                <div id="idTopAreaOv" class="d-flex justify-content-between">
                    <div id="idTaskTypeOv" class="singlTaskType"> </div>
                    <div id="idTaskCloseOv" role="button" onclick="closeSingleTaskOverlay()">
                        <img src="../assets/img/taskOverlayClose.svg" alt="">
                    </div>
                </div>
                <div id="idTaskHeadlineOv"></div>
                <div id="idTaskDescriptionOv"></div>
                <div id="idDueDateContainerOv">
                    <span>Due date:</span>
                    <span id="idDueDateOv"></span>
                </div>
                <div id="idUrgencyContainerOv">
                    <span>Priority:</span>
                    <div id="idUrgencySubContainerOv">
                        <span id="idUrgencyOv"></span>
                        <img id="idSingleTaskPrioImgOv" src="" alt="">
                    </div>
                </div>
                <div id="idAssingedToContainer">
                    <span id="idAssingedTo">Assinged To:</span>
                    <div id="idSingleTaskMemberContainerOV">
                        <!-- extra function for adding Members-->
                    </div>
                </div>
                <div id="idSubTaskContainerOv">
                    <span id="idSubTaskOv">Subtasks:</span>
                    <div id="idSubTaskSubContainerOv">
                        <!-- extra function for adding subtasks-->
                    </div>
                </div>
                <div id="idBottomAreaOv">
                    <div id="idBottomAreaContainerOv">
                        <div id="idDeleteContainerOv">
                            <img src="../assets/img/taskOverlayTrash.svg" alt="waste">
                            <span>Delete</span>
                        </div>
                        <div id="idBottomAreaContainerSeparatorOv"></div> 
                        <div id="idEditContainer">
                            <img src="../assets/img/taskOverlayEdit.svg" alt="edit">
                            <span>Edit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`
}

/**
 * this function removes all html in container idTaskOverlay
 */
function closeSingleTaskOverlay() {
    document.getElementById('idTaskOverlay').innerHTML = '';
}

/**
 * this function calls different function for adding values from task JSON to html
 * 
 * @param {number} taskNumber - number of clicked task
 */
function addDataSingleTaskOverlay(taskNr) {
    let activeTask = taskJson[taskNr];
    addTaskTitle(activeTask.headline, 'Ov');
    colorTaskType(activeTask.taskType, 'Ov');
    document.getElementById('idTaskDescriptionOv').innerText = activeTask.description;
    taskOverlayDate(activeTask);
    taskOverlayPrio(activeTask);
    taskOverlayMember(activeTask);
    taskOverlaySubTasks(activeTask);

}

/**
 * This function get the due date and give to idTaskDescriptionOv the formated date
 * 
 * @param {object} activeTask - single task
 */
function taskOverlayDate(activeTask) {
    let taskDate = new Date(activeTask.dueDate);
    let taskMonth = taskDate.getMonth().toString();
    let taskDay = taskDate.getDate().toString();
    let taskYear = taskDate.getFullYear().toString();
    taskDay = (taskDay.length == 2) ? taskDay : ('0' + taskDay);
    taskMonth = (taskMonth.length == 2) ? taskMonth : ('0' + taskMonth);
    document.getElementById('idDueDateOv').innerText = taskDay + '/' + taskMonth + '/' + taskYear;
}

/**
 * This function add to the html the urgency and the related image
 * 
 * @param {object} activeTask - single task
 */
function taskOverlayPrio(activeTask) {
    document.getElementById('idUrgencyOv').innerText = activeTask.urgency;
    taskUrgency(activeTask.urgency, 'Ov');
}

/**
 * this function gets the member information from contactJson based on the member tracked for this single task
 * 
 * @param {object} activeTask - clicked task
 */
function taskOverlayMember(activeTask) {
    const MEMBER = activeTask.member;
    document.getElementById('idSingleTaskMemberContainerOV').innerHTML = taskOverlayMemberContainer(MEMBER);
}

/**
 * this function returns the complete HTML code for all members of this task
 * 
 * @param {object} MEMBER - all members of task
 * @returns - HTML Code for all member of task
 */
function taskOverlayMemberContainer(MEMBER) {
    let memberHTML = '';
    for (let i = 0; i < MEMBER.length; i++) {
        const contactMember = contactJSON.find(contact => contact.name === MEMBER[i]);
        if (contactMember) {
            const memberColor = contactMember.bgColor.slice(1);
            memberHTML += taskOverlayMemberHTML(MEMBER[i], memberColor, contactMember.initials, i);  
        }
    }
    return memberHTML
}

/**
 * this function returns the HTML code for a single member of this task
 * 
 * @param {string} memberName - name of member
 * @param {string} memberColor - background color for disk of member
 * @param {string} memberinitials - intitials of member
 * @param {number} i - count of loop
 * @returns - HTML for single member of this task
 */
function taskOverlayMemberHTML(memberName, memberColor, memberinitials, i) {
    return /*html*/ `
    <div id="idSingleTaskMemberSubContainerOV${i}">
        <div id="idSingleTaskMemberInitialsOv${i}" class="memberDisk memberBgColor${memberColor}">${memberinitials}</div>
        <span id="idSingleTaskMemberFullNameOv${i}">${memberName}</span>
    </div>`
}

/**
 * this function gets the sub task information from contactJson based on the sub tasks tracked for this single task
 * 
 * @param {object} activeTask - selected task
 */
function taskOverlaySubTasks(activeTask) {
    const TASKS = activeTask.subTaskText;
    document.getElementById('idSubTaskSubContainerOv').innerHTML = taskOverlaySubTaskContainer(TASKS);
}

/**
 * this function returns the complete HTML code for all subtasks of this task
 * 
 * @param {object} TASKS  - all subtasks of task
 * @returns - HTML Code for all subtasks of task
 */
function taskOverlaySubTaskContainer(TASKS){
    let tasksHTML = '';
    for (let i = 0; i < TASKS.length; i++) {
        let taskChecked = TASKS[i].checked ? "checked" : '';
        tasksHTML += taskOverlaySubTaskHTML(TASKS[i].label, taskChecked, i); 
    }
    return tasksHTML
}

/**
 * this function returns the HTML code for a single subtask of this task
 * 
 * @param {string} taskLabel - text of subtask
 * @param {string} taskChecked - checked if checked is true. If false string is empty
 * @param {number} i - count of loop 
 * @returns 
 */
function taskOverlaySubTaskHTML(taskLabel, taskChecked, i) {
    return /*html*/ `
    <div id="idSingleSubTaskContainerOv${i}">
        <input id="idSingleSubTaskChkboxOv${i}" type="checkbox" ${taskChecked}>
        <label id="idSingleSubTaskLabelOv${i}" for="idSingleSubTaskChkboxOv${i}">${taskLabel}</label>
    </div>`
}