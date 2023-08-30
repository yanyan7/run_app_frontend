import client from "./client";
import Cookies from "js-cookie";

// 一覧取得
export const getSleepPatterns = async () => {
  return client.get(
    `/sleep_patterns`,
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
};
