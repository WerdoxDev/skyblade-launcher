import React, {Component} from 'react';
import {transformAnimation} from '../utilities/animations';
import findByType from '../utilities/find-by-type';
import './css/TitleBar.css';
import {channels} from '/../Users/MuffinPlayz/skyblade-launcher/src/shared/constants';

const Minimize = () => null;
const Maximize = () => null;
const Close = () => null;
const {ipcRenderer} = window;

class TitleBar extends Component {
    handleHover(id) {
        console.log();
        transformAnimation('#' + id, 250, null, 3);
    }

    handleLeave(id) {
        transformAnimation('#' + id, 250, null, 0);
    }

    handleClick(id) {
        ipcRenderer.send(channels.TITLE_BAR, id)
    }

    renderMinimize() {
        const {children} = this.props;
        const minimize = findByType(children, Minimize);
        if (!minimize) {
            return null;
        }

        return (
            <button id="minimize"
                    text={minimize.props.text}
                    onClick={() => this.handleClick('minimize')}
                    onMouseEnter={() => this.handleHover('minimize')}
                    onMouseLeave={() => this.handleLeave('minimize')}
            >
                {minimize.props.text}
            </button>
        );
    }

    renderMaximize() {
        const {children} = this.props;
        const maximize = findByType(children, Maximize);
        if (!maximize) {
            return null;
        }

        return (
            <button id="maximize" className="center"
                    text={maximize.props.text}
                    onClick={() => this.handleClick('maximize')}
                    onMouseEnter={() => this.handleHover('maximize')}
                    onMouseLeave={() => this.handleLeave('maximize')}
            >
                {maximize.props.text}
            </button>
        );
    }

    renderClose() {
        const {children} = this.props;
        const close = findByType(children, Close);
        if (!close) {
            return null;
        }

        return (
            <button id="close"
                    text={close.props.text}
                    onClick={() => this.handleClick('close')}
                    onMouseEnter={() => this.handleHover('close')}
                    onMouseLeave={() => this.handleLeave('close')}
            >
                {close.props.text}
            </button>
        );
    }

    render() {
        return (
            <div className="title-bar">
                <div>
                    {this.renderMinimize()}
                    {this.renderMaximize()}
                    {this.renderClose()}
                </div>
            </div>
        );
    }
}

TitleBar.Minimize = Minimize;
TitleBar.Maximize = Maximize;
TitleBar.Close = Close;

export default TitleBar;

