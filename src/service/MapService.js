import http from "../http-common";

class MapService {


   
    
    getAllVehicleCordinates(data) {
        return http.post("api/analytics/history",data
        );
    }

    
    getAllVehicleLastlocation() {
        console.log("Asssssuchi")
        console.log("Org id:"+localStorage.getItem("orgId"))
        //return http.get("api/analytics/lastpositiondtl");`api/fleet/vehicle/${vehicleid}`
        return http.get(`api/analytics/lastpositiondtl?orgRefName=${localStorage.getItem("orgId")}`);
    }
    /*create(data) {
        //console.log(data);
        return http.post("api/fleet/driver", data
        );
    }*/

    
}

export default new MapService();