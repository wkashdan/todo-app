import {TodoService} from './TodoService';
import {TodoAppData} from './TodoAppData';
import {TodoViewFactory} from './TodoViewFactory';
import {TodoViewSetter} from './TodoViewSetter';
import {TodoList} from './TodoList';

/*==================================
app.js contains the application logic
===================================*/

/*
Waits for DOM to be loaded, other resources are still loading
*/
document.onreadystatechange = function() {
	if(document.readyState === 'interactive') {
		main();
	}
}

/*
Equivalent of a main method
*/
function main() {

	//======================================
	//THE FOLLOWING SHOULD ALL BE SINGLETONS
	//======================================

	//A service to get data and set data from localStorage API
	let todoService = new TodoService();
	//The todoApp Data model
	let todoAppData = new TodoAppData(todoService.getLists());
	//A class that helps create DOM elements imperatively
	let todoViewFactory = new TodoViewFactory();
	//Helps controll the view of the application
	let todoViewSetter = new TodoViewSetter(todoViewFactory);

	//initializes the view
	todoViewSetter
		.setListsMenu(todoAppData.lists)
		.setSelectedList(todoAppData.selectedList);

	//sets event listeners
	setListeners(todoAppData, todoViewSetter, todoService);
}

/*
This function sets all the event listeners for the app.
Future change: to create an TodoEventManager class for all event logic
*/
function setListeners(todoAppData, todoViewSetter, todoService) {

	setEventForId('submit','myListForm',function(event) {
		event.preventDefault();
		let listName = event.target.mylistInput.value;
		if(!todoAppData.lists.hasOwnProperty(listName)) {
			handleCreateNewList(listName, todoAppData, todoService, todoViewSetter);
			event.target.reset();
		} else {
			alert('You already have a list with this name!');
		}
		
	});

	setEventForId('submit','itemForm',function(event) {
		event.preventDefault();
		let itemName = event.target.itemInput.value;
		handleCreateNewItem(itemName, todoAppData, todoService, todoViewSetter);
		event.target.reset();
	});

	

	setEventForId('click','listMenu',function(event) {
		let targetEl = event.target;
		if(targetEl.hasAttribute('data-el-type') && 
			targetEl.getAttribute('data-el-type') === 'myListEl') {
			handleSelectList(
				targetEl.getAttribute('data-list-name'), 
				targetEl,
				todoAppData,
				todoViewSetter);
		}
	});

	setEventForId('click','selectedListEl', function(event) {
		let targ = event.target;
		if(targ.hasAttribute('data-el-type')) {

			switch(targ.getAttribute('data-el-type')) {
				case 'listItemEl':
					handleSelectItem(targ.getAttribute('data-ar-pos'), 
						targ, 
						todoAppData, 
						todoViewSetter);
					break;
				case 'listItemName':
					handleSelectItem(targ.parentElement.getAttribute('data-ar-pos'), 
						targ.parentElement, 
						todoAppData, 
						todoViewSetter);
					break;
				case 'listItemCheckBox':
					handleToggleCheckItem(targ.parentElement.getAttribute('data-ar-pos'),
						targ.parentElement, 
						todoAppData,
						todoViewSetter,
						todoService);
					break;
				case 'listItemDeleteBtn':
					handleDeleteItem(targ.parentElement.getAttribute('data-ar-pos'),
						targ.parentElement,
						todoAppData,
						todoViewSetter,
						todoService);
					break;
			}
		}
	});

	document.getElementById('listHeader').addEventListener('click', function(event) {
		let targ = event.target;

		if(targ.hasAttribute('data-el-type') && 
			targ.getAttribute('data-el-type') === 'listDeleteBtn' &&
			Object.keys(todoAppData.lists).length > 1) {
			handleDeleteList(todoAppData, todoViewSetter, todoService);
		} else if(targ.hasAttribute('data-el-type') && 
			targ.getAttribute('data-el-type') === 'listDeleteBtn' &&
			Object.keys(todoAppData.lists).length === 1) {
			alert(`You only have one list left! Don't delete it!`);
		}
	})

}

/*
Purpose:This is a utility method that shortens the syntax of setting on event listener 
on an element with an ID
*/
function setEventForId(eventName, elementId, callback) {
	document.getElementById(elementId)
			.addEventListener(eventName, callback);
}

/*
Purpose: to handle the logic for creating a new list in model, view and storage
*/
function handleCreateNewList(listName, todoAppData, todoService, todoViewSetter) {
	//create new list and add it to the model
	let newList = todoAppData.addList(listName);
	//select the new list in the model
	todoAppData.setSelectedList(listName);
	//save list to persistance storage
	todoService.saveListsToLocalStore(todoAppData.lists);
	//update view for new list
	let newListMenuItemEl = todoViewSetter.addNewList(newList);
	//select the new list in the view
	todoViewSetter.setActiveListMenuItem(newListMenuItemEl);
}

/*
Purpose: to handle the model, view and storage logic for creating a new item
*/
function handleCreateNewItem(itemName, todoAppData, todoService, todoViewSetter) {
	
	//add new item to the model
	let newItem = todoAppData.selectedList.addItem(itemName);
	//persist new item to storage
	todoService.saveListsToLocalStore(todoAppData.lists);
	//add new item to view
	todoViewSetter.addNewItem(newItem, todoAppData.selectedList.items.length - 1);
}

/*
Purpose: to handle model and view logic for selecting a new list
*/
function handleSelectList(listName, listMenuItemEl, todoAppData, todoViewSetter) {
	todoAppData.setSelectedList(listName);
	todoViewSetter.setActiveListMenuItem(listMenuItemEl);
	todoViewSetter.setSelectedList(todoAppData.selectedList);
}

/*
Purpose: to handle model and view logic for selecting a new list item
*/
function handleSelectItem(itemPos, listItemEl, todoAppData, todoViewSetter) {
	todoAppData.setSelectedItem(itemPos);
	todoViewSetter.setActiveSelectedItem(listItemEl);
}

/*
Purpose: to handle the model, view, and storage logic for toggling the checkbox
for a specific list item
*/
function handleToggleCheckItem(itemPos, itemEl, todoAppData, todoViewSetter, todoService) {
	let toggledItem = todoAppData.toggleItemComplete(itemPos);
	todoService.saveListsToLocalStore(todoAppData.lists);
	todoViewSetter.setToggleItemComplete(itemEl, toggledItem.isComplete);
}

/*
Purpose: to handle the model, view and storage logic for deleting a list item
this executes a logical delete
*/
function handleDeleteItem(itemPos, itemEl, todoAppData, todoViewSetter, todoService) {
	let deleteItem = todoAppData.deleteItem(itemPos);
	todoService.saveListsToLocalStore(todoAppData.lists);
	todoViewSetter.deleteItem(itemEl);
}

/*
Purpose: to handle the model, view and storage logic for deleting a list
this executes a permanent delete
*/
function handleDeleteList(todoAppData, todoViewSetter, todoService) {
	delete todoAppData.lists[todoAppData.selectedList.name];
	todoAppData.selectedList = todoAppData.lists[Object.keys(todoAppData.lists)[0]];
	todoService.saveListsToLocalStore(todoAppData.lists);
	todoViewSetter.deleteSelectedListMenuItem();
	todoViewSetter.setSelectedList(todoAppData.selectedList);
}
