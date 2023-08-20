import { build } from 'vite'
import chokidar from 'chokidar'
import { execa } from 'execa'

let timeout = null
let childProcess = null

buildAndRun()

chokidar
	.watch('./src', {
		ignoreInitial: true,
	})
	.on('all', (event, path) => {
		console.log('------------------------')
		console.log(`File ${path} has been ${event}`)
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			buildAndRun()
		}, 300)
	})

function buildAndRun() {
	console.log('Start building...')
	build().then(() => {
		console.log('Build done')
		console.log('Start running...')
		if (childProcess) {
			childProcess.kill()
		}
		childProcess = execa('node', ['./dist/main.js'], { stdio: 'inherit' })
	})
}
