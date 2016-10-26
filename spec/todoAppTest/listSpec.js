import {List} from '../../dist/List';
import {Item} from '../../dist/Item';
var ToDoService = require('../../dist/ToDoService.js');

describe("Todo App",function() {
	var myList = new List("My List");
	var myItem = new Item("My Item");
	console.log(this.process.title);

	it("should have a List with name, items, and isDeleted should be false", function() {
		expect(myList.name).toEqual("My List");
		expect(myList.items).toEqual([]);
		expect(myList.isDeleted).toBe(false);
	});

	it("should have an Item with name, isComplete false, and isDeleted false", function() {
		expect(myItem.name).toEqual("My Item");
		expect(myItem.isComplete).toBe(false);
		expect(myItem.isDeleted).toBe(false);
	})
})