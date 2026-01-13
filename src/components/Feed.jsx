import axios from 'axios';
import {BASE_URL} from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';
const Feed = () => {
  const feed = useSelector((store)=> store.feed);
  const dispatch = useDispatch();
  const feedHandler = async()=>{
    if(feed) return;
    try {
    const response = await axios.get(`${BASE_URL}user/feed`, {withCredentials: true});
    console.log(response.data);
    dispatch(addFeed(response.data.users));
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(()=>{
    feedHandler();
  }, []);
  if(!feed) return;
  if(feed.length <= 0) return <p>No new User found</p>;
  return (
    feed && (<div className='flex justify-center my-10'>
    <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed