import React, { Component } from 'react';
import './App.css';
import data from "./website.json";
import moment from 'moment';
import * as backgroundmatrix from "./background.js";

class App extends Component {
  render() {
    return (
      <div id="body">

        <div id="mainContainerParent">
          
          <div id="mainContainer">
            <WelcomeText/>  
            <Searchbar/>
            <SearchbarList/>
            <div id="dropdownContainer"> <List data={data}/> </div> 
          </div>
        </div>
        <Calendar/>
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
  }
  componentDidMount(){
    this.nameLoader();
  }
  async nameLoader(){
    // var name = Object.values(parsedData.welcomeText)


    // var bigText = document.getElementById("bigText");
    // var textTD = "Welcome " + name[0];
    // bigText.innerHTML = textTD;
    
    // for(var i=0; i<textTD.length ; i++){
    //   console.log(i, bigText.innerHTML[i]);
    //   bigText.innerHTML[i].style.opacity = '1';
    //   await sleep(100);
    // }

    
    

  }

  render(){
    return(
      <div id="animationDiv">
        <svg id="animationHolder">
            <text id="animationText" y="50" >Welcome Mikael
              <animate id="outlineAnimation" attributeName="stroke-dashoffset"from="1000"to="600" dur="5.5s" fill="freeze"/> 

              <animate attributeName="fill" values="#33363D;#0C85D3"  begin="outlineAnimation.end - 0.5" dur="1s" fill="freeze"/>
          </text>
        </svg>
      </div>
    );
  }
}


class Calendar extends React.Component{
  constructor() {
    super();

    this.state = {
      curDay : null,
      curDate : null,
      curTime: null
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
      <div id="datetime-text-holder">
        <p className="datetime-text">{this.state.curDay} <br/> {this.state.curDate} <br/> {this.state.curTime} </p>
      </div>
    );
  }
}


class Matrixbackground extends React.Component{
  constructor(){
    super();
  }

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
    console.log("listeroni", keys);
    console.log("self", self);
    if(this.searchTag === ""){
      window.location.replace("https://www.google.com/search?q=" + searchValue);
      return true;
    }
    keys.some(function(key) {
      console.log(self.searchTag, "ogid");
      console.log(key, "key")
      if (self.searchTag === key) {
        window.location.replace(parsedData.searchValues.searchTags[key] + searchValue);
        console.log("naviagted 1st to", parsedData.searchValues.searchTags[key] + searchValue, "<--- first asdkjmkjasdl");
        return true;
      } 
    });
    
     // window.location.replace("https://www.google.com/search?q=" + searchValue);
     //  return true;
    
  }

  keyPress(e){
    var theTextbox = document.getElementById("search-bar");

    if(e.keyCode == 32){
      if(theTextbox.value[0] == '!' && theTextbox.value[2] == ' '){
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
            theTextbox.placeholder = "You messed up A-Aron";
            theTextbox.value = "";
            break;
        }
        console.log(this.searchTag, "ogtag");  
      }
    }

    if(e.key == 'Enter'){
      this.openSearchedPage(document.getElementById("search-bar").value);
    }
  }

  async focusedAnimation(e){
    var searchBar = document.getElementById("search-bar");
    var infoList = document.getElementById("search-info-container");
    var textBars = document.getElementsByClassName("search-info-desc");

    searchBar.style.height = '40px';
    infoList.style.display = 'flex';

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
    
    
    for(var i=0; i<textBars.length; i++){
      await sleep(50);
      revTextBars[i].style.opacity = '0';
      
    }
    await sleep(200);
    infoList.style.display = 'none';
    await sleep(50);
    searchBar.style.height = '30px';
    
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
          <li class="search-info-desc"><center>Change Search: Type 2 Character Code Followed By a Space</center></li>
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




// class List extends React.Component{
  
//   render() {
//     return ( 
//       mapObject(parsedData.categories, function (key, value) {
//         return (
//         <ul className="testing">
//           <li>
//             {key}
//               <ul> 
//                 <Item key={key} details={parsedData.categories[key]}/> 
//               </ul>
//           </li>
//         </ul>);
//       })
//     );
//   }
// }


