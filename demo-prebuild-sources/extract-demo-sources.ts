import * as glob from 'glob';
import { ensureFileSync, writeFileSync } from 'fs-extra';
import { readFileSync } from 'fs';

/**
 * Extracts demo source files into 'demo/src/demos-sources.ts'
 */

const DIR = 'projects/demo/src/app';
const file = 'projects/demo/src/demos-sources.ts';

const sources = {};
const fileNames = glob.sync(`${DIR}/components/*/**/*.{ts,html}`, { ignore: ['**/*spec.ts', '**/*routes.ts', '**/*module.ts']});

fileNames.push(...glob.sync(`${DIR}/example/*.{ts,html}`, { ignore: ['**/*spec.ts', '**/*routes.ts', '**/*module.ts'] }));

for (const fileName of fileNames) {
	sources[fileName.replace(new RegExp(DIR + '(/example|/components)'), '').substring(1)] = readFileSync(fileName, 'utf-8');
}

ensureFileSync(file);
writeFileSync(
	file,
	`export default ${JSON.stringify(sources)
		.replace(/\u2028/g, '\\u2028')
		.replace(/\u2029/g, '\\u2029')};`,
);