import { LightningElement, wire } from 'lwc';
import getLocationData from '@salesforce/apex/locationController.getLocations';

export default class locationMap extends LightningElement {
    markers = [];
    selectedLocation = {};

    // Wire to call the Apex method and retrieve Campaign records
    @wire(getLocationData)
    wiredLocations({ error, data }) {
        if (data) {
            this.processLocationData(data);
        } else if (error) {
            this.handleError(error);
        }
    }

    processLocationData(locationRecords) {
        this.markers = locationRecords.map(location => {
            return {
                location: {
                    Latitude: location.latitude,
                    Longitude: location.longitude
                },
                title: location.name,
                description: `Campaign Location: ${location.Address}`
            };
        });
    }

    handleMarkerClick(event) {
        const markerTitle = event.detail.title;

        // Find the clicked campaign in the data
        this.selectedLocation = this.markers.find(marker => marker.title === markerTitle);
    }

    handleError(error) {
        console.error('Error fetching Location records:', error);
        // Handle error as needed
    }
}