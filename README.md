<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). -->
<!---->
<!-- ## Getting Started -->
<!---->
<!-- First, run the development server: -->
<!---->
<!-- ```bash -->
<!-- npm run dev -->
<!-- # or -->
<!-- yarn dev -->
<!-- # or -->
<!-- pnpm dev -->
<!-- # or -->
<!-- bun dev -->
<!-- ``` -->
<!---->
<!-- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. -->

# CoursePort
> Group 17 Project for CSC 4243

# How to
```bash
# git clone this repo & cd into it
git clone https://github.com/ganhaque/course-port && cd course-port

# Install npm packages
npm install

# To run it
npm run dev
```

## To commit your changes (terminal)
```bash
# Add all changes
git add .
# Or just some specific changes to some files/folders
git add ./path/to/file_or_folder

# Commit message
git commit -m "message goes here"

# Push to the repo on Github
git push
```

## IDEA/TODO
- Duplicate Indication & Toggle
    - displayDuplicate = false (default);
    - OR duplicateBlacklist = [string];
    - Column to indicate & toggle duplicate of the num
- Dialog open when click on HasLab or HasRec
- Better department display. Add/Map Abbreviation to it.
- Tooltip!
- Theme switcher / Dark/Light mode toggle
- Time filter.
- Duration filter.
- Days blacklist filter (current one is whitelist)
- The Telescope command search experience
    - tab and shift-tab to cycle
    - sorting
        - searching 'EE' should have 'EE' before 'AEEE'
- Settings window/sidebar/container?
    - Hide class with avl == 0
