const DecompressZip = window.require?.("decompress-zip");

function extract(zipPath, destPath, onComplete) {
    let unZipper = new DecompressZip(zipPath);

    unZipper?.on('error', function (err) {
        console.log('Caught an error', err);
        console.log(zipPath);
        console.log(destPath);
    });

    unZipper?.on('extract', function (log) {
        console.log('Finished extracting', log);
        onComplete();
    });

    unZipper?.extract({
        path: destPath
    })
}

export default extract;

