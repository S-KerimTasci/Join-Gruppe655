function renderTasks() {
    console.log(taskJson[0]['task' + 1].status);
    renderStatusContainer('toDo', 'idTaskToDo');
    renderStatusContainer('inProgress', 'idTaskInProgress');
    renderStatusContainer('awaitFeedback', 'idTaskAwaitFeedback');
    renderStatusContainer('done', 'idTaskDone');
}


function renderStatusContainer(status, taskContainerId) {
    for (let i = 0; i < taskJson.length; i++) {
        let taskNumber = i + 1;
        let activeTask = taskJson[i]['task' + taskNumber];
        console.log(i, activeTask);
        if (status == activeTask.status) {
            document.getElementById(taskContainerId).innerHTML += taskTemplate(activeTask, taskNumber);
            colorTaskType(activeTask.taskType, taskNumber);
            taskMember(activeTask.member, taskNumber);
        }
    }
}




function taskTemplate(task, taskNr) {
    return /*html*/ `
    <div id="idTaskId${taskNr}" class="singleTaskContainer">
        <div id="idTaskType${taskNr}" class="singlTaskType">User Story </div>
        <div id="idTaskTxts${taskNr}" class="singelTaskTexts">
            <div id="idTaskHeadline${taskNr}" class="singleTaskHeadline">Contact Form & Imprint${task.headline}
            </div>
            <div id="idTaskShortTxt${taskNr}" class="singleTaskTxt">Create a contact form and
                imprint page...</div>
        </div>
        <div id="idTaskSubTask${taskNr}" class="TaskSubTask">
            <div id="idSingleTaskSubProgress${taskNr}" class="SingleTaskSubProgress"></div>
            <div id="idSingleTaksCount${taskNr}" class="SingleTaksCount">
                <span id="idSingleTaksCountPart${taskNr}">0</span>
                <span>/</span>
                <span id="idSingleTaksCountTotal${taskNr}">2</span>
                <span> Subtasks</span>
            </div>
        </div>
        <div id="idSingleTaskMemberPrio${taskNr}" class="SingleTaskMemberPrio">
            <div id="idSingleTaskMember${taskNr}" class="SingleTaskMember">
                <!-- hier müssen dann über eine Funktion die Memberplaketten eingefüt werden 
            Die Funktion muss eine Schleife beinhalten-->
               <!--  <div id="idMemberPlaceholder1${taskNr}" class="memberPlaceholder">AS</div>
                <div id="idMemberPlaceholder2${taskNr}" class="memberPlaceholder">FM</div>
                <div id="idMemberPlaceholder3${taskNr}" class="memberPlaceholder">GR</div> -->
            </div>
            <div id="idSingleTaskPrio${taskNr}" class="SingleTaskPrio">
                <img src="../assets/img/prio_urgent.svg" alt="">
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
 * This function add html container to a container with id 'idSingleTaskMember'
 * used in renderStatusContainer()
 * 
 * @param {array} arrMember - array of full names of all members connected to the task
 * @param {number} taskNr - to create a unique id
 */
function taskMember(arrMember, taskNr) {
    for (let i = 0; i < arrMember.length; i++) {
        let membinitials = memberInitials(arrMember[i]);
        document.getElementById('idSingleTaskMember').innerHTML = `<div id="idMemberPlaceholder${taskNr}_${i}" class="memberPlaceholder">${membinitials}</div>`
    }
}

