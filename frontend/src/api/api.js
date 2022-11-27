import axios from "axios";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000'
});


export const flatAPI = {
    addParameters(address, area, floor, floorNum, houseType, countOfRooms, latitude, longitude, repair, district) {
        console.log(longitude)
        console.log(repair)
        console.log(district)
        return instance.post(`/info`, {address, area, floor, floorNum, houseType, countOfRooms, latitude, longitude, repair, district})
    },


    getFlatInfo() {
        return instance.get(`/info`)
    },

    checkAddress(address) {
        return instance.post(`/address`, {address})
    },
}


export const advertisementAPI = {
    getAdvertisementInfo() {
        return instance.get(`/advertisements`)
    },
}