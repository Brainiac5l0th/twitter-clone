import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";

import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  // hooks
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // posting the body to the api
      await axios.post("/api/posts", { body });

      // show success message to the user
      toast.success("Tweet created!");
      setBody("");

      //mutate states
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  // content
  const guestContent = (
    <div className="py-8">
      <h1 className="text-white text-3xl text-center mb-4 font-bold">
        Welcome to Twitter
      </h1>
      <div className="flex justify-center items-center gap-4">
        <Button label="Login" onClick={loginModal.onOpen} />
        <Button label="Register" onClick={registerModal.onOpen} secondary />
      </div>
    </div>
  );

  // authentica user content
  const userContent = (
    <div className="flex gap-4">
      <div>
        <Avatar userId={currentUser?.id} />
      </div>
      <div className="w-full">
        <textarea
          disabled={isLoading}
          onChange={(e) => setBody(e.target.value)}
          value={body}
          className="disabled:opacity-80 disabled:cursor-not-allowed
          peer resize-none mt-3 w-full bg-black ring-0 text-[20px] placeholder-neutral-500 text-white"
          placeholder={placeholder}
        ></textarea>
        <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

        <div className="flex mt-4 justify-end">
          <Button
            label="Tweet"
            disabled={isLoading || !body}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser?.id ? userContent : guestContent}
    </div>
  );
};

export default Form;
