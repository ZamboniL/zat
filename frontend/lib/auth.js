import axios from "axios";
import nookies from "nookies";

export const isAuthenticated = async (ctx) => {
  const cookie = nookies.get(ctx).token;
  if (!cookie) return false;
  const config = { headers: { "x-auth-token": cookie } };
  try {
    const user = await axios.get("http://localhost:4000/api/auth/user", config);
    config.user = user.data;
    return config;
  } catch {
    return false;
  }
};

export const ensureAuth = async (ctx) => {
  let config = await isAuthenticated(ctx);
  if (!config) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }
  return config;
};
