import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key, greeting, page) => {
  console.log(greeting);
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setpage] = useState(1);
  const { data, status } = useQuery(
    ["planets", "hello world", page],
    fetchPlanets
  );
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>
      <div className='buttons'>
        <button onClick={() => setpage(page - 1)}>Before Page</button>

        <p>Page {page}</p>
        {/* <button onClick={()=> setpage(2)}>Page 2</button>
<button onClick={()=> setpage(3)}>Page 3</button> */}
        <button onClick={() => setpage(page + 1)}>Next Page</button>
      </div>

      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
