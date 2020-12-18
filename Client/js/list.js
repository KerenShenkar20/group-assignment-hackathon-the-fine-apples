$(function() {
    getAllTasks();
    taskOperationsListeners();
});

function getAllTasks() {
    $.ajax({
        url: 'https://',
        type: 'GET',
        success: function(tasks) {
            recreateTaskTable(tasks);
        }
    });
}

function recreateTaskTable(tasks) {
    $("#task-list").empty();

    tasks.forEach(task => {
        if (task.givOrReceive == 'getting') {             // if getting
            $('#task-list').append(
                '<tr class="get">' +
                '<th>' + task.category + '</th>' +
                '<td>' + task.givOrReceive + '</td>' +
                '<td>' + task.userName + '</td>' +
                '<td>' + task.dayOfWeek + '</td></tr>'
            );
        }
        else {                                          // if giving
            $('#task-list').append(
                '<tr class="give">'     +
                '<th>' + task.category  + '</th>' +
                '<td>' + task.givOrReceive + '</td>' +
                '<td>' + task.userName  + '</td>' +
                '<td>' + task.dayOfWeek + '</td></tr>'
            );
        }
    });
}
