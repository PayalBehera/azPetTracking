import http from "../http-common";

class DriverService {


    // test(form){
    //     console.log('method invoked');
    // }

   

    getAllDriver() {
        return http.get("api/fleet/driver");
    }

    
    getAllVehicleNumberList() {

        return http.get("api/fleet/vehicle");
    }
    
    getAllDriverVehicleMapList() {
        //return http.get("api/fleet/vehicledrivermap");
        return http.get("api/fleet/vehicleinfo");
    }

    create(data) {
        //console.log(data);
        return http.post("api/fleet/driver", data
        );
    }

    createDriverVehiclemap(data){

        return http.post("api/fleet/vehicledrivermap", data
        
        );

    }
    //Update Driver details
    updateDriverDetails(data)  {
        return http.put("api/fleet/driver", data);
   }

   //Delete Driver details
   deleteDriver(driverid){
     //return http.delete("api/fleet/driver",{params: {driverId: driverid}})
     return http.delete(`api/fleet/driver/${driverid}`)
    }
    

    deleteAll() {
        return http.delete("api/fleet/org");
    }
    getDriverCount() {
        return http.get("api/fleet/driver/count");
    }
    
}

export default new DriverService();