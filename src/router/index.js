import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/service',
    component: Layout,
    redirect: '/service/education',
    name: 'Example',
    meta: { title: '热点服务', icon: 'example' },
    children: [
      {
        path: 'education',
        name: 'Education',
        component: () => import('@/views/education/index'),
        meta: { title: '教育服务', icon: 'table' }
      },
      {
        path: 'traffic',
        name: 'Traffic',
        component: () => import('@/views/traffic/index'),
        meta: { title: '交通服务', icon: 'tree' }
      },
      {
        path: 'security',
        name: 'Security',
        component: () => import('@/views/tree/index'),
        meta: { title: '社保服务', icon: 'tree' }
      }
    ]
  },
  {
    path: '/people',
    component: Layout,
    redirect: '/people/poor',
    name: 'Example',
    meta: { title: '底线民生', icon: 'example' },
    children: [
      {
        path: 'poor',
        name: 'Poor',
        component: () => import('@/views/poorFamily/index'),
        meta: { title: '困难家庭', icon: 'table' }
      },
      {
        path: 'graduate',
        name: 'Graduate',
        component: () => import('@/views/graduate/index'),
        meta: { title: '毕业生', icon: 'tree' }
      },
      {
        path: 'disability',
        name: 'Disability',
        component: () => import('@/views/disability/index'),
        meta: { title: '残疾人士', icon: 'tree' }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    redirect: '/chat/customer',
    name: 'Chat',
    meta: { title: '互动中心', icon: 'example' },
    children: [
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/views/table/index'),
        meta: { title: '客服中心', icon: 'table' }
      },
      {
        path: 'complain',
        name: 'Complain',
        component: () => import('@/views/tree/index'),
        meta: { title: '投诉中心', icon: 'tree' }
      }
    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/table',
    name: 'Info',
    meta: { title: '信息发布', icon: 'example' },
    children: [
      {
        path: 'guide',
        name: 'Guide',
        component: () => import('@/views/table/index'),
        meta: { title: '办事指南', icon: 'table' }
      },
      {
        path: 'government',
        name: 'Government',
        component: () => import('@/views/tree/index'),
        meta: { title: '政务公开', icon: 'tree' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'other',
        name: 'Other',
        component: () => import('@/views/tree/index'),
        meta: { title: '其他设置', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
