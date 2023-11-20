public class chart_Controller {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getOpportunities(){
        return [SELECT SUM(ExpectedRevenue) expectRevenue, SUM(AmountWonOpportunities) AmountWonOpportunities, Name 
               FROM campaign WHERE IsActive =true GROUP BY Name LIMIT 20];
    }
}