# Where's Waldo

A photo tagging app using React frontend and Rails backend.

## Features

- Magnifying glass zooms in on image within its field of view
- When section clicked, presents options of possible characters
- Pixel position is stored on the database, will verify if selected target is correct
- Timer for players to rank who can find all characters the fastest and display high scores
- Multiple difficulty levels and maps

### Process

- First played with modals within React to get functionality working for pop-up menu
- Originally tried playing with HTML canvas to create a targeting box but was ultimately not ideal
- Played with offset functions to find the pixel position ratio of a given image regardless of the scale
- Created the magnifying glass by setting the floating div background image as a magnification of the underlying background image
- Once it was time to test I ported the sandbox over as a template to create the actual app and removed the old files I no longer needed. I like this method as I don't feel the stress of having the app be "perfect" off the bat
- For testing, realized I needed to decouple the clickable background image from the MousePosition and likely make a hidden debug panel below the image in order to test hovering and click effects
- Went through a long convoluted process of trying to get the targeting box to display the image clicked with a dialog as the magnifier itself had pointer events disabled in order to track the coords. First tried to copy and paste the style of generated div from MagnifyingGlass but was way too complicated. Finally, realized a much simpler solution was to make a stripped down MagnifyingGlass with the data on click. Also allowed me to simplify params using useContext which I finally learned how to do!
- Added functionality to pull character data from Rails API using useFetch custom hook and enabled CORS to test locally by enabling in Rails
- Created server side timers to prevent cheating from the client and made it more or less line up with the useEffect timer that starts at beginning of game
- Played around with utility functions for the timers and modifying useFetch to take post and patch requests but ultimately decided on custom hooks for timers and high scores. This was after a comical overabundance of useEffect and trying to avoid setting off the wrong ones
- Made the enter name screen a modal dialog and realized after much frustration I had a ref in a conditional render which is why it could never find it to open it!
- Big refactor moving App and MousePosition components around and making more modular in order to more easily test them.
- Still don't really "get" React testing but it does see the things and do the right stuff when you click them as far as my tests are concerned
- Decided to add Easy and Medium modes and maps to fill the game out, had to refactor to more easily accomodate them as well as the difficulty settings. Added Easy and Medium character locations and high score tables to API
- Changed the high score submit button to take the timer ID instead of the elapsed time to add some extra security
- A little better appreciation for testing after adding the difficulty settings, could see how this would matter more for larger apps though
- Added some testing to API as well, though most not needed it turns out due to controller configuration only allowing valid entries in the first place
- Added env files so I can switch back and forth between development and production URLs
- Found bug where resetting the main game states instead of doing a window reload was causing errors for other leftover states so just returned it back to a hard reset for now

### To Do

- Revist increment counter and remind why I'm multiplying by 100 in Timer.elapsed_time
- Write tests for checkmarks, background image, magnifying glass, other components as needed
