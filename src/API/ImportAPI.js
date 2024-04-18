import axios from 'axios';
import BASE_URL from 'API/BASE_URL';

export const uploadFile = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/uploadxml`, data);
        return response.data;

    } catch (error) {
        throw error;
    }
}