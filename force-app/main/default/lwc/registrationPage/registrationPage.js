import { LightningElement, track,api,wire } from 'lwc';
export default class RegistrationPage extends LightningElement {
    @api recordId;

    connectedCallback() {
        // Get the URL parameters
        const urlParams = new URLSearchParams(window.location.search);

        // Check if the 'recordId' parameter exists in the URL
        if (urlParams.has('recordId')) {
            // Retrieve the recordId from the URL parameter
            this.recordId = urlParams.get('recordId');
            console.log('record id de na re'+this.recordId);
        }
    }

}