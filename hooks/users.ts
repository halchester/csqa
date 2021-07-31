import { useQuery } from "react-query";
import axios from "../lib/api";

const getCurrentUser = async () => {
  const res = await axios.get("/api/auth/currentUser");
  return res.data;
};

export const useUser = () => {
  const { data, isLoading, refetch } = useQuery("user", getCurrentUser);
  return [data, { refetch }];
};
