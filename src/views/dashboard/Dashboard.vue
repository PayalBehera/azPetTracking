<template>
  

  <div>
    <CCard>
      <!-- <CCardHeader>
         <Card/>
        
      </CCardHeader> -->
      <CCardBody>
       <Map/>
      </CCardBody>
      
    </CCard>
    
    
    <!-- <CCard>
    <CRow>
      <CCol>
        <CChartBarExample />
      </CCol>
      <CCol>
        <CChartBarExample1 />
      </CCol>
    </CRow>
    </CCard> -->
  </div>

</template>

<script>

// import * as Charts from "../charts/index.js";
// import AnalyticsService from '../../service/AnalyticsService'

// export default {
//   name: "MyOrganization",
//   // data: {
//   //       counter: "0100210"
//   // },

//   data() {
//     return {
//       employeeCount: "",
//       departmentCount: ""
//     };
//   },

//   methods: {
//     getDepartmentcount() {
//     console.log('I am executed');

//       AnalyticsService.getDeprtmentCount()
//         .then(response => {
//           let serverData = response.data;
//           this.departmentCount = serverData.data;
//           console.log(serverData.data);
//         })
//         .catch(function error() {
//           console.log(error);
//         });
//     },

//     getEmployeeCount() {
//       console.log('Employee executed');
//       AnalyticsService.getEmployeeCount()
//         .then(response => {
//           let serverData = response.data;
//           this.employeeCount = serverData.data;
//           console.log(serverData.data);
//         })
//         .catch(function error() {
//           console.log(error);
//         });
//     }
//   },

//   mounted() {
//     this.getDepartmentcount();
//     this.getEmployeeCount();
//   },

//   components: {
//     ...Charts
//   }
// };

//import { CChartBarExample } from "../charts/index.js";
//import { CChartBarExample1 } from "../charts/index.js";
//import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Map = () => import('@/views/map/Map')
const Card = () => import('@/views/dashboard/Card')
export default {
  name: 'Dashboard',
  components: {
   //CChartBarExample,
  // CChartBarExample1,
   // WidgetsDropdown,
    Card,
    Map
  },
  data () {
    return {
      selected: 'Month',
      tableItems: [
        {
          avatar: { url: 'img/avatars/1.jpg', status: 'success' },
          user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'USA', flag: 'cif-us' },
          usage: { value: 50, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Mastercard', icon: 'cib-cc-mastercard' },
          activity: '10 sec ago'
        },
        {
          avatar: { url: 'img/avatars/2.jpg', status: 'danger' },
          user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2015' },
          country: { name: 'Brazil', flag: 'cif-br' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Visa', icon: 'cib-cc-visa' },
          activity: '5 minutes ago'
        },
        {
          avatar: { url: 'img/avatars/3.jpg', status: 'warning' },
          user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'India', flag: 'cif-in' },
          usage: { value: 74, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Stripe', icon: 'cib-stripe' },
          activity: '1 hour ago'
        },
        {
          avatar: { url: 'img/avatars/4.jpg', status: '' },
          user: { name: 'En�as Kwadwo', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'France', flag: 'cif-fr' },
          usage: { value: 98, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'PayPal', icon: 'cib-paypal' },
          activity: 'Last month'
        },
        {
          avatar: { url: 'img/avatars/5.jpg', status: 'success' },
          user: { name: 'Agapetus Tade�', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Spain', flag: 'cif-es' },
          usage: { value: 22, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Google Wallet', icon: 'cib-google-pay' },
          activity: 'Last week'
        },
        {
          avatar: { url: 'img/avatars/6.jpg', status: 'danger' },
          user: { name: 'Friderik D�vid', new: true, registered: 'Jan 1, 2015' },
          country: { name: 'Poland', flag: 'cif-pl' },
          usage: { value: 43, period: 'Jun 11, 2015 - Jul 10, 2015' },
          payment: { name: 'Amex', icon: 'cib-cc-amex' },
          activity: 'Last week'
        }
      ],
      tableFields: [
        { key: 'avatar', label: '', _classes: 'text-center' },
        { key: 'user' },
        { key: 'country', _classes: 'text-center' },
        { key: 'usage' },
        { key: 'payment', label: 'Payment method', _classes: 'text-center' },
        { key: 'activity' },
      ]
    }
  },
  created() {

    this.$store.commit("auth/setAuthentication", true);
        //this.getAccountsDetails()
        this.$router.replace({ name: "Dashboard" });
        //For side bar minimized
        this.$store.commit('set', ['sidebarMinimize', true])
  },
  methods: {
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}

</script>