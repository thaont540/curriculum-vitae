$(function () {
    getUserId();
    getProfile();
    getExperience();
});

var baseUrl = "https://thaocv.herokuapp.com";
var id = "";

function getUserId() {
    let urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
}

function showOverLay(element) {
    $(element).LoadingOverlay("show", {
        image : "",
        custom : $('.spinner').removeClass('hidden')
    });
}
function hideOverLay(element) {
    $(element).LoadingOverlay("hide");
}

function getProfile() {
    showOverLay("#about");
    $.ajax({
        url: `${baseUrl}/profile/${id}`,
        dataType: 'json',
        method: 'GET',
        data: {},
        success: function (res) {
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

            hideOverLay("#about");
        },
        error: function (error) {
            // loading from default json
            hideOverLay("#about");
            alert("em bị lỗi cmnr")
        }
    });
}

function getExperience() {
    showOverLay("#experience");
    $.ajax({
        url: `${baseUrl}/experience/${id}`,
        dataType: 'json',
        method: 'GET',
        data: {},
        success: function (res) {
            if (typeof res.data !== "undefined" && res.data !== null) {
                for (let i = 0; i < res.data.length; i++) {
                    let card = `<div class="card">
                        <div class="row">
                            <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                                <div class="card-body cc-experience-header">
                                <p>${moment(res.data[i].start_date).format("DD/MM/Y")} - ${moment(res.data[i].end_date).format("DD/MM/Y")}</p>
                                    <div class="h5">${res.data[i].position}</div>
                                </div>
                            </div>
                            <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                                <div class="card-body">
                                    <div class="h5">${res.data[i].project}</div>
                                    <p><b>Description</b>: ${res.data[i].description}</p>
                                    <p><b>Technical</b>: ${res.data[i].technical}</p>
                                    <p><b>Team size</b>: ${res.data[i].team_size}</p>
                                    <p><b>Effort</b>: ${res.data[i].effort}</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $('.experience-content').append(card);
                }
            } else {
                // loading from default json
                alert("em bị lỗi cmnr")
            }

            hideOverLay("#experience");
        },
        error: function (error) {
            // loading from default json
            hideOverLay("#experience");
            alert("em bị lỗi cmnr")
        }
    });
}
