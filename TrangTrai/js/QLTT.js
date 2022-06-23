var arrEleQLTT;
function loadDataQLTT() {
    $("#tblActQLTT tbody").empty();
    var strResultQLTT = "";
    $.ajax(
        {
            url: "https://62b47b4c530b26da4cbf9d4f.mockapi.io/QuanLyTrangTrai",
            type: "GET",
            dataType: "json",
            success: function (data) {
                arrEleQLTT = data;
                for (var i = 0; i < data.length; i++) {
                    strResultQLTT = strResultQLTT + "<tr>" +
                        "<td class='something' >" + data[i].id + "</td>" +
                        "<td>" + data[i].tenMuavu + "</td>" +
                        "<td>" + data[i].SLUT + "</td>" +
                        "<td>" + data[i].DVT + "</td>" +
                        "<td>" + data[i].ngayBatdau + "</td>" +
                        "<td>" + data[i].ngayThuhoach + "</td>" +
                        "<td>" + data[i].trangThai + "</td>" +
                        "<td>" +
                        '<img id="editIMGQLTT" class="actionIcon" src="img/download.png" onclick="editEQLTT(' + data[i].id + ')" alt="Edit" srcset=" ">' + 
                        '<img class="actionIcon" src="img/2496733.png" onclick="deleteEQLTT(' + data[i].id + ')" alt="Delete" srcset=" ">' +
                        "</td>" +
                        "</tr>";
                }
                console.log(strResultQLTT);
                $("#tblActQLTT tbody").append(strResultQLTT);
            }
        }
    );
}

$("#btnModalAddQLTT").click(function () {
    var data = {};
    data.tenMuavu = $("#tenMuavu").val();
    data.SLUT = $("#SLUT").val();
    data.DVT = $("#DVT").val();
    data.ngayBatdau = $("#ngayBatdau").val();
    data.ngayThuhoach = $("#ngayThuhoach").val();
    data.trangThai = $("#trangThai").val();

    if(data.tenMuavu == ''){
        alert("FAILED-01");
    }
    else if(data.SLUT == ''){
        alert("FAILED-02");
    }
    else{
        $.ajax({
            url: "https://62b47b4c530b26da4cbf9d4f.mockapi.io/QuanLyTrangTrai",
            type: "POST",
            data: data,
            success: function (result) {
                $("#form_myModalQLTT").css("display", "none");
                $("#tbody").empty();
                loadDataQLTT();
            }
        })
        console.log(data);
    }


});

//Delete Function
function deleteEQLTT(id) {
    $.ajax({
        url: "https://62b47b4c530b26da4cbf9d4f.mockapi.io/QuanLyTrangTrai/" + id,
        type: "DELETE",
        success: function (data) {
            console.log(data);
            loadDataQLTT();
        }
    })
}


//Edit Function
function editEQLTT(id){
    $("#form_myModalQLTTEdit").css("display", "block");
    for (var i = 0; i < arrEleQLTT.length; i++) {

        if (arrEleQLTT[i].id == id) {
            $("#txtId").val(arrEleQLTT[i].id);
            $("#tenMuavuEdit").val(arrEleQLTT[i].tenMuavu);
            $("#SLUTEdit").val(arrEleQLTT[i].SLUT);
            $("#DVTEdit").val(arrEleQLTT[i].DVT);
            $("#ngayBatdauEdit").val(arrEleQLTT[i].ngayBatdau);
            $("#ngayThuhoachEdit").val(arrEleQLTT[i].ngayThuhoach);
            $("#trangThaiEdit").val(arrEleQLTT[i].trangThai);
            break;
        }
    }
    loadDataQLTT();
}

$("#btnModalUpdateQLTTEdit").click(function(){
    var dataUpdate = {};
    dataUpdate.tenMuavu = $("#tenMuavuEdit").val();
    dataUpdate.SLUT = $("#SLUTEdit").val();
    dataUpdate.DVT = $("#DVTEdit").val();
    dataUpdate.ngayBatdau = $("#ngayBatdauEdit").val();
    dataUpdate.ngayThuhoach = $("#ngayThuhoachEdit").val();
    dataUpdate.trangThai = $("#trangThaiEdit").val();
    var id = $("#txtId").val();
    console.log(dataUpdate);

    $.ajax({
        url: "https://62b47b4c530b26da4cbf9d4f.mockapi.io/QuanLyTrangTrai/" + id,
        type: "PUT",
        data: dataUpdate,
        success: function () {
            //dong form
            $("#form_myModalQLTTEdit").css("display", "none");
            loadDataQLTT();
        }
    })
});