import http from "../http-common";

class VehicleService {


    // test(form){
    //     console.log('method invoked');
    // }

    /*validate(fromrefname) {

       // console.log('Control came here' + fromrefname);

        //return http.get("api/fleet/org");
        return http.get("api/fleet/org/validate",{
            params: {
                orgRefName : fromrefname
            }
        });
    }*/

    getAllVehicleInfo() {
        //return http.get("api/fleet/vehicledrivermap");
       // return http.get("api/fleet/vehicleinfo");
        return http.get("api/fleet/vehicle");
    }

    getAllDeviceImeiList() {
        return http.get("api/fleet/device");
    }

    getAllVehicleNumberList() {

        return http.get("api/fleet/vehicle");
    }
    
    getAllDeviceVehicleMapList() {
        //return http.get("api/fleet/devicevehiclemap");
        //return http.get("api/fleet/vehicleinfo");
        return http.get("api/fleet/vehicledevicedata");
    }

    create(data) {
        console.log("printing")
        console.log(data);
        return http.post("api/fleet/vehicle", data
        
        );
    }
    createDeviceVehiclemap(data){

        return http.post("api/fleet/devicevehiclemap", data
        
        );

    }
     //Update Driver details
     updateVehicleDetails(data)  {
        return http.put("api/fleet/vehicle", data);
   }

    //Delete vehicle details
    deleteVehicle(vehicleid){
        //return http.delete("api/fleet/vehicle",{params: {vehicleId: vehicleid}})
        return http.delete(`api/fleet/vehicle/${vehicleid}`)
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

    getAllVehicleCount() {

        return http.get("api/fleet/vehicle/count");
    }

    getVehicleOwnerDetails(vehicleid){
        return http.get(`api/fleet/ownerbyvehicle/${vehicleid}`);
    }
}

export default new VehicleService();