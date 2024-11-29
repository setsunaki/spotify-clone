import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { fetchSpotifyTrackId, fetchTrackDetails } from './SearchSpotify';

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();
  const [previewUrl, setPreviewUrl] = useState(null); 


  const songData = {
    name: song.attributes.name,
    artist: song.attributes.artistName,
    img: song.attributes.artwork.url,
    i: i
  };

  const handlePauseClick = () => {
    console.log("Pausando canción");
    dispatch(playPause(false));
    console.log("Estado actualizado:", isPlaying);
  };

  // Función para obtener la URL de preview desde Spotify
  const handlePlayClick = async () => {
    try {
      console.log("Activando canción", song.attributes.name);
      
      // Buscar el ID de la canción en Spotify
      const trackId = await fetchSpotifyTrackId(song.attributes.name);
      if (!trackId) {
        console.error("No se encontró el track en Spotify.");
        return;
      }

      // Obtener el detalle de la canción, que incluye la URL del preview
      const preview = await fetchTrackDetails(trackId);
      if (!preview) {
        console.error("No se pudo obtener el preview de la canción.");
        return;
      }
      
      setPreviewUrl(preview.preview_url);

      // Actualizar el estado global con la canción activa y su información
      dispatch(setActiveSong({ songData, previewUrl: preview.preview_url, i }));
      dispatch(playPause(true)); // Iniciar la reproducción

      
    } catch (error) {
      console.error("Error manejando el clic de reproducción:", error);
    }
  };

  
  const imageUrl = song.attributes.artwork.url
    ?.replace("{w}", "500")
    ?.replace("{h}", "500");

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 
      backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      {/* Imagen */}
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center 
          bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.name === song.attributes.name
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={songData}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick} 
          />
        </div>
        <img
          src={imageUrl}
          alt={song.attributes.albumName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Textos */}
      <div className="mt-4 flex flex-col">
        {/* Título */}
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.attributes.albumName}`}>
            {song.attributes.name}
          </Link>
        </p>

        {/* Artista */}
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.attributes.artistName
                ? `/artists/${song.attributes.artistName}`
                : "/top-artists"
            }
          >
            {song.attributes.artistName}
          </Link>
        </p>
      </div>
      {/* Aquí estamos agregando el reproductor de audio en SongCard */}
      {previewUrl && <audio src={previewUrl} autoPlay />}
    </div>
  );
};

export default SongCard;
