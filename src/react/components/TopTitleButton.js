import React, {Component} from 'react';
import './css/TopTitleButton.css';
import switchToPage from "../utilities/switch-to-page";

class TopTitleButton extends Component {
    handleClick(page) {
        switchToPage(`${page}-container`, 'grid');
    }

    render() {
        return (
            <button onClick={() => this.handleClick(this.props.page)}>
                {this.props.children}
            </button>
        );
    }
}

export default TopTitleButton;