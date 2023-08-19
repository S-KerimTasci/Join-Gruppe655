function renderTasks() {
    console.log(taskJson[0]['task' + 1].status);
    renderStatusContainer('toDo', 'idTaskToDo');
    renderStatusContainer('inProgress', 'idTaskInProgress');
    renderStatusContainer('awaitFeedback','idTaskAwaitFeedback');
    renderStatusContainer('done', 'idTaskDone');
}


function renderStatusContainer(status, taskContainerId ) {
    for (let i = 0; i < taskJson.length; i++) {
        let statusJson = taskJson[i]['task' + (i + 1)];
        console.log(i, statusJson);
        if (status == statusJson.status) {
            document.getElementById(taskContainerId).innerHTML += taskTemplate(statusJson); 
        }        
    }
}




function taskTemplate(task) {
    return /*html*/ `
    <div id="idTaskId" class="singleTaskContainer">
        <div id="idTaskType" class="singlTaskType">User Story ${colorTaskType(task.taskType)}</div>
        <div id="idTaskTxts" class="singelTaskTexts">
            <div id="idTaskHeadline" class="singleTaskHeadline">Contact Form & Imprint
            </div>
            <div id="idTaskShortTxt" class="singleTaskTxt">Create a contact form and
                imprint page...</div>
        </div>
        <div id="idTaskSubTask" class="TaskSubTask">
            <div id="idSingleTaskSubProgress" class="SingleTaskSubProgress"></div>
            <div id="idSingleTaksCount" class="SingleTaksCount">
                <span id="idSingleTaksCountPart">0</span>
                <span>/</span>
                <span id="idSingleTaksCountTotal">2</span>
                <span> Subtasks</span>
            </div>
        </div>
        <div id="idSingleTaskMemberPrio" class="SingleTaskMemberPrio">
            <div id="idSingleTaskMember" class="SingleTaskMember">
                <!-- hier müssen dann über eine Funktion die Memberplaketten eingefüt werden -->
                <div id="idMenberPlaceholder1" class="memberPlaceholder">AS</div>
                <div id="idMenberPlaceholder2" class="memberPlaceholder">FM</div>
                <div id="idMenberPlaceholder3" class="memberPlaceholder">GR</div>
            </div>
            <div id="idSingleTaskPrio" class="SingleTaskPrio">
                <img src="../assets/img/prio_urgent.svg" alt="">
            </div>
        </div>
    </div>`
}

function colorTaskType(taskType) {
    document.getElementById('idTaskType').innerText = taskType;
    switch (taskType) {
        case "UserStory":
            document.getElementById('idTaskType').style.backgroundColor = '#1FD7C1';
            break;
        case "Technical Task":
            document.getElementById('idTaskType').style.backgroundColor = '#0038FF';
            break;
        default:
            break;
    }
}