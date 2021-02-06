
const downloader = async ({ onStarted, onProgress, onCompleted }, link) => {
    try {
        const response = await fetch(link);
        const contentLength = response.headers['content-length'];
        const reader = response.body.getReader();

        onStarted();

        let receivedLength = 0;
        const chunks = [];
        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                chunks.push(value);
                receivedLength += value.length;
                onProgress({
                    link,
                    contentLength,
                    receivedLength,
                    percentage: Math.floor((receivedLength / contentLength) * 100)
                });

                console.log(`Received ${receivedLength} of ${contentLength}`);
            }
        } catch (e) {
            return e;
        }

        const chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for (const chunk of chunks) {
            chunksAll.set(chunk, position);
            position += chunk.length;
        }

        onCompleted({
            link,
            data: chunksAll
        });

        return chunksAll
    } catch (e) { }
};

export default downloader;