const APP_ID = 'samkbentleydemoapp-xmhfe';
const ATLAS_SERVICE = 'mongodb-atlas';
const app = new Realm.App({id: APP_ID});

// Function executed by the LOGIN button.
const login = async () => {
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        $('#user').empty().append("User ID: " + user.id); // update the user div with the user ID
    } catch (err) {
        console.error("Failed to log in", err);
    }
};

// Function executed by the "Show EPDs" button.
const find_epd = async () => {
    let collEpds;
    try {
        // Access the gwp_dataset collection through MDB Realm & the readonly rule.
        const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
        collEpds = mongodb.db("Bentley_POC").collection("GWP_dataset");
    } catch (err) {
        $("#user").append("Need to login first.");
        console.error("Need to log in first", err);
        return;
    }

    // Retrieve material names (compute GWP sums as a new field, thanks to the projection stage of aggregation pipleines in MongoDB).
    const epd_names = await collEpds.find({}, {
        "projection": {
            "_id": 0,
            "Name": 1,
            //"Dataset_uri":1,  for further modification:if you wish to see entrie dataset
            "GWP_sum":{$sum: ["$GWP.Production_A1-A3","$GWP.Transport_A4","$GWP.Installation_A5"]}
        
       
        }
       // ,"limit": 10 (If you wish to limit the number of results)
    });

    // Access the div and clear it.
    let gwp_div = $("#GWP_dataset");
    gwp_div.empty();

    // Loop through the documents and display them in the dataset div.
    for (const epd of epd_names) {
        let p = document.createElement("p");
        let q = document.createElement("q");
      
        p.append(epd.Name);
        gwp_div.append(p);
        var u = document.createTextNode('Global Warming Potential=');
        gwp_div.append(u);
        q.append(epd.GWP_sum);
        gwp_div.append(q);

    }

}; 