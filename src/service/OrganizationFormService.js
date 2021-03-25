import http from "../http-common";

class OrganizationFormService {


    // test(form){
    //     console.log('method invoked');
    // }

    validate(fromrefname) {

       // console.log('Control came here' + fromrefname);

        //return http.get("api/fleet/org");
        return http.get("api/service/org/validate",{
            params: {
                orgReferenceName : fromrefname
            }
        });
    }

    getAll() {
        return http.get("api/service/org");
    }

    // get(id) {
    //     return http.get("fleet/org/${id}");
    // }

    create(data) {
        //console.log(data);
        return http.post("api/service/org", data
        // {
        //     "orgRefName" : data.orgRefName,
        //     "orgName" : data.orgName,
        //     "description" : data.description,
        //     "firstName": data.firstName,
        //     "lastName": data.lastName,
        //     "contactEmail": data.contactEmail,
        //     "contactNumber": data.contactNumber
        // }
        );
    }

    updateOrgDetails(data) {
        return http.put("api/service/org", data);
    }

    // delete(id) {
    //     return http.delete("fleet/org/${id}");
    // }

    deleteAll() {
        return http.delete("api/fleet/org");
    }

    activeOrDisableOrg(id,status) {
        return http.put(`api/service/org/disable?orgId=${id}&status=${!status}`);
    }

    updateMyOrgDetails(data) {
        return http.put("api/service/org/param", data);
    }

    getMyOrgDetails() {
        return http.get(`api/service/org/orgref/${localStorage.getItem("orgId")}`);
    }

    getAllOrgReferenceNameList() {
        return http.get("api/service/org/orgrefname")
    }

    setOrganizationParameter(data) {
        return http.post("api/service/org/param",data)
    }
}

export default new OrganizationFormService();