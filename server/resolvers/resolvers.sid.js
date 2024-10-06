
let globals = require('../config.js').globals;

const resolvers = {

    Query: {
        sid: (parent, { id }, context, info) => getSID(id),
    },

    Mutation: {
        createSID: (parent, { data }, context, info) => createSID(data),

        updateSID: (parent, { id }, context, info) => updateSID(id),

        deleteSID: (parent, { id }, context, info) => deleteSID(id),
    },

    //////////
    SID: {
        Releases: ({ ReleaseIDs }, args, context, info) => getReleases(ReleaseIDs),
    }

}

getSIDFile = id => `${globals.data_path}/sid/${Math.floor(id/1000)}/${id}/sid.${id}.json`;

// Object loader
getSID = id => {
    return loadJSON(getSIDFile(id));
}
getSIDs = idArray => {
    data = [];
    try {
        idArray.forEach( id => {
            // Add object
            data.push(getSID(id));
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return data;
}

// Load object by ID or ID array
addSID = (id, context) => {
    addSIDs([id], context);
    return id;
}
addSIDs = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'SIDs', id)) {
                data = getSID(id);
                addElementToObjectArray( context, 'SIDs', data );
            }
        }) 
    }
    catch(err) {
        // console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getSIDFile, getSID, addSID, addSIDs }

