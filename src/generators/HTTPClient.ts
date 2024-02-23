import axios from "axios";

export class HTTPClient {
    private client
    options: any

    constructor(model: string, method: string, url: string) {
        this.options = {
            method: method,
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: { model: model, prompt: prompt, stream: false },
        }
        this.client = axios.request
    }
    setOptions(method: string, url: string, headers: { 'Content-Type': 'application/json' }, data: { model: string, prompt: string, stream: boolean }) {
        this.options.method = method
        this.options.url = url
        this.options.headers = headers
        this.options.data = data
    }
    async makeRequest(prompt: any) {
        this.options.data = prompt
        return await this.client(this.options)
    };
}
