const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const color_spaces = {
	DEVICE_RGB: 'DeviceRGB',
	DEVICE_GRAY: 'DeviceGray',
	DEVICE_CMYK: 'DeviceCMYK',
	CAL_GREY: 'CalGray',
	CAL_RGB: 'CalRGB',
	LAB: 'Lab',
	ICC_BASED: 'ICCBased',
	INDEXED: 'Indexed',
	PATTERN: 'Pattern',
	SEPARATION: 'Separation',
	DEVICE_N: 'DeviceN'
};
const DECODE = {
	DCT_DECODE: 'DCTDecode',
	FLATE_DECODE: 'FlateDecode',
	LZW_DECODE: 'LZWDecode',
	JPX_DECODE: 'JPXDecode',
	JBIG2_DECODE: 'JBIG2Decode',
	ASCII85_DECODE: 'ASCII85Decode',
	ASCII_HEX_DECODE: 'ASCIIHexDecode',
	RUN_LENGTH_DECODE: 'RunLengthDecode',
	CCITT_FAX_DECODE: 'CCITTFaxDecode'
};

// 默认的pfx证书base64数据
const defaultPfxCert = ''

const image_compression = {
	NONE: 'NONE',
	FAST: 'FAST',
	MEDIUM: 'MEDIUM',
	SLOW: 'SLOW'
}

var z_errmsg = ["need dictionary", // Z_NEED_DICT
	// 2
	"stream end", // Z_STREAM_END 1
	"", // Z_OK 0
	"", // Z_ERRNO (-1)
	"stream error", // Z_STREAM_ERROR (-2)
	"data error", // Z_DATA_ERROR (-3)
	"", // Z_MEM_ERROR (-4)
	"buffer error", // Z_BUF_ERROR (-5)
	"", // Z_VERSION_ERROR (-6)
	""]; // block not completed, need more input or more output

const MAX_BITS = 15;
const D_CODES = 30;
const BL_CODES = 19;
const LENGTH_CODES = 29;
const LITERALS = 256;
const L_CODES = LITERALS + 1 + LENGTH_CODES;
const HEAP_SIZE = 2 * L_CODES + 1;
const END_BLOCK = 256; // Bit length codes must not exceed MAX_BL_BITS bits

const MAX_BL_BITS = 7; // repeat previous bit length 3-6 times (2 bits of repeat count)

const REP_3_6 = 16; // repeat a zero length 3-10 times (3 bits of repeat count)

const REPZ_3_10 = 17; // repeat a zero length 11-138 times (7 bits of repeat count)

const REPZ_11_138 = 18; // The lengths of the bit length codes are sent in order of decreasing
// probability, to avoid transmitting the lengths for unused bit
// length codes.

const Buf_size = 8 * 2; // JZlib version : "1.0.2"

const NeedMore = 0; // block flush performed

const BlockDone = 1; // finish started, need only more output at next deflate

const FinishStarted = 2; // finish done, accept no more input or output

const FinishDone = 3; // preset dictionary flag in zlib header
const PRESET_DICT = 0x20;
const Z_DEFLATED = 8;
const MAX_MEM_LEVEL = 9;
const DEF_MEM_LEVEL = 8;
const INIT_STATE = 42;
const BUSY_STATE = 113;
const FINISH_STATE = 666; // The deflate compression method
const STORED_BLOCK = 0;
const STATIC_TREES = 1;
const DYN_TREES = 2;
const MIN_MATCH = 3;
const MAX_MATCH = 258;
const MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;

const MOD = 65521;
const Z_DEFAULT_COMPRESSION = -1; // compression strategy

const Z_FILTERED = 1;
const Z_HUFFMAN_ONLY = 2;
const Z_DEFAULT_STRATEGY = 0;
const Z_NO_FLUSH = 0;
const Z_PARTIAL_FLUSH = 1;
const Z_FULL_FLUSH = 3;
const Z_FINISH = 4;
const Z_OK = 0;
const Z_STREAM_END = 1;
const Z_NEED_DICT = 2;
const Z_STREAM_ERROR = -2;
const Z_DATA_ERROR = -3;
const Z_BUF_ERROR = -5; // Tree
const _dist_code = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29];

function Config(good_length, max_lazy, nice_length, max_chain, func) {
	var that = this;
	that.good_length = good_length;
	that.max_lazy = max_lazy;
	that.nice_length = nice_length;
	that.max_chain = max_chain;
	that.func = func;
}

var STORED = 0;
var FAST = 1;
var SLOW = 2;
var config_table = [new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST), new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW), new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW)];

function ASCII85Decode(a) {
	var c,
		d,
		e,
		f,
		g,
		h = String,
		l = "length",
		w = 255,
		x = "charCodeAt",
		y = "slice",
		z = "replace";

	for ("~>" === a[y](-2), a = a[y](0, -2)[z](/\s/g, "")[z]("z", "!!!!!"), c = "uuuuu"[y](a[l] % 5 || 5), a += c, e = [], f = 0, g = a[l]; g > f; f += 5) {
		d = 52200625 * (a[x](f) - 33) + 614125 * (a[x](f + 1) - 33) + 7225 * (a[x](f + 2) - 33) + 85 * (a[x](f + 3) - 33) + (a[x](f + 4) - 33), e.push(w & d >> 24, w & d >> 16, w & d >> 8, w & d);
	}

	return function (a, b) {
		for (var c = b; c > 0; c--) {
			a.pop();
		}
	}(e, c[l]), h.fromCharCode.apply(h, e);
};

function ASCIIHexDecode(value) {
	var regexCheckIfHex = new RegExp(/^([0-9A-Fa-f]{2})+$/);
	value = value.replace(/\s/g, '');

	if (value.indexOf(">") !== -1) {
		value = value.substr(0, value.indexOf(">"));
	}

	if (value.length % 2) {
		value += "0";
	}

	if (regexCheckIfHex.test(value) === false) {
		return "";
	}

	var result = '';
	var i;

	for (var i = 0; i < value.length; i += 2) {
		result += String.fromCharCode("0x" + (value[i] + value[i + 1]));
	}

	return result;
};


function adler32csFrom(checksum, binaryString) {
	var a = checksum & 0xFFFF,
		b = checksum >>> 16;

	for (var i = 0, length = binaryString.length; i < length; i++) {
		a = (a + (binaryString.charCodeAt(i) & 0xFF)) % MOD;
		b = (b + a) % MOD;
	}

	return (b << 16 | a) >>> 0;
}

function smaller(tree, n, m, depth) {
	var tn2 = tree[n * 2];
	var tm2 = tree[m * 2];
	return tn2 < tm2 || tn2 == tm2 && depth[n] <= depth[m];
}

function Tree() {
	var that = this; // dyn_tree; // the dynamic tree
	// max_code; // largest code with non zero frequency
	// stat_desc; // the corresponding static tree
	// Compute the optimal bit lengths for a tree and update the total bit
	// length
	// for the current block.
	// IN assertion: the fields freq and dad are set, heap[heap_max] and
	// above are the tree nodes sorted by increasing frequency.
	// OUT assertions: the field len is set to the optimal bit length, the
	// array bl_count contains the frequencies for each bit length.
	// The length opt_len is updated; static_len is also updated if stree is
	// not null.

	function gen_bitlen(s) {
		var tree = that.dyn_tree;
		var stree = that.stat_desc.static_tree;
		var extra = that.stat_desc.extra_bits;
		var base = that.stat_desc.extra_base;
		var max_length = that.stat_desc.max_length;
		var h; // heap index

		var n, m; // iterate over the tree elements

		var bits; // bit length

		var xbits; // extra bits

		var f; // frequency

		var overflow = 0; // number of elements with bit length too large

		for (bits = 0; bits <= MAX_BITS; bits++) {
			s.bl_count[bits] = 0;
		} // In a first pass, compute the optimal bit lengths (which may
		// overflow in the case of the bit length tree).


		tree[s.heap[s.heap_max] * 2 + 1] = 0; // root of the heap

		for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
			n = s.heap[h];
			bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;

			if (bits > max_length) {
				bits = max_length;
				overflow++;
			}

			tree[n * 2 + 1] = bits; // We overwrite tree[n*2+1] which is no longer needed

			if (n > that.max_code) continue; // not a leaf node

			s.bl_count[bits]++;
			xbits = 0;
			if (n >= base) xbits = extra[n - base];
			f = tree[n * 2];
			s.opt_len += f * (bits + xbits);
			if (stree) s.static_len += f * (stree[n * 2 + 1] + xbits);
		}

		if (overflow === 0) return; // This happens for example on obj2 and pic of the Calgary corpus
		// Find the first bit length which could increase:

		do {
			bits = max_length - 1;

			while (s.bl_count[bits] === 0) {
				bits--;
			}

			s.bl_count[bits]--; // move one leaf down the tree

			s.bl_count[bits + 1] += 2; // move one overflow item as its brother

			s.bl_count[max_length]--; // The brother of the overflow item also moves one step up,
			// but this does not affect bl_count[max_length]

			overflow -= 2;
		} while (overflow > 0);

		for (bits = max_length; bits !== 0; bits--) {
			n = s.bl_count[bits];

			while (n !== 0) {
				m = s.heap[--h];
				if (m > that.max_code) continue;

				if (tree[m * 2 + 1] != bits) {
					s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
					tree[m * 2 + 1] = bits;
				}

				n--;
			}
		}
	} // Reverse the first len bits of a code, using straightforward code (a
	// faster
	// method would use a table)
	// IN assertion: 1 <= len <= 15


	function bi_reverse(code, // the value to invert
						len // its bit length
	) {
		var res = 0;

		do {
			res |= code & 1;
			code >>>= 1;
			res <<= 1;
		} while (--len > 0);

		return res >>> 1;
	} // Generate the codes for a given tree and bit counts (which need not be
	// optimal).
	// IN assertion: the array bl_count contains the bit length statistics for
	// the given tree and the field len is set for all tree elements.
	// OUT assertion: the field code is set for all tree elements of non
	// zero code length.


	function gen_codes(tree, // the tree to decorate
					   max_code, // largest code with non zero frequency
					   bl_count // number of codes at each bit length
	) {
		var next_code = []; // next code value for each
		// bit length

		var code = 0; // running code value

		var bits; // bit index

		var n; // code index

		var len; // The distribution counts are first used to generate the code values
		// without bit reversal.

		for (bits = 1; bits <= MAX_BITS; bits++) {
			next_code[bits] = code = code + bl_count[bits - 1] << 1;
		} // Check that the bit counts in bl_count are consistent. The last code
		// must be all ones.
		// Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
		// "inconsistent bit counts");
		// Tracev((stderr,"\ngen_codes: max_code %d ", max_code));


		for (n = 0; n <= max_code; n++) {
			len = tree[n * 2 + 1];
			if (len === 0) continue; // Now reverse the bits

			tree[n * 2] = bi_reverse(next_code[len]++, len);
		}
	} // Construct one Huffman tree and assigns the code bit strings and lengths.
	// Update the total bit length for the current block.
	// IN assertion: the field freq is set for all tree elements.
	// OUT assertions: the fields len and code are set to the optimal bit length
	// and corresponding code. The length opt_len is updated; static_len is
	// also updated if stree is not null. The field max_code is set.


	that.build_tree = function (s) {
		var tree = that.dyn_tree;
		var stree = that.stat_desc.static_tree;
		var elems = that.stat_desc.elems;
		var n, m; // iterate over heap elements

		var max_code = -1; // largest code with non zero frequency

		var node; // new node being created
		// Construct the initial heap, with least frequent element in
		// heap[1]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
		// heap[0] is not used.

		s.heap_len = 0;
		s.heap_max = HEAP_SIZE;

		for (n = 0; n < elems; n++) {
			if (tree[n * 2] !== 0) {
				s.heap[++s.heap_len] = max_code = n;
				s.depth[n] = 0;
			} else {
				tree[n * 2 + 1] = 0;
			}
		} // The pkzip format requires that at least one distance code exists,
		// and that at least one bit should be sent even if there is only one
		// possible code. So to avoid special checks later on we force at least
		// two codes of non zero frequency.


		while (s.heap_len < 2) {
			node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
			tree[node * 2] = 1;
			s.depth[node] = 0;
			s.opt_len--;
			if (stree) s.static_len -= stree[node * 2 + 1]; // node is 0 or 1 so it does not have extra bits
		}

		that.max_code = max_code; // The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
		// establish sub-heaps of increasing lengths:

		for (n = Math.floor(s.heap_len / 2); n >= 1; n--) {
			s.pqdownheap(tree, n);
		} // Construct the Huffman tree by repeatedly combining the least two
		// frequent nodes.


		node = elems; // next internal node of the tree

		do {
			// n = node of least frequency
			n = s.heap[1];
			s.heap[1] = s.heap[s.heap_len--];
			s.pqdownheap(tree, 1);
			m = s.heap[1]; // m = node of next least frequency

			s.heap[--s.heap_max] = n; // keep the nodes sorted by frequency

			s.heap[--s.heap_max] = m; // Create a new node father of n and m

			tree[node * 2] = tree[n * 2] + tree[m * 2];
			s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
			tree[n * 2 + 1] = tree[m * 2 + 1] = node; // and insert the new node in the heap

			s.heap[1] = node++;
			s.pqdownheap(tree, 1);
		} while (s.heap_len >= 2);

		s.heap[--s.heap_max] = s.heap[1]; // At this point, the fields freq and dad are set. We can now
		// generate the bit lengths.

		gen_bitlen(s); // The field len is now set, we can generate the bit codes

		gen_codes(tree, that.max_code, s.bl_count);
	};
}

Tree._length_code = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28];
Tree.base_length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
Tree.base_dist = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576]; // Mapping from a distance to a distance code. dist is the distance - 1 and
// must not have side effects. _dist_code[256] and _dist_code[257] are never
// used.

Tree.d_code = function (dist) {
	return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}; // extra bits for each length code


Tree.extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]; // extra bits for each distance code

Tree.extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]; // extra bits for each bit length code

Tree.extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
Tree.bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]; // StaticTree


function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
	var that = this;
	that.static_tree = static_tree;
	that.extra_bits = extra_bits;
	that.extra_base = extra_base;
	that.elems = elems;
	that.max_length = max_length;
}

StaticTree.static_ltree = [12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8];
StaticTree.static_dtree = [0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5];
StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);
StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS); // Deflate


function Deflate() {
	var that = this;
	var strm; // pointer back to this zlib stream

	var status; // as the name implies
	// pending_buf; // output still pending

	var pending_buf_size; // size of pending_buf

	var last_flush; // value of flush param for previous deflate call

	var w_size; // LZ77 window size (32K by default)

	var w_bits; // log2(w_size) (8..16)

	var w_mask; // w_size - 1

	var window; // Sliding window. Input bytes are read into the second half of the window,
	// and move to the first half later to keep a dictionary of at least wSize
	// bytes. With this organization, matches are limited to a distance of
	// wSize-MAX_MATCH bytes, but this ensures that IO is always
	// performed with a length multiple of the block size. Also, it limits
	// the window size to 64K, which is quite useful on MSDOS.
	// To do: use the user input buffer as sliding window.

	var window_size; // Actual size of window: 2*wSize, except when the user input buffer
	// is directly used as sliding window.

	var prev; // Link to older string with same hash index. To limit the size of this
	// array to 64K, this link is maintained only for the last 32K strings.
	// An index in this array is thus a window index modulo 32K.

	var head; // Heads of the hash chains or NIL.

	var ins_h; // hash index of string to be inserted

	var hash_size; // number of elements in hash table

	var hash_bits; // log2(hash_size)

	var hash_mask; // hash_size-1
	// Number of bits by which ins_h must be shifted at each input
	// step. It must be such that after MIN_MATCH steps, the oldest
	// byte no longer takes part in the hash key, that is:
	// hash_shift * MIN_MATCH >= hash_bits

	var hash_shift; // Window position at the beginning of the current output block. Gets
	// negative when the window is moved backwards.

	var block_start;
	var match_length; // length of best match

	var prev_match; // previous match

	var match_available; // set if previous match exists

	var strstart; // start of string to insert

	var match_start; // start of matching string

	var lookahead; // number of valid bytes ahead in window
	// Length of the best match at previous step. Matches not greater than this
	// are discarded. This is used in the lazy match evaluation.

	var prev_length; // To speed up deflation, hash chains are never searched beyond this
	// length. A higher limit improves compression ratio but degrades the speed.

	var max_chain_length; // Attempt to find a better match only when the current match is strictly
	// smaller than this value. This mechanism is used only for compression
	// levels >= 4.

	var max_lazy_match; // Insert new strings in the hash table only if the match length is not
	// greater than this length. This saves time but degrades compression.
	// max_insert_length is used only for compression levels <= 3.

	var level; // compression level (1..9)

	var strategy; // favor or force Huffman coding
	// Use a faster search when the previous match is longer than this

	var good_match; // Stop searching when current match exceeds this

	var nice_match;
	var dyn_ltree; // literal and length tree

	var dyn_dtree; // distance tree

	var bl_tree; // Huffman tree for bit lengths

	var l_desc = new Tree(); // desc for literal tree

	var d_desc = new Tree(); // desc for distance tree

	var bl_desc = new Tree(); // desc for bit length tree
	// that.heap_len; // number of elements in the heap
	// that.heap_max; // element of largest frequency
	// The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	// The same heap array is used to build all trees.
	// Depth of each subtree used as tie breaker for trees of equal frequency

	that.depth = [];
	var l_buf; // index for literals or lengths */
	// Size of match buffer for literals/lengths. There are 4 reasons for
	// limiting lit_bufsize to 64K:
	// - frequencies can be kept in 16 bit counters
	// - if compression is not successful for the first block, all input
	// data is still in the window so we can still emit a stored block even
	// when input comes from standard input. (This can also be done for
	// all blocks if lit_bufsize is not greater than 32K.)
	// - if compression is not successful for a file smaller than 64K, we can
	// even emit a stored file instead of a stored block (saving 5 bytes).
	// This is applicable only for zip (not gzip or zlib).
	// - creating new Huffman trees less frequently may not provide fast
	// adaptation to changes in the input data statistics. (Take for
	// example a binary file with poorly compressible code followed by
	// a highly compressible string table.) Smaller buffer sizes give
	// fast adaptation but have of course the overhead of transmitting
	// trees more frequently.
	// - I can't count above 4

	var lit_bufsize;
	var last_lit; // running index in l_buf
	// Buffer for distances. To simplify the code, d_buf and l_buf have
	// the same number of elements. To use different lengths, an extra flag
	// array would be necessary.

	var d_buf; // index of pendig_buf
	// that.opt_len; // bit length of current block with optimal trees
	// that.static_len; // bit length of current block with static trees

	var matches; // number of string matches in current block

	var last_eob_len; // bit length of EOB code for last block
	// Output buffer. bits are inserted starting at the bottom (least
	// significant bits).

	var bi_buf; // Number of valid bits in bi_buf. All bits above the last valid bit
	// are always zero.

	var bi_valid; // number of codes at each bit length for an optimal tree

	that.bl_count = []; // heap used to build the Huffman trees

	that.heap = [];
	dyn_ltree = [];
	dyn_dtree = [];
	bl_tree = [];

	function lm_init() {
		var i;
		window_size = 2 * w_size;
		head[hash_size - 1] = 0;

		for (i = 0; i < hash_size - 1; i++) {
			head[i] = 0;
		} // Set the default configuration parameters:


		max_lazy_match = config_table[level].max_lazy;
		good_match = config_table[level].good_length;
		nice_match = config_table[level].nice_length;
		max_chain_length = config_table[level].max_chain;
		strstart = 0;
		block_start = 0;
		lookahead = 0;
		match_length = prev_length = MIN_MATCH - 1;
		match_available = 0;
		ins_h = 0;
	}

	function init_block() {
		var i; // Initialize the trees.

		for (i = 0; i < L_CODES; i++) {
			dyn_ltree[i * 2] = 0;
		}

		for (i = 0; i < D_CODES; i++) {
			dyn_dtree[i * 2] = 0;
		}

		for (i = 0; i < BL_CODES; i++) {
			bl_tree[i * 2] = 0;
		}

		dyn_ltree[END_BLOCK * 2] = 1;
		that.opt_len = that.static_len = 0;
		last_lit = matches = 0;
	} // Initialize the tree data structures for a new zlib stream.


	function tr_init() {
		l_desc.dyn_tree = dyn_ltree;
		l_desc.stat_desc = StaticTree.static_l_desc;
		d_desc.dyn_tree = dyn_dtree;
		d_desc.stat_desc = StaticTree.static_d_desc;
		bl_desc.dyn_tree = bl_tree;
		bl_desc.stat_desc = StaticTree.static_bl_desc;
		bi_buf = 0;
		bi_valid = 0;
		last_eob_len = 8; // enough lookahead for inflate
		// Initialize the first block of the first file:

		init_block();
	} // Restore the heap property by moving down the tree starting at node k,
	// exchanging a node with the smallest of its two sons if necessary,
	// stopping
	// when the heap property is re-established (each father smaller than its
	// two sons).


	that.pqdownheap = function (tree, // the tree to restore
								k // node to move down
	) {
		var heap = that.heap;
		var v = heap[k];
		var j = k << 1; // left son of k

		while (j <= that.heap_len) {
			// Set j to the smallest of the two sons:
			if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
				j++;
			} // Exit if v is smaller than both sons


			if (smaller(tree, v, heap[j], that.depth)) break; // Exchange v with the smallest son

			heap[k] = heap[j];
			k = j; // And continue down the tree, setting j to the left son of k

			j <<= 1;
		}

		heap[k] = v;
	}; // Scan a literal or distance tree to determine the frequencies of the codes
	// in the bit length tree.


	function scan_tree(tree, // the tree to be scanned
					   max_code // and its largest code of non zero frequency
	) {
		var n; // iterates over all tree elements

		var prevlen = -1; // last emitted length

		var curlen; // length of current code

		var nextlen = tree[0 * 2 + 1]; // length of next code

		var count = 0; // repeat count of the current code

		var max_count = 7; // max repeat count

		var min_count = 4; // min repeat count

		if (nextlen === 0) {
			max_count = 138;
			min_count = 3;
		}

		tree[(max_code + 1) * 2 + 1] = 0xffff; // guard

		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[(n + 1) * 2 + 1];

			if (++count < max_count && curlen == nextlen) {
				continue;
			} else if (count < min_count) {
				bl_tree[curlen * 2] += count;
			} else if (curlen !== 0) {
				if (curlen != prevlen) bl_tree[curlen * 2]++;
				bl_tree[REP_3_6 * 2]++;
			} else if (count <= 10) {
				bl_tree[REPZ_3_10 * 2]++;
			} else {
				bl_tree[REPZ_11_138 * 2]++;
			}

			count = 0;
			prevlen = curlen;

			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			} else if (curlen == nextlen) {
				max_count = 6;
				min_count = 3;
			} else {
				max_count = 7;
				min_count = 4;
			}
		}
	} // Construct the Huffman tree for the bit lengths and return the index in
	// bl_order of the last bit length code to send.


	function build_bl_tree() {
		var max_blindex; // index of last bit length code of non zero freq
		// Determine the bit length frequencies for literal and distance trees

		scan_tree(dyn_ltree, l_desc.max_code);
		scan_tree(dyn_dtree, d_desc.max_code); // Build the bit length tree:

		bl_desc.build_tree(that); // opt_len now includes the length of the tree representations, except
		// the lengths of the bit lengths codes and the 5+5+4 bits for the
		// counts.
		// Determine the number of bit length codes to send. The pkzip format
		// requires that at least 4 bit length codes be sent. (appnote.txt says
		// 3 but the actual value used is 4.)

		for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
			if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0) break;
		} // Update opt_len to include the bit length tree and counts


		that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
		return max_blindex;
	} // Output a byte on the stream.
	// IN assertion: there is enough room in pending_buf.


	function put_byte(p) {
		that.pending_buf[that.pending++] = p;
	}

	function put_short(w) {
		put_byte(w & 0xff);
		put_byte(w >>> 8 & 0xff);
	}

	function putShortMSB(b) {
		put_byte(b >> 8 & 0xff);
		put_byte(b & 0xff & 0xff);
	}

	function send_bits(value, length) {
		var val,
			len = length;

		if (bi_valid > Buf_size - len) {
			val = value; // bi_buf |= (val << bi_valid);

			bi_buf |= val << bi_valid & 0xffff;
			put_short(bi_buf);
			bi_buf = val >>> Buf_size - bi_valid;
			bi_valid += len - Buf_size;
		} else {
			// bi_buf |= (value) << bi_valid;
			bi_buf |= value << bi_valid & 0xffff;
			bi_valid += len;
		}
	}

	function send_code(c, tree) {
		var c2 = c * 2;
		send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
	} // Send a literal or distance tree in compressed form, using the codes in
	// bl_tree.


	function send_tree(tree, // the tree to be sent
					   max_code // and its largest code of non zero frequency
	) {
		var n; // iterates over all tree elements

		var prevlen = -1; // last emitted length

		var curlen; // length of current code

		var nextlen = tree[0 * 2 + 1]; // length of next code

		var count = 0; // repeat count of the current code

		var max_count = 7; // max repeat count

		var min_count = 4; // min repeat count

		if (nextlen === 0) {
			max_count = 138;
			min_count = 3;
		}

		for (n = 0; n <= max_code; n++) {
			curlen = nextlen;
			nextlen = tree[(n + 1) * 2 + 1];

			if (++count < max_count && curlen == nextlen) {
				continue;
			} else if (count < min_count) {
				do {
					send_code(curlen, bl_tree);
				} while (--count !== 0);
			} else if (curlen !== 0) {
				if (curlen != prevlen) {
					send_code(curlen, bl_tree);
					count--;
				}

				send_code(REP_3_6, bl_tree);
				send_bits(count - 3, 2);
			} else if (count <= 10) {
				send_code(REPZ_3_10, bl_tree);
				send_bits(count - 3, 3);
			} else {
				send_code(REPZ_11_138, bl_tree);
				send_bits(count - 11, 7);
			}

			count = 0;
			prevlen = curlen;

			if (nextlen === 0) {
				max_count = 138;
				min_count = 3;
			} else if (curlen == nextlen) {
				max_count = 6;
				min_count = 3;
			} else {
				max_count = 7;
				min_count = 4;
			}
		}
	} // Send the header for a block using dynamic Huffman trees: the counts, the
	// lengths of the bit length codes, the literal tree and the distance tree.
	// IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.


	function send_all_trees(lcodes, dcodes, blcodes) {
		var rank; // index in bl_order

		send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt

		send_bits(dcodes - 1, 5);
		send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt

		for (rank = 0; rank < blcodes; rank++) {
			send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
		}

		send_tree(dyn_ltree, lcodes - 1); // literal tree

		send_tree(dyn_dtree, dcodes - 1); // distance tree
	} // Flush the bit buffer, keeping at most 7 bits in it.


	function bi_flush() {
		if (bi_valid == 16) {
			put_short(bi_buf);
			bi_buf = 0;
			bi_valid = 0;
		} else if (bi_valid >= 8) {
			put_byte(bi_buf & 0xff);
			bi_buf >>>= 8;
			bi_valid -= 8;
		}
	} // Send one empty static block to give enough lookahead for inflate.
	// This takes 10 bits, of which 7 may remain in the bit buffer.
	// The current inflate code requires 9 bits of lookahead. If the
	// last two codes for the previous block (real code plus EOB) were coded
	// on 5 bits or less, inflate may have only 5+3 bits of lookahead to decode
	// the last real code. In this case we send two empty static blocks instead
	// of one. (There are no problems if the previous block is stored or fixed.)
	// To simplify the code, we assume the worst case of last real code encoded
	// on one bit only.


	function _tr_align() {
		send_bits(STATIC_TREES << 1, 3);
		send_code(END_BLOCK, StaticTree.static_ltree);
		bi_flush(); // Of the 10 bits for the empty block, we have already sent
		// (10 - bi_valid) bits. The lookahead for the last real code (before
		// the EOB of the previous block) was thus at least one plus the length
		// of the EOB plus what we have just sent of the empty static block.

		if (1 + last_eob_len + 10 - bi_valid < 9) {
			send_bits(STATIC_TREES << 1, 3);
			send_code(END_BLOCK, StaticTree.static_ltree);
			bi_flush();
		}

		last_eob_len = 7;
	} // Save the match info and tally the frequency counts. Return true if
	// the current block must be flushed.


	function _tr_tally(dist, // distance of matched string
					   lc // match length-MIN_MATCH or unmatched char (if dist==0)
	) {
		var out_length, in_length, dcode;
		that.pending_buf[d_buf + last_lit * 2] = dist >>> 8 & 0xff;
		that.pending_buf[d_buf + last_lit * 2 + 1] = dist & 0xff;
		that.pending_buf[l_buf + last_lit] = lc & 0xff;
		last_lit++;

		if (dist === 0) {
			// lc is the unmatched char
			dyn_ltree[lc * 2]++;
		} else {
			matches++; // Here, lc is the match length - MIN_MATCH

			dist--; // dist = match distance - 1

			dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
			dyn_dtree[Tree.d_code(dist) * 2]++;
		}

		if ((last_lit & 0x1fff) === 0 && level > 2) {
			// Compute an upper bound for the compressed length
			out_length = last_lit * 8;
			in_length = strstart - block_start;

			for (dcode = 0; dcode < D_CODES; dcode++) {
				out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
			}

			out_length >>>= 3;
			if (matches < Math.floor(last_lit / 2) && out_length < Math.floor(in_length / 2)) return true;
		}

		return last_lit == lit_bufsize - 1; // We avoid equality with lit_bufsize because of wraparound at 64K
		// on 16 bit machines and because stored blocks are restricted to
		// 64K-1 bytes.
	} // Send the block data compressed using the given Huffman trees


	function compress_block(ltree, dtree) {
		var dist; // distance of matched string

		var lc; // match length or unmatched char (if dist === 0)

		var lx = 0; // running index in l_buf

		var code; // the code to send

		var extra; // number of extra bits to send

		if (last_lit !== 0) {
			do {
				dist = that.pending_buf[d_buf + lx * 2] << 8 & 0xff00 | that.pending_buf[d_buf + lx * 2 + 1] & 0xff;
				lc = that.pending_buf[l_buf + lx] & 0xff;
				lx++;

				if (dist === 0) {
					send_code(lc, ltree); // send a literal byte
				} else {
					// Here, lc is the match length - MIN_MATCH
					code = Tree._length_code[lc];
					send_code(code + LITERALS + 1, ltree); // send the length
					// code

					extra = Tree.extra_lbits[code];

					if (extra !== 0) {
						lc -= Tree.base_length[code];
						send_bits(lc, extra); // send the extra length bits
					}

					dist--; // dist is now the match distance - 1

					code = Tree.d_code(dist);
					send_code(code, dtree); // send the distance code

					extra = Tree.extra_dbits[code];

					if (extra !== 0) {
						dist -= Tree.base_dist[code];
						send_bits(dist, extra); // send the extra distance bits
					}
				} // literal or match pair ?
				// Check that the overlay between pending_buf and d_buf+l_buf is
				// ok:

			} while (lx < last_lit);
		}

		send_code(END_BLOCK, ltree);
		last_eob_len = ltree[END_BLOCK * 2 + 1];
	} // Flush the bit buffer and align the output on a byte boundary


	function bi_windup() {
		if (bi_valid > 8) {
			put_short(bi_buf);
		} else if (bi_valid > 0) {
			put_byte(bi_buf & 0xff);
		}

		bi_buf = 0;
		bi_valid = 0;
	} // Copy a stored block, storing first the length and its
	// one's complement if requested.


	function copy_block(buf, // the input data
						len, // its length
						header // true if block header must be written
	) {
		bi_windup(); // align on byte boundary

		last_eob_len = 8; // enough lookahead for inflate

		if (header) {
			put_short(len);
			put_short(~len);
		}

		that.pending_buf.set(window.subarray(buf, buf + len), that.pending);
		that.pending += len;
	} // Send a stored block


	function _tr_stored_block(buf, // input block
							  stored_len, // length of input block
							  eof // true if this is the last block for a file
	) {
		send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3); // send block type

		copy_block(buf, stored_len, true); // with header
	} // Determine the best encoding for the current block: dynamic trees, static
	// trees or store, and output the encoded block to the zip file.


	function _tr_flush_block(buf, // input block, or NULL if too old
							 stored_len, // length of input block
							 eof // true if this is the last block for a file
	) {
		var opt_lenb, static_lenb; // opt_len and static_len in bytes

		var max_blindex = 0; // index of last bit length code of non zero freq
		// Build the Huffman trees unless a stored block is forced

		if (level > 0) {
			// Construct the literal and distance trees
			l_desc.build_tree(that);
			d_desc.build_tree(that); // At this point, opt_len and static_len are the total bit lengths
			// of
			// the compressed block data, excluding the tree representations.
			// Build the bit length tree for the above two trees, and get the
			// index
			// in bl_order of the last bit length code to send.

			max_blindex = build_bl_tree(); // Determine the best encoding. Compute first the block length in
			// bytes

			opt_lenb = that.opt_len + 3 + 7 >>> 3;
			static_lenb = that.static_len + 3 + 7 >>> 3;
			if (static_lenb <= opt_lenb) opt_lenb = static_lenb;
		} else {
			opt_lenb = static_lenb = stored_len + 5; // force a stored block
		}

		if (stored_len + 4 <= opt_lenb && buf != -1) {
			// 4: two words for the lengths
			// The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
			// Otherwise we can't have processed more than WSIZE input bytes
			// since
			// the last block flush, because compression would have been
			// successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
			// transform a block into a stored block.
			_tr_stored_block(buf, stored_len, eof);
		} else if (static_lenb == opt_lenb) {
			send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
			compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
		} else {
			send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
			send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
			compress_block(dyn_ltree, dyn_dtree);
		} // The above check is made mod 2^32, for files larger than 512 MB
		// and uLong implemented on 32 bits.


		init_block();

		if (eof) {
			bi_windup();
		}
	}

	function flush_block_only(eof) {
		_tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);

		block_start = strstart;
		strm.flush_pending();
	} // Fill the window when the lookahead becomes insufficient.
	// Updates strstart and lookahead.
	//
	// IN assertion: lookahead < MIN_LOOKAHEAD
	// OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	// At least one byte has been read, or avail_in === 0; reads are
	// performed for at least two bytes (required for the zip translate_eol
	// option -- not supported here).


	function fill_window() {
		var n, m;
		var p;
		var more; // Amount of free space at the end of the window.

		do {
			more = window_size - lookahead - strstart; // Deal with !@#$% 64K limit:

			if (more === 0 && strstart === 0 && lookahead === 0) {
				more = w_size;
			} else if (more == -1) {
				// Very unlikely, but possible on 16 bit machine if strstart ==
				// 0
				// and lookahead == 1 (input done one byte at time)
				more--; // If the window is almost full and there is insufficient
				// lookahead,
				// move the upper half to the lower one to make room in the
				// upper half.
			} else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
				window.set(window.subarray(w_size, w_size + w_size), 0);
				match_start -= w_size;
				strstart -= w_size; // we now have strstart >= MAX_DIST

				block_start -= w_size; // Slide the hash table (could be avoided with 32 bit values
				// at the expense of memory usage). We slide even when level ==
				// 0
				// to keep the hash table consistent if we switch back to level
				// > 0
				// later. (Using level 0 permanently is not an optimal usage of
				// zlib, so we don't care about this pathological case.)

				n = hash_size;
				p = n;

				do {
					m = head[--p] & 0xffff;
					head[p] = m >= w_size ? m - w_size : 0;
				} while (--n !== 0);

				n = w_size;
				p = n;

				do {
					m = prev[--p] & 0xffff;
					prev[p] = m >= w_size ? m - w_size : 0; // If n is not on any hash chain, prev[n] is garbage but
					// its value will never be used.
				} while (--n !== 0);

				more += w_size;
			}

			if (strm.avail_in === 0) return; // If there was no sliding:
			// strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
			// more == window_size - lookahead - strstart
			// => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
			// => more >= window_size - 2*WSIZE + 2
			// In the BIG_MEM or MMAP case (not yet supported),
			// window_size == input_size + MIN_LOOKAHEAD &&
			// strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
			// Otherwise, window_size == 2*WSIZE so more >= 2.
			// If there was sliding, more >= WSIZE. So in all cases, more >= 2.

			n = strm.read_buf(window, strstart + lookahead, more);
			lookahead += n; // Initialize the hash value now that we have some input:

			if (lookahead >= MIN_MATCH) {
				ins_h = window[strstart] & 0xff;
				ins_h = (ins_h << hash_shift ^ window[strstart + 1] & 0xff) & hash_mask;
			} // If the whole input has less than MIN_MATCH bytes, ins_h is
			// garbage,
			// but this is not important since only literal bytes will be
			// emitted.

		} while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
	} // Copy without compression as much as possible from the input stream,
	// return
	// the current block state.
	// This function does not insert new strings in the dictionary since
	// uncompressible data is probably not useful. This function is used
	// only for the level=0 compression option.
	// NOTE: this function should be optimized to avoid extra copying from
	// window to pending_buf.


	function deflate_stored(flush) {
		// Stored blocks are limited to 0xffff bytes, pending_buf is limited
		// to pending_buf_size, and each stored block has a 5 byte header:
		var max_block_size = 0xffff;
		var max_start;

		if (max_block_size > pending_buf_size - 5) {
			max_block_size = pending_buf_size - 5;
		} // Copy as much as possible from input to output:


		while (true) {
			// Fill the window as much as possible:
			if (lookahead <= 1) {
				fill_window();
				if (lookahead === 0 && flush == Z_NO_FLUSH) return NeedMore;
				if (lookahead === 0) break; // flush the current block
			}

			strstart += lookahead;
			lookahead = 0; // Emit a stored block if pending_buf will be full:

			max_start = block_start + max_block_size;

			if (strstart === 0 || strstart >= max_start) {
				// strstart === 0 is possible when wraparound on 16-bit machine
				lookahead = strstart - max_start;
				strstart = max_start;
				flush_block_only(false);
				if (strm.avail_out === 0) return NeedMore;
			} // Flush if we may have to slide, otherwise block_start may become
			// negative and the data will be gone:


			if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
				flush_block_only(false);
				if (strm.avail_out === 0) return NeedMore;
			}
		}

		flush_block_only(flush == Z_FINISH);
		if (strm.avail_out === 0) return flush == Z_FINISH ? FinishStarted : NeedMore;
		return flush == Z_FINISH ? FinishDone : BlockDone;
	}

	function longest_match(cur_match) {
		var chain_length = max_chain_length; // max hash chain length

		var scan = strstart; // current string

		var match; // matched string

		var len; // length of current match

		var best_len = prev_length; // best match length so far

		var limit = strstart > w_size - MIN_LOOKAHEAD ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
		var _nice_match = nice_match; // Stop when cur_match becomes <= limit. To simplify the code,
		// we prevent matches with the string of window index 0.

		var wmask = w_mask;
		var strend = strstart + MAX_MATCH;
		var scan_end1 = window[scan + best_len - 1];
		var scan_end = window[scan + best_len]; // The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of
		// 16.
		// It is easy to get rid of this optimization if necessary.
		// Do not waste too much time if we already have a good match:

		if (prev_length >= good_match) {
			chain_length >>= 2;
		} // Do not look for matches beyond the end of the input. This is
		// necessary
		// to make deflate deterministic.


		if (_nice_match > lookahead) _nice_match = lookahead;

		do {
			match = cur_match; // Skip to next match if the match length cannot increase
			// or if the match length is less than 2:

			if (window[match + best_len] != scan_end || window[match + best_len - 1] != scan_end1 || window[match] != window[scan] || window[++match] != window[scan + 1]) continue; // The check at best_len-1 can be removed because it will be made
			// again later. (This heuristic is not always a win.)
			// It is not necessary to compare scan[2] and match[2] since they
			// are always equal when the other bytes match, given that
			// the hash keys are equal and that HASH_BITS >= 8.

			scan += 2;
			match++; // We check for insufficient lookahead only every 8th comparison;
			// the 256th check will be made at strstart+258.

			do {
			} while (window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match] && scan < strend);

			len = MAX_MATCH - (strend - scan);
			scan = strend - MAX_MATCH;

			if (len > best_len) {
				match_start = cur_match;
				best_len = len;
				if (len >= _nice_match) break;
				scan_end1 = window[scan + best_len - 1];
				scan_end = window[scan + best_len];
			}
		} while ((cur_match = prev[cur_match & wmask] & 0xffff) > limit && --chain_length !== 0);

		if (best_len <= lookahead) return best_len;
		return lookahead;
	} // Compress as much as possible from the input stream, return the current
	// block state.
	// This function does not perform lazy evaluation of matches and inserts
	// new strings in the dictionary only for unmatched strings or for short
	// matches. It is used only for the fast compression options.


	function deflate_fast(flush) {
		// short hash_head = 0; // head of the hash chain
		var hash_head = 0; // head of the hash chain

		var bflush; // set if current block must be flushed

		while (true) {
			// Make sure that we always have enough lookahead, except
			// at the end of the input file. We need MAX_MATCH bytes
			// for the next match, plus MIN_MATCH bytes to insert the
			// string following the next match.
			if (lookahead < MIN_LOOKAHEAD) {
				fill_window();

				if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
					return NeedMore;
				}

				if (lookahead === 0) break; // flush the current block
			} // Insert the string window[strstart .. strstart+2] in the
			// dictionary, and set hash_head to the head of the hash chain:


			if (lookahead >= MIN_MATCH) {
				ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

				hash_head = head[ins_h] & 0xffff;
				prev[strstart & w_mask] = head[ins_h];
				head[ins_h] = strstart;
			} // Find the longest match, discarding those <= prev_length.
			// At this point we have always match_length < MIN_MATCH


			if (hash_head !== 0 && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
				// To simplify the code, we prevent matches with the string
				// of window index 0 (in particular we have to avoid a match
				// of the string with itself at the start of the input file).
				if (strategy != Z_HUFFMAN_ONLY) {
					match_length = longest_match(hash_head);
				} // longest_match() sets match_start

			}

			if (match_length >= MIN_MATCH) {
				// check_match(strstart, match_start, match_length);
				bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);
				lookahead -= match_length; // Insert new strings in the hash table only if the match length
				// is not too large. This saves time but degrades compression.

				if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
					match_length--; // string at strstart already in hash table

					do {
						strstart++;
						ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

						hash_head = head[ins_h] & 0xffff;
						prev[strstart & w_mask] = head[ins_h];
						head[ins_h] = strstart; // strstart never exceeds WSIZE-MAX_MATCH, so there are
						// always MIN_MATCH bytes ahead.
					} while (--match_length !== 0);

					strstart++;
				} else {
					strstart += match_length;
					match_length = 0;
					ins_h = window[strstart] & 0xff;
					ins_h = (ins_h << hash_shift ^ window[strstart + 1] & 0xff) & hash_mask; // If lookahead < MIN_MATCH, ins_h is garbage, but it does
					// not
					// matter since it will be recomputed at next deflate call.
				}
			} else {
				// No match, output a literal byte
				bflush = _tr_tally(0, window[strstart] & 0xff);
				lookahead--;
				strstart++;
			}

			if (bflush) {
				flush_block_only(false);
				if (strm.avail_out === 0) return NeedMore;
			}
		}

		flush_block_only(flush == Z_FINISH);

		if (strm.avail_out === 0) {
			if (flush == Z_FINISH) return FinishStarted; else return NeedMore;
		}

		return flush == Z_FINISH ? FinishDone : BlockDone;
	} // Same as above, but achieves better compression. We use a lazy
	// evaluation for matches: a match is finally adopted only if there is
	// no better match at the next window position.


	function deflate_slow(flush) {
		// short hash_head = 0; // head of hash chain
		var hash_head = 0; // head of hash chain

		var bflush; // set if current block must be flushed

		var max_insert; // Process the input block.

		while (true) {
			// Make sure that we always have enough lookahead, except
			// at the end of the input file. We need MAX_MATCH bytes
			// for the next match, plus MIN_MATCH bytes to insert the
			// string following the next match.
			if (lookahead < MIN_LOOKAHEAD) {
				fill_window();

				if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
					return NeedMore;
				}

				if (lookahead === 0) break; // flush the current block
			} // Insert the string window[strstart .. strstart+2] in the
			// dictionary, and set hash_head to the head of the hash chain:


			if (lookahead >= MIN_MATCH) {
				ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

				hash_head = head[ins_h] & 0xffff;
				prev[strstart & w_mask] = head[ins_h];
				head[ins_h] = strstart;
			} // Find the longest match, discarding those <= prev_length.


			prev_length = match_length;
			prev_match = match_start;
			match_length = MIN_MATCH - 1;

			if (hash_head !== 0 && prev_length < max_lazy_match && (strstart - hash_head & 0xffff) <= w_size - MIN_LOOKAHEAD) {
				// To simplify the code, we prevent matches with the string
				// of window index 0 (in particular we have to avoid a match
				// of the string with itself at the start of the input file).
				if (strategy != Z_HUFFMAN_ONLY) {
					match_length = longest_match(hash_head);
				} // longest_match() sets match_start


				if (match_length <= 5 && (strategy == Z_FILTERED || match_length == MIN_MATCH && strstart - match_start > 4096)) {
					// If prev_match is also MIN_MATCH, match_start is garbage
					// but we will ignore the current match anyway.
					match_length = MIN_MATCH - 1;
				}
			} // If there was a match at the previous step and the current
			// match is not better, output the previous match:


			if (prev_length >= MIN_MATCH && match_length <= prev_length) {
				max_insert = strstart + lookahead - MIN_MATCH; // Do not insert strings in hash table beyond this.
				// check_match(strstart-1, prev_match, prev_length);

				bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH); // Insert in hash table all strings up to the end of the match.
				// strstart-1 and strstart are already inserted. If there is not
				// enough lookahead, the last two strings are not inserted in
				// the hash table.

				lookahead -= prev_length - 1;
				prev_length -= 2;

				do {
					if (++strstart <= max_insert) {
						ins_h = (ins_h << hash_shift ^ window[strstart + (MIN_MATCH - 1)] & 0xff) & hash_mask; // prev[strstart&w_mask]=hash_head=head[ins_h];

						hash_head = head[ins_h] & 0xffff;
						prev[strstart & w_mask] = head[ins_h];
						head[ins_h] = strstart;
					}
				} while (--prev_length !== 0);

				match_available = 0;
				match_length = MIN_MATCH - 1;
				strstart++;

				if (bflush) {
					flush_block_only(false);
					if (strm.avail_out === 0) return NeedMore;
				}
			} else if (match_available !== 0) {
				// If there was no match at the previous position, output a
				// single literal. If there was a match but the current match
				// is longer, truncate the previous match to a single literal.
				bflush = _tr_tally(0, window[strstart - 1] & 0xff);

				if (bflush) {
					flush_block_only(false);
				}

				strstart++;
				lookahead--;
				if (strm.avail_out === 0) return NeedMore;
			} else {
				// There is no previous match to compare with, wait for
				// the next step to decide.
				match_available = 1;
				strstart++;
				lookahead--;
			}
		}

		if (match_available !== 0) {
			bflush = _tr_tally(0, window[strstart - 1] & 0xff);
			match_available = 0;
		}

		flush_block_only(flush == Z_FINISH);

		if (strm.avail_out === 0) {
			if (flush == Z_FINISH) return FinishStarted; else return NeedMore;
		}

		return flush == Z_FINISH ? FinishDone : BlockDone;
	}

	function deflateReset(strm) {
		strm.total_in = strm.total_out = 0;
		strm.msg = null; //

		that.pending = 0;
		that.pending_out = 0;
		status = BUSY_STATE;
		last_flush = Z_NO_FLUSH;
		tr_init();
		lm_init();
		return Z_OK;
	}

	that.deflateInit = function (strm, _level, bits, _method, memLevel, _strategy) {
		if (!_method) _method = Z_DEFLATED;
		if (!memLevel) memLevel = DEF_MEM_LEVEL;
		if (!_strategy) _strategy = Z_DEFAULT_STRATEGY; // byte[] my_version=ZLIB_VERSION;
		//
		// if (!version || version[0] != my_version[0]
		// || stream_size != sizeof(z_stream)) {
		// return Z_VERSION_ERROR;
		// }

		strm.msg = null;
		if (_level == Z_DEFAULT_COMPRESSION) _level = 6;

		if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
			return Z_STREAM_ERROR;
		}

		strm.dstate = that;
		w_bits = bits;
		w_size = 1 << w_bits;
		w_mask = w_size - 1;
		hash_bits = memLevel + 7;
		hash_size = 1 << hash_bits;
		hash_mask = hash_size - 1;
		hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);
		window = new Uint8Array(w_size * 2);
		prev = [];
		head = [];
		lit_bufsize = 1 << memLevel + 6; // 16K elements by default
		// We overlay pending_buf and d_buf+l_buf. This works since the average
		// output size for (length,distance) codes is <= 24 bits.

		that.pending_buf = new Uint8Array(lit_bufsize * 4);
		pending_buf_size = lit_bufsize * 4;
		d_buf = Math.floor(lit_bufsize / 2);
		l_buf = (1 + 2) * lit_bufsize;
		level = _level;
		strategy = _strategy;
		return deflateReset(strm);
	};

	that.deflateEnd = function () {
		if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
			return Z_STREAM_ERROR;
		} // Deallocate in reverse order of allocations:


		that.pending_buf = null;
		head = null;
		prev = null;
		window = null; // free

		that.dstate = null;
		return status == BUSY_STATE ? Z_DATA_ERROR : Z_OK;
	};

	that.deflateParams = function (strm, _level, _strategy) {
		var err = Z_OK;

		if (_level == Z_DEFAULT_COMPRESSION) {
			_level = 6;
		}

		if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
			return Z_STREAM_ERROR;
		}

		if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
			// Flush the last buffer:
			err = strm.deflate(Z_PARTIAL_FLUSH);
		}

		if (level != _level) {
			level = _level;
			max_lazy_match = config_table[level].max_lazy;
			good_match = config_table[level].good_length;
			nice_match = config_table[level].nice_length;
			max_chain_length = config_table[level].max_chain;
		}

		strategy = _strategy;
		return err;
	};

	that.deflateSetDictionary = function (strm, dictionary, dictLength) {
		var length = dictLength;
		var n,
			index = 0;
		if (!dictionary || status != INIT_STATE) return Z_STREAM_ERROR;
		if (length < MIN_MATCH) return Z_OK;

		if (length > w_size - MIN_LOOKAHEAD) {
			length = w_size - MIN_LOOKAHEAD;
			index = dictLength - length; // use the tail of the dictionary
		}

		window.set(dictionary.subarray(index, index + length), 0);
		strstart = length;
		block_start = length; // Insert all strings in the hash table (except for the last two bytes).
		// s->lookahead stays null, so s->ins_h will be recomputed at the next
		// call of fill_window.

		ins_h = window[0] & 0xff;
		ins_h = (ins_h << hash_shift ^ window[1] & 0xff) & hash_mask;

		for (n = 0; n <= length - MIN_MATCH; n++) {
			ins_h = (ins_h << hash_shift ^ window[n + (MIN_MATCH - 1)] & 0xff) & hash_mask;
			prev[n & w_mask] = head[ins_h];
			head[ins_h] = n;
		}

		return Z_OK;
	};

	that.deflate = function (_strm, flush) {
		var i, header, level_flags, old_flush, bstate;

		if (flush > Z_FINISH || flush < 0) {
			return Z_STREAM_ERROR;
		}

		if (!_strm.next_out || !_strm.next_in && _strm.avail_in !== 0 || status == FINISH_STATE && flush != Z_FINISH) {
			_strm.msg = z_errmsg[Z_NEED_DICT - Z_STREAM_ERROR];
			return Z_STREAM_ERROR;
		}

		if (_strm.avail_out === 0) {
			_strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
			return Z_BUF_ERROR;
		}

		strm = _strm; // just in case

		old_flush = last_flush;
		last_flush = flush; // Write the zlib header

		if (status == INIT_STATE) {
			header = Z_DEFLATED + (w_bits - 8 << 4) << 8;
			level_flags = (level - 1 & 0xff) >> 1;
			if (level_flags > 3) level_flags = 3;
			header |= level_flags << 6;
			if (strstart !== 0) header |= PRESET_DICT;
			header += 31 - header % 31;
			status = BUSY_STATE;
			putShortMSB(header);
		} // Flush as much pending output as possible


		if (that.pending !== 0) {
			strm.flush_pending();

			if (strm.avail_out === 0) {
				// console.log(" avail_out==0");
				// Since avail_out is 0, deflate will be called again with
				// more output space, but possibly with both pending and
				// avail_in equal to zero. There won't be anything to do,
				// but this is not an error situation so make sure we
				// return OK instead of BUF_ERROR at next call of deflate:
				last_flush = -1;
				return Z_OK;
			} // Make sure there is something to do and avoid duplicate
			// consecutive
			// flushes. For repeated and useless calls with Z_FINISH, we keep
			// returning Z_STREAM_END instead of Z_BUFF_ERROR.

		} else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH) {
			strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
			return Z_BUF_ERROR;
		} // User must not provide more input after the first FINISH:


		if (status == FINISH_STATE && strm.avail_in !== 0) {
			_strm.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR];
			return Z_BUF_ERROR;
		} // Start a new block or continue the current one.


		if (strm.avail_in !== 0 || lookahead !== 0 || flush != Z_NO_FLUSH && status != FINISH_STATE) {
			bstate = -1;

			switch (config_table[level].func) {
				case STORED:
					bstate = deflate_stored(flush);
					break;

				case FAST:
					bstate = deflate_fast(flush);
					break;

				case SLOW:
					bstate = deflate_slow(flush);
					break;

				default:
			}

			if (bstate == FinishStarted || bstate == FinishDone) {
				status = FINISH_STATE;
			}

			if (bstate == NeedMore || bstate == FinishStarted) {
				if (strm.avail_out === 0) {
					last_flush = -1; // avoid BUF_ERROR next call, see above
				}

				return Z_OK; // If flush != Z_NO_FLUSH && avail_out === 0, the next call
				// of deflate should use the same flush parameter to make sure
				// that the flush is complete. So we don't have to output an
				// empty block here, this will be done at next call. This also
				// ensures that for a very small output buffer, we emit at most
				// one empty block.
			}

			if (bstate == BlockDone) {
				if (flush == Z_PARTIAL_FLUSH) {
					_tr_align();
				} else {
					// FULL_FLUSH or SYNC_FLUSH
					_tr_stored_block(0, 0, false); // For a full flush, this empty block will be recognized
					// as a special marker by inflate_sync().


					if (flush == Z_FULL_FLUSH) {
						// state.head[s.hash_size-1]=0;
						for (i = 0; i < hash_size
							/*-1*/
							; i++) {
							// forget history
							head[i] = 0;
						}
					}
				}

				strm.flush_pending();

				if (strm.avail_out === 0) {
					last_flush = -1; // avoid BUF_ERROR at next call, see above

					return Z_OK;
				}
			}
		}

		if (flush != Z_FINISH) return Z_OK;
		return Z_STREAM_END;
	};
} // ZStream

function ZStream() {
	var that = this;
	that.next_in_index = 0;
	that.next_out_index = 0; // that.next_in; // next input byte

	that.avail_in = 0; // number of bytes available at next_in

	that.total_in = 0; // total nb of input bytes read so far
	// that.next_out; // next output byte should be put there

	that.avail_out = 0; // remaining free space at next_out

	that.total_out = 0; // total nb of bytes output so far
	// that.msg;
	// that.dstate;
}

ZStream.prototype = {
	deflateInit: function deflateInit(level, bits) {
		var that = this;
		that.dstate = new Deflate();
		if (!bits) bits = MAX_BITS;
		return that.dstate.deflateInit(that, level, bits);
	},
	deflate: function deflate(flush) {
		var that = this;

		if (!that.dstate) {
			return Z_STREAM_ERROR;
		}

		return that.dstate.deflate(that, flush);
	},
	deflateEnd: function deflateEnd() {
		var that = this;
		if (!that.dstate) return Z_STREAM_ERROR;
		var ret = that.dstate.deflateEnd();
		that.dstate = null;
		return ret;
	},
	deflateParams: function deflateParams(level, strategy) {
		var that = this;
		if (!that.dstate) return Z_STREAM_ERROR;
		return that.dstate.deflateParams(that, level, strategy);
	},
	deflateSetDictionary: function deflateSetDictionary(dictionary, dictLength) {
		var that = this;
		if (!that.dstate) return Z_STREAM_ERROR;
		return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
	},
	// Read a new buffer from the current input stream, update the
	// total number of bytes read. All deflate() input goes through
	// this function so some applications may wish to modify it to avoid
	// allocating a large strm->next_in buffer and copying from it.
	// (See also flush_pending()).
	read_buf: function read_buf(buf, start, size) {
		var that = this;
		var len = that.avail_in;
		if (len > size) len = size;
		if (len === 0) return 0;
		that.avail_in -= len;
		buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
		that.next_in_index += len;
		that.total_in += len;
		return len;
	},
	// Flush as much pending output as possible. All deflate() output goes
	// through this function so some applications may wish to modify it
	// to avoid allocating a large strm->next_out buffer and copying into it.
	// (See also read_buf()).
	flush_pending: function flush_pending() {
		var that = this;
		var len = that.dstate.pending;
		if (len > that.avail_out) len = that.avail_out;
		if (len === 0) return; // if (that.dstate.pending_buf.length <= that.dstate.pending_out || that.next_out.length <= that.next_out_index
		// || that.dstate.pending_buf.length < (that.dstate.pending_out + len) || that.next_out.length < (that.next_out_index +
		// len)) {
		// console.log(that.dstate.pending_buf.length + ", " + that.dstate.pending_out + ", " + that.next_out.length + ", " +
		// that.next_out_index + ", " + len);
		// console.log("avail_out=" + that.avail_out);
		// }

		that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);
		that.next_out_index += len;
		that.dstate.pending_out += len;
		that.total_out += len;
		that.avail_out -= len;
		that.dstate.pending -= len;

		if (that.dstate.pending === 0) {
			that.dstate.pending_out = 0;
		}
	}
}; // Deflater

function Deflater(options) {
	var that = this;
	var z = new ZStream();
	var bufsize = 512;
	var flush = Z_NO_FLUSH;
	var buf = new Uint8Array(bufsize);
	var level = options ? options.level : Z_DEFAULT_COMPRESSION;
	if (typeof level == "undefined") level = Z_DEFAULT_COMPRESSION;
	z.deflateInit(level);
	z.next_out = buf;

	that.append = function (data, onprogress) {
		var err,
			buffers = [],
			lastIndex = 0,
			bufferIndex = 0,
			bufferSize = 0,
			array;
		if (!data.length) return;
		z.next_in_index = 0;
		z.next_in = data;
		z.avail_in = data.length;

		do {
			z.next_out_index = 0;
			z.avail_out = bufsize;
			err = z.deflate(flush);
			if (err != Z_OK) throw new Error("deflating: " + z.msg);
			if (z.next_out_index) if (z.next_out_index == bufsize) buffers.push(new Uint8Array(buf)); else buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
			bufferSize += z.next_out_index;

			if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
				onprogress(z.next_in_index);
				lastIndex = z.next_in_index;
			}
		} while (z.avail_in > 0 || z.avail_out === 0);

		array = new Uint8Array(bufferSize);
		buffers.forEach(function (chunk) {
			array.set(chunk, bufferIndex);
			bufferIndex += chunk.length;
		});
		return array;
	};

	that.flush = function () {
		var err,
			buffers = [],
			bufferIndex = 0,
			bufferSize = 0,
			array;

		do {
			z.next_out_index = 0;
			z.avail_out = bufsize;
			err = z.deflate(Z_FINISH);
			if (err != Z_STREAM_END && err != Z_OK) throw new Error("deflating: " + z.msg);
			if (bufsize - z.avail_out > 0) buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
			bufferSize += z.next_out_index;
		} while (z.avail_in > 0 || z.avail_out === 0);

		z.deflateEnd();
		array = new Uint8Array(bufferSize);
		buffers.forEach(function (chunk) {
			array.set(chunk, bufferIndex);
			bufferIndex += chunk.length;
		});
		return array;
	};
}

function FlateEncode(data, options) {
	options = Object.assign({
		predictor: 1,
		colors: 1,
		bitsPerComponent: 8,
		columns: 1
	}, options);
	var arr = [];
	var i = data.length;
	var adler32;
	var deflater;

	while (i--) {
		arr[i] = data.charCodeAt(i);
	}

	adler32 = adler32csFrom(1, data.toString());
	deflater = new Deflater(6);
	deflater.append(new Uint8Array(arr));
	data = deflater.flush();
	arr = new Uint8Array(data.length + 6);
	arr.set(new Uint8Array([120, 156])), arr.set(data, 2);
	arr.set(new Uint8Array([adler32 & 0xFF, adler32 >> 8 & 0xFF, adler32 >> 16 & 0xFF, adler32 >> 24 & 0xFF]), data.length + 2);
	data = String.fromCharCode.apply(null, arr);
	return data;
};

function isString(object) {
	return typeof object === 'string';
};

function validateStringAsBase64(possibleBase64String) {
	possibleBase64String = possibleBase64String || '';
	possibleBase64String.toString().trim();
	var result = true;

	if (possibleBase64String.length === 0) {
		result = false;
	}

	if (possibleBase64String.length % 4 !== 0) {
		result = false;
	}

	if (/^[A-Za-z0-9+\/]+$/.test(possibleBase64String.substr(0, possibleBase64String.length - 2)) === false) {
		result = false;
	}

	if (/^[A-Za-z0-9\/][A-Za-z0-9+\/]|[A-Za-z0-9+\/]=|==$/.test(possibleBase64String.substr(-2)) === false) {
		result = false;
	}

	return result;
};

// 将
function atob(data) {
	//  discuss at: http://phpjs.org/functions/base64_decode/
	// original by: Tyler Akins (http://rumkin.com)
	// improved by: Thunder.m
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//    input by: Aman Gupta
	//    input by: Brett Zamir (http://brett-zamir.me)
	// bugfixed by: Onno Marsman
	// bugfixed by: Pellentesque Malesuada
	// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	//   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
	//   returns 1: 'Kevin van Zonneveld'
	var o1,
		o2,
		o3,
		h1,
		h2,
		h3,
		h4,
		bits,
		i = 0,
		ac = 0,
		dec = '',
		tmp_arr = [];

	if (!data) {
		return data;
	}

	data += '';

	do {
		// unpack four hexets into three octets using index points in b64
		h1 = b64.indexOf(data.charAt(i++));
		h2 = b64.indexOf(data.charAt(i++));
		h3 = b64.indexOf(data.charAt(i++));
		h4 = b64.indexOf(data.charAt(i++));
		bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
		o1 = bits >> 16 & 0xff;
		o2 = bits >> 8 & 0xff;
		o3 = bits & 0xff;

		if (h3 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1);
		} else if (h4 == 64) {
			tmp_arr[ac++] = String.fromCharCode(o1, o2);
		} else {
			tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
		}
	} while (i < data.length);

	dec = tmp_arr.join('');
	return dec;
}

function extractImageFromDataUrl(dataUrl) {
	dataUrl = dataUrl || '';
	var dataUrlParts = dataUrl.split('base64,');
	var result = null;

	if (dataUrlParts.length === 2) {
		var extractedInfo = /^data:(\w*\/\w*);*(charset=[\w=-]*)*;*$/.exec(dataUrlParts[0]);

		if (Array.isArray(extractedInfo)) {
			result = {
				mimeType: extractedInfo[1],
				charset: extractedInfo[2],
				data: dataUrlParts[1]
			};
		}
	}

	return result;
}

/**
 * 图片格式转换
 * @param stringData {string} - 图片的base64格式
 * */
function convertStringToImageData(stringData) {
	var base64Info;
	var imageData = '';
	var rawData;

	if (isString(stringData)) {
		var base64Info = extractImageFromDataUrl(stringData);
		rawData = base64Info !== null ? base64Info.data : stringData;

		try {
			imageData = atob(rawData);
		} catch (e) {
			if (!validateStringAsBase64(rawData)) {
				throw new Error('Supplied Data is not a valid base64-String jsPDF.convertStringToImageData ');
			} else {
				throw new Error('atob-Error in jsPDF.convertStringToImageData ' + e.message);
			}
		}
	}

	return imageData;
}

function binaryStringToUint8Array(binary_string) {
	/*
	 * not sure how efficient this will be will bigger files. Is there a native method?
	 */
	var len = binary_string.length;
	var bytes = new Uint8Array(len);

	for (var i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}

	return bytes;
}

function uint8ToBase64(unit8Array) {
	var base64 = '';
	var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var bytes = unit8Array;
	var byteLength = bytes.byteLength;
	var byteRemainder = byteLength % 3;
	var mainLength = byteLength - byteRemainder;
	var a, b, c, d;
	var chunk; // Main loop deals with bytes in chunks of 3

	for (var i = 0; i < mainLength; i = i + 3) {
		// Combine the three bytes into a single integer
		chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2]; // Use bitmasks to extract 6-bit segments from the triplet

		a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18

		b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12

		c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6

		d = chunk & 63; // 63       = 2^6 - 1
		// Convert the raw binary segments to the appropriate ASCII encoding

		base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
	} // Deal with the remaining bytes and padding


	if (byteRemainder == 1) {
		chunk = bytes[mainLength];
		a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
		// Set the 4 least significant bits to zero

		b = (chunk & 3) << 4; // 3   = 2^2 - 1

		base64 += encodings[a] + encodings[b] + '==';
	} else if (byteRemainder == 2) {
		chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
		a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10

		b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
		// Set the 2 least significant bits to zero

		c = (chunk & 15) << 2; // 15    = 2^4 - 1

		base64 += encodings[a] + encodings[b] + encodings[c] + '=';
	}

	return base64;
}


function arrayBufferToBase64(arrayBuffer) {
	var base64 = '';
	var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var bytes = new Uint8Array(arrayBuffer);
	var byteLength = bytes.byteLength;
	var byteRemainder = byteLength % 3;
	var mainLength = byteLength - byteRemainder;
	var a, b, c, d;
	var chunk; // Main loop deals with bytes in chunks of 3

	for (var i = 0; i < mainLength; i = i + 3) {
		// Combine the three bytes into a single integer
		chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2]; // Use bitmasks to extract 6-bit segments from the triplet

		a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18

		b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12

		c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6

		d = chunk & 63; // 63       = 2^6 - 1
		// Convert the raw binary segments to the appropriate ASCII encoding

		base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
	} // Deal with the remaining bytes and padding


	if (byteRemainder == 1) {
		chunk = bytes[mainLength];
		a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
		// Set the 4 least significant bits to zero

		b = (chunk & 3) << 4; // 3   = 2^2 - 1

		base64 += encodings[a] + encodings[b] + '==';
	} else if (byteRemainder == 2) {
		chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
		a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10

		b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
		// Set the 2 least significant bits to zero

		c = (chunk & 15) << 2; // 15    = 2^4 - 1

		base64 += encodings[a] + encodings[b] + encodings[c] + '=';
	}

	return base64;
}

function arrayBufferToBinaryString(buffer) {
	// if (typeof Uint8Array !== 'undefined' && typeof Uint8Array.prototype.reduce !== 'undefined') {
	// return new Uint8Array(buffer).reduce(function (data, byte) {
	// return data.push(String.fromCharCode(byte)), data;
	// }, []).join('');
	// }
	if (typeof atob === "function") {
		return atob(arrayBufferToBase64(buffer));
	}
}

function filterNone(line, colorsPerPixel, prevLine) {
	/*var result = new Uint8Array(line.length + 1);
	result[0] = 0;
	result.set(line, 1);*/
	var result = Array.apply([], line);
	result.unshift(0);
	return result;
}

function filterUp(line, colorsPerPixel, prevLine) {
	var result = [],
		i = 0,
		len = line.length,
		up;
	result[0] = 2;

	for (; i < len; i++) {
		up = prevLine && prevLine[i] || 0;
		result[i + 1] = line[i] - up + 0x0100 & 0xff;
	}

	return result;
}

function filterSub(line, colorsPerPixel, prevLine) {
	var result = [],
		i = 0,
		len = line.length,
		left;
	result[0] = 1;

	for (; i < len; i++) {
		left = line[i - colorsPerPixel] || 0;
		result[i + 1] = line[i] - left + 0x0100 & 0xff;
	}

	return result;
}

function filterAverage(line, colorsPerPixel, prevLine) {
	var result = [],
		i = 0,
		len = line.length,
		left,
		up;
	result[0] = 3;

	for (; i < len; i++) {
		left = line[i - colorsPerPixel] || 0;
		up = prevLine && prevLine[i] || 0;
		result[i + 1] = line[i] + 0x0100 - (left + up >>> 1) & 0xff;
	}

	return result;
}

function filterPaeth(line, colorsPerPixel, prevLine) {
	var result = [],
		i = 0,
		len = line.length,
		left,
		up,
		upLeft,
		paeth;
	result[0] = 4;

	for (; i < len; i++) {
		left = line[i - colorsPerPixel] || 0;
		up = prevLine && prevLine[i] || 0;
		upLeft = prevLine && prevLine[i - colorsPerPixel] || 0;
		paeth = paethPredictor(left, up, upLeft);
		result[i + 1] = line[i] - paeth + 0x0100 & 0xff;
	}

	return result;
}

function paethPredictor(left, up, upLeft) {
	var p = left + up - upLeft,
		pLeft = Math.abs(p - left),
		pUp = Math.abs(p - up),
		pUpLeft = Math.abs(p - upLeft);
	return pLeft <= pUp && pLeft <= pUpLeft ? left : pUp <= pUpLeft ? up : upLeft;
}

function getFilterMethods() {
	return [filterNone, filterSub, filterUp, filterAverage, filterPaeth];
}

function getIndexOfSmallestSum(arrays) {
	var i = 0,
		len = arrays.length,
		sum,
		min,
		ind;

	while (i < len) {
		sum = absSum(arrays[i].slice(1));

		if (sum < min || !min) {
			min = sum;
			ind = i;
		}

		i++;
	}

	return ind;
}

function absSum(array) {
	var i = 0,
		len = array.length,
		sum = 0;

	while (i < len) {
		sum += Math.abs(array[i++]);
	}

	return sum;
}

function supportsArrayBuffer() {
	return typeof ArrayBuffer !== 'undefined' && typeof Uint8Array !== 'undefined';
}

function isArrayBuffer(object) {
	if (!supportsArrayBuffer()) return false;
	return object instanceof ArrayBuffer;
};

/**
 * Tests supplied object to determine if it implements the ArrayBufferView (TypedArray) interface
 *
 * @name isArrayBufferView
 * @function
 * @param {Object} object an Object
 * @returns {boolean}
 */


function isArrayBufferView(object) {
	if (!supportsArrayBuffer()) return false;
	if (typeof Uint32Array === 'undefined') return false;
	return object instanceof Int8Array || object instanceof Uint8Array || typeof Uint8ClampedArray !== 'undefined' && object instanceof Uint8ClampedArray || object instanceof Int16Array || object instanceof Uint16Array || object instanceof Int32Array || object instanceof Uint32Array || object instanceof Float32Array || object instanceof Float64Array;
};

function applyPngFilterMethod(bytes, lineLength, colorsPerPixel, filter_method) {
	var lines = bytes.length / lineLength,
		// var lines = Math.floor(bytes.length / lineLength),
		result = new Uint8Array(bytes.length + lines),
		filter_methods = getFilterMethods(),
		i = 0,
		line,
		prevLine,
		offset;
	for (; i < lines; i++) {
		offset = i * lineLength;
		line = bytes.subarray(offset, offset + lineLength);
		if (filter_method) {
			let params1 = filter_method(line, colorsPerPixel, prevLine);
			result.set(params1, offset + i);
		} else {
			var j = 0,
				len = filter_methods.length,
				results = [];

			for (; j < len; j++) {
				results[j] = filter_methods[j](line, colorsPerPixel, prevLine);
			}

			var ind = getIndexOfSmallestSum(results.concat());
			result.set(results[ind], offset + i);
		}

		prevLine = line;
	}

	return result;
}

function createZlibHeader(bytes, level) {
	/*
	 * @see http://www.ietf.org/rfc/rfc1950.txt for zlib header
	 */
	var cm = 8;
	var cinfo = Math.LOG2E * Math.log(0x8000) - 8;
	var cmf = cinfo << 4 | cm;
	var hdr = cmf << 8;
	var flevel = Math.min(3, (level - 1 & 0xff) >> 1);
	hdr |= flevel << 6;
	hdr |= 0; //FDICT

	hdr += 31 - hdr % 31;
	return [cmf, hdr & 0xff & 0xff];
}

function adler32(array, param) {
	var adler = 1;
	var s1 = adler & 0xffff,
		s2 = adler >>> 16 & 0xffff;
	var len = array.length;
	var tlen;
	var i = 0;

	while (len > 0) {
		tlen = len > param ? param : len;
		len -= tlen;

		do {
			s1 += array[i++];
			s2 += s1;
		} while (--tlen);

		s1 %= 65521;
		s2 %= 65521;
	}

	return (s2 << 16 | s1) >>> 0;
}


var customPNG = function () {
	var APNG_BLEND_OP_SOURCE, APNG_DISPOSE_OP_BACKGROUND, APNG_DISPOSE_OP_PREVIOUS, makeImage, scratchCanvas,
		scratchCtx;
	customPNG.load = function (url, canvas, callback) {
		var xhr;
		if (typeof canvas === 'function') {
			callback = canvas;
		}

		xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.responseType = "arraybuffer";

		xhr.onload = function () {
			var data, png;
			data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
			png = new customPNG(data);

			if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
				png.render(canvas);
			}

			return typeof callback === "function" ? callback(png) : void 0;
		};

		return xhr.send(null);
	};
	APNG_DISPOSE_OP_BACKGROUND = 1;
	APNG_DISPOSE_OP_PREVIOUS = 2;
	APNG_BLEND_OP_SOURCE = 0;

	var DecodeStream = function () {
		function constructor() {
			this.pos = 0;
			this.bufferLength = 0;
			this.eof = false;
			this.buffer = null;
		}

		constructor.prototype = {
			ensureBuffer: function decodestream_ensureBuffer(requested) {
				var buffer = this.buffer;
				var current = buffer ? buffer.byteLength : 0;
				if (requested < current) return buffer;
				var size = 512;

				while (size < requested) {
					size <<= 1;
				}

				var buffer2 = new Uint8Array(size);

				for (var i = 0; i < current; ++i) {
					buffer2[i] = buffer[i];
				}

				return this.buffer = buffer2;
			},
			getByte: function decodestream_getByte() {
				var pos = this.pos;

				while (this.bufferLength <= pos) {
					if (this.eof) return null;
					this.readBlock();
				}

				return this.buffer[this.pos++];
			},
			getBytes: function decodestream_getBytes(length) {
				var pos = this.pos;

				if (length) {
					this.ensureBuffer(pos + length);
					var end = pos + length;

					while (!this.eof && this.bufferLength < end) {
						this.readBlock();
					}

					var bufEnd = this.bufferLength;
					if (end > bufEnd) end = bufEnd;
				} else {
					while (!this.eof) {
						this.readBlock();
					}

					var end = this.bufferLength;
				}

				this.pos = end;
				return this.buffer.subarray(pos, end);
			},
			lookChar: function decodestream_lookChar() {
				var pos = this.pos;

				while (this.bufferLength <= pos) {
					if (this.eof) return null;
					this.readBlock();
				}

				return String.fromCharCode(this.buffer[this.pos]);
			},
			getChar: function decodestream_getChar() {
				var pos = this.pos;

				while (this.bufferLength <= pos) {
					if (this.eof) return null;
					this.readBlock();
				}

				return String.fromCharCode(this.buffer[this.pos++]);
			},
			makeSubStream: function decodestream_makeSubstream(start, length, dict) {
				var end = start + length;

				while (this.bufferLength <= end && !this.eof) {
					this.readBlock();
				}

				return new Stream(this.buffer, start, length, dict);
			},
			skip: function decodestream_skip(n) {
				if (!n) n = 1;
				this.pos += n;
			},
			reset: function decodestream_reset() {
				this.pos = 0;
			}
		};
		return constructor;
	}();

	var FlateStream = function () {
		if (typeof Uint32Array === 'undefined') {
			return undefined;
		}

		var codeLenCodeMap = new Uint32Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
		var lengthDecode = new Uint32Array([0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a, 0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f, 0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073, 0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102]);
		var distDecode = new Uint32Array([0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d, 0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1, 0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01, 0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001]);
		var fixedLitCodeTab = [new Uint32Array([0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0, 0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0, 0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0, 0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0, 0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8, 0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8, 0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8, 0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8, 0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4, 0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4, 0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4, 0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4, 0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc, 0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec, 0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc, 0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc, 0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2, 0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2, 0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2, 0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2, 0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca, 0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea, 0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da, 0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa, 0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6, 0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6, 0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6, 0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6, 0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce, 0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee, 0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de, 0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe, 0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1, 0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1, 0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1, 0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1, 0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9, 0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9, 0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9, 0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9, 0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5, 0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5, 0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5, 0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5, 0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd, 0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed, 0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd, 0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd, 0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3, 0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3, 0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3, 0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3, 0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb, 0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb, 0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db, 0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb, 0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7, 0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7, 0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7, 0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7, 0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf, 0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef, 0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df, 0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff]), 9];
		var fixedDistCodeTab = [new Uint32Array([0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c, 0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000, 0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d, 0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000]), 5];

		function error(e) {
			throw new Error(e);
		}

		function constructor(bytes) {
			//var bytes = stream.getBytes();
			var bytesPos = 0;
			var cmf = bytes[bytesPos++];
			var flg = bytes[bytesPos++];
			if (cmf == -1 || flg == -1) error('Invalid header in flate stream');
			if ((cmf & 0x0f) != 0x08) error('Unknown compression method in flate stream');
			if (((cmf << 8) + flg) % 31 != 0) error('Bad FCHECK in flate stream');
			if (flg & 0x20) error('FDICT bit set in flate stream');
			this.bytes = bytes;
			this.bytesPos = bytesPos;
			this.codeSize = 0;
			this.codeBuf = 0;
			DecodeStream.call(this);
		}

		constructor.prototype = Object.create(DecodeStream.prototype);

		constructor.prototype.getBits = function (bits) {
			var codeSize = this.codeSize;
			var codeBuf = this.codeBuf;
			var bytes = this.bytes;
			var bytesPos = this.bytesPos;
			var b;

			while (codeSize < bits) {
				if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad encoding in flate stream');
				codeBuf |= b << codeSize;
				codeSize += 8;
			}

			b = codeBuf & (1 << bits) - 1;
			this.codeBuf = codeBuf >> bits;
			this.codeSize = codeSize -= bits;
			this.bytesPos = bytesPos;
			return b;
		};

		constructor.prototype.getCode = function (table) {
			var codes = table[0];
			var maxLen = table[1];
			var codeSize = this.codeSize;
			var codeBuf = this.codeBuf;
			var bytes = this.bytes;
			var bytesPos = this.bytesPos;

			while (codeSize < maxLen) {
				var b;
				if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad encoding in flate stream');
				codeBuf |= b << codeSize;
				codeSize += 8;
			}

			var code = codes[codeBuf & (1 << maxLen) - 1];
			var codeLen = code >> 16;
			var codeVal = code & 0xffff;
			if (codeSize == 0 || codeSize < codeLen || codeLen == 0) error('Bad encoding in flate stream');
			this.codeBuf = codeBuf >> codeLen;
			this.codeSize = codeSize - codeLen;
			this.bytesPos = bytesPos;
			return codeVal;
		};

		constructor.prototype.generateHuffmanTable = function (lengths) {
			var n = lengths.length; // find max code length

			var maxLen = 0;

			for (var i = 0; i < n; ++i) {
				if (lengths[i] > maxLen) maxLen = lengths[i];
			} // build the table


			var size = 1 << maxLen;
			var codes = new Uint32Array(size);

			for (var len = 1, code = 0, skip = 2; len <= maxLen; ++len, code <<= 1, skip <<= 1) {
				for (var val = 0; val < n; ++val) {
					if (lengths[val] == len) {
						// bit-reverse the code
						var code2 = 0;
						var t = code;

						for (var i = 0; i < len; ++i) {
							code2 = code2 << 1 | t & 1;
							t >>= 1;
						} // fill the table entries


						for (var i = code2; i < size; i += skip) {
							codes[i] = len << 16 | val;
						}

						++code;
					}
				}
			}

			return [codes, maxLen];
		};

		constructor.prototype.readBlock = function () {
			function repeat(stream, array, len, offset, what) {
				var repeat = stream.getBits(len) + offset;

				while (repeat-- > 0) {
					array[i++] = what;
				}
			} // read block header


			var hdr = this.getBits(3);
			if (hdr & 1) this.eof = true;
			hdr >>= 1;

			if (hdr == 0) {
				// uncompressed block
				var bytes = this.bytes;
				var bytesPos = this.bytesPos;
				var b;
				if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
				var blockLen = b;
				if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
				blockLen |= b << 8;
				if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
				var check = b;
				if (typeof (b = bytes[bytesPos++]) == 'undefined') error('Bad block header in flate stream');
				check |= b << 8;
				if (check != (~blockLen & 0xffff)) error('Bad uncompressed block length in flate stream');
				this.codeBuf = 0;
				this.codeSize = 0;
				var bufferLength = this.bufferLength;
				var buffer = this.ensureBuffer(bufferLength + blockLen);
				var end = bufferLength + blockLen;
				this.bufferLength = end;

				for (var n = bufferLength; n < end; ++n) {
					if (typeof (b = bytes[bytesPos++]) == 'undefined') {
						this.eof = true;
						break;
					}

					buffer[n] = b;
				}

				this.bytesPos = bytesPos;
				return;
			}

			var litCodeTable;
			var distCodeTable;

			if (hdr == 1) {
				// compressed block, fixed codes
				litCodeTable = fixedLitCodeTab;
				distCodeTable = fixedDistCodeTab;
			} else if (hdr == 2) {
				// compressed block, dynamic codes
				var numLitCodes = this.getBits(5) + 257;
				var numDistCodes = this.getBits(5) + 1;
				var numCodeLenCodes = this.getBits(4) + 4; // build the code lengths code table

				var codeLenCodeLengths = Array(codeLenCodeMap.length);
				var i = 0;

				while (i < numCodeLenCodes) {
					codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
				}

				var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths); // build the literal and distance code tables

				var len = 0;
				var i = 0;
				var codes = numLitCodes + numDistCodes;
				var codeLengths = new Array(codes);

				while (i < codes) {
					var code = this.getCode(codeLenCodeTab);

					if (code == 16) {
						repeat(this, codeLengths, 2, 3, len);
					} else if (code == 17) {
						repeat(this, codeLengths, 3, 3, len = 0);
					} else if (code == 18) {
						repeat(this, codeLengths, 7, 11, len = 0);
					} else {
						codeLengths[i++] = len = code;
					}
				}

				litCodeTable = this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
				distCodeTable = this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
			} else {
				error('Unknown block type in flate stream');
			}

			var buffer = this.buffer;
			var limit = buffer ? buffer.length : 0;
			var pos = this.bufferLength;

			while (true) {
				var code1 = this.getCode(litCodeTable);

				if (code1 < 256) {
					if (pos + 1 >= limit) {
						buffer = this.ensureBuffer(pos + 1);
						limit = buffer.length;
					}

					buffer[pos++] = code1;
					continue;
				}

				if (code1 == 256) {
					this.bufferLength = pos;
					return;
				}

				code1 -= 257;
				code1 = lengthDecode[code1];
				var code2 = code1 >> 16;
				if (code2 > 0) code2 = this.getBits(code2);
				var len = (code1 & 0xffff) + code2;
				code1 = this.getCode(distCodeTable);
				code1 = distDecode[code1];
				code2 = code1 >> 16;
				if (code2 > 0) code2 = this.getBits(code2);
				var dist = (code1 & 0xffff) + code2;

				if (pos + len >= limit) {
					buffer = this.ensureBuffer(pos + len);
					limit = buffer.length;
				}

				for (var k = 0; k < len; ++k, ++pos) {
					buffer[pos] = buffer[pos - dist];
				}
			}
		};

		return constructor;
	}();

	function customPNG(data) {
		var chunkSize, colors, palLen, delayDen, delayNum, frame, i, index, key, section, palShort, text, _i, _j, _ref;
		this.data = data;
		this.pos = 8;
		this.palette = [];
		this.imgData = [];
		this.transparency = {};
		this.animation = null;
		this.text = {};
		frame = null;
		while (true) {
			chunkSize = this.readUInt32();
			section = function () {
				var _i, _results;

				_results = [];

				for (i = _i = 0; _i < 4; i = ++_i) {
					_results.push(String.fromCharCode(this.data[this.pos++]));
				}

				return _results;
			}.call(this).join('');

			switch (section) {
				case 'IHDR':
					this.width = this.readUInt32();
					this.height = this.readUInt32();
					this.bits = this.data[this.pos++];
					this.colorType = this.data[this.pos++];
					this.compressionMethod = this.data[this.pos++];
					this.filterMethod = this.data[this.pos++];
					this.interlaceMethod = this.data[this.pos++];
					break;

				case 'acTL':
					this.animation = {
						numFrames: this.readUInt32(),
						numPlays: this.readUInt32() || Infinity,
						frames: []
					};
					break;

				case 'PLTE':
					this.palette = this.read(chunkSize);
					break;

				case 'fcTL':
					if (frame) {
						this.animation.frames.push(frame);
					}

					this.pos += 4;
					frame = {
						width: this.readUInt32(),
						height: this.readUInt32(),
						xOffset: this.readUInt32(),
						yOffset: this.readUInt32()
					};
					delayNum = this.readUInt16();
					delayDen = this.readUInt16() || 100;
					frame.delay = 1000 * delayNum / delayDen;
					frame.disposeOp = this.data[this.pos++];
					frame.blendOp = this.data[this.pos++];
					frame.data = [];
					break;

				case 'IDAT':
				case 'fdAT':
					if (section === 'fdAT') {
						this.pos += 4;
						chunkSize -= 4;
					}

					data = (frame != null ? frame.data : void 0) || this.imgData;

					for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
						data.push(this.data[this.pos++]);
					}

					break;

				case 'tRNS':
					this.transparency = {};

					switch (this.colorType) {
						case 3:
							palLen = this.palette.length / 3;
							this.transparency.indexed = this.read(chunkSize);
							if (this.transparency.indexed.length > palLen) throw new Error('More transparent colors than palette size');
							/*
							 * According to the PNG spec trns should be increased to the same size as palette if shorter
							 */
							//palShort = 255 - this.transparency.indexed.length;

							palShort = palLen - this.transparency.indexed.length;

							if (palShort > 0) {
								for (i = _j = 0; 0 <= palShort ? _j < palShort : _j > palShort; i = 0 <= palShort ? ++_j : --_j) {
									this.transparency.indexed.push(255);
								}
							}

							break;

						case 0:
							this.transparency.grayscale = this.read(chunkSize)[0];
							break;

						case 2:
							this.transparency.rgb = this.read(chunkSize);
					}

					break;

				case 'tEXt':
					text = this.read(chunkSize);
					index = text.indexOf(0);
					key = String.fromCharCode.apply(String, text.slice(0, index));
					this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
					break;

				case 'IEND':
					if (frame) {
						this.animation.frames.push(frame);
					}

					this.colors = function () {
						switch (this.colorType) {
							case 0:
							case 3:
							case 4:
								return 1;

							case 2:
							case 6:
								return 3;
						}
					}.call(this);

					this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
					colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
					this.pixelBitlength = this.bits * colors;

					this.colorSpace = function () {
						switch (this.colors) {
							case 1:
								return 'DeviceGray';

							case 3:
								return 'DeviceRGB';
						}
					}.call(this);

					this.imgData = new Uint8Array(this.imgData);
					return;

				default:
					this.pos += chunkSize;
			}

			this.pos += 4;
			if (this.pos < 0) {
				break;
			}
			if (this.pos > this.data.length) {
				throw new Error("Incomplete or corrupt PNG file");
			}
		}

		return;
	}

	customPNG.prototype.read = function (bytes) {
		var i, _i, _results;

		_results = [];

		for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
			_results.push(this.data[this.pos++]);
		}

		return _results;
	};

	customPNG.prototype.readUInt32 = function () {
		var b1, b2, b3, b4;

		b1 = this.data[this.pos++] << 24;
		b2 = this.data[this.pos++] << 16;
		b3 = this.data[this.pos++] << 8;
		b4 = this.data[this.pos++];
		return b1 | b2 | b3 | b4;
	};

	customPNG.prototype.readUInt16 = function () {
		var b1, b2;
		b1 = this.data[this.pos++] << 8;
		b2 = this.data[this.pos++];
		return b1 | b2;
	};

	customPNG.prototype.decodePixels = function (data) {
		var pixelBytes = this.pixelBitlength / 8;
		var fullPixels = new Uint8Array(this.width * this.height * pixelBytes);
		var pos = 0;

		var _this = this;

		if (data == null) {
			data = this.imgData;
		}

		if (data.length === 0) {
			return new Uint8Array(0);
		}

		data = new FlateStream(data);
		data = data.getBytes();

		function pass(x0, y0, dx, dy) {
			var abyte, c, col, i, left, length, p, pa, paeth, pb, pc, pixels, row, scanlineLength, upper, upperLeft, _i,
				_j,
				_k, _l, _m;

			var w = Math.ceil((_this.width - x0) / dx),
				h = Math.ceil((_this.height - y0) / dy);
			var isFull = _this.width == w && _this.height == h;
			scanlineLength = pixelBytes * w;
			pixels = isFull ? fullPixels : new Uint8Array(scanlineLength * h);
			length = data.length;
			row = 0;
			c = 0;

			while (row < h && pos < length) {
				switch (data[pos++]) {
					case 0:
						for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
							pixels[c++] = data[pos++];
						}

						break;

					case 1:
						for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
							abyte = data[pos++];
							left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
							pixels[c++] = (abyte + left) % 256;
						}

						break;

					case 2:
						for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
							abyte = data[pos++];
							col = (i - i % pixelBytes) / pixelBytes;
							upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
							pixels[c++] = (upper + abyte) % 256;
						}

						break;

					case 3:
						for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
							abyte = data[pos++];
							col = (i - i % pixelBytes) / pixelBytes;
							left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
							upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
							pixels[c++] = (abyte + Math.floor((left + upper) / 2)) % 256;
						}

						break;

					case 4:
						for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
							abyte = data[pos++];
							col = (i - i % pixelBytes) / pixelBytes;
							left = i < pixelBytes ? 0 : pixels[c - pixelBytes];

							if (row === 0) {
								upper = upperLeft = 0;
							} else {
								upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + i % pixelBytes];
								upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + i % pixelBytes];
							}

							p = left + upper - upperLeft;
							pa = Math.abs(p - left);
							pb = Math.abs(p - upper);
							pc = Math.abs(p - upperLeft);

							if (pa <= pb && pa <= pc) {
								paeth = left;
							} else if (pb <= pc) {
								paeth = upper;
							} else {
								paeth = upperLeft;
							}

							pixels[c++] = (abyte + paeth) % 256;
						}

						break;

					default:
						throw new Error("Invalid filter algorithm: " + data[pos - 1]);
				}

				if (!isFull) {
					var fullPos = ((y0 + row * dy) * _this.width + x0) * pixelBytes;
					var partPos = row * scanlineLength;

					for (i = 0; i < w; i += 1) {
						for (var j = 0; j < pixelBytes; j += 1) {
							fullPixels[fullPos++] = pixels[partPos++];
						}

						fullPos += (dx - 1) * pixelBytes;
					}
				}

				row++;
			}
		}

		if (_this.interlaceMethod == 1) {
			/*
			  1 6 4 6 2 6 4 6
			  7 7 7 7 7 7 7 7
			  5 6 5 6 5 6 5 6
			  7 7 7 7 7 7 7 7
			  3 6 4 6 3 6 4 6
			  7 7 7 7 7 7 7 7
			  5 6 5 6 5 6 5 6
			  7 7 7 7 7 7 7 7
			*/
			pass(0, 0, 8, 8); // 1

			/* NOTE these seem to follow the pattern:
			 * pass(x, 0, 2*x, 2*x);
			 * pass(0, x,   x, 2*x);
			 * with x being 4, 2, 1.
			 */

			pass(4, 0, 8, 8); // 2

			pass(0, 4, 4, 8); // 3

			pass(2, 0, 4, 4); // 4

			pass(0, 2, 2, 4); // 5

			pass(1, 0, 2, 2); // 6

			pass(0, 1, 1, 2); // 7
		} else {
			pass(0, 0, 1, 1);
		}

		return fullPixels;
	};

	customPNG.prototype.decodePalette = function () {
		var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;

		palette = this.palette;
		transparency = this.transparency.indexed || [];
		ret = new Uint8Array((transparency.length || 0) + palette.length);
		pos = 0;
		length = palette.length;
		c = 0;

		for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
			ret[pos++] = palette[i];
			ret[pos++] = palette[i + 1];
			ret[pos++] = palette[i + 2];
			ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
		}

		return ret;
	};

	customPNG.prototype.copyToImageData = function (imageData, pixels) {
		var alpha, colors, data, i, input, j, k, length, palette, v, _ref;

		colors = this.colors;
		palette = null;
		alpha = this.hasAlphaChannel;

		if (this.palette.length) {
			palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = decodePalette();
			colors = 4;
			alpha = true;
		}

		data = imageData.data || imageData;
		length = data.length;
		input = palette || pixels;
		i = j = 0;

		if (colors === 1) {
			while (i < length) {
				k = palette ? pixels[i / 4] * 4 : j;
				v = input[k++];
				data[i++] = v;
				data[i++] = v;
				data[i++] = v;
				data[i++] = alpha ? input[k++] : 255;
				j = k;
			}
		} else {
			while (i < length) {
				k = palette ? pixels[i / 4] * 4 : j;
				data[i++] = input[k++];
				data[i++] = input[k++];
				data[i++] = input[k++];
				data[i++] = alpha ? input[k++] : 255;
				j = k;
			}
		}
	};

	customPNG.prototype.decode = function () {
		var ret;
		ret = new Uint8Array(this.width * this.height * 4);
		this.copyToImageData(ret, decodePixels());
		return ret;
	};

	try {
		scratchCanvas = global.document.createElement('canvas');
		scratchCtx = scratchCanvas.getContext('2d');
	} catch (e) {
		return -1;
	}

	makeImage = function makeImage(imageData) {
		var img;
		scratchCtx.width = imageData.width;
		scratchCtx.height = imageData.height;
		scratchCtx.clearRect(0, 0, imageData.width, imageData.height);
		scratchCtx.putImageData(imageData, 0, 0);
		img = new Image();
		img.src = scratchCanvas.toDataURL();
		return img;
	};

	customPNG.prototype.decodeFrames = function (ctx) {
		var frame, i, imageData, pixels, _i, _len, _ref, _results;

		if (!this.animation) {
			return;
		}

		_ref = this.animation.frames;
		_results = [];

		for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
			frame = _ref[i];
			imageData = ctx.createImageData(frame.width, frame.height);
			pixels = decodePixels(new Uint8Array(frame.data));
			this.copyToImageData(imageData, pixels);
			frame.imageData = imageData;

			_results.push(frame.image = makeImage(imageData));
		}

		return _results;
	};

	customPNG.prototype.renderFrame = function (ctx, number) {
		var frame, frames, prev;
		frames = this.animation.frames;
		frame = frames[number];
		prev = frames[number - 1];

		if (number === 0) {
			ctx.clearRect(0, 0, this.width, this.height);
		}

		if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_BACKGROUND) {
			ctx.clearRect(prev.xOffset, prev.yOffset, prev.width, prev.height);
		} else if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_PREVIOUS) {
			ctx.putImageData(prev.imageData, prev.xOffset, prev.yOffset);
		}

		if (frame.blendOp === APNG_BLEND_OP_SOURCE) {
			ctx.clearRect(frame.xOffset, frame.yOffset, frame.width, frame.height);
		}

		return ctx.drawImage(frame.image, frame.xOffset, frame.yOffset);
	};

	customPNG.prototype.animate = function (ctx) {
		var _doFrame,
			frameNumber,
			frames,
			numFrames,
			numPlays,
			_ref,
			_this = this;

		frameNumber = 0;
		_ref = this.animation, numFrames = _ref.numFrames, frames = _ref.frames, numPlays = _ref.numPlays;
		return (_doFrame = function doFrame() {
			var f, frame;
			f = frameNumber++ % numFrames;
			frame = frames[f];

			_this.renderFrame(ctx, f);

			if (numFrames > 1 && frameNumber / numFrames < numPlays) {
				return _this.animation._timeout = setTimeout(_doFrame, frame.delay);
			}
		})();
	};

	customPNG.prototype.stopAnimation = function () {
		var _ref;

		return clearTimeout((_ref = this.animation) != null ? _ref._timeout : void 0);
	};

	customPNG.prototype.render = function (canvas) {
		var ctx, data;

		if (canvas._png) {
			canvas._png.stopAnimation();
		}

		canvas._png = this;
		canvas.width = this.width;
		canvas.height = this.height;
		ctx = canvas.getContext("2d");

		if (this.animation) {
			decodeFrames(ctx);
			return this.animate(ctx);
		} else {
			data = ctx.createImageData(this.width, this.height);
			this.copyToImageData(data, decodePixels());
			return ctx.putImageData(data, 0, 0);
		}
	};

	return customPNG;
}();

function compressBytes(bytes, lineLength, colorsPerPixel, compression) {
	var level = 5,
		filter_method = filterUp;

	switch (compression) {
		case image_compression.FAST:
			level = 3;
			filter_method = filterSub;
			break;

		case image_compression.MEDIUM:
			level = 6;
			filter_method = filterAverage;
			break;

		case image_compression.SLOW:
			level = 9;
			filter_method = filterPaeth; //uses to sum to choose best filter for each line
			break;
	}
	bytes = applyPngFilterMethod(bytes, lineLength, colorsPerPixel, filter_method);
	var header = new Uint8Array(createZlibHeader(level));
	var checksum = adler32(bytes);
	var deflate = new Deflater(level);
	var a = deflate.append(bytes);
	var cBytes = deflate.flush();
	var len = header.length + a.length + cBytes.length;
	var cmpd = new Uint8Array(len + 4);
	cmpd.set(header);
	cmpd.set(a, header.length);
	cmpd.set(cBytes, header.length + a.length);
	cmpd[len++] = checksum >>> 24 & 0xff;
	cmpd[len++] = checksum >>> 16 & 0xff;
	cmpd[len++] = checksum >>> 8 & 0xff;
	cmpd[len++] = checksum & 0xff;
	return arrayBufferToBinaryString(cmpd);
}

function sHashCode(str) {
	str = str || "";
	var hash = 0,
		i,
		chr;
	if (str.length === 0) return hash;

	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}

	return hash;
}

function processDataByFilters(origData, filterChain) {

	var i = 0;
	var data = origData || '';
	var reverseChain = [];
	filterChain = filterChain || [];

	if (typeof filterChain === "string") {
		filterChain = [filterChain];
	}

	let ret = FlateEncode(data)
	return {
		data: ret,
		reverseChain: reverseChain.reverse().join(" ")
	};
}

/**
 * @param imageData {string}  图片base64字符串
 * */
function generateAliasFromImageData(imageData) {
	if (typeof imageData === 'string') {
		return sHashCode(imageData);
	}

	if (isArrayBufferView(imageData)) {
		return sHashCode(arrayBufferToBinaryString(imageData));
	}
	return null;
}

function getPredictorFromCompression(compression) {
	var predictor;

	switch (compression) {
		case image_compression.FAST:
			predictor = 11;
			break;

		case image_compression.MEDIUM:
			predictor = 13;
			break;

		case image_compression.SLOW:
			predictor = 14;
			break;

		default:
			predictor = 12;
			break;
	}

	return predictor;
};


function processPNG(imageData, imageIndex, alias, compression) {

	var colorSpace = color_spaces.DEVICE_RGB,
		decode = DECODE.FLATE_DECODE,
		bpc = 8,
		img,
		dp,
		trns,
		colors,
		pal,
		smask;
	if (isArrayBuffer(imageData)) imageData = new Uint8Array(imageData);

	if (isArrayBufferView(imageData)) {
		// if (doesNotHavePngJS()) throw new Error("PNG support requires png.js and zlib.js");
		img = new customPNG(imageData);
		imageData = img.imgData;
		bpc = img.bits;
		colorSpace = img.colorSpace;
		colors = img.colors; //logImg(img);
		/*
		 * colorType 6 - Each pixel is an R,G,B triple, followed by an alpha sample.
		 *
		 * colorType 4 - Each pixel is a grayscale sample, followed by an alpha sample.
		 *
		 * Extract alpha to create two separate images, using the alpha as a sMask
		 */

		if ([4, 6].indexOf(img.colorType) !== -1) {
			/*
			 * processes 8 bit RGBA and grayscale + alpha images
			 */
			if (img.bits === 8) {
				var pixels = img.pixelBitlength == 32 ? new Uint32Array(img.decodePixels().buffer) : img.pixelBitlength == 16 ? new Uint16Array(img.decodePixels().buffer) : new Uint8Array(img.decodePixels().buffer),
					len = pixels.length,
					imgData = new Uint8Array(len * img.colors),
					alphaData = new Uint8Array(len),
					pDiff = img.pixelBitlength - img.bits,
					i = 0,
					n = 0,
					pixel,
					pbl;

				for (; i < len; i++) {
					pixel = pixels[i];
					pbl = 0;

					while (pbl < pDiff) {
						imgData[n++] = pixel >>> pbl & 0xff;
						pbl = pbl + img.bits;
					}

					alphaData[i] = pixel >>> pbl & 0xff;
				}
			}
			/*
			 * processes 16 bit RGBA and grayscale + alpha images
			 */

			imageData = imgData;
			smask = alphaData;
			decode = null;
		}
		/*
		 * Indexed png. Each pixel is a palette index.
		 */

		if (img.colorType === 3) {
			colorSpace = this.color_spaces.INDEXED;
			pal = img.palette;

			if (img.transparency.indexed) {
				var trans = img.transparency.indexed;
				var total = 0,
					i = 0,
					len = trans.length;

				for (; i < len; ++i) {
					total += trans[i];
				}

				total = total / 255;
				/*
				 * a single color is specified as 100% transparent (0),
				 * so we set trns to use a /Mask with that index
				 */

				if (total === len - 1 && trans.indexOf(0) !== -1) {
					trns = [trans.indexOf(0)];
					/*
					 * there's more than one colour within the palette that specifies
					 * a transparency value less than 255, so we unroll the pixels to create an image sMask
					 */
				} else if (total !== len) {
					var pixels = img.decodePixels(),
						alphaData = new Uint8Array(pixels.length),
						i = 0,
						len = pixels.length;

					for (; i < len; i++) {
						alphaData[i] = trans[pixels[i]];
					}
					smask = compressBytes(alphaData, img.width, 1);
				}
			}
		}

		var predictor = getPredictorFromCompression(compression);

		if (isArrayBuffer(imageData) || isArrayBufferView(imageData)) imageData = arrayBufferToBinaryString(imageData);
		if (smask && isArrayBuffer(smask) || isArrayBufferView(smask)) {
			smask = arrayBufferToBinaryString(smask);
		}
		return createImageInfo(imageData, img.width, img.height, colorSpace, bpc, decode, imageIndex, alias, dp, trns, pal, smask, predictor);
	}

	throw new Error("Unsupported PNG image data, try using JPEG instead.");
};

function createImageInfo(data, wd, ht, cs, bpc, f, imageIndex, alias, dp, trns, pal, smask, p) {
	var info = {
		alias: alias,
		w: wd,
		h: ht,
		cs: cs,
		bpc: bpc,
		i: imageIndex,
		data: data // n: objectNumber will be added by putImage code

	};
	if (f) info.f = f;
	if (dp) info.dp = dp;
	if (trns) info.trns = trns;
	if (pal) info.pal = pal;
	if (smask) info.smask = smask;
	if (p) info.p = p; // predictor parameter for PNG compression
	return info;
}

/**
 * SVG绘制PDF
 *
 * */
function paintPDFWithSVG() {
	// 使用svg绘制PDF
	let vm = this;
	var promise = Promise.resolve();
	for (var i = 1; i <= this.pages; i++) {
		if (document.querySelector('[name="page=' + i + '"]')) {
			let container = document.querySelector('[name="page=' + i + '"]').children[0];
			var viewport = vm.pdfPage.getViewport(vm.scale);
			document.querySelector('.pageContainer').children[0].width.baseVal.value = viewport.width;
			document.querySelector('.pageContainer').children[0].height.baseVal.value = viewport.height;
			container.style.width = viewport.width + 'px';
			container.style.height = viewport.height + 'px';
			document.querySelector('.scroll-content-info').style.width = document.querySelector('.pageContainer').getBoundingClientRect().width + 'px';
			return;
		}
		var anchor = document.createElement('a');
		anchor.setAttribute('name', 'page=' + i);
		anchor.setAttribute('class', 'pdfATag');
		anchor.setAttribute('title', 'Page ' + i);
		document.getElementsByClassName("scroll-content-info")[0].appendChild(anchor);

		// Using promise to fetch and render the next page
		promise = promise.then(function (pageNum, anchor) {
			return pdf.getPage(pageNum).then(function (page) {
				vm.pdfPage = page;
				var viewport = page.getViewport(vm.scale);
				var container = document.createElement('div');
				container.id = 'pageContainer' + pageNum;
				container.className = 'pageContainer';
				container.style.width = viewport.width + 'px';
				container.style.height = viewport.height + 'px';
				anchor.appendChild(container);

				return page.getOperatorList().then(function (opList) {
					console.log("=== page.objs>>>>>", page.objs)
					var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
					return svgGfx.getSVG(opList, viewport).then(function (svg) {
						container.appendChild(svg);
						document.querySelector('.scroll-content-info').style.width = document.querySelector('.pageContainer').getBoundingClientRect().width + 'px';
						// vm.$refs.scroll.refresh();
						// Util.setLoading(!1);
						// !vm.pdfWaterMark && Util.getUserInfo(vm.addWaterMarker);
					});
				});
			});
		}.bind(null, i, anchor));
	}
}

/**
 * 绘制签章
 * @param context {object} - canvas上下文
 * @param canvas {Canvas} - canvas对象
 * @param img {Image} - 绘制进canvas的image对象
 * @param anchorX {number} - 绘制图片的锚点(此处为左上角)x坐标
 * @param anchorY {number} - 绘制图片的锚点(此处为左上角)y坐标
 * @param width {number} - 绘制图片的宽度
 * @param height {number} - 绘制图片的高度
 * @param frameColor {color string} - 显示图片边框颜色
 * @param cornerColor {color string} - 显示图片四个角拉伸标识的颜色
 * @param pxRatio {number} - 屏幕像素比例
 * @param resizeable {boolean} - 是否显示可调整标识
 *
 * */
function drawStamper(context, canvas, img, anchorX, anchorY, width, height, frameColor, cornerColor, pxRatio, resizeable) {
	if(!pxRatio) {
		pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
	}

	if(window.innerWidth > 800) {
		pxRatio = 1
	}

	let frameWidth = 1;
	let cornerWidth = 3;
	anchorX *= pxRatio;
	anchorY *= pxRatio;
	width *= pxRatio;
	height *= pxRatio;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, anchorX, anchorY, width, height)
	// 给签章描绘一个边框
	context.lineWidth = frameWidth;
	context.strokeStyle = frameColor;
	context.strokeRect(anchorX - 1, anchorY - 1, width + 2, height + 2)

	if(!resizeable) {
		return;
	}
	// 给四个角绘制可拖动角标
	context.lineWidth = cornerWidth;
	context.strokeStyle = cornerColor;
	// 1、绘制左边线靠上部分
	context.beginPath();
	context.moveTo(anchorX - 1, anchorY - 2);
	context.lineTo(anchorX - 1, anchorY + 20);
	context.closePath();
	context.stroke(); //绘制定义的图形

	// 2、绘制上边线靠左部分
	context.beginPath();
	context.moveTo(anchorX - 2, anchorY - 2);
	context.lineTo(anchorX + 20, anchorY - 2);
	context.closePath();
	context.stroke(); //绘制定义的图形

	// 3、绘制上边线靠右部分
	context.beginPath();
	context.moveTo(anchorX + width + 2, anchorY - 2);
	context.lineTo(anchorX + width - 20, anchorY - 2);
	context.closePath();
	context.stroke(); //绘制定义的图形

	// 4、绘制右边线靠上部分
	context.beginPath();
	context.moveTo(anchorX + width + 1, anchorY - 2);
	context.lineTo(anchorX + width + 1, anchorY + 20);
	context.closePath();
	context.stroke(); //绘制定义的图形

	// 5、绘制右边线靠下部分
	context.beginPath();
	context.moveTo(anchorX + width + 1, anchorY + height + 2);
	context.lineTo(anchorX + width + 1, anchorY + height - 20);
	context.closePath();
	context.stroke(); //绘制定义的图形

	// 6、绘制下边线靠右部分
	context.beginPath();
	context.moveTo(anchorX + width + 2, anchorY + height + 1);
	context.lineTo(anchorX + width - 20, anchorY + height + 1);
	context.closePath();
	context.stroke(); //绘制定义的图形

	// 7、绘制下边线靠左部分
	context.beginPath();
	context.moveTo(anchorX - 2, anchorY + height + 1);
	context.lineTo(anchorX + 20, anchorY + height + 1);
	context.closePath();
	context.stroke(); //绘制定义的图形

	// 8、绘制左边线靠下部分
	context.beginPath();
	context.moveTo(anchorX - 1, anchorY + height);
	context.lineTo(anchorX - 1, anchorY + height - 20);
	context.closePath();
	context.stroke(); //绘制定义的图形

}

export default {
	convertStringToImageData,
	binaryStringToUint8Array,
	generateAliasFromImageData,
	processPNG,
	processDataByFilters,
	drawStamper,
	arrayBufferToBinaryString,
	defaultPfxCert
}
