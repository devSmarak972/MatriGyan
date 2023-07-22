import axios from "axios";

const getUser = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/get-user/`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
  // await axios
  //   .get(`http://localhost:8000/get-user/`)
  //   .then((res) => {
  //     // console.log(res.data);
  //     return res.data;
  //   })
  //   .catch((e) => console.log(e));
};

export default getUser;
