export default
  [
    {
      _name: 'CSidebarNav',
      _children: [
        {
          _name: 'CSidebarNavItem',
          name: 'Dashboard',
          to: '/dashboard',
          icon: 'cil-speedometer',
          _authentication: 'ROLE_USER'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Dashboard',
          to: '/dashboard',
          icon: 'cil-speedometer',
          _authentication: 'ROLE_SUPERADMIN'
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Manage Organization',
          //route: '/base',
          icon: 'cilLayers',
          _authentication: 'ROLE_SUPERADMIN',
          items: [

            {
              name: 'Add Organization',
              to: '/base/addorganization'
            },
            {
              name: 'View Organization',
              to: '/base/viewOrganization'
            },
            {
              name: 'My Organization',
              to: '/base/myOrganization'
            },
          ]
        },
        {
          _name: 'CSidebarNavItem',
          name: 'My Organization',
          to: '/base/myOrganization',
          icon: 'cilLayers',
          _authentication: 'ROLE_ADMIN',
        },
        // {
        //   _name: 'CSidebarNavItem',
        //   name: 'Map',
        //   to: '/mydepartment',
        //   icon: 'cilLocationPin',
        //   _authentication: 'ROLE_USER'
        // },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Devices',
          route: '/base2',
          icon: 'cilDevices',
          _authentication: 'ROLE_USER',
          items: [
            {
              name: 'Add Device',
              to: '/base/device/addDevice'
            },
            {
              name: 'View Devices',
              to: '/base/device/viewDevice'
            }
          ]
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Devices',
          route: '/base2',
          icon: 'cilDevices',
          _authentication: 'ROLE_SUPERADMIN',
          items: [
            {
              name: 'Add Device',
              to: '/base/device/addDevice'
            },
            {
              name: 'View Devices',
              to: '/base/device/viewDevice'
            }
          ]
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Vehicles',
          to: '/myorganization',
          icon: 'cilTruck',
          _authentication: 'ROLE_USER',
          items: [
            {
              name: 'Add Vehicle',
              to: '/base/vehicles/addVehicle'
            },
            {
              name: 'View Vehicles',
              to: '/base/vehicles/viewVehicle'
            },
            // {
            //   name: 'Edit Vehicles',
            //   to: '/base/vehicles/editVehicle'
            // },
            {
              name: 'Associate Vehicles',
              to: '/base/vehicles/associateVehicle'
            }
            
          ]
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Vehicles',
          to: '/myorganization',
          icon: 'cilTruck',
          _authentication: 'ROLE_SUPERADMIN',
          items: [
            {
              name: 'Add Vehicle',
              to: '/base/vehicles/addVehicle'
            },
            {
              name: 'View Vehicles',
              to: '/base/vehicles/viewVehicle'
            },
            // {
            //   name: 'Edit Vehicles',
            //   to: '/base/vehicles/editVehicle'
            // },
            {
              name: 'Associate Vehicles',
              to: '/base/vehicles/associateVehicle'
            }
            
          ]
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Drivers',
          to: '/myorganization',
          icon: 'cilBike',
          _authentication: 'ROLE_USER',
          items: [
            {
              name: 'Add Driver',
              to: '/base/driver/addDriver'
            },
            {
              name: 'View Drivers',
              to: '/base/driver/viewDriver'
            },
            {
              name: 'Associate Drivers',
              to: '/base/driver/associateDriver'
            }
            
          ]
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Drivers',
          to: '/myorganization',
          icon: 'cilBike',
          _authentication: 'ROLE_SUPERADMIN',
          items: [
            {
              name: 'Add Driver',
              to: '/base/driver/addDriver'
            },
            {
              name: 'View Drivers',
              to: '/base/driver/viewDriver'
            },
            {
              name: 'Associate Drivers',
              to: '/base/driver/associateDriver'
            }
            
          ]
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Route Replay',
          to: '/base/history',
          fontIcon: 'fas fa-route',
          _authentication: 'ROLE_USER'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Route Replay',
          to: '/base/history',
          fontIcon: 'fas fa-route',
          _authentication: 'ROLE_SUPERADMIN'
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Manage User',
          route: '/base2',
          icon: 'cilUser',
          _authentication: 'ROLE_ADMIN',
          items: [
            {
              name: 'Add User',
              to: '/base/user/addUser'
            },
            {
              name: 'View Users',
              to: '/base/user/viewUser'
            }
          ]
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Manage User',
          route: '/base2',
          icon: 'cilUser',
          _authentication: 'ROLE_SUPERADMIN',
          items: [
            {
              name: 'Add User',
              to: '/base/user/addUser'
            },
            {
              name: 'View Users',
              to: '/base/user/viewUser'
            }
          ]
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Report',
          to: '/base/report',
          fontIcon: 'fas fa-chart-bar',
          _authentication: 'ROLE_USER'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Report',
          to: '/base/report',
          fontIcon: 'fas fa-chart-bar',
          _authentication: 'ROLE_SUPERADMIN'
        },
        // {
        //   _name: 'CSidebarNavItem',
        //   name: 'Manage Trip',
        //   to: '/base/trip',
        //   fontIcon: 'fas fa-chart-bar',
        //   _authentication: 'ROLE_USER'
        // },
        
      ]
    }
  ]
