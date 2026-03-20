import {Box, Text} from 'ink'
import {findNodeModules} from "../utils/finder.ts";
import {useEffect, useState} from 'react'
import type {ScanResult} from "../types";

interface ScannerProps {
    dir: string,
    onFinish: (results: ScanResult[], totalSize: number, searchTime: string) => void
}

const ProgressBar = ({current, total} : {current: number, total: number}) => {
    const width = 48;
    const filled = Math.floor((current / total) * width);
    const empty = width - filled

    return (
        <Box gap={1}>
            <Text color="#50a9bf">{"█".repeat(filled)}</Text>
            <Text color="#3E4451">{"░".repeat(empty)}</Text>
            <Text color="#9CA3AF">{current}/{total}</Text>
        </Box>
    );
}

const Scanner = ({dir, onFinish}: ScannerProps) => {
    const [currentPath, setCurrentPath] = useState("");
    const [index, setIndex] = useState(0);
    const [paths, setPaths] = useState<ScanResult[]>([]);
    const [searchTime, setSearchTime] = useState("0.0s");


    useEffect(() => {
        const startTime = Date.now();
        const results = findNodeModules(dir);
        const endTime = Date.now();
        const searchTime = ((endTime - startTime) / 1000).toFixed(2);
        setPaths(results);
        setSearchTime(searchTime);
    }, [])

    useEffect(() => {
        if (paths.length === 0) return;

        const interval = setInterval(() => {
            if (index < paths.length) {
                setCurrentPath(paths[index]?.path ?? "");
                setIndex((i) => i + 1);
            } else {
                clearInterval(interval);
                const totalSize = paths.reduce((acc, r) => acc + r.size, 0);
                onFinish(paths, totalSize, searchTime);
            }
        }, 200);

        return () => clearInterval(interval);
    }, [paths, index]);

    return (
        <Box flexDirection="column" gap={1}>
            {/*<Text color="#3E4451">❯ {currentPath}</Text>*/}
            <ProgressBar current={index} total={paths.length} />
        </Box>
    );
}

export default Scanner;
