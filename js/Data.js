var Data = function() {};

Data.prototype = {

	createRecord: function(fname, lname)
	{
		var record = new Record();
		record.populate(fname, lname);
		record.id = index.hash(index.incrSeq());
		if (index.checkInIndex(record.id)) {
			throw new Error("The record already exists.");
		} else {
			record.write();
			index.appendIndex(record.id);
		}

		return record;
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

	updateRecord: function(id, fname, lname)
	{
		var record = new Record();
		if (index.checkInIndex(id)){
			record.load(id);
			record.populate(fname, lname);
			record.write();
		} else {
			throw new Error("Record not found.");
		}

		return record;
	},

	deleteRecord: function(id)
	{
		var record = new Record();
		if (index.checkInIndex(id)) {
			record.load(id);
			record.remove();
			index.removeFromIndex(id);
		} else {
			throw new Error("Record not found.");
		}

		return record;
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