import React, { useRef, useState, useEffect } from "react";
import logo from "./assets/logo.png";
import reset from "./assets/reset.png";
import API_KEY from "./secrets.js";
function App() {
  const [searchContent, setSearchContent] = useState("");
  useEffect(() => {
    getGamesList();
  }, []);
  let gameGenresList;
  let gamePlatformsList;
  var homePage = true;
  var currentGameId;
  var currentSearchQuery;

  const headerArrowRef = useRef(null);
  const headerRef = useRef(null);
  const topRatedRef = useRef(null);
  const categoriesRef = useRef(null);
  const gameDescriptionRef = useRef(null);
  const gameCardArrowRef = useRef(null);
  const genericListWrapperRef = useRef(null);
  const genericListRef = useRef(null);
  const filterPicker = useRef(null);
  const consolesRef = useRef(null);
  const playersRef = useRef(null);
  const genresRef = useRef(null);

  function searchInputChange(e) {
    setSearchContent(e.target.value);
  }

  function showHome() {
    headerArrowRef.current.classList.add("hidden");
    topRatedRef.current.classList.remove("hidden");
    categoriesRef.current.classList.remove("hidden");
    genericListWrapperRef.current.classList.add("hidden");
  }
  function genericListBackHandle() {
    homePage = true;
    
    showHome();
  }

  function showList() {
    topRatedRef.current.classList.add("hidden");
    categoriesRef.current.classList.add("hidden");
    headerArrowRef.current.classList.remove("hidden");
    genericListWrapperRef.current.classList.remove("hidden");
  }

  function oldListRemover() {
    const genericListHeader = document.querySelector(".genericList-header");
    genericListHeader.innerHTML = "";
    if (genericListRef.current.children) {
      while (genericListRef.current.firstChild) {
        genericListRef.current.removeChild(genericListRef.current.firstChild);
      }
    }
  }
  function searchBtnHandler(event) {
    event.preventDefault();
    homePage = false;
    const searchQueryContent = `&search=${searchContent}`;
    if (currentSearchQuery === searchContent) {
      showList();
    }
    if (
      currentSearchQuery !== searchContent &&
      searchContent !== "" &&
      searchContent !== " "
    ) {
      oldListRemover();
      getGamesList(40, ".genericList", searchQueryContent);
      currentSearchQuery = searchContent;
      showList();
    }
  }
  function topRatedBtnHandler() {
    homePage = false;
    oldListRemover();
    showList();
    getGamesList(40, ".genericList", undefined, "Top Rated");
  }

  function showGameCard() {
    headerRef.current.classList.add("hidden");
    headerArrowRef.current.classList.add("hidden");
    filterPicker.current.classList.add("hidden");
    genericListWrapperRef.current.classList.add("hidden");
    gameDescriptionRef.current.classList.remove("hidden");
    topRatedRef.current.classList.add("hidden");
    categoriesRef.current.classList.add("hidden");
  }
  function gamePickHandler(id) {
    const gameCard = document.querySelector(".gameDescription");
    if (!gameCard.children) {
      getGameDescription(id);
    } else if (gameCard.children && currentGameId !== id) {
      while (gameCard.firstChild) {
        gameCard.removeChild(gameCard.firstChild);
      }
      getGameDescription(id);
    }
    showGameCard();
    currentGameId = id;
  }
  function gameCardHide() {
    gameDescriptionRef.current.classList.add("hidden");
  }
  function gameCardBackHandler() {
    if (!homePage) {
      genericListWrapperRef.current.classList.remove("hidden");
      headerArrowRef.current.classList.remove("hidden");
    }
    if (homePage) {
      showHome();
    }
    gameCardHide();
    headerRef.current.classList.remove("hidden");
    return;
  }

  function toggleFilter() {
    filterPicker.current.classList.toggle("hidden");
  }
  function confirmFilter() {
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
  }

  async function getGamesList(
    page_size = 10,
    querySelector = ".topRated-list",
    searcPrmtr = "metacritic=95&ordering=-metacritic",
    categoryTitle = ""
  ) {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}&tags=co-op&${searcPrmtr}`
      );

      const data = await res.json();
      const gamesListData = data.results;
      const querySelectedElement = document.querySelector(`${querySelector}`);
      const listHeaderSelector = document.querySelector(".genericList-header");
      listHeaderSelector.innerHTML = categoryTitle;
      gamesListData.forEach((game) => {
        const gamesListDiv = document.createElement("div");
        const gamesListImg = document.createElement("img");
        const gamesListH3 = document.createElement("h3");
        gamesListDiv.addEventListener("click", () => {
          gamePickHandler(game.id);
        });
        gamesListDiv.classList.add("itemContainer");
        gamesListImg.setAttribute("src", game.background_image);
        gamesListImg.setAttribute("alt", game.name);
        gamesListH3.textContent = game.name;
        gamesListH3.classList.add("gameTitle");
        gamesListDiv.appendChild(gamesListH3);
        gamesListDiv.appendChild(gamesListImg);
        querySelectedElement.appendChild(gamesListDiv);
      });
    } catch (error) {
      console.error("Error fetching trending games:", error);
    }
  }

  async function getGameDescription(id) {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      const data = await res.json();
      const gameContent = data;

      //game card back arrow
      const gameCardArrow = document.createElement("span");
      gameCardArrow.className = "gameCard-arrow";
      gameCardArrow.addEventListener("click", gameCardBackHandler);
      gameCardArrow.setAttribute("ref", "gameCardArrowRef");
      gameCardArrow.textContent = "<";
      gameDescriptionRef.current.appendChild(gameCardArrow);

      //game cover
      const gameCoverDiv = document.createElement("div");
      gameCoverDiv.className = "gameCover";
      gameCoverDiv.style.backgroundImage = `url(${gameContent.background_image})`;
      gameDescriptionRef.current.appendChild(gameCoverDiv);

      //game card starts
      const gameCard = document.createElement("div");
      gameCard.className = "gameCard";
      gameDescriptionRef.current.appendChild(gameCard);

      //game info starts
      const gameInfo = document.createElement("div");
      gameInfo.className = "gameCard-info";
      gameCard.appendChild(gameInfo);

      //game title wrapper starts
      const gameCardTitleWrapper = document.createElement("div");
      gameCardTitleWrapper.className = "gameCard-title-wrapper";
      gameInfo.appendChild(gameCardTitleWrapper);

      //game title
      const gameTitle = document.createElement("h2");
      gameTitle.className = "gameTitle";
      gameTitle.textContent = gameContent.name;
      gameCardTitleWrapper.appendChild(gameTitle);

      //game rating
      const gameCardRating = document.createElement("div");
      gameCardRating.className = "gameCard-rating";
      gameCardTitleWrapper.appendChild(gameCardRating);

      //game rating star
      const gameCardRatingStar = document.createElement("span");
      gameCardRatingStar.className = "gameCard-rating-star";
      gameCardRating.appendChild(gameCardRatingStar);

      //game rating icon
      const gameCardStar = document.createElement("i");
      gameCardStar.className = "fa-solid fa-star";
      gameCardRatingStar.appendChild(gameCardStar);

      //game rating number
      const gameCardRatingNumber = document.createElement("span");
      gameCardRatingNumber.className = "gameCard-rating-number regularText";
      gameCardRatingNumber.textContent = data.rating.toFixed(1);
      gameCardRating.appendChild(gameCardRatingNumber);
      //game title wrapper finishes

      //game card description wrapper starts
      const gameCardDescriptionWrapper = document.createElement("div");
      gameCardDescriptionWrapper.className = "gameCard-description-wrapper";
      gameInfo.appendChild(gameCardDescriptionWrapper);

      //game card description
      const gameCardDescription = document.createElement("p");
      gameCardDescription.className = "gameCard-description regularText";
      gameCardDescription.innerHTML = gameContent.description;
      gameCardDescriptionWrapper.appendChild(gameCardDescription);
      //game card description wrapper finishes

      //game card screenshots wrapper starts
      const gameCardScreenshotsWrapper = document.createElement("div");
      gameCardScreenshotsWrapper.className = "gameCard-screenshots-wrapper";
      gameInfo.appendChild(gameCardScreenshotsWrapper);

      //game card screenshots title
      const gameCardScreenshotsTitle = document.createElement("h3");
      gameCardScreenshotsTitle.className =
        "gameCard-screenshots-title regularText";
      gameCardScreenshotsTitle.textContent = "Screenshots";

      gameCardScreenshotsWrapper.appendChild(gameCardScreenshotsTitle);

      //game card screenshots
      const gameCardScreenshotsList = document.createElement("div");
      gameCardScreenshotsList.className = "gameCard-screenshots-list";

      gameCardScreenshotsWrapper.appendChild(gameCardScreenshotsList);

      //fetch and display screenshots

      getGameScreenshots(id, gameCardScreenshotsList);
      // game card screenshots wrapper finishes
      //     game info finishes
    } catch (error) {
      console.error("Error fetching game description:", error);
    }
    function enlargeImage() {
      const enlargedChildren = document.querySelector(".enlarged");
      if (enlargedChildren && enlargedChildren !== this) {
        enlargedChildren.classList.remove("enlarged");
      }
      this.classList.toggle("enlarged");
    }

    async function getGameScreenshots(id, gameCardScreenshotsList) {
      const res = await fetch(
        `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
      );
      const data = await res.json();
      data.results.forEach((screenshot) => {
        const gameCardScreenshot = document.createElement("div");
        gameCardScreenshot.className = "gameCard-screenshots";

        const gameCardScreenshotImg = document.createElement("img");
        gameCardScreenshotImg.src = screenshot.image;
        gameCardScreenshotImg.alt = screenshot.image;
        gameCardScreenshotImg.onclick = function () {
          enlargeImage.call(this);
        };

        gameCardScreenshot.appendChild(gameCardScreenshotImg);
        gameCardScreenshotsList.appendChild(gameCardScreenshot);
      });
    }
  }

  async function getGameCategoriesList(listID) {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/${listID}?key=${API_KEY}&page_size=50`
      );
      if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
      }
      const data = await res.json();
      if (listID === "genres") gameGenresList = data.results;
      else if (listID === "platforms") gamePlatformsList = data.results;

      return listID;
    } catch (error) {
      console.error("Error fetching game description:", error);
    }
  }

  function firstCategoriesFiller(listID) {
    const gameCategoriesList =
      listID === "genres" ? gameGenresList : gamePlatformsList;
    const categoriesContainer = document.getElementById(listID);
    gameCategoriesList.slice(0, 8).forEach((category) => {
      const categoriesLI = document.createElement("li");
      categoriesLI.innerHTML = category.name;
      categoriesLI.onclick = function (){
        categoriesHandler(category.id, category.name, listID);
      } ;

      
      categoriesContainer.appendChild(categoriesLI);
    });
  }

  function moreLoader(event) {
    const expanded = event.target.innerHTML;
    event.target.innerHTML =
      event.target.innerHTML === "More" ? "Less" : "More";

    const listID = event.target.id === "morePlatforms" ? "platforms" : "genres";
    const gameCategoriesList =
      listID === "genres" ? gameGenresList : gamePlatformsList;
    const categoriesContainer = document.getElementById(listID);

    if (expanded === "More") {
      gameCategoriesList.slice(8).forEach((category) => {
        const categoriesLI = document.createElement("li");
        categoriesLI.innerHTML = category.name;
        categoriesLI.onclick = categoriesHandler;
        categoriesContainer.appendChild(categoriesLI);
      });
    }
    if (expanded === "Less") {
      while (categoriesContainer.children.length > 8) {
        categoriesContainer.removeChild(categoriesContainer.lastChild);
      }
    }
  }
  function categoriesHandler(categoryId, categoryName, listID) {
    homePage = false;
        oldListRemover();
        showList();
        getGamesList(
          50,
          ".genericList",
          `${listID}=` + categoryId,
          categoryName
        );
  }
  getGameCategoriesList("genres").then(firstCategoriesFiller);
  getGameCategoriesList("platforms").then(firstCategoriesFiller);

  return (
    <div className="appContainer">
      <span
        className="header-arrow hidden"
        onClick={genericListBackHandle}
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
            <input
              type="text"
              placeholder="game title.."
              name=""
              id=""
              value={searchContent}
              onChange={searchInputChange}
            />
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
      <section
        className="genericList-wrapper hidden"
        ref={genericListWrapperRef}
      >
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
        <div className="genericList-header primaryHeader"></div>
        <div className="genericList" ref={genericListRef}></div>
      </section>
      <section className="categories " ref={categoriesRef}>
        <div className="categories-header">
          <h2 className="secondaryHeader">Genre</h2>
        </div>
        <ul className="categories-list " id="genres"></ul>
        <button className="more-btn" id="moreGenres" onClick={moreLoader}>
          More
        </button>
        <div className="categories-header">
          <h2 className="secondaryHeader">Platforms</h2>
        </div>
        <ul className="categories-list " id="platforms"></ul>
        <button className="more-btn" id="morePlatforms" onClick={moreLoader}>
          More
        </button>
      </section>
      <section
        className="gameDescription hidden"
        ref={gameDescriptionRef}
      ></section>

      <footer>
        <p className="footer-text">Co-Op Compass - 2024</p>
        <p className="footer-text">Made by Santiago Hernandez</p>
      </footer>
    </div>
  );
}

export default App;
