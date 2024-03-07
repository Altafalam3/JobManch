import React from 'react'
import { useState,useEffect,useParams } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';

const Post = () => {

    const navigate= useNavigate();
    const [values, setValues]= useState({
        desc:'',
        title:'',
        comment:'',
       
    })
const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3006/contacts',values)
        .then(res=> {
            console.log(res);
            prompt("successfully done")
            navigate('/')
        })
        .catch(err=> console.error(err) )
        alert("There is some error")
}
const [data, setData] = useState([]); 
    // const {id}=useParams(); //it will fetch id from url
    useEffect(()=>{
        axios.get('http://localhost:3006/contacts/' ,data)
        .then(res=> setData(res.data))
        .catch(err=> console.error(err) )
    },[]);


  return (
    <form  onSubmit={handleSubmit}>
        <div className="">
  <div className="mx-auto w-9/12 px-4 ">
    <h1 className="mt-6 text-xl font-bold sm:mb-6 sm:text-3xl">Write your comment</h1>

    <div className="-ml-20 flex p-4 text-left text-gray-700 border-dashed rounded-lg border-2 border-[#0077ff]">
      <img className="mr-5 h-12 w-12 border-solid border-2 border-[#0077ff] rounded-full" src={data.avatar} alt="" />
      <div className="w-full space-y-3 text-gray-700">
        <div className="">
          <input type="text"
          onChange={(e)=>setValues({...values,desc:e.target.value})}
           placeholder="description" className="h-12 text-lg w-full max-w-full rounded-md border-solid border-2 border-[#0077ff] bg-white px-5 outline-none focus:ring" />
        </div>
        <div className="">
          <input type="text" placeholder="Title"
          onChange={(e)=>setValues({...values,title:e.target.value})}
          
          className="h-12 w-full max-w-full rounded-md border-solid border-2 border-[#0077ff] bg-white px-5 text-lg outline-none focus:ring" />
        </div>
        <div className="">
          <textarea name="comment" 
          onChange={(e)=>setValues({...values,comment:e.target.value})}
          
          id="comment" placeholder="Write your Post here" cols="30" rows="6" className="h-40 w-full min-w-full max-w-full overflow-auto whitespace-pre-wrap rounded-md border-solid border-2 border-[#0077ff] bg-white p-5 text-lg font-normal normal-case text-gray-600 opacity-100 outline-none focus:text-gray-600 focus:opacity-100 focus:ring"></textarea>
        </div>
        <div className="float-right">
          <input type="submit" value="Post Comment" className="relative inline-flex h-10 w-auto max-w-full cursor-pointer items-center justify-center overflow-hidden whitespace-pre rounded-md bg-blue-700 px-4 text-center text-sm font-medium normal-case text-white opacity-100 outline-none focus:ring" />
        </div>
      </div>
    </div>
  </div>
</div>

    </form>
  )
}

export default Post