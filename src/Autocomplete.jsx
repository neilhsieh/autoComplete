import React, { useState } from "react";
import axios from "axios";

export const AutoComplete = () => {
  const [results, setResults] = useState(null);

  const search = async (q) => {
    const res = await axios(`http://localhost:9999/search?q=${q}`);
    console.log(res.data);

    setResults(res.data);
  };

  return (
    <div>
      <input
        type="text"
        name="search-input"
        onChange={(e) => search(e.target.value)}
      />
      {results && (
        <ul className="results">
          {results.map((r, key) => (
            <li key={key}>
              {r.name.first} {r.name.last}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
