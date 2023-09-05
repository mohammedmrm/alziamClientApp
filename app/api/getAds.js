import client from "./client";

const get = (token) => client.get(`/config.php?token=${token}`);
const getAds = (token) => client.get(`/getAds.php?token=${token}`);

export default {
  get,
  getAds,
};
