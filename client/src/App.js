import * as React from 'react';
import { useState , useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ListLogEntryes , deleteLogEntry } from './Api'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import LogEntryForm from './logEntryForm'


function App() {
   // eslint-disable-next-line
  const [logEntry,setLogEntrys] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntry,setaddEntry] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,  
    longitude: -122.4376,
    zoom: 4
  });
  

  const getEntries = async () => {
    const logEntr = await ListLogEntryes();
    setLogEntrys(logEntr);
  };

  const showAddMarkerPopup = (event) => {
    console.log(event)
    const [longitude , latitude] = event.lngLat;
     setaddEntry({
       latitude:latitude,
       longitude:longitude,
     })
  }


  useEffect(()=>{
   getEntries();
  },[])


  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/setojk/ckgme6u5j0vt619qo94e38992"
      mapboxApiAccessToken={process.env.REACT_APP_CLIENT_ID}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
    {
      logEntry.map((entry,i)=>{
        console.log(Date(entry.visitDate).toString().substring(4,16));
        return (
        <React.Fragment key={entry._id}>
        <Marker latitude={entry.latitude} longitude={entry.longitude} >
        <div
        onClick={() =>{setShowPopup({
          ...showPopup,
          [entry._id] : true,
        })}}
        >

        <svg
                  className="marker yellow"
                  style={{
                    height: `24px`,
                    width: `24px`,
                    fill: "#f8c102",
                    transform: "translate(-50%,-100%)"
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
            

                </div>
                </Marker>
           

             {
               
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                  {entry.image && <img src={entry.image} alt={entry.title} />}
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toString()}</small>
                    <button onClick={async () =>{await deleteLogEntry(entry);getEntries()}}>delete</button>
                  </div>
                </Popup>
              ) : null
            }
            </React.Fragment>
       
        
        
      )})
    }
    {addEntry ? ( <>
      <Marker latitude={addEntry.latitude} longitude={addEntry.longitude}>
        <div>
        <svg
                  className="marker yellow"
                  style={{
                    height: `24px`,
                    width: `24px`,
                    fill: "#f8c102",
                    transform: "translate(-50%,-100%)"
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
             </div>
          </Marker>
      <Popup
                  latitude={addEntry.latitude}
                  longitude={addEntry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setaddEntry(null)}
                  anchor="top" >
                  <div className="popup">
                   { <LogEntryForm onClose={() => {
                setaddEntry(null);
                getEntries();
              }} location={addEntry} />}
                  </div>
                </Popup>
                </>) 
       : null}
       </ReactMapGL>
  );
}
export default App;
