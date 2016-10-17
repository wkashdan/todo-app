document.onreadystatechange = function() {
	if(document.readyState === 'interactive') {
		main();
	}
}

function main() {
	let lists = getLists();
	let appData = {
		lists: lists,
		selectedList: lists[Object.keys(lists)[0]]
	}
	setListeners(appData);
	listsToView(appData.lists);
	selectedListToView(appData.selectedList);
}

function setListeners(appData) {
	document.getElementById('myListForm').addEventListener('submit',function(event) {
		event.preventDefault();
		addList(createList(event.target.mylistInput.value), appData);
	});

	
	document.getElementById('itemForm').addEventListener('submit',function(event) {
		event.preventDefault();
		addItem(createItem(event.target.itemInput.value), appData);
	});

}

function getLists() {
	let lists =
	{
		'Agenda':{
			name:'Agenda',
			items:[
				{name:'Go to Gym'}
			]
		}
	};

	return lists;
}

function listsToView(lists) {
	let myListsEl = document.getElementById('myLists');
	for(list in lists) {
		myListsEl.appendChild(listToListEl(lists[list]));
	}
}

function listToListEl(list) {
	let listEl = document.createElement('li');
	listEl.innerHTML = list.name;
	addClass(listEl, 'mylist-item');
	return listEl;
}

function createList(name) {
	return {
		name:name
	}
}

function addList(list, appData) {
	appData.lists[list.name] = {name:list.name, items:[]};
	console.log(appData);
	let myListsEl = document.getElementById('myLists');
	let listEl = listToListEl(list);
	addClass(listEl, 'fade-in');
	myListsEl.appendChild(listEl);
}

function selectedListToView(selectedList) {
	let selectedListEl = document.getElementById('selectedList');
	for(item in selectedList.items) {
		selectedListEl.appendChild(itemToItemEl(selectedList.items[item]));
	}
}

function itemToItemEl(item) {
	let itemEl = document.createElement('li');
	itemEl.innerHTML = item.name;
	addClass(itemEl, 'active-list-item');
	return itemEl;
}

function createItem(name) {
	return {
		name: name,
		items:[]
	}
}

function addItem(item, appData) {
	appData.selectedList.items.push(item);
	console.log(appData);
	let myListsEl = document.getElementById('selectedList');
	let itemEl = itemToItemEl(item);
	addClass(itemEl, 'fade-in');
	myListsEl.appendChild(itemEl);
}
