#Project 1: A Robot Factory

### &#x1F535; Technologies used
1. HTML5
2. CSS
3. Javascript
4. JQuery
5. Bootstrap

### &#x1F535; The Approach
* Chaos Monkey - Play with the provided code to figure out what it does and how to manipulate it.
* Decide what the project application is for/going to do. 
* Pseudocode how the application will work.
* Work out which components of Callan's code will provide required functionality then work out what techniques/code will be required to produce the functionality that is not already in Callan's code (particularly animations).
* Clean up the original code - fix typos, change class and Id names so they are meaninful for the new project, delete redundant code.
* Start separate files to test new techniques before integrating into project.
* Integrate new code with existing code.
* More chaos monkey time - lots of testing to check that deletions and additions both maintain the integrity of the code and the application runs in a logical way. 
* More cleaning - keeping formatting tidy, removing redundant code, taking out console logs.

### &#x1F535; Installation
Load the index.html into a Chrome browser for optimal results.
This application has not been tested in other browsers.

### &#x1F535; Solved Challenges
* Responsive design - if the page is loaded on a small screen (e.g. phone) what will be seen?  

- Due to the animation layout on the index page, this is at a fixed width. It will require scrolling to see the whole page if the screen is too small.
- The most important parts of this application are the robots themselves so they are responsive.  Using Bootstrap jumbotron, setting the column/row parameters for both a medium and small screen, this ensures that the input boxes move from a row (large & medium screen) into a column when the screen shrinks (small screen).

* Load an existing gif or animate in the application and then, animate in JS or CSS? Decision: Animate with CSS. 

- Animating in CSS is friendlier to multi-platform apps because it renders better on small screens than JS and is supposed to use less battery power than JS animations.

* API returning different things: The Futurama quote API has no key and it does not return an object like the movie API.
- The Futurama API returns an array, it needed to have an extra bit of code which then selected the value from the array.

### &#x1F535; Unsolved Problems
* Browser degrading has not been addressed.
* The widgets at the bottom of the page could have been moved to sit beside the Robot panel, only dropping down to the bottom of the page as the forms appear. This is a task for a future version.