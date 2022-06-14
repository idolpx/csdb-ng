
let globals = require('../globals.js').globals;

const resolvers = {

    Query: {
        getBBS: (parent, { id }, context, info) => getBBS(id),
    },

    Mutation: {
        createBBS: (parent, { data }, context, info) => createBBS(data),

        updateBBS: (parent, { id }, context, info) => updateBBS(id),

        deleteBBS: (parent, { id }, context, info) => deleteBBS(id),
    },

    //////////
    BBS: {
        GroupIDs: ({ GroupIDs }, args, context, info) => addGroups(GroupIDs, context),
        UserHandleIDs: ({ UserHandleIDs }, args, context, info) => addHandles(UserHandleIDs, context),

        Groups: (parent, args, context, info) => context.Groups,
        Handles: (parent, args, context, info) => context.Handles,
    },
    BBSSysop: {
        HandleID: ({ HandleID }, args, context, info) => addHandle(HandleID, context),
    },

}

getBBSFile = id => `${globals.data_path}/bbs/${id}/bbs.${id}.json`;

// Object loader
getBBS = id => {
    return loadJSON(getBBSFile(id));
}

// Load object by ID or ID array
addBBS = (id, context) => {
    addBBSs([id], context);
    return id;
}
addBBSs = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'BBSs', id)) {
                data = getBBS(id);
                addElementToObjectArray( context, 'BBSs', data );
            }
        }) 
    }
    catch(err) {
        // console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getBBSFile, getBBS, addBBS, addBBSs }

