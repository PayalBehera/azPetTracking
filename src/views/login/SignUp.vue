<template>
  <div>
    <b-card no-body class="overflow-hidden card-style d-flex" style="max-width: 1000px;">
      <b-row no-gutters>
        <b-col md="4" style=" position:relative;top:35px;">
          <b-card-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSZNqUDt4KO_TPzLpdJ0vaFWoYdYWciVthSQ&usqp=CAU" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body
            class="title-font"
    
          >
            <b-card-text>
             <label>Name</label>
              <b-row class="my-1">
                <b-col sm="6">
                  <b-form-input
                    id="input-valid"
                    v-model="form.Fname"
                    :state="adda"
                    placeholder="Enter Frist Name"
                  ></b-form-input>
                </b-col>
             
                <b-col sm="6">
                  <b-form-input
                    id="input-valid"
                    :state="adda"
                    placeholder="Enter Last Name"
                  ></b-form-input>
                </b-col>
              </b-row>
              <label>Phone No</label>
               <b-row class="my-1">
                <b-col sm="12">
                  <b-form-input
                    id="input-valid"
                    type="number"
                    v-model="form.Lname"
                    :state="adda"
                    placeholder="Plese Enter Contact"
                  ></b-form-input>
                </b-col>
              </b-row>
              <label>Address</label>
             <b-row class="my-1">
                <b-col sm="3">
                  <b-form-input
                    id="input-valid"
                    
                    :state="adda"
                    v-model="form.Address.Country"
                    placeholder="Country"
                  ></b-form-input>
                </b-col>
                 <b-col sm="3">
                  <b-form-input
                    id="input-valid"
                    
                    :state="adda"
                    v-model="form.Address.State"
                    placeholder="State"
                  ></b-form-input>
                </b-col>
                 <b-col sm="3">
                  <b-form-input
                    id="input-valid"
                    
                    :state="adda"
                    v-model="form.Address.Location"
                    placeholder="Location"
                  ></b-form-input>
                </b-col>
                 <b-col sm="3">
                  <b-form-input
                    id="input-valid"
                    v-model="form.Address.pin"
                    :state="adda"
                    placeholder="Pin"
                  ></b-form-input>
                </b-col>
              </b-row>
              <label>Email</label>
              <b-row class="my-1">
                <b-col sm="12">
                  <b-form-input
                    id="input-valid"
                    type="email"
                    v-model="form.Email"
                    :state="adda"
                    placeholder="Enter email Id"
                  ></b-form-input>
                </b-col>
              </b-row>
              <label>Password</label>
              <b-row class="my-1">
                <b-col sm="12">
                  <b-form-input
                  type="password"
                    id="input-valid"
                    v-model="form.Password"
                    :state="adda"
                    placeholder="Enter Password"
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-card-text>
            <div>
              <div>
                <Button> Sign Up </Button>
              </div>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
          form:{
              Fname:'',
              Lname:'',
            Contact:"",
            Address:{
                Country:'',
                state:'',
                Location:'',
                pin:'',
            },
            Email:'',
            Password:''
          }
        }
    }
};
</script>

<style lang="scss" scoped>
.card-style {
  margin: auto;
  margin-top: 10%;
  justify-self: center;
  width: 60%;
  border: none;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: beige;
}

.card-title {
  font-size: 14px;
}
</style>