import  Axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import LinkIcon from '@mui/icons-material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import ReactPlayer from 'react-player'

function App() {

  const [dataList, setDataList] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    async function fetchData(){
      const result = await Axios.get('https://www.plugco.in/public/take_home_sample_feed').catch(err=>{console.log(err)})
      setDataList(result.data.campaigns)
      
    }
    fetchData()
  },[])

  return (
    <div className="App">
      <div className='header'>
        <p>PLUGS</p>
      </div>
      {
        dataList.map(item=>(
          <div className='campaigns-container' key={item.campaign_name}>
            <div className='introduction'>
                <div className='icon'>
                  <img src={item.campaign_icon_url} alt=""/>
                </div>
                <div className='name'>
                  <h1>{item.campaign_name}</h1>
                  <span>{item.pay_per_install} per install</span>
                </div>
            </div>
            <div className='detail' >
            {
              item.medias.map((media,index)=>(
                
              <div className='detail-item' key={index} >
                <div className='video'>
                    <img src={media.cover_photo_url} alt="" className={`mediaImage ${isOpen && "open"}`}/>
                    {media.media_type==="video" && <div className='overlay'>
                      <img  onClick={()=>{setIsOpen(true)}}src="https://cdn2.iconfinder.com/data/icons/media-player-ui/512/Media-Icon-13-512.png" alt=""/>
                    </div>}
                    <div className={`PlayVideo ${!isOpen && "open"}`}>
                      <ReactPlayer url={media.download_url} playing={isOpen} width={100} height={180} playsinline={true} onEnded={()=>setIsOpen(false)} />
                    </div>
                </div>
                <div className='buttons'>
                    <a href={`http://${media.tracking_link}`} target="_blank" rel="noopener noreferrer">
                      <LinkIcon style={{color:'grey'}}/>
                    </a>
                    <a href={media.download_url} target="_blank" rel="noopener noreferrer">
                      <DownloadIcon style={{color:'grey'}}/>
                    </a>
                </div>
              </div>
            
            ))}
            </div>
          </div>
      ))}
    </div>
  );
}

export default App;
