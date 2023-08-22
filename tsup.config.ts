import { ExecaChildProcess, execa } from 'execa'
import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	splitting: false,
	clean: true,
	minify: true,
	treeshake: true,
	dts: true,
	metafile: true,
	shims: true,
	target: 'es2020',
	format: ['cjs', 'esm'],
	async onSuccess() {
		runScript()
	},
})

let childProcess: ExecaChildProcess

function runScript() {
	console.log('Start running...')
	if (childProcess) {
		childProcess.kill()
	}
	childProcess = execa('node', ['./dist/index.js'], { stdio: 'inherit' })
}
