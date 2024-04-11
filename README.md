### Books APP

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

be sure to set the right host path of the API in .env file.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Description
Appllication to search books. its authenticate on API with a fixed login in DashBoardPage.tsx that have to be the same in appsettings.json of Library API.
Authenticate and store in local storage the token for the futere requests.
Dynamic datagird as component, could filter, sort and export the results 

![image](https://github.com/eduardomk9/Books/assets/15438089/cd50ed3b-5734-4655-999e-09ff1ec695d5)


Architecture explain (src folder):</br>
</br>
components -> Plug n Play components, they could be copied and pasted and and it will work (surer to use right parameters and install any dependencies).</br>
routes - > Routes of pages application.</br>
services -> Connect the api, folders to all the controllers used, and in Interfaces(Objects) useds.</br>
utils -> Other utils codes snips.</br>
views -> Pages.</br>


## 🚀 Installation/Implemetation
To run project in local you should have instaled the node.js enviroment, git clone this project, install dependency and run.</br>
To publis use 'npm build' command a publish the files as any other web page, just pay attention the project have routes.

## 📋 Usage
After the application is running you could use the filters on the screen to do a search then use the custom datagrid to filter/manage and export results into a csv file.


## 🖥️ Used Technologies
React;</br>
TypeScript;</br>
MUI;</br>
CSS;</br>
HTML;</br>

## 📝 License
Only for study and non-distributable.

