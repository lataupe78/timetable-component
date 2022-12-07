import commonjs from '@rollup/plugin-commonjs';
import noderesolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';



// Error: Invalid value for option "output.dir" - you must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks.
const iife = {
  input: './src/js/Timetable.js',
  output: {
    // dir: 'dist-v3',
    format: 'iife',
    file: 'dist-v3/tabletime.iife.min.js',
    name: 'tabletime'
  },
  plugins: [
    commonjs(),
    noderesolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
};



const esm = {
  input: './src/js/Timetable.js',
  output: {
    // dir: 'dist-v3',
    format: 'es',
    file: 'dist-v3/tabletime.esm.min.js',
    name: 'tabletime'
  },
  plugins: [
    commonjs(),
    noderesolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
};

const conf = process?.env?.BABEL_ENV === 'esm' ? esm : iife;
export default conf;

/*

// import { defineConfig } from 'vite'
// import path from 'path'


// export default defineConfig({
export default {

  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src')
  //   },
  // },

  // input : './main.js',
  // input : '@/js/Timetable.js',
  input : './src/js/Timetable.js',
  
  output : {
    dir: 'dist-v2',
    format: 'es',
    format: 'iife',
    file: 'js/timetable.iife.min.js',
    name: 'Timetable',
    globals: {

    }
  },

  plugins: [
    commonjs(), // prise en charge de require
    noderesolve(), // prise en charge des modules depuis node_modules
    babel({ babelHelpers: 'bundled' }), // transpilation
    terser() // minification
]
}

*/