
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
    <section id="idBackgroundTaskOverlay" class="BackgroundTaskOverlay">
        <div id="idTopAreaOv">
            <div id="idTaskTypeOv"> </div>
            <div id="idTaskCloseOv"></div>
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
                <!-- Schleife zum Einbinden der SubContainer START (ausgelagerte Funktion!!!)-->
                <div id="idSingleTaskMemberSubContainerOV1">
                    <div id="idSingleTaskMemberInitialsOv1"></div>
                    <span id="idSingleTaskMemberFullNameOv1"></span>
                </div>
                <div id="idSingleTaskMemberSubContainerOV2">
                    <div id="idSingleTaskMemberInitialsOv2"></div>
                    <span id="idSingleTaskMemberFullNameOv2"></span>
                </div>
                <div id="idSingleTaskMemberSubContainerOV2">
                    <div id="idSingleTaskMemberInitialsOv3"></div>
                    <span id="idSingleTaskMemberFullNameOv3"></span>
                </div>
                <!-- Schleife zum Einbinden der SubContainer ENDE -->
            </div>
        </div>
        <div id="idSubTaskContainerOv">
            <span id="idSubTaskOv">Subtasks:</span>
            <div id="idSubTaskSubContainerOv">
                <!-- Schleife zum Einbinden der SubContainer START (ausgelagerte Funktion!!!)-->
                <div id="idSingleSubTaskContainerOv1">
                    <input id="idSingleSubTaskChkboxOv1" type="checkbox">
                    <label id="idSingleSubTaskLabelOv1" for="idSingleSubTaskChkboxOv1"></label>
                </div>
                <div id="idSingleSubTaskContainerOv2">
                    <input id="idSingleSubTaskChkboxOv2" type="checkbox">
                    <label id="idSingleSubTaskLabelOv2" for="idSingleSubTaskChkboxOv2"></label>
                </div>
                <div id="idSingleSubTaskContainerOv3">
                    <input id="idSingleSubTaskChkboxOv3" type="checkbox">
                    <label id="idSingleSubTaskLabelOv3" for="idSingleSubTaskChkboxOv3"></label>
                </div>
                <!-- Schleife zum Einbinden der SubContainer ENDE -->
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
    </section>`    
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
    taskDay = (taskDay.length == 2)? taskDay : ('0' + taskDay);
    taskMonth = (taskMonth.length == 2)? taskMonth : ('0' + taskMonth);
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

function taskOverlayMember(activeTask) {
 const MEMBER = activeTask.member;
 document.getElementById('idSingleTaskMemberContainerOV').innerHTML = taskOverlayMemberHTMLContainer(MEMBER);
 taskOverlayMemberHTMLValues(MEMBER);
}

function taskOverlayMemberHTMLContainer(MEMBER) {
    let memberHTML = '';
    for (let i = 0; i < MEMBER.length; i++) {
        memberHTML += /*html*/ `
        <div id="idSingleTaskMemberSubContainerOV${i}">
            <div id="idSingleTaskMemberInitialsOv${i}"></div>
            <span id="idSingleTaskMemberFullNameOv${i}"></span>
        </div>` 
    }
    return memberHTML
}

 

/* function taskOverlayMemberBackgroundColor(memberName) {
    
} */