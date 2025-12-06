import type { RouteRecordRaw } from 'vue-router';

const ClientRoutes: RouteRecordRaw[] = [
  {
    path: '/client',
    meta: {},
    children: [
      {
        path: 'list',
        name: 'client-list',
        component: () => import('@/views/client/ClientListPage.vue'),
        meta: {},
      },
    ],
  },
];

export default ClientRoutes;
