import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4ae64f82 = () => interopDefault(import('../pages/alarm.vue' /* webpackChunkName: "pages/alarm" */))
const _2e317a9e = () => interopDefault(import('../pages/favorite.vue' /* webpackChunkName: "pages/favorite" */))
const _f0b1ea18 = () => interopDefault(import('../pages/note.vue' /* webpackChunkName: "pages/note" */))
const _5687eca2 = () => interopDefault(import('../pages/post.vue' /* webpackChunkName: "pages/post" */))
const _9faa43d2 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _5fe14932 = () => interopDefault(import('../pages/searchResult.vue' /* webpackChunkName: "pages/searchResult" */))
const _38ed2e27 = () => interopDefault(import('../pages/user/login.vue' /* webpackChunkName: "pages/user/login" */))
const _54dd4380 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _7221decc = () => interopDefault(import('../pages/noteRoom/_room.vue' /* webpackChunkName: "pages/noteRoom/_room" */))
const _199d4dec = () => interopDefault(import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/alarm",
    component: _4ae64f82,
    name: "alarm"
  }, {
    path: "/favorite",
    component: _2e317a9e,
    name: "favorite"
  }, {
    path: "/note",
    component: _f0b1ea18,
    name: "note"
  }, {
    path: "/post",
    component: _5687eca2,
    name: "post"
  }, {
    path: "/profile",
    component: _9faa43d2,
    name: "profile"
  }, {
    path: "/searchResult",
    component: _5fe14932,
    name: "searchResult"
  }, {
    path: "/user/login",
    component: _38ed2e27,
    name: "user-login"
  }, {
    path: "/",
    component: _54dd4380,
    name: "index"
  }, {
    path: "/noteRoom/:room?",
    component: _7221decc,
    name: "noteRoom-room"
  }, {
    path: "/posts/:id?",
    component: _199d4dec,
    name: "posts-id"
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
