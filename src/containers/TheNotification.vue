<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="notification" id="popover-target-1">
          <CIcon name="cil-bell" v-on:click="to = !to" />
          <span v-if="alertMessage.length != 0" class="badge">{{alertMessage.length}}</span>
          <span v-if="alertMessage.length >= 10" class="badge">9+</span>
        </div>
      </CHeaderNavLink>
    </template>

    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Notification</strong>
    </CDropdownHeader>
    <div v-for="(m, index) in alertMessage" :key="index">
      <CDropdownItem>
        
            
            <span>{{m.msg}}</span>
            <span class="closebtn" @click="rowclick(m,index)">&times;</span>
         

        <!-- <CIcon name="cil-user" /> Djj -->
      </CDropdownItem>
      <CDropdownDivider />
    </div>
    <CDropdownItem @click="clearall" class="clearall">
      Clear All
      <!-- <center>
        <button class="btn btn-primary btn-submit" type="submit" @click="clearall">Clear all</button>
      </center> -->
    </CDropdownItem>
  </CDropdown>
</template>
<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "TheNotification",
  data() {
    return {
      connected: false,
      toggle: false,
      alertMessage: [],
      url: process.env.VUE_APP_SOCKET_URL,
    };
  },
  created() {
    console.log("Component has been created inside header!");

    console.log("Starting connection to websocket..");
    this.socket = new SockJS(this.url);
    //this.socket = new SockJS("https://test.asiczen.com/vueendpoint");
    //this.socket = new SockJS("https://qascorpious.asiczen.com/vueendpoint");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      (frame) => {
        console.log("connec");
        this.connected = true;
        //console.log(frame);
        //this.soceketConnection =
        // this.stompClient.subscribe("/info/values", tick => {
        var orgTopic = "/topic/" + localStorage.getItem("orgId");
        this.stompClient.subscribe(
          orgTopic + "/alerts",
          (tick) => {
            // console.log("Subscribe")
            //console.log(tick);
            //this.received_messages.push(JSON.parse(tick.body).content);
            console.log("Data Coming in alert");
            console.log(JSON.parse(tick.body));

            var markerss = JSON.parse(tick.body);
            //console.log("Alert Count:"+this.alertMessage.length)
            if (this.alertMessage.length >= 1) {
                    this.alertMessage.forEach((element) => {
                      //console.log("Loop Calling")

                      //console.log(markerss.vehicleNumber)
                      if (element.msg == markerss.message) {
                        this.alertMessage.splice(
                          this.alertMessage.indexOf(element),
                          1
                        );
                      }
                    });
                  }
            this.alertMessage.push({
              msg: markerss.message,
              col: markerss.color,
            });
            /* if (this.alertMessage.length >= 1) {
            this.alertMessage.forEach((element) => {
              //console.log("Loop Calling")

              //console.log(markerss.vehicleNumber)
              if (element.msg === markerss.message) {
                //console.log("Message same")
              }
              else{
                  this.alertMessage.push({
                  msg: markerss.message,
                  col: markerss.color,
                });
              }
            });
          }else{

            this.alertMessage.push({
              msg: markerss.message,
              col: markerss.color,
            });
          }*/
            console.log(markerss);
          },
          { id: "orgAlert" }
        );
      },
      (error) => {
        console.log(error);
        this.connected = false;
      }
    );
  },
  computed: {
    minimize() {
      //console.log("Minimize value in Header:"+this.$store.state.sidebarMinimize)
      return this.$store.state.sidebarMinimize;
    },
  },
  methods: {
    rowclick(m, index) {
      //m.mesg.pop();
      console.log("delete");
      // m.splice(index,1);
      this.alertMessage.splice(index, 1);
    },
    clearall() {
      this.alertMessage = [];
    },
  },
  beforeDestroy() {
    if (this.connected) {
      this.stompClient.unsubscribe("orgAlert");
      this.stompClient.disconnect();
    }
  },
};
</script>

<style>
.notification .badge {
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 5px 2px;
  border-radius: 50%;
  background: red;
  color: white;
  text-align: center;
  /* text-align-last: center; */
}
.alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}

/* The close button */
.closebtn {
  /* margin-left: 15px; */
  color: rgb(87, 85, 85);
  font-weight: bold;
  /* float: right; */
  font-size: 22px;
  /* line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
  padding-left: 5px; */
  /* padding-right: 5px;
  margin-right: 5px; */
}

/* When moving the mouse over the close button */
.closebtn:hover {
  color: black;
}
.drpdownitem {
    padding: 5px 5px;
}
.clearall {
  text-align: center;
  font-size: 16px;
}
.clearall:hover {
  background-color: rgb(0, 119, 182);
}
.altmsg{
  float: left;
}
</style>
