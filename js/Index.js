var index = {
	hash: function (seq) //hashes sequence to create record Id
	{
		var s = Math.floor(157951.665025874041 * Math.pow(2, 32));
		var x = (seq+1) * s;
		var h = x >> (32-30);
		return h.toString();
	},

	incrSeq: function() //increments sequence by 1 and saves in localStorage
	{
		var currSeq = localStorage.getItem('sequence');
		var newSeq = currSeq ? (Number(currSeq) + 1) : 0;
		localStorage.setItem('sequence', newSeq);
		return newSeq;
	},

	appendIndex: function(id) //adds Id to recordIndex
	{
		var index = index.loadIndex() || []; //sets index to empty array if it doesn't exist yet
		index.push(id);
		localStorage.setItem('recordIndex', JSON.stringify(index));
	},

	loadIndex: function() //retrieves recordIndex and decodes it into an array
	{
		var indexJ = localStorage.getItem('recordIndex');
		return JSON.parse(indexJ);
	},

	checkInIndex: function(id) //checks if an Id already exists in recordIndex
	{
		var index = index.loadIndex();
		if (index) {
			for (var i = 0; i < index.length; i++) {
				if (index[i] === id) {
					return true;
				}
			}
		}
		return false;
	},

	removeFromIndex: function(id) //removes Id from recordIndex when record is deleted
	{
		var index = index.loadIndex();
		for (var i = 0; i < index.length; i++) {
			if (index[i] == id) {
				index.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('recordIndex', JSON.stringify(index));
	}
}