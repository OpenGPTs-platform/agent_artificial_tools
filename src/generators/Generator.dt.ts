import { GenericList } from '../types.dt';
import { OAIRequest } from './openai/OAIRequest.dt';
import { HTTPClient } from './HTTPClient';

export class Generator {
    model: string
    prompt: string
    systemPrompt: string
    message: {}
    contextWindow: any[]
    url: string

    constructor() {
        this.model = ""
        this.prompt = ""
        this.systemPrompt = ""
        this.contextWindow = []
        this.message = {}
        this.url = 'https://api.openai.com/v1/chat/completions'

    }
    constructMessage(role: string, content: string, name?: string) {
        const message = {
            role: role,
            content: content,
            name: name ? name : ""
        }
        this.message = message
        this.contextWindow.push(message)
        return this.message
    }
    setPrompt(prompt: string, role: any, name?: string) {
        this.prompt = prompt
        const message = this.constructMessage(role, prompt, name)
        this.contextWindow.push(message)
        return message
    }
    setSystemPrompt(prompt: string) {
        this.systemPrompt = prompt
        const message = this.constructMessage("system", prompt)
        this.contextWindow.push(message)
        return message

    }
    setModel(model: string) {
        this.model = model
    }
    getContextWindow() {
        return this.contextWindow
    }
    getPrompt() {
        return this.prompt
    }
    getSystemPrompt() {
        return this.systemPrompt
    }

}

export class GeneratorList extends GenericList<Generator> {
    constructor(generators: Generator[]) {
        super();
        this.setItems(...generators);
    }
}

