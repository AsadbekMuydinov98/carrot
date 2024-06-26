import axios, { AxiosRequestConfig } from 'axios';

const apiUrl = 'http://localhost:5000/products';

export const multipleFilesUpload = async (data: any, options: AxiosRequestConfig<any> | undefined) => {
    try {
        await axios.post(apiUrl, data, options);
    } catch (error) {
        throw error;
    }
}

export const getMultipleFiles = async () => {
    try{
        const {data} = await axios.get(apiUrl);
        return data;
    }catch(error){
        throw error;
    }
}