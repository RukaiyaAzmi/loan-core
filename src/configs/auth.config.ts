import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const configPath = path.resolve(__dirname + '/../../authorization.yaml');
export const authConf: any = yaml.load(fs.readFileSync(configPath, 'utf-8'));

export function getCode(featureName: string): string | undefined {
    for(let f of authConf.features) {
        if(f.featureName === featureName)
            return f.featureCode;
    }
    return undefined;
}
