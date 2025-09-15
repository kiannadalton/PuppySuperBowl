// Use the API_URL variable to make fetch requests to the API.
const cohortName = "2403-ftb-et-web-pt";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
//* Completed
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();

    // returns the array of players instead of assigning a state.players to this array,
    renderAllPlayers(json.data.players);
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
//* Completed
const fetchSinglePlayer = async (player) => {
  const playerId = parseInt(player.srcElement.id);
  try {
    const response = await fetch(`${API_URL}/${playerId}`);
    const json = await response.json();
    const playerData = json.data.player;

    renderSinglePlayer(playerData);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */

//* Completed
const addNewPlayer = async (name, breed, imageUrl) => {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        breed,
        imageUrl,
      }),
    });

    fetchAllPlayers();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
//* Completed
const removePlayer = async (playerId) => {
  try {
    await fetch(`${API_URL}/${playerId}`, {
      method: "DELETE",
    });
    fetchAllPlayers();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
//* Completed
const renderAllPlayers = (playerList) => {
  const playersContainer = document.getElementById("players-container");

  if (playerList.length == 0) {
    playersContainer.innerHTML = "<h3>No players available</h3>";
    return;
  }

  // clears container and preps for player cards
  playersContainer.innerHTML = "";

  // create a div for each card. fill it with HTML for name, id, image, see details button and remove from roster
  playerList.forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.classList = "player-card";
    playerCard.innerHTML = `
    <img class="player-img" src="${player.imageUrl}" alt="${player.name}">
    <h4>Name: ${player.name}</h4>
    <p>Player ID: ${player.id}</p>
    <button class="see-details" id="${player.id}" onclick="scrollToTop()">See Details</button>
    <button class="delete-button" data-id="${player.id}">Remove from Roster</button>
    `;
    //see details button
    const seeDetails = playerCard.querySelector(".see-details");
    seeDetails.addEventListener("click", (player) => fetchSinglePlayer(player));

    //remove from roster button
    const deletePlayer = playerCard.querySelector(".delete-button");
    deletePlayer.addEventListener("click", (event) => {
      event.preventDefault();
      removePlayer(player.id);
    });

    playersContainer.appendChild(playerCard);
  });
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */

//* Completed
const renderSinglePlayer = (player) => {
  // taking info from fetch single player and rendering from there
  //string ID
  const singlePlayerContainer = document.getElementById(
    "single-player-container"
  );
  // Clears HTML
  singlePlayerContainer.innerHTML = "";

  singlePlayerContainer.innerHTML = `
  <div id="single-player-card">
  <img class="player-img" src="${player.imageUrl}" alt="${player.name}">
    <h4>Name: ${player.name}</h4>
    <p>Player ID: ${player.id}</p>
    <p>Breed: ${player.breed}</p>
    <button id="back-button">Back to all Players</button>
    </div>
  `;

  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", () => {
    //clears single player card from top of screen
    singlePlayerContainer.innerHTML = "";
  });
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
//* Completed
const renderNewPlayerForm = () => {
  const form = document.getElementById("new-player-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await addNewPlayer(
        event.target.name.value,
        event.target.breed.value,
        event.target.imageUrl.value
      );

      // clears form
      (event.target.name.value = ""),
        (event.target.breed.value = ""),
        (event.target.imageUrl.value = "");
    } catch (err) {
      console.error("Uh oh, trouble rendering the new player form!", err);
    }
  });
};

// forces scroll to top of page
function scrollToTop() {
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  await fetchAllPlayers();

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
