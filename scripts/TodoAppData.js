import {TodoList} from './TodoList';
import {TodoItem} from './TodoItem';

/*

TodoAppData Signleton Class: the model for the TodoApp Web Application
This class contains 3 attributes and several methods (subject to chagne)

Attributes:
	- lists: the lists object is used as a map, the key being the name of the list
		and the value being a TodoList.
	- selectedList: this currently selected TodoList, should not be null
	- selectedItem: this is the currently selected TodoItem, can be null

*/

export class TodoAppData {
	constructor(lists) {
		this.lists = lists;
		this.selectedList = lists[Object.keys(lists)[0]];
		this.selectedItem = null;
	}

	addList(listName) {
		let newList = new TodoList(listName);
		this.lists[listName] = newList;
		return newList;
	}

	addItemToSelectedList(item) {
		this.selectedList.addItem(item);
	}

	selectItemInSelectedList(itemIndex) {
		this.selectedItem = this.selectedList.items[itemIndex];
	}

	setSelectedList(name) {
		this.selectedList = this.lists[name];
	}

	setSelectedItem(pos) {
		this.selectedItem = this.selectedList.items[pos];
	}

	toggleItemComplete(itemPos) {
		let item = this.selectedList.items[itemPos];
		if(item.isComplete) {
			item.isComplete = false;
		} else {
			item.isComplete = true;
		}
		return item;
	}

	deleteItem(itemPos) {
		this.selectedList.items[itemPos].isDeleted = true;
	}
}