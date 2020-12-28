$(function () {
    $.LoadingOverlay("show", {
        image : "",
        custom : $('.spinner').removeClass('hidden')
    });
    var hideOverLayCount = 1;
    $.ajax({
        url: 'http://localhost:8080/thao@gmail.com',
        dataType: 'json',
        method: 'GET',
        data: {},
        success: function (res) {
            hideOverLayCount -= 1;
            if (typeof res.data !== "undefined") {
                let info = Object.keys(res.data);
                for (let i in info) {
                    if (info[i] === 'birthday') {
                        $('.user-birthday').empty().text(moment(res.data.birthday).format("DD/MM/Y"));
                    } else if (info[i] === 'image') {
                        $('.user-avatar').attr('src', res.data.image);
                    } else {
                        $('.user-' + info[i]).empty().text(res.data[info[i]]);
                    }
                }
            } else {
                // loading from default json
                alert("em bị lỗi cmnr")
            }

            hideOverLay();
        },
        error: function (error) {
            // loading from default json
            alert("em bị lỗi cmnr")
        }
    });

    function hideOverLay() {
        if (hideOverLayCount === 0) {
            $.LoadingOverlay("hide");
        }
    }
});
