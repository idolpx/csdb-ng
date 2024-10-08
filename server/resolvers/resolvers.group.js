


const resolvers = {

    Query: {
        group: (parent, { id }, context, info) => getGroup(id),
        groups: (parent, { ids }, context, info) => getGroups(ids),
    },

    Mutation: {
        createGroup: (parent, { data }, context, info) => createGroup(data),

        updateGroup: (parent, { id }, context, info) => updateGroup(id),

        deleteGroup: (parent, { id }, context, info) => deleteGroup(id),
    },

    //////////
    Group: {
        FounderHandles: ({ FounderHandleIDs }, args, context, info) => getHandles(FounderHandleIDs),
        OrganizedEvents: ({ OrganizedEventIDs }, args, context, info) => getEvents(OrganizedEventIDs),

        Releases: ({ ReleaseIDs }, args, context, info) => getReleases(ReleaseIDs),
        BBSs: ({ BBSIDs }, args, context, info) => getBBSs(BBSIDs),

        CoOpGroups: ({ CoOpGroupIDs }, args, context, info) => getGroups(CoOpGroupIDs),
    },
    GroupCommentData: {
        Handle: ({ HandleID }, args, context, info) => getHandle(HandleID),
    },
    GroupMember: {
        Handle: ({ HandleID }, args, context, info) => getHandle(HandleID),
        Group: ({ GroupID }, args, context, info) => getGroup(GroupID),
    },

}

getGroupFile = id => `${process.env.DATA_PATH}/group/${Math.floor(id/1000)}/${id}/group.${id}.json`;

// Object loader
getGroup = id => {
    return loadJSON(getGroupFile(id));
}
getGroups = idArray => {
    data = [];
    try {
        idArray.forEach( id => {
            // Add object
            data.push(getGroup(id));
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return data;
}

// Load object by ID or ID array
addGroup = (id, context) => {
    addGroups([id], context);
    return id;
}
addGroups = (idArray, context) => {
    console.log(idArray);
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
        console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getGroupFile, getGroup, addGroup, addGroups }

