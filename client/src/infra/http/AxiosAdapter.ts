import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdapter implements HttpClient {

	constructor (router: any) {
		axios.interceptors.request.use((config: any) => {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
			return config;
		});
		axios.interceptors.response.use((response) => {
			return response;
		}, (error) => {
			if (error.response.status === 401) {
				localStorage.removeItem("token");
				router.push("/login");
			}
			return Promise.reject(error);
		});
	}

	async get(url: string): Promise<any> {
		const response = await axios({
			url,
			method: "get"
		});
		return response.data;
	}

	async post(url: string, data: any): Promise<any> {
		const response = await axios({
			url,
			method: "post",
			data
		});
		return response.data;
	}

	async put(url: string, data: any): Promise<any> {
		const response = await axios({
			url,
			method: "put",
			data
		});
		return response.data;
	}

	async delete(url: string): Promise<any> {
		const response = await axios({
			url,
			method: "delete"
		});
		return response.data;
	}

}