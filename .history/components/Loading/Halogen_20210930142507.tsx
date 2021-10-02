import React, createClass  from 'react'
import * as Halogen from 'halogen'

export var Loader = Halogen.Loader 
export var Example = createClass({
    render: function() {
      return (
        <Loader color="#26A65B" size="16px" margin="4px"/>
      );
    }
});