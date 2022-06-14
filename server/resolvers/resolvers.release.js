
let globals = require('../globals.js').globals;

const resolvers = {

    Query: {
        getRelease: (parent, { id }, context, info) => getRelease(id),
    },

    Mutation: {
        createRelease: (parent, { data }, context, info) => createRelease(data),

        updateRelease: (parent, { id }, context, info) => updateRelease(id),

        deleteRelease: (parent, { id }, context, info) => deleteRelease(id),
    },

    //////////
    Release: {
        ReleasedAt: ({ ReleasedAt }, args, context, info) => addEvent(ReleasedAt, context),
        SIDIDs: ({ SIDIDs }, args, context, info) => addSIDs(SIDIDs, context),

        Groups: (parent, args, context, info) => context.Groups,
        Sceners: (parent, args, context, info) => context.Sceners,
        Handles: (parent, args, context, info) => context.Handles,
        Events: (parent, args, context, info) => context.Events,
        SIDs: (parent, args, context, info) => context.SIDs,
    },
    ReleaseGroupsHandles: {
        GroupIDs: ({ GroupIDs }, args, context, info) => addGroups(GroupIDs, context),
        HandleIDs: ({ HandleIDs }, args, context, info) => addHandles(HandleIDs, context),
    },
    ReleaseCredit: {
        HandleID: ({ HandleID }, args, context, info) => addHandle(HandleID, context),
    },     
    ReleaseCommentData: {
        ScenerID: ({ ScenerID }, args, context, info) => addScener(ScenerID, context),
    },

}

getReleaseFile = id => `${globals.data_path}/release/${id}/release.${id}.json`;

// Object loader
getRelease = id => {
    return loadJSON(getReleaseFile(id));
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
        // console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getReleaseFile, getRelease, addRelease, addReleases }

