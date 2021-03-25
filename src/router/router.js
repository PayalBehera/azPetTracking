import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { Role } from '../_helper/role'

Vue.use(Router)

// Containers
const Login = () => import('../views/login/Login')
const TheContainer = () => import('@/containers/TheContainer')

//const Login = () => import('../views/login/Login')
const Dashboard = () => import('../views/dashboard/Dashboard')
const Forgetpwd = () => import('../views/forgotpwd/Forgotpassword')
const SignUp = () => import('../views/login/SignUp')

// const AddConsumer = () => import('@/views/Consumer/AddConsumer')
// const ViewConsumer = () => import('@/views/Consumer/ViewConsumer')

const ViewUser = () => import('@/views/user/ViewUser')

const AddPet = () => import('@/views/Pet/AddPet')
const ViewPetDetails = () => import('@/views/Pet/ViewPetDetails')
const AssociatePet =() => import('@/views/Pet/AssociatePet')

const AddDevice = () => import('@/views/Device/AddDevice')
const ViewDevice = () => import('@/views/Device/ViewDevice')
const AssociateDevice =() => import('@/views/Device/AssociateDevice')

const VehicleRouteReplay = () => import('@/views/map/VehicleRouteReplay')

//Apllication views for Report
const ReportView = () => import('@/views/report/ReportView')
export const router = new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

function configRoutes() {
    return [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
          path: '/sign-up',
          name: 'SignUp',
          component: SignUp
        },
        {
            path: '/dashboard',
            name: 'Home',
            redirect: '/dashboard',
            
            component: TheContainer,
            beforeEnter: (to, from, next) => {
              next();
              // if (store.state.auth.authenticated == true) {
              //     //store.dispatch('REST_API_EXAMPLE');
              //     next();
              // } else {
              //     next(false);
              // }
          },
            children: [
                {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                  authorize: [Role.ROLE_MODERATOR]
                }
                
              },
              {
                path: '/user',
                meta: {
                  //label: 'Devices'
                },
                component: {
                  render(c) {
                    return c('router-view')
                  }
                },
                children: [
                  {
                    path: 'viewUser',
                    name: 'ViewUser',
                    component: ViewUser
                  },
                  
                ]
              },  
             
                  {
                    path: '/pet',
                    meta: {
                      //label: 'Devices'
                    },
                    component: {
                      render(c) {
                        return c('router-view')
                      }
                    },
                    children: [
                      {
                        path: 'addPet',
                        name: 'AddPet',
                        component: AddPet
                      },
                      {
                        path: 'viewPet',
                        name: 'ViewPet',
                        component: ViewPetDetails
                      },
                      {
                        path: 'associatePet',
                        name: 'associatePet',
                        component: AssociatePet
                      },
                    ]
                  },  
                  {
                    path: '/device',
                    meta: {
                      //label: 'Devices'
                    },
                    component: {
                      render(c) {
                        return c('router-view')
                      }
                    },
                    children: [
                      {
                        path: 'addDevice',
                        name: 'AddDevice',
                        component: AddDevice
                      },
                      {
                        path: 'viewDevice',
                        name: 'ViewDevice',
                        component: ViewDevice
                      },
                      {
                        path: 'associateDevice',
                        name: 'AssociateDevice',
                        component: AssociateDevice
                      },
                    ]
                  },
                  {
                    path: 'history',
                    name: 'History',
                    component: VehicleRouteReplay,
                    meta: {
                      authorize: [Role.ROLE_MODERATOR]
                    }
                    
                  },
                  {
                    path: 'report',
                    name: 'Report',
                    component: ReportView,
                    meta: {
                      authorize: [Role.ROLE_MODERATOR]
                    }
                    
                  },  
                
            ]
        },
        {
            path: '/forgetpwd',
            component: Forgetpwd
        },
        {
            path: '/',
            redirect: {
                name: 'login'
            }
        },
        {
            path: '*',
            component: Login
        },
        
    ]
}