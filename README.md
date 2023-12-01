# CoursePort

Link: https://ganhaque.github.io/course-port/

A web application to help you search for courses and visualize your LSU schedule.

Made by Group 17 for CSC 4243 - Interface Design and Technology

## Team Members
- Christian Che
- Ashton Nelson
- Artem Mukhamedzianov
- Daniel Chorev

## Usage
- You can select courses from the `Booklet` page.
You can use various filters in the `Toolbar` to help finding the right course for you.
- Your selected courses will be available in the `Time Table` page in the `Course Picker`
- Picked courses (green background) will appears in the `Time Table`.
    - Courses without day or time (red background) will not appears, but you can still pick them.
- You can then toggle them on and off by clicking on them.
Or de-select by pressing the `X` button on the top-right corner

## Local Hosting
```bash
# git clone this repo & cd into it
git clone https://github.com/ganhaque/course-port && cd course-port

# Install dependencies
npm install

# Run it
npm run dev
```

## Screenshots

TBA

## Misc.

- The data are scraped and parsed directly from LSU scheduling booklet and are manually updated every once in a while.
    - If you come across any bugs or inaccuracies, please don't hesitate to reach out to me at ganhaquegnq@gmail.com.
- As of now, and likely forever, CoursePort cannot directly add your picked courses to your LSU Schedule. Please visit myLSU's `Schedule Request` to manually add your picked courses.

## TODO & Maybe
- [ ] Make a scraper for LSU catalog to get:
    - Course description
    - Course pre-requisite
- [ ] Better search experience
    - [ ] Tab & Shift-Tab to cycle to next/prev selection
    - [ ] Proper sorting & fuzzy search (if search is "ee", EE should appear before AEEE)
- Settings
    - [ ] Toggle visibility for classes with 0 available
- [ ] Display Course's Spring & Fall exclusivity (not 100% accurate)
    - During parsing, check if course was available during last Fall/Spring
- [ ] Google Calendar and/or Outlook export button
    - Automation require knowing when each semester start and end
- More themes!
    - [ ] Gruvbox

