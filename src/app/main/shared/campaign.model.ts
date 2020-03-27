
export class Campaign {
    campaignId: string;
    dialGroupId: string;
    dialGroupDesc: string;
    campaignName: string;
    campaignDesc: string;
    isActive: boolean;
    campaignNamezero: string;
    

    constructor(campaign?){
        campaign = campaign || {};
        this.campaignId = campaign.campaignId || '';
        this.dialGroupId = campaign.dialGroupId || '';
        this.dialGroupDesc = campaign.dialGroupDesc || '';
        this.campaignName = campaign.campaignName || '';
        this.campaignDesc = campaign.campaignDesc || '';
        this.isActive = campaign.isActive || false;
        this.campaignNamezero = campaign.campaignNamezero || '';
    }
}