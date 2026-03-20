import {Box, Text} from 'ink'
import figlet from "figlet";

const Banner = () => {
    const ascii = figlet.textSync("rip-module", { font: "Coder mini" });
    const lines = ascii.split("\n");

    return (
        <Box alignItems={"center"} flexDirection="column" gap={0}>
            {lines.map((line, i) => (
                <Text bold={true} key={i} color="#52cfd4">{line}</Text>
            ))}
            <Text italic={true} color={"#838690"}>scan ∙ select ∙ delete</Text>
        </Box>
    );
};

export default Banner;