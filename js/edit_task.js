


function renderEditTask(taskNr) {
    openAddtaskOverlay();
    document.getElementById('idHeadlineAddTask').innerText = "Edit Task";
    addDataEditTaskOverlay(taskNr);
}

/**
 * this function calls different function for adding values from task JSON to html
 * 
 * @param {number} taskNumber - number of clicked task
 */
function addDataEditTaskOverlay(taskNr) {
    let activeTask = taskJson[taskNr]; //
    editTaskLoadValues(activeTask); //
    /* colorTaskType(activeTask.taskType, 'Ov');
    
    taskOverlayDate(activeTask);
    taskOverlayPrio(activeTask);
    taskOverlayMember(activeTask);
    taskOverlaySubTasks(activeTask, taskNr); */
}

/**
 * This function adds the Headline of task to the html element
 * 
 * @param {object} activeTask - contains active task
 */
function editTaskLoadValues(activeTask) {
    document.getElementById('idInputTitleAddTaskOv').value = activeTask.headline;
    document.getElementById('idInputDescriptionAddTaskOv').value = activeTask.description;
    let prio = activeTask.urgency;
    document.getElementById('id' + prio + 'ContainerAddTaskOv').classList.add(prio)
    document.getElementById('id' + prio + 'IMGAddTaskOv').src = `../assets/img/prio_${prio}_white.svg`
    document.getElementById('idInputDueDateAddTaskOv').value = new Date(activeTask.dueDate).toISOString().split('T')[0];
}
