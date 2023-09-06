

async function renderEditTask(taskNr) {
    activTaskNumber = taskNr;
    await openAddtaskOverlay();
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
    task2.urgency = prio;
    document.getElementById('id' + prio + 'ContainerAddTaskOv').classList.add(prio)
    document.getElementById('id' + prio + 'IMGAddTaskOv').src = `../assets/img/prio_${prio}_white.svg`
    document.getElementById('idInputDueDateAddTaskOv').value = new Date(activeTask.dueDate).toISOString().split('T')[0];
    document.getElementById('idSelectCategoryAddTaskOv').selectedIndex = selectCategory(activeTask.taskType);
    getSubtasks(activeTask);
    addSubtask();
    document.getElementById('idHeadlineAddTask').innerText === "Edit Task" ? setChkForTaskMember(taskJson[activTaskNumber].member) : '';
    document.getElementById("idSelectedUserAddTaskOv").innerHTML = taskOverlayMemberDiskContainer();
    document.getElementById("idSubmitButtonAddTaskOv").innerText = 'Edit Task';
}


function getSubtasks(activeTask) {
    subtaskObj = [];
    activeTask.subTaskText.forEach(subtask => {
        subtaskObj.push(subtask.label);
    });
}

function selectCategory(cat) {
    let selectElement = document.getElementById("idSelectCategoryAddTaskOv");
    for (let i = 0; i < selectElement.options.length; i++) {
        if(selectElement.options[i].value === cat) return i;
    }
}

function setChkForTaskMember(taskMember) {
    for (let i = 0; i < taskMember.length; i++) {
        const contactIndex = contactJSON.findIndex(contact => contact.name === taskMember[i]);
        let chkChecked = document.getElementById('idAssingedToChk' + contactIndex);
        if (contactIndex != -1) {
            chkChecked.checked = true;
            task2.member.push(taskMember[i]);
        }
    }
}