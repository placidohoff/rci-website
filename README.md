Branches:


ServicePageEdits:
    Goal: Make the highlighted image carousel. It does so but does not successully repeat ater it makes its way through all of the images. Therefore, once it reaches the end, I clear the interval. Must learn why it doesn't loop correctly but I will accept this for now.
    TODO: 

RequestForm:
    TODO: ADJUST EXIT BUTTON. The margin/padding top is needed for landscape phone. So I must adjust the media query height's margin to look good on desktop heights, and only include the margin on landscape phone height.

Firebase deploy Error Resolution:
    Was getting the default "Welcome to firebase hosting" page after 'firebase deploy --only hosting' command. To resolve this, made edit to package.json: "build": "next build && next export". The export created my out folder. After this, had to change next.config.js to resolve another error: 
        next.config.js:
        /** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: "imgix",
    path: "https://noop/",
  },
  reactStrictMode: true,
}
    After this, command firebase deploy --only hosting, and the correct pages are reachable. https://stackoverflow.com/questions/56284434/how-to-deploy-next-js-app-on-firebase-hosting
    HOWEVER: The images are not working on the page..