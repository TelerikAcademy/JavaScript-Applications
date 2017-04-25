export default {
    success: function(msg) {
        document.location.reload(true);
        alert(msg);
        // TODO: popup success
    },
    error: function(msg) {
        alert('An error occurred. Check the console for details');
        console.log(msg);
        // TODO: popup error
    }
}