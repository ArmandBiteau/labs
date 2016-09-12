
// chunk(logdepthbuf_pars_fragment)

vec4 pack_depth( const in float depth ) {
        const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );
        const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );
        vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );
        res -= res.xxyz * bit_mask;
        return res;
}

void main() {

	// chunk(logdepthbuf_fragment)

    float alpha = gl_FragCoord.a;

    gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z * alpha);

}
