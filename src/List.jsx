import React from 'react';


class List extends React.Component {
    constructor(props) {
        super(props);
        this.catCircBG = this.props.parsedData.colorSettings.categoryCircleBackground;
        this.catCircText = this.props.parsedData.colorSettings.categoryCircleText;
    }
    render() {
        return (
            this.props.mapObject(this.props.parsedData.categories, (key, value) => {
                return (
                    <div id="dropdown">
                        <div id="category-cirle" style={{ backgroundColor: this.catCircBG, color: this.catCircText }}><center>{key[0].toUpperCase() + key[1]}</center></div>
                        <div id="dropdown-content">
                            <Item key={key} mapObject={this.props.mapObject} details={this.props.parsedData.categories[key]} />
                        </div>
                    </div>
                );
            })
        );
    }
}

export default List;

class Item extends React.Component {
    render() {
        return (
            this.props.mapObject(this.props.details, function (key, value) {
                return <li><a href={value}>{key}</a></li>;
            })
        );
    }
}

