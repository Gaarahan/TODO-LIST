// 增加或修改事件 saveBtn 触发
function pushInfo() {
  //获取填写的数据
  let inputTitle = document.getElementsByClassName("input-title")[0];
  let contentValue = document.getElementsByClassName("input-content")[0].value;
  if( !inputTitle.value ){
    alert("请至少填写待办事件的标题！");
    inputTitle.focus();
    return;
  }

  //获取当前的事件状态
  let checkBtn = inputTitle.parentElement.firstElementChild.firstElementChild;
  let checkStatus = checkBtn.checked?"complete":"active";

  //添加新条目
  if(adding === 1){
    let ajaxReq = {
      url : "./add",
      type : "post",
      contentType : "application/json;charset=utf-8",
      data : JSON.stringify({
        "title": inputTitle.value,
        "content" : contentValue,
        "status" : "active"
      }),
      success: function () {
        saveInfo();
      },
      fail : function () {
        alert("添加条目失败,请重试");
      }
    }; ajax(ajaxReq); }
  //修改条目
  else{
    //获取当前事件的下标
    let allThings = document.querySelectorAll(".single-thing");
    let curThing = inputTitle.parentElement.parentElement;
    let index = [].indexOf.call(allThings,curThing);

    let ajaxReq = {
      url : "./edit",
      type : "post",
      contentType : "application/json;charset=utf-8",
      data : JSON.stringify({
        "index" : index,
        "message" : {
          "title": inputTitle.value,
          "content" : contentValue,
          "status" : checkStatus
        }
      }),
      success: function () {
        saveInfo();
      },
      fail : function () {
        alert("修改条目失败,请重试");
      }
    };
    ajax(ajaxReq);
  }
}

//删除事件
function delInfo(cur) {
  //获取当前事件的下标
  let allThings = document.querySelectorAll(".single-thing");
  let curThing = cur.parentElement.parentElement;
  let index = [].indexOf.call(allThings,curThing);

  let ajaxReq = {
    url : "./del",
    type : "post",
    contentType : "application/json;charset=utf-8",
    data : JSON.stringify({
      "index" : index
    }),
    success: function () {
      del(cur);
    },
    fail : function () {
      alert("删除条目失败,请重试");
    }
  };
  ajax(ajaxReq);
}

//标记为完成或未完成
function checkInfo(cur) {
  //获取当前事件的下标
  let allThings = document.querySelectorAll(".single-thing");
  let curThing = cur.parentElement.parentElement.parentElement;
  let index = [].indexOf.call(allThings,curThing);

  let checked = cur.checked;

  let ajaxReq = {
    url : "./check",
    type : "post",
    contentType : "application/json;charset=utf-8",
    data : JSON.stringify({
      "index" : index,
      "checked" : checked
    }),
    success: function () {
      check(cur);
    },
    fail : function () {
      alert("标记条目失败,请重试");
    }
  };
  ajax(ajaxReq);
}

//对返回请求的处理
function saveInfo() {
  //获取值
  let btnSave = document.getElementsByClassName("btn-save")[0];
  let textTitle = btnSave.parentElement.previousElementSibling.children[1];
  let textContent = btnSave.previousElementSibling;
  let contentContain = btnSave.parentNode;

  divTitle.innerText = textTitle.value;
  textTitle.parentNode.replaceChild(divTitle,textTitle);
  divContent.innerText = textContent.value;
  contentContain.parentNode.replaceChild(divContent,contentContain);

  if(adding === 1) {
    adding = 0;
    showAll();
    changeCount();
  }

  editingCount = 0;
}

function del(cur) {
  let targetEle = cur.parentNode.parentNode;
  targetEle.parentElement.removeChild(targetEle);
  changeCount();
}

function check(cur) {
  let pattern = curPattern();
  let curTitle = cur.parentElement.nextElementSibling;
  //勾选
  if(cur.checked !== false){
    cur.setAttribute("checked","");
    curTitle.className = "td-title checked";
    changeCount();
    // 针对不同的状态做出不同的响应
    if(pattern ===  2)
      cur.parentElement.parentElement.parentElement.style.display = "none";
  }
  else{
    cur.removeAttribute("checked");
    curTitle.className = "td-title";
    changeCount();
    if(pattern ===  3)
      cur.parentElement.parentElement.parentElement.style.display = "none";
  }
}

function changeCount() {
  let leftCount = document.getElementById("title").firstElementChild;
  let allThings = document.querySelectorAll(".single-thing");
  let count = 0;
  allThings.forEach(function (item) {
    let checkStatus = item.getElementsByClassName("check-btn")[0].checked;
    if(!checkStatus)
      count ++;
  });

  if(count === 0)
    leftCount.innerText = "NO";
  else
    leftCount.innerText = count;
}
