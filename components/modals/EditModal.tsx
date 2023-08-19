import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import ImageUpload from "../ImageUpload";
import Input from "../Input";
import Modal from "../Modal";

const EditModal = () => {
  // hooks
  const editModal = useEditModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  //states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // EFFECTS
  useEffect(() => {
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio ? currentUser?.bio : "");
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
  }, [currentUser]);

  //handler
  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //update user information
      await axios.patch("/api/edit", {
        name,
        username,
        profileImage,
        bio,
        coverImage,
      });

      //mutate updated data
      mutateFetchedUser();

      //send success message
      toast.success("Information updated successfully!");

      //close the modal
      editModal.onClose();
    } catch (error: any) {
      console.log("editmodal-> line 58", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [bio, name, username, profileImage, coverImage]);

  // body content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        onChange={(Image) => setProfileImage(Image)}
        disabled={isLoading}
        label={"Upload profile Image"}
      />
      <ImageUpload
        value={coverImage}
        onChange={(Image) => setCoverImage(Image)}
        disabled={isLoading}
        label={"Upload Cover Image"}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        type="text"
        value={name}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        type="text"
        value={username}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
        type="text"
        value={bio}
      />
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      actionLabel="Save"
      title="Edit Your Profile"
      onClose={editModal.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
