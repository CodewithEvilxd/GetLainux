const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for your Next.js app
app.use(cors({
  origin: ['http://localhost:3000', 'https://www.getlainux.in', 'https://getlainux.in'], // Dev server + Live website
  credentials: true
}));

// JioSaavn API proxy with enhanced search
app.get('/api/search', async (req, res) => {
  try {
    const { query, limit = 20 } = req.query;

    // For short queries, try multiple search variations to get more results
    let allResults = { songs: { results: [] }, albums: { results: [] }, artists: { results: [] }, playlists: { results: [] } };

    if (query.length <= 3) {
      // Short query - try multiple variations
      const variations = [
        query,
        `${query} song`,
        `${query} music`,
        `songs ${query}`,
        `${query} hits`
      ];

      for (const variation of variations) {
        try {
          const response = await fetch(`https://my-coral-six.vercel.app/api/search?query=${variation}&limit=${Math.ceil(limit/2)}`);
          const data = await response.json();

          if (data.success && data.data) {
            // Merge results
            if (data.data.songs?.results) {
              allResults.songs.results = [...allResults.songs.results, ...data.data.songs.results];
            }
            if (data.data.albums?.results) {
              allResults.albums.results = [...allResults.albums.results, ...data.data.albums.results];
            }
            if (data.data.artists?.results) {
              allResults.artists.results = [...allResults.artists.results, ...data.data.artists.results];
            }
            if (data.data.playlists?.results) {
              allResults.playlists.results = [...allResults.playlists.results, ...data.data.playlists.results];
            }
          }
        } catch (error) {
          console.log(`Variation "${variation}" failed:`, error.message);
        }
      }

      // Remove duplicates
      const uniqueSongs = allResults.songs.results.filter((song, index, self) =>
        index === self.findIndex(s => s.id === song.id)
      );
      const uniqueAlbums = allResults.albums.results.filter((album, index, self) =>
        index === self.findIndex(a => a.id === album.id)
      );
      const uniqueArtists = allResults.artists.results.filter((artist, index, self) =>
        index === self.findIndex(a => a.id === artist.id)
      );
      const uniquePlaylists = allResults.playlists.results.filter((playlist, index, self) =>
        index === self.findIndex(p => p.id === playlist.id)
      );

      allResults = {
        success: true,
        data: {
          songs: { results: uniqueSongs.slice(0, limit) },
          albums: { results: uniqueAlbums.slice(0, 10) },
          artists: { results: uniqueArtists.slice(0, 10) },
          playlists: { results: uniquePlaylists.slice(0, 10) }
        }
      };
    } else {
      // Normal query
      const response = await fetch(`https://my-coral-six.vercel.app/api/search?query=${query}&limit=${limit}`);
      allResults = await response.json();
    }

    res.json(allResults);
  } catch (error) {
    res.status(500).json({ error: 'API Error' });
  }
});

// Get song details
app.get('/api/songs/:songId', async (req, res) => {
  try {
    const { songId } = req.params;
    const response = await fetch(`https://my-coral-six.vercel.app/api/songs/${songId}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'API Error' });
  }
});

// Audio streaming proxy to bypass CORS
app.get('/api/stream/:songId', async (req, res) => {
  try {
    const { songId } = req.params;
    console.log(`Streaming request for song ID: ${songId}`);

    // First get song details to get the stream URL
    const detailsResponse = await fetch(`https://my-coral-six.vercel.app/api/songs/${songId}`);
    const detailsData = await detailsResponse.json();

    if (detailsData.success && detailsData.data?.length > 0) {
      const songDetails = detailsData.data[0];
      const streamUrl = songDetails.downloadUrl[songDetails.downloadUrl.length - 1].url; // Highest quality
      console.log(`Stream URL: ${streamUrl}`);

      // Fetch the audio and pipe it to response
      const audioResponse = await fetch(streamUrl);

      if (!audioResponse.ok) {
        throw new Error(`Failed to fetch audio: ${audioResponse.status}`);
      }

      // Set appropriate headers
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Pipe the audio stream using Node.js streams
      const { Readable } = require('stream');
      const readable = Readable.from(audioResponse.body);
      readable.pipe(res);
    } else {
      res.status(404).json({ error: 'Song not found' });
    }
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).json({ error: 'Streaming Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🎵 Evilxd Proxy Server running on port ${PORT}`);
  console.log(`📡 Audio streaming enabled for Vortex CLI`);
  console.log(`🌐 Connect your frontend to: http://localhost:${PORT}`);
});