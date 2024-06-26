import toast from "react-hot-toast";
import axios from "./axios";

export const addBookFn = async (name, description, publishDate, price) => {
    try {
        const response = await axios.post(`/`, {
            name,
            description,
            publishDate,
            price,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};
export const allBookFn = async (search = null, page = 1, limit = 10) => {
    try {
        let url = `/?page=${page}&limit=${limit}`;
        if (search) {
            url += `&search=${search}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};

export const deleteBookFn = async (id) => {
    try {
        const response = await axios.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};
export const oneBookDetailsFn = async (id) => {
    try {
        const response = await axios.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};

export const editBookFn = async (id, name, description, publishDate, price) => {
    try {
        const response = await axios.patch(`/${id}`, {
            name,
            description,
            publishDate,
            price,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error(
            error?.response?.data?.message || error?.message || "Unknown error"
        );
    }
};
