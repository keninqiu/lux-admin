import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '基本表',
    icon: 'lock-outline',
    children: [
      {
        title: '国家/地区',
        link: 'basic/countries',
      },
      {
        title: '州/省',
        link: 'basic/states',
      },
      {
        title: '城市',
        link: 'basic/cities',
      },
      {
        title: '类别',
        link: 'basic/categories',
      },
      {
        title: '职位',
        link: 'basic/jobs',
      },
      {
        title: '学校',
        link: 'basic/schools',
      },
      {
        title: '公司',
        link: 'basic/employers',
      },
      {
        title: '学位',
        link: 'basic/degrees',
      },
      {
        title: '行业',
        link: 'basic/industries',
      },
      {
        title: '证书',
        link: 'basic/certifications',
      },
      {
        title: '技能',
        link: 'basic/skills',
      },
    ]
  }
  /*
  {
    title: 'BASIC',
    group: true,
  },

  
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  */
];
