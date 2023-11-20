public with sharing class CampaignController {
    @AuraEnabled(cacheable=true)
    public static List<CampaignWrapper> getCampaignRecords() {
        List<CampaignWrapper> campaignList = new List<CampaignWrapper>();

        List<Campaign> campaigns = [SELECT Id, Description, StartDate, EndDate, ExpectedRevenue, AmountWonOpportunities, Name FROM Campaign];

        for (Campaign campaign : campaigns) {
            List<ContentDocumentLink> contentLinks = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :campaign.Id];

            for (ContentDocumentLink contentLink : contentLinks) {
                List<ContentVersion> contentVersions = [SELECT Id, Title, VersionData FROM ContentVersion WHERE ContentDocumentId = :contentLink.ContentDocumentId];

                for (ContentVersion contentVersion : contentVersions) {
                    CampaignWrapper campaignWrapper = new CampaignWrapper();
                    campaignWrapper.campaign = campaign;
                    campaignWrapper.contentVersion = contentVersion;
                    campaignList.add(campaignWrapper);
                }
            }
        }

        return campaignList;
    }

    public class CampaignWrapper {
        @AuraEnabled
        public Campaign campaign;

        @AuraEnabled
        public ContentVersion contentVersion;
    }

    @AuraEnabled(cacheable=true)
    public static String getDownloadUrl(String contentVersionId) {
        String downloadUrl = '/sfc/servlet.shepherd/version/download/' + contentVersionId;
        return downloadUrl;
    }
}