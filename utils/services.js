import axios from 'axios';

export const apicall = (method, url, data, params, cb) => {
    axios({
        method: method,
        url: `http://localhost:8000/${url}`,
        data: data,
        params: params
    })
        .then(function (response) {
            cb(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
}