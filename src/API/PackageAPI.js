import axios from 'axios';
import BASE_URL from 'API/BASE_URL';
// const BASE_URL = 'http://localhost:3001';

export const createPackage = async (name) => {
    try {
        const response = await axios.post(`${BASE_URL}/createpackage`, name);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const getpackages= async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getpackages`);
        return response.data.data;

    } catch (error) {
        throw error;
    }
}

export const deletePackage = async (packageid) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deletepackage/${packageid}`);
        return response;

    } catch (error) {
        throw error;
    }
}

export const updatePackage = async (data) => {
    try {
        const response = await axios.put(`${BASE_URL}/updatepackage`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}