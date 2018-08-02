let divTitle;
let divContent;
let editingCount = 0;
let adding = 0;


function curPattern() {
  let patterns = document.getElementById("contain-head");

  for(let i = 1; i < 4; i ++ ){
    let curStatu = patterns.children[i].className;
    if(curStatu.indexOf("btn-selected") >= 0)
      return i;
  }
  return -1;
}

function showContent(cur) {
  let contentsShow = cur.parentNode.parentNode.children[1];
  let allContents = document.getElementsByClassName('td-content');
  if(contentsShow.style.display === ""){
    for(let i = 0; i < allContents.length;i++)
      allContents[i].style.display = "";
    contentsShow.style.display = "block";
  }
  else
    contentsShow.style.display = "";
}

function editPretect() {
  if(editingCount ===1){
    alert("还有正在编辑的待办");
    document.getElementsByClassName("input-title")[0].focus();
    return false;
  }
  return true;
}

function editing(cur) {
  if( !editPretect() )
    return;

  editingCount = 1;
  divTitle = cur.parentNode.getElementsByClassName("td-title")[0];
  divContent = cur.parentElement.parentElement
      .getElementsByClassName("td-content")[0];

  // 展示内容
  divContent.style.display = "block";
  // 替换为编辑状态
  let inputTitle = document.createElement("input");
  inputTitle.className = "input-title";
  cur.parentNode.replaceChild(inputTitle,divTitle);
  let contentContain = document.createElement("div");
  let inputContent = document.createElement("textarea");
  let saveBtn = document.createElement("input");
  // 为元素添加内容
  contentContain.className = "content-contain";
  inputContent.className = "input-content";
  saveBtn.className = "btn-save";
  saveBtn.type = "button";
  saveBtn.value = "Save";
  saveBtn.onclick = pushInfo;

  //处理添加时的内容
  if(adding === 1){
    inputTitle.setAttribute("placeholder","write something ..");
    inputContent.setAttribute("placeholder","write details ..");
  }
  else{
    inputTitle.value = divTitle.innerText.trim();
    inputContent.value = divContent.innerText.trim();
  }

  // 组合元素
  contentContain.appendChild(inputContent);
  contentContain.appendChild(saveBtn);
  cur.parentNode.parentNode.replaceChild(contentContain,divContent);
  document.getElementsByClassName("input-title")[0].focus();
}

function addThing() {
  if( !editPretect() )
    return;

  // 关闭其他标签
  let allContents = document.getElementsByClassName('td-content');
  for(let i = 0; i < allContents.length;i++)
    allContents[i].style.display = "";

  let headBtns = document.getElementById("contain-head").children;
  for(let i = 0; i < headBtns.length;i++)
    headBtns[i].className = ""
  headBtns[0].className = "btn-selected";

  let templateNode = document.getElementsByClassName("template")[0];

  let thingsList = document.querySelector("#things-list");
  let addNode = templateNode.cloneNode(true);
  addNode.className = "single-thing";
  addNode.children[0].children[0].children[0].checked = false;

  let btnEdit = addNode.children[0].children[3];
  thingsList.insertBefore(addNode,thingsList.firstChild);
  adding = 1;
  editing(btnEdit);
}

function showActive() {
  if(adding === 1) return 0;
  let things = document.getElementsByClassName("single-thing");
  for(let i =0; i < things.length;i ++){
    things[i].style.display = "block";
    if(things[i].getElementsByClassName("check-btn")[0].hasAttribute("checked"))
      things[i].style.display = "none";
  }

  let headBtns = document.getElementById("contain-head").children;
  for(let i = 0; i < headBtns.length;i++)
    headBtns[i].className = ""
  headBtns[2].className = "btn-selected";

  return 1;
}

function showAll() {
  if(adding === 1) return 0;

  let headBtns = document.getElementById("contain-head").children;
  for(let i = 0; i < headBtns.length;i++)
    headBtns[i].className = ""
  headBtns[1].className = "btn-selected";

  let things = document.getElementsByClassName("single-thing");
  for(let i =0; i < things.length;i ++){
    things[i].style.display = "block";
  }

  return 1;
}

function showComplete() {
  if(adding === 1) return 0;

  let things = document.getElementsByClassName("single-thing");
  for(let i =0; i < things.length;i ++){
    things[i].style.display = "block";
    if(!things[i].getElementsByClassName("check-btn")[0].hasAttribute("checked"))
      things[i].style.display = "none";
  }

  let headBtns = document.getElementById("contain-head").children;
  for(let i = 0; i < headBtns.length;i++)
    headBtns[i].className = ""
  headBtns[3].className = "btn-selected";

  return 1;
}

