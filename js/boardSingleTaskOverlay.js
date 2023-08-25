
// ~~~~~~~~Task overlay~~~~~~~~~

function renderOverlayTask(taskNumber) {
    let activeTask = taskJson[taskNumber - 1];
    document.getElementById('idTaskOverlay').innerHTML = singleTaskOvHtmlTemp();
    addTaskTitle(activeTask.headline, 'Ov');
    
}

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
                <img id="idUrgencyImgOv" src="" alt="">
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
                    <img src="" alt="waste">
                    <span>Delete</span>
                </div>
                <div id="idBottomAreaContainerSeparatorOv"></div> 
                <div id="idEditContainer">
                    <img src="" alt="waste">
                    <span>Edit</span>
                </div>
            </div>
        </div>
    </section>`    
}