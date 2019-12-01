import React from 'react';

class WelcomeText extends React.Component {
    constructor(props) {
        super(props);
        this.textTD = "Welcome " + this.props.parsedData.welcomeText.name;
        this.colorFlash = this.props.parsedData.colorSettings.nameColorFlash + ";" + this.props.parsedData.colorSettings.nameColorFill;
        this.colorOutline = this.props.parsedData.colorSettings.nameColorOutline;
    }

    render() {
        return (
            <svg id="animationHolder" preserveAspectRatio="xMidYMid meet" viewBox="0 0 66 100">
                <text id="animationText" style={{ stroke: this.colorOutline }} textAnchor="middle" alignmentBaseline="middle" x="50%" y="50%">{this.textTD}
                    <animate id="outlineAnimation" attributeName="stroke-dashoffset" from="1000" to="600" dur="5.5s" fill="freeze" />

                    <animate attributeName="fill" values={this.colorFlash} begin="outlineAnimation.end - 0.5" dur="1s" fill="freeze" />
                </text>
            </svg>
        );
    }
}

export default WelcomeText;