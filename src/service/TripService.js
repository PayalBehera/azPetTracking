import http from "../http-common";

class TripService {

create(data) {
        console.log("printing")
        console.log(data);
        return http.post("api/manage/trip", data);
    }
    getAllTripDetails() {
        return http.get(`api/manage/trip/all?orgRefName=${localStorage.getItem("orgId")}`);
    }
    editTrip(data){
        return http.put("api/manage/trip", data);
    }
}

export default new TripService();
