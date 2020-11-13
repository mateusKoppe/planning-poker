import React from "react";

import PokerTable from "../../components/PokerTable/index";

const Home = () => {
  return (
    <div className="Home">
      <div className="align-items-center">
        <div>
          <h2>Planning Poker</h2>
          <p>Estimate yours tasks easily</p>
          <div>
            <button>Create Room</button>
          </div>
        </div>
        <div>
          <PokerTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
