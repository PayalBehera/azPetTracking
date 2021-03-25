<template>
   <CRow> 
       <CCol col="12" sm="3">
           <CCard style="background-color:#C2CAD0">
               <h5>Current Details</h5>
               <div style="display:inline-flex; justify-content:space-between;">
                   <div>
               
               <P>Total Consumer:</P>
               <h3>{{countConsumer}}</h3></div>
              <div style="float:left"> <i class="fas fa-hand-holding-water" style="height:50px;width:60px;margin:7px;  "></i></div>
               </div>
           </CCard>
       </CCol>
        <CCol col="12" sm="3">
           <CCard style="background-color:#D1E8E2">
               <h5>Total Billed Amount:</h5>
               <div style="display:inline-flex; justify-content:space-between;">
                   <div>
               <P>Last Month:</P>
               <P>Total Consumer:</P></div>
              <div> <i class="fas fa-rupee-sign" style="height:53px;width:50px; margin:10px;"></i></div>
               </div>
           </CCard>
       </CCol>
        <CCol col="12" sm="3">
           <CCard style="background-color:#E3AFBC">
               <h5>Unbilled</h5>
               <div style="display:inline-flex; justify-content:space-between;">
                   <div>
               
               <P>Total_Consumption</P>
               <h3>{{meterReading}}</h3></div>
              <div> <i class="fas fa-water" style="height:50px;width:50px; margin:10px;"></i></div>
               </div>
           </CCard>
       </CCol>
         <CCol col="12" sm="3">
           <CCard style="background-color:#E8A87C">
               <div style="display:inline-flex; justify-content:space-between;">
               <h5>History</h5>
              <div style="background-color:#E8A87C"> <select  
      style="width:20%; position:relative;left:70%;background-color:#E8A87C;border-style: none;"
               v-model="selected"  v-on:change="changeItem($event)">
                  <!-- <option v-for="item in items" :value="item.val" :key="item.id">{{item.val}}</option> -->
                  <option value=8>Daily</option>
                 <option value=18>Monthly</option>
                 <option value=28>Weekly</option> 
                </select></div></div>
               <div style="display:inline-flex; justify-content:space-between;">
                   <div>
               
               <P>Total Consume:</P>
              <h3>{{consume}}</h3>
               </div>
              <div> <i class="far fa-snowflake" style="height:40px;width:50px; margin:10px;"></i></div>
               </div>
           </CCard>
       </CCol>
   </CRow>
</template>
<script>
// import { CChartLineExample } from "../charts/index.js";
// import { CChartLineSimple } from "../charts/index.js";
// import { CChartBarExample } from "../charts/index.js";
import ConsumerService from "@/service/ConsumerService";
import CardService from "@/service/CardService";
export default {
  name: "WidgetsDropdown",
  components: { 
      //CChartLineExample,
 // CChartLineSimple,
   //CChartBarExample 
   },
   data: function () {
    return {
      selected:'Daily',
    selectdate:"",  
    countConsumer:"",
    meterReading:0,
    consume:8,
    data:'0004a30b0020b18f',
      items:{
          1:{id:1,val:'Daily'},
          2:{id:2,val:'Weekly'},
          3:{id:3,val:'Monthly'},
      },
    }
   },
   created(){
     this.getCustomer();
     this.device();
   },
   methods:{
      changeItem: function changeItem(event) {
      this.consume = event.target.value;
    },
    //  Daily(){
    //   this.consume="jhjh"
    //    console.log(this.consume);
    //  },
    //  Monthly(){
    //    this.consume=""
    //   this.consume="hjxhjs"
    //    console.log(this.consume);
    //  },
    //  Weekly(){
    //    this.consume=""
    //   this.consume="shhdjksh"
    //    console.log(this.consume);
    //  },
      device(){
         
         ConsumerService.device()
        .then((response) => {
           if (response.status === 200) {
            let serverData2 = response.data;
           
           
              this.meterReading=serverData2.meterReading*10
          
            console.log("''''''''''"+this.meterReading)
           }
        })
   
    },
       getCustomer(){
           CardService.getAllCustomer()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data;
        this.countConsumer=serverData.count;
           
            console.log(this.countConsumer);
            // for(var k=0;k<this.items.length;k++){
            //   let serverdata2=response.data._embedded.customer[k].wmDetails;
            //   this.i=serverdata2;
            // console.log(serverdata2);
            
            // }
            
          }
        })
        .catch(function error() {
          console.log(error);
        }); 
       }
   }
}
</script>
<style>
P{
    color:#636363;
    text-align: left;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size:13px;
    margin: 10px;
}
h5{
     margin: 10px;
}
h3{
     margin-left: 20px;
     font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>