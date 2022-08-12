import HttpClient from "../infra/http/HttpClient";
import AuthService from "./AuthService";

export default class AuthServiceHttp implements AuthService {

	constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {
	}

	async login(username: string, password: string): Promise<any> {
		const session = await this.httpClient.post(`${this.baseUrl}/login`, { username, password });
		return session;
	}
	
}
