import { OpenAIGenerator } from "./openai/OpenAIAssistant";
import AnthropicGenerator from "./anthropic/AnthropicGenerator";
import { OllamaRequestGenerator } from "./agentArtificial/OllamaRequestGenerator";
import { GeneratorList } from "./Generator.dt";

const GeneratorManager = new GeneratorList([])


export default GeneratorManager
