import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    state = {
        searchTerm: ""
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
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <a onClick={this.searchNow}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;

