# Custom homepage

This project was visually inspired by http://weboas.is/ but has been rewritten from the ground in React to be more customizable by the user.
A demo of the website can be seen [here].
## Features
  - Define your own number of categories and their content
  - Add your own websites to the built in search tool
  - Last.FM integration
  - Set the welcome text to your super 1337 internet name
  - A very cool background which is totally not inspired by The Matrix

## Installation guide

  - Clone the master branch.
  - Make the appropriate changes to customize your experience in custom-homepage/src/website.json
  - Build the app by executing the command "npm run build" in the root directory of the project. 
  - Host it. A free option is [Github pages]

## Customization
This homepage offers a lot of quick and easy customization. Take note that all customization in this part takes place in the file custom-homepage/src/website.json
  - Add another "category circle"
    - Create a new object inside of the categories object in the customization file.
    - The letters that appear on the category circle will be the first two letters of your new objects name.
 - Populate a "category circle"
    - Locate the object of the category circle that you want to populate with links.
    - Create a key-value pair cosisting of what you want the link to be shown as and the actual link
    - Take note that the key should be the name and the value should be the link
 - Add another website to the search tool 
    - Create a key-value pair in the `searchValues` -> `searchTags` object consisting of the search tag and the search link
        - Take note that the search tag will need to be the key and the search link will need to be the pair
    - Create a key-value pair in the `searchValues` -> `searchInfo` object consisting of the searchtag you chose above and the placeholder text you want displayed on the searchbar
        - Take note that the search tag will need to be the key and the placeholder text will need to be the value
- Adding your own name to the top of the website
    - In the object `welcomeText` change the value of the existing key-value pair to your desired name
- Activating Last.FM currently scrobbling text
    - In the `lastfm` object, give the key-value pairs your information
        - `name` is your username.
        - `apikey` is your own generated apikey for this cause. How to generate one can be found on [this] page.
        - `activate` is to be set to *true* if you want this functionality.

### Special Thanks
   - [@p-kostic] (Introduction to the language, various bug fixing, and constructing the logic for importing an easily changeable .json file to add categories and links to the website)






   [Github pages]: <https://github.com/gitname/react-gh-pages>
   [here]: <https://cyanisyde.github.io/custom-homepage/>
   [this]: <https://www.last.fm/api/authentication>
   [@p-kostic]: <https://github.com/p-kostic>