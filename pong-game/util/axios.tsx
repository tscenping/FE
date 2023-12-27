import axios from 'axios'
import https from 'https'

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
    // const { modalName } = useModalState()
    // const { setResponseModalState }= useResponseModalState()
    // const router: NextRouter = useRouter()
    if (error.response && error.response.status === 400) {
      alert(error.response.data.message)
      console.log(error.response.data.message)
      // setResponseModalState('에러', error.response.data.message, null)
      // setModalName('response')
      // store.dispatch('setResponseModalState', {

      // window.location.href = '/login'
      // router.push('/login')
    } else if (error.response && error.response.status === 404) {
      alert('잘못된 요청입니다.')
    } else if (error.response && error.response.status === 401) {
      // window.location.href = 'https://localhost:8001/login'
    }
    return Promise.reject(error)
  },
)

export { instance }
