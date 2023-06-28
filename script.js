

// kiểm tra sự tồn tại của tài khoản 
function checkExistingUser(username) {
  var users = JSON.parse(localStorage.getItem('users'));
  if (users) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        alert('Tài khoản đã tồn tại!');
        return false;
      }
    }
  }
  return true;
}

// Register
function register() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  
  // Kiểm tra xác nhận mật khẩu
  if (password !== confirmPassword) {
    alert('Password and Confirm Password must match!');
    return;
  }
  
  // Kiểm tra xem tài khoản đã tồn tại hay chưa
  if (!checkExistingUser(username)) {
    return;
  }
  
  var user = {
    username: username,
    password: password
  };
  
  var users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful!');
  goToLogin();
}


// Token
var isLogin =false;
isLogin= !!localStorage.getItem("token");

function checkLogin() {
  if (isLogin) {
    window.location.href = 'index.html';
  }
}

// Login
function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  var users = JSON.parse(localStorage.getItem('users'));
  
  // Tìm kiếm tài khoản trong danh sách
  var user = users.find(function(u) {
    return u.username === username && u.password === password;
  });
  
  if (user) {
    localStorage.setItem("token", username);
    isLogin = true;
    alert('Đăng nhập thành công!');
    
    window.location.href = 'index.html';
  } else {
    alert('Sai mật khẩu hoặc tài khoản!');
  }
}


function displayWelcomeMessage() {
  var token = localStorage.getItem("token");
  
  if (token) {
    var users = JSON.parse(localStorage.getItem('users'));
    
    var user = users.find(function(u) {
      return u.username === token;
    });
    
    if (user) {
      document.getElementById('welcomeMessage').textContent = 'Welcome, ' + user.username + '!';
    } else {
      document.getElementById('welcomeMessage').textContent = 'Welcome!';
    }
  } else {
    window.location.href = 'login.html';
  }
}

// Hàm xử lý đăng xuất
function logout() {
  localStorage.removeItem("token");
  window.location.href = 'login.html';
}


function goToRegister() {
  window.location.href = 'register.html';
}

function goToLogin() {
  window.location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", function() {
  var registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
      event.preventDefault();
      register();
    });
  }
  
  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      login();
    });
  }
});
