// Kiểm tra nội dung đã được điền chưa
function validateInput(){
    var formElement = document.querySelector(".form")
    var inputElement = formElement.querySelectorAll(".form-input")
    for(var i=0;i<inputElement.length;i++){
        if(inputElement[i].value === "") {
            inputElement[i].parentElement.querySelector(".err-message").innerText = `Please enter ${inputElement[i].id}`
            }else{
                inputElement[i].parentElement.querySelector(".err-message").innerText = ""
            }
            }
        }
            // API Thêm
            function addNew(){
                validateInput()
                var formElement = document.querySelector(".form")
                var errElement = formElement.querySelectorAll(".err-message")
                var arrErrorElement = []
                for (let i = 0; i < errElement.length; i++) {
                    arrErrorElement.push(errElement[i].innerText)    
                }
                var checkErrorElement = arrErrorElement.every(value => value ==="")
                if(checkErrorElement){
                    var name = document.getElementById("name").value;
                    var address = document.getElementById("address").value;

                    var listStudent = JSON.parse(localStorage.getItem('list-student')) || []
                    listStudent.push({
                        name: name,
                        address: address
                    })
                    localStorage.setItem("list-student", JSON.stringify(listStudent))
                }
            }

        // API Sửa
        function updateItem(){
            alert("Đã cập nhật");
        }
        // API Xóa
        function deleteItem(){
            alert("Đã xoá thành công!");
        }
   