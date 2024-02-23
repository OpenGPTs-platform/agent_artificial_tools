import { Agent } from "../Agents.dt";
import { DocPromptList } from "../../prompts/prompts/DocsPrompts";
import { DocVariableList } from "../../variables/variables/DocsVariables";
const variables = DocVariableList
const prompts = DocPromptList

//console.log(variables)
//console.log(prompts)

const name = variables.getItems()[0]["name"]
const description = variables.getItems()[1]["description"]

//console.log(name, description)


export const DocsAgent = new Agent(name, description, prompts, variables)
