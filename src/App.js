import React, { Component } from 'react';
import './App.css';
import data from "./website.json";
import "./background.js";

import Calendar from './Calendar.jsx';
import WelcomeText from './WelcomeText.jsx';
import LastfmHandler from './LastFmHandler';
import Searchbar from './Searchbar';
import SearchbarList from './SearchbarList';
import List from './List';

class App extends Component {

  constructor() {
    super();
    this.mapObject = this.mapObject.bind(this);
    this.validatedData = JSON.stringify(data);
    this.parsedData = JSON.parse(this.validatedData);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  componentWillMount() {
    document.title = "Welcome " + Object.values(this.parsedData.welcomeText)[0];
  }
  render() {
    return (
      <div id="body">
        <div id="mainContainerParent">
          <WelcomeText parsedData={this.parsedData} />
          <div id="mainContainer">
            <Searchbar parsedData={this.parsedData} />
            <SearchbarList parsedData={this.parsedData} mapObject={this.mapObject.bind(this)} />
            <div id="dropdownContainer"> <List data={data} mapObject={this.mapObject.bind(this)} parsedData={this.parsedData} /> </div>
          </div>
        </div>
        <div id="info-holder">
          <Calendar />
          <LastfmHandler parsedData={this.parsedData} />
        </div>
        <Matrixbackground />

      </div>
    );
  }
}

export default App;

class Matrixbackground extends React.Component {
  render() {
    return (
      <canvas id="myCanvas"></canvas>
    );
  }
}