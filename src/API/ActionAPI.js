import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const createActiontable = async (item) => {
    try {
        const response = await axios.post(`${BASE_URL}/createactiontable`, item);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const getActionTable = async (packageid) => {
    try {
        const response = await axios.get(`${BASE_URL}/gettableactions/${packageid}`);
        return response.data;

    } catch (error) {
        throw error;
    }
}


export const createActionsAPi= async (item) => {
    try {
        const response = await axios.post(`${BASE_URL}/postactions`, item);
        return response.data;

    } catch (error) {
        throw error;
    }
}

export const deleteActions = async (packageid,actiontableid,actionid) => {
    try {
        
        const response = await axios.delete(`${BASE_URL}/deleteactions/${packageid}/${actiontableid}/${actionid}`);
        return response;

    } catch (error) {
        throw error;
    }
}
