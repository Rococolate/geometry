import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: './src/index.js',
    output: {
      file: './build/main.js',
      format: 'iife',
      name:'Gometry',
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      })
    ]
  },
];