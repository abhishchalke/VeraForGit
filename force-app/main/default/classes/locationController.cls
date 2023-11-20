public with sharing class locationController {

    @AuraEnabled(cacheable=true)
    public static List<LocationWrapper> getLocations() {
        // Query Campaign records and retrieve necessary fields (e.g., Name, Geo_Location__c)
        List<Campaign> campaigns = [
            SELECT Id, Name, Geo_Location__Latitude__s, Geo_Location__Longitude__s,Address__c
            FROM Campaign
            WHERE Geo_Location__Latitude__s != null AND Geo_Location__Longitude__s != null
        ];

        // Create a list to store wrapper objects
        List<LocationWrapper> locationWrappers = new List<LocationWrapper>();

        // Iterate through Campaign records and create wrapper objects
        for (Campaign campaignRecord : campaigns) {
            locationWrappers.add(new LocationWrapper(
                campaignRecord.Id,
                campaignRecord.Name,
                campaignRecord.Geo_Location__Latitude__s,
                campaignRecord.Geo_Location__Longitude__s,
                campaignRecord.Address__c
            ));
        }

        return locationWrappers;
    }

    // Wrapper class to structure data
    public class LocationWrapper {
        @AuraEnabled
        public Id locationId;

        @AuraEnabled
        public String name;

        @AuraEnabled
        public String address;

        @AuraEnabled
        public Decimal latitude;

        @AuraEnabled
        public Decimal longitude;

        public LocationWrapper(Id locationId, String name, Decimal latitude, Decimal longitude,string address) {
            this.locationId = locationId;
            this.name = name;
            this.latitude = latitude;
            this.longitude = longitude;
            this.address = address;
        }
    }
}