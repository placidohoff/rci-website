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

    Images not showing on deployment Error Resolution:
        The images are not loading because I told the next.config.js we are using loader: "imgix". This means I must upload my images to imgix which can connect to my google cloud bucket.
        I created my bucket and to connect it to my imgix account, I must provide the 'Access Key', 'Secret Key', and 'Bucket Name'. To find my keys, click Storage>Settings>Interoperability, and scroll down to 'Access keys for your user account'
        -After connecting my code to my bucket, my website was still not loading the images because it could not find it. This is because when I ran npm run build, for some reason it would attach some numbers at the end of my .png files. These numbers were not random, and would be the same each time I ran a npm run build. Therefore, I renamed the filenames in my google bucket to match these new .png filenames and this worked in my website finding and presenting the images.

***ViewJobSites***
-Build command successful and firebase deploy successful but still getting old code when I visit the deployed site. Unable to reach the jobsites page, deployed site says that page doesn't exist. Must be pushing an old branch? 