import http from "../http-common";

class CardService {

   
    
    getAllCustomer() {
        return http.get("customer/countCustomer");
      
    }


 
}

export default new CardService();