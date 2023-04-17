// TODO Refactor before publish
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { inject } from 'vue'

const AUTH_KEY = '$auth'
const ERROR_MESSAGE = 'Only client side supported'

export function useAuth() {
  return inject(AUTH_KEY)
}

export default function (app, router) {
  const isBrowser = typeof window !== 'undefined'

  function isLoggedIn() {
    if (!isBrowser) {
      return
    }

    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      const { exp } = jwt_decode(accessToken)
      return exp * 1000 > Date.now()
    }

    return false
  }

  router.beforeEach((to) => {
    if (to.meta.requiresAuth && !isLoggedIn() && to.name !== 'login') {
      return {
        name: 'login',
        query: { redirect: to.fullPath }
      }
    }
    if (isLoggedIn() && (to.name === 'login' || to.name === 'register')) {
      return { name: 'home' }
    }
  })

  app.provide(AUTH_KEY, {
    login(payload) {
      if (!isBrowser) {
        throw new Error(ERROR_MESSAGE)
      }

      return axios
        .post('/api/login', payload)
        .then(({ data }) => data)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.msg)
          }

          localStorage.setItem('accessToken', resp.accessToken)
          localStorage.setItem('refreshToken', resp.refreshToken)
          return resp
        })
    },
    logout() {
      if (!isBrowser) {
        throw new Error(ERROR_MESSAGE)
      }

      return axios
        .post('/api/logout', {
          refreshToken: localStorage.getItem('refreshToken')
        })
        .then(({ data }) => data)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.msg)
          }

          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          return resp
        })
    },
    register(payload) {
      return axios
        .post('/api/register', payload)
        .then(({ data }) => data)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.msg)
          }
          return resp
        })
    },
    sendConfirmCode(payload) {
      return axios
        .post('/api/sendConfirmCode', payload)
        .then(({ data }) => data)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(resp.msg)
          }
          return 111111
        })
    }
  })
}
