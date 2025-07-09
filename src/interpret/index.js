import parse from './parse.js';
import lex from './lex.js';

export default function interpret(input) {
  return parse(lex(input));
}
