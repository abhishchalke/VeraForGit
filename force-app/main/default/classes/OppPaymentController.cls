public with sharing class OppPaymentController {

    @AuraEnabled(cacheable=true)
    public static List<OppPaymentWrapper> getOppPaymentsByCurrentUser() {
        List<OppPaymentWrapper> result = new List<OppPaymentWrapper>();

        try {
            // Get the Id of the logged-in user
            Id userId = UserInfo.getUserId();

            // Query the associated Contact for the logged-in user
            User currentUser = [SELECT ContactId FROM User WHERE Id = :userId LIMIT 1];

            // If there is a related Contact, get its Id; otherwise, return an empty list
            Id contactId = (currentUser != null) ? currentUser.ContactId : null;

            // If there is no associated Contact, return an empty list
            if (contactId != null) {
                // Query Opportunity Payments related to Opportunities where npsp__Primary_Contact__c matches the Contact Id
                List<npe01__OppPayment__c> oppPayments = [SELECT
                    npe01__Payment_Amount__c,
                    npe01__Payment_Date__c,
                    npe01__Payment_Method__c,
                    Payment_Status__c,
                    npe01__Paid__c,
                    npe01__Opportunity__r.Campaign.Name
                FROM npe01__OppPayment__c
                WHERE npe01__Paid__c = true
                    AND npe01__Opportunity__r.npsp__Primary_Contact__c =: ContactId
                ORDER BY npe01__Payment_Date__c DESC];

                for (npe01__OppPayment__c oppPayment : oppPayments) {
                    result.add(new OppPaymentWrapper(
                        oppPayment.npe01__Payment_Amount__c,
                        oppPayment.npe01__Payment_Date__c,
                        oppPayment.npe01__Payment_Method__c,
                        oppPayment.Payment_Status__c,
                        oppPayment.npe01__Paid__c,
                        oppPayment.npe01__Opportunity__r.Campaign.Name
                    ));
                }
            }
        } catch (Exception e) {
            System.debug('An error occurred: ' + e.getMessage());
            System.debug('StackTrace: ' + e.getStackTraceString());
            // You can log the error or handle it as needed
        }

        return result;
    }

    public class OppPaymentWrapper {
        @AuraEnabled public Decimal paymentAmount { get; set; }
        @AuraEnabled public Date paymentDate { get; set; }
        @AuraEnabled public String paymentMethod { get; set; }
        @AuraEnabled public String paymentStatus { get; set; }
        @AuraEnabled public Boolean isPaid { get; set; }
        @AuraEnabled public String campaignName { get; set; }

        public OppPaymentWrapper(
            Decimal paymentAmount,
            Date paymentDate,
            String paymentMethod,
            String paymentStatus,
            Boolean isPaid,
            String campaignName
        ) {
            this.paymentAmount = paymentAmount;
            this.paymentDate = paymentDate;
            this.paymentMethod = paymentMethod;
            this.paymentStatus = paymentStatus;
            this.isPaid = isPaid;
            // Set a default value if campaignName is null
            this.campaignName = (campaignName != null) ? campaignName : 'Donations towards the organization';
        }
    }
}