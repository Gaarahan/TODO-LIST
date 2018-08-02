function ajax(options) {
  const xhr = new XMLHttpRequest();

  // 处理数据
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  let params = formatParams(options.data);

  //接收 - 第三步
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success(xhr.responseText, xhr.responseXML);
      }
      else {
        options.fail(status);
      }
    }
  };

  //连接 和 发送 - 第二步
  if (options.type === "GET") {
    // 参数 ： 请求类型  请求路径  同步还是异步（true 异步 ，false同步）
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  }
  else if (options.type === "POST") {
    xhr.open("POST", options.url, true);
    //设置表单提交时的内容类型
    xhr.setRequestHeader("Content-Type",options.contentType);
    xhr.send(options.data);
  }
}
//格式化参数
function formatParams(data) {
  const arr = [];
  for (let name in data) {
    if(data.hasOwnProperty(name))
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  //为url添加一个唯一id
  arr.push(("t=" + Math.random()).replace(".", ""));
  return arr.join("&");
}
