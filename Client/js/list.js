$(function() {
    getAllTasks();
    taskOperationsListeners();
});

function getAllTasks() {
    $.ajax({
        url: 'https://',
        type: 'GET',
        success: function(rests) {
            recreateTaskTable(rests);
        }
    });
}

function recreateTaskTable(rests) {
    $("#task-list").empty();

    rests.forEach(rest => {
        if (rest.givOrReceive == 'getting') {             // if getting
            $('#task-list').append(
                '<tr class="get">' +
                '<th>' + rest.category + '</th>' +
                '<td>' + rest.givOrReceive + '</td>' +
                '<td>'  + rest.userName + '</td>' +
                '<td>' + rest.dayOfWeek + '</td></tr>'
            );
        }
        else {                                          // if giving
            $('#task-list').append(
                '<tr class="give">' +
                '<th>' + rest.category + '</th>' +
                '<td>' + rest.givOrReceive + '</td>' +
                '<td>'  + rest.userName + '</td>' +
                '<td>' + rest.dayOfWeek + '</td></tr>'
            );
        }
    });

    $("#restaurant-result").append('</ul>');
}
