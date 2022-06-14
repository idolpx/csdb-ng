
let globals = require('../globals.js').globals;

const resolvers = {

    Query: {
        getEvent: (parent, { id }, context, info) => getEvent(id),
    },

    Mutation: {
        createEvent: (parent, { data }, context, info) => createEvent(data),

        updateEvent: (parent, { id }, context, info) => updateEvent(id),

        deleteEvent: (parent, { id }, context, info) => deleteEvent(id),
    },

    //////////
    Event: {
        Releases: (parent, args, context, info) => context.Releases,
        Groups: (parent, args, context, info) => context.Groups,
        Handles: (parent, args, context, info) => context.Handles,
    },
    EventCompo: {
        ReleaseIDs: ({ ReleaseIDs }, args, context, info) => addReleases(ReleaseIDs, context),
    },
    EventReport: {
        HandleID: ({ HandleID }, args, context, info) => addHandle(HandleID, context),
    },
    EventComment: {
        HandleID: ({ HandleID }, args, context, info) => addHandle(HandleID, context),
    },
    EventOrganizers: {
        GroupIDs: ({ GroupIDs }, args, context, info) => addGroups(GroupIDs, context),
        HandleIDs: ({ HandleIDs }, args, context, info) => addHandles(HandleIDs, context),
    },

}

getEventFile = id => `${globals.data_path}/event/${id}/event.${id}.json`;

// Object loader
getEvent = id => {
    return loadJSON(getEventFile(id));
}

// Load object by ID or ID array
addEvent = (id, context) => {
    addEvents([id], context);
    return id;
}
addEvents = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'Events', id)) {
                data = getEvent(id);
                addElementToObjectArray( context, 'Events', data );
            }
        }) 
    }
    catch(err) {
        // console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getEventFile, getEvent, addEvent, addEvents }

