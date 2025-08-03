const { startOfDay, subDays, endOfDay } = require('date-fns');
const cron = require('node-cron');
const ConnectionRequestModel = require('../models/connectionRequest');

cron.schedule("* * * * *", () => {
    // Send emails to all people who got requsets the previous day

    try{

        const yesterday = subDays(new Date(), 1);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = ConnectionRequestModel.find({
            status : "interested",
            createdAt : {
                $gte : yesterdayStart,
                $lt : yesterdayEnd,
            }
        }).populate("fromUserId toUsaerId");

        const listOfEmails = [...new Set(pendingRequests.map(req=> req.toUserId.emailId))];

        for(const email of listOfEmails){
            //Send Emails
        }

    }catch(err){
        console.log(err);
        
    }
})