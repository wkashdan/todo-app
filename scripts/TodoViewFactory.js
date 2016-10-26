/*

TodoViewFactory Class:

This class helps generate commonly DOM elements imperatively for the use
of the application. This class is priamrily used by the TodoViewSetter.

Methods in this class take in javascript objects and produce their HTML DOM
counterparts.

A class like this does not typically exist if using a JavaScript framework.

==========================================================
THIS SHOULD FOLLOW A SINGLETON PATTERN THOUGH NOT ENFORCED
========================================================== 

*/

export class TodoViewFactory {
	constructor(){}

	listsToListMenuItemAr(lists) {
		console.log("Entering listsToListMenuItemAr");
		let listMenuItemAr = [];

		for(let list in lists) {
			listMenuItemAr.push(this.listToListMenuItem(lists[list]));
		}

		return listMenuItemAr;
	}

	listToListMenuItem(list) {
		let listEl = document.createElement('li');
		listEl.innerHTML = list.name;
		listEl.setAttribute('data-list-name', list.name);
		listEl.setAttribute('data-el-type', 'myListEl');
		listEl.classList.add('mylist-el');
		return listEl;
	}

	itemToSelectedListItemEl(item, pos) {
		let itemEl = document.createElement('li');
		let itemNameEl = document.createElement('span');
		let itemCheckBox = document.createElement('div');
		let itemDeleteBtn = document.createElement('div');

		itemEl.setAttribute('data-ar-pos', pos);
		itemEl.setAttribute('data-el-type','listItemEl');
		itemNameEl.setAttribute('data-el-type','listItemName');
		itemCheckBox.setAttribute('data-el-type','listItemCheckBox');
		itemDeleteBtn.setAttribute('data-el-type','listItemDeleteBtn');

		itemCheckBox.classList.add('item-checkbox');
		itemEl.classList.add('active-list-item');
		itemDeleteBtn.classList.add('delete-button');

		itemNameEl.innerHTML = item.name;
		itemDeleteBtn.innerHTML = 'X';

		if(item.isComplete) {
			itemEl.classList.add('item-completed');
			itemCheckBox.classList.add('item-checkbox-checked');
		}

		itemEl.appendChild(itemCheckBox);
		itemEl.appendChild(itemNameEl);
		itemEl.appendChild(itemDeleteBtn);

		return itemEl;
	}
}