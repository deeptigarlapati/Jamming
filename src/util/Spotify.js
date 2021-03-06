const clientId = "29b61269935141af96857dd17f35b941";

const spotifySearchAPI = 'https://api.spotify.com/v1/search';
const spotifyUserProfileAPI = 'https://api.spotify.com/v1/me';

const spotifyPlaylistAPI = 'https://api.spotify.com/v1/users/{userId}/playlists';
const spotifyPlaylistTracksAPI =
    'https://api.spotify.com/v1/users/{userId}/playlists/{playlistId}/tracks';

const spotifyRedirectUrl = "https://jammingdemo.herokuapp.com/";

let accessToken;
let expiresIn;

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        let url = window.location.href;
        accessToken = this.extract(url, "access_token=", "&");
        if (accessToken) {
            expiresIn = this.extract(url, "expires_in=", "&");
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log("access token successful retrieved.");
            return accessToken;
        } else {
            let state = 'eifjcchunffhdbhjndtlflejhgihttntbuklcfifguke';

            window.location.href =
                `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${spotifyRedirectUrl}&state=${state}`;
        }
    },

    /* returns a promise */
    search(term) {
        return fetch(`${spotifySearchAPI}?type=track&q=${term}`,
            {headers: this.buildAuthorizationHeader()})
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    return jsonResponse.tracks.items.map(function (track) {
                        console.log(track);
                            return {
                                id: track.id,
                                name: track.name,
                                uri: track.uri,
                                album: track.album.name,
                                artist: track.artists[0].name,
                                previewUrl: track.preview_url
                            }
                        }
                    )
                }
                else {
                    return [];
                }
            });
    },

    /* returns a promise */
    savePlaylist(name, trackURIs) {
        return fetch(`${spotifyUserProfileAPI}`,
            {headers: this.buildAuthorizationHeader()})
            .then(response => response.json())
            .then(jsonResponse => {
                let userId = jsonResponse.id;
                return this.createPlaylistWithTracks(userId, name, trackURIs);
            });
    },

    createPlaylistWithTracks(userId, playlistName, playlistTracks) {
        let jsonBody = JSON.stringify({name: playlistName, public: false});
        let url = spotifyPlaylistAPI.replace('{userId}', userId);
        return fetch(url, {
            headers: this.buildAuthorizationHeader(),
            method: 'POST', body: jsonBody
        })
            .then(response => this.handleResponse(response))
            .then(jsonResponse => {
                let playlistId = jsonResponse.id;
                return this.saveTracksToPlaylist(userId, playlistId, playlistTracks);
            });
    },

    saveTracksToPlaylist(userId, playlistId, playlistTracks) {
        let jsonBody = JSON.stringify(playlistTracks);
        let url = spotifyPlaylistTracksAPI.replace('{userId}', userId).replace('{playlistId}', playlistId);
        return fetch(url, {
            headers: this.buildAuthorizationHeader(),
            method: 'POST', body: jsonBody
        })
            .then(response => this.handleResponse(response))
            .then(jsonResponse => {
                return jsonResponse.snapshot_id;
            });
    },

    handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('An error has occurred.!', response);
    },

    buildAuthorizationHeader() {
        let token = this.getAccessToken();
        return {Authorization: `Bearer ${token}`};
    },

    extract(string, keyword, limiter) {
        let startIndex = string.indexOf(keyword);
        if (startIndex !== -1) {
            startIndex += keyword.length;
            let endIndex = string.indexOf(limiter, startIndex);
            if (endIndex !== -1) {
                return string.slice(startIndex, endIndex);
            } else {
                return string.slice(startIndex);
            }
        }
        return undefined;
    }
};

export default Spotify;
