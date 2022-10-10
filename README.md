# Bentley Static Hosting Demo

## This Demo has been built for Bentley Systems for the purpose of testing below database capabilities
1. Ability to use a DBaaS instead of self-managed deployments for building this tool
   - Deployed a M10 cluster in MongoDB Atlas, fully managed database as a service platform
2. Ability to store the data in MongoDB without standardizing it across multiple EPD sources using flexible doc model
   - Data modeled for different EPD sources using MongoDB's Flexible schema (available GWP_dataset.json in files) 
3. Ability to query the data through an API for further integrating with the rest of the application
   - Introduced Data API and native drivers to query MongoDB data
4. Ability to query the data using static hosting for users without an api-key
   - Used MongoDB's App Services to query the data stored in Atlas to display it in a browser
 
## Testing the demo
Use https://epddataviewer-imrgu.mongodbstitch.com/ or your own link provided by app services to test the demo

## Building your own Atlas App Services static Hosting Demo
**Goal:** Connecting to MongoDB Atlas database and query the data from the browser. 
  - Create a basic Application to handle the anonymous authentication and set the access rules for our GWP_dataset collection.
  - Create the website with just one HTML file and one JavaScript file.

## Getting Setup 
   - You will need to link a M10 or higher Atlas Cluster for enabling static hosting (free tier M0 is not supported for this feature)
   - Load the dataset from **GWP_dataset.json** or add a dataset of your own choice to your Atlas cluster
   - Connect your data source to the app services and link your Github to save the application files
## Using App Services for creating a Web App
<img width="1160" alt="Screen Shot 2022-10-08 at 7 10 37 PM" src="https://user-images.githubusercontent.com/45085638/194730863-3c1c2c2e-f313-4f36-9f77-7dee8c26b80f.png">

Create an Atlas App Services application, our Realm Web SDK needs to authenticate users to work properly. For the purpose of this demo, we will use the 
anonymous authentication.

We need to tell our application what our authenticated users can do with each collection.
<img width="1606" alt="Screen Shot 2022-10-08 at 7 16 59 PM" src="https://user-images.githubusercontent.com/45085638/194730953-cc9dfe26-1130-4531-847b-efc5f306b023.png">

## Create a static website with the Realm Web SDK
Create a website to retrieve material names and their GWP values from our GWP_dataset collection in MongoDB Atlas and display them in our website 
- Create a index.html file https://github.com/samadnya/bentleymongodbdemo/blob/89a0a4e264d0046edd1655f3d759c0811d00bb98/hosting/files/index.html#L1-L26
- Create a data.js file https://github.com/samadnya/bentleymongodbdemo/blob/f04f0a83b8a4f340f3e3451dd66756185071005b/hosting/files/data.js#L1-L60
Note: the first line of data.js needs your APP ID, which is available in your app services profile

## Deploy the Website in MongoDB Atlas App Services Static Hosting
<img width="711" alt="Screen Shot 2022-10-08 at 7 32 30 PM" src="https://user-images.githubusercontent.com/45085638/194731189-cc72e4ff-be35-4d8d-8d2c-20d3cca89452.png">

- Enable Hosting as shown above
- Upload your two files index.html and data.js using the UPLOAD FILES button. App Services will tell you that you are overwriting ./index.html. This is the expected result.
<img width="1301" alt="Screen Shot 2022-10-08 at 7 33 48 PM" src="https://user-images.githubusercontent.com/45085638/194731233-78801999-c440-4d6f-989a-b88bc3494539.png">
 - At this point, you should be able to access your website with the provided link, but the DNS can take up to 15 minutes to propagate.
