import React, { Component } from 'react';
import './App.css';
import data from "./website.json";
import moment from 'moment';
import "./background.js";

class App extends Component {

  componentWillMount(){
    document.title = "Welcome " + Object.values(parsedData.welcomeText);
  }
  render() {
    return (
      <div id="body">
        <div id="mainContainerParent">
        <WelcomeText/>
          <div id="mainContainer">
              
            <Searchbar/>
            <SearchbarList/>
            <div id="dropdownContainer"> <List data={data}/> </div> 
          </div>
        </div>
        <div id="info-holder">
          <Calendar/>
          <LastfmHandler/>
        </div>
        <Matrixbackground/>
        
      </div> 
    );
  }
}

export default App;

const validatedData = JSON.stringify(data);
const parsedData = JSON.parse(validatedData);

function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class WelcomeText extends React.Component{
  constructor(){
    super();    
    this.nameLoader = this.nameLoader.bind(this);

    this.state = {
      textValue : 'temp?'
    }
  }
  componentDidMount(){
    this.nameLoader();
  }
  async nameLoader(){
    var name = Object.values(parsedData.welcomeText)
    var textTD = "Welcome " + name;

    this.setState({
      textValue: textTD
    })
  }

  render(){
    return(
      <svg id="animationHolder" preserveAspectRatio="xMidYMid meet" viewBox="0 0 66 100">
          <text id="animationText" textAnchor="middle" alignmentBaseline="middle" x="50%" y="50%">{this.state.textValue}
            <animate id="outlineAnimation" attributeName="stroke-dashoffset"from="1000"to="600" dur="5.5s" fill="freeze"/> 

            <animate attributeName="fill" values="#33363D;#0C85D3"  begin="outlineAnimation.end - 0.5" dur="1s" fill="freeze"/>
        </text>
      </svg>
    );
  }
}

class LastfmHandler extends React.Component{
  constructor(){
    super();

    this.username = Object.values(parsedData.lastfm)[0];
    this.apikey = Object.values(parsedData.lastfm)[1];
    this.activate = Object.values(parsedData.lastfm)[2];
    this.relInfoList = ["", "", ""];

    this.state ={
      curArtist : "",
      curSong : "",
      curAlbum : "",
      curOBJ : ""
    }
  }

  componentWillMount(){
    if (this.activate === "true"){
      this.setSongInfoToState();
    }
  }
  componentDidMount(){
    if (this.activate === "true"){
      setInterval( () => {
        this.setSongInfoToState();
      },5000) 
    }
  }

setSongInfoToState = async () => {
  const ppll = await this.getRecentlyPlayed();  //Assigment needed to cause slowdown for the code to run in correct sequence. Rly cringe hack :)
  try{
    if(Object.values(this.state.curOBJ.recenttracks.track[0]["@attr"]) == "true"){
      this.setState({
        curArtist : Object.values(this.state.curOBJ.recenttracks.track[0].artist["#text"]),
        curSong : Object.values(this.state.curOBJ.recenttracks.track[0].name),
        curAlbum : Object.values(this.state.curOBJ.recenttracks.track[0].album["#text"])
      });  
    } 
  }
  catch(e){
    this.setState({
      curArtist : "No song scrobbling",
      curSong : "",
      curAlbum : ""
    })
  }
}

getRecentlyPlayed = async () => {
  await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+this.username+"&api_key="+this.apikey+"&format=json").then(respone => respone.json()).then(json => {
    this.setState({
      curOBJ : json
    });
  })
}

  render() {
      return (
        <div id="music-holder">
          <p class="info-text" id="music-text">{this.state.curArtist}<br/>{this.state.curSong}<br/>{this.state.curAlbum}</p>
        </div>
      );
  }
}

class Calendar extends React.Component{
  constructor() {
    super();

    this.state = {
      curDay : "",
      curDate : "",
      curTime: ""
    }
  }  
  componentDidMount() {
    setInterval( () => {
      this.tick();
    },1000) 
  }

  tick(){
      this.setState({
        curDay : moment().format('dddd'),
        curDate : moment().format('MMMM Do YYYY'),
        curTime : moment().format('h:mm:ss a')
      })
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return (
      <p className="info-text">{this.state.curDay} <br/> {this.state.curDate} <br/> {this.state.curTime} </p>
    );
  }
}


class Matrixbackground extends React.Component{
  render(){
    return(
        <canvas id="myCanvas"></canvas>
    );
  }
}

class Searchbar extends React.Component {
  constructor() {
    super();
    this.openSearchedPage = this.openSearchedPage.bind(this);
    this.focusedAnimation = this.focusedAnimation.bind(this);
    this.unfocusedAnimation = this.unfocusedAnimation.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.searchTag = "";
  }

  openSearchedPage(searchValue) {
    var keys = Object.keys(parsedData.searchValues.searchTags)
    var self = this;
    if(this.searchTag === ""){
      window.location.replace("https://www.google.com/search?q=" + searchValue);
      return true;
    }
    keys.some(function(key) {
      if (self.searchTag === key) {
        window.location.replace(parsedData.searchValues.searchTags[key] + searchValue);
        return true;
      } 
    });
    
  }

  keyPress(e){
    var theTextbox = document.getElementById("search-bar");

    if(e.keyCode === 32){
      if(theTextbox.value[0] === '!' && theTextbox.value[2] === ' '){
        this.searchTag = theTextbox.value[0] + theTextbox.value[1];

        switch(this.searchTag){
          case '!r':
            theTextbox.placeholder = "Reddit";
            theTextbox.value = "";
            break;

          case '!w':
            theTextbox.placeholder = "Wikipedia";
            theTextbox.value = "";
            break;
  
          case '!y':
            theTextbox.placeholder = "Youtube";
            theTextbox.value = "";
            break;
          
          case '!g':
            theTextbox.placeholder = "Google";
            theTextbox.value = "";
            break;
  
          default:
            theTextbox.placeholder = "You messed up A-A-ron";
            theTextbox.value = "";
            break;
        }
      }
    }

    if(e.key === 'Enter'){
      this.openSearchedPage(document.getElementById("search-bar").value);
    }
  }

  async focusedAnimation(e){
    var searchBar = document.getElementById("search-bar");
    var infoList = document.getElementById("search-info-container");
    var textBars = document.getElementsByClassName("search-info-desc");
    var svgContainer = document.getElementById("animationHolder");

    searchBar.style.height = '40px';
    infoList.style.display = 'flex';
    svgContainer.style.opacity = '0';

    for(var i = 0; i<textBars.length; i++ ){
      await sleep(50);
      textBars[i].style.opacity = '1';
    }
  }

  async unfocusedAnimation(e){
    var searchBar = document.getElementById("search-bar");
    var infoList = document.getElementById("search-info-container");
    var textBars = document.getElementsByClassName("search-info-desc");
    var revTextBars = [].slice.call(textBars, 0).reverse()
    var svgContainer = document.getElementById("animationHolder");

    
    for(var i=0; i<textBars.length; i++){
      await sleep(50);
      revTextBars[i].style.opacity = '0';
    }
    await sleep(200);
    infoList.style.display = 'none';
    await sleep(50);
    searchBar.style.height = '30px';
    svgContainer.style.opacity = '1';
  }

  
  render() {
  	return (
      <div id="search-bar-container">
        <input autoComplete="off" type="text" id="search-bar" onBlur={this.unfocusedAnimation} onFocus={this.focusedAnimation} onKeyUp={this.keyPress} placeholder="Search something..." />
      </div>
    );
  }
}

class SearchbarList extends React.Component{
  render(){
    return(
      <div id="search-info-container">
        <ul id="search-info-list">
          <li className="search-info-desc"><center>Change Search: Type 2 Character Code Followed By a Space</center></li>
          <SearchbarListItem/>
        </ul>
      </div>
    );
  }
}

class SearchbarListItem extends React.Component{
  render(){
    return(
      mapObject(parsedData.searchValues.searchInfo, function(key, value){
        return <li class="search-info-desc"><span class="search-info-tag">{key}</span>{value}</li>;
      })
    );
  }
}

class List extends React.Component{
  
  render() {
    return ( 
      mapObject(parsedData.categories, function (key, value) {
        return (
        <div id="dropdown">
          <div id="category-cirle"><center>{key[0].toUpperCase() + key[1]}</center></div>
          <div id="dropdown-content">
            <Item key={key} details={parsedData.categories[key]}/>             
          </div>
        </div>
        );
      })
    );
  }
}

class Item extends React.Component{
  render() {
      return (
        mapObject(this.props.details, function (key, value) {
          return<li><a href={value}>{key}</a></li>;
        })
      );
  }
}
