const sfc = require('vue/compiler-sfc');
console.log('Keys in compiler-sfc:', Object.keys(sfc));
console.log('parse function:', sfc.parse);

const code = '<template><div>Hello</div></template>';
// 尝试只传 source
const result1 = sfc.parse({ source: code, filename: 'test.vue' });
console.log('Result1 (obj arg) source:', result1 && result1.source);

const result2 = sfc.parse(code, { filename: 'test.vue' });
console.log('Result2 (str arg) source:', result2 && result2.source);
