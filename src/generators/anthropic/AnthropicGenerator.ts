import * as dotenv from "dotenv";
import { HTTPClient } from "../HTTPClient";
import { AnthropicPromptTemplate } from "./AnthropicPromptTemplate";
import { DataGeneratorPromptList } from '../../prompts/prompts/DataSetGeneratorPrompts';
import { Generator } from "../Generator.dt";
import type { OAIMessage } from "../openai/OAIRequest.dt";

console.info("Initializing Anthropic");

// load environment variables
dotenv.config();

export class AnthropicGenerator extends Generator {
    apiKey: string;
    completePrompt: string;
    model: string;
    context: OAIMessage[];
    fullResponse: string[];
    HTTPClient: HTTPClient;
    url: string;
    method: string;
    constructor() {
        super();
        this.apiKey = process.env.ANTHROPIC_API_KEY || '';
        this.model = 'claude-2'
        this.url = "https://api.anthropic.com/v1/complete";
        this.method = 'POST'
        this.prompt = "";
        this.context = [];
        this.systemPrompt = "";
        this.completePrompt = "";
        this.fullResponse = [];
        this.HTTPClient = new HTTPClient(this.model, this.method, this.url);
    }

    // Make request to anthropic
    async anthropicRequest(
        userMessage: string,
        systemPrompt: string = DataGeneratorPromptList.getItem("DATA_GENERATION_SYSTEM_PROMPT"),
        selectedModel: string = "claude-2.1",
        maxTokensToSample: number = 1000,
        temperature: number = 0.2,
    ): Promise<string> {

        console.info("Making request to Anthropic");

        if (!userMessage) { throw new Error('No user message provided'); }

        try {
            // Construct the prompt
            const template = new AnthropicPromptTemplate(systemPrompt, userMessage);
            const fullPrompt = template.constructPrompt();
            console.debug(fullPrompt);

            // Prepare the request body
            const requestBody = {
                model: selectedModel,
                max_tokens_to_sample: maxTokensToSample,
                temperature: temperature,
                prompt: fullPrompt,
                api_key: this.apiKey, // Include the API key if needed in the request body, otherwise use headers or authentication methods as required.
            };

            // Make the HTTP POST request
            const response = await this.anthropicRequest(userMessage, this.systemPrompt, selectedModel, maxTokensToSample, temperature)

            console.debug(response);
            return response

        } catch (error) {
            console.error(error);
            throw new Error(`Error during generation: ${error}`);
        }
    }
}
export default AnthropicGenerator