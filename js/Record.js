var Record = function() {};

Record.prototype = {
	id: null, 		//this makes mass assigning record id really easy. Should this be a concern?
	fname: null,
	lname: null,

	populate: function(fname, lname) //populate record object
	{
		this.fname = fname;
		this.lname = lname;

	},

	write: function() //writes record to localStorage
	{
		if (this.fname === null && this.lname === null) {
			throw new Error("Record not populated.")
		} else {
			var record = {
				fname: this.fname,
				lname: this.lname
			};
		}

		localStorage.setItem(this.id, JSON.stringify(record));
	},


	load: function(id) //retrieves record from localStorage based on id
	{
		var recordJ = localStorage.getItem(id);
		var record = JSON.parse(recordJ);
		this.id = id;
		this.fname = record.fname;
		this.lname = record.lname;
	},

	remove: function() //removes record from localStorage; record must be loaded first.
	{
		localStorage.removeItem(this.id);
	}
}