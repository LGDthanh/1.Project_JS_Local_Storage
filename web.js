// Kiểm tra nội dung đã được điền chưa
function validateInput() {
  var formElement = document.querySelector(".form");
  var inputElement = formElement.querySelectorAll(".form-input");
  for (var i = 0; i < inputElement.length; i++) {
    if (inputElement[i].value === "") {
      inputElement[i].parentElement.querySelector(
        ".err-message"
      ).innerText = `Please enter ${inputElement[i].id}`;
    } else {
      inputElement[i].parentElement.querySelector(".err-message").innerText =
        "";
    }
  }
}
// Xoa chu trong input
function resetInput() {
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
}
// API Thêm
function addNew() {
  validateInput();
  var formElement = document.querySelector(".form");
  var errElement = formElement.querySelectorAll(".err-message");
  var arrErrorElement = [];
  for (let i = 0; i < errElement.length; i++) {
    arrErrorElement.push(errElement[i].innerText);
  }
  var checkErrorElement = arrErrorElement.every((value) => value === "");
  if (checkErrorElement) {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;

    var listStudent = JSON.parse(localStorage.getItem("list-student")) || [];
    listStudent.push({
      name: name,
      address: address,
    });
    localStorage.setItem("list-student", JSON.stringify(listStudent));
    getList();
    resetInput();
  }
}
// API Get
function getList() {
  var listStudent = localStorage.getItem("list-student")
    ? JSON.parse(localStorage.getItem("list-student"))
    : [];
  var tableStudent = `
            <tr>
                    <td>STT</td>
                    <td>Câu hỏi</td>
                    <td>Loại câu hỏi</td>
                    <td>Người thêm</td>
                    <td>Thời gian thêm</td>
                    <td>Người chỉnh sửa gần nhất</td>
                    <td>Thời gian sửa gần nhất</td>
                    <td>Trạng thái</td>
                    <td>Xem chi tiết</td>
                    <td>Chức Năng</td>
                </tr>`;
  listStudent.map((value, index) => {
    tableStudent += `<tr>
            <td>${index + 1}</td>
            <td>${value.name}</td>
            <td>${value.address}</td>
            <td>Người thêm</td>
            <td>Thời gian thêm</td>
            <td>Người chỉnh sửa gần nhất</td>
            <td>Thời gian sửa gần nhất</td>
            <td>Trạng thái</td>
            <td>Xem chi tiết</td>
            <td>
            <button onclick="updateItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})" >Delete</button>
            </td>
        </tr>`;
  });
  document.getElementById("tableContent").innerHTML = tableStudent;
}

// API Sửa
function updateItem(index) {
  var listStudent = localStorage.getItem("list-student")
    ? JSON.parse(localStorage.getItem("list-student"))
    : [];
  document.getElementById("name").value = listStudent[index].name;
  document.getElementById("address").value = listStudent[index].address;
  document.getElementById("index").value = index; // Hứng index

  document.getElementById("saveItem").style.display = "none";
  document.getElementById("updateInput").style.display = "inline-block";
}
function changeItem() {
  var listStudent = localStorage.getItem("list-student")
    ? JSON.parse(localStorage.getItem("list-student"))
    : [];
  var index = document.getElementById("index").value;
  listStudent[index] = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
  };
  localStorage.setItem("list-student", JSON.stringify(listStudent));

  document.getElementById("saveItem").style.display = "inline-block";
  document.getElementById("updateInput").style.display = "none";

  getList();
  resetInput();
  alert("Cập nhật thành công!");
}
// API Xóa
function deleteItem(index) {
  var listStudent = localStorage.getItem("list-student")
    ? JSON.parse(localStorage.getItem("list-student"))
    : [];
  if (confirm("Are you sure?")) {
    listStudent.splice(index, 1);
  }
  localStorage.setItem("list-student", JSON.stringify(listStudent));
  getList();
  alert("Đã xoá thành công!");
}
function goToIndex() {
  window.location.href = "index.html";
}
