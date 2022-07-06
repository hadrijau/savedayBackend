import React, {useState} from "react";
import './App.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { storage } from "./firebase";
import axios from 'axios';
import {BASE_URL} from './constants/baseURL';

const App = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const [latlng, setLatLng] = useState({
      latitude: '',
      longitude: ''
  })

  const [name, setName] = useState("");
  const [horaires, setHoraires] = useState({
    startTimeMon: '',
    endTimeMon: '',
    startTimeTue: '',
    endTimeTue: '',
    startTimeWed: '',
    endTimeWed: '',
    startTimeThu: '',
    endTimeThu: '',
    startTimeFri: '',
    endTimeFri: '',
    startTimeSat: '',
    endTimeSat: '',
    startTimeSun: '',
    endTimeSun: ''
  });

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = e => {
      if (e.target.files[0]) {
          setImage(e.target.files[0]);
          setPreviewImage(URL.createObjectURL(e.target.files[0]));
      }
  };




  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setAddress(value);
    setCoordinates(latLng)
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                axios.post(`${BASE_URL}/api/commerces`, {
                      address,
                      image: url,
                      name,
                        type,
                      startTimeMon: horaires.startTimeMon,
                      startTimeTue: horaires.startTimeTue,
                      startTimeWed: horaires.startTimeWed,
                      startTimeThu: horaires.startTimeThu,
                      startTimeFri: horaires.startTimeFri,
                      startTimeSat: horaires.startTimeSat,
                      startTimeSun: horaires.startTimeSun,
                      endTimeMon: horaires.endTimeMon,
                      endTimeTue: horaires.endTimeTue,
                      endTimeWed: horaires.endTimeWed,
                      endTimeThu: horaires.endTimeThu,
                      endTimeFri: horaires.endTimeFri,
                      endTimeSat: horaires.endTimeSat,
                      endTimeSun: horaires.endTimeSun,
                      email,
                      latlng,
                      phone,
                })
                setUrl(url);
              }).then(() => {
                setDone(true)
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
          })
        });
  };

  console.log('horaires', horaires)
  return (
      <div className="App container">
        <p>Email</p>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <p>Nom du commerce</p>
        <input type="text" placeholder="Nom du commerce" onChange={(e) => setName(e.target.value)}/>
        <p>Adresse</p>

          {/*   <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
          {({getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({placeholder: "Entrez une adresse"})}/>

                <div>
                  { loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion, index) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "fff"
                    }
                    return (
                        <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                    )
                  })}
                </div>
              </div>
          )}
        </PlacesAutocomplete>

*/}
          <input type="text" placeholder="Latitude" onChange={(e) => setLatLng({...latlng, latitude: Number(e.target.value)})}/>
          <input type="text" placeholder="Longitude" onChange={(e) => setLatLng({...latlng, longitude: Number(e.target.value)})}/>

          <p>Type</p>
          <div>
              <input
                  type="checkbox"
                  checked={type === "angela"}
                  onChange={() => setType("angela")}
              /> Angela
              <input
                  type="checkbox"
                  checked={type === "saveplace"}
                  onChange={() => setType("saveplace")}
              /> Saveplace
          </div>
        <p>Image</p>
        <div>
          <input type="file" onChange={(e) => handleChange(e)}/>
        </div>

        <img src={previewImage || "http://via.placeholder.com/300"} alt="firebase-image" className="preview-img"/>

          <h5>Horaires d'ouvetures</h5>
          <p>Lundi</p>
          <input type="text" placeholder="Horaire d'ouverture (08:15)" onChange={(e) => setHoraires({...horaires, startTimeMon: e.target.value})}/>
          <input type="text" placeholder="Horaire de fermeture (17:45)" onChange={(e) => setHoraires({...horaires, endTimeMon: e.target.value})}/>
          <div className="d-flex w-25 mx-auto text-center">
              <p className="text-center">Fermé</p>
              <input type="checkbox" className="checkbox" onChange={(e) => setHoraires({...horaires, startTimeMon: 'Fermé'})}/>
          </div>
          <p>Mardi</p>
          <input type="text" placeholder="Horaire d'ouverture (08:15)" onChange={(e) => setHoraires({...horaires, startTimeTue: e.target.value})}/>
          <input type="text" placeholder="Horaire de fermeture (17:45)" onChange={(e) => setHoraires({...horaires, endTimeTue: e.target.value})}/>

          <div className="d-flex">
              <p>Fermé</p>
              <input type="checkbox" className="checkbox" onChange={(e) => setHoraires({...horaires, startTimeTue: 'Fermé'})}/>
          </div>
          <p>Mercredi</p>
          <input type="text" placeholder="Horaire d'ouverture (08:15)" onChange={(e) => setHoraires({...horaires, startTimeWed: e.target.value})}/>
          <input type="text" placeholder="Horaire de fermeture (17:45)" onChange={(e) => setHoraires({...horaires, endTimeWed: e.target.value})}/>

          <div className="d-flex">
              <p>Fermé</p>
              <input type="checkbox" className="checkbox" onChange={(e) => setHoraires({...horaires, startTimeWed: 'Fermé'})}/>
          </div>
          <p>Jeudi</p>
          <input type="text" placeholder="Horaire d'ouverture (08:15)" onChange={(e) => setHoraires({...horaires, startTimeThu: e.target.value})}/>
          <input type="text" placeholder="Horaire de fermeture (17:45)" onChange={(e) => setHoraires({...horaires, endTimeThu: e.target.value})}/>

          <div className="d-flex">
              <p>Fermé</p>
              <input type="checkbox" className="checkbox" onChange={(e) => setHoraires({...horaires, startTimeThu: 'Fermé'})}/>
          </div>
          <p>Vendredi</p>
          <input type="text" placeholder="Horaire d'ouverture (08:15)" onChange={(e) => setHoraires({...horaires, startTimeFri: e.target.value})}/>
          <input type="text" placeholder="Horaire de fermeture (17:45)" onChange={(e) => setHoraires({...horaires, endTimeFri: e.target.value})}/>

          <div className="d-flex">
              <p>Fermé</p>
              <input type="checkbox" className="checkbox" onChange={(e) => setHoraires({...horaires, startTimeFri: 'Fermé'})}/>
          </div>
          <p>Samedi</p>
          <input type="text" placeholder="Horaire d'ouverture (08:15)" onChange={(e) => setHoraires({...horaires, startTimeSat: e.target.value})}/>
          <input type="text" placeholder="Horaire de fermeture (17:45)" onChange={(e) => setHoraires({...horaires, endTimeSat: e.target.value})}/>

          <div className="d-flex">
              <p>Fermé</p>
              <input type="checkbox" className="checkbox" onChange={(e) => setHoraires({...horaires, startTimeSat: 'Fermé'})}/>
          </div>
          <p>Dimanche</p>
          <input type="text" placeholder="Horaire d'ouverture (08:15)" onChange={(e) => setHoraires({...horaires, startTimeSun: e.target.value})}/>
          <input type="text" placeholder="Horaire de fermeture (17:45)" onChange={(e) => setHoraires({...horaires, endTimeSun: e.target.value})}/>

          <div className="d-flex">
              <p>Fermé</p>
              <input type="checkbox" className="checkbox" onChange={(e) => setHoraires({...horaires, startTimeSun: 'Fermé'})}/>
          </div>


          <p>Téléphone</p>
        <div>
          <input type="text" placeholder="Téléphone" onChange={(e) => setPhone(e.target.value)}/>
        </div>

          <button type="button" className="btn btn-primary" onClick={handleUpload}>Soumettre</button>

          {done && <div className="alert alert-success" role="alert">
                Le commerce a bien été ajouté
          </div>}
      </div>
  );
};

export default App;
