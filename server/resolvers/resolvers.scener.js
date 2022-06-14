
let globals = require('../globals.js').globals;

const resolvers = {

    Query: {
        getScener: (parent, { id }, context, info) => getScener(id),
    },

    Mutation: {
        createScener: (parent, { data }, context, info) => createScener(data),

        updateScener: (parent, { id }, context, info) => updateScener(id),

        deleteScener: (parent, { id }, context, info) => deleteScener(id),
    },

    //////////
    Scener: {
        HandleIDs: ({ HandleIDs }, args, context, info) => addHandles(HandleIDs, context),
        Handles: (parent, args, context, info) => context.Handles,
    },

}

getScenerFile = id => `${globals.data_path}/scener/${id}/scener.${id}.json`;

// Object loader
getScener = id => {
    return loadJSON(getScenerFile(id));
}

// Load object by ID or ID array
addScener = (id, context) => {
    addSceners([id], context);
    return id;
}
addSceners = (idArray, context) => {
    try {
        idArray.forEach( id => {
            // Add object if it isn't already added
            if (!objectExists(context, 'Sceners', id)) {
                data = getScener(id);
                addElementToObjectArray( context, 'Sceners', data );
            }                
        }) 
    }
    catch(err) {
        //console.log(err);
    }

    return idArray;
}

module.exports = { resolvers } // , getScenerFile, getScener, addScener, addSceners }

