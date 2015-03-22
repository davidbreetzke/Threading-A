/*!
 * SubmitPostResult class, used to make wrap the results of a submit post request
 */


module.exports.SubmitPostResults=function(message) {

    this.message=message;

}
module.exports.getResults=function(message) {

    return message;

};