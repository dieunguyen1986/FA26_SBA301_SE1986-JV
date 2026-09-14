const TablePlayer = ({ players }) => {

  return (
    <table className="table-dark table-striped table-hover">
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
        {players.map((p, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{p.playerName}</td>
            <td>{p.playerNumber}</td>
            <td>{p.playerPosition}</td>
            <td>{p.playerStatus}</td>
            <td>
              <button className="btn btn-primary">Change Status</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePlayer;
