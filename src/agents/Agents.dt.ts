import { PromptList } from '../prompts/PromptListItem';
import { VariablesList } from '../variables/Variables.dt';
import { GenericList } from '../types.dt';
import { AnthropicDataGenerator } from '../data-generator/AnthropicDataGenerator';

export class Agent {
    name: string
    description: string
    promptList: PromptList
    variableList: VariablesList
    dataGerator: AnthropicDataGenerator
    constructor(name: string, description: string, promptList: PromptList, variableList: VariablesList) {
        this.name = name
        this.description = description
        this.promptList = promptList
        this.variableList = variableList
        this.dataGerator = new AnthropicDataGenerator()
    }
}

export class AgentList extends GenericList<Agent> {
    constructor(agents: Agent[]) {
        super();
        this.setItems(...agents)
    }
}
