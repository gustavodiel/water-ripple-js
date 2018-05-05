let curr = [];
let prev = [];

const SIZE_X = 200
const SIZE_Y = 200

const DAMPING = 0.9

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
}

function swapBuffers() {
	for ( var i = 0; i < SIZE_X; i++ ) {
		for ( var j = 0; j < SIZE_Y; j++ ) {
			let buffer = curr[ i ][ j ]
			curr[ i ][ j ] = prev[ i ][ j ]
			prev[ i ][ j ] = buffer
		}
	}
}

function draw() {
	background( 0 );
	loadPixels();
	for ( let i = 1; i < SIZE_X - 1; i++ ) {
		for ( let j = 1; j < SIZE_Y - 1; j++ ) {
			curr[ i ][ j ] = (
				prev[ i - 1 ][ j ] + prev[ i + 1 ][ j ] +
				prev[ i ][ j + 1 ] + prev[ i ][ j - 1 ] ) / 2 - curr[ i ][ j ];

			let index = i + j * SIZE_Y;
			pixels[ index ] = color( curr[ i ][ j ] )
		}
	}
	updatePixels();
	swapBuffers();
}