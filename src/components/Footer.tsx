import {Box, Text} from "ink";
import {Badge} from "@inkjs/ui";

const Footer = () => (
    <Box flexDirection='row'
         justifyContent='space-between'
         borderStyle="single"
         borderTop={true}
         borderBottom={false}
         borderLeft={false}
         borderRight={false}
         borderColor="#9CA3AF"
         minWidth={50}
         padding={1}
         gap={1}>
        <Box gap={1}>
            <Badge color={'#9CA3AF'}>↑ ↓</Badge>
            <Text color={'#9CA3AF'}>navigate</Text>
        </Box>
        <Box gap={1}>
            <Badge color={'#9CA3AF'}>space</Badge>
            <Text color={'#9CA3AF'}>select</Text>
        </Box>
        <Box gap={1}>
            <Badge color={'#9CA3AF'}>enter</Badge>
            <Text color={'#9CA3AF'}>delete</Text>
        </Box>
    </Box>
)

export default Footer;