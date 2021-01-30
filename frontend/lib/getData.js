import axios from "axios";

// SERVER SIDE EXAMPLE:
// export const getServerSideProps = async (ctx) => {
// var userWithToken = await ensureAuth(ctx);
// const data = await getData("api/auth/user", userWithToken);
// console.log(data);
// return { props: { mom: "mom" } };
// };
//
export const getData = async (path, config) => {
  try {
    const res = await axios.get(`http://localhost:4000/${path}`, config);
    return res.data;
  } catch (err) {
    throw err;
  }
};
