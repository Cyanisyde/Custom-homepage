import React from 'react';

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.openSearchedPage = this.openSearchedPage.bind(this);
        this.focusedAnimation = this.focusedAnimation.bind(this);
        this.unfocusedAnimation = this.unfocusedAnimation.bind(this);
        this.sleep = this.sleep.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.searchTag = "";
        this.searchTags = Object(this.props.parsedData.searchValues.searchTags);
        this.searchInfo = Object(this.props.parsedData.searchValues.searchInfo);
    }

    openSearchedPage(searchValue) {
        var keys = Object.keys(this.props.parsedData.searchValues.searchTags)
        var self = this;
        if (this.searchTag === "") {
            window.location.replace("https://www.google.com/search?q=" + searchValue);
            return true;
        }
        keys.some((key) => {
            if (self.searchTag === key) {
                window.location.replace(this.props.parsedData.searchValues.searchTags[key] + searchValue);
                return true;
            }
        });
    }

    keyPress(e) {
        var theTextbox = document.getElementById("search-bar");

        if (e.keyCode === 32) {

            console.log(this.searchTags);
            if (Object.keys(this.searchTags).includes(theTextbox.value.slice(0, -1))) {
                this.searchTag = theTextbox.value.slice(0, -1);
                theTextbox.placeholder = this.searchInfo[theTextbox.value.slice(0, -1)];
                theTextbox.value = "";
            }
        }

        if (e.key === 'Enter') {
            this.openSearchedPage(document.getElementById("search-bar").value);
        }
    }

    async focusedAnimation(e) {
        var searchBar = document.getElementById("search-bar");
        var infoList = document.getElementById("search-info-container");
        var textBars = document.getElementsByClassName("search-info-desc");
        var svgContainer = document.getElementById("animationHolder");

        searchBar.style.height = '40px';
        infoList.style.display = 'flex';
        svgContainer.style.opacity = '0';

        for (var i = 0; i < textBars.length; i++) {
            await this.sleep(50);
            textBars[i].style.opacity = '1';
        }
    }

    async unfocusedAnimation(e) {
        var searchBar = document.getElementById("search-bar");
        var infoList = document.getElementById("search-info-container");
        var textBars = document.getElementsByClassName("search-info-desc");
        var revTextBars = [].slice.call(textBars, 0).reverse()
        var svgContainer = document.getElementById("animationHolder");


        for (var i = 0; i < textBars.length; i++) {
            await this.sleep(50);
            revTextBars[i].style.opacity = '0';
        }
        await this.sleep(200);
        infoList.style.display = 'none';
        await this.sleep(50);
        searchBar.style.height = '30px';
        svgContainer.style.opacity = '1';
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        return (
            <div id="search-bar-container">
                <input autoComplete="off" type="text" id="search-bar" onBlur={this.unfocusedAnimation} onFocus={this.focusedAnimation} onKeyUp={this.keyPress} placeholder="Search something..." />
            </div>
        );
    }
}

export default Searchbar;