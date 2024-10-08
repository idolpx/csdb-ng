


const resolvers = {

    Query: {
        event: (parent, { id }, context, info) => getEvent(id),
        events: (parent, { ids }, context, info) => getEvents(ids),
    },

    Mutation: {
        createEvent: (parent, { data }, context, info) => createEvent(data),

        updateEvent: (parent, { id }, context, info) => updateEvent(id),

        deleteEvent: (parent, { id }, context, info) => deleteEvent(id),
    },

    //////////
    Event: {
        // Releases: (parent, args, context, info) => context.Releases,
    },
    EventCompo: {
        Releases: ({ ReleaseIDs }, args, context, info) => getReleases(ReleaseIDs),
    },
    EventReport: {
        Handle: ({ HandleID }, args, context, info) => getHandle(HandleID),
    },
    EventComment: {
        Handle: ({ HandleID }, args, context, info) => getHandle(HandleID),
    },
    EventOrganizers: {
        Groups: ({ GroupIDs }, args, context, info) => getGroups(GroupIDs),
        Handles: ({ HandleIDs }, args, context, info) => getHandles(HandleIDs),
    },

}

getEventFile = id => `${process.env.DATA_PATH}/event/${Math.floor(id/1000)}/${id}/event.${id}.json`;

// Object loader
getEvent = id => {
    return loadJSON(getEventFile(id));
}
getEvents = idArray => {
    data = [];
    try {
        idArray.forEach( id => {
            // Add object
            data.push(getEvent(id));
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return data;
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

