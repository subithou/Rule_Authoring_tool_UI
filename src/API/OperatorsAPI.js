import axios from 'axios';
import BASE_URL from 'API/BASE_URL';

export const getOperators = async (packageid) => {
    try {
        const response = await axios.get(`${BASE_URL}/getoperators/${packageid}`);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const createOperators = async (item) => {
    try {
        const response = await axios.post(`${BASE_URL}/createoperators`, item);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const addOperators = async (item) => {
    try {
        const response = await axios.put(`${BASE_URL}/addoperator`, item);
        return response.data;

    } catch (error) {
        throw error;
    }
}


export const deleteOperators = async (packageid,operatorid) => {
    try {
        
        const response = await axios.delete(`${BASE_URL}/deleteoperator/${packageid}/${operatorid}`);
        return response;

    } catch (error) {
        throw error;
    }
}



