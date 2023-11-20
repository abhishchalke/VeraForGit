trigger OpportunityTrigger on Opportunity (after insert) {
    // Define a method to create a follow-up task
    public static void createFollowUpTask(Opportunity[] newOpportunities) {
        List<Task> followUpTasks = new List<Task>();

        for (Opportunity opp : newOpportunities) {
            // Replace 'Your_Relationship_Manager_User_Id' with the actual User ID of the relationship manager
            Task followUpTask = new Task(
                Subject = 'Follow-up for Opportunity: ' + opp.Name,
                WhatId = opp.Id,  // Opportunity ID
                ActivityDate = System.today().addDays(7),  // Due date (7 days from now)
                OwnerId = '0055g00000Iu9rrAAB'  // Assign the task to the relationship manager
                // Add any other relevant task details
            );

            followUpTasks.add(followUpTask);
        }

        insert followUpTasks;
    }

    // Call the method when new opportunities are inserted
    if (Trigger.isAfter && Trigger.isInsert) {
        createFollowUpTask(Trigger.new);
    }
}