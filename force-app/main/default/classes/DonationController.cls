public with sharing class DonationController {

    @AuraEnabled(cacheable=true)
    public static List<Campaign> getCampaigns() {
        return [SELECT Id, Name FROM Campaign];
    }

    @AuraEnabled
    public static String makeDonation(Id campaignId,decimal amount) {
        // Placeholder logic for donation processing
        System.debug('###make Donation');
        // Create an Opportunity record
        Opportunity newOpportunity = new Opportunity();
        newOpportunity.Name = 'Donation Opportunity';
        newOpportunity.Amount = amount;
        newOpportunity.StageName = 'Closed - Won';
        newOpportunity.CloseDate = Date.today();
        newOpportunity.CampaignId = campaignId; // Associate with the selected Campaign
        newOpportunity.Type = 'Donation';

        try {
            insert newOpportunity;
            return 'Donation Successful';
        } catch (Exception e) {
            return 'Error creating Opportunity: ' + e.getMessage();
        }
    }
}