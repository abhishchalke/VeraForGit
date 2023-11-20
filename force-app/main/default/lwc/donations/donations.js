import { LightningElement, track, wire } from 'lwc';
import getCampaigns from '@salesforce/apex/DonationController.getCampaigns';
import makeDonation from '@salesforce/apex/DonationController.makeDonation';

export default class DonationComponent extends LightningElement {
    @track donationAmount = 0;
    @track selectedCampaign = '';
    @track campaignOptions = [];
    @track isRecurring = false;
    @track recurrenceFrequency = 1;

    @wire(getCampaigns)
    wiredCampaigns({ error, data }) {
        if (data) {
            this.campaignOptions = data.map(campaign => ({ label: campaign.Name, value: campaign.Id }));
        } else if (error) {
            console.error('Error loading campaigns', error);
        }
    }

    handleCampaignChange(event) {
        this.selectedCampaign = event.detail.value;
    }

    handleRecurringChange(event) {
        this.isRecurring = event.target.checked;
    }

    handleDonate() {
    //    const donationDetails = {
    //         amount: this.donationAmount,
    //         campaignId: this.selectedCampaign,
    //         isRecurring: this.isRecurring,
    //         recurrenceFrequency: this.recurrenceFrequency
    //     };
       
        console.log('this.selectedCampaign'+this.selectedCampaign);
        console.log('this.donationAmount'+this.donationAmount);
        makeDonation(this.selectedCampaign)
            .then(result => {
                // Handle success, e.g., show a success message
                console.log('Donation successful:', result);
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error('Error making donation:', error);
            });
    }
}