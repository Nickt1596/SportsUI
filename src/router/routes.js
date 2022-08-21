
const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Public/Home.vue')
      },
      {
        path: 'home',
        name: 'PublicHome',
        component: () => import('pages/Public/Home.vue')
      },
      {
        path: 'find-events',
        name: 'PublicFindEvents',
        component: () => import('pages/Public/FindEvents.vue')
      },
      {
        path: 'find-leagues',
        name: 'PublicFindLeagues',
        component: () => import('pages/Public/FindLeagues.vue')
      },
      {
        path: 'create-league',
        name: 'PublicCreateLeague',
        component: () => import('pages/Public/CreateLeague.vue')
      },
    ]
  },

  {
    path: '/account',
    component: () => import('layouts/AccountLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'AccountLogin',
        component: () => import('pages/Account/Login.vue')
      },
      {
        path: 'register',
        name: 'AccountRegister',
        component: () => import('pages/Account/Register.vue')
      },
      {
        path: 'verify/:key',
        name: 'AccountVerify',
        component: () => import('pages/Account/Verify.vue')
      },
      {
        path: 'invite/:id/:type?',
        name: 'AccountInvite',
        component: () => import('pages/Account/Invite.vue')
      },
      {
        path: 'reset-password/:uid?/:token?',
        name: 'AccountResetPassword',
        component: () => import('pages/Account/ResetPassword.vue')
      },
    ]
  },

  {
    path: '/organization',
    component: () => import('layouts/PortalLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/OrganizationPortal/Home.vue')
      },
      {
        path: 'home',
        name: 'OrganizationHome',
        component: () => import('pages/OrganizationPortal/Home.vue')
      },
      {
        path: 'competition',
        name: 'OrganizationCompetition',
        component: () => import('pages/OrganizationPortal/Competition.vue')
      },
      {
        path: 'financials',
        name: 'OrganizationFinancials',
        component: () => import('pages/OrganizationPortal/Financials.vue')
      },
      {
        path: 'members',
        name: 'OrganizationMembers',
        component: () => import('pages/OrganizationPortal/Members.vue')
      },
      {
        path: 'promotion',
        name: 'OrganizationPromotion',
        component: () => import('pages/OrganizationPortal/Promotion.vue')
      },
      {
        path: 'registrations',
        name: 'OrganizationRegistration',
        component: () => import('pages/OrganizationPortal/Registration.vue')
      },
      {
        path: 'safety',
        name: 'OrganizationSafety',
        component: () => import('pages/OrganizationPortal/Safety.vue')
      },
      {
        path: 'settings',
        name: 'OrganizationSettings',
        component: () => import('pages/OrganizationPortal/Settings.vue')
      },
      {
        path: 'website',
        name: 'OrganizationWebsite',
        component: () => import('pages/OrganizationPortal/Website.vue')
      },
    ]
  },

  {
    path: '/user',
    component: () => import('layouts/PortalLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/UserPortal/Home.vue')
      },
      {
        path: 'home',
        name: 'UserHome',
        component: () => import('pages/UserPortal/Home.vue')
      },
      {
        path: 'bills',
        name: 'UserBills',
        component: () => import('pages/UserPortal/Bills.vue')
      },
      {
        path: 'family',
        name: 'UserFamily',
        component: () => import('pages/UserPortal/Family.vue')
      },
      {
        path: 'registrations',
        name: 'UserRegistrations',
        component: () => import('pages/UserPortal/Registrations.vue')
      },
      {
        path: 'schedule',
        name: 'UserSchedule',
        component: () => import('pages/UserPortal/Schedule.vue')
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: () => import('pages/UserPortal/Settings.vue')
      },
      {
        path: 'teams',
        name: 'UserTeams',
        component: () => import('pages/UserPortal/Teams.vue')
      },
    ]
  },

  // {
  //   path: '/user',
  //   component: () => import('layouts/UserLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('pages/User/UserIndex.vue')
  //     },
  //     {
  //       path: 'home',
  //       name: 'UserHome',
  //       component: () => import('pages/User/UserHome.vue')
  //     },
  //     {
  //       path: 'inbox',
  //       component: () => import('pages/User/UserInbox.vue')
  //     },
  //     {
  //       path: 'account',
  //       component: () => import('pages/User/UserAccount.vue')
  //     },
  //     {
  //       path: 'season-management',
  //       name: 'season-management',
  //       component: () => import('pages/User/SeasonManagement.vue'),
  //     },
  //     {
  //       path: "season/:id/:tab",
  //       name: "season",
  //       component: () => import("pages/User/SeasonPage.vue"),
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Shared/ErrorNotFound.vue')
  }
]

export default routes
