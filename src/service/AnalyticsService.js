import http from "../http-common";

class AnalyticService {

    getAllVehicleLastlocation() {
       
        console.log("Org id:"+localStorage.getItem("orgId"))
        //return http.get("api/analytics/lastpositiondtl");`api/fleet/vehicle/${vehicleid}`
        return http.get(`api/analytics/lastpositiondtl?orgRefName=${localStorage.getItem("orgId")}`);
    }

    getAllOverspeedVehicle() {
        
        return http.get(`api/analytics/overspeed?orgRefName=${localStorage.getItem("orgId")}`);
    }

    getAllUnderspeedVehicle() {
        
        return http.get(`api/analytics/underspeed?orgRefName=${localStorage.getItem("orgId")}`);
    }

    getAllLowfuelVehicle() {
        
        return http.get(`api/analytics/lowfuel?orgRefName=${localStorage.getItem("orgId")}`);
    }

    getAllUnderutilizedVehicle() {
        
        return http.get(`api/analytics/underutilized?orgRefName=${localStorage.getItem("orgId")}`);
    }

    getFleetStatus() {
        
        return http.get(`api/analytics/fleetstatus?orgRefName=${localStorage.getItem("orgId")}`);
    }

    getFleetUsage() {
        
        return http.get(`api/analytics/fleetusage?orgRefName=${localStorage.getItem("orgId")}`);
    }
    getFleetFuelGraph1(data) {
        
        return http.post("api/analytics/vehiclevshours", data);
    }
    getAllAvarageVsIndivisual(data) {
        return http.post("api/analytics/distancevehiclesavg", data);
    }

    getActiveIdleInactive(data){
        return http.post("api/analytics/vehiclestatuscounter", data);
    }
    getActiveVsDistanceTravel(data){
        
        return http.post("api/analytics/activevehiclevsdistance", data);
    }

}

export default new AnalyticService();