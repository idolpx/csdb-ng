
let globals = require('../globals.js').globals;

const resolvers = {

    Query: {
        getGroup: (parent, { id }, context, info) => getGroup(id),
    },

    Mutation: {
        createGroup: (parent, { data }, context, info) => createGroup(data),

        updateGroup: (parent, { id }, context, info) => updateGroup(id),

        deleteGroup: (parent, { id }, context, info) => deleteGroup(id),
    },

    //////////
    Group: {
        ReleaseIDs: ({ ReleaseIDs }, args, context, info) => addReleases(ReleaseIDs, context),
        FounderHandleIDs: ({ FounderHandleIDs }, args, context, info) => addHandles(FounderHandleIDs, context),
        OrganizedEventIDs: ({ OrganizedEventIDs }, args, context, info) => addEvents(OrganizedEventIDs, context),
        BBSIDs: ({ BBSIDs }, args, context, info) => addBBSs(BBSIDs, context),

        Releases: (parent, args, context, info) => context.Releases,
        Sceners: (parent, args, context, info) => context.Sceners,
        Handles: (parent, args, context, info) => context.Handles,
        Events: (parent, args, context, info) => context.Events,
        BBSs: (parent, args, context, info) => context.BBSs,
    },
    GroupCommentData: {
        ScenerID: ({ ScenerID }, args, context, info) => addScener(ScenerID, context),
    },
    GroupMember: {
        HandleID: ({ HandleID }, args, context, info) => addHandle(HandleID, context),
    },

}

getGroupFile = id => `${globals.data_path}/group/${id}/group.${id}.json`;

// Object loader
getGroup = id => {
    return loadJSON(getGroupFile(id));
}

// Load object by ID or ID array
addGroup = (id, context) => {
    addGroups([id], context);
    return id;
}
addGroups = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'Groups', id)) {
                data = getGroup(id);
                addElementToObjectArray( context, 'Groups', data );
            }
        }) 
    }
    catch(err) {
        // console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getGroupFile, getGroup, addGroup, addGroups }

