import { authHeader } from '../_helper';

export const userService = {
    checkForm,
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function checkForm(username, password){
    console.log('form submitted');
    console.log(JSON.stringify({ username, password }));
}

function login(username, password) {
    console.log('login function is invoked');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    //return fetch(`/users/authenticate`, requestOptions)
    return fetch(`http://localhost:8081/api/auth/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.accessToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log('invalid user name or password');
            }

            if(response.status === 400) {
                console.log('Bad Request')
                logout();
                location.reload(true); 
            }

            if(response.status === 200){
                console.log('Received response code 200');
            }
            const error = (data && data.message) || response.statusText;
            location.reload(true); 
            return Promise.reject(error);
        }

        return data;
    });
}