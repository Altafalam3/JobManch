import React from 'react'
// import Image1 from '../../assets/download2.jpeg'
import { useState,useEffect,useParams } from 'react';
import axios from 'axios';
const Forum = () => {


  const [data, setData] = useState([]); 
    const {id}=useParams(); //it will fetch id from url
    useEffect(()=>{
        axios.get('http://localhost:3006/contacts/' + id)
        .then(res=> setData(res.data))
        .catch(err=> console.error(err) )
    },[]);
   const members = [
    {
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        name: "John lorin",
        email: "john@example.com",
        connect:"https://www.linkedin.com/in/mamta-gupta-434782262/"
    }, {
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Chris bondi",
        email: "chridbondi@example.com",
        connect:"https://www.linkedin.com/in/mamta-gupta-434782262/"
    }, {
        avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "yasmine",
        email: "yasmine@example.com",
        connect:"https://www.linkedin.com/in/mamta-gupta-434782262/"
    }, {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
        name: "Joseph",
        email: "joseph@example.com",
        connect:"https://www.linkedin.com/in/mamta-gupta-434782262/"
    },
   ]

  return (
    <>
        <div className="w-screen-full">
  <div className="relative flex flex-row  mx-auto mt-5 mb-5 w-10/12  overflow-hidden rounded-t-xl bg-contain  bg-no-repeat bg-size-80  bg-gradient-to-r from-[#8fb6e3] to-[#0077ff] py-32 text-center shadow-xl shadow-gray-300" >
<div className="bg-[url('./assets/undraw_Interview_re_e5jn.png')] bg-cover"></div>
            <div >

        <h1 className="mt-2 px-8 text-3xl font-bold text-whFite md:text-5xl ">Book an appointment</h1>
    <p className="mt-6 text-lg text-black">Get an appointment with our experienced accountants</p>
    </div>
  </div>
  <div>
</div>
<div>


    <div className=" w-10/12 mx-auto px-4 shadow-lg shadow-[#0077ff]">
        <div className="items-start justify-between sm:flex">
            <div>
                <h4 className="text-gray-800 text-xl font-semibold">Team members</h4>
                <p className="mt-2 text-gray-600 text-base sm:text-sm">Give your team members access to manage the system.</p>
            </div>
            
        </div>
        <ul className="mt-12 divide-y">
            {
                members.map((item, idx) => (
                    <li key={idx} className="py-5 flex items-start justify-between">
                        <div className="flex gap-3">
                            <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" />
                            <div>
                                <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                                <span className="block text-sm text-gray-600">{item.email}</span>
                            </div>
                        </div>
                        <div className='flex  items-center justify-center' >
                         
                        <a href="javascript:void(0)" className="mr-5 mt-2.5 inline-flex items-center justify-center gap-1 py-2 px-3 font-medium text-sm text-center text-white bg-[#0077ff]  hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 576 512" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M284 224.8a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 284 224.8zm-110.5 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 173.6 224.8zm220.9 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 394.5 224.8zm153.8-55.3c-15.5-24.2-37.3-45.6-64.7-63.6-52.9-34.8-122.4-54-195.7-54a406 406 0 0 0 -72 6.4 238.5 238.5 0 0 0 -49.5-36.6C99.7-11.7 40.9 .7 11.1 11.4A14.3 14.3 0 0 0 5.6 34.8C26.5 56.5 61.2 99.3 52.7 138.3c-33.1 33.9-51.1 74.8-51.1 117.3 0 43.4 18 84.2 51.1 118.1 8.5 39-26.2 81.8-47.1 103.5a14.3 14.3 0 0 0 5.6 23.3c29.7 10.7 88.5 23.1 155.3-10.2a238.7 238.7 0 0 0 49.5-36.6A406 406 0 0 0 288 460.1c73.3 0 142.8-19.2 195.7-54 27.4-18 49.1-39.4 64.7-63.6 17.3-26.9 26.1-55.9 26.1-86.1C574.4 225.4 565.6 196.4 548.3 169.5zM285 409.9a345.7 345.7 0 0 1 -89.4-11.5l-20.1 19.4a184.4 184.4 0 0 1 -37.1 27.6 145.8 145.8 0 0 1 -52.5 14.9c1-1.8 1.9-3.6 2.8-5.4q30.3-55.7 16.3-100.1c-33-26-52.8-59.2-52.8-95.4 0-83.1 104.3-150.5 232.8-150.5s232.9 67.4 232.9 150.5C517.9 342.5 413.6 409.9 285 409.9z" />
                </svg>
                Chat
            </a>
                        <a href={item.connect} className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Connect</a>
                        </div></li>
                ))
            }
        </ul>
    </div>

</div>
<h2 className="mt-2 px-8 text-center text-3xl font-bold text-[#0077ff] md:text-5xl ">Comments</h2>
<div className='flex flex-row  mx-auto'>
<div className='shadow-lg shadow-[#0077ff] w-5/12  mx-20 '>
  
<div className="mx-0">
  <ul>{
members.map((item, idx) => (
<div key={idx} className="m-4 my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
  <img className="mr-5 block h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16" src="https://www.uifaces.co/wp-content/themes/uifaces-theme/src/img/home-animation/avatar-3.svg" alt="Profile Picture" />
  <div className="w-full text-left">
    <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
      <h3 className="font-medium">{item.name}</h3>
      <time className="text-xs" datetime="2022-11-13T20:00Z">{item.connect}</time>
    </div>
    <p className="text-sm">{item.email}</p>
    <div className="mt-5 flex items-center justify-between text-gray-600">
      <button className="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg">Reply</button>
      <a title="Likes" href="#" className="group flex cursor-pointer items-center justify-around">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full p-1 group-hover:bg-red-200 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {item.name}
      </a>
    </div>
  </div>
</div>))}</ul>

</div>
</div>
<div className=' shadow-lg shadow-[#0077ff] w-9/12   '>
<section className="bg-white ml-2 py-6 sm:py-8 lg:py-12">
  
    
    <div className="mb-10 md:mb-16">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Blogs</h2>

      <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p>
    </div>
   
    <div claclassNamess="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
      
      <article className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
      <div>
      <iframe width="560"
                        height="315"
                        src= {data.bloglink}
                        title="GeeksforGeeks" > 
                </iframe> 
    </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-400">{data.date}</span>

          <h2 className="text-xl font-bold text-gray-800">
            <a href="#" className="transition duration-100 hover:text-rose-500 active:text-rose-600">{data.name}</a>
          </h2>

          {/* <p className="text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint necessitatibus molestias explicabo.</p> */}

          <div>
            <a href={data.bloglink} className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700">Read more</a>
          </div>
        </div>
      </article>
    
     
   
      
     
    
   
    
  </div>
</section>

</div>
</div>
    </div>
    </>
  )
}

export default Forum