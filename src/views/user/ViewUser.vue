<template>
  <div >
    <CCol sm="7">
      <CCard style="align:center;">
        <!-- <CCardHeader>
          <div class="organization">
            <div>
              <h4 style="color: blue">{{ items.orgName }}</h4>
              <h6>{{ items.description }}</h6>
            </div>
          </div>
        </CCardHeader> -->
        <CCardBody>
          <CRow>
            <CCol>
               <CImg
    :src=img
   style="width:130px; height:130px; border-radius:50%; position:relative; left:5%; margin-bottom:30px;"
  />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              
              
                <c-card>
                <CCardBody>
                <div>
                    <!-- <div class="edit" @click="editButtonClick2(item)">
                      <i class="fas fa-edit"  style="color:blue;"/>
                    </div> -->
                      <div style="display: flex; justify-content:space-between;">
                        <p><span style="color:#585858;"><strong>Name</strong>:</span> Payal Behera</p>
                        <p style="position:relative;left:-50px;"><span style="color:#585858;"><strong>No of Pet</strong>:</span> 1</p>
                      </div>
                      <div style="display: flex; justify-content:space-between;">
                        <p><span style="color:#585858;"><strong>Email</strong>:</span> Payal@gmail.com</p>
                        <p><span style="color:#585858;"><strong>Contact</strong>:</span> 8895452177</p>
                      </div>
                </div>
                   </CCardBody>
              </c-card>
              
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12">
              <c-card>
                <CCardBody>
                <div>
                    <div class="edit" @click="editButtonClick2(item)">
                      <i class="fas fa-edit"  style="color:blue;"/>
                    </div>
                    <h5>Address</h5>
                      <!-- <div style="display: flex; justify-content:space-between;">
                        <p><span style="color:#585858;"><strong>Country</strong>:</span> bbsr</p>
                        <p><span style="color:#585858;"><strong>State</strong>:</span> odisha</p>
                        <p><span style="color:#585858;"><strong>City</strong>:</span> bbsr</p>
                        <p><span style="color:#585858;"><strong>Pincode</strong>:</span> 759122</p>
    
                      </div> -->
                      <h6 style="margin-left: 25px;">Payal Behera</h6>
<p>House no:296,Sikhyakapada</p>
                      <p>Angul-759122</p>
                      <p>Odisha,India</p>
                </div>
                   </CCardBody>
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
      img: require("@/assets/images/cat.jpg"),
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
  color: #A4A4A4;
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