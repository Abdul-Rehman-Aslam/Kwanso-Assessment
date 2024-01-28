import React from "react";
import { User } from "../../services/api";

interface ListingItemProps {
  user: User;
}

const ListingItem: React.FC<ListingItemProps> = ({ user }) => {
  return (
    <div>
      <img src={user.picture.thumbnail} alt="user-thumbnail" />
      <p>
        {user.name.first} {user.name.last}
      </p>
      <p>{user.email}</p>
      {/* Additional user details */}
    </div>
  );
};

export default ListingItem;
