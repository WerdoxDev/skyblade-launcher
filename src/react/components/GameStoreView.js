import React, {Component} from "react";
import {transformAnimation} from "../utilities/animations";
import switchToPage from "../utilities/switch-to-page";
import {channels} from "../../shared/constants";
import {userGames} from "../../shared/games";
import "./css/GameStoreView.css";

const electron = window.require?.('electron');
const {ipcRenderer} = electron ?? {};

class BackButton extends Component {
    handleClick() {
        switchToPage("library-container", "grid");
        this.props.updateValue('update');
    }

    handleHover() {
        transformAnimation("#back-button", 250, -5, null);
    }

    handleLeave() {
        transformAnimation("#back-button", 250, 0, null);
    }

    render() {
        return (
            <button
                id="back-button"
                onClick={() => this.handleClick()}
                onMouseEnter={() => this.handleHover()}
                onMouseLeave={() => this.handleLeave()}
            >
                {"<"}
            </button>
        );
    }
}

class GameStoreView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            download: {
                percentage: 0,
                downloaded: 0,
                total: 0,
                speed: "0Kb"
            },
            game: null,
        };

        this.progressBar = React.createRef();
        this.installStatus = React.createRef();
        this.progressBarBackground = React.createRef();
        this.playButton = React.createRef();
        this.buttonsContainer = React.createRef();

        ipcRenderer?.on(channels.DOWNLOAD_PROGRESS, (event, arg) => {
            this.setState({
                download: {
                    percentage: Math.floor((arg.current / arg.total) * 100),
                    downloaded: (arg.current / 1000000).toFixed(2),
                    total: (arg.total / 1000000).toFixed(2),
                    speed:
                        (arg.speed / 1000).toFixed(2) * 2 >= 1000
                            ? (arg.speed / 1000000).toFixed(2) * 2 + "Mb/s"
                            : (arg.speed / 1000).toFixed(2) * 2 + "Kb/s"
                }
            });
        });

        ipcRenderer?.on(channels.DOWNLOAD_COMPLETE, () => {
            this.progressBar.current.style.visibility = 'visible';
            this.progressBarBackground.current.style.display = 'none';
            this.installStatus.current.textContent = 'Installing...';
            this.state.game.extract(() => {
                this.buttonsContainer.current.style.display = 'none';
                this.playButton.current.style.display = 'block';
                this.progressBar.current.style.visibility = 'hidden';

                let notification = new Notification('Installation Complete!', {
                    body: `You can now play ${this.state.game.shortName} from the launcher!`,
                    icon: this.state.game.notificationIcon,
                });
                notification.onclick = () => {
                    this.state.game.execute(() => {
                        this.updateState('update');
                        this.gameRunState();
                    }, () => {
                        this.updateState('update');
                        this.gameExitState()
                    });
                }
            })
        })
    }

    updateState(channel, data) {
        this.props.changeValue(channel, data);
        console.log('Update state from GameStoreView in channel: ' + channel);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value.channel === 'update' && this.props !== prevProps && this.props.value.data) {
            this.setState((state, props) => ({
                game: userGames[props.value.data - 1]
            }), () => {
                this.state.game.isRunning ? this.gameRunState() : this.gameExitState();
                if (this.state.game.exists()) {
                    this.buttonsContainer.current.style.display = 'none';
                    this.playButton.current.style.display = 'block';
                } else {
                    this.buttonsContainer.current.style.display = 'flex';
                    this.playButton.current.style.display = 'none';
                }
            });
        }
    }

    handleHover(id) {
        transformAnimation('#' + id, 250, null, 5);
    }

    handleLeave(id) {
        transformAnimation('#' + id, 250, null, 0);
    }

    gameRunState() {
        this.playButton.current.style.backgroundImage = 'none';
        this.playButton.current.style.backgroundColor = '#1c1d22';
        this.playButton.current.style.color = 'white';
        this.playButton.current.textContent = 'Running';
        if (this.state.game) this.state.game.setIsRunning(true);
    }

    gameExitState() {
        this.playButton.current.style.backgroundColor = 'none';
        this.playButton.current.style.backgroundImage = 'linear-gradient(to bottom, #24d9a1, #3dd2c6)';
        this.playButton.current.style.color = 'black';
        this.playButton.current.textContent = 'Play';
        if (this.state.game) this.state.game.setIsRunning(false);

        if (this.state.game.exists()) {
            this.buttonsContainer.current.style.display = 'none';
            this.playButton.current.style.display = 'block';
        } else {
            this.buttonsContainer.current.style.display = 'flex';
            this.playButton.current.style.display = 'none';
        }
    }

    handleClick(id) {
        if (id === 'install') {
            if (this.state.game.exists()) {
                this.state.game.extract(() => {
                    this.progressBar.current.style.visibility = 'visible';
                    this.progressBarBackground.current.display = 'none';
                    this.installStatus.current.textContent = 'Running...';
                    this.progressBar.current.style.visibility = 'hidden';
                });
                this.updateState('update');
            } else {
                ipcRenderer?.send(
                    channels.DOWNLOAD_START,
                    this.state.game.url,
                );
                this.progressBarBackground.current.display = 'block';
                this.progressBar.current.style.visibility = 'visible';
                this.updateState('update');
            }
        } else if (id === 'play') {
            this.state.game.execute(() => {
                this.updateState('update');
                this.gameRunState();
            }, () => {
                this.updateState('update');
                this.gameExitState()
            });
        } else if (id === 'pause') {
            ipcRenderer?.send(channels.DOWNLOAD_PAUSE);
        } else if (id === 'cancel') {
            ipcRenderer?.send(channels.DOWNLOAD_CANCEL);
            this.progressBar.current.style.visibility = 'hidden';
        }
    }

    render() {
        return (
            <div
                className="game-store-container"
                name="tab-content"
                id="game-store-container"
            >
                <div className="title-container">
                    <h1>{this.state.game?.shortName + " Title Image"}</h1>
                    <BackButton updateValue={this.updateState.bind(this)}/>
                </div>
                <div className="main-content">
                    <div className="content-border">
                        <div className="icon"/>
                        <div className="name">{this.state.game?.name}</div>
                        <div className="progress-bar" ref={this.progressBar}>
                            <div className="background" ref={this.progressBarBackground}>
                                <div className="filler" style={{width: `${this.state.download.percentage}%`}}/>
                            </div>
                            <div className="install-status" ref={this.installStatus}>
                                {`${this.state.download.speed} | ${this.state.download.downloaded}Mb / ${this.state.download.total}Mb (${this.state.download.percentage}%)`}
                            </div>
                        </div>
                        <button className="play-button" ref={this.playButton}
                                onClick={() => this.handleClick("play")}>
                            Play
                        </button>
                        <div className="buttons-container" ref={this.buttonsContainer}>
                            <button
                                id="install-button"
                                onClick={() => this.handleClick("install")}
                                onMouseEnter={() => this.handleHover("install-button")}
                                onMouseLeave={() => this.handleLeave("install-button")}
                            >
                                {">"}
                            </button>
                            <button
                                id="pause-button"
                                onClick={() => this.handleClick("pause")}
                                onMouseEnter={() => this.handleHover("pause-button")}
                                onMouseLeave={() => this.handleLeave("pause-button")}
                            >
                                =
                            </button>
                            <button
                                id="cancel-button"
                                onClick={() => this.handleClick("cancel")}
                                onMouseEnter={() => this.handleHover("cancel-button")}
                                onMouseLeave={() => this.handleLeave("cancel-button")}
                            >
                                x
                            </button>
                        </div>
                    </div>
                    <div className="description-border">
                        <div>{this.state.game?.longDesc}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameStoreView;
