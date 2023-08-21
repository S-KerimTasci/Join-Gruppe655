//shows welcome screen
document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("idWelcome");
    if (window.innerWidth <= 960) {
        welcomeMessage.classList.remove('d-none');
        welcomeMessage.classList.add('welcome');
        setTimeout(() => {
            welcomeMessage.classList.add('d-none');
            welcomeMessage.classList.remove('welcome');
        }, 2000);
    }
});

/**
 * This function returns from an object(array) a count of all emements which contains a specific value
 * 
 * 
 * @param {string} srcValue - lookup value
 * @param {string} compValue - variable where the value for comparison is stored in array
 * @param {string} chkArr - array which should checked
 * @returns count
 */
function countTasks(srcValue,compValue, chkArr) {
    let count = 0;
    for (let i = 0; i < chkArr.length; i++) {
        if (srcValue == chkArr[i][compValue]) {
            count++; 
        }        
    }
    return count
}

/**
 * this function adds the counts of each tasktype to summary
 * 
 */
function addNumToSummary() {
    document.getElementById('idCountAllTasks').innerText = taskJson.length;
    document.getElementById('idCountTasksInProgress').innerText = countTasks('inProgress','status', taskJson);
    document.getElementById('idCounttaskAwaitingFeedback').innerText = countTasks('awaitFeedback','status', taskJson);
    document.getElementById('idTaskUrgent').innerText = countTasks('urgent','urgency', taskJson);
    document.getElementById('idTaskToDd').innerText = countTasks('toDo','status', taskJson);
    document.getElementById('idTaskDone').innerText = countTasks('done','status', taskJson);   
}


function upcommingDeadline(mydate) {
    console.log(new Date().getTime())
    document.getElementById('idCountAllTasks').innerText = mydate;
    
}
