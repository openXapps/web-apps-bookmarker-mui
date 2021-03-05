import React from 'react';

const EditorComponent = ({ match }) => {

    console.log('Edit: route...', match);

    return (
        <h3>Editor</h3>
    );
};

export default EditorComponent;