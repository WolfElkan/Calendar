app.service('$Color',function() {

	function hex(dec,places=NaN) {
		var result = ''
		var digits = '0123456789abcdef'
		var x = 0
		while (places * 0 == 0 ? places-- : dec >= 1) {
			dec = Math.floor(dec)
			result = digits[dec%16] + result
			dec /= 2**4
			x++
			if (x > 100) {
				return Infinity
			}
		}
		return result
	}

	function color(arg) {
		var b = arg % 2**8
		arg /= 2**8
		arg = Math.floor(arg)
		var g = arg % 2**8
		arg /= 2**8
		arg = Math.floor(arg)
		var r = arg % 2**8
		return `#${hex(r)}${hex(g)}${hex(b)}`
	}

	return color
	
})