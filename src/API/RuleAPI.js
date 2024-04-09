import axios from 'axios';
import BASE_URL from 'API/BASE_URL';

export const createLinearRule = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/addrules`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const getLinearRule= async (packageid) => {
    try {
        const response = await axios.get(`${BASE_URL}/getrules/${packageid}`);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const updateLinearRule = async (data) => {
    try {
        const response = await axios.put(`${BASE_URL}/updaterule`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}