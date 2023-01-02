let todoItems = [];
let updateId;
function fetchTodos() {
    $.ajax({
        type: 'GET',
        data: { data: 1 },
        url: "read.php",
        success: function (data) {
            todoItems = JSON.parse(data);
            displayTodos();
        }
    });
}
$(document).ready(function () {
    fetchTodos();
    $('#todoAdd').click(function (e) {
        if ($('#todo').val() != "") {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                data: { data: $('#todo').val() },
                url: "create.php",
                success: function (data) {
                    fetchTodos();
                    $('#todo').val("");
                }
            });
        }
        else
            alert("Please fill the Todo");
    });
    $('#updateBtn').click(function (e) {
        if ($('#todo').val() != "") {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                data: { todoId: updateId, data: $('#todo').val() },
                url: "update.php",
                success: function (data) {
                    console.log("updated");
                    $('#todoAdd').removeClass('d-none');
                    $('#updateBtn').addClass('d-none');
                    fetchTodos();
                    $('#todo').val("");
                }
            });
        }
        else
            alert("Please fill the todo");
    });
})
function displayTodos() {
    $('#myTodos').empty();
    todoItems.map((item, key) => {
        document.getElementById('myTodos').innerHTML += `
        <div class="row todoItem rounded p-2" >
        <div class="col-lg-8 col-sm-6">
            <p class="text-center text-truncate" onclick="changeAction(!${item.todoAction},${item.todoId})" id="todoText${key}">${item.todoItem}</p>
        </div>
        <div class="col-lg-4 col-sm-6 d-flex justify-content-center">
            <button class="btn btn-primary m-1 editBtn${key}" onclick="editTodo(${parseInt(item.todoId)})"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger m-1" onclick="deleteTodo(${item.todoId})"><i class="bi bi-trash-fill"></i></button>
        </div>
    </div>
        `;
        if (item.todoAction == 1) {
            $("#todoText" + key).css("text-decoration", "line-through");
            $(".editBtn" + key).attr('disabled', true);
        }
        else {
            $("#todoText" + key).css("text-decoration", "none");
            $(".editBtn" + key).removeAttr('disabled');
        }
    });

}
function changeAction(actionKey, todoId) {
    $.ajax({
        type: 'POST',
        data: { todoId: todoId, actionKey: actionKey },
        url: "action.php",
        success: function (data) {
            fetchTodos();
        }
    });
}
function editTodo(todoId) {
    $.ajax({
        type: 'GET',
        data: { todoId: todoId },
        url: "update.php",
        success: function (data) {
            $('#todo').val(data);
            $('#todoAdd').addClass('d-none');
            $('#updateBtn').removeClass('d-none');
            $(window).scrollTop(0);
            updateId = todoId;
        }
    });
}

function deleteTodo(todoId) {
    $.ajax({
        type: 'POST',
        data: { todoId: todoId },
        url: "delete.php",
        success: function (data) {
            fetchTodos();
        }
    });
}