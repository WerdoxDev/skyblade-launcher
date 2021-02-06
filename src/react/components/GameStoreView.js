import React, {Component} from 'react';
//import findByType from '../utilities/find-by-type';
import {Context} from './MainProvider';
import {transformAnimation} from '../utilities/animations';
import switchToPage from '../utilities/switch-to-page';
import './css/GameStoreView.css';
import {channels} from '/../Users/MuffinPlayz/skyblade-launcher/src/shared/constants';

const {ipcRenderer} = window;

class BackButton extends Component {
    handleClick() {
        switchToPage('store', 1, 'grid');
    }

    handleHover() {
        transformAnimation('#back-button', 250, -5, null);
    }

    handleLeave() {
        transformAnimation('#back-button', 250, 0, null);
    }

    render() {
        return (
            <button id="back-button"
                    onClick={() => this.handleClick()}
                    onMouseEnter={() => this.handleHover()}
                    onMouseLeave={() => this.handleLeave()}>
                {'<'}
            </button>
        );
    }
}

const ProgressBar = (props) => {
    return (
        <div className="progress-bar" id="progress-bar">
            <div className="background">
                <div className="filler" style={{width: `${props.percentage}%`}}/>
            </div>
            <div
                className="download-status">{`${props.speed} | ${props.downloaded}Mb / ${props.total}Mb (${props.percentage}%)`}</div>
        </div>
    );
}

class GameStoreView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            percentage: 0,
            downloaded: 0,
            total: 0,
            speed: '0Kb',
        };

        ipcRenderer.on(channels.DOWNLOAD_PROGRESS, (event, arg) => {
            this.setState({
                percentage: Math.floor((arg.current / arg.total) * 100),
                downloaded: (arg.current / 1000000).toFixed(2),
                total: (arg.total / 1000000).toFixed(2),
                speed: (arg.speed / 1000).toFixed(2) * 2 >= 1000 ?
                    (arg.speed / 1000000).toFixed(2) * 2 + 'Mb' : (arg.speed / 1000).toFixed(2) * 2 + 'Kb',
            });
        });
    }

    handleHover(id) {
        transformAnimation('#' + id, 250, null, 5);
    }

    handleLeave(id) {
        transformAnimation('#' + id, 250, null, 0);
    }

    handleClick(id) {
        if (id === 'download') {
            ipcRenderer.send(channels.DOWNLOAD_START, 'https://s16.picofile.com/d/8419852626/4f8c509b-8a27-46e2-87ec-b77c1d10ce2d/Build.zip');
            document.getElementById('progress-bar').style.visibility = 'visible';
        } else if (id === 'pause') {
            ipcRenderer.send(channels.DOWNLOAD_PAUSE);
        } else if (id === 'cancel') {
            ipcRenderer.send(channels.DOWNLOAD_CANCEL);
            document.getElementById('progress-bar').style.visibility = 'hidden';
        }
        //downloader(function () { console.log('Started') }, function () { console.log('Progress') }, function () { console.log('Completed') }, 'https:s16.picofile.com/d/8419852626/9bc4fe8d-a86d-4a6a-8bcf-4fac911985b3/Build.zip');
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div className="game-store-container" name="tab-content" id="game-store-container">
                        <div className="title-container">
                            <h1>{context.state.message + ' Title Image'}</h1>
                            <BackButton></BackButton>
                        </div>
                        <div className="main-content">
                            <div className="content-border">
                                <div className="icon"></div>
                                <div className="name">{context.state.message}</div>
                                <ProgressBar percentage={this.state.percentage}
                                             speed={this.state.speed}
                                             downloaded={this.state.downloaded}
                                             total={this.state.total}/>
                                <div className="buttons-container">
                                    <button className="button" id="download-button"
                                            onClick={() => this.handleClick('download')}
                                            onMouseEnter={() => this.handleHover('download-button')}
                                            onMouseLeave={() => this.handleLeave('download-button')}>
                                        {'>'}
                                    </button>
                                    <button className="button center" id="pause-button"
                                            onClick={() => this.handleClick('pause')}
                                            onMouseEnter={() => this.handleHover('pause-button')}
                                            onMouseLeave={() => this.handleLeave('pause-button')}>
                                        =
                                    </button>
                                    <button className="button" id="cancel-button"
                                            onClick={() => this.handleClick('cancel')}
                                            onMouseEnter={() => this.handleHover('cancel-button')}
                                            onMouseLeave={() => this.handleLeave('cancel-button')}>
                                        x
                                    </button>
                                </div>
                            </div>
                            <div className="description-border">
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo. Ipsum
                                    dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Tortor
                                    pretium viverra suspendisse potenti nullam ac tortor. Tellus pellentesque eu
                                    tincidunt tortor aliquam nulla. Sed vulputate mi sit amet mauris commodo quis
                                    imperdiet massa.
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Context.Consumer>
        );
    }
}

export default GameStoreView;