export default interface  Http {
	route (method: string, url: string, callback: Function): void;
	listen (port: number): void;
}
