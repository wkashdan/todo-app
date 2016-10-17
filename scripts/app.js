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
		selectedListEl: null
	}
	setListeners(appData);
	listsToView(appData.lists);
	selectedListToView(appData.selectedList);
	selectList(document.getElementById('myLists').firstElementChild, appData);
}

function setListeners(appData) {
	document.getElementById('myListForm').addEventListener('submit',function(event) {
		event.preventDefault();
		addList(createList(event.target.mylistInput.value), appData);
	});
	
	document.getElementById('itemForm').addEventListener('submit',function(event) {
		event.preventDefault();
		addItem(createItem(event.target.itemInput.value), appData);
		event.target.reset();
	});

	document.getElementById('myLists').addEventListener('click',function(event) {
		event.preventDefault();
		if(event.target.tagName === 'LI') {
			console.log(event.target.getAttribute('data-list'));
			selectList(event.target, appData);
		}
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
	listEl.setAttribute('data-list', JSON.stringify(list));
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

function selectedListToView(selectedList) {
	let selectedListEl = document.getElementById('selectedList');
	selectedListEl.innerHTML = '';
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
		name: name
	}
}

function addItem(item, appData) {
	appData.selectedList.items.push(item);
	appData.selectedListEl.setAttribute('data-list',JSON.stringify(appData.selectedList));
	console.log(appData);
	let myListsEl = document.getElementById('selectedList');
	let itemEl = itemToItemEl(item);
	addClass(itemEl, 'fade-in');
	myListsEl.appendChild(itemEl);
}

function selectList(listEl, appData) {
	if(appData.selectedListEl != null) {
		removeClass(appData.selectedListEl, 'active-list-item-selected');
	}
	appData.selectedListEl = listEl;
	addClass(listEl, 'active-list-item-selected');
	appData.selectedList = JSON.parse(listEl.getAttribute('data-list'));
	selectedListToView(appData.selectedList);
}
