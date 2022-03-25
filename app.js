/*
Task 1 - The similarity score between two users
is the number of jobs which they both like.
Find the two users with the highest similarity.
*/

const csv = require("csvtojson");
const reactionsCSV = "./data/reactions.csv";
const jobsCSV = "./data/jobs.csv";


async function getReactionsJson() {
    return await csv().fromFile(reactionsCSV);
}
async function getJobsJson() {
    return await csv().fromFile(jobsCSV);
}

async function getSimilarityScore(user1, user2, data, max) {

    let similarityScore = 0;

    let user1Jobs = data
        .filter((row) => row.user_id === user1)
        .map((row) => row);
    if (user1Jobs.length < max) return 0; // if user1 has less jobs than max, return 0

   let user2Jobs = data
        .filter((row) => row.user_id === user2)
        .map((row) => row);   
    if (user2Jobs.length < max) return 0;
 
    for (let i = 0; i < user1Jobs.length; i++) {
        for (let j = 0; j < user2Jobs.length; j++) {
            let [user1, user2] = [user1Jobs[i], user2Jobs[j]];
            if (user1.job_id === user2.job_id && user1.direction === user2.direction === true) {
                similarityScore++;
            }
        }
    }
    return similarityScore;
}

async function getMaxSimilarity() {

    const data = await getReactionsJson();
    let users = new Set(data.map((row) => row.user_id));

    let max = 0;
    let maxUser1 = "";
    let maxUser2 = "";

    for (let user1 of users) {
        for (let user2 of users) {
            if (user1 !== user2) {
                let similarityScore = await getSimilarityScore(user1, user2, data, max);
                if (similarityScore > max) {
                    max = similarityScore;
                    maxUser1 = user1;
                    maxUser2 = user2;
                    console.log(max, maxUser1, maxUser2);
                }
            }
        }
    }
    // Max Score: 813
    // Max Users: 5193 1791
    console.log(max, maxUser1, maxUser2);
    return max;
}
// getMaxSimilarity().then((res) => {
//     console.log(res);
// });



/*
Task 2 - 
The similarity score between two companies is the number of users who like at least one job at both companies. 
Using both the reactions.csv and jobs.csv data, 
find the two companies with the highest similarity score.

eg apple and microsoft
10 users like jobs at appl
7 users like jobs at microsoft
find union of users who like jobs at both companies

Jobs.csv -> job_id -> company_id
Reactions.csv -> job_id -> user_id & direction
*/

async function getCompanySimilarityScore(company1, company2) {

    const reactions = await getReactionsJson();
    const jobs = await getJobsJson();
    
    const company1Jobs = new Set(jobs
    .filter((job) => job.company_id == company1)
    .map((job) => job.job_id));
    
    const company2Jobs = new Set(jobs
    .filter((job) => job.company_id == company2)
    .map((job) => job.job_id));

    
    let map = new Map(); // <user, user likes both companies>

    for (let row of reactions) {
        // user jahan, likes jobs from company 1
        if (company1Jobs.has(row.job_id) && row.direction) {
            map.set(row.user_id, false); // set key, value false for now
        }

        // user jahan, likes jobs from company 2
        if (company2Jobs.has(row.job_id) && row.direction) {
            if (map.has(row.user_id)) { // found key, already likes job from company1
                map.set(row.user_id, true);
            }
        }
    }
    return { similarityScore: map.size, company1_id: company1, company2_id: company2 };
}


getCompanySimilarityScore(225, 225).then((res) => {
    console.log(res);
});

