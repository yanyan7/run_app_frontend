import { getCurrentUser } from "./auth";
import client from "./client";
import Cookies from "js-cookie";

// 取得
export const getResults = async (year, month) => {
  const res  = await getCurrentUser();
  const userId = res.data.data.id;

  return client.get(
    `/results?user_id=${userId}&year=${year}&month=${month}`,
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
};
