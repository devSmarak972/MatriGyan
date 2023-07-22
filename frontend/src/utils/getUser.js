import axios from "axios";
import { toast } from "react-toastify";

// var totalBytesRemaining =0,numberOfBlocks=0;
// var maxBlockSize=1024*1024;//1MBto be shifted to consts

async function getUser() {
  const config = {
    withCredentials: true,
  };
  const user = await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/get-user/`, config)
    .then((res) => {
      if (res.data.success) return res.data;
      else {
        return res.data;
      }
    })
    .catch((err) => {
      return false;
    });
  return user;
}

export { getUser };
