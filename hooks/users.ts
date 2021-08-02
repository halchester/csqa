import { useQuery } from "react-query";
import axios from "../lib/api";
import { useUserData } from "../store/userStore";

const getCurrentUser = async () => {
  const res = await axios.get("/api/auth/currentUser");
  return res.data.data;
};

export const useUser = () => {
  const { data, refetch, isLoading } = useQuery("user", getCurrentUser);
  const setUserData = useUserData((state) => state.setUserData);
  if (!isLoading && data) {
    setUserData(data);
  }
  const user = data;
  return [user, isLoading, { refetch }];
};
