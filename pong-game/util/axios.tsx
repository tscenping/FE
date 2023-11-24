import axios from 'axios'
import https from 'https'
import { NextRouter, useRouter } from 'next/router'

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT

const instance = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

instance.interceptors.request.use(
  function setConfig(parameter) {
    parameter.headers['Content-Type'] = 'application/json'
    parameter.withCredentials = true
    // parameter.headers['Authorization'] = `Bearer ${localStorage.getItem('tscenping-token')}`
    return parameter
  },
  function getError(error) {
    return Promise.reject(error)
  },
)

// 여기는 응답
instance.interceptors.response.use(
  function handleResponse(response) {
    return response
  },
  function handleError(error) {
    const router: NextRouter = useRouter()
    if (error.response && error.response.status === 401) {
      // window.location.href = '/login'
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export { instance }
