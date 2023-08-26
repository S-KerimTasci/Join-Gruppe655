let taskToMove = '';
/**
 * this function renders all tasks.
 */
async function renderTasks() {
    //console.log(taskJson);
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    contactJSON = await loadJSON(KEY_for_JSON_CONTACS);
    loginJson = await loadJSON(KEY_for_JSON_PW);
    //console.log(taskJson);
    renderStatusContainer('toDo', 'idTaskToDo');
    renderStatusContainer('inProgress', 'idTaskInProgress');
    renderStatusContainer('awaitFeedback', 'idTaskAwaitFeedback');
    renderStatusContainer('done', 'idTaskDone');
}


/**
 * this function renders all tasks from JSON which flagged with the given status.
 * 
 * @param {string} status 
 * @param {string} taskContainerId 
 */
function renderStatusContainer(status, taskContainerId) {
    let singleTaskCount = 0;
    for (let i = 0; i < taskJson.length; i++) {
        let taskNumber = i + 1;
        let activeTask = taskJson[i];
        if (status == activeTask.status) {
            document.getElementById(taskContainerId).innerHTML += taskTemplate(taskNumber);
            callFunctionForSingleTask(activeTask, taskNumber);
            singleTaskCount++;
        }
    }
    //console.log(taskContainerId + '  ' + singleTaskCount);
    // debugger;
    toggleDefaultContainer(taskContainerId, singleTaskCount);
}

/**
 * This function hides the default task container in case tasks exist
 * 
 * @param {string} taskContainerId 
 */
function toggleDefaultContainer(taskContainerId, taskCount) {
    const taskContainer = document.getElementById(taskContainerId + 'Default');
    if (taskCount == 0 && taskContainer.classList.contains('d-none')) {
        taskContainer.classList.toggle('d-none');
    } else if (taskCount > 0 && !taskContainer.classList.contains('d-none')) {
        taskContainer.classList.toggle('d-none');
    }

}


function dragStart(taskNummer) {
    taskToMove = taskNummer - 1;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(newStatus) {
    //debugger;
    taskJson[taskToMove].status = newStatus;
    afterSetItemServerAnswer = await setItem(KEY_for_JSON_TASKS, taskJson);
    //console.log(afterSetItemServerAnswer);
    document.getElementById('idTaskToDo').innerHTML = '';
    document.getElementById('idTaskInProgress').innerHTML = '';
    document.getElementById('idTaskAwaitFeedback').innerHTML = '';
    document.getElementById('idTaskDone').innerHTML = '';
    renderTasks();
}

/**
 * This function is called by the onchange attribut of a specific task with the purpose of moving task to another status area. It is needed in mobile version
 * 
 * @param {object} task - contains the complete task (HTML)
 */
function changeStatus(task) {
    taskToMove = +task.id.replace("idChangeStatus", "") - 1;
    // console.log(taskToMove);
    // console.log(task.value);
    moveTo(task.value);
    //document.getElementById(task.id).focus() 
}