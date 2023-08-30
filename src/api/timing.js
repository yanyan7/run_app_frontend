import client from "./client";
import Cookies from "js-cookie";

// 一覧取得
export const getTimings = async () => {
  return client.get(
    `/timings`,
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
};
