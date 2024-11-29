import axios from 'axios';


//Obtener la id de spotify de la cancion
export const fetchSpotifyTrackId = async (name) => {
    try {
        const response = await axios.get('https://spotify23.p.rapidapi.com/search/',{
            params: {
                q: name,
                type: 'tracks',
                offset: 0,
                limit: 1,
                numberOfTopResults: 1,
            },
            headers:{
                'x-rapidapi-key':'debb239ad8mshe1bcaa394881eb3p110f43jsnd38f59861ab1',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com',

            },
        });

        const trackId = response.data.tracks.items[0]?.data.id;

        return trackId || null;
    } catch(error) {
        console.log('Error buscando track en Spotify:', error);
        return null;
    }
};

//Obtener los detalles de la cancion en spotify
export const fetchTrackDetails = async (trackId) => {
    try {
      const response = await axios.get('https://spotify23.p.rapidapi.com/tracks/', {
        params: {
          ids: trackId,
        },
        headers: {
          'x-rapidapi-key':'debb239ad8mshe1bcaa394881eb3p110f43jsnd38f59861ab1',
          'x-rapidapi-host': 'spotify23.p.rapidapi.com',
        },
      });
  
      const previewUrl = response.data.tracks[0];
      return previewUrl || null;
    } catch (error) {
      console.error('Error obteniendo detalles del track:', error);
      return null;
    }
};