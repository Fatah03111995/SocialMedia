import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const a = path.join(__dirname, 'public/assets');

console.log(__filename);
console.log(__dirname);
console.log(a);
