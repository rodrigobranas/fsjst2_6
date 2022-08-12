export default interface AuthService {
	login (username: string, password: string): Promise<any>;
}
