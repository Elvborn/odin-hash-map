import LinkedList from "./linked-list.js";

class HashMap {
	loadFactor = 0.8;
	capacity = 16;

	buckets = [];

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode =
				(primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	set(key, value) {
		const index = this.hash(key);

		if (index < 0 || index >= this.capacity) {
			throw new Error(
				"Trying to access index out of bounds. Index: " + index
			);
		}

		if (this.buckets[index] === undefined) {
			this.buckets[index] = new LinkedList();
		}

		for (let i = 0; i < this.buckets[index].size; i++) {
			if (this.buckets[index].at(i).value.key === key) {
				this.buckets[index].at(i).value.value = value;
				return;
			}
		}

		this.buckets[index].append({ key, value });

		// Expand capacity if load factor is exceeded
		if (this.loadFactor * this.capacity <= this.length()) {
			this.capacity = this.capacity * 2;

			const oldData = this.buckets;
			this.clear();

			oldData.forEach((bucket) => {
				for (let i = 0; i < bucket.size; i++) {
					this.set(bucket.at(i).value.key, bucket.at(i).value.value);
				}
			});
		}
	}

	get(key) {
		const index = this.hash(key);

		if (this.buckets[index] === undefined) return null;

		for (let i = 0; i < this.buckets[index].size; i++) {
			if (this.buckets[index].at(i).value.key === key) {
				return this.buckets[index].at(i).value.value;
			}
		}

		return null;
	}

	has(key) {
		const index = this.hash(key);

		if (this.buckets[index] === undefined) return false;

		for (let i = 0; i < this.buckets[index].size; i++) {
			if (this.buckets[index].at(i).value.key === key) return true;
		}

		return false;
	}

	remove(key) {
		const index = this.hash(key);

		if (this.buckets[index] === undefined) return false;

		for (let i = 0; i < this.buckets[index].size; i++) {
			if (this.buckets[index].at(i).value.key === key) {
				this.buckets[index].removeAt(i);
				return true;
			}
		}

		return false;
	}

	length() {
		return this.buckets.reduce((total, bucket) => {
			return (total += bucket.size);
		}, 0);
	}

	clear() {
		this.buckets = [];
	}

	keys() {
		let keys = [];
		this.buckets.forEach((bucket) => {
			for (let i = 0; i < bucket.size; i++) {
				keys.push(bucket.at(i).value.key);
			}
		});

		return keys;
	}

	values() {
		let values = [];
		this.buckets.forEach((bucket) => {
			for (let i = 0; i < bucket.size; i++) {
				values.push(bucket.at(i).value.value);
			}
		});

		return values;
	}

	entries() {
		let entries = [];
		this.buckets.forEach((bucket) => {
			for (let i = 0; i < bucket.size; i++) {
				const item = bucket.at(i);
				entries.push([item.value.key, item.value.value]);
			}
		});

		return entries;
	}
}

const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "blue");
map.set("kite", "pink");
map.set("lion", "golden");
map.set("moon", "silver");

console.log("Length: " + map.length());
console.log("Capacity: " + map.capacity);
console.log(map.entries());
