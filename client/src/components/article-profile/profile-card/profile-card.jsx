import React from 'react';
import { ProfileCardContainer, ProfileCardContent } from "./profile-card.style";


const ProfileCard = ({info}) => {
  return (
    <ProfileCardContainer>
      <h2>{info.type === "OWNER" ? "Owner" : "Writer"}</h2>
      <ProfileCardContent>
        <img
          src="https://avatars.githubusercontent.com/u/66717787?v=4"
          alt="profile"
        />
        <div className="profileInfo">
          <span className="name">{info.name}</span>
          <span className="id">0x1ac95039</span>
        </div>
      </ProfileCardContent>
    </ProfileCardContainer>
  );
};

export default ProfileCard;