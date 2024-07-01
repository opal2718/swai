const appsscript_URL = 'https://script.google.com/macros/s/AKfycbxjghPXpP0Vi9xWVE-6l-mKe4pKd_T994V7sjJ4fn8G_UUMo_0HaWIOsJbd8gBI71-A/exec';

let myPos = 0;
var a = getAllDatas({
  "order": "read",
  "content": "cafeteria",
});
document.querySelector("#waiting").innerHTML = parseInt(a["people"])-+parseInt(a["entered"]);
console.log(a);
let browserUserName = localStorage.getItem("userName");
if(browserUserName != null){
  document.querySelector("#username").value = browserUserName;
  myPos = getAllDatas({"order": "write", "content": "cafeteria", "user": browserUserName})["people"]-1;
  document.querySelector("#myWait").innerHTML =  parseInt(myPos)-parseInt(a["entered"]);
}
else{
  document.querySelector("#myWait").innerHTML = "(등록 안 함)";

}



function getAllDatas(order) {
    const buttons = document.querySelectorAll(".submitbutton");
    //alert("a")
    if(order["user"] == "guessWho"){
      order["user"] = document.querySelector("#username").value;
      console.log("a"+order["user"]);
      localStorage.setItem("userName", order["user"]);
    }
    var respond = {};
    $.ajax(
      {
        type: "POST",
        url: appsscript_URL,
        async: false,
        data: order,
        success: function(response) {
          //alert("success");
          respond = response;
          console.log(respond);
          //alert(response["titles"]);
          //입력 기능 활성화
          //완료됐을 때 하는 여러 행동
          if(order["content"] == "reset"){
            location.reload();
          }
          else if(order["content"] == "enter"){
            var a = getAllDatas({
              "order": "read",
              "content": "cafeteria",
            });
            document.querySelector("#waiting").innerHTML = parseInt(a["people"])-parseInt(a["entered"]);
            console.log(a);
            let browserUserName = localStorage.getItem("userName");
            if(browserUserName != null){
              document.querySelector("#username").value = browserUserName;
              myPos = getAllDatas({"order": "write", "content": "cafeteria", "user": browserUserName})["people"]-1;
              document.querySelector("#myWait").innerHTML =  parseInt(myPos)-parseInt(a["entered"]);
            }
            else{
              document.querySelector("#myWait").innerHTML = "(등록 안 함)";
            
            }
            location.reload();
          }
        },
        error: function(request, status, error) {
          console.log(error);
          alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
      }
    );
    return respond;
  }