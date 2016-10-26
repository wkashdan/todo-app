import {TodoList} from './TodoList';

/*

TodoService Singleton Class: This class is used to interface with the localStorage
HTML5 api for the TodoApp Web Application

*/

export class TodoService {
	constructor(){}

	/* Purpose: to get TodoList data from localStorage API if it exists
		- First checks to see if localStorage API exists
		- Then checks if data exists in the localStorage API
	*/
	getLists() {

		let lists = {};
		console.log('Entering get lists function');
		if(typeof(Storage) !== 'undefined') {
			let rawLists = this.getLocalStore('lists');
			if(rawLists !== null && Object.keys(rawLists).length > 0) {
				for(let listName in rawLists) {
					lists[listName] = new TodoList(listName);
					lists[listName].items = rawLists[listName].items;
				}
			} else {
				lists['First List'] = new TodoList('First List');
			} 
		} else {
			console.log('Storage undefined');
			lists['First List'] = new TodoList('First List'); 
		}
		console.log(lists);
		return lists;
	}

	getLocalStore(key, obj) {
	  if(typeof(Storage) !== 'undefined') {
	    return JSON.parse(localStorage.getItem(key));
	  } else {
	    return null;
	  }
	}

	setLocalStore(key, obj) {
	  if(typeof(Storage) !== 'undefined') {
	    localStorage.setItem(key, JSON.stringify(obj));
	  }
	  return obj;
	}

	saveListsToLocalStore(lists) {
		this.setLocalStore('lists',lists);
	}

}