import React from 'react';

class SearchbarList extends React.Component {
    render() {
        return (
            <div id="search-info-container">
                <ul id="search-info-list">
                    <li className="search-info-desc"><center>Change Search: Type 2 Character Code Followed By a Space</center></li>
                    <SearchbarListItem parsedData={this.props.parsedData} mapObject={this.props.mapObject} />
                </ul>
            </div>
        );
    }
}
export default SearchbarList;

class SearchbarListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            this.props.mapObject(this.props.parsedData.searchValues.searchInfo, function (key, value) {
                return <li class="search-info-desc"><span class="search-info-tag">{key}</span>{value}</li>;
            })
        );
    }
}