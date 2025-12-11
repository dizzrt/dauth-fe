import type { RouteRecordRaw } from 'vue-router';

const SPRoutes: RouteRecordRaw[] = [
  {
    path: '/sp',
    meta: {},
    children: [
      {
        path: 'list',
        name: 'sp-list',
        component: () => import('@/views/sp/SPListPage.vue'),
        meta: {},
      },
    ],
  },
];

export default SPRoutes;
