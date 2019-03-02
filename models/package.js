const mongoose = require('mongoose');
const validator = require('validator');

var Package = mongoose.model('Package', {
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    url: {
            type: String,
            required: true,
            trim: true,
            minLength: 5,
            validate: {
                validator: validator.isURL,
                message: '{VALUE} is not a valid url'
            }
    },
    description: {
        type: String,
        default: 'A popular package'
    },

});

module.exports = {Package};
