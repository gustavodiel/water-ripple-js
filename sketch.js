let curr = [];
let prev = [];

const SIZE_X = 600
const SIZE_Y = 600

const DAMPING = 0.95

let backgroundImg;
let waves;

function preload() {}

function setup() {
	createCanvas( SIZE_X, SIZE_Y );

	waves = createImage( SIZE_X, SIZE_Y )
	backgroundImg = loadImage( "assets/Water.jpg" );

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
	let temp = curr
	curr = prev
	prev = temp
}

function mouseClicked() {
	prev[ mouseX ][ mouseY ] = 5000
}

function mouseDragged() {
	prev[ mouseX ][ mouseY ] = 5000
}

function draw() {
	image( backgroundImg, 0, 0, width, height )
	waves.loadPixels();
	for ( let i = 1; i < SIZE_X - 1; i++ ) {
		for ( let j = 1; j < SIZE_Y - 1; j++ ) {
			curr[ i ][ j ] = ( prev[ i - 1 ][ j ] + prev[ i + 1 ][ j ] + prev[ i ][ j + 1 ] + prev[ i ][ j - 1 ] ) / 2 - curr[ i ][ j ];
			curr[ i ][ j ] = curr[ i ][ j ] * DAMPING
			waves.set( i, j, [ curr[ i ][ j ], curr[ i ][ j ], curr[ i ][ j ], 205 ] )
		}
	}
	prev[ floor( random( SIZE_X ) ) ][ floor( random( SIZE_Y ) ) ] = 10000
	waves.updatePixels();
	blend( waves, 0, 0, width, height, 0, 0, width, height, SOFT_LIGHT );
	// filter( BLUR, 3 );
	swapBuffers();
}