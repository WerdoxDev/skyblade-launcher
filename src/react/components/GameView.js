import React, {Component} from "react";
import switchToPage from "../utilities/switch-to-page";
import "./css/GameView.css";
import {userGames} from "../../shared/games";

class GameView extends Component {
    constructor(props) {
        super(props);
        this.playButton = React.createRef();
        this.image = React.createRef();
        this.gameContainer = React.createRef();
        this.state = {
            game: userGames[this.props.gameId - 1],
        }
    }

    updateState(channel, data) {
        this.props.changeValue(channel, data);
        console.log('Update state from GameView in channel: ' + channel);
    }

    handleClick(e, id) {
        if (id === 'info') {
            switchToPage("game-store-container", "grid");
            this.updateState('update', this.props.gameId);
            e.stopPropagation();
        } else if (id === 'container') {
            if (!this.state.game.exists()) {
                switchToPage("game-store-container", "grid");
                this.updateState('update', this.props.gameId);
            } else {
                this.state.game.execute(() => {
                    this.updateState('update', this.props.gameId);
                    this.gameRunState();
                }, () => {
                    this.updateState('update', this.props.gameId);
                    this.gameExitState();
                });
            }
        }
    }

    gameRunState() {
        this.playButton.current.style.backgroundImage = 'none';
        this.playButton.current.style.backgroundColor = '#1c1d22';
        this.playButton.current.textContent = 'Running';
        this.playButton.current.style.color = 'white'
        if (this.state.game) this.state.game.setIsRunning(true);
    }

    gameExitState() {
        this.playButton.current.style.backgroundImage = 'linear-gradient(to bottom, #24d9a1, #3dd2c6)';
        this.playButton.current.style.backgroundColor = 'none';
        this.playButton.current.style.color = 'black';
        if (this.state.game) this.state.game.setIsRunning(false);

        if (this.state.game.exists()) {
            this.playButton.current.textContent = 'Play';
            this.image.current.style.filter = 'grayscale(0%)';
        } else {
            this.playButton.current.textContent = 'Install';
            this.image.current.style.filter = 'grayscale(100%)';
        }
    }

    componentDidMount() {
        if (this.state.game.exists()) {
            this.playButton.current.textContent = 'Play';
            this.image.current.style.filter = 'grayscale(0%)';
        } else {
            this.playButton.current.textContent = 'Install';
            this.image.current.style.filter = 'grayscale(100%)';
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value.channel === 'update' && this.props !== prevProps) {
            this.setState((state, props) => ({
                game: userGames[props.gameId - 1]
            }), () => {
                this.state.game.isRunning ? this.gameRunState() : this.gameExitState();
            });
        }
    }

    render() {
        return (
            <div
                className="game-container"
                id={`game-container-${this.state.game.id}`}
                ref={this.state.gameContainer}
                onClick={(e) => this.handleClick(e, "container")}
                // onMouseEnter={() => this.handleHover()}
                // onMouseLeave={() => this.handleLeave()}
            >
                <div className="game-info">
                    <div className="game-info__background"/>
                    <div className="game-info__name">{this.state.game.shortName}</div>
                    <div className="game-info__desc">{this.state.game.desc}</div>
                    <div className="game-info__play" ref={this.playButton}>Play</div>
                    <div className="game-info__store"
                         onClick={(e) => this.handleClick(e, "info")}>
                        Game Info
                    </div>
                </div>
                <div className="game-logo">
                    <img src={this.state.game.image} alt="game-logo" ref={this.image}/>
                </div>
                <div className="game-name">
                    <div/>
                    <h2>{this.state.game.name}</h2>
                </div>
            </div>
        );
    }
}

export default GameView;
