const fullName = document.querySelector('#fullname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm = document.querySelector('#confirm');
const btnRegister = document.querySelector('.btn-register');

// Get users from local storage
const getUsersFromLocal = function(){
    let users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Get user information
const getUserInfoFromLocal = function(){
    let userInformation = localStorage.getItem('userInformation');
    return userInformation ? JSON.parse(userInformation) : null;
}

const userInformation = getUserInfoFromLocal();

if(userInformation){
    window.location.href = '/';
}

const addUsersToLocal = function(data){
    const users = getUsersFromLocal();
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
}

btnRegister.addEventListener('click', function(event){
    event.preventDefault();

    if (fullName.value && email.value && password.value && confirm.value && password.value === confirm.value) {
        const registrationData = {
            fullName: fullName.value,
            email: email.value,
            password: password.value
        };

        const userInfo = {
            username: email.value,
            lastName: fullName.value.split(' ')[1]
        };

        addUsersToLocal(registrationData);
        localStorage.setItem('userInformation', JSON.stringify(userInfo));
        window.location.href = '/';
    } else {
        console.log('Invalid registration data');
    }
});

/*const addUsersToLocal = function(data){
    const users = getUsersFromLocal();
    const existingUser = users.find(user => user.email === data.email);

    if (existingUser) {
        console.log('User already exists');
    } else {
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User added successfully');
    }
}*/