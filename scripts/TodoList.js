import {TodoItem} from './TodoItem';

/*
TodoList Class:

Attribute:
	- name: String, name of the TodoList
	- items: an array of TodoItems
*/

export class TodoList {
	constructor(name) {
		this.name = name;
		this.items = [];
	}

	addItem(itemName) {
		let newItem = new TodoItem(itemName);
		this.items.push(newItem);
		return newItem;
	}

	getItem(itemIndex) {
		return items[itemIndex];
	}

	toggleCompleteItem(itemIndex) {
		if(items[itemIndex].isCompleted) {
			items[itemIndex].isCompleted = false;
		} else {
			items[itemIndex].isCompleted = true;
		}
	}

	completeItem(itemIndex) {
		items[itemIndex].isCompleted = true;
	}

	uncompleteItem(itemIndex) {
		items[itemIndex].isCompleted = false;
	}

	deleteItem(itemIndex) {
		this.items[itemIndex].isDeleted = true;
	}

	setName(name) {
		this.name = name;
	}
}
