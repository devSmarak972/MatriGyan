import axios from "axios";
import {toast} from "react-toastify"

// var totalBytesRemaining =0,numberOfBlocks=0;
// var maxBlockSize=1024*1024;//1MBto be shifted to consts

async function getUser()
{
    const config={
        withCredentials:true
    }
    const user=await axios.get("http://localhost:8000/get-user/",config).then(res=>{
    console.log(res);   
    if(res.data.success)
    return res.data;
    else{
        // if(res.data.code===0)
        // {
            toast(res.data.message)
            return res.data;
        

        
    }
    }).catch(err=>{
        toast("Failed to fetch user");
        return false;
    })
    return user;

}

export {getUser}