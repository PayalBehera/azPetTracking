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
        // {
        //   _name: 'CSidebarNavItem',
        //   name: 'My Organization',
        //   to: '/base/myOrganization',
        //   icon: 'cilLayers',
        //   _authentication: 'ROLE_USER',
        // },
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
          name: 'Customer',
          to: '/myorganization',
          icon: 'cilUser',
          _authentication: 'ROLE_USER',
          items: [
            {
              name: 'Add Customer',
              to: '/base/vehicles/addVehicle'
            },
            {
              name: 'View Customer',
              to: '/base/vehicles/viewVehicle'
            },
            {
              name: 'Associate Customer',
              to: '/base/vehicles/associateVehicle'
            }
            
          ]
        },
        
      ]
    }
  ]