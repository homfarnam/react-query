import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setpage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["planets", page],
    fetchPlanets
  );

  return (
    <div>
      <h2>Planets</h2>
     

      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <>
          <button
          onClick={()=> setpage(old=> Math.max(old-1,1))}
          disabled={page===1}
          >Previous Page</button>
          <span>{page}</span>
          <button
          onClick={()=> setpage(old=>(!latestData || !latestData.next ? old : old+1))}
          disabled={!latestData || !latestData.next}
          >Next Page</button>

          <div>
            {resolvedData.results.map((planet) => (
              <Planet planet={planet} key={planet.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
