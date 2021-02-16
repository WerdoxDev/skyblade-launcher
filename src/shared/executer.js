const child = window.require?.('child_process');

function execute(path, onRun, onExit) {
    const ls = child?.execFile(path, (error) => {
        if (error) {
            console.log(error);
        }
    });

    console.log('run');
    onRun?.();

    ls.on('exit', (code) => {
        console.log('exit: ' + code);
        onExit?.();
    });
}

export default execute;