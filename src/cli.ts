#!/usr/bin/env node

import { render } from 'ink'
import { createElement } from 'react'
import App from "./components/App.tsx";
import { Command} from "commander";

const program = new Command();
// process.on('exit', () => {
//     process.stdout.write('\x1Bc');
//     console.log('\n✨ Thanks for using rip-modules! Happy coding 🚀');
// });

program
    .name('rip-modules')
    .description('Delete all node_modules folders')
    .version('0.0.1')
    .argument('[dir]', 'Directory to scan')
    .action((dir?: string) => {
        const targetDir = dir || process.cwd();
        render(createElement(App, {dir: targetDir}));
    })

program.parse();
