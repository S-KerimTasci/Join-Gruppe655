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
        "subTaskText": [
            "Text 1",
            "Text 2"
        ],
        "member": [
             "Olli Hopfen",
             "Frank Samstag",
             "Lisbeth Kummer"
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
        "subTaskText": [
            "Text 1",
            "Text 2",
            "Text 3"
        ],
        "member": [
             "Frank Loh",
             "Wolf Wald",
             "jan test"
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
        "subTaskText": [
        ],
        "member": [
             "Frank Loh",
             "Wolf Wald" 
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
        "subTaskText": [
            "Text 1"
        ],
        "member": [
            "Frank Samstag",
            "ralf humpelbein"
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
        "subTaskText": [
            "Text 1",
            "Text 2",
            "Text 3",
            "Text 4",
            "Text 5"
        ],
        "member": [
            "jan test",
            "Olli Hopfen",
            "Arun Kliet"
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
        "subTaskText": [
            "Text 1"
        ],
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
        "subTaskText": [
        ],
        "member": [
            "Fred Kasten",
            "Arun Kliet"
        ],
        "urgency": "urgent"
    }
]

let contactJson2 = [
    {
        "email": "jan@web.de",
        "initials": "JT",
        "name": "jan test",
        "bgColor": "#FF7A00"
    },
    {
        "email": "kummer@online.de",
        "initials": "LK",
        "name": "Lisbeth Kummer",
        "bgColor": "#FF5EB3"
    },
    {
        "email": "wald@online.de",
        "initials": "WW",
        "name": "Wolf Wald",
        "bgColor": "#6E52FF"
    },
    {
        "email": "loh@online.de",
        "initials": "FL",
        "name": "Frank Loh",
        "bgColor": "#9327FF"
    },
    {
        "email": "samstag@week.de",
        "initials": "FS",
        "name": "Frank Samstag",
        "bgColor": "#00BEE8"
    },
    {
        "email": "humpi@bla.fr",
        "initials": "RH",
        "name": "ralf humpelbein",
        "bgColor": "#1FD7C1"
    },
    {
        "email": "kasten@bla.fr",
        "initials": "FK",
        "name": "Fred Kasten",
        "bgColor": "#FF745E"
    },
    {
        "email": "kliet@bla.fr",
        "initials": "AK",
        "name": "Arun Kliet",
        "bgColor": "#FFA35E"
    },
    {
        "email": "hopfen@bla.fr",
        "initials": "OH",
        "name": "Olli Hopfen",
        "bgColor": "#FC71FF"      
    }
]

let loginJson2 = [
    {
        "email": "jan@web.de",
        "initials": "JT",
        "name": "jan test",
        "password": "234"
    },
    {
        "email": "kummer@online.de",
        "initials": "LK",
        "name": "Lisbeth Kummer",
        "password": "aquamarine"
    },
    {
        "email": "hopfen@online.de",
        "initials": "OH",
        "name": "Oliver Hopfen",
        "password": "blue"
    },
    {
        "email": "loh@online.de",
        "initials": "FL",
        "name": "Frank Loh",
        "password": "green"
    },
    {
        "email": "samstag@week.de",
        "initials": "FS",
        "name": "Frank Samstag",
        "password": "12345"
    },
    {
        "email": "humpi@bla.fr",
        "initials": "RH",
        "name": "ralf humpelbein",
        "password": "54321"
    },
    {
        "email": "kasten@bla.fr",
        "initials": "FK",
        "name": "Fred Kasten",
        "password": "54321"
    },
    {
        "email": "kliet@bla.fr",
        "initials": "AK",
        "name": "Arun Kliet",
        "password": "54321"
    },
    {
        "email": "hopfen@bla.fr",
        "initials": "OH",
        "name": "Olli Hopfen",
        "password": "54321"
    }
]