import React from "react";

const ListingsElement = ({ listings, applyFilter }) => (
  <div>
    {listings && listings.map((listing) => (
      <div key={listing.id}>
        <div className="listings">
          <img src={listing.logo} alt={listing.company} />
          <div>
            <h3>{listing.company}</h3>
            <div>
              <span onClick={() => applyFilter("role", listing.role)}>
                {listing.role}
              </span>
              <span onClick={() => applyFilter("level", listing.level)}>
                {listing.level}
              </span>
              {listing.languages.map((language) => (
                <span
                  key={language}
                  onClick={() => applyFilter("languages", language)}
                >
                  {language}
                </span>
              ))}
              {listing.tools &&
                listing.tools.map((tool) => (
                  <span key={tool} onClick={() => applyFilter("tools", tool)}>
                    {tool}
                  </span>
                ))}
            </div>
          </div>
          <h2>{listing.position}</h2>
          <p>
            {listing.postedAt} - {listing.contract} - {listing.location}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default ListingsElement;

