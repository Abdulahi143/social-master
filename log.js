const username = document.querySelector('#username');
const password = document.querySelector('#password');
const btnLogin = document.querySelector('.btn-login');

const getUsersFromLocal = function(){
    let users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

const getUserInfoFromLocal = function(){
    let userInformation = localStorage.getItem('userInformation');
    return userInformation ? JSON.parse(userInformation) : null;
}

const userInformations = getUserInfoFromLocal();

if(userInformations){
    window.location.href = '/';
}

btnLogin.addEventListener('click', function(event){
    event.preventDefault();

    if(username.value.length > 0 && password.value.length > 0 && username.value !== null && password.value !== null){
        const user = getUsersFromLocal().find(function(user){
            return user.email === username.value && user.password === password.value;
        });
        
        if(user){
            const userInformation = {
                username: user.email,
                lastName: user.fullName.split(' ')[1]
            };
        
            localStorage.setItem('userInformation', JSON.stringify(userInformation));
            window.location.href = '/';
        } else {
            console.log('Login failed. Invalid username or password.');
        }
    } else {
        console.log('Invalid username or password.');
    }
});


/*The getUserInfoFromLocal function is corrected to properly parse the userInformation data from localStorage.
The condition for checking if the username and password are valid is modified to use the logical && operator instead of ||.
The condition for checking if the user is found is corrected to check if the user object exists.
The error message for failed login attempts is updated to be more descriptive.*/