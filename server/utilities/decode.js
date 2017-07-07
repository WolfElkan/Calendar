var control = ['[NUL]','[SOH]','[STX]','[ETX]','[EOT]','[ENQ]','[ACK]','[BEL]','[BS]','[TAB]','[LF]','[VT]','[FF]','[CR]','[SO]','[SI]','[DLE]','[DC1]','[DC2]','[DC3]','[DC4]','[NAK]','[SYN]','[ETB]','[CAN]','[EM]','[SUB]','[ESC]','[FS]','[GS]','[RS]','[US]']
var ascii = "                                 !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~"

function find(value,array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) {
			return i
		}
	}
}

function decode(url) {
	var result = ''
	for (var i = 0; i < url.length; i++) {
		if (url[i] == '%') {
			var hex1 = url[i+1]
			var hex2 = url[i+2]
			var hex = '0123456789abcdefABCDEF'
			hex1 = find(hex1,hex)
			hex2 = find(hex2,hex)
			hex1 = hex1 < 16 ? hex1 : hex1 - 6
			hex2 = hex2 < 16 ? hex2 : hex2 - 6
			var num = hex1 * 16 + hex2
			if (num < 32) {
				result += control[num]
			} else if (num < 127) {
				result += ascii[num]
			} else if (num == 127) {
				result += '[DEL]'
			}
			i += 2
		} else {
			result += url[i]
		}
	}
	return result
}

module.exports = decode