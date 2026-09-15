export default function Product(props) {
  return (
    <>
      <div className="card">
        <img className="card-img-top" src={props.image} alt={props.name} />
        <div className="card-body">
          <h4 className="card-title">{props.name}</h4>
          <p className="card-text">${props.price.toFixed(2)}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text">Favorite: {props.favorite}</p>
            <a
              href="#"
              className="btn btn-primary"
              onClick={()=> {props.handleFavorite(props.id)}}
            >
              Like
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
