import {TodoViewFactory} from './TodoViewFactory';

/*

TodoViewSetter Class:

Helps application control view logic, and keeps track of data related to the view.

==========================================================
THIS SHOULD FOLLOW A SINGLETON PATTERN THOUGH NOT ENFORCED
==========================================================

*/

export class TodoViewSetter {

	constructor(todoViewFac) {
		this.todoViewFac = todoViewFac;
		this.activeMenuListItem = null;
		this.activeSelectedItem = null;
	}

	setListsMenu(lists) {
		let listMenu = document.getElementById('listMenu');
		let listMenuItemAr = this.todoViewFac.listsToListMenuItemAr(lists);
		this.activeMenuListItem = listMenuItemAr[0];

		listMenuItemAr.forEach(function(menuItemEl) {
			listMenu.appendChild(menuItemEl);
		});

		this.activeMenuListItem.classList.add('active-list-item-selected');

		return this;
	}

	setSelectedList(list) {
		let todoViewFac = this.todoViewFac;
		let selectedListHeader = document.getElementById('listHeader');
		let listTitle = document.createElement('h2');
		listTitle.innerHTML = list.name;

		listTitle.classList.add('list-title', 'pull-left');

		let listDeleteBtn = document.createElement('button');
		listDeleteBtn.innerHTML = 'Delete List';
		listDeleteBtn.setAttribute('data-el-type','listDeleteBtn');
		listDeleteBtn.classList.add('delete-list-button','pull-right');

		selectedListHeader.innerHTML = '';
		selectedListHeader.appendChild(listTitle);
		selectedListHeader.appendChild(listDeleteBtn);

		let selectedListEl = document.getElementById('selectedListEl');;
		selectedListEl.innerHTML = '';

		list.items.forEach(function(item, pos){
			if(!item.isDeleted) {
				selectedListEl.appendChild(
					todoViewFac
						.itemToSelectedListItemEl(item, pos));
			}
		});
		return this;
	}

	addNewList(list) {
		let listMenu = document.getElementById('listMenu');
		let listMenuItem = this.todoViewFac.listToListMenuItem(list);
		listMenuItem.classList.add('fade-in');
		listMenu.appendChild(listMenuItem);
		return listMenuItem;
	}

	setActiveListMenuItem(listMenuEl) {
		this.activeMenuListItem.classList.remove('active-list-item-selected');
		listMenuEl.classList.add('active-list-item-selected');
		this.activeMenuListItem = listMenuEl;
	}

	setActiveSelectedItem(listItemEl) {
		if(this.activeSelectedItem !== null) {
			this.activeSelectedItem.classList.remove('active-list-item-selected');
		}
		listItemEl.classList.add('active-list-item-selected');
		this.activeSelectedItem = listItemEl;
	}

	addNewItem(item, pos) {
		let selectedList = document.getElementById('selectedListEl');
		let selectedListItem = this.todoViewFac.itemToSelectedListItemEl(item, pos);
		selectedListItem.classList.add('fade-in')
		selectedList.appendChild(selectedListItem);
		window.setTimeout(function(){selectedListItem.classList.remove('fade-in')},250)
	}

	setToggleItemComplete(itemEl, isComplete) {
		if(isComplete) {
			itemEl.classList.remove('checked-fadein');
			itemEl.classList.add('item-completed');
			itemEl.firstElementChild.classList.add('item-checkbox-checked');
		} else {
			itemEl.classList.add('checked-fadein');
			itemEl.classList.remove('item-completed');
			itemEl.firstElementChild.classList.remove('item-checkbox-checked');
		
		}
	}

	deleteItem(itemEl) {
		itemEl.classList.add('fadeout-el');
		window.setTimeout(function(){itemEl.remove();},500);
	}

	deleteSelectedListMenuItem() {
		let listToRemove = this.activeMenuListItem;
		let todoViewSetter = this;
		listToRemove.remove();
		let listToSelect = document.getElementById('listMenu').firstElementChild;
		todoViewSetter.setActiveListMenuItem(listToSelect);
	}
}