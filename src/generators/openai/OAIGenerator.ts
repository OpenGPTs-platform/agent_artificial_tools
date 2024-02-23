import { Generator } from "../Generator.dt";
import OpenAI from "openai";
import * as dotenv from 'dotenv';
import { HTTPClient } from '../HTTPClient';
import { ChatCompletionContentPartImage, ChatCompletionFunctionMessageParam, ChatCompletionMessageParam, ChatCompletionMessage, ChatCompletionUserMessageParam } from 'openai/resources';
import { OAIRequest, OAIMessage } from "./OAIRequest.dt";

dotenv.config();

export class OAIGenerator extends Generator {
    prompt: string;
    systemPrompt: string;
    api_key?: string;
    url: string;
    openai: OpenAI;
    fullResponse: [OAIMessage];
    httpClient: HTTPClient;
    contextWindow: OAIMessage[]
    temperature: number
    max_tokens: number
    top_p: number
    frequency_penalty: number
    presence_penalty: number
    constructor(url: string = "https://api.openai.com/v1/chat/completions") {
        super();
        this.prompt = "";
        this.systemPrompt = '';
        this.api_key = process.env.OPENAI_API_KEY;
        this.url = url
        this.openai = new OpenAI({ apiKey: this.api_key, baseURL: this.url });
        this.fullResponse = [new OAIMessage("system", this.systemPrompt)];
        this.httpClient = new HTTPClient(this.model, 'POST', this.url);
        this.contextWindow = [];
        this.temperature = 0.2
        this.max_tokens = 32000
        this.top_p = 1
        this.frequency_penalty = 0
        this.presence_penalty = 0
    }

    setPrompt(prompt: string) {
        this.prompt = prompt
        const message = new OAIMessage('user', prompt)
        this.contextWindow.push(message)
        return message
    }

    setSystemPrompt(prompt: string) {
        this.systemPrompt = prompt
        return this.systemPrompt
    }

    setModel(model: string) {
        this.model = model
    }

    setTemperature(temperature: number) {
        this.temperature = temperature
    }

    setMaxTokens(max_tokens: number) {
        this.max_tokens = max_tokens
    }

    setTopP(top_p: number) {
        this.top_p = top_p
    }

    setFrequencyPenalty(frequency_penalty: number) {
        this.frequency_penalty = frequency_penalty
    }

    setPresencePenalty(presence_penalty: number) {
        this.presence_penalty = presence_penalty
    }

    constructMessageParam(role: "function" | "system" | "user" | "assistant" | "tool", content: string, name?: string) {
        const message = {
            role: role,
            content: content,
            name: name ? name : ""
        }
        return message
    }

    sendRequest(request: OAIRequest) {
        const response = this.openai.chat.completions.create(request, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.api_key}`
            }
        })
        return response
    }


    constructFullPrompt(model: string = "ollama-mixtral", temperature: number = 0.7, max_tokens: number = 256, top_p: number = 1, frequency_penalty: number = 0, presence_penalty: number = 0) {
        const messages = [this.constructMessage("system", this.systemPrompt), ...this.contextWindow, this.constructMessage("user", this.prompt)];
        return {
            model: model,
            messages: messages,
            temperature: temperature,
            max_tokens: max_tokens,
            top_p: top_p,
            frequency_penalty: frequency_penalty,
            presence_penalty: presence_penalty
        }

    }
}