
let globals = require('../globals.js').globals;

const resolvers = {

    Query: {
        getHandle: (parent, { id }, context, info) => getHandle(id),
    },

    Mutation: {
        createHandle: (parent, { data }, context, info) => createHandle(data),

        updateHandle: (parent, { id }, context, info) => updateHandle(id),

        deleteHandle: (parent, { id }, context, info) => deleteHandle(id),
    },

    //////////
    Handle: {
        FoundedGroupIDs: ({ FoundedGroupIDs }, args, context, info) => addGroups(FoundedGroupIDs, context),
        OrganizedEventIDs: ({ OrganizedEventIDs }, args, context, info) => addEvents(OrganizedEventIDs, context),
        AttendedEventIDs: ({ AttendedEventIDs }, args, context, info) => addEvents(AttendedEventIDs, context),
        ScenerIDs: ({ ScenerIDs }, args, context, info) => addSceners(ScenerIDs, context),

        Releases: (parent, args, context, info) => context.Releases,
        Groups: (parent, args, context, info) => context.Groups,
        Sceners: (parent, args, context, info) => context.Sceners,
        Events: (parent, args, context, info) => context.Events,
    },
    HandleGroup: {
        GroupID: ({ GroupID }, args, context, info) => addGroup(GroupID, context),
    },
    HandleCredit: {
        ReleaseID: ({ ReleaseID }, args, context, info) => addRelease(ReleaseID, context),
    },

}

getHandleFile = id => `${globals.data_path}/handle/${id}/handle.${id}.json`;

// Object loader
getHandle = id => {
    return loadJSON(getHandleFile(id));
}

// Load object by ID or ID array
addHandle = (id, context) => {
    addHandles([id], context);
    return id;
}
addHandles = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'Handles', id)) {
                data = getHandle(id);
                addElementToObjectArray( context, 'Handles', data );
            }
        }) 
    }
    catch(err) {
        // console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getHandleFile, getHandle, addHandle, addHandles }

