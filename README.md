# Otta - Engineering Interview Task

This is the take-home interview task for engineering job applications at Otta.

The goal is to both give you a flavour of the kind of work we do, and give us an idea of your technical (and non-technical) skills. The key thing we're assessing is your level of pragmatism, but we're also interested in code style and how you structure the problem (so please don't just do it in SQL!)

We expect the task to take one hour. If you require clarification on anything, please don't hesitate to contact us.

## Instructions

Start by cloning this repository using your personal GitHub account. Create a new private repository and push your clone to this new repo (you will need to remove the original remote with `git remote remove origin`). Please ensure all of your work is committed to this - we'll only consider the `main` branch.

The following details the individual tasks. Please complete **all** of the them. You may **use any programming language**, provided all of the code used can be committed to this repo. You don't need to provide instructions for running the code, or any explanation other than the answers.

### Task 1

In the `data` folder of this repo there is a CSV file called `reactions.csv`. It contains real data corresponding to how users on Otta have reacted to (saved or skipped) jobs on the platform.

The reaction data consists of four columns:

- `user_id` - the integer ID of the user who liked or disliked the job
- `job_id` - the integer ID of the job the user interacted with
- `direction` - whether the user liked (`true`) or disliked (`false`) the job
- `time` - the timestamp corresponding to when they reacted to the job

**Task**: The similarity score between two users is the number of jobs which they both like. Find the two users with the highest similarity.

**Answer**: _[User1: '5193', User2: '1791', Score: 408]_

### Task 2

In the `data` folder there is an additional CSV file called `jobs.csv`. It contains unique integer IDs for over 12,000 jobs, along with integer IDs for the job's associated company.

**Task**: The similarity score between two companies is the number of users who like at least one job at both companies. Using both the `reactions.csv` and `jobs.csv` data, find the two companies with the highest similarity score.

**Answer**: _[Company1: '92', Company2: '124', Score: 160]_

### Task 3

Engineering at Otta is truly full-stack. Features are owned end-to-end, from backend and database-level work to front-end finishes.

We don't think it's fair to ask you to build something with a UI, as we know this can take a while and time is precious. Instead, we'd love to see an example of something you've already built and hear about what you learned building it.

**Task**: Share an example of something you've built using front-end web technologies.

- A link to a GitHub repo is ideal
- If the best example of your work is something you've done at a company, it's okay to link to a live deployed version
- If you can't link to anything, a screenshot is also fine

**Answer**: https://github.com/JahanU/algorithm-visualizer

**Task**: Tell us about the biggest challenge you faced in building the above.

**Answer**: For this project, the most important and difficult part was showcasing each iteration and action being performed in 'real-time' during the implementation of an algorithm, such as bubble, quick, merge etc. The final solution was easy to implement and scales well for every new algorithm added. The main idea was that the algorithm would run as normal, and for each 'action' (eg a swap in bubble sort) would be stored in an array with the related indexs (left, right, index) values. 
After the sort and animation array was complete, I would pop each element containing the index values, and map each of the actions onto the array on the UI. Changing the size, colours and location of the bars would be performed in this animation function. Doing this lead to a keen interest in UI such as visualisation and a passion for algorithms.

## Submission

Once you've completed all of the above tasks, make sure:

- [x] You've committed all of the code used, and your edited answers, to the `main` branch
- [x] You've pushed the changes to your repo
- [x] You add `XavKearney` and `billyotta` as contributors for your personal repo, and send a link to the repo in an email or Otta message to us

Good luck!
# otta-engineering-interview-task
