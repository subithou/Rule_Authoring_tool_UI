import axios from 'axios';

import BASE_URL from 'API/BASE_URL';

export const createVariables = async (name) => {
    try {
        const response = await axios.post(`${BASE_URL}/postenums`, name);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const getVariables= async (packageid) => {
    try {
        const response = await axios.get(`${BASE_URL}/getenums/${packageid}`);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const deleteVariables = async (packageid,enumid) => {
    try {
        
        const response = await axios.delete(`${BASE_URL}/deleteenums/${packageid}/${enumid}`);
        return response;

    } catch (error) {
        throw error;
    }
}

export const updateVariables = async (data) => {
    try {
        const response = await axios.put(`${BASE_URL}/updatepackage`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}