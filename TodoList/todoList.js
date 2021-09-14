// 本地存储一个key为todoList value为一个键值对数组,
// 数组内的键值对key为事项名 value为是否完成
// 输入事项按下回车后，如果本地存储为空，那么创建一个空数组
// 若不为空，则追加事项

//获取本地数据
function getData() {
  var data = localStorage.getItem("todoList");
  if (data != null) {
    return JSON.parse(data); //将字符串格式的数据转化为对象类型，此处为一个键值对数组
  } else {
    return [];
  }
}

//添加事务到local
function savaData(work) {
  localStorage.setItem("todoList", JSON.stringify(work));
}
function loadData() {
  var data = getData();
  $("ol,ul").empty();
  var todoCount = 0,
    donecount = 0;
  $.each(data, function (index, work) {
    if (!work.done) {
      $("ol").prepend(
        "<li><input type='checkbox'><p>" +
          work.title +
          "</p><a href='javascript:;' index=" +
          index +
          " ></a></li>"
      );
      todoCount++;
    } else {
      $("ul").prepend(
        "<li><input type='checkbox' checked = 'checked'><p>" +
          work.title +
          "</p><a href='javascript:;' index=" +
          index +
          " ></a></li>"
      );
      donecount++;
    }
  });
  $("#todocount").text(todoCount);
  $("#donecount").text(donecount);
}

//回车添加事件
$(".title").on("keydown", function (event) {
  if (event.keyCode === 13) {
    var localData = getData();
    localData.push({ title: $(this).val(), done: false });
    savaData(localData);
    loadData();
  }
});

//点击圆圈删除事件
$("ol,ul").on("click", "a", function () {
  var localData = getData();
  var index = $(this).attr("index");
  //   console.log(index);
  localData.splice(index, 1);
  savaData(localData);
  loadData();
});

//点击复选框完成事件
$("ol,ul").on("click", "input", function () {
  var localData = getData();
  var index = $(this).siblings("a").attr("index");
  //   console.log($(this).prop("checked"));
  localData[index].done = $(this).prop("checked") === true ? true : false;
  //   $(this).prop("disabled") = "disabled";
  savaData(localData);
  loadData();
});

loadData();
