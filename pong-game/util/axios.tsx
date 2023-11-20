import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT

const instance = axios.create({ baseURL })

instance.interceptors.request.use(
  function setConfig(parameter) {
    parameter.headers['Content-Type'] = 'application/json'
    // parameter.headers['Authorization'] = `Bearer ${localStorage.getItem('tscenping-token')}`
    return parameter
  },
  function getError(error) {
    return Promise.reject(error)
  },
)
// 여기는 응답
// instance.interceptors.response.use(
//   function handleResponse(response) {
//     return response;
//   },
//   function handleError(error) {

//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('42ence-token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export { instance }
