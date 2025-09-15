# PuppySuperBowl

This is a unit project that demonstrates my ability to work with an API, and use a variety of concepts, such as: Async/await, try/catch, fetch, GET, POST, and DELETE.

## Learning Lessons:

The Puppy Super Bowl was a great introduction on how to make GET, POST, and DELETE requests from an API. Surprisingly, the most challenging aspect was not creating the player cards or sending data. It was ensuring the site re-rendered when a user added a new player or removed a current player. Several attempts would not reload properly or they would cause duplicates. This was resolved by adjusting the fetchAllPlayers function and inserting the renderAllPlayers at the end of the 'try' statement, then adjusting the 'init' function that came with the assignment.

## User Story:

Based on Calliope's email:

- You are working with the humane society to add a mini-game to their website.
- The game should allow visitors to see teams of puppies compete in a "puppy bowl".
- Someone has already built out the API and some of the front end.
- Work with your team to plan and implement using GitHub Project.
- You will be provided with the GitHub link to any existing work that has been done.

Overall, your job is to build out a functional client side. Request data from the API, then render that data on the front end. The front end should allow the user to:

- View the roster.
- Observe a player's details.
- Add players to the roster.
- Etc.
  All the data you need is available through the API. Your job is to leverage it.

Puppy API Documentation: https://fsa-puppy-bowl.herokuapp.com/api/
