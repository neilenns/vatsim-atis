/* This config comes from https://microsoft.github.io/msfs-avionics-mirror/docs/getting-started/setting-up-your-environment */
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';

export default {
  input: 'MyInstrument.tsx',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [
    css({ output: 'MyInstrument.css' }), 
    resolve(), 
    typescript(),
    copy({
      targets: [
        { src: '*.html', dest: 'build'}
      ]
    })
  ]
}