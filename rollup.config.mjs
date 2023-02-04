/* This config comes from https://microsoft.github.io/msfs-avionics-mirror/docs/getting-started/setting-up-your-environment
   It was modified to include copying the .html files to the output folder.
*/
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'MyInstrument.tsx',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [
    css({ output: 'MyInstrument.css' }), 
    resolve(), 
    commonjs(),
    typescript(),
    copy({
      targets: [
        { src: '*.html', dest: 'build'}
      ]
    })
  ],

  onwarn: function(/** @type {{ code: string; message: any; }} */ warning) {
    // Skip warnings caused by TypeScript's use of "this". Cannot find *any* good
    // information on why this happens. 
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  }
}