
export class Account {
    accountId: string;
    mainAccountId: string;
    accountName: string;
    mainAccountName: string;
    startDate: Date;
    endDate?: any;
    outboundPrepay: boolean;
    defaultOutdialServerGroupId: number;
    databaseShardId: string;
    enableChat: boolean;
    enableHciDialer: boolean;
    tcpaSafeMode: boolean;
    enableFifo: boolean;

    constructor(account?){
        account = account || {};
        this.accountId = account.accountId || '';
        this.mainAccountId = account.mainAccountId || '';
        this.accountName = account.accountName || '';
        this.mainAccountName = account.mainAccountName || '';
        this.startDate = account.startDate || Date.now();
        this.endDate = account.endDate || null;
        this.outboundPrepay = account.outboundPrepay || false;
        this.defaultOutdialServerGroupId = account.defaultOutdialServerGroupId || 0;
        this.databaseShardId = account.databaseShardId || '';
        this.enableChat = account.enableChat || false;
        this.enableHciDialer = account.enableHciDialer || false;
        this.tcpaSafeMode = account.tcpaSafeMode || false;
        this.enableFifo = account.enableFifo || false;

    }
}