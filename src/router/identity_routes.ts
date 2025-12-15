import type { RouteRecordRaw } from 'vue-router';

const userRoutes: RouteRecordRaw[] = [
  {
    path: 'user',
    meta: {},
    children: [],
  },
];

const IdentityRoutes: RouteRecordRaw[] = [
  {
    path: 'identity',
    meta: {},
    children: [...userRoutes],
  },
];

export default IdentityRoutes;
