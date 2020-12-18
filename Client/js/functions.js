
function addUser(info) {
    $.ajax({
        url: ``,
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
            availabalDay: $(".dayav").val(),
            daysHelpedWIth: $("").val()
        }
    })
}

