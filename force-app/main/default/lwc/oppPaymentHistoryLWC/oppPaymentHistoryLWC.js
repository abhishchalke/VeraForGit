import { LightningElement, wire } from 'lwc';
import getOppPaymentsByCurrentUser from '@salesforce/apex/OppPaymentController.getOppPaymentsByCurrentUser';

const columns = [
    { label: 'Payment Amount', fieldName: 'paymentAmount', type: 'currency', sortable: true },
    { label: 'Payment Date', fieldName: 'paymentDate', type: 'date', sortable: true },
    { label: 'Payment Method', fieldName: 'paymentMethod', sortable: true },
    { label: 'Payment Status', fieldName: 'paymentStatus', sortable: true },
    { label: 'Is Paid', fieldName: 'isPaid', type: 'boolean', sortable: true },
    { label: 'Campaign Name', fieldName: 'campaignName', sortable: true },
];

export default class OppPaymentList extends LightningElement {
    oppPayments;
    error;

    columns = columns;

    @wire(getOppPaymentsByCurrentUser)
    wiredOppPayments({ data, error }) {
        if (data) {
            this.oppPayments = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.oppPayments = undefined;
        }
    }
}