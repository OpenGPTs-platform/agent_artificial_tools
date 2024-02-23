import { SalesAgent } from "./agents/SaleAgent";
import { SelectorInjectorAgent } from "./agents/SelectorInjector";
import { AgentList } from "./Agents.dt";
import { DocsAgent } from "./agents/DocsAgent";

export const AgentManager = new AgentList([SelectorInjectorAgent, SalesAgent, DocsAgent])