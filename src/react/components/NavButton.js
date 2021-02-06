import React, { Component } from 'react';
import { gradientColorStopAnimation } from '../utilities/animations';
import switchToPage from '../utilities/switch-to-page';
import './css/NavButton.css';

class NavButton extends Component {
    handleClick() {
        switchToPage(this.props.id, this.props.number, this.props.display);
    }

    handleHover() {
        gradientColorStopAnimation(this.props.id, '#2c3e50', 'transparent', 100, true)
    }

    handleLeave() {
        gradientColorStopAnimation(this.props.id, '#2c3e50', 'transparent', 100, false);
    }

    render() {
        return (
            <div className="button">
                <button id={this.props.id}
                    onMouseEnter={() => this.handleHover()}
                    onMouseLeave={() => this.handleLeave()}
                    onClick={() => this.handleClick()}
                >
                    {this.props.children}
                </button>
            </div>
        );
    }
}

export default NavButton;