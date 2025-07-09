import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parser from './syntax-parser.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const syntaxPath = path.join(__dirname, './syntax.yml');
const syntaxYml = fs.readFileSync(syntaxPath, { encoding: 'utf8' });
const syntax = yaml.safeLoad(syntaxYml);

export default function lex(chars) {
  return parser(syntax, 'Noop', chars);
}
