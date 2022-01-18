const Handlebars = require('handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
module.exports = {
  option: (value, label, selectedValue) => {
    var selectedProperty = value == selectedValue ? 'selected="selected"' : '';
    return new Handlebars.SafeString(
      '<option value="' +
        value +
        '"' +
        selectedProperty +
        '>' +
        label +
        ' </option>',
    );
  },
  selected: ( selected, options ) => {
    return options.fn(this).replace(
    new RegExp(' value=\"' + selected + '\"'),
    '$& selected="selected"')
  },
  section: express_handlebars_sections(),
// section: function(name, options) { 
//     if (!this._sections) this._sections = {};
//     this._sections[name] = options.fn(this); 
//     return null;
//     }
}