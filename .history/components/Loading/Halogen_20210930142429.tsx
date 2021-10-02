import React, { createClass } from 'react'
import * as Halogen from 'halogen'

var Loader = Halogen.Loader 
var Example = React.createClass({
    render: function() {
      return (
        <Loader color="#26A65B" size="16px" margin="4px"/>
      );
    }
});