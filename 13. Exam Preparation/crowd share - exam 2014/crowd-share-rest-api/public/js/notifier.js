

export default {
    success: function(msg) {
        alert(msg);
    },
    error: function(err) {
        alert('Error');
        console.error(err);
    }
}