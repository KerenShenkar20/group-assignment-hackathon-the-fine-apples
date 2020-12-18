
function addUser(info) {
    $.ajax({
        url: `http://localhost:3000/api/restaurants`,
        type: 'POST',
        data: info,
        success: function(rest) {
            window.location.replace("//TODO: add here url");
        }
    });
}

function submit(){
    $("#submit").click(() =>{
        const info = {
            id: $("#idinput").val(),
            name: $("#nameinput").val(),
            email:$("#exampleInputEmail1").val(),
            password: $("#exampleInputPassword1").val(),
            Categoriestogive: $(".dayav").val(),

        }
    })
}

