import { rmSync} from 'fs'

export function deleteNodeModules(paths: string[]) {
    for(const path of paths) {
        try {
            rmSync(path, { recursive: true , force: true });
        } catch(e) {
            console.error(e);
        }
    }
}