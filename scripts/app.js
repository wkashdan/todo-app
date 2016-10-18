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
		selectedItemEl: null
	}
	setListeners(appData);
	listsToView(appData);
	selectedListToView(appData);
}

function setListeners(appData) {
	document.getElementById('myListForm').addEventListener('submit',function(event) {
		event.preventDefault();
		addList(createList(event.target.mylistInput.value), appData);
		event.target.reset();
	});
	
	document.getElementById('itemForm').addEventListener('submit',function(event) {
		event.preventDefault();
		addItem(createItem(event.target.itemInput.value), appData);
		event.target.reset();
	});

	document.getElementById('myLists').addEventListener('click',function(event) {
		if(event.target.tagName === 'LI') {
			selectList(event.target, appData);
		}
	});

	document.getElementById('selectedList').addEventListener('click', function(event) {
		if(event.target.tagName === 'LI') {
			selectItem(event.target, appData);
		} else if(event.target.tagName === 'SPAN') {
			selectItem(event.target.parentElement, appData);
		} else if(event.target.className.indexOf('item-checkbox') > -1) {
			toggleCheckItem(event.target.parentElement, appData);
		} else if(event.target.className.indexOf('delete-button') > -1) {
			deleteItem(event.target.parentElement, appData);
		}
	});

}

function getLists() {
	let lists =
	{
		'Agenda':{
			name:'Agenda',
			items:[
				{name:'Go to Gym', isComplete:false, isDeleted: false}
			]
		}
	};

	return lists;
}

function listsToView(appData) {
	let myListsEl = document.getElementById('myLists');
	for(list in appData.lists) {
		myListsEl.appendChild(listToListEl(appData.lists[list]));
	}

	appData.selectedListEl = myListsEl.firstElementChild;
	addClass(appData.selectedListEl, 'active-list-item-selected');
}

function listToListEl(list) {
	let listEl = document.createElement('li');
	listEl.innerHTML = list.name;
	listEl.setAttribute('data-list-name', list.name);
	addClass(listEl, 'mylist-item');
	return listEl;
}

function createList(name) {
	return {
		name:name,
		items:[]
	}
}

function addList(list, appData) {
	appData.lists[list.name] = {name:list.name, items:[]};
	console.log(appData);
	let myListsEl = document.getElementById('myLists');
	let listEl = listToListEl(list);
	addClass(listEl, 'fade-in');
	myListsEl.appendChild(listEl);
	selectList(listEl, appData);
}

function selectedListToView(appData) {
	let selectedListEl = document.getElementById('selectedList');;
	selectedListEl.innerHTML = '';
	for(item in appData.selectedList.items) {
		if(!appData.selectedList.items[item].isDeleted) {
			selectedListEl.appendChild(itemToItemEl(appData.selectedList.items[item], item));
		}
	}
}

function itemToItemEl(item, arPosition) {
	let itemEl = document.createElement('li');
	let itemNameEl = document.createElement('span');
	let itemCheckBox = document.createElement('div');
	let itemDeleteBtn = document.createElement('div');

	itemEl.setAttribute('data-item', JSON.stringify(item));
	itemEl.setAttribute('data-ar-pos', arPosition);

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

function addItem(item, appData) {
	appData.selectedList.items.push(item);
	let myListsEl = document.getElementById('selectedList');
	let itemEl = itemToItemEl(item, appData.selectedList.items.length - 1);
	addClass(itemEl, 'fade-in');
	myListsEl.appendChild(itemEl);
	selectItem(itemEl, appData);
	window.setTimeout(function(){removeClass(itemEl, 'fade-in')}, 200);
}

function selectList(listEl, appData) {
	appData.selectedItemEl = null;
	appData.selectedItem = null;
	appData.selectedList = appData.lists[listEl.getAttribute('data-list-name')];
	if(appData.selectedListEl != null) {
		removeClass(appData.selectedListEl, 'active-list-item-selected');
	}
	appData.selectedListEl = listEl;
	addClass(appData.selectedListEl, 'active-list-item-selected');
	selectedListToView(appData);
}

function selectItem(itemEl, appData) {
	console.log('List selected');
	if(appData.selectedItemEl != null) {
		removeClass(appData.selectedItemEl, 'active-list-item-selected');
	}
	appData.selectedItemEl = itemEl;
	addClass(itemEl, 'active-list-item-selected');
	appData.selectedItem = JSON.parse(itemEl.getAttribute('data-item'));
	//item details to view
}

function toggleCheckItem(itemEl, appData) {
	var checkState = appData.selectedList.items[itemEl.getAttribute('data-ar-pos')].isComplete;
	if(checkState) {
		appData.selectedList.items[itemEl.getAttribute('data-ar-pos')].isComplete = false;
		addClass(itemEl, 'checked-fadein');
		removeClass(itemEl, 'item-completed');
		removeClass(itemEl.firstElementChild, 'item-checkbox-checked');

	} else {
		appData.selectedList.items[itemEl.getAttribute('data-ar-pos')].isComplete = true;
		removeClass(itemEl, 'checked-fadein');
		addClass(itemEl, 'item-completed');
		addClass(itemEl.firstElementChild, 'item-checkbox-checked');
	}
	
}

function deleteItem(itemEl, appData) {
	appData.selectedList.items[itemEl.getAttribute('data-ar-pos')].isDeleted = true;
	addClass(itemEl, 'fadeout-el');
	window.setTimeout(function(){itemEl.remove();},500);
}