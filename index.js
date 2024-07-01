const appsscript_URL = 'https://script.google.com/macros/s/AKfycbwMbUMLa_kpugi06QLE8v94Je8gXQky1efCHD_f_uMunuKi0U631NzLsmgJlIIK1BEZ/exec';

var a = getAllDatas();
document.querySelector("#test").innerHTML = a["people"];

function getAllDatas() {
    //alert("a")
    var respond = {};
    $.ajax(
      {
        type: "POST",
        url: appsscript_URL,
        async: false,
        data: {
          "order": "write",
          "content": "cafeteria",
          "user": "manager"
        },
        success: function(response) {
          //alert("success");
          respond = response;
          console.log(respond);
          //alert(response["titles"]);
          //입력 기능 활성화
          //완료됐을 때 하는 여러 행동
        },
        error: function(request, status, error) {
          console.log(error);
          alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
      }
    );
    return respond;
  }