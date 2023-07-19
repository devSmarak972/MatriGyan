import React,{useState} from 'react'
import { toast } from 'react-toastify'

const Comments = (props) => {
    const [comments, setcomments] = useState([{"user":{"fullname":"user"},"comment":"This is a question","likes":1,"video":12,"course":1}])
    const [commentInput, setCommentInput] = useState("")
    // var received={"user":{"fullname":"new commenter"},"comment":"This is a question","likes":0,"video":10,"course":1}
    var received={"user":{"fullname":"new commenter"},"comment":"This is a question","likes":0,"video":10,"course":1}
    
    function addLike(event){
        var commentid=parseInt(event.currentTarget.id.substring(7));
        console.log(commentid,"comments",event.currentTarget.id);
        setcomments(state=>{
            var tmp=[...state];

            console.log(tmp)
            tmp[commentid]["likes"]+=1
            return tmp;
        })

    }
    function addComment(){
        if(commentInput==="")
         {  
           var notify=()=>toast("Comment is empty");
           notify();
        }
        received["comment"]=commentInput;
        setcomments([...comments,received]);
    }
  return (
    <section className="page-section relative flex items-center justify-center antialiased bg-alt  min-w-screen">
     
    <div className="container page__container px-0 mx-auto sm:px-5">
    <div className="page-separator">
          <div className="page-separator__text">Comments</div>
        </div>
         {comments.map((comment,id)=>{
             return <>
       <div className="flex-col w-100 my-2 py-4 auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
          <div className="flex flex-row">
             <img className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full" alt="Noob master's avatar" src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;faces=1&amp;faceindex=1&amp;facepad=2.5&amp;w=500&amp;h=500&amp;q=80"/>
             <div className="flex-col mt-1">
                <div className="flex items-center flex-1 px-4 font-bold leading-tight">{comment.user.fullname}<span className="ml-2 text-xs font-normal text-gray-500">29-3-2023</span></div>
                <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">{comment.comment}</div>
                <p className="flex pt-2 items-center">
                    <span className="p-2">{comment.likes}</span>
                <button id={"comment"+id} onClick={addLike} className="inline-flex items-center px-1 -ml-1 flex-column">
                   <svg className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                   </svg>
                </button>
                </p>
             </div>
          </div>
       </div>
          </>
         })}
       
   <div class="mt-4 w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
       <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
           <label for="comment" class="sr-only">Your comment</label>
           <textarea id="comment" rows="4" class="w-full px-0 pt-2 outline-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" onInput={el=>setCommentInput(el.currentTarget.value)} placeholder="Write a comment..." required></textarea>
       </div>
       <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button onClick={addComment} class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
           
       </div>
   </div>

    </div>
 </section>

  )
}

export default Comments