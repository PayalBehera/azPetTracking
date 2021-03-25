import http from "../http-common";

class UserService {


    
    getUserInfo() {
        return http.get("api/user/users");
    }

    getAllUserInfo() {
        return http.get("api/user/usersall");
    }

    
    createUser(data){

        return http.post("api/user/createuser", data
        
        );

    }
    
    
    deleteUser(userid){
        
        return http.delete(`api/user/users?uuid=${userid}`)
    }

    // update(id, data) {
    //     return http.put("fleet/org/${id}", data);
    // }

    
}

export default new UserService();