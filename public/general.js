var nameOfCountry;
var path;
var counter = 0;
var onMouse;
var images = [];
var id;
function init(name, numberOfCountry) {
    id = numberOfCountry;
    path = "lessons/" + name + "/";
    nameOfCountry = name;
    $(document).ready(function () {
        setAllInfoAboutCountry(images);
    });
    manageCanvas(images);
}
function slides() {
    window.location.href = "http://localhost:4567/index.html?id=" + id + "&done=false";
}

function makeDone() {
    var cookie = document.cookie;
    document.cookie  = cookie  + id + ",";
    window.location.href = "http://localhost:4567/index.html?id=" + id + "&done=true";
}
function general() {
    $("#myModalGeneral").modal('show');
}

function setAllInfoAboutCountry(images) {
    setAll(images);
    setGeneralInformation();
    setGeneralInformationTable();
    setInfo(images);
}
function setGeneralInformationTable() {
    $.ajax({
        url: path + "general/table.txt",
        dataType: "text",
        success: function (data) {
            var info = data.split('\r\n');
            for (var i = 0; i < info.length; i++) {
                var split = info[i].split('-');
                $("#tableInfo").append('<tr><td>' + split[0] + '</td><td>' + split[1] + '</td></tr>');
            }
        }
    });
}
function setGeneralInformation() {
    $.ajax({
        url: path + "general/info.txt",
        dataType: "text",
        success: function (data) {
            $("#infoGeneral").text(data);
            $("#flag").attr('src', path + 'general/flag.png');
            $("#arms").attr('src', path + 'general/arms.png');
        }
    });
}

function setInfo(images) {
    $.ajax({
        url: path + "info.txt",
        dataType: "text",
        success: function (data) {
            var info = data.split('\r\n');
            for (var i = 0; i < images.length; i++) {
                images[i].info = info[i];
            }
        }
    });

    $.ajax({
        url: path + "desc.txt",
        dataType: "text",
        success: function (data) {
            var description = data.split('\r\n');
            for (var i = 0; i < images.length; i++) {
                var split = description[i].split(';');
                images[i].desc1 = split[0];
                images[i].desc2 = split[1];
            }
        }
    });

}

function setAll(images) {
    $.ajax({
        url: path + "places.txt",
        dataType: "text",
        success: function (data) {
            var dataCountries = data.split('\r\n');
            dataCountries.forEach(function (data) {
                $("#listOfPlaces").append('<a id=' + data + ' href="#" class="list-group-item">' + data + '</a>');
                var canvas = document.createElement("canvas");
                var context = canvas.getContext("2d");
                var img = new Image();
                img.src = path + data + '.png';
                canvas.height = img.height;
                canvas.width = img.width;
                context.drawImage(img, 0, 0, img.width, img.height);
                context.fill();
                context.stroke();
                images.push({
                    context: canvas.getContext("2d"),
                    name: data,
                    info: "",
                    desc1: "",
                    desc2: ""

                });

            });
        }
    });
}

function setCanvas(canvas) {

    var context = canvas.getContext("2d");
    var img = new Image();
    img.src = path + nameOfCountry + "-slides.png";
    canvas.height = img.height;
    canvas.width = img.width;
    context.drawImage(img, 0, 0, img.width, img.height);
    context.fill();
    context.stroke();
}

function setDescription(onMouse) {
    $("#myModal").modal('show');
    $("#placeId").text(onMouse[0].name);
    $("#info").text(onMouse[0].info);
    $("#img1").attr('src', 'http://localhost:4567/' + path + onMouse[0].name + '/1.jpg');
    $("#desc1").text(onMouse[0].desc1);
    $("#img2").attr('src', 'http://localhost:4567/' + path + onMouse[0].name + '/2.jpg');
    $("#desc2").text(onMouse[0].desc2);
    $("#" + onMouse[0].name).removeClass().addClass("list-group-item list-group-item-success");
}

function manageCanvas(images) {
    var canvas = document.getElementById('myCanvas');
    setCanvas(canvas);

    $('#myCanvas').mousemove(function (event) {
        var canvasMouseX = event.clientX - (canvas.offsetLeft - window.pageXOffset);
        var canvasMouseY = event.clientY - (canvas.offsetTop - window.pageYOffset);

        onMouse = images.filter(function (data) {
            return data.context.getImageData(canvasMouseX, canvasMouseY, 1, 1).data[3] !== 0;
        });

    });
    $('#myCanvas').mousedown(function (event) {
        if (onMouse[0].name !== undefined) {
            if (++counter === images.length) {
                $("#tests").removeClass().addClass("btn btn-primary");
            }
            setDescription(onMouse);
        }
    });
}