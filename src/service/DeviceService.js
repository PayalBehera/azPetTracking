import http from "../http-common";

class DeviceService {

   
    //Get all device information with associated vehicle details
    getAll() {
        return http.get("api/fleet/deviceinfo");
        //return http.get("api/fleet/device");
    }

    // get(id) {
    //     return http.get("fleet/org/${id}");
    // }

    create(data) {
        //console.log(data);
        return http.post("api/fleet/device", data
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

     //Delete Driver details
        deleteDevice(deviceid){
            //return http.delete("api/fleet/device",{params: {deviceId: deviceid}})
            return http.delete(`api/fleet/device/${deviceid}`)
        }
    // update(id, data) {
    //     return http.put("fleet/org/${id}", data);
    // }

    // delete(id) {
    //     return http.delete("fleet/org/${id}");
    // }

    deleteAll() {
        return http.delete("api/fleet/org");
    }
    
    getDeviceCount() {
        return http.get("api/fleet/device/count");
    }
}

export default new DeviceService();