"use client"
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/users";
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import BackToProfileButton from "@component/profile/BackToProfileButton";
import ProfileEditForm from "@component/profile/ProfileEditForm";

const ProfileEditor = () => {
  const [user, setUser] = useState<any>({});
  
  useEffect(() => {getData();}, [])

  const getData = async () => {
    let user: any = await api.getUser();
    setUser(user);
  }

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="user_filled"
        title="Edit Profile"
        button={<BackToProfileButton />}
      />

      <Card1 borderRadius={8}>
        <ProfileEditForm user={user as any} />
      </Card1>
    </Fragment>
  );
};

export default ProfileEditor;
