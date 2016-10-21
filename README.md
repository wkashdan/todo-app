# todo-app

This is a To-Do List JavaScript Application. It uses functional plain JavaScript with no third party packages. It uses the localStorage HTML5 API to store data and works completely offline. 

View the demo at http://wkashdan.com/todo-app

If you have feedback for me please feel free to contact me, leave a comment or tweet at me @BlueHenWill 

## Goals of this Project
- To experiment writing JavaScript in a functional style
- To build a small application with no third party packages
- To gain a better understanding of current development tools by manual configuration

## Dev Tools

This project currently uses NPM, Sass, and Babel. I made an intentional decision to not use Grunt, Gulp, Browserify, Webpack etc.

If you'd like to run this project yourself you will need sass, node's http-server, and npm already globally installed (I should setup sass and http-server as local dependencies).

You can then do the following to install dependencies, build, and run the server:

```
npm install
```

```
npm run build-run
```

## Data Binding in Plain JavaScript/HTML

Binding JavaScript Objects to HTML is not an easy think to accomplish without the help of third party frameworks/libraries. The way I accomplished it was by adding HTML attributes to the elements that need to reference an object. Looking back there are better ways to do (I may update the proejct to reflect more robust data binding). 

- Binding the MyList Items: The lists object uses the name of the list as a key. By adding the name of the list as an attribute to the myListItem Element it allows me to refer to the JavaScript object representation when it is clicked. 

- Binding the selectedListItemEl: The items array in the selectedList is a plain javascript array. By adding an HTML attribute to the selectedListItem Elements it allows the element to refer to the JavaScript object in the array.

## Styling From Scratch

In this project I am not using any CSS frameworks. I made this decision to challenge my SASS and CSS styling skills. I am using the SASS pre-processor to help abstract my CSS. I recognize there are improvements I can make to the SCSS file to decrease the lines of code. 

## Conclusion
From doing this project not only did I gain a better understanding of how the browser, JavaScript and CSS work, but it will make me think more critically about third party libraries and how they are getting their work done. It made me inquire more closely about the Digest Cycle of AngularJS, and to start learning about the Angular 2 chagne detenction mechanism.  I have read articles discussing if jQuery is necessary, if a JavaScript framework is necessary and this helped me create my own opinion about plain JavaScript.