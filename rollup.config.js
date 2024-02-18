import babelPlugin from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/genso.ts',
  output: {
    file: 'output.js',
    format: 'cjs',
    banner: `
//script.name=Genso import
//script.description=Import genso from WorldMachine

//script.param.extent.type=string
//script.param.extent.description=Extent that was generated
//script.param.extent.displayName=Extent
//script.param.extent.default=Main extent

//script.param.resolution.type=integer
//script.param.resolution.description=Resolution of generated images
//script.param.resolution.displayName=Resolution
//script.param.resolution.default=8192

//script.param.wmOutput.type=file
//script.param.wmOutput.description=Where WM generated it's outputs
//script.param.wmOutput.displayName=WM output directory
`,
    generatedCode: {
      arrowFunctions: false,
      constBindings: false,
      reservedNamesAsProps: false,
      preset: 'es5',
    },
  },
  plugins: [
    resolve({ extensions: ['.js', '.ts'] }),
    commonjs(),
    babelPlugin({
      extensions: ['.js', '.ts'],
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      exclude: ['node_modules/**'],
    }),
  ],
}
