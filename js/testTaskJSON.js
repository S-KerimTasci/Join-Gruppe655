let taskJson2 = [
    {
        "taskId": "1",
        "taskType": "User Story",
        "dueDate": 1695247200000, /* 21.Sep.23 */
        "status": "inProgress", /*toDo inProgress awaitFeedback done*/
        "headline": "Test 1",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 1,
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
        "dueDate": 1697839200000, /* 21.Oct.23 */
        "status": "toDo", /*toDo inProgress awaitFeedback done*/
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
        "dueDate": 1694124000000, /* 8.Sep.23 */
        "status": "toDo", /*toDo inProgress awaitFeedback done*/
        "headline": "WasPassiertWennIchDieMaximaleZeilenbreiteÜber",
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
        "dueDate": 1702162800000, /* 10.Dec.23 */
        "status": "awaitFeedback", /*toDo inProgress awaitFeedback done*/
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
        "dueDate": 1696888800000, /* 10.10.23 */
        "status": "toDo", /*toDo inProgress awaitFeedback done*/
        "headline": "Test 5 mit ein wenig mehr Text",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 2,
        "sbuTaskTotal": 5,
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
        "dueDate": 1699570800000, /* 10.Nov.23 */
        "status": "toDo", /*toDo inProgress awaitFeedback done*/
        "headline": "Test 6 mit ein wenig mehr Text.",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 1,
        "sbuTaskTotal": 1,
        "member": [
            "Lisbeth Kummer",
            "Olli Hopfen"
        ],
        "urgency": "urgent"
    },
    {
        "taskId": "7",
        "taskType": "User Story",
        "dueDate": 1699580800000, /* 9.Sep.23 */
        "status": "done", /*toDo inProgress awaitFeedback done*/
        "headline": "Test 7",
        "description": "Some text which should describe the task. The first two lines should be visible and the rest should be replaced by ...",
        "doneSubTasks": 0,
        "sbuTaskTotal": 0,
        "member": [
            "Fred Kasten",
            "Arun Kliet"
        ],
        "urgency": "urgent"
    }
]

let contactJson2 = {
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

let loginJson2 = {
    "kummer@online.de": {
        "usrName": "Lisbeth Kummer",
        "password": "aquamarine"
    },
    "hopfen@online.de": {
        "usrName": "Oliver Hopfen",
        "password": "blue"
    },
    "loh@online.de": {
        "usrName": "Frank Loh",
        "password": "green"
    }
}