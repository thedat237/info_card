import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

// const addJwt = () => {
//     axiosInstance.interceptors.request.use((config) => {
//         return {
//             ...config.headers,
//             // Authorization: `Bearer ${jwt}`,
//         }
//     })
// }

// export {addJwt}

export default axiosInstance