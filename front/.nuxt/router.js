import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c92fa826 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _c85093f8 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _4bf20891 = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _3357acd4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _c92fa826,
    name: "profile"
  }, {
    path: "/signup",
    component: _c85093f8,
    name: "signup"
  }, {
    path: "/user/login",
    component: _4bf20891,
    name: "user-login"
  }, {
    path: "/",
    component: _3357acd4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
