<template>
  <div>
    <CCol sm="11">
      <CCard>
        <CCardHeader>
          <div class="organization">
            <div>
              <h4 style="color: blue">{{ items.orgName }}</h4>
              <h6>{{ items.description }}</h6>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <!-- <c-card > -->
              <div>
                <div class="container" style="float: left">
                  <div v-if="imgurl == ''" @click="onPickfile" class="wrapper">
                    <div style="position: relative; bottom: -30px">
                      <div style="font-size: 30px; color: #9658fe">
                        <i class="fas fa-cloud-upload-alt" />
                      </div>
                      <div class="text">No Image chosen yet !</div>
                    </div>
                  </div>

                  <div v-else>
                    <v-flex xs12 sm6 offset-sm3>
                      <img
                        @click="onPickfile"
                        class="img"
                        :src="imgurl"
                        style="height: 130px; width: 60%"
                      />
                    </v-flex>
                  </div>

                  <!-- <v-flex xs12 sm6 offset-sm3>
                   -->
                  <!-- <button raised class="primary" @click="onPickfile">Upload Image</button> -->
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onfilepicked"
                  />
                  <!-- </v-flex> -->
                </div>
                <!-- <div class="vl"></div> -->
                <!-- <div style="margin-top:40px;">
                <h4 style="color: blue;">{{ items.orgName }}</h4>
                <h6>{{ items.description }}</h6>
              </div>
              </div> -->

                <!-- </c-card> -->
              </div>
            </CCol>
            <CCol sm="9">
              <c-card>
                <CCardBody>
                  <div>
                    <div class="edit" @click="editButtonClick2(item)">
                      <i class="fas fa-edit" />
                    </div>

                    <div class="organization">
                      <div class="left">
                        <div class="i">
                          <div class="icon2">
                            <i class="fas fa-tachometer-alt"></i>
                          </div>

                          <h5>Over Speed:</h5>
                        </div>
                        <p>{{ item.overSpeedLimit }} km/hr</p>
                        <div class="i">
                          <div class="icon2">
                            <i class="fas fa-tachometer-alt"></i>
                          </div>
                          <h5>Under Speed:</h5>
                        </div>
                        <p>{{ item.underSpeedLimit }} km/hr</p>
                        <div class="i">
                          <div class="icon2">
                            <i class="fas fa-gas-pump"></i>
                          </div>
                          <h5>Fuel Alert:</h5>
                        </div>
                        <p>{{ item.fuelLimit }} %</p>
                      </div>
                      <div class="left">
                        <div class="i">
                          <div class="icon2"><i class="fas fa-route"></i></div>
                          <h5>Under Utilized Kms:</h5>
                        </div>
                        <p>{{ item.underUtilizedKms }} km</p>
                        <div class="i">
                          <div class="icon2"><i class="fas fa-route"></i></div>
                          <h5>Over Utilized Kms:</h5>
                        </div>
                        <p>{{ item.overUtilizedKms }} km</p>
                      </div>

                      <div class="right">
                        <div class="i">
                          <div class="icon2">
                            <i class="fab fa-algolia"></i>
                          </div>
                          <h5>Over Utilized Hours:</h5>
                        </div>
                        <p>{{ item.overUtilizedHours }} hr</p>
                        <div class="i">
                          <div class="icon2">
                            <i class="fab fa-algolia"></i>
                          </div>

                          <h5>Under Utilized Hours:</h5>
                        </div>
                        <p>{{ item.underUtilizedHours }} hr</p>
                      </div>
                    </div>
                  </div></CCardBody
                >
              </c-card>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </div>
</template>
<script>
import OrganizationFormService from "../../service/OrganizationFormService";
export default {
  data() {
    //console.log("Come"+nav);
    return {
      imgurl: "",
      image: null,
      item: null,
      items: null,
      img: require("@/assets/images/company.jpeg"),
      img2: require("@/assets/images/camera2.png"),
    };
  },
  methods: {
    editButtonClick2(editdata) {
      //this.$emit("inputData", this.tempMessage);
      localStorage.setItem("orgDetails", JSON.stringify(editdata));
      this.$router.push({ path: `editmyorg` });
    },
    getallOrganization() {
      OrganizationFormService.getMyOrgDetails()
        .then((response) => {
          let serverData = response.data;
          this.items = serverData;
          console.log(this.items);
          this.item = this.items.params;

          console.log(this.items);
        })
        .catch(function error() {
          console.log(error);
        });
    },
    onPickfile() {
      this.$refs.fileInput.click();
    },
    onfilepicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("please add valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imgurl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
  created() {
    this.getallOrganization();
    this.$root.$on("orgToast", (task) => {
      console.log("Log message:" + task);
      this.toasterMessage = task;
      this.makeToast("success");
      this.$root.$off("orgToast");
    });
  },
};
</script>
<style scoped>
.vl {
  border-left: 1px solid rgb(197, 196, 196);
  height: 200px;
  position: absolute;
  left: 46%;
  margin-left: -3px;
  top: 0;
}
.organization {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.left {
  margin-left: 20px;
}
.left1 {
  padding: 10px;
  width: 400px;
  border: 5px solid green;
  margin-left: 10px;
}
.right {
  margin-right: 20px;
}
p {
  color: blue;
  margin-left: 25px;
}
.img {
  border-radius: 50%;

  display: block;
  margin-left: auto;
  margin-right: auto;
}
.icon2 {
  margin-right: 10px;
  color: rgb(191, 194, 194);
}
.image1 {
  display: flex;
  justify-content: space-between;
}
.img2 {
  margin-top: 110px;
  transform: inherit;
}
.edit {
  float: right;
  margin-right: 10px;
  margin-bottom: 40px;
  cursor: pointer;
  color: rgb(191, 194, 194);
}
/* .organization1{
 display: flex;

justify-content: space-between;

padding: 10px;
width: 480px;
border: 5px solid green;
margin-left: 370px;   
} */
/* .org{
display:flex;
} */
.i {
  display: flex;
}
.container {
  display: grid;
  /* height: 100%; */
  place-items: center;
  font-family: "poppins", sans-serif;
  text-align: center;
  box-sizing: border-box;
  height: 200px;
  width: 70%;
  margin-left: 3px;
}
.container .wrapper {
  position: relative;
  height: 150px;
  width: 60%;
  border-radius: 10px;
  background: #fff;
  border: 2px dashed #c2cdda;
  border-radius: 50%;

  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.wrapper .image {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper .img {
  height: 100%;
  width: 80%;
  object-fit: cover;
}

.wrapper .text {
  font-size: 17px;
  font-weight: 500;
  columns: #5b5b7b;
}
.wrapper #cancel-btn {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
  cursor: pointer;
  color: #9658fe;
}
.container #custom-btn {
  margin-top: 10px;
  width: 100%;
  height: 30px;
  display: block;
  border: none;
  border-radius: 25px;
  color: #fff;
  font-size: 10px;
  background: linear-gradient(135deg, #3a8ffe 0%, #9658fe 100%);
}
.container #default-but {
  margin-top: 10px;
  width: 100%;
  height: 30px;
  display: block;
}
@media (min-width: 768px) {
  .container {
    width: 300px;
    /* 7px border will be inherited from extrasmall devices... etc */
  }
}

/* Desktop and up */
@media (min-width: 992px) {
  .container {
    width: 300px;
  }
}

/* Large desktops */
@media (min-width: 1200px) {
  .container {
    width: 300px;
  }
}
</style>