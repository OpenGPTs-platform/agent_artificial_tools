import { Generator } from '../Generator.dt';
import { HTTPClient } from '../HTTPClient';
import * as os from "os";

export class OllamaRequestGenerator extends Generator {
    prompt: string;
    systemPrompt: string;
    contextWindow: [];
    url: string;
    fullResponse: any[];
    http: HTTPClient
    method: string;

    constructor() {
        super();
        this.prompt = '';
        this.method = 'POST';
        this.systemPrompt = '';
        this.contextWindow = [];
        this.url = "https://mistral-agentartificial.ngrok.app/api/generate";
        this.fullResponse = [];
        this.http = new HTTPClient(this.model, this.method, this.url);
    }
    makeRequest(prompt: string) {
        return this.http.makeRequest(prompt)
    }

    constructFullPrompt(prompt: string, model: string = "ollama-mistral", temperature: number = 0.7, max_tokens: number = 256, top_p: number = 1, frequency_penalty: number = 0, presence_penalty: number = 0) {
        this.constructMessage("user", prompt)
        let messages = ""
        for (let i of this.contextWindow) {
            messages += `${i["role"] + ": " + i["content"] + os.EOL}`
        }
        return {
            model: model,
            prompt: messages,
        }
    }

}
