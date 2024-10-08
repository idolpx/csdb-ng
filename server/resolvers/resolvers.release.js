


const resolvers = {

    Query: {
        release: (parent, { id }, context, info) => getRelease(id),
        releases: (parent, { ids }, context, info) => getReleases(ids),
    },

    Mutation: {
        createRelease: (parent, { data }, context, info) => createRelease(data),

        updateRelease: (parent, { id }, context, info) => updateRelease(id),

        deleteRelease: (parent, { id }, context, info) => deleteRelease(id),
    },

    //////////
    Release: {
        ReleasedAtEvent: ({ ReleasedAt }, args, context, info) => getEvent(ReleasedAt),
        SIDs: ({ SIDIDs }, args, context, info) => getSIDs(SIDIDs),
    },
    ReleaseGroupsHandles: {
        Groups: ({ GroupIDs }, args, context, info) => getGroups(GroupIDs),
        Handles: ({ HandleIDs }, args, context, info) => getHandles(HandleIDs),
    },
    ReleaseCredit: {
        Handles: ({ HandleIDs }, args, context, info) => getHandles(HandleIDs),
    },
    ReleaseCommentData: {
        Handle: ({ HandleID }, args, context, info) => getHandle(HandleID),
    },

}

getReleaseFile = id => `${process.env.DATA_PATH}/release/${Math.floor(id/1000)}/${id}/release.${id}.json`;

// Object loader
getRelease = id => {
    return loadJSON(getReleaseFile(id));
}
getReleases = idArray => {
    data = [];
    try {
        idArray.forEach( id => {
            // Add object
            data.push(getRelease(id));
        }) 
    }
    catch(err) {
        console.log(err);
    }

    return data;
}

// Load object by ID or ID array
addRelease = (id, context) => {
    addReleases([id], context);
    return id;
}
addReleases = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'Releases', id)) {
                data = getRelease(id);
                addElementToObjectArray( context, 'Releases', data );
            }
        }) 
    }
    catch(err) {
        console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getReleaseFile, getRelease, addRelease, addReleases }

