// supportForm.js
import { LightningElement, track } from 'lwc';
import sendEmail from '@salesforce/apex/SupportEmailController.sendEmail';

export default class SupportForm extends LightningElement {
    @track subject = '';
    @track query = '';

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleQueryChange(event) {
        this.query = event.target.value;
    }

    handleSubmit() {
        sendEmail({ subject: this.subject, body: this.query })
            .then(() => {
                // Email sent successfully, you can add any additional handling here
                alert('Query submitted successfully!');
            })
            .catch(error => {
                console.error('Error sending email', error);
                alert('Error submitting query. Please try again.');
            });
    }
}