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
          _authentication: 'ROLE_ADMIN'
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
          _name: 'CSidebarNavItem',
          name: 'User',
          to: '/user/viewuser',
          icon: 'cilUser',
          _authentication: 'ROLE_ADMIN'
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'Device',
          to: '/device',
          icon: 'cilDevices',
          _authentication: 'ROLE_ADMIN',
          items: [
            {
              name: 'Add Device',
              to: '/device/addDevice'
            },
            {
              name: 'View Device',
              to: '/device/viewDevice'
            },
            {
              name: 'Associate Device',
              to: '/device/associateDevice'
            }
            
          ]
        },
        {
          _name: 'CSidebarNavDropdown',
          name: 'pet',
          to: '/pet',
          icon: 'cilLocationPin',
          _authentication: 'ROLE_ADMIN',
          items: [
            {
              name: 'Add Pet',
              to: '/pet/addpet'
            },
            {
              name: 'View Pet',
              to: '/pet/viewPet'
            },
            {
              name: 'Associate Pet',
              to: '/pet/associatePet'
            }
          ]
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Route Replay',
          to: '/history',
          fontIcon: 'fas fa-route',
          _authentication: 'ROLE_ADMIN'
        },
        {
          _name: 'CSidebarNavItem',
          name: 'Report',
          to: '/report',
          fontIcon: 'fas fa-chart-bar',
          _authentication: 'ROLE_ADMIN'
        },
      ]
    }
  ]