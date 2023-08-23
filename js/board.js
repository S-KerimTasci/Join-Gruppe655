
/**
 * this function renders all tasks.
 */
function renderTasks() {
    console.log(taskJson);
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
            document.getElementById(taskContainerId).innerHTML += taskTemplate(activeTask, taskNumber);
            callFunctionForSingleTask(activeTask, taskNumber);
            singleTaskCount++;
        }
    }
    if (singleTaskCount) removeDefaultContainer(taskContainerId);
}

/**
 * This function hides the default task container in case tasks exist
 * 
 * @param {string} taskContainerId 
 */
function removeDefaultContainer(taskContainerId) {
    document.getElementById(taskContainerId + 'Default').classList.add('d-none');
}

