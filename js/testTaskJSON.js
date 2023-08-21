let taskJson = [
    {
        "taskId": "1",
        "taskType": "User Story",
        "dueDate": "31.10.2023",
        "status": "inProgress",
        "headline": "Test 1",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 0,
        "sbuTaskTotal": 2,
        "member": [
            "Alex Solms",
            "Frida Moll",
            "Gerid Raht"
        ],
        "urgency": "urgent"
    },
    {
        "taskId": "2",
        "taskType": "User Story",
        "dueDate": "27.9.2023",
        "status": "toDo",
        "headline": "Test 2",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 1,
        "sbuTaskTotal": 3,
        "member": [
            "Zecki Guhl",
            "Wolf Wald",
            "Quenin Tarantino"
        ],
        "urgency": "medium"
    },
    {
        "taskId": "3",
        "taskType": "Technical Task",
        "dueDate": "8.9.2023",
        "status": "toDo",
        "headline": "Test 3",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 0,
        "sbuTaskTotal": 0,
        "member": [
            "Lukas Greig",
            "Nico Liebig"
        ],
        "urgency": "medium"
    },
    {
        "taskId": "4",
        "taskType": "Technical Task",
        "dueDate": "10.12.2023",
        "status": "awaitFeedback",
        "headline": "Test 4",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 1,
        "sbuTaskTotal": 1,
        "member": [
            "Lara Steak",
            "Anne Xi"
        ],
        "urgency": "low"
    },
    {
        "taskId": "5",
        "taskType": "Technical Task",
        "dueDate": "10.10.2023",
        "status": "toDo",
        "headline": "Test 5 mit ein wenig mehr Text, weil auch geschaut werden muss dass 2 Zeilen nicht überschritten werden.",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 0,
        "sbuTaskTotal": 2,
        "member": [
            "Kurt Nies",
            "Candy Noor",
            "Frank Loh"
        ],
        "urgency": "low"
    },
    {
        "taskId": "6",
        "taskType": "Technical Task",
        "dueDate": "10.11.2023",
        "status": "toDo",
        "headline": "Test 6 mit ein wenig mehr Text.",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 1,
        "sbuTaskTotal": 1,
        "member": [
            "Lisbeth Kummer",
            "Olli Hopfen"
        ],
        "urgency": "urgent"
    }
]

let contactJson = {
    "kummer@online.de": {
        "usrName": "Lisbeth Kummer",
        "bgColor": "aquamarine",
        "initials": "LK"
    },
    "hopfen@online.de": {
        "usrName": "Oliver Hopfen",
        "bgColor": "blue",
        "initials": "OH"
    },
    "loh@online.de": {
        "usrName": "Frank Loh",
        "bgColor": "green",
        "initials": "FL"
    }
}