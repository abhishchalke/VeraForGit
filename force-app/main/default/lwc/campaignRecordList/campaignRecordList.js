import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCampaignRecords from '@salesforce/apex/CampaignController.getCampaignRecords';
import getDownloadUrl from '@salesforce/apex/CampaignController.getDownloadUrl';

export default class CampaignRecordList extends LightningElement {
    campaignRecords;
    error;

    @wire(getCampaignRecords)
    wiredCampaignRecords({ error, data }) {
        if (data) {
            this.campaignRecords = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.campaignRecords = undefined;
        }
    }

    @wire(getDownloadUrl, { contentVersionId: '$contentVersionId' })
    downloadUrl;

    get contentVersionId() {
        return this.campaignRecords && this.campaignRecords.length > 0
            ? this.campaignRecords[0].contentVersion.Id
            : null;
    }

    handleRegisterClick(event) {
        const campaignId = event.target.key;
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Registration',
                message: `Registered for campaign `,
                variant: 'success',
            })
        );
    }
}