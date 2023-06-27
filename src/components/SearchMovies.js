import React from "react";
import { useEffect, useState,useRef } from "react";
import { UseFetch } from "../hooks/UseFetch";
function SearchMovies(){

	const [movies, setMovies] = useState({
		movie:[]
	});

	let [keyword, setSearch] = useState (
		
	);

	useEffect(() => {
		UseFetch(`https://www.omdbapi.com/?s=${keyword}&apikey=895ee07f`)
		  .then(({Search}) => {
			setMovies(Search);
			console.log(Search)
			setSearch ( keyword);
		})
		.catch(() => console.error);
	  }, []);
	  
	  let buscador=useRef();
	
	if(!localStorage.getItem("buscador")){
		keyword = "asd"
}else{
	keyword= localStorage.getItem("buscador")
}

function buscar(){
	
	let result = buscador.current.value
	let localStorageValue = (localStorage.setItem("buscador",result))

}

	const apiKey = "X";
	
	return(
		<div className="container-fluid">
			{
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET"  >
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={buscador}  type="text" className="form-control" />
								
								</div>
								<button onClick={buscar} className="btn btn-info">Buscar</button>
							</form>
						</div>
					</div>
					<div className="row">
					<div className="col-12">
						{ keyword == "asd" ? <h2>Buscar una película</h2>:<h2>Películas para la palabra: {keyword}</h2>}
					</div>
						{/* Listado de películas */}
						{
						keyword !="asd" &&	movies.length > 0  ? movies.map((movie, i) => {
								return (
									
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: "90%", height: "400px", objectFit: "cover" }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							}):keyword !="asd" && movies.length === undefined && <h2>No se encontró la película</h2>
						}
					</div>
				</>
			}
		</div>
	)
}
export default SearchMovies;
