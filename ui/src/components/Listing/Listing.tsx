import React, { useState, useEffect } from "react";
import ListingItem from "./ListingItem";
import ListingFilters from "./ListingFilters";
import Pagination from "./Pagination";
import { fetchUsers, User } from "../../services/api";

const Listing: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API on component mount
    const fetchData = async () => {
      const data = await fetchUsers();
      setUsers(data.results);
      setFilteredUsers(data.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters when the genderFilter changes
    if (genderFilter) {
      const filtered = users.filter((user) => user.gender === genderFilter);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [genderFilter, users]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Additional logic to display users for the new page
  };

  return (
    <div>
      <ListingFilters setGenderFilter={setGenderFilter} />
      {filteredUsers
        .slice((currentPage - 1) * 10, currentPage * 10)
        .map((user) => (
          <ListingItem key={user.login.uuid} user={user} />
        ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / 10)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Listing;
