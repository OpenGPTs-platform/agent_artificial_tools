import { Agent } from "../Agents.dt";
import { SelectorInjectorPromptList } from "../../prompts/prompts/SelectorInjectorPrompts";
import { SelectorInjectorVariableList } from "../../variables/variables/SelectorInjectorVariables";

const variables = SelectorInjectorVariableList
const prompts = SelectorInjectorPromptList

//console.log(variables)
//console.log(prompts)

const name = variables.getItems()[0]["name"]
const description = variables.getItems()[1]["description"]

//console.log(name, description)


export const SelectorInjectorAgent = new Agent(name, description, prompts, variables)
