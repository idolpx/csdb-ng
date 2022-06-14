
let globals = require('../globals.js').globals;

const resolvers = {

    Query: {
        getSID: (parent, { id }, context, info) => getSID(id),
    },

    Mutation: {
        createSID: (parent, { data }, context, info) => createSID(data),

        updateSID: (parent, { id }, context, info) => updateSID(id),

        deleteSID: (parent, { id }, context, info) => deleteSID(id),
    },

    //////////
    SID: {
        ReleaseIDs: ({ ReleaseIDs }, args, context, info) => addReleases(ReleaseIDs, context),

        Releases: (parent, args, context, info) => context.Releases,
    }

}

getSIDFile = id => `${globals.data_path}/sid/${id}/sid.${id}.json`;

// Object loader
getSID = id => {
    return loadJSON(getSIDFile(id));
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

