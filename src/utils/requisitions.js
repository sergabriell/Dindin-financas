import api from "../services/api";
import { getItem } from "./localStorage";
import { notifyError } from "./toast";

const token = getItem('token');

export async function requisitionGet(path) {
    try {
        const response = await api.get(`${path}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error) {
        return notifyError(error.response.data);
    }
}

export async function requisitionPost(path, data) {
    try {
        const response = await api.post(`${path}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response;
    } catch (error) {
        return notifyError(error.response.data);
    }
}