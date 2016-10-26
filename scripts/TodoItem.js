/*
TodoItem Class: 

Attributes:
	- name: string that represents the name of the TodoItem
	- isComplete: boolean, true if TodoItem is completed
	- isDelete: boolean, true if TodoItem is logically deleted
*/

export class TodoItem {
	constructor(name) {
		this.name = name;
		this.isComplete = false;
		this.isDeleted = false;
	}
}