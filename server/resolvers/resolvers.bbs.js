


const resolvers = {

    Query: {
        bbs: (parent, { id }, context, info) => getBBS(id),
        bbss: (parent, { ids }, context, info) => getBBSs(ids),
    },

    Mutation: {
        createBBS: (parent, { data }, context, info) => createBBS(data),

        updateBBS: (parent, { id }, context, info) => updateBBS(id),

        deleteBBS: (parent, { id }, context, info) => deleteBBS(id),
    },

    //////////
    BBS: {
        Groups: ({ GroupIDs }, args, context, info) => getGroups(GroupIDs),
        Handles: ({ HandleIDs }, args, context, info) => getHandles(HandleIDs),
    },
    BBSSysop: {
        Handle: ({ HandleID }, args, context, info) => getHandle(HandleID),
    },

}

getBBSFile = id => `${process.env.DATA_PATH}/bbs/${Math.floor(id/1000)}/${id}/bbs.${id}.json`;

// Object loader
getBBS = id => {
    return loadJSON(getBBSFile(id));
}
getBBSs = idArray => {
    data = [];
    try {
        idArray.forEach( id => {
            // Add object
            data.push(getBBS(id));
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return data;
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

