import { LightningElement, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';

const OPPORTUNITIES_PER_PAGE = 25;

const columns = [
    { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
    { label: 'Closed Date', fieldName: 'CloseDate', type: 'date' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', typeAttributes: { currencyCode: 'USD' } },
    { label: 'Contact Name', fieldName: 'ContactName', type: 'text' },
];

export default class OpportunityDataTable extends LightningElement {
    @track opportunities = [];
    @track pagedOpportunities = [];
    @track currentPage = 1;
    columns = columns;

    @wire(getOpportunities)
    wiredOpportunities({ error, data }) {
        if (data) {
            this.opportunities = data.map(opportunity => ({
                ...opportunity,
                ContactName: opportunity.Contact ? opportunity.Contact.Name : ''
            }));
            this.paginateOpportunities();
        } else if (error) {
            console.error('Error fetching opportunities:', error);
        }
    }

    paginateOpportunities() {
        const startIndex = (this.currentPage - 1) * OPPORTUNITIES_PER_PAGE;
        this.pagedOpportunities = this.opportunities.slice(startIndex, startIndex + OPPORTUNITIES_PER_PAGE);
    }

    handleFirst() {
        this.currentPage = 1;
        this.paginateOpportunities();
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.paginateOpportunities();
        }
    }

    handleNext() {
        if (this.currentPage < Math.ceil(this.opportunities.length / OPPORTUNITIES_PER_PAGE)) {
            this.currentPage++;
            this.paginateOpportunities();
        }
    }

    handleLast() {
        this.currentPage = Math.ceil(this.opportunities.length / OPPORTUNITIES_PER_PAGE);
        this.paginateOpportunities();
    }
}