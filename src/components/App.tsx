import {Box} from "ink";
import Banner from "./Banner";
import Stats from "./Stats";
import {useState} from "react";
import Scanner from "./Scanner.tsx";
import type {ScanResult} from "../types";
import List from "./List.tsx";
import Footer from "./Footer.tsx";

interface AppProps {
    dir: string
}

const App = ({dir} : AppProps) => {
    const [scanning, setScanning] = useState(true);
    const [results, setResults] = useState<ScanResult[]>([]);
    const [totalSize, setTotalSize] = useState(0);
    const [searchTime, setSearchTime] = useState("0.0");


    const handleFinish = (paths: ScanResult[], size: number, time: string) => {
        setResults(paths);
        setTotalSize(size);
        setSearchTime(time);
        setScanning(false);
    };

    const handleDelete = (deleted: string[]) => {
        setResults((prev) => prev.filter((r) => !deleted.includes(r.path)));
    };


    const toGB = (bytes: number) =>
        (bytes / 1024 / 1024 / 1024).toFixed(2);

    return (
        <Box alignItems={"center"} flexDirection="column" gap={1.5}>
            <Box flexDirection="column">
                <Banner />
            </Box>

            {scanning ? (
                <Scanner dir={dir} onFinish={handleFinish}></Scanner>
            ) : (
                <Box flexDirection="column" justifyContent="center">
                    <Stats
                        releasableSpace={toGB(totalSize)}
                        totalFound={results.length}
                        searchTime={searchTime}
                    />
                    <List results={results} onDelete={handleDelete}/>
                    <Footer />
                </Box>
            )}
        </Box>
    );
};

export default App;