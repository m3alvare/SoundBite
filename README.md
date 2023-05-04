**Project Description:**
SoundBite is a platform where users can upload audio and video files to be converted into a text file using Google Cloud's speech-to-text API, and then summarized using the OpenAI's ChatGPT API. At this point, users can sign up with an account, sign in to the site, and create a SoundBite that gets stored in our database. On our home page, there is a "Create SoundBite" button that opens up the form with a title input field, .FLAC file upload button or record your own audio, "Generate SoundBite" button to call the Google Cloud speech-to-text API and OpenAI ChatGPT API, SoundBite title and SoundBite body, and finally if signed in press the "Save SoundBite" button to store the information in the database. 

**Installation Requirements:**
Run *npm install --legacy-peer-deps* in server and client. Our package.json file will install all of the necessary requirements.yay

**OpenAI API & google cloud keys**
create a "google-cloud-key.json" file in the root directory with your google cloud key. In "server.js" on line 470 insert your Open AI api key