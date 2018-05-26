# giftastic
A dynamic web application that connects with GIPHY API to display gifs to display GIFs based on the emotion the user clicks.

### Assignment Description

#### Objective
Use ajax and jQuery to retrieve data from an api and display it dynamically for the user

### Technology used
* HTML, CSS
* JavaScript
* Bootstrap
* Jquery
* AJAX
* [Giphy API](https://github.com/Giphy)

1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
   * We chose animals for our theme, but you can make a list to your own liking.

2. Your app should take the topics in this array and create buttons in your HTML.
   * Try using a loop that appends a button for each string in the array.

3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

### Bonus Goals

1. Ensure your app is fully mobile responsive.

2. Allow users to request additional gifs to be added to the page.
   * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

4. Include a 1-click download button for each gif, this should work across device types.

5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio



### Approach
On click of any of the buttons in the aside element, ajax will make a call to the GIFY api to search the value of the button. A card is created for every result returned. The cards are laid out in the results div using Bootstrap's grid system.

1. Variables
    * HTML (Object) --> HTML snippets of code will be stored here to be used in the application in an attempt to improve readability
        ** row
        ** resultsItem
        ** topicBtn
        ** rating
        ** downloadIcon
    * topics (Array) --> a default list of topics that loads with the page

2. Classes
    * .header
    * .input
        ** .input-el
        ** .input-btn
    * .results
        ** .results-item
            *** .results-img
            *** .results-icon
            *** .results-text
                **** .results-text-light
    * .aside
        ** aside.btn

