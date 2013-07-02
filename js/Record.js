var Record = function(fname, lname) {
	if (fname || lname) this._create(fname, lname);
};

Record.prototype = {
	_SEQUENCE: 'sequence',
	id: null,
	data: null,

	_hash: function (seq) //hashes sequence to create record Id
	{
		var s = Math.floor(157951.665025874041 * Math.pow(2, 32));
		var x = (seq+1) * s;
		var h = x >> (32-30);
		return h.toString();
	},

	_incrSeq: function() //increments sequence by 1 and saves in localStorage
	{
		var currSeq = localStorage.getItem(this._SEQUENCE);
		var newSeq = currSeq ? (Number(currSeq) + 1) : 0;
		localStorage.setItem(this._SEQUENCE, newSeq);
		return newSeq;
	},

	_setId: function()
	{
		this.id = this._hash(this._incrSeq());
	},

	_populate: function(fname, lname) //populate record object
	{
		this.data = {
			fname: fname,
			lname: lname
		}
	},

	_write: function() //writes record to localStorage
	{
		localStorage.setItem(this.id, JSON.stringify(this.data));
	},

	_create: function(fname, lname)
	{
		this._setId();
		this._populate(fname, lname);
		this.write();
	},

	load: function(id) //retrieves record from localStorage based on id
	{
		this.id = id;
		this.data = JSON.parse(localStorage.getItem(id));
	},

	update: function(fname_new, lname_new, id)
	{
		this.id = id;
		this._populate(fname_new, lname_new);
		this._write();
	},

	remove: function(id) //removes record from localStorage; record must be loaded first.
	{
		localStorage.removeItem(id);
		this.id = null;
		this.data = null;
	}
}