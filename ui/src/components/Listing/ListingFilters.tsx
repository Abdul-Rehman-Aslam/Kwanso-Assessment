import React from "react";

interface ListingFiltersProps {
  setGenderFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

const ListingFilters: React.FC<ListingFiltersProps> = ({ setGenderFilter }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenderFilter(event.target.value);
  };

  return (
    <div>
      <label htmlFor="genderFilter">Filter by Gender:</label>
      <select id="genderFilter" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default ListingFilters;
