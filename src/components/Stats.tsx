import {Box, Text} from "ink";

interface StatsProps {
    releasableSpace: string;
    totalFound: number;
    searchTime: string;
}

const Stats = ({
                   releasableSpace,
                   totalFound,
                   searchTime,
               }: StatsProps) => {
    const width = 48; // igual que minWidth
    const title = "─ scan summary ";
    const dashes = "─".repeat(width - title.length);

    return (
        <Box flexDirection="column"
             borderStyle="round"
             borderColor="#d4d4d4"
             minWidth={50}
             padding={1}
             gap={1}>
            <Box flexDirection="row" justifyContent="space-between">
                <Text color="#50a9bf">Scan summary</Text>
                <Text color="#b2b4b9">{dashes}</Text>
            </Box>
            <Box flexDirection="column">
                <Box justifyContent="space-between">
                    <Text color="#9CA3AF">total size</Text>
                    <Text color="#E5E7EB">{totalFound}</Text>
                </Box>
                <Box justifyContent="space-between">
                    <Text color="#9CA3AF">releasable space</Text>
                    <Box flexDirection="row" gap={1} justifyContent="space-between">
                        <Text color="#8cc3bf">{releasableSpace}</Text>
                        <Text color="#8cc3bf">GB</Text>
                    </Box>
                </Box>
                <Box justifyContent="space-between">
                    <Text color="#9CA3AF">search time</Text>
                    <Box flexDirection="row" gap={1} justifyContent="space-between">
                        <Text color="#8cc3bf">{searchTime}</Text>
                        <Text color="#8cc3bf">s</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Stats;