let allTasks =[];
let allContacts =['Emmanuel Mauer', 'Marcel Bauer']
let currentPrio;

const content = document.getElementById('content')


function createTask(){
    let title = document.getElementById('inputTitle').value
    let description = document.getElementById('inputDescription').value
    let dueDate = document.getElementById('inputDueDate').value
    let category = document.getElementById('inputCategory').value
    let priority = currentPrio
    let priorityIMG = `../assets/img/prio_${currentPrio}.svg`

    let task={
        'title':title,
        'description':description,
        'dueDate':dueDate,
        'category':category,
        'priority':priority,
        'priorityIMG':priorityIMG
    }

    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}  

function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString)

    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];


    document.getElementById('overlayCategory').innerHTML= allTasks[i].category;
    document.getElementById('overlayTitle').innerHTML= allTasks[i].title;
    document.getElementById('overlayDescription').innerHTML= allTasks[i].description;
    document.getElementById('overlayDueDate').innerHTML= allTasks[i].dueDate;
    document.getElementById('overlayPrio').innerHTML= allTasks[i].priority;
    document.getElementById('overlayPrioIMG').src = allTasks[i].priorityIMG;    
    }
}

function loadContacts(){
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];

        document.getElementById('inputAssignedTo').innerHTML += `<option>${contact}</option>`
    }
    
}


function highlight(x){
    removeHighlight()
    setPrio(x)

    document.getElementById(x).classList.add(x)
    document.getElementById(x+'IMG').src = `../assets/img/prio_${x}_white.svg`
}

function setPrio(x){
    currentPrio = x;
    console.log(currentPrio)
}

function removeHighlight(){
    currentPrio = '';

    document.getElementById('urgent').classList.remove('urgent')
    document.getElementById('urgentIMG').src = `../assets/img/prio_urgent.svg`

    document.getElementById('medium').classList.remove('medium')
    document.getElementById('mediumIMG').src = `../assets/img/prio_medium.svg`

    document.getElementById('low').classList.remove('low')
    document.getElementById('lowIMG').src = `../assets/img/prio_low.svg`
}

function switchDektopMobileAddTask(){
    const big = window.matchMedia("(min-width: 750px)").matches
    const small = window.matchMedia("(max-width: 750px)").matches

    if (big) {
        content.innerHTML =''
    } else if(small) {
        addTaskMobileTemplate()
    }

}
switchDektopMobileAddTask()
window.addEventListener('resize',switchDektopMobileAddTask)


//window.onresize = switchDektopMobileAddTask;

function addTaskMobileTemplate(){
    return `<h1><b>Add Task</b></h1>
    <form onsubmit="createTask();return false">
        <div class="gap8px_flexDirCol">
            <span>Title</span>
            <input class="inputdefault" id="inputTitle" type="text" placeholder="Enter a title" required>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Description</span>
            <textarea class="inputDescription" name="inputDescription" id="inputDescription" cols="30"
                rows="4" placeholder="Enter a Description" required></textarea>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Prio</span>
            <div class="prioDiv">
                <div id="urgent" onclick="highlight('urgent')" class="prioOption"><span>Urgent</span><img
                        id="urgentIMG" src="../assets/img/prio_urgent.svg" class="prioImg">
                </div>
                <div id="medium" onclick="highlight('medium')" class="prioOption"><span>Medium</span><img
                        id="mediumIMG" src="../assets/img/prio_medium.svg" class="prioImg">
                </div>
                <div id="low" onclick="highlight('low')" class="prioOption"><span>Low</span><img id="lowIMG"
                        src="../assets/img/prio_low.svg" class="prioImg"></div>
            </div>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Due Date</span>
            <input class="inputdefault" id="inputDueDate" type="date" required>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Category</span>
            <select class="inputdefault" name="category" id="inputCategory" required>
                <option value="" disabled selected hidden>Select task category</option>
                <option value="technicalTask">Technical Task</option>
                <option value="userStory">User Story</option>
            </select>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Assigned To</span>
            <select class="inputdefault" name="assigned" id="inputAssignedTo" required>
                <option value="" disabled selected hidden>Select conntacts to assign</option>
            </select>
        </div>

        <div class="buttonDiv">
            <button class="taskButton">Create Task <img src="../assets/img/check.svg"></button>
        </div>
    </form>

    <div class="task_added_overlay">
        <span>Task added to board</span> <img src="../assets/img/task_added_to_board.svg">
    </div>`
}