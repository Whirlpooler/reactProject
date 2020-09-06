import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') {
        let strData = ''
        Object.keys(data).forEach(key => {
            strData += `${key}=${data[key]}&`
        })
        if (strData) {
            url = url + '?' + strData.substring(0, strData.length - 1)
        }
        return axios.get(url)
    } else {
        return axios.post(url, data)
    }
}