import React from 'react';

class LastfmHandler extends React.Component {
    constructor(props) {
        super(props);
        this.username = Object.values(this.props.parsedData.lastfm)[0];
        this.apikey = Object.values(this.props.parsedData.lastfm)[1];
        this.activate = Object.values(this.props.parsedData.lastfm)[2];
        this.relInfoList = ["", "", ""];

        this.state = {
            curArtist: "",
            curSong: "",
            curAlbum: "",
            curOBJ: ""
        }
    }

    componentWillMount() {
        if (this.activate === "true") {
            this.setSongInfoToState();
        }
    }
    componentDidMount() {
        if (this.activate === "true") {
            setInterval(() => {
                this.setSongInfoToState();
            }, 5000)
        }
    }
    setSongInfoToState = async () => {
        await this.getRecentlyPlayed();
        try {
            if (Object.values(this.state.curOBJ.recenttracks.track[0]["@attr"])[0] === "true") {
                this.setState({
                    curArtist: Object.values(this.state.curOBJ.recenttracks.track[0].artist["#text"]),
                    curSong: Object.values(this.state.curOBJ.recenttracks.track[0].name),
                    curAlbum: Object.values(this.state.curOBJ.recenttracks.track[0].album["#text"])
                });
            }
        }
        catch (e) {
            this.setState({
                curArtist: "No song scrobbling",
                curSong: "",
                curAlbum: ""
            })
        }
    }

    getRecentlyPlayed = async () => {
        await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + this.username + "&api_key=" + this.apikey + "&format=json").then(respone => respone.json()).then(json => {
            this.setState({
                curOBJ: json
            });
        })
    }

    render() {
        return (
            <div id="music-holder">
                <p class="info-text" id="music-text">{this.state.curArtist}<br />{this.state.curSong}<br />{this.state.curAlbum}</p>
            </div>
        );
    }
}

export default LastfmHandler;

