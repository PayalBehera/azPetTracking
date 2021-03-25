import http from "../http-common";

class ConsumerService {

   
    
    getAll() {
        return http.get("customer");
      
    }
    device(){
        return http.get("meterdata/consumption/0004a30b0020b18f");
    }
   

    create(data) {
        //console.log(data);
        return http.post("customer", data);
    }
    delete(customerid){
        return http.delete(`customer/${customerid}`);
    }

    
    //     deleteDevice(deviceid){
    //         //return http.delete("api/fleet/device",{params: {deviceId: deviceid}})
    //         return http.delete(`api/fleet/device/${deviceid}`)
    //     }
    

    // deleteAll() {
    //     return http.delete("api/fleet/org");
    // }
    
    // getDeviceCount() {
    //     return http.get("api/fleet/device/count");
    // }
}

export default new ConsumerService();