document.onreadystatechange = function() {
	if(document.readyState === 'interactive') {
		main();
	}
}

function main() {
	let lists = getLists();
	
	let appData = {
		lists: lists,
		selectedList: lists[Object.keys(lists)[0]],
		selectedListEl: null,
		selectedItem: null,
		selectedItemEl: null,
		myListsEl: document.getElementById('myListsEl')
	}
	setMyListsView(appData.lists, appData.myListsEl);
	selectList(appData.selectedList.name, appData.myListsEl.firstElementChild, appData);
	setListeners(appData);
}

function setListeners(appData) {
	document.getElementById('myListForm').addEventListener('submit',function(event) {
		event.preventDefault();
		let listName = event.target.mylistInput.value;
		if(!appData.lists.hasOwnProperty(listName)) {
			let myList = addListToLists(
							createList(listName), 
							appData.lists);
			let myListEl = addListToMyListView(myList);
			selectList(myList.name, myListEl, appData);
			event.target.reset();
		} else {
			alert('You already have a list with this name!');
		}
		
	});
	
	document.getElementById('itemForm').addEventListener('submit',function(event) {
		event.preventDefault();
		let listItem = addListItemToList(
			createItem(event.target.itemInput.value), 
			appData.selectedList.items);
		let itemPos = appData.selectedList.items.length - 1;
		let listItemEl = addListItemToView(listItem, itemPos);

		event.target.reset();
	});

	document.getElementById('myListsEl').addEventListener('click',function(event) {
		let targetEl = event.target;
		if(targetEl.hasAttribute('data-el-type') && 
			targetEl.getAttribute('data-el-type') === 'myListEl') {
			selectList(targetEl.getAttribute('data-list-name'), targetEl, appData);
		}
	});

	document.getElementById('selectedListEl').addEventListener('click', function(event) {
		let targ = event.target;
		if(targ.hasAttribute('data-el-type')) {

			switch(targ.getAttribute('data-el-type')) {
				case 'listItemEl':
					selectItem(targ.getAttribute('data-ar-pos'), targ, appData);
					break;
				case 'listItemName':
					selectItem(targ.parentElement.getAttribute('data-ar-pos'), 
								targ.parentElement, 
								appData);
					break;
				case 'listItemCheckBox':
					toggleCheckItem(targ.parentElement.getAttribute('data-ar-pos'),
						targ.parentElement, 
						appData.selectedList.items);
					break;
				case 'listItemDeleteBtn':
					deleteItem(targ.parentElement.getAttribute('data-ar-pos'),
						targ.parentElement,
						appData.selectedList.items);
					break;
			}
		}
	});

	document.getElementById('listHeader').addEventListener('click', function(event) {
		let targ = event.target;

		if(targ.hasAttribute('data-el-type') && 
			targ.getAttribute('data-el-type') === 'listDeleteBtn' &&
			Object.keys(appData.lists).length > 1) {
			delete appData.lists[appData.selectedList.name];
			addClass(appData.selectedListEl, 'fadeout-el');
			window.setTimeout(function() {
				appData.selectedListEl.remove();
				let myListEl = document.getElementById('myListsEl').firstElementChild;
				selectList(Object.keys(appData.lists)[0], myListEl, appData);
			}, 500)

			
		} else {
			alert(`You only have one list left! Don't delete it!`);
		}
	})

}

function getLists() {
	let lists =
	{
		'Agenda':{
			name:'Agenda',
			items:[
				{name:'Go to Gym', isComplete:false, isDeleted: false}
			],
			isDeleted: false
		}
	};

	return lists;
}

/*
* Purpose: To set the list items in the myLists element
* Consumes: a lists object, and a myLists Element
* Produces: nothing
* Action: creates a myList element for each list and 
* adds it to the myList element
* 
*/
function setMyListsView(lists, myListsEl) {
	for(list in lists) {
		myListsEl.appendChild(listToMyListEl(lists[list]));
	}
}

function listToMyListEl(list) {
	let listEl = document.createElement('li');
	listEl.innerHTML = list.name;
	listEl.setAttribute('data-list-name', list.name);
	listEl.setAttribute('data-el-type', 'myListEl');
	addClass(listEl, 'mylist-el');
	return listEl;
}

function createList(name) {
	return {
		name:name,
		items:[],
		isDeleted: false
	}
}

function addListToLists(list, lists) {
	lists[list.name] = list;
	return lists[list.name];
}

function addListToMyListView(list) {
	let myListsEl = document.getElementById('myListsEl');
	let myListEl = listToMyListEl(list);
	addClass(myListEl, 'fade-in');
	myListsEl.appendChild(myListEl);
	return myListEl;
}

function updateSelectedListView(list) {

	let selectedListHeader = document.getElementById('listHeader');

	let listTitle = document.createElement('h2');
	listTitle.innerHTML = list.name;
	addClass(listTitle, 'list-title');
	addClass(listTitle, 'pull-left');

	let listDeleteBtn = document.createElement('button');
	listDeleteBtn.innerHTML = 'Delete List';
	listDeleteBtn.setAttribute('data-el-type','listDeleteBtn');
	addClass(listDeleteBtn, 'delete-list-button');
	addClass(listDeleteBtn, 'pull-right');

	selectedListHeader.innerHTML = '';
	selectedListHeader.appendChild(listTitle);
	selectedListHeader.appendChild(listDeleteBtn);

	let selectedListEl = document.getElementById('selectedListEl');;
	selectedListEl.innerHTML = '';
	for(item in list.items) {
		if(!list.items[item].isDeleted) {
			selectedListEl.appendChild(itemToItemEl(list.items[item], item));
		}
	}
}

function itemToItemEl(item, arPosition) {
	let itemEl = document.createElement('li');
	let itemNameEl = document.createElement('span');
	let itemCheckBox = document.createElement('div');
	let itemDeleteBtn = document.createElement('div');

	itemEl.setAttribute('data-ar-pos', arPosition);
	itemEl.setAttribute('data-el-type','listItemEl');
	itemNameEl.setAttribute('data-el-type','listItemName');
	itemCheckBox.setAttribute('data-el-type','listItemCheckBox');
	itemDeleteBtn.setAttribute('data-el-type','listItemDeleteBtn');

	addClass(itemCheckBox, 'item-checkbox');
	addClass(itemEl, 'active-list-item');
	addClass(itemDeleteBtn, 'delete-button');

	itemNameEl.innerHTML = item.name;
	itemDeleteBtn.innerHTML = 'X';

	if(item.isComplete) {
		addClass(itemEl, 'item-completed');
		addClass(itemCheckBox, 'item-checkbox-checked');
	}

	itemEl.appendChild(itemCheckBox);
	itemEl.appendChild(itemNameEl);
	itemEl.appendChild(itemDeleteBtn);

	return itemEl;
}

function createItem(name) {
	return {
		name: name,
		isComplete: false,
		isDeleted: false
	}
}

function addListItemToList(listItem, items) {
	items.push(listItem);
	return items[items.length - 1];
}

function addListItemToView(listItem, arPos) {
	let myListsEl = document.getElementById('selectedListEl');
	let listItemEl = itemToItemEl(listItem, arPos);
	addClass(listItemEl, 'fade-in');
	myListsEl.appendChild(listItemEl);
	window.setTimeout(function(){removeClass(listItemEl, 'fade-in')}, 200);
	return listItemEl;
}

function selectList(listName, selectedListEl, appData) {
	appData.selectedItemEl = null;
	appData.selectedItem = null;

	let prevSelectedListEl = appData.selectedListEl;

	appData.selectedList = appData.lists[listName];
	appData.selectedListEl = selectedListEl;

	updateSelectedMyListEl(prevSelectedListEl, selectedListEl);
	updateSelectedListView(appData.selectedList);
}

function updateSelectedMyListEl(prevEl, selectedListEl) {
	if(prevEl != null) {
		removeClass(prevEl, 'active-list-item-selected');
	}
	addClass(selectedListEl, 'active-list-item-selected');
}

function selectItem(itemPos, itemEl, appData) {

	let prevItemEl = appData.selectedItemEl;

	appData.selectedItem = appData.selectedList.items[itemPos];
	appData.selectedItemEl = itemEl;

	updateSelectedItemView(prevItemEl, itemEl);
}

function updateSelectedItemView(prevItemEl, itemEl) {
	if(prevItemEl != null) {
		removeClass(prevItemEl, 'active-list-item-selected');
	}
	addClass(itemEl, 'active-list-item-selected');
}

function toggleCheckItem(itemPos, itemEl, items) {
	var checkState = items[itemPos].isComplete;
	if(checkState) {
		items[itemPos].isComplete = false;
		addClass(itemEl, 'checked-fadein');
		removeClass(itemEl, 'item-completed');
		removeClass(itemEl.firstElementChild, 'item-checkbox-checked');

	} else {
		items[itemPos].isComplete = true;
		removeClass(itemEl, 'checked-fadein');
		addClass(itemEl, 'item-completed');
		addClass(itemEl.firstElementChild, 'item-checkbox-checked');
	}
	
}

function deleteItem(itemPos, itemEl, items) {
	items[itemPos].isDeleted = true;
	addClass(itemEl, 'fadeout-el');
	window.setTimeout(function(){itemEl.remove();},500);
}