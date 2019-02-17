import React from 'react';
import './Track.css';

class Track extends React.Component {

    addTrack = () => {
        console.log("calling add");
        this.props.onAdd(this.props.track);
    };

    removeTrack = () => {
        this.props.onRemove(this.props.track);
    };

    renderAction = () => {
        if (this.props.isRemoval) {
            return <a className="Track-action" onClick={this.removeTrack}>-</a>;
        }

        return <a className="Track-action" onClick={this.addTrack}>+</a>;
    };

    render() {

        return (
            <div className="Track">

                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <audio className="Audio-controls" controls="controls">
                        <source src={this.props.track.previewUrl}
                                type="audio/mpeg"/>
                    </audio>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;