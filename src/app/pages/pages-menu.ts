import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: '基础数据',
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
  },
  {
    title: '翻译',
    icon: 'lock-outline',
    children: [
      {
        title: '国家/地区',
        link: 'translate/translates/Country',
      },
      {
        title: '州/省',
        link: 'translate/translates/State',
      },
      {
        title: '城市',
        link: 'translate/translates/City',
      },
      {
        title: '类别',
        link: 'translate/translates/Category',
      },
      {
        title: '职位',
        link: 'translate/translates/Job',
      },
      {
        title: '学校',
        link: 'translate/translates/School',
      },
      {
        title: '公司',
        link: 'translate/translates/Employer',
      },
      {
        title: '学位',
        link: 'translate/translates/Degree',
      },
      {
        title: '行业',
        link: 'translate/translates/Industry',
      },
      {
        title: '证书',
        link: 'translate/translates/Certification',
      },
      {
        title: '技能',
        link: 'translate/translates/Skill',
      }
    ]
  },
  {
    title: '主页模版',
    icon: 'lock-outline',
    children: [
      {
        title: '公告',
        link: 'homepage/adv/add',
      },
      {
        title: '轮播广告',
        link: 'homepage/carousels',
      },
      {
        title: '改变',
        link: 'homepage/change/add',
      },
    ]
  }
];
