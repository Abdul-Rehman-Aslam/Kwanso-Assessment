// src/components/UserProfile/UserProfile.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, User } from "../../services/api";

const UserProfile: React.FC = () => {
  const { uuid } = useParams<{ uuid: string | undefined }>();
  const [user, setUser] = useState<User | null>(null); // Set initial state to null

  useEffect(() => {
    // Check if uuid is defined before making the API call
    if (uuid) {
      // Fetch user data when the component mounts
      const fetchUserData = async () => {
        try {
          const userData = await fetchUser(uuid);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUserData();
    }
  }, [uuid]);

  if (!user) {
    // Display loading or error state
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <img
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <p>
        Name: {user.name.first} {user.name.last}
      </p>
      <p>Email: {user.email}</p>
      {/* Additional user details */}
    </div>
  );
};

export default UserProfile;

// // src/components/UserProfile/UserProfile.tsx

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchUser, User } from "../../services/api";

// const UserProfile: React.FC = () => {
//   const { uuid } = useParams<{ uuid: string }>();
//   const [user, setUser] = useState<User | null>(null); // Set initial state to null

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     const fetchUserData = async () => {
//       try {
//         const userData = await fetchUser(uuid);
//         setUser(userData);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUserData();
//   }, [uuid]);

//   if (!user) {
//     // Display loading or error state
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <img
//         src={user.picture.large}
//         alt={`${user.name.first} ${user.name.last}`}
//       />
//       <p>
//         Name: {user.name.first} {user.name.last}
//       </p>
//       <p>Email: {user.email}</p>
//       {/* Additional user details */}
//     </div>
//   );
// };

// export default UserProfile;
