import React, { useRef, useEffect } from "react";
import logo from "./assets/logo.png";
import reset from "./assets/reset.png";
import API_KEY from "./secrets.js";
function App() {
  console.log(API_KEY);

  const headerArrowRef = useRef(null);
  const headerRef = useRef(null);
  const topRatedRef = useRef(null);
  const categoriesRef = useRef(null);
  const gameDescriptionRef = useRef(null);
  const gameCardArrowRef = useRef(null);
  const genericListRef = useRef(null);
  const filterPicker = useRef(null);
  const consolesRef = useRef(null);
  const playersRef = useRef(null);
  const genresRef = useRef(null);

  function hideMost() {
    headerArrowRef.current.classList.add("hidden");
    topRatedRef.current.classList.remove("hidden");
    categoriesRef.current.classList.remove("hidden");
    genericListRef.current.classList.add("hidden");
  }
  const handleBack = () => {
    hideMost();
  };

  function genericListView() {
    genericListRef.current.classList.remove("hidden");
    headerArrowRef.current.classList.remove("hidden");
    topRatedRef.current.classList.add("hidden");
    categoriesRef.current.classList.add("hidden");
  }

  const searchBtnHandler = (event) => {
    event.preventDefault();
    genericListView();
  };
  const topRatedBtnHandler = (id) => {
    genericListView();
  };

  function toggleGameCard() {
    headerRef.current.classList.toggle("hidden");
    genericListRef.current.classList.add("hidden");
    gameDescriptionRef.current.classList.toggle("hidden");
    topRatedRef.current.classList.toggle("hidden");
    categoriesRef.current.classList.add("hidden");
  }
  const gamePickHandler = (id) => {
    toggleGameCard();
    getGameDescription(id);
  };

  const gamePickBackHandler = () => {
    headerRef.current.classList.remove("hidden");
    genericListRef.current.classList.add("hidden");
    topRatedRef.current.classList.remove("hidden");
    categoriesRef.current.classList.remove("hidden");

    while (gameDescriptionRef.current.firstChild) {
      gameDescriptionRef.current.removeChild(
        gameDescriptionRef.current.firstChild
      );
    }
  };

  function toggleFilter() {
    filterPicker.current.classList.toggle("hidden");
  }
  const confirmFilter = () => {
    const genres = Array.from(
      genresRef.current.querySelectorAll("input[type='checkbox']")
    )
      .filter((input) => input.checked)
      .map((input) => input.name);

    const consoles = Array.from(
      consolesRef.current.querySelectorAll("input[type='checkbox']")
    )
      .filter((input) => input.checked)
      .map((input) => input.name);

    const players = Array.from(
      playersRef.current.querySelectorAll("input[type='checkbox']")
    )
      .filter((input) => input.checked)
      .map((input) => input.name);
    const filterData = {
      genres,
      consoles,
      players,
    };
    toggleFilter();
  };

  async function getTrendingGamesPreview(page_size = 10) {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}&tags=co-op&metacritic=95&ordering=-metacritic`
      );
      if (!res.ok) {
        throw new Error(
          `Failed to fetch trending games: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      const topRated = data.results;
      const topRatedList = document.querySelector(".topRated-list");
      topRated.forEach((game) => {
        const topRatedDiv = document.createElement("div");
        const topRatedImg = document.createElement("img");
        const topRatedH3 = document.createElement("h3");
        topRatedDiv.addEventListener("click", () => gamePickHandler(game.id));
        topRatedImg.setAttribute("src", game.background_image);
        topRatedImg.setAttribute("alt", game.name);
        topRatedH3.textContent = game.name;
        topRatedH3.classList.add("gameTitle");
        topRatedDiv.appendChild(topRatedH3);
        topRatedDiv.appendChild(topRatedImg);
        topRatedList.appendChild(topRatedDiv);
      });
    } catch (error) {
      console.error("Error fetching trending games:", error);
    }
  }
  getTrendingGamesPreview();
  async function getGameDescription(id) {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      if (!res.ok) {
        throw new Error(
          `Failed to fetch game description: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      const gameContent = data;

      //game card back arrow
      const gameCardArrow = document.createElement("span");
      gameCardArrow.className="gameCard-arrow";
      gameCardArrow.addEventListener("click", gamePickBackHandler);
      gameCardArrow.setAttribute("ref", "gameCardArrowRef");
      gameCardArrow.textContent = "<";
      gameDescriptionRef.current.appendChild(gameCardArrow);

      //game cover
      const gameCoverDiv = document.createElement("div");
      gameCoverDiv.className="gameCover";
      gameCoverDiv.style.backgroundImage = `url(${gameContent.background_image})`;
      gameDescriptionRef.current.appendChild(gameCoverDiv);

      //game card starts
      const gameCard = document.createElement("div");
      gameCard.className="gameCard";
      gameDescriptionRef.current.appendChild(gameCard);

      //game info starts
      const gameInfo = document.createElement("div");
      gameInfo.className="gameCard-info";
      gameCard.appendChild(gameInfo);

      //game title wrapper starts
      const gameCardTitleWrapper = document.createElement("div");
      gameCardTitleWrapper.className="gameCard-title-wrapper";
      gameInfo.appendChild(gameCardTitleWrapper);

      //game title
      const gameTitle = document.createElement("h2");
      gameTitle.className="gameTitle";
      gameTitle.textContent = gameContent.name;
      gameCardTitleWrapper.appendChild(gameTitle);

      //game rating
      const gameCardRating = document.createElement("div");
      gameCardRating.className="gameCard-rating";
      gameCardTitleWrapper.appendChild(gameCardRating);

      //game rating star
      const gameCardRatingStar = document.createElement("span");
      gameCardRatingStar.className="gameCard-rating-star";
      gameCardRating.appendChild(gameCardRatingStar);

      //game rating icon
      const gameCardStar = document.createElement("i");
      gameCardStar.className="fa-solid fa-star";
      gameCardRatingStar.appendChild(gameCardStar);

      //game rating number
      const gameCardRatingNumber = document.createElement("span");
      gameCardRatingNumber.className="gameCard-rating-number regularText";
      gameCardRatingNumber.textContent = data.rating.toFixed(1);;
      gameCardRating.appendChild(gameCardRatingNumber);
      //game title wrapper finishes

      //game card description wrapper starts
      const gameCardDescriptionWrapper = document.createElement("div");
      gameCardDescriptionWrapper.className="gameCard-description-wrapper";
      gameInfo.appendChild(gameCardDescriptionWrapper);

      //game card description
      const gameCardDescription = document.createElement("p");
      gameCardDescription.className="gameCard-description regularText";
      gameCardDescription.innerHTML = gameContent.description;
      gameCardDescriptionWrapper.appendChild(gameCardDescription);
      //game card description wrapper finishes

      //game card screenshots wrapper starts
      const gameCardScreenshotsWrapper = document.createElement("div");
      gameCardScreenshotsWrapper.className="gameCard-screenshots-wrapper";
      gameInfo.appendChild(gameCardScreenshotsWrapper);

      //game card screenshots title
      const gameCardScreenshotsTitle = document.createElement("h3");
      gameCardScreenshotsTitle.className="gameCard-screenshots-title regularText";
      gameCardScreenshotsTitle.textContent = "Screenshots";
      gameCardScreenshotsWrapper.appendChild(gameCardScreenshotsTitle);

      //game card screenshots
      const gameCardScreenshotsList = document.createElement("div");
      gameCardScreenshotsList.className="gameCard-screenshots-list";
      gameCardScreenshotsWrapper.appendChild(gameCardScreenshotsList);

        //fetch and display screenshots
      async function getGameScreenshots(id) {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
        );
        const data = await res.json();
        data.results.forEach((screenshot) => {
          const gameCardScreenshot = document.createElement("div");
          gameCardScreenshot.className="gameCard-screenshots";

          const gameCardScreenshotImg = document.createElement("img");
          gameCardScreenshotImg.src = screenshot.image;
          gameCardScreenshot.alt = screenshot.image;

          gameCardScreenshot.appendChild(gameCardScreenshotImg);
          gameCardScreenshotsList.appendChild(gameCardScreenshot);
        });
      }
      getGameScreenshots(id);
      // game card screenshots wrapper finishes
      //     game info finishes
    } catch (error) {
      console.error("Error fetching game description:", error);
    }
  }
  return (
    <div className="appContainer">
      <span
        className="header-arrow hidden"
        onClick={handleBack}
        ref={headerArrowRef}
      >
        &lt;
      </span>
      <header className="header" id="header" ref={headerRef}>
        <div className="logo-wrapper">
          <img src={logo} alt="" className="logo" />
          <h1 className="logo-title primaryHeader">
            Co-Op <br /> Compass
          </h1>
        </div>
        <div className="search-wrapper">
          <form id="searchForm">
            <input type="text" placeholder="game title.." name="" id="" />
            <button className="searchBtn" onClick={searchBtnHandler}>
              <img src="./src/assets/search.png" alt="" />
            </button>
          </form>
        </div>
      </header>
      <section className="topRated " ref={topRatedRef}>
        <div className="topRated-header">
          <h2 className="secondaryHeader">Top Rated Games</h2>
          <button
            className="seeMore-btn"
            id="topRated-Btn"
            onClick={topRatedBtnHandler}
          >
            See More
          </button>
        </div>

        <article className="topRated-list "></article>
      </section>
      <section className="genericList-wrapper hidden" ref={genericListRef}>
        <div className="genericList-filter">
          <button className="filterBtn-wrapper" onClick={toggleFilter}>
            <img className="filterImg" src="./src/assets/filter.png" alt="" />
            <span className="filterBtn">Filter</span>
          </button>
          <div className="filterPicker hidden" ref={filterPicker}>
            <div className="filterPicker-btn">
              <button className="filterResetBtn">
                <img src={reset} alt="" />
              </button>
              <button className="filterConfirmBtn" onClick={confirmFilter}>
                OK
              </button>
            </div>
            <div className="filterPicker-categories">
              <div className="filterCategories-wrapper">
                <h3>Categories</h3>
                <form action="" ref={genresRef}>
                  <label htmlFor="">
                    <input type="checkbox" name="action" id="action" />
                    Action
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Adventure
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    RPG
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Horror
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Strategy
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Simulation
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Shooter
                  </label>
                </form>
              </div>
              <div className="filterConsoles-wrapper">
                <h3>Consoles</h3>
                <form action="" ref={consolesRef}>
                  <label htmlFor="">
                    <input type="checkbox" />
                    PC
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    PlayStation 4
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    PlayStation 5
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Wii
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Wii U
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Switch
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Xbox 360
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Xbox One
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    Mobile
                  </label>
                </form>
              </div>
              <div className="filterPlayers-wrapper">
                <h3>Players</h3>
                <form action="" ref={playersRef}>
                  <label htmlFor="">
                    <input type="checkbox" />2
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />3
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />4
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />5
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />6
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    7-10
                  </label>
                  <label htmlFor="">
                    <input type="checkbox" />
                    10+
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="genericList">
          <div className="itemContainer" onClick={gamePickHandler}>
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">DRAGON BALL: Sparking!</h3>
          </div>

          <div className="itemContainer" onClick={gamePickHandler}>
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">Lords of the Fallen</h3>
          </div>

          <div className="itemContainer" onClick={gamePickHandler}>
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">Baldurs Gate</h3>
          </div>

          <div className="itemContainer">
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">Hogwarts Legacy</h3>
          </div>

          <div className="itemContainer">
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">
              NARUTO X BORUTO Ultimate Ninja STORM CONNECTIONS
            </h3>
          </div>

          <div className="itemContainer">
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">Game Title</h3>
          </div>
          <div className="itemContainer">
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">Game Title</h3>
          </div>
        </div>
      </section>
      <section className="categories " ref={categoriesRef}>
        <div className="categories-header">
          <h2 className="secondaryHeader">Categorias</h2>
        </div>
        <ul className="categories-list">
          <li>Accion</li>
          <li>Aventura</li>
          <li>Simulacion</li>
          <li>Sandbox</li>
          <li>Estrategia</li>
          <li>Horror</li>
        </ul>
        <button className="more-btn">More</button>
        <div className="categories-header">
          <h2 className="secondaryHeader">Consolas</h2>
        </div>
        <ul className="categories-list">
          <li>PC</li>
          <li>Play 4</li>
          <li>Play 5</li>
          <li>Xbox</li>
          <li>Xbox 1</li>
          <li>Mobile</li>
        </ul>
        <button className="more-btn">More</button>
      </section>
      <section className="gameDescription hidden" ref={gameDescriptionRef}>
        {/* <span
          className="gameCard-arrow "
          onClick={gamePickBackHandler}
          ref={gameCardArrowRef}
        >
          &lt;
        </span>
        <div className="gameCover"></div>
        <div className="gameCard">
          <div className="gameInfo">
            <div className="gameCard-title-wrapper">
              <h2 className="gameTitle">Game Title</h2>
              <div className="gameCard-rating">
                <span className="gameCard-rating-star">
                  <i className="fa-solid fa-star fa-sm" />
                </span>
                <span className="gameCard-rating-number regularText">7.6</span>
              </div>
            </div>

            <div className="gameCard-description-wrapper">
              <p className="gameCard-description regularText">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolorem accusantium ad provident fugiat nam enim dolore quo
                laudantium saepe aperiam aliquam et alias harum odio doloribus,
                suscipit repudiandae ipsa voluptate.
              </p>
            </div>
            <div className="gameCard-screenshots-wrapper">
              <h3 className="gameCard-screenshots-title regularText">
                Screenshots
              </h3>
              <div className="gameCard-screenshots-list">
                <div className="gameCard-screenshots">
                  <img src="./src/assets/hogwarts-legacy.png" alt="" />
                </div>
                <div className="gameCard-screenshots">
                  <img src="./src/assets/hogwarts-legacy.png" alt="" />
                </div>
                <div className="gameCard-screenshots">
                  <img src="./src/assets/hogwarts-legacy.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <article className="similarGames-wrapper">
            <h2 className="similarGames-title regularText">Similar Games</h2>
            <div className="similarGames-list">
              <div>
                <img src="./src/assets/hogwarts-legacy.png" alt="" />
              </div>
              <div>
                <img src="./src/assets/hogwarts-legacy.png" alt="" />
              </div>
              <div>
                <img src="./src/assets/hogwarts-legacy.png" alt="" />
              </div>
              <div>
                <img src="./src/assets/hogwarts-legacy.png" alt="" />
              </div>
            </div>
          </article>
        </div>  */}
      </section>

      <footer>
        <p className="footer-text">Co-Op Compass - 2024</p>
        <p className="footer-text">Made by Santiago Hernandez</p>
      </footer>
    </div>
  );
}

export default App;
