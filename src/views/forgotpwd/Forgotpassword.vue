<template>
  <div>
    <b-card no-body class="overflow-hidden card-style d-flex" style="max-width: 840px;">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body
            class="title-font"
            title="Please enter your registered email id and contact number.
            We will send you the credentials"
          >
            <b-card-text>
              <b-row class="my-2">
                <b-col sm="12">
                  <b-form-input
                    id="input-valid"
                    :state="adda"
                    placeholder="Please enter email id ..."
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-3">
                <b-col sm="12">
                  <b-form-input
                    id="input-valid"
                    :state="adda"
                    placeholder="Please enter contact number ..."
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-card-text>
            <div>
              <div>
                <Button> Submit reset </Button>
              </div>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {};
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