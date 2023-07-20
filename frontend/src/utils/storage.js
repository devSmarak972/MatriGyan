import axios from "axios";
import {toast} from "react-toastify"
import {Base64} from "js-base64"
const { BlobServiceClient ,BlobHttpHeaders,Pipeline,AnonymousCredential,BlockBlobClient} = require("@azure/storage-blob");
const account = "matrigyan";
// var totalBytesRemaining =0,numberOfBlocks=0;
var maxBlockSize=1024*1024;//1MBto be shifted to consts

async function uploadVideoToStorage(file,setShowProgress)
{
    const config = {
        // withCredentials: true,
        // headers: {
        //   "X-CSRFToken": getCookie("csrftoken"),
        // },
      };
    var sas = false;
    sas=await axios.get("http://localhost:8000/get-sas-key/?container=video",config).then(res=>{
    console.log(res);    
    return res.data.sas;
    }).catch(err=>{
        toast("Failed to upload video");
        return false;
    })
    console.log(sas,"something")
    if(sas)
    {
        var size=file.size;
        console.log(size,"filesize to be uploaded");
        if (size < maxBlockSize) {
            maxBlockSize = size;
            console.log("max block size = " + maxBlockSize);
        }
        var numberOfBlocks=0;
        if (size % maxBlockSize == 0) {
            numberOfBlocks = size / maxBlockSize;
        } else {
            numberOfBlocks = parseInt(size / maxBlockSize, 10) + 1;
        }
        const containerName="video";
        console.log("total blocks = " + numberOfBlocks);
        const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
        const containerClient = blobServiceClient.getContainerClient("video");
        console.log(containerClient)
        // const maxBlockSize = 100 * 1024 * 1024; // 100MB
  const fileSize = file.size;
  const blobName=file.name.substring(0,Math.min(10,file.name.indexOf(".")))+getDateString()+"_video_"+file.name.substring(file.name.indexOf(".")).replaceAll(" ","_");
  console.log(blobName,"jdkjd",containerName)
  const blockCount = Math.ceil(fileSize / maxBlockSize);
  const blobURL = `https://${account}.blob.core.windows.net/${containerName}/${encodeURIComponent(
    blobName
  )}?${sas}`;
  console.log(blobURL)
//   const pipeline = new Pipeline(new AnonymousCredential());
//   const blobClient = new BlockBlobClient(blobURL,pipeline);
  const blobClient = containerClient.getBlockBlobClient(blobName);
  console.log(blobClient)
  const blockIds = [];
  for (let i = 0; i < blockCount; i++) {
    setShowProgress((i+1)*100/blockCount)
    console.log(i);
    const start = i * maxBlockSize;
    const end = Math.min(start + maxBlockSize, fileSize);
    const chunk = file.slice(start, end);
    const chunkSize = end - start;
    const blockId = Base64.btoa("block-" + i.toString().padStart(6, "0"));
    blockIds.push(blockId);
    await blobClient.stageBlock(blockId, chunk, chunkSize);
  }
  var commit=await blobClient.commitBlockList(blockIds);
  blobServiceClient.setProperties({
    defaultServiceVersion: "2021-04-10"
})
.then(res => console.log("Set Properties response", res))
.catch(err => console.error("Set Properties error", err));
 console.log("done");
 return 'https://' + account + '.blob.core.windows.net/' + containerName + '/'+blobName
    }

}

function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day =`${date.getDate()}`.padStart(2, '0');
    return `${year}${month}${day}`
  }
export {uploadVideoToStorage}