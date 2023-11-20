/**
 * @description       : 
 * @author            : Amit Singh
 * @group             : 
 * @last modified on  : 07-11-2020
 * @last modified by  : Amit Singh
 * Modifications Log 
 * Ver   Date         Author       Modification
 * 1.0   07-11-2020   Amit Singh   Initial Version
**/
global with sharing class FullCalendarService {

    @AuraEnabled
    global static List<Campaign> getCampaign()
    {
        list<Campaign> campList = new list<Campaign>();
        campList = [ SELECT Id, EndDate, CreatedDate, StartDate,Name,description,ExpectedRevenue,AmountWonOpportunities FROM Campaign];
        return campList; 
    }

}