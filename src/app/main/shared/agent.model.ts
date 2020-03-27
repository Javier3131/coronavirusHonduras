
export class Agent {
    agentId: number;
    empId: number;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    teamleaderId: number;
    campaign: string;
    hireDate: Date;
    terminationDate?: Date;
    dateCreated: Date;
    agentIdDialer: string;
    agentGroupId: string;
    username: string;
    supervisor: any;
    station: number;
    password: string;
    employee: string;
    initialState: string;

    constructor(agent?){
        agent = agent || {};
        this.agentId = agent.agentId || 0;
        this.empId = agent.empId || 0;
        this.name = agent.name || '';
        this.firstName = agent.firstName || '';
        this.lastName = agent.lastName || '';
        this.email = agent.email || '';
        this.teamleaderId = agent.teamleaderId || 0;
        this.campaign = agent.campaign || '';
        this.hireDate = agent.hireDate || Date.now();
        this.terminationDate = agent.terminationDate || null;
        this.dateCreated = agent.dateCreated || Date.now();
        this.agentIdDialer = agent.agentIdDialer || '';
        this.agentGroupId = agent.agentGroupId || '';
        this.username = agent.username || '';
        this.supervisor = agent.supervisor || null;
        this.station = agent.station || 0;
        this.password = agent.password || '';
        this.employee = agent.employee || '';
        this.initialState = agent.initialState || '';
    }
}