"use client"
import { Fragment, useEffect, useState } from "react";
import api from "@utils/__api__/users";
import { Card1 } from "@component/Card1";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import BackToProfileButton from "@component/profile/BackToProfileButton";
import ProfileEditForm from "@component/profile/ProfileEditForm";
import User from "@utils/__api__/user";
import FirebaseService from "@services/FirebaseService";

const ProfileEditor = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    loadUser();
  }, [])

  const loadUser = async () => {
    let data = User.getUser("dataUser");
    let user:any = await FirebaseService.getUser(data.email);
    setUser(user[0]._document.data.value.mapValue.fields);
  }

  useEffect(() => {}, [user]);

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="user_filled"
        title="Edit Profile"
        button={<BackToProfileButton />}
      />

      {user && <Card1 borderRadius={8}>
        <ProfileEditForm user={user as any} />
      </Card1>}
    </Fragment>
  );
};

export default ProfileEditor;
