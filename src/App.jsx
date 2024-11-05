import React from "react";
import logo from "./assets/logo.png";
import reset from "./assets/reset.png";
function App() {
  return (
    <div className="appContainer">
      <span className="header-arrow">&lt;</span>
      <header className="hidden">
        <div className="logo-wrapper">
          <img src={logo} alt="" className="logo" />
          <h1 className="logo-title primaryHeader">
            Co-Op <br /> Compass
          </h1>
        </div>
        <div className="search-wrapper">
          <form id="searchForm">
            <input type="text" placeholder="game title.." name="" id="" />
            <button>
              <img src="./src/assets/search.png" alt="" />
            </button>
          </form>
        </div>
      </header>

      <section className="topRated hidden">
        <div className="topRated-header">
          <h2 className="secondaryHeader">Top Rated Games</h2>
          <button className="seeMore-btn">See More</button>
        </div>

        <article className="topRated-list ">
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
        </article>
      </section>

      <section className="genericList-wrapper hidden">
        <div className="genericList-filter">
          <button className="filterBtn-wrapper">
            <img className="filterImg" src="./src/assets/filter.png" alt="" />
            <span className="filterBtn">Filter</span>
          </button>
          <div className="filterPicker hidden">
            <div className="filterPicker-btn">
              <button className="filterResetBtn">
                <img src={reset} alt="" />
              </button>
              <button className="filterConfirmBtn">OK</button>
            </div>
            <div className="filterPicker-categories">
              <div className="filterCategories-wrapper">
                <h3>Categories</h3>
                <form action="">
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
                <form action="">
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
                <form action="">
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
          <div className="itemContainer">
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">DRAGON BALL: Sparking!</h3>
          </div>

          <div className="itemContainer">
            <img src="./src/assets/hogwarts-legacy.png" alt="" />
            <h3 className="gameTitle">Lords of the Fallen</h3>
          </div>

          <div className="itemContainer">
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

      <section className="categories hidden">
        <div className="categories-header">
          <h2 className="secondaryHeader">Categorias</h2>
          <button className="seeMore-btn">See More</button>
        </div>
        <ul className="categories-list">
          <li>Accion</li>
          <li>Aventura</li>
          <li>Simulacion</li>
          <li>Sandbox</li>
          <li>Estrategia</li>
          <li>Horror</li>
        </ul>
        <div className="categories-header">
          <h2 className="secondaryHeader">Consolas</h2>
          <button className="seeMore-btn">See More</button>
        </div>
        <ul className="categories-list">
          <li>PC</li>
          <li>Play 4</li>
          <li>Play 5</li>
          <li>Xbox</li>
          <li>Xbox 1</li>
          <li>Mobile</li>
        </ul>
      </section>

      <section className="gameDescription ">
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
            <div className="gameCard-genre-wrapper">
              <span className="regularText">Action</span>
              <span className="regularText">Adventure</span>
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
        </div>
      </section>

      <footer>
        <p className="footer-text">Co-Op Compass - 2024</p>
        <p className="footer-text">Made by Santiago Hernandez</p>
      </footer>
    </div>
  );
}

export default App;
