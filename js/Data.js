var Data = function(fname, lname) {
	if (fname || lname) this._createRecord(fname, lname);
};

Data.prototype = {

	_createRecord: function(fname, lname)
	{
		var record = new Record(fname, lname);
		index.appendIndex(record.id);
	},

	readRecord: function(id)
	{
		var record = new Record();
		if (index.checkInIndex(id)){
			record.load(id);
		} else {
			throw new Error("Record not found.");
		}

		return record;
	},

	updateRecord: function(fname_new, lname_new, id)
	{
		var record = new Record();
		if (index.checkInIndex(id)){
			record.update(fname_new, lname_new, id);
		} else {
			throw new Error("Record not found.");
		}
		return record;
	},

	deleteRecord: function(id)
	{
		var record = new Record();
		if (index.checkInIndex(id)) {
			record.remove(id);
			index.deleteFromIndex(id);
		} else {
			throw new Error("Record not found.");
		}
	},

	readAll: function()
	{
		var ind = index.loadIndex();
		var records = [];
		if (ind) {
			for (var i = 0; i < ind.length; i++) {
				var record = localStorage.getItem(ind[i]);
				records.push(record);
			}
		}
		return records;
	},

	clear: function()
	{
		localStorage.clear();
	}

}