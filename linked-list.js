export default class LinkedList {
	headNode = null;
	listSize = 0;

	get head() {
		return this.headNode;
	}

	get tail() {
		if (this.listSize <= 0) return null;
		return this.at(this.listSize - 1);
	}

	get size() {
		return this.listSize;
	}

	append(value) {
		const node = new Node(value);

		if (this.headNode === null) {
			this.headNode = node;
			this.tailNode = node;
		} else {
			this.tailNode.nextNode = node;
			this.tailNode = node;
		}

		this.listSize++;
	}

	prepend(value) {
		const node = new Node(value);

		if (this.headNode === null) {
			this.headNode = node;
			this.tailNode = node;
		} else {
			node.nextNode = this.headNode;
			this.headNode = node;
		}

		this.listSize++;
	}

	pop() {
		if (this.listSize === 0) return;

		if (this.listSize === 1) {
			this.headNode = null;
			this.tailNode = null;
		} else {
			const newTailNode = this.at(this.listSize - 2);
			newTailNode.nextNode = null;
			this.tailNode = newTailNode;
		}

		this.listSize--;
	}

	at(index) {
		if (index >= this.listSize || index < 0) return null;

		function getNode(node, i) {
			if (i === 0) return node;

			return getNode(node.nextNode, i - 1);
		}

		return getNode(this.headNode, index);
	}

	contains(value) {
		function getNode(node, val) {
			if (node === null) return false;
			if (node.value === val) return true;

			return getNode(node.nextNode, val);
		}

		return getNode(this.headNode, value);
	}

	find(value) {
		function getNode(node, val, i) {
			if (node === null) return null;
			if (node.value === val) return i;

			return getNode(node.nextNode, val, i + 1);
		}

		return getNode(this.headNode, value, 0);
	}

	toString() {
		function getNode(node) {
			if (node === null) return "null";

			return `( ${node.value} ) -> ${getNode(node.nextNode)}`;
		}

		return getNode(this.headNode);
	}

	insertAt(value, index) {
		if (index >= this.listSize) {
			this.append(value);
			return;
		}

		const node = new Node(value);

		if (index <= 0) {
			node.nextNode = this.headNode;
			this.headNode = node;
		} else {
			const prevNode = this.at(index - 1);
			node.nextNode = prevNode.nextNode;
			prevNode.nextNode = node;
		}

		this.listSize++;
	}

	removeAt(index) {
		if (index >= this.listSize || index < 0) return;

		const prevNode = this.at(index - 1);
		const currentNode = prevNode ? prevNode.nextNode : this.at(index);
		const nextNode = prevNode ? currentNode.nextNode : null;

		if (prevNode || nextNode) {
			prevNode.nextNode = nextNode;
		} else if (!prevNode) {
			this.headNode = currentNode.nextNode;

			if (nextNode) node.nextNode = nextNode;
		} else {
			if (prevNode) prevNode.nextNode = null;
		}

		this.listSize--;
	}
}

class Node {
	value = null;
	nextNode = null;

	constructor(value = null, nextNode = null) {
		this.value = value;
		this.nextNode = nextNode;
	}

	get value() {
		return this.value;
	}

	set nextNode(node) {
		this.nextNode = node;
	}
}
