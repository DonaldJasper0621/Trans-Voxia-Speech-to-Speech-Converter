 <p align="center">
  <h2 align="center"> Trans Voxia - The Best Speech_to_speech Conversion ToolKit Web Application </h2>
</p>

<p align="center">
  <a href="#">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="#">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  </a>
</p>

# 🎙️ Trans Voxia - The Best Speech_to_speech Conversion ToolKit Web Application

At present, the official Trans Voxia can have three types of output: translated text, translated audio, and translated video. Users can freely decide the output format according to the material they want to translate (podcast, movie, etc. 🎥).

When a user uploads a foreign language movie, the system temporarily stores the movie file  and then separates the audio track from the movie content. Through whisper, the content of the audio track will be output as a foreign language verbatim script. Then, through deepL, the foreign language content will be translated into the specified text. And then, through ChatGPT, the content will be refined or interpreted with the specified expectation. Through play.ht, the translated content is presented with the specified human voice. Since the length of the translated text and the AI speed are not the same as the original movie, we will first output the first version of the audio track, divide it by the length of the original movie to get the time multiplier, and then generate the second version of the audio track with the correct timeline. Finally, we merge the audio track with the movie and output the file.

## 🎥 Demo Video
[![Trans Voxia System Demo](https://img.youtube.com/vi/<pgjnm0l_Zvw>/0.jpg)](https://www.youtube.com/watch?v=pgjnm0l_Zvw)

##  Prerequisites
- Install Node.Js (Newest Version will be fine) so that you can use Npm. (https://nodejs.org/en/download/current)
- Must know that I used both TailWind and CSS in the project. Hence, it's essential to be familiar with both.
- React version should be "react version": "18.2.0".

##  Data Preparation
The code requires a directory containing the following files:
- `assets/`: Folder with all images and videos.
- `components/`: File that includes all the components outside of MainService which is not connected with speech-to-speech conversion part. Most components relate to the landing page like Home, Price, Contact, etc..
- `MainService/`: File containing pages and functions used in the main speech-to-speech services.
- `routes/`: Most of the navigating pages are located here (Landing pages 🛬).

An example of this Website is now deployed to Vercel with the URL ([speech-to-speech-theta.vercel.app](https://speech-to-speech-theta.vercel.app/))

## 🚀 Run
To install dependencies and packages json:
```bash
npm install
```

## Run
To install dependencies and packages json.:
```bash
npm install
```
```bash
npm run dev
```


## Contact
Provide contact information or any relevant links where users can reach out to you for support, feedback, or questions. Please make further contact with me as this project's Front End Developer Donald Jasper Su (Email: su.donald0621@gmail.com).

## Acknowledgments
If there are any acknowledgments or credits you'd like to give, mention them here. It could be individuals or libraries that have contributed to your project.

Feel free to modify and customize the structure and content of the README to fit your project's specific needs. The above template provides a starting point for creating a well-structured README file.
