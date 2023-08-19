const content = document.getElementById('content')
const mql = window.matchMedia("(max-width: 750px)");

checkScreen()


mql.onchange = (e) => {
    if (e.matches) {
      /* the viewport is 750 pixels wide or less */
      content.innerHTML= addTaskMobileTemplate();
    } else {
      /* the viewport is more than 750 pixels wide */
      content.innerHTML= addTaskDektopTemplate();
    }
    loadContacts()
  }

  function checkScreen(){
    const big = window.matchMedia("(min-width: 750px)").matches
    const small = window.matchMedia("(max-width: 750px)").matches

    if (big) {
        content.innerHTML = addTaskDektopTemplate();
    } else if(small) {
        content.innerHTML = addTaskMobileTemplate()
    }

    loadContacts()
}


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

function addTaskDektopTemplate(){
    return `<div id="content" class="content">
    <h1><b>Add Task</b></h1>
    <div class="addTaskDesktop">
        <form onsubmit="createTask();return false"></form>
        <div class="divLeft">

        <div class="gap8px_flexDirCol">
            <span>Title</span>
            <input class="inputdefault" id="inputTitle" type="text" placeholder="Enter a title" required>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Description</span>
            <textarea class="inputDescription" name="inputDescription" id="inputDescription" cols="30" rows="4"
                placeholder="Enter a Description" required></textarea>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Assigned To</span>
            <select class="inputdefault" name="assigned" id="inputAssignedTo" required>
                <option value="" disabled selected hidden>Select conntacts to assign</option>
            </select>
        </div>

    </div>

        <div class="divRight">

            <div class="gap8px_flexDirCol">
                <span>Due Date</span>
                <input class="inputdefault" id="inputDueDate" type="date" required>
            </div>

            <div class="gap8px_flexDirCol">
                <span>Prio</span>
                <div class="prioDiv">
                    <div id="urgent" onclick="highlight('urgent')" class="prioOption"><span>Urgent</span><img id="urgentIMG"
                            src="../assets/img/prio_urgent.svg" class="prioImg">
                    </div>
                    <div id="medium" onclick="highlight('medium')" class="prioOption"><span>Medium</span><img id="mediumIMG"
                            src="../assets/img/prio_medium.svg" class="prioImg">
                    </div>
                    <div id="low" onclick="highlight('low')" class="prioOption"><span>Low</span><img id="lowIMG"
                            src="../assets/img/prio_low.svg" class="prioImg"></div>
                </div>
            </div>

            <div class="gap8px_flexDirCol">
                <span>Category</span>
                <select class="inputdefault" name="category" id="inputCategory" required>
                    <option value="" disabled selected hidden>Select task category</option>
                    <option value="technicalTask">Technical Task</option>
                    <option value="userStory">User Story</option>
                </select>
            </div>

        </div>
        </form>
    </div>
    <div class="buttonDiv">
        <button class="taskButton">Create Task <img src="../assets/img/check.svg"></button>
    </div>
</div>`
}