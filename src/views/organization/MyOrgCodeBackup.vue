<template>
  <div>
    <CCol sm="8">
      <CCard>
        <CCardHeader>
          <div class="organization">
            <div>My Organization</div>
            <!-- <div>
            <CButton size="sm" color="info" class @click="editButtonClick(item)">Edit</CButton>
                <CButton
                  size="sm"
                  color="danger"
                  class="ml-1"
                  @click="deleteButtonClick(item)"
                >Delete</CButton>
            </div> -->
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <!-- <div class="image">
                <div>
            <CImg
        class="img"
        size="custom-size"
        v-bind:src="img"
        :height="200"
        :width="200"
        viewBox="0 0 110 134"
      />
                </div>
                <div>
      <CImg
        class="img2"
        size="custom-size"
        v-bind:src="img2"
        :height="20"
        :width="20"
        type="file"
        id="file" accept="image/*"
        viewBox="0 0 110 134"
      />
      <div>
          <input id="default-but" type="file">
           <button id="custom-btn">choose a file</button> 
      </div>
                </div>
            </div> -->
              <div class="container">
                <div class="wrapper">
                  <div class="image">
                    <!-- <CImg
        class="im"
        
        v-bind:src="img"
       
       
      /> -->
                  </div>
                  <div class="content">
                    <div class="icon">
                      <i class="fas fa-cloud-upload-alt" />
                    </div>
                    <div class="text">No Image chosen yet !</div>
                  </div>
                  <div id="cancel-btn"><i class="fas fa-times" hidden /></div>
                </div>
                <div class="image1">
                  <div>
                    <input id="default-but" type="file" />
                  </div>
                  <div>
                    <button @click="choosepic" id="custom-btn">upload</button>
                  </div>
                </div>
              </div>
            </CCol>
            <CCol>
              <c-card>
                <div class="organization">
                  <div class="left">
                    <div class="i">
                      <div class="icon2"><i class="fas fa-passport"></i></div>
                      <h6>Organization_id:</h6>
                    </div>
                    <p>{{ items[0].orgId }}</p>
                    <div class="i">
                      <div class="icon2"><i class="far fa-user"></i></div>
                      <h6>Name:</h6>
                    </div>
                    <p>Payal Behera</p>
                    <div class="i">
                      <div class="icon2">
                        <i class="fas fa-envelope-open-text"></i>
                      </div>
                      <h6>Contact Email:</h6>
                    </div>
                    <p>Pbehera@asiczen.com</p>
                  </div>
                  <div class="right">
                    <div class="i">
                      <div class="icon2"><i class="far fa-building"></i></div>
                      <h6>Organization Name:</h6>
                    </div>
                    <p>{{ items[0].orgName }}</p>
                    <div class="i">
                      <div class="icon2">
                        <i class="fas fa-phone-square-alt"></i>
                      </div>
                      <h6>Contact Number:</h6>
                    </div>
                    <p>8895452177</p>
                  </div>
                </div>
              </c-card>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <c-card>
                <div>
                  <div class="edit" @click="editButtonClick(item)">
                    <i class="fas fa-edit" />
                  </div>

                  <div class="left">
                    <div class="i">
                      <div class="icon2">
                        <i class="fas fa-file-signature"></i>
                      </div>
                      <h5>Description:</h5>
                    </div>
                    <p>{{ items[0].description }}</p>

                    <div class="i">
                      <div class="icon2"><i class="fas fa-map-marked" /></div>
                      <h5>Address</h5>
                    </div>

                    <p>DLF Cybercity</p>
                    <p>Bhubaneswar</p>
                    <p>759122</p>
                  </div>
                </div>
              </c-card>
            </CCol>
            <CCol>
              <c-card>
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
                        <h6>Over Speed:</h6>
                      </div>
                      <p>{{ item.overSpeedLimit }}</p>
                      <div class="i">
                        <div class="icon2">
                          <i class="fas fa-tachometer-alt"></i>
                        </div>
                        <h6>Under Speed:</h6>
                      </div>
                      <p>{{ item.underSpeedLimit }}</p>

                      <div class="i">
                        <div class="icon2"><i class="fab fa-algolia"></i></div>
                        <h6>Under UtilizedKms:</h6>
                      </div>
                      <p>{{ item.underUtilizedKms }}</p>
                      <div class="i">
                        <div class="icon2"><i class="fab fa-algolia"></i></div>
                        <h6>Over UtilizedKms:</h6>
                      </div>
                      <p>{{ item.overUtilizedKms }}</p>
                    </div>

                    <div class="right">
                      <div class="i">
                        <div class="icon2"><i class="fas fa-gas-pump"></i></div>
                        <h6>Fuel Alert:</h6>
                      </div>
                      <p>{{ item.fuelLimit }}</p>
                      <div class="i">
                        <div class="icon2">
                          <i class="fas fa-thumbtack"></i>
                        </div>
                        <h6>Over UtilizedHours:</h6>
                      </div>
                      <p>{{ item.overUtilizedHours }}</p>
                      <div class="i">
                        <div class="icon2"><i class="fas fa-route"></i></div>
                        <h6>Under UtilizedHours:</h6>
                      </div>
                      <p>{{ item.underUtilizedHours }}</p>
                    </div>
                  </div>
                </div>
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
      item: [],
      items: [],
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
      OrganizationFormService.getAll()
        .then((response) => {
          let serverData = response.data;
          this.items = serverData.data;
          this.item = this.items[0].params;

          console.log(this.items);
        })
        .catch(function error() {
          console.log(error);
        });
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
.organization {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.left {
  margin-left: 10px;
}
.left1 {
  padding: 10px;
  width: 400px;
  border: 5px solid green;
  margin-left: 10px;
}
.right {
  margin-right: 10px;
}
p {
  color: blue;
  margin-left: 15px;
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
  height: 100%;
  place-items: center;
  font-family: "poppins", sans-serif;
  text-align: center;
  box-sizing: border-box;
  height: 200px;
  width: 350px;
}
.container .wrapper {
  position: relative;
  height: 180px;
  width: 100%;
  border-radius: 10px;
  background: #fff;
  border: 2px dashed #c2cdda;
  display: flex;
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
.wrapper .image CImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.wrapper .icon {
  font-size: 50px;
  color: #9658fe;
}
.wrapper .text {
  font-size: 20px;
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
</style>