let curr = [];
let prev = [];

const SIZE_X = 800
const SIZE_Y = 800

const DAMPING = 0.95

function setup() {
	createCanvas( SIZE_X, SIZE_Y );
	for ( var i = 0; i < SIZE_X; i++ ) {
		curr[ i ] = []
		prev[ i ] = []
		for ( var j = 0; j < SIZE_Y; j++ ) {
			curr[ i ][ j ] = 0
			prev[ i ][ j ] = 0
		}
	}

	curr[ 100 ][ 100 ] = 255
}

function swapBuffers() {
	let temp = curr
	curr = prev
	prev = temp
}

function mouseClicked() {
	prev[ mouseX ][ mouseY ] = 255
}

function mouseDragged() {
	prev[ mouseX ][ mouseY ] = 255
}

function draw() {
	background( 0 );
	loadPixels();
	for ( let i = 1; i < SIZE_X - 1; i++ ) {
		for ( let j = 1; j < SIZE_Y - 1; j++ ) {
			curr[ i ][ j ] = ( prev[ i - 1 ][ j ] + prev[ i + 1 ][ j ] + prev[ i ][ j + 1 ] + prev[ i ][ j - 1 ] ) / 2 - curr[ i ][ j ];
			curr[ i ][ j ] = curr[ i ][ j ] * DAMPING

			var index = 4 * ( i + j * SIZE_Y );
			pixels[ index + 0 ] = curr[ i ][ j ]
			pixels[ index + 1 ] = curr[ i ][ j ]
			pixels[ index + 2 ] = curr[ i ][ j ]
			pixels[ index + 3 ] = 255
		}
	}
	updatePixels();
	swapBuffers();
}