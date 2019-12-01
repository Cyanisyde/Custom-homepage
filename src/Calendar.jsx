import React from 'react';
import moment from 'moment';


class Calendar extends React.Component {
    constructor() {
        super();

        this.state = {
            curDay: "",
            curDate: "",
            curTime: ""
        }
    }
    componentWillMount() {
        this.tick();
    }

    componentDidMount() {
        setInterval(() => {
            this.tick();
        }, 1000)
    }

    tick() {
        this.setState({
            curDay: moment().format('dddd'),
            curDate: moment().format('MMMM Do YYYY'),
            curTime: moment().format('h:mm:ss a')
        })
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <p className="info-text">{this.state.curDay} <br /> {this.state.curDate} <br /> {this.state.curTime} </p>
        );
    }
}

export default Calendar;