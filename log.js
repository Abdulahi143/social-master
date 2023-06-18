const username = document.querySelector('#username');
const password = document.querySelector('#password');
const btnLogin = document.querySelector('.btn-login');

const getUsersFromLocal = function() {
    let users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

const getUserInfoFromLocal = function() {
    let userInformation = localStorage.getItem('userInformation');
    return userInformation ? JSON.parse(userInformation) : null;
}

const userInformations = getUserInfoFromLocal();

if (userInformations) {
    window.location.href = '/';
}

btnLogin.addEventListener('click', function(event) {
    event.preventDefault();
 
    if (validateEmail(username.value) && password.value.length >= 8) {
        const user = getUsersFromLocal().find(function(user) {
            return user.email === username.value && user.password === password.value;
        });

        if (user) {
            const userInformation = {
                username: user.email,
                lastName: user.fullName.split(' ')[1]
            };

            localStorage.setItem('userInformation', JSON.stringify(userInformation));
            window.location.href = '/';
        } else {
            alert('User not registered. Please register before logging in.');
        }
    } else {
        showAlert('Invalid username or password.');
    }
});

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showAlert(message) {
    alert(message);
}
