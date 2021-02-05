import { Layout } from "../../components/chat/Layout";
import { Nav } from "../../components/chat/Nav";
import { Body } from "../../components/chat/Body";
import { ensureAuth } from "../../lib/auth";
import { GroupList } from "../../components/GroupList";
import { Hamburger } from "../../components/menu/Hamburguer";
import Menu from "../../components/menu/Menu";
import { useEffect, useState } from "react";
import { UserTitle } from "../../components/UserTitle";
import { UserPannel } from "../../components/UserPannel";
import { UserList } from "../../components/FriendList";
import styled from "styled-components";
import { FormModal } from "../../components/FormModal";
import { NewGroupForm } from "../../components/NewGroupForm";
import { NewFriendForm } from "../../components/NewFriendForm";
import axios from "axios";
import { getData } from "../../lib/getData";
import { socket } from "../../service/socket";
import { imageUpload } from "../../lib/uploadFile";
import { MainButton } from "../../components/common/MainButton";

export default function User({ user, config, groups }) {
  const [currentGroups, setCurrentGroups] = useState(groups);
  const [currentFriends, setCurrentFriends] = useState(user.friends);
  useEffect(() => {
    socket.emit("user_tag", user.tag);
  }, []);

  useEffect(() => {
    socket.on("get new group", (group) => {
      setCurrentGroups((currentGroups) => [...currentGroups, group]);
    });
    socket.on("get new friend", async (friend) => {
      const friends = await getData(`api/user/friends`, config);
      setCurrentFriends(friends);
    });
  }, []);

  // New Group Creation ---------------------------------------

  // State for group creation
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const handleImageChange = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
  };
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescChange = (e) => setDesc(e.target.value);

  // Put a preview of the image selected on the input
  useEffect(() => {
    if (!file) {
      setImagePreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file); // Generate url for component background-image
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl); // Close URL when component is closed
  }, [file]);
  const handleNewGroupSubmit = async (e) => {
    e.preventDefault();
    let picture_filename = "default.jpg";
    if (file) {
      await imageUpload(file, "./public/images/groupProfile/").then(
        (res) => (picture_filename = res.data.files.file.name) // save uploaded image filename
      );
    }
    axios
      .post(
        `${process.env.SERVER_URL}api/group/new`,
        { title, desc, picture_filename, user },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          // clean all related states
          setFile("");
          setTitle("");
          setDesc("");
          setImagePreview("");
          setGroupModalOpen(false);
          socket.emit("new group created", res.data); // transmit socket to load new group
          return true;
        }
      })
      .catch((err) => console.log(err.response.config.data));
  };
  // ----------------------------------------------------------
  // Profile Picture Change -----------------------------------
  const [profilePicture, setProfilePicture] = useState("y");
  const [picturePreview, setPicturePreview] = useState(
    `/images/userProfile/${user.picture_filename}`
  );
  const handlePictureChange = async (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setProfilePicture(undefined);
      return;
    }
    setProfilePicture(e.target.files[0]); // first save picture to the preview so user can see the new picture without updating

    let picture_filename = "default.png";
    await imageUpload(e.target.files[0], "./public/images/userProfile/").then(
      (res) => (picture_filename = res.data.files.file.name) // save uploaded image filename
    );
    console.log(picture_filename);
    axios.post(
      `${process.env.SERVER_URL}api/user/picture`,
      { picture_filename },
      config
    );
  };
  // Updates the picture for the user
  useEffect(() => {
    if (profilePicture === "y") return;
    if (!profilePicture) {
      setPicturePreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(profilePicture); // Generate url for component background-image
    setPicturePreview(objectUrl);
    return () => URL.revokeObjectURL(profilePicture); // Close URL when component is closed
  }, [profilePicture]);
  // ----------------------------------------------------------
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [tag, setTag] = useState("");
  const handleTagChange = (e) => setTag(e.target.value);
  const handleNewFriendSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.SERVER_URL}api/user/new_friend`, { tag, user }, config)
      .then((res) => {
        if (res.status === 200) {
          setTag("");
          setFriendModalOpen(false);
          if (user.friends != res.data)
            socket.emit("new friend added", res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  // Open state for the hamburguer menu on mobile
  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState("Amigos");
  return (
    <Layout title={`Hi ${user.username}!`}>
      <FormModal open={groupModalOpen} setOpen={setGroupModalOpen}>
        <NewGroupForm
          title={title}
          desc={desc}
          imagePreview={imagePreview}
          onSubmit={handleNewGroupSubmit}
          onImageChange={handleImageChange}
          onTitleChange={handleTitleChange}
          onDescChange={handleDescChange}
        />
      </FormModal>
      <FormModal open={friendModalOpen} setOpen={setFriendModalOpen}>
        <NewFriendForm
          tag={tag}
          onSubmit={handleNewFriendSubmit}
          onTagChange={handleTagChange}
        />
      </FormModal>
      <Nav>
        <UserTitle
          title={"Ola, " + user.username + "!"}
          category={category}
          setCategory={setCategory}
        />

        <Hamburger open={open} setOpen={setOpen} />
        <Menu
          user={user}
          onPictureChange={handlePictureChange}
          picture={picturePreview}
          open={open}
          setOpen={setOpen}
        />
      </Nav>
      <Body full={true}>
        <UserPannel
          tag={user.tag}
          username={user.username}
          picture={picturePreview}
          onChange={handlePictureChange}
        />
        <GroupList
          groups={currentGroups}
          category={category}
          modal={setGroupModalOpen}
        />
        <UserList
          friends={currentFriends}
          category={category}
          modal={setFriendModalOpen}
        />
        <RightBar />
      </Body>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  var userWithToken = await ensureAuth(ctx); // Validate User
  const info = await getData(
    `api/user/info/${userWithToken.user._id}`,
    userWithToken
  );
  const { user, groups } = info;
  return {
    props: {
      user,
      config: userWithToken,
      groups,
    },
  };
};

const RightBar = styled.section`
  display: none;
  @media (min-width: 1100px) {
    display: block;
    grid-column: 3/ 4;
    background: var(--primary-shade);
    position: relative;
    z-index: 2;
  }
`;
