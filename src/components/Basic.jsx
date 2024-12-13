import React from "react";

const Basic = () => {
  return (
    <div>
      <header>
        <span className="header-arrow">&lt;</span>
        <h1>CoOp Compass</h1>
        <form id="searchForm">
          <input type="text" placeholder="game title" name="" id="" />
          <button>🔍</button>
        </form>
      </header>

      <section className="topRated">
        <div>
          <h2>Top Games</h2>
          <button>See more</button>
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
        </article>
      </section>

      <section className="genericList">
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
        <div>
          <h2>Categorias</h2>
          <button>See more</button>
        </div>
        <article>
          <div>
            <ul>
              <li>Accion</li>
              <li>Aventura</li>
              <li>Simulacion</li>
              <li>Sandbox</li>
              <li>Estrategia</li>
              <li>Horror</li>
            </ul>
          </div>
        </article>
        <article>
          <div>
            <h2>Consolas</h2>
            <button>See more</button>
            <ul>
              <li>PC</li>
              <li>Play 4</li>
              <li>Play 5</li>
              <li>Xbox</li>
              <li>Xbox 1</li>
              <li>Mobile</li>
            </ul>
          </div>
        </article>
      </section>
      <section className="gameDescription">
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

      {/* <script src="./src/secrets.js"></script>
    <script src="./src/main.jsx"></script> */}
    </div>
  );
};

export default Basic;
