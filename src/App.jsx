import React from "react";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="appContainer">
      <header>
        <span className="header-arrow">&lt;</span>
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

      <section className="topRated">
        <div className="topRated-header">
          <h2 className="secondaryHeader">Top Rated Games</h2>
          <button className="seeMore-btn">See More</button>
        </div>

        <article className="topRated-list">
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

      <section className="genericList hidden">
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
      </section>

      <section className="categories">
        <div className="categories-header">
          <h2 className="secondaryHeader">Categorias</h2>
          <button className="seeMore-btn">See More</button>
        </div>
        <ul className="categories-list">
          <li><img src="" alt="" />Accion</li>
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

      <section className="gameDescription hidden">
        <div>
          <h2>Game Title</h2>
          <span>7.6</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
            accusantium ad provident fugiat nam enim dolore quo laudantium saepe
            aperiam aliquam et alias harum odio doloribus, suscipit repudiandae
            ipsa voluptate.
          </p>
        </div>
        <article className="similarGames-list">
          <h2>Similar Games</h2>
          <div>
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
      </section>

      <footer>
        <p className="footer-text">Co-Op Compass - 2024</p>
        <p className="footer-text">Made by Santiago Hernandez</p>
      </footer>
    </div>
  );
}

export default App;
