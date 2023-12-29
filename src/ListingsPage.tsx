import React, { useState, useEffect } from "react";
import ListingsElement from "./ListingsElement";

/**
 * Steps to take:
 *
 * Declare the object (import data from a different component)
 * declare a variable containing filter specs
 * Fetch data, set state
 * --consider putting filter variables in a separate component
 *
 * ??can we consolidate the span onClick function for each listings. element?
 * eliminate redundancies in final display JSX
 *
 */

//declare object
interface Listing {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

//declare a variable w/ filter specs
const defaultFilterSettings = {
  role: "",
  level: "",
  languages: [],
  tools: [],
};

const FilterControl = ({ label, items, applyFilter }) => (
  <div>
    <label>{label}: </label>
    {items.map((item) => (
      <span key={item} onClick={() => applyFilter(label.toLowerCase(), item)}>
        {item}
      </span>
    ))}
  </div>
);

const ListingsPage = () => {
  const [listingsData, setListingsData] = useState<Listing[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilterSettings);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setListingsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        return ListingsElement;
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error!";

  // Filter listings based on current filter settings
  const filteredListings = listingsData.filter((listing) => {
    // Your filter logic goes here
    const roleMatches = filters.role === "" || listing.role === filters.role;
    const levelMatches = filters.level === "" || listing.level === filters.level;
    const languagesMatch = filters.languages.length === 0 || filters.languages.every(lang => listing.languages.includes(lang));
    const toolsMatch = filters.tools.length === 0 || filters.tools.every(tool => listing.tools.includes(tool));

    return roleMatches && levelMatches && languagesMatch && toolsMatch;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "languages" || filterType === "tools") {
        // If the value is already in the filter, remove it, otherwise add it
        const updatedArray = prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value];

        return { ...prevFilters, [filterType]: updatedArray };
      }
      return { ...prevFilters, [filterType]: value };
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilterSettings);
  };

  const applyFilter = (filterType, value) => {
    handleFilterChange(filterType, value);
  };

  return (
    <div>
      {/* Filter controls */}
      <div>
        <FilterControl
          label="Role"
          items={[filters.role]}
          applyFilter={() => {}}
        />
        <FilterControl
          label="Level"
          items={[filters.level]}
          applyFilter={() => {}}
        />
        <FilterControl
          label="Languages"
          items={filters.languages}
          applyFilter={(type, item) => applyFilter(type, item)}
        />
        <FilterControl
          label="Tools"
          items={filters.tools}
          applyFilter={(type, item) => applyFilter(type, item)}
        />
      </div>
      <div>
        <button onClick={resetFilters}>Reset Filters</button>
        {/* Display filtered listings */}
      </div>
      <ListingsElement listings={filteredListings} applyFilter={applyFilter} />
    </div>
  );
};

export default ListingsPage;
