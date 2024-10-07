
let globals = require('../config.js').globals;

const resolvers = {

    Query: {
        handle: (parent, { id }, context, info) => getHandle(id),
        handles: (parent, { ids }, context, info) => getHandles(ids),
    },

    Mutation: {
        createHandle: (parent, { data }, context, info) => createHandle(data),

        updateHandle: (parent, { id }, context, info) => updateHandle(id),

        deleteHandle: (parent, { id }, context, info) => deleteHandle(id),
    },

    //////////
    Handle: {
        FoundedGroups: ({ FoundedGroupIDs }, args, context, info) => getGroups(FoundedGroupIDs),
        MemberGroups: ({ MemberGroupIDs }, args, context, info) => getGroups(MemberGroupIDs),
        OrganizedEvents: ({ OrganizedGroupIDs }, args, context, info) => getGroups(OrganizedGroupIDs),
        AttendedEvents: ({ AttendedEventIDs }, args, context, info) => getEvents(AttendedEventIDs),

        BBSSysop: ({ BBSSysopIDs }, args, context, info) => getBBSs(BBSSysopIDs),
        BBSUser: ({ BBSUserIDs }, args, context, info) => getBBSs(BBSUserIDs),

        Releases: ({ ReleaseIDs }, args, context, info) => getSceners(ReleaseIDs),
        Sceners: ({ ScenerIDs }, args, context, info) => getSceners(ScenerIDs),
    },
    HandleGroup: {
        Group: ({ GroupID }, args, context, info) => getGroup(GroupID),
    },
    HandleCredit: {
        Releases: ({ ReleaseIDs }, args, context, info) => getReleases(ReleaseIDs),
    },

}

getHandleFile = id => `${globals.data_path}/handle/${Math.floor(id/1000)}/${id}/handle.${id}.json`;

// Object loader
getHandle = id => {
    return loadJSON(getHandleFile(id));
}
getHandles = idArray => {
    data = [];
    try {
        idArray.forEach( id => {
            // Add object
            data.push(getHandle(id));
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return data;
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

