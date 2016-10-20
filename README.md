# todo-app

This is a To-Do List JavaScript Application. It uses functional plain JavaScript with no third party packages. It uses the localStorage HTML5 API to store data and works completely offline. 

View the demo at http://wkashdan.com/todo-app

If you have feedback for me please feel free to contact me, leave a comment or tweet at me @BlueHenWill 

## Goals of this Project
- To experiment writing JavaScript in a functional style
- To build a small application with no third party packages
- To gain a better understanding of current development tools by manually configuring them

## Dev Tools

This project currently uses NPM, Sass, Babel. I made an intentional decision to not use Grunt, Gulp, Browserify, Webpack etc.

If you'd like to run this project yourself you will need sass, node's http-server, and npm already globally installed (I should setup sass and http-server as local dependencies).

You cna then do the following to install dependencies, build, and run the server:

```
npm install
```

```
npm run build-run
```

## Data Binding in Plain JavaScript/HTML

Binding JavaScript Objects to HTML is not an easy think to accomplish without the help of third party frameworks/libraries. The way I accomplished it was to add HTML attributes to the elements that need to reference an object. Looking back there are better ways to do (I may update the proejct to reflect more robust data binding). 

- Binding the MyList Items: The lists object is an object that uses the name of the list as a key. By adding the name of the list as an attribute to the myListItem Element it allows me to refer to it in the JavaScript object representation when it is clicked. 

- Binding the selectedListItemEl: The items array in the selectedList is a plain javascript array. Therefore every item has a position in the array. By adding an HTML attribute to hte selectedListItem Elements it allows me to refer to itself in the items array when it is clicked.

## Styling From Scratch

In this project I am not using any CSS frameworks. I started with Bootstrap in this project and decided to take it out and challenge myself to write all the styling myself. I am using the SASS pre-processor to help abstract my CSS. I recognize there are improvements I can make to the SCSS file to decrease the lines of code. 

Through doing this project it cuase me think more deeply about how data binding works in other frameworks (AngularJS, Angular2, Polymer, React). It also caused my to think about CSS and styling more throughly. 

## Conclusion
From doing this project not only did I gain a better understanding of how the browser, JavaScript and CSS work, but it will make me think more critically about third party libraries and how they are getting their work done. It made me inquire more closely about the Digest Cycle of AngularJS, and to start learning about the Angular 2 chagne detenction mechanism.  I have read articles discussing if jQuery is necessary, if a JavaScript framework is necessary and this helped me create my own opinion about plain JavaScript.