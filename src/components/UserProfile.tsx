import React from "react";

export type UserProfileProps = {
  userData: {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  } | null;
};

const UserProfile = ({ userData }: UserProfileProps) => (
  <div>
    {userData ? (
      <>
        <h1>
          {userData.first_name} {userData.last_name}
        </h1>
        <p>Пошта: {userData.email}</p>
        <p>Номер телефону: {userData.phone}</p>
      </>
    ) : (
      <p>Сторінка не завантажена</p>
    )}
  </div>
);

export default UserProfile;
