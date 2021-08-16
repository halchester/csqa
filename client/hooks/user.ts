import {useQuery} from "react-query";
import axios from "../lib/api";
import {useUserData} from "../store/userStore";

const getCurrentUser = async () => {
  const res = await axios.get("/api/currentUser");
  return res.data.user;
};

export const useUser = (): any => {
  const {data, refetch, isLoading} = useQuery("user", getCurrentUser);
  const setUserData = useUserData((state) => state.setUserData);

  if (!isLoading && data) {
    setUserData(data);
  }
  return [data, isLoading, refetch];
};
