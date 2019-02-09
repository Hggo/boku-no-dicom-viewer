
export const fragmentShader = `
    uniform float center;
	uniform float width;
    varying vec2 vUv;
    uniform vec4 tDiffuse1;

    float getValue () {
        float x = gl_FragColor.rgb.r;
        float yMax = 255.0;
        float yMin = 0.0;
        float xMin = center - 0.5 - (center - 1.0) / 2.0;
        float xMax = center - 0.5 + (width - 1.0) / 2.0;
        if (x == 0.0) {
            return 0.0;
        }
        if (x <= xMin) {
            return yMin;
        } else if (x > xMax) {
            return yMax;
        } else {
            return (((x - (center - 0.5)) / (width - 1.0) + 0.5) * (yMax - yMin) + yMin);
        }
    }

    void main()	{
        gl_FragColor = texture2D( tDiffuse1, vUv );
		gl_FragColor = vec4(getValue(), getValue(), getValue(), 1.0 );
	}
    `;

export const vertexShader = `
    uniform float center;
	uniform float width;
    varying vec2 vUv;
    uniform sampler2D tDiffuse1;
	void main()	{
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
	}`;
