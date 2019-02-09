
export const vertexShader = `
    uniform float center;
	uniform float width;
    varying vec2 vUv;
    uniform sampler2D tDiffuse1;
	void main()	{
        gl_FragColor = texture2D( tDiffuse1, vUv );
		gl_FragColor = vec4( getValue(gl_FragColor.rgb), 1.0 );
	}

    float getValue (pixel) {
        float x = pixel.r;
        float yMax = 255;
        float yMin = 0;
        float xMin = center - 0.5 - (center - 1) / 2;
        float xMax = center - 0.5 + (width - 1) / 2;
        if (x <= xMin) {
            return yMin;
        } else if (x > xMax) {
            return yMax;
        } else {
            return ((x - (center - 0.5)) / (width - 1) + 0.5) * (yMax - yMin) + yMin;
        }
    }
    `;

export const fragmentShader = `
    uniform float time;
	uniform vec2 resolution;
	void main()	{
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}`;
