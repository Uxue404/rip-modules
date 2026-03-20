import {Box, Text} from 'ink'
import figlet from "figlet";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const Banner = () => {
    const fontContent = readFileSync(
        path.join(__dirname, '..', "fonts", "Coder mini.flf"),
        "utf8"
    );
    // @ts-ignore
    figlet.loadFontSync("Coder mini", fontContent);

    const ascii = figlet.textSync("rip-modules", { font: "Coder mini" });
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