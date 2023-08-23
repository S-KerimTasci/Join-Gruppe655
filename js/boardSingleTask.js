/**
 * this function calls all functions for adding values to the html code within the active task
 * 
 * @param {object} activeTask 
 * @param {number} taskNumber 
 */
function callFunctionForSingleTask(activeTask, taskNumber) {
    colorTaskType(activeTask.taskType, taskNumber);
    addTaskTitle(activeTask.headline, taskNumber);
    addTaskTxt(activeTask.description, taskNumber);
    subTaskBarProgress(activeTask.doneSubTasks, activeTask.sbuTaskTotal, taskNumber);
    taskMember(activeTask.member, taskNumber);
    taskUrgency(activeTask.urgency, taskNumber);
}

/**
 * This function returns the HTML code for a task
 * 
 * @param {number} taskNr 
 * @returns - html code
 */
function taskTemplate(task, taskNr) {
    return /*html*/ `
    <div id="idTaskId${taskNr}" class="singleTaskContainer">
        <div id="idTaskType${taskNr}" class="singlTaskType">User Story </div>
        <div id="idTaskTxts${taskNr}" class="singelTaskTexts">
            <div id="idTaskHeadline${taskNr}" class="singleTaskHeadline">Headline
            </div>
            <div id="idTaskShortTxt${taskNr}" class="singleTaskTxt">Create a contact form and
                imprint page...</div>
        </div>
        <div id="idTaskSubTask${taskNr}" class="TaskSubTask">
            <div class="SingleTaskSubProgressOuterCon"> 
                <div id="idSingleTaskSubProgress${taskNr}" class="SingleTaskSubProgress"></div>
            </div>
            <div id="idSingleTaksCount${taskNr}" class="SingleTaksCount">
                <span id="idSingleTaksCountPart${taskNr}">1</span>
                <span>/</span>
                <span id="idSingleTaksCountTotal${taskNr}">2</span>
                <span> Subtasks</span>
            </div>
        </div>
        <div id="idSingleTaskMemberPrio${taskNr}" class="SingleTaskMemberPrio">
            <div id="idSingleTaskMember${taskNr}" class="SingleTaskMember">
                <!-- hier müssen dann über eine Funktion die Memberplaketten eingefügt werden -->
            </div>
            <div id="idSingleTaskPrio${taskNr}" class="SingleTaskPrio">
                <img id="idSingleTaskPrioImg${taskNr}" src="../assets/img/prio_urgent.svg" alt="">
            </div>
        </div>
    </div>`
}

/**
 * this function returns the background color for the specific task type
 * 
 * @param {string} taskType - this is the specific task type
 * @param {number} taskNr - used to find the specific element id
 */
function colorTaskType(taskType, taskNr) {
    document.getElementById('idTaskType' + taskNr).innerText = taskType;
    switch (taskType) {
        case "User Story":
            document.getElementById('idTaskType' + taskNr).style.backgroundColor = '#0038FF';
            break;
        case "Technical Task":
            document.getElementById('idTaskType' + taskNr).style.backgroundColor = '#1FD7C1';
            break;
        default:
            break;
    }
}

/**
 * This function adds the Headline of task to the html element
 * 
 * @param {string} taskHeadline 
 * @param {number} taskNr 
 */
function addTaskTitle(taskHeadline, taskNr) {
    document.getElementById('idTaskHeadline' + taskNr).innerText = taskHeadline;
}

/**
 * This function adds the limited text to the html code of the task
 * 
 * @param {string} taskText 
 * @param {number} taskNr 
 */
function addTaskTxt(taskText, taskNr) {
    document.getElementById('idTaskShortTxt' + taskNr).innerText = limitTextTo37Char(taskText);
}

/**
 * This function retuns string of 37 chars plus '...' if the lenght of the string is graeter than 37 chars
 * 
 * @param {string} text 
 * @returns 
 */
function limitTextTo37Char(text) {
    if (text.length <= 37) {
        return text
    } else {
        return text.substring(0, 37) + '...';
    }
}

/**
 * This function changes the progress bar width
 * 
 * @param {number} doneSubTasks 
 * @param {number} sbuTaskTotal 
 * @param {number} taskNr 
 */
function subTaskBarProgress(doneSubTasks, sbuTaskTotal, taskNr) {
    let faktor = 1;
    document.getElementById('idSingleTaksCountPart' + taskNr).innerText = doneSubTasks;
    document.getElementById('idSingleTaksCountTotal' + taskNr).innerText = sbuTaskTotal;
    if (sbuTaskTotal != 0) {
        faktor = doneSubTasks / sbuTaskTotal;
        document.getElementById('idSingleTaskSubProgress' + taskNr).style.width = Math.round(128 * faktor) + 'px';
        
    } else {
        document.getElementById('idSingleTaskSubProgress' + taskNr).style.width = 0;
    }
}

/**
 * This function add html container to a container with id 'idSingleTaskMember'
 * used in renderStatusContainer()
 * 
 * @param {array} arrMember - array of full names of all members connected to the task
 * @param {number} taskNr - to create a unique id
 */
function taskMember(arrMember, taskNr) {
    for (let i = 0; i < arrMember.length; i++) {
        let membinitials = memberInitials(arrMember[i]);
        document.getElementById('idSingleTaskMember' + taskNr).innerHTML += `<div id="idMemberPlaceholder${taskNr}_${i}" class="memberPlaceholder">${membinitials}</div>`
        // um die Hintergrundfarbe einzufügen muss hier noch Code rein. 
    }
}

/**
 * This function changes the img urgency belonging to task urgency
 * 
 * @param {string} urgency 
 * @param {number} taskNr 
 */
function taskUrgency(urgency, taskNr) {
    switch (urgency) {
        case 'low':
            document.getElementById('idSingleTaskPrioImg' + taskNr).src = "../assets/img/prio_low.svg";
            break;
        case 'medium':
            document.getElementById('idSingleTaskPrioImg' + taskNr).src = "../assets/img/prio_medium.svg";
            break;
        case 'urgent':
            document.getElementById('idSingleTaskPrioImg' + taskNr).src = "../assets/img/prio_urgent.svg";
            break;
    }
}