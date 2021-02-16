import extract from "./unzipper";
import execute from "./executer";

const fs = window.require?.('fs');

class Game {
    constructor(id, name, shortName, desc, longDesc, image, notificationIcon, fileName, url) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.desc = desc;
        this.longDesc = longDesc;
        this.image = image;
        this.notificationIcon = notificationIcon;
        this.fileName = fileName;
        this.url = url;
        this.isRunning = false;
    }

    exists() {
        return !!fs?.existsSync(`download/${this.fileName}.zip`);
    }

    extract(onComplete) {
        if (!fs?.existsSync(`games/${this.fileName}`)) {
            if (fs?.existsSync(`download/${this.fileName}.zip`)) {
                extract?.(`download/${this.fileName}.zip`, 'games', onComplete);
            } else {
                console.log("Game zip file doesnt exist!");
            }
        } else {
            console.log("Game already exists so running it!");
            onComplete();
        }
    }

    execute(onRun, onExit) {
        if (!this.isRunning) {
            execute?.(`games/${this.fileName}/${this.shortName}.exe`, onRun, onExit);
        }
    }

    setIsRunning(isRunning) {
        this.isRunning = isRunning;
    }
}

let games = [
    new Game(
        1,
        "PlanZ: Zombie survival Game",
        "PlanZ",
        "The action zombie survival game where you have to fight enemies such as mutants and zombies",
        "The action zombie survival game where you have to fight enemies such as mutants and zombies",
        "planz-logo.jpeg",
        "planz-logo-notification.jpeg",
        "PlanZ-Download",
        "http://deltafk.ir/skyblade/PlanZ-Download.zip",
    )
]

let userGames = [
    games[0]
];

let storeGames = [
    games[0]
];

export {userGames, storeGames};