import React from "react";
// import TablePlayer from "../components/TablePlayer";

class PlayerList extends React.Component {
  // Constructor

  constructor(props) {
    super(props);

    // Stateful component state
    this.state = {
      teamName: "SE1946-JV",
      players: [
        {
          id: 1,
          playerName: "John Doe",
          playerNumber: 10,
          playerPosition: "Forward",
          playerStatus: "Playing",
        },
        {
          id: 2,
          playerName: "Jane Smith",
          playerNumber: 7,
          playerPosition: "Midfielder",
          playerStatus: "Substitute",
        },
        {
          id: 3,
          playerName: "Mike Johnson",
          playerNumber: 4,
          playerPosition: "Defender",
          playerStatus: "Injured",
        },
        {
          id: 4,
          playerName: "Emily Davis",
          playerNumber: 1,
          playerPosition: "Goalkeeper",
          playerStatus: "Substitute",
        },
        {
          id: 5,
          playerName: "Chris Brown",
          playerNumber: 11,
          playerPosition: "Forward",
          playerStatus: "Playing",
        },
      ],
      coacher: "Coach Carter",
    };
  }

  // Functions
  componentDidMount() {
    console.log("PlayerList component mounted.");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("PlayerList component updated.");
  }

  componentWillUnmount() {
    console.log("PlayerList component will unmount.");
  }



  handleStatus = (id) => {

    const STATUS_CYCLE = ["Playing", "Substitute", "Injured"];
    const currentPlayer = this.state.players.find((p) => p.id === id);

    const status = currentPlayer.playerStatus;
    const newStatus = STATUS_CYCLE[(STATUS_CYCLE.indexOf(status) + 1) % STATUS_CYCLE.length];

    console.log("Current Player Status: ", status);

    const newPlayers = this.state.players.map((p) => {
      
      if(p.id === currentPlayer.id) {
        return { ...p, playerStatus: newStatus };
      }

      return p;
    });

    this.setState({ ...this.state, players: newPlayers });

    

  

  };

  render() {
    return (
      <>
        <h2>PLAYER LIST</h2>
        <p>Team Name: {this.state.teamName}</p>
        <p>Coacher: {this.state.coacher}</p>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player Name</th>
              <th scope="col">Number</th>
              <th scope="col">Position</th>
              <th scope="col">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map((p, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{p.playerName}</td>
                <td>{p.playerNumber}</td>
                <td>{p.playerPosition}</td>
                <td>{p.playerStatus}</td>
                <td>
                  {/* <button
                    className="btn btn-primary"
                    onClick={this.handleStatus}
                  >
                    Change Status
                  </button> */}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      alert(`Change Status for ${p.playerName}`);
                      this.handleStatus(p.id);
                    }}
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default PlayerList;
