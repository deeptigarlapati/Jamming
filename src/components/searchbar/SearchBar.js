import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    state = {
        searchTerm: ""
    };

    triggerSearch = (event) => {
        if (event.key !== "Enter") {
            return;
        }
        this.searchNow();
        event.preventDefault();
    };


    handleTermChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    };

    searchNow = () => {
        this.props.onSearch(this.state.searchTerm)
    };

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"
                       onKeyUp={this.triggerSearch}
                       onChange={this.handleTermChange}/>
                <a onClick={this.searchNow}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;

