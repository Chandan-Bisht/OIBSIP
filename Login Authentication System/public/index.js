const password = document.querySelector("#password");
const icon = document.querySelector(".icon");

function show() {
  if (password.type === "password") {
    password.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    password.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");

  if(loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
  
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if(response.ok) {
          window.location.href = '/secured';
        } else {
          const data = await response.json();
          document.querySelector("#loginError").innerText = data.error || "Login Failed"
        }
      } catch (error) {
        console.error('Error during login: ', error);
      }
    })
  }

  if(registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if(response.ok) {
          window.location.href = '/';
        } else {
          const data = await response.json();
          document.querySelector('#registerError').innerText = data.error || 'Registration Failed'
        }
      } catch (error) {
        console.error('Error during registration: ', error)
      }
    })
  }

  window.logout = async function () {
    try {
      await fetch('/logout', {
        method: 'POST',
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  }
})