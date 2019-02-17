import React from 'react';
import './Playlist.css';

import TrackList from '../tracklist/TrackList';

class Playlist extends React.Component {

    handleNameChange = (event) => {
        this.props.onNameChange(event.target.value);
    };

    render() {
        return (
            <div className="Playlist">
                <input
                    value={this.props.title}
                    onChange={this.handleNameChange}/>
                <TrackList
                    tracks={this.props.tracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}/>
                <a className="Playlist-save"
                   onClick={this.props.onSave}>
                    SAVE TO SPOTIFY
                </a>
            </div>
        )
    }
}

export default Playlist;