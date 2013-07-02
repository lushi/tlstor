var index = {
	_NAME: 'recordIndex',

	appendIndex: function(id) //adds Id to recordIndex
	{
		var ind = index.loadIndex() || []; //sets index to empty array if it doesn't exist yet
		ind.push(id);
		localStorage.setItem(index._NAME, JSON.stringify(ind));
	},

	loadIndex: function() //retrieves recordIndex and decodes it into an array
	{
		var indexJ = localStorage.getItem(index._NAME);
		return JSON.parse(indexJ);
	},

	checkInIndex: function(id) //checks if an Id already exists in recordIndex
	{
		var ind = index.loadIndex();
		if (ind) {
			for (var i = 0; i < ind.length; i++) {
				if (ind[i] === id) {
					return true;
				}
			}
		}
		return false;
	},

	deleteFromIndex: function(id) //removes Id from recordIndex when record is deleted
	{
		var ind = index.loadIndex();
		for (var i = 0; i < ind.length; i++) {
			if (ind[i] == id) {
				ind.splice(i, 1);
				break;
			}
		}
		localStorage.setItem(index._NAME, JSON.stringify(ind));
	}
}