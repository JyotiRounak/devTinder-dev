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
    dispatch(addFeed(response.data));
    } catch (error) {
      console.warn(error);
    }
  }
  useEffect(()=>{
    feedHandler();
  }, []);
  return (
    feed && (<div className='flex justify-center my-10'>
    <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed