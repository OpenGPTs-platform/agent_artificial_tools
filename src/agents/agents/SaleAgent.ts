import { Agent } from "../Agents.dt";
import { SalesAgentVariableList } from "../../variables/variables/SalesAgentVariables";
import { SalesAgentPrompts } from "../../prompts/prompts/SalesAgentPrompts";
export const SalesAgent = new Agent(SalesAgentVariableList.getItem("name"), SalesAgentVariableList.getItem("description"), SalesAgentVariableList, SalesAgentPrompts) 