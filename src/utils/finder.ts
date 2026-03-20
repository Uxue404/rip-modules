import { readdirSync, statSync, readFileSync, existsSync } from "fs";
import { join, dirname, basename } from "path";
import type {ScanResult} from "../types";

function getFolderSize(dir: string): number {
    let size = 0;
    let items: string[] = [];

    try {
        items = readdirSync(dir);
    } catch {
        return size
    }

    for (const item of items) {
        const fullPath = join(dir, item);
        try {
            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
                size += getFolderSize(fullPath);
            } else {
                size += stat.size
            }
        } catch {
            continue
        }
    }

    return size;
}

export function findNodeModules (dir: string): ScanResult[] {
    const found: ScanResult[] = [];
    let items: string[] = [];

    try {
        items = readdirSync(dir);
    } catch {
        return found;
    }


    for(const item of items) {
        const fullPath = join(dir, item);

        if (item === "node_modules") {
            found.push({
                path: fullPath,
                size: getFolderSize(fullPath),
            });
        } else {
            try {
                const stat = statSync(fullPath);
                if (stat.isDirectory()) {
                    found.push(...findNodeModules(fullPath));
                }
            } catch {
                continue
            }
        }
    }
    return found;
}