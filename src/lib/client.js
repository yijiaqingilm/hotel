import Vue from 'vue'
import { getToken } from 'lib/common'
import { app } from 'src/main.js'

const methods = ['get', 'post', 'put', 'del', 'patch']
export default class ApiClient {
  constructor () {
    methods.forEach((method) => {
      this[method] = (url, params = {}, {global = true, isManager = false} = {}) => new Promise((resolve, reject) => {
        if (!url) {
          reject({_error: '错误的请求地址'})
        }
        const token = getToken()
        Vue.http.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJvcGVuSWQiOiJ3aWxsaWFtc3VpbWFjcGMyIiwic2hvcElkIjoxMDA2LCJpbWJDb2RlIjoiMDAwMDIyNTE4ODkiLCJpYXQiOjE1MjQyNzgxODMsImV4cCI6MTUyNDM2NDU4M30.TP7JK1a2Ydb080KXppAYwFQea-K4b0sgge0HtvB1ptk'
        if (token) {
          Vue.http.headers.common['Authorization'] = `Bearer ${token}`
        }
        Vue.http({
          method: method,
          url: serverUrl + url,
          [method === 'get' ? 'params' : 'body']: params,
          global: global
        }).then((response) => {
          resolve(response.body)
        }).catch((error) => {
          reject(error)
        })
      })
    })
  }
}

