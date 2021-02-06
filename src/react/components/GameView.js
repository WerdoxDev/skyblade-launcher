import React, { Component } from 'react';
import findByType from '../utilities/find-by-type';
import { transformAnimation, scaleAnimation } from '../utilities/animations'
import switchToPage from '../utilities/switch-to-page';
import { Context } from '../components/MainProvider';
import './css/GameView.css';

const Name = () => null;
const Image = () => null;

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'game-container-' + Math.floor(Math.random() * Math.floor(1000)),
        }
    }

    handleClick(context) {
        switchToPage('game-store', 1, 'grid');
        const { children } = this.props;
        const name = findByType(children, Name);
        context.setMessage(name.props.children);
    }

    handleHover() {
        scaleAnimation('#' + this.state.id + ' .game-logo', 500, '1.1', null);
        transformAnimation('#' + this.state.id + ' .description', 500, null, 5);
    }

    handleLeave() {
        scaleAnimation('#' + this.state.id + ' .game-logo', 500, '1', null);
        transformAnimation('#' + this.state.id + ' .description', 500, null, 0);
    }

    renderName() {
        const { children } = this.props;
        const name = findByType(children, Name);
        if (!name) {
            return null;
        }

        return (
            <div className="description">
                <h2>{name.props.children}</h2>
            </div>
        );
    }

    renderImage() {
        const { children } = this.props;
        const image = findByType(children, Image);
        if (!image) {
            return null;
        }

        return (
            <img className="game-logo" src={image.props.src}
                alt="game-logo">
            </img>
        );
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div className="game-container" id={this.state.id}
                        onClick={() => this.handleClick(context)}
                        onMouseEnter={() => this.handleHover()}
                        onMouseLeave={() => this.handleLeave()}>
                        {this.renderImage()}
                        {this.renderName()}
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

GameView.Name = Name;
GameView.Image = Image;
export default GameView;