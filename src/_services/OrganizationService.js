import { authHeader } from '../_helper';

class OrganizationService {

    validateOrgRefId() {
        console.log('Service method is invoked');
        return true;
    }


    addOrganization(form) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify({form.orgRefName,form.orgName})
        };

        console.log('This methos is invoked');

        return fetch(`/users/register`, requestOptions).then(handleResponse);
    }

    getById(id) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        return fetch(`/users/${id}`, requestOptions).then(handleResponse);
    }

    handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    console.log('invalid user name or password');
                }

                if (response.status === 400) {
                    console.log('Bad Request')
                    logout();
                    location.reload(true);
                }

                if (response.status === 200) {
                    console.log('Received response code 200');
                }
                const error = (data && data.message) || response.statusText;
                location.reload(true);
                return Promise.reject(error);
            }

            return data;
        });
    }
}