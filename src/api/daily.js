import client from "./client";
import Cookies from "js-cookie";

// 取得
export const getDaily = async (id) => {

  return client.get(
    `/dailies/${id}`,
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
};

// 作成
export const createDaily = async (params) => {
  return client.post(
    `/dailies`,
    params,
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
};

// 更新
export const updateDaily = async (id, params) => {
  return client.put(
    `/dailies/${id}`,
    params,
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
};
