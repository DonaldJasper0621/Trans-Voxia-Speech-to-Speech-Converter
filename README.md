# Trans Voxia - the best Speech_to_speech Conversion ToolKit
At present, The Ofiicial Trans Voxia can have three types of output: translated text, translated audio, and translated video. Users can freely decide the output format according to the material they want to translate (podcast, movie, etc.).

When a user uploads a foreign language movie, the system temporarily stores the movie file and then separates the audio track from the movie content. Through whisper, the content of the audio track will be output as a foreign language verbatim script, and then through deepL, the foreign language content will be translated into the specified text, and then through chatGPT, the content will be refined or interpreted with the specified expectation. Through play.ht, the translated content is presented with the specified human voice. Since the length of the translated text and the AI speed are not the same as the original movie, we will first output the first version of the audio track, divide it by the length of the original movie to get the time multiplier, and then generate the second version of the audio track with the correct timeline. Finally, we merge the audio track with the movie and output the file.



## Prerequisites
- Install Node.Js (Newest Version will be fine), in advanc ethat you can use Npm. (https://nodejs.org/en/download/current)
- Must known that I used both TailWind and Css in the project. Hence ,it's important to be familiar with both.
- Notice that React version should be "react version" : "18.2.0".

## Data Preparation
The code requires a directory containing the following files:
- `assets/`: folder with all image and videos.
- `components/`: file that include all the components outside of MainService which is not connected with speech to sppech conversion part. Most of the components are related to landing page like Home, Price, Contact etc..
- `MainService/`: file containing pages and functions that would be use in the main speech to speech services.
- `routes/`: Most of the navigating page were located here ( Landing pages ).

An example of this Website is now deployed to Vercel with the Url ([speech-to-speech-theta.vercel.app](https://speech-to-speech-theta.vercel.app/))

## Run
To install dependencies and packages json.:
```
npm install
```
To run the project:
```
npm run dev
```

This project is licensed under the MIT License.

Contact
Provide contact information or any relevant links where users can reach out to you for support, feedback, or questions. Please make further contact with me as this project's Front End Developer Donald Jasper Su (Email: su.donald0621@gmail.com).

Acknowledgments
If there are any acknowledgments or credits you would like to give, mention them here. It could be individuals or libraries that have contributed to your project.

Feel free to modify and customize the structure and content of the README to fit your project's specific needs. The above template provides a starting point for creating a well-structured README file.
