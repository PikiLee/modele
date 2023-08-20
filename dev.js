import { build } from 'vite'
import chokidar from 'chokidar'
import { execa } from 'execa'

buildAndRun()

chokidar
	.watch('./src', {
		ignoreInitial: true,
	})
	.on('all', (event, path) => {
		console.log(`File ${path} has been ${event}`)
		buildAndRun()
	})

function buildAndRun() {
	console.log('Start building...')
	build().then(() => {
		console.log('Build done')
		console.log('Start running...')
		execa('node', ['./dist/main.js'], { stdio: 'inherit' })
	})
}
