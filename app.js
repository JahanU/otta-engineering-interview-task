/*
Task 1 - The similarity score between two users
is the number of jobs which they both like.
Find the two users with the highest similarity.
*/
const csv = require("csvtojson");
const reactionsCSV = "./data/reactions.csv";
const jobsCSV = "./data/jobs.csv";

async function getReactionsJson() { return await csv().fromFile(reactionsCSV); }
async function getJobsJson() { return await csv().fromFile(jobsCSV); }

function getUserSimilarityScore(user1, user2, reactions, max) {

    let similarityScore = 0;

    let user1Jobs = reactions
        .filter((row) => row.user_id === user1)
        .map((row) => row);
    if (user1Jobs.length < max) return 0; // if user1 has less jobs than max, return 0 -> can't ever get higher similarity score

   let user2Jobs = reactions
        .filter((row) => row.user_id === user2)
        .map((row) => row);   
    if (user2Jobs.length < max) return 0;
 
    for (let user1 of user1Jobs) {
        for (let user2 of user2Jobs) {
            if (user1.job_id === user2.job_id && user1.direction === user2.direction === true) {
                similarityScore++;
            }
        }
    }

    return similarityScore;
}

async function getMaxUserSimilarityScore(reactions) {

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log('max user: ', time);

    let users = new Set(reactions.map((row) => row.user_id));
    let [maxUser1,  maxUser2, max] = ['', '', 0];

    for (let user1 of users) {
        for (let user2 of users) {
            if (user1 !== user2) {
                let similarityScore = getUserSimilarityScore(user1, user2, reactions, max);
                if (similarityScore > max) {
                    [maxUser1, maxUser2, max] = [user1, user2, similarityScore];
                    console.log('UserMax: ', max, maxUser1, maxUser2);
                }
            }
        }
    }
    return { maxSimilarityScore: max, maxUser1: maxUser1, maxUser2: maxUser2 };
}

/*
Task 2 - 
The similarity score between two companies is the number of users who like at least one job at both companies. 
Using both the reactions.csv and jobs.csv data, 
find the two companies with the highest similarity score.
*/
function getCompanySimilarityScore(company1, company2, jobs, reactions, max) {
    
    const company1Jobs = new Set(jobs
    .filter((job) => job.company_id == company1)
    .map((job) => job.job_id));
    if (company1Jobs.size < max) return 0;

    const company2Jobs = new Set(jobs
    .filter((job) => job.company_id == company2)
    .map((job) => job.job_id));
    if (company2Jobs.size < max) return 0;

    let map = new Map(); // <userID, user likes both companies>

    for (let row of reactions) {
        // user likes jobs from company 1
        if (company1Jobs.has(row.job_id) && row.direction) {
            map.set(row.user_id, false); // set key, value false for now
        }
        // user likes jobs from company 2
        if (company2Jobs.has(row.job_id) && row.direction) {
            if (map.has(row.user_id)) { // found key, already likes job from company1
                map.set(row.user_id, true);
            }
        }
    }

    let similarityScore = 0;
    map.forEach((value, key) => { // total user liked job from both companies
        if (value) similarityScore++;
    });
    return similarityScore;
}

async function getMaxCompanySimilarityScore(reactions, jobs) {

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log('max company: ', time);

    const companies = new Set(jobs.map((job) => job.company_id));
    let [maxCompany1, maxCompany2, max] = ['', '', 0];

    for (let company1 of companies) {
        for (let company2 of companies) {
            if (company1 !== company2) {
                let similarityScore = getCompanySimilarityScore(company1, company2, jobs, reactions);
                if (similarityScore > max) {
                    [maxCompany1, maxCompany2, max] = [company1, company2, similarityScore];
                    console.log('companyMax: ', max, maxCompany1, maxCompany2);
                }
            }
        }
    }
    return { maxSimilarityScore: max, maxCompany1: maxCompany1, maxCompany2: maxCompany2 };
}


async function main() {
    Promise.all([getJobsJson(), getReactionsJson()]).then((res) => {
        const jobs = res[0];
        const reactions = res[1];

        // Task 1
        getMaxUserSimilarityScore(reactions).then((res) => {
            console.log(res);
        });

        // Task 2
        getMaxCompanySimilarityScore(reactions, jobs).then((res) => {
            console.log(res);
        });
    });
}

main();